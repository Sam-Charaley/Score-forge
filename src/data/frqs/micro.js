// AP Microeconomics free-response practice. The exam has one long question
// (graphs and analysis across a whole market structure) and two short ones.
// Answers are written; graphs are drawn on paper and self-checked against
// the rubric, which lists each label, area and explanation as its own point.
// FRQ ids are permanent once reviewed: saved self-checks point at them.
// Rubric point ids are permanent too: saved scores list the ones earned.

export const FRQ_TYPES = {
  long: 'Long Response',
  short: 'Short Response',
};

// Payoffs are (Lumen, Prism) in thousands of dollars of weekly profit.
const PRICING_GAME = {
  type: 'table',
  caption: 'Weekly profit in thousands of dollars (Lumen, Prism)',
  columns: ['Lumen', 'Prism: High price', 'Prism: Low price'],
  rows: [
    ['High price', '40, 30', '15, 45'],
    ['Low price', '50, 20', '25, 25'],
  ],
  alt: 'Payoff matrix for Lumen (rows) and Prism (columns), profits listed as Lumen then Prism. Both high: 40 and 30. Lumen high, Prism low: 15 and 45. Lumen low, Prism high: 50 and 20. Both low: 25 and 25.',
};

export default [
  {
    id: 'micro-frq-long-001',
    type: 'long',
    title: 'Wheat farms in the long run',
    intro: 'The market for wheat is perfectly competitive and is a constant-cost industry. Hilltop Farm is a typical firm in the market, and the market is in long-run equilibrium.',
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'On paper, draw correctly labeled side-by-side graphs for the wheat market and for Hilltop Farm. In the market graph, label the equilibrium price PM and quantity QM. In the firm graph, show the firm\'s marginal revenue (MR), marginal cost (MC) and average total cost (ATC) curves, and label its profit-maximizing quantity qF.',
        solution: 'Market graph: price on the vertical axis and quantity on the horizontal axis, a downward-sloping demand curve and an upward-sloping supply curve crossing at PM and QM. Firm graph: price and cost on the vertical axis, quantity on the horizontal axis. A horizontal line at PM labeled MR = P (also the firm\'s demand). A U-shaped ATC curve and an MC curve that crosses ATC at its minimum. The MR line just touches the minimum of ATC, and qF is the quantity there, where MR = MC.',
        points: [
          { id: 'a1', text: 'Market graph has labeled axes, a downward-sloping demand curve, an upward-sloping supply curve, and PM and QM marked where they cross' },
          { id: 'a2', text: 'Firm graph shows a horizontal MR (= P = demand) line at the market price PM' },
          { id: 'a3', text: 'Firm graph shows qF where MR = MC, at the minimum point of ATC' },
        ],
      },
      {
        id: 'b',
        prompt: 'A new study reduces consumer demand for wheat. On your graphs from part (a), show the new short-run market price P2 and the firm\'s new quantity q2. Shade the area that represents Hilltop Farm\'s short-run economic loss.',
        solution: 'In the market graph, demand shifts left and the new equilibrium price P2 is below PM. In the firm graph, the MR line shifts down to P2, and q2 is where the new MR crosses MC, to the left of qF. P2 is below ATC at q2, so the loss is the rectangle with height ATC at q2 minus P2 and width q2, shaded between the ATC level and P2.',
        points: [
          { id: 'b1', text: 'Market demand shifts left, and P2 is marked below PM' },
          { id: 'b2', text: 'The firm\'s MR line moves down to P2, and q2 is where the new MR = MC, at a smaller quantity than qF' },
          { id: 'b3', text: 'The shaded loss is the rectangle between ATC at q2 and P2, from 0 to q2' },
        ],
      },
      {
        id: 'c',
        prompt: 'At P2, the price is above Hilltop Farm\'s average variable cost. Will Hilltop Farm continue to produce in the short run? Explain.',
        solution: 'Yes. Because the price covers average variable cost, the farm earns enough to pay all of its variable costs and some of its fixed cost. If it shut down it would lose all of its fixed cost, which is a larger loss.',
        points: [
          { id: 'c1', text: 'Says the farm keeps producing, and explains that price above AVC means its loss is smaller than its fixed cost (the loss from shutting down)' },
        ],
      },
      {
        id: 'd',
        prompt: 'Compared with the original long-run equilibrium, what happens in the long run to (i) the number of firms in the market and (ii) the market price of wheat? Explain.',
        solution: '(i) The number of firms decreases, because firms are earning economic losses and exit the industry. (ii) As firms exit, market supply shifts left until the price rises back to minimum ATC. Since this is a constant-cost industry, minimum ATC is unchanged, so the price returns to PM.',
        points: [
          { id: 'd1', text: 'Says the number of firms decreases because firms exit in response to losses' },
          { id: 'd2', text: 'Says the price returns to the original PM, because supply decreases until price equals the unchanged minimum ATC' },
        ],
      },
      {
        id: 'e',
        prompt: 'In the new long-run equilibrium, is Hilltop Farm allocatively efficient? Explain.',
        solution: 'Yes. A perfectly competitive firm produces where P = MC, so the value buyers place on the last unit equals the cost of producing it.',
        points: [
          { id: 'e1', text: 'Says yes and explains that price equals marginal cost' },
        ],
      },
    ],
  },
  {
    id: 'micro-frq-long-002',
    type: 'long',
    title: 'A patented medicine',
    intro: 'MediCo holds a patent on a new medicine and is the only seller. It is an unregulated, profit-maximizing monopolist and currently earns positive economic profit.',
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'On paper, draw a correctly labeled graph for MediCo showing its demand (D), marginal revenue (MR), marginal cost (MC) and average total cost (ATC) curves. Label its profit-maximizing quantity QM and price PM, and shade its economic profit.',
        solution: 'Price and cost on the vertical axis, quantity on the horizontal axis. A downward-sloping demand curve with an MR curve below it (twice as steep for a straight line). An upward-sloping MC curve and a U-shaped ATC curve. QM is where MR = MC. PM is read from the demand curve directly above QM. ATC at QM is below PM, and the profit is the rectangle from ATC up to PM, from 0 to QM.',
        points: [
          { id: 'a1', text: 'Graph has labeled axes, a downward-sloping demand curve and an MR curve below the demand curve' },
          { id: 'a2', text: 'QM is where MR = MC' },
          { id: 'a3', text: 'PM is on the demand curve above QM' },
          { id: 'a4', text: 'Profit is shaded as the rectangle between PM and ATC at QM' },
        ],
      },
      {
        id: 'b',
        prompt: 'On your graph, label the socially optimal (allocatively efficient) quantity QS, and shade the deadweight loss from monopoly.',
        solution: 'QS is where the demand curve crosses MC, to the right of QM. The deadweight loss is the triangle between QM and QS, below the demand curve and above the MC curve.',
        points: [
          { id: 'b1', text: 'QS is where demand crosses MC, at a larger quantity than QM' },
          { id: 'b2', text: 'Deadweight loss is shaded as the area between demand and MC from QM to QS' },
        ],
      },
      {
        id: 'c',
        prompt: 'At QM, is demand for MediCo\'s medicine price elastic, price inelastic or unit elastic? Explain.',
        solution: 'Elastic. MediCo produces where MR = MC, and MC is positive, so MR is positive at QM. Marginal revenue is positive only on the elastic part of the demand curve.',
        points: [
          { id: 'c1', text: 'Says elastic, and explains that MR = MC > 0, and MR is positive only where demand is elastic' },
        ],
      },
      {
        id: 'd',
        prompt: 'The government places a lump-sum tax on MediCo that is smaller than its economic profit. What happens to MediCo\'s profit-maximizing quantity and price? Explain.',
        solution: 'Neither changes. A lump-sum tax is like a fixed cost: it raises ATC but does not change MC or MR, so MR = MC still happens at QM, and the price is still PM. Only the firm\'s profit falls.',
        points: [
          { id: 'd1', text: 'Says quantity and price do not change, because the lump-sum tax does not affect MC (or MR)' },
        ],
      },
      {
        id: 'e',
        prompt: 'Suppose MediCo could perfectly price discriminate. Compared with the single-price outcome, what would happen to (i) consumer surplus and (ii) the quantity of medicine sold?',
        solution: '(i) Consumer surplus would fall to zero, because each buyer pays exactly the most they are willing to pay. (ii) The quantity would rise to QS, the allocatively efficient quantity, because MediCo would sell to every buyer willing to pay at least MC.',
        points: [
          { id: 'e1', text: 'Says consumer surplus falls to zero' },
          { id: 'e2', text: 'Says quantity increases to the socially optimal quantity QS (where demand meets MC)' },
        ],
      },
    ],
  },
  {
    id: 'micro-frq-short-001',
    type: 'short',
    title: 'Pricing game',
    intro: 'Lumen and Prism are the only two sellers of smart light bulbs. Each must choose a high price or a low price without knowing the other\'s choice. The payoff matrix shows each firm\'s weekly profit. Both firms know all the information in the matrix.',
    figure: PRICING_GAME,
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'Does Lumen have a dominant strategy? If so, identify it. Explain using numbers from the matrix.',
        solution: 'Yes, Lumen\'s dominant strategy is a low price. If Prism charges high, Lumen earns 50 with a low price versus 40 with a high price. If Prism charges low, Lumen earns 25 with a low price versus 15 with a high price. A low price is better either way.',
        points: [
          { id: 'a1', text: 'Says Lumen\'s dominant strategy is the low price' },
          { id: 'a2', text: 'Explains by comparing Lumen\'s payoffs for both of Prism\'s choices (50 > 40 and 25 > 15)' },
        ],
      },
      {
        id: 'b',
        prompt: 'Identify the Nash equilibrium of this game.',
        solution: 'Both firms charge a low price, with payoffs of 25 for Lumen and 25 for Prism. Prism\'s dominant strategy is also low (45 > 30 and 25 > 20), and at that cell neither firm can gain by switching alone.',
        points: [
          { id: 'b1', text: 'Identifies both firms choosing the low price (25, 25) as the Nash equilibrium' },
        ],
      },
      {
        id: 'c',
        prompt: 'Suppose the firms secretly agree to both charge a high price. Does Lumen have an incentive to break the agreement? Explain using numbers from the matrix.',
        solution: 'Yes. If Prism keeps the agreement and charges high, Lumen earns 50 by switching to a low price instead of 40 by keeping the high price.',
        points: [
          { id: 'c1', text: 'Says yes, because Lumen earns 50 instead of 40 by charging a low price when Prism charges high' },
        ],
      },
      {
        id: 'd',
        prompt: 'A new government fee reduces Lumen\'s profit by x thousand dollars in each outcome in which Lumen charges a low price. All other payoffs are unchanged. What is the smallest whole-number value of x that would make a high price Lumen\'s dominant strategy?',
        solution: 'Lumen\'s low-price payoffs become 50 − x and 25 − x. High must beat low in both cases: 40 > 50 − x and 15 > 25 − x, which both need x > 10. The smallest whole number is x = 11.',
        points: [
          { id: 'd1', text: 'Gives x = 11 (any fee greater than 10 thousand dollars)' },
        ],
      },
    ],
  },
  {
    id: 'micro-frq-short-002',
    type: 'short',
    title: 'Pollution from paint',
    intro: 'Paint factories release fumes that harm people living nearby. The market for paint is perfectly competitive, and the harm is the same for every can produced.',
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'On paper, draw a correctly labeled graph of the paint market showing the marginal private benefit (MPB), marginal private cost (MPC) and marginal social cost (MSC) curves. Label the market quantity QM and the socially optimal quantity QS.',
        solution: 'Price on the vertical axis and quantity on the horizontal axis. A downward-sloping MPB curve (demand, also MSB since there is no external benefit). An upward-sloping MPC curve (supply), and an MSC curve above MPC by the same distance at every quantity. QM is where MPB meets MPC. QS is where MPB meets MSC, to the left of QM.',
        points: [
          { id: 'a1', text: 'Graph has labeled axes, a downward-sloping MPB and an upward-sloping MPC, with MSC drawn above MPC' },
          { id: 'a2', text: 'QM is where MPB = MPC' },
          { id: 'a3', text: 'QS is where MPB = MSC, at a smaller quantity than QM' },
        ],
      },
      {
        id: 'b',
        prompt: 'On your graph, shade the deadweight loss that results when the market is unregulated.',
        solution: 'The deadweight loss is the triangle between QS and QM, bounded above by MSC and below by MPB.',
        points: [
          { id: 'b1', text: 'Shades the triangle between MSC and MPB from QS to QM' },
        ],
      },
      {
        id: 'c',
        prompt: 'The government wants the market to produce QS. Identify a per-unit tax that would achieve this, and explain how it works.',
        solution: 'A per-unit tax on producers equal to the marginal external cost (the vertical distance between MSC and MPC). It raises each firm\'s private cost so that MPC plus the tax equals MSC, and the market then produces where MPB = MSC, at QS.',
        points: [
          { id: 'c1', text: 'Says the tax should equal the marginal external cost (the gap between MSC and MPC), so producers\' cost matches MSC and output falls to QS' },
        ],
      },
    ],
  },
];
