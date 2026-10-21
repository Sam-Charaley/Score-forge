// Second-pass check, step 2: compare a blind solver's answers with the marked
// keys. Every disagreement, and every question left unanswered, is listed;
// those questions must stay drafts until someone works out which is right.
//
// Usage: node scripts/blind-compare.mjs <subject> <answers.json>
//   answers.json: { "<question id>": "A" | "B" | "C" | "D", ... }
// Output: printed, and ../review/blind/<subject>-compare.json
//   { matched: [ids], mismatched: [{ id, key, blind, file }], unanswered: [ids] }
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { loadQuestions, REVIEW_DIR } from './lib/content.mjs';

const BLIND_DIR = path.join(REVIEW_DIR, 'blind');
const CHOICE_LETTERS = ['A', 'B', 'C', 'D'];

async function main() {
  const [subjectId, answersFile] = process.argv.slice(2);
  if (!subjectId || !answersFile) {
    console.error('Usage: node scripts/blind-compare.mjs <subject> <answers.json>');
    process.exit(1);
  }
  let answers;
  try {
    answers = JSON.parse(readFileSync(answersFile, 'utf8'));
  } catch (error) {
    console.error(`Couldn't read ${answersFile}: ${error.message}`);
    process.exit(1);
  }

  const drafts = (await loadQuestions(subjectId)).filter(q => q.reviewed !== true);
  const result = { matched: [], mismatched: [], unanswered: [] };
  for (const q of drafts) {
    const blind = typeof answers[q.id] === 'string' ? answers[q.id].trim().toUpperCase() : null;
    const key = CHOICE_LETTERS[q.answer];
    if (!CHOICE_LETTERS.includes(blind)) result.unanswered.push(q.id);
    else if (blind === key) result.matched.push(q.id);
    else result.mismatched.push({ id: q.id, key, blind, file: q.file });
  }
  const unknownIds = Object.keys(answers).filter(id => !drafts.some(q => q.id === id));

  mkdirSync(BLIND_DIR, { recursive: true });
  const outFile = path.join(BLIND_DIR, `${subjectId}-compare.json`);
  writeFileSync(outFile, `${JSON.stringify(result, null, 2)}\n`);

  console.log(`${subjectId}: ${result.matched.length} match, ${result.mismatched.length} disagree, ${result.unanswered.length} unanswered (of ${drafts.length} drafts)`);
  result.mismatched.forEach(m => console.log(`  ✗ ${m.id}: key ${m.key}, blind ${m.blind}  (${m.file})`));
  if (result.unanswered.length) console.log(`  unanswered: ${result.unanswered.join(', ')}`);
  if (unknownIds.length) console.log(`  ignored ids that aren't drafts: ${unknownIds.join(', ')}`);
  console.log(`Wrote ${outFile}`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
