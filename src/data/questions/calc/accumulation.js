// AP Calculus AB and BC, Unit 6 (first half): Riemann sums, definite integrals and the Fundamental Theorem of Calculus.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { integrate, derivative, partialSum } from '../calcMath.js'
import { areaUnder } from '../figureMath.js'

const RATE_GRAPH = { type: 'graph', xLabel: 't', yLabel: 'f(t)', xMax: 6, xStep: 1, yMin: -3, yMax: 3, yStep: 1,
  series: [{ points: [[0, 2], [2, 2], [4, -2], [6, -2]] }],
  alt: 'Graph of f for 0 ≤ t ≤ 6. It stays at 2 from t = 0 to t = 2, falls in a straight line to −2 at t = 4, crossing zero at t = 3, then stays at −2 until t = 6.' };

const INITIAL_WATER_LITERS = 30;
const inflowRate = t => 20 * Math.exp(-0.1 * t);

// Question 006's table: time in hours, rate in liters per hour. Uneven widths
// on purpose, as on the exam.
const RATE_TABLE = [[0, 10], [2, 14], [5, 11], [9, 7]];
const trapezoidSum = rows => rows.slice(1).reduce((sum, [t, r], i) => sum + ((rows[i][1] + r) / 2) * (t - rows[i][0]), 0);

const INITIAL_F = 5;
const fPrime = x => Math.sqrt(x ** 3 + 1);

export default [
  {
    id: 'calc-accumulation-001',
    topic: 'accumulation',
    formulas: ['ftc-1', 'basic-antiderivatives'],
    difficulty: 1,
    prompt: 'What is the value of ∫₀² (3x² + 1) dx?',
    choices: ['8', '10', '12', '14'],
    answer: 1,
    explanation: 'An antiderivative is x³ + x, so the integral is (8 + 2) − 0 = 10. 8 forgets the +1 term\'s contribution of 2.',
    verify: 'exact',
    solve: () => integrate(x => 3 * x * x + 1, 0, 2),
    reviewed: true,
  },
  {
    id: 'calc-accumulation-002',
    topic: 'accumulation',
    formulas: ['riemann-sums'],
    difficulty: 1,
    prompt: 'What is the left Riemann sum for f(x) = x² on [0, 3] using three subintervals of equal width?',
    choices: ['9', '14', '5', '14/3'],
    answer: 2,
    explanation: 'The subintervals have width 1 and left endpoints 0, 1 and 2, so the sum is 1·(0 + 1 + 4) = 5. The right sum is 1 + 4 + 9 = 14, and 9 is the exact integral. For an increasing function the left sum underestimates.',
    verify: 'exact',
    solve: () => partialSum(k => k * k * 1, 0, 2),
    reviewed: true,
  },
  {
    id: 'calc-accumulation-003',
    topic: 'accumulation',
    formulas: ['ftc-2'],
    difficulty: 3,
    prompt: 'If F(x) = ∫₁^(x²) √(1 + t) dt, what is F\'(2)?',
    choices: ['√5', '2√5', '4√5', '√3'],
    answer: 2,
    explanation: 'By the Fundamental Theorem with the chain rule, F\'(x) = √(1 + x²) · 2x. At x = 2 that is √5 · 4 = 4√5. √5 forgets to multiply by the derivative of the upper limit, x².',
    verify: 'exact',
    solve: () => derivative(x => integrate(t => Math.sqrt(1 + t), 1, x * x), 2),
    reviewed: true,
  },
  {
    id: 'calc-accumulation-004',
    topic: 'accumulation',
    formulas: ['accumulation', 'integral-properties'],
    difficulty: 2,
    prompt: 'The graph of f is shown. If g(x) = ∫₀ˣ f(t) dt, what is g(4)?',
    figure: RATE_GRAPH,
    choices: ['8', '0', '6', '4'],
    answer: 3,
    explanation: 'g(4) is the signed area under f from 0 to 4: the rectangle from 0 to 2 has area 4, and from 2 to 4 the triangles above and below the axis cancel. So g(4) = 4. 6 counts the area below the axis as positive.',
    verify: 'exact',
    solve: () => areaUnder(RATE_GRAPH.series[0].points, 0, 4),
    reviewed: true,
  },
  {
    id: 'calc-accumulation-005',
    topic: 'accumulation',
    formulas: ['accumulation'],
    difficulty: 2,
    prompt: 'A tank holds 30 L of water at t = 0. Water flows in at R(t) = 20e^(−0.1t) liters per minute. How much water is in the tank at t = 8 minutes?',
    calculator: true,
    choices: ['140.1 L', '110.1 L', '190.0 L', '39.0 L'],
    answer: 0,
    explanation: 'The amount is the starting amount plus the accumulated inflow: 30 + ∫₀⁸ 20e^(−0.1t) dt ≈ 30 + 110.1 = 140.1 L. 110.1 L leaves out the starting 30 L, and 190.0 L treats the rate as a constant 20 L/min.',
    verify: 'numeric',
    solve: () => INITIAL_WATER_LITERS + integrate(inflowRate, 0, 8),
    reviewed: true,
  },
  {
    id: 'calc-accumulation-006',
    topic: 'accumulation',
    formulas: ['riemann-sums'],
    difficulty: 2,
    prompt: 'Water flows into a tank at a rate of R(t) liters per hour, where R is a differentiable function of t in hours. Selected values are given in the table. Using a trapezoidal sum with the three subintervals shown in the table, what is the approximation of ∫₀⁹ R(t) dt?',
    figure: { type: 'table', columns: ['t (hours)', 'R(t) (liters per hour)'], rows: RATE_TABLE,
      alt: 'Table of R(t): R(0) = 10, R(2) = 14, R(5) = 11 and R(9) = 7 liters per hour.' },
    choices: ['106', '97.5', '89', '42'],
    answer: 1,
    explanation: 'Each trapezoid uses its own width: 2(10 + 14)/2 + 3(14 + 11)/2 + 4(11 + 7)/2 = 24 + 37.5 + 36 = 97.5 liters. 106 is the left Riemann sum and 89 the right Riemann sum. 42 adds the rates without multiplying by the widths.',
    verify: 'exact',
    solve: () => trapezoidSum(RATE_TABLE),
    reviewed: true,
  },
  {
    id: 'calc-accumulation-007',
    topic: 'accumulation',
    formulas: ['ftc-2'],
    difficulty: 2,
    prompt: 'The graph of f is shown. If g(x) = ∫₀ˣ f(t) dt for 0 ≤ x ≤ 6, at what value of x does g reach its absolute maximum?',
    figure: RATE_GRAPH,
    choices: ['x = 3', 'x = 2', 'x = 6', 'x = 4'],
    answer: 0,
    explanation: 'g\'(x) = f(x), so g increases while f > 0 and decreases while f < 0. f changes from positive to negative at x = 3, so g rises until x = 3 and falls after. g(3) = 5 while g(0) = 0 and g(6) = 0, so the maximum is at x = 3. x = 2 is where f stops being constant, which does not affect the sign of g\'.',
    reviewed: true,
  },
  {
    id: 'calc-accumulation-008',
    topic: 'accumulation',
    formulas: ['accumulation'],
    calculator: true,
    difficulty: 3,
    prompt: 'A function f has f(1) = 5 and f\'(x) = √(x³ + 1). What is the value of f(3)?',
    choices: ['6.230', '−1.230', '10.292', '11.230'],
    answer: 3,
    explanation: 'By the Fundamental Theorem, f(3) = f(1) + ∫₁³ √(x³ + 1) dx = 5 + 6.230 = 11.230 (integral by calculator). 6.230 is only the change in f and forgets f(1). 10.292 adds f\'(3) instead of the integral.',
    verify: 'numeric',
    solve: () => INITIAL_F + integrate(fPrime, 1, 3),
    reviewed: true,
  },
];
