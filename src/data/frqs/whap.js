// AP World History: Modern free-response practice: short answer questions,
// document-based questions and long essays, self-checked against the rubric.
// FRQ ids are permanent once reviewed: saved self-checks point at them.
// Rubric point ids are permanent too: saved scores list the ones earned.

export const FRQ_TYPES = {
  saq: 'Short Answer',
  dbq: 'Document-Based Question',
  leq: 'Long Essay',
};

export default [
  {
    id: 'whap-frq-saq-001',
    type: 'saq',
    title: 'Historians on the Mongol Empire',
    intro: 'Read the passage below, then answer all three parts. A short answer is a few complete sentences per part: make a clear claim and back it with specific historical evidence.',
    reviewed: false,
    sources: [
      {
        label: 'Passage',
        text: 'For a long time the Mongols were remembered mostly for destruction: burned cities, slaughtered populations, the sack of Baghdad. That memory is accurate but incomplete. Once their conquests were complete, the Mongol khans did more than any earlier rulers to connect Eurasia. They protected merchants on the overland routes, moved skilled workers and scholars between China, Persia and Central Asia, and tolerated many religions. In this sense the Mongol Empire, for all its violence, laid foundations for the more connected world that followed.',
        citation: 'Written for ScoreForge as an example of a historian\'s interpretation of the Mongol Empire.',
      },
    ],
    parts: [
      {
        id: 'a',
        prompt: 'Identify ONE claim the author makes about the Mongol Empire.',
        solution: 'The author claims that, although the Mongol conquests were very destructive, Mongol rule afterward connected Eurasia more closely than ever before, by protecting trade routes and moving people and ideas across the empire.',
        points: [{ id: 'a1', text: 'States a claim that is actually in the passage, such as that the Mongols connected Eurasia, protected trade, moved skilled people or were tolerant, or that the view of them as only destructive is incomplete' }],
      },
      {
        id: 'b',
        prompt: 'Explain ONE piece of historical evidence that supports the author\'s argument.',
        solution: 'Under the Pax Mongolica, trade on the Silk Roads grew because the Mongols kept the routes safe and used a relay system of post stations. Travelers such as Marco Polo and Ibn Battuta crossed huge distances, and Chinese technologies such as gunpowder and printing became better known in western Eurasia during this period.',
        points: [{ id: 'b1', text: 'Gives specific evidence not just copied from the passage (for example the Pax Mongolica, Marco Polo\'s travels, the spread of gunpowder or Persian astronomy, the yam relay system) and explains how it supports the claim that the Mongols connected Eurasia' }],
      },
      {
        id: 'c',
        prompt: 'Explain ONE piece of historical evidence that could be used to challenge or modify the author\'s argument.',
        solution: 'The same connections that carried trade also spread the Black Death in the 1340s. Plague moved along Mongol-linked routes to the Black Sea and Europe and killed a third or more of the population in many regions, which disrupted trade and helped break up the Mongol khanates. So Mongol connections also had devastating effects.',
        points: [{ id: 'c1', text: 'Gives specific evidence (for example the Black Death spreading along Mongol routes, the destruction of Baghdad\'s libraries and irrigation, the quick breakup of the khanates) and explains how it challenges or complicates the argument' }],
      },
    ],
  },
  {
    id: 'whap-frq-saq-002',
    type: 'saq',
    title: 'The Meiji Charter Oath',
    intro: 'Read the source below, then answer all three parts in a few complete sentences each.',
    reviewed: false,
    sources: [
      {
        label: 'Source',
        text: 'The new government makes five promises. Councils will be set up, and the business of the state will be settled through open debate. People of every rank, from nobles to commoners, will work together for the nation. Harmful old customs will be abandoned. And Japan will learn from every part of the world, so that the rule of the emperor stands on firm ground.',
        citation: 'Written for ScoreForge, a summary of the Charter Oath issued in the name of Emperor Meiji of Japan, April 1868.',
      },
    ],
    parts: [
      {
        id: 'a',
        prompt: 'Describe the historical context in which the source was written.',
        solution: 'In 1853 US warships under Commodore Perry forced Japan to open its ports, and Japan was soon made to sign unequal treaties, as China had been after the Opium Wars. Many Japanese leaders blamed the Tokugawa shogunate for this weakness. In 1868 they overthrew the shogun and restored power to the emperor, and the Charter Oath set out the new government\'s goals.',
        points: [{ id: 'a1', text: 'Describes the context accurately, such as Western pressure on Japan after Perry\'s arrival in 1853, the unequal treaties or the fall of the Tokugawa shogunate in 1868' }],
      },
      {
        id: 'b',
        prompt: 'Explain how ONE idea in the source was put into practice in Japan between 1868 and 1900.',
        solution: 'The promise to seek knowledge throughout the world led the government to send students and officials to Europe and the United States and to hire Western experts. Japan used what it learned to build railroads, factories and a modern army and navy, and its 1889 constitution was modeled partly on Germany\'s.',
        points: [{ id: 'b1', text: 'Connects an idea in the source to a specific Meiji reform (Western experts, the Iwakura Mission, state-built industry, a conscript army, the 1889 constitution and Diet, ending samurai privileges) and explains the link' }],
      },
      {
        id: 'c',
        prompt: 'Explain ONE way Japan\'s response to Western imperialism in the 1800s differed from the response of Qing China.',
        solution: 'Japan carried out sweeping, state-led reforms that changed its government, army and economy, and by 1895 it was strong enough to defeat China. Qing China\'s Self-Strengthening Movement adopted Western weapons and some factories but kept the old political system, and conservative officials blocked deeper reform, so China remained weak and lost more territory.',
        points: [{ id: 'c1', text: 'Explains a real difference (for example Japan\'s deeper and more centralized reforms compared with the limited Self-Strengthening Movement, or Japan becoming an imperial power while China lost territory) with specific evidence' }],
      },
    ],
  },
  {
    id: 'whap-frq-saq-003',
    type: 'saq',
    title: 'Ruling diverse land-based empires',
    intro: 'Answer all three parts in a few complete sentences each. No source is provided; use your own knowledge of the period 1450 to 1750.',
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'Identify ONE similarity in how the Ottoman and Mughal empires consolidated or legitimized their rule in the period 1450 to 1750.',
        solution: 'Both empires built monumental architecture to display the ruler\'s power and piety: the Ottomans built mosques such as the Süleymaniye in Istanbul, and the Mughals built the Taj Mahal and the Red Fort.',
        points: [{ id: 'a1', text: 'Identifies an accurate similarity, such as monumental architecture, gunpowder armies, tax collection through local elites (tax farmers and zamindars), or tolerance of non-Muslim subjects in return for taxes' }],
      },
      {
        id: 'b',
        prompt: 'Identify ONE difference in how the two empires governed their religious minorities or majorities.',
        solution: 'The Ottomans ruled a mostly Muslim population and organized non-Muslims into millets that ran their own religious affairs. The Mughals were a Muslim dynasty ruling a mostly Hindu population, and Akbar brought Hindu nobles into government and ended the jizya tax, though Aurangzeb later brought it back.',
        points: [{ id: 'b1', text: 'Identifies an accurate difference, such as Ottoman millets versus Akbar\'s policy of including Hindus, or the Mughals ruling a non-Muslim majority while most Ottoman subjects were Muslim' }],
      },
      {
        id: 'c',
        prompt: 'Explain ONE reason for the difference you identified in part (b).',
        solution: 'The Mughals were a small Muslim ruling class over a huge Hindu majority, so they needed the cooperation of Hindu elites such as the Rajputs to govern and to field armies. Including Hindus in government and lifting the jizya gave those elites a stake in the empire. The Ottomans, whose core population was Muslim, could rely on Islamic institutions and use the millet system to manage minorities separately.',
        points: [{ id: 'c1', text: 'Explains a reason that logically accounts for the difference, such as the relative size of the Muslim and non-Muslim populations or the need for cooperation from local elites' }],
      },
    ],
  },
  {
    id: 'whap-frq-saq-004',
    type: 'saq',
    title: 'The Cold War and new nations',
    intro: 'Answer all three parts in a few complete sentences each. No source is provided; use your own knowledge of the period 1945 to 1991.',
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'Identify ONE way the Cold War affected newly independent states in Asia or Africa.',
        solution: 'Both superpowers competed for influence in new states by offering aid and weapons. In Vietnam, the Cold War turned a struggle for independence into a long war, as the United States backed South Vietnam and the Soviet Union and China backed the North.',
        points: [{ id: 'a1', text: 'Identifies an accurate effect, such as superpower aid or weapons, proxy wars (Vietnam, Korea, Angola), coups backed by one side, or pressure to choose sides' }],
      },
      {
        id: 'b',
        prompt: 'Explain ONE economic challenge that many newly independent states faced after independence.',
        solution: 'Many new states inherited colonial economies built to export one or two raw materials, such as cocoa in Ghana or copper in Zambia. When world prices for those goods fell, government revenue collapsed, and many states had to borrow heavily, which later led to debt crises.',
        points: [{ id: 'b1', text: 'Explains a specific challenge, such as dependence on exporting raw materials, foreign ownership of key industries, debt, or weak infrastructure left by colonial rule, with a specific example' }],
      },
      {
        id: 'c',
        prompt: 'Explain ONE way newly independent states tried to act together during the Cold War.',
        solution: 'At the Bandung Conference in 1955 and later in the Non-Aligned Movement, leaders such as Nehru, Nasser and Sukarno tried to stay out of both Cold War blocs and to speak together against colonialism. This gave smaller states more influence in the United Nations, where they became a majority of members.',
        points: [{ id: 'c1', text: 'Explains a specific example of cooperation, such as the Bandung Conference, the Non-Aligned Movement, the Organization of African Unity or OPEC, and what it aimed to do' }],
      },
    ],
  },
];
