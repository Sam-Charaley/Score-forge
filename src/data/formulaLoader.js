// Each formula sheet at ./formulas/<subjectId>.js becomes its own chunk,
// fetched the first time a student opens that subject on the Formulas screen
// (or searches, which needs every sheet). Files starting with _ hold sections
// shared between subjects and are not sheets themselves.
import { SUBJECT_INDEX } from './subjectIndex'

const sheetModules = import.meta.glob(['./formulas/*.js', '!./formulas/_*.js']);
const pathFor = subjectId => `./formulas/${subjectId}.js`;

// Subjects with a sheet, in the subject index's order.
export const FORMULA_SUBJECTS = SUBJECT_INDEX.filter(meta => sheetModules[pathFor(meta.id)]);

const cache = new Map();

export class FormulaLoadError extends Error {
  constructor(subjectId, cause) {
    // Browsers remember a failed import() for the rest of the page's life, so
    // only a reload can recover (including after a deploy renamed the chunks).
    super('Check your connection, then reload the page.');
    this.name = 'FormulaLoadError';
    this.subjectId = subjectId;
    this.cause = cause;
  }
}

export function hasFormulaSheet(subjectId) {
  return Boolean(sheetModules[pathFor(subjectId)]);
}

// Resolves to the subject's sheet: { subjectId, sheet, sections }.
export function loadFormulaSheet(subjectId) {
  if (cache.has(subjectId)) return cache.get(subjectId);
  const load = sheetModules[pathFor(subjectId)];
  if (!load) return Promise.reject(new RangeError(`No formula sheet for ${subjectId}`));
  const pending = load()
    .then(module => module.default)
    .catch(error => {
      cache.delete(subjectId);
      throw new FormulaLoadError(subjectId, error);
    });
  cache.set(subjectId, pending);
  return pending;
}

export function loadAllFormulaSheets() {
  return Promise.all(FORMULA_SUBJECTS.map(meta => loadFormulaSheet(meta.id)));
}
