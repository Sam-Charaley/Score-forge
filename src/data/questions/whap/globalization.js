// AP World History: Modern, Unit 9: technology, health, the environment, the
// global economy, rights and culture since 1900, especially since 1945.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
const POPULATION_HEALTH = {
  type: 'table',
  caption: 'World population and life expectancy, 1950 to 2020',
  columns: ['Year', 'World population (billions)', 'Average life expectancy at birth (years)'],
  rows: [
    [1950, 2.5, 46],
    [1975, 4.1, 58],
    [2000, 6.1, 67],
    [2020, 7.8, 72],
  ],
  alt: 'Table of world population and average life expectancy at birth. 1950: 2.5 billion people, 46 years. 1975: 4.1 billion, 58 years. 2000: 6.1 billion, 67 years. 2020: 7.8 billion, 72 years.',
};
const POPULATION_HEALTH_SOURCE = {
  text: 'The table rounds United Nations estimates. Life expectancy is the average for the whole world; it was much lower in poorer countries and higher in richer ones.',
  citation: 'Written for ScoreForge, based on United Nations, World Population Prospects estimates.',
};

const CARBON_DIOXIDE = {
  type: 'table',
  caption: 'Carbon dioxide in the atmosphere, measured at Mauna Loa, Hawaii',
  columns: ['Year', 'CO₂ (parts per million)'],
  rows: [
    [1960, 317],
    [1980, 339],
    [2000, 370],
    [2020, 414],
  ],
  alt: 'Table of yearly average carbon dioxide in the atmosphere measured at Mauna Loa, Hawaii, in parts per million: 317 in 1960, 339 in 1980, 370 in 2000 and 414 in 2020, rising faster in each period.',
};
const CARBON_DIOXIDE_SOURCE = {
  text: 'The table rounds yearly averages from the longest continuous record of atmospheric carbon dioxide. Before industrialization, levels were about 280 parts per million.',
  citation: 'Written for ScoreForge, based on US National Oceanic and Atmospheric Administration (NOAA) Mauna Loa measurements.',
};

const BORLAUG = {
  text: 'New varieties of wheat and rice, with fertilizer and water, have doubled harvests in parts of Mexico, India and Pakistan within a few years. Countries that faced famine now grow enough to feed themselves. But this is only a breathing space. If population keeps growing at the present rate, the gains will be swallowed up, and the hungry will return.',
  citation: 'Written for ScoreForge, based on Norman Borlaug (an American plant scientist), Nobel Peace Prize lecture, 1970.',
};

export default [
  {
    id: 'whap-globalization-001',
    topic: 'globalization',
    difficulty: 1,
    figure: POPULATION_HEALTH,
    stimulus: POPULATION_HEALTH_SOURCE,
    prompt: 'Which statement is best supported by the table?',
    choices: [
      'World population more than tripled while average life expectancy rose by about 26 years.',
      'World population fell after 1975.',
      'Life expectancy stayed the same from 1950 to 2020.',
      'World population doubled every ten years.',
    ],
    answer: 0,
    explanation: 'Population went from 2.5 to 7.8 billion (just over three times) and life expectancy from 46 to 72 years. Doubling every ten years would have meant far more than 7.8 billion people by 2020.',
    reviewed: false,
  },
  {
    id: 'whap-globalization-002',
    topic: 'globalization',
    difficulty: 2,
    figure: POPULATION_HEALTH,
    stimulus: POPULATION_HEALTH_SOURCE,
    prompt: 'Which developments best explain the changes shown in the table?',
    choices: [
      'The spread of the Black Death and the Columbian Exchange',
      'Vaccines, antibiotics and the Green Revolution in agriculture',
      'The Great Depression and the world wars',
      'The end of the Cold War and the breakup of the Soviet Union',
    ],
    answer: 1,
    explanation: 'Vaccines (smallpox was eradicated in 1980), antibiotics, clean water programs and higher crop yields from the Green Revolution cut death rates, especially for children, so population grew quickly. The Black Death and the Columbian Exchange belong to much earlier periods.',
    reviewed: false,
  },
  {
    id: 'whap-globalization-003',
    topic: 'globalization',
    difficulty: 2,
    figure: CARBON_DIOXIDE,
    stimulus: CARBON_DIOXIDE_SOURCE,
    prompt: 'The trend in the table is mainly the result of',
    choices: [
      'volcanic eruptions in the Pacific',
      'the decline of industry after 1960',
      'burning fossil fuels such as coal, oil and natural gas, along with deforestation',
      'the eradication of smallpox',
    ],
    answer: 2,
    explanation: 'Burning fossil fuels for energy, transport and industry releases carbon dioxide, and cutting forests removes plants that absorb it. Global industry grew rather than declined after 1960. Scientists link the rise to climate change.',
    reviewed: false,
  },
  {
    id: 'whap-globalization-004',
    topic: 'globalization',
    difficulty: 3,
    figure: CARBON_DIOXIDE,
    stimulus: CARBON_DIOXIDE_SOURCE,
    prompt: 'Which response to the problem shown in the table reflects a broader pattern of globalization?',
    choices: [
      'Countries left the United Nations to focus on their own economies.',
      'Each country agreed to stop all industry by 2000.',
      'The problem was solved by a single country acting alone.',
      'Countries negotiated international agreements, such as the Kyoto Protocol (1997) and the Paris Agreement (2015), to limit emissions.',
    ],
    answer: 3,
    explanation: 'Climate change affects every country, so governments tried to address it through global agreements, as they did with trade (the WTO) and health (the WHO). These agreements set targets but have been hard to enforce, and emissions kept rising.',
    reviewed: false,
  },
  {
    id: 'whap-globalization-005',
    topic: 'globalization',
    difficulty: 2,
    stimulus: BORLAUG,
    prompt: 'The developments Borlaug describes are known as',
    choices: ['the Green Revolution', 'the Great Leap Forward', 'collectivization', 'the Columbian Exchange'],
    answer: 0,
    explanation: 'The Green Revolution spread high-yield seeds, chemical fertilizers and irrigation in the 1950s to 1970s and greatly increased food production in Mexico, India and elsewhere. The Great Leap Forward and Soviet collectivization were communist farm policies that caused famines.',
    reviewed: false,
  },
  {
    id: 'whap-globalization-006',
    topic: 'globalization',
    difficulty: 3,
    stimulus: BORLAUG,
    prompt: 'A critic of the developments in the passage would most likely argue that they',
    choices: [
      'had no effect on harvests',
      'were forced on farmers by the Soviet Union',
      'depended on costly fertilizer, pesticides and water, which harmed the environment and favored farmers who could afford them',
      'ended population growth in India',
    ],
    answer: 2,
    explanation: 'The new seeds needed fertilizer, pesticides and irrigation. Wealthier farmers gained the most, some poor farmers went into debt, and heavy chemical and water use damaged soil and groundwater. The passage itself says harvests doubled, so the first choice is wrong.',
    reviewed: false,
  },
  {
    id: 'whap-globalization-007',
    topic: 'globalization',
    difficulty: 1,
    prompt: 'Which technologies most reduced the cost and time of global communication and trade in the late 1900s?',
    choices: [
      'The steam engine and the telegraph',
      'The caravel and the astrolabe',
      'The printing press and gunpowder',
      'Container shipping and the internet',
    ],
    answer: 3,
    explanation: 'Standard shipping containers made moving goods by sea far cheaper, and the internet and cell phones made communication almost instant and nearly free. Steam engines and the telegraph transformed the 1800s.',
    reviewed: false,
  },
  {
    id: 'whap-globalization-008',
    topic: 'globalization',
    difficulty: 2,
    prompt: 'China\'s economic reforms under Deng Xiaoping after 1978 are an example of',
    choices: [
      'a return to the Five-Year Plans of the 1930s',
      'a communist state adopting market reforms and opening to foreign investment',
      'the end of Communist Party rule',
      'the collectivization of all farms',
    ],
    answer: 1,
    explanation: 'Deng allowed private farming and businesses, created special economic zones for foreign investment and expanded trade, while the Communist Party kept political control. Similar free-market shifts happened in many countries in the 1980s and 1990s.',
    reviewed: false,
  },
  {
    id: 'whap-globalization-009',
    topic: 'globalization',
    difficulty: 2,
    prompt: 'The Universal Declaration of Human Rights (1948) and later movements for civil rights and women\'s rights are similar in that they',
    choices: [
      'claimed that rights belong to every person, regardless of race, sex or nationality',
      'argued that only citizens of powerful nations deserve rights',
      'were adopted only in Europe',
      'rejected the idea of international organizations',
    ],
    answer: 0,
    explanation: 'The UN declaration set out rights for all people, and civil rights, anti-apartheid and feminist movements used similar claims of universal equality to challenge discrimination around the world. The declaration came from the United Nations, an international body.',
    reviewed: false,
  },
  {
    id: 'whap-globalization-010',
    topic: 'globalization',
    difficulty: 3,
    prompt: 'Which best describes a reaction against globalization in the late 1900s and early 2000s?',
    choices: [
      'All countries left the World Trade Organization.',
      'International trade stopped growing after 1990.',
      'Protests against free-trade agreements and the WTO, and movements to protect local cultures, religions and jobs',
      'The internet was banned in most countries.',
    ],
    answer: 2,
    explanation: 'Critics argued that globalization moved jobs to low-wage countries, hurt the environment and spread Western culture at the expense of local traditions, as in the 1999 WTO protests in Seattle. Trade kept growing, and the WTO gained members.',
    reviewed: false,
  },
];
