// AP Macroeconomics, Unit 2: the circular flow, measuring GDP, and real
// versus nominal GDP.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// One year of national accounts for a made-up economy, in billions of dollars.
const ACCOUNTS = {
  consumption: 800, investment: 200, governmentPurchases: 250, transferPayments: 150, exports: 120, imports: 170,
};
const ACCOUNTS_TABLE = {
  type: 'table',
  caption: 'National accounts (billions of dollars)',
  columns: ['Item', 'Amount'],
  rows: [
    ['Consumption spending', ACCOUNTS.consumption],
    ['Gross private investment', ACCOUNTS.investment],
    ['Government purchases of goods and services', ACCOUNTS.governmentPurchases],
    ['Government transfer payments', ACCOUNTS.transferPayments],
    ['Exports', ACCOUNTS.exports],
    ['Imports', ACCOUNTS.imports],
  ],
  alt: 'Table of national accounts in billions of dollars: consumption 800, gross private investment 200, government purchases 250, transfer payments 150, exports 120, imports 170.',
};

// Two goods, base year 2024.
const OUTPUT = {
  2024: { pizzas: { price: 10, quantity: 100 }, books: { price: 20, quantity: 50 } },
  2025: { pizzas: { price: 12, quantity: 110 }, books: { price: 25, quantity: 60 } },
};
const OUTPUT_TABLE = {
  type: 'table',
  caption: 'Prices and quantities (base year 2024)',
  columns: ['Year', 'Pizza price ($)', 'Pizzas', 'Book price ($)', 'Books'],
  rows: [
    [2024, OUTPUT[2024].pizzas.price, OUTPUT[2024].pizzas.quantity, OUTPUT[2024].books.price, OUTPUT[2024].books.quantity],
    [2025, OUTPUT[2025].pizzas.price, OUTPUT[2025].pizzas.quantity, OUTPUT[2025].books.price, OUTPUT[2025].books.quantity],
  ],
  alt: 'Table of prices and quantities for an economy that makes pizzas and books. In 2024 pizzas cost $10 with 100 made and books cost $20 with 50 made. In 2025 pizzas cost $12 with 110 made and books cost $25 with 60 made.',
};
const valueAt = (pricesYear, quantitiesYear) => ['pizzas', 'books']
  .reduce((sum, good) => sum + OUTPUT[pricesYear][good].price * OUTPUT[quantitiesYear][good].quantity, 0);

export default [
  {
    id: 'macro-gdp-001',
    topic: 'gdp',
    difficulty: 1,
    prompt: 'Which of the following is included in this year\'s GDP of the United States?',
    choices: [
      'A used car sold by a dealer in the United States this year',
      'Shares of stock bought by a U.S. household',
      'A new house built in the United States this year',
      'Social Security payments to retirees',
    ],
    answer: 2,
    explanation: 'GDP counts the market value of final goods and services newly produced within the country in a given year, and a new house counts as investment. Used goods were counted when first made, stocks are financial assets, and Social Security is a transfer payment with no production in return.',
    reviewed: false,
  },
  {
    id: 'macro-gdp-002',
    topic: 'gdp',
    formulas: ['gdp-expenditure'],
    difficulty: 1,
    prompt: 'Based on the table, what is GDP, in billions of dollars?',
    figure: ACCOUNTS_TABLE,
    choices: ['1,200', '1,370', '1,350', '1,540'],
    answer: 0,
    explanation: 'GDP = C + I + G + Xn = 800 + 200 + 250 + (120 − 170) = 1,200. Transfer payments are left out because nothing is produced in exchange. 1,350 includes transfer payments, and 1,370 leaves out imports entirely, and 1,540 adds imports instead of subtracting them.',
    verify: 'numeric',
    solve: () => ACCOUNTS.consumption + ACCOUNTS.investment + ACCOUNTS.governmentPurchases + ACCOUNTS.exports - ACCOUNTS.imports,
    reviewed: false,
  },
  {
    id: 'macro-gdp-003',
    topic: 'gdp',
    difficulty: 2,
    prompt: 'In the circular flow model, households receive income from',
    choices: [
      'the product market, in exchange for goods and services',
      'the factor (resource) market, in exchange for land, labor and capital',
      'the government, in exchange for taxes',
      'firms, in exchange for consumption spending',
    ],
    answer: 1,
    explanation: 'Households own the factors of production and sell them to firms in the factor market, receiving wages, rent, interest and profit. In the product market, households are the buyers who spend that income.',
    reviewed: false,
  },
  {
    id: 'macro-gdp-004',
    topic: 'gdp',
    formulas: ['gdp-expenditure'],
    difficulty: 2,
    prompt: 'Based on the table, what is nominal GDP in 2025, in dollars?',
    figure: OUTPUT_TABLE,
    choices: ['2,100', '2,200', '2,300', '2,820'],
    answer: 3,
    explanation: 'Nominal GDP uses each year\'s own prices: 2025 output is 110 × $12 + 60 × $25 = $1,320 + $1,500 = $2,820. 2,300 is 2025 quantities at 2024 prices (real GDP), and 2,100 is 2024 nominal GDP.',
    verify: 'numeric',
    solve: () => valueAt(2025, 2025),
    reviewed: false,
  },
  {
    id: 'macro-gdp-005',
    topic: 'gdp',
    formulas: ['real-gdp', 'growth-rate'],
    difficulty: 3,
    prompt: 'Based on the table, by what percentage did real GDP grow from 2024 to 2025?',
    figure: OUTPUT_TABLE,
    choices: ['34.3%', '15.0%', '22.6%', '9.5%'],
    answer: 1,
    explanation: 'Real GDP values both years at base-year (2024) prices. 2024: 100 × $10 + 50 × $20 = $2,000. 2025: 110 × $10 + 60 × $20 = $2,300. Growth = (2,300 − 2,000) / 2,000 = 15.0%. 34.3% is the growth of nominal GDP ($2,100 to $2,820), which mixes in the rise in prices.',
    verify: 'numeric',
    solve: () => ((valueAt(2024, 2025) - valueAt(2024, 2024)) / valueAt(2024, 2024)) * 100,
    reviewed: false,
  },
  {
    id: 'macro-gdp-006',
    topic: 'gdp',
    formulas: ['gdp-deflator'],
    difficulty: 2,
    prompt: 'In a given year, nominal GDP is $15 trillion and real GDP is $12 trillion. What is the GDP deflator?',
    choices: ['80', '125', '150', '300'],
    answer: 1,
    explanation: 'GDP deflator = (nominal GDP / real GDP) × 100 = (15/12) × 100 = 125. 80 divides real by nominal. A deflator of 125 means prices are 25% higher than in the base year.',
    verify: 'numeric',
    solve: () => (15 / 12) * 100,
    reviewed: false,
  },
  {
    id: 'macro-gdp-007',
    topic: 'gdp',
    difficulty: 2,
    prompt: 'A U.S. company builds a factory in Mexico, and a Japanese company builds a factory in Ohio. How do the two factories\' output affect U.S. GDP?',
    choices: [
      'Only the Mexican factory\'s output counts in U.S. GDP.',
      'Both factories\' output counts in U.S. GDP.',
      'Neither factory\'s output counts in U.S. GDP.',
      'Only the Ohio factory\'s output counts in U.S. GDP.',
    ],
    answer: 3,
    explanation: 'GDP measures production within a country\'s borders, whoever owns the business. The Ohio factory\'s output counts in U.S. GDP; the Mexican factory\'s output counts in Mexico\'s GDP (and in U.S. GNP, not GDP).',
    reviewed: false,
  },
  {
    id: 'macro-gdp-008',
    topic: 'gdp',
    difficulty: 3,
    prompt: 'A firm produces $50 million of goods this year but sells only $40 million of them, keeping the rest in inventory. How does this year\'s GDP account for the unsold goods?',
    choices: [
      'They are not counted until they are sold.',
      'They are counted as consumption this year.',
      'They are counted as investment this year.',
      'They are subtracted from GDP as a loss.',
    ],
    answer: 2,
    explanation: 'GDP counts production in the year it happens. Goods added to inventory count as investment (a change in business inventories). When they are sold next year, consumption rises and inventory investment falls by the same amount, so they are not counted twice.',
    reviewed: false,
  },
];
