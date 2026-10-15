// AP Japanese Language and Culture: study plan content.
// Name, color, code and exam date live in ../subjectIndex.js.
// Follows the course revised for 2026-27 (first exam May 2027). The weeks
// every world language shares come from ../worldLanguages/project.js; this
// file supplies what is specific to Japanese.
import { buildWorldLanguageWeeks } from '../worldLanguages/project.js'

const COLOR = "#be185d";
const PAST_EXAMS_URL = "https://apcentral.collegeboard.org/courses/ap-japanese-language-and-culture/exam/past-exam-questions";

const storyWeek = {
  theme: "Writing: Story Narration",
  examWeight: "Free response · 7.5%",
  overview: "You write a story from four pictures, sharing 30 minutes with the email response, so plan on about 15 minutes. Scorers look for a complete story that covers every picture, connected with sequence words, in consistent style and correct kanji.",
  days: [
    { day: "Day 1", tasks: ["Learn: the task: four pictures in order; your story must cover all four, with a beginning, development and ending","Learn: sequence words: まず, それから, その後, すると, 最後に; time phrases: ある日, しばらくして, 次の日","Practice: describe one picture set in four sentences, one per picture, in the past tense"] },
    { day: "Day 2", tasks: ["Learn: add what people feel and why: 〜ので、困りました; うれしそうに言いました","Learn: join actions with the て-form: 起きて、顔を洗って、出かけました","Practice: expand Day 1's sentences into a story of about 300 characters"] },
    { day: "Day 3", tasks: ["Learn: give the story an ending or a lesson: それ以来..., やっと〜ことがわかりました","Learn: pick one style, です/ます or plain form, and keep it for the whole story","Practice: rewrite your story with a clear ending, checking that the style never switches"] },
    { day: "Day 4", tasks: ["Timed: one four-picture set (AP Classroom has AP-style prompts), 15 minutes, typed","Reread for kanji the input method chose wrongly, such as 橋 and 箸 (both はし), then fix them"] },
    { day: "Day 5", tasks: ["Timed: a second picture set, 15 minutes","Checkpoint: did your story cover all four pictures, in order, with an ending?","Checkpoint: did the style stay the same from start to finish?"] },
  ],
  keyRules: ["Cover all four pictures, in order","Link events with sequence words and the て-form","Keep one style, です/ます or plain, throughout","Reread every sentence for wrongly converted kanji"],
  resources: [
    { name: "AP Japanese Exam Page", url: "https://apcentral.collegeboard.org/courses/ap-japanese-language-and-culture/exam", desc: "The new free-response tasks and scoring guidelines" },
    { name: "NHK News Web Easy", url: "https://www3.nhk.or.jp/news/easy/", desc: "Simple Japanese news with furigana, good models for clear narration" },
  ],
  frq: { type: "Story Narration", prompt: "Using an AP-style four-picture prompt from AP Classroom or your teacher, write the story in 15 minutes, typed.", rubricTip: "High scores tell a complete, logical story with transitions, varied vocabulary and grammar, and few errors. A story that skips one picture can't reach the top scores." },
  tip: "Before typing, spend one minute noting a key verb for each picture. It keeps the story moving and stops you running out of time on picture three.",
};

const emailWeek = {
  theme: "Writing: Email Response",
  examWeight: "Free response · 7.5%",
  overview: "You reply to an email from a friend or someone in your community. Scorers check that you answer every question, give details and reasons, and keep a style and level of politeness that fits the reader.",
  days: [
    { day: "Day 1", tasks: ["Learn: the task: read the email, find every question or request in it, and answer each one","Learn: politeness: です/ます for anyone but a close friend; honorific and humble forms (いらっしゃる, いただく) for teachers and adults you don't know","Practice: list every question in two AP-style emails from AP Classroom or your textbook"] },
    { day: "Day 2", tasks: ["Learn: structure: an opening line, a sentence thanking them for their email, one paragraph per question, a closing such as よろしくお願いします","Learn: give a reason for every answer: 〜と思います。なぜなら〜からです","Practice: answer one AP-style email untimed"] },
    { day: "Day 3", tasks: ["Learn: when asked for advice or a choice, compare options: 〜より〜のほうが...; 〜たらどうですか","Practice: answer a second email, giving and justifying a recommendation"] },
    { day: "Day 4", tasks: ["Timed: one AP-style email, 15 minutes","Reread for every question answered, consistent politeness and wrongly converted kanji"] },
    { day: "Day 5", tasks: ["Timed: a story narration and an email together, 30 minutes total, as on the exam","Checkpoint: did you finish both, and answer every question in the email?"] },
  ],
  keyRules: ["Answer every question in the email","Match politeness to the reader, and never mix polite and plain forms","Give a reason or detail with every answer","Story and email share 30 minutes: aim for about 15 each"],
  resources: [
    { name: "AP Classroom", url: "https://myap.collegeboard.org", desc: "AP-style prompts for the new writing tasks" },
    { name: "Jisho.org", url: "https://jisho.org", desc: "Check kanji and example sentences" },
  ],
  frq: { type: "Email Response", prompt: "Answer an AP-style email in 15 minutes, typed, answering every question with a reason.", rubricTip: "Scorers check task completion first: every question answered with detail. Polite language that fits the reader also counts." },
  tip: "Underline each question in the email before you start. Missing one is the most common way to lose points on this task.",
};

const grammarWeek = {
  theme: "Grammar for Language Control",
  examWeight: "All free response",
  overview: "Language control is scored in the presentation, the Q&A and both writing tasks. This week targets the structures that most separate strong responses from average ones.",
  days: [
    { day: "Day 1", tasks: ["Learn: は marks the topic, が marks the subject or new information; が goes with ある, いる, 好き and できる","Learn: に for existence and destination, で for where an action happens","Practice: 10 sentences about your project research, checking every particle"] },
    { day: "Day 2", tasks: ["Learn: the て-form joins actions, makes requests, and forms 〜ている for ongoing actions and states","Learn: 〜てから (after doing) and 〜ながら (while doing)","Practice: describe how a piece of traditional music is performed, step by step, with て-form chains"] },
    { day: "Day 3", tasks: ["Learn: conditionals: と (automatic result), ば (general condition), たら (once or if), なら (if that's the case)","Learn: giving and receiving: あげる, くれる, もらう, and 〜てくれる for favors","Practice: five conditional sentences about your project topic"] },
    { day: "Day 4", tasks: ["Learn: keigo: honorific verbs for others (いらっしゃる, おっしゃる, 召し上がる) and humble verbs for yourself (参ります, 申します, いただきます)","Learn: plain form inside a sentence before と思います, ので and から","Practice: rewrite a casual paragraph into polite form, then into a message to a teacher"] },
    { day: "Day 5", tasks: ["Rewrite part of your presentation to include a conditional, a て-form chain and a reason with ので","Present that part aloud","Checkpoint: which of these structures do you still avoid when speaking?"] },
  ],
  keyRules: ["は = topic, が = subject or new information","Never use honorific keigo for your own actions","Keep one level of politeness through a whole response","Conditionals and て-form chains raise the language score"],
  resources: [
    { name: "NHK World: Learn Japanese", url: "https://www3.nhk.or.jp/nhkworld/en/learnjapanese/", desc: "Grammar lessons with audio" },
    { name: "Jisho.org", url: "https://jisho.org", desc: "Example sentences for grammar points" },
  ],
  frq: { type: "Project Presentation (language control)", prompt: "Present your project for 3 minutes, deliberately using a conditional, a て-form chain and a reason with ので. Record it.", rubricTip: "Language control rewards accuracy and range together. Consistent です/ます style throughout counts as much as any single advanced structure." },
  tip: "Build two or three complex sentences into your outline in advance. Prepared range sounds natural on exam day; improvised range under time pressure often doesn't.",
};

const LANGUAGE = {
  name: "Japanese",
  color: COLOR,
  examFormat: "storyAndEmail",
  examUrl: "https://apcentral.collegeboard.org/courses/ap-japanese-language-and-culture/exam",
  readingTips: [
    "Learn: guess unknown words from kanji you know: 電 (electricity) + 車 (vehicle) = train",
    "Learn: read for particles: が, を, に and で tell you who did what, to what, and where",
  ],
  listeningTips: ["Learn: listen for signal words that mark the structure: まず, でも, だから, つまり"],
  musicAngles: "taiko drumming (太鼓), the koto (琴) and shamisen (三味線), enka (演歌), J-pop and anime soundtracks",
  musicPhrases: "リズム (rhythm), 歌詞 (lyrics), 楽器 (instrument), 演奏する (perform), 伝統音楽 (traditional music), 〜を表している (expresses)",
  presentationPhrases: "今日は〜について発表します, まず..., 資料によると..., このことから〜がわかります, 最後に...",
  complexStructures: "conditionals (と, ば, たら), て-form chains, and consistent polite style",
  qaPhrases: "いい質問ですね..., そうですね、私は〜と思います..., 一番驚いたのは〜です",
  connectors: "それに, でも, だから, たとえば, 一方",
  projectResources: [
    { name: "NHK News Web Easy", url: "https://www3.nhk.or.jp/news/easy/", desc: "Simple Japanese news, including culture stories" },
  ],
  unitVocabulary: {
    "Families and Communities": "家族 family, 伝統 tradition, 地域 community, 近所 neighborhood, 行事 seasonal event",
    "Language and Culture": "方言 dialect, 文化 culture, 習慣 custom, 母語 native language",
    "Science and Technology": "人工知能 AI, 個人情報 personal data, 技術 technology, 発明 invention",
    "Contemporary Life": "趣味 hobby, 住まい housing, ストレス stress, 健康 health",
    "Global Contexts": "環境 environment, 移民 immigration, 持続可能 sustainable, 国際交流 international exchange",
  },
  vocabularyResources: [
    { name: "Anki", url: "https://apps.ankiweb.net", desc: "Spaced-repetition flashcards for vocabulary and kanji" },
    { name: "Jisho.org", url: "https://jisho.org", desc: "Dictionary with example sentences" },
  ],
  examPrep: ["Practice typing in romaji and choosing the right kanji in Bluebook"],
  writingWeeks: [storyWeek, emailWeek],
  grammarWeek,
};

export default {
  id: "japanese",
  globalResources: [
    { name: "AP Classroom", url: "https://myap.collegeboard.org", desc: "Official practice, progress checks and course project materials", tag: "Official" },
    { name: "AP Japanese Past Exam Questions", url: PAST_EXAMS_URL, desc: "Older exams in the previous format: their reading and listening practice still helps; check each writing and speaking task against the new format", tag: "Official" },
    { name: "NHK World: Learn Japanese", url: "https://www3.nhk.or.jp/nhkworld/en/learnjapanese/", desc: "Free lessons with audio", tag: "Audio" },
    { name: "NHK News Web Easy", url: "https://www3.nhk.or.jp/news/easy/", desc: "Simple Japanese news with furigana", tag: "Free" },
    { name: "Jisho.org", url: "https://jisho.org", desc: "Dictionary with kanji lookup", tag: "Tool" },
    { name: "Anki", url: "https://apps.ankiweb.net", desc: "Spaced-repetition flashcards", tag: "Tool" },
  ],
  weeks: buildWorldLanguageWeeks(LANGUAGE),
};
