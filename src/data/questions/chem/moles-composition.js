// AP Chemistry, Unit 1: moles, molar mass and composition.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
// verify: 'numeric' questions recompute their key in solve(), using the
// reference-sheet constants and AP periodic table masses from ./topics.js.
import { AVOGADRO, molarMass } from './topics.js'

const WATER = molarMass({ H: 2, O: 1 });
const CALCIUM_CARBONATE = molarMass({ Ca: 1, C: 1, O: 3 });

export default [
  {
    id: 'chem-moles-composition-001',
    topic: 'moles-composition',
    formulas: ['moles-mass'],
    difficulty: 1,
    prompt: 'How many moles of water are in 36.0 g of H₂O?',
    choices: ['0.500 mol', '1.00 mol', '2.00 mol', '36.0 mol'],
    answer: 2,
    explanation: 'The molar mass of H₂O is 2(1.008) + 16.00 = 18.02 g/mol, so n = m/M = 36.0/18.02 = 2.00 mol. 0.500 mol divides the wrong way.',
    verify: 'numeric',
    solve: () => 36.0 / WATER,
    reviewed: false,
  },
  {
    id: 'chem-moles-composition-002',
    topic: 'moles-composition',
    formulas: ['planck-light-avogadro'],
    difficulty: 1,
    prompt: 'How many molecules are in 0.250 mol of CO₂?',
    choices: ['6.02 × 10²³', '1.51 × 10²³', '2.41 × 10²⁴', '4.15 × 10⁻²⁵'],
    answer: 1,
    explanation: 'Multiply by Avogadro\'s number: 0.250 × 6.022 × 10²³ = 1.51 × 10²³ molecules. 2.41 × 10²⁴ divides by 0.250 instead.',
    verify: 'numeric',
    solve: () => 0.250 * AVOGADRO,
    reviewed: false,
  },
  {
    id: 'chem-moles-composition-003',
    topic: 'moles-composition',
    formulas: ['percent-composition'],
    difficulty: 2,
    prompt: 'What is the percent by mass of oxygen in calcium carbonate, CaCO₃?',
    choices: ['16.0%', '48.0%', '40.0%', '12.0%'],
    answer: 1,
    explanation: 'CaCO₃ has a molar mass of 40.08 + 12.01 + 3(16.00) = 100.09 g/mol, and its three oxygens weigh 48.00 g. 48.00/100.09 × 100% = 48.0%. 16.0% counts only one oxygen, and 40.0% is calcium.',
    verify: 'numeric',
    solve: () => (3 * 16.00 / CALCIUM_CARBONATE) * 100,
    reviewed: false,
  },
  {
    id: 'chem-moles-composition-004',
    topic: 'moles-composition',
    formulas: ['percent-composition', 'moles-mass'],
    difficulty: 3,
    prompt: 'A compound is 40.0% carbon, 6.7% hydrogen and 53.3% oxygen by mass. What is its empirical formula?',
    choices: ['CHO', 'CH₂O', 'C₂H₄O', 'CH₄O₂'],
    answer: 1,
    explanation: 'Assume 100 g: 40.0/12.01 = 3.33 mol C, 6.7/1.008 = 6.6 mol H, 53.3/16.00 = 3.33 mol O. Dividing by the smallest (3.33) gives a 1 : 2 : 1 ratio, so CH₂O.',
    reviewed: false,
  },
];
