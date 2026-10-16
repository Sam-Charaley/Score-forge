// AP Calculus AB and BC, Unit 4: motion, related rates, linear approximation and L'Hôpital's rule.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { derivative, limit } from '../calcMath.js'

export default [
  {
    id: 'calc-contextual-derivatives-001',
    topic: 'contextual-derivatives',
    difficulty: 1,
    prompt: 'A particle moves along a line with position s(t) = t³ − 6t² + 9t. What is its velocity at t = 2?',
    choices: ['2', '−3', '3', '0'],
    answer: 1,
    explanation: 'Velocity is the derivative of position: v(t) = 3t² − 12t + 9, so v(2) = 12 − 24 + 9 = −3. The particle is moving in the negative direction then. 2 is the position s(2).',
    verify: 'exact',
    solve: () => derivative(t => t ** 3 - 6 * t * t + 9 * t, 2),
    reviewed: false,
  },
  {
    id: 'calc-contextual-derivatives-002',
    topic: 'contextual-derivatives',
    difficulty: 2,
    prompt: 'A particle moves along a line with position s(t) = t³ − 6t² + 9t for t ≥ 0. At what times is it at rest?',
    choices: ['t = 0 and t = 3', 't = 2 only', 't = 1 and t = 3', 't = 0, t = 1 and t = 3'],
    answer: 2,
    explanation: 'At rest means the velocity is zero: v(t) = 3t² − 12t + 9 = 3(t − 1)(t − 3), so t = 1 and t = 3. t = 0 and t = 3 are where the position is zero, which is a different question.',
    reviewed: false,
  },
  {
    id: 'calc-contextual-derivatives-003',
    topic: 'contextual-derivatives',
    difficulty: 2,
    prompt: 'The radius of a circle increases at 2 cm/s. How fast is the area increasing, in cm²/s, when the radius is 5 cm?',
    choices: ['10π', '20π', '4π', '25π'],
    answer: 1,
    explanation: 'A = πr², so dA/dt = 2πr · dr/dt = 2π(5)(2) = 20π cm²/s. 25π is the area itself, and 10π forgets to multiply by dr/dt.',
    verify: 'exact',
    // Radius 5 + 2t passes 5 at t = 0; differentiate the area in time there.
    solve: () => derivative(t => Math.PI * (5 + 2 * t) ** 2, 0),
    reviewed: false,
  },
  {
    id: 'calc-contextual-derivatives-004',
    topic: 'contextual-derivatives',
    difficulty: 2,
    prompt: 'Using the tangent line to f(x) = √x at x = 4, what is the approximation of √4.1?',
    choices: ['2.05', '2.025', '2.0025', '2.1'],
    answer: 1,
    explanation: 'The tangent line at x = 4 is L(x) = f(4) + f\'(4)(x − 4) = 2 + (1/4)(x − 4), because f\'(x) = 1/(2√x). So L(4.1) = 2 + 0.025 = 2.025. 2.05 uses a slope of 1/2.',
    verify: 'exact',
    solve: () => Math.sqrt(4) + derivative(Math.sqrt, 4) * 0.1,
    reviewed: false,
  },
  {
    id: 'calc-contextual-derivatives-005',
    topic: 'contextual-derivatives',
    difficulty: 3,
    prompt: 'What is lim (x → 0) of (eˣ − 1 − x)/x²?',
    choices: ['1', '1/2', '0', 'The limit does not exist'],
    answer: 1,
    explanation: 'The form is 0/0, so apply L\'Hôpital\'s rule: (eˣ − 1)/(2x) is still 0/0, and once more gives eˣ/2, which approaches 1/2. Stopping after one application at 0/0 is a common slip.',
    verify: 'exact',
    solve: () => limit(x => (Math.exp(x) - 1 - x) / (x * x), 0),
    reviewed: false,
  },
  {
    id: 'calc-contextual-derivatives-006',
    topic: 'contextual-derivatives',
    difficulty: 3,
    prompt: 'A 10 ft ladder leans against a wall. Its base slides away from the wall at 2 ft/s. How fast is the top moving, in ft/s, when the base is 6 ft from the wall? (Negative means downward.)',
    choices: ['−2/3', '−3/2', '−8/3', '−6'],
    answer: 1,
    explanation: 'x² + y² = 100, so 2x(dx/dt) + 2y(dy/dt) = 0. When x = 6, y = 8, so dy/dt = −x(dx/dt)/y = −6(2)/8 = −3/2 ft/s. −8/3 swaps x and y.',
    verify: 'exact',
    // Base at 6 + 2t; the top's height is √(100 − x²).
    solve: () => derivative(t => Math.sqrt(100 - (6 + 2 * t) ** 2), 0),
    reviewed: false,
  },
];
