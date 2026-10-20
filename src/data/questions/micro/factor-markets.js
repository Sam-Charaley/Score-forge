// AP Microeconomics, Unit 5: derived demand, marginal revenue product and the
// hiring rule, shifts in labor demand, the least-cost rule and monopsony.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// A firm selling its output in a perfectly competitive market.
const TOTAL_PRODUCT = [0, 10, 18, 24, 28, 30, 31];
const OUTPUT_PRICE = 5;
const WAGE = 25;
const LABOR_TABLE = {
  type: 'table',
  caption: 'Total product of labor',
  columns: ['Workers', 'Total product (units)'],
  rows: TOTAL_PRODUCT.map((tp, workers) => [workers, tp]),
  alt: 'Table of total product by number of workers. 0 workers make 0 units, 1 worker 10, 2 workers 18, 3 workers 24, 4 workers 28, 5 workers 30 and 6 workers 31.',
};
const marginalRevenueProduct = (workers, price) => (TOTAL_PRODUCT[workers] - TOTAL_PRODUCT[workers - 1]) * price;
// Hire each worker whose MRP is at least the wage.
const workersHired = (price, wage) => {
  let workers = 0;
  while (workers + 1 < TOTAL_PRODUCT.length && marginalRevenueProduct(workers + 1, price) >= wage) workers++;
  return workers;
};

// A monopsony employer: to hire more workers it must raise everyone's wage.
const MONOPSONY_WAGES = [8, 10, 12, 14];
const MONOPSONY_MRP = [30, 22, 16, 10];
const MONOPSONY_TABLE = {
  type: 'table',
  caption: 'Labor market for the only employer in a town',
  columns: ['Workers', 'Wage needed ($ per hour)', 'MRP ($ per hour)'],
  rows: MONOPSONY_WAGES.map((w, i) => [i + 1, w, MONOPSONY_MRP[i]]),
  alt: 'Table for a monopsony employer. To hire 1 worker it pays $8 an hour, 2 workers $10 each, 3 workers $12 each and 4 workers $14 each. The marginal revenue product of the 1st to 4th workers is $30, $22, $16 and $10.',
};
const monopsonyWage = () => {
  const totalCost = n => (n === 0 ? 0 : MONOPSONY_WAGES[n - 1] * n);
  let n = 0;
  while (n < MONOPSONY_WAGES.length && MONOPSONY_MRP[n] >= totalCost(n + 1) - totalCost(n)) n++;
  return MONOPSONY_WAGES[n - 1];
};

export default [
  {
    id: 'micro-factor-markets-001',
    topic: 'factor-markets',
    difficulty: 1,
    prompt: 'The demand for carpenters is called a derived demand because it',
    choices: [
      'depends on the demand for the houses and furniture that carpenters help produce',
      'is set by the government',
      'depends only on the wage carpenters want',
      'is perfectly inelastic',
    ],
    answer: 0,
    explanation: 'Firms hire workers for what they produce, so the demand for a factor comes from the demand for the product. If demand for new houses rises, the value of a carpenter\'s output rises and so does the demand for carpenters. The wage carpenters want affects labor supply, not demand.',
    reviewed: false,
  },
  {
    id: 'micro-factor-markets-002',
    topic: 'factor-markets',
    formulas: ['mrp', 'marginal-product'],
    difficulty: 2,
    prompt: `The firm in the table sells its output in a perfectly competitive market for $${OUTPUT_PRICE} per unit. What is the marginal revenue product of the 3rd worker, in dollars?`,
    figure: LABOR_TABLE,
    choices: ['120', '6', '40', '30'],
    answer: 3,
    explanation: `The 3rd worker raises output from 18 to 24 units, a marginal product of 6. With a constant price of $${OUTPUT_PRICE}, MRP = MP × P = 6 × $5 = $30. $120 multiplies total product (24) by the price instead of marginal product, and 6 is the marginal product in units, not dollars.`,
    verify: 'numeric',
    solve: () => marginalRevenueProduct(3, OUTPUT_PRICE),
    reviewed: false,
  },
  {
    id: 'micro-factor-markets-003',
    topic: 'factor-markets',
    formulas: ['hiring-rule', 'mrp'],
    difficulty: 2,
    prompt: `Using the table, the product sells for $${OUTPUT_PRICE} and the firm hires in a perfectly competitive labor market at a wage of $${WAGE} per day. How many workers will it hire to maximize profit?`,
    figure: LABOR_TABLE,
    choices: ['2 workers', '3 workers', '4 workers', '5 workers'],
    answer: 1,
    explanation: 'The MRPs of the 1st to 6th workers are $50, $40, $30, $20, $10 and $5. The firm hires each worker who adds at least as much revenue as the $25 wage costs: the 3rd adds $30, but the 4th adds only $20. Hiring 4 would add more cost than revenue.',
    verify: 'numeric',
    solve: () => workersHired(OUTPUT_PRICE, WAGE),
    reviewed: false,
  },
  {
    id: 'micro-factor-markets-004',
    topic: 'factor-markets',
    formulas: ['hiring-rule', 'mrp'],
    difficulty: 3,
    prompt: `Using the table, the price of the firm's product rises from $${OUTPUT_PRICE} to $10 while the wage stays at $${WAGE} per day. How many workers will the firm now hire?`,
    figure: LABOR_TABLE,
    choices: ['3 workers', '6 workers', '4 workers', '5 workers'],
    answer: 2,
    explanation: 'At $10 the MRPs double to $100, $80, $60, $40, $20 and $10. The 4th worker adds $40, which covers the $25 wage, but the 5th adds only $20. A higher product price raises MRP, which shifts the firm\'s labor demand right, so it hires 4 instead of 3.',
    verify: 'numeric',
    solve: () => workersHired(10, WAGE),
    reviewed: false,
  },
  {
    id: 'micro-factor-markets-005',
    topic: 'factor-markets',
    formulas: ['mrp'],
    difficulty: 2,
    prompt: 'Which of the following would increase the demand for nurses in a competitive labor market?',
    choices: [
      'A rise in the wage paid to nurses',
      'An increase in the number of people trained as nurses',
      'A new technology that makes each nurse able to care for more patients, with demand for care unchanged',
      'A decrease in demand for health care',
    ],
    answer: 2,
    explanation: 'Labor demand is the MRP curve, MP × P. Higher productivity raises nurses\' marginal product and so their MRP, shifting labor demand right. A higher wage is a movement along the demand curve, more trained nurses is an increase in supply, and less demand for health care would lower the price of care and the demand for nurses.',
    reviewed: false,
  },
  {
    id: 'micro-factor-markets-006',
    topic: 'factor-markets',
    formulas: ['mrc'],
    difficulty: 2,
    prompt: 'A small firm hires workers in a perfectly competitive labor market. The supply of labor to this firm is',
    choices: [
      'upward sloping, so its marginal resource cost is above the wage',
      'horizontal at the market wage, so its marginal resource cost equals the wage',
      'vertical at the number of workers it currently employs',
      'downward sloping, because more workers lower the wage',
    ],
    answer: 1,
    explanation: 'A firm that is small relative to the labor market is a wage taker: it can hire as many workers as it wants at the market wage. The supply of labor it faces is horizontal, and each extra worker costs exactly the wage, so MRC = wage. An upward-sloping supply with MRC above the wage describes a monopsony.',
    reviewed: false,
  },
  {
    id: 'micro-factor-markets-007',
    topic: 'factor-markets',
    formulas: ['mrc', 'hiring-rule'],
    difficulty: 3,
    prompt: 'The table shows the labor market for the only employer in a small town. It must pay all workers the same wage. To maximize profit, what wage does it pay, in dollars per hour?',
    figure: MONOPSONY_TABLE,
    choices: ['16', '10', '12', '14'],
    answer: 2,
    explanation: 'Total labor cost is $8, $20, $36 and $56 for 1 to 4 workers, so MRC is $8, $12, $16 and $20. The firm hires while MRP is at least MRC: the 3rd worker\'s MRP of $16 equals its MRC, but the 4th worker\'s $10 is below $20. It then pays the lowest wage that attracts 3 workers, $12. $16 is the MRC (and MRP) of the 3rd worker, not the wage paid.',
    verify: 'numeric',
    solve: monopsonyWage,
    reviewed: false,
  },
  {
    id: 'micro-factor-markets-008',
    topic: 'factor-markets',
    formulas: ['mrc'],
    difficulty: 3,
    prompt: 'Compared with a perfectly competitive labor market with the same labor supply and demand, a monopsony employer will',
    choices: [
      'hire more workers at a higher wage',
      'hire more workers at a lower wage',
      'hire the same number of workers at a lower wage',
      'hire fewer workers at a lower wage',
    ],
    answer: 3,
    explanation: 'A monopsony\'s MRC is above the wage because hiring one more worker means raising the wage for everyone. It hires where MRP = MRC, which is fewer workers than where MRP meets labor supply, and then pays only the wage on the supply curve for that number, which is lower than the competitive wage.',
    reviewed: false,
  },
  {
    id: 'micro-factor-markets-009',
    topic: 'factor-markets',
    formulas: ['least-cost'],
    difficulty: 2,
    prompt: 'A firm\'s last worker has a marginal product of 30 units and costs $10 per hour. Its last machine has a marginal product of 40 units and costs $20 per hour. To produce its current output at the lowest cost, the firm should',
    choices: [
      'use more machines and less labor',
      'use more labor and fewer machines',
      'keep its current mix, since both inputs are productive',
      'use less of both inputs',
    ],
    answer: 1,
    explanation: 'Labor gives 30 / $10 = 3 units per dollar, and machines give 40 / $20 = 2 units per dollar. Shifting spending toward labor produces the same output for less, until MP per dollar is equal for both inputs. The machine has the higher marginal product, but per dollar spent it is the weaker choice.',
    reviewed: false,
  },
];
