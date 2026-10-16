import { describe, it, expect } from 'vitest'
import katex from 'katex'
import { SUBJECT_INDEX } from './subjectIndex'
import { FORMULA_SUBJECTS, hasFormulaSheet, loadFormulaSheet } from './formulaLoader'
import { searchFormulas, queryWords } from '../utils/formulaSearch'

const modules = import.meta.glob(['./formulas/*.js', '!./formulas/_*.js'], { eager: true });
const SHEETS = Object.entries(modules).map(([path, module]) => ({ file: path.match(/\/([^/]+)\.js$/)[1], ...module.default }));
const KNOWN_SUBJECT_IDS = new Set(SUBJECT_INDEX.map(meta => meta.id));
const ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
// Sam's house style: no em or en dashes in anything students read.
const DASHES = /[–—]/;

const renders = tex => {
  katex.renderToString(tex, { throwOnError: true, strict: 'error' });
  return true;
};

describe.each(SHEETS.map(sheet => [sheet.file, sheet]))('%s formula sheet', (file, sheet) => {
  const formulas = sheet.sections.flatMap(section => section.formulas.map(formula => ({ section, formula })));

  it('belongs to a known subject named by its file', () => {
    expect(sheet.subjectId).toBe(file);
    expect(KNOWN_SUBJECT_IDS.has(sheet.subjectId)).toBe(true);
  });

  it('says whether the exam gives a sheet, and links to it when it does', () => {
    expect(typeof sheet.sheet.given).toBe('boolean');
    expect(sheet.sheet.label.length).toBeGreaterThan(10);
    if (sheet.sheet.given) expect(sheet.sheet.url).toMatch(/^https:\/\/apcentral\.collegeboard\.org\/.+\.pdf$/);
  });

  it('has unique, well-formed section and formula ids', () => {
    const sectionIds = sheet.sections.map(s => s.id);
    const formulaIds = formulas.map(({ formula }) => formula.id);
    expect(new Set(sectionIds).size).toBe(sectionIds.length);
    expect(new Set(formulaIds).size).toBe(formulaIds.length);
    expect([...sectionIds, ...formulaIds].filter(id => !ID_PATTERN.test(id))).toEqual([]);
  });

  it('has no empty sections and no leftover onlyIn filters', () => {
    expect(sheet.sections.filter(s => s.formulas.length === 0).map(s => s.id)).toEqual([]);
    expect(formulas.filter(({ formula }) => formula.onlyIn && formula.onlyIn !== sheet.subjectId).map(({ formula }) => formula.id)).toEqual([]);
  });

  it('renders every formula and symbol in KaTeX', () => {
    const broken = [];
    for (const { formula } of formulas) {
      for (const tex of [formula.tex, ...formula.vars.map(([symbol]) => symbol)]) {
        try { renders(tex); } catch (error) { broken.push(`${formula.id}: ${tex} (${error.message.split('\n')[0]})`); }
      }
    }
    expect(broken).toEqual([]);
  });

  it('gives every formula a name, and every variable a meaning', () => {
    const bad = formulas.filter(({ formula }) =>
      !formula.name?.trim() || !Array.isArray(formula.vars) ||
      formula.vars.some(v => v.length !== 3 || !v[0] || !v[1]?.trim() || typeof v[2] !== 'string'));
    expect(bad.map(({ formula }) => formula.id)).toEqual([]);
  });

  it('only marks memorize on subjects whose exam gives a sheet', () => {
    // Without a sheet everything is memorize, so the flag would mean nothing.
    if (sheet.sheet.given) return;
    expect(formulas.filter(({ formula }) => formula.memorize).map(({ formula }) => formula.id)).toEqual([]);
  });

  it('uses no em or en dashes in student-facing text', () => {
    const texts = [sheet.sheet.label, ...sheet.sections.map(s => s.title), ...formulas.flatMap(({ formula }) => [formula.name, formula.note ?? '', ...formula.vars.map(v => v[1])])];
    expect(texts.filter(t => DASHES.test(t))).toEqual([]);
  });
});

describe('formula loader', () => {
  it('lists exactly the subjects with a sheet file, in subject index order', () => {
    expect(FORMULA_SUBJECTS.map(m => m.id).sort()).toEqual(SHEETS.map(s => s.subjectId).sort());
    const order = SUBJECT_INDEX.map(m => m.id);
    const ids = FORMULA_SUBJECTS.map(m => m.id);
    expect(ids).toEqual([...ids].sort((a, b) => order.indexOf(a) - order.indexOf(b)));
  });

  it('does not treat shared section files as sheets', () => {
    expect(hasFormulaSheet('_calc')).toBe(false);
    expect(FORMULA_SUBJECTS.some(m => m.id.startsWith('_'))).toBe(false);
  });

  it('loads a sheet and rejects a subject without one', async () => {
    await expect(loadFormulaSheet('phys1')).resolves.toMatchObject({ subjectId: 'phys1' });
    await expect(loadFormulaSheet('apush')).rejects.toThrow(/No formula sheet/);
  });
});

describe('Calculus AB and BC sharing', () => {
  const ab = SHEETS.find(s => s.subjectId === 'calcab');
  const bc = SHEETS.find(s => s.subjectId === 'calcbc');
  const idsOf = sheet => new Set(sheet.sections.flatMap(s => s.formulas.map(f => f.id)));

  it('gives BC every AB formula', () => {
    const bcIds = idsOf(bc);
    expect([...idsOf(ab)].filter(id => !bcIds.has(id))).toEqual([]);
  });

  it('keeps BC-only formulas out of AB', () => {
    const abIds = idsOf(ab);
    for (const id of ['integration-by-parts', 'partial-fractions', 'improper-integral', 'euler', 'logistic', 'arc-length', 'polar-area', 'ratio-test']) {
      expect(abIds.has(id), id).toBe(false);
    }
  });
});

describe('searchFormulas', () => {
  const sheets = SHEETS;
  const names = Object.fromEntries(SUBJECT_INDEX.map(m => [m.id, m.shortName]));

  it('splits a query into lowercase words', () => {
    expect(queryWords('  Spring  PERIOD! ')).toEqual(['spring', 'period']);
    expect(queryWords('L\'Hôpital')).toEqual(['lhopital']);
  });

  it('needs every word to match, in any field', () => {
    const results = searchFormulas(sheets, 'spring period', names);
    expect(results.map(r => r.formula.id)).toContain('spring-period');
    expect(results.every(r => /spring/i.test(r.formula.name + r.formula.note + r.section.title + r.formula.vars.flat().join(' ')))).toBe(true);
  });

  it('matches accents loosely and by subject name', () => {
    expect(searchFormulas(sheets, 'lhopital', names).map(r => r.formula.id)).toContain('lhopital');
    expect(searchFormulas(sheets, "L'Hôpital's rule", names).map(r => r.formula.id)).toContain('lhopital');
    expect(searchFormulas(sheets, 'calc bc taylor', names).every(r => r.subjectId === 'calcbc')).toBe(true);
  });

  it('returns nothing for an empty query and respects the limit', () => {
    expect(searchFormulas(sheets, '   ', names)).toEqual([]);
    expect(searchFormulas(sheets, 'the', names, 5)).toHaveLength(5);
  });
});
