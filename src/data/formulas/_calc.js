// Formulas for AP Calculus Units 1-8, shared by calcab.js and calcbc.js the
// same way their question banks share questions/calc/. Formulas marked
// onlyIn: 'calcbc' are BC topics inside those units (by parts, partial
// fractions, improper integrals, Euler's method, logistic growth, arc length).
// Neither Calculus exam gives a formula sheet, so everything is memorize.
const tex = String.raw;

const SECTIONS = [
  {
    id: 'limits',
    title: 'Limits and continuity',
    formulas: [
      { id: 'continuity', name: 'Continuity at a point', tex: tex`\lim_{x\to a} f(x) = f(a)`, vars: [['f(a)', 'value of the function at a', '']], note: 'Three conditions: f(a) exists, the limit exists, and they are equal. Name all three on an FRQ.' },
      { id: 'sin-limit', name: 'Special trig limit', tex: tex`\lim_{x\to 0}\dfrac{\sin x}{x} = 1`, vars: [], note: 'x must be in radians. Rewrite sin(5x)/x as 5 · sin(5x)/(5x).' },
      { id: 'cos-limit', name: 'Special trig limit (cosine)', tex: tex`\lim_{x\to 0}\dfrac{1 - \cos x}{x} = 0`, vars: [] },
      { id: 'limits-at-infinity', name: 'Limits of rational functions at infinity', tex: tex`\lim_{x\to\infty}\dfrac{ax^n + \cdots}{bx^m + \cdots} = \begin{cases} 0 & n < m \\ a/b & n = m \\ \pm\infty & n > m \end{cases}`, vars: [['n, m', 'degrees of the top and bottom', ''], ['a, b', 'leading coefficients', '']], note: 'Compare degrees. Equal degrees give the horizontal asymptote y = a/b.' },
      { id: 'ivt', name: 'Intermediate Value Theorem', tex: tex`f(c) = k \text{ for some } c \in (a,b)`, vars: [], note: 'Needs f continuous on [a, b] and k between f(a) and f(b). On an FRQ, state that f is continuous on the closed interval before using it.' },
    ],
  },
  {
    id: 'derivative-definition',
    title: 'Definition of the derivative',
    formulas: [
      { id: 'derivative-limit', name: 'Derivative as a limit', tex: tex`f'(x) = \lim_{h\to 0}\dfrac{f(x+h) - f(x)}{h}`, vars: [['h', 'small change in x', '']], note: 'When a limit looks like this, it is a derivative in disguise: name the function and the point.' },
      { id: 'derivative-limit-at-a', name: 'Derivative at a point', tex: tex`f'(a) = \lim_{x\to a}\dfrac{f(x) - f(a)}{x - a}`, vars: [['a', 'the point', '']] },
      { id: 'average-rate', name: 'Average rate of change', tex: tex`\dfrac{f(b) - f(a)}{b - a}`, vars: [['a, b', 'endpoints of the interval', '']], note: 'The slope of the secant line. The derivative is the instantaneous version.' },
    ],
  },
  {
    id: 'derivative-rules',
    title: 'Derivative rules',
    formulas: [
      { id: 'power-rule', name: 'Power rule', tex: tex`\dfrac{d}{dx}x^n = nx^{n-1}`, vars: [['n', 'any real constant', '']], note: 'Rewrite roots and fractions first: √x = x^(1/2), 1/x² = x^(−2).' },
      { id: 'product-rule', name: 'Product rule', tex: tex`(fg)' = f'g + fg'`, vars: [] },
      { id: 'quotient-rule', name: 'Quotient rule', tex: tex`\left(\dfrac{f}{g}\right)' = \dfrac{f'g - fg'}{g^2}`, vars: [], note: 'Order matters in the numerator: "low d-high minus high d-low".' },
      { id: 'chain-rule', name: 'Chain rule', tex: tex`\dfrac{d}{dx}f(g(x)) = f'(g(x))\,g'(x)`, vars: [], note: 'Derivative of the outside, evaluated at the inside, times the derivative of the inside.' },
      { id: 'exp-log', name: 'Exponentials and logarithms', tex: tex`\dfrac{d}{dx}e^x = e^x \qquad \dfrac{d}{dx}a^x = a^x\ln a \qquad \dfrac{d}{dx}\ln x = \dfrac{1}{x} \qquad \dfrac{d}{dx}\log_a x = \dfrac{1}{x\ln a}`, vars: [['a', 'positive base, a ≠ 1', '']] },
      { id: 'trig-derivatives', name: 'Trig derivatives', tex: tex`(\sin x)' = \cos x \qquad (\cos x)' = -\sin x \qquad (\tan x)' = \sec^2 x \qquad (\cot x)' = -\csc^2 x \qquad (\sec x)' = \sec x\tan x \qquad (\csc x)' = -\csc x\cot x`, vars: [], note: 'Every co-function (cos, cot, csc) gets a minus sign.' },
      { id: 'inverse-trig-derivatives', name: 'Inverse trig derivatives', tex: tex`\dfrac{d}{dx}\arcsin x = \dfrac{1}{\sqrt{1-x^2}} \qquad \dfrac{d}{dx}\arccos x = \dfrac{-1}{\sqrt{1-x^2}} \qquad \dfrac{d}{dx}\arctan x = \dfrac{1}{1+x^2}`, vars: [] },
      { id: 'inverse-function', name: 'Derivative of an inverse function', tex: tex`(f^{-1})'(a) = \dfrac{1}{f'\!\left(f^{-1}(a)\right)}`, vars: [['a', 'a value in the range of f', '']], note: 'First find which x gives f(x) = a, then use f\' at that x.' },
    ],
  },
  {
    id: 'applications',
    title: 'Applications of derivatives',
    formulas: [
      { id: 'tangent-line', name: 'Tangent line (linearization)', tex: tex`L(x) = f(a) + f'(a)(x - a)`, vars: [['a', 'point of tangency', '']], note: 'Overestimates where f is concave down, underestimates where it is concave up.' },
      { id: 'motion', name: 'Motion along a line', tex: tex`v(t) = x'(t) \qquad a(t) = v'(t) = x''(t) \qquad \text{speed} = |v(t)|`, vars: [['x', 'position', ''], ['v', 'velocity', ''], ['a', 'acceleration', '']], note: 'Speed increases when v and a have the same sign.' },
      { id: 'lhopital', name: 'L\'Hôpital\'s rule', tex: tex`\lim_{x\to a}\dfrac{f(x)}{g(x)} = \lim_{x\to a}\dfrac{f'(x)}{g'(x)}`, vars: [], note: 'Only when direct substitution gives 0/0 or ∞/∞; show that form on an FRQ. Differentiate top and bottom separately, not with the quotient rule.' },
      { id: 'mvt', name: 'Mean Value Theorem', tex: tex`f'(c) = \dfrac{f(b) - f(a)}{b - a}`, vars: [['c', 'a point inside the interval', '']], note: 'For some c in (a, b). Requires f continuous on [a, b] and differentiable on (a, b).' },
      { id: 'evt', name: 'Extreme Value Theorem and the candidates test', tex: tex`f'(c) = 0 \text{ or undefined} \qquad x = a \qquad x = b`, vars: [], note: 'A function continuous on [a, b] has an absolute max and min there. They occur at critical points (f\' = 0 or undefined) or at the endpoints, so evaluate f at all of them and compare.' },
      { id: 'first-derivative-test', name: 'First derivative test', tex: tex`f' \text{ changes } + \to - \Rightarrow \text{local max} \qquad - \to + \Rightarrow \text{local min}`, vars: [], note: 'A critical point where f\' doesn\'t change sign is not an extremum.' },
      { id: 'second-derivative-test', name: 'Second derivative test', tex: tex`f'(c) = 0,\ f''(c) < 0 \Rightarrow \text{local max} \qquad f'(c) = 0,\ f''(c) > 0 \Rightarrow \text{local min}`, vars: [], note: 'Inconclusive when f\'\'(c) = 0.' },
      { id: 'inflection', name: 'Point of inflection', tex: tex`f'' \text{ changes sign at } x = c`, vars: [], note: 'f\'\'(c) = 0 alone is not enough: x⁴ has f\'\'(0) = 0 but no inflection point.' },
    ],
  },
  {
    id: 'integrals',
    title: 'Integrals and the Fundamental Theorem',
    formulas: [
      { id: 'basic-antiderivatives', name: 'Basic antiderivatives', tex: tex`\int x^n\,dx = \dfrac{x^{n+1}}{n+1} + C \qquad \int \dfrac{1}{x}\,dx = \ln|x| + C \qquad \int e^x\,dx = e^x + C \qquad \int a^x\,dx = \dfrac{a^x}{\ln a} + C`, vars: [['C', 'constant of integration', '']], note: 'Forgetting + C costs a point on indefinite integrals.' },
      { id: 'trig-antiderivatives', name: 'Trig antiderivatives', tex: tex`\int \sin x\,dx = -\cos x + C \qquad \int \cos x\,dx = \sin x + C \qquad \int \sec^2 x\,dx = \tan x + C \qquad \int \csc^2 x\,dx = -\cot x + C \qquad \int \sec x\tan x\,dx = \sec x + C \qquad \int \csc x\cot x\,dx = -\csc x + C \qquad \int \tan x\,dx = -\ln|\cos x| + C \qquad \int \cot x\,dx = \ln|\sin x| + C`, vars: [] },
      { id: 'inverse-trig-antiderivatives', name: 'Antiderivatives giving inverse trig', tex: tex`\int \dfrac{dx}{1+x^2} = \arctan x + C \qquad \int \dfrac{dx}{\sqrt{1-x^2}} = \arcsin x + C`, vars: [] },
      { id: 'ftc-1', name: 'Fundamental Theorem (evaluation)', tex: tex`\int_a^b f(x)\,dx = F(b) - F(a) \qquad F' = f`, vars: [['F', 'any antiderivative of f', '']] },
      { id: 'ftc-2', name: 'Fundamental Theorem (derivative of an integral)', tex: tex`\dfrac{d}{dx}\int_a^{g(x)} f(t)\,dt = f(g(x))\,g'(x)`, vars: [], note: 'Plug the upper limit into f, then multiply by its derivative. With x as the plain upper limit, g\'(x) = 1.' },
      { id: 'accumulation', name: 'Net change (accumulation)', tex: tex`f(b) = f(a) + \int_a^b f'(x)\,dx`, vars: [], note: 'Starting amount plus accumulated change: the core of every rate-in, rate-out FRQ.' },
      { id: 'integral-properties', name: 'Properties of definite integrals', tex: tex`\int_a^b f = -\int_b^a f \qquad \int_a^b f + \int_b^c f = \int_a^c f \qquad \int_a^a f = 0`, vars: [] },
      { id: 'u-substitution', name: 'u-substitution', tex: tex`\int f(g(x))\,g'(x)\,dx = \int f(u)\,du \qquad u = g(x)`, vars: [['u', 'the inner function', '']], note: 'For a definite integral, change the limits to u-values or switch back to x before evaluating.' },
      { id: 'riemann-sums', name: 'Riemann and trapezoidal sums', tex: tex`\text{Left} = \sum_{i=0}^{n-1} f(x_i)\Delta x \qquad \text{Trapezoid} = \sum \dfrac{f(x_{i}) + f(x_{i+1})}{2}\,\Delta x_i`, vars: [['\\Delta x', 'width of each subinterval', '']], note: 'Tables can have uneven widths, so use each interval\'s own Δx.' },
      { id: 'average-value', name: 'Average value of a function', tex: tex`f_{\text{avg}} = \dfrac{1}{b-a}\int_a^b f(x)\,dx`, vars: [], note: 'Not the same as the average rate of change, which uses f(b) − f(a).' },
      { id: 'integration-by-parts', name: 'Integration by parts', tex: tex`\int u\,dv = uv - \int v\,du`, vars: [['u', 'the part to differentiate', ''], ['dv', 'the part to integrate', '']], note: 'Pick u by LIATE: logs, inverse trig, algebraic, trig, exponential.', onlyIn: 'calcbc' },
      { id: 'partial-fractions', name: 'Partial fractions (linear factors)', tex: tex`\dfrac{1}{(x-a)(x-b)} = \dfrac{A}{x-a} + \dfrac{B}{x-b}`, vars: [['A, B', 'constants to solve for', '']], note: 'Each piece integrates to a natural log.', onlyIn: 'calcbc' },
      { id: 'improper-integral', name: 'Improper integral', tex: tex`\int_a^\infty f(x)\,dx = \lim_{b\to\infty}\int_a^b f(x)\,dx`, vars: [], note: 'Write the limit explicitly on an FRQ. ∫ from 1 to ∞ of 1/xᵖ converges only when p > 1.', onlyIn: 'calcbc' },
    ],
  },
  {
    id: 'differential-equations',
    title: 'Differential equations',
    formulas: [
      { id: 'separation', name: 'Separation of variables', tex: tex`\dfrac{dy}{dx} = g(x)h(y) \qquad \int \dfrac{dy}{h(y)} = \int g(x)\,dx`, vars: [], note: 'Add + C right after integrating, then use the initial condition before solving for y.' },
      { id: 'exponential-growth', name: 'Exponential growth and decay', tex: tex`\dfrac{dy}{dt} = ky \;\Rightarrow\; y = y_0 e^{kt}`, vars: [['k', 'growth (k > 0) or decay (k < 0) constant', ''], ['y_0', 'initial amount', '']], note: 'The rate is proportional to the amount present.' },
      { id: 'euler', name: 'Euler\'s method', tex: tex`y_{n+1} = y_n + \left.\dfrac{dy}{dx}\right|_{(x_n,\,y_n)}\Delta x`, vars: [['\\Delta x', 'step size', '']], note: 'Use the slope at the start of each step. Show each step in a table.', onlyIn: 'calcbc' },
      { id: 'logistic', name: 'Logistic growth', tex: tex`\dfrac{dP}{dt} = kP\left(1 - \dfrac{P}{L}\right)`, vars: [['L', 'carrying capacity', ''], ['k', 'growth constant', '']], note: 'P approaches L, and grows fastest when P = L/2.', onlyIn: 'calcbc' },
    ],
  },
  {
    id: 'area-volume',
    title: 'Area, volume and motion',
    formulas: [
      { id: 'area-between', name: 'Area between curves', tex: tex`A = \int_a^b \big(f(x) - g(x)\big)\,dx \quad f \ge g`, vars: [], note: 'Top minus bottom, or right minus left if integrating in y.' },
      { id: 'disc', name: 'Volume by discs', tex: tex`V = \pi\int_a^b \big(R(x)\big)^2\,dx`, vars: [['R', 'radius, measured from the axis of rotation', '']] },
      { id: 'washer', name: 'Volume by washers', tex: tex`V = \pi\int_a^b \Big(\big(R(x)\big)^2 - \big(r(x)\big)^2\Big)\,dx`, vars: [['R', 'outer radius', ''], ['r', 'inner radius', '']], note: 'Square each radius, then subtract. (R − r)² is a common mistake.' },
      { id: 'cross-sections', name: 'Volume by known cross sections', tex: tex`V = \int_a^b A(x)\,dx`, vars: [['A(x)', 'area of the cross section at x', '']], note: 'Squares: A = s². Semicircles: A = (π/8)s². Equilateral triangles: A = (√3/4)s².' },
      { id: 'displacement-distance', name: 'Displacement and total distance', tex: tex`\text{displacement} = \int_a^b v(t)\,dt \qquad \text{distance} = \int_a^b |v(t)|\,dt`, vars: [['v', 'velocity', '']], note: 'Position at t = b is the starting position plus the displacement.' },
      { id: 'arc-length', name: 'Arc length', tex: tex`L = \int_a^b \sqrt{1 + \big(f'(x)\big)^2}\,dx`, vars: [], onlyIn: 'calcbc' },
    ],
  },
];

// The Units 1-8 sections as one Calculus subject sees them.
export function calcSectionsFor(subjectId) {
  return SECTIONS.map(section => ({
    ...section,
    formulas: section.formulas.filter(f => !f.onlyIn || f.onlyIn === subjectId),
  }));
}

export const CALC_SHEET = {
  given: false,
  label: 'No formula sheet: memorize all of these',
};
