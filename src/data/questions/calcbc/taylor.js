// AP Calculus BC, Unit 10 (last part): Taylor polynomials, Maclaurin series and error bounds.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { derivative, secondDerivative } from '../calcMath.js'

const naturalLogOnePlus = x => Math.log(1 + x);

export default [
  {
    id: 'calcbc-taylor-001',
    topic: 'taylor',
    difficulty: 1,
    prompt: 'What is the coefficient of x² in the Maclaurin series for cos(3x)?',
    choices: ['−9', '−9/2', '−3/2', '9/2'],
    answer: 1,
    explanation: 'cos u = 1 − u²/2 + …, and with u = 3x the x² term is −(3x)²/2 = −(9/2)x². Equivalently, f\'\'(0)/2! = −9/2. −9 forgets to divide by 2!, and −3/2 forgets to square the 3.',
    verify: 'exact',
    solve: () => secondDerivative(x => Math.cos(3 * x), 0) / 2,
    tolerance: 1e-5,
    reviewed: false,
  },
  {
    id: 'calcbc-taylor-002',
    topic: 'taylor',
    difficulty: 2,
    prompt: 'Using the second-degree Maclaurin polynomial for ln(1 + x), what is the approximation of ln(1.2)?',
    choices: ['0.2', '0.18', '0.22', '0.182'],
    answer: 1,
    explanation: 'ln(1 + x) ≈ x − x²/2, so ln(1.2) ≈ 0.2 − 0.04/2 = 0.18. 0.182 is closer to the true value, but it isn\'t what this polynomial gives, and 0.22 adds the second term instead of subtracting it.',
    verify: 'exact',
    solve: () => {
      const x = 0.2;
      return naturalLogOnePlus(0) + derivative(naturalLogOnePlus, 0) * x + (secondDerivative(naturalLogOnePlus, 0) / 2) * x * x;
    },
    tolerance: 1e-5,
    reviewed: false,
  },
  {
    id: 'calcbc-taylor-003',
    topic: 'taylor',
    difficulty: 3,
    prompt: 'The third-degree Maclaurin polynomial for cos x is 1 − x²/2. Using the Lagrange error bound with |f⁽⁴⁾(x)| ≤ 1, what is the largest the error can be when it approximates cos 1?',
    choices: ['1/6', '1/2', '1/24', '1/120'],
    answer: 2,
    explanation: 'For a degree-3 polynomial the Lagrange bound uses the 4th derivative: |error| ≤ max|f⁽⁴⁾| · |x|⁴/4! = 1 · 1/24. 1/6 uses 3!, the bound you get by treating 1 − x²/2 as only degree 2, which ignores that its x³ term is zero.',
    reviewed: false,
  },
  {
    id: 'calcbc-taylor-004',
    topic: 'taylor',
    difficulty: 2,
    prompt: 'Which are the first three nonzero terms of the Maclaurin series for x e^(−x²)?',
    choices: [
      'x − x³ + x⁵/2',
      'x − x² + x³/2',
      '1 − x² + x⁴/2',
      'x + x³ + x⁵/2',
    ],
    answer: 0,
    explanation: 'Substitute u = −x² into eᵘ = 1 + u + u²/2 + …: e^(−x²) = 1 − x² + x⁴/2 − … Multiplying by x gives x − x³ + x⁵/2 − … The third choice forgets the factor of x, and the last forgets that u is negative.',
    reviewed: false,
  },
  {
    id: 'calcbc-taylor-005',
    topic: 'taylor',
    difficulty: 2,
    prompt: 'A function f has f(1) = 3, f\'(1) = −2 and f\'\'(1) = 4. Using the second-degree Taylor polynomial for f about x = 1, what is the approximation of f(1.1)?',
    choices: ['2.80', '2.84', '2.82', '3.22'],
    answer: 2,
    explanation: 'P₂(x) = 3 − 2(x − 1) + (4/2!)(x − 1)². At x = 1.1: 3 − 0.2 + 2(0.01) = 2.82. 2.84 forgets to divide f\'\'(1) by 2!, and 2.80 stops at the linear term.',
    verify: 'exact',
    solve: () => {
      const [value, slope, secondDer, step] = [3, -2, 4, 0.1];
      return value + slope * step + (secondDer / 2) * step ** 2;
    },
    reviewed: false,
  },
];
