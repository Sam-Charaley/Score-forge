// AP Calculus AB and BC, Unit 7: separable equations, slope fields, exponential growth,
// and the BC-only Euler's method and logistic models.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { solveODE, eulerMethod, derivative, findRoot } from '../calcMath.js'

const CARRYING_CAPACITY = 500;
const logisticRate = population => 0.2 * population * (1 - population / CARRYING_CAPACITY);

export default [
  {
    id: 'calc-differential-equations-001',
    topic: 'differential-equations',
    difficulty: 1,
    prompt: 'If dy/dx = 2y and y(0) = 3, what is y(1)?',
    choices: ['3e', 'e²', '3e²', '6'],
    answer: 2,
    explanation: 'Separating gives dy/y = 2 dx, so ln|y| = 2x + C and y = Ce^(2x). y(0) = 3 makes C = 3, so y(1) = 3e². e² forgets the initial value.',
    verify: 'exact',
    solve: () => solveODE((x, y) => 2 * y, 0, 3, 1),
    reviewed: true,
  },
  {
    id: 'calc-differential-equations-002',
    topic: 'differential-equations',
    difficulty: 2,
    prompt: 'If dy/dx = x/y and y(0) = 2, what is y(3)? (Take y > 0.)',
    choices: ['√13', '√5', '13', '5'],
    answer: 0,
    explanation: 'Separate: y dy = x dx, so y²/2 = x²/2 + C, or y² = x² + C. y(0) = 2 gives C = 4, so y(3) = √(9 + 4) = √13. 13 forgets the square root.',
    verify: 'exact',
    solve: () => solveODE((x, y) => x / y, 0, 2, 3),
    reviewed: true,
  },
  {
    id: 'calc-differential-equations-003',
    topic: 'differential-equations',
    difficulty: 2,
    prompt: 'In a slope field, every segment along the line y = x is horizontal, and the segments have positive slope at every point above that line. Which differential equation could it show?',
    choices: ['dy/dx = x − y', 'dy/dx = xy', 'dy/dx = y − x', 'dy/dx = x + y'],
    answer: 2,
    explanation: 'Horizontal segments on y = x mean dy/dx = 0 wherever y = x, which fits y − x and x − y. Above the line y > x, so y − x is positive there. x − y would be negative above the line.',
    reviewed: true,
  },
  {
    id: 'calc-differential-equations-004',
    topic: 'differential-equations',
    onlyIn: 'calcbc',
    difficulty: 2,
    prompt: 'Let y = f(x) solve dy/dx = x + y with f(0) = 1. Using Euler\'s method with two steps of size 0.5, what is the approximation of f(1)?',
    choices: ['2', '2.5', '3', '3.25'],
    answer: 1,
    explanation: 'Step 1: the slope at (0, 1) is 1, so y ≈ 1 + 0.5(1) = 1.5 at x = 0.5. Step 2: the slope at (0.5, 1.5) is 2, so y ≈ 1.5 + 0.5(2) = 2.5 at x = 1. 2 uses the starting slope for both steps.',
    verify: 'exact',
    solve: () => eulerMethod((x, y) => x + y, 0, 1, 0.5, 1),
    reviewed: true,
  },
  {
    id: 'calc-differential-equations-005',
    topic: 'differential-equations',
    onlyIn: 'calcbc',
    difficulty: 3,
    prompt: 'A population grows according to dP/dt = 0.2P(1 − P/500). At what population is it growing fastest?',
    choices: ['500', '100', '125', '250'],
    answer: 3,
    explanation: 'Logistic growth is fastest at half the carrying capacity. Here the carrying capacity is 500, so the rate 0.2P(1 − P/500) peaks at P = 250. At P = 500 the growth rate is zero.',
    verify: 'exact',
    // The population where the growth rate itself stops increasing.
    solve: () => findRoot(population => derivative(logisticRate, population), 100, 400),
    tolerance: 1e-5,
    reviewed: true,
  },
];
