// AP World History: Modern, Unit 8: the Cold War, its spread across the world
// and its end, c. 1945 to 1991.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
const TRUMAN_DOCTRINE = {
  text: 'At the present moment in world history nearly every nation must choose between alternative ways of life. ... I believe that it must be the policy of the United States to support free peoples who are resisting attempted subjugation by armed minorities or by outside pressures.',
  citation: 'Harry S. Truman (President of the United States), address to Congress on aid to Greece and Turkey, March 12, 1947.',
};

const NUCLEAR_WARHEADS = {
  type: 'table',
  caption: 'Approximate nuclear warheads held, 1950 to 1986',
  columns: ['Year', 'United States', 'Soviet Union'],
  rows: [
    [1950, '300', '5'],
    [1960, '18,600', '1,600'],
    [1970, '26,000', '11,600'],
    [1980, '23,800', '30,100'],
    [1986, '23,300', '40,200'],
  ],
  alt: 'Table of approximate nuclear warheads. 1950: United States 300, Soviet Union 5. 1960: 18,600 and 1,600. 1970: 26,000 and 11,600. 1980: 23,800 and 30,100. 1986: 23,300 and 40,200. The Soviet total passes the US total by 1980.',
};
const NUCLEAR_WARHEADS_SOURCE = {
  text: 'The table rounds published estimates. Both governments kept their exact numbers secret during the Cold War.',
  citation: 'Written for ScoreForge, based on estimates by Robert S. Norris and Hans M. Kristensen, Bulletin of the Atomic Scientists, 2010.',
};

const BANDUNG = {
  text: 'We are meeting as peoples of Asia and Africa, most of whom only recently won freedom from colonial rule. We do not want to be pulled into the quarrels of the great powers, and we refuse to become tools in their rivalry. Our strength is not in weapons but in our unity and in our numbers: we speak for more than half of humankind. Colonialism is not dead while so many of our brothers are still not free.',
  citation: 'Written for ScoreForge, based on Sukarno (President of Indonesia), opening speech at the Asian-African Conference in Bandung, Indonesia, April 1955.',
};

export default [
  {
    id: 'whap-cold-war-001',
    topic: 'cold-war',
    difficulty: 1,
    stimulus: TRUMAN_DOCTRINE,
    prompt: 'The policy described in the passage is known as',
    choices: ['appeasement', 'isolationism', 'non-alignment', 'containment'],
    answer: 3,
    explanation: 'Containment meant stopping the spread of Soviet communism by supporting governments that resisted it, with aid and sometimes with force. Appeasement and isolationism describe the 1930s, and non-alignment was the policy of states that refused to join either side.',
    reviewed: false,
  },
  {
    id: 'whap-cold-war-002',
    topic: 'cold-war',
    difficulty: 2,
    stimulus: TRUMAN_DOCTRINE,
    prompt: 'The immediate situation that led Truman to give this speech was',
    choices: [
      'a civil war in Greece involving communist forces and Soviet pressure on Turkey',
      'the Cuban Missile Crisis',
      'the fall of the Berlin Wall',
      'the start of the Vietnam War',
    ],
    answer: 0,
    explanation: 'In 1947 Britain could no longer afford to support the Greek government against communist rebels, and the Soviet Union was pressing Turkey for control of the straits. Truman asked Congress for aid to both. The other events came later: 1962, 1989 and the 1960s.',
    reviewed: false,
  },
  {
    id: 'whap-cold-war-003',
    topic: 'cold-war',
    difficulty: 3,
    stimulus: TRUMAN_DOCTRINE,
    prompt: 'Which later development is the clearest example of the policy in the passage being applied outside Europe?',
    choices: [
      'The founding of the European Union',
      'The Soviet invasion of Afghanistan in 1979',
      'US military involvement in Korea and Vietnam to stop communist forces',
      'The partition of India in 1947',
    ],
    answer: 2,
    explanation: 'The United States fought in Korea (1950 to 1953) and Vietnam to keep communist forces from taking over, treating them as fronts of the global contest with the Soviet Union and China. The Soviet invasion of Afghanistan was a Soviet action, not an application of US policy.',
    reviewed: false,
  },
  {
    id: 'whap-cold-war-004',
    topic: 'cold-war',
    difficulty: 1,
    figure: NUCLEAR_WARHEADS,
    stimulus: NUCLEAR_WARHEADS_SOURCE,
    prompt: 'The trend in the table is best described as',
    choices: [
      'a steady decline in nuclear weapons after 1950',
      'an arms race in which both superpowers built up huge nuclear arsenals',
      'the United States giving up its nuclear weapons by 1970',
      'the Soviet Union never developing nuclear weapons',
    ],
    answer: 1,
    explanation: 'Both countries went from few or no warheads in 1950 to tens of thousands by the 1980s. The Soviet Union first tested a bomb in 1949 and passed the US total around the late 1970s.',
    reviewed: false,
  },
  {
    id: 'whap-cold-war-005',
    topic: 'cold-war',
    difficulty: 3,
    figure: NUCLEAR_WARHEADS,
    stimulus: NUCLEAR_WARHEADS_SOURCE,
    prompt: 'Historians often argue that the arsenals shown in the table helped keep the Cold War from becoming a direct war between the superpowers because',
    choices: [
      'nuclear weapons made conventional armies unnecessary',
      'the United Nations controlled both arsenals',
      'each side knew that attacking the other would bring its own destruction, an idea called mutually assured destruction',
      'the two superpowers had signed a permanent alliance',
    ],
    answer: 2,
    explanation: 'Because either side could destroy the other even after being attacked, a direct war became too dangerous, as the Cuban Missile Crisis of 1962 showed. The rivalry was fought instead through proxy wars, the space race and competition for allies.',
    reviewed: false,
  },
  {
    id: 'whap-cold-war-006',
    topic: 'cold-war',
    difficulty: 2,
    stimulus: BANDUNG,
    prompt: 'The ideas in the passage contributed most directly to',
    choices: [
      'the founding of the Warsaw Pact',
      'the Non-Aligned Movement',
      'the creation of NATO',
      'the Marshall Plan',
    ],
    answer: 1,
    explanation: 'Leaders such as Sukarno, Nehru of India, Nasser of Egypt and Tito of Yugoslavia formed the Non-Aligned Movement (1961) to avoid joining either Cold War bloc. NATO and the Warsaw Pact were the military alliances of the two blocs, and the Marshall Plan was US aid to Europe.',
    reviewed: false,
  },
  {
    id: 'whap-cold-war-007',
    topic: 'cold-war',
    difficulty: 3,
    stimulus: BANDUNG,
    prompt: 'Sukarno\'s purpose in the passage was most likely to',
    choices: [
      'build unity among newly independent states so they could act without being controlled by either superpower',
      'ask the Soviet Union for military protection',
      'persuade Asian and African states to join NATO',
      'argue that colonialism had fully ended',
    ],
    answer: 0,
    explanation: 'Sukarno stresses unity and numbers instead of weapons and refuses to be a "tool" of the great powers. He also says colonialism is "not dead," so the last choice reverses his point. In practice, several non-aligned states still accepted aid from one side or the other.',
    reviewed: false,
  },
  {
    id: 'whap-cold-war-008',
    topic: 'cold-war',
    difficulty: 2,
    prompt: 'Which factor most directly contributed to the end of the Cold War and the breakup of the Soviet Union in 1991?',
    choices: [
      'A US invasion of Moscow',
      'The Soviet Union winning the arms race',
      'Economic stagnation, the costs of the arms race and the war in Afghanistan, and Gorbachev\'s reforms (glasnost and perestroika)',
      'The founding of the United Nations',
    ],
    answer: 2,
    explanation: 'By the 1980s the Soviet economy was falling behind, and military spending and the Afghan war drained it. Gorbachev\'s reforms allowed more openness, which let nationalist movements and protests in Eastern Europe grow. There was never a US invasion.',
    reviewed: false,
  },
  {
    id: 'whap-cold-war-009',
    topic: 'cold-war',
    difficulty: 2,
    prompt: 'Mao Zedong\'s Great Leap Forward (1958 to 1962) in China resulted in',
    choices: [
      'a famine that killed tens of millions of people',
      'China becoming the world\'s largest exporter of grain',
      'the end of Communist Party rule in China',
      'a free-market economy with private farms',
    ],
    answer: 0,
    explanation: 'Mao pushed peasants into huge communes and backyard steel furnaces, and officials reported false harvest numbers while grain was taken. The result was one of the deadliest famines in history. The Communist Party stayed in power, and market reforms came only after 1978 under Deng Xiaoping.',
    reviewed: false,
  },
];
