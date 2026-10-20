// AP Microeconomics, Unit 3: entry and exit, long-run equilibrium in perfect
// competition, industry cost types, and allocative and productive efficiency.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// Every firm in the industry has this cost schedule.
const TOTAL_COST = [20, 30, 38, 48, 62, 80, 102];
const COST_TABLE = {
  type: 'table',
  caption: 'Total cost for each identical firm',
  columns: ['Output (units)', 'Total cost ($)'],
  rows: TOTAL_COST.map((tc, q) => [q, tc]),
  alt: 'Table of total cost by output for each firm. 0 units cost $20, 1 unit $30, 2 units $38, 3 units $48, 4 units $62, 5 units $80 and 6 units $102.',
};
const averageTotalCosts = TOTAL_COST.slice(1).map((tc, i) => tc / (i + 1));
const MIN_ATC = Math.min(...averageTotalCosts);
const EFFICIENT_SCALE = averageTotalCosts.indexOf(MIN_ATC) + 1;
const MARKET_QUANTITY = 400;

export default [
  {
    id: 'micro-competitive-long-run-001',
    topic: 'competitive-long-run',
    difficulty: 1,
    prompt: 'In long-run equilibrium, a typical firm in a perfectly competitive industry earns',
    choices: ['positive economic profit', 'zero accounting profit', 'zero economic profit', 'an economic loss'],
    answer: 2,
    explanation: 'With free entry and exit, any economic profit draws in new firms and any loss drives firms out, until price equals minimum ATC and economic profit is zero. Zero economic profit still includes a normal accounting profit, which covers the owners\' opportunity costs.',
    reviewed: false,
  },
  {
    id: 'micro-competitive-long-run-002',
    topic: 'competitive-long-run',
    difficulty: 2,
    prompt: 'Firms in a perfectly competitive industry are earning positive economic profits in the short run. What will happen in the long run?',
    choices: [
      'Firms enter, market supply increases and price falls until economic profit is zero.',
      'Firms exit, market supply decreases and price rises.',
      'Firms raise their prices to keep their profits.',
      'Market demand increases, so profits stay positive.',
    ],
    answer: 0,
    explanation: 'Profits signal that resources earn more here than elsewhere, so new firms enter. Market supply shifts right, which lowers the price each firm takes, until price falls to minimum ATC. Individual firms are price takers, so they cannot simply raise prices.',
    reviewed: false,
  },
  {
    id: 'micro-competitive-long-run-003',
    topic: 'competitive-long-run',
    difficulty: 2,
    prompt: 'A perfectly competitive firm is producing where price is below average total cost but above average variable cost. In the long run, if nothing else changes,',
    choices: [
      'the firm keeps producing at a loss indefinitely',
      'some firms exit, market supply decreases and price rises until the remaining firms break even',
      'firms enter, which lowers the price further',
      'the firm earns positive profit once its fixed costs are paid off',
    ],
    answer: 1,
    explanation: 'A firm covering AVC stays open in the short run, but in the long run all costs are variable and it will not accept a loss. Firms leave, the market supply curve shifts left, and price rises to minimum ATC, where the firms that remain earn zero economic profit.',
    reviewed: false,
  },
  {
    id: 'micro-competitive-long-run-004',
    topic: 'competitive-long-run',
    formulas: ['allocative-efficiency'],
    difficulty: 2,
    prompt: 'A firm is allocatively efficient when it produces where',
    choices: ['price equals minimum average total cost', 'marginal revenue equals average total cost', 'total revenue is at its maximum', 'price equals marginal cost'],
    answer: 3,
    explanation: 'Allocative efficiency means the value buyers place on the last unit (the price) equals the cost of producing it (marginal cost), so society gets the right amount of the good. Price equal to minimum ATC is productive efficiency: producing at the lowest possible cost per unit. Perfect competition in the long run achieves both.',
    reviewed: false,
  },
  {
    id: 'micro-competitive-long-run-005',
    topic: 'competitive-long-run',
    difficulty: 3,
    prompt: 'A perfectly competitive constant-cost industry is in long-run equilibrium when market demand permanently increases. After all long-run adjustments, compared with the original equilibrium,',
    choices: [
      'price is higher and each firm earns positive economic profit',
      'price is the same, and the industry has more firms',
      'price is lower, because more firms have entered',
      'price is higher, and the number of firms is the same',
    ],
    answer: 1,
    explanation: 'In the short run, higher demand raises the price and creates profits. Entry then shifts market supply right until price returns to minimum ATC. In a constant-cost industry entry does not raise input prices, so minimum ATC and the long-run price are unchanged, and the extra output comes from more firms. A higher long-run price would describe an increasing-cost industry.',
    reviewed: false,
  },
  {
    id: 'micro-competitive-long-run-006',
    topic: 'competitive-long-run',
    difficulty: 3,
    prompt: 'As more firms enter an industry, they bid up the price of a specialized input, raising every firm\'s costs. The industry\'s long-run supply curve is',
    choices: ['horizontal', 'vertical', 'upward sloping', 'downward sloping'],
    answer: 2,
    explanation: 'This is an increasing-cost industry: expanding output raises input prices, so each new long-run equilibrium has a higher minimum ATC and a higher price. Connecting those equilibria gives an upward-sloping long-run supply curve. A horizontal one belongs to a constant-cost industry, and a downward-sloping one to a decreasing-cost industry.',
    reviewed: false,
  },
  {
    id: 'micro-competitive-long-run-007',
    topic: 'competitive-long-run',
    formulas: ['average-costs', 'allocative-efficiency'],
    difficulty: 2,
    prompt: 'Every firm in a perfectly competitive industry has the costs shown in the table. What will the market price be in long-run equilibrium, in dollars?',
    figure: COST_TABLE,
    choices: ['18', '15.5', '10.5', '20'],
    answer: 1,
    explanation: 'In long-run equilibrium, price equals minimum average total cost. ATC is $30, $19, about $16, $15.50, $16 and $17, so the minimum is $15.50 at 4 units. $10.50 is AVC at 4 units, which leaves out fixed cost and would mean losses, and $20 is the fixed cost.',
    verify: 'numeric',
    solve: () => MIN_ATC,
    reviewed: false,
  },
  {
    id: 'micro-competitive-long-run-008',
    topic: 'competitive-long-run',
    formulas: ['average-costs'],
    difficulty: 3,
    prompt: `Using the table, in long-run equilibrium the industry sells ${MARKET_QUANTITY} units in total. How many identical firms are in the industry?`,
    figure: COST_TABLE,
    choices: ['400 firms', '80 firms', '100 firms', '25 firms'],
    answer: 2,
    explanation: `In the long run each firm produces at minimum ATC, which is 4 units. Market output of ${MARKET_QUANTITY} divided by 4 units per firm gives 100 firms. 80 firms assumes each firm makes 5 units instead of 4, and 400 counts units, not firms.`,
    verify: 'numeric',
    solve: () => MARKET_QUANTITY / EFFICIENT_SCALE,
    reviewed: false,
  },
  {
    id: 'micro-competitive-long-run-009',
    topic: 'competitive-long-run',
    difficulty: 1,
    prompt: 'A firm earning zero economic profit',
    choices: [
      'should shut down immediately',
      'is earning less than its owners could earn elsewhere',
      'has total revenue below its explicit costs',
      'is covering all of its costs, including the opportunity cost of its owners\' resources',
    ],
    answer: 3,
    explanation: 'Economic cost includes implicit costs such as the owner\'s time and money. Zero economic profit means revenue covers all of them, a normal profit, so the owners do as well here as in their next best use. It is not a reason to shut down or exit.',
    reviewed: false,
  },
];
