import { useState } from 'react'
import { Search, ArrowLeft, CalendarDays, Target } from 'lucide-react'
import LogoMark from '../components/LogoMark'
import Button from '../components/ui/Button'
import Tabs, { TabPanel } from '../components/ui/Tabs'
import SubjectMark from '../components/ui/SubjectMark'
import CheckBubble from '../components/ui/CheckBubble'
import DaysStepper from '../components/DaysStepper'
import { SUBJECT_INDEX as SUBJECTS, EXAM_DATES_CONFIRMED } from '../data/subjectIndex'
import { fmtDate, addDays, getExamCountdown, todayLocalIsoDate } from '../utils/planEngine'

const DEFAULT_PLAN_DAYS = 42
const PRESET_DAYS = [7, 14, 30, 60, 90]
const SAME_FOR_ALL = 'same'
const PER_SUBJECT = 'each'
const PLAN_MODE_TABS = [{ id: SAME_FOR_ALL, label: 'Same for all' }, { id: PER_SUBJECT, label: 'Per subject' }]
const PACES = [
  { maxDays: 7, label: 'Crash course' },
  { maxDays: 14, label: 'Intensive' },
  { maxDays: 30, label: 'Standard' },
  { maxDays: 60, label: 'Comfortable' },
  { maxDays: Infinity, label: 'Thorough' },
]

const paceFor = days => PACES.find(p => days <= p.maxDays).label;
const daysUntilExam = subject => Math.max(1, getExamCountdown(subject.examDate).days);
const examDateOf = subject => subject.examInfo.split('·')[0].trim();

function PickerFrame({ children, footer }) {
  return (
    <div className="picker">
      <header className="picker-top">
        <span className="wordmark"><LogoMark size={30} />ScoreForge</span>
      </header>
      <main className="page picker-page">{children}</main>
      {footer && <div className="picker-footer glass glass-strong"><div className="picker-footer-inner">{footer}</div></div>}
    </div>
  );
}

function SubjectTile({ subject, selected, onToggle }) {
  return (
    <button type="button" className={`subject-tile${selected ? ' is-selected' : ''}`} aria-pressed={selected} onClick={onToggle} style={{ '--subject': subject.color }}>
      <SubjectMark subject={subject} />
      <span className="subject-tile-text">
        <span className="subject-tile-name">{subject.shortName}</span>
        <span className="subject-tile-date">{examDateOf(subject)}</span>
      </span>
      <CheckBubble checked={selected} />
    </button>
  );
}

export default function SubjectPicker({ initial, existingPlans = {}, onSave, onCancel }) {
  const [selected, setSelected] = useState(() => initial ?? []);
  const [step, setStep] = useState('pick');
  const [search, setSearch] = useState('');
  const [planMode, setPlanMode] = useState(SAME_FOR_ALL);
  const [globalDays, setGlobalDays] = useState(DEFAULT_PLAN_DAYS);
  const [previewDays, setPreviewDays] = useState(DEFAULT_PLAN_DAYS);
  const [perSubject, setPerSubject] = useState(() => Object.fromEntries(SUBJECTS.map(s => [s.id, DEFAULT_PLAN_DAYS])));
  const [saving, setSaving] = useState(false);

  const isEditing = (initial ?? []).length > 0;
  const toggle = id => setSelected(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  const selectedSubjects = SUBJECTS.filter(s => selected.includes(s.id));
  // Subjects that already have a plan keep it; only newly added ones need a duration.
  const subjectsNeedingPlan = selectedSubjects.filter(s => !existingPlans[s.id]);
  const query = search.trim().toLowerCase();
  const visibleSubjects = query ? SUBJECTS.filter(s => `${s.name} ${s.shortName}`.toLowerCase().includes(query)) : SUBJECTS;

  const handleSave = async () => {
    setSaving(true);
    try {
      const today = todayLocalIsoDate();
      const finalSettings = Object.fromEntries(subjectsNeedingPlan.map(s => [
        s.id, { durationDays: planMode === PER_SUBJECT ? perSubject[s.id] : globalDays, startDate: today },
      ]));
      await onSave(selected, finalSettings);
    } finally {
      setSaving(false);
    }
  };

  const setGlobal = days => { setGlobalDays(days); setPreviewDays(days); };

  if (step === 'plan') {
    return (
      <PickerFrame footer={(
        <>
          <Button variant="ghost" icon={ArrowLeft} onClick={() => setStep('pick')}>Back</Button>
          <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving' : 'Start studying'}</Button>
        </>
      )}>
        <div className="page-narrow picker-center">
          <header className="picker-head">
            <p className="picker-step">Step 2 of 2</p>
            <h1>How long do you have?</h1>
            <p>Each plan is paced to fit. You can change it any time from Plans.</p>
          </header>

          {subjectsNeedingPlan.length > 1 && (
            <Tabs tabs={PLAN_MODE_TABS} active={planMode} onChange={setPlanMode} idPrefix="plan-mode" label="Plan length" className="plan-mode-tabs" />
          )}

          <TabPanel idPrefix="plan-mode" id={planMode} className="plan-panel">
          {planMode === SAME_FOR_ALL ? (
            <div className="sheet plan-card">
              <div className="plan-card-main">
                <DaysStepper value={globalDays} onCommit={setGlobal} onDraftChange={setPreviewDays} label="Days to study" />
                <div className="plan-card-summary">
                  <span className="plan-pace">{paceFor(previewDays)}</span>
                  <span className="muted">{previewDays} days, ending {fmtDate(addDays(new Date(), previewDays))}</span>
                </div>
              </div>
              <div className="plan-presets">
                <span className="label">Quick picks</span>
                <div className="chips">
                  {PRESET_DAYS.map(d => <button key={d} type="button" className="chip" aria-pressed={globalDays === d} onClick={() => setGlobal(d)}>{d} days</button>)}
                  {EXAM_DATES_CONFIRMED && subjectsNeedingPlan.map(s => {
                    const days = daysUntilExam(s);
                    return <button key={s.id} type="button" className="chip" aria-pressed={globalDays === days} onClick={() => setGlobal(days)}><Target aria-hidden="true" />Until {s.shortName} exam</button>;
                  })}
                </div>
                {!EXAM_DATES_CONFIRMED && <p className="field-hint">Exam-date picks appear once next year's AP calendar is confirmed.</p>}
              </div>
            </div>
          ) : (
            <ul className="plan-rows">
              {subjectsNeedingPlan.map(s => (
                <li key={s.id} className="card plan-row" style={{ '--subject': s.color }}>
                  <SubjectMark subject={s} />
                  <div className="plan-row-text">
                    <span className="plan-row-name">{s.shortName}</span>
                    <span className="muted">{paceFor(perSubject[s.id])}, exam {examDateOf(s)}</span>
                  </div>
                  <div className="plan-row-controls">
                    {EXAM_DATES_CONFIRMED && (
                      <Button variant="ghost" size="small" icon={CalendarDays} onClick={() => setPerSubject(p => ({ ...p, [s.id]: daysUntilExam(s) }))}>Until exam</Button>
                    )}
                    <DaysStepper value={perSubject[s.id]} onCommit={days => setPerSubject(p => ({ ...p, [s.id]: days }))} label={`Days for ${s.shortName}`} />
                  </div>
                </li>
              ))}
            </ul>
          )}
          </TabPanel>
        </div>
      </PickerFrame>
    );
  }

  const needsPlanStep = subjectsNeedingPlan.length > 0;
  const continueLabel = needsPlanStep || selected.length === 0 ? 'Continue' : 'Save changes';
  return (
    <PickerFrame footer={(
      <>
        <span className="picker-count" aria-live="polite"><b>{selected.length}</b> selected</span>
        <div className="picker-footer-actions">
          {onCancel && <Button variant="ghost" onClick={onCancel}>Cancel</Button>}
          <Button
            disabled={saving || selected.length === 0}
            onClick={() => { if (needsPlanStep) setStep('plan'); else handleSave(); }}
          >
            {saving ? 'Saving' : continueLabel}
          </Button>
        </div>
      </>
    )}>
      <header className="picker-head">
        {!isEditing && <p className="picker-step">Step 1 of 2</p>}
        <h1>{isEditing ? 'Edit your subjects' : 'Which exams are you taking?'}</h1>
        <p>Pick every AP course you're preparing for. Each one gets its own plan.</p>
      </header>

      <div className="picker-toolbar">
        <label className="input-with-icon picker-search">
          <Search aria-hidden="true" />
          <span className="sr-only">Find a subject</span>
          <input className="input" type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Find a subject" />
        </label>
        <div className="picker-bulk">
          <Button variant="quiet" size="small" onClick={() => setSelected(SUBJECTS.map(s => s.id))} disabled={selected.length === SUBJECTS.length}>Select all</Button>
          <Button variant="ghost" size="small" onClick={() => setSelected([])} disabled={selected.length === 0}>Clear</Button>
        </div>
      </div>

      {visibleSubjects.length === 0
        ? <p className="picker-none">No subject matches "{search.trim()}".</p>
        : (
          <div className="subject-tiles">
            {visibleSubjects.map(s => <SubjectTile key={s.id} subject={s} selected={selected.includes(s.id)} onToggle={() => toggle(s.id)} />)}
          </div>
        )}
    </PickerFrame>
  );
}
