// AP Calculus AB and BC, Unit 5 (second half): concavity, the second derivative, curve sketching and optimization.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { secondDerivative, findRoot, extremeValue } from '../calcMath.js'
import { valueAt } from '../figureMath.js'

const DERIVATIVE_GRAPH = { type: 'graph', xLabel: 'x', yLabel: 'f′(x)', xMin: -3, xMax: 3, xStep: 1, yMin: -3, yMax: 3, yStep: 1,
  series: [{ points: [[-3, -2], [-1, 2], [1, 2], [3, -2]] }],
  alt: 'Graph of f′ for −3 ≤ x ≤ 3. It rises in a straight line from −2 at x = −3 to 2 at x = −1, crossing zero at x = −2, stays at 2 until x = 1, then falls in a straight line to −2 at x = 3, crossing zero at x = 2.' };

export default [
  {
    id: 'calc-curve-sketching-001',
    topic: 'curve-sketching',
    difficulty: 1,
    prompt: 'At what x-value does f(x) = x³ − 3x² have a point of inflection?',
    choices: ['0', '1', '2', '3'],
    answer: 1,
    explanation: 'f\'\'(x) = 6x − 6, which is zero at x = 1 and changes sign there (negative to positive), so the concavity changes. x = 0 and x = 2 are where f\' = 0, which are extrema, not inflection points.',
    verify: 'exact',
    solve: () => findRoot(x => secondDerivative(t => t ** 3 - 3 * t * t, x), 0, 2),
    tolerance: 1e-4,
    reviewed: true,
  },
  {
    id: 'calc-curve-sketching-002',
    topic: 'curve-sketching',
    difficulty: 2,
    prompt: 'On which intervals is f(x) = x⁴ − 6x² concave up?',
    choices: [
      'x < −1 and x > 1',
      '−1 < x < 1',
      'x < −√3 and x > √3',
      'x > 0 only',
    ],
    answer: 0,
    explanation: 'f\'(x) = 4x³ − 12x and f\'\'(x) = 12x² − 12 = 12(x − 1)(x + 1). That is positive when |x| > 1, so f is concave up for x < −1 and x > 1. ±√3 are where f\' = 0, which decides increasing/decreasing, not concavity.',
    reviewed: true,
  },
  {
    id: 'calc-curve-sketching-003',
    topic: 'curve-sketching',
    difficulty: 2,
    prompt: 'A rectangle has a perimeter of 40 cm. What is the largest area it can have, in cm²?',
    choices: ['400', '96', '200', '100'],
    answer: 3,
    explanation: 'With sides x and 20 − x, the area is A(x) = x(20 − x). A\'(x) = 20 − 2x = 0 at x = 10, so the best rectangle is a 10 × 10 square with area 100. 96 is the 8 × 12 rectangle, and 400 squares the half-perimeter.',
    verify: 'exact',
    solve: () => extremeValue(x => x * (20 - x), 0, 20, 'max'),
    reviewed: true,
  },
  {
    id: 'calc-curve-sketching-004',
    topic: 'curve-sketching',
    difficulty: 3,
    prompt: 'The graph shows f′, the derivative of a function f. At what x-value does f have a local maximum?',
    figure: DERIVATIVE_GRAPH,
    choices: ['−2', '1', '2', '0'],
    answer: 2,
    explanation: 'f has a local maximum where f′ changes from positive to negative, which happens at x = 2. At x = −2, f′ goes from negative to positive, a local minimum. On (−1, 1) f′ is at its highest, but that only means f is increasing fastest there.',
    verify: 'exact',
    solve: () => findRoot(x => valueAt(DERIVATIVE_GRAPH.series[0].points, x), 1, 3),
    reviewed: true,
  },
  {
    id: 'calc-curve-sketching-005',
    topic: 'curve-sketching',
    difficulty: 2,
    prompt: 'A twice-differentiable function f has f\'(4) = 0 and f\'\'(4) = −3. Which statement is true?',
    choices: [
      'f has a local maximum at x = 4',
      'f has a local minimum at x = 4',
      'f has a point of inflection at x = 4',
      'There is not enough information to classify x = 4',
    ],
    answer: 0,
    explanation: 'This is the Second Derivative Test: at a critical point where f\'\' < 0, the graph is concave down, so the point is a local maximum. The test is inconclusive only when f\'\'(4) = 0.',
    reviewed: true,
  },
];
