// AP Chemistry, Unit 1: electron configuration, light and periodic trends.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { PLANCK, LIGHT_SPEED } from './topics.js'

const NANOMETER = 1e-9;

export default [
  {
    id: 'chem-electrons-periodicity-001',
    topic: 'electrons-periodicity',
    formulas: ['coulombic'],
    difficulty: 1,
    prompt: 'Which atom has the larger atomic radius, potassium (K) or bromine (Br), and why?',
    choices: [
      'K, because its valence electrons feel less effective nuclear charge',
      'Br, because it has more electrons',
      'Br, because it has more protons pulling outward',
      'They are the same size because they are in the same period',
    ],
    answer: 0,
    explanation: 'Both have valence electrons in n = 4, but Br has 16 more protons with almost no extra shielding, so its electrons are pulled in tighter. More protons pull inward, not outward.',
    reviewed: true,
  },
  {
    id: 'chem-electrons-periodicity-002',
    topic: 'electrons-periodicity',
    difficulty: 1,
    prompt: 'Which element has the ground-state electron configuration 1s²2s²2p⁶3s²3p³?',
    choices: ['Nitrogen', 'Phosphorus', 'Sulfur', 'Arsenic'],
    answer: 1,
    explanation: 'Add the superscripts: 2 + 2 + 6 + 2 + 3 = 15 electrons, so atomic number 15, phosphorus. Nitrogen is the same group but ends in 2p³.',
    reviewed: true,
  },
  {
    id: 'chem-electrons-periodicity-003',
    topic: 'electrons-periodicity',
    formulas: ['coulombic'],
    difficulty: 2,
    prompt: 'Why is the first ionization energy of magnesium greater than that of sodium?',
    choices: [
      'Mg has a greater nuclear charge with similar shielding, so its 3s electron is held more tightly',
      'Mg has more electrons, which repel each other',
      'Mg\'s valence electron is in a higher energy level',
      'Na has a full outer shell',
    ],
    answer: 0,
    explanation: 'Both lose a 3s electron with the same inner-core shielding. Mg has 12 protons to Na\'s 11, so the Coulombic attraction on that electron is stronger.',
    reviewed: true,
  },
  {
    id: 'chem-electrons-periodicity-004',
    topic: 'electrons-periodicity',
    formulas: ['photon-energy', 'wave-equation'],
    difficulty: 2,
    prompt: 'What is the energy of one photon of light with a wavelength of 500 nm?',
    choices: ['3.97 × 10⁻¹⁹ J', '3.97 × 10⁻²⁸ J', '6.00 × 10¹⁴ J', '1.33 × 10⁻⁴² J'],
    answer: 0,
    explanation: 'E = hc/λ = (6.626 × 10⁻³⁴)(2.998 × 10⁸)/(500 × 10⁻⁹ m) = 3.97 × 10⁻¹⁹ J. 3.97 × 10⁻²⁸ J forgets to convert nm to m, and 6.00 × 10¹⁴ is the frequency in s⁻¹.',
    verify: 'numeric',
    solve: () => (PLANCK * LIGHT_SPEED) / (500 * NANOMETER),
    reviewed: true,
  },
  {
    id: 'chem-electrons-periodicity-005',
    topic: 'electrons-periodicity',
    formulas: ['wave-equation'],
    difficulty: 1,
    prompt: 'What is the frequency of light with a wavelength of 600 nm?',
    choices: ['5.00 × 10¹⁴ s⁻¹', '5.00 × 10⁵ s⁻¹', '1.80 × 10² s⁻¹', '2.00 × 10⁻¹⁵ s⁻¹'],
    answer: 0,
    explanation: 'ν = c/λ = (2.998 × 10⁸ m/s)/(600 × 10⁻⁹ m) = 5.00 × 10¹⁴ s⁻¹. 5.00 × 10⁵ s⁻¹ leaves the wavelength in nm.',
    verify: 'numeric',
    solve: () => LIGHT_SPEED / (600 * NANOMETER),
    reviewed: true,
  },
  {
    id: 'chem-electrons-periodicity-006',
    topic: 'electrons-periodicity',
    difficulty: 3,
    prompt: 'A photoelectron spectrum shows peaks with relative heights 2 : 2 : 6 : 1, from highest binding energy to lowest. Which element is it?',
    choices: ['Sodium', 'Neon', 'Magnesium', 'Fluorine'],
    answer: 0,
    explanation: 'Each peak is a subshell and its height counts the electrons: 1s², 2s², 2p⁶, 3s¹. That is 11 electrons, sodium. The lowest-energy peak is the one valence electron.',
    reviewed: true,
  },
];
