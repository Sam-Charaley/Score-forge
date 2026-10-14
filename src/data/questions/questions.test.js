import { describe, it, expect } from 'vitest'
import { CSA_TOPICS, CSA_UNITS } from './csa/topics'
import { loadQuestionBank, QUESTION_CHOICE_COUNT, DIFFICULTY_LEVELS } from './questionLoader'

const files = import.meta.glob(['./*/*.js', '!./*/topics.js'], { eager: true });
const TOPIC_IDS = new Set(CSA_TOPICS.map(t => t.id));
const ALL = await loadQuestionBank('csa', { includeDrafts: true });

describe('CS A topics', () => {
  it('every topic belongs to a real unit and has a unique id', () => {
    const unitIds = new Set(CSA_UNITS.map(u => u.id));
    expect(CSA_TOPICS.filter(t => !unitIds.has(t.unit))).toEqual([]);
    expect(TOPIC_IDS.size).toBe(CSA_TOPICS.length);
  });
});

describe('question bank format', () => {
  it('has questions', () => expect(ALL.length).toBeGreaterThan(0));

  it('every question id is unique', () => {
    const ids = ALL.map(q => q.id);
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([]);
  });

  it.each(Object.entries(files))('%s: every question is well formed and matches its file', (filePath, module) => {
    const fileTopic = filePath.match(/\/([^/]+)\.js$/)[1];
    const problems = [];
    module.default.forEach((q, i) => {
      const where = q.id ?? `#${i}`;
      if (!/^csa-[a-z0-9-]+-\d{3}$/.test(q.id ?? '')) problems.push(`${where}: id should look like csa-<topic>-001`);
      if (q.topic !== fileTopic) problems.push(`${where}: topic "${q.topic}" but file is ${fileTopic}.js`);
      if (!TOPIC_IDS.has(q.topic)) problems.push(`${where}: unknown topic "${q.topic}"`);
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
      if (q.verify !== undefined && q.verify !== 'output') problems.push(`${where}: verify must be 'output' or absent`);
      if (q.verify === 'output' && !q.code?.trim()) problems.push(`${where}: verify 'output' needs code`);
      if (q.setup !== undefined && (typeof q.setup !== 'string' || !q.setup.trim())) problems.push(`${where}: setup must be non-empty code if present`);
      if (q.fixedOrder !== undefined && q.fixedOrder !== true) problems.push(`${where}: fixedOrder must be true or absent`);
    });
    expect(problems).toEqual([]);
  });

  it('production builds only see reviewed questions', async () => {
    const live = await loadQuestionBank('csa', { includeDrafts: false });
    expect(live.every(q => q.reviewed === true)).toBe(true);
    expect(live.length).toBe(ALL.filter(q => q.reviewed).length);
  });
});
