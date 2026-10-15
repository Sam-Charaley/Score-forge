// AP Spanish Language and Culture: study plan content.
// Name, color, code and exam date live in ../subjectIndex.js.
// Follows the course revised for 2026-27 (first exam May 2027). The weeks
// every world language shares come from ../worldLanguages/project.js; this
// file supplies what is specific to Spanish.
import { buildWorldLanguageWeeks } from '../worldLanguages/project.js'

const COLOR = "#dc2626";

const essayStructureWeek = {
  theme: "Argumentative Essay: Structure & Sources",
  examWeight: "Free response · 15%",
  overview: "The essay asks you to take a position on a question using print and audio sources with different viewpoints, in 55 minutes. It rewards a clear thesis, evidence from every source and connected paragraphs. This week builds the structure; next week adds the audio and the clock.",
  days: [
    { day: "Day 1", tasks: ["Learn: the task: read the sources, listen to the audio twice, then write an argument that answers the question","Learn: a thesis states your position and previews your reasons in one sentence","Practice: write three thesis sentences for '¿Deben las escuelas prohibir los teléfonos celulares?', one for, one against, one nuanced"] },
    { day: "Day 2", tasks: ["Learn: paragraph pattern: claim, evidence from a named source, explanation of how it supports the claim","Learn: citing phrases: Según la fuente 1..., El artículo indica que..., De acuerdo con la gráfica..., En la fuente auditiva, la entrevistada explica que...","Practice: from one article, write two body paragraphs, each citing the source"] },
    { day: "Day 3", tasks: ["Learn: address the other side: Aunque algunos sostienen que..., es cierto que..., sin embargo...","Learn: a counterargument you answer makes your argument stronger, not weaker","Practice: add a counterargument paragraph to Day 2's essay"] },
    { day: "Day 4", tasks: ["Learn: introductions and conclusions: restate the question in your own words, give your thesis, and close by widening to why it matters","Learn: transitions between paragraphs: además, por otro lado, en cambio, por lo tanto, en conclusión","Practice: write an introduction and a conclusion for Day 2's essay"] },
    { day: "Day 5", tasks: ["Write a full essay from one past AP prompt's print sources, untimed","Check it against the scoring guidelines: thesis, evidence from every source, organization, language","Checkpoint: does every body paragraph cite a source by name?"] },
  ],
  keyRules: ["State your position in the first paragraph and keep it","Use every source, and name each one when you use it","Explain how each piece of evidence supports your thesis; don't just summarize the source","Answer the opposing view instead of ignoring it"],
  resources: [
    { name: "AP Spanish Past Exam Questions", url: "https://apcentral.collegeboard.org/courses/ap-spanish-language-and-culture/exam/past-exam-questions", desc: "Past essay prompts with sources and scoring guidelines (older exams; the essay task carries over)" },
    { name: "BBC Mundo", url: "https://www.bbc.com/mundo", desc: "Current articles to practice arguing about" },
  ],
  frq: { type: "Argumentative Essay", prompt: "Using one past AP essay prompt, write a full essay from its print sources only. Take a clear position and cite each source at least once.", rubricTip: "High scores come from a clear thesis that stays the same throughout, evidence from all the sources, and explanation that links the evidence to the thesis. Varied transitions also raise the language score." },
  tip: "Plan for 5 minutes before writing: your thesis, two reasons, which source supports each, and one counterargument. A planned essay reads as organized even when your Spanish isn't perfect.",
};

const essayTimedWeek = {
  theme: "Argumentative Essay: Audio Sources & Timing",
  examWeight: "Free response · 15%",
  overview: "On the exam you hear the audio source twice and write within 55 minutes. This week practices note-taking from audio, using it as evidence, and finishing a complete essay on time.",
  days: [
    { day: "Day 1", tasks: ["Learn: take notes during the first listening for main ideas, and during the second for quotes and numbers","Learn: abbreviations save time in notes: write key words, not sentences","Practice: take notes on one Radio Ambulante segment, then summarize it in four sentences"] },
    { day: "Day 2", tasks: ["Learn: citing audio: En la entrevista, el experto afirma que...; Según la grabación...","Practice: write one paragraph that uses a statistic from a chart and a quote from audio","Practice: 10 listening questions"] },
    { day: "Day 3", tasks: ["Timed essay 1: a past AP prompt with audio, 55 minutes including listening","Score it with the guidelines and note what took longest"] },
    { day: "Day 4", tasks: ["Fix the weakest paragraph of Day 3's essay","Learn: proofreading in the last 5 minutes: check verb agreement, gender agreement and accents","Practice: proofread a past essay for exactly those three things"] },
    { day: "Day 5", tasks: ["Timed essay 2 on a new prompt, 55 minutes","Compare with essay 1: did you cite every source and finish on time?","Checkpoint: can you write a full essay with a counterargument in 55 minutes?"] },
  ],
  keyRules: ["Listen for structure first, then details, across the two plays","Cite the audio source as you would a print source","Leave 5 minutes to proofread for agreement and accents","A finished essay with small errors scores higher than a perfect but unfinished one"],
  resources: [
    { name: "Radio Ambulante (NPR)", url: "https://radioambulante.org", desc: "Long-form Spanish audio stories with transcripts" },
    { name: "AP Spanish Past Exam Questions", url: "https://apcentral.collegeboard.org/courses/ap-spanish-language-and-culture/exam/past-exam-questions", desc: "Essay prompts with audio and scoring guidelines" },
  ],
  frq: { type: "Argumentative Essay (timed)", prompt: "Write a complete essay from a past AP prompt with print and audio sources in 55 minutes, including both listenings.", rubricTip: "Readers look for evidence from the audio source specifically. A paragraph that cites a speaker by role ('la entrevistada', 'el investigador') shows you used it." },
  tip: "Practice typing in Spanish before the exam: know how to enter ñ, accents, ¿ and ¡ quickly in Bluebook so they don't slow you down.",
};

const grammarWeek = {
  theme: "Grammar for Language Control",
  examWeight: "All free response",
  overview: "Language control is scored in the presentation, the Q&A and the essay. This week targets the structures that most separate strong responses from average ones: the subjunctive, past tenses, hypotheticals, ser and estar, and por and para.",
  days: [
    { day: "Day 1", tasks: ["Learn: subjunctive after wishes, emotions, impersonal expressions, recommendations, doubt and denial (quiero que, me alegra que, es importante que, dudo que)","Learn: no creo que and no pienso que take the subjunctive; creo que takes the indicative","Practice: write eight opinion sentences about your project topic, half using the subjunctive"] },
    { day: "Day 2", tasks: ["Learn: preterite for completed events, imperfect for background, description and habits","Learn: a story usually needs both: Era tarde cuando empezó el concierto","Practice: tell how a musical tradition began, in 8 sentences, using both tenses"] },
    { day: "Day 3", tasks: ["Learn: hypotheticals: si + imperfect subjunctive, then the conditional (Si tuviera la oportunidad, estudiaría en Sevilla)","Learn: the conditional softens opinions and recommendations: sería mejor, deberíamos","Practice: five hypothetical sentences about your project topic"] },
    { day: "Day 4", tasks: ["Learn: ser for identity, origin, time and characteristics; estar for location, conditions and the progressive","Learn: por for cause, exchange and duration; para for goals, recipients and deadlines","Practice: 20 fill-in sentences mixing ser/estar and por/para, then check"] },
    { day: "Day 5", tasks: ["Rewrite one paragraph of your essay and one part of your presentation to include a subjunctive, a hypothetical and a past tense contrast","Present that part aloud","Checkpoint: which of these five structures do you still avoid when speaking?"] },
  ],
  keyRules: ["Use the subjunctive after doubt, emotion, wishes and impersonal expressions","Preterite for events, imperfect for background","Si + imperfect subjunctive, then the conditional","Varied, complex structures raise the language control score"],
  resources: [
    { name: "Lawless Spanish", url: "https://www.lawlessspanish.com", desc: "Grammar explanations with exercises" },
    { name: "Albert.io AP Spanish", url: "https://albert.io/ap-spanish-language", desc: "Grammar-in-context practice" },
  ],
  frq: { type: "Project Presentation (language control)", prompt: "Present your project for 3 minutes, deliberately using at least two subjunctives, one hypothetical and both past tenses. Record it.", rubricTip: "Language control rewards accuracy and range together. One correct si-clause in your conclusion ('Si más personas conocieran esta tradición...') shows range in a single sentence." },
  tip: "Build two or three complex sentences into your outline in advance. Prepared range sounds natural on exam day; improvised range under time pressure often doesn't.",
};

const LANGUAGE = {
  name: "Spanish",
  color: COLOR,
  examFormat: "essay",
  examUrl: "https://apcentral.collegeboard.org/courses/ap-spanish-language-and-culture/exam",
  readingTips: ["Learn: use cognates (información, importante) but watch false friends: embarazada means pregnant, actual means current"],
  listeningTips: ["Learn: listen for signal words that mark the structure: primero, sin embargo, por eso, en resumen"],
  musicAngles: "flamenco in Spain, cumbia in Colombia, son in Cuba, tango in Argentina, reggaetón in Puerto Rico",
  musicPhrases: "el ritmo, la letra, el compás, interpretar una canción, surgir en, reflejar la identidad de",
  presentationPhrases: "Hoy voy a hablar de..., En primer lugar..., Según la fuente..., Esto demuestra que..., Para concluir...",
  complexStructures: "the subjunctive, the preterite and imperfect, and si-clauses",
  qaPhrases: "Es una buena pregunta..., Bueno, a mi parecer..., Lo que más me sorprendió fue...",
  connectors: "además, sin embargo, por eso, por ejemplo, en cambio",
  projectResources: [
    { name: "Radio Ambulante (NPR)", url: "https://radioambulante.org", desc: "Spanish audio stories; search for music and culture episodes" },
  ],
  unitVocabulary: {
    "Families and Communities": "la crianza, los valores, la convivencia, el barrio, la tradición familiar",
    "Language and Culture": "el bilingüismo, el dialecto, la herencia cultural, el idioma materno",
    "Science and Technology": "la inteligencia artificial, la privacidad, el avance, las redes sociales",
    "Contemporary Life": "el ocio, la vivienda, el trabajo remoto, el bienestar",
    "Global Contexts": "el medio ambiente, la migración, la sostenibilidad, los derechos humanos",
  },
  vocabularyResources: [
    { name: "BBC Mundo", url: "https://www.bbc.com/mundo", desc: "News across every unit topic" },
    { name: "Albert.io AP Spanish", url: "https://albert.io/ap-spanish-language", desc: "Theme-based reading and listening practice" },
  ],
  examPrep: ["Practice typing ñ, accents, ¿ and ¡ in Bluebook"],
  writingWeeks: [essayStructureWeek, essayTimedWeek],
  grammarWeek,
};

export default {
  id: "spanish",
  globalResources: [
    { name: "AP Classroom", url: "https://myap.collegeboard.org", desc: "Official practice, progress checks and course project materials", tag: "Official" },
    { name: "AP Spanish Past Exam Questions", url: "https://apcentral.collegeboard.org/courses/ap-spanish-language-and-culture/exam/past-exam-questions", desc: "Older exams: the essay and multiple-choice skills carry over; the email, conversation and cultural comparison tasks were removed", tag: "Official" },
    { name: "Radio Ambulante (NPR)", url: "https://radioambulante.org", desc: "Award-winning Spanish podcast with transcripts", tag: "Audio" },
    { name: "BBC Mundo", url: "https://www.bbc.com/mundo", desc: "Current news in Spanish for reading practice", tag: "Free" },
    { name: "Lawless Spanish", url: "https://www.lawlessspanish.com", desc: "Grammar explanations with exercises", tag: "Free" },
    { name: "Albert.io AP Spanish", url: "https://albert.io/ap-spanish-language", desc: "AP-style practice questions", tag: "Practice" },
  ],
  weeks: buildWorldLanguageWeeks(LANGUAGE),
};
