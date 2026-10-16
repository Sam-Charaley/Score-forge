import { describe, it, expect } from 'vitest'
import { evaluateChoice } from './mathExpr'
import { integrate, integrateToInfinity, derivative, secondDerivative, limit, limitAtInfinity, partialSum, eulerMethod, solveODE, findRoot, extremeValue } from './calcMath'

describe('evaluateChoice', () => {
  it.each([
    ['3', 3], ['−2/9', -2 / 9], ['π/4', Math.PI / 4], ['2π', 2 * Math.PI], ['e² − 1', Math.E ** 2 - 1],
    ['3√2', 3 * Math.SQRT2], ['√(3)/2', Math.sqrt(3) / 2], ['(1/2) ln 5', Math.log(5) / 2], ['ln 2', Math.LN2],
    ['1 − 1/e', 1 - 1 / Math.E], ['4/3', 4 / 3], ['0', 0], ['−1', -1], ['e^(−2)', Math.E ** -2], ['2 + ln 3', 2 + Math.log(3)],
    ['π²/6', Math.PI ** 2 / 6], ['5.0', 5], ['16π/15', (16 * Math.PI) / 15], ['sin(π/6)', 0.5], ['(e − 1)/2', (Math.E - 1) / 2],
  ])('%s', (text, value) => expect(evaluateChoice(text)).toBeCloseTo(value, 12));

  it.each(['Diverges', 'The limit does not exist', 'x = 2', 'Converges conditionally', '', '2 +'])('"%s" is not a single value', text => {
    expect(evaluateChoice(text)).toBeNull();
  });
});

describe('calcMath', () => {
  it('integrates', () => {
    expect(integrate(x => x * x, 0, 3)).toBeCloseTo(9, 10);
    expect(integrate(Math.sin, 0, Math.PI)).toBeCloseTo(2, 10);
    expect(integrate(x => x * Math.exp(x), 0, 1)).toBeCloseTo(1, 10);
    expect(integrate(x => x, 2, 0)).toBeCloseTo(-2, 10);
  });
  it('integrates to infinity', () => {
    expect(integrateToInfinity(x => 1 / (x * x), 1)).toBeCloseTo(1, 7);
    expect(integrateToInfinity(x => Math.exp(-x), 0)).toBeCloseTo(1, 7);
  });
  it('differentiates', () => {
    expect(derivative(x => x ** 3, 2)).toBeCloseTo(12, 8);
    expect(derivative(Math.log, 2)).toBeCloseTo(0.5, 8);
    expect(secondDerivative(x => x ** 3, 2)).toBeCloseTo(12, 5);
  });
  it('takes two-sided limits and rejects jumps', () => {
    expect(limit(x => Math.sin(3 * x) / x, 0)).toBeCloseTo(3, 6);
    expect(limit(x => (x * x - 4) / (x - 2), 2)).toBeCloseTo(4, 8);
    expect(() => limit(x => Math.abs(x) / x, 0)).toThrow(/differ/);
  });
  it('takes limits at infinity', () => {
    expect(limitAtInfinity(x => (3 * x * x + 1) / (x * x - 5))).toBeCloseTo(3, 6);
  });
  it('sums series and runs Euler\'s method', () => {
    expect(partialSum(n => 1 / 2 ** n, 1, 60)).toBeCloseTo(1, 12);
    expect(eulerMethod((x, y) => y, 0, 1, 0.5, 1)).toBeCloseTo(2.25, 12);
  });
});

describe('more calcMath', () => {
  it('solves differential equations', () => {
    expect(solveODE((x, y) => 2 * y, 0, 3, 1)).toBeCloseTo(3 * Math.E ** 2, 9);
    expect(solveODE((x, y) => x / y, 0, 2, 3)).toBeCloseTo(Math.sqrt(13), 9);
  });
  it('finds roots and extremes', () => {
    expect(findRoot(x => x * x - 2, 0, 2)).toBeCloseTo(Math.SQRT2, 12);
    expect(extremeValue(x => x ** 3 - 3 * x, 0, 2, 'max')).toBeCloseTo(2, 10);
    expect(extremeValue(x => x + 4 / x, 1, 4, 'min')).toBeCloseTo(4, 10);
    expect(extremeValue(x => x * (20 - x), 0, 20, 'max')).toBeCloseTo(100, 9);
  });
});
