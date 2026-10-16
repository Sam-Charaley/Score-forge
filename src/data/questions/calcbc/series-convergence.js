// AP Calculus BC, Unit 10 (first part): sums of series and the convergence tests.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { partialSum, limitAtInfinity } from '../calcMath.js'

// Enough terms that the tail of the telescoping series (1/(N + 1)) is below 1e-6.
const TELESCOPING_TERMS = 1_000_000;

export default [
  {
    id: 'calcbc-series-convergence-001',
    topic: 'series-convergence',
    difficulty: 1,
    prompt: 'What is the sum of the series Σ (n = 0 to ∞) 3(1/4)ⁿ?',
    choices: ['3', '4', '12', '3/4'],
    answer: 1,
    explanation: 'This is geometric with first term 3 and ratio 1/4, and |1/4| < 1, so it sums to 3/(1 − 1/4) = 3/(3/4) = 4. 12 divides by 1/4 instead of 1 − 1/4.',
    verify: 'exact',
    solve: () => partialSum(n => 3 * 0.25 ** n, 0, 60),
    reviewed: false,
  },
  {
    id: 'calcbc-series-convergence-002',
    topic: 'series-convergence',
    difficulty: 1,
    prompt: 'Which series converges?',
    choices: ['Σ 1/n^(3/2)', 'Σ 1/√n', 'Σ 1/n', 'Σ n/(n + 1)'],
    answer: 0,
    explanation: 'A p-series Σ 1/nᵖ converges only when p > 1, and 3/2 > 1. Σ 1/√n (p = 1/2) and the harmonic series (p = 1) diverge. Σ n/(n + 1) fails the nth-term test, since its terms approach 1, not 0.',
    reviewed: false,
  },
  {
    id: 'calcbc-series-convergence-003',
    topic: 'series-convergence',
    difficulty: 2,
    prompt: 'Which best describes the series Σ (n = 1 to ∞) (−1)ⁿ/n?',
    choices: ['Converges absolutely', 'Converges conditionally', 'Diverges by the nth-term test', 'Diverges by the ratio test'],
    answer: 1,
    explanation: 'The terms alternate, decrease in size and approach 0, so it converges by the Alternating Series Test. But Σ |(−1)ⁿ/n| = Σ 1/n is the harmonic series, which diverges, so the convergence is conditional. The ratio test limit is 1, which is inconclusive.',
    reviewed: false,
  },
  {
    id: 'calcbc-series-convergence-004',
    topic: 'series-convergence',
    difficulty: 2,
    prompt: 'For the series Σ n/3ⁿ, what is lim (n → ∞) of |aₙ₊₁/aₙ| in the ratio test?',
    choices: ['3', '1', '1/3', '0'],
    answer: 2,
    explanation: 'aₙ₊₁/aₙ = [(n + 1)/3ⁿ⁺¹]·[3ⁿ/n] = (n + 1)/(3n), which approaches 1/3. Since 1/3 < 1, the series converges.',
    verify: 'exact',
    // The ratio simplified to (n + 1)/(3n), since 3ⁿ itself overflows long before n gets large.
    solve: () => limitAtInfinity(n => (n + 1) / (3 * n)),
    reviewed: false,
  },
  {
    id: 'calcbc-series-convergence-005',
    topic: 'series-convergence',
    difficulty: 3,
    prompt: 'What is the sum of Σ (n = 1 to ∞) 1/(n(n + 1))?',
    choices: ['1/2', '2', '1', 'Diverges'],
    answer: 2,
    explanation: 'Partial fractions give 1/n − 1/(n + 1), so the series telescopes: the Nth partial sum is 1 − 1/(N + 1), which approaches 1. 1/2 is just the first term.',
    verify: 'exact',
    solve: () => partialSum(n => 1 / (n * (n + 1)), 1, TELESCOPING_TERMS),
    tolerance: 1e-5,
    reviewed: false,
  },
  {
    id: 'calcbc-series-convergence-006',
    topic: 'series-convergence',
    difficulty: 2,
    prompt: 'The sum of Σ (n = 1 to ∞) (−1)ⁿ⁺¹/n² is approximated using its first four terms. By the Alternating Series Error Bound, what is the largest the error can be?',
    choices: ['1/16', '1/25', '1/5', '1/4'],
    answer: 1,
    explanation: 'For an alternating series whose terms decrease to 0, the error is at most the size of the first term left out. After four terms that is the fifth, 1/5² = 1/25. 1/16 is the last term used.',
    verify: 'exact',
    solve: () => Math.abs((-1) ** (5 + 1) / 5 ** 2),
    reviewed: false,
  },
];
