// AP Physics 1 as revised for 2024-25: eight units, weights from College
// Board's course page (multiple-choice section). Units are split into
// practice topics. Topic ids are permanent: attempts are stored against
// them, so rename the label freely but never change an id.
export const PHYS1_UNITS = [
  { id: 'u1', name: 'Kinematics', weight: '10–15%' },
  { id: 'u2', name: 'Force and Translational Dynamics', weight: '18–23%' },
  { id: 'u3', name: 'Work, Energy, and Power', weight: '18–23%' },
  { id: 'u4', name: 'Linear Momentum', weight: '10–15%' },
  { id: 'u5', name: 'Torque and Rotational Dynamics', weight: '10–15%' },
  { id: 'u6', name: 'Energy and Momentum of Rotating Systems', weight: '5–8%' },
  { id: 'u7', name: 'Oscillations', weight: '5–8%' },
  { id: 'u8', name: 'Fluids', weight: '10–15%' },
];

export const PHYS1_TOPICS = [
  { id: 'motion-1d', unit: 'u1', name: 'Motion in One Dimension & Graphs' },
  { id: 'projectiles', unit: 'u1', name: 'Projectiles & Reference Frames' },
  { id: 'newtons-laws', unit: 'u2', name: "Newton's Laws, Friction & Springs" },
  { id: 'circular-gravity', unit: 'u2', name: 'Circular Motion & Gravitation' },
  { id: 'work-power', unit: 'u3', name: 'Work, Kinetic Energy & Power' },
  { id: 'energy-conservation', unit: 'u3', name: 'Potential Energy & Conservation' },
  { id: 'impulse', unit: 'u4', name: 'Momentum & Impulse' },
  { id: 'collisions', unit: 'u4', name: 'Collisions & Conservation of Momentum' },
  { id: 'torque', unit: 'u5', name: 'Rotational Kinematics, Torque & Equilibrium' },
  { id: 'rotational-dynamics', unit: 'u5', name: 'Rotational Inertia & Dynamics' },
  { id: 'rotating-systems', unit: 'u6', name: 'Rolling, Rotational Energy & Angular Momentum' },
  { id: 'oscillations', unit: 'u7', name: 'Simple Harmonic Motion' },
  { id: 'fluid-statics', unit: 'u8', name: 'Pressure & Buoyancy' },
  { id: 'fluid-dynamics', unit: 'u8', name: 'Fluid Flow & Bernoulli' },
];

// The value on the AP Physics 1 reference sheet. Question solve() functions
// use it so a recomputed key matches what a student gets with the sheet.
export const G = 9.8;

// How the predicted AP score is built (see predictApScore in utils/priority.js).
// Section weights: 40 multiple-choice questions and 4 free response, 50% each
// (College Board course page, 2025 exam).
// Cut points are shares of the maximum composite score. College Board does
// not publish them. DRAFT: approximated from scoring worksheets for released
// exams of the previous course, which may not match the revised exam.
export const PHYS1_EXAM = {
  sections: { mcq: 0.5, frq: 0.5 },
  cuts: [
    { score: 5, minShare: 0.7 },
    { score: 4, minShare: 0.55 },
    { score: 3, minShare: 0.4 },
    { score: 2, minShare: 0.27 },
    { score: 1, minShare: 0 },
  ],
  source: 'DRAFT estimate, needs Sam review: released AP Physics 1 scoring worksheets (pre-2025 course).',
};

export default { units: PHYS1_UNITS, topics: PHYS1_TOPICS, exam: PHYS1_EXAM };
