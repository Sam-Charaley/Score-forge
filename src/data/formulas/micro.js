// AP Microeconomics formulas. The exam gives no formula sheet and no
// calculator, so everything is memorize. Each var is [symbol, meaning,
// unit]; tex strings are KaTeX.
const tex = String.raw;

export default {
  subjectId: 'micro',
  sheet: {
    given: false,
    label: 'No formula sheet and no calculator: memorize all of these',
  },
  sections: [
    {
      id: 'choice',
      title: 'Opportunity cost and trade',
      formulas: [
        { id: 'opportunity-cost', name: 'Opportunity cost', tex: tex`\text{opportunity cost of X} = \dfrac{\text{Y given up}}{\text{X gained}}`, vars: [], note: 'For comparative advantage, the producer with the lower opportunity cost should specialize.' },
        { id: 'terms-of-trade', name: 'Mutually beneficial terms of trade', tex: tex`\text{OC}_A < \text{price} < \text{OC}_B`, vars: [['\\text{OC}_A, \\text{OC}_B', 'the two producers\' opportunity costs', '']], note: 'Both sides gain only if the price is between their opportunity costs.' },
      ],
    },
    {
      id: 'elasticity',
      title: 'Elasticity',
      formulas: [
        { id: 'price-elasticity', name: 'Price elasticity of demand', tex: tex`E_d = \left|\dfrac{\%\Delta Q_d}{\%\Delta P}\right|`, vars: [], note: 'Above 1 elastic, below 1 inelastic, exactly 1 unit elastic.' },
        { id: 'midpoint', name: 'Percent change (midpoint method)', tex: tex`\%\Delta = \dfrac{\text{new} - \text{old}}{(\text{new} + \text{old})/2}\times100\%`, vars: [], note: 'Gives the same elasticity whether price rises or falls.' },
        { id: 'total-revenue-test', name: 'Total revenue test', tex: tex`TR = P\times Q`, vars: [], note: 'Elastic: price and TR move in opposite directions. Inelastic: the same direction. Unit elastic: TR is at its maximum.' },
        { id: 'cross-price', name: 'Cross-price elasticity', tex: tex`E_{xy} = \dfrac{\%\Delta Q_x}{\%\Delta P_y}`, vars: [], note: 'Positive means substitutes, negative means complements.' },
        { id: 'income-elasticity', name: 'Income elasticity', tex: tex`E_I = \dfrac{\%\Delta Q}{\%\Delta \text{income}}`, vars: [], note: 'Positive for normal goods (above 1 for luxuries), negative for inferior goods.' },
        { id: 'supply-elasticity', name: 'Price elasticity of supply', tex: tex`E_s = \dfrac{\%\Delta Q_s}{\%\Delta P}`, vars: [], note: 'Supply is more elastic over longer periods.' },
      ],
    },
    {
      id: 'welfare',
      title: 'Surplus and market efficiency',
      formulas: [
        { id: 'consumer-surplus', name: 'Consumer surplus', tex: tex`CS = \tfrac{1}{2}\times\text{base}\times\text{height}`, vars: [], note: 'The triangle below demand and above the price.' },
        { id: 'producer-surplus', name: 'Producer surplus', tex: tex`PS = \tfrac{1}{2}\times\text{base}\times\text{height}`, vars: [], note: 'The triangle above supply and below the price.' },
        { id: 'deadweight-loss', name: 'Deadweight loss', tex: tex`DWL = \tfrac{1}{2}\times\Delta Q\times\Delta P`, vars: [], note: 'The triangle of lost surplus between the efficient and actual quantity, from a tax, price control, monopoly or externality.' },
        { id: 'tax-revenue', name: 'Tax revenue', tex: tex`\text{tax revenue} = \text{tax per unit}\times Q_{\text{after tax}}`, vars: [], note: 'The side that is more inelastic bears more of the tax.' },
        { id: 'utility-max', name: 'Utility maximization', tex: tex`\dfrac{MU_x}{P_x} = \dfrac{MU_y}{P_y}`, vars: [['MU', 'marginal utility', ''], ['P', 'price', '']], note: 'Buy more of the good with the higher marginal utility per dollar until they are equal.' },
      ],
    },
    {
      id: 'costs',
      title: 'Production and costs',
      formulas: [
        { id: 'marginal-product', name: 'Marginal product', tex: tex`MP = \dfrac{\Delta TP}{\Delta L}`, vars: [['TP', 'total product', ''], ['L', 'labor', '']], note: 'Diminishing marginal returns: MP eventually falls as more labor is added.' },
        { id: 'total-cost', name: 'Total cost', tex: tex`TC = FC + VC`, vars: [['FC', 'fixed cost', ''], ['VC', 'variable cost', '']] },
        { id: 'average-costs', name: 'Average costs', tex: tex`ATC = \dfrac{TC}{Q} \qquad AVC = \dfrac{VC}{Q} \qquad AFC = \dfrac{FC}{Q} \qquad ATC = AVC + AFC`, vars: [], note: 'AFC always falls as Q grows, so ATC and AVC get closer together.' },
        { id: 'marginal-cost', name: 'Marginal cost', tex: tex`MC = \dfrac{\Delta TC}{\Delta Q} = \dfrac{\Delta VC}{\Delta Q}`, vars: [], note: 'MC crosses ATC and AVC at their minimums. Fixed cost doesn\'t change MC.' },
      ],
    },
    {
      id: 'firms',
      title: 'Revenue, profit and market structures',
      formulas: [
        { id: 'revenue', name: 'Total, average and marginal revenue', tex: tex`TR = P\times Q \qquad AR = \dfrac{TR}{Q} \qquad MR = \dfrac{\Delta TR}{\Delta Q}`, vars: [], note: 'In perfect competition MR = P. For a monopoly, MR is below the demand curve.' },
        { id: 'profit', name: 'Profit', tex: tex`\text{profit} = TR - TC = (P - ATC)\times Q`, vars: [], note: 'Economic profit subtracts implicit costs too. Accounting profit doesn\'t.' },
        { id: 'profit-max', name: 'Profit maximizing rule', tex: tex`MR = MC`, vars: [], note: 'Every firm in every market structure produces where MR = MC.' },
        { id: 'shutdown', name: 'Shutdown rule', tex: tex`P < \min AVC \;\Rightarrow\; \text{shut down}`, vars: [], note: 'In the short run a firm keeps producing at a loss as long as price covers average variable cost.' },
        { id: 'allocative-efficiency', name: 'Allocative and productive efficiency', tex: tex`\text{allocative: } P = MC \qquad \text{productive: } P = \min ATC`, vars: [], note: 'Perfect competition in the long run achieves both. Monopoly achieves neither.' },
        { id: 'socially-optimal', name: 'Regulating a natural monopoly', tex: tex`\text{socially optimal: } P = MC \qquad \text{fair return: } P = ATC`, vars: [] },
      ],
    },
    {
      id: 'factor-markets',
      title: 'Factor markets',
      formulas: [
        { id: 'mrp', name: 'Marginal revenue product', tex: tex`MRP = MP\times MR`, vars: [], note: 'In a perfectly competitive product market, MRP = MP × P.' },
        { id: 'mrc', name: 'Marginal resource cost', tex: tex`MRC = \dfrac{\Delta TC}{\Delta L}`, vars: [], note: 'In a competitive labor market, MRC is the wage. For a monopsony, MRC is above the wage.' },
        { id: 'hiring-rule', name: 'Hiring rule', tex: tex`MRP = MRC`, vars: [], note: 'Keep hiring until the last worker adds as much revenue as cost.' },
        { id: 'least-cost', name: 'Least-cost combination', tex: tex`\dfrac{MP_L}{P_L} = \dfrac{MP_K}{P_K}`, vars: [['L, K', 'labor and capital', '']], note: 'Profit max also needs MRP = price for each input.' },
      ],
    },
    {
      id: 'externalities',
      title: 'Externalities',
      formulas: [
        { id: 'social-benefit-cost', name: 'Social benefit and cost', tex: tex`MSB = MPB + MEB \qquad MSC = MPC + MEC`, vars: [['MEB, MEC', 'marginal external benefit and cost', '']], note: 'The efficient quantity is where MSB = MSC. A Pigouvian tax equal to MEC fixes a negative externality.' },
      ],
    },
  ],
};
