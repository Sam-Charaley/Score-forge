import { EXAM_DATES_CONFIRMED } from '../data/subjects';

const MS_PER_DAY = 86400000;
const DAYS_PER_WEEK = 7;
const CRASH_COURSE_MAX_DAYS = 7;
const CRASH_COURSE_TASKS_PER_WEEK = 5;
const MAX_KEY_RULES_PER_PHASE = 8;
const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

// ─── DATES ──────────────────────────────────────────────────
// Plan dates are stored as "YYYY-MM-DD" and mean a calendar day where the
// student lives. `new Date("2026-10-12")` parses that as UTC midnight, which is
// the previous evening anywhere west of UTC, so every plan date would show a
// day early in Vancouver. These helpers keep plan dates in local time.

export function parseLocalDate(value) {
  if (value instanceof Date) return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  const match = ISO_DATE_PATTERN.exec(value ?? '');
  if (match) return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  const parsed = new Date(value);
  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
}

export function toLocalIsoDate(date) {
  const pad = n => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function todayLocalIsoDate(now = new Date()) {
  return toLocalIsoDate(now);
}

// Whole calendar days from `from` to `to`. Rounds rather than floors so a
// daylight-saving day (23 or 25 hours) still counts as one day.
export function calendarDaysBetween(from, to) {
  return Math.round((parseLocalDate(to) - parseLocalDate(from)) / MS_PER_DAY);
}

export function fmtDate(d) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

// ─── EXAM COUNTDOWN ─────────────────────────────────────────
// Single gate for every "days until exam" display in the app. When the
// upcoming cycle's dates aren't confirmed yet (see data/subjects.js),
// this returns confirmed:false instead of a number, so the UI can show
// "Dates TBA" rather than a stale or negative day count. Once the dates
// are confirmed, every caller of this function resumes real countdowns
// automatically; nothing else needs to change.
export function getExamCountdown(examDate, now = new Date()) {
  if (!EXAM_DATES_CONFIRMED) {
    return { confirmed: false, days: null, label: 'Dates TBA' };
  }
  const days = calendarDaysBetween(now, examDate);
  return { confirmed: true, days, label: `${days}d away` };
}

// ─── TASK IDENTITY ──────────────────────────────────────────
// A task is identified by where it lives in the ORIGINAL subject data
// (week id, day index, task index), never by where it lands in an adapted
// plan. Adapted plans re-slice the same tasks differently for every plan
// length, so a position-based key would point at a different task as soon
// as the plan changed. Every adapted day carries `taskRefs`, parallel to
// `tasks`; a null ref marks a generated task (e.g. a review checklist item)
// that has no saved progress.

export function taskKey(subjectId, ref) {
  return `${subjectId}-${ref.weekId}-${ref.dayIdx}-${ref.taskIdx}`;
}

function refsForDay(weekId, dayIdx, tasks) {
  return tasks.map((_, taskIdx) => ({ weekId, dayIdx, taskIdx }));
}

// Used when a subject has no plan: shows the original weeks as-is, with refs.
export function withOriginalTaskRefs(weeks) {
  return weeks.map(wk => ({
    ...wk,
    _coveredWeekIds: [wk.id],
    _startOffsetDays: null,
    days: wk.days.map((d, di) => ({ ...d, taskRefs: refsForDay(wk.id, di, d.tasks) })),
  }));
}

// Every original task in a subject, for progress totals.
export function allTaskRefs(subject) {
  return subject.weeks.flatMap(wk => wk.days.flatMap((d, di) => refsForDay(wk.id, di, d.tasks)));
}

// ─── PLAN ADAPTATION ────────────────────────────────────────
// Splits a subject's weeks into phases that fill exactly `durationDays`.
// Phase count is derived from how the weeks actually group, so there are
// never empty trailing phases leaving the end of the plan uncovered.
function planShape(numOrigWeeks, durationDays) {
  const requestedPhases = Math.min(Math.max(Math.floor(durationDays / DAYS_PER_WEEK), 1), numOrigWeeks);
  const weeksPerPhase = Math.ceil(numOrigWeeks / requestedPhases);
  const numPhases = Math.ceil(numOrigWeeks / weeksPerPhase);
  const daysPerPhase = durationDays / numPhases;
  return { weeksPerPhase, numPhases, daysPerPhase };
}

export function adaptPlanToWindow(subject, durationDays, startDateStr) {
  const startDate = startDateStr ? parseLocalDate(startDateStr) : parseLocalDate(new Date());
  const origWeeks = subject.weeks;
  const numOrig = origWeeks.length;
  const { weeksPerPhase, numPhases, daysPerPhase } = planShape(numOrig, durationDays);
  const isExpanded = durationDays >= numOrig * DAYS_PER_WEEK;

  const adapted = [];

  for (let p = 0; p < numPhases; p++) {
    const startWkIdx = p * weeksPerPhase;
    const endWkIdx = Math.min(startWkIdx + weeksPerPhase, numOrig);
    const covered = origWeeks.slice(startWkIdx, endWkIdx);

    const startOffsetDays = Math.round(p * daysPerPhase);
    const phaseStart = addDays(startDate, startOffsetDays);
    const phaseEnd = addDays(startDate, Math.round((p + 1) * daysPerPhase) - 1);
    const slots = Math.max(1, Math.round(daysPerPhase));

    let mergedDays = [];

    if (durationDays <= CRASH_COURSE_MAX_DAYS) {
      covered.forEach((wk, wi) => {
        const allTasks = wk.days
          .flatMap((d, di) => d.tasks.map((task, ti) => ({ task, ref: { weekId: wk.id, dayIdx: di, taskIdx: ti } })))
          .slice(0, CRASH_COURSE_TASKS_PER_WEEK);
        mergedDays.push({
          day: `${fmtDate(addDays(phaseStart, wi))} — ${wk.theme}`,
          tasks: allTasks.map(t => t.task),
          taskRefs: allTasks.map(t => t.ref),
          _origWeekId: wk.id,
        });
      });
    } else if (numPhases < numOrig) {
      const allOrigDays = covered.flatMap(wk => wk.days.map((d, di) => ({ ...d, _origWeekId: wk.id, taskRefs: refsForDay(wk.id, di, d.tasks) })));
      const stride = allOrigDays.length / slots;
      const seen = new Set();
      for (let i = 0; i < slots; i++) {
        const idx = Math.min(Math.round(i * stride), allOrigDays.length - 1);
        if (seen.has(idx)) continue;
        seen.add(idx);
        const od = allOrigDays[idx];
        mergedDays.push({
          ...od,
          day: `${fmtDate(addDays(phaseStart, i))}`,
        });
      }
    } else {
      const singleWk = covered[0];
      const gapDays = Math.max(1, Math.floor(daysPerPhase / Math.max(singleWk.days.length, 1)));
      singleWk.days.forEach((d, di) => {
        mergedDays.push({
          ...d,
          day: `${fmtDate(addDays(phaseStart, di * gapDays))}`,
          taskRefs: refsForDay(singleWk.id, di, d.tasks),
          _origWeekId: singleWk.id,
        });
      });
      if (isExpanded && daysPerPhase >= singleWk.days.length + 2) {
        const reviewTasks = [
          `Re-read your notes from ${singleWk.theme}`,
          `Complete AP Classroom Progress Check for this unit`,
          `Write out all Key Rules from memory, then check`,
          `Do 10 mixed MCQs covering this phase's material`,
        ];
        mergedDays.push({
          day: `${fmtDate(addDays(phaseEnd, -1))} — 📖 Review & Self-Test`,
          tasks: reviewTasks,
          taskRefs: reviewTasks.map(() => null),
          _origWeekId: singleWk.id,
        });
      }
    }

    const uniqueRules = [...new Set(covered.flatMap(wk => wk.keyRules || []))].slice(0, MAX_KEY_RULES_PER_PHASE);
    const seenUrls = new Set();
    const uniqueResources = covered.flatMap(wk => wk.resources || []).filter(r => {
      if (seenUrls.has(r.url)) return false;
      seenUrls.add(r.url);
      return true;
    });
    const frq = covered.map(wk => wk.frq).filter(Boolean).pop() || null;
    const tip = covered.map(wk => wk.tip).filter(Boolean).pop() || '';

    let phaseLabel;
    if (durationDays <= CRASH_COURSE_MAX_DAYS) phaseLabel = 'Crash Course';
    else if (numPhases === numOrig) phaseLabel = covered[0].label;
    else phaseLabel = `Phase ${p + 1}`;

    const theme = covered.length === 1
      ? covered[0].theme
      : covered.map(wk => wk.theme.replace(/[🎯]/g, '').trim()).join(' · ').slice(0, 65);

    const examWeight = covered.length === 1
      ? covered[0].examWeight
      : covered.map(w => w.examWeight).join(' + ');

    adapted.push({
      id: p + 1,
      label: phaseLabel,
      dates: `${fmtDate(phaseStart)} – ${fmtDate(phaseEnd)}`,
      theme,
      examWeight,
      color: covered[0].color,
      isExamWeek: covered.some(wk => wk.isExamWeek),
      overview: covered[0].overview,
      days: mergedDays,
      keyRules: uniqueRules,
      resources: uniqueResources,
      frq,
      tip,
      _coveredLabels: covered.map(wk => wk.label),
      _coveredWeekIds: covered.map(wk => wk.id),
      _startOffsetDays: startOffsetDays,
    });
  }

  return adapted;
}

// The phase whose date range contains today. Before the plan starts this is
// the first phase; after it ends, the last. Phases without a start offset
// (a subject with no plan) default to the first.
export function getCurrentPhaseId(adaptedWeeks, planStartDate, now = new Date()) {
  if (!adaptedWeeks.length) return 1;
  if (!planStartDate || adaptedWeeks[0]._startOffsetDays == null) return adaptedWeeks[0].id;
  const elapsed = calendarDaysBetween(planStartDate, now);
  let current = adaptedWeeks[0];
  for (const phase of adaptedWeeks) {
    if (phase._startOffsetDays <= elapsed) current = phase;
  }
  return current.id;
}
