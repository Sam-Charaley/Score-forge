// AP Microeconomics, Unit 4: monopoly pricing and output, profit and
// deadweight loss, price discrimination and regulating a natural monopoly.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// Demand P = 20 − Q, marginal revenue P = 20 − 2Q, constant MC = ATC = $4.
const demandPrice = q => 20 - q;
const COST = 4;
const MONOPOLY_Q = (20 - COST) / 2;
const MONOPOLY_P = demandPrice(MONOPOLY_Q);
const COMPETITIVE_Q = 20 - COST;
const MONOPOLY_GRAPH = {
  type: 'graph', xLabel: 'Quantity (units)', yLabel: 'Price and cost ($)', xMax: 20, xStep: 2, yMin: 0, yMax: 20, yStep: 2,
  series: [
    { points: [[0, 20], [20, 0]], label: 'D' },
    { points: [[0, 20], [10, 0]], label: 'MR' },
    { points: [[0, COST], [20, COST]], label: 'MC = ATC' },
  ],
  alt: 'Monopoly graph. Demand D falls in a straight line from $20 at 0 units to $0 at 20 units. Marginal revenue MR falls twice as steeply, from $20 at 0 units to $0 at 10 units. MC = ATC is a horizontal line at $4. MR crosses MC at 8 units, where demand is at $12. Demand crosses MC at 16 units.',
};

// Demand schedule for a single-price monopolist with constant MC.
const SCHEDULE_PRICES = [10, 9, 8, 7, 6];
const SCHEDULE_MC = 5;
const DEMAND_TABLE = {
  type: 'table',
  caption: 'Demand facing a monopolist',
  columns: ['Price ($)', 'Quantity demanded (units)'],
  rows: SCHEDULE_PRICES.map((p, i) => [p, i + 1]),
  alt: 'Demand schedule for a monopolist. At $10 it sells 1 unit, at $9 2 units, at $8 3 units, at $7 4 units and at $6 5 units.',
};
const scheduleRevenue = q => (q === 0 ? 0 : SCHEDULE_PRICES[q - 1] * q);
const scheduleBestPrice = () => {
  let q = 0;
  while (q < SCHEDULE_PRICES.length && scheduleRevenue(q + 1) - scheduleRevenue(q) >= SCHEDULE_MC) q++;
  return SCHEDULE_PRICES[q - 1];
};

export default [
  {
    id: 'micro-monopoly-001',
    topic: 'monopoly',
    difficulty: 1,
    prompt: 'Which of the following best explains how a monopoly can keep earning economic profit in the long run?',
    choices: [
      'Its demand curve is perfectly elastic.',
      'It produces where price equals marginal cost.',
      'Barriers to entry keep other firms out of the market.',
      'It always produces at minimum average total cost.',
    ],
    answer: 2,
    explanation: 'In competitive markets, profit attracts entry that competes the profit away. A monopoly is protected by barriers such as patents, control of a key resource or large economies of scale, so new firms cannot enter. A monopoly faces the downward-sloping market demand curve, not a perfectly elastic one.',
    reviewed: true,
  },
  {
    id: 'micro-monopoly-002',
    topic: 'monopoly',
    formulas: ['profit-max'],
    difficulty: 2,
    prompt: 'The graph shows a profit-maximizing monopolist. What quantity does it produce?',
    figure: MONOPOLY_GRAPH,
    choices: ['10 units', '16 units', '12 units', '8 units'],
    answer: 3,
    explanation: 'Every firm produces where MR = MC. MR = 20 − 2Q equals $4 at Q = 8. 16 units is where demand meets MC, the allocatively efficient quantity a competitive market would produce, and 10 units is where MR is zero, which maximizes revenue rather than profit.',
    verify: 'numeric',
    solve: () => MONOPOLY_Q,
    reviewed: true,
  },
  {
    id: 'micro-monopoly-003',
    topic: 'monopoly',
    formulas: ['profit-max'],
    difficulty: 2,
    prompt: 'Using the graph, what price does the profit-maximizing monopolist charge, in dollars?',
    figure: MONOPOLY_GRAPH,
    choices: ['12', '4', '8', '16'],
    answer: 0,
    explanation: 'After choosing Q = 8 where MR = MC, the monopolist goes up to the demand curve to find the highest price buyers will pay for 8 units: 20 − 8 = $12. $4 reads the price off the MC curve, and $8 is the quantity, not a price.',
    verify: 'numeric',
    solve: () => MONOPOLY_P,
    reviewed: true,
  },
  {
    id: 'micro-monopoly-004',
    topic: 'monopoly',
    formulas: ['profit'],
    difficulty: 3,
    prompt: 'Using the graph, what is the monopolist\'s economic profit, in dollars?',
    figure: MONOPOLY_GRAPH,
    choices: ['96', '64', '32', '128'],
    answer: 1,
    explanation: 'Profit is (P − ATC) × Q = ($12 − $4) × 8 = $64, the rectangle between the price and ATC out to 8 units. $96 is total revenue ($12 × 8), and $32 is the deadweight loss triangle.',
    verify: 'numeric',
    solve: () => (MONOPOLY_P - COST) * MONOPOLY_Q,
    reviewed: true,
  },
  {
    id: 'micro-monopoly-005',
    topic: 'monopoly',
    formulas: ['deadweight-loss'],
    difficulty: 3,
    prompt: 'Using the graph, what is the deadweight loss from monopoly, in dollars?',
    figure: MONOPOLY_GRAPH,
    choices: ['64', '16', '32', '8'],
    answer: 2,
    explanation: 'The efficient quantity is 16 units, where demand meets MC. Deadweight loss is the triangle between 8 and 16 units, below demand and above MC: ½ × (16 − 8) × ($12 − $4) = $32. $64 forgets the ½ (and equals the profit rectangle), and $16 uses only half the base.',
    verify: 'numeric',
    solve: () => 0.5 * (COMPETITIVE_Q - MONOPOLY_Q) * (MONOPOLY_P - COST),
    reviewed: true,
  },
  {
    id: 'micro-monopoly-006',
    topic: 'monopoly',
    formulas: ['revenue'],
    difficulty: 2,
    prompt: 'For a single-price monopolist, marginal revenue is less than price because',
    choices: [
      'its marginal cost rises as output increases',
      'it must lower the price on all units, not just the extra one, to sell one more unit',
      'the government taxes its profits',
      'its demand curve is perfectly elastic',
    ],
    answer: 1,
    explanation: 'To sell one more unit, a single-price monopolist must cut the price for every buyer. The extra unit brings in its price, but revenue from all the earlier units falls, so MR is below price. Marginal cost has nothing to do with marginal revenue.',
    reviewed: true,
  },
  {
    id: 'micro-monopoly-007',
    topic: 'monopoly',
    formulas: ['total-revenue-test', 'profit-max'],
    difficulty: 2,
    prompt: 'A profit-maximizing monopolist with positive marginal cost always produces on the portion of its demand curve that is',
    choices: ['perfectly inelastic', 'inelastic', 'unit elastic', 'elastic'],
    answer: 3,
    explanation: 'Profit requires MR = MC, and with MC above zero, MR must be positive. MR is positive only where demand is elastic, the upper part of a linear demand curve. On the inelastic part, raising price would increase revenue and cut costs, so no monopolist stays there.',
    reviewed: true,
  },
  {
    id: 'micro-monopoly-008',
    topic: 'monopoly',
    difficulty: 3,
    prompt: 'If a monopolist could perfectly price discriminate, charging each buyer the most that buyer is willing to pay, then compared with single-price monopoly',
    choices: [
      'output would rise to the allocatively efficient level, and consumer surplus would be zero',
      'output would fall, and deadweight loss would rise',
      'output would stay the same, but consumer surplus would rise',
      'price would equal marginal cost for every buyer, so profit would be zero',
    ],
    answer: 0,
    explanation: 'With perfect price discrimination, the monopolist\'s MR equals the demand curve, so it sells to every buyer willing to pay at least MC: the efficient quantity, with no deadweight loss. But each buyer pays exactly their willingness to pay, so the firm captures all the surplus and consumer surplus is zero. Only the last unit sells at a price equal to MC.',
    reviewed: true,
  },
  {
    id: 'micro-monopoly-009',
    topic: 'monopoly',
    formulas: ['socially-optimal'],
    difficulty: 2,
    prompt: 'A regulator forces a natural monopoly to charge the socially optimal price, where P = MC. Because the firm\'s ATC is still falling at that output, the firm will',
    choices: [
      'earn positive economic profit',
      'earn zero economic profit',
      'suffer an economic loss unless it receives a subsidy',
      'produce less than it would unregulated',
    ],
    answer: 2,
    explanation: 'For a natural monopoly, ATC falls over the relevant range, so MC lies below ATC. Setting P = MC puts the price below ATC, and the firm loses money on each unit. The fair-return price, P = ATC, avoids the loss and gives zero economic profit but produces less than the efficient amount.',
    reviewed: true,
  },
  {
    id: 'micro-monopoly-010',
    topic: 'monopoly',
    formulas: ['revenue', 'profit-max'],
    difficulty: 2,
    prompt: `The table shows demand for a single-price monopolist whose marginal cost is a constant $${SCHEDULE_MC}. What price maximizes its profit, in dollars?`,
    figure: DEMAND_TABLE,
    choices: ['6', '5', '7', '8'],
    answer: 3,
    explanation: 'Total revenue at 1 to 5 units is $10, $18, $24, $28 and $30, so marginal revenue is $10, $8, $6, $4 and $2. The firm sells every unit with MR at least $5: three units. It charges the highest price at which buyers take 3 units, $8. $5 sets price equal to MC, which a monopolist does not do.',
    verify: 'numeric',
    solve: scheduleBestPrice,
    reviewed: true,
  },
];
