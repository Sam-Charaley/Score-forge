// AP Calculus AB: eight units, weights from College Board's course page.
// AB has no questions of its own: it practices the shared Units 1-8 bank in
// ../calc/, leaving out questions marked onlyIn: 'calcbc'. Topic ids are
// permanent: attempts are stored against them.
export const CALCAB_UNITS = [
  { id: 'u1', name: 'Limits and Continuity', weight: '10–15%' },
  { id: 'u2', name: 'Differentiation: Definition and Fundamental Properties', weight: '10–15%' },
  { id: 'u3', name: 'Differentiation: Composite, Implicit, and Inverse Functions', weight: '5–10%' },
  { id: 'u4', name: 'Contextual Applications of Differentiation', weight: '10–15%' },
  { id: 'u5', name: 'Analytical Applications of Differentiation', weight: '15–20%' },
  { id: 'u6', name: 'Integration and Accumulation of Change', weight: '15–20%' },
  { id: 'u7', name: 'Differential Equations', weight: '5–10%' },
  { id: 'u8', name: 'Applications of Integration', weight: '10–15%' },
];

// Units 1-8 topics, shared by AB and BC (see ../calcbc/topics.js).
export const CALC_SHARED_TOPICS = [
  { id: 'limits', unit: 'u1', name: 'Limits & Continuity' },
  { id: 'derivative-rules', unit: 'u2', name: 'Definition of the Derivative & Basic Rules' },
  { id: 'chain-implicit', unit: 'u3', name: 'Chain Rule, Implicit & Inverse Functions' },
  { id: 'contextual-derivatives', unit: 'u4', name: 'Rates, Motion, Related Rates & L\'Hôpital' },
  { id: 'mvt-extrema', unit: 'u5', name: 'Mean Value Theorem & Extrema' },
  { id: 'curve-sketching', unit: 'u5', name: 'Increasing, Concavity & Optimization' },
  { id: 'accumulation', unit: 'u6', name: 'Riemann Sums, FTC & Accumulation' },
  { id: 'integration-techniques', unit: 'u6', name: 'Antiderivatives & Integration Techniques' },
  { id: 'differential-equations', unit: 'u7', name: 'Differential Equations' },
  { id: 'area-volume', unit: 'u8', name: 'Area, Volume & Arc Length' },
  { id: 'average-value-motion', unit: 'u8', name: 'Average Value & Motion with Integrals' },
];

export default { units: CALCAB_UNITS, topics: CALC_SHARED_TOPICS };
