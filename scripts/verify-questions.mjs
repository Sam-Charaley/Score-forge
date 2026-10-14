// Checks question answer keys by running the Java.
// For every question marked verify: 'output', its code is compiled and run,
// and what it prints must equal the marked answer choice.
// Usage: npm run verify:questions   (needs a JDK: javac and java on PATH)
import { readdirSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const QUESTIONS_ROOT = path.resolve('src/data/questions');
const RUN_TIMEOUT_MS = 10000;

function hasJdk() {
  try { execFileSync('javac', ['-version'], { stdio: 'ignore' }); return true; } catch { return false; }
}

async function loadQuestions() {
  const all = [];
  // Subject banks are the folders; files at this level (the loader, its tests) are skipped.
  const subjects = readdirSync(QUESTIONS_ROOT, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => entry.name);
  for (const subject of subjects) {
    for (const file of readdirSync(path.join(QUESTIONS_ROOT, subject))) {
      if (file === 'topics.js' || file.endsWith('.test.js') || !file.endsWith('.js')) continue;
      const module = await import(pathToFileURL(path.join(QUESTIONS_ROOT, subject, file)));
      all.push(...module.default.map(q => ({ ...q, file: `${subject}/${file}` })));
    }
  }
  return all;
}

// A question's setup is the code it shows before the snippet: either whole
// classes (placed beside Main, since only Main may be public) or methods and
// fields (placed inside Main, so the snippet can call them directly).
const CLASS_DECLARATION = /^\s*(public\s+)?(abstract\s+)?class\s/m;

export function buildJavaSource(code, setup = '') {
  const declaresClasses = CLASS_DECLARATION.test(setup);
  const topLevel = declaresClasses ? setup.replace(/^(\s*)public\s+(?=(abstract\s+)?class\s)/gm, '$1') : '';
  const members = declaresClasses ? '' : setup;
  // java.util covers ArrayList and friends; AP code assumes those imports.
  return `import java.util.*;\n\n${topLevel}\n\npublic class Main {\n${members}\n    public static void main(String[] args) {\n${code}\n    }\n}\n`;
}

function runJava(code, setup) {
  const dir = mkdtempSync(path.join(tmpdir(), 'sf-q-'));
  try {
    const source = buildJavaSource(code, setup);
    writeFileSync(path.join(dir, 'Main.java'), source);
    execFileSync('javac', ['Main.java'], { cwd: dir, stdio: 'pipe', timeout: RUN_TIMEOUT_MS });
    return execFileSync('java', ['-cp', dir, 'Main'], { cwd: dir, encoding: 'utf8', timeout: RUN_TIMEOUT_MS, stdio: ['ignore', 'pipe', 'pipe'] });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

if (!hasJdk()) {
  console.error('No JDK found (javac is not on PATH). Install one, e.g. `brew install openjdk`, then rerun.');
  process.exit(2);
}

const questions = (await loadQuestions()).filter(q => q.verify === 'output');
let failures = 0;
for (const q of questions) {
  let printed;
  try {
    printed = runJava(q.code, q.setup).trim();
  } catch (error) {
    failures++;
    console.log(`✗ ${q.id} (${q.file}): did not compile or run\n${String(error.stderr || error.message).trim()}\n`);
    continue;
  }
  const expected = q.choices[q.answer].trim();
  if (printed === expected) {
    console.log(`✓ ${q.id}  prints ${JSON.stringify(printed)}`);
  } else {
    failures++;
    console.log(`✗ ${q.id} (${q.file}): prints ${JSON.stringify(printed)} but the answer is ${JSON.stringify(expected)}`);
  }
}
console.log(`\n${questions.length - failures}/${questions.length} answer keys confirmed by running the code.`);
process.exit(failures === 0 ? 0 : 1);
