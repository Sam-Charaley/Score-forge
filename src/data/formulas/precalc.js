// AP Precalculus formulas for the three exam units (Unit 4 is not on the AP
// exam). The exam gives no formula sheet, so everything is memorize.
const tex = String.raw;

export default {
  subjectId: 'precalc',
  sheet: {
    given: false,
    label: 'No formula sheet: memorize all of these',
  },
  sections: [
    {
      id: 'rates-polynomials',
      title: 'Rates of change and polynomials',
      formulas: [
        { id: 'average-rate', name: 'Average rate of change', tex: tex`\dfrac{f(b) - f(a)}{b - a}`, vars: [['a, b', 'endpoints of the interval', '']], note: 'The slope of the secant line through (a, f(a)) and (b, f(b)).' },
        { id: 'rate-concavity', name: 'Rates of change and concavity', tex: tex`\text{concave up} \iff \text{rate of change increasing}`, vars: [], note: 'Concave down means the rate of change is decreasing. An inflection point is where it switches.' },
        { id: 'end-behavior', name: 'End behavior of a polynomial', tex: tex`p(x) = a_nx^n + \cdots \quad\Rightarrow\quad p(x) \text{ behaves like } a_nx^n \text{ as } x\to\pm\infty`, vars: [['a_n', 'leading coefficient', ''], ['n', 'degree', '']], note: 'Even degree: both ends point the same way. Odd degree: opposite ways.' },
        { id: 'zeros-multiplicity', name: 'Zeros and multiplicity', tex: tex`(x - a)^k \text{ factor}: \ k \text{ odd crosses, } k \text{ even touches}`, vars: [['a', 'the zero', ''], ['k', 'multiplicity', '']], note: 'A degree-n polynomial has at most n real zeros and at most n − 1 turning points.' },
        { id: 'complex-zeros', name: 'Complex zeros come in pairs', tex: tex`p(a + bi) = 0 \;\Rightarrow\; p(a - bi) = 0`, vars: [['a + bi', 'a non-real zero', '']], note: 'For polynomials with real coefficients.' },
        { id: 'binomial', name: 'Binomial theorem', tex: tex`(a + b)^n = \sum_{k=0}^n \binom{n}{k}a^{n-k}b^k`, vars: [['\\binom{n}{k}', 'entries of Pascal\'s triangle', '']] },
      ],
    },
    {
      id: 'rational',
      title: 'Rational functions',
      formulas: [
        { id: 'horizontal-asymptote', name: 'Horizontal asymptote', tex: tex`r(x) = \dfrac{a_nx^n + \cdots}{b_mx^m + \cdots}: \ \begin{cases} y = 0 & n < m \\ y = a_n/b_m & n = m \\ \text{none} & n > m \end{cases}`, vars: [['n, m', 'degrees of numerator and denominator', '']], note: 'When n = m + 1 there is a slant asymptote instead, found by long division.' },
        { id: 'vertical-asymptote-hole', name: 'Vertical asymptotes and holes', tex: tex`\text{zero of the denominator only} \Rightarrow \text{vertical asymptote} \qquad \text{zero of both (cancels)} \Rightarrow \text{hole}`, vars: [], note: 'Cancel common factors first. The hole\'s y-value comes from the simplified function.' },
      ],
    },
    {
      id: 'transformations',
      title: 'Transformations and function composition',
      formulas: [
        { id: 'transformations', name: 'Transformations', tex: tex`g(x) = a\,f\big(b(x - h)\big) + k`, vars: [['a', 'vertical stretch (reflect if negative)', ''], ['b', 'horizontal compression by factor 1/|b|', ''], ['h', 'shift right', ''], ['k', 'shift up', '']], note: 'Inside changes act on x and feel backwards: x − 3 shifts right.' },
        { id: 'inverse', name: 'Inverse functions', tex: tex`f\big(f^{-1}(x)\big) = x \quad\text{and}\quad (a, b) \text{ on } f \iff (b, a) \text{ on } f^{-1}`, vars: [], note: 'Swap x and y, then solve for y. The graph reflects over y = x.' },
      ],
    },
    {
      id: 'exponential-log',
      title: 'Exponential and logarithmic functions',
      formulas: [
        { id: 'arithmetic-sequence', name: 'Arithmetic sequence', tex: tex`a_n = a_0 + dn`, vars: [['a_0', 'initial term', ''], ['d', 'common difference', '']], note: 'Equal differences over equal intervals: the discrete version of a linear function.' },
        { id: 'geometric-sequence', name: 'Geometric sequence', tex: tex`g_n = g_0 r^n`, vars: [['g_0', 'initial term', ''], ['r', 'common ratio', '']], note: 'Equal ratios over equal intervals: the discrete version of an exponential function.' },
        { id: 'exponential', name: 'Exponential function', tex: tex`f(x) = ab^x`, vars: [['a', 'initial value f(0)', ''], ['b', 'growth factor (b > 1) or decay factor (0 < b < 1)', '']], note: 'A growth rate of 6% means b = 1.06.' },
        { id: 'exponent-rules', name: 'Exponent rules', tex: tex`b^m b^n = b^{m+n} \qquad \dfrac{b^m}{b^n} = b^{m-n} \qquad (b^m)^n = b^{mn} \qquad b^{-n} = \dfrac{1}{b^n}`, vars: [] },
        { id: 'log-definition', name: 'Definition of a logarithm', tex: tex`\log_b x = y \iff b^y = x`, vars: [['b', 'base, b > 0 and b ≠ 1', '']], note: 'Logs and exponentials with the same base undo each other.' },
        { id: 'log-rules', name: 'Logarithm rules', tex: tex`\log_b(mn) = \log_b m + \log_b n \qquad \log_b\dfrac{m}{n} = \log_b m - \log_b n \qquad \log_b(m^p) = p\log_b m`, vars: [] },
        { id: 'change-of-base', name: 'Change of base', tex: tex`\log_b x = \dfrac{\ln x}{\ln b}`, vars: [], note: 'How to evaluate any base on a calculator.' },
        { id: 'semi-log', name: 'Semi-log plots', tex: tex`y = ab^x \;\Rightarrow\; \log y = \log a + x\log b`, vars: [], note: 'Exponential data looks linear when y is on a log scale.' },
      ],
    },
    {
      id: 'trig',
      title: 'Trigonometric and polar functions',
      formulas: [
        { id: 'unit-circle', name: 'Sine and cosine on a circle', tex: tex`x = r\cos\theta \qquad y = r\sin\theta \qquad \tan\theta = \dfrac{\sin\theta}{\cos\theta}`, vars: [['r', 'radius', ''], ['\\theta', 'angle in standard position', '']], note: 'On the unit circle (r = 1), the point is (cos θ, sin θ).' },
        { id: 'radians', name: 'Radians and degrees', tex: tex`\pi \text{ rad} = 180^\circ \qquad s = r\theta`, vars: [['s', 'arc length', ''], ['\\theta', 'angle in radians', '']] },
        { id: 'special-angles', name: 'Special angle values', tex: tex`\begin{array}{c|ccccc} \theta & 0 & \tfrac{\pi}{6} & \tfrac{\pi}{4} & \tfrac{\pi}{3} & \tfrac{\pi}{2} \\ \hline \sin\theta & 0 & \tfrac{1}{2} & \tfrac{\sqrt2}{2} & \tfrac{\sqrt3}{2} & 1 \\ \cos\theta & 1 & \tfrac{\sqrt3}{2} & \tfrac{\sqrt2}{2} & \tfrac{1}{2} & 0 \end{array}`, vars: [] },
        { id: 'sinusoid', name: 'Sinusoidal function', tex: tex`f(\theta) = a\sin\big(b(\theta + c)\big) + d`, vars: [['|a|', 'amplitude', ''], ['2\\pi/|b|', 'period', ''], ['-c', 'phase shift', ''], ['d', 'midline y = d', '']], note: 'Amplitude is half of max − min. The midline is their average.' },
        { id: 'tangent-period', name: 'Period of tangent', tex: tex`y = \tan(b\theta) \text{ has period } \dfrac{\pi}{|b|}`, vars: [], note: 'Vertical asymptotes wherever cos θ = 0.' },
        { id: 'reciprocal-trig', name: 'Reciprocal functions', tex: tex`\csc\theta = \dfrac{1}{\sin\theta} \qquad \sec\theta = \dfrac{1}{\cos\theta} \qquad \cot\theta = \dfrac{1}{\tan\theta}`, vars: [] },
        { id: 'pythagorean', name: 'Pythagorean identities', tex: tex`\sin^2\theta + \cos^2\theta = 1 \qquad 1 + \tan^2\theta = \sec^2\theta \qquad 1 + \cot^2\theta = \csc^2\theta`, vars: [], note: 'Divide the first by cos²θ or sin²θ to get the other two.' },
        { id: 'sum-identities', name: 'Sum and difference identities', tex: tex`\sin(\alpha \pm \beta) = \sin\alpha\cos\beta \pm \cos\alpha\sin\beta \qquad \cos(\alpha \pm \beta) = \cos\alpha\cos\beta \mp \sin\alpha\sin\beta`, vars: [], note: 'Note the flipped sign in the cosine version.' },
        { id: 'double-angle', name: 'Double angle identities', tex: tex`\sin 2\theta = 2\sin\theta\cos\theta \qquad \cos 2\theta = \cos^2\theta - \sin^2\theta = 1 - 2\sin^2\theta = 2\cos^2\theta - 1`, vars: [] },
        { id: 'inverse-trig-ranges', name: 'Inverse trig ranges', tex: tex`\arcsin: \left[-\tfrac{\pi}{2}, \tfrac{\pi}{2}\right] \qquad \arccos: [0, \pi] \qquad \arctan: \left(-\tfrac{\pi}{2}, \tfrac{\pi}{2}\right)`, vars: [], note: 'Solving sin θ = k has more solutions than arcsin(k) gives. Use the period to find the rest.' },
        { id: 'polar-conversion', name: 'Polar and rectangular coordinates', tex: tex`x = r\cos\theta \qquad y = r\sin\theta \qquad r^2 = x^2 + y^2 \qquad \tan\theta = \dfrac{y}{x}`, vars: [['r', 'distance from the origin', ''], ['\\theta', 'angle', '']], note: 'Check the quadrant: arctan(y/x) alone gives the wrong angle when x < 0.' },
        { id: 'complex-polar', name: 'Complex numbers in polar form', tex: tex`a + bi = r(\cos\theta + i\sin\theta)`, vars: [['r', '√(a² + b²)', ''], ['\\theta', 'angle of the point (a, b)', '']] },
      ],
    },
  ],
};
