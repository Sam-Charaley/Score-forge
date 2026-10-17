// Links between practice questions and formula sheet entries. Questions name
// the formulas they use (q.formulas); the reverse direction is built here.

// Practice scope for "only the questions that use this formula".
const FORMULA_SCOPE_PREFIX = 'formula:';

export const formulaScope = formulaId => `${FORMULA_SCOPE_PREFIX}${formulaId}`;

export function formulaIdFromScope(scope) {
  return typeof scope === 'string' && scope.startsWith(FORMULA_SCOPE_PREFIX) ? scope.slice(FORMULA_SCOPE_PREFIX.length) : null;
}

// Map of formula id → ids of the questions that use it, in bank order.
export function questionsByFormula(questions) {
  const index = new Map();
  for (const question of questions) {
    for (const formulaId of question.formulas ?? []) {
      if (!index.has(formulaId)) index.set(formulaId, []);
      index.get(formulaId).push(question.id);
    }
  }
  return index;
}

// The sheet entries with these ids, in the order given, skipping unknown ids.
export function formulasById(sheet, ids) {
  const all = new Map(sheet.sections.flatMap(section => section.formulas.map(f => [f.id, f])));
  return ids.map(id => all.get(id)).filter(Boolean);
}
