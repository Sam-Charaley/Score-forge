// AP Calculus BC, Unit 9 (second half): polar coordinates, slopes and areas.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { derivative, integrate } from '../calcMath.js'

// Area swept by r(θ) between two angles: (1/2)∫ r² dθ.
const polarArea = (r, from, to) => integrate(theta => 0.5 * r(theta) ** 2, from, to);

export default [
  {
    id: 'calcbc-polar-001',
    topic: 'polar',
    difficulty: 1,
    prompt: 'What are the rectangular coordinates of the polar point (r, θ) = (2, 2π/3)?',
    choices: ['(1, −√3)', '(−√3, 1)', '(−1, √3)', '(√3, −1)'],
    answer: 2,
    explanation: 'x = r cos θ = 2 cos(2π/3) = 2(−1/2) = −1, and y = r sin θ = 2 sin(2π/3) = 2(√3/2) = √3. (−√3, 1) swaps sine and cosine.',
    reviewed: false,
  },
  {
    id: 'calcbc-polar-002',
    topic: 'polar',
    difficulty: 2,
    prompt: 'What is the area enclosed by the circle r = 2 cos θ?',
    choices: ['2π', 'π', '4π', 'π/2'],
    answer: 1,
    explanation: 'The circle is traced once as θ goes from 0 to π, so the area is (1/2)∫₀^π 4cos²θ dθ = π. 2π traces it twice by integrating over 0 to 2π. Check: it is a circle of radius 1.',
    verify: 'exact',
    solve: () => polarArea(theta => 2 * Math.cos(theta), 0, Math.PI),
    reviewed: false,
  },
  {
    id: 'calcbc-polar-003',
    topic: 'polar',
    difficulty: 3,
    prompt: 'What is the area of one petal of the rose r = cos 2θ?',
    choices: ['π/4', 'π/2', 'π/16', 'π/8'],
    answer: 3,
    explanation: 'One petal is traced as θ goes from −π/4 to π/4, where cos 2θ ≥ 0. Its area is (1/2)∫ cos²(2θ) dθ over that interval = π/8. π/4 forgets the factor of 1/2 in the polar area formula.',
    verify: 'exact',
    solve: () => polarArea(theta => Math.cos(2 * theta), -Math.PI / 4, Math.PI / 4),
    reviewed: false,
  },
  {
    id: 'calcbc-polar-004',
    topic: 'polar',
    difficulty: 3,
    prompt: 'For the polar curve r = θ, what is dy/dx at θ = π/2?',
    choices: ['2/π', '−π/2', '0', '−2/π'],
    answer: 3,
    explanation: 'With x = θ cos θ and y = θ sin θ: dy/dθ = sin θ + θ cos θ = 1 and dx/dθ = cos θ − θ sin θ = −π/2 at θ = π/2. So dy/dx = 1/(−π/2) = −2/π. dr/dθ = 1 is not the slope.',
    verify: 'exact',
    solve: () => derivative(theta => theta * Math.sin(theta), Math.PI / 2) / derivative(theta => theta * Math.cos(theta), Math.PI / 2),
    reviewed: false,
  },
  {
    id: 'calcbc-polar-005',
    topic: 'polar',
    difficulty: 2,
    prompt: 'For the polar curve r = 1 − 2 sin θ, which rectangular point is plotted at θ = π/2?',
    choices: ['(0, 1)', '(0, −1)', '(−1, 0)', '(1, 0)'],
    answer: 1,
    explanation: 'At θ = π/2, r = 1 − 2 = −1. A negative r is plotted in the opposite direction from the angle, so the point is 1 unit along θ = 3π/2: (0, −1). (0, 1) ignores the negative sign.',
    reviewed: false,
  },
];
