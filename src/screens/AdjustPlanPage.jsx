import { useState } from 'react'
import { ArrowLeft, Target } from 'lucide-react'
import Button from '../components/ui/Button'
import SubjectMark from '../components/ui/SubjectMark'
import DaysStepper from '../components/DaysStepper'
import { EXAM_DATES_CONFIRMED } from '../data/subjectIndex'
import { adaptPlanToWindow, getExamCountdown, todayLocalIsoDate, parseLocalDate, addDays, fmtDate } from '../utils/planEngine'

const DEFAULT_PLAN_DAYS = 42

function PlanRow({ subject, plan, onSavePlanSetting }) {
  const savedDays = plan?.durationDays;
  const startDate = plan?.startDate || todayLocalIsoDate();
  const [previewDays, setPreviewDays] = useState(savedDays ?? DEFAULT_PLAN_DAYS);
  const phases = adaptPlanToWindow(subject, previewDays, startDate).length;
  const endsOn = fmtDate(addDays(parseLocalDate(startDate), previewDays));
  const examDays = EXAM_DATES_CONFIRMED ? Math.max(1, getExamCountdown(subject.examDate).days) : null;

  const save = days => onSavePlanSetting(subject.id, { durationDays: days, startDate });
  // "Until exam" restarts the plan today so it ends on exam day.
  const fitToExam = async () => {
    setPreviewDays(examDays);
    const saved = await onSavePlanSetting(subject.id, { durationDays: examDays, startDate: todayLocalIsoDate() });
    if (!saved) setPreviewDays(savedDays ?? DEFAULT_PLAN_DAYS);
  };

  return (
    <li className="card plan-row" style={{ '--subject': subject.color }} data-plan-row={subject.id}>
      <SubjectMark subject={subject} />
      <div className="plan-row-text">
        <span className="plan-row-name">{subject.name}</span>
        <span className="muted">
          {savedDays ? `${phases} phases, ends ${endsOn}` : 'No plan yet. Pick a length to create one.'}
        </span>
      </div>
      <div className="plan-row-controls">
        {examDays && <Button variant="ghost" size="small" icon={Target} onClick={fitToExam}>Until exam</Button>}
        <DaysStepper
          value={savedDays ?? DEFAULT_PLAN_DAYS}
          onCommit={save}
          onDraftChange={setPreviewDays}
          label={`Plan length in days for ${subject.shortName}`}
        />
      </div>
    </li>
  );
}

export default function AdjustPlanPage({ mySubjects, planSettings, onSavePlanSetting, onClose }) {
  return (
    <div className="page page-narrow plans">
      <button type="button" className="back-link" onClick={onClose}><ArrowLeft aria-hidden="true" />Back</button>
      <header className="page-head">
        <div>
          <h1>Study plans</h1>
          <p>Set how many days you have for each subject. Every unit is re-paced to fit, and ticked tasks stay ticked.</p>
        </div>
      </header>
      <ul className="plan-rows">
        {mySubjects.map(s => <PlanRow key={s.id} subject={s} plan={planSettings[s.id]} onSavePlanSetting={onSavePlanSetting} />)}
      </ul>
      <div className="row-end plans-done">
        <Button onClick={onClose}>Done</Button>
      </div>
    </div>
  );
}
