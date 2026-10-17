// AP Chemistry, Unit 3: gases and kinetic molecular theory.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { R_LATM } from './topics.js'

const STP_TEMPERATURE = 273.15;

export default [
  {
    id: 'chem-gases-001',
    topic: 'gases',
    formulas: ['ideal-gas', 'gas-constant'],
    difficulty: 1,
    prompt: 'What is the pressure of 2.00 mol of an ideal gas at 300. K in a 10.0 L container?',
    choices: ['4.92 atm', '2.46 atm', '0.492 atm', '499 atm'],
    answer: 0,
    explanation: 'P = nRT/V = (2.00)(0.08206)(300.)/10.0 = 4.92 atm. 499 atm uses R = 8.314, which is for joules, not liters and atmospheres.',
    verify: 'numeric',
    solve: () => (2.00 * R_LATM * 300) / 10.0,
    reviewed: false,
  },
  {
    id: 'chem-gases-002',
    topic: 'gases',
    formulas: ['combined-gas'],
    difficulty: 2,
    prompt: 'A gas occupies 4.0 L at 1.0 atm and 300 K. What is its volume at 2.0 atm and 450 K?',
    choices: ['1.3 L', '3.0 L', '12 L', '2.0 L'],
    answer: 1,
    explanation: 'V₂ = V₁(P₁/P₂)(T₂/T₁) = 4.0 × (1.0/2.0) × (450/300) = 3.0 L. Doubling pressure halves the volume, and the higher temperature expands it by 1.5×.',
    verify: 'numeric',
    solve: () => 4.0 * (1.0 / 2.0) * (450 / 300),
    reviewed: false,
  },
  {
    id: 'chem-gases-003',
    topic: 'gases',
    formulas: ['partial-pressure', 'daltons-law'],
    difficulty: 1,
    prompt: 'A container holds 2.0 mol N₂ and 1.0 mol O₂ at a total pressure of 6.0 atm. What is the partial pressure of O₂?',
    choices: ['3.0 atm', '4.0 atm', '2.0 atm', '6.0 atm'],
    answer: 2,
    explanation: 'The mole fraction of O₂ is 1.0/3.0, so P(O₂) = (1/3)(6.0 atm) = 2.0 atm. 4.0 atm is the N₂ partial pressure.',
    verify: 'numeric',
    solve: () => (1.0 / (2.0 + 1.0)) * 6.0,
    reviewed: false,
  },
  {
    id: 'chem-gases-004',
    topic: 'gases',
    formulas: ['ideal-gas', 'density', 'stp'],
    difficulty: 3,
    prompt: 'A gas has a density of 1.25 g/L at STP (273 K and 1.00 atm). What is its molar mass?',
    choices: ['17.9 g/mol', '28.0 g/mol', '1.25 g/mol', '56.0 g/mol'],
    answer: 1,
    explanation: 'Combine PV = nRT with n = m/M: M = DRT/P = (1.25)(0.08206)(273.15)/1.00 = 28.0 g/mol (likely N₂). 17.9 g/mol divides 22.4 by the density instead of multiplying.',
    verify: 'numeric',
    solve: () => (1.25 * R_LATM * STP_TEMPERATURE) / 1.00,
    reviewed: false,
  },
  {
    id: 'chem-gases-005',
    topic: 'gases',
    formulas: ['kinetic-energy'],
    difficulty: 2,
    prompt: 'Samples of H₂, N₂, O₂ and CO₂ are all at 25 °C. Which statement is true?',
    choices: [
      'All have the same average kinetic energy, and H₂ molecules have the highest average speed',
      'CO₂ has the highest average kinetic energy because it is heaviest',
      'All have the same average speed',
      'H₂ has the highest average kinetic energy',
    ],
    answer: 0,
    explanation: 'Average kinetic energy depends only on temperature, so it is the same for all four. Since KE = ½mv², the lightest molecule (H₂) must move fastest.',
    reviewed: false,
  },
];
