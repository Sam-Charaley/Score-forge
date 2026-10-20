import { describe, it, expect } from 'vitest'
import { figureProblems, sourceProblems } from './contentChecks'

const ALT = 'A table of output and total cost for a small bakery, from zero to three batches.';

describe('table figures', () => {
  const table = { type: 'table', caption: 'Bakery costs', columns: ['Batches', 'Total cost ($)'], rows: [[0, 20], [1, 35], [2, 45]], alt: ALT };

  it('accepts a well-formed table', () => expect(figureProblems(table)).toEqual([]));

  it('needs one cell per column in every row', () => {
    expect(figureProblems({ ...table, rows: [[0, 20], [1]] })).toEqual(['table row 1 needs exactly one cell per column']);
  });

  it('needs at least two unique, named columns and a row', () => {
    expect(figureProblems({ ...table, columns: ['Only'], rows: [['x']] })).toContain('table needs at least two named columns');
    expect(figureProblems({ ...table, columns: ['A', 'A'] })).toContain('table column names must be unique');
    expect(figureProblems({ ...table, rows: [] })).toContain('table needs at least one row');
  });

  it('still needs alt text', () => {
    expect(figureProblems({ ...table, alt: 'short' }).some(p => p.includes('alt text'))).toBe(true);
  });
});

describe('source passages', () => {
  it('needs text and a citation', () => {
    expect(sourceProblems({ text: 'An excerpt.', citation: 'Written for ScoreForge' })).toEqual([]);
    expect(sourceProblems({ text: 'An excerpt.' })).toEqual(['needs a citation']);
    expect(sourceProblems({ text: ' ', citation: 'x' })).toEqual(['needs text']);
  });
});
