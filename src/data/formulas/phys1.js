// AP Physics 1 formulas. Everything not marked memorize is printed on the
// College Board exam reference sheet (2025 edition), in the sheet's own notation.
// Each var is [symbol, meaning, unit]; tex strings are KaTeX.
const tex = String.raw;

export default {
  subjectId: 'phys1',
  sheet: {
    given: true,
    label: 'College Board AP Physics 1 reference information (2025)',
    url: 'https://apcentral.collegeboard.org/media/pdf/ap-physics-1-equations-sheet.pdf',
  },
  sections: [
    {
      id: 'constants',
      title: 'Constants',
      formulas: [
        { id: 'gravitational-constant', name: 'Universal gravitational constant', tex: tex`G = 6.67\times10^{-11}\ \mathrm{N\cdot m^2/kg^2}`, vars: [], note: 'Only needed for Newton\'s law of gravitation and gravitational potential energy.' },
        { id: 'g-surface', name: 'Gravity at Earth\'s surface', tex: tex`g = 9.8\ \mathrm{m/s^2} = 9.8\ \mathrm{N/kg}`, vars: [], note: 'The same number is both the free-fall acceleration and the gravitational field strength.' },
        { id: 'atmosphere', name: 'Atmospheric pressure', tex: tex`1\ \mathrm{atm} = 1.0\times10^5\ \mathrm{Pa}`, vars: [], note: 'Use for P₀ in fluid pressure problems at the surface.' },
      ],
    },
    {
      id: 'kinematics',
      title: 'Kinematics',
      formulas: [
        { id: 'velocity-time', name: 'Velocity with constant acceleration', tex: tex`v_x = v_{x0} + a_x t`, vars: [['v_x', 'velocity', 'm/s'], ['v_{x0}', 'initial velocity', 'm/s'], ['a_x', 'acceleration', 'm/s²'], ['t', 'time', 's']], note: 'Only valid when acceleration is constant.' },
        { id: 'position-time', name: 'Position with constant acceleration', tex: tex`x = x_0 + v_{x0}t + \tfrac{1}{2}a_x t^2`, vars: [['x', 'position', 'm'], ['x_0', 'initial position', 'm'], ['v_{x0}', 'initial velocity', 'm/s'], ['a_x', 'acceleration', 'm/s²'], ['t', 'time', 's']], note: 'For projectiles, use it separately for x (a = 0) and y (a = −g).' },
        { id: 'velocity-position', name: 'Velocity without time', tex: tex`v_x^2 = v_{x0}^2 + 2a_x(x - x_0)`, vars: [['v_x', 'velocity', 'm/s'], ['v_{x0}', 'initial velocity', 'm/s'], ['a_x', 'acceleration', 'm/s²'], ['x - x_0', 'displacement', 'm']], note: 'The one to reach for when the problem never mentions time.' },
        { id: 'average-velocity', name: 'Displacement from average velocity', tex: tex`\Delta x = \tfrac{1}{2}(v_{x0} + v_x)\,t`, vars: [['\\Delta x', 'displacement', 'm'], ['v_{x0}', 'initial velocity', 'm/s'], ['v_x', 'final velocity', 'm/s'], ['t', 'time', 's']], note: 'Not on the sheet. Useful when acceleration is constant but not given.', memorize: true },
        { id: 'center-of-mass', name: 'Center of mass', tex: tex`x_{\text{cm}} = \dfrac{\sum m_i x_i}{\sum m_i}`, vars: [['x_{\\text{cm}}', 'center of mass position', 'm'], ['m_i', 'mass of each object', 'kg'], ['x_i', 'position of each object', 'm']], note: 'A mass-weighted average position.' },
      ],
    },
    {
      id: 'forces',
      title: 'Forces and dynamics',
      formulas: [
        { id: 'newtons-second', name: 'Newton\'s second law (system)', tex: tex`\vec a_{\text{sys}} = \dfrac{\sum \vec F}{m_{\text{sys}}} = \dfrac{\vec F_{\text{net}}}{m_{\text{sys}}}`, vars: [['\\vec a_{\\text{sys}}', 'acceleration of the system', 'm/s²'], ['\\vec F_{\\text{net}}', 'net external force', 'N'], ['m_{\\text{sys}}', 'total mass of the system', 'kg']], note: 'Only external forces count. Internal forces between parts of the system cancel.' },
        { id: 'gravitation', name: 'Newton\'s law of gravitation', tex: tex`|\vec F_g| = G\dfrac{m_1 m_2}{r^2}`, vars: [['F_g', 'gravitational force', 'N'], ['m_1, m_2', 'the two masses', 'kg'], ['r', 'distance between centers', 'm']], note: 'r is center to center, so add the planet\'s radius to an altitude.' },
        { id: 'weight', name: 'Weight near Earth\'s surface', tex: tex`F_g = mg`, vars: [['F_g', 'weight', 'N'], ['m', 'mass', 'kg'], ['g', 'gravitational field strength', 'N/kg']], note: 'Not written on the sheet as its own line, but follows from g = 9.8 N/kg.', memorize: true },
        { id: 'friction', name: 'Friction', tex: tex`|\vec F_f| \le |\mu \vec F_N|`, vars: [['F_f', 'friction force', 'N'], ['\\mu', 'coefficient of friction', 'unitless'], ['F_N', 'normal force', 'N']], note: 'Static friction can be anything up to μₛF_N. Kinetic friction equals μₖF_N exactly.' },
        { id: 'spring-force', name: 'Spring force (Hooke\'s law)', tex: tex`\vec F_s = -k\Delta\vec x`, vars: [['F_s', 'spring force', 'N'], ['k', 'spring constant', 'N/m'], ['\\Delta x', 'stretch or compression', 'm']], note: 'The minus sign means the spring pushes back toward equilibrium.' },
        { id: 'centripetal', name: 'Centripetal acceleration', tex: tex`a_c = \dfrac{v^2}{r}`, vars: [['a_c', 'centripetal acceleration', 'm/s²'], ['v', 'speed', 'm/s'], ['r', 'radius of the circle', 'm']], note: 'Points toward the center. It is not a new force: some real force (tension, gravity, friction) provides it.' },
      ],
    },
    {
      id: 'energy',
      title: 'Work, energy and power',
      formulas: [
        { id: 'kinetic-energy', name: 'Kinetic energy', tex: tex`K = \tfrac{1}{2}mv^2`, vars: [['K', 'kinetic energy', 'J'], ['m', 'mass', 'kg'], ['v', 'speed', 'm/s']], note: 'Never negative, and doubling speed quadruples it.' },
        { id: 'work', name: 'Work by a constant force', tex: tex`W = F_\parallel d = Fd\cos\theta`, vars: [['W', 'work', 'J'], ['F_\\parallel', 'force component along the motion', 'N'], ['d', 'distance', 'm'], ['\\theta', 'angle between force and displacement', '']], note: 'A force perpendicular to the motion (like the normal force on a level floor) does no work.' },
        { id: 'work-energy', name: 'Work-energy theorem', tex: tex`\Delta K = \sum W_i = \sum F_{\parallel,i}\, d_i`, vars: [['\\Delta K', 'change in kinetic energy', 'J'], ['W_i', 'work by each force', 'J']], note: 'Net work, from all forces, equals the change in kinetic energy.' },
        { id: 'spring-energy', name: 'Spring potential energy', tex: tex`U_s = \tfrac{1}{2}k(\Delta x)^2`, vars: [['U_s', 'spring potential energy', 'J'], ['k', 'spring constant', 'N/m'], ['\\Delta x', 'stretch or compression', 'm']], note: 'Measured from the spring\'s natural length, not from wherever it hangs.' },
        { id: 'gravitational-potential', name: 'Gravitational potential energy (general)', tex: tex`U_G = -\dfrac{Gm_1 m_2}{r}`, vars: [['U_G', 'gravitational potential energy', 'J'], ['m_1, m_2', 'the two masses', 'kg'], ['r', 'distance between centers', 'm']], note: 'Zero at infinite separation, so it is always negative. Use it for orbits and escape speed.' },
        { id: 'gravitational-potential-near', name: 'Gravitational potential energy near Earth', tex: tex`\Delta U_g = mg\Delta y`, vars: [['\\Delta U_g', 'change in potential energy', 'J'], ['m', 'mass', 'kg'], ['g', 'gravitational field strength', 'N/kg'], ['\\Delta y', 'change in height', 'm']], note: 'Only differences matter, so choose wherever is convenient as zero height.' },
        { id: 'average-power', name: 'Average power', tex: tex`P_{\text{avg}} = \dfrac{W}{\Delta t} = \dfrac{\Delta E}{\Delta t}`, vars: [['P', 'power', 'W'], ['W', 'work', 'J'], ['\\Delta E', 'energy transferred', 'J'], ['\\Delta t', 'time interval', 's']], note: 'Power is a rate: how fast energy is transferred.' },
        { id: 'instant-power', name: 'Instantaneous power', tex: tex`P_{\text{inst}} = F_\parallel v = Fv\cos\theta`, vars: [['P', 'power', 'W'], ['F_\\parallel', 'force along the velocity', 'N'], ['v', 'speed', 'm/s']], note: 'Handy for a car or motor pulling at a steady speed.' },
        { id: 'energy-conservation', name: 'Conservation of mechanical energy', tex: tex`K_i + U_i = K_f + U_f`, vars: [['K', 'kinetic energy', 'J'], ['U', 'potential energy (gravitational and spring)', 'J']], note: 'Not printed on the sheet. Holds only when no friction or other external work acts on the system.', memorize: true },
      ],
    },
    {
      id: 'momentum',
      title: 'Momentum and impulse',
      formulas: [
        { id: 'momentum', name: 'Momentum', tex: tex`\vec p = m\vec v`, vars: [['p', 'momentum', 'kg·m/s'], ['m', 'mass', 'kg'], ['v', 'velocity', 'm/s']], note: 'A vector, so direction matters. Pick a positive direction before adding.' },
        { id: 'newtons-second-momentum', name: 'Net force as rate of change of momentum', tex: tex`\vec F_{\text{net}} = \dfrac{\Delta\vec p}{\Delta t} = m\dfrac{\Delta\vec v}{\Delta t} = m\vec a`, vars: [['F_{\\text{net}}', 'net force', 'N'], ['\\Delta p', 'change in momentum', 'kg·m/s'], ['\\Delta t', 'time interval', 's']], note: 'The momentum form of Newton\'s second law.' },
        { id: 'impulse', name: 'Impulse', tex: tex`\vec J = \vec F_{\text{avg}}\Delta t = \Delta\vec p`, vars: [['J', 'impulse', 'N·s'], ['F_{\\text{avg}}', 'average force', 'N'], ['\\Delta t', 'contact time', 's'], ['\\Delta p', 'change in momentum', 'kg·m/s']], note: 'Also the area under a force-time graph.' },
        { id: 'center-of-mass-velocity', name: 'Velocity of the center of mass', tex: tex`\vec v_{\text{cm}} = \dfrac{\sum \vec p_i}{\sum m_i} = \dfrac{\sum m_i\vec v_i}{\sum m_i}`, vars: [['v_{\\text{cm}}', 'center of mass velocity', 'm/s'], ['m_i', 'mass of each object', 'kg'], ['v_i', 'velocity of each object', 'm/s']], note: 'Unchanged by a collision, because the system\'s momentum is conserved.' },
        { id: 'momentum-conservation', name: 'Conservation of momentum', tex: tex`\sum \vec p_i = \sum \vec p_f`, vars: [['p_i', 'momenta before', 'kg·m/s'], ['p_f', 'momenta after', 'kg·m/s']], note: 'Not printed on the sheet. Holds for any collision when no external impulse acts. Kinetic energy is also conserved only in an elastic collision.', memorize: true },
      ],
    },
    {
      id: 'rotation',
      title: 'Rotation',
      formulas: [
        { id: 'angular-velocity', name: 'Angular velocity with constant angular acceleration', tex: tex`\omega = \omega_0 + \alpha t`, vars: [['\\omega', 'angular speed', 'rad/s'], ['\\omega_0', 'initial angular speed', 'rad/s'], ['\\alpha', 'angular acceleration', 'rad/s²'], ['t', 'time', 's']], note: 'The rotational version of v = v₀ + at.' },
        { id: 'angular-position', name: 'Angular position with constant angular acceleration', tex: tex`\theta = \theta_0 + \omega_0 t + \tfrac{1}{2}\alpha t^2`, vars: [['\\theta', 'angular position', 'rad'], ['\\omega_0', 'initial angular speed', 'rad/s'], ['\\alpha', 'angular acceleration', 'rad/s²'], ['t', 'time', 's']], note: 'Angles must be in radians.' },
        { id: 'angular-velocity-position', name: 'Angular velocity without time', tex: tex`\omega^2 = \omega_0^2 + 2\alpha(\theta - \theta_0)`, vars: [['\\omega', 'angular speed', 'rad/s'], ['\\alpha', 'angular acceleration', 'rad/s²'], ['\\theta - \\theta_0', 'angular displacement', 'rad']], note: 'The rotational version of v² = v₀² + 2aΔx.' },
        { id: 'tangential-speed', name: 'Linear and angular speed', tex: tex`v = r\omega`, vars: [['v', 'tangential speed', 'm/s'], ['r', 'distance from the axis', 'm'], ['\\omega', 'angular speed', 'rad/s']], note: 'Points farther from the axis move faster at the same ω.' },
        { id: 'tangential-acceleration', name: 'Tangential acceleration', tex: tex`a_T = r\alpha`, vars: [['a_T', 'tangential acceleration', 'm/s²'], ['r', 'distance from the axis', 'm'], ['\\alpha', 'angular acceleration', 'rad/s²']], note: 'Different from centripetal acceleration, which points toward the axis.' },
        { id: 'torque', name: 'Torque', tex: tex`\tau = r_\perp F = rF\sin\theta`, vars: [['\\tau', 'torque', 'N·m'], ['r_\\perp', 'lever arm', 'm'], ['F', 'force', 'N'], ['\\theta', 'angle between r and F', '']], note: 'A force pointed straight at the axis (θ = 0) produces no torque.' },
        { id: 'rotational-inertia', name: 'Rotational inertia of point masses', tex: tex`I = \sum m_i r_i^2`, vars: [['I', 'rotational inertia', 'kg·m²'], ['m_i', 'each mass', 'kg'], ['r_i', 'distance from the axis', 'm']], note: 'Shapes like disks and rods are given in the question when needed.' },
        { id: 'parallel-axis', name: 'Parallel axis theorem', tex: tex`I' = I_{\text{cm}} + Md^2`, vars: [["I'", 'rotational inertia about the new axis', 'kg·m²'], ['I_{\\text{cm}}', 'rotational inertia about the center of mass', 'kg·m²'], ['M', 'total mass', 'kg'], ['d', 'distance between the axes', 'm']], note: 'The center of mass axis always gives the smallest I.' },
        { id: 'rotational-second-law', name: 'Newton\'s second law for rotation', tex: tex`\alpha_{\text{sys}} = \dfrac{\sum\tau}{I_{\text{sys}}} = \dfrac{\tau_{\text{net}}}{I_{\text{sys}}}`, vars: [['\\alpha', 'angular acceleration', 'rad/s²'], ['\\tau_{\\text{net}}', 'net torque', 'N·m'], ['I', 'rotational inertia', 'kg·m²']], note: 'Torques in opposite directions subtract.' },
        { id: 'rotational-ke', name: 'Rotational kinetic energy', tex: tex`K = \tfrac{1}{2}I\omega^2`, vars: [['K', 'rotational kinetic energy', 'J'], ['I', 'rotational inertia', 'kg·m²'], ['\\omega', 'angular speed', 'rad/s']], note: 'A rolling object has both this and ½mv².' },
        { id: 'rotational-work', name: 'Work done by a torque', tex: tex`W = \tau\Delta\theta`, vars: [['W', 'work', 'J'], ['\\tau', 'torque', 'N·m'], ['\\Delta\\theta', 'angle turned', 'rad']], note: 'The rotational version of W = Fd.' },
        { id: 'angular-momentum', name: 'Angular momentum of a rigid body', tex: tex`L = I\omega`, vars: [['L', 'angular momentum', 'kg·m²/s'], ['I', 'rotational inertia', 'kg·m²'], ['\\omega', 'angular speed', 'rad/s']], note: 'When a skater pulls in their arms, I falls and ω rises so L stays constant.' },
        { id: 'angular-momentum-point', name: 'Angular momentum of a point mass', tex: tex`L = rmv\sin\theta`, vars: [['L', 'angular momentum', 'kg·m²/s'], ['r', 'distance from the axis', 'm'], ['m', 'mass', 'kg'], ['v', 'speed', 'm/s'], ['\\theta', 'angle between r and v', '']], note: 'Even an object moving in a straight line has angular momentum about a point it doesn\'t pass through.' },
        { id: 'angular-impulse', name: 'Angular impulse', tex: tex`\Delta L = \tau\Delta t`, vars: [['\\Delta L', 'change in angular momentum', 'kg·m²/s'], ['\\tau', 'torque', 'N·m'], ['\\Delta t', 'time interval', 's']], note: 'No external torque means L is conserved.' },
        { id: 'rolling', name: 'Rolling without slipping', tex: tex`\Delta x_{\text{cm}} = r\Delta\theta`, vars: [['\\Delta x_{\\text{cm}}', 'distance the center moves', 'm'], ['r', 'radius', 'm'], ['\\Delta\\theta', 'angle turned', 'rad']], note: 'Dividing by time gives v_cm = rω.' },
      ],
    },
    {
      id: 'oscillations',
      title: 'Oscillations',
      formulas: [
        { id: 'period-frequency', name: 'Period and frequency', tex: tex`T = \dfrac{1}{f}`, vars: [['T', 'period', 's'], ['f', 'frequency', 'Hz']], note: 'Period is seconds per cycle, frequency is cycles per second.' },
        { id: 'spring-period', name: 'Period of a mass on a spring', tex: tex`T_s = 2\pi\sqrt{\dfrac{m}{k}}`, vars: [['T_s', 'period', 's'], ['m', 'mass', 'kg'], ['k', 'spring constant', 'N/m']], note: 'Does not depend on amplitude or on g, so it is the same on the Moon.' },
        { id: 'pendulum-period', name: 'Period of a simple pendulum', tex: tex`T_p = 2\pi\sqrt{\dfrac{\ell}{g}}`, vars: [['T_p', 'period', 's'], ['\\ell', 'length', 'm'], ['g', 'gravitational field strength', 'N/kg']], note: 'Does not depend on mass. Only accurate for small swings.' },
        { id: 'shm-position', name: 'Position in simple harmonic motion', tex: tex`x = A\cos(2\pi ft) \qquad x = A\sin(2\pi ft)`, vars: [['x', 'position from equilibrium', 'm'], ['A', 'amplitude', 'm'], ['f', 'frequency', 'Hz'], ['t', 'time', 's']], note: 'Use cosine when the object starts at maximum displacement, sine when it starts at equilibrium.' },
      ],
    },
    {
      id: 'fluids',
      title: 'Fluids',
      formulas: [
        { id: 'density', name: 'Density', tex: tex`\rho = \dfrac{m}{V}`, vars: [['\\rho', 'density', 'kg/m³'], ['m', 'mass', 'kg'], ['V', 'volume', 'm³']], note: 'Water is 1000 kg/m³.' },
        { id: 'pressure', name: 'Pressure', tex: tex`P = \dfrac{F_\perp}{A}`, vars: [['P', 'pressure', 'Pa'], ['F_\\perp', 'force perpendicular to the surface', 'N'], ['A', 'area', 'm²']], note: '1 Pa = 1 N/m².' },
        { id: 'absolute-pressure', name: 'Pressure at a depth', tex: tex`P = P_0 + \rho gh`, vars: [['P', 'absolute pressure', 'Pa'], ['P_0', 'pressure at the surface', 'Pa'], ['\\rho', 'fluid density', 'kg/m³'], ['h', 'depth', 'm']], note: 'Depends only on depth, not on the container\'s shape.' },
        { id: 'gauge-pressure', name: 'Gauge pressure', tex: tex`P_{\text{gauge}} = \rho gh`, vars: [['P_{\\text{gauge}}', 'pressure above atmospheric', 'Pa'], ['\\rho', 'fluid density', 'kg/m³'], ['h', 'depth', 'm']], note: 'What a tire gauge reads: absolute pressure minus atmospheric.' },
        { id: 'buoyancy', name: 'Buoyant force (Archimedes)', tex: tex`F_b = \rho Vg`, vars: [['F_b', 'buoyant force', 'N'], ['\\rho', 'density of the fluid', 'kg/m³'], ['V', 'volume of fluid displaced', 'm³']], note: 'Use the fluid\'s density and the submerged volume, not the object\'s.' },
        { id: 'continuity', name: 'Continuity equation', tex: tex`A_1 v_1 = A_2 v_2`, vars: [['A', 'cross-sectional area', 'm²'], ['v', 'flow speed', 'm/s']], note: 'Fluid speeds up where the pipe narrows.' },
        { id: 'bernoulli', name: 'Bernoulli\'s equation', tex: tex`P_1 + \rho g y_1 + \tfrac{1}{2}\rho v_1^2 = P_2 + \rho g y_2 + \tfrac{1}{2}\rho v_2^2`, vars: [['P', 'pressure', 'Pa'], ['\\rho', 'fluid density', 'kg/m³'], ['y', 'height', 'm'], ['v', 'flow speed', 'm/s']], note: 'Energy conservation per unit volume. Faster flow means lower pressure at the same height.' },
      ],
    },
    {
      id: 'geometry',
      title: 'Geometry and trigonometry',
      formulas: [
        { id: 'triangle-area', name: 'Area of a triangle', tex: tex`A = \tfrac{1}{2}bh`, vars: [['A', 'area', 'm²'], ['b', 'base', 'm'], ['h', 'height', 'm']] },
        { id: 'circle', name: 'Circle', tex: tex`A = \pi r^2 \qquad C = 2\pi r \qquad s = r\theta`, vars: [['A', 'area', 'm²'], ['C', 'circumference', 'm'], ['s', 'arc length', 'm'], ['r', 'radius', 'm'], ['\\theta', 'angle', 'rad']], note: 's = rθ needs θ in radians.' },
        { id: 'cylinder', name: 'Cylinder', tex: tex`V = \pi r^2\ell \qquad S = 2\pi r\ell + 2\pi r^2`, vars: [['V', 'volume', 'm³'], ['S', 'surface area', 'm²'], ['r', 'radius', 'm'], ['\\ell', 'length', 'm']] },
        { id: 'sphere', name: 'Sphere', tex: tex`V = \tfrac{4}{3}\pi r^3 \qquad S = 4\pi r^2`, vars: [['V', 'volume', 'm³'], ['S', 'surface area', 'm²'], ['r', 'radius', 'm']] },
        { id: 'right-triangle', name: 'Right triangle', tex: tex`a^2 + b^2 = c^2 \qquad \sin\theta = \dfrac{a}{c} \qquad \cos\theta = \dfrac{b}{c} \qquad \tan\theta = \dfrac{a}{b}`, vars: [['a', 'side opposite θ', 'm'], ['b', 'side adjacent to θ', 'm'], ['c', 'hypotenuse', 'm']], note: 'For components: F_x = F cos θ and F_y = F sin θ when θ is measured from the x-axis.' },
      ],
    },
  ],
};
