// AP Macroeconomics, Unit 5: government deficits and the national debt,
// crowding out, and the long-run effects of deficit spending.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// A government's budget over three years; debt was 1,000 at the start.
const STARTING_DEBT = 1000;
const BUDGETS = [
  { year: 1, revenue: 400, spending: 450 },
  { year: 2, revenue: 420, spending: 500 },
  { year: 3, revenue: 470, spending: 440 },
];
const BUDGET_TABLE = {
  type: 'table',
  caption: 'Government budget (billions of dollars)',
  columns: ['Year', 'Tax revenue', 'Government spending'],
  rows: BUDGETS.map(b => [b.year, b.revenue, b.spending]),
  alt: 'Table of a government budget in billions of dollars. Year 1: revenue 400, spending 450. Year 2: revenue 420, spending 500. Year 3: revenue 470, spending 440.',
};
const debtAfter = years => BUDGETS.slice(0, years).reduce((debt, b) => debt + b.spending - b.revenue, STARTING_DEBT);

export default [
  {
    id: 'macro-deficits-crowding-out-001',
    topic: 'deficits-crowding-out',
    difficulty: 1,
    prompt: 'Which of the following correctly distinguishes a budget deficit from the national debt?',
    choices: [
      'A deficit is the total amount the government owes; the debt is one year\'s shortfall.',
      'A deficit is one year\'s spending above tax revenue; the debt is the total of past deficits minus past surpluses.',
      'A deficit is owed to foreigners; the debt is owed to citizens.',
      'They are two names for the same thing.',
    ],
    answer: 1,
    explanation: 'A deficit is a flow: how much spending exceeds revenue in one year. The debt is a stock: the accumulated total the government owes from all past deficits, minus any surpluses. Each deficit adds to the debt.',
    reviewed: false,
  },
  {
    id: 'macro-deficits-crowding-out-002',
    topic: 'deficits-crowding-out',
    difficulty: 2,
    prompt: 'The government\'s debt was $1,000 billion at the start of year 1. Based on the table, what is the debt at the end of year 3, in billions of dollars?',
    figure: BUDGET_TABLE,
    choices: ['1,160', '1,000', '1,100', '160'],
    answer: 2,
    explanation: 'Year 1 deficit: 450 − 400 = 50. Year 2 deficit: 500 − 420 = 80. Year 3 surplus: 470 − 440 = 30, which pays debt down. Debt = 1,000 + 50 + 80 − 30 = 1,100. 1,160 adds the year 3 surplus as if it were a deficit.',
    verify: 'numeric',
    solve: () => debtAfter(3),
    reviewed: false,
  },
  {
    id: 'macro-deficits-crowding-out-003',
    topic: 'deficits-crowding-out',
    difficulty: 1,
    prompt: 'Crowding out occurs when',
    choices: [
      'government borrowing raises real interest rates and reduces private investment',
      'imports replace domestically produced goods',
      'the Federal Reserve buys bonds and lowers interest rates',
      'higher taxes reduce government spending',
    ],
    answer: 0,
    explanation: 'When the government borrows to finance a deficit, it competes with private borrowers for loanable funds. The real interest rate rises, and interest-sensitive private investment falls, offsetting part of the fiscal stimulus.',
    reviewed: false,
  },
  {
    id: 'macro-deficits-crowding-out-004',
    topic: 'deficits-crowding-out',
    difficulty: 2,
    prompt: 'If persistent government deficits crowd out private investment, what is the most likely long-run effect on the economy?',
    choices: [
      'A faster rate of economic growth because of higher government spending',
      'A lower natural rate of unemployment',
      'A slower rate of growth in the capital stock and in potential output',
      'A permanent increase in the price level only, with no effect on output',
    ],
    answer: 2,
    explanation: 'Less private investment means less new physical capital. With a smaller capital stock than otherwise, productivity and potential output (LRAS) grow more slowly. That is the main long-run cost of crowding out.',
    reviewed: false,
  },
  {
    id: 'macro-deficits-crowding-out-005',
    topic: 'deficits-crowding-out',
    difficulty: 2,
    prompt: 'With no change in tax laws or spending programs, what typically happens to the federal budget deficit during a recession?',
    choices: [
      'It shrinks, because the government spends less on unemployment benefits.',
      'It does not change, because no new laws were passed.',
      'It turns into a surplus, because interest rates fall.',
      'It grows, because tax revenue falls and transfer payments rise.',
    ],
    answer: 3,
    explanation: 'Automatic stabilizers work through the budget: as incomes fall, income tax collections drop, and spending on unemployment insurance and other transfers rises. The deficit grows even without new legislation.',
    reviewed: false,
  },
  {
    id: 'macro-deficits-crowding-out-006',
    topic: 'deficits-crowding-out',
    difficulty: 3,
    prompt: 'The government increases spending, financed by borrowing. Which of the following would most reduce the crowding-out effect on private investment?',
    choices: [
      'The Federal Reserve sells government bonds at the same time.',
      'The Federal Reserve buys government bonds at the same time.',
      'Households reduce their saving at the same time.',
      'The government raises the reserve requirement.',
    ],
    answer: 1,
    explanation: 'Crowding out works through higher interest rates. If the Fed buys bonds, it expands the money supply and holds interest rates down, so private investment falls less. Selling bonds, lower saving and a higher reserve requirement would all push rates up further.',
    reviewed: false,
  },
  {
    id: 'macro-deficits-crowding-out-007',
    topic: 'deficits-crowding-out',
    difficulty: 2,
    prompt: 'A large national debt can impose a burden on future generations mainly because',
    choices: [
      'the government can never repay debt that is owed to its own citizens',
      'debt held by the public directly reduces GDP',
      'interest payments on the debt use tax revenue that could fund other purposes',
      'a larger debt always lowers the price level',
    ],
    answer: 2,
    explanation: 'Interest on the debt must be paid every year, so future taxpayers bear higher taxes or give up other government spending. A large debt can also mean a smaller capital stock if deficits crowded out investment.',
    reviewed: false,
  },
  {
    id: 'macro-deficits-crowding-out-008',
    topic: 'deficits-crowding-out',
    difficulty: 3,
    prompt: 'An economy is in a deep recession with very low interest rates and little private investment. Compared with an economy at full employment, an increase in deficit spending in this recession is likely to cause',
    choices: [
      'more crowding out, because interest rates are already low',
      'a decrease in real GDP, because crowding out is complete',
      'no change in aggregate demand',
      'less crowding out, because there are many unused loanable funds and resources',
    ],
    answer: 3,
    explanation: 'In a deep recession, private demand for loans is weak and resources are idle, so extra government borrowing raises interest rates only a little and displaces little private investment. At full employment, the same borrowing pushes rates up more and crowds out more.',
    reviewed: false,
  },
];
