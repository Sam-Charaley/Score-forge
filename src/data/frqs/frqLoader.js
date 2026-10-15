// Free-response sets live at ./<subject>.js and load only when opened.
const frqModules = import.meta.glob(['./*.js', '!./frqLoader.js', '!./*.test.js']);

// Unreviewed FRQs never reach production; in local dev they show with a badge.
const INCLUDE_DRAFTS = import.meta.env.DEV;

export function hasFrqs(subjectId) {
  return Boolean(frqModules[`./${subjectId}.js`]);
}

export async function loadFrqs(subjectId, { includeDrafts = INCLUDE_DRAFTS } = {}) {
  const load = frqModules[`./${subjectId}.js`];
  if (!load) return { frqs: [], types: {} };
  const module = await load();
  const frqs = includeDrafts ? module.default : module.default.filter(f => f.reviewed === true);
  return { frqs, types: module.FRQ_TYPES ?? {} };
}

export const pointsPossible = frq => frq.parts.reduce((sum, part) => sum + part.points.length, 0);
