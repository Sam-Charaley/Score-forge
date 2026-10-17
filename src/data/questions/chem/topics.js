// AP Chemistry: nine units, weights from College Board's course page.
// Units are split into practice topics. Topic ids are permanent: attempts
// are stored against them, so rename the label freely but never change an id.
export const CHEM_UNITS = [
  { id: 'u1', name: 'Atomic Structure and Properties', weight: '7–9%' },
  { id: 'u2', name: 'Compound Structure and Properties', weight: '7–9%' },
  { id: 'u3', name: 'Properties of Substances and Mixtures', weight: '18–22%' },
  { id: 'u4', name: 'Chemical Reactions', weight: '7–9%' },
  { id: 'u5', name: 'Kinetics', weight: '7–9%' },
  { id: 'u6', name: 'Thermochemistry', weight: '7–9%' },
  { id: 'u7', name: 'Equilibrium', weight: '7–9%' },
  { id: 'u8', name: 'Acids and Bases', weight: '11–15%' },
  { id: 'u9', name: 'Thermodynamics and Electrochemistry', weight: '7–9%' },
];

export const CHEM_TOPICS = [
  { id: 'moles-composition', unit: 'u1', name: 'Moles, Mass & Composition' },
  { id: 'electrons-periodicity', unit: 'u1', name: 'Electrons, Light & Periodic Trends' },
  { id: 'bonding', unit: 'u2', name: 'Bonding, Lewis Structures & VSEPR' },
  { id: 'imf-states', unit: 'u3', name: 'Intermolecular Forces & States of Matter' },
  { id: 'gases', unit: 'u3', name: 'Gases' },
  { id: 'solutions', unit: 'u3', name: 'Solutions, Separation & Spectroscopy' },
  { id: 'reactions', unit: 'u4', name: 'Reactions, Stoichiometry & Titration' },
  { id: 'kinetics', unit: 'u5', name: 'Rates & Rate Laws' },
  { id: 'thermochemistry', unit: 'u6', name: 'Calorimetry & Enthalpy' },
  { id: 'equilibrium', unit: 'u7', name: 'Equilibrium & Le Chatelier' },
  { id: 'acids-bases', unit: 'u8', name: 'pH, Weak Acids & Buffers' },
  { id: 'thermo-electrochem', unit: 'u9', name: 'Entropy, Gibbs Energy & Electrochemistry' },
];

// Values from the AP Chemistry reference sheet, so solve() uses exactly the
// constants students are given.
export const R_LATM = 0.08206; // L·atm/(mol·K)
export const R_J = 8.314; // J/(mol·K)
export const FARADAY = 96485; // C per mole of electrons
export const PLANCK = 6.626e-34; // J·s
export const LIGHT_SPEED = 2.998e8; // m/s
export const AVOGADRO = 6.022e23; // per mole
export const KW = 1.0e-14; // at 25 °C

// Atomic masses as printed on the AP periodic table (g/mol).
export const ATOMIC_MASS = { H: 1.008, C: 12.01, N: 14.01, O: 16.00, Na: 22.99, Mg: 24.31, Al: 26.98, S: 32.06, Cl: 35.45, K: 39.10, Ca: 40.08, Cu: 63.55, Ag: 107.87 };

// Molar mass from a { symbol: count } map, e.g. molarMass({ H: 2, O: 1 }).
export const molarMass = formula => Object.entries(formula).reduce((sum, [symbol, count]) => sum + ATOMIC_MASS[symbol] * count, 0);

export default { units: CHEM_UNITS, topics: CHEM_TOPICS };
