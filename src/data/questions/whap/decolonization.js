// AP World History: Modern, Unit 8: independence movements, decolonization and
// the new states that followed, c. 1900 to the present.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
const UN_MEMBERS = {
  type: 'table',
  caption: 'Member states of the United Nations',
  columns: ['Year', 'Number of member states'],
  rows: [
    [1945, 51],
    [1955, 76],
    [1960, 99],
    [1965, 117],
    [1970, 127],
    [1980, 154],
  ],
  alt: 'Table of the number of United Nations member states: 51 in 1945, 76 in 1955, 99 in 1960, 117 in 1965, 127 in 1970 and 154 in 1980, roughly tripling in 35 years.',
};
const UN_MEMBERS_SOURCE = {
  text: 'The table restates official United Nations membership counts. Nearly all states that joined in this period had been colonies or protectorates.',
  citation: 'Written for ScoreForge, based on United Nations records of member states and their dates of admission.',
};

const GANDHI = {
  text: 'We do not seek to drive out the English by force. Violence would only make us like those who rule us. Our weapon is truth-force: we will refuse to obey unjust laws and accept the punishment calmly, without hatred. If millions of Indians refuse to cooperate, to buy British cloth, to serve in British offices and to pay unjust taxes, British rule cannot last a single day, because it rests on our cooperation.',
  citation: 'Written for ScoreForge, based on Mohandas K. Gandhi (leader of the Indian independence movement), Hind Swaraj (Indian Home Rule), 1909, and his later speeches.',
};

const NKRUMAH = {
  text: 'The flag of a new nation flies, and its leaders sit in the national assembly. But in many cases independence is only a name. The foreign companies still own the mines and plantations, the prices of our cocoa and copper are still set in London and New York, and the loans we must take come with conditions written abroad. This is neo-colonialism: control from outside, without the burden of ruling directly.',
  citation: 'Written for ScoreForge, based on Kwame Nkrumah (first president of Ghana), Neo-Colonialism: The Last Stage of Imperialism, 1965.',
};

export default [
  {
    id: 'whap-decolonization-001',
    topic: 'decolonization',
    difficulty: 1,
    figure: UN_MEMBERS,
    stimulus: UN_MEMBERS_SOURCE,
    prompt: 'The large increase in UN membership between 1955 and 1965 is best explained by',
    choices: [
      'the breakup of the Soviet Union',
      'the creation of new states in Europe after the First World War',
      'the independence of many former colonies, especially in Africa',
      'the reunification of Germany',
    ],
    answer: 2,
    explanation: 'Seventeen African countries became independent in 1960 alone, and many more followed through the decade, each joining the UN. The Soviet Union broke up and Germany reunified around 1990 to 1991, after the period in the table.',
    reviewed: false,
  },
  {
    id: 'whap-decolonization-002',
    topic: 'decolonization',
    difficulty: 2,
    figure: UN_MEMBERS,
    stimulus: UN_MEMBERS_SOURCE,
    prompt: 'The data in the table best support which claim?',
    choices: [
      'European empires grew larger after 1945.',
      'Within about 35 years of 1945, the number of sovereign states roughly tripled as colonial empires broke up.',
      'Most new states left the UN soon after joining.',
      'The UN stopped admitting new members after 1960.',
    ],
    answer: 1,
    explanation: 'Membership went from 51 to 154, and the source note says nearly all the new members had been colonies or protectorates. Membership kept rising after 1960, so the last choice misreads the table.',
    reviewed: false,
  },
  {
    id: 'whap-decolonization-003',
    topic: 'decolonization',
    difficulty: 1,
    stimulus: GANDHI,
    prompt: 'Which action by the Indian independence movement best reflects the method in the passage?',
    choices: [
      'The Salt March of 1930, in which Gandhi and his followers made salt in defiance of British law',
      'An armed uprising against British troops',
      'A request for Soviet military aid',
      'A treaty dividing India between Britain and France',
    ],
    answer: 0,
    explanation: 'The British taxed salt and banned Indians from making it. Gandhi led a march to the sea to make salt, openly breaking the law and accepting arrest, which is the nonviolent civil disobedience the passage describes. Armed revolt is what Gandhi rejected.',
    reviewed: false,
  },
  {
    id: 'whap-decolonization-004',
    topic: 'decolonization',
    difficulty: 2,
    stimulus: GANDHI,
    prompt: 'The path to independence that the passage supports differed most from the path taken in which country?',
    choices: [
      'Ghana, which became independent through negotiation and elections in 1957',
      'Algeria, which won independence from France in 1962 after a long armed struggle',
      'Indonesia, which used Sukarno\'s speeches to gain support',
      'Burma, which became independent from Britain in 1948',
    ],
    answer: 1,
    explanation: 'France fought hard to keep Algeria, where about a million European settlers lived, and the National Liberation Front (FLN) fought an eight-year war for independence. Ghana\'s mostly peaceful, negotiated path was closer to Gandhi\'s approach.',
    reviewed: false,
  },
  {
    id: 'whap-decolonization-005',
    topic: 'decolonization',
    difficulty: 2,
    stimulus: NKRUMAH,
    prompt: 'Nkrumah\'s main argument in the passage is that',
    choices: [
      'Ghana should rejoin the British Empire',
      'independence had fully solved the problems of former colonies',
      'new nations should rely more on foreign loans',
      'former colonies remained under outside economic control even after gaining political independence',
    ],
    answer: 3,
    explanation: 'He says the flag and assembly are signs of independence, but foreign companies, foreign markets and foreign lenders still controlled the economy. That is his idea of neo-colonialism. He criticizes the loan conditions, so he does not want more of them.',
    reviewed: false,
  },
  {
    id: 'whap-decolonization-006',
    topic: 'decolonization',
    difficulty: 3,
    stimulus: NKRUMAH,
    prompt: 'Which evidence would best support Nkrumah\'s argument?',
    choices: [
      'Many former colonies continued to depend on exporting one or two raw materials whose prices were set in world markets.',
      'Many new states built national universities after independence.',
      'Ghana adopted a new national flag in 1957.',
      'Most African states joined the United Nations.',
    ],
    answer: 0,
    explanation: 'Economies that rely on exporting cocoa, copper or other raw goods have little control over their income, which is the dependence Nkrumah describes. A new flag or UN seat shows political independence, which Nkrumah says is not enough.',
    reviewed: false,
  },
  {
    id: 'whap-decolonization-007',
    topic: 'decolonization',
    difficulty: 2,
    prompt: 'The partition of British India in 1947 into India and Pakistan resulted in',
    choices: [
      'a peaceful transfer with no movement of people',
      'the reunification of India under Mughal rule',
      'one of the largest migrations in history, as millions of Hindus, Sikhs and Muslims crossed the new borders amid deadly violence',
      'India becoming a colony of Pakistan',
    ],
    answer: 2,
    explanation: 'Between 10 and 20 million people moved across the new borders, and hundreds of thousands, possibly more, were killed in religious violence. Muslim League leaders had demanded a separate Muslim state, which led to partition.',
    reviewed: false,
  },
  {
    id: 'whap-decolonization-008',
    topic: 'decolonization',
    difficulty: 2,
    prompt: 'In 1956, Egypt\'s president Gamal Abdel Nasser nationalized the Suez Canal. This is an example of',
    choices: [
      'Egypt joining the Warsaw Pact',
      'Egypt requesting to become a British colony again',
      'the Ottoman Empire regaining Egypt',
      'a newly independent state asserting control over key economic resources owned by foreigners',
    ],
    answer: 3,
    explanation: 'The canal had been run by a British and French company. Nasser took it over to fund development and assert Egyptian sovereignty. Britain, France and Israel invaded, but US and Soviet pressure forced them to withdraw, a sign of declining European power.',
    reviewed: false,
  },
  {
    id: 'whap-decolonization-009',
    topic: 'decolonization',
    difficulty: 3,
    prompt: 'The end of apartheid in South Africa in the early 1990s resulted mainly from',
    choices: [
      'a decision by Britain to take back control of South Africa',
      'decades of resistance led by groups such as the African National Congress, combined with international sanctions',
      'the outcome of the Second World War',
      'the Berlin Conference',
    ],
    answer: 1,
    explanation: 'The ANC and other groups resisted through protests, strikes and armed struggle, while many countries imposed sanctions and boycotts. Nelson Mandela was released in 1990 and elected president in 1994 in the first elections open to all races.',
    reviewed: false,
  },
];
