// AP Macroeconomics: six units, weights from College Board's course page
// (multiple-choice section). Units are split into practice topics, with more
// topics in the heavier units. Topic ids are permanent: attempts are stored
// against them, so rename the label freely but never change an id.
export const MACRO_UNITS = [
  { id: 'u1', name: 'Basic Economic Concepts', weight: '5–10%' },
  { id: 'u2', name: 'Economic Indicators and the Business Cycle', weight: '12–17%' },
  { id: 'u3', name: 'National Income and Price Determination', weight: '17–27%' },
  { id: 'u4', name: 'Financial Sector', weight: '18–23%' },
  { id: 'u5', name: 'Long-Run Consequences of Stabilization Policies', weight: '20–30%' },
  { id: 'u6', name: 'Open Economy: International Trade and Finance', weight: '10–13%' },
];

export const MACRO_TOPICS = [
  { id: 'scarcity-ppc', unit: 'u1', name: 'Scarcity, PPC & Comparative Advantage' },
  { id: 'supply-demand', unit: 'u1', name: 'Demand, Supply & Market Equilibrium' },
  { id: 'gdp', unit: 'u2', name: 'GDP & the Circular Flow' },
  { id: 'unemployment', unit: 'u2', name: 'Unemployment & the Business Cycle' },
  { id: 'inflation', unit: 'u2', name: 'Inflation & Price Indices' },
  { id: 'ad-as', unit: 'u3', name: 'Aggregate Demand & Aggregate Supply' },
  { id: 'multipliers', unit: 'u3', name: 'Spending & Tax Multipliers' },
  { id: 'fiscal-policy', unit: 'u3', name: 'Fiscal Policy & Gaps' },
  { id: 'money-banking', unit: 'u4', name: 'Money, Banking & Money Creation' },
  { id: 'monetary-policy', unit: 'u4', name: 'Money Market & Monetary Policy' },
  { id: 'loanable-funds', unit: 'u4', name: 'Loanable Funds & Interest Rates' },
  { id: 'phillips-curve', unit: 'u5', name: 'Phillips Curve & Money Growth' },
  { id: 'deficits-crowding-out', unit: 'u5', name: 'Deficits, Debt & Crowding Out' },
  { id: 'economic-growth', unit: 'u5', name: 'Economic Growth & Supply-Side Policy' },
  { id: 'balance-of-payments', unit: 'u6', name: 'Balance of Payments' },
  { id: 'foreign-exchange', unit: 'u6', name: 'Foreign Exchange & Open-Economy Policy' },
];

// How the predicted AP score is built (see predictApScore in utils/priority.js).
// Section weights: 60 multiple-choice questions are two thirds of the score,
// 3 free response (one long, two short) one third (College Board course page).
// Cut points are shares of the maximum composite score. College Board does
// not publish them. DRAFT: approximated from scoring worksheets for released
// AP Macroeconomics exams.
export const MACRO_EXAM = {
  sections: { mcq: 2 / 3, frq: 1 / 3 },
  cuts: [
    { score: 5, minShare: 0.73 },
    { score: 4, minShare: 0.58 },
    { score: 3, minShare: 0.47 },
    { score: 2, minShare: 0.36 },
    { score: 1, minShare: 0 },
  ],
  source: 'DRAFT estimate, needs Sam review: released AP Macroeconomics scoring worksheets.',
};

export default { units: MACRO_UNITS, topics: MACRO_TOPICS, exam: MACRO_EXAM };
