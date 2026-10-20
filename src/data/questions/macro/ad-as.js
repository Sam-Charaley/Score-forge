// AP Macroeconomics, Unit 3: aggregate demand, short-run and long-run
// aggregate supply, equilibrium, output gaps and long-run self-adjustment.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// AD and SRAS cross at real GDP 60, below full employment at 80.
const FULL_EMPLOYMENT_GDP = 80;
const SHORT_RUN_GDP = 60;
const RECESSION = {
  type: 'graph', xLabel: 'Real GDP (billions $)', yLabel: 'Price level', xMax: 120, xStep: 20, yMin: 0, yMax: 12, yStep: 2,
  series: [
    { points: [[20, 10], [100, 2]], label: 'AD' },
    { points: [[20, 2], [100, 10]], label: 'SRAS' },
    { points: [[FULL_EMPLOYMENT_GDP, 0], [FULL_EMPLOYMENT_GDP, 12]], label: 'LRAS' },
  ],
  alt: 'AD-AS graph with real GDP in billions of dollars on the horizontal axis and the price level on the vertical axis. AD slopes down from (20, 10) to (100, 2). SRAS slopes up from (20, 2) to (100, 10). They cross at real GDP 60 and price level 6. LRAS is vertical at real GDP 80.',
};

export default [
  {
    id: 'macro-ad-as-001',
    topic: 'ad-as',
    difficulty: 1,
    prompt: 'Which of the following would shift the aggregate demand curve to the right?',
    choices: [
      'An increase in the price level',
      'A decrease in the prices of raw materials',
      'An increase in business confidence about future sales',
      'An increase in income tax rates',
    ],
    answer: 2,
    explanation: 'More confident firms invest more, and investment is part of aggregate demand. A change in the price level is a movement along AD, cheaper raw materials shift SRAS, and higher income taxes lower consumption and shift AD left.',
    reviewed: false,
  },
  {
    id: 'macro-ad-as-002',
    topic: 'ad-as',
    difficulty: 1,
    prompt: 'The economy shown in the graph is experiencing',
    figure: RECESSION,
    choices: [
      'an inflationary (positive) output gap',
      'long-run equilibrium',
      'stagflation with output above full employment',
      'a recessionary (negative) output gap',
    ],
    answer: 3,
    explanation: 'Short-run equilibrium (AD crossing SRAS) is at real GDP 60, to the left of LRAS at 80. Output is below full employment, so there is a recessionary gap and unemployment is above the natural rate.',
    reviewed: false,
  },
  {
    id: 'macro-ad-as-003',
    topic: 'ad-as',
    difficulty: 2,
    prompt: 'Based on the graph, what is the size of the output gap, in billions of dollars?',
    figure: RECESSION,
    choices: ['20', '40', '60', '80'],
    answer: 0,
    explanation: 'The output gap is the difference between actual real GDP (60, where AD meets SRAS) and full-employment real GDP (80, at LRAS): 80 − 60 = 20 billion.',
    verify: 'numeric',
    solve: () => FULL_EMPLOYMENT_GDP - SHORT_RUN_GDP,
    reviewed: false,
  },
  {
    id: 'macro-ad-as-004',
    topic: 'ad-as',
    difficulty: 2,
    prompt: 'If no policy action is taken in the economy shown in the graph, how will it return to long-run equilibrium?',
    figure: RECESSION,
    choices: [
      'Nominal wages fall, shifting SRAS to the right',
      'Nominal wages rise, shifting SRAS to the left',
      'Aggregate demand shifts to the right as prices fall',
      'LRAS shifts to the left to meet aggregate demand',
    ],
    answer: 0,
    explanation: 'With unemployment above the natural rate, nominal wages and other input prices eventually fall. Lower costs shift SRAS right until it crosses AD at full employment, with a lower price level. Falling prices move the economy along AD; they do not shift it.',
    reviewed: false,
  },
  {
    id: 'macro-ad-as-005',
    topic: 'ad-as',
    difficulty: 2,
    prompt: 'An economy is in long-run equilibrium. A severe drought sharply raises the cost of food and other agricultural inputs. In the short run, what happens to the price level and real output?',
    choices: [
      'The price level rises, and real output rises.',
      'The price level falls, and real output falls.',
      'The price level rises, and real output falls.',
      'The price level falls, and real output rises.',
    ],
    answer: 2,
    explanation: 'Higher input costs shift SRAS left, which raises the price level and lowers real output: stagflation. A rise in both would come from an increase in AD.',
    reviewed: false,
  },
  {
    id: 'macro-ad-as-006',
    topic: 'ad-as',
    difficulty: 2,
    prompt: 'Which of the following explains why the aggregate demand curve slopes downward?',
    choices: [
      'A lower price level raises the real value of wealth, lowers interest rates and makes exports cheaper.',
      'A lower price level lowers firms\' costs, so they produce more.',
      'At lower prices, consumers substitute toward cheaper goods.',
      'A lower price level shifts the LRAS curve to the right.',
    ],
    answer: 0,
    explanation: 'AD slopes down because of the wealth (real balances) effect, the interest rate effect and the exchange rate (net export) effect. Substitution between goods explains a single market\'s demand curve, not aggregate demand, and costs relate to supply.',
    reviewed: false,
  },
  {
    id: 'macro-ad-as-007',
    topic: 'ad-as',
    difficulty: 3,
    prompt: 'An economy is in long-run equilibrium when consumer spending rises sharply. If no policy action is taken, what will happen to real output and the price level in the long run, compared with the original long-run equilibrium?',
    choices: [
      'Real output is higher, and the price level is higher.',
      'Real output is unchanged, and the price level is higher.',
      'Real output is unchanged, and the price level is unchanged.',
      'Real output is higher, and the price level is unchanged.',
    ],
    answer: 1,
    explanation: 'AD shifts right, so in the short run output and prices rise. With unemployment below the natural rate, nominal wages rise and SRAS shifts left until output returns to full employment at LRAS. In the long run only the price level is higher.',
    reviewed: false,
  },
  {
    id: 'macro-ad-as-008',
    topic: 'ad-as',
    difficulty: 3,
    prompt: 'Which of the following would shift both the short-run aggregate supply curve and the long-run aggregate supply curve to the right?',
    choices: [
      'A decrease in nominal wages',
      'An increase in the price level',
      'An increase in government purchases',
      'An improvement in production technology',
    ],
    answer: 3,
    explanation: 'Better technology raises productivity, which increases both short-run supply and the economy\'s full-employment output. Lower nominal wages shift only SRAS, because they do not change the economy\'s productive capacity. Government purchases shift AD.',
    reviewed: false,
  },
];
