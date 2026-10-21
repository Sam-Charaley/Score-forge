// AP Microeconomics, Unit 2: demand, supply, their determinants and market
// equilibrium, including shifts of both curves.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// Straight-line demand and supply that cross at Q = 50, P = $5.
const demandPrice = q => 10 - 0.1 * q;
const supplyPrice = q => 1 + 0.08 * q;
const quantityDemanded = p => (10 - p) / 0.1;
const quantitySupplied = p => (p - 1) / 0.08;
const MARKET_GRAPH = {
  type: 'graph', xLabel: 'Quantity (units)', yLabel: 'Price ($)', xMax: 100, xStep: 10, yMin: 0, yMax: 10, yStep: 1,
  series: [
    { points: [[0, demandPrice(0)], [100, demandPrice(100)]], label: 'D' },
    { points: [[0, supplyPrice(0)], [100, supplyPrice(100)]], label: 'S' },
  ],
  alt: 'Supply and demand graph. Demand D is a straight line from $10 at 0 units down to $0 at 100 units. Supply S is a straight line from $1 at 0 units up to $9 at 100 units. They cross at 50 units and $5.',
};

export default [
  {
    id: 'micro-supply-demand-001',
    topic: 'supply-demand',
    difficulty: 1,
    prompt: 'An increase in the price of movie tickets, all else equal, causes',
    choices: [
      'a decrease in the demand for movie tickets',
      'a decrease in the quantity of movie tickets demanded',
      'an increase in the demand for movie tickets',
      'an increase in the supply of movie tickets',
    ],
    answer: 1,
    explanation: 'A change in the good\'s own price moves buyers along the demand curve, which is a change in quantity demanded. A change in demand, a shift of the whole curve, comes only from something other than the good\'s own price, such as income, tastes or the prices of related goods.',
    reviewed: true,
  },
  {
    id: 'micro-supply-demand-002',
    topic: 'supply-demand',
    difficulty: 2,
    prompt: 'Coffee and tea are substitutes. If the price of tea rises, what happens in the market for coffee?',
    choices: [
      'Demand for coffee decreases, so price and quantity both fall.',
      'Supply of coffee increases, so price falls and quantity rises.',
      'Demand for coffee increases, so price and quantity both rise.',
      'Quantity of coffee demanded rises, but demand does not change.',
    ],
    answer: 2,
    explanation: 'When tea gets more expensive, some tea drinkers switch to coffee, so the demand curve for coffee shifts right. Along the unchanged supply curve, that raises both the equilibrium price and quantity of coffee. The price of tea is not coffee\'s own price, so this is a shift, not a movement along the curve.',
    reviewed: true,
  },
  {
    id: 'micro-supply-demand-003',
    topic: 'supply-demand',
    difficulty: 2,
    prompt: 'The wage paid to workers who assemble bicycles rises. In the market for bicycles, the equilibrium price and quantity will most likely change in which way?',
    choices: [
      'Price decreases and quantity decreases.',
      'Price increases and quantity increases.',
      'Price decreases and quantity increases.',
      'Price increases and quantity decreases.',
    ],
    answer: 3,
    explanation: 'A higher wage raises the cost of producing each bicycle, so supply shifts left. Moving up along the demand curve, price rises and quantity falls. Price rising and quantity rising together would come from an increase in demand, not a change in costs.',
    reviewed: true,
  },
  {
    id: 'micro-supply-demand-004',
    topic: 'supply-demand',
    difficulty: 2,
    prompt: 'Using the graph, if the price is $7, the market has a surplus. How large is the surplus?',
    figure: MARKET_GRAPH,
    choices: ['45 units', '30 units', '75 units', '105 units'],
    answer: 0,
    explanation: 'At $7, buyers want 30 units (on D) and sellers offer 75 units (on S). Quantity supplied exceeds quantity demanded by 75 − 30 = 45 units, a surplus, which pushes the price down toward $5. 30 units is only the quantity demanded and 75 units only the quantity supplied; the surplus is the gap between them.',
    verify: 'numeric',
    solve: () => quantitySupplied(7) - quantityDemanded(7),
    reviewed: true,
  },
  {
    id: 'micro-supply-demand-005',
    topic: 'supply-demand',
    difficulty: 2,
    prompt: 'In a market, quantity demanded is Qd = 120 − 4P and quantity supplied is Qs = 2P, where P is the price in dollars. What is the equilibrium quantity?',
    choices: ['20 units', '40 units', '80 units', '100 units'],
    answer: 1,
    explanation: 'Set Qd = Qs: 120 − 4P = 2P, so 6P = 120 and P = $20. Then Q = 2(20) = 40 units (check: 120 − 4(20) = 40). 20 is the equilibrium price, not the quantity, and 80 units is only the 4P term at that price, not the quantity demanded.',
    verify: 'numeric',
    solve: () => {
      const price = 120 / (4 + 2);
      return 2 * price;
    },
    reviewed: true,
  },
  {
    id: 'micro-supply-demand-006',
    topic: 'supply-demand',
    difficulty: 3,
    prompt: 'In the market for electric bicycles, consumer incomes rise (e-bikes are a normal good) and, at the same time, battery technology improves and lowers production costs. Which must be true about the new equilibrium?',
    choices: [
      'Price rises, and the change in quantity is indeterminate.',
      'Price falls, and quantity rises.',
      'Quantity rises, and the change in price is indeterminate.',
      'Both price and quantity rise.',
    ],
    answer: 2,
    explanation: 'Higher income shifts demand right, and lower costs shift supply right. Both shifts raise quantity, so quantity must rise. They push price in opposite directions (demand up, supply down), so without knowing which shift is larger, the price change is indeterminate. Choosing a definite price change assumes the size of the shifts.',
    reviewed: true,
  },
  {
    id: 'micro-supply-demand-007',
    topic: 'supply-demand',
    difficulty: 2,
    prompt: 'Bus rides are an inferior good. If consumer incomes rise, then in the market for bus rides',
    choices: [
      'demand decreases, lowering the equilibrium price and quantity',
      'demand increases, raising the equilibrium price and quantity',
      'supply decreases, raising the price and lowering the quantity',
      'quantity demanded falls along an unchanged demand curve',
    ],
    answer: 0,
    explanation: 'For an inferior good, demand falls as income rises because people switch to alternatives such as driving. The demand curve shifts left, so equilibrium price and quantity both fall. Rising demand would be the response for a normal good.',
    reviewed: true,
  },
  {
    id: 'micro-supply-demand-008',
    topic: 'supply-demand',
    difficulty: 3,
    prompt: 'Buyers and sellers of a stock both come to expect that its price will be much higher next month. In the market today, what happens?',
    choices: [
      'Price falls, and the change in quantity is indeterminate.',
      'Price and quantity both rise.',
      'Quantity rises, and the change in price is indeterminate.',
      'Price rises, and the change in quantity is indeterminate.',
    ],
    answer: 3,
    explanation: 'Buyers want to buy now before the price rises, so demand increases. Sellers would rather wait and sell later at the higher price, so supply decreases. Both shifts raise today\'s price, but they move quantity in opposite directions, so the quantity change is indeterminate. Price and quantity both rising would need only the demand shift.',
    reviewed: true,
  },
  {
    id: 'micro-supply-demand-009',
    topic: 'supply-demand',
    difficulty: 1,
    prompt: 'Using the graph, if the price is currently $3, which describes what will happen?',
    figure: MARKET_GRAPH,
    choices: [
      'There is a surplus, so the price will fall.',
      'There is a shortage, so the price will rise toward $5.',
      'The market is in equilibrium, so the price will stay at $3.',
      'There is a shortage, so the supply curve will shift right.',
    ],
    answer: 1,
    explanation: 'At $3, buyers want 70 units but sellers offer only 25, so there is a shortage. Buyers compete for the scarce units and bid the price up toward the $5 equilibrium. The supply curve does not shift: a higher price moves sellers along it to a larger quantity supplied.',
    reviewed: true,
  },
];
