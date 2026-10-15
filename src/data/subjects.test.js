import { describe, it, expect } from 'vitest'
import { SUBJECT_INDEX, EXAM_CYCLE_YEAR } from './subjectIndex'
import { loadAllSubjects, loadSubject, SubjectLoadError } from './subjectLoader'

const REQUIRED_INDEX_FIELDS = ['id', 'name', 'shortName', 'color', 'examDate', 'code', 'examInfo'];
const REQUIRED_WEEK_FIELDS = ['id', 'label', 'theme', 'examWeight', 'color', 'overview', 'days'];
// Metadata lives only in the index so there's one place to edit exam dates.
const INDEX_ONLY_FIELDS = REQUIRED_INDEX_FIELDS.filter(f => f !== 'id');

// Week ids a rewritten plan has given up. Saved progress and notes are keyed
// by (subject, week id, day, task), so reusing one would put old checkmarks
// on new tasks. When you rewrite a plan, give it fresh ids and add the old
// ones here.
const RETIRED_WEEK_IDS = {
  phys1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  phys2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

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
  it('has tile codes short enough to print on a subject tile', () => {
    const MAX_WORDS = 2, MAX_WORD_LENGTH = 5;
    const tooLong = SUBJECT_INDEX.filter(({ code }) => {
      const words = code.split(' ');
      return words.length > MAX_WORDS || words.some(w => w.length === 0 || w.length > MAX_WORD_LENGTH);
    }).map(s => `${s.id}: "${s.code}"`);
    expect(tooLong).toEqual([]);
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
    weekIds.forEach(id => expect(Number.isInteger(id), `${subject.id} week id ${id} must be an integer (stored in an integer column)`).toBe(true));
    const retired = new Set(RETIRED_WEEK_IDS[subject.id] ?? []);
    expect(weekIds.filter(id => retired.has(id)), `${subject.id} reuses retired week ids`).toEqual([]);
    for (let i = 0; i < subject.weeks.length; i++) expect(subject.weeks[i], `${subject.id} weeks[${i}]`).toBeTruthy();
    subject.weeks.forEach(week => {
      REQUIRED_WEEK_FIELDS.forEach(f => expect(week[f], `${subject.id} week ${week.id}.${f}`).toBeDefined());
      week.days.forEach((day, di) => {
        expect(typeof day.day, `${subject.id} week ${week.id} day ${di} label`).toBe('string');
        expect(Array.isArray(day.tasks), `${subject.id} week ${week.id} day ${di} tasks`).toBe(true);
      });
    });
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
