// AP Microeconomics, Unit 4: monopolistic competition in the short and long
// run, product differentiation, advertising, excess capacity and efficiency.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
import { valueAt } from '../figureMath.js'

// A firm's demand P = 16 − Q, MR = 16 − 2Q and MC = Q − 2, so MR = MC at Q = 6.
const demandPrice = q => 16 - q;
const PROFIT_Q = 6;
const ATC_POINTS = [[1, 16], [3, 10], [6, 7], [8, 6], [11, 7], [14, 10]];
const FIRM_GRAPH = {
  type: 'graph', xLabel: 'Quantity (units)', yLabel: 'Price and cost ($)', xMax: 16, xStep: 2, yMin: 0, yMax: 16, yStep: 2,
  series: [
    { points: [[0, 16], [16, 0]], label: 'D' },
    { points: [[0, 16], [8, 0]], label: 'MR' },
    { points: [[2, 0], [16, 14]], label: 'MC' },
    { points: ATC_POINTS, label: 'ATC' },
  ],
  alt: 'Cost and revenue curves for a monopolistically competitive firm. Demand D falls from $16 at 0 units to $0 at 16 units. MR falls from $16 at 0 units to $0 at 8 units. MC rises in a straight line from $0 at 2 units to $14 at 16 units. ATC is U-shaped: $16 at 1 unit, $10 at 3 units, $7 at 6 units, a minimum of $6 at 8 units, $7 at 11 units and $10 at 14 units. MR crosses MC at 6 units, where demand is at $10.',
};

export default [
  {
    id: 'micro-monopolistic-competition-001',
    topic: 'monopolistic-competition',
    difficulty: 1,
    prompt: 'Which set of characteristics describes monopolistic competition?',
    choices: [
      'Many firms, differentiated products and easy entry and exit',
      'Many firms, identical products and easy entry and exit',
      'A few large firms, interdependent decisions and high barriers to entry',
      'One firm, no close substitutes and high barriers to entry',
    ],
    answer: 0,
    explanation: 'Monopolistically competitive firms, such as restaurants or hair salons, each sell a slightly different product, which gives them some control over price, but entry is easy. Identical products describe perfect competition, a few interdependent firms describe oligopoly, and one firm is a monopoly.',
    reviewed: true,
  },
  {
    id: 'micro-monopolistic-competition-002',
    topic: 'monopolistic-competition',
    formulas: ['profit-max'],
    difficulty: 2,
    prompt: 'The graph shows a monopolistically competitive firm in the short run. What quantity maximizes its profit?',
    figure: FIRM_GRAPH,
    choices: ['8 units', '10 units', '6 units', '4 units'],
    answer: 2,
    explanation: 'The firm produces where MR = MC: MR = 16 − 2Q and MC = Q − 2 meet at 6 units. 8 units is where ATC is lowest and where MR reaches zero, neither of which is the profit rule. The price, $10, should not be confused with the quantity.',
    verify: 'numeric',
    solve: () => {
      // 16 − 2Q = Q − 2
      return (16 + 2) / 3;
    },
    reviewed: true,
  },
  {
    id: 'micro-monopolistic-competition-003',
    topic: 'monopolistic-competition',
    formulas: ['profit'],
    difficulty: 3,
    prompt: 'Using the graph, what is the firm\'s short-run economic profit, in dollars?',
    figure: FIRM_GRAPH,
    choices: ['24', '60', '42', '18'],
    answer: 3,
    explanation: 'At 6 units the firm charges $10 (from demand) and ATC is $7, so profit is ($10 − $7) × 6 = $18. $24 uses the minimum ATC of $6 instead of ATC at the chosen quantity, $60 is total revenue, and $42 is total cost.',
    verify: 'numeric',
    solve: () => (demandPrice(PROFIT_Q) - valueAt(ATC_POINTS, PROFIT_Q)) * PROFIT_Q,
    reviewed: true,
  },
  {
    id: 'micro-monopolistic-competition-004',
    topic: 'monopolistic-competition',
    difficulty: 3,
    prompt: 'Using the graph, the firm is earning economic profit. Which describes the long-run adjustment?',
    figure: FIRM_GRAPH,
    choices: [
      'Firms exit, and the firm\'s demand curve shifts right until it is tangent to MC.',
      'Firms enter, and the firm\'s demand curve shifts left until it is tangent to ATC.',
      'The firm keeps its profit because its product is differentiated.',
      'Firms enter until the price equals minimum ATC of $6.',
    ],
    answer: 1,
    explanation: 'Easy entry means profit attracts new firms with similar products, which take customers away, so each firm\'s demand shifts left (and becomes more elastic). This continues until demand just touches ATC, where P = ATC and profit is zero. Unlike perfect competition, that tangency is on the falling part of ATC, so price does not fall all the way to minimum ATC.',
    reviewed: false,
  },
  {
    id: 'micro-monopolistic-competition-005',
    topic: 'monopolistic-competition',
    formulas: ['allocative-efficiency'],
    difficulty: 2,
    prompt: 'In long-run equilibrium, a monopolistically competitive firm',
    choices: [
      'earns zero economic profit and charges a price above marginal cost',
      'earns positive economic profit and produces at minimum ATC',
      'charges a price equal to marginal cost and minimum ATC',
      'earns an economic loss because of advertising costs',
    ],
    answer: 0,
    explanation: 'Entry drives profit to zero, so P = ATC. But the firm still faces a downward-sloping demand curve, so MR is below price and MR = MC leaves P above MC. It is neither allocatively efficient (P > MC) nor productively efficient (output is below the minimum of ATC).',
    reviewed: true,
  },
  {
    id: 'micro-monopolistic-competition-006',
    topic: 'monopolistic-competition',
    difficulty: 2,
    prompt: 'A coffee shop in a monopolistically competitive market spends heavily on advertising its unique atmosphere. Its main goal is to',
    choices: [
      'make its demand curve perfectly elastic',
      'lower its average total cost',
      'increase demand for its product and make that demand less elastic',
      'drive the market price down to marginal cost',
    ],
    answer: 2,
    explanation: 'Advertising and branding try to convince buyers that the product has no close substitutes. That shifts the firm\'s demand right and makes it less elastic, so the firm can charge more without losing many customers. Advertising adds to costs, so it raises ATC rather than lowering it.',
    reviewed: true,
  },
  {
    id: 'micro-monopolistic-competition-007',
    topic: 'monopolistic-competition',
    difficulty: 3,
    prompt: 'Monopolistically competitive firms are said to have excess capacity in the long run. This means each firm',
    choices: [
      'produces more than consumers want to buy',
      'produces less than the quantity at which its ATC would be lowest',
      'has more workers than it needs to produce its output',
      'earns economic profit because it could sell more',
    ],
    answer: 1,
    explanation: 'In the long run, demand is tangent to ATC on its falling part, to the left of minimum ATC. Each firm could lower its cost per unit by producing more, but it would have to cut its price to sell the extra output. The gap between its output and the output at minimum ATC is excess capacity.',
    reviewed: true,
  },
  {
    id: 'micro-monopolistic-competition-008',
    topic: 'monopolistic-competition',
    difficulty: 1,
    prompt: 'Which industry is the best example of monopolistic competition?',
    choices: ['Local electricity service', 'Wheat farming', 'Commercial aircraft manufacturing', 'Restaurants in a large city'],
    answer: 3,
    explanation: 'A big city has many restaurants, each with its own menu, location and style, and new ones open easily. Wheat is an identical product sold by many farms (perfect competition), aircraft manufacturing has a few large firms (oligopoly), and local electricity is usually a natural monopoly.',
    reviewed: true,
  },
];
