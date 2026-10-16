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

export default [
  {
    id: 'calc-accumulation-001',
    topic: 'accumulation',
    difficulty: 1,
    prompt: 'What is the value of ∫₀² (3x² + 1) dx?',
    choices: ['8', '10', '12', '14'],
    answer: 1,
    explanation: 'An antiderivative is x³ + x, so the integral is (8 + 2) − 0 = 10. 8 forgets the +1 term\'s contribution of 2.',
    verify: 'exact',
    solve: () => integrate(x => 3 * x * x + 1, 0, 2),
    reviewed: false,
  },
  {
    id: 'calc-accumulation-002',
    topic: 'accumulation',
    difficulty: 1,
    prompt: 'What is the left Riemann sum for f(x) = x² on [0, 3] using three subintervals of equal width?',
    choices: ['9', '14', '5', '14/3'],
    answer: 2,
    explanation: 'The subintervals have width 1 and left endpoints 0, 1 and 2, so the sum is 1·(0 + 1 + 4) = 5. The right sum is 1 + 4 + 9 = 14, and 9 is the exact integral. For an increasing function the left sum underestimates.',
    verify: 'exact',
    solve: () => partialSum(k => k * k * 1, 0, 2),
    reviewed: false,
  },
  {
    id: 'calc-accumulation-003',
    topic: 'accumulation',
    difficulty: 3,
    prompt: 'If F(x) = ∫₁^(x²) √(1 + t) dt, what is F\'(2)?',
    choices: ['√5', '2√5', '4√5', '√3'],
    answer: 2,
    explanation: 'By the Fundamental Theorem with the chain rule, F\'(x) = √(1 + x²) · 2x. At x = 2 that is √5 · 4 = 4√5. √5 forgets to multiply by the derivative of the upper limit, x².',
    verify: 'exact',
    solve: () => derivative(x => integrate(t => Math.sqrt(1 + t), 1, x * x), 2),
    reviewed: false,
  },
  {
    id: 'calc-accumulation-004',
    topic: 'accumulation',
    difficulty: 2,
    prompt: 'The graph of f is shown. If g(x) = ∫₀ˣ f(t) dt, what is g(4)?',
    figure: RATE_GRAPH,
    choices: ['8', '0', '6', '4'],
    answer: 3,
    explanation: 'g(4) is the signed area under f from 0 to 4: the rectangle from 0 to 2 has area 4, and from 2 to 4 the triangles above and below the axis cancel. So g(4) = 4. 6 counts the area below the axis as positive.',
    verify: 'exact',
    solve: () => areaUnder(RATE_GRAPH.series[0].points, 0, 4),
    reviewed: false,
  },
  {
    id: 'calc-accumulation-005',
    topic: 'accumulation',
    difficulty: 2,
    prompt: 'A tank holds 30 L of water at t = 0. Water flows in at R(t) = 20e^(−0.1t) liters per minute. How much water is in the tank at t = 8 minutes?',
    calculator: true,
    choices: ['140.1 L', '110.1 L', '190.0 L', '39.0 L'],
    answer: 0,
    explanation: 'The amount is the starting amount plus the accumulated inflow: 30 + ∫₀⁸ 20e^(−0.1t) dt ≈ 30 + 110.1 = 140.1 L. 110.1 L leaves out the starting 30 L, and 190.0 L treats the rate as a constant 20 L/min.',
    verify: 'numeric',
    solve: () => INITIAL_WATER_LITERS + integrate(inflowRate, 0, 8),
    reviewed: false,
  },
];
