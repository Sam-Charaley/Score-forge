// AP Calculus AB and BC, Unit 8 (second half): average value, and position, velocity and distance from integrals.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { integrate, findRoot } from '../calcMath.js'
import { areaUnder, absoluteAreaUnder } from '../figureMath.js'

// Questions 006 and 007: a velocity graph made of straight segments.
const VELOCITY_POINTS = [[0, 0], [2, 4], [5, 4], [6, 0], [8, -2]];
const VELOCITY_GRAPH = { type: 'graph', xLabel: 't (seconds)', yLabel: 'v(t) (meters per second)', xMax: 8, xStep: 1, yMin: -2, yMax: 4, yStep: 1,
  series: [{ points: VELOCITY_POINTS }],
  alt: 'Graph of velocity v(t) for 0 ≤ t ≤ 8. It rises in a straight line from 0 at t = 0 to 4 at t = 2, stays at 4 until t = 5, falls in a straight line to 0 at t = 6, and keeps falling to −2 at t = 8.' };
const START_POSITION = 3;

const temperature = t => 60 + 15 * Math.sin((Math.PI * t) / 12);

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
  {
    id: 'calc-average-value-motion-006',
    topic: 'average-value-motion',
    formulas: ['displacement-distance', 'accumulation'],
    difficulty: 1,
    prompt: 'A particle moves along the x-axis. Its velocity v(t), in meters per second, is shown in the graph. At t = 0 the particle is at x = 3. What is the position of the particle at t = 8?',
    figure: VELOCITY_GRAPH,
    choices: ['19', '16', '23', '−2'],
    answer: 0,
    explanation: 'Position = starting position + displacement. The displacement is the signed area under the graph: 4 (triangle, 0 to 2) + 12 (rectangle, 2 to 5) + 2 (triangle, 5 to 6) − 2 (triangle below the axis, 6 to 8) = 16. So x(8) = 3 + 16 = 19. 16 forgets the starting position, and 23 adds the area below the axis instead of subtracting it.',
    verify: 'exact',
    solve: () => START_POSITION + areaUnder(VELOCITY_POINTS, 0, 8),
    reviewed: false,
  },
  {
    id: 'calc-average-value-motion-007',
    topic: 'average-value-motion',
    formulas: ['displacement-distance'],
    difficulty: 2,
    prompt: 'A particle moves along a line with the velocity v(t), in meters per second, shown in the graph. What is the total distance the particle travels from t = 0 to t = 8, in meters?',
    figure: VELOCITY_GRAPH,
    choices: ['16', '18', '12', '20'],
    answer: 3,
    explanation: 'Total distance adds the areas between the graph and the axis without signs: 4 + 12 + 2 + 2 = 20 meters. 16 is the displacement, which subtracts the 2 meters traveled backward from t = 6 to t = 8.',
    verify: 'exact',
    solve: () => absoluteAreaUnder(VELOCITY_POINTS, 0, 8),
    reviewed: false,
  },
  {
    id: 'calc-average-value-motion-008',
    topic: 'average-value-motion',
    formulas: ['average-value'],
    difficulty: 3,
    prompt: 'The temperature in a greenhouse, in degrees Fahrenheit, is T(t) = 60 + 15 sin(πt/12), where t is hours after 6 a.m. What is the average temperature from t = 0 to t = 6?',
    choices: ['60 + 15/π', '67.5', '60 + 30/π', '60 + 60/π'],
    answer: 2,
    explanation: 'Average value = (1/6)∫₀⁶ (60 + 15 sin(πt/12)) dt = (1/6)[60t − (180/π)cos(πt/12)] from 0 to 6 = (1/6)(360 + 180/π) = 60 + 30/π ≈ 69.5 degrees. 67.5 averages only the endpoint values T(0) = 60 and T(6) = 75, which is not the average value of the function.',
    verify: 'exact',
    solve: () => integrate(temperature, 0, 6) / 6,
    reviewed: false,
  },
];
