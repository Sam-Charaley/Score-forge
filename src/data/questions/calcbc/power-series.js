// AP Calculus BC, Unit 10 (second part): power series, radius and interval of convergence, and known sums.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { partialSum } from '../calcMath.js'

const factorial = n => (n <= 1 ? 1 : n * factorial(n - 1));
// Terms beyond this are below double precision for every series in this file.
const SERIES_TERMS = 40;

export default [
  {
    id: 'calcbc-power-series-001',
    topic: 'power-series',
    formulas: ['ratio-test', 'geometric-series'],
    difficulty: 1,
    prompt: 'What is the radius of convergence of Σ xⁿ/2ⁿ?',
    choices: ['1/2', '1', '2', '∞'],
    answer: 2,
    explanation: 'This is geometric with ratio x/2, so it converges when |x/2| < 1, that is |x| < 2. The ratio test gives the same: |aₙ₊₁/aₙ| → |x|/2. 1/2 is the ratio of the coefficients, not the radius.',
    reviewed: true,
  },
  {
    id: 'calcbc-power-series-002',
    topic: 'power-series',
    formulas: ['ratio-test', 'alternating-series'],
    difficulty: 3,
    prompt: 'What is the interval of convergence of Σ (n = 1 to ∞) (x − 3)ⁿ/n?',
    choices: ['(2, 4)', '[2, 4)', '(2, 4]', '[2, 4]'],
    answer: 1,
    explanation: 'The ratio test gives |x − 3| < 1, so 2 < x < 4; check the endpoints separately. At x = 4 the series is Σ 1/n, the harmonic series, which diverges. At x = 2 it is Σ (−1)ⁿ/n, which converges by the Alternating Series Test. So the interval is [2, 4).',
    reviewed: true,
  },
  {
    id: 'calcbc-power-series-003',
    topic: 'power-series',
    formulas: ['maclaurin-e'],
    difficulty: 2,
    prompt: 'What is the sum of Σ (n = 0 to ∞) 2ⁿ/n!?',
    choices: ['2e', 'e²', 'e', 'e² − 1'],
    answer: 1,
    explanation: 'This is the Maclaurin series for eˣ, Σ xⁿ/n!, at x = 2, so it sums to e². e² − 1 would be the sum starting at n = 1.',
    verify: 'exact',
    solve: () => partialSum(n => 2 ** n / factorial(n), 0, SERIES_TERMS),
    reviewed: true,
  },
  {
    id: 'calcbc-power-series-004',
    topic: 'power-series',
    formulas: ['maclaurin-sin'],
    difficulty: 2,
    prompt: 'What is the sum of Σ (n = 0 to ∞) (−1)ⁿ (π/2)^(2n+1)/(2n + 1)!?',
    choices: ['0', 'π/2', '1', '−1'],
    answer: 2,
    explanation: 'This is the Maclaurin series for sin x, Σ (−1)ⁿ x^(2n+1)/(2n + 1)!, at x = π/2, so it sums to sin(π/2) = 1. The series with even powers would be cos x, which gives 0.',
    verify: 'exact',
    solve: () => partialSum(n => (-1) ** n * (Math.PI / 2) ** (2 * n + 1) / factorial(2 * n + 1), 0, SERIES_TERMS / 2),
    reviewed: true,
  },
  {
    id: 'calcbc-power-series-005',
    topic: 'power-series',
    formulas: ['maclaurin-geometric'],
    difficulty: 3,
    prompt: 'Using 1/(1 − x) = Σ xⁿ for |x| < 1, what is the sum of Σ (n = 1 to ∞) n(1/4)ⁿ⁻¹?',
    choices: ['4/3', '16/9', '4/9', '16/3'],
    answer: 1,
    explanation: 'Differentiating both sides term by term gives Σ n xⁿ⁻¹ = 1/(1 − x)². At x = 1/4 that is 1/(3/4)² = 16/9. 4/3 is the sum of the original geometric series.',
    verify: 'exact',
    solve: () => partialSum(n => n * 0.25 ** (n - 1), 1, 80),
    reviewed: true,
  },
];
