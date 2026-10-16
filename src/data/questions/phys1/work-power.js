// AP Physics 1, Unit 3: work, kinetic energy, the work-energy theorem and power.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { G } from './topics.js'

export default [
  {
    id: 'phys1-work-power-001',
    topic: 'work-power',
    difficulty: 1,
    prompt: 'A student pushes a box 5.0 m across a floor with a constant horizontal force of 40 N. How much work does the student do on the box?',
    choices: ['8.0 J', '45 J', '200 J', '20 J'],
    answer: 2,
    explanation: 'When the force points along the displacement, W = Fd = 40 N × 5.0 m = 200 J. 8.0 J comes from dividing instead of multiplying.',
    verify: 'numeric',
    solve: () => 40 * 5.0,
    reviewed: true,
  },
  {
    id: 'phys1-work-power-002',
    topic: 'work-power',
    difficulty: 2,
    prompt: 'A student carries a heavy box across a level room at constant velocity, holding it at the same height. How much work does the student\'s upward force do on the box?',
    choices: ['Zero', 'Positive, equal to the box\'s weight times the distance', 'Negative, because the box pushes down on the student', 'Positive, equal to the box\'s kinetic energy'],
    answer: 0,
    explanation: 'Work is Fd cos θ. The student\'s force is vertical and the displacement is horizontal, so θ = 90° and the work is zero. That fits the work-energy theorem too: the box\'s speed and height don\'t change.',
    reviewed: true,
  },
  {
    id: 'phys1-work-power-003',
    topic: 'work-power',
    difficulty: 2,
    prompt: 'A 0.50 kg ball speeds up from 4.0 m/s to 8.0 m/s. How much net work is done on it?',
    choices: ['4.0 J', '16 J', '12 J', '1.0 J'],
    answer: 2,
    explanation: 'By the work-energy theorem, W_net = ΔK = ½(0.50)(8.0²) − ½(0.50)(4.0²) = 16 − 4.0 = 12 J. 16 J is the final kinetic energy, not the change.',
    verify: 'numeric',
    solve: () => 0.5 * 0.50 * 8.0 ** 2 - 0.5 * 0.50 * 4.0 ** 2,
    reviewed: true,
  },
  {
    id: 'phys1-work-power-004',
    topic: 'work-power',
    difficulty: 2,
    prompt: 'A motor lifts a 50 kg load 10 m at constant speed in 8.0 s. What is the motor\'s average power output? (g = 9.8 m/s²)',
    choices: ['61 W', '610 W', '4900 W', '490 W'],
    answer: 1,
    explanation: 'At constant speed the motor\'s force equals the weight, so it does work mgh = 50 × 9.8 × 10 = 4900 J. Power is work divided by time: 4900 J/8.0 s ≈ 610 W. 4900 W forgets to divide by the time, and 61 W leaves out g.',
    verify: 'numeric',
    solve: () => (50 * G * 10) / 8.0,
    reviewed: true,
  },
  {
    id: 'phys1-work-power-005',
    topic: 'work-power',
    difficulty: 3,
    prompt: 'A car skids to a stop on a level road with the same friction force each time. If it starts skidding at twice the speed, how much farther does it slide?',
    choices: ['The same distance', 'Twice as far', 'Four times as far', 'Eight times as far'],
    answer: 2,
    explanation: 'Friction does negative work equal to the car\'s starting kinetic energy: f·d = ½mv². Kinetic energy grows with the square of speed, so doubling v gives four times the energy and, with the same friction force, four times the distance.',
    reviewed: true,
  },
];
