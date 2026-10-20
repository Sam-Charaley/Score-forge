// AP Microeconomics, Unit 1: marginal analysis, cost-benefit decisions and
// utility-maximizing consumer choice.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// Marginal utility of each unit of two goods, for the utility-max questions.
const MU_X = [20, 16, 12, 8, 4];
const MU_Y = [12, 10, 8, 6, 4];
const PRICE_X = 2;
const PRICE_Y = 1;
const BUDGET = 10;
const MU_TABLE = {
  type: 'table',
  caption: 'Marginal utility (utils) of goods X and Y',
  columns: ['Units consumed', 'MU of good X', 'MU of good Y'],
  rows: MU_X.map((mu, i) => [i + 1, mu, MU_Y[i]]),
  alt: 'Table of marginal utility for 1 to 5 units. Good X: 20, 16, 12, 8 and 4 utils. Good Y: 12, 10, 8, 6 and 4 utils.',
};
const totalUtility = (mus, units) => mus.slice(0, units).reduce((sum, mu) => sum + mu, 0);

// Benefit and cost of each extra hour spent studying, for marginal analysis.
const TOTAL_BENEFIT = [50, 90, 120, 140, 150];
const COST_PER_HOUR = 25;
const STUDY_TABLE = {
  type: 'table',
  caption: 'Total benefit of hours spent studying',
  columns: ['Hours studied', 'Total benefit ($)'],
  rows: TOTAL_BENEFIT.map((tb, i) => [i + 1, tb]),
  alt: 'Table of total benefit from studying. 1 hour gives $50, 2 hours $90, 3 hours $120, 4 hours $140 and 5 hours $150 of total benefit.',
};
// The last hour whose marginal benefit is at least its marginal cost.
const bestHours = () => TOTAL_BENEFIT.filter((tb, i) => tb - (TOTAL_BENEFIT[i - 1] ?? 0) >= COST_PER_HOUR).length;

export default [
  {
    id: 'micro-consumer-choice-001',
    topic: 'consumer-choice',
    difficulty: 1,
    prompt: 'The law of diminishing marginal utility states that as a person consumes more units of a good in a given period,',
    choices: [
      'total utility falls with each additional unit',
      'the additional satisfaction from each additional unit eventually falls',
      'the price of the good falls',
      'the person\'s demand for the good increases',
    ],
    answer: 1,
    explanation: 'Marginal utility is the extra satisfaction from one more unit, and it eventually shrinks: the third slice of pizza adds less than the first. Total utility still rises as long as marginal utility is positive, so saying total utility falls confuses the two.',
    reviewed: false,
  },
  {
    id: 'micro-consumer-choice-002',
    topic: 'consumer-choice',
    formulas: ['utility-max'],
    difficulty: 2,
    prompt: `The table shows Maya's marginal utility from goods X and Y. Good X costs $${PRICE_X}, good Y costs $${PRICE_Y}, and Maya has $${BUDGET} to spend. Which combination maximizes her total utility?`,
    figure: MU_TABLE,
    choices: ['4 units of X and 2 units of Y', '2 units of X and 5 units of Y', '3 units of X and 4 units of Y', '5 units of X and 0 units of Y'],
    answer: 2,
    explanation: 'Divide each marginal utility by the price. X gives 10, 8, 6, 4, 2 utils per dollar and Y gives 12, 10, 8, 6, 4. Buying in order of the highest utils per dollar, the $10 runs out at 3 X and 4 Y, where both last units give 6 utils per dollar and 3($2) + 4($1) = $10. 4 X and 2 Y also costs $10 but leaves the fourth X at only 4 utils per dollar while a third Y would give 8.',
    reviewed: false,
  },
  {
    id: 'micro-consumer-choice-003',
    topic: 'consumer-choice',
    formulas: ['utility-max'],
    difficulty: 3,
    prompt: `Using the table, with good X at $${PRICE_X}, good Y at $${PRICE_Y} and a budget of $${BUDGET}, what is Maya's total utility when she buys the utility-maximizing combination?`,
    figure: MU_TABLE,
    choices: ['78 utils', '84 utils', '6 utils', '14 utils'],
    answer: 1,
    explanation: 'The best combination is 3 X and 4 Y. Total utility adds up every unit\'s marginal utility: X gives 20 + 16 + 12 = 48 and Y gives 12 + 10 + 8 + 6 = 36, so 84 utils. 78 utils is 4 X and 2 Y, which costs the same but gives less. 6 utils is the marginal utility per dollar at the optimum, not the total.',
    verify: 'numeric',
    solve: () => totalUtility(MU_X, 3) + totalUtility(MU_Y, 4),
    reviewed: false,
  },
  {
    id: 'micro-consumer-choice-004',
    topic: 'consumer-choice',
    formulas: ['utility-max'],
    difficulty: 2,
    prompt: 'Jordan spends his whole budget on tacos and smoothies. For the last taco he bought, MU/P = 5 utils per dollar. For the last smoothie, MU/P = 3 utils per dollar. To maximize utility, Jordan should',
    choices: [
      'buy more smoothies and fewer tacos',
      'keep buying the same amounts, since he spends his whole budget',
      'buy more of both goods',
      'buy more tacos and fewer smoothies',
    ],
    answer: 3,
    explanation: 'A dollar moved from smoothies to tacos loses about 3 utils and gains about 5, so total utility rises. As he buys more tacos their marginal utility falls, and as he buys fewer smoothies theirs rises, until MU/P is equal for both. Spending the whole budget is necessary but not enough: the last dollar on each good must give the same utility.',
    reviewed: false,
  },
  {
    id: 'micro-consumer-choice-005',
    topic: 'consumer-choice',
    difficulty: 2,
    prompt: `The table shows the total benefit Leo gets from studying. Each hour of studying costs him $${COST_PER_HOUR} in wages he could have earned. How many hours should he study?`,
    figure: STUDY_TABLE,
    choices: ['5 hours', '2 hours', '4 hours', '3 hours'],
    answer: 3,
    explanation: 'The marginal benefits of each hour are $50, $40, $30, $20 and $10. Leo should keep studying while the marginal benefit is at least the $25 marginal cost: the third hour adds $30, but the fourth adds only $20. 5 hours maximizes total benefit, but it ignores the cost of each hour.',
    verify: 'numeric',
    solve: bestHours,
    reviewed: false,
  },
  {
    id: 'micro-consumer-choice-006',
    topic: 'consumer-choice',
    difficulty: 2,
    prompt: 'Priya paid $60 for a non-refundable concert ticket. On the day of the concert, she is offered a shift at work that pays $80, which she values more than the concert. A rational decision maker would',
    choices: [
      'work the shift, because the $60 is a sunk cost that should not affect the decision',
      'go to the concert, because otherwise the $60 is wasted',
      'go to the concert, because she has already paid for it',
      'split the difference and go to part of the concert',
    ],
    answer: 0,
    explanation: 'The $60 is gone whichever choice she makes, so it is a sunk cost and should be ignored. Only future costs and benefits matter: she values the $80 shift more than the concert, so working gives the higher net benefit. Going to avoid "wasting" the ticket is the sunk cost fallacy.',
    reviewed: false,
  },
  {
    id: 'micro-consumer-choice-007',
    topic: 'consumer-choice',
    difficulty: 2,
    prompt: 'When the price of coffee falls, consumers buy more coffee partly because coffee is now cheaper compared with tea. This part of the response is called the',
    choices: ['income effect', 'substitution effect', 'law of diminishing marginal utility', 'cross-price effect on supply'],
    answer: 1,
    explanation: 'The substitution effect is the shift toward a good that has become relatively cheaper than its alternatives. The income effect is the other part of the response: a lower price raises the buyer\'s purchasing power, so they can afford more of everything.',
    reviewed: false,
  },
  {
    id: 'micro-consumer-choice-008',
    topic: 'consumer-choice',
    formulas: ['utility-max'],
    difficulty: 3,
    prompt: `Using the table, the price of good Y rises from $${PRICE_Y} to $2 while good X stays at $${PRICE_X} and Maya still has $${BUDGET}. What is her new utility-maximizing combination?`,
    figure: MU_TABLE,
    choices: ['3 units of X and 4 units of Y', '1 unit of X and 4 units of Y', '2 units of X and 3 units of Y', '3 units of X and 2 units of Y'],
    answer: 3,
    explanation: 'At $2 each, Y now gives 6, 5, 4, 3 and 2 utils per dollar, while X still gives 10, 8, 6, 4, 2. Buying in order of utils per dollar: X, X, then X and Y at 6, then the second Y at 5, which spends exactly $10 on 3 X and 2 Y. Y falls from 4 units to 2, as the law of demand predicts. 3 X and 4 Y was the old choice and would now cost $14.',
    reviewed: false,
  },
  {
    id: 'micro-consumer-choice-009',
    topic: 'consumer-choice',
    difficulty: 1,
    prompt: 'A consumer\'s total utility from a good is at its maximum when the marginal utility of the good is',
    choices: ['at its maximum', 'equal to the price of the good', 'zero', 'equal to total utility'],
    answer: 2,
    explanation: 'Total utility rises as long as each extra unit adds positive utility. When marginal utility reaches zero, one more unit adds nothing, and beyond that it would lower total utility. Marginal utility is usually at its highest with the first unit, when total utility is still low.',
    reviewed: false,
  },
];
