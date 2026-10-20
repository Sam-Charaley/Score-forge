import { describe, it, expect } from 'vitest'
import { loadQuestionBank, loadTopicMap, foldersFor, QUESTION_CHOICE_COUNT, DIFFICULTY_LEVELS } from './questionLoader'
import { figureProblems, sourceProblems } from './contentChecks'

const files = import.meta.glob(['./*/*.js', '!./*/topics.js'], { eager: true });
const topicFiles = import.meta.glob('./*/topics.js');
// A subject has a bank when it has a topic map; its questions may come from
// shared folders too (see SHARED_FOLDERS in questionLoader.js).
const SUBJECTS = Object.keys(topicFiles).map(p => p.split('/')[1]);
const FOLDERS = [...new Set(Object.keys(files).map(p => p.split('/')[1]))];
const VERIFY_KINDS = ['output', 'numeric', 'exact'];

describe('question folders', () => {
  it('every folder of questions belongs to at least one subject\'s bank', () => {
    const used = new Set(SUBJECTS.flatMap(foldersFor));
    expect(FOLDERS.filter(folder => !used.has(folder))).toEqual([]);
  });
  it('onlyIn names a subject that loads the question', () => {
    const problems = Object.entries(files).flatMap(([filePath, module]) => module.default
      .filter(q => q.onlyIn !== undefined && !(SUBJECTS.includes(q.onlyIn) && foldersFor(q.onlyIn).includes(filePath.split('/')[1])))
      .map(q => `${q.id}: onlyIn "${q.onlyIn}"`));
    expect(problems).toEqual([]);
  });
});

describe.each(SUBJECTS)('%s question bank', subjectId => {
  it('every topic belongs to a real unit and has a unique id', async () => {
    const { units, topics } = await loadTopicMap(subjectId);
    const unitIds = new Set(units.map(u => u.id));
    expect(topics.filter(t => !unitIds.has(t.unit))).toEqual([]);
    expect(new Set(topics.map(t => t.id)).size).toBe(topics.length);
  });

  // The predicted score needs this; without it the bank shows no score at all.
  it('has an exam model with section weights and cut points', async () => {
    const { exam } = await loadTopicMap(subjectId);
    expect(exam).toBeDefined();
    expect(exam.sections.mcq + exam.sections.frq).toBeCloseTo(1);
    expect(exam.cuts.map(c => c.score)).toEqual([5, 4, 3, 2, 1]);
    const shares = exam.cuts.map(c => c.minShare);
    expect(shares.every((share, i) => i === 0 || share < shares[i - 1])).toBe(true);
    expect(shares.at(-1)).toBe(0);
    expect(exam.source).toBeTruthy();
  });

  it('every question id is unique', async () => {
    const ids = (await loadQuestionBank(subjectId, { includeDrafts: true })).map(q => q.id);
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([]);
  });

  it('every question is well formed and matches its file', async () => {
    const { topics } = await loadTopicMap(subjectId);
    const topicIds = new Set(topics.map(t => t.id));
    const folders = foldersFor(subjectId);
    const problems = [];
    Object.entries(files).filter(([p]) => folders.includes(p.split('/')[1])).forEach(([filePath, module]) => {
      const folder = filePath.split('/')[1];
      const fileTopic = filePath.match(/\/([^/]+)\.js$/)[1];
      // The id names the folder the question lives in, which for shared
      // questions is not the subject being practiced.
      const idPattern = new RegExp(`^${folder}-${fileTopic}-\\d{3}$`);
      module.default.filter(q => !q.onlyIn || q.onlyIn === subjectId).forEach((q, i) => {
        const where = `${folder}/${fileTopic}: ${q.id ?? `#${i}`}`;
        if (!idPattern.test(q.id ?? '')) problems.push(`${where}: id should look like ${folder}-${fileTopic}-001`);
        if (q.topic !== fileTopic) problems.push(`${where}: topic "${q.topic}" but file is ${fileTopic}.js`);
        if (!topicIds.has(q.topic)) problems.push(`${where}: unknown topic "${q.topic}"`);
        if (!DIFFICULTY_LEVELS.includes(q.difficulty)) problems.push(`${where}: difficulty must be 1, 2 or 3`);
        if (!q.prompt?.trim()) problems.push(`${where}: missing prompt`);
        if (!q.explanation?.trim()) problems.push(`${where}: missing explanation`);
        if (!Array.isArray(q.choices) || q.choices.length !== QUESTION_CHOICE_COUNT) problems.push(`${where}: needs exactly ${QUESTION_CHOICE_COUNT} choices`);
        else {
          if (q.choices.some(c => typeof c !== 'string' || !c.trim())) problems.push(`${where}: empty choice`);
          if (new Set(q.choices.map(c => c.trim())).size !== q.choices.length) problems.push(`${where}: duplicate choices`);
        }
        if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= QUESTION_CHOICE_COUNT) problems.push(`${where}: answer must be a choice index 0-3`);
        if (typeof q.reviewed !== 'boolean') problems.push(`${where}: reviewed must be true or false`);
        if (q.verify !== undefined && !VERIFY_KINDS.includes(q.verify)) problems.push(`${where}: verify must be one of ${VERIFY_KINDS.join(', ')}, or absent`);
        if (q.verify === 'output' && !q.code?.trim()) problems.push(`${where}: verify 'output' needs code`);
        if ((q.verify === 'numeric' || q.verify === 'exact') && typeof q.solve !== 'function') problems.push(`${where}: verify '${q.verify}' needs a solve() function`);
        if (q.solve !== undefined && q.verify !== 'numeric' && q.verify !== 'exact') problems.push(`${where}: solve() is only checked with verify: 'numeric' or 'exact'`);
        if (q.calculator !== undefined && q.calculator !== true) problems.push(`${where}: calculator must be true or absent`);
        if (q.tolerance !== undefined && !(q.tolerance > 0 && q.tolerance < 0.01)) problems.push(`${where}: tolerance must be a small positive number`);
        if (q.setup !== undefined && (typeof q.setup !== 'string' || !q.setup.trim())) problems.push(`${where}: setup must be non-empty code if present`);
        if (q.fixedOrder !== undefined && q.fixedOrder !== true) problems.push(`${where}: fixedOrder must be true or absent`);
        if (q.figure !== undefined) problems.push(...figureProblems(q.figure).map(p => `${where}: figure ${p}`));
        if (q.stimulus !== undefined) problems.push(...sourceProblems(q.stimulus).map(p => `${where}: stimulus ${p}`));
      });
    });
    expect(problems).toEqual([]);
  });

  it('production builds only see reviewed questions', async () => {
    const all = await loadQuestionBank(subjectId, { includeDrafts: true });
    const live = await loadQuestionBank(subjectId, { includeDrafts: false });
    expect(live.every(q => q.reviewed === true)).toBe(true);
    expect(live.length).toBe(all.filter(q => q.reviewed).length);
  });
});
