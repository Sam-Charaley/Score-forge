// AP Microeconomics, Unit 4: oligopoly, collusion and game theory (dominant
// strategies and Nash equilibrium from payoff matrices).
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// Payoffs are [row player, column player], in thousands of dollars of profit.
const PRICING = { high: { high: [50, 50], low: [20, 70] }, low: { high: [70, 20], low: [30, 30] } };
const cell = ([a, b]) => `${a}, ${b}`;
const PRICING_MATRIX = {
  type: 'table',
  caption: 'Daily profit in thousands of dollars (Firm A, Firm B)',
  columns: ['Firm A', 'Firm B: High price', 'Firm B: Low price'],
  rows: [
    ['High price', cell(PRICING.high.high), cell(PRICING.high.low)],
    ['Low price', cell(PRICING.low.high), cell(PRICING.low.low)],
  ],
  alt: 'Payoff matrix for Firm A (rows) and Firm B (columns), profits listed as Firm A then Firm B. Both high: 50 and 50. A high, B low: 20 and 70. A low, B high: 70 and 20. Both low: 30 and 30.',
};

const ADVERTISING = { adv: { adv: [40, 25], dont: [60, 20] }, dont: { adv: [30, 35], dont: [50, 40] } };
const ADVERTISING_MATRIX = {
  type: 'table',
  caption: 'Monthly profit in thousands of dollars (Alto, Brio)',
  columns: ['Alto', 'Brio: Advertise', 'Brio: Don\'t advertise'],
  rows: [
    ['Advertise', cell(ADVERTISING.adv.adv), cell(ADVERTISING.adv.dont)],
    ['Don\'t advertise', cell(ADVERTISING.dont.adv), cell(ADVERTISING.dont.dont)],
  ],
  alt: 'Payoff matrix for Alto (rows) and Brio (columns), profits listed as Alto then Brio. Both advertise: 40 and 25. Alto advertises, Brio does not: 60 and 20. Alto does not, Brio advertises: 30 and 35. Neither advertises: 50 and 40.',
};

// Pure-strategy Nash equilibria: cells where neither player gains by switching alone.
function nashEquilibria(game) {
  const rows = Object.keys(game);
  const cols = Object.keys(game[rows[0]]);
  return rows.flatMap(r => cols.filter(c =>
    rows.every(r2 => game[r2][c][0] <= game[r][c][0]) && cols.every(c2 => game[r][c2][1] <= game[r][c][1]),
  ).map(c => ({ row: r, col: c, payoffs: game[r][c] })));
}

export default [
  {
    id: 'micro-oligopoly-001',
    topic: 'oligopoly',
    difficulty: 1,
    prompt: 'The feature that most distinguishes oligopoly from other market structures is that',
    choices: [
      'firms sell identical products',
      'there are no barriers to entry',
      'each firm\'s best decision depends on what its few rivals do',
      'firms are price takers',
    ],
    answer: 2,
    explanation: 'With only a few large firms, each firm\'s price or output choice noticeably affects its rivals, so firms must anticipate each other\'s moves. That interdependence is why game theory is used to study oligopoly. Oligopolies usually have significant barriers to entry and can sell identical or differentiated products.',
    reviewed: true,
  },
  {
    id: 'micro-oligopoly-002',
    topic: 'oligopoly',
    difficulty: 2,
    prompt: 'Using the payoff matrix, which statement about Firm A is correct?',
    figure: PRICING_MATRIX,
    choices: [
      'Firm A has a dominant strategy to charge a high price.',
      'Firm A has a dominant strategy to charge a low price.',
      'Firm A has no dominant strategy.',
      'Firm A should always copy Firm B\'s choice.',
    ],
    answer: 1,
    explanation: 'If B charges high, A earns 70 with a low price versus 50 with a high price. If B charges low, A earns 30 with a low price versus 20 with a high price. A low price is better for A whatever B does, so it is a dominant strategy. Both firms would be better off charging high, but that is not what each does on its own.',
    reviewed: true,
  },
  {
    id: 'micro-oligopoly-003',
    topic: 'oligopoly',
    difficulty: 2,
    prompt: 'Using the payoff matrix, if the firms do not collude, what is the Nash equilibrium?',
    figure: PRICING_MATRIX,
    choices: [
      'Both firms charge a high price.',
      'Firm A charges high and Firm B charges low.',
      'Firm A charges low and Firm B charges high.',
      'Both firms charge a low price.',
    ],
    answer: 3,
    explanation: 'The matrix is symmetric, so a low price is a dominant strategy for both firms, and each earns 30. Neither can do better by switching alone: moving to a high price would drop that firm to 20. Both firms charging high (50 each) gives more total profit, but each firm would gain by cutting its price, so it is not an equilibrium. This is a prisoner\'s dilemma.',
    reviewed: true,
  },
  {
    id: 'micro-oligopoly-004',
    topic: 'oligopoly',
    difficulty: 3,
    prompt: 'Using the payoff matrix, the two firms secretly agree to both charge a high price. Why is this agreement likely to break down?',
    figure: PRICING_MATRIX,
    choices: [
      'Each firm can raise its own profit from 50 to 70 by cutting its price while the other keeps its price high.',
      'Both firms earn less with high prices than with low prices.',
      'Charging a high price is a dominant strategy for both firms.',
      'The Nash equilibrium is already at high prices, so there is nothing to gain.',
    ],
    answer: 0,
    explanation: 'If one firm keeps its promise and charges high, the other earns 70 instead of 50 by cheating with a low price. Since each firm faces this temptation, collusive agreements tend to be unstable, especially when cheating is hard to detect. High prices actually give each firm more (50) than the low-price equilibrium (30).',
    reviewed: true,
  },
  {
    id: 'micro-oligopoly-005',
    topic: 'oligopoly',
    difficulty: 2,
    prompt: 'Using the payoff matrix for Alto and Brio, which statement is true?',
    figure: ADVERTISING_MATRIX,
    choices: [
      'Both firms have a dominant strategy to advertise.',
      'Neither firm has a dominant strategy.',
      'Brio has a dominant strategy to advertise, and Alto does not have one.',
      'Alto has a dominant strategy to advertise, and Brio does not have one.',
    ],
    answer: 3,
    explanation: 'For Alto, advertising pays more whatever Brio does (40 > 30 and 60 > 50), so it is dominant. For Brio, the best choice depends on Alto: if Alto advertises, Brio prefers to advertise (25 > 20), but if Alto does not, Brio prefers not to (40 > 35). So only Alto has a dominant strategy.',
    reviewed: true,
  },
  {
    id: 'micro-oligopoly-006',
    topic: 'oligopoly',
    difficulty: 3,
    prompt: 'Using the payoff matrix for Alto and Brio, what is Brio\'s profit in the Nash equilibrium, in thousands of dollars?',
    figure: ADVERTISING_MATRIX,
    choices: ['40', '20', '25', '35'],
    answer: 2,
    explanation: 'Alto will advertise because it is dominant. Knowing that, Brio compares 25 (advertise) with 20 (don\'t) and advertises. In that cell neither firm gains by switching alone, so it is the Nash equilibrium and Brio earns 25. Brio would earn 40 if neither advertised, but Alto would then switch to advertising.',
    verify: 'numeric',
    solve: () => nashEquilibria(ADVERTISING)[0].payoffs[1],
    reviewed: true,
  },
  {
    id: 'micro-oligopoly-007',
    topic: 'oligopoly',
    difficulty: 3,
    prompt: 'Using the payoff matrix for Alto and Brio, by how much would Alto\'s profit change, in thousands of dollars, if both firms moved from the Nash equilibrium to neither advertising?',
    figure: ADVERTISING_MATRIX,
    choices: ['20', '10', '−10', '30'],
    answer: 1,
    explanation: 'In the Nash equilibrium both advertise and Alto earns 40. If neither advertised, Alto would earn 50, an increase of 10. Both firms would be better off, but Alto still prefers to advertise once it knows Brio won\'t (60 > 50), which is why they end up both advertising. 20 compares 60 with 40, a cell neither firm moves to.',
    verify: 'numeric',
    solve: () => ADVERTISING.dont.dont[0] - nashEquilibria(ADVERTISING)[0].payoffs[0],
    reviewed: true,
  },
  {
    id: 'micro-oligopoly-008',
    topic: 'oligopoly',
    difficulty: 2,
    prompt: 'If all the firms in an oligopoly successfully form a cartel, the industry will tend to produce',
    choices: [
      'the quantity and price a monopoly would choose',
      'the quantity where price equals marginal cost',
      'more output than without the cartel, at a lower price',
      'the quantity at the minimum of average total cost',
    ],
    answer: 0,
    explanation: 'A cartel coordinates to maximize the members\' combined profit, which means acting like a single monopolist: restricting output to where industry MR = MC and charging a higher price. Price equal to MC is the competitive outcome, the opposite of what a cartel aims for.',
    reviewed: true,
  },
  {
    id: 'micro-oligopoly-009',
    topic: 'oligopoly',
    difficulty: 1,
    prompt: 'In a game between two firms, a Nash equilibrium is an outcome in which',
    choices: [
      'the firms earn the highest combined profit',
      'one firm earns all of the profit',
      'each firm is doing the best it can given the other firm\'s choice',
      'both firms use their dominant strategies, which always exist',
    ],
    answer: 2,
    explanation: 'At a Nash equilibrium, neither player can gain by changing its own strategy while the other\'s stays the same. It need not give the highest combined profit, as the prisoner\'s dilemma shows. Dominant strategies lead to a Nash equilibrium when they exist, but many games have an equilibrium without them.',
    reviewed: true,
  },
];
