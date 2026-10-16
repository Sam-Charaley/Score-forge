import { describe, it, expect } from 'vitest'
import { evaluateChoice } from './mathExpr'

// verify: 'exact' questions have choices written as exact math ("π/4",
// "e² − 1"). solve() works the problem out numerically (integrating,
// differentiating, summing), and the marked choice must equal it. A wrong
// choice that happens to equal the answer would make the question unfair,
// so every numeric distractor must clearly differ.
const files = import.meta.glob(['./*/*.js', '!./*/topics.js'], { eager: true });
const EXACT = Object.values(files).flatMap(module => module.default).filter(q => q.verify === 'exact');
const DEFAULT_TOLERANCE = 1e-6;
const MIN_DISTRACTOR_GAP = 1e-3;
const close = (a, b, tolerance) => Math.abs(a - b) <= tolerance * Math.max(1, Math.abs(b));

describe.each(EXACT.map(q => [q.id, q]))('%s exact key', (id, q) => {
  const value = q.solve();
  const tolerance = q.tolerance ?? DEFAULT_TOLERANCE;

  it('the marked choice equals the worked-out value', () => {
    const marked = evaluateChoice(q.choices[q.answer]);
    expect(marked, `"${q.choices[q.answer]}" reads as a value`).not.toBeNull();
    expect(close(marked, value, tolerance), `solve() gives ${value}, marked "${q.choices[q.answer]}" = ${marked}`).toBe(true);
  });

  it('no other choice has the same value', () => {
    const clashes = q.choices
      .map((text, i) => ({ text, i, v: evaluateChoice(text) }))
      .filter(({ i, v }) => i !== q.answer && v !== null && close(v, value, MIN_DISTRACTOR_GAP))
      .map(({ text }) => text);
    expect(clashes).toEqual([]);
  });
});
