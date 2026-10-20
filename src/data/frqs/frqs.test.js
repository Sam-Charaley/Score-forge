import { describe, it, expect } from 'vitest'
import { loadFrqs, pointsPossible, isCodeFrqSubject } from './frqLoader'
import { figureProblems, sourceProblems } from '../questions/contentChecks'

// Every free-response set at ./<subject>.js, checked as code (CS A) or
// written (everything else) depending on its subject.
const SUBJECTS = Object.keys(import.meta.glob(['./*.js', '!./frqLoader.js', '!./*.test.js'])).map(p => p.slice(2, -3));

// Checks that only apply to code FRQs: a setup class with a marker per part,
// a Java solution that uses its header, and a verify test.
function codeFrqProblems(frq) {
  const problems = [];
  if (!frq.setup?.trim()) problems.push('code FRQ needs setup');
  if (!frq.verify?.includes('check(')) problems.push('needs a verify test that calls check(...)');
  frq.parts.forEach(part => {
    if (!frq.setup?.includes(`// part (${part.id})`)) problems.push(`setup has no "// part (${part.id})" marker`);
    if (!part.header?.trim()) problems.push(`part ${part.id} needs a header`);
    else if (!part.solution?.includes(part.header.replace(/\s*\{$/, ''))) problems.push(`part ${part.id} solution does not use its header`);
  });
  return problems;
}

// Checks that only apply to written FRQs: no code scaffolding, and any
// sources or figures are well formed and cited.
function writtenFrqProblems(frq) {
  const problems = [];
  if (frq.setup !== undefined || frq.verify !== undefined) problems.push('written FRQ must not have setup or verify');
  if (frq.sources !== undefined) {
    if (!Array.isArray(frq.sources) || frq.sources.length === 0) problems.push('sources must be a non-empty list if present');
    else {
      const labels = frq.sources.map(s => s.label);
      if (labels.some(l => typeof l !== 'string' || !l.trim())) problems.push('every source needs a label');
      if (new Set(labels).size !== labels.length) problems.push('source labels must be unique');
      frq.sources.forEach(s => problems.push(...sourceProblems(s).map(p => `source "${s.label}" ${p}`)));
    }
  }
  if (frq.figure !== undefined) problems.push(...figureProblems(frq.figure).map(p => `figure ${p}`));
  frq.parts.forEach(part => {
    if (part.header !== undefined) problems.push(`part ${part.id} must not have a code header`);
    if (part.figure !== undefined) problems.push(...figureProblems(part.figure).map(p => `part ${part.id} figure ${p}`));
  });
  return problems;
}

describe.each(SUBJECTS)('%s free-response set', subjectId => {
  const isCode = isCodeFrqSubject(subjectId);

  it('has FRQs with unique ids', async () => {
    const { frqs } = await loadFrqs(subjectId, { includeDrafts: true });
    expect(frqs.length).toBeGreaterThan(0);
    const ids = frqs.map(f => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every FRQ is well formed', async () => {
    const { frqs, types } = await loadFrqs(subjectId, { includeDrafts: true });
    const idPattern = new RegExp(`^${subjectId}-frq-[a-z0-9]+-\\d{3}$`);
    const problems = frqs.flatMap(frq => {
      const own = [];
      if (!idPattern.test(frq.id)) own.push(`id should look like ${subjectId}-frq-<type>-001`);
      if (!types[frq.type]) own.push(`unknown type ${frq.type}`);
      if (!frq.title?.trim() || !frq.intro?.trim()) own.push('needs title and intro');
      if (typeof frq.reviewed !== 'boolean') own.push('reviewed must be true or false');
      if (!Array.isArray(frq.parts) || frq.parts.length === 0) own.push('needs at least one part');
      else {
        const partIds = frq.parts.map(p => p.id);
        if (new Set(partIds).size !== partIds.length) own.push('part ids must be unique');
        const pointIds = frq.parts.flatMap(p => p.points?.map(pt => pt.id) ?? []);
        if (new Set(pointIds).size !== pointIds.length) own.push('rubric point ids must be unique');
        frq.parts.forEach(part => {
          if (!part.prompt?.trim() || !part.solution?.trim()) own.push(`part ${part.id} needs prompt and solution`);
          if (!part.points?.length) own.push(`part ${part.id} has no rubric points`);
          else if (part.points.some(pt => !pt.id || !pt.text?.trim())) own.push(`part ${part.id} has a rubric point without id or text`);
        });
        own.push(...(isCode ? codeFrqProblems(frq) : writtenFrqProblems(frq)));
      }
      return own.map(p => `${frq.id}: ${p}`);
    });
    expect(problems).toEqual([]);
  });

  it('scores each FRQ out of the number of rubric points', async () => {
    const { frqs } = await loadFrqs(subjectId, { includeDrafts: true });
    frqs.forEach(frq => expect(pointsPossible(frq)).toBe(frq.parts.reduce((n, p) => n + p.points.length, 0)));
  });

  it('production only sees reviewed FRQs', async () => {
    const { frqs: live } = await loadFrqs(subjectId, { includeDrafts: false });
    expect(live.every(f => f.reviewed)).toBe(true);
  });
});
