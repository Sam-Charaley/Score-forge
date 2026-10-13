import { describe, it, expect, vi } from 'vitest'
import { SUBJECTS } from '../data/subjects'
import {
  adaptPlanToWindow, getCurrentPhaseId, withOriginalTaskRefs, allTaskRefs, taskKey,
  parseLocalDate, todayLocalIsoDate, calendarDaysBetween, getExamCountdown,
} from './planEngine'

const PLAN_LENGTHS = Array.from({ length: 120 }, (_, i) => i + 1);
const START = '2026-10-01';

function originalTaskText(subject, ref) {
  return subject.weeks.find(w => w.id === ref.weekId)?.days[ref.dayIdx]?.tasks[ref.taskIdx];
}

describe('task identity in adapted plans', () => {
  it.each(SUBJECTS.map(s => [s.id, s]))('%s: every shown task points at the original task with the same text, for every plan length', (_, subject) => {
    for (const days of PLAN_LENGTHS) {
      for (const phase of adaptPlanToWindow(subject, days, START)) {
        for (const day of phase.days) {
          expect(day.taskRefs).toHaveLength(day.tasks.length);
          day.tasks.forEach((task, i) => {
            const ref = day.taskRefs[i];
            if (ref) expect(originalTaskText(subject, ref)).toBe(task);
          });
        }
      }
    }
  });

  it('no task appears twice within one plan', () => {
    for (const subject of SUBJECTS) {
      for (const days of PLAN_LENGTHS) {
        const keys = adaptPlanToWindow(subject, days, START)
          .flatMap(p => p.days.flatMap(d => d.taskRefs.filter(Boolean).map(r => taskKey(subject.id, r))));
        expect(new Set(keys).size).toBe(keys.length);
      }
    }
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
    for (const subject of SUBJECTS) {
      for (const days of PLAN_LENGTHS) {
        const phases = adaptPlanToWindow(subject, days, START);
        expect(phases.length).toBeGreaterThan(0);
        expect(phases.every(p => p.days.length > 0)).toBe(true);
        const lastStart = phases[phases.length - 1]._startOffsetDays;
        const phaseLength = days / phases.length;
        // The last phase starts one phase-length (give or take rounding) before the plan ends.
        expect(Math.abs(lastStart + phaseLength - days)).toBeLessThanOrEqual(0.5);
      }
    }
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
