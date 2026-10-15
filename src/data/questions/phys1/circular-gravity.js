// AP Physics 1, Unit 2: circular motion and gravitation.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { G } from './topics.js'

export default [
  {
    id: 'phys1-circular-gravity-001',
    topic: 'circular-gravity',
    difficulty: 1,
    prompt: 'A ball on a string is swung in a horizontal circle. Seen from above, what path does the ball take right after the string breaks?',
    choices: ['It keeps moving in a circle', 'It moves straight outward, away from the center', 'It moves in a straight line along the tangent to the circle', 'It spirals outward'],
    answer: 2,
    explanation: 'The string\'s pull toward the center was the only thing bending the path. Once it is gone, there is no horizontal force, so the ball keeps the velocity it had at that instant, which points along the tangent (Newton\'s first law).',
    reviewed: false,
  },
  {
    id: 'phys1-circular-gravity-002',
    topic: 'circular-gravity',
    difficulty: 2,
    prompt: 'A 1200 kg car drives around a flat curve of radius 50 m at 15 m/s. What friction force from the road is needed to keep it on the curve?',
    choices: ['360 N', '5400 N', '11,800 N', '2700 N'],
    answer: 1,
    explanation: 'On a flat curve, static friction is the only force toward the center, so it must equal mv²/r = 1200 × 15²/50 = 5400 N. 360 N uses v instead of v², and 11,800 N is the car\'s weight.',
    verify: 'numeric',
    solve: () => (1200 * 15 ** 2) / 50,
    reviewed: false,
  },
  {
    id: 'phys1-circular-gravity-003',
    topic: 'circular-gravity',
    difficulty: 2,
    prompt: 'A satellite orbits at a distance 2R from Earth\'s center, where R is Earth\'s radius. It is moved to an orbit at 4R. How does the gravitational force on it change?',
    choices: ['It becomes half as large', 'It becomes one quarter as large', 'It becomes twice as large', 'It stays the same'],
    answer: 1,
    explanation: 'Gravitational force follows an inverse square law, F = GMm/r². Doubling the distance from the center (2R to 4R) divides the force by 2² = 4.',
    reviewed: false,
  },
  {
    id: 'phys1-circular-gravity-004',
    topic: 'circular-gravity',
    difficulty: 3,
    prompt: 'A car drives over the top of a hill shaped like a circular arc of radius 20 m. What is the greatest speed at which it can pass the top without leaving the road? (g = 9.8 m/s²)',
    choices: ['20 m/s', '9.9 m/s', '14 m/s', '196 m/s'],
    answer: 2,
    explanation: 'At the top, gravity minus the normal force supplies mv²/r toward the center. The car is about to leave the road when the normal force reaches zero, so mg = mv²/r and v = √(gr) = √(9.8 × 20) = 14 m/s. 196 m/s is gr without the square root.',
    verify: 'numeric',
    solve: () => Math.sqrt(G * 20),
    reviewed: false,
  },
  {
    id: 'phys1-circular-gravity-005',
    topic: 'circular-gravity',
    difficulty: 2,
    prompt: 'A roller coaster car passes through the bottom of a circular dip. How does the normal force on a rider compare with the rider\'s weight at that point?',
    choices: ['It is greater than the weight', 'It equals the weight', 'It is less than the weight', 'It is zero'],
    answer: 0,
    explanation: 'At the bottom the net force must point up, toward the center of the circle, so the normal force must be larger than the weight: N − mg = mv²/r. That is why riders feel heavier at the bottom of a dip.',
    reviewed: false,
  },
];
