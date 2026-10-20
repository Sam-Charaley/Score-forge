// AP World History: Modern, Unit 6: justifications for imperialism, state
// expansion and responses to it, c. 1750 to 1900.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
const KIPLING = {
  text: 'Take up the White Man\'s burden,\nSend forth the best ye breed,\nGo bind your sons to exile\nTo serve your captives\' need;\nTo wait in heavy harness,\nOn fluttered folk and wild,\nYour new-caught, sullen peoples,\nHalf-devil and half-child.',
  citation: 'Rudyard Kipling (a British writer), "The White Man\'s Burden: The United States and the Philippine Islands," published in McClure\'s Magazine, 1899. Line-end dashes shown as commas.',
};

const COMMISSIONER_LIN = {
  text: 'Your country is more than sixty or seventy thousand li from China, yet barbarian ships come here to trade, and they make a great profit. But there is a class of evil foreigners who make opium and bring it to sell, tempting fools to destroy themselves. I am told that in your own country opium smoking is strictly forbidden, because its harm is clearly understood. Why then do you allow it to be sold in China? Let your Majesty order the opium plants in your Indian lands to be dug up and destroyed.',
  citation: 'Written for ScoreForge, based on Lin Zexu (Qing imperial commissioner at Canton), letter to Queen Victoria of Britain, 1839.',
};

const NAOROJI = {
  text: 'Every year, a great part of India\'s wealth is carried away to England: the salaries and pensions of British officials, the profits of British merchants and the interest on debts that India was made to take on for wars it did not choose. This is a constant drain. It is the reason India stays poor while England grows rich. The British claim to rule India for India\'s benefit, but British rule as it is now practiced is un-British: it betrays the very principles of justice the British claim for themselves.',
  citation: 'Written for ScoreForge, based on Dadabhai Naoroji (an Indian economist and early leader of the Indian National Congress), Poverty and Un-British Rule in India, 1901.',
};

export default [
  {
    id: 'whap-imperialism-001',
    topic: 'imperialism',
    difficulty: 1,
    stimulus: KIPLING,
    prompt: 'The poem reflects which justification for imperialism?',
    choices: [
      'The belief that Western nations had a duty to "civilize" peoples they saw as inferior',
      'The belief that all peoples should govern themselves',
      'The need to spread Buddhism to Asia',
      'The demand of colonized peoples for European rule',
    ],
    answer: 0,
    explanation: 'Kipling presents empire as a burden that white nations must take on to help peoples he describes as "half-devil and half-child." This civilizing mission, often tied to ideas of racial superiority and Social Darwinism, was used to justify colonial rule. Self-government is the opposite of what the poem urges.',
    reviewed: false,
  },
  {
    id: 'whap-imperialism-002',
    topic: 'imperialism',
    difficulty: 2,
    stimulus: KIPLING,
    prompt: 'The historical situation in which the poem was written was',
    choices: [
      'Britain\'s loss of its American colonies',
      'the debate over whether the United States should rule the Philippines after the Spanish-American War',
      'the Berlin Conference dividing Africa among European powers',
      'the end of the Atlantic slave trade',
    ],
    answer: 1,
    explanation: 'The subtitle names the United States and the Philippine Islands. The US took the Philippines from Spain in 1898, and Kipling, a British writer, urged Americans to join Britain in empire-building. Filipino forces then fought a war against US rule.',
    reviewed: false,
  },
  {
    id: 'whap-imperialism-003',
    topic: 'imperialism',
    difficulty: 1,
    stimulus: COMMISSIONER_LIN,
    prompt: 'Lin Zexu\'s main complaint in the letter is that Britain',
    choices: [
      'refused to buy Chinese tea',
      'had invaded Beijing',
      'allowed British merchants to sell opium grown in India to the Chinese people',
      'demanded that China convert to Christianity',
    ],
    answer: 2,
    explanation: 'British merchants sold opium grown in British India to China to pay for the tea and silk they bought, and millions of Chinese became addicted. Lin points out that Britain banned opium at home but let its merchants sell it in China. Britain was buying, not refusing, Chinese tea.',
    reviewed: false,
  },
  {
    id: 'whap-imperialism-004',
    topic: 'imperialism',
    difficulty: 2,
    stimulus: COMMISSIONER_LIN,
    prompt: 'Which was a direct result of the conflict described in the letter?',
    choices: [
      'Britain stopped trading in opium immediately.',
      'China conquered British India.',
      'Britain and China signed a treaty banning all foreign trade.',
      'After the First Opium War, the Treaty of Nanjing (1842) forced China to give Hong Kong to Britain and open more ports to British trade.',
    ],
    answer: 3,
    explanation: 'When Lin destroyed British opium, Britain went to war and won with its steam-powered gunboats. The Treaty of Nanjing ceded Hong Kong, opened five treaty ports and made China pay an indemnity. It was the first of the "unequal treaties."',
    reviewed: false,
  },
  {
    id: 'whap-imperialism-005',
    topic: 'imperialism',
    difficulty: 3,
    stimulus: NAOROJI,
    prompt: 'Naoroji\'s argument in the passage differs from the view in Kipling\'s poem mainly because Naoroji',
    choices: [
      'claims that colonial rule enriched the colonizer at the colony\'s expense rather than helping the colonized',
      'calls on Britain to expand its empire into Africa',
      'agrees that colonized peoples cannot govern themselves',
      'argues that India should become part of the United States',
    ],
    answer: 0,
    explanation: 'Kipling presents empire as a sacrifice made for the colonized. Naoroji argues the reverse: wealth flowed out of India to Britain (the "drain theory"), so British rule made India poorer. He uses Britain\'s own ideals of justice to criticize it.',
    reviewed: false,
  },
  {
    id: 'whap-imperialism-006',
    topic: 'imperialism',
    difficulty: 2,
    stimulus: NAOROJI,
    prompt: 'Arguments like Naoroji\'s contributed most directly to',
    choices: [
      'the founding of the Mughal Empire',
      'the British decision to expand the East India Company\'s power',
      'the spread of the Protestant Reformation in India',
      'the growth of Indian nationalism and the Indian National Congress',
    ],
    answer: 3,
    explanation: 'Naoroji was a founding member of the Indian National Congress (1885). Economic critiques of British rule helped educated Indians build a national movement, which later demanded self-rule. The Mughal Empire was founded in 1526, long before.',
    reviewed: false,
  },
  {
    id: 'whap-imperialism-007',
    topic: 'imperialism',
    difficulty: 1,
    prompt: 'The Berlin Conference of 1884 to 1885 is significant because European powers',
    choices: [
      'agreed to end imperialism in Africa',
      'set rules for claiming African territory, speeding up the partition of Africa without African representatives present',
      'gave independence to Egypt and Ethiopia',
      'divided China into spheres of influence',
    ],
    answer: 1,
    explanation: 'The conference set rules for claiming African land, and the "Scramble for Africa" followed. By 1914 nearly all of Africa was under European rule. No Africans took part. Ethiopia stayed independent, but not because of this conference.',
    reviewed: false,
  },
  {
    id: 'whap-imperialism-008',
    topic: 'imperialism',
    difficulty: 2,
    prompt: 'The Indian Rebellion of 1857 (also called the Sepoy Mutiny) led to',
    choices: [
      'Indian independence from Britain',
      'the restoration of the Mughal Empire to full power',
      'the British government taking direct control of India from the East India Company',
      'France replacing Britain as the ruler of India',
    ],
    answer: 2,
    explanation: 'After crushing the rebellion, Britain ended the East India Company\'s rule and governed India directly through a viceroy (the British Raj). The last Mughal emperor was exiled. India did not gain independence until 1947.',
    reviewed: false,
  },
  {
    id: 'whap-imperialism-009',
    topic: 'imperialism',
    difficulty: 3,
    prompt: 'Ethiopia was able to remain independent during the Scramble for Africa mainly because',
    choices: [
      'European powers had no interest in East Africa',
      'it became a British protectorate that protected it from others',
      'it had converted to Islam, which Europeans respected',
      'Emperor Menelik II bought modern weapons and defeated an Italian invasion at the Battle of Adwa in 1896',
    ],
    answer: 3,
    explanation: 'Menelik II used rivalries among European powers to buy modern rifles and artillery, and his army defeated Italy at Adwa. Ethiopia is a historically Christian kingdom, and Europeans were very interested in East Africa: Italy, Britain and France all held colonies around it.',
    reviewed: false,
  },
  {
    id: 'whap-imperialism-010',
    topic: 'imperialism',
    difficulty: 2,
    prompt: 'China\'s Self-Strengthening Movement (1860s to 1890s) and the Ottoman Tanzimat reforms were similar in that both',
    choices: [
      'tried to adopt Western military technology and some reforms to resist foreign pressure while keeping the existing state',
      'overthrew their ruling dynasties and created republics',
      'rejected all contact with Western nations',
      'were led by European colonial governors',
    ],
    answer: 0,
    explanation: 'Both states built arsenals and modern armies and adopted some Western methods to strengthen themselves, but kept their emperor or sultan. Both had limited success, partly because conservative officials resisted change. The Qing were not overthrown until 1911.',
    reviewed: false,
  },
];
