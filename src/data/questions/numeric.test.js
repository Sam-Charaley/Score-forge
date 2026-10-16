import { describe, it, expect } from 'vitest'
import { parseChoiceNumber, matchesDisplayed } from './numericKey'

// Every verify: 'numeric' question recomputes its key with solve(). The marked
// choice must equal that value as displayed (to its last shown digit), and no
// other choice may be close enough to be defensible as also right.
const files = import.meta.glob(['./*/*.js', '!./*/topics.js'], { eager: true });
const NUMERIC = Object.values(files).flatMap(module => module.default).filter(q => q.verify === 'numeric');
// A wrong choice within this fraction of the true value could be marked right
// by a student rounding differently, so distractors must be further away.
const MIN_DISTRACTOR_GAP = 0.05;

describe('parseChoiceNumber', () => {
  it.each([
    ['72 m', 72, 1], ['4.0 m/s', 4, 0.1], ['0.050 s', 0.05, 0.001], ['200,000 N', 200000, 100000],
    ['−3.0 m/s²', -3, 0.1], ['+2.0 m/s', 2, 0.1], ['610 W', 610, 10], ['92%', 92, 1], ['0 J', 0, 1], ['13.5 J', 13.5, 0.1],
  ])('%s', (text, value, place) => expect(parseChoiceNumber(text)).toEqual({ value, place }));

  it('returns null for choices that are not numbers', () => {
    expect(parseChoiceNumber('It stays the same')).toBeNull();
    expect(parseChoiceNumber('F/3')).toBeNull();
    expect(parseChoiceNumber('2F/3')).toBeNull();
  });
});

describe('matchesDisplayed', () => {
  it('accepts a value that rounds to the shown digits', () => {
    expect(matchesDisplayed(parseChoiceNumber('2.0 s'), 2.0203)).toBe(true);
    expect(matchesDisplayed(parseChoiceNumber('610 W'), 612.5)).toBe(true);
  });
  it('rejects a value that does not', () => {
    expect(matchesDisplayed(parseChoiceNumber('2.1 s'), 2.0203)).toBe(false);
    expect(matchesDisplayed(parseChoiceNumber('590 W'), 612.5)).toBe(false);
  });
});

describe.each(NUMERIC.map(q => [q.id, q]))('%s numeric key', (id, q) => {
  const value = q.solve();
  const marked = parseChoiceNumber(q.choices[q.answer]);

  it('the marked choice is the recomputed answer', () => {
    expect(Number.isFinite(value), 'solve() returned a number').toBe(true);
    expect(marked, `"${q.choices[q.answer]}" starts with a number`).not.toBeNull();
    expect(matchesDisplayed(marked, value), `solve() gives ${value}, marked "${q.choices[q.answer]}"`).toBe(true);
  });

  it('no wrong choice is close to the answer', () => {
    const tooClose = q.choices
      .map((text, i) => ({ text, i, parsed: parseChoiceNumber(text) }))
      .filter(({ i, parsed }) => i !== q.answer && parsed && Math.abs(parsed.value - value) <= MIN_DISTRACTOR_GAP * Math.abs(value))
      .map(({ text }) => text);
    expect(tooClose).toEqual([]);
  });
});
