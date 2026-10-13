import { describe, it, expect } from 'vitest'
import { SUBJECTS } from './subjects'
import { FLASHCARDS } from './flashcards'

const REQUIRED_SUBJECT_FIELDS = ['id', 'name', 'shortName', 'color', 'examDate', 'icon', 'examInfo', 'weeks'];
const REQUIRED_WEEK_FIELDS = ['id', 'label', 'theme', 'examWeight', 'color', 'overview', 'days'];

// Guards against content-paste mistakes that only show up as runtime crashes.
describe('subject data integrity', () => {
  it('has no empty slots (stray double commas)', () => {
    for (let i = 0; i < SUBJECTS.length; i++) expect(SUBJECTS[i], `SUBJECTS[${i}]`).toBeTruthy();
  });

  it('has unique subject ids', () => {
    const ids = SUBJECTS.map(s => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(SUBJECTS.map(s => [s.id, s]))('%s has every required field', (_, subject) => {
    REQUIRED_SUBJECT_FIELDS.forEach(f => expect(subject[f], `${subject.id}.${f}`).toBeDefined());
    const weekIds = subject.weeks.map(w => w.id);
    expect(new Set(weekIds).size, `${subject.id} week ids unique`).toBe(weekIds.length);
    subject.weeks.forEach(week => {
      REQUIRED_WEEK_FIELDS.forEach(f => expect(week[f], `${subject.id} week ${week.id}.${f}`).toBeDefined());
      week.days.forEach((day, di) => {
        expect(typeof day.day, `${subject.id} week ${week.id} day ${di} label`).toBe('string');
        expect(Array.isArray(day.tasks), `${subject.id} week ${week.id} day ${di} tasks`).toBe(true);
      });
    });
  });

  it('only has flashcard decks for real subjects', () => {
    const ids = new Set(SUBJECTS.map(s => s.id));
    Object.keys(FLASHCARDS).forEach(id => expect(ids.has(id), `flashcards for unknown subject "${id}"`).toBe(true));
  });
});
