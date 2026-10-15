import { describe, it, expect } from 'vitest'
import { buildWorldLanguageWeeks, COURSE_PROJECT, EXAM_FORMATS } from './project'
import spanish from '../subjects/spanish'
import french from '../subjects/french'
import chinese from '../subjects/chinese'
import japanese from '../subjects/japanese'

const PLANS = { spanish, french, chinese, japanese };
const PROJECT_WEEK_COUNT = 3;
const allText = week => JSON.stringify(week);

describe.each(Object.entries(PLANS))('%s world language plan', (id, plan) => {
  it('has ten weeks with ids 201-210, ending in exam week', () => {
    expect(plan.weeks.map(w => w.id)).toEqual([201, 202, 203, 204, 205, 206, 207, 208, 209, 210]);
    expect(plan.weeks.at(-1).isExamWeek).toBe(true);
    expect(plan.weeks.filter(w => w.isExamWeek)).toHaveLength(1);
  });

  it('puts the project in weeks 2-4, each naming the outline deadline', () => {
    const projectWeeks = plan.weeks.slice(1, 1 + PROJECT_WEEK_COUNT);
    projectWeeks.forEach(week => {
      expect(week.theme).toMatch(/^Course Project/);
      expect(allText(week)).toContain(COURSE_PROJECT.outlineDeadline);
    });
  });

  it('describes the writing tasks of its own exam format', () => {
    const examWeek = allText(plan.weeks.at(-1));
    if (id === 'spanish' || id === 'french') expect(examWeek).toContain('argumentative essay');
    else expect(examWeek).toMatch(/story narration.*email response/);
  });

  it('contains no task that was removed from the exam', () => {
    expect(plan.weeks.map(allText).join(' ')).not.toMatch(/cultural comparison|simulated conversation|text chat|interpersonal writing/i);
  });

  it('leaves no placeholder unfilled', () => {
    expect(plan.weeks.map(allText).join(' ')).not.toMatch(/undefined|\[object Object\]/);
  });
});

describe('buildWorldLanguageWeeks', () => {
  it('rejects an unknown exam format', () => {
    expect(() => buildWorldLanguageWeeks({ name: 'Klingon', examFormat: 'oral' })).toThrow(/Unknown exam format/);
  });

  it('defines both exam formats with every field the weeks use', () => {
    Object.values(EXAM_FORMATS).forEach(format => {
      expect(format.listening).toMatch(/25 listening questions/);
      expect(format.writingTasks.length).toBeGreaterThan(0);
      expect(format.writingSummary.length).toBeGreaterThan(0);
      expect(format.freeResponseCount).toBeGreaterThanOrEqual(3);
    });
  });
});
