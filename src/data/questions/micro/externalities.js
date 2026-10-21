// AP Microeconomics, Unit 6: negative and positive externalities, deadweight
// loss from them, and Pigouvian taxes, subsidies and tradable permits.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// Demand (MPB = MSB) P = 12 − 0.1Q, MPC P = 2 + 0.1Q, and a constant marginal
// external cost of $2, so MSC = MPC + 2.
const MEC = 2;
const benefit = q => 12 - 0.1 * q;
const privateCost = q => 2 + 0.1 * q;
const socialCost = q => privateCost(q) + MEC;
// Where 12 − 0.1Q meets c + 0.1Q.
const crossing = intercept => (12 - intercept) / 0.2;
const MARKET_Q = crossing(2);
const OPTIMAL_Q = crossing(2 + MEC);
const POLLUTION_GRAPH = {
  type: 'graph', xLabel: 'Quantity (tons)', yLabel: 'Price and cost ($)', xMax: 120, xStep: 20, yMin: 0, yMax: 14, yStep: 2,
  series: [
    { points: [[0, benefit(0)], [120, benefit(120)]], label: 'D = MSB' },
    { points: [[0, privateCost(0)], [120, privateCost(120)]], label: 'MPC' },
    { points: [[0, socialCost(0)], [100, socialCost(100)]], label: 'MSC' },
  ],
  alt: 'Market for a good whose production pollutes. Demand, also the marginal social benefit, falls from $12 at 0 tons to $0 at 120 tons. Marginal private cost MPC rises from $2 at 0 tons to $14 at 120 tons. Marginal social cost MSC lies $2 above MPC, rising from $4 at 0 tons to $14 at 100 tons. Demand meets MPC at 50 tons and $7, and meets MSC at 40 tons and $8.',
};

export default [
  {
    id: 'micro-externalities-001',
    topic: 'externalities',
    difficulty: 1,
    prompt: 'A factory\'s smoke damages the health of people living nearby, and the factory does not pay for this damage. This is an example of',
    choices: ['a public good', 'a negative externality', 'a positive externality', 'a price floor'],
    answer: 1,
    explanation: 'An externality is a cost or benefit that falls on people outside the transaction. Here a cost falls on neighbors who neither buy nor sell the factory\'s product, so it is a negative externality, and the factory\'s private cost understates the true social cost.',
    reviewed: true,
  },
  {
    id: 'micro-externalities-002',
    topic: 'externalities',
    formulas: ['social-benefit-cost'],
    difficulty: 2,
    prompt: 'The graph shows a market in which production causes pollution. What is the socially optimal quantity?',
    figure: POLLUTION_GRAPH,
    choices: ['50 tons', '40 tons', '100 tons', '60 tons'],
    answer: 1,
    explanation: 'The socially optimal quantity is where marginal social benefit equals marginal social cost: demand meets MSC at 40 tons. The unregulated market produces 50 tons, where demand meets the firms\' private cost and ignores the $2 external cost per ton.',
    verify: 'numeric',
    solve: () => OPTIMAL_Q,
    reviewed: true,
  },
  {
    id: 'micro-externalities-003',
    topic: 'externalities',
    formulas: ['deadweight-loss', 'social-benefit-cost'],
    difficulty: 3,
    prompt: 'Using the graph, what is the deadweight loss when the market is left unregulated, in dollars?',
    figure: POLLUTION_GRAPH,
    choices: ['20', '100', '10', '5'],
    answer: 2,
    explanation: 'The market produces 50 tons, but the last 10 tons cost society more (MSC) than they are worth (MSB). The deadweight loss is the triangle between 40 and 50 tons, from demand up to MSC: ½ × 10 × $2 = $10. $20 forgets the ½, and $100 is the total external cost of all 50 tons.',
    verify: 'numeric',
    solve: () => 0.5 * (MARKET_Q - OPTIMAL_Q) * (socialCost(MARKET_Q) - benefit(MARKET_Q)),
    reviewed: true,
  },
  {
    id: 'micro-externalities-004',
    topic: 'externalities',
    formulas: ['social-benefit-cost'],
    difficulty: 2,
    prompt: 'Using the graph, what per-unit tax on producers would lead the market to produce the socially optimal quantity, in dollars?',
    figure: POLLUTION_GRAPH,
    choices: ['8', '1', '4', '2'],
    answer: 3,
    explanation: 'A Pigouvian tax equal to the marginal external cost, $2 per ton, raises the firms\' private cost to match MSC, so the market settles at 40 tons. $8 is the price buyers pay at the optimum, not the tax, and $1 would only close half the gap.',
    verify: 'numeric',
    solve: () => socialCost(OPTIMAL_Q) - privateCost(OPTIMAL_Q),
    reviewed: true,
  },
  {
    id: 'micro-externalities-005',
    topic: 'externalities',
    formulas: ['social-benefit-cost'],
    difficulty: 2,
    prompt: 'Flu vaccinations protect not only the people who get them but also the people around them. Without government action, the market for flu vaccinations will',
    choices: [
      'produce less than the socially optimal quantity, because marginal social benefit exceeds marginal private benefit',
      'produce more than the socially optimal quantity, because marginal social cost exceeds marginal private cost',
      'produce the socially optimal quantity, because buyers pay for the vaccine',
      'produce less than the optimum, because the marginal private benefit exceeds the marginal social benefit',
    ],
    answer: 0,
    explanation: 'Vaccinations create a positive externality: society\'s benefit (MSB) includes the protection to others, which buyers ignore. Demand reflects only the private benefit, so the market stops short of the quantity where MSB = MSC. A per-unit subsidy equal to the external benefit can fix this.',
    reviewed: true,
  },
  {
    id: 'micro-externalities-006',
    topic: 'externalities',
    formulas: ['social-benefit-cost'],
    difficulty: 3,
    prompt: 'In the market for tutoring, marginal private benefit is P = 20 − Q, marginal cost (private and social) is P = 2 + Q, and each hour of tutoring gives a marginal external benefit of $4 to the community. How many more hours is the socially optimal quantity than the market quantity?',
    choices: ['4 hours', '9 hours', '2 hours', '11 hours'],
    answer: 2,
    explanation: 'The market sets MPB = MC: 20 − Q = 2 + Q, so Q = 9. Society sets MSB = MC, where MSB = 24 − Q: 24 − Q = 2 + Q, so Q = 11. The gap is 2 hours. 4 is the external benefit per hour in dollars, not a quantity, and 9 and 11 are the two quantities themselves.',
    verify: 'numeric',
    solve: () => (24 - 2) / 2 - (20 - 2) / 2,
    reviewed: true,
  },
  {
    id: 'micro-externalities-007',
    topic: 'externalities',
    difficulty: 2,
    prompt: 'The government caps total pollution and issues permits that firms can buy and sell. Compared with ordering every firm to cut pollution by the same amount, tradable permits',
    choices: [
      'increase total pollution',
      'reach the same total cut at a lower total cost, because firms that can cut pollution cheaply do more of it',
      'make every firm cut pollution by the same amount',
      'eliminate all pollution',
    ],
    answer: 1,
    explanation: 'Firms that can reduce pollution cheaply cut more and sell their spare permits; firms with high costs buy permits instead. The cap fixes total pollution, so the cut is the same, but it is done by the firms that can do it most cheaply. Equal cuts for every firm ignore those cost differences.',
    reviewed: true,
  },
  {
    id: 'micro-externalities-008',
    topic: 'externalities',
    difficulty: 1,
    prompt: 'A per-unit tax on a good that causes a negative externality is intended to',
    choices: [
      'raise the quantity produced to the market equilibrium',
      'lower the price buyers pay',
      'eliminate the good from the market',
      'make producers account for the external cost, reducing output toward the socially optimal level',
    ],
    answer: 3,
    explanation: 'A Pigouvian tax makes producers pay for the harm they cause, which shifts the supply curve up toward marginal social cost. Output falls from the market quantity toward the efficient quantity, and the deadweight loss shrinks. The goal is the right amount of the good, not none of it.',
    reviewed: true,
  },
];
