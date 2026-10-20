// AP Macroeconomics, Unit 4: the money market, bond prices and interest
// rates, and the Fed's tools in limited and ample reserve systems.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// Money demand i = 10 − Q/40 (Q in billions), money supply vertical at 200.
const moneyDemandRate = quantity => 10 - quantity / 40;
const MONEY_SUPPLY = 200;
const MONEY_MARKET = {
  type: 'graph', xLabel: 'Quantity of money (billions $)', yLabel: 'Nominal interest rate (%)', xMax: 400, xStep: 50, yMin: 0, yMax: 10, yStep: 1,
  series: [
    { points: [[0, 10], [400, 0]], label: 'MD' },
    { points: [[MONEY_SUPPLY, 0], [MONEY_SUPPLY, 10]], label: 'MS' },
  ],
  alt: 'Money market graph with the quantity of money in billions of dollars on the horizontal axis and the nominal interest rate in percent on the vertical axis. Money demand MD slopes down from 10% at 0 to 0% at 400 billion. Money supply MS is vertical at 200 billion.',
};

export default [
  {
    id: 'macro-monetary-policy-001',
    topic: 'monetary-policy',
    difficulty: 1,
    prompt: 'Which of the following open-market operations would the Federal Reserve use to fight a recession?',
    choices: [
      'Selling government bonds to banks',
      'Raising the discount rate',
      'Raising the reserve requirement',
      'Buying government bonds from banks',
    ],
    answer: 3,
    explanation: 'When the Fed buys bonds, it pays with new reserves, which increases the money supply and lowers interest rates, raising investment and aggregate demand. Selling bonds, raising the discount rate and raising the reserve requirement are all contractionary.',
    reviewed: false,
  },
  {
    id: 'macro-monetary-policy-002',
    topic: 'monetary-policy',
    difficulty: 1,
    prompt: 'Based on the money market graph, what is the equilibrium nominal interest rate?',
    figure: MONEY_MARKET,
    choices: ['5%', '10%', '2.5%', '7.5%'],
    answer: 0,
    explanation: 'Equilibrium is where money demand crosses the vertical money supply at 200 billion: i = 10 − 200/40 = 5%. At a higher rate, people would want to hold less money than the amount supplied.',
    verify: 'numeric',
    solve: () => moneyDemandRate(MONEY_SUPPLY),
    reviewed: false,
  },
  {
    id: 'macro-monetary-policy-003',
    topic: 'monetary-policy',
    difficulty: 2,
    prompt: 'Based on the money market graph, if the Federal Reserve increases the money supply to $300 billion, what will the new equilibrium nominal interest rate be?',
    figure: MONEY_MARKET,
    choices: ['7.5%', '5%', '2.5%', '1%'],
    answer: 2,
    explanation: 'The money supply shifts right to 300 billion, and money demand there gives i = 10 − 300/40 = 2.5%. More money with the same demand lowers the interest rate.',
    verify: 'numeric',
    solve: () => moneyDemandRate(300),
    reviewed: false,
  },
  {
    id: 'macro-monetary-policy-004',
    topic: 'monetary-policy',
    difficulty: 2,
    prompt: 'The Federal Reserve sells government bonds on the open market. In the short run, what happens to the nominal interest rate, investment spending and real GDP?',
    choices: [
      'Interest rate falls, investment rises, real GDP rises',
      'Interest rate rises, investment falls, real GDP falls',
      'Interest rate rises, investment rises, real GDP rises',
      'Interest rate falls, investment falls, real GDP falls',
    ],
    answer: 1,
    explanation: 'Selling bonds removes reserves from banks and shrinks the money supply, so the nominal interest rate rises. Borrowing costs more, so interest-sensitive investment falls, AD shifts left and real GDP falls.',
    reviewed: false,
  },
  {
    id: 'macro-monetary-policy-005',
    topic: 'monetary-policy',
    difficulty: 2,
    prompt: 'In a banking system with ample reserves, which action would the Federal Reserve most likely take to raise the federal funds rate?',
    choices: [
      'Buy government bonds',
      'Lower the reserve requirement',
      'Raise the interest rate it pays on reserve balances',
      'Lower the discount rate',
    ],
    answer: 2,
    explanation: 'With ample reserves, small open-market operations barely move the federal funds rate. Instead the Fed uses administered rates: banks will not lend reserves for less than the interest the Fed pays on reserves, so raising that rate pulls the federal funds rate up. The other choices would lower rates.',
    reviewed: false,
  },
  {
    id: 'macro-monetary-policy-006',
    topic: 'monetary-policy',
    difficulty: 2,
    prompt: 'Holding the money supply constant, an increase in nominal GDP will cause which of the following in the money market?',
    choices: [
      'Money demand increases, and the nominal interest rate rises.',
      'Money demand decreases, and the nominal interest rate falls.',
      'Money supply increases, and the nominal interest rate falls.',
      'Money demand increases, and the nominal interest rate falls.',
    ],
    answer: 0,
    explanation: 'With more spending and higher prices, people need more money for transactions, so money demand shifts right. With a fixed money supply, the equilibrium nominal interest rate rises.',
    reviewed: false,
  },
  {
    id: 'macro-monetary-policy-007',
    topic: 'monetary-policy',
    difficulty: 3,
    prompt: 'The Federal Reserve buys a large amount of government bonds on the open market. What happens to bond prices and bond yields (interest rates)?',
    choices: [
      'Bond prices fall, and bond yields fall.',
      'Bond prices fall, and bond yields rise.',
      'Bond prices rise, and bond yields rise.',
      'Bond prices rise, and bond yields fall.',
    ],
    answer: 3,
    explanation: 'Fed purchases raise the demand for bonds, pushing bond prices up. A bond pays a fixed amount, so paying more for it means a lower yield. Bond prices and interest rates always move in opposite directions.',
    reviewed: false,
  },
  {
    id: 'macro-monetary-policy-008',
    topic: 'monetary-policy',
    formulas: ['money-multiplier'],
    difficulty: 3,
    prompt: 'In a limited reserves system, the Federal Reserve raises the reserve requirement from 10% to 20%. What happens to the money multiplier and to the money supply?',
    choices: [
      'The money multiplier rises from 5 to 10, and the money supply increases.',
      'The money multiplier falls from 10 to 5, and the money supply decreases.',
      'The money multiplier falls from 10 to 5, and the money supply increases.',
      'The money multiplier does not change, and the money supply decreases.',
    ],
    answer: 1,
    explanation: 'The money multiplier is 1/reserve requirement, which falls from 1/0.10 = 10 to 1/0.20 = 5. Banks must hold more of each deposit, so they can lend less and the money supply shrinks. This is contractionary.',
    reviewed: false,
  },
];
