// AP Chemistry, Unit 3: solutions, separation techniques and spectroscopy.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { molarMass } from './topics.js'

const SODIUM_CHLORIDE = molarMass({ Na: 1, Cl: 1 });
const MILLILITERS_PER_LITER = 1000;

export default [
  {
    id: 'chem-solutions-001',
    topic: 'solutions',
    formulas: ['molarity', 'moles-mass'],
    difficulty: 1,
    prompt: 'What is the molarity of a solution made by dissolving 5.85 g of NaCl in enough water to make 250. mL of solution?',
    choices: ['0.100 M', '0.400 M', '23.4 M', '0.0234 M'],
    answer: 1,
    explanation: '5.85 g ÷ 58.44 g/mol = 0.100 mol NaCl, and 250. mL = 0.250 L, so M = 0.100/0.250 = 0.400 M. 0.100 M forgets to divide by the volume.',
    verify: 'numeric',
    solve: () => (5.85 / SODIUM_CHLORIDE) / (250 / MILLILITERS_PER_LITER),
    reviewed: true,
  },
  {
    id: 'chem-solutions-002',
    topic: 'solutions',
    formulas: ['dilution'],
    difficulty: 1,
    prompt: '50.0 mL of 2.00 M HCl is diluted with water to a total volume of 250. mL. What is the new concentration?',
    choices: ['10.0 M', '0.400 M', '0.200 M', '2.00 M'],
    answer: 1,
    explanation: 'M₁V₁ = M₂V₂, so M₂ = (2.00)(50.0)/250. = 0.400 M. Adding water spreads the same moles over more volume. 10.0 M multiplies the wrong way.',
    verify: 'numeric',
    solve: () => (2.00 * 50.0) / 250,
    reviewed: true,
  },
  {
    id: 'chem-solutions-003',
    topic: 'solutions',
    formulas: ['beer-lambert'],
    difficulty: 2,
    prompt: 'A solution in a 1.00 cm cuvette has an absorbance of 0.45. The molar absorptivity is 150 M⁻¹cm⁻¹. What is the concentration?',
    choices: ['3.0 × 10⁻³ M', '3.0 × 10⁻² M', '67.5 M', '3.3 × 10² M'],
    answer: 0,
    explanation: 'A = εbc, so c = A/(εb) = 0.45/(150 × 1.00) = 3.0 × 10⁻³ M. 67.5 M multiplies A and ε instead of dividing.',
    verify: 'numeric',
    solve: () => 0.45 / (150 * 1.00),
    reviewed: true,
  },
  {
    id: 'chem-solutions-004',
    topic: 'solutions',
    formulas: ['beer-lambert'],
    difficulty: 2,
    prompt: 'A student\'s cuvette has a fingerprint on it, which absorbs some light. How does this affect the concentration she calculates?',
    choices: [
      'It is too high, because the measured absorbance is too high',
      'It is too low, because less light reaches the sample',
      'It is unaffected, because ε is a constant',
      'It is too low, because the path length increases',
    ],
    answer: 0,
    explanation: 'The fingerprint absorbs light too, so the spectrometer reads a larger absorbance than the solution alone. Since c = A/(εb), a larger A gives a concentration that is too high.',
    reviewed: true,
  },
  {
    id: 'chem-solutions-005',
    topic: 'solutions',
    difficulty: 1,
    prompt: 'Which technique best separates two miscible liquids with different boiling points?',
    choices: ['Filtration', 'Distillation', 'Paper chromatography', 'Decanting'],
    answer: 1,
    explanation: 'Distillation boils off the liquid with the lower boiling point (weaker intermolecular forces) and condenses it separately. Filtration only separates a solid from a liquid.',
    reviewed: true,
  },
];
