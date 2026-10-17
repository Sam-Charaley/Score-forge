// AP Calculus AB and BC, Unit 8 (second half): average value, and position, velocity and distance from integrals.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { integrate, findRoot } from '../calcMath.js'

const quadraticVelocity = t => t * t - 4 * t + 3;
const oscillatingVelocity = t => Math.sin(t * t);

// Total distance splits the integral where velocity changes sign, so each
// piece is smooth and its absolute value is a plain sign flip.
function totalDistance(velocity, start, end, turningTimes) {
  const bounds = [start, ...turningTimes, end];
  return bounds.slice(1).reduce((sum, right, i) => sum + Math.abs(integrate(velocity, bounds[i], right)), 0);
}

export default [
  {
    id: 'calc-average-value-motion-001',
    topic: 'average-value-motion',
    formulas: ['average-value'],
    difficulty: 1,
    prompt: 'What is the average value of f(x) = x² on [0, 3]?',
    choices: ['9', '3', '9/2', '1'],
    answer: 1,
    explanation: 'The average value is (1/(3 − 0))∫₀³ x² dx = (1/3)(9) = 3. 9 is the integral before dividing by the interval length, and 9/2 averages the endpoint values.',
    verify: 'exact',
    solve: () => integrate(x => x * x, 0, 3) / 3,
    reviewed: true,
  },
  {
    id: 'calc-average-value-motion-002',
    topic: 'average-value-motion',
    formulas: ['displacement-distance', 'accumulation'],
    difficulty: 2,
    prompt: 'A particle starts at x = 5 when t = 0 and moves with velocity v(t) = 2t − 6. What is its position at t = 4?',
    choices: ['−8', '2', '−3', '5'],
    answer: 2,
    explanation: 'Position is the start plus the displacement: 5 + ∫₀⁴ (2t − 6) dt = 5 + (16 − 24) = −3. −8 is the displacement alone.',
    verify: 'exact',
    solve: () => 5 + integrate(t => 2 * t - 6, 0, 4),
    reviewed: true,
  },
  {
    id: 'calc-average-value-motion-003',
    topic: 'average-value-motion',
    formulas: ['displacement-distance'],
    difficulty: 3,
    prompt: 'A particle moves with velocity v(t) = t² − 4t + 3 for 0 ≤ t ≤ 3. What is the total distance it travels?',
    choices: ['0', '4/3', '8/3', '4'],
    answer: 2,
    explanation: 'v(t) = (t − 1)(t − 3) is positive on (0, 1) and negative on (1, 3). The distances are ∫₀¹ v dt = 4/3 and |∫₁³ v dt| = 4/3, a total of 8/3. 0 is the displacement: the two pieces cancel.',
    verify: 'exact',
    solve: () => totalDistance(quadraticVelocity, 0, 3, [findRoot(quadraticVelocity, 0, 2)]),
    reviewed: true,
  },
  {
    id: 'calc-average-value-motion-004',
    topic: 'average-value-motion',
    formulas: ['motion'],
    difficulty: 2,
    prompt: 'A particle has velocity v(t) = t² − 1. At t = 1/2, is its speed increasing or decreasing?',
    choices: [
      'Increasing, because a(1/2) > 0',
      'Decreasing, because v(1/2) < 0',
      'Decreasing, because v(1/2) and a(1/2) have opposite signs',
      'Increasing, because v(1/2) and a(1/2) have the same sign',
    ],
    answer: 2,
    explanation: 'v(1/2) = 1/4 − 1 = −3/4 and a(t) = 2t, so a(1/2) = 1. The velocity and acceleration have opposite signs, so the speed is decreasing. Neither sign alone decides it.',
    reviewed: true,
  },
  {
    id: 'calc-average-value-motion-005',
    topic: 'average-value-motion',
    formulas: ['displacement-distance'],
    difficulty: 3,
    prompt: 'A particle moves along a line with velocity v(t) = sin(t²) for 0 ≤ t ≤ 3. What is the total distance it travels?',
    calculator: true,
    choices: ['0.774', '1.702', '0.258', '2.476'],
    answer: 1,
    explanation: 'Total distance is ∫₀³ |sin(t²)| dt ≈ 1.702. 0.774 is the displacement ∫₀³ sin(t²) dt, where the time moving backward cancels some of the forward motion, and 0.258 is the average velocity.',
    verify: 'numeric',
    solve: () => totalDistance(oscillatingVelocity, 0, 3, [Math.sqrt(Math.PI), Math.sqrt(2 * Math.PI)]),
    reviewed: true,
  },
];
