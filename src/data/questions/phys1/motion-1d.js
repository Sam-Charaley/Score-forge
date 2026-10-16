// AP Physics 1, Unit 1: motion in one dimension and motion graphs.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
// verify: 'numeric' questions carry solve(), which recomputes the key from
// the givens; questions.test.js checks it against the marked choice.
import { G } from './topics.js'

export default [
  {
    id: 'phys1-motion-1d-001',
    topic: 'motion-1d',
    difficulty: 1,
    prompt: 'A car starts from rest and speeds up uniformly to 24 m/s in 6.0 s. How far does it travel in that time?',
    choices: ['144 m', '72 m', '36 m', '4.0 m'],
    answer: 1,
    explanation: 'With constant acceleration from rest, the distance is the average velocity times the time: ½(0 + 24 m/s)(6.0 s) = 72 m. 144 m comes from using the final speed as if it were the average, and 4.0 m/s² is the acceleration, not a distance.',
    verify: 'numeric',
    solve: () => 0.5 * (0 + 24) * 6.0,
    reviewed: true,
  },
  {
    id: 'phys1-motion-1d-002',
    topic: 'motion-1d',
    difficulty: 2,
    prompt: 'An object\'s velocity-time graph is a straight line that starts at +6 m/s and falls steadily to −6 m/s over 4.0 s. Which statement is true?',
    choices: [
      'Its acceleration is zero at t = 2.0 s',
      'Its displacement over the 4.0 s is 24 m',
      'At t = 2.0 s it is momentarily at rest, but its acceleration is still −3 m/s²',
      'It speeds up during the whole 4.0 s',
    ],
    answer: 2,
    explanation: 'The slope of a v-t graph is the acceleration, and this one is constant: (−6 − 6)/4.0 = −3 m/s². At t = 2.0 s the velocity crosses zero, so the object is momentarily at rest while still accelerating. The areas above and below the axis cancel, so the displacement is zero, and it slows down for the first 2 s before speeding up.',
    reviewed: true,
  },
  {
    id: 'phys1-motion-1d-003',
    topic: 'motion-1d',
    difficulty: 2,
    prompt: 'A ball is dropped from rest from a height of 20 m. Ignoring air resistance, how long does it take to reach the ground? (g = 9.8 m/s²)',
    choices: ['1.4 s', '4.1 s', '0.45 s', '2.0 s'],
    answer: 3,
    explanation: 'From rest, h = ½gt², so t = √(2h/g) = √(40/9.8) = 2.0 s. 4.1 s is 2h/g without the square root, and 1.4 s comes from leaving out the factor of 2.',
    verify: 'numeric',
    solve: () => Math.sqrt((2 * 20) / G),
    reviewed: true,
  },
  {
    id: 'phys1-motion-1d-004',
    topic: 'motion-1d',
    difficulty: 2,
    prompt: 'An object\'s position-time graph is a curve with a positive slope that gets steeper as time goes on. What is the object doing?',
    choices: [
      'Moving in the positive direction and speeding up',
      'Moving in the positive direction and slowing down',
      'Moving at constant velocity',
      'Moving in the negative direction and speeding up',
    ],
    answer: 0,
    explanation: 'The slope of a position-time graph is the velocity. A positive slope means motion in the positive direction, and a slope that grows steeper means the velocity is increasing, so the object is speeding up.',
    reviewed: true,
  },
  {
    id: 'phys1-motion-1d-005',
    topic: 'motion-1d',
    difficulty: 3,
    prompt: 'A car moving at 20 m/s brakes with a constant deceleration of 5.0 m/s² and stops in 40 m. With the same deceleration, how far would it take to stop from 40 m/s?',
    choices: ['80 m', '160 m', '40 m', '320 m'],
    answer: 1,
    explanation: 'From v² = v₀² − 2ad with v = 0, the stopping distance is v₀²/(2a), so it grows with the square of the speed. Doubling the speed gives four times the distance: (40)²/(2 × 5.0) = 160 m. 80 m assumes distance is proportional to speed.',
    verify: 'numeric',
    solve: () => (40 ** 2) / (2 * 5.0),
    reviewed: true,
  },
];
