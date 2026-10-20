// AP World History: Modern (c. 1200 to the present): nine units with College
// Board's exam-weight ranges. Topic ids are permanent: attempts are stored
// against them, so rename the label freely but never change an id.
export const WHAP_UNITS = [
  { id: 'u1', name: 'The Global Tapestry', weight: '8–10%' },
  { id: 'u2', name: 'Networks of Exchange', weight: '8–10%' },
  { id: 'u3', name: 'Land-Based Empires', weight: '12–15%' },
  { id: 'u4', name: 'Transoceanic Interconnections', weight: '12–15%' },
  { id: 'u5', name: 'Revolutions', weight: '12–15%' },
  { id: 'u6', name: 'Consequences of Industrialization', weight: '12–15%' },
  { id: 'u7', name: 'Global Conflict', weight: '8–10%' },
  { id: 'u8', name: 'Cold War and Decolonization', weight: '8–10%' },
  { id: 'u9', name: 'Globalization', weight: '8–10%' },
];

export const WHAP_TOPICS = [
  { id: 'east-asia-islam', unit: 'u1', name: 'Song China & Dar al-Islam' },
  { id: 'regional-states', unit: 'u1', name: 'States in South Asia, the Americas, Africa & Europe' },
  { id: 'trade-networks', unit: 'u2', name: 'Silk Roads, Indian Ocean & Trans-Saharan Trade' },
  { id: 'mongols-exchange', unit: 'u2', name: 'The Mongols & Effects of Exchange' },
  { id: 'empire-building', unit: 'u3', name: 'Gunpowder Empires: Expansion & Administration' },
  { id: 'empire-belief', unit: 'u3', name: 'Belief Systems & Legitimacy in Land Empires' },
  { id: 'exploration-exchange', unit: 'u4', name: 'Maritime Exploration & the Columbian Exchange' },
  { id: 'maritime-empires', unit: 'u4', name: 'Maritime Empires, Labor & Resistance' },
  { id: 'revolutions', unit: 'u5', name: 'Enlightenment, Nationalism & Revolutions' },
  { id: 'industrialization', unit: 'u5', name: 'Industrialization & Its Effects' },
  { id: 'imperialism', unit: 'u6', name: 'Imperialism & Responses to It' },
  { id: 'migration-economy', unit: 'u6', name: 'Economic Imperialism & Global Migration' },
  { id: 'world-wars', unit: 'u7', name: 'The World Wars' },
  { id: 'interwar-atrocities', unit: 'u7', name: 'Interwar Crises & Mass Atrocities' },
  { id: 'cold-war', unit: 'u8', name: 'The Cold War' },
  { id: 'decolonization', unit: 'u8', name: 'Decolonization & New States' },
  { id: 'globalization', unit: 'u9', name: 'Globalization: Technology, Economy & Society' },
];

// How the predicted AP score is built (see predictApScore in utils/priority.js).
// Section weights: 55 multiple-choice questions are 40% of the score; the
// written part (3 short answers 20%, the DBQ 25%, the long essay 15%) is 60%
// (College Board course page). The FRQ self-checks stand in for all three.
// Cut points are shares of the maximum composite score. College Board does
// not publish them. DRAFT: approximated from published score distributions
// and older released scoring worksheets, which vary year to year.
export const WHAP_EXAM = {
  sections: { mcq: 0.4, frq: 0.6 },
  cuts: [
    { score: 5, minShare: 0.7 },
    { score: 4, minShare: 0.58 },
    { score: 3, minShare: 0.44 },
    { score: 2, minShare: 0.3 },
    { score: 1, minShare: 0 },
  ],
  source: 'DRAFT estimate, needs Sam review: older released AP World History scoring worksheets and recent score distributions.',
};

export default { units: WHAP_UNITS, topics: WHAP_TOPICS, exam: WHAP_EXAM };
