// AP World History: Modern, Unit 7: causes, conduct and results of the First
// and Second World Wars, c. 1900 to 1945.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
const FOURTEEN_POINTS = {
  text: 'I. Open covenants of peace, openly arrived at, after which there shall be no private international understandings of any kind but diplomacy shall proceed always frankly and in the public view. ... V. A free, open-minded, and absolutely impartial adjustment of all colonial claims, based upon a strict observance of the principle that in determining all such questions of sovereignty the interests of the populations concerned must have equal weight with the equitable claims of the government whose title is to be determined.',
  citation: 'Woodrow Wilson (President of the United States), address to Congress (the "Fourteen Points"), January 8, 1918.',
};

const WWI_DEATHS = {
  type: 'table',
  caption: 'Approximate military deaths in the First World War, 1914 to 1918',
  columns: ['Country or empire', 'Military deaths (millions)'],
  rows: [
    ['Germany', 2.0],
    ['Russia', 1.8],
    ['France', 1.4],
    ['Austria-Hungary', 1.2],
    ['British Empire', 0.9],
    ['Ottoman Empire', 0.8],
  ],
  alt: 'Table of approximate military deaths in the First World War in millions: Germany 2.0, Russia 1.8, France 1.4, Austria-Hungary 1.2, the British Empire 0.9 and the Ottoman Empire 0.8.',
};
const WWI_DEATHS_SOURCE = {
  text: 'The table rounds commonly cited estimates. Totals vary between sources, especially for Russia and the Ottoman Empire, whose records were incomplete.',
  citation: 'Written for ScoreForge, based on standard published estimates of First World War military deaths.',
};

const FDR_PEARL_HARBOR = {
  text: 'Yesterday, December 7th, 1941, a date which will live in infamy, the United States of America was suddenly and deliberately attacked by naval and air forces of the Empire of Japan.',
  citation: 'Franklin D. Roosevelt (President of the United States), address to Congress, December 8, 1941. Dashes shown as commas.',
};

export default [
  {
    id: 'whap-world-wars-001',
    topic: 'world-wars',
    difficulty: 1,
    stimulus: FOURTEEN_POINTS,
    prompt: 'Point I of the passage, calling for "open covenants," was a response to which cause of the First World War?',
    choices: [
      'The Columbian Exchange',
      'Secret alliances that drew many countries into war',
      'The Great Depression',
      'The Russian Revolution of 1905',
    ],
    answer: 1,
    explanation: 'Before 1914, European powers formed alliances, some with secret terms, so a conflict between Austria-Hungary and Serbia quickly pulled in Russia, Germany, France and Britain. Wilson wanted diplomacy done in public to prevent this. The Great Depression came after the war.',
    reviewed: false,
  },
  {
    id: 'whap-world-wars-002',
    topic: 'world-wars',
    difficulty: 2,
    stimulus: FOURTEEN_POINTS,
    prompt: 'Many people in colonized regions, such as Egypt, India, Korea and China, reacted to the ideas in Point V by',
    choices: [
      'hoping for self-determination, then protesting when the peace settlement left colonial rule largely in place',
      'asking to become colonies of the United States',
      'ignoring the peace conference completely',
      'demanding that the Ottoman Empire be restored',
    ],
    answer: 0,
    explanation: 'Wilson\'s language raised hopes of self-rule, but the Paris Peace Conference mostly applied self-determination to Europe. Protests followed, such as the March First Movement in Korea, the May Fourth Movement in China and the 1919 revolution in Egypt.',
    reviewed: false,
  },
  {
    id: 'whap-world-wars-003',
    topic: 'world-wars',
    difficulty: 3,
    stimulus: FOURTEEN_POINTS,
    prompt: 'Which outcome of the peace settlement most contradicted the principle in Point V?',
    choices: [
      'Poland became an independent state.',
      'The League of Nations was created.',
      'Former Ottoman lands such as Syria, Iraq and Palestine were placed under British and French control as League of Nations mandates.',
      'Austria-Hungary was broken up into smaller states.',
    ],
    answer: 2,
    explanation: 'The mandate system handed Arab lands of the defeated Ottoman Empire to Britain and France rather than giving them independence, despite wartime promises to Arab leaders. The independence of Poland and the breakup of Austria-Hungary fit the idea of self-determination in Europe.',
    reviewed: false,
  },
  {
    id: 'whap-world-wars-004',
    topic: 'world-wars',
    difficulty: 1,
    figure: WWI_DEATHS,
    stimulus: WWI_DEATHS_SOURCE,
    prompt: 'The very high death tolls shown in the table are best explained by',
    choices: [
      'the use of swords and cavalry charges',
      'the spread of the Black Death among soldiers',
      'the fact that the war lasted only a few weeks',
      'industrialized weapons such as machine guns and heavy artillery used in trench warfare',
    ],
    answer: 3,
    explanation: 'Machine guns, artillery, poison gas and barbed wire made attacks across no man\'s land deadly, and trench warfare dragged on for four years. Cavalry charges were nearly useless against these weapons.',
    reviewed: false,
  },
  {
    id: 'whap-world-wars-005',
    topic: 'world-wars',
    difficulty: 2,
    figure: WWI_DEATHS,
    stimulus: WWI_DEATHS_SOURCE,
    prompt: 'To keep fighting despite losses like those in the table, governments in the First World War relied on "total war," which meant',
    choices: [
      'leaving civilian life and the economy unchanged',
      'directing economies toward war production, using propaganda and bringing women into factory jobs',
      'fighting only with professional armies of volunteers',
      'letting private companies decide what to produce',
    ],
    answer: 1,
    explanation: 'Governments drafted millions of men, took control of industry, rationed food, used propaganda to keep up support and recruited women into factories. Total war blurred the line between soldiers and civilians.',
    reviewed: false,
  },
  {
    id: 'whap-world-wars-006',
    topic: 'world-wars',
    difficulty: 1,
    stimulus: FDR_PEARL_HARBOR,
    prompt: 'The event described in the passage led directly to',
    choices: [
      'the United States entering the Second World War',
      'the end of the First World War',
      'Japan\'s withdrawal from China',
      'the founding of the League of Nations',
    ],
    answer: 0,
    explanation: 'The day after the attack on Pearl Harbor, Congress declared war on Japan, and Germany and Italy declared war on the United States soon after. The First World War had ended in 1918, and the League was founded in 1920.',
    reviewed: false,
  },
  {
    id: 'whap-world-wars-007',
    topic: 'world-wars',
    difficulty: 2,
    stimulus: FDR_PEARL_HARBOR,
    prompt: 'Which best explains Japan\'s expansion in Asia and the Pacific that led to the attack described in the passage?',
    choices: [
      'Japan wanted to spread communism across Asia.',
      'Japan was trying to restore the Qing dynasty.',
      'Japan, an industrial power with few natural resources, sought raw materials and an empire, and was cut off from US oil.',
      'Japan was defending itself after a US invasion of Japan.',
    ],
    answer: 2,
    explanation: 'Japan took Manchuria in 1931, invaded China in 1937 and moved into Southeast Asia for oil, rubber and other resources. When the US cut off oil exports, Japanese leaders decided to strike the US fleet. Japanese leaders were strongly anti-communist.',
    reviewed: false,
  },
  {
    id: 'whap-world-wars-008',
    topic: 'world-wars',
    difficulty: 2,
    prompt: 'How did the two world wars affect many colonies in Asia and Africa?',
    choices: [
      'Colonies took no part in either war.',
      'Colonial empires grew stronger and more secure after 1945.',
      'Colonies were given independence as soon as each war began.',
      'Millions of colonial subjects fought or worked for the imperial powers, which strengthened demands for independence afterward.',
    ],
    answer: 3,
    explanation: 'More than a million Indian soldiers served in the First World War, and Africans fought for Britain and France in both wars. Having sacrificed for empires that preached freedom, many colonized peoples demanded self-rule, and the wars weakened Britain and France financially.',
    reviewed: false,
  },
  {
    id: 'whap-world-wars-009',
    topic: 'world-wars',
    difficulty: 3,
    prompt: 'Which statement best describes a major change in global politics after the Second World War?',
    choices: [
      'Britain and France became the two strongest powers in the world.',
      'The United States and the Soviet Union emerged as superpowers, and the United Nations was founded.',
      'Germany and Japan expanded their empires.',
      'The League of Nations became the main world organization.',
    ],
    answer: 1,
    explanation: 'The war left Europe and Japan devastated, while the US and the USSR had huge armies and economies, setting up the Cold War. The United Nations replaced the failed League of Nations in 1945. Britain and France were weakened, not strengthened.',
    reviewed: false,
  },
];
