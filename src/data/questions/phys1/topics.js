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

export default { units: PHYS1_UNITS, topics: PHYS1_TOPICS };
