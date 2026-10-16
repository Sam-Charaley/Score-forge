// AP Physics C: Electricity and Magnetism formulas. Everything not marked
// memorize is printed on the College Board exam reference sheet (2026
// edition), in the sheet's own notation. The sheet also reprints the whole
// Physics C: Mechanics page; those formulas live in physmech.js.
// Each var is [symbol, meaning, unit]; tex strings are KaTeX.
const tex = String.raw;

export default {
  subjectId: 'physem',
  sheet: {
    given: true,
    label: 'College Board AP Physics C: Electricity and Magnetism reference information (2026)',
    url: 'https://apcentral.collegeboard.org/media/pdf/ap-physics-c-electricity-and-magnetism-equations-sheet.pdf',
    note: 'The sheet also reprints the whole Physics C: Mechanics page and its calculus and vector formulas. Find those under Physics C: Mechanics.',
  },
  sections: [
    {
      id: 'constants',
      title: 'Constants',
      formulas: [
        { id: 'coulomb-constant', name: 'Coulomb constant', tex: tex`k = \dfrac{1}{4\pi\varepsilon_0} = 9.0\times10^9\ \mathrm{N\cdot m^2/C^2}`, vars: [] },
        { id: 'permittivity-permeability', name: 'Vacuum permittivity and permeability', tex: tex`\varepsilon_0 = 8.85\times10^{-12}\ \mathrm{C^2/(N\cdot m^2)} \qquad \mu_0 = 4\pi\times10^{-7}\ \mathrm{(T\cdot m)/A}`, vars: [] },
        { id: 'elementary-charge', name: 'Elementary charge and electron volt', tex: tex`e = 1.60\times10^{-19}\ \mathrm{C} \qquad 1\ \mathrm{eV} = 1.60\times10^{-19}\ \mathrm{J}`, vars: [] },
        { id: 'particle-masses', name: 'Proton, neutron and electron mass', tex: tex`m_p = m_n = 1.67\times10^{-27}\ \mathrm{kg} \qquad m_e = 9.11\times10^{-31}\ \mathrm{kg}`, vars: [] },
        { id: 'speed-of-light', name: 'Speed of light', tex: tex`c = 3.00\times10^8\ \mathrm{m/s}`, vars: [] },
      ],
    },
    {
      id: 'electrostatics',
      title: 'Electric force and field',
      formulas: [
        { id: 'coulombs-law', name: 'Coulomb\'s law', tex: tex`|\vec F_E| = \dfrac{1}{4\pi\varepsilon_0}\dfrac{|q_1q_2|}{r^2} = k\dfrac{|q_1q_2|}{r^2}`, vars: [['q_1, q_2', 'charges', 'C'], ['r', 'distance between them', 'm']] },
        { id: 'field-definition', name: 'Electric field', tex: tex`\vec E = \dfrac{\vec F_E}{q}`, vars: [['E', 'electric field', 'N/C'], ['q', 'test charge', 'C']] },
        { id: 'field-integral', name: 'Field of a continuous charge', tex: tex`\vec E = \dfrac{1}{4\pi\varepsilon_0}\int\dfrac{dq}{r^2}\,\hat r`, vars: [['dq', 'small piece of charge', 'C'], ['\\hat r', 'unit vector from dq to the point', '']], note: 'Use symmetry first: components that cancel never need integrating.' },
        { id: 'charge-density', name: 'Total charge from a density', tex: tex`Q_{\text{total}} = \int\rho(r)\,dV`, vars: [['\\rho', 'volume charge density', 'C/m³'], ['dV', 'small volume (4πr² dr for a sphere)', 'm³']] },
        { id: 'symmetric-fields', name: 'Fields of symmetric charges', tex: tex`E_{\text{line}} = \dfrac{\lambda}{2\pi\varepsilon_0 r} \qquad E_{\text{sheet}} = \dfrac{\sigma}{2\varepsilon_0} \qquad E_{\text{conductor surface}} = \dfrac{\sigma}{\varepsilon_0}`, vars: [['\\lambda', 'charge per length', 'C/m'], ['\\sigma', 'charge per area', 'C/m²']], note: 'Not on the sheet. Each comes from Gauss\'s law in one line, so practice deriving them.', memorize: true },
      ],
    },
    {
      id: 'gauss',
      title: 'Gauss\'s law',
      formulas: [
        { id: 'electric-flux', name: 'Electric flux', tex: tex`\Phi_E = \int\vec E\cdot d\vec A`, vars: [['\\Phi_E', 'electric flux', 'N·m²/C'], ['d\\vec A', 'small area, pointing outward', 'm²']] },
        { id: 'gauss-law', name: 'Gauss\'s law', tex: tex`\oint\vec E\cdot d\vec A = \dfrac{q_{\text{enc}}}{\varepsilon_0}`, vars: [['q_{\\text{enc}}', 'charge enclosed by the surface', 'C']], note: 'Pick a surface where E is constant and parallel to dA: a sphere, cylinder or pillbox.' },
        { id: 'conductors', name: 'Conductors in equilibrium', tex: tex`\vec E_{\text{inside}} = 0 \qquad V = \text{constant throughout}`, vars: [], note: 'Not on the sheet. Excess charge sits on the outer surface.', memorize: true },
      ],
    },
    {
      id: 'potential',
      title: 'Electric potential and energy',
      formulas: [
        { id: 'electric-pe', name: 'Potential energy of two charges', tex: tex`U_E = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q_1q_2}{r}`, vars: [['U_E', 'potential energy', 'J'], ['r', 'separation', 'm']] },
        { id: 'potential-integral', name: 'Potential of a charge distribution', tex: tex`V = \dfrac{1}{4\pi\varepsilon_0}\int\dfrac{dq}{r}`, vars: [['V', 'electric potential', 'V']], note: 'A scalar integral: no components to worry about.' },
        { id: 'potential-difference', name: 'Potential difference from field', tex: tex`\Delta V = -\int_a^b\vec E\cdot d\vec r`, vars: [['\\Delta V', 'V(b) − V(a)', 'V']] },
        { id: 'field-from-potential', name: 'Field from potential', tex: tex`E_x = -\dfrac{dV}{dx}`, vars: [], note: 'Field points toward decreasing potential.' },
        { id: 'pe-potential', name: 'Potential energy change', tex: tex`\Delta U_E = q\Delta V`, vars: [['q', 'charge', 'C']] },
      ],
    },
    {
      id: 'capacitors',
      title: 'Capacitors and dielectrics',
      formulas: [
        { id: 'capacitance', name: 'Capacitance', tex: tex`C = \dfrac{Q}{\Delta V}`, vars: [['C', 'capacitance', 'F'], ['Q', 'charge', 'C']] },
        { id: 'parallel-plate', name: 'Parallel-plate capacitor', tex: tex`C = \dfrac{\kappa\varepsilon_0A}{d}`, vars: [['\\kappa', 'dielectric constant', 'unitless'], ['A', 'plate area', 'm²'], ['d', 'separation', 'm']] },
        { id: 'dielectric', name: 'Dielectric constant', tex: tex`\kappa = \dfrac{\varepsilon}{\varepsilon_0}`, vars: [['\\varepsilon', 'permittivity of the material', 'C²/(N·m²)']] },
        { id: 'capacitor-energy', name: 'Energy stored', tex: tex`U_C = \tfrac{1}{2}Q\Delta V`, vars: [], note: 'Also ½C(ΔV)² and Q²/(2C).' },
        { id: 'capacitor-combos', name: 'Series and parallel capacitors', tex: tex`\dfrac{1}{C_{\text{eq},s}} = \sum_i\dfrac{1}{C_i} \qquad C_{\text{eq},p} = \sum_i C_i`, vars: [] },
      ],
    },
    {
      id: 'circuits',
      title: 'Current and circuits',
      formulas: [
        { id: 'current', name: 'Current', tex: tex`I = \dfrac{dq}{dt} \qquad I = \int\vec J\cdot d\vec A`, vars: [['I', 'current', 'A'], ['J', 'current density', 'A/m²']] },
        { id: 'resistivity', name: 'Resistivity', tex: tex`\vec E = \rho\vec J \qquad R = \dfrac{\rho\ell}{A}`, vars: [['\\rho', 'resistivity', 'Ω·m'], ['\\ell', 'length', 'm'], ['A', 'cross-sectional area', 'm²']] },
        { id: 'ohm-power', name: 'Ohm\'s law and power', tex: tex`I = \dfrac{\Delta V}{R} \qquad P = I\Delta V`, vars: [['R', 'resistance', 'Ω'], ['P', 'power', 'W']] },
        { id: 'resistor-combos', name: 'Series and parallel resistors', tex: tex`R_{\text{eq},s} = \sum_i R_i \qquad \dfrac{1}{R_{\text{eq},p}} = \sum_i\dfrac{1}{R_i}`, vars: [] },
        { id: 'rc-time-constant', name: 'RC time constant', tex: tex`\tau = R_{\text{eq}}C_{\text{eq}}`, vars: [['\\tau', 'time constant', 's']] },
        { id: 'rc-charging', name: 'Charging and discharging a capacitor', tex: tex`Q(t) = Q_{\max}\left(1 - e^{-t/\tau}\right) \qquad Q(t) = Q_0e^{-t/\tau}`, vars: [], note: 'Not on the sheet. FRQs often ask you to derive these from Kirchhoff\'s loop rule as a differential equation.', memorize: true },
        { id: 'kirchhoff', name: 'Kirchhoff\'s rules', tex: tex`\sum_{\text{loop}}\Delta V = 0 \qquad \sum I_{\text{in}} = \sum I_{\text{out}}`, vars: [], note: 'Not on the sheet.', memorize: true },
      ],
    },
    {
      id: 'magnetic-fields',
      title: 'Magnetic fields and forces',
      formulas: [
        { id: 'no-monopoles', name: 'Gauss\'s law for magnetism', tex: tex`\oint\vec B\cdot d\vec A = 0`, vars: [], note: 'There are no magnetic monopoles: field lines always close.' },
        { id: 'force-on-charge', name: 'Force on a moving charge', tex: tex`\vec F_B = q(\vec v\times\vec B)`, vars: [['B', 'magnetic field', 'T'], ['v', 'velocity', 'm/s']], note: 'Perpendicular to v, so it changes direction but never speed. Circular orbit radius r = mv/(qB).' },
        { id: 'biot-savart', name: 'Biot-Savart law', tex: tex`d\vec B = \dfrac{\mu_0}{4\pi}\dfrac{I\,(d\vec\ell\times\hat r)}{r^2}`, vars: [['d\\vec\\ell', 'small length of wire along the current', 'm'], ['\\hat r', 'unit vector from the wire to the point', '']], note: 'Use it for loops and arcs. Ampère\'s law is easier when there is symmetry.' },
        { id: 'force-on-wire', name: 'Force on a current-carrying wire', tex: tex`\vec F_B = \int I\,(d\vec\ell\times\vec B)`, vars: [], note: 'For a straight wire in uniform B: F = IℓB sin θ.' },
        { id: 'ampere', name: 'Ampère\'s law', tex: tex`\oint\vec B\cdot d\vec\ell = \mu_0 I_{\text{enc}}`, vars: [['I_{\\text{enc}}', 'current through the loop', 'A']], note: 'For a long straight wire it gives B = μ₀I/(2πr).' },
        { id: 'solenoid-field', name: 'Field inside a solenoid', tex: tex`B_{\text{sol}} = \mu_0 nI`, vars: [['n', 'turns per unit length', '1/m']], note: 'Uniform inside, nearly zero outside.' },
        { id: 'wire-field', name: 'Field of a long straight wire', tex: tex`B = \dfrac{\mu_0 I}{2\pi r}`, vars: [['r', 'distance from the wire', 'm']], note: 'Not on this sheet as its own line: derive it from Ampère\'s law.', memorize: true },
      ],
    },
    {
      id: 'induction',
      title: 'Induction and inductors',
      formulas: [
        { id: 'magnetic-flux', name: 'Magnetic flux', tex: tex`\Phi_B = \int\vec B\cdot d\vec A`, vars: [['\\Phi_B', 'magnetic flux', 'Wb = T·m²']] },
        { id: 'faraday', name: 'Faraday\'s law', tex: tex`\varepsilon = \oint\vec E\cdot d\vec\ell = -\dfrac{d\Phi_B}{dt}`, vars: [['\\varepsilon', 'emf', 'V']], note: 'The minus sign is Lenz\'s law: the induced current opposes the change in flux.' },
        { id: 'solenoid-emf', name: 'emf in a coil', tex: tex`|\varepsilon_{\text{sol}}| = N\left|\dfrac{d\Phi_B}{dt}\right|`, vars: [['N', 'number of loops', '']] },
        { id: 'inductance', name: 'Inductance of a solenoid', tex: tex`L_{\text{sol}} = \dfrac{\mu_{\text{core}}N^2A}{\ell}`, vars: [['L', 'inductance', 'H'], ['\\mu_{\\text{core}}', 'permeability of the core', 'T·m/A'], ['A', 'cross-sectional area', 'm²'], ['\\ell', 'length', 'm']] },
        { id: 'inductor-emf', name: 'emf across an inductor', tex: tex`\varepsilon = -L\dfrac{dI}{dt}`, vars: [['L', 'inductance', 'H']], note: 'An inductor resists changes in current, not current itself.' },
        { id: 'inductor-energy', name: 'Energy stored in an inductor', tex: tex`U_L = \tfrac{1}{2}LI^2`, vars: [] },
        { id: 'rl-time-constant', name: 'RL time constant', tex: tex`\tau = \dfrac{L}{R_{\text{eq}}}`, vars: [], note: 'Just after a switch closes, an inductor acts like a break; long after, like a wire.' },
        { id: 'rl-current', name: 'Current in an RL circuit', tex: tex`I(t) = \dfrac{\varepsilon}{R}\left(1 - e^{-t/\tau}\right)`, vars: [['\\varepsilon', 'battery emf', 'V']], note: 'Not on the sheet. Same shape as a charging capacitor.', memorize: true },
        { id: 'lc-frequency', name: 'LC oscillation frequency', tex: tex`\omega_{LC} = \dfrac{1}{\sqrt{LC}}`, vars: [['\\omega_{LC}', 'angular frequency', 'rad/s']], note: 'Energy sloshes between the capacitor\'s field and the inductor\'s field, like a mass on a spring.' },
      ],
    },
  ],
};
