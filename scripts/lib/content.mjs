// Reads question and FRQ content under plain Node, for the review, count and
// blind-check scripts. The app's loaders use Vite's import.meta.glob, which
// Node can't run, so these mirror them: a subject's bank is its own folder
// plus any shared folders (sharedFolders.js), minus questions onlyIn another
// subject.
import { readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { foldersFor } from '../../src/data/questions/sharedFolders.js';

export const QUESTIONS_ROOT = path.resolve('src/data/questions');
export const FRQS_ROOT = path.resolve('src/data/frqs');
// Review and blind-check output lives next to the repo, never in it.
export const REVIEW_DIR = path.resolve('..', 'review');

const importFile = file => import(pathToFileURL(file));

// Subjects with a question bank: the folders that have a topics.js.
export function bankSubjects() {
  return readdirSync(QUESTIONS_ROOT, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && existsSync(path.join(QUESTIONS_ROOT, entry.name, 'topics.js')))
    .map(entry => entry.name)
    .sort();
}

// Subjects with an FRQ set: every frqs/<subject>.js except the loader and tests.
export function frqSubjects() {
  return readdirSync(FRQS_ROOT)
    .filter(file => file.endsWith('.js') && file !== 'frqLoader.js' && !file.endsWith('.test.js'))
    .map(file => file.slice(0, -3))
    .sort();
}

// Every question in a subject's bank, each tagged with the file it lives in.
export async function loadQuestions(subjectId) {
  const questions = [];
  for (const folder of foldersFor(subjectId)) {
    const dir = path.join(QUESTIONS_ROOT, folder);
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir).sort()) {
      if (file === 'topics.js' || !file.endsWith('.js') || file.endsWith('.test.js')) continue;
      const module = await importFile(path.join(dir, file));
      questions.push(...module.default
        .filter(q => !q.onlyIn || q.onlyIn === subjectId)
        .map(q => ({ ...q, file: `${folder}/${file}` })));
    }
  }
  return questions;
}

export async function loadTopicNames(subjectId) {
  const file = path.join(QUESTIONS_ROOT, subjectId, 'topics.js');
  if (!existsSync(file)) return new Map();
  const { default: map } = await importFile(file);
  return new Map(map.topics.map(t => [t.id, t.name]));
}

export async function loadFrqSet(subjectId) {
  const file = path.join(FRQS_ROOT, `${subjectId}.js`);
  if (!existsSync(file)) return { frqs: [], types: {} };
  const module = await importFile(file);
  return { frqs: module.default, types: module.FRQ_TYPES ?? {} };
}
