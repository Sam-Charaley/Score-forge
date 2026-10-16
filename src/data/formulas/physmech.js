// AP Physics C: Mechanics formulas. Everything not marked memorize is
// printed on the College Board exam reference sheet (2025 edition), in the
// sheet's own notation, including its calculus and vector pages.
// Each var is [symbol, meaning, unit]; tex strings are KaTeX.
const tex = String.raw;

export default {
  subjectId: 'physmech',
  sheet: {
    given: true,
    label: 'College Board AP Physics C: Mechanics reference information (2025)',
    url: 'https://apcentral.collegeboard.org/media/pdf/ap-physics-c-mechanics-equations-sheet.pdf',
  },
  sections: [
    {
      id: 'constants',
      title: 'Constants',
      formulas: [
        { id: 'gravitational-constant', name: 'Universal gravitational constant', tex: tex`G = 6.67\times10^{-11}\ \mathrm{N\cdot m^2/kg^2}`, vars: [] },
        { id: 'g-surface', name: 'Gravity at Earth\'s surface', tex: tex`g = 9.8\ \mathrm{m/s^2} = 9.8\ \mathrm{N/kg}`, vars: [] },
      ],
    },
    {
      id: 'kinematics',
      title: 'Kinematics',
      formulas: [
        { id: 'constant-acceleration', name: 'Constant acceleration', tex: tex`\begin{aligned} v_x &= v_{x0} + a_xt \\ x &= x_0 + v_{x0}t + \tfrac{1}{2}a_xt^2 \\ v_x^2 &= v_{x0}^2 + 2a_x(x - x_0) \end{aligned}`, vars: [['v_x', 'velocity', 'm/s'], ['a_x', 'acceleration', 'm/s²'], ['x', 'position', 'm'], ['t', 'time', 's']], note: 'Only when acceleration is constant. Otherwise integrate.' },
        { id: 'displacement-integral', name: 'Displacement from velocity', tex: tex`\Delta x = \int v_x(t)\,dt`, vars: [['\\Delta x', 'displacement', 'm'], ['v_x', 'velocity', 'm/s']], note: 'Also the area under a velocity-time graph.' },
        { id: 'velocity-integral', name: 'Velocity change from acceleration', tex: tex`\Delta v_x = \int a_x(t)\,dt`, vars: [['\\Delta v_x', 'change in velocity', 'm/s'], ['a_x', 'acceleration', 'm/s²']] },
        { id: 'kinematic-derivatives', name: 'Velocity and acceleration as derivatives', tex: tex`v_x = \dfrac{dx}{dt} \qquad a_x = \dfrac{dv_x}{dt}`, vars: [], note: 'Not printed on the sheet as kinematics, but implied by its integrals.', memorize: true },
      ],
    },
    {
      id: 'center-of-mass',
      title: 'Center of mass and density',
      formulas: [
        { id: 'cm-discrete', name: 'Center of mass (point masses)', tex: tex`\vec x_{\text{cm}} = \dfrac{\sum m_i\vec x_i}{\sum m_i}`, vars: [['m_i', 'each mass', 'kg'], ['x_i', 'each position', 'm']] },
        { id: 'cm-continuous', name: 'Center of mass (continuous object)', tex: tex`\vec r_{\text{cm}} = \dfrac{\int \vec r\,dm}{\int dm}`, vars: [['dm', 'a small piece of mass', 'kg'], ['\\vec r', 'its position', 'm']], note: 'Write dm = λ dx for a rod with linear mass density λ.' },
        { id: 'linear-density', name: 'Linear mass density', tex: tex`\lambda = \dfrac{d}{d\ell}m(\ell)`, vars: [['\\lambda', 'linear mass density', 'kg/m'], ['m(\\ell)', 'mass up to length ℓ', 'kg']], note: 'For a uniform rod, λ = M/L.' },
      ],
    },
    {
      id: 'forces',
      title: 'Forces and dynamics',
      formulas: [
        { id: 'newtons-second', name: 'Newton\'s second law (system)', tex: tex`\vec a_{\text{sys}} = \dfrac{\sum\vec F}{m_{\text{sys}}} = \dfrac{\vec F_{\text{net}}}{m_{\text{sys}}}`, vars: [['a_{\\text{sys}}', 'acceleration', 'm/s²'], ['F_{\\text{net}}', 'net external force', 'N'], ['m_{\\text{sys}}', 'system mass', 'kg']] },
        { id: 'net-force-momentum', name: 'Net force as rate of change of momentum', tex: tex`\vec F_{\text{net}} = \dfrac{d\vec p}{dt}`, vars: [['\\vec p', 'momentum', 'kg·m/s']], note: 'The general form, needed when mass changes.' },
        { id: 'gravitation', name: 'Newton\'s law of gravitation', tex: tex`|\vec F_g| = G\dfrac{m_1m_2}{r^2}`, vars: [['m_1, m_2', 'masses', 'kg'], ['r', 'center-to-center distance', 'm']] },
        { id: 'friction', name: 'Friction', tex: tex`|\vec F_f| \le |\mu\vec F_N|`, vars: [['\\mu', 'coefficient of friction', 'unitless'], ['F_N', 'normal force', 'N']], note: 'Equality holds for kinetic friction and for static friction at the point of slipping.' },
        { id: 'spring-force', name: 'Spring force', tex: tex`\vec F_s = -k\Delta\vec x`, vars: [['k', 'spring constant', 'N/m'], ['\\Delta x', 'stretch or compression', 'm']] },
        { id: 'centripetal', name: 'Centripetal acceleration', tex: tex`a_c = \dfrac{v^2}{r} = r\omega^2`, vars: [['v', 'speed', 'm/s'], ['r', 'radius', 'm'], ['\\omega', 'angular speed', 'rad/s']] },
        { id: 'drag', name: 'Linear drag and terminal velocity', tex: tex`\vec F_{\text{drag}} = -b\vec v \qquad v_T = \dfrac{mg}{b} \qquad v(t) = v_T\left(1 - e^{-bt/m}\right)`, vars: [['b', 'drag constant', 'kg/s'], ['v_T', 'terminal speed', 'm/s']], note: 'Not on the sheet. Set up mg − bv = m dv/dt and separate variables; FRQs ask you to derive it.', memorize: true },
        { id: 'force-from-potential', name: 'Force from potential energy', tex: tex`F_x = -\dfrac{dU(x)}{dx}`, vars: [['F_x', 'force', 'N'], ['U', 'potential energy', 'J']], note: 'Equilibrium where the slope of U(x) is zero: stable at a minimum, unstable at a maximum.' },
      ],
    },
    {
      id: 'energy',
      title: 'Work, energy and power',
      formulas: [
        { id: 'kinetic-energy', name: 'Kinetic energy', tex: tex`K = \tfrac{1}{2}mv^2`, vars: [['m', 'mass', 'kg'], ['v', 'speed', 'm/s']] },
        { id: 'work', name: 'Work', tex: tex`W = \int_a^b \vec F\cdot d\vec r`, vars: [['\\vec F', 'force', 'N'], ['d\\vec r', 'small displacement', 'm']], note: 'The area under a force-position graph.' },
        { id: 'work-energy', name: 'Work-energy theorem', tex: tex`\Delta K = \sum W_i = \sum F_{\parallel,i}\,d_i`, vars: [['\\Delta K', 'change in kinetic energy', 'J']] },
        { id: 'potential-from-force', name: 'Potential energy from a conservative force', tex: tex`\Delta U = -\int_a^b \vec F_{\text{cf}}(r)\cdot d\vec r`, vars: [['F_{\\text{cf}}', 'conservative force', 'N']], note: 'The minus sign: a force doing positive work lowers U.' },
        { id: 'spring-energy', name: 'Spring potential energy', tex: tex`U_s = \tfrac{1}{2}k(\Delta x)^2`, vars: [['k', 'spring constant', 'N/m'], ['\\Delta x', 'stretch or compression', 'm']] },
        { id: 'gravitational-potential', name: 'Gravitational potential energy', tex: tex`U_G = -G\dfrac{m_1m_2}{r} \qquad \Delta U_g = mg\Delta y`, vars: [['r', 'center-to-center distance', 'm'], ['\\Delta y', 'height change near the surface', 'm']] },
        { id: 'escape-orbit', name: 'Orbital and escape speed', tex: tex`v_{\text{orbit}} = \sqrt{\dfrac{GM}{r}} \qquad v_{\text{escape}} = \sqrt{\dfrac{2GM}{r}}`, vars: [['M', 'mass being orbited', 'kg'], ['r', 'orbital radius', 'm']], note: 'Not on the sheet. Derive them from F_g = mv²/r and K + U_G = 0.', memorize: true },
        { id: 'power', name: 'Power', tex: tex`P_{\text{avg}} = \dfrac{W}{\Delta t} = \dfrac{\Delta E}{\Delta t} \qquad P_{\text{inst}} = \dfrac{dW}{dt}`, vars: [['P', 'power', 'W'], ['W', 'work', 'J']], note: 'Also P = F·v for a force on a moving object.' },
      ],
    },
    {
      id: 'momentum',
      title: 'Momentum and impulse',
      formulas: [
        { id: 'momentum', name: 'Momentum', tex: tex`\vec p = m\vec v`, vars: [['p', 'momentum', 'kg·m/s']] },
        { id: 'impulse', name: 'Impulse', tex: tex`\vec J = \int_{t_1}^{t_2}\vec F_{\text{net}}(t)\,dt = \Delta\vec p`, vars: [['J', 'impulse', 'N·s']], note: 'The area under a force-time graph.' },
        { id: 'cm-velocity', name: 'Velocity of the center of mass', tex: tex`\vec v_{\text{cm}} = \dfrac{\sum\vec p_i}{\sum m_i} = \dfrac{\sum m_i\vec v_i}{\sum m_i}`, vars: [], note: 'Constant when no external force acts, even through a collision or explosion.' },
      ],
    },
    {
      id: 'rotation',
      title: 'Rotation',
      formulas: [
        { id: 'angular-derivatives', name: 'Angular velocity and acceleration', tex: tex`\omega = \dfrac{d\theta}{dt} \qquad \alpha = \dfrac{d\omega}{dt}`, vars: [['\\omega', 'angular speed', 'rad/s'], ['\\alpha', 'angular acceleration', 'rad/s²']] },
        { id: 'angular-kinematics', name: 'Constant angular acceleration', tex: tex`\begin{aligned} \omega &= \omega_0 + \alpha t \\ \theta &= \theta_0 + \omega_0t + \tfrac{1}{2}\alpha t^2 \\ \omega^2 &= \omega_0^2 + 2\alpha(\theta - \theta_0) \end{aligned}`, vars: [['\\theta', 'angular position', 'rad']] },
        { id: 'linear-angular', name: 'Linear and angular quantities', tex: tex`v = r\omega \qquad a_T = r\alpha \qquad \Delta x_{\text{cm}} = r\Delta\theta`, vars: [['a_T', 'tangential acceleration', 'm/s²']], note: 'Δx_cm = rΔθ is the rolling-without-slipping condition.' },
        { id: 'torque', name: 'Torque', tex: tex`\vec\tau = \vec r\times\vec F`, vars: [['\\tau', 'torque', 'N·m'], ['\\vec r', 'position from the axis', 'm']], note: 'Magnitude rF sin θ. Direction from the right-hand rule.' },
        { id: 'inertia-sum', name: 'Rotational inertia', tex: tex`I_{\text{tot}} = \sum I_i = \sum m_ir_i^2 \qquad I = \int r^2\,dm`, vars: [['I', 'rotational inertia', 'kg·m²'], ['r', 'distance from the axis', 'm']] },
        { id: 'parallel-axis', name: 'Parallel axis theorem', tex: tex`I' = I_{\text{cm}} + Md^2`, vars: [['d', 'distance between the axes', 'm'], ['M', 'total mass', 'kg']] },
        { id: 'common-inertias', name: 'Common rotational inertias', tex: tex`\text{rod, center: } \tfrac{1}{12}ML^2 \qquad \text{rod, end: } \tfrac{1}{3}ML^2 \qquad \text{disk: } \tfrac{1}{2}MR^2 \qquad \text{hoop: } MR^2 \qquad \text{solid sphere: } \tfrac{2}{5}MR^2 \qquad \text{hollow sphere: } \tfrac{2}{3}MR^2`, vars: [], note: 'Not on the sheet. Questions usually give them, but knowing them saves time and lets you check an integral.', memorize: true },
        { id: 'rotational-second-law', name: 'Newton\'s second law for rotation', tex: tex`\alpha_{\text{sys}} = \dfrac{\sum\tau}{I_{\text{sys}}} = \dfrac{\tau_{\text{net}}}{I_{\text{sys}}}`, vars: [] },
        { id: 'rotational-ke', name: 'Rotational kinetic energy', tex: tex`K_{\text{rot}} = \tfrac{1}{2}I\omega^2`, vars: [], note: 'A rolling object has K = ½Mv²_cm + ½I_cm ω².' },
        { id: 'rotational-work', name: 'Work done by a torque', tex: tex`W = \int\tau\,d\theta`, vars: [] },
        { id: 'angular-momentum', name: 'Angular momentum', tex: tex`\vec L = \vec r\times\vec p = I\vec\omega`, vars: [['L', 'angular momentum', 'kg·m²/s']] },
        { id: 'angular-impulse', name: 'Angular impulse', tex: tex`\Delta L = \int\tau\,dt`, vars: [], note: 'With no external torque, L is conserved.' },
      ],
    },
    {
      id: 'oscillations',
      title: 'Oscillations',
      formulas: [
        { id: 'period', name: 'Period, frequency and angular frequency', tex: tex`T = \dfrac{2\pi}{\omega} = \dfrac{1}{f}`, vars: [['T', 'period', 's'], ['\\omega', 'angular frequency', 'rad/s'], ['f', 'frequency', 'Hz']] },
        { id: 'spring-period', name: 'Mass on a spring', tex: tex`T_s = 2\pi\sqrt{\dfrac{m}{k}}`, vars: [['m', 'mass', 'kg'], ['k', 'spring constant', 'N/m']] },
        { id: 'pendulum-period', name: 'Simple pendulum', tex: tex`T_p = 2\pi\sqrt{\dfrac{\ell}{g}}`, vars: [['\\ell', 'length', 'm']], note: 'Small angles only.' },
        { id: 'physical-pendulum', name: 'Physical pendulum', tex: tex`T_{\text{phys}} = 2\pi\sqrt{\dfrac{I}{mgd}}`, vars: [['I', 'rotational inertia about the pivot', 'kg·m²'], ['d', 'pivot to center of mass', 'm']] },
        { id: 'shm-position', name: 'Simple harmonic motion', tex: tex`x = x_{\max}\cos(\omega t + \phi)`, vars: [['x_{\\max}', 'amplitude', 'm'], ['\\phi', 'phase angle', 'rad']], note: 'Any system with a = −ω²x is simple harmonic, with that ω.' },
      ],
    },
    {
      id: 'math',
      title: 'Vectors and calculus',
      formulas: [
        { id: 'dot-cross', name: 'Dot and cross products', tex: tex`\vec A\cdot\vec B = AB\cos\theta \qquad |\vec A\times\vec B| = AB\sin\theta`, vars: [['\\theta', 'angle between the vectors', '']] },
        { id: 'vector-components', name: 'Vectors in components', tex: tex`\vec r = A\hat\imath + B\hat\jmath + C\hat k \qquad \vec C = (A_x + B_x)\hat\imath + (A_y + B_y)\hat\jmath`, vars: [] },
        { id: 'chain-rule', name: 'Chain rule', tex: tex`\dfrac{df}{dx} = \dfrac{df}{du}\dfrac{du}{dx}`, vars: [] },
        { id: 'derivatives', name: 'Derivatives', tex: tex`\dfrac{d}{dx}(x^n) = nx^{n-1} \qquad \dfrac{d}{dx}(e^{ax}) = ae^{ax} \qquad \dfrac{d}{dx}(\ln ax) = \dfrac{1}{x} \qquad \dfrac{d}{dx}[\sin(ax)] = a\cos(ax) \qquad \dfrac{d}{dx}[\cos(ax)] = -a\sin(ax)`, vars: [] },
        { id: 'integrals', name: 'Integrals', tex: tex`\int x^n\,dx = \dfrac{1}{n+1}x^{n+1},\ n \ne -1 \qquad \int e^{ax}\,dx = \dfrac{1}{a}e^{ax} \qquad \int \dfrac{dx}{x+a} = \ln|x + a| \qquad \int \cos(ax)\,dx = \dfrac{1}{a}\sin(ax) \qquad \int \sin(ax)\,dx = -\dfrac{1}{a}\cos(ax)`, vars: [] },
        { id: 'identities', name: 'Identities', tex: tex`\log(a\cdot b^x) = \log a + x\log b \qquad \sin^2\theta + \cos^2\theta = 1 \qquad \sin 2\theta = 2\sin\theta\cos\theta`, vars: [] },
      ],
    },
  ],
};
