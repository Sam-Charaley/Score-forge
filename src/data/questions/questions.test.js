import { describe, it, expect } from 'vitest'
import { loadQuestionBank, loadTopicMap, QUESTION_CHOICE_COUNT, DIFFICULTY_LEVELS } from './questionLoader'

// A screen reader gets only the alt text, so it must describe the figure in full.
const MIN_ALT_LENGTH = 60;

function figureProblems(figure) {
  const problems = [];
  if (typeof figure.alt !== 'string' || figure.alt.trim().length < MIN_ALT_LENGTH) problems.push(`needs alt text of at least ${MIN_ALT_LENGTH} characters describing it`);
  if (figure.type === 'graph') {
    const { xMax, xStep, yMin, yMax, yStep, series } = figure;
    if (![xMax, xStep, yMin, yMax, yStep].every(Number.isFinite) || xMax <= 0 || xStep <= 0 || yStep <= 0 || yMax <= yMin) problems.push('graph needs xMax, xStep, yMin < yMax and yStep');
    if (xMax / xStep > 12 || (yMax - yMin) / yStep > 12) problems.push('more than 12 grid lines is unreadable on a phone');
    if (!figure.xLabel || !figure.yLabel) problems.push('graph needs both axis labels, with units');
    if (!Array.isArray(series) || series.length === 0) problems.push('graph needs at least one series');
    (series ?? []).forEach((s, si) => {
      s.points.forEach(([x, y], i) => {
        if (x < 0 || x > xMax + 1e-9 || y < yMin - 1e-9 || y > yMax + 1e-9) problems.push(`series ${si} point ${i} (${x}, ${y}) is off the axes`);
        if (i > 0 && x < s.points[i - 1][0]) problems.push(`series ${si} point ${i}: x must not decrease`);
      });
    });
  } else if (figure.type === 'forces') {
    const labels = figure.forces?.map(f => f.label) ?? [];
    if (labels.length === 0) problems.push('force diagram needs forces');
    if (new Set(labels).size !== labels.length) problems.push('force labels must be unique');
    figure.forces?.forEach(f => { if (!(f.value > 0) || !Number.isFinite(f.angle)) problems.push(`force "${f.label}" needs a positive value and an angle`); });
  } else {
    problems.push(`unknown type "${figure.type}"`);
  }
  return problems;
}

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
        if (q.figure !== undefined) problems.push(...figureProblems(q.figure).map(p => `${where}: figure ${p}`));
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
