import { useState, useCallback } from 'react'
import { CalendarDays, CalendarCheck, Layers, Target, PenLine, Sparkles } from 'lucide-react'
import Button from '../components/ui/Button'
import ProgressBar from '../components/ui/ProgressBar'
import SubjectMark from '../components/ui/SubjectMark'
import CheckBubble from '../components/ui/CheckBubble'
import StudyNextCard from '../components/StudyNextCard'
import { hasQuestionBank } from '../data/questions/questionLoader'
import { FLASHCARD_COUNTS } from '../data/flashcardCounts'
import { EXAM_DATES_CONFIRMED } from '../data/subjectIndex'
import { adaptPlanToWindow, getCurrentPhaseId, getExamCountdown, taskKey, allTaskRefs, pickFurthestBehind } from '../utils/planEngine'
import { pickAcrossSubjects } from '../utils/priority'
import { reviewNote } from '../utils/progress'

const MORNING_ENDS_HOUR = 12
// With one practice subject, the cross-subject pick would repeat its card.
const MIN_SUBJECTS_FOR_PRACTICE_NEXT = 2
const AFTERNOON_ENDS_HOUR = 18
const URGENT_EXAM_DAYS = 14
const SOON_EXAM_DAYS = 30
const UP_NEXT_COUNT = 3

const share = (done, total) => (total === 0 ? 0 : done / total);
const percent = value => `${Math.round(value * 100)}%`;

function greetingFor(hour) {
  if (hour < MORNING_ENDS_HOUR) return 'Good morning';
  if (hour < AFTERNOON_ENDS_HOUR) return 'Good afternoon';
  return 'Good evening';
}

function examBadgeClass(days) {
  if (days < URGENT_EXAM_DAYS) return 'badge badge-red';
  if (days < SOON_EXAM_DAYS) return 'badge badge-pencil';
  return 'badge badge-outline';
}

const examDayLabel = days => (days === 1 ? 'Tomorrow' : `${days} days`);
const shortExamDate = subject => subject.examInfo.split('·')[0].trim();

// The next few unticked tasks in the focus phase, tickable right here.
// Tasks ticked during this visit stay in the list so the tick is visible.
function UpNext({ subject, phase, checked, onToggleTask }) {
  const [tickedHere, setTickedHere] = useState(() => new Set());
  const tasks = phase.days.flatMap(day => day.tasks.map((task, i) => ({ task, day: day.day, ref: day.taskRefs[i] })))
    .filter(t => t.ref)
    .map(t => ({ ...t, key: taskKey(subject.id, t.ref) }))
    .filter(t => !checked[t.key] || tickedHere.has(t.key))
    .slice(0, UP_NEXT_COUNT);
  if (tasks.length === 0) return <p className="up-next-done">Every task in this phase is done.</p>;
  const toggle = t => {
    setTickedHere(prev => new Set(prev).add(t.key));
    onToggleTask(subject.id, t.ref);
  };
  return (
    <div className="up-next">
      <span className="label">Up next</span>
      <ul className="task-list">
        {tasks.map(t => {
          const done = Boolean(checked[t.key]);
          return (
            <li key={t.key}>
              <button type="button" role="checkbox" aria-checked={done} className={`task${done ? ' is-done' : ''}`} onClick={() => toggle(t)}>
                <CheckBubble checked={done} />
                <span className="task-text">{t.task}</span>
                <span className="up-next-day">{t.day}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function FocusSheet({ subject, phase, phaseShare, reason, isBehind, hasPlan, checked, onToggleTask, onOpen, onSetUpPlan }) {
  return (
    <section className="sheet focus-sheet" aria-labelledby="focus-title" style={{ '--subject': subject.color }}>
      <div className="sheet-head">
        <span>Today's focus</span>
        <span className="focus-subject"><SubjectMark subject={subject} size="small" />{subject.shortName}</span>
      </div>
      <div className="sheet-body">
        {hasPlan && phase ? (
          <>
            <p className="focus-phase">{phase.isExamWeek ? 'Exam week' : phase.label} <span aria-hidden="true">/</span> {phase.dates}</p>
            <h2 id="focus-title" className="focus-title">{phase.theme}</h2>
            <p className="focus-meta">{phase.examWeight} of the exam</p>
            {reason && <p className={`focus-reason${isBehind ? ' is-behind' : ''}`}>{isBehind ? 'Furthest behind' : 'On track'}: {reason}</p>}
            <UpNext subject={subject} phase={phase} checked={checked} onToggleTask={onToggleTask} />
            <div className="focus-progress">
              <ProgressBar share={phaseShare} color={subject.color} label={`${phase.label} progress`} />
              <span>{percent(phaseShare)} of this phase done</span>
            </div>
            <div className="focus-actions">
              <Button icon={CalendarCheck} onClick={onOpen}>Open today's plan</Button>
            </div>
          </>
        ) : (
          <>
            <h2 id="focus-title" className="focus-title">{subject.name}</h2>
            <p className="focus-meta">No study plan yet. Tell ScoreForge how many days you have and it paces every unit to fit.</p>
            <div className="focus-actions">
              <Button icon={CalendarDays} onClick={onSetUpPlan}>Set up a plan</Button>
              <Button variant="ghost" onClick={onOpen}>Browse the course</Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// The one topic, across every subject with a question bank, where practice
// should gain the most score right now.
function PracticeNext({ subject, pick, onPractice }) {
  const detail = pick.attempts === 0
    ? `About ${percent(pick.weight)} of the exam and not practiced yet.`
    : `About ${percent(pick.weight)} of the exam, you're at ${percent(pick.chance)}${pick.dueForReview ? `, ${reviewNote(pick.daysSince)}` : ''}.`;
  return (
    <div className="callout home-setup" data-practice-next={subject.id}>
      <Target aria-hidden="true" />
      <span className="callout-title">Practice next: {pick.topic.name} ({subject.shortName})</span>
      <div className="callout-body home-setup-body">
        <span>{detail}</span>
        <Button variant="secondary" size="small" icon={Sparkles} onClick={onPractice}>Smart practice</Button>
      </div>
    </div>
  );
}

function StatCard({ label, value, detail, children }) {
  return (
    <div className="card stat-card">
      <span className="label">{label}</span>
      <span className="stat-value">{value}</span>
      {children}
      {detail && <span className="stat-detail">{detail}</span>}
    </div>
  );
}

function SubjectCard({ subject, plan, onNavigate }) {
  const { confirmed, days } = getExamCountdown(subject.examDate);
  const canPractice = hasQuestionBank(subject.id);
  return (
    <article className="card card-link subject-card" style={{ '--subject': subject.color }} data-subject-card={subject.id}>
      <div className="subject-card-top">
        <SubjectMark subject={subject} />
        <div className="subject-card-title">
          <h3><button type="button" className="card-link-target" onClick={() => onNavigate('study', subject.id)}>{subject.name}</button></h3>
          <p>{shortExamDate(subject)}{plan ? ` · ${plan.durationDays}-day plan` : ''}</p>
        </div>
        {confirmed && days > 0 && <span className={examBadgeClass(days)}>{examDayLabel(days)}</span>}
      </div>
      <div className="subject-card-progress">
        <span>{subject.done} of {subject.total} tasks</span>
        <b>{percent(subject.share)}</b>
      </div>
      <ProgressBar share={subject.share} color={subject.color} thin label={`${subject.shortName} progress`} />
      <div className="subject-card-actions above-link">
        <Button variant="quiet" size="small" icon={Layers} onClick={() => onNavigate('flashcards', subject.id)}>Cards</Button>
        {canPractice && <Button variant="quiet" size="small" icon={Target} onClick={() => onNavigate('practice', subject.id)}>Practice</Button>}
      </div>
    </article>
  );
}

export default function HomePage({ user, username, checked, mySubjects, planSettings, onNavigate, onToggleTask, onEditSubjects, onAdjustPlan }) {
  // Each StudyNextCard reports its top topic here: { [subjectId]: row }.
  const [topTopics, setTopTopics] = useState({});
  const reportTopTopic = useCallback((subjectId, top) => {
    setTopTopics(prev => {
      const current = prev[subjectId] ?? null;
      // Bail out on an unchanged report so the card's effect can't loop renders.
      if (current?.topic.id === top?.topic.id && current?.priority === top?.priority) return prev;
      const next = { ...prev };
      if (top) next[subjectId] = top;
      else delete next[subjectId];
      return next;
    });
  }, []);
  const practiceSubjects = mySubjects.filter(s => hasQuestionBank(s.id));
  const practiceNext = practiceSubjects.length >= MIN_SUBJECTS_FOR_PRACTICE_NEXT ? pickAcrossSubjects(topTopics) : null;
  const practiceNextSubject = practiceNext ? practiceSubjects.find(s => s.id === practiceNext.subjectId) : null;

  const subjectsWithProgress = mySubjects.map(s => {
    const refs = allTaskRefs(s);
    const done = refs.filter(ref => checked[taskKey(s.id, ref)]).length;
    return { ...s, total: refs.length, done, share: share(done, refs.length) };
  });
  const totalDone = subjectsWithProgress.reduce((sum, s) => sum + s.done, 0);
  const totalTasks = subjectsWithProgress.reduce((sum, s) => sum + s.total, 0);
  const totalCards = mySubjects.reduce((sum, s) => sum + (FLASHCARD_COUNTS[s.id] ?? 0), 0);
  const hasAnyPlan = Object.keys(planSettings ?? {}).length > 0;

  const nextExam = EXAM_DATES_CONFIRMED
    ? [...mySubjects].sort((a, b) => new Date(a.examDate) - new Date(b.examDate)).find(s => getExamCountdown(s.examDate).days > 0)
    : undefined;
  const nextExamDays = nextExam ? getExamCountdown(nextExam.examDate).days : null;

  // Next exam when dates are confirmed; until then, the planned subject furthest behind schedule.
  const behind = nextExam ? null : pickFurthestBehind(mySubjects, planSettings, checked);
  const focusSubject = nextExam ?? behind?.subject ?? mySubjects[0];
  const focusReason = behind ? `${percent(behind.doneShare)} of tasks done, ${percent(behind.timeShare)} of plan time used` : null;
  const focusPlan = focusSubject ? planSettings[focusSubject.id] : null;
  const focusWeeks = focusSubject && focusPlan ? adaptPlanToWindow(focusSubject, focusPlan.durationDays, focusPlan.startDate) : null;
  const focusPhaseId = focusWeeks ? getCurrentPhaseId(focusWeeks, focusPlan.startDate) : null;
  const focusPhase = focusWeeks?.find(w => w.id === focusPhaseId);
  const focusPhaseRefs = focusPhase ? focusPhase.days.flatMap(day => day.taskRefs.filter(Boolean)) : [];
  const focusPhaseShare = share(focusPhaseRefs.filter(ref => checked[taskKey(focusSubject.id, ref)]).length, focusPhaseRefs.length);

  const now = new Date();
  const todayLabel = now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  const displayName = username || 'there';
  const summary = totalDone === 0
    ? 'Start with today\'s focus. Every task you tick moves your plan forward.'
    : `${totalDone} of ${totalTasks} tasks done across ${mySubjects.length} subject${mySubjects.length === 1 ? '' : 's'}.`;

  return (
    <div className="page home">
      <header className="home-greeting">
        <p className="home-date">{todayLabel}</p>
        <h1>{greetingFor(now.getHours())}, {displayName}.</h1>
        <p className="muted">{summary}</p>
      </header>

      <div className="home-top">
        {focusSubject && (
          <FocusSheet
            subject={focusSubject}
            phase={focusPhase}
            phaseShare={focusPhaseShare}
            reason={focusReason}
            isBehind={behind?.gap > 0}
            hasPlan={Boolean(focusPlan)}
            checked={checked}
            onToggleTask={onToggleTask}
            onOpen={() => onNavigate('study', focusSubject.id)}
            onSetUpPlan={onAdjustPlan}
          />
        )}
        <div className="stat-stack">
          <StatCard label="Overall progress" value={percent(share(totalDone, totalTasks))} detail={`${totalDone} of ${totalTasks} tasks`}>
            <ProgressBar share={share(totalDone, totalTasks)} label="Overall progress" />
          </StatCard>
          <StatCard
            label="Next exam"
            value={nextExam ? examDayLabel(nextExamDays) : (EXAM_DATES_CONFIRMED ? 'All done' : 'Dates TBA')}
            detail={nextExam ? `${nextExam.shortName}, ${shortExamDate(nextExam)}` : null}
          />
          <StatCard label="Flashcards" value={totalCards} detail={`across ${mySubjects.length} subject${mySubjects.length === 1 ? '' : 's'}`} />
        </div>
      </div>

      {!hasAnyPlan && (
        <div className="callout callout-ink home-setup">
          <Sparkles aria-hidden="true" />
          <span className="callout-title">Set up your study plans</span>
          <div className="callout-body home-setup-body">
            <span>Tell ScoreForge how many days you have for each subject and every unit is paced to fit.</span>
            <Button variant="secondary" size="small" icon={CalendarDays} onClick={onAdjustPlan}>Set up plans</Button>
          </div>
        </div>
      )}

      {practiceNextSubject && (
        <PracticeNext subject={practiceNextSubject} pick={practiceNext.pick} onPractice={() => onNavigate('practice', practiceNextSubject.id)} />
      )}

      {user && practiceSubjects.map(s => (
        <StudyNextCard key={s.id} user={user} subject={s} onPractice={() => onNavigate('practice', s.id)} onTopTopic={reportTopTopic} />
      ))}

      <section aria-labelledby="subjects-title">
        <div className="section-title">
          <h2 id="subjects-title">Your subjects<span className="count">{mySubjects.length}</span></h2>
          <Button variant="quiet" size="small" icon={PenLine} onClick={onEditSubjects}>Edit subjects</Button>
        </div>
        <div className="subject-grid">
          {subjectsWithProgress.map(s => <SubjectCard key={s.id} subject={s} plan={planSettings[s.id]} onNavigate={onNavigate} />)}
        </div>
      </section>
    </div>
  );
}
