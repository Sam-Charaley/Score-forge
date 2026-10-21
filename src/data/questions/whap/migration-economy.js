// AP World History: Modern, Unit 6: global economic development, economic
// imperialism, export economies and migration, c. 1750 to 1900.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
const INDENTURED_MIGRATION = {
  type: 'table',
  caption: 'Indian indentured laborers sent to British and other colonies, 1834 to 1917',
  columns: ['Destination', 'Approximate number of laborers'],
  rows: [
    ['Mauritius', '453,000'],
    ['British Guiana', '239,000'],
    ['Natal (South Africa)', '152,000'],
    ['Trinidad', '144,000'],
    ['Fiji', '61,000'],
    ['Jamaica', '36,000'],
  ],
  alt: 'Table of approximate numbers of Indian indentured laborers sent abroad between 1834 and 1917: Mauritius 453,000, British Guiana 239,000, Natal in South Africa 152,000, Trinidad 144,000, Fiji 61,000 and Jamaica 36,000.',
};
const INDENTURED_SOURCE = {
  text: 'Most of these laborers signed contracts of five years to work on sugar estates in exchange for passage, wages and, for some, a return ticket. Many stayed after their contracts ended.',
  citation: 'Written for ScoreForge, based on British colonial emigration records summarized by historians of the Indian diaspora.',
};

const CHINESE_EXCLUSION = {
  text: 'Whereas in the opinion of the Government of the United States the coming of Chinese laborers to this country endangers the good order of certain localities within the territory thereof: Therefore, Be it enacted ... That from and after the expiration of ninety days next after the passage of this act, ... the coming of Chinese laborers to the United States be ... suspended.',
  citation: 'United States Congress, An Act to Execute Certain Treaty Stipulations Relating to Chinese (the Chinese Exclusion Act), 1882.',
};

const CASEMENT_CONGO = {
  text: 'In each village I visited, the people said the same thing: every two weeks each man must bring a set amount of wild rubber to the state post. If he brings too little, he is beaten or held in chains, and soldiers have taken women as hostages until the rubber is delivered. Villages that once numbered in the hundreds are now nearly empty. The people say they have no time to grow food, because they must spend their days in the forest looking for rubber vines.',
  citation: 'Written for ScoreForge, based on Roger Casement (British consul), report to the British Parliament on conditions in the Congo Free State of King Leopold II of Belgium, 1904.',
};

export default [
  {
    id: 'whap-migration-economy-001',
    topic: 'migration-economy',
    difficulty: 1,
    figure: INDENTURED_MIGRATION,
    stimulus: INDENTURED_SOURCE,
    prompt: 'The migration shown in the table was mainly a response to',
    choices: [
      'the abolition of slavery in the British Empire, which left sugar plantations needing new workers',
      'the gold rush in California',
      'the partition of India in 1947',
      'the demand for factory workers in Britain',
    ],
    answer: 0,
    explanation: 'Britain abolished slavery in 1833. Plantation owners in Mauritius, the Caribbean and elsewhere turned to indentured laborers from India (and China) to replace enslaved workers. The table starts in 1834, right after abolition, and ends long before 1947.',
    reviewed: true,
  },
  {
    id: 'whap-migration-economy-002',
    topic: 'migration-economy',
    difficulty: 2,
    figure: INDENTURED_MIGRATION,
    stimulus: INDENTURED_SOURCE,
    prompt: 'Which long-term effect of the migration in the table is supported by the source note?',
    choices: [
      'All the laborers returned to India, leaving no lasting communities.',
      'The migration ended sugar production in the destination colonies.',
      'Many migrants stayed, creating large Indian communities that still shape the culture of places like Trinidad, Guyana, Mauritius and Fiji.',
      'The migrants became the colonial rulers of the destination colonies.',
    ],
    answer: 2,
    explanation: 'The note says many stayed after their contracts ended. People of Indian descent are now a large share of the population in several of these countries, and they brought Hindu and Muslim traditions, foods and languages with them.',
    reviewed: true,
  },
  {
    id: 'whap-migration-economy-003',
    topic: 'migration-economy',
    difficulty: 2,
    stimulus: CHINESE_EXCLUSION,
    prompt: 'The law in the passage is best understood as an example of',
    choices: [
      'a government encouraging immigration to fill factory jobs',
      'a free-trade agreement between the United States and China',
      'a treaty ending the Opium Wars',
      'a policy restricting immigration, driven by hostility toward migrants of a particular ethnicity',
    ],
    answer: 3,
    explanation: 'The act banned Chinese laborers from entering the United States, after years of anti-Chinese campaigns by some workers and politicians who blamed Chinese migrants for low wages. It was the first US law to bar a group by nationality.',
    reviewed: true,
  },
  {
    id: 'whap-migration-economy-004',
    topic: 'migration-economy',
    difficulty: 3,
    stimulus: CHINESE_EXCLUSION,
    prompt: 'Which policy elsewhere was most similar to the law in the passage?',
    choices: [
      'The Meiji government\'s support for building railroads',
      'Australia\'s "White Australia" policy, which limited non-European immigration',
      'Britain\'s abolition of slavery in 1833',
      'The Qing dynasty\'s Self-Strengthening Movement',
    ],
    answer: 1,
    explanation: 'Australia\'s Immigration Restriction Act of 1901 was designed to keep out Asian and other non-European migrants, much as the US law targeted Chinese workers. Both reflect racial ideas and labor fears in receiving societies at the time. The other choices are not immigration policies.',
    reviewed: true,
  },
  {
    id: 'whap-migration-economy-005',
    topic: 'migration-economy',
    difficulty: 2,
    stimulus: CASEMENT_CONGO,
    prompt: 'The conditions described in the passage were driven mainly by',
    choices: [
      'global industrial demand for rubber, used in bicycle and car tires and machine parts',
      'the demand for Congolese cotton in Indian textile mills',
      'the spread of Islam in Central Africa',
      'local Congolese chiefs who wanted to expand farming',
    ],
    answer: 0,
    explanation: 'Industrial countries needed rubber for tires, hoses, belts and electrical insulation. King Leopold II, who personally controlled the Congo Free State, used forced labor and violence to supply it. Millions of Congolese died. The passage describes villagers forced away from farming, not expanding it.',
    reviewed: true,
  },
  {
    id: 'whap-migration-economy-006',
    topic: 'migration-economy',
    difficulty: 3,
    stimulus: CASEMENT_CONGO,
    prompt: 'The Congo Free State, Egyptian cotton and Argentine beef in the late 1800s are all examples of',
    choices: [
      'economies that industrialized faster than Britain',
      'socialist economies run by workers\' councils',
      'export economies that specialized in raw materials or food for industrial countries',
      'regions that rejected all foreign trade',
    ],
    answer: 2,
    explanation: 'Industrialization created demand for raw materials and food, and many regions came to depend on exporting one or two products. This made them vulnerable to price swings and often left profits with foreign investors, even in independent states like Argentina.',
    reviewed: true,
  },
  {
    id: 'whap-migration-economy-007',
    topic: 'migration-economy',
    difficulty: 2,
    prompt: 'In the late 1800s, British and US investment in railroads, mines and plantations in Latin America is best described as',
    choices: [
      'formal colonial rule with British governors in each country',
      'economic imperialism, in which foreign businesses gained great influence over independent states',
      'a policy of isolation that cut Latin America off from world trade',
      'an effort to build Latin American industry to compete with Britain',
    ],
    answer: 1,
    explanation: 'Most Latin American states were independent after the 1820s, but foreign companies such as British railroad firms in Argentina and the United Fruit Company in Central America controlled key parts of their economies. That is economic, not formal, imperialism.',
    reviewed: true,
  },
  {
    id: 'whap-migration-economy-008',
    topic: 'migration-economy',
    difficulty: 1,
    prompt: 'Which event in the 1840s pushed more than a million people to leave their homeland, many for the United States?',
    choices: [
      'The Meiji Restoration in Japan',
      'The Berlin Conference',
      'The Irish Potato Famine',
      'The Haitian Revolution',
    ],
    answer: 2,
    explanation: 'When a blight destroyed the potato crop that most poor Irish families depended on, about a million people died and more than a million emigrated, largely to the United States and Britain. The Meiji Restoration was in 1868 and the Berlin Conference in 1884.',
    reviewed: true,
  },
  {
    id: 'whap-migration-economy-009',
    topic: 'migration-economy',
    difficulty: 3,
    prompt: 'Because most migrant laborers in the 1800s were men, a common effect in the communities they left behind was that',
    choices: [
      'women often took on more responsibility for farming, family business and household decisions',
      'birth rates in those communities rose sharply',
      'women gained the right to vote in national elections',
      'the communities stopped receiving money from abroad',
    ],
    answer: 0,
    explanation: 'With many men working abroad, women often ran farms and households on their own, while migrants sent money (remittances) home. Remittances usually increased rather than stopped. Voting rights for women came later and for other reasons.',
    reviewed: true,
  },
];
