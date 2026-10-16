// AP Calculus BC: ten units, weights from College Board's course page
// (multiple-choice section). Units 1-8 match Calculus AB, and their topic ids
// are shared with ../calcab/topics.js because the questions are (they live
// in ../calc/). Topic ids are permanent: attempts are stored against them.
import { CALC_SHARED_TOPICS } from '../calcab/topics.js'

export const CALCBC_UNITS = [
  { id: 'u1', name: 'Limits and Continuity', weight: '5–10%' },
  { id: 'u2', name: 'Differentiation: Definition and Fundamental Properties', weight: '5–10%' },
  { id: 'u3', name: 'Differentiation: Composite, Implicit, and Inverse Functions', weight: '5–10%' },
  { id: 'u4', name: 'Contextual Applications of Differentiation', weight: '5–10%' },
  { id: 'u5', name: 'Analytical Applications of Differentiation', weight: '10–15%' },
  { id: 'u6', name: 'Integration and Accumulation of Change', weight: '15–20%' },
  { id: 'u7', name: 'Differential Equations', weight: '5–10%' },
  { id: 'u8', name: 'Applications of Integration', weight: '5–10%' },
  { id: 'u9', name: 'Parametric Equations, Polar Coordinates, and Vector-Valued Functions', weight: '10–15%' },
  { id: 'u10', name: 'Infinite Sequences and Series', weight: '15–20%' },
];

export const CALCBC_TOPICS = [
  ...CALC_SHARED_TOPICS,
  { id: 'parametric-vector', unit: 'u9', name: 'Parametric & Vector-Valued Functions' },
  { id: 'polar', unit: 'u9', name: 'Polar Curves' },
  { id: 'series-convergence', unit: 'u10', name: 'Series & Convergence Tests' },
  { id: 'power-series', unit: 'u10', name: 'Power Series & Interval of Convergence' },
  { id: 'taylor', unit: 'u10', name: 'Taylor Polynomials & Error' },
];

export default { units: CALCBC_UNITS, topics: CALCBC_TOPICS };
