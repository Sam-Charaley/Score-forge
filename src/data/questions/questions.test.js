import { describe, it, expect } from 'vitest'
import { loadQuestionBank, loadTopicMap, QUESTION_CHOICE_COUNT, DIFFICULTY_LEVELS } from './questionLoader'

const files = import.meta.glob(['./*/*.js', '!./*/topics.js'], { eager: true });
const SUBJECTS = [...new Set(Object.keys(files).map(p => p.split('/')[1]))];

describe.each(SUBJECTS)('%s question bank', subjectId => {
  it('every topic belongs to a real unit and has a unique id', async () => {
    const { units, topics } = await loadTopicMap(subjectId);
    const unitIds = new Set(units.map(u => u.id));
    expect(topics.filter(t => !unitIds.has(t.unit))).toEqual([]);
    expect(new Set(topics.map(t => t.id)).size).toBe(topics.length);
  });

  it('every question id is unique', async () => {
    const ids = (await loadQuestionBank(subjectId, { includeDrafts: true })).map(q => q.id);
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([]);
  });

  it('every question is well formed and matches its file', async () => {
    const { topics } = await loadTopicMap(subjectId);
    const topicIds = new Set(topics.map(t => t.id));
    const idPattern = new RegExp(`^${subjectId}-[a-z0-9-]+-\\d{3}$`);
    const problems = [];
    Object.entries(files).filter(([p]) => p.startsWith(`./${subjectId}/`)).forEach(([filePath, module]) => {
      const fileTopic = filePath.match(/\/([^/]+)\.js$/)[1];
      module.default.forEach((q, i) => {
        const where = `${fileTopic}: ${q.id ?? `#${i}`}`;
        if (!idPattern.test(q.id ?? '')) problems.push(`${where}: id should look like ${subjectId}-<topic>-001`);
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
        if (q.verify !== undefined && q.verify !== 'output' && q.verify !== 'numeric') problems.push(`${where}: verify must be 'output', 'numeric' or absent`);
        if (q.verify === 'output' && !q.code?.trim()) problems.push(`${where}: verify 'output' needs code`);
        if (q.verify === 'numeric' && typeof q.solve !== 'function') problems.push(`${where}: verify 'numeric' needs a solve() function`);
        if (q.solve !== undefined && q.verify !== 'numeric') problems.push(`${where}: solve() is only checked with verify: 'numeric'`);
        if (q.setup !== undefined && (typeof q.setup !== 'string' || !q.setup.trim())) problems.push(`${where}: setup must be non-empty code if present`);
        if (q.fixedOrder !== undefined && q.fixedOrder !== true) problems.push(`${where}: fixedOrder must be true or absent`);
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
