// AP Macroeconomics, Unit 3: expansionary and contractionary fiscal policy,
// closing output gaps, automatic stabilizers and policy lags.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// AD and SRAS cross at real GDP 80, above full employment at 60.
const FULL_EMPLOYMENT_GDP = 60;
const SHORT_RUN_GDP = 80;
const BOOM = {
  type: 'graph', xLabel: 'Real GDP (billions $)', yLabel: 'Price level', xMax: 140, xStep: 20, yMin: 0, yMax: 12, yStep: 2,
  series: [
    { points: [[40, 10], [120, 2]], label: 'AD' },
    { points: [[40, 2], [120, 10]], label: 'SRAS' },
    { points: [[FULL_EMPLOYMENT_GDP, 0], [FULL_EMPLOYMENT_GDP, 12]], label: 'LRAS' },
  ],
  alt: 'AD-AS graph with real GDP in billions of dollars on the horizontal axis and the price level on the vertical axis. AD slopes down from (40, 10) to (120, 2). SRAS slopes up from (40, 2) to (120, 10). They cross at real GDP 80 and price level 6. LRAS is vertical at real GDP 60.',
};

export default [
  {
    id: 'macro-fiscal-policy-001',
    topic: 'fiscal-policy',
    difficulty: 1,
    prompt: 'Which of the following is an example of contractionary fiscal policy?',
    choices: [
      'The central bank sells government bonds.',
      'Congress cuts personal income taxes.',
      'Congress reduces spending on highway construction.',
      'The government increases unemployment benefits.',
    ],
    answer: 2,
    explanation: 'Fiscal policy is a change in government purchases, taxes or transfers. Cutting purchases lowers aggregate demand, so it is contractionary. Selling bonds is monetary policy, and tax cuts and higher benefits are expansionary.',
    reviewed: true,
  },
  {
    id: 'macro-fiscal-policy-002',
    topic: 'fiscal-policy',
    difficulty: 1,
    prompt: 'An economy is in a recession with high unemployment. Which fiscal policy would be most appropriate?',
    choices: [
      'Increase government purchases',
      'Increase taxes',
      'Decrease transfer payments',
      'Sell government bonds on the open market',
    ],
    answer: 0,
    explanation: 'A recession calls for expansionary fiscal policy to shift AD right. Higher government purchases do that directly. Raising taxes or cutting transfers would lower AD, and open-market bond sales are a monetary policy tool.',
    reviewed: true,
  },
  {
    id: 'macro-fiscal-policy-003',
    topic: 'fiscal-policy',
    difficulty: 2,
    prompt: 'Which of the following is an automatic stabilizer?',
    choices: [
      'A new law that funds bridge repairs during a recession',
      'A one-time tax rebate passed by Congress',
      'The Federal Reserve lowering the discount rate',
      'Income tax collections that fall as incomes fall in a recession',
    ],
    answer: 3,
    explanation: 'Automatic stabilizers change with the economy without any new law: progressive income taxes collect less in a recession and unemployment benefits pay out more, softening the drop in spending. New laws are discretionary fiscal policy.',
    reviewed: true,
  },
  {
    id: 'macro-fiscal-policy-004',
    topic: 'fiscal-policy',
    difficulty: 2,
    prompt: 'Look at the economy shown in the graph. Which fiscal policy would move it toward long-run equilibrium, and what would happen to the price level?',
    figure: BOOM,
    choices: [
      'Increase government purchases; the price level rises',
      'Decrease government purchases; the price level falls',
      'Decrease taxes; the price level falls',
      'Increase transfer payments; the price level rises',
    ],
    answer: 1,
    explanation: 'Output (where AD meets SRAS) is above full employment at LRAS, so there is an inflationary gap. Contractionary fiscal policy, such as cutting purchases, shifts AD left, lowering output toward LRAS and lowering the price level.',
    reviewed: true,
  },
  {
    id: 'macro-fiscal-policy-005',
    topic: 'fiscal-policy',
    formulas: ['spending-multiplier'],
    difficulty: 3,
    prompt: 'In the economy shown in the graph, the marginal propensity to consume is 0.75. What change in government purchases would close the output gap, in billions of dollars?',
    figure: BOOM,
    choices: ['−5', '−20', '+5', '−6.7'],
    answer: 0,
    explanation: 'AD and SRAS cross at real GDP 80, which is 20 billion above full employment at 60. The spending multiplier is 1/0.25 = 4, so purchases should fall by 20/4 = 5 billion. −20 ignores the multiplier, and −6.7 uses the tax multiplier of 3.',
    verify: 'numeric',
    solve: () => -(SHORT_RUN_GDP - FULL_EMPLOYMENT_GDP) / (1 / (1 - 0.75)),
    reviewed: true,
  },
  {
    id: 'macro-fiscal-policy-006',
    topic: 'fiscal-policy',
    difficulty: 2,
    prompt: 'Which of the following is a major reason discretionary fiscal policy may not stabilize the economy as intended?',
    choices: [
      'Fiscal policy cannot change aggregate demand.',
      'Congress cannot change tax rates.',
      'Time lags in recognizing problems, passing laws and spending the money',
      'Fiscal policy affects only aggregate supply.',
    ],
    answer: 2,
    explanation: 'It takes time to recognize a recession, pass a spending or tax bill, and get the money spent. By the time the policy works, the economy may have recovered, and the policy can overshoot. Fiscal policy does change AD.',
    reviewed: true,
  },
  {
    id: 'macro-fiscal-policy-007',
    topic: 'fiscal-policy',
    difficulty: 2,
    prompt: 'The government runs a balanced budget. It then increases transfer payments without changing taxes or purchases. What happens to the budget balance and to aggregate demand?',
    choices: [
      'A budget surplus; AD decreases',
      'A balanced budget; AD does not change',
      'A budget surplus; AD increases',
      'A budget deficit; AD increases',
    ],
    answer: 3,
    explanation: 'Spending more on transfers with the same tax revenue creates a deficit. Transfers raise disposable income, so consumption and aggregate demand increase, though by less than an equal increase in purchases would.',
    reviewed: true,
  },
  {
    id: 'macro-fiscal-policy-008',
    topic: 'fiscal-policy',
    difficulty: 3,
    prompt: 'An economy is in a recessionary gap, and the government chooses not to use fiscal policy. Compared with using expansionary fiscal policy, waiting for the economy to adjust on its own will most likely result in',
    choices: [
      'a higher price level in the long run',
      'a lower price level in the long run',
      'a higher level of real output in the long run',
      'a permanently higher unemployment rate',
    ],
    answer: 1,
    explanation: 'Left alone, falling nominal wages shift SRAS right, restoring full employment at a lower price level. Expansionary policy instead shifts AD right, reaching full employment at a higher price level. Either way, long-run output is the full-employment level and unemployment returns to the natural rate.',
    reviewed: true,
  },
];
