// AP World History: Modern, Unit 5: the Industrial Revolution, its spread, new
// economic ideas and reactions to it, c. 1750 to 1900.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
const MANUFACTURING_SHARE = {
  type: 'table',
  caption: 'Share of world manufacturing output (percent)',
  columns: ['Year', 'Britain', 'United States', 'China', 'India'],
  rows: [
    [1750, 1.9, 0.1, 32.8, 24.5],
    [1800, 4.3, 0.8, 33.3, 19.7],
    [1830, 9.5, 2.4, 29.8, 17.6],
    [1860, 19.9, 7.2, 19.7, 8.6],
    [1880, 22.9, 14.7, 12.5, 2.8],
    [1900, 18.5, 23.6, 6.2, 1.7],
  ],
  alt: 'Table of shares of world manufacturing output in percent. Britain rises from 1.9 in 1750 to 22.9 in 1880, then 18.5 in 1900. The United States rises from 0.1 to 23.6 by 1900. China falls from 32.8 in 1750 to 6.2 in 1900. India falls from 24.5 to 1.7.',
};
const MANUFACTURING_SOURCE = {
  text: 'The table restates estimates made by an economic historian. Figures before 1830 are rough, because few countries kept industrial statistics.',
  citation: 'Written for ScoreForge, based on estimates by Paul Bairoch, "International Industrialization Levels from 1750 to 1980," 1982.',
};

const MANIFESTO = {
  text: 'The history of all hitherto existing society is the history of class struggles. ... The proletarians have nothing to lose but their chains. They have a world to win. Working Men of All Countries, Unite!',
  citation: 'Karl Marx and Friedrich Engels, The Communist Manifesto, 1848. Translated by Samuel Moore, 1888.',
};

const ADAM_SMITH = {
  text: 'It is not from the benevolence of the butcher, the brewer, or the baker, that we expect our dinner, but from their regard to their own interest.',
  citation: 'Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations, 1776.',
};

const SADLER_TESTIMONY = {
  text: 'Question: At what age did you begin work at the mill? Answer: When I was six years old. Question: What were your hours of work? Answer: From five in the morning until nine at night when the mill was busy. Question: What happened if you were late or slow? Answer: We were strapped by the overlooker. Question: Has this work affected your health? Answer: Yes, my knees bent inward from standing so long, and I can no longer walk without pain.',
  citation: 'Written for ScoreForge, based on testimony of former child workers before the Sadler Committee of the British Parliament, 1832.',
};

export default [
  {
    id: 'whap-industrialization-001',
    topic: 'industrialization',
    difficulty: 1,
    figure: MANUFACTURING_SHARE,
    stimulus: MANUFACTURING_SOURCE,
    prompt: 'Which trend between 1750 and 1880 is shown in the table?',
    choices: [
      'China and India increased their share of world manufacturing.',
      'Britain\'s share of world manufacturing grew while the shares of China and India fell sharply.',
      'The United States had the largest share in every year shown.',
      'All four countries kept about the same share.',
    ],
    answer: 1,
    explanation: 'Britain went from about 2 percent to about 23 percent, while China fell from about 33 to 12.5 and India from about 24 to under 3. The United States led only in 1900.',
    reviewed: true,
  },
  {
    id: 'whap-industrialization-002',
    topic: 'industrialization',
    difficulty: 2,
    figure: MANUFACTURING_SHARE,
    stimulus: MANUFACTURING_SOURCE,
    prompt: 'Which factor best explains Britain\'s change in the table from 1750 to 1860?',
    choices: [
      'Britain had banned all trade with its colonies.',
      'Britain\'s population declined, freeing up land for factories.',
      'Britain had large deposits of coal and iron, capital to invest, and colonial markets and raw materials, and it mechanized textile production first.',
      'Britain received most of the silver mined in Spanish America.',
    ],
    answer: 2,
    explanation: 'Coal powered steam engines, iron built machines, and wealth from trade gave investors capital. Colonies supplied cotton and bought finished cloth. Britain\'s population grew in this period, which supplied factory workers.',
    reviewed: true,
  },
  {
    id: 'whap-industrialization-003',
    topic: 'industrialization',
    difficulty: 3,
    figure: MANUFACTURING_SHARE,
    stimulus: MANUFACTURING_SOURCE,
    prompt: 'The change in India\'s share of world manufacturing shown in the table is best explained by',
    choices: [
      'India\'s rapid industrialization under the Mughal emperors',
      'the arrival of the Black Death in South Asia',
      'Indian textile workers moving to factories in Britain',
      'cheap British factory cloth flooding Indian markets while British colonial rule favored exporting raw cotton from India',
    ],
    answer: 3,
    explanation: 'Machine-made British cloth was cheaper than handwoven Indian cloth, and British rule in India shaped trade to send raw materials to Britain and buy British goods. India\'s hand-textile industry, once the world\'s largest, collapsed. Historians call this deindustrialization.',
    reviewed: true,
  },
  {
    id: 'whap-industrialization-004',
    topic: 'industrialization',
    difficulty: 2,
    stimulus: MANIFESTO,
    prompt: 'Marx and Engels wrote the passage mainly in response to',
    choices: [
      'the working and living conditions of industrial workers under capitalism',
      'the spread of Protestantism in Europe',
      'Mongol rule in Russia',
      'the end of the transatlantic slave trade',
    ],
    answer: 0,
    explanation: 'Writing in 1848, during rapid industrialization, Marx and Engels argued that factory owners (the bourgeoisie) exploited workers (the proletariat), and that workers should unite and overthrow capitalism. Engels had studied factory conditions in Manchester.',
    reviewed: true,
  },
  {
    id: 'whap-industrialization-005',
    topic: 'industrialization',
    difficulty: 3,
    stimulus: ADAM_SMITH,
    prompt: 'Compared with The Communist Manifesto, the passage from Adam Smith argues that',
    choices: [
      'workers must overthrow the owners of businesses',
      'governments should own all means of production',
      'people pursuing their own interest in a free market end up meeting the needs of society',
      'trade between nations should be banned',
    ],
    answer: 2,
    explanation: 'Smith says the butcher and baker serve us because it profits them, so self-interest in a free market benefits everyone. This laissez-faire idea is the opposite of Marx\'s view that capitalism pits classes against each other. Smith supported free trade, so the last choice is wrong.',
    reviewed: true,
  },
  {
    id: 'whap-industrialization-006',
    topic: 'industrialization',
    difficulty: 2,
    stimulus: SADLER_TESTIMONY,
    prompt: 'Testimony like that in the passage most directly led to',
    choices: [
      'the end of the factory system in Britain',
      'British laws limiting the working hours of children in factories',
      'the British government taking ownership of all mills',
      'a return to farming for most British workers',
    ],
    answer: 1,
    explanation: 'The Sadler Committee\'s reports shocked many readers, and Parliament passed the Factory Act of 1833, which limited children\'s working hours and set up inspectors. Factories kept growing; reform made them less harsh rather than ending them.',
    reviewed: true,
  },
  {
    id: 'whap-industrialization-007',
    topic: 'industrialization',
    difficulty: 2,
    prompt: 'The industrialization of Japan after the Meiji Restoration of 1868 differed from early industrialization in Britain in that, in Japan,',
    choices: [
      'industry was built entirely by private inventors without government help',
      'industrialization never took place',
      'factories were owned by European colonial governments',
      'the government led and paid for much of the early industrial growth to strengthen Japan against Western powers',
    ],
    answer: 3,
    explanation: 'The Meiji government built railroads, shipyards and model factories, hired foreign experts and later sold many enterprises to business groups (zaibatsu). Its goal was to make Japan strong enough to resist Western imperialism. Japan was never a colony.',
    reviewed: true,
  },
  {
    id: 'whap-industrialization-008',
    topic: 'industrialization',
    difficulty: 1,
    prompt: 'The "Second Industrial Revolution" of the late 1800s is most closely linked with',
    choices: [
      'steel, chemicals, electricity and oil',
      'the spinning wheel and handloom',
      'the printing press',
      'the caravel and the astrolabe',
    ],
    answer: 0,
    explanation: 'After about 1870, new industries grew around steel (made cheaply with the Bessemer process), chemicals, electricity and oil, led especially by Germany and the United States. The handloom and printing press are much older technologies.',
    reviewed: true,
  },
  {
    id: 'whap-industrialization-009',
    topic: 'industrialization',
    difficulty: 2,
    prompt: 'How did industrialization change family life for many middle-class families in Europe and the United States?',
    choices: [
      'Men and women both worked side by side in the family farm, as before.',
      'Children from middle-class families went to work in coal mines.',
      'Work moved outside the home, and middle-class ideals said men should earn wages while women managed the home.',
      'Women gained the right to vote everywhere by 1850.',
    ],
    answer: 2,
    explanation: 'As work moved to offices and factories, the middle class adopted the ideal of "separate spheres": men in public work, women in the home. Working-class women and children, by contrast, often worked in factories. Women did not gain the vote anywhere in Europe or the US by 1850.',
    reviewed: true,
  },
];
