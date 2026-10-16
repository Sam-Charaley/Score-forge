// Search across formula sheets. A formula matches when every word of the
// query appears somewhere in its name, section, note, Java code, variable
// meanings or subject name, so "spring period" finds T = 2π√(m/k) without exact phrasing.

// Lowercase, strip accents and apostrophes: "L'Hôpital" and "lhopital" match.
const ACCENTS_AND_APOSTROPHES = /[̀-ͯ'’]/g;
const normalize = text => text.toLowerCase().normalize('NFD').replace(ACCENTS_AND_APOSTROPHES, '');

export function queryWords(query) {
  return normalize(query).split(/[^a-z0-9]+/).filter(Boolean);
}

function haystackFor(formula, section, subjectName) {
  const varMeanings = (formula.vars ?? []).map(([, meaning]) => meaning);
  return normalize([formula.name, section.title, formula.note ?? '', formula.code ?? '', subjectName, ...varMeanings].join(' '));
}

// sheets: [{ subjectId, sections }]; subjectNames: { [subjectId]: name }.
// Returns [{ subjectId, section, formula }] in sheet order, at most `limit`.
export function searchFormulas(sheets, query, subjectNames = {}, limit = 60) {
  const words = queryWords(query);
  if (words.length === 0) return [];
  const results = [];
  for (const sheet of sheets) {
    for (const section of sheet.sections) {
      for (const formula of section.formulas) {
        const haystack = haystackFor(formula, section, subjectNames[sheet.subjectId] ?? '');
        if (words.every(word => haystack.includes(word))) {
          results.push({ subjectId: sheet.subjectId, section, formula });
          if (results.length === limit) return results;
        }
      }
    }
  }
  return results;
}
