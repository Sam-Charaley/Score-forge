// AP Macroeconomics, Unit 2: price indices, the inflation rate, real versus
// nominal values, and the costs of inflation.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// A fixed market basket priced in three years; 2024 is the base year.
const BASKET = { movies: 5, sandwiches: 10 };
const PRICES = {
  2024: { movies: 10, sandwiches: 5 },
  2025: { movies: 12, sandwiches: 6 },
  2026: { movies: 13, sandwiches: 6.6 },
};
const BASKET_TABLE = {
  type: 'table',
  caption: 'Market basket: 5 movie tickets and 10 sandwiches (base year 2024)',
  columns: ['Year', 'Movie ticket ($)', 'Sandwich ($)'],
  rows: [
    [2024, PRICES[2024].movies, PRICES[2024].sandwiches],
    [2025, PRICES[2025].movies, PRICES[2025].sandwiches],
    [2026, PRICES[2026].movies, PRICES[2026].sandwiches],
  ],
  alt: 'Table of prices for a basket of 5 movie tickets and 10 sandwiches, base year 2024. In 2024 a ticket is $10 and a sandwich $5. In 2025 a ticket is $12 and a sandwich $6. In 2026 a ticket is $13 and a sandwich $6.60.',
};
const basketCost = year => BASKET.movies * PRICES[year].movies + BASKET.sandwiches * PRICES[year].sandwiches;
const cpi = year => (basketCost(year) / basketCost(2024)) * 100;

export default [
  {
    id: 'macro-inflation-001',
    topic: 'inflation',
    formulas: ['cpi'],
    difficulty: 1,
    prompt: 'Based on the table, what is the consumer price index (CPI) in 2025?',
    figure: BASKET_TABLE,
    choices: ['100', '83', '120', '150'],
    answer: 2,
    explanation: 'The basket costs 5 × $10 + 10 × $5 = $100 in 2024 and 5 × $12 + 10 × $6 = $120 in 2025. CPI = 120/100 × 100 = 120. 83 divides the base year by the current year, and 100 is the CPI of the base year itself.',
    verify: 'numeric',
    solve: () => cpi(2025),
    reviewed: true,
  },
  {
    id: 'macro-inflation-002',
    topic: 'inflation',
    formulas: ['cpi', 'inflation-rate'],
    difficulty: 3,
    prompt: 'Based on the table, what was the inflation rate from 2025 to 2026?',
    figure: BASKET_TABLE,
    choices: ['11.0%', '31.0%', '8.4%', '9.2%'],
    answer: 3,
    explanation: 'The basket costs $131 in 2026, so CPI is 131. Inflation = (131 − 120)/120 = 9.2%. 11.0% is just the change in index points, 31.0% is inflation since the base year, and 8.4% divides by the new CPI instead of the old one.',
    verify: 'numeric',
    solve: () => ((cpi(2026) - cpi(2025)) / cpi(2025)) * 100,
    reviewed: true,
  },
  {
    id: 'macro-inflation-003',
    topic: 'inflation',
    formulas: ['fisher'],
    difficulty: 1,
    prompt: 'A bank charges a nominal interest rate of 7% on a loan. If the expected inflation rate is 3%, what is the expected real interest rate?',
    choices: ['4%', '10%', '2.3%', '21%'],
    answer: 0,
    explanation: 'Real interest rate = nominal interest rate − inflation = 7% − 3% = 4%. 10% adds inflation instead of subtracting it.',
    verify: 'numeric',
    solve: () => 7 - 3,
    reviewed: true,
  },
  {
    id: 'macro-inflation-004',
    topic: 'inflation',
    difficulty: 2,
    prompt: 'A borrower and a lender agree on a fixed nominal interest rate, expecting 2% inflation. Actual inflation turns out to be 6%. Who is helped by the unexpected inflation?',
    choices: [
      'The lender, because the nominal interest rate rises',
      'The borrower, because the loan is repaid with dollars of less purchasing power',
      'Neither, because the nominal interest rate was fixed',
      'Both, because nominal incomes rise',
    ],
    answer: 1,
    explanation: 'The real interest rate turns out lower than both expected (fixed nominal rate minus 6% instead of minus 2%), so the borrower repays dollars worth less. The lender loses purchasing power. With a fixed rate, the nominal rate does not adjust.',
    reviewed: true,
  },
  {
    id: 'macro-inflation-005',
    topic: 'inflation',
    formulas: ['real-value'],
    difficulty: 2,
    prompt: 'A worker\'s nominal wage rose from $20 per hour to $22 per hour over a year in which the price level rose 10%. By what percentage did her real wage change?',
    choices: ['+10%', '+20%', '−10%', '0%'],
    answer: 3,
    explanation: 'Her nominal wage rose 10% ($2 on $20), the same as the price level, so her purchasing power is unchanged: real wage = $22 / 1.10 = $20 in starting-year dollars. A real wage rises only when the nominal wage grows faster than prices.',
    verify: 'numeric',
    solve: () => ((22 / 1.1 - 20) / 20) * 100,
    reviewed: true,
  },
  {
    id: 'macro-inflation-006',
    topic: 'inflation',
    difficulty: 2,
    prompt: 'Which of the following is most likely to cause cost-push inflation?',
    choices: [
      'A sharp increase in the world price of oil',
      'A large increase in government spending',
      'A decrease in personal income taxes',
      'An increase in consumer confidence',
    ],
    answer: 0,
    explanation: 'Cost-push inflation comes from higher production costs, which shift short-run aggregate supply left. Oil is an input to most production. The other choices raise aggregate demand, which causes demand-pull inflation.',
    reviewed: true,
  },
  {
    id: 'macro-inflation-007',
    topic: 'inflation',
    difficulty: 2,
    prompt: 'The CPI may overstate the true increase in the cost of living because',
    choices: [
      'it includes the prices of imported goods',
      'it measures only the prices of goods produced domestically',
      'consumers substitute toward goods whose prices rose less, but the basket stays fixed',
      'the base year is changed every year',
    ],
    answer: 2,
    explanation: 'The CPI prices a fixed basket, but when a good gets relatively expensive, people buy less of it and more of cheaper substitutes. The fixed basket misses this, so it overstates how much more it costs to live as well as before. The CPI does include imported consumer goods.',
    reviewed: true,
  },
  {
    id: 'macro-inflation-008',
    topic: 'inflation',
    formulas: ['real-value'],
    difficulty: 3,
    prompt: 'A family\'s nominal income was $50,000 in a year when the CPI was 100 and $66,000 in a later year when the CPI was 120. By what percentage did the family\'s real income change?',
    choices: ['+32%', '+10%', '+12%', '−10%'],
    answer: 1,
    explanation: 'Real income in the later year is $66,000 / 120 × 100 = $55,000 in base-year dollars. Compared with $50,000, that is a 10% increase. 32% is the nominal increase, and 12% subtracts the 20% inflation from the 32% nominal rise, which only approximates the real change.',
    verify: 'numeric',
    solve: () => (((66000 / 120) * 100 - 50000) / 50000) * 100,
    reviewed: true,
  },
];
