import { describe, it, expect } from 'vitest'
import { foldersFor } from './questionLoader'
import { questionsByFormula } from '../../utils/formulaLinks'

// A question's `formulas` list names entries on its subject's formula sheet,
// which the Formulas screen and the after-answer chips look up by id. A shared
// question (Calculus AB and BC) must resolve in every subject that loads it.
const questionFiles = import.meta.glob(['./*/*.js', '!./*/topics.js', '!./**/*.test.js'], { eager: true });
const topicFiles = import.meta.glob('./*/topics.js', { eager: true });
const sheetFiles = import.meta.glob(['../formulas/*.js', '!../formulas/_*.js'], { eager: true });

const sheets = Object.fromEntries(Object.values(sheetFiles).map(m => [m.default.subjectId, m.default]));
const formulaIds = subjectId => new Set(sheets[subjectId]?.sections.flatMap(s => s.formulas.map(f => f.id)) ?? []);
const SUBJECTS = Object.keys(topicFiles).map(path => path.split('/')[1]);

function questionsFor(subjectId) {
  const folders = new Set(foldersFor(subjectId));
  return Object.entries(questionFiles)
    .filter(([path]) => folders.has(path.split('/')[1]))
    .flatMap(([, m]) => m.default)
    .filter(q => !q.onlyIn || q.onlyIn === subjectId);
}

describe.each(SUBJECTS.map(id => [id]))('%s question formula links', subjectId => {
  const questions = questionsFor(subjectId);
  const tagged = questions.filter(q => q.formulas !== undefined);

  it('lists formulas as a non-empty array of distinct ids', () => {
    const bad = tagged.filter(q => !Array.isArray(q.formulas) || q.formulas.length === 0 || new Set(q.formulas).size !== q.formulas.length || q.formulas.some(id => typeof id !== 'string'));
    expect(bad.map(q => q.id)).toEqual([]);
  });

  it('only links formulas on this subject\'s sheet', () => {
    if (tagged.length === 0) return;
    const known = formulaIds(subjectId);
    expect(known.size, `${subjectId} has tagged questions but no formula sheet`).toBeGreaterThan(0);
    const missing = tagged.flatMap(q => q.formulas.filter(id => !known.has(id)).map(id => `${q.id} → ${id}`));
    expect(missing).toEqual([]);
  });
});

describe('questionsByFormula', () => {
  it('indexes question ids under each formula they use, in bank order', () => {
    const index = questionsByFormula([
      { id: 'a', formulas: ['k', 'p'] }, { id: 'b' }, { id: 'c', formulas: ['k'] },
    ]);
    expect(index.get('k')).toEqual(['a', 'c']);
    expect(index.get('p')).toEqual(['a']);
    expect(index.has('b')).toBe(false);
  });
});
