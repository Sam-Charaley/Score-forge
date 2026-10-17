import { describe, it, expect } from 'vitest'
import katex from 'katex'
import { buildDrillQuestions, drillProgress, isDrillAttempt, DRILL_TOPIC } from './formulaDrill'
import { formulaScope, formulaIdFromScope, formulasById } from './formulaLinks'

const sheetFiles = import.meta.glob(['../data/formulas/*.js', '!../data/formulas/_*.js'], { eager: true });
const SHEETS = Object.values(sheetFiles).map(m => m.default);

describe.each(SHEETS.map(sheet => [sheet.subjectId, sheet]))('%s formula drill', (subjectId, sheet) => {
  const questions = buildDrillQuestions(sheet);
  const formulaCount = sheet.sections.reduce((n, s) => n + s.formulas.length, 0);

  it('covers nearly every formula on the sheet', () => {
    expect(questions.length).toBeGreaterThanOrEqual(Math.floor(formulaCount * 0.9));
  });

  it('gives each question 4 distinct choices with the formula itself as the answer', () => {
    const all = new Map(sheet.sections.flatMap(s => s.formulas.map(f => [f.id, f])));
    const bad = questions.filter(q => {
      const formula = all.get(q.formulaId);
      return q.choices.length !== 4 || new Set(q.choices).size !== 4 || q.choices[q.answer] !== (formula.code ?? formula.tex);
    });
    expect(bad.map(q => q.id)).toEqual([]);
  });

  it('only mixes math with math and code with code', () => {
    const formulas = sheet.sections.flatMap(s => s.formulas);
    const codes = new Set(formulas.filter(f => f.code).map(f => f.code));
    const texes = new Set(formulas.filter(f => f.tex).map(f => f.tex));
    const bad = questions.filter(q => q.choices.some(c => !(q.choiceFormat === 'code' ? codes : texes).has(c)));
    expect(bad.map(q => q.id)).toEqual([]);
  });

  it('renders every math choice in KaTeX', () => {
    const broken = questions.filter(q => q.choiceFormat === 'tex').flatMap(q => q.choices.filter(c => {
      try { katex.renderToString(c, { throwOnError: true }); return false; } catch { return true; }
    }).map(c => `${q.id}: ${c}`));
    expect(broken).toEqual([]);
  });

  it('builds the same choices every time', () => {
    expect(buildDrillQuestions(sheet)).toEqual(questions);
  });

  it('has unique ids and drill topic, and an explanation for each', () => {
    expect(new Set(questions.map(q => q.id)).size).toBe(questions.length);
    expect(questions.every(q => q.topic === DRILL_TOPIC && q.explanation.length > 20)).toBe(true);
  });
});

describe('drill bookkeeping', () => {
  it('tells drill attempts apart', () => {
    expect(isDrillAttempt({ topic_id: DRILL_TOPIC })).toBe(true);
    expect(isDrillAttempt({ topic_id: 'kinematics' })).toBe(false);
  });

  it('counts formulas whose latest answer was right', () => {
    const questions = [{ id: 'formula:a' }, { id: 'formula:b' }, { id: 'formula:c' }];
    const attempts = [
      { question_id: 'formula:a', correct: false }, { question_id: 'formula:a', correct: true },
      { question_id: 'formula:b', correct: true }, { question_id: 'formula:b', correct: false },
      { question_id: 'formula:gone', correct: true },
    ];
    expect(drillProgress(questions, attempts)).toEqual({ known: 1, total: 3, answers: 4, correct: 2 });
  });
});

describe('formula links', () => {
  it('round-trips a formula scope', () => {
    expect(formulaIdFromScope(formulaScope('kinetic-energy'))).toBe('kinetic-energy');
    expect(formulaIdFromScope('smart')).toBeNull();
    expect(formulaIdFromScope(undefined)).toBeNull();
  });

  it('looks formulas up by id in the given order', () => {
    const sheet = SHEETS.find(s => s.subjectId === 'phys1');
    expect(formulasById(sheet, ['spring-period', 'nope', 'kinetic-energy']).map(f => f.id)).toEqual(['spring-period', 'kinetic-energy']);
  });
});
