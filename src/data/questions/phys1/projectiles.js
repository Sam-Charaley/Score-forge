// AP Physics 1, Unit 1: projectile motion and reference frames.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { G } from './topics.js'

const DEGREES = Math.PI / 180;

export default [
  {
    id: 'phys1-projectiles-001',
    topic: 'projectiles',
    difficulty: 1,
    prompt: 'At the same moment, ball A rolls off the edge of a table horizontally and ball B is dropped from rest from the same height. Ignoring air resistance, which lands first?',
    choices: ['Ball A, because it is moving faster', 'Ball B, because it travels a shorter path', 'They land at the same time', 'It depends on how fast ball A is moving'],
    answer: 2,
    explanation: 'Horizontal and vertical motion are independent. Both balls start with zero vertical velocity and have the same downward acceleration g, so they fall the same height in the same time. Ball A\'s horizontal speed only changes where it lands.',
    reviewed: false,
  },
  {
    id: 'phys1-projectiles-002',
    topic: 'projectiles',
    difficulty: 2,
    prompt: 'A ball is thrown horizontally at 15 m/s from the top of a cliff 4.9 m high. How far from the base of the cliff does it land? (g = 9.8 m/s²)',
    choices: ['7.5 m', '15 m', '30 m', '74 m'],
    answer: 1,
    explanation: 'The fall time comes from the vertical motion alone: t = √(2h/g) = √(2 × 4.9/9.8) = 1.0 s. Horizontally the speed is constant, so x = 15 m/s × 1.0 s = 15 m. 74 m comes from multiplying the speed by the height.',
    verify: 'numeric',
    solve: () => 15 * Math.sqrt((2 * 4.9) / G),
    reviewed: false,
  },
  {
    id: 'phys1-projectiles-003',
    topic: 'projectiles',
    difficulty: 2,
    prompt: 'A ball is launched at 40° above the horizontal. Ignoring air resistance, which describes the ball at the highest point of its path?',
    choices: [
      'Its velocity and acceleration are both zero',
      'Its velocity is zero, and its acceleration is g downward',
      'Its velocity is horizontal, and its acceleration is zero',
      'Its velocity is horizontal, and its acceleration is g downward',
    ],
    answer: 3,
    explanation: 'Only the vertical component of velocity becomes zero at the top; the horizontal component never changes, so the ball is still moving sideways. Gravity acts the whole time, so the acceleration is g downward even at the top.',
    reviewed: false,
  },
  {
    id: 'phys1-projectiles-004',
    topic: 'projectiles',
    difficulty: 3,
    prompt: 'A ball is launched at 20 m/s at 30° above the horizontal and lands at the same height it started from. How long is it in the air? (g = 9.8 m/s²)',
    choices: ['2.0 s', '1.0 s', '3.5 s', '4.1 s'],
    answer: 0,
    explanation: 'The vertical launch speed is 20 sin 30° = 10 m/s. Rising to the top takes 10/9.8 ≈ 1.0 s, and coming back down takes the same, so the total is 2(10)/9.8 = 2.0 s. 1.0 s is only the trip up, and 3.5 s uses the horizontal component (20 cos 30°) by mistake.',
    verify: 'numeric',
    solve: () => (2 * 20 * Math.sin(30 * DEGREES)) / G,
    reviewed: false,
  },
  {
    id: 'phys1-projectiles-005',
    topic: 'projectiles',
    difficulty: 2,
    prompt: 'A train moves forward at 20 m/s. A passenger walks toward the back of the train at 1.5 m/s relative to the train. What is the passenger\'s speed relative to the ground?',
    choices: ['21.5 m/s', '18.5 m/s', '20 m/s', '1.5 m/s'],
    answer: 1,
    explanation: 'Velocities relative to different frames add as vectors: the passenger\'s velocity relative to the ground is +20 m/s + (−1.5 m/s) = +18.5 m/s, still forward. 21.5 m/s would be right if the passenger walked toward the front.',
    verify: 'numeric',
    solve: () => 20 - 1.5,
    reviewed: false,
  },
];
