// AP Calculus AB and BC, Unit 1: limits and continuity. Shared by both banks.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
// verify: 'exact' questions carry solve(), which works the problem out
// numerically; exact.test.js checks it equals the marked choice.
import { limit, limitAtInfinity } from '../calcMath.js'

export default [
  {
    id: 'calc-limits-001',
    topic: 'limits',
    difficulty: 1,
    prompt: 'What is lim (x → 3) of (x² − 9)/(x − 3)?',
    choices: ['0', '6', '3', 'The limit does not exist'],
    answer: 1,
    explanation: 'Plugging in gives 0/0, so simplify first: (x² − 9)/(x − 3) = (x − 3)(x + 3)/(x − 3) = x + 3 for x ≠ 3. The limit is 3 + 3 = 6. A 0/0 form does not mean the limit fails to exist.',
    verify: 'exact',
    solve: () => limit(x => (x * x - 9) / (x - 3), 3),
    reviewed: true,
  },
  {
    id: 'calc-limits-002',
    topic: 'limits',
    difficulty: 2,
    prompt: 'What is lim (x → 0) of sin(5x)/(2x)?',
    choices: ['2/5', '1', '5', '5/2'],
    answer: 3,
    explanation: 'Rewrite to use lim (u → 0) sin(u)/u = 1: sin(5x)/(2x) = (5/2) · sin(5x)/(5x), which approaches (5/2)(1) = 5/2.',
    verify: 'exact',
    solve: () => limit(x => Math.sin(5 * x) / (2 * x), 0),
    reviewed: true,
  },
  {
    id: 'calc-limits-003',
    topic: 'limits',
    difficulty: 2,
    prompt: 'What is lim (x → ∞) of (4x³ − x)/(2x³ + 7)?',
    choices: ['2', '4', '0', '−1/7'],
    answer: 0,
    explanation: 'The numerator and denominator have the same degree, so the limit is the ratio of the leading coefficients: 4/2 = 2. Dividing every term by x³ shows the other terms go to 0.',
    verify: 'exact',
    solve: () => limitAtInfinity(x => (4 * x ** 3 - x) / (2 * x ** 3 + 7)),
    reviewed: true,
  },
  {
    id: 'calc-limits-004',
    topic: 'limits',
    difficulty: 2,
    prompt: 'The function f is defined by f(x) = x² + k for x < 2 and f(x) = 3x − 1 for x ≥ 2. For what value of k is f continuous at x = 2?',
    choices: ['5', '−1', '1', '9'],
    answer: 2,
    explanation: 'Continuity at 2 needs the two pieces to meet: the left-hand limit 2² + k must equal f(2) = 3(2) − 1 = 5. So 4 + k = 5 and k = 1.',
    verify: 'exact',
    // The k that makes the left piece's value at 2 equal the right piece's.
    solve: () => (3 * 2 - 1) - 2 ** 2,
    reviewed: true,
  },
  {
    id: 'calc-limits-005',
    topic: 'limits',
    difficulty: 3,
    prompt: 'A function f is continuous on [1, 4], with f(1) = −2 and f(4) = 3. Which statement must be true?',
    choices: [
      'f(c) = 0 for at least one c in (1, 4)',
      'f\'(c) = 5/3 for at least one c in (1, 4)',
      'f is increasing on [1, 4]',
      'f has a maximum value of 3 on [1, 4]',
    ],
    answer: 0,
    explanation: 'By the Intermediate Value Theorem, a continuous function takes every value between f(1) = −2 and f(4) = 3, including 0. The Mean Value Theorem choice also needs differentiability, which isn\'t given, and f could go above 3 or dip in between.',
    reviewed: true,
  },
];
