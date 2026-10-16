// AP Macroeconomics formulas. The exam gives no formula sheet and no
// calculator, so everything is memorize and the numbers on the exam are
// kept simple. Each var is [symbol, meaning, unit]; tex strings are KaTeX.
const tex = String.raw;

export default {
  subjectId: 'macro',
  sheet: {
    given: false,
    label: 'No formula sheet and no calculator: memorize all of these',
  },
  sections: [
    {
      id: 'gdp',
      title: 'GDP and growth',
      formulas: [
        { id: 'gdp-expenditure', name: 'GDP (expenditure approach)', tex: tex`\text{GDP} = C + I + G + X_n`, vars: [['C', 'consumption', ''], ['I', 'gross private investment', ''], ['G', 'government purchases', ''], ['X_n', 'net exports (exports minus imports)', '']], note: 'Transfer payments, used goods and financial assets are not in G or I.' },
        { id: 'real-gdp', name: 'Real GDP', tex: tex`\text{real GDP} = \dfrac{\text{nominal GDP}}{\text{GDP deflator}}\times100`, vars: [], note: 'Real GDP removes inflation by valuing output at base-year prices.' },
        { id: 'gdp-deflator', name: 'GDP deflator', tex: tex`\text{GDP deflator} = \dfrac{\text{nominal GDP}}{\text{real GDP}}\times100`, vars: [], note: 'Equals 100 in the base year.' },
        { id: 'growth-rate', name: 'Growth rate', tex: tex`\text{growth rate} = \dfrac{\text{year 2} - \text{year 1}}{\text{year 1}}\times100\%`, vars: [] },
        { id: 'per-capita', name: 'Real GDP per capita', tex: tex`\dfrac{\text{real GDP}}{\text{population}}`, vars: [], note: 'The usual measure of a country\'s standard of living.' },
        { id: 'rule-of-70', name: 'Rule of 70', tex: tex`\text{years to double} = \dfrac{70}{\text{growth rate (\%)}}`, vars: [] },
      ],
    },
    {
      id: 'prices',
      title: 'Inflation and price indexes',
      formulas: [
        { id: 'cpi', name: 'Consumer price index', tex: tex`\text{CPI} = \dfrac{\text{basket cost this year}}{\text{basket cost in base year}}\times100`, vars: [] },
        { id: 'inflation-rate', name: 'Inflation rate', tex: tex`\text{inflation rate} = \dfrac{\text{CPI}_{\text{new}} - \text{CPI}_{\text{old}}}{\text{CPI}_{\text{old}}}\times100\%`, vars: [], note: 'Works with any price index, including the GDP deflator.' },
        { id: 'real-value', name: 'Real value of an amount', tex: tex`\text{real value} = \dfrac{\text{nominal value}}{\text{price index}}\times100`, vars: [], note: 'Use it for real wages or real income.' },
        { id: 'fisher', name: 'Real and nominal interest rates', tex: tex`r_{\text{real}} = i_{\text{nominal}} - \pi`, vars: [['r_{\\text{real}}', 'real interest rate', '%'], ['i_{\\text{nominal}}', 'nominal interest rate', '%'], ['\\pi', 'inflation rate', '%']], note: 'Unexpected inflation helps borrowers and hurts lenders.' },
        { id: 'quantity-theory', name: 'Quantity theory of money', tex: tex`MV = PY`, vars: [['M', 'money supply', ''], ['V', 'velocity of money', ''], ['P', 'price level', ''], ['Y', 'real output', '']], note: 'With V and Y fixed in the long run, more money means proportionally higher prices.' },
      ],
    },
    {
      id: 'labor',
      title: 'Unemployment',
      formulas: [
        { id: 'labor-force', name: 'Labor force', tex: tex`\text{labor force} = \text{employed} + \text{unemployed}`, vars: [], note: 'Unemployed means without a job and actively looking. Discouraged workers are not in the labor force.' },
        { id: 'unemployment-rate', name: 'Unemployment rate', tex: tex`\dfrac{\text{unemployed}}{\text{labor force}}\times100\%`, vars: [] },
        { id: 'participation-rate', name: 'Labor force participation rate', tex: tex`\dfrac{\text{labor force}}{\text{adult population}}\times100\%`, vars: [] },
        { id: 'natural-rate', name: 'Natural rate of unemployment', tex: tex`\text{natural rate} = \text{frictional} + \text{structural}`, vars: [], note: 'Cyclical unemployment is zero at full employment.' },
      ],
    },
    {
      id: 'multipliers',
      title: 'Spending and multipliers',
      formulas: [
        { id: 'mpc-mps', name: 'Marginal propensities', tex: tex`\text{MPC} = \dfrac{\Delta C}{\Delta \text{DI}} \qquad \text{MPS} = \dfrac{\Delta S}{\Delta \text{DI}} \qquad \text{MPC} + \text{MPS} = 1`, vars: [['\\text{DI}', 'disposable income', '']] },
        { id: 'spending-multiplier', name: 'Spending multiplier', tex: tex`\text{spending multiplier} = \dfrac{1}{1 - \text{MPC}} = \dfrac{1}{\text{MPS}}`, vars: [], note: 'Change in GDP = multiplier × change in spending (C, I or G).' },
        { id: 'tax-multiplier', name: 'Tax multiplier', tex: tex`\text{tax multiplier} = -\dfrac{\text{MPC}}{\text{MPS}}`, vars: [], note: 'Always one less (in size) than the spending multiplier, because part of a tax cut is saved first.' },
        { id: 'balanced-budget', name: 'Balanced budget multiplier', tex: tex`\Delta G = \Delta T \;\Rightarrow\; \Delta\text{GDP} = \Delta G`, vars: [], note: 'Raising spending and taxes by the same amount raises GDP by that amount: a multiplier of 1.' },
      ],
    },
    {
      id: 'money',
      title: 'Money and banking',
      formulas: [
        { id: 'money-multiplier', name: 'Money multiplier', tex: tex`\text{money multiplier} = \dfrac{1}{\text{reserve requirement}}`, vars: [], note: 'Maximum change in the money supply = excess reserves × money multiplier.' },
        { id: 'required-reserves', name: 'Required and excess reserves', tex: tex`\text{required} = \text{deposits}\times\text{reserve ratio} \qquad \text{excess} = \text{total reserves} - \text{required}`, vars: [], note: 'A bank can lend only its excess reserves.' },
        { id: 'deposit-change', name: 'New deposit from outside the system', tex: tex`\Delta M_{\max} = \text{excess reserves}\times\dfrac{1}{rr}`, vars: [['rr', 'reserve requirement', '']], note: 'If a bank sells bonds to the Fed, the whole payment is excess reserves. If someone deposits cash, the deposit itself doesn\'t change M1; only the new loans made from its excess reserves do.' },
      ],
    },
    {
      id: 'international',
      title: 'International trade',
      formulas: [
        { id: 'net-exports', name: 'Net exports', tex: tex`X_n = \text{exports} - \text{imports}`, vars: [] },
        { id: 'balance-of-payments', name: 'Balance of payments', tex: tex`\text{CA} + \text{CFA} = 0`, vars: [['\\text{CA}', 'current account balance', ''], ['\\text{CFA}', 'capital and financial account balance', '']], note: 'A current account deficit is matched by a financial account surplus.' },
      ],
    },
  ],
};
