// Question files live at ./<subject>/<topic>.js. Each subject's bank is its
// own chunk, downloaded only when that subject's practice screen opens.
const questionModules = import.meta.glob(['./*/*.js', '!./*/topics.js', '!./**/*.test.js']);

export const QUESTION_CHOICE_COUNT = 4;
export const DIFFICULTY_LEVELS = [1, 2, 3];

// Unreviewed questions never reach production. In local dev they're included
// (and badged) so they can be reviewed in the real practice screen.
const INCLUDE_DRAFTS = import.meta.env.DEV;

export async function loadQuestionBank(subjectId, { includeDrafts = INCLUDE_DRAFTS } = {}) {
  const loaders = Object.entries(questionModules).filter(([filePath]) => filePath.startsWith(`./${subjectId}/`));
  const modules = await Promise.all(loaders.map(([, load]) => load()));
  const questions = modules.flatMap(module => module.default);
  return includeDrafts ? questions : questions.filter(q => q.reviewed === true);
}
