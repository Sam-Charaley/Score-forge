import { describe, it, expect } from 'vitest'
import { loadFrqs, pointsPossible } from './frqLoader'

const { frqs: ALL, types } = await loadFrqs('csa', { includeDrafts: true });

describe('CS A free-response set', () => {
  it('has FRQs with unique ids', () => {
    expect(ALL.length).toBeGreaterThan(0);
    const ids = ALL.map(f => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(ALL.map(f => [f.id, f]))('%s is well formed', (id, frq) => {
    const problems = [];
    if (!/^csa-frq-[a-z0-9]+-\d{3}$/.test(id)) problems.push('id should look like csa-frq-<type>-001');
    if (!types[frq.type]) problems.push(`unknown type ${frq.type}`);
    if (!frq.title?.trim() || !frq.intro?.trim() || !frq.setup?.trim()) problems.push('needs title, intro and setup');
    if (typeof frq.reviewed !== 'boolean') problems.push('reviewed must be true or false');
    if (!frq.verify?.includes('check(')) problems.push('needs a verify test that calls check(...)');
    const pointIds = frq.parts.flatMap(p => p.points.map(pt => pt.id));
    if (new Set(pointIds).size !== pointIds.length) problems.push('rubric point ids must be unique');
    frq.parts.forEach(part => {
      if (!frq.setup.includes(`// part (${part.id})`)) problems.push(`setup has no "// part (${part.id})" marker`);
      if (!part.prompt?.trim() || !part.header?.trim() || !part.solution?.trim()) problems.push(`part ${part.id} needs prompt, header and solution`);
      if (!part.solution.includes(part.header.replace(/\s*\{$/, ''))) problems.push(`part ${part.id} solution does not use its header`);
      if (part.points.length === 0) problems.push(`part ${part.id} has no rubric points`);
    });
    expect(problems).toEqual([]);
  });

  it('scores each FRQ out of the number of rubric points', () => {
    const methods = ALL.find(f => f.type === 'methods');
    expect(pointsPossible(methods)).toBe(methods.parts.reduce((n, p) => n + p.points.length, 0));
  });

  it('production only sees reviewed FRQs', async () => {
    const { frqs: live } = await loadFrqs('csa', { includeDrafts: false });
    expect(live.every(f => f.reviewed)).toBe(true);
  });
});
