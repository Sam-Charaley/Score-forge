// Question files live at ./<folder>/<topic>.js. A subject's bank is its own
// folder plus any shared folders it draws from, each loaded as its own chunk
// the first time that subject's practice screen opens.
const questionModules = import.meta.glob(['./*/*.js', '!./*/topics.js', '!./**/*.test.js']);
const topicModules = import.meta.glob('./*/topics.js');

import { foldersFor } from './sharedFolders'

export { SHARED_FOLDERS, foldersFor } from './sharedFolders'

export const QUESTION_CHOICE_COUNT = 4;
export const DIFFICULTY_LEVELS = [1, 2, 3];

const folderOf = filePath => filePath.split('/')[1];

// Unreviewed questions never reach production. In local dev they're included
// (and badged) so they can be reviewed in the real practice screen.
const INCLUDE_DRAFTS = import.meta.env.DEV;

// Synchronous: only checks which subjects have question files, without loading them.
export function hasQuestionBank(subjectId) {
  const folders = new Set(foldersFor(subjectId));
  return Boolean(topicModules[`./${subjectId}/topics.js`]) && Object.keys(questionModules).some(filePath => folders.has(folderOf(filePath)));
}

export async function loadQuestionBank(subjectId, { includeDrafts = INCLUDE_DRAFTS } = {}) {
  const folders = new Set(foldersFor(subjectId));
  const loaders = Object.entries(questionModules).filter(([filePath]) => folders.has(folderOf(filePath)));
  const modules = await Promise.all(loaders.map(([, load]) => load()));
  const questions = modules.flatMap(module => module.default).filter(q => !q.onlyIn || q.onlyIn === subjectId);
  return includeDrafts ? questions : questions.filter(q => q.reviewed === true);
}

// { units, topics } for a subject's question bank.
export async function loadTopicMap(subjectId) {
  const load = topicModules[`./${subjectId}/topics.js`];
  if (!load) throw new Error(`No topic list for ${subjectId}.`);
  return (await load()).default;
}
