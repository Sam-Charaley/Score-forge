// AP Chemistry, Unit 6: calorimetry, enthalpy and phase changes.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { molarMass } from './topics.js'

const WATER_SPECIFIC_HEAT = 4.18; // J/(g·°C)
const JOULES_PER_KJ = 1000;
const WATER = molarMass({ H: 2, O: 1 });

// Standard enthalpies of formation, kJ/mol.
const FORMATION = { methane: -74.8, carbonDioxide: -393.5, liquidWater: -285.8 };
// Average bond enthalpies, kJ/mol.
const BOND = { HH: 436, ClCl: 242, HCl: 431 };

export default [
  {
    id: 'chem-thermochemistry-001',
    topic: 'thermochemistry',
    formulas: ['calorimetry'],
    difficulty: 1,
    prompt: 'How much heat is needed to warm 100.0 g of water from 25.0 °C to 35.0 °C? (c = 4.18 J/(g·°C))',
    choices: ['0.418 kJ', '4.18 kJ', '41.8 kJ', '418 kJ'],
    answer: 1,
    explanation: 'q = mcΔT = (100.0 g)(4.18 J/(g·°C))(10.0 °C) = 4180 J = 4.18 kJ.',
    verify: 'numeric',
    solve: () => (100.0 * WATER_SPECIFIC_HEAT * 10.0) / JOULES_PER_KJ,
    reviewed: false,
  },
  {
    id: 'chem-thermochemistry-002',
    topic: 'thermochemistry',
    formulas: ['calorimetry'],
    difficulty: 2,
    prompt: 'When a salt dissolves in water in a coffee-cup calorimeter, the temperature of the solution drops. Which is true?',
    choices: [
      'The dissolving is endothermic: the process absorbs heat from the water',
      'The dissolving is exothermic: the process releases heat',
      'No heat is transferred, because the calorimeter is insulated',
      'The water does work on the salt',
    ],
    answer: 0,
    explanation: 'The solution cools because the dissolving process takes energy from the surroundings (the water), so ΔH for dissolving is positive: endothermic.',
    reviewed: false,
  },
  {
    id: 'chem-thermochemistry-003',
    topic: 'thermochemistry',
    formulas: ['enthalpy-formation'],
    difficulty: 2,
    prompt: 'Using ΔH°f values of CH₄(g) = −74.8, CO₂(g) = −393.5 and H₂O(l) = −285.8 kJ/mol, what is ΔH° for CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)?',
    choices: ['−890.3 kJ/mol', '−604.5 kJ/mol', '+890.3 kJ/mol', '−1039.9 kJ/mol'],
    answer: 0,
    explanation: 'ΔH° = [−393.5 + 2(−285.8)] − [−74.8 + 2(0)] = −965.1 + 74.8 = −890.3 kJ/mol. O₂ is an element in its standard state, so its ΔH°f is 0. −604.5 forgets the coefficient 2 on water.',
    verify: 'numeric',
    solve: () => (FORMATION.carbonDioxide + 2 * FORMATION.liquidWater) - FORMATION.methane,
    reviewed: false,
  },
  {
    id: 'chem-thermochemistry-004',
    topic: 'thermochemistry',
    formulas: ['bond-enthalpy'],
    difficulty: 2,
    prompt: 'Using bond enthalpies H–H = 436, Cl–Cl = 242 and H–Cl = 431 kJ/mol, estimate ΔH for H₂ + Cl₂ → 2HCl.',
    choices: ['+184 kJ', '−184 kJ', '+247 kJ', '−1109 kJ'],
    answer: 1,
    explanation: 'Bonds broken minus bonds formed: (436 + 242) − 2(431) = 678 − 862 = −184 kJ. The sign comes out positive if you subtract in the formation-equation order.',
    verify: 'numeric',
    solve: () => (BOND.HH + BOND.ClCl) - 2 * BOND.HCl,
    reviewed: false,
  },
  {
    id: 'chem-thermochemistry-005',
    topic: 'thermochemistry',
    formulas: ['calorimetry'],
    difficulty: 2,
    prompt: 'Equal masses of aluminum (c = 0.90 J/(g·°C)) and copper (c = 0.39 J/(g·°C)) absorb the same amount of heat. Which is true?',
    choices: [
      'The copper\'s temperature rises more',
      'The aluminum\'s temperature rises more',
      'Both rise by the same amount',
      'It depends on their starting temperatures',
    ],
    answer: 0,
    explanation: 'ΔT = q/(mc). With q and m equal, the smaller specific heat gives the bigger temperature change, so copper heats up more.',
    reviewed: false,
  },
  {
    id: 'chem-thermochemistry-006',
    topic: 'thermochemistry',
    formulas: ['moles-mass'],
    difficulty: 2,
    prompt: 'The enthalpy of fusion of ice is 6.01 kJ/mol. How much heat is needed to melt 36.0 g of ice at 0 °C?',
    choices: ['6.01 kJ', '3.00 kJ', '12.0 kJ', '216 kJ'],
    answer: 2,
    explanation: '36.0 g ÷ 18.02 g/mol = 2.00 mol, and 2.00 mol × 6.01 kJ/mol = 12.0 kJ. 216 kJ multiplies by the mass in grams instead of moles.',
    verify: 'numeric',
    solve: () => (36.0 / WATER) * 6.01,
    reviewed: false,
  },
  {
    id: 'chem-thermochemistry-007',
    topic: 'thermochemistry',
    formulas: ['calorimetry'],
    difficulty: 3,
    prompt: '50.0 mL of 1.00 M HCl and 50.0 mL of 1.00 M NaOH are mixed in a calorimeter, and the temperature rises by 6.5 °C. Treating the solution as 100. g of water (c = 4.18 J/(g·°C)), what is ΔH for the neutralization per mole of water formed?',
    choices: ['−54 kJ/mol', '−2.7 kJ/mol', '−27 kJ/mol', '+54 kJ/mol'],
    answer: 0,
    explanation: 'q = (100. g)(4.18)(6.5) = 2717 J absorbed by the solution, so the reaction released 2.72 kJ. 0.0500 mol of water formed, so ΔH = −2.72/0.0500 = −54 kJ/mol. The sign is negative because the reaction is exothermic.',
    verify: 'numeric',
    solve: () => -(100 * WATER_SPECIFIC_HEAT * 6.5) / JOULES_PER_KJ / 0.0500,
    reviewed: false,
  },
  {
    id: 'chem-thermochemistry-008',
    topic: 'thermochemistry',
    difficulty: 1,
    prompt: 'In an energy diagram for an exothermic reaction, where are the products?',
    choices: [
      'Lower in energy than the reactants',
      'Higher in energy than the reactants',
      'At the same energy as the reactants',
      'At the top of the activation energy barrier',
    ],
    answer: 0,
    explanation: 'An exothermic reaction releases energy, so the products end up lower than the reactants and ΔH is negative. The top of the barrier is the transition state.',
    reviewed: false,
  },
];
