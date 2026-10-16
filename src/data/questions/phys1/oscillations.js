// AP Physics 1, Unit 7: simple harmonic motion in springs and pendulums.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { G } from './topics.js'
// A mass on a spring: x(t) = A cos(2πt/T), drawn as a smooth curve.
const SPRING_AMPLITUDE = 0.10;
const SPRING_PERIOD = 0.80;
const SPRING_MOTION = { type: 'graph', xLabel: 't (s)', yLabel: 'x (m)', xMax: 1.6, xStep: 0.2, yMin: -0.15, yMax: 0.15, yStep: 0.05,
  series: [{ points: Array.from({ length: 65 }, (_, i) => { const t = (i * 1.6) / 64; return [t, SPRING_AMPLITUDE * Math.cos((2 * Math.PI * t) / SPRING_PERIOD)]; }) }],
  alt: 'Position-time graph of a mass on a spring: a cosine curve starting at +0.10 m at t = 0, reaching −0.10 m at t = 0.4 s and returning to +0.10 m at t = 0.8 s, then repeating once more by t = 1.6 s.' };

export default [
  {
    id: 'phys1-oscillations-001',
    topic: 'oscillations',
    difficulty: 1,
    prompt: 'A simple pendulum swings with small amplitude. If the mass of the bob is doubled, what happens to the period?',
    choices: ['It doubles', 'It increases by a factor of √2', 'It stays the same', 'It halves'],
    answer: 2,
    explanation: 'For small swings, T = 2π√(L/g): the period depends only on the length and g. A heavier bob needs more force to accelerate, but gravity pulls on it proportionally harder, so the two effects cancel.',
    reviewed: true,
  },
  {
    id: 'phys1-oscillations-002',
    topic: 'oscillations',
    difficulty: 2,
    prompt: 'A 0.50 kg mass oscillates on a spring with k = 200 N/m. What is the period of oscillation?',
    choices: ['0.050 s', '20 s', '0.31 s', '0.63 s'],
    answer: 2,
    explanation: 'T = 2π√(m/k) = 2π√(0.50/200) = 2π × 0.050 = 0.31 s. 0.050 s forgets the 2π, and 20 is √(k/m), the angular frequency in rad/s.',
    verify: 'numeric',
    solve: () => 2 * Math.PI * Math.sqrt(0.50 / 200),
    reviewed: true,
  },
  {
    id: 'phys1-oscillations-003',
    topic: 'oscillations',
    difficulty: 2,
    prompt: 'What length of simple pendulum has a period of 2.0 s? (g = 9.8 m/s²)',
    choices: ['3.1 m', '0.50 m', '0.99 m', '2.0 m'],
    answer: 2,
    explanation: 'Solve T = 2π√(L/g) for L: L = gT²/(4π²) = 9.8 × 4.0/39.5 = 0.99 m. A pendulum about a meter long takes about one second to swing each way.',
    verify: 'numeric',
    solve: () => (G * 2.0 ** 2) / (4 * Math.PI ** 2),
    reviewed: true,
  },
  {
    id: 'phys1-oscillations-004',
    topic: 'oscillations',
    difficulty: 2,
    prompt: 'A mass on a spring oscillates in simple harmonic motion. Which describes the mass as it passes through the equilibrium position?',
    choices: [
      'Speed is maximum and acceleration is zero',
      'Speed is zero and acceleration is maximum',
      'Speed and acceleration are both maximum',
      'Speed and acceleration are both zero',
    ],
    answer: 0,
    explanation: 'At equilibrium the spring force is zero, so the acceleration is zero, and all the energy is kinetic, so the speed is greatest. At the turning points the reverse is true: momentarily at rest, with the largest restoring force.',
    reviewed: true,
  },
  {
    id: 'phys1-oscillations-005',
    topic: 'oscillations',
    difficulty: 3,
    prompt: 'A 0.40 kg mass on a spring with k = 160 N/m oscillates with an amplitude of 0.050 m. What is its maximum speed?',
    choices: ['20 m/s', '0.50 m/s', '1.0 m/s', '0.20 m/s'],
    answer: 2,
    explanation: 'All of the energy is spring energy at the turning point and kinetic energy at equilibrium: ½kA² = ½mv², so v = A√(k/m) = 0.050 × √(160/0.40) = 0.050 × 20 = 1.0 m/s.',
    verify: 'numeric',
    solve: () => 0.050 * Math.sqrt(160 / 0.40),
    reviewed: true,
  },
  {
    id: 'phys1-oscillations-006',
    topic: 'oscillations',
    difficulty: 2,
    prompt: 'The graph shows the position of a mass oscillating on a spring. What is the frequency of the oscillation?',
    figure: SPRING_MOTION,
    choices: ['0.80 Hz', '1.25 Hz', '2.5 Hz', '0.10 Hz'],
    answer: 1,
    explanation: 'One full cycle, from +0.10 m back to +0.10 m, takes 0.80 s, so the period is 0.80 s and the frequency is 1/0.80 = 1.25 Hz. 0.80 is the period, not the frequency, and 0.10 m is the amplitude.',
    verify: 'numeric',
    solve: () => 1 / SPRING_PERIOD,
    reviewed: false,
  },
];
