// AP Calculus AB and BC, Unit 5 (first half): the Mean Value Theorem, the Extreme Value Theorem and extrema.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { derivative, findRoot, extremeValue } from '../calcMath.js'

const square = x => x * x;

export default [
  {
    id: 'calc-mvt-extrema-001',
    topic: 'mvt-extrema',
    formulas: ['mvt'],
    difficulty: 1,
    prompt: 'For f(x) = x² on [1, 4], what value of c satisfies the conclusion of the Mean Value Theorem?',
    choices: ['5', '3/2', '5/2', '2'],
    answer: 2,
    explanation: 'The average rate of change is (f(4) − f(1))/(4 − 1) = (16 − 1)/3 = 5. Setting f\'(c) = 2c = 5 gives c = 5/2, which is inside (1, 4). 5 is the slope itself, not the point.',
    verify: 'exact',
    solve: () => findRoot(c => derivative(square, c) - (square(4) - square(1)) / 3, 1, 4),
    reviewed: true,
  },
  {
    id: 'calc-mvt-extrema-002',
    topic: 'mvt-extrema',
    formulas: ['evt'],
    difficulty: 2,
    prompt: 'What is the absolute maximum value of f(x) = x³ − 3x on [0, 2]?',
    choices: ['−2', '0', '2', '14'],
    answer: 2,
    explanation: 'f\'(x) = 3x² − 3 = 0 at x = 1 (x = −1 is outside the interval). Compare the candidates: f(0) = 0, f(1) = −2, f(2) = 8 − 6 = 2. The largest is 2, at the endpoint. −2 is the minimum, at the critical point.',
    verify: 'exact',
    solve: () => extremeValue(x => x ** 3 - 3 * x, 0, 2, 'max'),
    reviewed: true,
  },
  {
    id: 'calc-mvt-extrema-003',
    topic: 'mvt-extrema',
    formulas: ['first-derivative-test'],
    difficulty: 3,
    prompt: 'The derivative of a function f is f\'(x) = (x − 1)(x + 2)². At which x-values does f have a local minimum?',
    choices: ['x = 1 only', 'x = −2 only', 'x = −2 and x = 1', 'f has no local minimum'],
    answer: 0,
    explanation: 'Both x = 1 and x = −2 are critical points, but only a sign change makes an extremum. (x + 2)² is never negative, so f\' has the sign of (x − 1): negative left of 1 and positive right of it, a local minimum at x = 1. At x = −2, f\' is negative on both sides, so there is no extremum there.',
    reviewed: true,
  },
  {
    id: 'calc-mvt-extrema-004',
    topic: 'mvt-extrema',
    formulas: ['evt'],
    difficulty: 2,
    prompt: 'Which condition guarantees that f has an absolute maximum value on the interval [a, b]?',
    choices: [
      'f is continuous on [a, b]',
      'f is continuous on (a, b)',
      'f\'(c) = 0 for some c in (a, b)',
      'f(a) = f(b)',
    ],
    answer: 0,
    explanation: 'The Extreme Value Theorem: a function continuous on a closed interval has both an absolute maximum and minimum there. An open interval isn\'t enough, since f(x) = 1/x is continuous on (0, 1) but has no maximum. f(a) = f(b) is part of Rolle\'s Theorem, which is about f\', not extreme values.',
    reviewed: true,
  },
  {
    id: 'calc-mvt-extrema-005',
    topic: 'mvt-extrema',
    formulas: ['evt'],
    difficulty: 2,
    prompt: 'What is the absolute minimum value of f(x) = x + 4/x on [1, 4]?',
    choices: ['5', '4', '2', '17/4'],
    answer: 1,
    explanation: 'f\'(x) = 1 − 4/x² = 0 at x = 2. Compare: f(1) = 5, f(2) = 2 + 2 = 4, f(4) = 4 + 1 = 5. The minimum value is 4. 2 is where it happens, not the value.',
    verify: 'exact',
    solve: () => extremeValue(x => x + 4 / x, 1, 4, 'min'),
    reviewed: true,
  },
];
