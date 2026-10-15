// AP French Language and Culture: study plan content.
// Name, color, code and exam date live in ../subjectIndex.js.
// Follows the course revised for 2026-27 (first exam May 2027). The weeks
// every world language shares come from ../worldLanguages/project.js; this
// file supplies what is specific to French.
import { buildWorldLanguageWeeks } from '../worldLanguages/project.js'

const COLOR = "#1d4ed8";

const essayStructureWeek = {
  theme: "Argumentative Essay: Structure & Sources",
  examWeight: "Free response · 15%",
  overview: "The essay asks you to take a position on a question using print and audio sources with different viewpoints, in 55 minutes. It rewards a clear thesis, evidence from every source and connected paragraphs. This week builds the structure; next week adds the audio and the clock.",
  days: [
    { day: "Day 1", tasks: ["Learn: the task: read the sources, listen to the audio twice, then write an argument that answers the question","Learn: a thesis states your position and previews your reasons in one sentence","Practice: write three thesis sentences for « Les écoles devraient-elles interdire les téléphones portables ? », one for, one against, one nuanced"] },
    { day: "Day 2", tasks: ["Learn: paragraph pattern: claim, evidence from a named source, explanation of how it supports the claim","Learn: citing phrases: Selon la source 1..., L'article indique que..., D'après le graphique..., Dans la source audio, l'intervenante explique que...","Practice: from one article, write two body paragraphs, each citing the source"] },
    { day: "Day 3", tasks: ["Learn: address the other side: Bien que certains affirment que... (bien que takes the subjunctive), il est vrai que..., cependant...","Learn: a counterargument you answer makes your argument stronger, not weaker","Practice: add a counterargument paragraph to Day 2's essay"] },
    { day: "Day 4", tasks: ["Learn: introductions and conclusions: restate the question in your own words, give your thesis, and close by widening to why it matters","Learn: transitions between paragraphs: de plus, d'une part... d'autre part, en revanche, par conséquent, en conclusion","Practice: write an introduction and a conclusion for Day 2's essay"] },
    { day: "Day 5", tasks: ["Write a full essay from one past AP prompt's print sources, untimed","Check it against the scoring guidelines: thesis, evidence from every source, organization, language","Checkpoint: does every body paragraph cite a source by name?"] },
  ],
  keyRules: ["State your position in the first paragraph and keep it","Use every source, and name each one when you use it","Explain how each piece of evidence supports your thesis; don't just summarize the source","Answer the opposing view instead of ignoring it"],
  resources: [
    { name: "AP French Past Exam Questions", url: "https://apcentral.collegeboard.org/courses/ap-french-language-and-culture/exam/past-exam-questions", desc: "Past essay prompts with sources and scoring guidelines (older exams; the essay task carries over)" },
    { name: "TV5Monde Apprendre", url: "https://apprendre.tv5monde.com", desc: "Articles and videos with exercises, by level" },
  ],
  frq: { type: "Argumentative Essay", prompt: "Using one past AP essay prompt, write a full essay from its print sources only. Take a clear position and cite each source at least once.", rubricTip: "High scores come from a clear thesis that stays the same throughout, evidence from all the sources, and explanation that links the evidence to the thesis. Varied transitions also raise the language score." },
  tip: "Plan for 5 minutes before writing: your thesis, two reasons, which source supports each, and one counterargument. A planned essay reads as organized even when your French isn't perfect.",
};

const essayTimedWeek = {
  theme: "Argumentative Essay: Audio Sources & Timing",
  examWeight: "Free response · 15%",
  overview: "On the exam you hear the audio source twice and write within 55 minutes. This week practices note-taking from audio, using it as evidence, and finishing a complete essay on time.",
  days: [
    { day: "Day 1", tasks: ["Learn: take notes during the first listening for main ideas, and during the second for quotes and numbers","Learn: abbreviations save time in notes: write key words, not sentences","Practice: take notes on one RFI podcast segment, then summarize it in four sentences"] },
    { day: "Day 2", tasks: ["Learn: citing audio: Dans l'entretien, l'expert affirme que...; D'après l'enregistrement...","Practice: write one paragraph that uses a statistic from a chart and a quote from audio","Practice: 10 listening questions"] },
    { day: "Day 3", tasks: ["Timed essay 1: a past AP prompt with audio, 55 minutes including listening","Score it with the guidelines and note what took longest"] },
    { day: "Day 4", tasks: ["Fix the weakest paragraph of Day 3's essay","Learn: proofreading in the last 5 minutes: check verb agreement, adjective agreement and past-participle agreement with être","Practice: proofread a past essay for exactly those three things"] },
    { day: "Day 5", tasks: ["Timed essay 2 on a new prompt, 55 minutes","Compare with essay 1: did you cite every source and finish on time?","Checkpoint: can you write a full essay with a counterargument in 55 minutes?"] },
  ],
  keyRules: ["Listen for structure first, then details, across the two plays","Cite the audio source as you would a print source","Leave 5 minutes to proofread for agreement","A finished essay with small errors scores higher than a perfect but unfinished one"],
  resources: [
    { name: "RFI Podcasts", url: "https://www.rfi.fr/fr/podcasts", desc: "French-language news and culture podcasts" },
    { name: "AP French Past Exam Questions", url: "https://apcentral.collegeboard.org/courses/ap-french-language-and-culture/exam/past-exam-questions", desc: "Essay prompts with audio and scoring guidelines" },
  ],
  frq: { type: "Argumentative Essay (timed)", prompt: "Write a complete essay from a past AP prompt with print and audio sources in 55 minutes, including both listenings.", rubricTip: "Readers look for evidence from the audio source specifically. A paragraph that cites a speaker by role ('l'intervenante', 'le chercheur') shows you used it." },
  tip: "Practice typing in French before the exam: know how to enter é, è, à, ç and ô quickly in Bluebook so accents don't slow you down.",
};

const grammarWeek = {
  theme: "Grammar for Language Control",
  examWeight: "All free response",
  overview: "Language control is scored in the presentation, the Q&A and the essay. This week targets the structures that most separate strong responses from average ones: the subjunctive, past tenses, hypotheticals, relative pronouns and the pronouns y and en.",
  days: [
    { day: "Day 1", tasks: ["Learn: subjunctive after necessity, wishes, emotions and doubt (il faut que, je veux que, je suis content que, je doute que) and after bien que, pour que, avant que","Learn: je ne pense pas que takes the subjunctive; je pense que takes the indicative","Practice: write eight opinion sentences about your project topic, half using the subjunctive"] },
    { day: "Day 2", tasks: ["Learn: passé composé for completed events, imparfait for background, description and habits","Learn: a story usually needs both: Il faisait nuit quand le concert a commencé","Practice: tell how a musical tradition began, in 8 sentences, using both tenses"] },
    { day: "Day 3", tasks: ["Learn: si + imparfait, then the conditional (Si j'avais l'occasion, j'étudierais à Montréal); si + plus-que-parfait, then the past conditional","Learn: the conditional softens opinions and recommendations: il vaudrait mieux, nous devrions","Practice: five hypothetical sentences about your project topic"] },
    { day: "Day 4", tasks: ["Learn: relative pronouns: qui (subject), que (object), dont (replaces de + noun), où (place or time)","Learn: y replaces à + a thing or a place; en replaces de + a thing or a quantity","Practice: combine 10 pairs of short sentences using qui, que, dont or où"] },
    { day: "Day 5", tasks: ["Rewrite one paragraph of your essay and one part of your presentation to include a subjunctive, a hypothetical and a relative clause with dont","Present that part aloud","Checkpoint: which of these structures do you still avoid when speaking?"] },
  ],
  keyRules: ["Use the subjunctive after il faut que, bien que, doubt and emotion","Passé composé for events, imparfait for background","Si + imparfait, then the conditional; never the conditional after si","Varied, complex structures raise the language control score"],
  resources: [
    { name: "Lawless French", url: "https://www.lawlessfrench.com", desc: "Grammar explanations with exercises" },
    { name: "Lingolia French", url: "https://francais.lingolia.com/en/", desc: "Clear grammar tables and practice" },
  ],
  frq: { type: "Project Presentation (language control)", prompt: "Present your project for 3 minutes, deliberately using at least two subjunctives, one si-clause and both past tenses. Record it.", rubricTip: "Language control rewards accuracy and range together. One correct si-clause in your conclusion ('Si plus de gens connaissaient cette tradition...') shows range in a single sentence." },
  tip: "Build two or three complex sentences into your outline in advance. Prepared range sounds natural on exam day; improvised range under time pressure often doesn't.",
};

const LANGUAGE = {
  name: "French",
  color: COLOR,
  examFormat: "essay",
  examUrl: "https://apcentral.collegeboard.org/courses/ap-french-language-and-culture/exam",
  readingTips: ["Learn: use cognates (information, important) but watch false friends: actuellement means currently, une librairie is a bookstore"],
  listeningTips: ["Learn: listen for signal words that mark the structure: d'abord, cependant, donc, en somme"],
  musicAngles: "la chanson française in France, raï in Algeria, zouk in the French Caribbean, la chanson québécoise in Quebec, francophone rap in France and West Africa",
  musicPhrases: "le rythme, les paroles, un genre musical, interpréter une chanson, naître de, refléter l'identité de",
  presentationPhrases: "Aujourd'hui, je vais vous parler de..., Tout d'abord..., Selon la source..., Cela montre que..., Pour conclure...",
  complexStructures: "the subjunctive, the passé composé and imparfait, and si-clauses",
  qaPhrases: "C'est une bonne question..., Eh bien, à mon avis..., Ce qui m'a le plus surpris, c'est...",
  connectors: "de plus, cependant, donc, par exemple, en revanche",
  projectResources: [
    { name: "RFI Podcasts", url: "https://www.rfi.fr/fr/podcasts", desc: "French audio; look for music and culture programs" },
  ],
  unitVocabulary: {
    "Families and Communities": "l'éducation, les valeurs, le voisinage, la vie de quartier, les liens familiaux",
    "Language and Culture": "le bilinguisme, la francophonie, le patrimoine, la langue maternelle",
    "Science and Technology": "l'intelligence artificielle, la vie privée, les réseaux sociaux, une avancée",
    "Contemporary Life": "les loisirs, le logement, le télétravail, le bien-être",
    "Global Contexts": "l'environnement, la migration, le développement durable, les droits de l'homme",
  },
  vocabularyResources: [
    { name: "TV5Monde Apprendre", url: "https://apprendre.tv5monde.com", desc: "Videos and articles across every unit topic" },
    { name: "Albert.io AP French", url: "https://albert.io/ap-french-language", desc: "Theme-based reading and listening practice" },
  ],
  examPrep: ["Practice typing é, è, à, ç and ô in Bluebook"],
  writingWeeks: [essayStructureWeek, essayTimedWeek],
  grammarWeek,
};

export default {
  id: "french",
  globalResources: [
    { name: "AP Classroom (College Board)", url: "https://myap.collegeboard.org", desc: "Official practice, progress checks and course project materials", tag: "Official" },
    { name: "AP French Past Exam Questions", url: "https://apcentral.collegeboard.org/courses/ap-french-language-and-culture/exam/past-exam-questions", desc: "Older exams: the essay and multiple-choice skills carry over; the email, conversation and cultural comparison tasks were removed", tag: "Official" },
    { name: "TV5Monde Apprendre", url: "https://apprendre.tv5monde.com", desc: "Authentic French videos with exercises", tag: "Free" },
    { name: "RFI Savoirs", url: "https://savoirs.rfi.fr", desc: "French audio for listening practice", tag: "Audio" },
    { name: "Lawless French", url: "https://www.lawlessfrench.com", desc: "Grammar explanations with exercises", tag: "Free" },
    { name: "Albert.io AP French", url: "https://albert.io/ap-french-language", desc: "AP-style practice questions", tag: "Practice" },
  ],
  weeks: buildWorldLanguageWeeks(LANGUAGE),
};
