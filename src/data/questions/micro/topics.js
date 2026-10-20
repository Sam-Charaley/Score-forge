// AP Microeconomics: six units, weights from College Board's course page
// (multiple-choice section). Units are split into practice topics, more in
// the heavier units. Topic ids are permanent: attempts are stored against
// them, so rename the label freely but never change an id.
export const MICRO_UNITS = [
  { id: 'u1', name: 'Basic Economic Concepts', weight: '12–15%' },
  { id: 'u2', name: 'Supply and Demand', weight: '20–25%' },
  { id: 'u3', name: 'Production, Cost, and the Perfect Competition Model', weight: '22–25%' },
  { id: 'u4', name: 'Imperfect Competition', weight: '15–22%' },
  { id: 'u5', name: 'Factor Markets', weight: '10–13%' },
  { id: 'u6', name: 'Market Failure and the Role of Government', weight: '8–13%' },
];

export const MICRO_TOPICS = [
  { id: 'scarcity-ppc', unit: 'u1', name: 'Scarcity, PPC & Comparative Advantage' },
  { id: 'consumer-choice', unit: 'u1', name: 'Marginal Analysis & Consumer Choice' },
  { id: 'supply-demand', unit: 'u2', name: 'Supply, Demand & Equilibrium' },
  { id: 'elasticity', unit: 'u2', name: 'Elasticity' },
  { id: 'surplus-government', unit: 'u2', name: 'Surplus, Taxes, Price Controls & Trade' },
  { id: 'production-costs', unit: 'u3', name: 'Production, Costs & Types of Profit' },
  { id: 'perfect-competition', unit: 'u3', name: 'Perfect Competition: Profit, Loss & Shutdown' },
  { id: 'competitive-long-run', unit: 'u3', name: 'Long-Run Competitive Equilibrium & Efficiency' },
  { id: 'monopoly', unit: 'u4', name: 'Monopoly & Price Discrimination' },
  { id: 'monopolistic-competition', unit: 'u4', name: 'Monopolistic Competition' },
  { id: 'oligopoly', unit: 'u4', name: 'Oligopoly & Game Theory' },
  { id: 'factor-markets', unit: 'u5', name: 'Factor Markets & Hiring Decisions' },
  { id: 'externalities', unit: 'u6', name: 'Externalities & Corrective Policy' },
  { id: 'public-goods', unit: 'u6', name: 'Public Goods, Government & Income Distribution' },
];

// How the predicted AP score is built (see predictApScore in utils/priority.js).
// Section weights: 60 multiple-choice questions are two thirds of the score,
// 3 free response (one long, two short) one third (College Board course page).
// Cut points are shares of the maximum composite score. College Board does
// not publish them. DRAFT: approximated from scoring worksheets for older
// released exams, which may not match recent cuts.
export const MICRO_EXAM = {
  sections: { mcq: 2 / 3, frq: 1 / 3 },
  cuts: [
    { score: 5, minShare: 0.76 },
    { score: 4, minShare: 0.63 },
    { score: 3, minShare: 0.51 },
    { score: 2, minShare: 0.41 },
    { score: 1, minShare: 0 },
  ],
  source: 'DRAFT estimate, needs Sam review: released AP Microeconomics scoring worksheets (older exams).',
};

export default { units: MICRO_UNITS, topics: MICRO_TOPICS, exam: MICRO_EXAM };
