// AP Physics 1, Unit 2: Newton's laws, friction and spring forces.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { G } from './topics.js'

const DEGREES = Math.PI / 180;

export default [
  {
    id: 'phys1-newtons-laws-001',
    topic: 'newtons-laws',
    difficulty: 1,
    prompt: 'An elevator moves upward at a constant speed. How does the tension in its cable compare with the elevator\'s weight?',
    choices: ['The tension is greater than the weight', 'The tension equals the weight', 'The tension is less than the weight', 'It depends on how fast the elevator is moving'],
    answer: 1,
    explanation: 'Constant velocity means zero acceleration, so by Newton\'s second law the net force is zero and the upward tension exactly balances the weight. The speed doesn\'t matter; tension is greater than the weight only while the elevator is speeding up going upward.',
    reviewed: false,
  },
  {
    id: 'phys1-newtons-laws-002',
    topic: 'newtons-laws',
    difficulty: 2,
    prompt: 'A 4.0 kg box is pushed across a floor with a horizontal force of 30 N. The coefficient of kinetic friction is 0.25. What is the box\'s acceleration? (g = 9.8 m/s²)',
    choices: ['7.5 m/s²', '2.5 m/s²', '5.1 m/s²', '10 m/s²'],
    answer: 2,
    explanation: 'Friction is μF_N = 0.25 × 4.0 × 9.8 = 9.8 N, so the net force is 30 − 9.8 = 20.2 N and a = 20.2/4.0 = 5.1 m/s². 7.5 m/s² ignores friction, and 2.5 m/s² divides the friction force alone by the mass.',
    verify: 'numeric',
    solve: () => (30 - 0.25 * 4.0 * G) / 4.0,
    reviewed: false,
  },
  {
    id: 'phys1-newtons-laws-003',
    topic: 'newtons-laws',
    difficulty: 2,
    prompt: 'A large truck collides head-on with a small car. During the collision, how does the force of the truck on the car compare with the force of the car on the truck?',
    choices: ['The truck exerts a larger force', 'The car exerts a larger force', 'The forces are equal in size and opposite in direction', 'The truck exerts a force, but the car exerts none'],
    answer: 2,
    explanation: 'These forces are a Newton\'s third law pair, so they are always equal in size and opposite in direction. The car is damaged more because the same force on its smaller mass gives it a much larger acceleration.',
    reviewed: false,
  },
  {
    id: 'phys1-newtons-laws-004',
    topic: 'newtons-laws',
    difficulty: 3,
    prompt: 'A 2.0 kg block slides down a frictionless ramp inclined at 30° to the horizontal. What is the magnitude of its acceleration? (g = 9.8 m/s²)',
    choices: ['8.5 m/s²', '4.9 m/s²', '9.8 m/s²', '2.5 m/s²'],
    answer: 1,
    explanation: 'Only the component of gravity along the ramp, mg sin θ, is unbalanced, so a = g sin 30° = 4.9 m/s², whatever the mass. 8.5 m/s² uses cos θ, which is the component into the ramp that the normal force balances.',
    verify: 'numeric',
    solve: () => G * Math.sin(30 * DEGREES),
    reviewed: false,
  },
  {
    id: 'phys1-newtons-laws-005',
    topic: 'newtons-laws',
    difficulty: 3,
    prompt: 'Two blocks, of mass m and 2m, sit side by side on a frictionless floor. A horizontal force F pushes on the block of mass m, which pushes the other block. What is the force between the two blocks?',
    choices: ['F/3', 'F/2', '2F/3', 'F'],
    answer: 2,
    explanation: 'Treating both blocks as one system, a = F/(3m). The only horizontal force on the 2m block is the push from the other block, so that push is (2m)(F/3m) = 2F/3. It must be less than F, because F also accelerates the block of mass m.',
    reviewed: false,
  },
  {
    id: 'phys1-newtons-laws-006',
    topic: 'newtons-laws',
    difficulty: 2,
    prompt: 'A 0.60 kg mass hangs at rest from a vertical spring with spring constant 200 N/m. How far is the spring stretched? (g = 9.8 m/s²)',
    choices: ['2.9 cm', '0.30 cm', '29 cm', '5.9 cm'],
    answer: 0,
    explanation: 'At rest the spring force balances the weight: kx = mg, so x = (0.60 × 9.8)/200 = 0.029 m = 2.9 cm. 0.30 cm comes from leaving out g, and 29 cm is a unit conversion slip.',
    verify: 'numeric',
    solve: () => ((0.60 * G) / 200) * 100,
    reviewed: false,
  },
];
