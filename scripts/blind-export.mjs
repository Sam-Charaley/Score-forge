// Second-pass check, step 1: export a subject's draft questions with the
// answer, explanation and solve() stripped out, so a checker can solve each
// one cold and its answers can be compared with the marked keys.
//
// Usage: node scripts/blind-export.mjs <subject>
// Output: ../review/blind/<subject>-questions.json (outside the repo)
//   [{ id, topic, difficulty, stimulus?, prompt, figure?, setup?, code?, choiceFormat?, choices: { A, B, C, D } }]
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { loadQuestions, REVIEW_DIR } from './lib/content.mjs';

export const BLIND_DIR = path.join(REVIEW_DIR, 'blind');
export const CHOICE_LETTERS = ['A', 'B', 'C', 'D'];

// Only what a student sees. Anything that hints at the key stays out:
// answer, explanation, solve, verify, tolerance and the reviewed flag.
function blindQuestion(q) {
  const shown = { id: q.id, topic: q.topic, difficulty: q.difficulty };
  if (q.stimulus) shown.stimulus = q.stimulus;
  shown.prompt = q.prompt;
  if (q.figure) shown.figure = q.figure;
  if (q.setup) shown.setup = q.setup;
  if (q.code) shown.code = q.code;
  if (q.choiceFormat) shown.choiceFormat = q.choiceFormat;
  if (q.calculator) shown.calculator = true;
  shown.choices = Object.fromEntries(q.choices.map((choice, i) => [CHOICE_LETTERS[i], choice]));
  return shown;
}

async function main() {
  const subjectId = process.argv[2];
  if (!subjectId) {
    console.error('Usage: node scripts/blind-export.mjs <subject>');
    process.exit(1);
  }
  const drafts = (await loadQuestions(subjectId)).filter(q => q.reviewed !== true);
  if (drafts.length === 0) {
    console.error(`No draft questions for "${subjectId}".`);
    process.exit(1);
  }
  mkdirSync(BLIND_DIR, { recursive: true });
  const outFile = path.join(BLIND_DIR, `${subjectId}-questions.json`);
  writeFileSync(outFile, `${JSON.stringify(drafts.map(blindQuestion), null, 2)}\n`);
  console.log(`Wrote ${drafts.length} blind questions to ${outFile}`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
