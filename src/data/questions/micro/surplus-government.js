// AP Microeconomics, Unit 2: consumer and producer surplus, price controls,
// per-unit taxes and deadweight loss, and international trade and tariffs.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// Market A: demand and supply cross at Q = 50, P = $5.
const demandA = q => 10 - 0.1 * q;
const supplyA = q => 1 + 0.08 * q;
const quantityDemandedA = p => (10 - p) / 0.1;
const quantitySuppliedA = p => (p - 1) / 0.08;
const EQ_A = { q: 50, p: 5 };
const MARKET_A = {
  type: 'graph', xLabel: 'Quantity (units)', yLabel: 'Price ($)', xMax: 100, xStep: 10, yMin: 0, yMax: 10, yStep: 1,
  series: [
    { points: [[0, demandA(0)], [100, demandA(100)]], label: 'D' },
    { points: [[0, supplyA(0)], [100, supplyA(100)]], label: 'S' },
  ],
  alt: 'Supply and demand graph. Demand D falls in a straight line from $10 at 0 units to $0 at 100 units. Supply S rises in a straight line from $1 at 0 units to $9 at 100 units. They cross at 50 units and $5.',
};

// Market B: a $2 per-unit tax on sellers shifts supply up by $2.
const TAX = 2;
const demandB = q => 12 - 0.1 * q;
const supplyB = q => 2 + 0.1 * q;
const taxedSupplyB = q => supplyB(q) + TAX;
// Where demand meets supply: 12 − 0.1q = c + 0.1q.
const crossing = intercept => (12 - intercept) / 0.2;
const Q_NO_TAX = crossing(2);
const Q_TAXED = crossing(2 + TAX);
const TAX_MARKET = {
  type: 'graph', xLabel: 'Quantity (units)', yLabel: 'Price ($)', xMax: 120, xStep: 20, yMin: 0, yMax: 14, yStep: 2,
  series: [
    { points: [[0, demandB(0)], [120, demandB(120)]], label: 'D' },
    { points: [[0, supplyB(0)], [120, supplyB(120)]], label: 'S' },
    { points: [[0, taxedSupplyB(0)], [100, taxedSupplyB(100)]], label: 'S + tax' },
  ],
  alt: 'Market with a per-unit tax. Demand D falls from $12 at 0 units to $0 at 120 units. Supply S rises from $2 at 0 units to $14 at 120 units. S + tax lies $2 above S, rising from $4 at 0 units to $14 at 100 units. D and S cross at 50 units and $7. D and S + tax cross at 40 units and $8.',
};

export default [
  {
    id: 'micro-surplus-government-001',
    topic: 'surplus-government',
    formulas: ['consumer-surplus'],
    difficulty: 2,
    prompt: 'Using the graph, what is consumer surplus at the market equilibrium, in dollars?',
    figure: MARKET_A,
    choices: ['250', '100', '125', '200'],
    answer: 2,
    explanation: 'Consumer surplus is the triangle below demand and above the $5 price, out to 50 units: ½ × 50 × ($10 − $5) = $125. $100 is producer surplus, the triangle above supply and below the price (½ × 50 × $4), and $250 forgets the ½.',
    verify: 'numeric',
    solve: () => 0.5 * EQ_A.q * (demandA(0) - EQ_A.p),
    reviewed: true,
  },
  {
    id: 'micro-surplus-government-002',
    topic: 'surplus-government',
    difficulty: 2,
    prompt: 'Using the graph, the government sets a price ceiling of $3. How large is the resulting shortage?',
    figure: MARKET_A,
    choices: ['25 units', '45 units', '70 units', '20 units'],
    answer: 1,
    explanation: 'A ceiling below the $5 equilibrium is binding. At $3 buyers want 70 units but sellers supply only 25, so the shortage is 70 − 25 = 45 units. 25 units is the quantity actually sold, and 70 units is only the quantity demanded.',
    verify: 'numeric',
    solve: () => quantityDemandedA(3) - quantitySuppliedA(3),
    reviewed: true,
  },
  {
    id: 'micro-surplus-government-003',
    topic: 'surplus-government',
    difficulty: 1,
    prompt: 'A minimum wage set above the equilibrium wage in a competitive labor market will most likely cause',
    choices: [
      'a shortage of workers',
      'no change in employment, because the wage is above equilibrium',
      'a surplus of labor, meaning unemployment',
      'an increase in the number of workers hired',
    ],
    answer: 2,
    explanation: 'A binding price floor holds the price above equilibrium. At the higher wage, more people want to work but firms want to hire fewer, so quantity supplied of labor exceeds quantity demanded: a surplus of labor. A shortage comes from a price held below equilibrium, as with a binding ceiling.',
    reviewed: true,
  },
  {
    id: 'micro-surplus-government-004',
    topic: 'surplus-government',
    formulas: ['tax-revenue'],
    difficulty: 2,
    prompt: `The graph shows a market before and after the government places a $${TAX} per-unit tax on sellers. How much tax revenue does the government collect, in dollars?`,
    figure: TAX_MARKET,
    choices: ['100', '80', '40', '20'],
    answer: 1,
    explanation: 'After the tax, the market trades where D meets S + tax: 40 units. Revenue is the tax per unit times the quantity sold after the tax, $2 × 40 = $80. $100 uses the pre-tax quantity of 50 units, which is no longer traded.',
    verify: 'numeric',
    solve: () => TAX * Q_TAXED,
    reviewed: true,
  },
  {
    id: 'micro-surplus-government-005',
    topic: 'surplus-government',
    formulas: ['deadweight-loss'],
    difficulty: 3,
    prompt: `Using the graph of the $${TAX} per-unit tax, what is the deadweight loss caused by the tax, in dollars?`,
    figure: TAX_MARKET,
    choices: ['20', '80', '5', '10'],
    answer: 3,
    explanation: 'Deadweight loss is the triangle between the pre-tax quantity (50) and the after-tax quantity (40), with a height equal to the $2 tax: ½ × 10 × $2 = $10. $20 forgets the ½, and $80 is the tax revenue, which is transferred to the government rather than lost.',
    verify: 'numeric',
    solve: () => 0.5 * (Q_NO_TAX - Q_TAXED) * TAX,
    reviewed: true,
  },
  {
    id: 'micro-surplus-government-006',
    topic: 'surplus-government',
    difficulty: 3,
    prompt: `Using the graph of the $${TAX} per-unit tax, which describes who bears the burden of the tax?`,
    figure: TAX_MARKET,
    choices: [
      'Buyers pay $1 more per unit and sellers keep $1 less per unit.',
      'Sellers bear the whole tax, because the tax is collected from them.',
      'Buyers bear the whole tax, because the price rises by $2.',
      'Buyers pay $2 more per unit and sellers keep $1 less per unit.',
    ],
    answer: 0,
    explanation: 'Before the tax the price was $7. After it, buyers pay $8 and sellers keep $8 − $2 = $6, so each side bears $1. Here demand and supply are equally steep, so the burden splits evenly; the more inelastic side would bear more. Who writes the check to the government does not decide who bears the burden.',
    reviewed: true,
  },
  {
    id: 'micro-surplus-government-007',
    topic: 'surplus-government',
    difficulty: 1,
    prompt: 'In a competitive market with no externalities, total economic surplus is maximized when',
    choices: [
      'the government sets a price above equilibrium',
      'the market produces the equilibrium quantity',
      'consumer surplus equals producer surplus',
      'the price is as low as possible',
    ],
    answer: 1,
    explanation: 'At the competitive equilibrium, every unit whose value to buyers exceeds its cost to sellers is traded, and no others, so the sum of consumer and producer surplus is as large as it can be. Consumer and producer surplus do not need to be equal, and price controls that move quantity away from equilibrium create deadweight loss.',
    reviewed: true,
  },
  {
    id: 'micro-surplus-government-008',
    topic: 'surplus-government',
    difficulty: 2,
    prompt: 'A country that did not trade steel opens its market to trade. The world price of steel is below its domestic equilibrium price. As a result,',
    choices: [
      'the country exports steel, and domestic producers gain',
      'domestic consumers lose surplus and domestic producers gain surplus',
      'the country imports steel, domestic consumers gain and domestic producers lose',
      'domestic quantity produced rises, and imports fall to zero',
    ],
    answer: 2,
    explanation: 'At the lower world price, domestic buyers want more steel than domestic firms will make, and imports fill the gap. Consumers gain surplus from the lower price and producers lose some because they sell less at a lower price. Consumers gain more than producers lose, so total surplus rises. Exports would happen only if the world price were above the domestic price.',
    reviewed: true,
  },
  {
    id: 'micro-surplus-government-009',
    topic: 'surplus-government',
    difficulty: 2,
    prompt: 'A country that imports sugar places a tariff on sugar imports. Compared with free trade, which of the following happens?',
    choices: [
      'The domestic price falls, and consumer surplus rises.',
      'Imports rise, and domestic production falls.',
      'Total surplus rises, because the government earns tariff revenue.',
      'The domestic price rises, domestic production rises and imports fall.',
    ],
    answer: 3,
    explanation: 'A tariff raises the price of imported sugar, so the domestic price rises. Domestic producers sell more, buyers buy less, and imports shrink from both sides. Consumers lose more surplus than producers and the government gain, so the tariff creates deadweight loss even though it raises revenue.',
    reviewed: true,
  },
];
