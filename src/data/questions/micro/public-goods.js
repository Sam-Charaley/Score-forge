// AP Microeconomics, Unit 6: public goods and common resources, the free-rider
// problem, and income distribution (Lorenz curve, Gini coefficient, taxes).
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// Each resident's marginal benefit from each streetlight on a shared road.
const RESIDENT_BENEFITS = { Ari: [60, 40, 20, 10], Bea: [50, 30, 20, 0], Cal: [40, 30, 20, 10] };
const STREETLIGHT_TABLE = {
  type: 'table',
  caption: 'Marginal benefit of each streetlight ($)',
  columns: ['Streetlight', 'Ari', 'Bea', 'Cal'],
  rows: ['1st', '2nd', '3rd', '4th'].map((light, i) => [light, ...Object.values(RESIDENT_BENEFITS).map(mb => mb[i])]),
  alt: 'Table of each resident\'s marginal benefit from streetlights. 1st light: Ari $60, Bea $50, Cal $40. 2nd: Ari $40, Bea $30, Cal $30. 3rd: Ari $20, Bea $20, Cal $20. 4th: Ari $10, Bea $0, Cal $10.',
};
// A public good's social benefit adds every resident's benefit from the same unit.
const socialBenefit = light => Object.values(RESIDENT_BENEFITS).reduce((sum, mb) => sum + mb[light - 1], 0);
const efficientLights = cost => [1, 2, 3, 4].filter(light => socialBenefit(light) >= cost).length;
const LIGHT_COST = 70;

export default [
  {
    id: 'micro-public-goods-001',
    topic: 'public-goods',
    difficulty: 1,
    prompt: 'Which of the following is the best example of a public good?',
    choices: ['A slice of pizza', 'A ticket to a movie', 'National defense', 'A seat on a crowded bus'],
    answer: 2,
    explanation: 'A public good is nonrival (one person\'s use does not reduce what others get) and nonexcludable (people cannot be kept from benefiting). National defense protects everyone in the country at once. Pizza, movie tickets and bus seats are all rival, and sellers can exclude people who do not pay.',
    reviewed: true,
  },
  {
    id: 'micro-public-goods-002',
    topic: 'public-goods',
    difficulty: 2,
    prompt: 'Private markets tend to underprovide public goods mainly because of',
    choices: [
      'the free-rider problem: people can benefit without paying, so few will pay',
      'diminishing marginal utility',
      'barriers to entry that keep firms out',
      'negative externalities from producing them',
    ],
    answer: 0,
    explanation: 'Because no one can be excluded, each person has an incentive to let others pay and enjoy the good for free. Firms cannot collect enough revenue to cover the cost, even when the total benefit is large, so the government often provides public goods and pays for them with taxes.',
    reviewed: true,
  },
  {
    id: 'micro-public-goods-003',
    topic: 'public-goods',
    difficulty: 2,
    prompt: 'Fish in the open ocean are rival in consumption but not excludable. As a result, they are most likely to be',
    choices: [
      'underused, because no one can be charged for them',
      'provided only by the government',
      'used efficiently, because anyone can catch them',
      'overused, in what is called the tragedy of the commons',
    ],
    answer: 3,
    explanation: 'Fish are a common resource: a fish one boat catches is not available to another, but no one can be kept from fishing. Each boat ignores the cost its catch imposes on others, so the stock is overfished. Public goods have the opposite problem: they are underprovided, not overused.',
    reviewed: true,
  },
  {
    id: 'micro-public-goods-004',
    topic: 'public-goods',
    difficulty: 2,
    prompt: 'Three residents share a road. The table shows each one\'s marginal benefit from streetlights, which are a public good on that road. What is the marginal social benefit of the 3rd streetlight, in dollars?',
    figure: STREETLIGHT_TABLE,
    choices: ['20', '100', '60', '150'],
    answer: 2,
    explanation: 'All three residents enjoy the same streetlight at once, so its social benefit is the sum of their benefits: $20 + $20 + $20 = $60. $20 is just one resident\'s benefit, and $100 is the social benefit of the 2nd light.',
    verify: 'numeric',
    solve: () => socialBenefit(3),
    reviewed: true,
  },
  {
    id: 'micro-public-goods-005',
    topic: 'public-goods',
    difficulty: 3,
    prompt: `Using the table, each streetlight costs $${LIGHT_COST}. What is the socially efficient number of streetlights?`,
    figure: STREETLIGHT_TABLE,
    choices: ['1 streetlight', '2 streetlights', '3 streetlights', '4 streetlights'],
    answer: 1,
    explanation: 'The marginal social benefits of the 1st to 4th lights are $150, $100, $60 and $20. Provide each light whose social benefit is at least its $70 cost: the 2nd ($100) qualifies, but the 3rd ($60) does not. If each resident compared only their own benefit to the full cost, no one would pay for even one light, which is the free-rider problem.',
    verify: 'numeric',
    solve: () => efficientLights(LIGHT_COST),
    reviewed: false,
  },
  {
    id: 'micro-public-goods-006',
    topic: 'public-goods',
    difficulty: 2,
    prompt: 'Country A\'s Lorenz curve lies much farther from the line of perfect equality than Country B\'s. Which is true?',
    choices: [
      'Country A has more equal incomes and a lower Gini coefficient.',
      'Country A has more equal incomes and a higher Gini coefficient.',
      'Country A has less equal incomes and a lower Gini coefficient.',
      'Country A has less equal incomes and a higher Gini coefficient.',
    ],
    answer: 3,
    explanation: 'The Lorenz curve shows the share of income earned by each share of households. The farther it bows away from the 45-degree line of equality, the more unequal the distribution, and the Gini coefficient (the area between the curves as a share of the area under the line) gets closer to 1.',
    reviewed: true,
  },
  {
    id: 'micro-public-goods-007',
    topic: 'public-goods',
    difficulty: 2,
    prompt: 'Under a tax system, a household earning $20,000 pays $1,000 in tax, and a household earning $80,000 pays $8,000. This tax is',
    choices: ['progressive', 'regressive', 'proportional', 'lump-sum'],
    answer: 0,
    explanation: 'The lower-income household pays 5% of its income and the higher-income household pays 10%. When the share of income paid rises as income rises, the tax is progressive. The richer household paying more dollars is not enough; a proportional tax would charge both the same percentage.',
    reviewed: true,
  },
  {
    id: 'micro-public-goods-008',
    topic: 'public-goods',
    difficulty: 2,
    prompt: 'A sales tax on groceries is usually considered regressive because',
    choices: [
      'it charges higher rates on more expensive foods',
      'lower-income households spend a larger share of their income on groceries',
      'it is collected from stores rather than shoppers',
      'higher-income households buy more groceries in total',
    ],
    answer: 1,
    explanation: 'The tax rate is the same for everyone, but a family with less income spends a bigger fraction of it on food, so the tax takes a larger share of its income. A tax that takes a smaller share as income rises is regressive. Who sends the money to the government does not determine this.',
    reviewed: true,
  },
  {
    id: 'micro-public-goods-009',
    topic: 'public-goods',
    difficulty: 3,
    prompt: 'A government raises income tax rates on high earners and uses the revenue to fund cash transfers to low-income households. The most likely effect on the country\'s Lorenz curve and Gini coefficient is that',
    choices: [
      'the Lorenz curve moves away from the line of equality, and the Gini coefficient rises',
      'the Lorenz curve does not change, because total income is the same',
      'the Lorenz curve moves toward the line of equality, and the Gini coefficient falls',
      'the Lorenz curve moves toward the line of equality, and the Gini coefficient rises',
    ],
    answer: 2,
    explanation: 'Taking a larger share from high earners and giving it to low earners raises the income share of the bottom groups. The Lorenz curve shifts toward the 45-degree line, and the Gini coefficient, which measures inequality, falls. The Lorenz curve shows how income is shared, so it can change even if total income does not.',
    reviewed: true,
  },
];
