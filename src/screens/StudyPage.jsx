import { useRef, useState } from 'react'
import { CalendarDays, CalendarCheck, Clock, Layers, Target, Lightbulb, ListChecks, Link2, PenLine, NotebookPen, ClipboardList, ExternalLink, Repeat, Check, TriangleAlert, Settings2 } from 'lucide-react'
import Button from '../components/ui/Button'
import Tabs, { TabPanel } from '../components/ui/Tabs'
import ProgressBar from '../components/ui/ProgressBar'
import ProgressRing from '../components/ui/ProgressRing'
import SubjectMark from '../components/ui/SubjectMark'
import CheckBubble from '../components/ui/CheckBubble'
import SubjectSwitcher from '../components/SubjectSwitcher'
import { useWeekNote, NOTE_STATUS } from '../hooks/useWeekNote'
import { useCenterActiveChild } from '../hooks/useCenterActiveChild'
import { getCurrentPhaseId, getExamCountdown, taskKey, allTaskRefs } from '../utils/planEngine'

const URGENT_EXAM_DAYS = 14
const SOON_EXAM_DAYS = 30
// "Learn: ...", "Practice: ..." read better with the kind of task set apart.
const MAX_TASK_KIND_LENGTH = 14
const TABS_ID = 'phase'

const percent = share => `${Math.round(share * 100)}%`;

function splitTaskKind(task) {
  const colon = task.indexOf(':');
  if (colon <= 0 || colon > MAX_TASK_KIND_LENGTH) return { kind: null, text: task };
  return { kind: task.slice(0, colon), text: task.slice(colon + 1).trim() };
}

function hostOf(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; }
}

function examBadge(examDate) {
  const { confirmed, days } = getExamCountdown(examDate);
  if (!confirmed) return { className: 'badge badge-outline', text: 'Exam date TBA' };
  if (days <= 0) return { className: 'badge badge-outline', text: 'Exam done' };
  const className = days < URGENT_EXAM_DAYS ? 'badge badge-red' : days < SOON_EXAM_DAYS ? 'badge badge-pencil' : 'badge badge-outline';
  return { className, text: days === 1 ? 'Exam tomorrow' : `Exam in ${days} days` };
}

const NOTE_STATUS_DISPLAY = {
  [NOTE_STATUS.loading]: { text: 'Loading', tone: '' },
  [NOTE_STATUS.idle]: { text: '', tone: '' },
  [NOTE_STATUS.saving]: { text: 'Saving', tone: '' },
  [NOTE_STATUS.saved]: { text: 'Saved', tone: 'is-ok', icon: Check },
  [NOTE_STATUS.error]: { text: 'Not saved', tone: 'is-error', icon: TriangleAlert },
  [NOTE_STATUS.loadError]: { text: "Couldn't load", tone: 'is-error', icon: TriangleAlert },
};

function Tip({ children }) {
  return (
    <div className="callout">
      <Lightbulb aria-hidden="true" />
      <span className="callout-title">Tip</span>
      <div className="callout-body">{children}</div>
    </div>
  );
}

function TaskRow({ task, done, onToggle }) {
  const { kind, text } = splitTaskKind(task);
  return (
    <li>
      <button type="button" role="checkbox" aria-checked={done} className={`task${done ? ' is-done' : ''}`} onClick={onToggle}>
        <CheckBubble checked={done} />
        <span className="task-text">{kind && <><b className="task-kind">{kind}</b>{' '}</>}{text}</span>
      </button>
    </li>
  );
}

function ReviewRow({ task }) {
  return (
    <li className="task is-review">
      <span className="review-mark" aria-hidden="true"><Repeat /></span>
      <span className="task-text">{task}</span>
    </li>
  );
}

function DayCard({ day, subjectId, checked, toggleTask }) {
  const tickable = day.taskRefs.filter(Boolean);
  const doneCount = tickable.filter(ref => checked[taskKey(subjectId, ref)]).length;
  const complete = tickable.length > 0 && doneCount === tickable.length;
  return (
    <div className={`day-card${complete ? ' is-complete' : ''}`}>
      <div className="day-head">
        <span className="day-name">{day.day}</span>
        {tickable.length > 0 && (complete
          ? <span className="badge badge-pass"><Check aria-hidden="true" />Done</span>
          : <span className="day-count">{doneCount} of {tickable.length}</span>)}
      </div>
      <ul className="task-list">
        {day.tasks.map((task, i) => {
          const ref = day.taskRefs[i];
          if (!ref) return <ReviewRow key={i} task={task} />;
          return <TaskRow key={i} task={task} done={Boolean(checked[taskKey(subjectId, ref)])} onToggle={() => toggleTask(ref)} />;
        })}
      </ul>
    </div>
  );
}

function PhaseRail({ weeks, activeId, currentId, progressOf, onSelect, subjectShare, subject }) {
  const listRef = useRef(null);
  useCenterActiveChild(listRef, '[aria-current="step"]', activeId);
  return (
    <nav className="phase-rail" aria-label="Phases">
      <div className="phase-rail-summary">
        <span className="label">Course progress</span>
        <span className="phase-rail-percent">{percent(subjectShare)}</span>
        <ProgressBar share={subjectShare} color={subject.color} thin label={`${subject.shortName} progress`} />
      </div>
      <ol ref={listRef} className="phase-list">
        {weeks.map((wk, index) => {
          const isActive = wk.id === activeId;
          const isCurrent = wk.id === currentId;
          return (
            <li key={wk.id}>
              <button type="button" className="phase-item" aria-current={isActive ? 'step' : undefined} onClick={() => onSelect(wk.id)}>
                <ProgressRing share={progressOf(wk)} color={subject.color}>
                  {wk.isExamWeek ? <Target /> : index + 1}
                </ProgressRing>
                <span className="phase-text">
                  <span className="phase-label">
                    {wk.isExamWeek ? 'Exam week' : wk.label}
                    {isCurrent && <span className="badge badge-pencil phase-now">Now</span>}
                  </span>
                  <span className="phase-theme">{wk.theme}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function NotesPanel({ note, phase }) {
  const status = NOTE_STATUS_DISPLAY[note.status] ?? NOTE_STATUS_DISPLAY[NOTE_STATUS.idle];
  const StatusIcon = status.icon;
  return (
    <div className="stack">
      <div className="card notes-card">
        <div className="notes-head">
          <span><NotebookPen aria-hidden="true" />Notes for {phase.isExamWeek ? 'exam week' : phase.label}</span>
          <span className={`note-status ${status.tone}`} aria-live="polite">{StatusIcon && <StatusIcon aria-hidden="true" />}{status.text}</span>
        </div>
        <textarea
          className="notes-input" value={note.text} disabled={!note.canEdit}
          onChange={e => note.updateText(e.target.value)} aria-label={`Notes for ${phase.label}`}
          placeholder={note.status === NOTE_STATUS.loadError ? "Couldn't load your notes. Reopen this tab to try again." : `Anything worth remembering about ${phase.theme}`}
        />
      </div>
      {note.canEdit && note.text.length > 0 && (
        <div className="row-end">
          <Button variant="ghost" size="small" onClick={() => { if (window.confirm('Clear the notes for this phase?')) note.updateText(''); }}>Clear notes</Button>
        </div>
      )}
    </div>
  );
}

export default function StudyPage({ user, subject, adaptedWeeks, checked, toggleTask, onSaveNote, planDays, planStart, onAdjustPlan, onPractice, onFlashcards, onSubject, mySubjects }) {
  const currentPhaseId = getCurrentPhaseId(adaptedWeeks, planStart);
  const [activeWeek, setActiveWeek] = useState(currentPhaseId);
  const [activeTab, setActiveTab] = useState('days');
  const phase = adaptedWeeks.find(wk => wk.id === activeWeek) || adaptedWeeks[0];

  // Notes belong to the first original week a phase covers, so they stay put when the plan length changes.
  const noteWeekId = phase?._coveredWeekIds?.[0] ?? phase?.id;
  const note = useWeekNote({ userId: user?.id, subjectId: subject.id, weekId: noteWeekId, saveNote: onSaveNote });

  const shareDone = refs => (refs.length === 0 ? 0 : refs.filter(ref => checked[taskKey(subject.id, ref)]).length / refs.length);
  const phaseShare = wk => shareDone(wk.days.flatMap(day => day.taskRefs.filter(Boolean)));
  const subjectShare = shareDone(allTaskRefs(subject));
  const exam = examBadge(subject.examDate);

  const selectPhase = id => { setActiveWeek(id); setActiveTab('days'); };
  const tabs = [
    { id: 'days', label: 'Daily plan', icon: CalendarCheck },
    { id: 'rules', label: 'Key rules', icon: ListChecks },
    { id: 'resources', label: 'Resources', icon: Link2 },
    ...(phase?.frq ? [{ id: 'frq', label: 'FRQ', icon: PenLine }] : []),
    { id: 'notes', label: 'Notes', icon: NotebookPen },
  ];
  const shownTab = tabs.some(t => t.id === activeTab) ? activeTab : 'days';

  return (
    <div className="page study" style={{ '--subject': subject.color }}>
      <SubjectSwitcher subjects={mySubjects} activeId={subject.id} onSelect={onSubject} />

      <header className="study-head">
        <SubjectMark subject={subject} size="large" />
        <div className="study-head-text">
          <h1>{subject.name}</h1>
          <p>{subject.examInfo}</p>
          <div className="study-head-badges">
            <span className={exam.className}><Clock aria-hidden="true" />{exam.text}</span>
            {planDays && <span className="badge badge-outline"><CalendarDays aria-hidden="true" />{planDays}-day plan, {adaptedWeeks.length} phases</span>}
          </div>
        </div>
        <div className="study-head-actions">
          {onPractice && <Button icon={Target} onClick={onPractice}>Practice</Button>}
          <Button variant="quiet" icon={Layers} onClick={onFlashcards}>Flashcards</Button>
          <Button variant="ghost" icon={Settings2} onClick={onAdjustPlan}>Adjust plan</Button>
        </div>
      </header>

      {!planDays && (
        <div className="callout callout-ink study-no-plan">
          <CalendarDays aria-hidden="true" />
          <span className="callout-title">No study plan yet</span>
          <div className="callout-body home-setup-body">
            <span>You're seeing the full course. Set how many days you have and it gets paced to fit.</span>
            <Button size="small" onClick={onAdjustPlan}>Set up a plan</Button>
          </div>
        </div>
      )}

      {phase && (
        <div className="study-layout">
          <PhaseRail
            weeks={adaptedWeeks} activeId={phase.id} currentId={currentPhaseId}
            progressOf={phaseShare} onSelect={selectPhase} subjectShare={subjectShare} subject={subject}
          />

          <div className="phase-content">
            <div className="phase-head">
              <p className="phase-kicker">{phase.isExamWeek ? 'Exam week' : phase.label}<span aria-hidden="true"> / </span>{phase.dates}</p>
              <h2>{phase.theme}</h2>
              <span className="badge badge-dark">{phase.examWeight} of the exam</span>
            </div>
            <p className="phase-overview">{phase.overview}</p>

            <Tabs tabs={tabs} active={shownTab} onChange={setActiveTab} idPrefix={TABS_ID} label="Phase sections" className="phase-tabs" />

            <TabPanel idPrefix={TABS_ID} id={shownTab} className="phase-panel">
              {shownTab === 'days' && (
                <div className="stack">
                  {phase.days.map((day, i) => <DayCard key={i} day={day} subjectId={subject.id} checked={checked} toggleTask={toggleTask} />)}
                  {phase.tip && <Tip>{phase.tip}</Tip>}
                </div>
              )}

              {shownTab === 'rules' && (
                <div className="stack">
                  <ol className="rule-list">
                    {phase.keyRules.map((rule, i) => <li key={i}><span className="rule-index" aria-hidden="true">{i + 1}</span><span>{rule}</span></li>)}
                  </ol>
                  {phase.tip && <Tip>{phase.tip}</Tip>}
                </div>
              )}

              {shownTab === 'resources' && (
                <ul className="resource-list">
                  {phase.resources.map((r, i) => (
                    <li key={i}>
                      <a className="card resource-link" href={r.url} target="_blank" rel="noopener noreferrer">
                        <span className="resource-text">
                          <span className="resource-name">{r.name}</span>
                          {r.desc && <span className="resource-desc">{r.desc}</span>}
                          <span className="resource-host">{hostOf(r.url)}</span>
                        </span>
                        <ExternalLink aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {shownTab === 'frq' && phase.frq && (
                <div className="stack">
                  <div className="card card-pad frq-card">
                    <span className="label">This phase's free response</span>
                    <h3>{phase.frq.type}</h3>
                    <p>{phase.frq.prompt}</p>
                  </div>
                  <div className="callout callout-ink">
                    <ClipboardList aria-hidden="true" />
                    <span className="callout-title">How it's scored</span>
                    <div className="callout-body">{phase.frq.rubricTip}</div>
                  </div>
                  {phase.tip && <Tip>{phase.tip}</Tip>}
                </div>
              )}

              {shownTab === 'notes' && <NotesPanel note={note} phase={phase} />}
            </TabPanel>
          </div>
        </div>
      )}
    </div>
  );
}
