// AP Macroeconomics, Unit 4: the loanable funds market, the real interest
// rate, and what shifts the supply of and demand for loanable funds.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// Demand r = 10 − Q/50 and supply r = Q/50 (Q in billions), crossing at 250 and 5%.
const SLOPE = 50;
const LOANABLE_FUNDS = {
  type: 'graph', xLabel: 'Quantity of loanable funds (billions $)', yLabel: 'Real interest rate (%)', xMax: 500, xStep: 50, yMin: 0, yMax: 10, yStep: 1,
  series: [
    { points: [[0, 10], [500, 0]], label: 'D' },
    { points: [[0, 0], [500, 10]], label: 'S' },
  ],
  alt: 'Loanable funds graph with the quantity of loanable funds in billions of dollars on the horizontal axis and the real interest rate in percent on the vertical axis. Demand D slopes down from 10% at 0 to 0% at 500 billion. Supply S slopes up from 0% at 0 to 10% at 500 billion. They cross at 250 billion and 5%.',
};
// Where supply r = Q/SLOPE meets a demand curve shifted right by `shift` billions.
const rateAfterDemandShift = shift => (10 + shift / SLOPE) / 2;

export default [
  {
    id: 'macro-loanable-funds-001',
    topic: 'loanable-funds',
    difficulty: 1,
    prompt: 'Based on the loanable funds graph, what is the equilibrium real interest rate?',
    figure: LOANABLE_FUNDS,
    choices: ['2.5%', '5%', '7.5%', '10%'],
    answer: 1,
    explanation: 'Demand and supply cross at 250 billion, where r = 250/50 = 5%. At that rate, the amount savers want to lend equals the amount borrowers want to borrow.',
    verify: 'numeric',
    solve: () => rateAfterDemandShift(0),
    reviewed: false,
  },
  {
    id: 'macro-loanable-funds-002',
    topic: 'loanable-funds',
    difficulty: 1,
    prompt: 'Households decide to save a larger share of their incomes. In the loanable funds market, what happens?',
    choices: [
      'Demand increases, and the real interest rate rises.',
      'Supply decreases, and the real interest rate rises.',
      'Supply increases, and the real interest rate falls.',
      'Demand decreases, and the real interest rate falls.',
    ],
    answer: 2,
    explanation: 'Saving is the source of loanable funds, so more saving shifts supply to the right. The real interest rate falls and the quantity of loans rises.',
    reviewed: false,
  },
  {
    id: 'macro-loanable-funds-003',
    topic: 'loanable-funds',
    difficulty: 2,
    prompt: 'The government increases its budget deficit and borrows to finance it. In the loanable funds market, what happens to the real interest rate and to private investment?',
    choices: [
      'The real interest rate rises, and private investment falls.',
      'The real interest rate falls, and private investment rises.',
      'The real interest rate rises, and private investment rises.',
      'The real interest rate does not change, and private investment falls.',
    ],
    answer: 0,
    explanation: 'Government borrowing increases the demand for loanable funds (or, in another common model, lowers the supply through negative public saving). Either way, the real interest rate rises and some private investment is crowded out.',
    reviewed: false,
  },
  {
    id: 'macro-loanable-funds-004',
    topic: 'loanable-funds',
    difficulty: 3,
    prompt: 'Based on the loanable funds graph, the government borrows an extra $100 billion at every real interest rate, shifting demand to the right by $100 billion. What is the new equilibrium real interest rate?',
    figure: LOANABLE_FUNDS,
    choices: ['5%', '7%', '6%', '8%'],
    answer: 2,
    explanation: 'The new demand curve is r = 12 − Q/50. Setting it equal to supply, Q/50: 12 − Q/50 = Q/50 gives Q = 300 billion and r = 6%. 7% reads the new demand curve at the old quantity of 250 billion, as if the quantity supplied could not respond to a higher rate.',
    verify: 'numeric',
    solve: () => rateAfterDemandShift(100),
    reviewed: false,
  },
  {
    id: 'macro-loanable-funds-005',
    topic: 'loanable-funds',
    difficulty: 2,
    prompt: 'Which of the following would increase the demand for loanable funds?',
    choices: [
      'An increase in household saving',
      'A decrease in the government budget deficit',
      'A capital inflow from foreign savers',
      'An investment tax credit that makes new equipment more profitable',
    ],
    answer: 3,
    explanation: 'Firms borrow to invest, so a tax credit that raises the expected return on investment increases the demand for loanable funds. More saving and foreign capital inflows increase supply, and a smaller deficit lowers government borrowing.',
    reviewed: false,
  },
  {
    id: 'macro-loanable-funds-006',
    topic: 'loanable-funds',
    difficulty: 2,
    prompt: 'Foreign investors begin buying more financial assets in the United States. In the U.S. loanable funds market, what happens?',
    choices: [
      'Demand increases, and the real interest rate rises.',
      'Supply increases, and the real interest rate falls.',
      'Supply decreases, and the real interest rate rises.',
      'Demand decreases, and the real interest rate falls.',
    ],
    answer: 1,
    explanation: 'Foreign purchases of U.S. assets are a capital inflow: foreign saving lent in the United States. That adds to the supply of loanable funds, lowering the real interest rate.',
    reviewed: false,
  },
  {
    id: 'macro-loanable-funds-007',
    topic: 'loanable-funds',
    formulas: ['fisher'],
    difficulty: 2,
    prompt: 'The nominal interest rate on a loan is 9%, and expected inflation is 4%. The loanable funds market is drawn with which interest rate on its vertical axis, and what is that rate here?',
    choices: [
      'The nominal interest rate, 9%',
      'The real interest rate, 13%',
      'The real interest rate, 5%',
      'The nominal interest rate, 4%',
    ],
    answer: 2,
    explanation: 'Savers and borrowers care about purchasing power, so the loanable funds market uses the real interest rate: 9% − 4% = 5%. The money market, by contrast, is drawn with the nominal interest rate.',
    reviewed: false,
  },
  {
    id: 'macro-loanable-funds-008',
    topic: 'loanable-funds',
    difficulty: 3,
    prompt: 'A government that had been running a budget deficit begins running a budget surplus. In the long run, what is the most likely effect?',
    choices: [
      'Higher real interest rates and a slower rate of economic growth',
      'Lower real interest rates and a faster rate of economic growth',
      'Higher real interest rates and a faster rate of economic growth',
      'Lower real interest rates and a slower rate of economic growth',
    ],
    answer: 1,
    explanation: 'A surplus adds public saving to the supply of loanable funds (or removes government borrowing from demand), lowering the real interest rate. Lower rates encourage private investment in capital, which raises productive capacity and long-run growth.',
    reviewed: false,
  },
];
