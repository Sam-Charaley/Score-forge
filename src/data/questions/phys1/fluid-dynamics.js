// AP Physics 1, Unit 8: fluid flow, continuity and Bernoulli's equation.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { G } from './topics.js'

const WATER_DENSITY = 1000;  // kg/m³

export default [
  {
    id: 'phys1-fluid-dynamics-001',
    topic: 'fluid-dynamics',
    formulas: ['continuity'],
    difficulty: 1,
    prompt: 'Water flows at 2.0 m/s through a pipe with a cross-sectional area of 4.0 cm². The pipe narrows to 1.0 cm². How fast does the water flow in the narrow part?',
    choices: ['0.50 m/s', '4.0 m/s', '16 m/s', '8.0 m/s'],
    answer: 3,
    explanation: 'Water is nearly incompressible, so the volume passing each point per second is the same: A₁v₁ = A₂v₂, giving v₂ = (4.0 × 2.0)/1.0 = 8.0 m/s. A quarter of the area means four times the speed.',
    verify: 'numeric',
    solve: () => (4.0 * 2.0) / 1.0,
    reviewed: true,
  },
  {
    id: 'phys1-fluid-dynamics-002',
    topic: 'fluid-dynamics',
    formulas: ['bernoulli', 'continuity'],
    difficulty: 2,
    prompt: 'Water flows through a horizontal pipe that narrows. How does the pressure in the narrow section compare with the pressure in the wide section?',
    choices: [
      'It is higher, because the water is squeezed',
      'It is lower, because the water moves faster there',
      'It is the same, because the pipe is horizontal',
      'It is lower, because less water passes through each second',
    ],
    answer: 1,
    explanation: 'By continuity the water speeds up in the narrow section. Bernoulli\'s equation says that at the same height, where ½ρv² is larger, P must be smaller. The same volume passes each section every second, so the last choice is wrong.',
    reviewed: true,
  },
  {
    id: 'phys1-fluid-dynamics-003',
    topic: 'fluid-dynamics',
    formulas: ['bernoulli'],
    difficulty: 2,
    prompt: 'Water leaks from a small hole in the side of an open tank, 0.80 m below the water surface. How fast does the water leave the hole? (g = 9.8 m/s²)',
    choices: ['4.0 m/s', '16 m/s', '2.8 m/s', '7.8 m/s'],
    answer: 0,
    explanation: 'Both the surface and the jet are at atmospheric pressure, and the surface barely moves, so Bernoulli\'s equation gives ½v² = gh and v = √(2gh) = √(2 × 9.8 × 0.80) = 4.0 m/s. It is the same speed as an object falling 0.80 m.',
    verify: 'numeric',
    solve: () => Math.sqrt(2 * G * 0.80),
    reviewed: true,
  },
  {
    id: 'phys1-fluid-dynamics-004',
    topic: 'fluid-dynamics',
    formulas: ['bernoulli'],
    difficulty: 3,
    prompt: 'In a horizontal pipe, water speeds up from 2.0 m/s to 8.0 m/s. How much lower is the pressure in the fast-moving section? (water density 1000 kg/m³)',
    choices: ['18,000 Pa', '60,000 Pa', '30,000 Pa', '3000 Pa'],
    answer: 2,
    explanation: 'With no height change, Bernoulli\'s equation gives ΔP = ½ρ(v₂² − v₁²) = ½ × 1000 × (64 − 4.0) = 30,000 Pa. 18,000 Pa squares the difference in speeds instead of taking the difference of the squares, and 60,000 Pa forgets the ½.',
    verify: 'numeric',
    solve: () => 0.5 * WATER_DENSITY * (8.0 ** 2 - 2.0 ** 2),
    reviewed: true,
  },
  {
    id: 'phys1-fluid-dynamics-005',
    topic: 'fluid-dynamics',
    formulas: ['continuity'],
    difficulty: 2,
    prompt: 'Water flows steadily through a pipe that changes from wide to narrow. How does the volume of water passing through the narrow section each second compare with the wide section?',
    choices: ['It is larger', 'It is smaller', 'It is the same', 'It depends on the pressure difference'],
    answer: 2,
    explanation: 'An incompressible fluid can\'t pile up or disappear inside the pipe, so the volume flow rate Av is the same everywhere along it. The narrow section carries the same volume per second by moving faster.',
    reviewed: true,
  },
];
