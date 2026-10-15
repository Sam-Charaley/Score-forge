// AP Chinese Language and Culture: study plan content.
// Name, color, code and exam date live in ../subjectIndex.js.
// Follows the course revised for 2026-27 (first exam May 2027). The weeks
// every world language shares come from ../worldLanguages/project.js; this
// file supplies what is specific to Chinese.
import { buildWorldLanguageWeeks } from '../worldLanguages/project.js'

const COLOR = "#991b1b";
const PAST_EXAMS_URL = "https://apcentral.collegeboard.org/courses/ap-chinese-language-and-culture/exam/past-exam-questions";

const storyWeek = {
  theme: "Writing: Story Narration",
  examWeight: "Free response · 7.5%",
  overview: "You write a story from four pictures, sharing 30 minutes with the email response, so plan on about 15 minutes. Scorers look for a complete story that covers every picture, connected with sequence words, in accurate characters.",
  days: [
    { day: "Day 1", tasks: ["Learn: the task: four pictures in order; your story must cover all four, with a beginning, development and ending","Learn: sequence words: 首先, 然后, 接着, 后来, 最后; time phrases: 有一天, 过了一会儿, 第二天","Practice: describe one picture set in four sentences, one per picture"] },
    { day: "Day 2", tasks: ["Learn: add what people feel and why: 他很着急, 因为...; 她高兴地说...","Learn: 了 for completed actions and 的/地/得 to describe things and actions","Practice: expand Day 1's four sentences into a 150-character story"] },
    { day: "Day 3", tasks: ["Learn: give the story a clear ending or a lesson: 从那以后..., 他终于明白了...","Learn: complex structures raise the language score: 虽然...但是, 因为...所以, 一边...一边, 把","Practice: rewrite your story using at least three of those structures"] },
    { day: "Day 4", tasks: ["Timed: one past AP picture set, 15 minutes, typed","Reread for wrong characters chosen by the input method (同音字), then fix them"] },
    { day: "Day 5", tasks: ["Timed: a second picture set, 15 minutes","Checkpoint: did your story cover all four pictures, in order, with an ending?","Checkpoint: how many wrong homophone characters did you catch on the reread?"] },
  ],
  keyRules: ["Cover all four pictures, in order","Link events with sequence words and time phrases","Show feelings and reasons, not just actions","Reread every sentence for wrong characters with the same sound"],
  resources: [
    { name: "AP Chinese Past Exam Questions", url: PAST_EXAMS_URL, desc: "Past story narration prompts with scoring guidelines (the task carries over)" },
    { name: "Du Chinese", url: "https://www.duchinese.net", desc: "Graded stories for modeling narrative structure" },
  ],
  frq: { type: "Story Narration", prompt: "Using a past AP four-picture prompt, write the story in 15 minutes, typed with your input method.", rubricTip: "High scores tell a complete, logical story with transitions, varied vocabulary and grammar, and few errors. A story that skips one picture can't reach the top scores." },
  tip: "Before typing, spend one minute noting a key verb for each picture. It keeps the story moving and stops you running out of time on picture three.",
};

const emailWeek = {
  theme: "Writing: Email Response",
  examWeight: "Free response · 7.5%",
  overview: "You reply to an email from a friend or someone in your community. Scorers check that you answer every question, give details and reasons, and use a register that fits the reader.",
  days: [
    { day: "Day 1", tasks: ["Learn: the task: read the email, find every question or request in it, and answer each one","Learn: register: a friend gets 你好 and 祝好; an adult or official gets 您好 or 尊敬的... and 此致 敬礼","Practice: list every question in two past AP emails"] },
    { day: "Day 2", tasks: ["Learn: structure: greeting, a sentence acknowledging their email, one paragraph per question, a closing","Learn: give a reason for every answer: 我觉得...，因为...; 我建议...，这样...","Practice: answer one past AP email untimed"] },
    { day: "Day 3", tasks: ["Learn: when asked for advice or a choice, compare options: 一方面...另一方面...; 比起..., 我更喜欢...","Practice: answer a second email, giving and justifying a recommendation"] },
    { day: "Day 4", tasks: ["Timed: one past AP email, 15 minutes","Reread for every question answered, the right register and wrong characters"] },
    { day: "Day 5", tasks: ["Timed: a story narration and an email together, 30 minutes total, as on the exam","Checkpoint: did you finish both, and answer every question in the email?"] },
  ],
  keyRules: ["Answer every question in the email","Match the register to the reader: 你 for friends, 您 for adults you don't know well","Give a reason or detail with every answer","Story and email share 30 minutes: aim for about 15 each"],
  resources: [
    { name: "AP Chinese Past Exam Questions", url: PAST_EXAMS_URL, desc: "Past email response prompts with scoring guidelines" },
    { name: "Pleco Dictionary", url: "https://www.pleco.com", desc: "Check characters and example sentences" },
  ],
  frq: { type: "Email Response", prompt: "Answer a past AP email in 15 minutes, typed, answering every question with a reason.", rubricTip: "Scorers check task completion first: every question answered with detail. An appropriate greeting and closing for the reader also counts." },
  tip: "Underline each question in the email before you start. Missing one is the most common way to lose points on this task.",
};

const grammarWeek = {
  theme: "Grammar for Language Control",
  examWeight: "All free response",
  overview: "Language control is scored in the presentation, the Q&A and both writing tasks. This week targets the structures that most separate strong responses from average ones.",
  days: [
    { day: "Day 1", tasks: ["Learn: 了 after a verb for a completed action, at the end of a sentence for a change; negate with 没 and drop 了","Learn: 过 for past experience: 我去过上海","Practice: 10 sentences about your project research using 了 and 过 correctly"] },
    { day: "Day 2", tasks: ["Learn: the 把 construction: subject + 把 + object + verb + result (我把资料整理好了)","Learn: 被 for passives: 这首歌被很多人翻唱过","Practice: rewrite five sentences with 把 and five with 被"] },
    { day: "Day 3", tasks: ["Learn: comparisons: A 比 B + adjective, A 没有 B + adjective, A 跟 B 一样","Learn: resultative and directional complements: 听懂, 看完, 走进来","Practice: compare music from two places in six sentences"] },
    { day: "Day 4", tasks: ["Learn: paired connectors: 虽然...但是, 不但...而且, 如果...就, 只要...就, 无论...都","Learn: time and place words go before the verb: 我昨天在图书馆查资料","Practice: write a paragraph about your project topic using four paired connectors"] },
    { day: "Day 5", tasks: ["Rewrite part of your presentation to include 把, a comparison and two paired connectors","Present that part aloud","Checkpoint: which of these structures do you still avoid when speaking?"] },
  ],
  keyRules: ["了 = completed action or change; 过 = experience","把 needs something after the verb: a result, direction or 了","Time and place come before the verb","Paired connectors raise both writing and speaking scores"],
  resources: [
    { name: "ChinesePod", url: "https://www.chinesepod.com", desc: "Grammar in context through dialogues" },
    { name: "Pleco Dictionary", url: "https://www.pleco.com", desc: "Example sentences for every grammar word" },
  ],
  frq: { type: "Project Presentation (language control)", prompt: "Present your project for 3 minutes, deliberately using 把, a comparison and at least two paired connectors. Record it.", rubricTip: "Language control rewards accuracy and range together. One well-placed 虽然...但是 sentence comparing traditions shows range in a single sentence." },
  tip: "Build two or three complex sentences into your outline in advance. Prepared range sounds natural on exam day; improvised range under time pressure often doesn't.",
};

const LANGUAGE = {
  name: "Chinese",
  color: COLOR,
  examFormat: "storyAndEmail",
  examUrl: "https://apcentral.collegeboard.org/courses/ap-chinese-language-and-culture/exam",
  readingTips: [
    "Learn: guess unknown words from characters you know: 电 (electric) + 脑 (brain) = computer",
    "Learn: text can be shown in simplified or traditional characters; practice in the one you read fastest",
  ],
  listeningTips: ["Learn: listen for signal words that mark the structure: 首先, 但是, 因此, 总之"],
  musicAngles: "Peking opera (京剧), the guzheng (古筝) and erhu (二胡), regional folk songs (民歌), Mandopop and Cantopop",
  musicPhrases: "节奏 (rhythm), 歌词 (lyrics), 乐器 (instrument), 演奏 (perform), 传统音乐 (traditional music), 反映 (reflect)",
  presentationPhrases: "今天我要介绍..., 首先..., 根据这篇文章..., 这说明..., 总的来说...",
  complexStructures: "了 and 过, the 把 construction, and paired connectors like 虽然...但是",
  qaPhrases: "这是个好问题..., 我觉得..., 让我最惊讶的是...",
  connectors: "而且, 但是, 所以, 比如, 另外",
  projectResources: [
    { name: "Du Chinese", url: "https://www.duchinese.net", desc: "Graded readings, including culture topics" },
  ],
  unitVocabulary: {
    "Families and Communities": "家庭 family, 传统 tradition, 社区 community, 邻居 neighbor, 孝顺 filial devotion",
    "Language and Culture": "方言 dialect, 文化 culture, 习俗 custom, 母语 native language",
    "Science and Technology": "人工智能 AI, 隐私 privacy, 网络 internet, 发明 invention",
    "Contemporary Life": "休闲 leisure, 住房 housing, 压力 stress, 健康 health",
    "Global Contexts": "环境 environment, 移民 immigration, 可持续发展 sustainable development, 交流 exchange",
  },
  vocabularyResources: [
    { name: "HSK Online Practice", url: "https://www.hskonline.com", desc: "Leveled vocabulary and reading practice" },
    { name: "Pleco Dictionary", url: "https://www.pleco.com", desc: "Flashcards and example sentences" },
  ],
  examPrep: ["Practice typing with your input method (Pinyin or Bopomofo) in Bluebook"],
  writingWeeks: [storyWeek, emailWeek],
  grammarWeek,
};

export default {
  id: "chinese",
  globalResources: [
    { name: "AP Classroom", url: "https://myap.collegeboard.org", desc: "Official practice, progress checks and course project materials", tag: "Official" },
    { name: "AP Chinese Past Exam Questions", url: PAST_EXAMS_URL, desc: "Older exams: story narration, email and multiple-choice skills carry over; the conversation and cultural presentation tasks were removed", tag: "Official" },
    { name: "ChinesePod", url: "https://www.chinesepod.com", desc: "Listening lessons from beginner to advanced", tag: "Audio" },
    { name: "HSK Online Practice", url: "https://www.hskonline.com", desc: "Leveled vocabulary and reading practice", tag: "Practice" },
    { name: "Pleco Dictionary", url: "https://www.pleco.com", desc: "Dictionary, character lookup and flashcards", tag: "Tool" },
    { name: "Du Chinese", url: "https://www.duchinese.net", desc: "Graded readings with audio", tag: "Free" },
  ],
  weeks: buildWorldLanguageWeeks(LANGUAGE),
};
