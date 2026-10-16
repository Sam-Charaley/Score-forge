// AP Chemistry formulas. Everything not marked memorize is printed on the
// College Board exam reference sheet (2025 edition), in the sheet's own
// notation. A periodic table is also provided on the exam.
// Each var is [symbol, meaning, unit]; tex strings are KaTeX.
const tex = String.raw;

export default {
  subjectId: 'chem',
  sheet: {
    given: true,
    label: 'College Board AP Chemistry reference information (2025)',
    url: 'https://apcentral.collegeboard.org/media/pdf/ap-chemistry-equations-sheet.pdf',
    note: 'You also get a periodic table.',
  },
  sections: [
    {
      id: 'constants',
      title: 'Constants and conversions',
      formulas: [
        { id: 'planck-light-avogadro', name: 'Planck\'s constant, speed of light, Avogadro\'s number', tex: tex`h = 6.626\times10^{-34}\ \mathrm{J\,s} \qquad c = 2.998\times10^8\ \mathrm{m\,s^{-1}} \qquad N_A = 6.022\times10^{23}\ \mathrm{mol^{-1}}`, vars: [] },
        { id: 'gas-constant', name: 'Gas constant', tex: tex`R = 8.314\ \mathrm{J\,mol^{-1}\,K^{-1}} \qquad R = 0.08206\ \mathrm{L\,atm\,mol^{-1}\,K^{-1}}`, vars: [], note: 'Match R to your units: 8.314 with joules (thermodynamics), 0.08206 with liters and atm (gas law).' },
        { id: 'stp', name: 'Standard temperature and pressure', tex: tex`\text{STP} = 273.15\ \mathrm{K},\ 1.0\ \mathrm{atm} \qquad \text{ideal gas at STP} = 22.4\ \mathrm{L\,mol^{-1}}`, vars: [], note: '22.4 L/mol only works at STP. Otherwise use PV = nRT.' },
        { id: 'faraday-constant', name: 'Faraday\'s constant', tex: tex`F = 96{,}485\ \mathrm{C}/1\ \mathrm{mol}\ e^-`, vars: [] },
        { id: 'conversions', name: 'Unit conversions', tex: tex`1\ \mathrm{atm} = 760\ \mathrm{mm\,Hg} = 760\ \mathrm{torr} \qquad \mathrm{K} = {}^\circ\mathrm{C} + 273.15`, vars: [], note: 'Gas laws need kelvin. A 1 °C change is the same size as a 1 K change.' },
      ],
    },
    {
      id: 'atomic-structure',
      title: 'Atomic structure',
      formulas: [
        { id: 'photon-energy', name: 'Photon energy', tex: tex`E = h\nu`, vars: [['E', 'energy', 'J'], ['\\nu', 'frequency', 's⁻¹']], note: 'Energy per photon. Multiply by Avogadro\'s number for energy per mole.' },
        { id: 'wave-equation', name: 'Speed of light', tex: tex`c = \lambda\nu`, vars: [['\\lambda', 'wavelength', 'm'], ['\\nu', 'frequency', 's⁻¹']], note: 'Convert nm to m before using it.' },
        { id: 'coulombic', name: 'Coulombic force', tex: tex`F_{\text{coulombic}} \propto \dfrac{q_1q_2}{r^2}`, vars: [['q', 'charge', ''], ['r', 'separation', '']], note: 'Explains trends: higher charge or smaller distance means a stronger attraction (ionization energy, lattice energy, melting point).' },
      ],
    },
    {
      id: 'gases-solutions',
      title: 'Gases, liquids and solutions',
      formulas: [
        { id: 'combined-gas', name: 'Combined gas law', tex: tex`\dfrac{P_1V_1}{T_1} = \dfrac{P_2V_2}{T_2}`, vars: [['P', 'pressure', 'atm'], ['V', 'volume', 'L'], ['T', 'temperature', 'K']] },
        { id: 'ideal-gas', name: 'Ideal gas law', tex: tex`PV = nRT`, vars: [['n', 'moles', 'mol'], ['R', 'gas constant', 'L·atm/(mol·K)']], note: 'Real gases deviate most at high pressure and low temperature.' },
        { id: 'partial-pressure', name: 'Partial pressure', tex: tex`P_A = P_{\text{total}}\times X_A \qquad X_A = \dfrac{\text{moles A}}{\text{total moles}}`, vars: [['X_A', 'mole fraction of A', '']] },
        { id: 'daltons-law', name: 'Dalton\'s law', tex: tex`P_{\text{total}} = P_A + P_B + P_C + \cdots`, vars: [] },
        { id: 'moles-mass', name: 'Moles from mass', tex: tex`n = \dfrac{m}{\mathcal{M}}`, vars: [['m', 'mass', 'g'], ['\\mathcal{M}', 'molar mass', 'g/mol']] },
        { id: 'density', name: 'Density', tex: tex`D = \dfrac{m}{V}`, vars: [['D', 'density', 'g/L or g/mL']], note: 'Combined with PV = nRT: molar mass = DRT/P.' },
        { id: 'kinetic-energy', name: 'Kinetic energy', tex: tex`KE = \tfrac{1}{2}mv^2`, vars: [['m', 'mass', 'kg'], ['v', 'velocity', 'm/s']], note: 'At the same temperature all gases have the same average KE, so lighter molecules move faster.' },
        { id: 'molarity', name: 'Molarity', tex: tex`M = \dfrac{n_{\text{solute}}}{\text{L}_{\text{solution}}}`, vars: [['M', 'molarity', 'mol/L']], note: 'Liters of solution, not of solvent.' },
        { id: 'dilution', name: 'Dilution', tex: tex`M_1V_1 = M_2V_2`, vars: [], note: 'Not on the sheet. Moles of solute stay the same when you add water.', memorize: true },
        { id: 'beer-lambert', name: 'Beer-Lambert law', tex: tex`A = \varepsilon bc`, vars: [['A', 'absorbance', 'unitless'], ['\\varepsilon', 'molar absorptivity', 'M⁻¹cm⁻¹'], ['b', 'path length', 'cm'], ['c', 'concentration', 'M']], note: 'Absorbance is directly proportional to concentration.' },
      ],
    },
    {
      id: 'stoichiometry',
      title: 'Stoichiometry',
      formulas: [
        { id: 'percent-yield', name: 'Percent yield', tex: tex`\%\ \text{yield} = \dfrac{\text{actual yield}}{\text{theoretical yield}}\times100\%`, vars: [], note: 'Not on the sheet. The theoretical yield comes from the limiting reactant.', memorize: true },
        { id: 'percent-composition', name: 'Percent by mass', tex: tex`\%\ \text{element} = \dfrac{\text{element mass}}{\text{compound mass}}\times100\%`, vars: [], note: 'Not on the sheet. For an empirical formula, assume 100 g and convert each percent to moles.', memorize: true },
      ],
    },
    {
      id: 'kinetics',
      title: 'Kinetics',
      formulas: [
        { id: 'rate-law', name: 'Rate law', tex: tex`\text{rate} = k[\mathrm{A}]^m[\mathrm{B}]^n`, vars: [['k', 'rate constant', ''], ['m, n', 'orders, found from experiments', '']], note: 'Not on the sheet. Orders come from data, not the balanced equation (except for an elementary step).', memorize: true },
        { id: 'zero-order', name: 'Zero order integrated rate law', tex: tex`[\mathrm{A}]_t - [\mathrm{A}]_0 = -kt`, vars: [['[\\mathrm{A}]_t', 'concentration at time t', 'M'], ['k', 'rate constant', 'M/s']], note: '[A] vs t is a straight line with slope −k.' },
        { id: 'first-order', name: 'First order integrated rate law', tex: tex`\ln[\mathrm{A}]_t - \ln[\mathrm{A}]_0 = -kt`, vars: [['k', 'rate constant', 's⁻¹']], note: 'ln[A] vs t is a straight line with slope −k.' },
        { id: 'second-order', name: 'Second order integrated rate law', tex: tex`\dfrac{1}{[\mathrm{A}]_t} - \dfrac{1}{[\mathrm{A}]_0} = kt`, vars: [['k', 'rate constant', 'M⁻¹s⁻¹']], note: '1/[A] vs t is a straight line with slope +k.' },
        { id: 'half-life', name: 'First order half-life', tex: tex`t_{1/2} = \dfrac{0.693}{k}`, vars: [['t_{1/2}', 'half-life', 's']], note: 'Constant for first order, whatever the starting concentration. Radioactive decay is first order.' },
      ],
    },
    {
      id: 'equilibrium',
      title: 'Equilibrium',
      formulas: [
        { id: 'kc', name: 'Equilibrium constant (concentrations)', tex: tex`K_c = \dfrac{[\mathrm{C}]^c[\mathrm{D}]^d}{[\mathrm{A}]^a[\mathrm{B}]^b} \qquad a\mathrm{A} + b\mathrm{B} \rightleftharpoons c\mathrm{C} + d\mathrm{D}`, vars: [], note: 'Leave out pure solids and liquids. Q uses the same expression at any moment: Q < K shifts right, Q > K shifts left.' },
        { id: 'kp', name: 'Equilibrium constant (pressures)', tex: tex`K_p = \dfrac{(P_\mathrm{C})^c(P_\mathrm{D})^d}{(P_\mathrm{A})^a(P_\mathrm{B})^b}`, vars: [['P', 'partial pressure', 'atm']] },
        { id: 'kw', name: 'Water autoionization', tex: tex`K_w = [\mathrm{H_3O^+}][\mathrm{OH^-}] \qquad K_w = 1.0\times10^{-14} \text{ at } 25^\circ\mathrm{C}`, vars: [], note: 'K_w grows with temperature, so neutral pH is below 7 when hot.' },
        { id: 'pkw', name: 'pH and pOH', tex: tex`\mathrm{p}K_w = 14 = \mathrm{pH} + \mathrm{pOH} \text{ at } 25^\circ\mathrm{C}`, vars: [] },
        { id: 'ph-definition', name: 'pH and pOH definitions', tex: tex`\mathrm{pH} = -\log[\mathrm{H_3O^+}] \qquad \mathrm{pOH} = -\log[\mathrm{OH^-}]`, vars: [], note: 'Each pH unit is a factor of 10 in concentration.' },
        { id: 'ka-kb', name: 'Acid and base constants', tex: tex`K_a = \dfrac{[\mathrm{H_3O^+}][\mathrm{A^-}]}{[\mathrm{HA}]} \qquad K_b = \dfrac{[\mathrm{OH^-}][\mathrm{HB^+}]}{[\mathrm{B}]}`, vars: [], note: 'Larger K_a means a stronger acid.' },
        { id: 'pka-pkb', name: 'pKa and pKb', tex: tex`\mathrm{p}K_a = -\log K_a \qquad \mathrm{p}K_b = -\log K_b`, vars: [], note: 'Smaller pKa means a stronger acid.' },
        { id: 'conjugate-pair', name: 'Conjugate acid-base pairs', tex: tex`K_w = K_a\times K_b \qquad \mathrm{p}K_w = \mathrm{p}K_a + \mathrm{p}K_b`, vars: [], note: 'The stronger the acid, the weaker its conjugate base.' },
        { id: 'henderson-hasselbalch', name: 'Henderson-Hasselbalch equation', tex: tex`\mathrm{pH} = \mathrm{p}K_a + \log\dfrac{[\mathrm{A^-}]}{[\mathrm{HA}]}`, vars: [], note: 'For buffers. At the half-equivalence point [A⁻] = [HA], so pH = pKa.' },
        { id: 'kp-kc', name: 'Converting Kp and Kc', tex: tex`K_p = K_c(RT)^{\Delta n}`, vars: [['\\Delta n', 'moles of gas products minus moles of gas reactants', '']], note: 'Not on the sheet. Use R = 0.08206 here.', memorize: true },
      ],
    },
    {
      id: 'thermodynamics',
      title: 'Thermodynamics and electrochemistry',
      formulas: [
        { id: 'calorimetry', name: 'Calorimetry', tex: tex`q = mc\Delta T`, vars: [['q', 'heat', 'J'], ['m', 'mass', 'g'], ['c', 'specific heat capacity', 'J/(g·°C)'], ['\\Delta T', 'temperature change', '°C or K']], note: 'Heat lost by the reaction is heat gained by the water, so q_rxn = −q_water.' },
        { id: 'enthalpy-formation', name: 'Enthalpy of reaction from formation', tex: tex`\Delta H^\circ_{\text{rxn}} = \sum\Delta H^\circ_{f,\text{prod}} - \sum\Delta H^\circ_{f,\text{react}}`, vars: [['\\Delta H^\\circ_f', 'standard enthalpy of formation', 'kJ/mol']], note: 'Multiply each by its coefficient. Elements in their standard state have ΔH°f = 0.' },
        { id: 'bond-enthalpy', name: 'Enthalpy from bond energies', tex: tex`\Delta H^\circ \approx \sum \text{broken} - \sum \text{formed}`, vars: [], note: 'Not on the sheet. Sum the bond energies of bonds broken minus bonds formed: the opposite order from the formation equation.', memorize: true },
        { id: 'entropy', name: 'Entropy of reaction', tex: tex`\Delta S^\circ_{\text{rxn}} = \sum S^\circ_{\text{prod}} - \sum S^\circ_{\text{react}}`, vars: [['S^\\circ', 'standard entropy', 'J/(mol·K)']], note: 'More moles of gas usually means positive ΔS.' },
        { id: 'gibbs-formation', name: 'Gibbs free energy of reaction', tex: tex`\Delta G^\circ_{\text{rxn}} = \sum\Delta G^\circ_{f,\text{prod}} - \sum\Delta G^\circ_{f,\text{react}}`, vars: [] },
        { id: 'gibbs', name: 'Gibbs free energy', tex: tex`\Delta G^\circ = \Delta H^\circ - T\Delta S^\circ \qquad \Delta G^\circ = -RT\ln K \qquad \Delta G^\circ = -nFE^\circ`, vars: [['T', 'temperature', 'K'], ['K', 'equilibrium constant', ''], ['n', 'moles of electrons transferred', 'mol'], ['E^\\circ', 'standard cell potential', 'V']], note: 'Negative ΔG° means thermodynamically favored and K > 1. Convert ΔS° to kJ before combining with ΔH°.' },
        { id: 'current', name: 'Current', tex: tex`I = \dfrac{q}{t}`, vars: [['I', 'current', 'A'], ['q', 'charge', 'C'], ['t', 'time', 's']], note: 'For electrolysis: charge ÷ F gives moles of electrons.' },
        { id: 'nernst', name: 'Nernst equation', tex: tex`E_{\text{cell}} = E^\circ_{\text{cell}} - \dfrac{RT}{nF}\ln Q`, vars: [['Q', 'reaction quotient', '']], note: 'As Q grows toward K, the cell potential falls toward zero (a dead battery).' },
      ],
    },
  ],
};
