// AP Physics 2 formulas. Everything not marked memorize is printed on the
// College Board exam reference sheet (2026 edition), in the sheet's own
// notation. The sheet also reprints the whole Physics 1 mechanics and fluids
// page; those formulas live in phys1.js, so they aren't repeated here.
// Each var is [symbol, meaning, unit]; tex strings are KaTeX.
const tex = String.raw;

export default {
  subjectId: 'phys2',
  sheet: {
    given: true,
    label: 'College Board AP Physics 2 reference information (2026)',
    url: 'https://apcentral.collegeboard.org/media/pdf/ap-physics-2-equations-sheet.pdf',
    note: 'The sheet also reprints every Physics 1 mechanics and fluids formula. Find those under Physics 1.',
  },
  sections: [
    {
      id: 'constants',
      title: 'Constants',
      formulas: [
        { id: 'coulomb-constant', name: 'Coulomb constant', tex: tex`k = \dfrac{1}{4\pi\varepsilon_0} = 9.0\times10^9\ \mathrm{N\cdot m^2/C^2}`, vars: [], note: 'The k in Coulomb\'s law and in point-charge field and potential.' },
        { id: 'elementary-charge', name: 'Elementary charge and electron volt', tex: tex`e = 1.60\times10^{-19}\ \mathrm{C} \qquad 1\ \mathrm{eV} = 1.60\times10^{-19}\ \mathrm{J}`, vars: [], note: 'Moving one electron through 1 V changes its energy by 1 eV.' },
        { id: 'particle-masses', name: 'Proton, neutron and electron mass', tex: tex`m_p = m_n = 1.67\times10^{-27}\ \mathrm{kg} \qquad m_e = 9.11\times10^{-31}\ \mathrm{kg}`, vars: [] },
        { id: 'permittivity-permeability', name: 'Vacuum permittivity and permeability', tex: tex`\varepsilon_0 = 8.85\times10^{-12}\ \mathrm{C^2/(N\cdot m^2)} \qquad \mu_0 = 4\pi\times10^{-7}\ \mathrm{(T\cdot m)/A}`, vars: [] },
        { id: 'planck', name: 'Planck\'s constant', tex: tex`h = 6.63\times10^{-34}\ \mathrm{J\cdot s} \qquad h = 4.14\times10^{-15}\ \mathrm{eV\cdot s} \qquad hc = 1240\ \mathrm{eV\cdot nm}`, vars: [], note: 'hc = 1240 eV·nm turns a wavelength in nm straight into a photon energy in eV.' },
        { id: 'speed-of-light', name: 'Speed of light', tex: tex`c = 3.00\times10^8\ \mathrm{m/s}`, vars: [] },
        { id: 'gas-constants', name: 'Gas constants', tex: tex`R = 8.31\ \mathrm{J/(mol\cdot K)} \qquad k_B = 1.38\times10^{-23}\ \mathrm{J/K} \qquad N_0 = 6.02\times10^{23}\ \mathrm{mol^{-1}}`, vars: [], note: 'Use R with moles and k_B with numbers of particles.' },
        { id: 'radiation-constants', name: 'Wien and Stefan-Boltzmann constants', tex: tex`b = 2.90\times10^{-3}\ \mathrm{m\cdot K} \qquad \sigma = 5.67\times10^{-8}\ \mathrm{W/(m^2\cdot K^4)}`, vars: [] },
        { id: 'atomic-mass-unit', name: 'Atomic mass unit', tex: tex`1\ \mathrm{u} = 1.66\times10^{-27}\ \mathrm{kg} = 931\ \mathrm{MeV}/c^2`, vars: [], note: 'A mass defect in u times 931 MeV gives the energy released.' },
      ],
    },
    {
      id: 'thermal',
      title: 'Thermal physics',
      formulas: [
        { id: 'ideal-gas', name: 'Ideal gas law', tex: tex`PV = nRT = Nk_BT`, vars: [['P', 'pressure', 'Pa'], ['V', 'volume', 'm³'], ['n', 'number of moles', 'mol'], ['N', 'number of atoms', ''], ['T', 'temperature', 'K']], note: 'Temperature must be in kelvin.' },
        { id: 'average-ke', name: 'Average kinetic energy of a gas atom', tex: tex`K_{\text{avg}} = \tfrac{3}{2}k_BT = \tfrac{1}{2}mv_{\text{rms}}^2`, vars: [['K_{\\text{avg}}', 'average kinetic energy per atom', 'J'], ['T', 'temperature', 'K'], ['v_{\\text{rms}}', 'root-mean-square speed', 'm/s']], note: 'Temperature measures the average kinetic energy, not the speed of any one atom.' },
        { id: 'internal-energy', name: 'Internal energy of a monatomic ideal gas', tex: tex`U = \tfrac{3}{2}nRT = \tfrac{3}{2}Nk_BT`, vars: [['U', 'internal energy', 'J'], ['n', 'number of moles', 'mol'], ['T', 'temperature', 'K']], note: 'Depends only on temperature: no temperature change means ΔU = 0.' },
        { id: 'first-law', name: 'First law of thermodynamics', tex: tex`\Delta U = Q + W`, vars: [['\\Delta U', 'change in internal energy', 'J'], ['Q', 'energy added by heating', 'J'], ['W', 'work done on the gas', 'J']], note: 'W is work done on the gas. When the gas expands, W is negative.' },
        { id: 'gas-work', name: 'Work done on a gas', tex: tex`W = -P\Delta V`, vars: [['W', 'work done on the gas', 'J'], ['P', 'pressure (constant)', 'Pa'], ['\\Delta V', 'change in volume', 'm³']], note: 'For changing pressure, W is minus the area under the PV graph.' },
        { id: 'specific-heat', name: 'Heating with specific heat', tex: tex`Q = mc\Delta T`, vars: [['Q', 'energy transferred by heating', 'J'], ['m', 'mass', 'kg'], ['c', 'specific heat', 'J/(kg·K)'], ['\\Delta T', 'temperature change', 'K']] },
        { id: 'conduction', name: 'Rate of thermal conduction', tex: tex`\dfrac{Q}{\Delta t} = \dfrac{kA\Delta T}{L}`, vars: [['Q/\\Delta t', 'rate of energy transfer', 'W'], ['k', 'thermal conductivity', 'W/(m·K)'], ['A', 'cross-sectional area', 'm²'], ['\\Delta T', 'temperature difference', 'K'], ['L', 'thickness', 'm']], note: 'Thicker material slows conduction, a larger area speeds it up.' },
        { id: 'gas-pressure', name: 'Pressure', tex: tex`P = \dfrac{F_\perp}{A}`, vars: [['P', 'pressure', 'Pa'], ['F_\\perp', 'perpendicular force', 'N'], ['A', 'area', 'm²']], note: 'Gas pressure comes from atoms colliding with the walls.' },
      ],
    },
    {
      id: 'electrostatics',
      title: 'Electric force, field and potential',
      formulas: [
        { id: 'coulombs-law', name: 'Coulomb\'s law', tex: tex`|\vec F_E| = \dfrac{1}{4\pi\varepsilon_0}\dfrac{|q_1q_2|}{r^2} = k\dfrac{|q_1q_2|}{r^2}`, vars: [['F_E', 'electric force', 'N'], ['q_1, q_2', 'charges', 'C'], ['r', 'distance between them', 'm']], note: 'Gives the size only. Like charges repel, opposite charges attract.' },
        { id: 'field-definition', name: 'Electric field', tex: tex`\vec E = \dfrac{\vec F_E}{q}`, vars: [['E', 'electric field', 'N/C'], ['F_E', 'force on a test charge', 'N'], ['q', 'test charge', 'C']], note: 'Field points the way a positive charge would be pushed.' },
        { id: 'point-charge-field', name: 'Field of a point charge', tex: tex`|\vec E| = \dfrac{1}{4\pi\varepsilon_0}\dfrac{|q|}{r^2} = k\dfrac{|q|}{r^2}`, vars: [['E', 'electric field', 'N/C'], ['q', 'source charge', 'C'], ['r', 'distance from the charge', 'm']] },
        { id: 'electric-pe', name: 'Electric potential energy of two charges', tex: tex`U_E = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q_1q_2}{r} = k\dfrac{q_1q_2}{r}`, vars: [['U_E', 'potential energy', 'J'], ['q_1, q_2', 'charges, with signs', 'C'], ['r', 'distance between them', 'm']], note: 'Keep the signs: negative U means the charges attract.' },
        { id: 'pe-potential', name: 'Potential energy and potential difference', tex: tex`\Delta U_E = q\Delta V`, vars: [['\\Delta U_E', 'change in potential energy', 'J'], ['q', 'charge', 'C'], ['\\Delta V', 'potential difference', 'V']], note: 'Positive charges lose energy moving to lower potential; negative charges gain it.' },
        { id: 'point-potential', name: 'Potential of point charges', tex: tex`V = \dfrac{1}{4\pi\varepsilon_0}\sum_i \dfrac{q_i}{r_i}`, vars: [['V', 'electric potential', 'V'], ['q_i', 'each charge, with sign', 'C'], ['r_i', 'distance to each charge', 'm']], note: 'A scalar sum, so no components needed, unlike field.' },
        { id: 'field-potential', name: 'Field from potential', tex: tex`|\vec E| = \left|\dfrac{\Delta V}{\Delta r}\right|`, vars: [['E', 'electric field', 'V/m'], ['\\Delta V', 'potential difference', 'V'], ['\\Delta r', 'distance', 'm']], note: 'Field points toward lower potential. Between parallel plates it is uniform.' },
      ],
    },
    {
      id: 'capacitors',
      title: 'Capacitors',
      formulas: [
        { id: 'capacitance', name: 'Capacitance', tex: tex`C = \dfrac{Q}{\Delta V}`, vars: [['C', 'capacitance', 'F'], ['Q', 'charge on one plate', 'C'], ['\\Delta V', 'potential difference', 'V']] },
        { id: 'parallel-plate', name: 'Parallel-plate capacitor', tex: tex`C = \kappa\varepsilon_0\dfrac{A}{d}`, vars: [['\\kappa', 'dielectric constant', 'unitless'], ['A', 'plate area', 'm²'], ['d', 'plate separation', 'm']], note: 'Bigger plates or a closer gap means more capacitance.' },
        { id: 'capacitor-field', name: 'Field inside a parallel-plate capacitor', tex: tex`E_C = \dfrac{Q}{\kappa\varepsilon_0 A}`, vars: [['E_C', 'electric field between the plates', 'N/C'], ['Q', 'charge on a plate', 'C'], ['A', 'plate area', 'm²']], note: 'Does not depend on the separation d.' },
        { id: 'capacitor-energy', name: 'Energy stored in a capacitor', tex: tex`U_C = \tfrac{1}{2}Q\Delta V`, vars: [['U_C', 'stored energy', 'J'], ['Q', 'charge', 'C'], ['\\Delta V', 'potential difference', 'V']], note: 'Also ½C(ΔV)² by substituting Q = CΔV.' },
        { id: 'capacitors-series', name: 'Capacitors in series', tex: tex`\dfrac{1}{C_{\text{eq},s}} = \sum_i \dfrac{1}{C_i}`, vars: [], note: 'The reverse of resistors: series capacitance is smaller than any one.' },
        { id: 'capacitors-parallel', name: 'Capacitors in parallel', tex: tex`C_{\text{eq},p} = \sum_i C_i`, vars: [] },
        { id: 'time-constant', name: 'RC time constant', tex: tex`\tau = R_{\text{eq}}C_{\text{eq}}`, vars: [['\\tau', 'time constant', 's'], ['R_{\\text{eq}}', 'equivalent resistance', 'Ω'], ['C_{\\text{eq}}', 'equivalent capacitance', 'F']], note: 'After one τ a charging capacitor is about 63% full. An uncharged capacitor acts like a wire at first; a full one acts like a break.' },
      ],
    },
    {
      id: 'circuits',
      title: 'Circuits',
      formulas: [
        { id: 'current', name: 'Current', tex: tex`I = \dfrac{\Delta q}{\Delta t}`, vars: [['I', 'current', 'A'], ['\\Delta q', 'charge passing a point', 'C'], ['\\Delta t', 'time', 's']] },
        { id: 'resistivity', name: 'Resistance of a wire', tex: tex`R = \dfrac{\rho\ell}{A}`, vars: [['R', 'resistance', 'Ω'], ['\\rho', 'resistivity', 'Ω·m'], ['\\ell', 'length', 'm'], ['A', 'cross-sectional area', 'm²']], note: 'Longer and thinner wires resist more.' },
        { id: 'ohms-law', name: 'Ohm\'s law', tex: tex`I = \dfrac{\Delta V}{R}`, vars: [['I', 'current', 'A'], ['\\Delta V', 'potential difference', 'V'], ['R', 'resistance', 'Ω']] },
        { id: 'electric-power', name: 'Electric power', tex: tex`P = I\Delta V`, vars: [['P', 'power', 'W'], ['I', 'current', 'A'], ['\\Delta V', 'potential difference', 'V']], note: 'Also I²R and (ΔV)²/R. The brightest bulb is the one using the most power.' },
        { id: 'resistors-series', name: 'Resistors in series', tex: tex`R_{\text{eq},s} = \sum_i R_i`, vars: [], note: 'Same current through each one.' },
        { id: 'resistors-parallel', name: 'Resistors in parallel', tex: tex`\dfrac{1}{R_{\text{eq},p}} = \sum_i \dfrac{1}{R_i}`, vars: [], note: 'Same potential difference across each one. Adding a branch lowers the total resistance.' },
        { id: 'kirchhoff', name: 'Kirchhoff\'s rules', tex: tex`\sum_{\text{loop}} \Delta V = 0 \qquad \sum I_{\text{in}} = \sum I_{\text{out}}`, vars: [], note: 'Not printed on the sheet. The loop rule is energy conservation, the junction rule is charge conservation.', memorize: true },
      ],
    },
    {
      id: 'magnetism',
      title: 'Magnetism and induction',
      formulas: [
        { id: 'force-on-charge', name: 'Magnetic force on a moving charge', tex: tex`F_B = qvB\sin\theta`, vars: [['F_B', 'magnetic force', 'N'], ['q', 'charge', 'C'], ['v', 'speed', 'm/s'], ['B', 'magnetic field', 'T'], ['\\theta', 'angle between v and B', '']], note: 'Direction from the right-hand rule (flip it for negative charges). The force does no work.' },
        { id: 'wire-field', name: 'Field around a long straight wire', tex: tex`B = \dfrac{\mu_0 I}{2\pi r}`, vars: [['B', 'magnetic field', 'T'], ['I', 'current', 'A'], ['r', 'distance from the wire', 'm']], note: 'Circles around the wire: thumb along the current, fingers curl with the field.' },
        { id: 'force-on-wire', name: 'Magnetic force on a current-carrying wire', tex: tex`F_B = I\ell B\sin\theta`, vars: [['F_B', 'force', 'N'], ['I', 'current', 'A'], ['\\ell', 'length in the field', 'm'], ['B', 'magnetic field', 'T']], note: 'Parallel currents attract, antiparallel currents repel.' },
        { id: 'flux', name: 'Magnetic flux', tex: tex`\Phi_B = \vec B\cdot\vec A = |\vec B|\cos\theta\,|\vec A|`, vars: [['\\Phi_B', 'magnetic flux', 'T·m²'], ['B', 'magnetic field', 'T'], ['A', 'area of the loop', 'm²'], ['\\theta', 'angle between B and the loop\'s normal', '']], note: 'θ is measured from the normal to the loop, not from its surface.' },
        { id: 'faraday', name: 'Faraday\'s law', tex: tex`|\varepsilon| = \left|\dfrac{\Delta\Phi_B}{\Delta t}\right|`, vars: [['\\varepsilon', 'induced emf', 'V'], ['\\Delta\\Phi_B', 'change in flux', 'T·m²'], ['\\Delta t', 'time', 's']], note: 'Only a changing flux induces emf. Lenz\'s law: the induced current opposes the change.' },
        { id: 'motional-emf', name: 'Motional emf', tex: tex`\varepsilon = B\ell v`, vars: [['\\varepsilon', 'emf', 'V'], ['B', 'magnetic field', 'T'], ['\\ell', 'rod length', 'm'], ['v', 'speed', 'm/s']], note: 'For a rod moving perpendicular to the field.' },
      ],
    },
    {
      id: 'waves-optics',
      title: 'Waves, sound and optics',
      formulas: [
        { id: 'wave-speed', name: 'Wave speed', tex: tex`\lambda = \dfrac{v}{f} \qquad T = \dfrac{1}{f}`, vars: [['\\lambda', 'wavelength', 'm'], ['v', 'wave speed', 'm/s'], ['f', 'frequency', 'Hz'], ['T', 'period', 's']], note: 'The medium sets the speed; the source sets the frequency.' },
        { id: 'string-speed', name: 'Speed of a wave on a string', tex: tex`v_{\text{string}} = \sqrt{\dfrac{F_T}{m/\ell}}`, vars: [['F_T', 'tension', 'N'], ['m/\\ell', 'mass per unit length', 'kg/m']] },
        { id: 'wave-functions', name: 'Wave position functions', tex: tex`x(t) = A\cos(\omega t) = A\cos(2\pi ft) \qquad y(x) = A\cos\!\left(2\pi\dfrac{x}{\lambda}\right)`, vars: [['A', 'amplitude', 'm'], ['\\omega', 'angular frequency', 'rad/s'], ['\\lambda', 'wavelength', 'm']] },
        { id: 'beats', name: 'Beat frequency', tex: tex`|f_{\text{beat}}| = |f_1 - f_2|`, vars: [['f_1, f_2', 'the two frequencies', 'Hz']] },
        { id: 'index-of-refraction', name: 'Index of refraction', tex: tex`n = \dfrac{c}{v}`, vars: [['n', 'index of refraction', 'unitless'], ['v', 'speed of light in the material', 'm/s']], note: 'Always at least 1. Light slows down and bends toward the normal entering a higher n.' },
        { id: 'snell', name: 'Snell\'s law', tex: tex`n_1\sin\theta_1 = n_2\sin\theta_2`, vars: [['n', 'index of refraction', ''], ['\\theta', 'angle from the normal', '']], note: 'Total internal reflection is possible only going from higher n to lower n.' },
        { id: 'thin-lens', name: 'Thin lens and mirror equation', tex: tex`\dfrac{1}{s_i} + \dfrac{1}{s_o} = \dfrac{1}{f}`, vars: [['s_i', 'image distance', 'm'], ['s_o', 'object distance', 'm'], ['f', 'focal length', 'm']], note: 'A negative image distance means a virtual image.' },
        { id: 'magnification', name: 'Magnification', tex: tex`|M| = \left|\dfrac{h_i}{h_o}\right| = \left|\dfrac{s_i}{s_o}\right|`, vars: [['M', 'magnification', ''], ['h_i, h_o', 'image and object heights', 'm'], ['s_i, s_o', 'image and object distances', 'm']] },
        { id: 'path-difference', name: 'Path length difference', tex: tex`\Delta D = m\lambda`, vars: [['\\Delta D', 'path length difference', 'm'], ['m', 'order (0, 1, 2, ...)', ''], ['\\lambda', 'wavelength', 'm']], note: 'Whole wavelengths give constructive interference; half wavelengths give destructive.' },
        { id: 'single-slit', name: 'Single slit minima', tex: tex`\Delta D = a\sin\theta \qquad a\left(\dfrac{y_{\min}}{L}\right) \approx m\lambda`, vars: [['a', 'slit width', 'm'], ['y_{\\min}', 'distance to a dark fringe', 'm'], ['L', 'distance to the screen', 'm']], note: 'For a single slit, mλ marks the dark fringes.' },
        { id: 'double-slit', name: 'Double slit and grating maxima', tex: tex`\Delta D = d\sin\theta \qquad d\left(\dfrac{y_{\max}}{L}\right) \approx m\lambda`, vars: [['d', 'slit separation', 'm'], ['y_{\\max}', 'distance to a bright fringe', 'm'], ['L', 'distance to the screen', 'm']], note: 'For two slits, mλ marks the bright fringes. Smaller d spreads them farther apart.' },
      ],
    },
    {
      id: 'modern',
      title: 'Modern physics',
      formulas: [
        { id: 'photon-energy', name: 'Photon energy', tex: tex`E = hf`, vars: [['E', 'photon energy', 'J or eV'], ['h', 'Planck\'s constant', 'J·s'], ['f', 'frequency', 'Hz']], note: 'With λ = c/f, this is also E = hc/λ.' },
        { id: 'de-broglie', name: 'de Broglie wavelength', tex: tex`\lambda = \dfrac{h}{p}`, vars: [['\\lambda', 'wavelength', 'm'], ['p', 'momentum', 'kg·m/s']], note: 'Slower or heavier particles have shorter wavelengths.' },
        { id: 'light-wavelength', name: 'Wavelength of light', tex: tex`\lambda = \dfrac{c}{f}`, vars: [['c', 'speed of light', 'm/s'], ['f', 'frequency', 'Hz']] },
        { id: 'photoelectric', name: 'Photoelectric effect', tex: tex`K_{\max} = hf - \phi`, vars: [['K_{\\max}', 'largest kinetic energy of an ejected electron', 'J or eV'], ['\\phi', 'work function', 'J or eV']], note: 'Below the threshold frequency no electrons come out, however bright the light.' },
        { id: 'compton', name: 'Compton scattering', tex: tex`\Delta\lambda = \dfrac{h}{m_ec}(1 - \cos\theta)`, vars: [['\\Delta\\lambda', 'wavelength shift', 'm'], ['m_e', 'electron mass', 'kg'], ['\\theta', 'scattering angle', '']] },
        { id: 'wien', name: 'Wien\'s law', tex: tex`\lambda_{\max} = \dfrac{b}{T}`, vars: [['\\lambda_{\\max}', 'peak wavelength', 'm'], ['b', 'Wien\'s constant', 'm·K'], ['T', 'absolute temperature', 'K']], note: 'Hotter objects peak at shorter wavelengths.' },
        { id: 'stefan-boltzmann', name: 'Stefan-Boltzmann law', tex: tex`P = A\sigma T^4`, vars: [['P', 'radiated power', 'W'], ['A', 'surface area', 'm²'], ['T', 'absolute temperature', 'K']], note: 'Doubling the temperature multiplies the power by 16.' },
        { id: 'mass-energy', name: 'Mass-energy equivalence', tex: tex`E = mc^2`, vars: [['E', 'energy', 'J'], ['m', 'mass', 'kg']] },
        { id: 'decay', name: 'Radioactive decay', tex: tex`N = N_0e^{-\lambda t} \qquad \lambda = \dfrac{\ln 2}{t_{1/2}}`, vars: [['N', 'nuclei remaining', ''], ['N_0', 'starting number', ''], ['\\lambda', 'decay constant', '1/s'], ['t_{1/2}', 'half-life', 's']], note: 'After each half-life, half of what is left remains.' },
      ],
    },
  ],
};
