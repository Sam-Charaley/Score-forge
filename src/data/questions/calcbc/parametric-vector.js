// AP Calculus BC, Unit 9 (first half): parametric equations and vector-valued functions.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { derivative, integrate } from '../calcMath.js'

const square = t => t * t;
const cube = t => t ** 3;
const parametricSlope = t => derivative(cube, t) / derivative(square, t);

export default [
  {
    id: 'calcbc-parametric-vector-001',
    topic: 'parametric-vector',
    difficulty: 1,
    prompt: 'A curve is given by x = t² and y = t³. What is dy/dx at t = 2?',
    choices: ['12', '3', '3/2', '4'],
    answer: 1,
    explanation: 'dy/dx = (dy/dt)/(dx/dt) = 3t²/(2t) = 3t/2, which is 3 at t = 2. 12 is dy/dt alone and 4 is dx/dt alone.',
    verify: 'exact',
    solve: () => parametricSlope(2),
    reviewed: true,
  },
  {
    id: 'calcbc-parametric-vector-002',
    topic: 'parametric-vector',
    difficulty: 3,
    prompt: 'A curve is given by x = t² and y = t³. What is d²y/dx² at t = 1?',
    choices: ['3/2', '3/4', '3', '6'],
    answer: 1,
    explanation: 'dy/dx = 3t/2. The second derivative is the t-derivative of that divided by dx/dt: (3/2)/(2t) = 3/(4t), which is 3/4 at t = 1. 3/2 forgets to divide by dx/dt, and 6 is d²y/dt².',
    verify: 'exact',
    solve: () => derivative(parametricSlope, 1) / derivative(square, 1),
    tolerance: 1e-5,
    reviewed: true,
  },
  {
    id: 'calcbc-parametric-vector-003',
    topic: 'parametric-vector',
    difficulty: 2,
    prompt: 'A particle moves with position x(t) = 2t and y(t) = t². What is its speed at t = 2?',
    choices: ['6', '20', '2√5', '4'],
    answer: 2,
    explanation: 'The velocity is ⟨2, 2t⟩ = ⟨2, 4⟩ at t = 2. Speed is its magnitude: √(4 + 16) = √20 = 2√5. 6 adds the components instead of combining them with Pythagoras.',
    verify: 'exact',
    solve: () => Math.hypot(derivative(t => 2 * t, 2), derivative(square, 2)),
    reviewed: true,
  },
  {
    id: 'calcbc-parametric-vector-004',
    topic: 'parametric-vector',
    difficulty: 3,
    prompt: 'What is the length of the curve x = t², y = t³ for 0 ≤ t ≤ 1?',
    choices: ['(13√13 − 8)/27', '(13√13)/27', '(13√13 − 8)/9', '√13'],
    answer: 0,
    explanation: 'L = ∫₀¹ √((2t)² + (3t²)²) dt = ∫₀¹ t√(4 + 9t²) dt. With u = 4 + 9t², this is (1/27)(4 + 9t²)^(3/2) from 0 to 1 = (13√13 − 8)/27. (13√13)/27 forgets the lower limit, which is 8/27, not 0.',
    verify: 'exact',
    solve: () => integrate(t => Math.hypot(derivative(square, t), derivative(cube, t)), 0, 1),
    reviewed: true,
  },
  {
    id: 'calcbc-parametric-vector-005',
    topic: 'parametric-vector',
    difficulty: 2,
    prompt: 'A particle has position r(t) = ⟨t², sin t⟩. What is its acceleration vector at t = 0?',
    choices: ['⟨0, 1⟩', '⟨2, 0⟩', '⟨2, 1⟩', '⟨0, 0⟩'],
    answer: 1,
    explanation: 'Differentiate each component twice: the velocity is ⟨2t, cos t⟩ and the acceleration is ⟨2, −sin t⟩. At t = 0 that is ⟨2, 0⟩. ⟨0, 1⟩ is the velocity at t = 0.',
    reviewed: true,
  },
];
