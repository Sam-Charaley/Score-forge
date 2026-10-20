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
    reviewed: false,
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
];
