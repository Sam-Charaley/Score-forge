// AP Macroeconomics, Unit 6: exchange rates, the foreign exchange market,
// and how policy and interest rates affect currencies and net exports.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// The market for U.S. dollars, priced in euros: demand and supply cross at
// 50 billion dollars and 0.8 euro per dollar.
const EUROS_PER_DOLLAR = 0.8;
const DOLLAR_MARKET = {
  type: 'graph', xLabel: 'Quantity of dollars (billions)', yLabel: 'Euros per dollar', xMax: 100, xStep: 10, yMin: 0, yMax: 1.6, yStep: 0.2,
  series: [
    { points: [[0, 1.6], [100, 0]], label: 'D' },
    { points: [[0, 0], [100, 1.6]], label: 'S' },
  ],
  alt: 'Foreign exchange market for U.S. dollars, with the quantity of dollars in billions on the horizontal axis and the price of a dollar in euros on the vertical axis. Demand D slopes down from 1.6 euros at 0 to 0 at 100 billion. Supply S slopes up from 0 at 0 to 1.6 euros at 100 billion. They cross at 50 billion dollars and 0.8 euro per dollar.',
};

export default [
  {
    id: 'macro-foreign-exchange-001',
    topic: 'foreign-exchange',
    difficulty: 1,
    prompt: 'Based on the graph of the foreign exchange market for U.S. dollars, what is the equilibrium exchange rate, in euros per dollar?',
    figure: DOLLAR_MARKET,
    choices: ['0.4', '0.8', '1.25', '1.6'],
    answer: 1,
    explanation: 'Demand and supply for dollars cross at 50 billion dollars, where one dollar trades for 0.8 euro. 1.25 is the same rate expressed the other way, in dollars per euro.',
    verify: 'numeric',
    solve: () => EUROS_PER_DOLLAR,
    reviewed: false,
  },
  {
    id: 'macro-foreign-exchange-002',
    topic: 'foreign-exchange',
    difficulty: 1,
    prompt: 'If 1 U.S. dollar trades for 0.8 euro, how many dollars does 1 euro buy?',
    choices: ['0.8', '1.8', '0.2', '1.25'],
    answer: 3,
    explanation: 'An exchange rate in one direction is the reciprocal of the other: 1 / 0.8 = 1.25 dollars per euro.',
    verify: 'numeric',
    solve: () => 1 / EUROS_PER_DOLLAR,
    reviewed: false,
  },
  {
    id: 'macro-foreign-exchange-003',
    topic: 'foreign-exchange',
    difficulty: 2,
    prompt: 'At an exchange rate of 0.8 euro per dollar, a bicycle that costs 400 euros in Germany costs how many U.S. dollars?',
    choices: ['320', '400', '500', '420'],
    answer: 2,
    explanation: 'Each dollar buys 0.8 euro, so 400 euros cost 400 / 0.8 = 500 dollars. 320 multiplies by the rate instead of dividing, which would be the price in euros of a 400-dollar item.',
    verify: 'numeric',
    solve: () => 400 / EUROS_PER_DOLLAR,
    reviewed: false,
  },
  {
    id: 'macro-foreign-exchange-004',
    topic: 'foreign-exchange',
    difficulty: 1,
    prompt: 'European consumers develop a strong preference for goods made in the United States. In the foreign exchange market for dollars, what happens?',
    choices: [
      'Demand for dollars increases, and the dollar appreciates.',
      'Supply of dollars increases, and the dollar depreciates.',
      'Demand for dollars decreases, and the dollar depreciates.',
      'Supply of dollars decreases, and the dollar depreciates.',
    ],
    answer: 0,
    explanation: 'To buy U.S. goods, Europeans need dollars, so the demand for dollars shifts right and the dollar appreciates (each dollar buys more euros).',
    reviewed: false,
  },
  {
    id: 'macro-foreign-exchange-005',
    topic: 'foreign-exchange',
    difficulty: 2,
    prompt: 'If the U.S. dollar appreciates relative to the euro, what happens to U.S. exports to Europe and U.S. imports from Europe?',
    choices: [
      'Exports increase, and imports decrease.',
      'Exports increase, and imports increase.',
      'Exports decrease, and imports increase.',
      'Exports decrease, and imports decrease.',
    ],
    answer: 2,
    explanation: 'A stronger dollar makes U.S. goods more expensive for Europeans, so U.S. exports fall, and makes European goods cheaper for Americans, so U.S. imports rise. U.S. net exports decrease.',
    reviewed: false,
  },
  {
    id: 'macro-foreign-exchange-006',
    topic: 'foreign-exchange',
    difficulty: 2,
    prompt: 'The Federal Reserve raises interest rates while interest rates in Europe stay the same. What happens to the value of the dollar relative to the euro?',
    choices: [
      'The dollar depreciates, because the U.S. money supply increases.',
      'The dollar appreciates, because demand for U.S. financial assets and dollars increases.',
      'The dollar depreciates, because Americans buy more European assets.',
      'The value of the dollar does not change, because only trade affects exchange rates.',
    ],
    answer: 1,
    explanation: 'Higher U.S. interest rates make U.S. financial assets more attractive. Foreign investors buy dollars to buy them, which raises the demand for dollars, and the dollar appreciates.',
    reviewed: false,
  },
  {
    id: 'macro-foreign-exchange-007',
    topic: 'foreign-exchange',
    difficulty: 3,
    prompt: 'A country in a recession uses expansionary monetary policy. Through the foreign exchange market, how does this affect its currency and its aggregate demand?',
    choices: [
      'The currency appreciates, net exports fall, and AD falls.',
      'The currency appreciates, net exports rise, and AD rises.',
      'The currency depreciates, net exports fall, and AD falls.',
      'The currency depreciates, net exports rise, and AD rises further.',
    ],
    answer: 3,
    explanation: 'Lower interest rates make the country\'s assets less attractive, so demand for its currency falls and it depreciates. Its exports become cheaper abroad and imports more expensive, so net exports rise, adding to the increase in AD. The open economy strengthens monetary policy.',
    reviewed: false,
  },
  {
    id: 'macro-foreign-exchange-008',
    topic: 'foreign-exchange',
    difficulty: 3,
    prompt: 'The U.S. government increases deficit spending, which raises U.S. real interest rates. Through international capital flows, what is the most likely effect on U.S. net exports?',
    choices: [
      'Net exports increase, because the dollar depreciates.',
      'Net exports do not change, because exchange rates are fixed.',
      'Net exports decrease, because the dollar appreciates.',
      'Net exports increase, because government spending rises.',
    ],
    answer: 2,
    explanation: 'Higher real interest rates draw in foreign capital, raising the demand for dollars. The dollar appreciates, U.S. exports become more expensive and imports cheaper, and net exports fall. This offsets part of the fiscal stimulus, much like crowding out of investment.',
    reviewed: false,
  },
];
