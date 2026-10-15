// AP Physics 1, Unit 8: density, pressure and buoyancy.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { G } from './topics.js'

const WATER_DENSITY = 1000;  // kg/m³
const ICE_DENSITY = 917;     // kg/m³

export default [
  {
    id: 'phys1-fluid-statics-001',
    topic: 'fluid-statics',
    difficulty: 1,
    prompt: 'What is the gauge pressure 10 m below the surface of a freshwater lake? (water density 1000 kg/m³, g = 9.8 m/s²)',
    choices: ['9800 Pa', '98,000 Pa', '980 Pa', '199,000 Pa'],
    answer: 1,
    explanation: 'Gauge pressure is the pressure from the water alone: ρgh = 1000 × 9.8 × 10 = 98,000 Pa. 199,000 Pa is the absolute pressure, which also includes the atmosphere\'s 101,000 Pa.',
    verify: 'numeric',
    solve: () => WATER_DENSITY * G * 10,
    reviewed: false,
  },
  {
    id: 'phys1-fluid-statics-002',
    topic: 'fluid-statics',
    difficulty: 2,
    prompt: 'Ice has a density of 917 kg/m³. What percentage of a floating ice cube\'s volume is below the surface of fresh water (1000 kg/m³)?',
    choices: ['8%', '50%', '92%', '100%'],
    answer: 2,
    explanation: 'A floating object displaces its own weight of water: ρ_ice·V·g = ρ_water·V_sub·g, so V_sub/V = 917/1000 = 92%. Only 8% sits above the surface.',
    verify: 'numeric',
    solve: () => (ICE_DENSITY / WATER_DENSITY) * 100,
    reviewed: false,
  },
  {
    id: 'phys1-fluid-statics-003',
    topic: 'fluid-statics',
    difficulty: 2,
    prompt: 'Three open containers of different shapes, a narrow tube, a wide tank and a cone, are filled with water to the same depth. How does the pressure at the bottom compare?',
    choices: ['Greatest in the wide tank', 'Greatest in the narrow tube', 'Greatest in the cone', 'The same in all three'],
    answer: 3,
    explanation: 'Pressure in a fluid at rest depends only on the depth and the fluid\'s density: P = P₀ + ρgh. The amount of water and the container\'s shape don\'t matter.',
    reviewed: false,
  },
  {
    id: 'phys1-fluid-statics-004',
    topic: 'fluid-statics',
    difficulty: 3,
    prompt: 'A 2.0 kg rock with a volume of 8.0 × 10⁻⁴ m³ hangs from a spring scale, fully under water. What does the scale read? (water density 1000 kg/m³, g = 9.8 m/s²)',
    choices: ['20 N', '7.8 N', '27 N', '12 N'],
    answer: 3,
    explanation: 'The rock\'s weight is 2.0 × 9.8 = 19.6 N. The buoyant force is ρVg = 1000 × 8.0 × 10⁻⁴ × 9.8 = 7.8 N upward, so the scale only has to supply 19.6 − 7.8 = 12 N. 7.8 N is the buoyant force itself.',
    verify: 'numeric',
    solve: () => 2.0 * G - WATER_DENSITY * 8.0e-4 * G,
    reviewed: false,
  },
  {
    id: 'phys1-fluid-statics-005',
    topic: 'fluid-statics',
    difficulty: 2,
    prompt: 'A sealed block is held fully under water just below the surface, then pushed deeper. Treating water as incompressible, how does the buoyant force on it change?',
    choices: ['It increases, because pressure increases with depth', 'It decreases', 'It stays the same', 'It becomes zero at the bottom'],
    answer: 2,
    explanation: 'Buoyant force equals the weight of the water displaced, ρ_fluid·V·g, and the block displaces the same volume at any depth. Pressure does increase with depth, but on both the top and bottom faces, so the difference between them stays the same.',
    reviewed: false,
  },
];
