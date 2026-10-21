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
    reviewed: true,
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
    reviewed: true,
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
    reviewed: true,
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
  {
    id: 'whap-frq-dbq-001',
    type: 'dbq',
    title: 'Industrialization and British workers',
    intro: 'Read all seven documents, then write an essay that answers the prompt. On the exam you get 60 minutes for the DBQ, including about 15 minutes to read. Plan your thesis first, group the documents by argument, and use at least four of them as evidence.',
    reviewed: true,
    sources: [
      {
        label: 'Document 1',
        text: 'I went to the mill when I was eight years old. In the busy season we worked from six in the morning until half past eight at night, with forty minutes for dinner. The children were beaten with a strap if they fell asleep or were slow at their work. I have been sick a great deal since, and the doctor says the long standing has ruined my legs.',
        citation: 'Written for ScoreForge, based on testimony of a young textile worker before the Sadler Committee of the British Parliament, 1832.',
      },
      {
        label: 'Document 2',
        text: 'I have visited many factories and never saw a child punished, nor did any of them seem tired or unhappy. The work is light: they only watch the machines and join broken threads. They are better fed and better clothed than the children of farm laborers or handloom weavers. The factory gives honest work to thousands who would otherwise be idle or starving.',
        citation: 'Written for ScoreForge, based on Andrew Ure (a Scottish chemist and writer who promoted the factory system), The Philosophy of Manufactures, 1835.',
      },
      {
        label: 'Document 3',
        text: 'Average age at death in 1840, by district and class.\nManchester (industrial city): gentry and professional families, 38 years; tradesmen and their families, 20 years; laborers, mechanics and their families, 17 years.\nRutlandshire (rural county): gentry and professional families, 52 years; tradesmen and their families, 41 years; laborers and their families, 38 years.',
        citation: 'Written for ScoreForge, restating figures from Edwin Chadwick (secretary of the Poor Law Commission), Report on the Sanitary Condition of the Labouring Population of Great Britain, 1842.',
      },
      {
        label: 'Document 4',
        text: 'The workers\' quarters of Manchester lie hidden behind the main streets, where the wealthy who ride through to their offices never have to see them. The houses are packed together around narrow courts, with one privy shared by dozens of people and open drains running between the doors. Whole families live in a single damp cellar. This is how the class that creates the wealth of England is forced to live.',
        citation: 'Written for ScoreForge, based on Friedrich Engels (a German who managed his family\'s cotton business in Manchester), The Condition of the Working Class in England, 1845.',
      },
      {
        label: 'Document 5',
        text: 'We, the working people, ask Parliament to grant the vote to every man over twenty-one, to hold elections every year by secret ballot, and to pay members of Parliament so that working men can serve. We produce the wealth of this nation, yet we have no voice in making the laws that govern our wages, our hours and our lives.',
        citation: 'Written for ScoreForge, based on the National Petition of the Chartist movement, presented to the British Parliament in 1842 with more than three million signatures.',
      },
      {
        label: 'Document 6',
        text: 'Under the new act, no child under nine may be employed in a textile mill. Children aged nine to thirteen may work no more than nine hours a day, and must attend school for two hours each day. Inspectors appointed by the government will visit the mills and may fine owners who break the law.',
        citation: 'Written for ScoreForge, summarizing the main terms of the Factory Act passed by the British Parliament, 1833.',
      },
      {
        label: 'Document 7',
        text: 'The great engineers and manufacturers of our age began as poor working men. They rose by their own effort, by thrift, hard work and steady habits, not by the favor of the great. Any working man who saves his wages, educates himself and avoids drink may improve his position. The best help is help from within.',
        citation: 'Written for ScoreForge, based on Samuel Smiles (a Scottish writer and reformer), Self-Help, 1859.',
      },
    ],
    parts: [
      {
        id: 'a',
        prompt: 'Evaluate the extent to which industrialization improved the lives of working people in Britain in the period 1800 to 1900.\n\nIn your response you should do the following.\n• Respond to the prompt with a historically defensible thesis or claim that establishes a line of reasoning.\n• Describe a broader historical context relevant to the prompt.\n• Support an argument in response to the prompt using at least four documents.\n• Use at least one additional piece of specific historical evidence (beyond that found in the documents) relevant to an argument about the prompt.\n• For at least two documents, explain how or why the document\'s point of view, purpose, historical situation, and/or audience is relevant to an argument.\n• Use evidence to support, qualify, or modify an argument that addresses the prompt.',
        solution: 'Model thesis: In the first half of the 1800s, industrialization made life worse for most British workers, who faced long hours, dangerous mills and deadly cities; after about 1850, reforms that workers and their allies fought for, along with rising wages, brought real but limited improvements.\n\nContext: Britain was the first country to industrialize, starting in the late 1700s with steam-powered cotton mills, because of its coal and iron, capital from trade and empire, and a growing population pushed off the land by enclosure.\n\nOutline:\n1. Early industrialization harmed workers. Doc 1 (long hours, beatings, injury) and Doc 4 (crowded, unsanitary housing) show the costs. Doc 3 shows Manchester laborers died at 17 on average, compared with 38 in rural Rutland, which shows that city life itself was deadly. Sourcing: Doc 1 was given to a committee of a reformer, Michael Sadler, who wanted a ten-hour law, so witnesses were chosen to show the worst cases; that purpose makes it persuasive but possibly one-sided.\n2. Defenders claimed factories improved lives. Doc 2 and Doc 7 argue that factory work beat rural poverty and that hard work let men rise. Sourcing: Ure wrote to promote factories and visited with owners\' permission, so he had reason to see only the best; Smiles wrote for a middle-class and aspiring audience that believed in self-help, which explains why he ignores the conditions in Docs 1 and 4.\n3. Workers\' demands and reform brought gradual improvement. Doc 5 shows workers organizing politically, and Doc 6 shows the state starting to limit child labor. Evidence beyond the documents: the Reform Act of 1867 gave many urban working men the vote, trade unions were legalized in the 1870s, and public health laws such as the Public Health Act of 1875 improved sewers and water, so life expectancy in cities began to rise late in the century.\n\nComplexity: The answer depends on time and on who is meant. Skilled workers and the growing middle class gained more than unskilled laborers, and women and children faced the harshest early conditions. Improvement came mostly from reforms that workers forced, not from industrialization alone, which links Docs 5 and 6 to the suffering in Docs 1, 3 and 4.',
        points: [
          { id: 'a1', text: 'Thesis: makes a defensible claim that answers how far industrialization improved workers\' lives and sets up a line of reasoning, in the introduction or conclusion' },
          { id: 'a2', text: 'Contextualization: describes broader context before or during the period (for example why Britain industrialized first, enclosure and migration to cities, or the spread of the factory system) and connects it to the prompt' },
          { id: 'a3', text: 'Evidence from the documents: accurately describes the content of at least three documents in a way that addresses the topic' },
          { id: 'a4', text: 'Evidence from the documents: uses the content of at least four documents to support an argument, not just to summarize them' },
          { id: 'a5', text: 'Evidence beyond the documents: uses at least one specific piece of evidence not in the documents (for example the Reform Acts, trade unions, the Ten Hours Act of 1847, public health laws, the Luddites) to support an argument' },
          { id: 'a6', text: 'Sourcing: for at least two documents, explains how the point of view, purpose, historical situation or audience is relevant to the argument (for example Ure as a promoter of factories, or Sadler\'s committee seeking a reform law)' },
          { id: 'a7', text: 'Complexity: shows a complex understanding, for example by explaining change over time, differences between groups of workers, or both costs and benefits, using evidence throughout the essay' },
        ],
      },
    ],
  },
  {
    id: 'whap-frq-dbq-002',
    type: 'dbq',
    title: 'The Scramble for Africa',
    intro: 'Read all seven documents, then write an essay that answers the prompt. On the exam you get 60 minutes for the DBQ, including about 15 minutes to read. Plan your thesis first, group the documents by argument, and use at least four of them as evidence.',
    reviewed: false,
    sources: [
      {
        label: 'Document 1',
        text: 'To open to civilization the only part of our globe where it has not yet entered, to pierce the darkness that hangs over whole peoples: this is a crusade worthy of this century of progress. Our aim is to end the slave trade and bring the light of science and Christianity to Central Africa. Belgium, a small country, seeks nothing for itself but the honor of serving humanity.',
        citation: 'Written for ScoreForge, based on King Leopold II of Belgium, opening speech to the Brussels Geographic Conference, 1876.',
      },
      {
        label: 'Document 2',
        text: 'Rich nations need colonies as outlets for their goods and their capital. Our factories produce more than France can buy, and other nations close their markets with tariffs. We need new markets. There is also a second point: the superior races have a duty to civilize the inferior races. And France cannot be only a free country; it must also be a great one, with ports and coaling stations for its navy on every sea.',
        citation: 'Written for ScoreForge, based on Jules Ferry (former prime minister of France), speech to the French Chamber of Deputies, July 1885.',
      },
      {
        label: 'Document 3',
        text: 'I contend that we are the finest race in the world, and that the more of the world we inhabit, the better it is for humanity. Every acre added to our territory means more of the English race brought into existence. Africa is still lying ready for us, and it is our duty to take it.',
        citation: 'Written for ScoreForge, based on Cecil Rhodes (a British businessman who made a fortune in South African diamond mines), "Confession of Faith," written 1877.',
      },
      {
        label: 'Document 4',
        text: 'Any power that takes possession of land on the coasts of Africa from now on, or sets up a protectorate there, must notify the other signing powers so that they may make any claims of their own. The signing powers agree that a claim must be backed by real authority on the ground, enough to protect existing rights and freedom of trade.',
        citation: 'Written for ScoreForge, summarizing Articles 34 and 35 of the General Act of the Berlin Conference, signed by fourteen European states and the United States, 1885.',
      },
      {
        label: 'Document 5',
        text: 'The Lord has set up different kingdoms in the world, and I am the ruler of my people on our land. If you wish to make our land your protectorate, you are asking me to give up my independence. I see no truth or sense in your offer of protection. Protection from whom? We have no quarrel with anyone that needs your help. I will not surrender.',
        citation: 'Written for ScoreForge, based on Hendrik Witbooi (leader of a Nama community in southwest Africa), letter to the German colonial official Theodor Leutwein, 1894.',
      },
      {
        label: 'Document 6',
        text: 'British trade with tropical Africa has grown in twenty years from a few hundred thousand pounds a year to many millions: palm oil, rubber, cocoa, ivory and gold. Every day our manufacturers ask where they will sell their goods when Germany and America compete with us everywhere. If we do not claim these lands, our rivals will, and they will shut our goods out.',
        citation: 'Written for ScoreForge, based on speeches by Joseph Chamberlain (British Colonial Secretary) on the value of the empire, 1890s.',
      },
      {
        label: 'Document 7',
        text: 'The Africans were told that the white man came to stop the slave trade and to bring them the gospel. What he brought instead was the theft of their land and forced labor to gather rubber and ivory for companies in Europe. Under King Leopold\'s rule in the Congo, villages that failed to meet their rubber quotas were burned and their people killed or maimed.',
        citation: 'Written for ScoreForge, based on E. D. Morel (a British journalist who led a campaign against abuses in the Congo), The Black Man\'s Burden, 1920.',
      },
    ],
    parts: [
      {
        id: 'a',
        prompt: 'Evaluate the relative importance of the causes of European expansion into Africa in the period 1870 to 1914.\n\nIn your response you should do the following.\n• Respond to the prompt with a historically defensible thesis or claim that establishes a line of reasoning.\n• Describe a broader historical context relevant to the prompt.\n• Support an argument in response to the prompt using at least four documents.\n• Use at least one additional piece of specific historical evidence (beyond that found in the documents) relevant to an argument about the prompt.\n• For at least two documents, explain how or why the document\'s point of view, purpose, historical situation, and/or audience is relevant to an argument.\n• Use evidence to support, qualify, or modify an argument that addresses the prompt.',
        solution: 'Model thesis: European expansion into Africa between 1870 and 1914 was driven above all by economic demands of industrial economies for raw materials and markets, sharpened by political rivalry among European states; ideas of a civilizing mission and racial superiority mattered mainly as justifications that made conquest acceptable at home.\n\nContext: The Second Industrial Revolution created new demand for rubber, palm oil, copper and other raw materials, and rising tariffs made industrial nations look for protected markets. New technologies such as steamships, quinine against malaria and the Maxim gun made conquest of the African interior possible for the first time.\n\nOutline:\n1. Economic motives were most important. Doc 2 says France needs colonies as outlets for factory goods and capital, and Doc 6 points to growing trade in palm oil, rubber and gold. Doc 7 shows how the Congo was run for rubber profits. Sourcing: Chamberlain (Doc 6) was trying to persuade British voters and manufacturers to support the cost of empire, so he stresses profit, which shows that economic arguments were the ones expected to win public support.\n2. Political rivalry made the scramble fast. Doc 4 shows European states setting rules for claims so they would not go to war with each other, and Doc 6 fears that rivals will claim the land first. Evidence beyond the documents: Germany, newly unified in 1871, and Italy joined the race for colonies as a sign of great-power status, and the Fashoda crisis of 1898 nearly led to war between Britain and France.\n3. Ideological motives served as justification. Docs 1, 2 and 3 use civilizing and racial arguments. Sourcing: Leopold (Doc 1) spoke to an international audience of geographers and humanitarians, and his claim to seek "nothing for itself" is contradicted by his later personal rubber empire described in Doc 7. His purpose was to win support for his plans by presenting them as charity.\n\nComplexity: The causes reinforced each other: racial ideas like Rhodes\'s (Doc 3) made economic exploitation seem natural, and rivalry turned economic interest into a race. Doc 5 adds that expansion also depended on breaking African resistance, which Europeans could do because of their new military technology. A full explanation must include African responses, not only European motives.',
        points: [
          { id: 'a1', text: 'Thesis: makes a defensible claim that ranks or weighs the causes of European expansion into Africa and sets up a line of reasoning, in the introduction or conclusion' },
          { id: 'a2', text: 'Contextualization: describes broader context (for example the Second Industrial Revolution, new technologies such as steamships, quinine and the Maxim gun, or rivalry after German unification) and connects it to the prompt' },
          { id: 'a3', text: 'Evidence from the documents: accurately describes the content of at least three documents in a way that addresses the topic' },
          { id: 'a4', text: 'Evidence from the documents: uses the content of at least four documents to support an argument about the causes, not just to summarize them' },
          { id: 'a5', text: 'Evidence beyond the documents: uses at least one specific piece of evidence not in the documents (for example the Fashoda crisis, the Battle of Adwa, the Maxim gun, Social Darwinism, the Suez Canal) to support an argument' },
          { id: 'a6', text: 'Sourcing: for at least two documents, explains how the point of view, purpose, historical situation or audience is relevant to the argument (for example Leopold presenting his plans as charity, or Ferry and Chamberlain persuading lawmakers or voters)' },
          { id: 'a7', text: 'Complexity: shows a complex understanding, for example by explaining how causes interacted, weighing justifications against real motives, or including African resistance, using evidence throughout the essay' },
        ],
      },
    ],
  },
  {
    id: 'whap-frq-leq-001',
    type: 'leq',
    title: 'The Columbian Exchange in the Americas',
    intro: 'Write an essay that answers the prompt. No documents are provided; use your own knowledge. On the exam you get about 40 minutes for the long essay. Spend a few minutes planning a thesis and two or three body paragraphs before you write.',
    reviewed: true,
    parts: [
      {
        id: 'a',
        prompt: 'In the period 1450 to 1750, the arrival of Europeans brought new plants, animals, diseases and peoples to the Americas.\n\nDevelop an argument that evaluates the extent to which the Columbian Exchange transformed societies in the Americas in this period.\n\nIn your response you should do the following.\n• Respond to the prompt with a historically defensible thesis or claim that establishes a line of reasoning.\n• Describe a broader historical context relevant to the prompt.\n• Support an argument in response to the prompt using specific and relevant examples of evidence.\n• Use historical reasoning (for example, comparison, causation, continuity or change) to frame or structure an argument that addresses the prompt.\n• Use evidence to support, qualify, or modify an argument that addresses the prompt.',
        solution: 'Model thesis: The Columbian Exchange transformed the Americas to a very great extent, because disease destroyed most Indigenous populations and new labor systems and crops rebuilt colonial economies around exports, though many Indigenous communities kept their languages, beliefs and local customs by blending them with European ones.\n\nContext: In the 1400s, Portugal and Spain, competing for the Asian spice trade and using new ship designs such as the caravel, began voyages that led to Columbus\'s arrival in the Caribbean in 1492 and to Spanish conquest of the Aztec and Inca empires in the 1520s and 1530s.\n\nOutline:\n1. Disease caused demographic collapse. Smallpox, measles and influenza killed perhaps 80 to 90 percent of the Indigenous population in many regions, which helped small Spanish forces conquer the Aztecs and Inca and destroyed whole societies in the Caribbean.\n2. New labor systems and peoples. With Indigenous workers dying, the Spanish used the encomienda and the mit\'a at the Potosí silver mines, and planters in Brazil and the Caribbean imported millions of enslaved Africans for sugar plantations. This created new societies ranked by the casta system.\n3. New plants and animals. Horses, cattle, pigs, wheat and sugar cane changed land use and diets. Ranching spread across Mexico and the pampas, and horses transformed Plains peoples such as the Lakota into mounted hunters.\n4. Limits of the transformation (complexity). Many Indigenous people kept their languages, such as Nahuatl and Quechua, and blended Catholicism with older beliefs, as in the veneration of the Virgin of Guadalupe. Resistance such as the Pueblo Revolt of 1680 shows that Indigenous societies were not simply erased.\n\nReasoning: The essay uses causation, tracing how disease led to labor shortages, which led to the slave trade and new social hierarchies, while the last paragraph qualifies the argument with continuity.',
        points: [
          { id: 'a1', text: 'Thesis: makes a defensible claim about how far the Columbian Exchange transformed American societies and sets up a line of reasoning, in the introduction or conclusion' },
          { id: 'a2', text: 'Contextualization: describes broader context (for example Iberian motives for exploration, new maritime technology, or the conquests of the Aztec and Inca) and connects it to the prompt' },
          { id: 'a3', text: 'Evidence: names at least two specific, relevant examples (for example smallpox, the mit\'a at Potosí, sugar plantations, horses on the Plains, the casta system)' },
          { id: 'a4', text: 'Evidence: uses specific examples to support an argument about the extent of transformation, not just to list facts' },
          { id: 'a5', text: 'Historical reasoning: uses causation, comparison or continuity and change to structure the argument (for example tracing how disease led to new labor systems)' },
          { id: 'a6', text: 'Complexity: shows a complex understanding, for example by weighing change against continuity, or by explaining effects that differed by region or group' },
        ],
      },
    ],
  },
  {
    id: 'whap-frq-leq-002',
    type: 'leq',
    title: 'Paths to independence after 1900',
    intro: 'Write an essay that answers the prompt. No documents are provided; use your own knowledge. On the exam you get about 40 minutes for the long essay. Spend a few minutes planning a thesis and two or three body paragraphs before you write.',
    reviewed: true,
    parts: [
      {
        id: 'a',
        prompt: 'In the period 1900 to the present, many colonies in Asia and Africa gained independence from European empires.\n\nDevelop an argument that evaluates the extent to which the methods used to gain independence were similar in different regions.\n\nIn your response you should do the following.\n• Respond to the prompt with a historically defensible thesis or claim that establishes a line of reasoning.\n• Describe a broader historical context relevant to the prompt.\n• Support an argument in response to the prompt using specific and relevant examples of evidence.\n• Use historical reasoning (for example, comparison, causation, continuity or change) to frame or structure an argument that addresses the prompt.\n• Use evidence to support, qualify, or modify an argument that addresses the prompt.',
        solution: 'Model thesis: Independence movements across Asia and Africa were similar in that most were led by Western-educated nationalists who built mass political parties, but their methods differed greatly: where colonial powers were willing to leave, as Britain was in India and Ghana, movements used mostly nonviolent pressure and negotiation, while settler colonies and determined colonizers, as in Algeria, Kenya and Vietnam, faced long armed struggles.\n\nContext: The two world wars weakened Britain and France economically and militarily, colonial soldiers who had fought for the empires demanded rights, and the new United Nations and both Cold War superpowers spoke against old-style colonialism.\n\nOutline:\n1. Similarity: nationalist leadership and mass movements. Gandhi and Nehru in India, Nkrumah in Ghana and Ho Chi Minh in Vietnam were educated in Western ideas of rights and self-determination, and each built a party (the Indian National Congress, the Convention People\'s Party, the Viet Minh) that mobilized ordinary people.\n2. Difference: negotiated and nonviolent paths. India used civil disobedience, boycotts and the Salt March, and gained independence in 1947 through negotiation, though partition brought terrible violence. Ghana gained independence in 1957 through strikes, elections and talks with Britain.\n3. Difference: armed struggle. Algeria, with about a million French settlers, won independence only after the FLN fought an eight-year war (1954 to 1962). Kenya saw the Mau Mau uprising against British settlers, and Vietnam defeated France at Dien Bien Phu in 1954.\n4. Reasons for the difference (complexity). Large settler populations and Cold War stakes made colonial powers less willing to leave, which pushed movements toward violence. Even nonviolent movements succeeded partly because the wars had weakened the empires.\n\nReasoning: The essay uses comparison, identifying similarities and differences and explaining why the methods differed.',
        points: [
          { id: 'a1', text: 'Thesis: makes a defensible claim about how similar the methods of independence movements were and sets up a line of reasoning, in the introduction or conclusion' },
          { id: 'a2', text: 'Contextualization: describes broader context (for example how the world wars weakened European empires, the ideals of the UN, or Cold War pressure) and connects it to the prompt' },
          { id: 'a3', text: 'Evidence: names at least two specific, relevant examples (for example the Salt March, Ghana under Nkrumah, the Algerian War, the Mau Mau uprising, Dien Bien Phu)' },
          { id: 'a4', text: 'Evidence: uses specific examples to support an argument about similarities and differences, not just to describe each movement' },
          { id: 'a5', text: 'Historical reasoning: uses comparison to structure the argument, explaining both similarities and differences' },
          { id: 'a6', text: 'Complexity: shows a complex understanding, for example by explaining why methods differed (settler populations, Cold War stakes) or how a single movement used several methods' },
        ],
      },
    ],
  },
];
