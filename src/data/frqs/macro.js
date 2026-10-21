// AP Macroeconomics free-response practice in the current exam format: one
// long question (10 points on the exam) and two short ones (5 points each).
// Graphs are drawn on paper; the sample answer describes a full-credit graph
// and the rubric lists each graph feature as its own point.
// FRQ ids are permanent once reviewed: saved self-checks point at them.
// Rubric point ids are permanent too: saved scores list the ones earned.

export const FRQ_TYPES = {
  long: 'Long Response',
  short: 'Short Response',
};

export default [
  {
    id: 'macro-frq-long-001',
    type: 'long',
    title: 'Recession and monetary policy',
    intro: 'Assume the economy of Country X has a fractional reserve banking system with a reserve requirement of 10%, uses the U.S. dollar, and is currently in a short-run equilibrium with real output below full employment. The central bank of Country X operates with limited reserves.',
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'Draw a correctly labeled graph of aggregate demand, short-run aggregate supply and long-run aggregate supply. Show each of the following: (i) the current short-run equilibrium output, labeled Y₁, and price level, labeled PL₁; (ii) full-employment output, labeled Yf.',
        solution: 'The horizontal axis is labeled Real GDP (or real output) and the vertical axis is labeled Price level. AD slopes down and SRAS slopes up; they cross at Y₁ and PL₁. LRAS is a vertical line at Yf, and Yf is to the right of Y₁, showing a recessionary gap.',
        points: [
          { id: 'a1', text: 'Axes labeled: real output (real GDP) on the horizontal axis and price level on the vertical axis' },
          { id: 'a2', text: 'A downward-sloping curve labeled AD and an upward-sloping curve labeled SRAS' },
          { id: 'a3', text: 'Y₁ and PL₁ marked on the axes where AD and SRAS cross' },
          { id: 'a4', text: 'A vertical curve labeled LRAS at Yf, with Y₁ to the left of Yf' },
        ],
      },
      {
        id: 'b',
        prompt: 'Identify an open-market operation the central bank could use to restore full employment.',
        solution: 'The central bank should buy government bonds (securities) on the open market.',
        points: [
          { id: 'b1', text: 'States that the central bank buys government bonds (securities)' },
        ],
      },
      {
        id: 'c',
        prompt: 'Draw a correctly labeled graph of the money market. Show the effect of the open-market operation you identified in part (b) on the nominal interest rate.',
        solution: 'The horizontal axis is labeled Quantity of money and the vertical axis is labeled Nominal interest rate. Money demand (MD) slopes down. Money supply starts as a vertical line MS₁ and shifts right to MS₂. The equilibrium nominal interest rate falls from i₁ to i₂.',
        points: [
          { id: 'c1', text: 'Axes labeled: quantity of money on the horizontal axis and nominal interest rate on the vertical axis' },
          { id: 'c2', text: 'A downward-sloping curve labeled MD and a vertical curve labeled MS' },
          { id: 'c3', text: 'Shows the money supply curve shifting to the right' },
          { id: 'c4', text: 'Marks a new equilibrium nominal interest rate lower than the starting one' },
        ],
      },
      {
        id: 'd',
        prompt: 'Assume the central bank buys $50 million of government bonds from commercial banks. Calculate the maximum possible change in the money supply. Show your work.',
        solution: 'All $50 million is excess reserves, because the purchase creates no new deposits. Money multiplier = 1/0.10 = 10. Maximum change in the money supply = $50 million × 10 = $500 million (an increase).',
        points: [
          { id: 'd1', text: 'Calculates an increase of $500 million and shows the work: $50 million × (1 / 0.10)' },
        ],
      },
      {
        id: 'e',
        prompt: 'Based on your answer to part (c), what will happen to each of the following in the short run? Explain. (i) Real output (ii) The price level',
        solution: 'The lower nominal interest rate makes borrowing cheaper, so investment and interest-sensitive consumption rise, shifting AD to the right. (i) Real output increases. (ii) The price level increases.',
        points: [
          { id: 'e1', text: 'States that real output increases and the price level increases' },
          { id: 'e2', text: 'Explains that the lower interest rate increases investment (or interest-sensitive spending), which increases aggregate demand' },
        ],
      },
      {
        id: 'f',
        prompt: 'Assume the real interest rate in Country X falls relative to real interest rates in other countries. What will happen to the international value of Country X\'s currency? Explain.',
        solution: 'Country X\'s currency depreciates. A lower relative real interest rate makes Country X\'s financial assets less attractive to foreign investors, so the demand for Country X\'s currency decreases (and residents supply more of it to buy foreign assets).',
        points: [
          { id: 'f1', text: 'States that the currency depreciates' },
          { id: 'f2', text: 'Explains that financial assets in Country X become less attractive, so demand for its currency falls (or supply rises)' },
        ],
      },
    ],
  },
  {
    id: 'macro-frq-long-002',
    type: 'long',
    title: 'Inflationary gap and fiscal policy',
    intro: 'The economy of Country Y is currently in short-run equilibrium with real output of $2,400 billion. Full-employment output is $2,000 billion. The marginal propensity to consume is 0.8. Assume there is no international trade.',
    reviewed: true,
    parts: [
      {
        id: 'a',
        prompt: 'Draw a correctly labeled graph of aggregate demand, short-run aggregate supply and long-run aggregate supply. Show the current short-run equilibrium output, labeled Y₁, and price level, labeled PL₁, and full-employment output, labeled Yf.',
        solution: 'The horizontal axis is labeled Real GDP and the vertical axis is labeled Price level. AD slopes down and SRAS slopes up, crossing at Y₁ and PL₁. LRAS is vertical at Yf, with Y₁ to the right of Yf, showing an inflationary (positive) output gap.',
        points: [
          { id: 'a1', text: 'Axes labeled: real output (real GDP) on the horizontal axis and price level on the vertical axis' },
          { id: 'a2', text: 'A downward-sloping curve labeled AD and an upward-sloping curve labeled SRAS' },
          { id: 'a3', text: 'Y₁ and PL₁ marked on the axes where AD and SRAS cross' },
          { id: 'a4', text: 'A vertical curve labeled LRAS at Yf, with Y₁ to the right of Yf' },
        ],
      },
      {
        id: 'b',
        prompt: 'Identify a discretionary fiscal policy action that could move the economy to full employment.',
        solution: 'The government could decrease government spending (or increase taxes, or decrease transfer payments).',
        points: [
          { id: 'b1', text: 'Identifies a decrease in government spending or an increase in taxes (or a decrease in transfer payments)' },
        ],
      },
      {
        id: 'c',
        prompt: 'Calculate the minimum change in government spending needed to close the output gap. Show your work.',
        solution: 'The output gap is $2,400 billion − $2,000 billion = $400 billion. The spending multiplier is 1/(1 − 0.8) = 5. Government spending should decrease by $400 billion / 5 = $80 billion.',
        points: [
          { id: 'c1', text: 'Calculates a decrease of $80 billion and shows the work: $400 billion / 5' },
        ],
      },
      {
        id: 'd',
        prompt: 'Instead, assume the government takes no policy action. Explain how the economy will adjust back to full employment in the long run, and state what will happen to the price level compared with PL₁.',
        solution: 'With unemployment below the natural rate, workers and input suppliers demand higher nominal wages and prices. Higher costs shift SRAS to the left until it crosses AD at full-employment output. The price level ends up higher than PL₁.',
        points: [
          { id: 'd1', text: 'Explains that nominal wages (input prices) rise, shifting SRAS to the left' },
          { id: 'd2', text: 'States that the price level will be higher than PL₁' },
        ],
      },
      {
        id: 'e',
        prompt: 'Draw a correctly labeled graph of the short-run and long-run Phillips curves. Label the point that represents the current state of Country Y\'s economy as point A.',
        solution: 'The horizontal axis is labeled Unemployment rate and the vertical axis is labeled Inflation rate. The SRPC slopes down, and the LRPC is vertical at the natural rate of unemployment. Point A is on the SRPC to the left of the LRPC, with unemployment below the natural rate and inflation above the long-run equilibrium rate.',
        points: [
          { id: 'e1', text: 'Axes labeled: unemployment rate on the horizontal axis and inflation rate on the vertical axis' },
          { id: 'e2', text: 'A downward-sloping curve labeled SRPC and a vertical curve labeled LRPC' },
          { id: 'e3', text: 'Point A is on the SRPC to the left of the LRPC' },
        ],
      },
      {
        id: 'f',
        prompt: 'Assume the government uses the fiscal policy you identified in part (b), and as a result its budget moves from balance to a surplus. In the loanable funds market, what will happen to the real interest rate? Explain.',
        solution: 'The real interest rate falls. A budget surplus is public saving, which increases the supply of loanable funds (equivalently, the government borrows less, lowering demand). With more funds available, the equilibrium real interest rate falls.',
        points: [
          { id: 'f1', text: 'States that the real interest rate falls' },
          { id: 'f2', text: 'Explains that the surplus increases the supply of loanable funds (or decreases government demand for them)' },
        ],
      },
    ],
  },
  {
    id: 'macro-frq-short-001',
    type: 'short',
    title: 'Bank balance sheet and money creation',
    intro: 'Lakeside Bank\'s balance sheet is shown below. The reserve requirement is 20%. Assume banks lend all excess reserves and borrowers keep no cash.',
    figure: {
      type: 'table',
      caption: 'Lakeside Bank balance sheet (reserve requirement 20%)',
      columns: ['Assets', 'Asset value ($)', 'Liabilities', 'Liability value ($)'],
      rows: [
        ['Reserves', 40000, 'Demand deposits', 100000],
        ['Loans', 60000, '', ''],
      ],
      alt: 'Balance sheet for Lakeside Bank with a 20 percent reserve requirement. Assets: reserves of $40,000 and loans of $60,000. Liabilities: demand deposits of $100,000.',
    },
    reviewed: true,
    parts: [
      {
        id: 'a',
        prompt: 'Calculate the amount of Lakeside Bank\'s required reserves. Show your work.',
        solution: 'Required reserves = 20% × $100,000 = $20,000.',
        points: [
          { id: 'a1', text: 'Calculates $20,000 and shows the work: 0.20 × $100,000' },
        ],
      },
      {
        id: 'b',
        prompt: 'What is the maximum amount Lakeside Bank can lend?',
        solution: 'Lakeside Bank can lend its excess reserves: $40,000 − $20,000 = $20,000.',
        points: [
          { id: 'b1', text: 'States $20,000 (the bank\'s excess reserves)' },
        ],
      },
      {
        id: 'c',
        prompt: 'If Lakeside Bank lends the amount in part (b), calculate the maximum possible change in the money supply for the banking system. Show your work.',
        solution: 'The money multiplier is 1/0.20 = 5. Maximum change in the money supply = $20,000 × 5 = $100,000 (an increase).',
        points: [
          { id: 'c1', text: 'Calculates an increase of $100,000 and shows the work: $20,000 × (1 / 0.20)' },
        ],
      },
      {
        id: 'd',
        prompt: 'A customer withdraws $5,000 in cash from her checking account at Lakeside Bank. What is the immediate effect of the withdrawal on the M1 money supply? Explain.',
        solution: 'M1 does not change immediately. Both currency held by the public and checkable deposits are part of M1, so the withdrawal only changes the form of the money: currency rises by $5,000 and checkable deposits fall by $5,000.',
        points: [
          { id: 'd1', text: 'States that M1 does not change' },
          { id: 'd2', text: 'Explains that currency and checkable deposits are both in M1, so the withdrawal moves money from one part of M1 to another' },
        ],
      },
    ],
  },
  {
    id: 'macro-frq-short-002',
    type: 'short',
    title: 'Interest rates and the foreign exchange market',
    intro: 'The United States and Mexico trade with each other, and financial capital moves freely between them. The central bank of the United States raises interest rates, while interest rates in Mexico do not change.',
    reviewed: true,
    parts: [
      {
        id: 'a',
        prompt: 'Draw a correctly labeled graph of the foreign exchange market for the U.S. dollar, with the price of the dollar in Mexican pesos. Show the effect of the higher U.S. interest rates on the value of the dollar.',
        solution: 'The horizontal axis is labeled Quantity of dollars and the vertical axis is labeled Pesos per dollar. Demand for dollars (D) slopes down and supply of dollars (S) slopes up. Higher U.S. interest rates attract Mexican investors to U.S. financial assets, so demand for dollars shifts right from D₁ to D₂, and the equilibrium price of the dollar rises from ER₁ to ER₂ (the dollar appreciates).',
        points: [
          { id: 'a1', text: 'Axes labeled: quantity of dollars on the horizontal axis and price of the dollar (pesos per dollar) on the vertical axis' },
          { id: 'a2', text: 'A downward-sloping curve labeled D and an upward-sloping curve labeled S' },
          { id: 'a3', text: 'Shows the demand for dollars shifting to the right' },
          { id: 'a4', text: 'Marks a new equilibrium exchange rate higher than the starting one (the dollar appreciates)' },
        ],
      },
      {
        id: 'b',
        prompt: 'Based on your answer to part (a), what will happen to U.S. exports to Mexico? Explain.',
        solution: 'U.S. exports to Mexico decrease. Because each dollar now costs more pesos, U.S. goods are more expensive for Mexican buyers.',
        points: [
          { id: 'b1', text: 'States that U.S. exports decrease and explains that U.S. goods become more expensive for Mexican buyers' },
        ],
      },
    ],
  },
  {
    id: 'macro-frq-short-003',
    type: 'short',
    title: 'Comparative advantage',
    intro: 'Country A and Country B each produce phones and shirts with constant opportunity costs. The table shows the maximum amount each country can produce of each good if it uses all of its resources for that good.',
    figure: {
      type: 'table',
      caption: 'Maximum output',
      columns: ['Country', 'Phones', 'Shirts'],
      rows: [['Country A', 20, 40], ['Country B', 10, 30]],
      alt: 'Table of maximum output. Country A can make 20 phones or 40 shirts. Country B can make 10 phones or 30 shirts.',
    },
    reviewed: true,
    parts: [
      {
        id: 'a',
        prompt: 'Draw a correctly labeled production possibilities curve for Country A, with phones on the horizontal axis and shirts on the vertical axis. Show the numerical values of the endpoints.',
        solution: 'The horizontal axis is labeled Phones and the vertical axis is labeled Shirts. Country A\'s PPC is a straight line from 40 shirts on the vertical axis to 20 phones on the horizontal axis.',
        points: [
          { id: 'a1', text: 'Axes labeled: phones on the horizontal axis and shirts on the vertical axis' },
          { id: 'a2', text: 'A straight-line PPC from 40 shirts to 20 phones, with both endpoints labeled' },
        ],
      },
      {
        id: 'b',
        prompt: 'Calculate Country B\'s opportunity cost of producing one phone. Show your work.',
        solution: 'Country B gives up 30 shirts to make 10 phones, so one phone costs 30/10 = 3 shirts.',
        points: [
          { id: 'b1', text: 'Calculates 3 shirts and shows the work: 30 / 10' },
        ],
      },
      {
        id: 'c',
        prompt: 'Which country has a comparative advantage in producing shirts? Explain using opportunity costs.',
        solution: 'Country B. One shirt costs Country B 10/30 = 1/3 phone, while it costs Country A 20/40 = 1/2 phone. Country B gives up less to make a shirt.',
        points: [
          { id: 'c1', text: 'Identifies Country B and compares opportunity costs: 1/3 phone per shirt for B versus 1/2 phone per shirt for A' },
        ],
      },
      {
        id: 'd',
        prompt: 'If the two countries specialize and trade 1 phone for 2.5 shirts, would both countries benefit? Explain.',
        solution: 'Yes. Country A, which exports phones, gets 2.5 shirts per phone instead of the 2 it gives up making a phone itself. Country B, which exports shirts, pays 2.5 shirts per phone instead of the 3 shirts a phone costs it to make. The terms of trade lie between the two opportunity costs.',
        points: [
          { id: 'd1', text: 'States yes and explains that 2.5 shirts per phone lies between the opportunity costs of a phone (2 shirts for A and 3 shirts for B)' },
        ],
      },
    ],
  },
  {
    id: 'macro-frq-short-004',
    type: 'short',
    title: 'Deficit spending and crowding out',
    intro: 'Country Z is at full employment. Its government increases spending without changing taxes, and it finances the resulting budget deficit by borrowing.',
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'Draw a correctly labeled graph of the loanable funds market. Show the effect of the government borrowing on the real interest rate.',
        solution: 'The horizontal axis is labeled Quantity of loanable funds and the vertical axis is labeled Real interest rate. Demand (D) slopes down and supply (S) slopes up. Government borrowing shifts demand right from D₁ to D₂, and the real interest rate rises from r₁ to r₂. (Showing supply shifting left, as a fall in public saving, also earns credit.)',
        points: [
          { id: 'a1', text: 'Axes labeled: quantity of loanable funds on the horizontal axis and real interest rate on the vertical axis' },
          { id: 'a2', text: 'A downward-sloping curve labeled D and an upward-sloping curve labeled S' },
          { id: 'a3', text: 'Shows demand shifting right (or supply shifting left)' },
          { id: 'a4', text: 'Marks a new equilibrium real interest rate higher than the starting one' },
        ],
      },
      {
        id: 'b',
        prompt: 'Based on your answer to part (a), what will happen to the rate of economic growth in Country Z in the long run? Explain.',
        solution: 'Economic growth slows. The higher real interest rate reduces private investment (crowding out), so Country Z adds less physical capital, and productivity and potential output grow more slowly.',
        points: [
          { id: 'b1', text: 'States that economic growth slows and explains that the higher real interest rate reduces private investment, so the capital stock grows more slowly' },
        ],
      },
    ],
  },
];
