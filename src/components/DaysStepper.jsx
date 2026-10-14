import { useEffect, useRef, useState } from 'react'
import { Minus, Plus } from 'lucide-react'

export const MIN_PLAN_DAYS = 1
export const MAX_PLAN_DAYS = 730
const STEP_DAYS = 7
// Rapid +/- clicks are batched into one commit, so a parent that saves to the
// server sends one request instead of racing several.
const STEP_COMMIT_DELAY_MS = 600

const clampDays = days => Math.min(Math.max(days, MIN_PLAN_DAYS), MAX_PLAN_DAYS);

export function parsePlanDays(text) {
  const days = parseInt(text, 10);
  return Number.isFinite(days) ? clampDays(days) : null;
}

// A plan length in days. The text box keeps a draft and only commits on
// Enter or blur: committing every keystroke meant clearing the box to type
// "60" first committed a 1-day plan.
// onCommit(days) may return false (or a promise of false) to reject the value.
export default function DaysStepper({ value, onCommit, label, onDraftChange }) {
  const [draft, setDraft] = useState(String(value));
  const pendingStep = useRef(null);
  const isEditing = useRef(false);

  // Follow outside changes, but never while the student is mid-edit.
  useEffect(() => {
    if (!isEditing.current && pendingStep.current === null) setDraft(String(value));
  }, [value]);

  const updateDraft = text => {
    setDraft(text);
    onDraftChange?.(parsePlanDays(text) ?? value);
  };

  const commit = async text => {
    const days = parsePlanDays(text);
    if (days === null) { updateDraft(String(value)); return; }
    updateDraft(String(days));
    if (days === value) return;
    const accepted = await onCommit(days);
    if (accepted === false) updateDraft(String(value));
  };

  // Timers and the unmount flush must reach the latest value and onCommit.
  const latestCommit = useRef(commit);
  latestCommit.current = commit;
  const flushPendingStep = () => {
    if (pendingStep.current === null) return;
    clearTimeout(pendingStep.current.timer);
    const { text } = pendingStep.current;
    pendingStep.current = null;
    latestCommit.current(text);
  };
  // Leaving the screen mid-batch still saves the last value shown.
  useEffect(() => flushPendingStep, []);

  const step = direction => {
    const base = parsePlanDays(pendingStep.current?.text ?? draft) ?? value;
    const text = String(clampDays(base + direction * STEP_DAYS));
    updateDraft(text);
    if (pendingStep.current) clearTimeout(pendingStep.current.timer);
    pendingStep.current = { text, timer: setTimeout(flushPendingStep, STEP_COMMIT_DELAY_MS) };
  };

  const shownDays = parsePlanDays(draft) ?? value;
  return (
    <div className="stepper">
      <button type="button" onClick={() => step(-1)} disabled={shownDays <= MIN_PLAN_DAYS} aria-label={`${STEP_DAYS} fewer days`}><Minus aria-hidden="true" /></button>
      <input
        type="number" inputMode="numeric" min={MIN_PLAN_DAYS} max={MAX_PLAN_DAYS}
        aria-label={label} value={draft}
        onFocus={() => { isEditing.current = true; }}
        onChange={e => updateDraft(e.target.value)}
        onBlur={e => { isEditing.current = false; commit(e.target.value); }}
        onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.blur(); }}
      />
      <button type="button" onClick={() => step(1)} disabled={shownDays >= MAX_PLAN_DAYS} aria-label={`${STEP_DAYS} more days`}><Plus aria-hidden="true" /></button>
    </div>
  );
}
