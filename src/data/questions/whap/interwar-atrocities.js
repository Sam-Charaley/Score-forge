// AP World History: Modern, Unit 7: the interwar period, the Great Depression,
// new state ideologies and mass atrocities, c. 1915 to 1945.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
const FDR_INAUGURAL = {
  text: 'So, first of all, let me assert my firm belief that the only thing we have to fear is fear itself, nameless, unreasoning, unjustified terror which paralyzes needed efforts to convert retreat into advance. ... Our greatest primary task is to put people to work. ... It can be accomplished in part by direct recruiting by the Government itself, treating the task as we would treat the emergency of a war.',
  citation: 'Franklin D. Roosevelt (President of the United States), First Inaugural Address, March 4, 1933. Dash shown as a comma.',
};

const UNEMPLOYMENT_1932 = {
  type: 'table',
  caption: 'Approximate unemployment rate in 1932',
  columns: ['Country', 'Unemployment (percent of workforce)'],
  rows: [
    ['Germany', 30],
    ['United States', 24],
    ['United Kingdom', 22],
  ],
  alt: 'Table of approximate unemployment rates in 1932: Germany 30 percent, the United States 24 percent and the United Kingdom 22 percent of the workforce.',
};
const UNEMPLOYMENT_SOURCE = {
  text: 'The table rounds estimates by economic historians. Countries measured unemployment in different ways, so the figures are approximate.',
  citation: 'Written for ScoreForge, based on published historical estimates of unemployment during the Great Depression.',
};

const STALIN_1931 = {
  text: 'Our country lags fifty to a hundred years behind the leading industrial nations. That gap has to be closed within ten years, or our enemies will destroy us. Slowing the pace of industry would mean falling behind, and those who fall behind are defeated.',
  citation: 'Written for ScoreForge, based on Joseph Stalin (leader of the Soviet Union), speech to a conference of Soviet industrial managers, February 1931.',
};

const MORGENTHAU = {
  text: 'Reports from many provinces show that a campaign against the Armenians is under way. Whole communities are being forced from their homes and marched toward the deserts, and many are killed along the way. This does not appear to be a response to any local disorder; it appears to be a plan to destroy the Armenian people. I have protested to the Ottoman government, but the officials say these are wartime measures and an internal matter.',
  citation: 'Written for ScoreForge, based on Henry Morgenthau Sr. (US ambassador to the Ottoman Empire), telegrams to the US State Department, July 1915.',
};

export default [
  {
    id: 'whap-interwar-atrocities-001',
    topic: 'interwar-atrocities',
    difficulty: 1,
    stimulus: FDR_INAUGURAL,
    prompt: 'The approach in the passage led to the New Deal, which was based on the idea that',
    choices: [
      'the government should stay out of the economy completely',
      'government should take an active role in the economy to create jobs and relief',
      'all private businesses should be taken over by the state',
      'the United States should conquer new colonies to find markets',
    ],
    answer: 1,
    explanation: 'Roosevelt says the government itself should put people to work, as in a war emergency. The New Deal created public works jobs, relief programs and new regulations, influenced by Keynesian ideas, while keeping private ownership. Laissez-faire, the first choice, is what the New Deal moved away from.',
    reviewed: true,
  },
  {
    id: 'whap-interwar-atrocities-002',
    topic: 'interwar-atrocities',
    difficulty: 2,
    figure: UNEMPLOYMENT_1932,
    stimulus: UNEMPLOYMENT_SOURCE,
    prompt: 'The situation in Germany shown in the table contributed most directly to',
    choices: [
      'the restoration of the German emperor',
      'Germany joining the League of Nations',
      'growing support for the Nazi Party, which came to power in 1933',
      'the creation of the European Union',
    ],
    answer: 2,
    explanation: 'Mass unemployment and anger at the Treaty of Versailles led many Germans to support the Nazis, who promised jobs and national revival. Hitler became chancellor in January 1933. Germany had already joined the League in 1926 and left it in 1933.',
    reviewed: true,
  },
  {
    id: 'whap-interwar-atrocities-003',
    topic: 'interwar-atrocities',
    difficulty: 3,
    figure: UNEMPLOYMENT_1932,
    stimulus: UNEMPLOYMENT_SOURCE,
    prompt: 'The responses of the United States and Germany to the crisis shown in the table differed mainly in that',
    choices: [
      'the United States kept a democratic system while expanding government action, while Germany turned to a fascist dictatorship',
      'Germany kept a democracy while the United States became a one-party state',
      'neither government tried to reduce unemployment',
      'both countries adopted communism',
    ],
    answer: 0,
    explanation: 'Both governments spent heavily to create jobs, but the US did so through elected institutions, while the Nazis abolished other parties, crushed unions and rearmed. Neither turned to communism; the Nazis persecuted communists.',
    reviewed: true,
  },
  {
    id: 'whap-interwar-atrocities-004',
    topic: 'interwar-atrocities',
    difficulty: 2,
    stimulus: STALIN_1931,
    prompt: 'The policy that Stalin promotes in the passage was carried out mainly through',
    choices: [
      'free markets and private ownership of factories',
      'foreign investment by British and American companies',
      'returning land to wealthy landlords',
      'Five-Year Plans in which the state directed rapid growth in heavy industry',
    ],
    answer: 3,
    explanation: 'Starting in 1928, Stalin\'s Five-Year Plans set production targets for steel, coal and machinery, all run by the state. This was a command economy, the opposite of free markets.',
    reviewed: true,
  },
  {
    id: 'whap-interwar-atrocities-005',
    topic: 'interwar-atrocities',
    difficulty: 3,
    stimulus: STALIN_1931,
    prompt: 'Stalin\'s drive for rapid industrialization was paired with the collectivization of agriculture, which resulted in',
    choices: [
      'a large surplus of grain that ended hunger in the Soviet Union',
      'widespread famine, including millions of deaths in Ukraine in 1932 and 1933',
      'the return of private farms to peasants',
      'a peaceful transition welcomed by most peasants',
    ],
    answer: 1,
    explanation: 'Peasants were forced into state-run collective farms, and the state seized grain to feed cities and sell abroad. Resistance was crushed, and famine killed millions, especially in Ukraine (the Holodomor) and Kazakhstan.',
    reviewed: true,
  },
  {
    id: 'whap-interwar-atrocities-006',
    topic: 'interwar-atrocities',
    difficulty: 1,
    stimulus: MORGENTHAU,
    prompt: 'The events described in the passage are known as',
    choices: [
      'the Holocaust',
      'the Holodomor',
      'the Armenian Genocide',
      'the partition of India',
    ],
    answer: 2,
    explanation: 'During the First World War, the Ottoman government deported and killed about a million or more Armenians. The Holocaust was the Nazi murder of Jews during the Second World War, and the Holodomor was the Soviet famine in Ukraine.',
    reviewed: true,
  },
  {
    id: 'whap-interwar-atrocities-007',
    topic: 'interwar-atrocities',
    difficulty: 3,
    stimulus: MORGENTHAU,
    prompt: 'Which feature of the source makes it especially useful to a historian studying these events?',
    choices: [
      'It was written by an Armenian survivor decades later.',
      'It was published as wartime propaganda by Britain.',
      'It was written by an Ottoman official defending the policy.',
      'It is a report from a diplomat of a then-neutral country, written as events happened, to his own government.',
    ],
    answer: 3,
    explanation: 'In 1915 the United States was not yet at war, so Morgenthau had less reason to exaggerate than a wartime enemy would. He wrote at the time, based on reports from consuls and missionaries, for officials rather than the public. That gives it strong value as evidence, though it still relies on second-hand reports.',
    reviewed: true,
  },
  {
    id: 'whap-interwar-atrocities-008',
    topic: 'interwar-atrocities',
    difficulty: 2,
    prompt: 'The Holocaust is best described as',
    choices: [
      'the Nazi state\'s systematic murder of about six million Jews, along with Roma, disabled people and others, driven by racist ideology',
      'a famine caused by crop failure in Western Europe',
      'a civil war between rival German political parties',
      'the forced migration of workers to Soviet factories',
    ],
    answer: 0,
    explanation: 'Nazi ideology claimed Jews and others were racial enemies. The state moved from discriminatory laws to ghettos and finally to death camps such as Auschwitz. It was organized mass murder by a government, not a famine or civil war.',
    reviewed: true,
  },
  {
    id: 'whap-interwar-atrocities-009',
    topic: 'interwar-atrocities',
    difficulty: 2,
    prompt: 'At the Munich Conference in 1938, Britain and France allowed Germany to take part of Czechoslovakia. This policy is called',
    choices: ['containment', 'appeasement', 'collective security', 'self-determination'],
    answer: 1,
    explanation: 'Appeasement meant giving in to some demands to avoid war. Hitler took the rest of Czechoslovakia in 1939 and then invaded Poland, which started the Second World War in Europe. Containment was the later US policy toward the Soviet Union.',
    reviewed: true,
  },
];
