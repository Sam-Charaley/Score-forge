// AP Microeconomics, Unit 2: price elasticity of demand and supply, the total
// revenue test, and income and cross-price elasticity.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// Midpoint percent change, as on the formula sheet.
const midpointChange = (oldValue, newValue) => (newValue - oldValue) / ((newValue + oldValue) / 2);

// A straight-line demand curve from $10 at 0 units to $0 at 100 units.
const demandPrice = q => 10 - 0.1 * q;
const LINEAR_DEMAND = {
  type: 'graph', xLabel: 'Quantity (units)', yLabel: 'Price ($)', xMax: 100, xStep: 10, yMin: 0, yMax: 10, yStep: 1,
  series: [{ points: [[0, demandPrice(0)], [100, demandPrice(100)]], label: 'D' }],
  alt: 'A straight-line demand curve D running from a price of $10 at 0 units down to a price of $0 at 100 units. Each $1 drop in price raises quantity demanded by 10 units.',
};

export default [
  {
    id: 'micro-elasticity-001',
    topic: 'elasticity',
    formulas: ['price-elasticity', 'midpoint'],
    difficulty: 2,
    prompt: 'When the price of a sandwich rises from $4 to $6, the quantity demanded falls from 100 to 80 per day. Using the midpoint method, what is the price elasticity of demand (in absolute value)?',
    choices: ['1.8', '0.40', '0.56', '2.5'],
    answer: 2,
    explanation: 'The midpoint percent change in quantity is 20/90 ≈ 22.2%, and in price it is 2/5 = 40%. Elasticity is 22.2/40 ≈ 0.56, so demand is inelastic in this range. 0.40 uses the starting values instead of midpoints (20% / 50%), and 1.8 divides the percent changes the wrong way around.',
    verify: 'numeric',
    solve: () => Math.abs(midpointChange(100, 80) / midpointChange(4, 6)),
    reviewed: true,
  },
  {
    id: 'micro-elasticity-002',
    topic: 'elasticity',
    formulas: ['total-revenue-test'],
    difficulty: 1,
    prompt: 'A theater finds that demand for its tickets is price elastic. If it lowers ticket prices, its total revenue will',
    choices: ['increase', 'decrease', 'stay the same', 'fall to zero'],
    answer: 0,
    explanation: 'With elastic demand, quantity demanded changes by a larger percentage than price. A price cut brings in so many more buyers that price times quantity rises. If demand were inelastic, the same price cut would lower total revenue.',
    reviewed: true,
  },
  {
    id: 'micro-elasticity-003',
    topic: 'elasticity',
    difficulty: 2,
    prompt: 'Demand for which of the following is likely to be the most price inelastic?',
    choices: ['A particular brand of cereal', 'Restaurant meals', 'Insulin for people with diabetes', 'Concert tickets'],
    answer: 2,
    explanation: 'Insulin is a necessity with no close substitutes, so buyers keep purchasing about the same amount when its price rises. A single brand of cereal has many close substitutes, which makes its demand highly elastic, and restaurant meals and concerts are easy to cut back on.',
    reviewed: true,
  },
  {
    id: 'micro-elasticity-004',
    topic: 'elasticity',
    formulas: ['income-elasticity'],
    difficulty: 2,
    prompt: 'When average income in a town rises by 20%, the quantity of instant noodles demanded falls by 10%. What is the income elasticity of demand for instant noodles?',
    choices: ['0.5', '−2.0', '2.0', '−0.5'],
    answer: 3,
    explanation: 'Income elasticity is the percent change in quantity divided by the percent change in income: −10% / 20% = −0.5. The negative sign means instant noodles are an inferior good in this town. Keep the sign for income elasticity; dropping it would wrongly suggest a normal good, and −2.0 divides the wrong way around.',
    verify: 'numeric',
    solve: () => -10 / 20,
    reviewed: true,
  },
  {
    id: 'micro-elasticity-005',
    topic: 'elasticity',
    formulas: ['total-revenue-test'],
    difficulty: 2,
    prompt: 'For the linear demand curve shown, at what quantity is total revenue maximized?',
    figure: LINEAR_DEMAND,
    choices: ['100 units', '50 units', '30 units', '70 units'],
    answer: 1,
    explanation: 'Total revenue is largest at the midpoint of a linear demand curve, where demand is unit elastic: 50 units at $5 gives $250. Above the midpoint demand is elastic, so lowering price raises revenue; below it demand is inelastic, so lowering price further lowers revenue. At 100 units the price is $0, so revenue is zero.',
    verify: 'numeric',
    solve: () => {
      let best = 0;
      for (let q = 0; q <= 100; q++) if (q * demandPrice(q) > best * demandPrice(best)) best = q;
      return best;
    },
    reviewed: true,
  },
  {
    id: 'micro-elasticity-006',
    topic: 'elasticity',
    formulas: ['total-revenue-test'],
    difficulty: 3,
    prompt: 'Using the demand curve shown, the price falls from $8 to $6. Which correctly describes the change in total revenue and the price elasticity of demand in this range?',
    figure: LINEAR_DEMAND,
    choices: [
      'Total revenue falls, so demand is inelastic.',
      'Total revenue stays the same, so demand is unit elastic.',
      'Total revenue rises, so demand is inelastic.',
      'Total revenue rises, so demand is elastic.',
    ],
    answer: 3,
    explanation: 'At $8, quantity is 20 units and revenue is $160. At $6, quantity is 40 units and revenue is $240. Price and revenue moved in opposite directions, so demand is elastic between those prices, as it always is on the upper half of a linear demand curve. Although the slope is constant, elasticity is not.',
    reviewed: true,
  },
  {
    id: 'micro-elasticity-007',
    topic: 'elasticity',
    formulas: ['price-elasticity'],
    difficulty: 3,
    prompt: 'The price elasticity of demand for a video game is 2.0. If the publisher raises the price by 5%, by what percentage will the quantity demanded fall?',
    choices: ['2.5%', '10%', '5%', '0.4%'],
    answer: 1,
    explanation: 'Elasticity = %ΔQ / %ΔP, so %ΔQ = 2.0 × 5% = 10%. Because demand is elastic, the publisher\'s total revenue will fall. 2.5% comes from dividing 5% by 2.0 instead of multiplying.',
    verify: 'numeric',
    solve: () => 2.0 * 5,
    reviewed: true,
  },
  {
    id: 'micro-elasticity-008',
    topic: 'elasticity',
    formulas: ['supply-elasticity'],
    difficulty: 2,
    prompt: 'A stadium has exactly 40,000 seats for a championship game. If demand for tickets increases, then',
    choices: [
      'price and quantity both rise, because supply is elastic',
      'quantity rises but price does not change',
      'price falls, because more fans want tickets',
      'price rises but quantity does not change, because supply is perfectly inelastic',
    ],
    answer: 3,
    explanation: 'With a fixed number of seats, the supply curve is vertical at 40,000: quantity supplied cannot respond to price. A rightward shift in demand can only raise the price. Quantity rising with price would need an upward-sloping supply curve.',
    reviewed: true,
  },
  {
    id: 'micro-elasticity-009',
    topic: 'elasticity',
    formulas: ['cross-price'],
    difficulty: 2,
    prompt: 'The cross-price elasticity of demand between printers and printer ink is −1.5. This means printers and ink are',
    choices: ['complements', 'substitutes', 'inferior goods', 'normal goods'],
    answer: 0,
    explanation: 'A negative cross-price elasticity means a higher price of one good lowers the quantity demanded of the other, which is how goods used together behave. Substitutes have a positive cross-price elasticity. Whether a good is normal or inferior depends on income elasticity, not cross-price elasticity.',
    reviewed: true,
  },
];
