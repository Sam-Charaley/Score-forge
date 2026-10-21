// AP Macroeconomics, Unit 1: scarcity, opportunity cost, the production
// possibilities curve and comparative advantage.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.

// Each country's output with all of its resources in one good (constant costs).
const OUTPUT_TABLE = {
  type: 'table',
  caption: 'Maximum output per worker per day',
  columns: ['Country', 'Wheat (bushels)', 'Cloth (meters)'],
  rows: [['Arland', 12, 4], ['Borovia', 6, 3]],
  alt: 'Table of maximum output per worker per day. Arland can make 12 bushels of wheat or 4 meters of cloth. Borovia can make 6 bushels of wheat or 3 meters of cloth.',
};
const ARLAND = { wheat: 12, cloth: 4 };
const BOROVIA = { wheat: 6, cloth: 3 };

// A straight-line PPC: constant opportunity cost.
const LINEAR_PPC = {
  type: 'graph', xLabel: 'Computers (thousands)', yLabel: 'Tractors (thousands)', xMax: 50, xStep: 10, yMin: 0, yMax: 25, yStep: 5,
  series: [{ points: [[0, 20], [40, 0]], label: 'PPC' }],
  alt: 'Graph of a straight-line production possibilities curve. It runs from 20 thousand tractors and 0 computers down to 0 tractors and 40 thousand computers.',
};

export default [
  {
    id: 'macro-scarcity-ppc-001',
    topic: 'scarcity-ppc',
    difficulty: 1,
    prompt: 'A student chooses to spend Saturday working a shift that pays $90 instead of going to a concert with a $40 ticket that she valued at $60. The concert was her next best alternative. What is the opportunity cost of working the shift?',
    choices: ['The $90 she earns', 'The concert she gives up', 'The $40 ticket price only', 'Nothing, because she earns money'],
    answer: 1,
    explanation: 'Opportunity cost is the value of the next best alternative given up, which here is going to the concert. The $90 is the benefit of working, not its cost.',
    reviewed: true,
  },
  {
    id: 'macro-scarcity-ppc-002',
    topic: 'scarcity-ppc',
    difficulty: 1,
    prompt: 'A point inside an economy\'s production possibilities curve shows that the economy is',
    choices: [
      'producing efficiently with full employment',
      'producing a combination it cannot reach with current resources',
      'not using all of its resources fully or efficiently',
      'experiencing economic growth',
    ],
    answer: 2,
    explanation: 'Points inside the PPC are attainable but inefficient: some resources are unemployed or misallocated, as in a recession. Points on the curve are efficient, and points outside are unattainable with current resources.',
    reviewed: true,
  },
  {
    id: 'macro-scarcity-ppc-003',
    topic: 'scarcity-ppc',
    difficulty: 2,
    prompt: 'A production possibilities curve is bowed outward (concave to the origin). This shape reflects',
    choices: [
      'increasing opportunity costs, because resources are not equally suited to producing both goods',
      'constant opportunity costs, because resources are perfectly substitutable',
      'decreasing opportunity costs, because of specialization',
      'unemployment of resources in the economy',
    ],
    answer: 0,
    explanation: 'As an economy makes more of one good, it must move resources that are less and less suited to that good, so each extra unit costs more of the other good. A straight-line PPC would mean constant opportunity costs.',
    reviewed: true,
  },
  {
    id: 'macro-scarcity-ppc-004',
    topic: 'scarcity-ppc',
    difficulty: 2,
    prompt: 'Based on the production possibilities curve shown, what is the opportunity cost of producing 1 more computer?',
    figure: LINEAR_PPC,
    choices: ['2 tractors', '0.5 tractor', '20 tractors', '40 tractors'],
    answer: 1,
    explanation: 'Moving along the whole curve, 20 thousand tractors are given up for 40 thousand computers, so each computer costs 20/40 = 0.5 tractor. 2 tractors divides the wrong way (40/20): that is the number of computers given up for each tractor, not tractors given up for each computer.',
    verify: 'numeric',
    solve: () => 20 / 40,
    reviewed: true,
  },
  {
    id: 'macro-scarcity-ppc-005',
    topic: 'scarcity-ppc',
    difficulty: 2,
    prompt: 'Based on the table, what is Arland\'s opportunity cost of producing 1 meter of cloth?',
    figure: OUTPUT_TABLE,
    choices: ['1/3 bushel of wheat', '2 bushels of wheat', '3 bushels of wheat', '4 bushels of wheat'],
    answer: 2,
    explanation: 'A worker in Arland can make 12 bushels of wheat or 4 meters of cloth, so 1 meter of cloth costs 12/4 = 3 bushels of wheat. 1/3 bushel is the cost of a bushel of wheat measured in cloth, and 2 bushels is Borovia\'s cost of cloth.',
    verify: 'numeric',
    solve: () => ARLAND.wheat / ARLAND.cloth,
    reviewed: true,
  },
  {
    id: 'macro-scarcity-ppc-006',
    topic: 'scarcity-ppc',
    difficulty: 2,
    prompt: 'Based on the table, which statement is correct?',
    figure: OUTPUT_TABLE,
    choices: [
      'Arland has a comparative advantage in both goods.',
      'Borovia has an absolute advantage in cloth.',
      'Arland has a comparative advantage in cloth, and Borovia in wheat.',
      'Arland has a comparative advantage in wheat, and Borovia in cloth.',
    ],
    answer: 3,
    explanation: 'Arland gives up 3 wheat per cloth and Borovia only 2, so Borovia has the lower cost of cloth. In turn, Arland gives up 1/3 cloth per wheat and Borovia 1/2, so Arland has the lower cost of wheat. Arland has the absolute advantage in both goods, but no country can have the comparative advantage in both.',
    reviewed: true,
  },
  {
    id: 'macro-scarcity-ppc-007',
    topic: 'scarcity-ppc',
    difficulty: 3,
    prompt: 'Based on the table, which of the following terms of trade would benefit both Arland and Borovia if Arland exports wheat and imports cloth?',
    figure: OUTPUT_TABLE,
    choices: [
      '1 meter of cloth for 1.5 bushels of wheat',
      '1 meter of cloth for 2.5 bushels of wheat',
      '1 meter of cloth for 3.5 bushels of wheat',
      '1 meter of cloth for 4 bushels of wheat',
    ],
    answer: 1,
    explanation: 'Trade helps both countries when the price of cloth lies between their opportunity costs: Borovia gives up 2 wheat per cloth and Arland 3. A price of 2.5 wheat is in that range. At 1.5, Borovia would rather make its own wheat; at 3.5 or 4, Arland would rather make its own cloth.',
    reviewed: true,
  },
  {
    id: 'macro-scarcity-ppc-008',
    topic: 'scarcity-ppc',
    difficulty: 3,
    prompt: 'An economy produces only consumer goods and capital goods. Compared with an economy that chooses mostly consumer goods today, an economy that chooses more capital goods today will most likely have',
    choices: [
      'a PPC that shifts outward by more in the future',
      'a PPC that shifts inward in the future',
      'a point outside its current PPC today',
      'lower opportunity costs of capital goods today',
    ],
    answer: 0,
    explanation: 'Capital goods are a resource used to produce future output, so choosing more of them today adds to productive capacity and shifts the future PPC out further. Today, the choice is still a point on the current curve, not outside it.',
    reviewed: true,
  },
];
