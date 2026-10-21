// AP Microeconomics, Unit 3: production, short-run and long-run costs, and
// accounting versus economic profit.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// Short-run cost schedule for a bakery. Fixed cost is the total cost at Q = 0.
const TOTAL_COST = [20, 30, 38, 48, 62, 80, 102];
const FIXED_COST = TOTAL_COST[0];
const COST_TABLE = {
  type: 'table',
  caption: 'Short-run total cost for a bakery',
  columns: ['Output (cakes)', 'Total cost ($)'],
  rows: TOTAL_COST.map((tc, q) => [q, tc]),
  alt: 'Table of total cost by output. 0 cakes cost $20, 1 cake $30, 2 cakes $38, 3 cakes $48, 4 cakes $62, 5 cakes $80 and 6 cakes $102.',
};
const marginalCost = q => TOTAL_COST[q] - TOTAL_COST[q - 1];

// Total product of labor at a small factory with fixed capital.
const TOTAL_PRODUCT = [0, 10, 25, 35, 40, 42];
const LABOR_TABLE = {
  type: 'table',
  caption: 'Total product with a fixed amount of capital',
  columns: ['Workers', 'Total product (units)'],
  rows: TOTAL_PRODUCT.map((tp, workers) => [workers, tp]),
  alt: 'Table of total product by number of workers. 0 workers make 0 units, 1 worker 10 units, 2 workers 25, 3 workers 35, 4 workers 40 and 5 workers 42.',
};
const marginalProduct = workers => TOTAL_PRODUCT[workers] - TOTAL_PRODUCT[workers - 1];

export default [
  {
    id: 'micro-production-costs-001',
    topic: 'production-costs',
    difficulty: 1,
    prompt: 'Which of the following is a fixed cost for a restaurant in the short run?',
    choices: ['The cost of ingredients', 'Wages for servers paid by the hour', 'The monthly rent on its building', 'The electricity used by its ovens'],
    answer: 2,
    explanation: 'A fixed cost does not change with how much the firm produces. The rent is the same whether the restaurant serves 10 meals or 500. Ingredients, hourly wages and oven electricity all rise with output, so they are variable costs.',
    reviewed: true,
  },
  {
    id: 'micro-production-costs-002',
    topic: 'production-costs',
    formulas: ['marginal-cost'],
    difficulty: 2,
    prompt: 'Using the table, what is the marginal cost of the 5th cake, in dollars?',
    figure: COST_TABLE,
    choices: ['16', '18', '80', '14'],
    answer: 1,
    explanation: 'Marginal cost is the change in total cost from one more unit: $80 − $62 = $18. $16 is the average total cost of 5 cakes ($80 / 5), and $14 is the marginal cost of the 4th cake.',
    verify: 'numeric',
    solve: () => marginalCost(5),
    reviewed: true,
  },
  {
    id: 'micro-production-costs-003',
    topic: 'production-costs',
    formulas: ['average-costs'],
    difficulty: 2,
    prompt: 'Using the table, what is the average variable cost of producing 4 cakes, in dollars?',
    figure: COST_TABLE,
    choices: ['15.5', '42', '10.5', '14'],
    answer: 2,
    explanation: 'Variable cost is total cost minus fixed cost: $62 − $20 = $42. Average variable cost is $42 / 4 = $10.50. $15.50 is average total cost ($62 / 4), which still includes the fixed cost, and $42 is total variable cost, not the average.',
    verify: 'numeric',
    solve: () => (TOTAL_COST[4] - FIXED_COST) / 4,
    reviewed: true,
  },
  {
    id: 'micro-production-costs-004',
    topic: 'production-costs',
    formulas: ['marginal-product'],
    difficulty: 2,
    prompt: 'Using the table, what is the marginal product of the 4th worker?',
    figure: LABOR_TABLE,
    choices: ['40 units', '10 units', '2 units', '5 units'],
    answer: 3,
    explanation: 'Marginal product is the change in total product from adding one worker: 40 − 35 = 5 units. 40 units is the total product of 4 workers, and 10 units is the average product (40 / 4).',
    verify: 'numeric',
    solve: () => marginalProduct(4),
    reviewed: true,
  },
  {
    id: 'micro-production-costs-005',
    topic: 'production-costs',
    formulas: ['marginal-product'],
    difficulty: 2,
    prompt: 'Using the table, diminishing marginal returns begin when the factory adds which worker?',
    figure: LABOR_TABLE,
    choices: ['The 2nd worker', 'The 3rd worker', 'The 5th worker', 'The 1st worker'],
    answer: 1,
    explanation: 'Marginal product is 10, 15, 10, 5 and then 2 units. It rises with the 2nd worker, then falls starting with the 3rd, so diminishing marginal returns begin there. Total product keeps rising, which is why looking only at total product can be misleading.',
    reviewed: true,
  },
  {
    id: 'micro-production-costs-006',
    topic: 'production-costs',
    formulas: ['marginal-cost', 'average-costs'],
    difficulty: 2,
    prompt: 'In the short run, the marginal cost curve intersects',
    choices: [
      'the average variable cost and average total cost curves at their minimum points',
      'the average fixed cost curve at its minimum point',
      'the average total cost curve at its maximum point',
      'the average variable cost curve only where it is rising',
    ],
    answer: 0,
    explanation: 'When marginal cost is below an average, it pulls the average down; when it is above, it pulls the average up. So MC crosses both AVC and ATC exactly at their lowest points. AFC falls forever and has no minimum for MC to cross.',
    reviewed: true,
  },
  {
    id: 'micro-production-costs-007',
    topic: 'production-costs',
    formulas: ['marginal-cost', 'average-costs'],
    difficulty: 3,
    prompt: 'A firm\'s annual business license fee increases, and the fee does not depend on how much it produces. Which of the firm\'s short-run cost curves shift upward?',
    choices: [
      'Marginal cost and average variable cost only',
      'Average total cost and marginal cost only',
      'All four: AFC, AVC, ATC and MC',
      'Average fixed cost and average total cost only',
    ],
    answer: 3,
    explanation: 'A higher license fee is a fixed cost, so it raises AFC and therefore ATC (ATC = AVC + AFC). It does not change the cost of producing one more unit, so MC is unchanged, and AVC is unchanged because variable costs are the same. Expecting MC to shift is the most common mistake here.',
    reviewed: true,
  },
  {
    id: 'micro-production-costs-008',
    topic: 'production-costs',
    formulas: ['profit'],
    difficulty: 3,
    prompt: 'Ana quit a job paying $60,000 a year to run her own shop. Last year the shop earned $200,000 in revenue and paid $150,000 in explicit costs. What was her economic profit, in dollars?',
    choices: ['50,000', '−10,000', '110,000', '−60,000'],
    answer: 1,
    explanation: 'Accounting profit subtracts only explicit costs: $200,000 − $150,000 = $50,000. Economic profit also subtracts the implicit cost of her forgone salary: $50,000 − $60,000 = −$10,000. The shop makes an accounting profit but an economic loss, so she would have earned more at her old job.',
    verify: 'numeric',
    solve: () => 200000 - 150000 - 60000,
    reviewed: true,
  },
  {
    id: 'micro-production-costs-009',
    topic: 'production-costs',
    difficulty: 3,
    prompt: 'A firm doubles all of its inputs in the long run, and its output more than doubles. Over this range of output, the firm',
    choices: [
      'experiences economies of scale, so its long-run average total cost falls',
      'experiences diminishing marginal returns, so its marginal cost rises',
      'experiences diseconomies of scale, so its long-run average total cost rises',
      'has constant returns to scale, so its long-run average total cost is flat',
    ],
    answer: 0,
    explanation: 'When output grows faster than inputs, cost per unit falls, which is economies of scale on the downward-sloping part of the LRATC curve. Diminishing marginal returns is a short-run idea about adding one input to a fixed amount of another, not about changing all inputs together.',
    reviewed: true,
  },
  {
    id: 'micro-production-costs-010',
    topic: 'production-costs',
    formulas: ['average-costs'],
    difficulty: 1,
    prompt: 'As a firm increases its output in the short run, its average fixed cost',
    choices: ['always rises', 'first falls, then rises', 'always falls', 'stays the same'],
    answer: 2,
    explanation: 'Average fixed cost is fixed cost divided by output. The fixed cost stays the same while output grows, so the same amount is spread over more units and AFC keeps falling. The U shape belongs to ATC, AVC and MC, not AFC.',
    reviewed: true,
  },
];
