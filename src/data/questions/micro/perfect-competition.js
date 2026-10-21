// AP Microeconomics, Unit 3: the perfectly competitive firm in the short run:
// price taking, MR = MC, profit and loss, and the shutdown rule.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { valueAt } from '../figureMath.js'

// Short-run total cost for a competitive bakery. Fixed cost is TC at Q = 0.
const TOTAL_COST = [20, 30, 38, 48, 62, 80, 102];
const FIXED_COST = TOTAL_COST[0];
const COST_TABLE = {
  type: 'table',
  caption: 'Short-run total cost for a competitive bakery',
  columns: ['Output (cakes)', 'Total cost ($)'],
  rows: TOTAL_COST.map((tc, q) => [q, tc]),
  alt: 'Table of total cost by output. 0 cakes cost $20, 1 cake $30, 2 cakes $38, 3 cakes $48, 4 cakes $62, 5 cakes $80 and 6 cakes $102.',
};
const marginalCost = q => TOTAL_COST[q] - TOTAL_COST[q - 1];
// Price takers keep producing while the next unit's MC is no more than price.
const bestOutput = price => {
  let q = 0;
  while (q + 1 < TOTAL_COST.length && marginalCost(q + 1) <= price) q++;
  return q;
};
const profitAt = price => price * bestOutput(price) - TOTAL_COST[bestOutput(price)];
const minAverageVariableCost = () => Math.min(...TOTAL_COST.slice(1).map((tc, i) => (tc - FIXED_COST) / (i + 1)));

// A firm's MC and ATC curves (straight segments) with the market price.
const PRICE = 12;
const MC_POINTS = [[1, 8], [2, 5], [4, 6], [6, 12], [8, 20]];
const ATC_POINTS = [[1, 20], [3, 11], [5, 9], [7, 11], [9, 15]];
// Where MC crosses the price line on its rising part: the MR = MC quantity.
const risingCrossing = (points, level) => {
  for (let i = 0; i < points.length - 1; i++) {
    const [[x0, y0], [x1, y1]] = [points[i], points[i + 1]];
    if (y1 > y0 && level >= y0 && level <= y1) return x0 + ((level - y0) * (x1 - x0)) / (y1 - y0);
  }
  throw new RangeError(`MC never rises through ${level}`);
};
const PROFIT_QUANTITY = risingCrossing(MC_POINTS, PRICE);
const FIRM_GRAPH = {
  type: 'graph', xLabel: 'Quantity (units)', yLabel: 'Price and cost ($)', xMax: 10, xStep: 1, yMin: 0, yMax: 20, yStep: 2,
  series: [
    { points: MC_POINTS, label: 'MC' },
    { points: ATC_POINTS, label: 'ATC' },
    { points: [[0, PRICE], [10, PRICE]], label: 'MR = P' },
  ],
  alt: 'Cost curves for a perfectly competitive firm. A horizontal line MR = P at $12. MC falls from $8 at 1 unit to $5 at 2 units, then rises through $6 at 4 units, $12 at 6 units and $20 at 8 units. ATC is U-shaped: $20 at 1 unit, $11 at 3 units, a minimum of $9 at 5 units, $10 at 6 units, $11 at 7 units and $15 at 9 units.',
};

export default [
  {
    id: 'micro-perfect-competition-001',
    topic: 'perfect-competition',
    difficulty: 1,
    prompt: 'The demand curve facing an individual firm in a perfectly competitive market is',
    choices: [
      'downward sloping, because buyers want more at lower prices',
      'horizontal at the market price',
      'vertical at the firm\'s current output',
      'the same as the market demand curve',
    ],
    answer: 1,
    explanation: 'Each firm is so small and its product so identical to the others\' that it can sell all it wants at the market price and nothing above it. Its demand curve is perfectly elastic, a horizontal line where P = MR = AR. The market demand curve still slopes down.',
    reviewed: true,
  },
  {
    id: 'micro-perfect-competition-002',
    topic: 'perfect-competition',
    formulas: ['profit-max', 'marginal-cost'],
    difficulty: 2,
    prompt: 'The bakery in the table sells in a perfectly competitive market where the price of a cake is $20. How many cakes should it produce to maximize profit?',
    figure: COST_TABLE,
    choices: ['6 cakes', '3 cakes', '4 cakes', '5 cakes'],
    answer: 3,
    explanation: 'Marginal costs are $10, $8, $10, $14, $18 and $22. The bakery should make every cake whose marginal cost is no more than the $20 price, up to the 5th cake ($18), and stop before the 6th, which would add $22 in cost but only $20 in revenue. Profit is $20 at 5 cakes and $18 at 4 or 6.',
    verify: 'numeric',
    solve: () => bestOutput(20),
    reviewed: true,
  },
  {
    id: 'micro-perfect-competition-003',
    topic: 'perfect-competition',
    formulas: ['profit', 'profit-max'],
    difficulty: 3,
    prompt: 'Using the table, if the price of a cake is $18, what is the bakery\'s maximum profit, in dollars?',
    figure: COST_TABLE,
    choices: ['90', '18', '10', '−6'],
    answer: 2,
    explanation: 'At $18 the bakery makes 5 cakes. Total revenue is $18 × 5 = $90 and total cost is $80, so profit is $10. $90 is total revenue alone, and −$6 is the loss at a price of $14.',
    verify: 'numeric',
    solve: () => profitAt(18),
    reviewed: true,
  },
  {
    id: 'micro-perfect-competition-004',
    topic: 'perfect-competition',
    formulas: ['shutdown', 'profit'],
    difficulty: 3,
    prompt: 'Using the table, the market price of a cake falls to $14. In the short run, the bakery should',
    figure: COST_TABLE,
    choices: [
      'shut down, because it is losing money',
      'produce 4 cakes, because its $6 loss is smaller than the $20 loss from shutting down',
      'produce 6 cakes, to spread its fixed cost over more units',
      'raise its price to $18, to cover its costs',
    ],
    answer: 1,
    explanation: 'At $14 the bakery makes 4 cakes (MC of the 4th is $14). Revenue is $56 and total cost is $62, a loss of $6. Shutting down would still leave the $20 fixed cost, so producing loses less. Price ($14) is above AVC ($42 / 4 = $10.50), which is the shutdown test. A price taker cannot raise its price.',
    reviewed: true,
  },
  {
    id: 'micro-perfect-competition-005',
    topic: 'perfect-competition',
    formulas: ['profit-max'],
    difficulty: 2,
    prompt: 'The graph shows a perfectly competitive firm\'s cost curves and the market price. What quantity maximizes the firm\'s profit?',
    figure: FIRM_GRAPH,
    choices: ['5 units', '6 units', '2 units', '8 units'],
    answer: 1,
    explanation: 'The firm produces where MR = MC on the rising part of MC: MC reaches $12 at 6 units. 5 units is where ATC is lowest, which minimizes cost per unit but not profit. 2 units is where MC is lowest, which has nothing to do with the price.',
    verify: 'numeric',
    solve: () => PROFIT_QUANTITY,
    reviewed: true,
  },
  {
    id: 'micro-perfect-competition-006',
    topic: 'perfect-competition',
    formulas: ['profit'],
    difficulty: 3,
    prompt: 'Using the graph, what is the firm\'s economic profit at its profit-maximizing quantity, in dollars?',
    figure: FIRM_GRAPH,
    choices: ['18', '72', '12', '6'],
    answer: 2,
    explanation: 'At 6 units, ATC is $10, so profit is (P − ATC) × Q = ($12 − $10) × 6 = $12. $18 uses the minimum ATC of $9 instead of ATC at the chosen quantity, and $72 is total revenue.',
    verify: 'numeric',
    solve: () => (PRICE - valueAt(ATC_POINTS, PROFIT_QUANTITY)) * PROFIT_QUANTITY,
    reviewed: true,
  },
  {
    id: 'micro-perfect-competition-007',
    topic: 'perfect-competition',
    formulas: ['shutdown'],
    difficulty: 2,
    prompt: 'Using the table, below what price will the bakery shut down in the short run, in dollars?',
    figure: COST_TABLE,
    choices: ['9', '20', '13', '8'],
    answer: 0,
    explanation: 'A firm shuts down when price falls below its minimum average variable cost. AVC is $10, $9, about $9.33, $10.50, $12 and $13.67, so the minimum is $9 (at 2 cakes). Fixed cost does not matter for this decision because it is paid either way, so the $20 fixed cost is a distractor.',
    verify: 'numeric',
    solve: minAverageVariableCost,
    reviewed: true,
  },
  {
    id: 'micro-perfect-competition-008',
    topic: 'perfect-competition',
    formulas: ['shutdown'],
    difficulty: 2,
    prompt: 'A perfectly competitive firm\'s short-run supply curve is',
    choices: [
      'its average total cost curve above the market price',
      'its marginal revenue curve',
      'its entire marginal cost curve',
      'its marginal cost curve above the minimum of average variable cost',
    ],
    answer: 3,
    explanation: 'At each price the firm produces where P = MC, so the MC curve tells you the quantity supplied. Below minimum AVC the firm shuts down and supplies nothing, so only the part of MC above minimum AVC is the supply curve. The MR curve is just the horizontal price line.',
    reviewed: true,
  },
  {
    id: 'micro-perfect-competition-009',
    topic: 'perfect-competition',
    formulas: ['shutdown'],
    difficulty: 1,
    prompt: 'A perfectly competitive firm that shuts down in the short run has a loss equal to its',
    choices: ['total fixed cost', 'total variable cost', 'total cost', 'zero, because it produces nothing'],
    answer: 0,
    explanation: 'Shutting down avoids all variable costs, but fixed costs such as rent must still be paid in the short run. So a firm that shuts down loses exactly its total fixed cost. This is why a firm keeps producing when price covers AVC: it then loses less than its fixed cost.',
    reviewed: true,
  },
];
