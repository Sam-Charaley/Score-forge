import { describe, it, expect, vi } from 'vitest'
import { SUBJECTS } from '../data/subjects'
import {
  adaptPlanToWindow, getCurrentPhaseId, withOriginalTaskRefs, allTaskRefs, taskKey,
  parseLocalDate, todayLocalIsoDate, calendarDaysBetween, getExamCountdown, pickFurthestBehind, scheduleStatus,
} from './planEngine'

const PLAN_LENGTHS = Array.from({ length: 120 }, (_, i) => i + 1);
const START = '2026-10-01';

function originalTaskText(subject, ref) {
  return subject.weeks.find(w => w.id === ref.weekId)?.days[ref.dayIdx]?.tasks[ref.taskIdx];
}

describe('task identity in adapted plans', () => {
  // These sweep every subject x every plan length, so they collect problems
  // and assert once; thousands of individual expect() calls are slow.
  it.each(SUBJECTS.map(s => [s.id, s]))('%s: every shown task points at the original task with the same text, for every plan length', (_, subject) => {
    const problems = [];
    for (const days of PLAN_LENGTHS) {
      for (const phase of adaptPlanToWindow(subject, days, START)) {
        for (const day of phase.days) {
          if (day.taskRefs.length !== day.tasks.length) problems.push(`${days}d: refs/tasks length mismatch on "${day.day}"`);
          day.tasks.forEach((task, i) => {
            const ref = day.taskRefs[i];
            if (ref && originalTaskText(subject, ref) !== task) problems.push(`${days}d: ${JSON.stringify(ref)} -> "${originalTaskText(subject, ref)}" but shows "${task}"`);
          });
        }
      }
    }
    expect(problems).toEqual([]);
  });

  it('no task appears twice within one plan', () => {
    const problems = [];
    for (const subject of SUBJECTS) {
      for (const days of PLAN_LENGTHS) {
        const keys = adaptPlanToWindow(subject, days, START)
          .flatMap(p => p.days.flatMap(d => d.taskRefs.filter(Boolean).map(r => taskKey(subject.id, r))));
        if (new Set(keys).size !== keys.length) problems.push(`${subject.id} ${days}d`);
      }
    }
    expect(problems).toEqual([]);
  });

  it('a tick keeps pointing at the same task when the plan length changes', () => {
    const csa = SUBJECTS.find(s => s.id === 'csa');
    const textByKey = plan => Object.fromEntries(plan.flatMap(p => p.days.flatMap(d =>
      d.tasks.map((t, i) => d.taskRefs[i] && [taskKey('csa', d.taskRefs[i]), t]).filter(Boolean))));
    const short = textByKey(adaptPlanToWindow(csa, 14, START));
    const long = textByKey(adaptPlanToWindow(csa, 90, START));
    const shared = Object.keys(short).filter(k => k in long);
    expect(shared.length).toBeGreaterThan(0);
    shared.forEach(k => expect(long[k]).toBe(short[k]));
  });

  it('generated review tasks have no ref, so they never collide with real progress', () => {
    const csa = SUBJECTS.find(s => s.id === 'csa');
    const review = adaptPlanToWindow(csa, 120, START).flatMap(p => p.days).find(d => d.day.includes('Review & Self-Test'));
    expect(review).toBeDefined();
    expect(review.taskRefs.every(r => r === null)).toBe(true);
  });

  it('unplanned subjects get refs matching the original layout', () => {
    const csa = SUBJECTS.find(s => s.id === 'csa');
    const weeks = withOriginalTaskRefs(csa.weeks);
    expect(weeks[0].days[1].taskRefs[2]).toEqual({ weekId: csa.weeks[0].id, dayIdx: 1, taskIdx: 2 });
    expect(allTaskRefs(csa).length).toBe(csa.weeks.reduce((n, w) => n + w.days.reduce((m, d) => m + d.tasks.length, 0), 0));
  });
});

describe('phase coverage', () => {
  it('phases never leave the end of the plan uncovered', () => {
    const problems = [];
    for (const subject of SUBJECTS) {
      for (const days of PLAN_LENGTHS) {
        const phases = adaptPlanToWindow(subject, days, START);
        if (phases.length === 0 || phases.some(p => p.days.length === 0)) { problems.push(`${subject.id} ${days}d: empty phase`); continue; }
        const lastStart = phases[phases.length - 1]._startOffsetDays;
        const phaseLength = days / phases.length;
        // The last phase starts one phase-length (give or take rounding) before the plan ends.
        if (Math.abs(lastStart + phaseLength - days) > 0.5) problems.push(`${subject.id} ${days}d: last phase starts day ${lastStart}`);
      }
    }
    expect(problems).toEqual([]);
  });

  it('42-day plan for a 10-week course covers all 42 days', () => {
    const csa = SUBJECTS.find(s => s.id === 'csa');
    expect(csa.weeks.length).toBe(10);
    const phases = adaptPlanToWindow(csa, 42, START);
    expect(phases).toHaveLength(5);
    expect(phases.map(p => p._startOffsetDays)).toEqual([0, 8, 17, 25, 34]);
  });
});

describe('getCurrentPhaseId', () => {
  const csa = SUBJECTS.find(s => s.id === 'csa');
  const phases = adaptPlanToWindow(csa, 42, START);
  const on = iso => parseLocalDate(iso);

  it('is phase 1 on day 0 and day 3 (old code said phase 4 on day 3)', () => {
    expect(getCurrentPhaseId(phases, START, on('2026-10-01'))).toBe(1);
    expect(getCurrentPhaseId(phases, START, on('2026-10-04'))).toBe(1);
  });
  it('moves to the next phase exactly on its start day', () => {
    expect(getCurrentPhaseId(phases, START, on('2026-10-08'))).toBe(1);
    expect(getCurrentPhaseId(phases, START, on('2026-10-09'))).toBe(2);
  });
  it('clamps before the start and after the end', () => {
    expect(getCurrentPhaseId(phases, START, on('2026-09-01'))).toBe(1);
    expect(getCurrentPhaseId(phases, START, on('2027-01-01'))).toBe(5);
  });
  it('returns the first week when there is no plan', () => {
    expect(getCurrentPhaseId(withOriginalTaskRefs(csa.weeks), null)).toBe(csa.weeks[0].id);
  });
});

describe('local dates', () => {
  it('parses YYYY-MM-DD as local midnight, not UTC', () => {
    const d = parseLocalDate('2026-10-12');
    expect([d.getFullYear(), d.getMonth(), d.getDate(), d.getHours()]).toEqual([2026, 9, 12, 0]);
  });
  it("today's date is the local calendar day, even late in the evening", () => {
    expect(todayLocalIsoDate(new Date(2026, 9, 12, 23, 30))).toBe('2026-10-12');
  });
  it('counts calendar days across a daylight-saving change', () => {
    expect(calendarDaysBetween('2026-10-31', '2026-11-02')).toBe(2);
  });
  it('plan phase dates start on the stored start day', () => {
    const csa = SUBJECTS.find(s => s.id === 'csa');
    expect(adaptPlanToWindow(csa, 42, '2026-10-12')[0].dates.startsWith('Oct 12')).toBe(true);
  });
});

describe('getExamCountdown', () => {
  it('reports TBA while dates are unconfirmed', () => {
    expect(getExamCountdown('2027-05-14')).toEqual({ confirmed: false, days: null, label: 'Dates TBA' });
  });
  it('counts calendar days once dates are confirmed', async () => {
    vi.resetModules();
    vi.doMock('../data/subjects', () => ({ EXAM_DATES_CONFIRMED: true }));
    const { getExamCountdown: confirmedCountdown } = await import('./planEngine');
    expect(confirmedCountdown('2027-05-14', new Date(2027, 4, 4, 22, 0)).days).toBe(10);
    vi.doUnmock('../data/subjects');
  });
});

describe('pickFurthestBehind', () => {
  const csa = SUBJECTS.find(s => s.id === 'csa');
  const psych = SUBJECTS.find(s => s.id === 'psych');
  const plans = { csa: { durationDays: 40, startDate: '2026-10-01' }, psych: { durationDays: 40, startDate: '2026-10-01' } };
  const day20 = parseLocalDate('2026-10-21');
  const tickFirst = (subject, share) => {
    const refs = adaptPlanToWindow(subject, 40, '2026-10-01').flatMap(p => p.days.flatMap(d => d.taskRefs.filter(Boolean)));
    return Object.fromEntries(refs.slice(0, Math.round(refs.length * share)).map(r => [taskKey(subject.id, r), true]));
  };

  it('picks the subject with the biggest gap between time used and tasks done', () => {
    const checked = { ...tickFirst(csa, 0.5), ...tickFirst(psych, 0.1) };
    const pick = pickFurthestBehind([csa, psych], plans, checked, day20);
    expect(pick.subject.id).toBe('psych');
    expect(pick.timeShare).toBeCloseTo(0.5);
    expect(pick.doneShare).toBeCloseTo(0.1, 1);
  });
  it('breaks ties by list order', () => {
    expect(pickFurthestBehind([csa, psych], plans, {}, day20).subject.id).toBe('csa');
    expect(pickFurthestBehind([psych, csa], plans, {}, day20).subject.id).toBe('psych');
  });
  it('ignores subjects without a plan and returns null when none are planned', () => {
    expect(pickFurthestBehind([csa, psych], { psych: plans.psych }, {}, day20).subject.id).toBe('psych');
    expect(pickFurthestBehind([csa, psych], {}, {}, day20)).toBeNull();
  });
  it('caps time used at 100% after the plan ends and 0% before it starts', () => {
    expect(scheduleStatus(csa, plans.csa, {}, parseLocalDate('2027-03-01')).timeShare).toBe(1);
    expect(scheduleStatus(csa, plans.csa, {}, parseLocalDate('2026-09-01')).timeShare).toBe(0);
  });
});
