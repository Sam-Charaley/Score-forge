// AP Macroeconomics, Unit 1: demand, supply, market equilibrium and
// changes in equilibrium.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// Demand P = 10 − Q/10 and supply P = 2 + Q/10, crossing at Q = 40, P = $6.
const DEMAND = { intercept: 10, slope: -0.1 };
const SUPPLY = { intercept: 2, slope: 0.1 };
const priceOnLine = (line, quantity) => line.intercept + line.slope * quantity;
const quantityOnLine = (line, price) => (price - line.intercept) / line.slope;
const MARKET = {
  type: 'graph', xLabel: 'Quantity (units)', yLabel: 'Price ($)', xMax: 100, xStep: 10, yMin: 0, yMax: 12, yStep: 2,
  series: [
    { points: [[0, 10], [100, 0]], label: 'D' },
    { points: [[0, 2], [100, 12]], label: 'S' },
  ],
  alt: 'Graph of a market. Demand D slopes down from a price of $10 at 0 units to $0 at 100 units. Supply S slopes up from $2 at 0 units to $12 at 100 units. They cross at 40 units and $6.',
};

export default [
  {
    id: 'macro-supply-demand-001',
    topic: 'supply-demand',
    difficulty: 1,
    prompt: 'Which of the following would shift the demand curve for gasoline-powered cars to the left?',
    choices: [
      'A decrease in the price of gasoline-powered cars',
      'A large increase in the price of gasoline',
      'A decrease in the cost of steel used to build cars',
      'An increase in consumer incomes, if cars are a normal good',
    ],
    answer: 1,
    explanation: 'Gasoline and gas-powered cars are complements, so a higher gas price lowers the demand for the cars. A change in the cars\' own price is a movement along the demand curve, and cheaper steel shifts supply, not demand.',
    reviewed: false,
  },
  {
    id: 'macro-supply-demand-002',
    topic: 'supply-demand',
    difficulty: 1,
    prompt: 'Based on the graph, what are the equilibrium price and quantity?',
    figure: MARKET,
    choices: ['$6 and 40 units', '$4 and 60 units', '$6 and 60 units', '$10 and 0 units'],
    answer: 0,
    explanation: 'Equilibrium is where the demand and supply curves cross: at 40 units, demand gives P = 10 − 4 = $6 and supply gives P = 2 + 4 = $6. At that price, quantity demanded equals quantity supplied.',
    reviewed: false,
  },
  {
    id: 'macro-supply-demand-003',
    topic: 'supply-demand',
    difficulty: 2,
    prompt: 'Based on the graph, if the government sets a price ceiling of $4 in this market, how large is the resulting shortage?',
    figure: MARKET,
    choices: ['20 units', '40 units', '60 units', '80 units'],
    answer: 1,
    explanation: 'At $4, buyers want 60 units (from 4 = 10 − Q/10) but sellers offer only 20 units (from 4 = 2 + Q/10). The shortage is 60 − 20 = 40 units. 60 is the quantity demanded alone.',
    verify: 'numeric',
    solve: () => quantityOnLine(DEMAND, 4) - quantityOnLine(SUPPLY, 4),
    reviewed: false,
  },
  {
    id: 'macro-supply-demand-004',
    topic: 'supply-demand',
    difficulty: 2,
    prompt: 'Based on the graph, what is the consumer surplus at the market equilibrium, in dollars?',
    figure: MARKET,
    choices: ['40', '80', '120', '160'],
    answer: 1,
    explanation: 'Consumer surplus is the triangle below demand and above the price, out to the equilibrium quantity: ½ × 40 × ($10 − $6) = $80. $160 forgets the ½.',
    verify: 'numeric',
    solve: () => 0.5 * 40 * (DEMAND.intercept - priceOnLine(DEMAND, 40)),
    reviewed: false,
  },
  {
    id: 'macro-supply-demand-005',
    topic: 'supply-demand',
    difficulty: 2,
    prompt: 'A new technology lowers the cost of producing solar panels at the same time that consumer preferences shift toward solar panels. What happens in the market for solar panels?',
    choices: [
      'Price rises and quantity is indeterminate.',
      'Price falls and quantity rises.',
      'Price is indeterminate and quantity rises.',
      'Both price and quantity rise.',
    ],
    answer: 2,
    explanation: 'Supply shifts right and demand shifts right. Both shifts raise quantity, so quantity rises for sure. The supply shift lowers price while the demand shift raises it, so without the sizes of the shifts the price change is indeterminate.',
    reviewed: false,
  },
  {
    id: 'macro-supply-demand-006',
    topic: 'supply-demand',
    difficulty: 2,
    prompt: 'The market for coffee is in equilibrium. A frost destroys a large part of the coffee crop. Which of the following describes the change in the market for tea, a substitute for coffee?',
    choices: [
      'The demand for tea decreases, and the price of tea falls.',
      'The supply of tea decreases, and the price of tea rises.',
      'The supply of tea increases, and the price of tea falls.',
      'The demand for tea increases, and the price of tea rises.',
    ],
    answer: 3,
    explanation: 'The frost lowers the supply of coffee and raises its price. Buyers switch to the substitute, so the demand for tea rises, raising both the price and quantity of tea. The frost did not change the supply of tea.',
    reviewed: false,
  },
  {
    id: 'macro-supply-demand-007',
    topic: 'supply-demand',
    difficulty: 3,
    prompt: 'Based on the graph, if the government sets a price floor of $8 in this market, what is the resulting deadweight loss, in dollars?',
    figure: MARKET,
    choices: ['20', '40', '60', '80'],
    answer: 1,
    explanation: 'At $8, buyers purchase only 20 units. At 20 units, buyers value the last unit at $8 and sellers\' cost is $4, so the lost surplus is the triangle ½ × (40 − 20) × ($8 − $4) = $40.',
    verify: 'numeric',
    solve: () => {
      const quantityTraded = quantityOnLine(DEMAND, 8);
      return 0.5 * (40 - quantityTraded) * (priceOnLine(DEMAND, quantityTraded) - priceOnLine(SUPPLY, quantityTraded));
    },
    reviewed: false,
  },
  {
    id: 'macro-supply-demand-008',
    topic: 'supply-demand',
    difficulty: 3,
    prompt: 'Which of the following correctly explains why the demand curve for a good slopes downward?',
    choices: [
      'As price rises, sellers are willing to supply more units.',
      'As income rises, buyers purchase more of a normal good.',
      'A lower price increases the purchasing power of buyers\' incomes and makes the good cheaper relative to substitutes.',
      'A lower price shifts the demand curve to the right.',
    ],
    answer: 2,
    explanation: 'The income effect (a lower price makes buyers\' money go further) and the substitution effect (the good becomes cheaper than alternatives) both raise quantity demanded as price falls. A price change moves along the curve; it does not shift it.',
    reviewed: false,
  },
];
