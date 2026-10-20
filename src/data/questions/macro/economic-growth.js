// AP Macroeconomics, Unit 5: measuring growth, the rule of 70, sources of
// productivity growth, and public policy and growth.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

const yearsToDouble = growthPercent => 70 / growthPercent;

// Real GDP (billions of dollars) and population (millions) for two years.
const GROWTH = { year1: { gdp: 500, population: 50 }, year2: { gdp: 530, population: 51 } };
const GROWTH_TABLE = {
  type: 'table',
  caption: 'Real GDP and population',
  columns: ['Year', 'Real GDP (billions $)', 'Population (millions)'],
  rows: [[1, GROWTH.year1.gdp, GROWTH.year1.population], [2, GROWTH.year2.gdp, GROWTH.year2.population]],
  alt: 'Table of real GDP and population. In year 1, real GDP is 500 billion dollars and population is 50 million. In year 2, real GDP is 530 billion dollars and population is 51 million.',
};
const perCapita = ({ gdp, population }) => (gdp * 1e9) / (population * 1e6);

export default [
  {
    id: 'macro-economic-growth-001',
    topic: 'economic-growth',
    formulas: ['rule-of-70'],
    difficulty: 1,
    prompt: 'A country\'s real GDP per capita grows at a steady 3.5% per year. About how many years will it take for real GDP per capita to double?',
    choices: ['35 years', '7 years', '20 years', '70 years'],
    answer: 2,
    explanation: 'By the rule of 70, doubling time ≈ 70 / growth rate = 70 / 3.5 = 20 years. 35 years divides 70 by 2 rather than by the growth rate.',
    verify: 'numeric',
    solve: () => yearsToDouble(3.5),
    reviewed: false,
  },
  {
    id: 'macro-economic-growth-002',
    topic: 'economic-growth',
    formulas: ['per-capita'],
    difficulty: 1,
    prompt: 'Which of the following is the best measure of a country\'s standard of living over time?',
    choices: ['Nominal GDP', 'Real GDP', 'Real GDP per capita', 'The consumer price index'],
    answer: 2,
    explanation: 'Real GDP per capita removes both inflation (by using real values) and population growth (by dividing by population), so it measures the average amount of goods and services per person. Real GDP alone can rise just because the population grew.',
    reviewed: false,
  },
  {
    id: 'macro-economic-growth-003',
    topic: 'economic-growth',
    formulas: ['per-capita', 'growth-rate'],
    difficulty: 3,
    prompt: 'Based on the table, by approximately what percentage did real GDP per capita grow from year 1 to year 2?',
    figure: GROWTH_TABLE,
    choices: ['6.0%', '3.9%', '2.0%', '8.0%'],
    answer: 1,
    explanation: 'Real GDP per capita is $10,000 in year 1 (500 billion / 50 million) and about $10,392 in year 2 (530 billion / 51 million), a growth rate of about 3.9%. 6.0% is the growth of total real GDP, ignoring the 2.0% population growth.',
    verify: 'numeric',
    solve: () => ((perCapita(GROWTH.year2) - perCapita(GROWTH.year1)) / perCapita(GROWTH.year1)) * 100,
    reviewed: false,
  },
  {
    id: 'macro-economic-growth-004',
    topic: 'economic-growth',
    difficulty: 2,
    prompt: 'Which of the following government policies is most likely to increase long-run economic growth?',
    choices: [
      'Increasing unemployment benefits during a recession',
      'Raising taxes on the returns to saving',
      'Selling government bonds to reduce the money supply',
      'Funding grants for job training and higher education',
    ],
    answer: 3,
    explanation: 'Education and training build human capital, which raises labor productivity and the economy\'s capacity to produce. Taxing saving would reduce funds for investment, and unemployment benefits and bond sales are short-run stabilization tools.',
    reviewed: false,
  },
  {
    id: 'macro-economic-growth-005',
    topic: 'economic-growth',
    difficulty: 1,
    prompt: 'Economic growth is shown on an AD-AS graph by',
    choices: [
      'a rightward shift of the long-run aggregate supply curve',
      'a rightward shift of the aggregate demand curve',
      'a movement along the short-run aggregate supply curve',
      'a leftward shift of the long-run aggregate supply curve',
    ],
    answer: 0,
    explanation: 'Long-run growth is an increase in the economy\'s potential output, which shifts LRAS (and the PPC) outward. An AD shift changes output only in the short run unless capacity also grows.',
    reviewed: false,
  },
  {
    id: 'macro-economic-growth-006',
    topic: 'economic-growth',
    difficulty: 2,
    prompt: 'A country\'s workers produce $2,400 billion of real output in 60 billion labor hours one year, and $2,700 billion in 60 billion labor hours the next year. By what percentage did labor productivity grow?',
    choices: ['12.5%', '11.1%', '25%', '0%'],
    answer: 0,
    explanation: 'Productivity is output per labor hour: $40 per hour in the first year and $45 the next. Growth = (45 − 40)/40 = 12.5%. 11.1% divides the change by the new value instead of the old one.',
    verify: 'numeric',
    solve: () => ((2700 / 60 - 2400 / 60) / (2400 / 60)) * 100,
    reviewed: false,
  },
  {
    id: 'macro-economic-growth-007',
    topic: 'economic-growth',
    difficulty: 3,
    prompt: 'A government gives firms a tax credit for buying new equipment. What is the most likely effect in both the short run and the long run?',
    choices: [
      'AD decreases in the short run, and LRAS shifts left in the long run.',
      'AD increases in the short run, and LRAS does not change in the long run.',
      'AD increases in the short run, and LRAS shifts right in the long run.',
      'Only SRAS shifts, and there is no long-run effect.',
    ],
    answer: 2,
    explanation: 'Firms spending on equipment is investment, part of AD, so AD shifts right in the short run. Over time, the added physical capital raises productivity and potential output, shifting LRAS right.',
    reviewed: false,
  },
  {
    id: 'macro-economic-growth-008',
    topic: 'economic-growth',
    formulas: ['rule-of-70'],
    difficulty: 3,
    prompt: 'Country A\'s real GDP per capita grows at 2% per year and Country B\'s at 7% per year. Using the rule of 70, how many more years does it take Country A than Country B to double its real GDP per capita?',
    choices: ['5', '10', '35', '25'],
    answer: 3,
    explanation: 'Country A doubles in about 70/2 = 35 years and Country B in about 70/7 = 10 years, so Country A takes 25 more years. 5 is just the difference in growth rates. Small differences in growth rates add up to large differences in living standards over time.',
    verify: 'numeric',
    solve: () => yearsToDouble(2) - yearsToDouble(7),
    reviewed: false,
  },
];
