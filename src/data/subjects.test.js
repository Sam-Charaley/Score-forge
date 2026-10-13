import { describe, it, expect } from 'vitest'
import { SUBJECT_INDEX, EXAM_CYCLE_YEAR } from './subjectIndex'
import { loadAllSubjects, loadSubject, SubjectLoadError } from './subjectLoader'
import { FLASHCARDS } from './flashcards'

const REQUIRED_INDEX_FIELDS = ['id', 'name', 'shortName', 'color', 'examDate', 'icon', 'examInfo'];
const REQUIRED_WEEK_FIELDS = ['id', 'label', 'theme', 'examWeight', 'color', 'overview', 'days'];
// Metadata lives only in the index so there's one place to edit exam dates.
const INDEX_ONLY_FIELDS = REQUIRED_INDEX_FIELDS.filter(f => f !== 'id');

const contentFiles = import.meta.glob('./subjects/*.js', { eager: true });
const SUBJECTS = await loadAllSubjects();

// Guards against content-paste mistakes that only show up as runtime crashes.
describe('subject index', () => {
  it('has no empty slots (stray double commas)', () => {
    for (let i = 0; i < SUBJECT_INDEX.length; i++) expect(SUBJECT_INDEX[i], `SUBJECT_INDEX[${i}]`).toBeTruthy();
  });
  it('has unique ids, each with every required field', () => {
    const ids = SUBJECT_INDEX.map(s => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    SUBJECT_INDEX.forEach(meta => REQUIRED_INDEX_FIELDS.forEach(f => expect(meta[f], `${meta.id}.${f}`).toBeDefined()));
  });
  it('exam dates match the cycle year and the date shown in examInfo', () => {
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const problems = SUBJECT_INDEX.filter(({ examDate, examInfo }) => {
      const [year, month, day] = examDate.split('-').map(Number);
      return year !== EXAM_CYCLE_YEAR || !examInfo.startsWith(`${MONTHS[month - 1]} ${day}, ${year} ·`);
    }).map(s => `${s.id}: ${s.examDate} vs "${s.examInfo}"`);
    expect(problems).toEqual([]);
  });

  it('matches the content files one to one', () => {
    const fileIds = Object.keys(contentFiles).map(p => p.match(/\.\/subjects\/(.+)\.js$/)[1]).sort();
    expect(fileIds).toEqual(SUBJECT_INDEX.map(s => s.id).sort());
  });
});

describe('subject content files', () => {
  it.each(Object.entries(contentFiles))('%s: id matches file name, no index-only fields', (filePath, module) => {
    const content = module.default;
    expect(`./subjects/${content.id}.js`).toBe(filePath);
    INDEX_ONLY_FIELDS.forEach(f => expect(content[f], `${content.id} should not repeat "${f}" (it lives in subjectIndex.js)`).toBeUndefined());
  });

  it.each(SUBJECTS.map(s => [s.id, s]))('%s has every required week field', (_, subject) => {
    const weekIds = subject.weeks.map(w => w.id);
    expect(new Set(weekIds).size, `${subject.id} week ids unique`).toBe(weekIds.length);
    for (let i = 0; i < subject.weeks.length; i++) expect(subject.weeks[i], `${subject.id} weeks[${i}]`).toBeTruthy();
    subject.weeks.forEach(week => {
      REQUIRED_WEEK_FIELDS.forEach(f => expect(week[f], `${subject.id} week ${week.id}.${f}`).toBeDefined());
      week.days.forEach((day, di) => {
        expect(typeof day.day, `${subject.id} week ${week.id} day ${di} label`).toBe('string');
        expect(Array.isArray(day.tasks), `${subject.id} week ${week.id} day ${di} tasks`).toBe(true);
      });
    });
  });

  it('only has flashcard decks for real subjects', () => {
    const ids = new Set(SUBJECT_INDEX.map(s => s.id));
    Object.keys(FLASHCARDS).forEach(id => expect(ids.has(id), `flashcards for unknown subject "${id}"`).toBe(true));
  });
});

describe('subjectLoader', () => {
  it('merges index metadata with content', async () => {
    const csa = await loadSubject('csa');
    expect(csa.name).toBe('AP Computer Science A');
    expect(csa.weeks.length).toBeGreaterThan(0);
  });
  it('returns the same cached object on repeat loads', async () => {
    expect(await loadSubject('csa')).toBe(await loadSubject('csa'));
  });
  it('rejects unknown subjects with a SubjectLoadError', async () => {
    await expect(loadSubject('not-a-subject')).rejects.toBeInstanceOf(SubjectLoadError);
  });
});
