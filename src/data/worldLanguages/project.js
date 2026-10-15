// Shared plan for the AP world language courses revised for 2026-27
// (first exam May 2027): every language does a year-long course project,
// presents it on exam day, then answers four questions about it.
//
// The weeks that are the same for every language (exam format, the project,
// unit vocabulary, the practice exam and exam week) are written here once.
// Each language's subject file supplies only what is its own: phrases,
// music angles for the theme, its writing weeks and its grammar week.
//
// When College Board releases the Course Project Packet (January), update
// COURSE_PROJECT and every language plan follows.

export const COURSE_PROJECT = {
  schoolYear: '2026-27',
  themeUnit: 'Unit 3: Art and Creativity',
  theme: 'art and creativity, seen through music',
  packetRelease: 'January 31, 2027',
  outlineDeadline: 'April 30, 2027',
};

export const COURSE_UNITS = ['Families and Communities', 'Language and Culture', 'Art and Creativity', 'Science and Technology', 'Contemporary Life', 'Global Contexts'];

// The two exam shapes. Spanish, French, German and Italian write one
// argumentative essay; Chinese and Japanese write a story and an email.
export const EXAM_FORMATS = {
  essay: {
    listening: '25 listening questions in 40 minutes',
    writingSummary: 'an argumentative essay',
    writingTasks: 'an argumentative essay from print and audio sources (55 minutes, 15%)',
    freeResponseCount: 3,
  },
  storyAndEmail: {
    listening: '25 listening questions in 25 minutes',
    writingSummary: 'two writing tasks, a story narration and an email response',
    writingTasks: 'a story narration from four pictures and an email response (30 minutes for both, 7.5% each)',
    freeResponseCount: 4,
  },
};

const READING = '30 reading questions in 40 minutes';
const PRESENTATION = 'a 3-minute project presentation after 3 minutes to prepare (20%)';
const QA = 'a Q&A of 4 recorded questions about your project, 40 seconds each (15%)';
const PROJECT_SHARE = 'Project · 35% of the exam';
const STUDY_DAYS = '5 study days';
// Week ids start at 201: progress is keyed by week id, and the old plans
// used 1-10 (retired in subjects.test.js).
const FIRST_WEEK_ID = 201;

const PRESENTATION_SCORING = 'task execution, cultural understanding, organization, language control and delivery';
const QA_SCORING = 'task execution, cultural understanding, language control and fluency';

function examFormatWeek(lang, format) {
  return {
    theme: 'The New Exam & Interpretive Skills',
    examWeight: 'Multiple choice · 50%',
    overview: `The AP ${lang.name} exam changed for May 2027. Free response is now a presentation of your course project, a Q&A about it, and ${format.writingSummary}. Multiple choice is ${format.listening} and ${READING}. This week maps the whole exam and builds the reading and listening habits multiple choice rewards.`,
    days: [
      { day: 'Day 1', tasks: [
        `Learn: free response is ${PRESENTATION}, ${QA}, and ${format.writingTasks}`,
        `Learn: multiple choice is ${format.listening} and ${READING}, 50% of the score`,
        'Learn: the whole exam runs in Bluebook, and you need wired headphones with a microphone',
        `Learn: the course has six units: ${COURSE_UNITS.join(', ')}`,
      ] },
      { day: 'Day 2', tasks: [
        'Learn: before reading a text, skim the questions so you know what to look for',
        ...lang.readingTips,
        'Practice: one authentic article from AP Classroom; answer its questions and note every word you guessed from context',
      ] },
      { day: 'Day 3', tasks: [
        'Learn: before audio plays, read the introduction and questions; predict what you will hear',
        ...lang.listeningTips,
        'Practice: one interview or podcast clip; take notes in two columns, main ideas and supporting details',
      ] },
      { day: 'Day 4', tasks: [
        'Learn: wrong answers often repeat words from the text but change the meaning; check each choice against what the source actually says',
        "Learn: questions about the author's purpose or the intended audience appear on almost every source",
        `Practice: 15 mixed reading and listening questions in ${lang.name}, timed`,
      ] },
      { day: 'Day 5', tasks: [
        'AP Classroom: one interpretive progress check',
        `Start a vocabulary notebook in ${lang.name}, organized by the six units`,
        'Checkpoint: can you list every part of the exam, its timing and its weight, from memory?',
        'Checkpoint: for your last 15 questions, which wrong answers came from vocabulary, and which from misreading the question?',
      ] },
    ],
    keyRules: [
      'Free response is half the exam, and 35% of the whole score comes from the project presentation and Q&A',
      'Read the questions before each text or audio clip',
      "There's no penalty for wrong multiple-choice answers: answer every question",
      'Practice on screen: the whole exam is in Bluebook',
    ],
    resources: [
      { name: `AP ${lang.name} Exam Page`, url: lang.examUrl, desc: 'Exam format, timing and scoring guidelines' },
      { name: 'AP Classroom', url: 'https://myap.collegeboard.org', desc: 'Official interpretive practice and progress checks' },
    ],
    frq: null,
    tip: `Read and listen to something in ${lang.name} every day, even 10 minutes. Interpretive skill grows from volume more than from drills.`,
  };
}

function exploreWeek(lang) {
  return {
    theme: 'Course Project: Explore & Investigate',
    examWeight: PROJECT_SHARE,
    overview: `The course project is the biggest single part of the new exam. This year's theme comes from ${COURSE_PROJECT.themeUnit}: ${COURSE_PROJECT.theme}. College Board releases the Course Project Packet, with the prompt and ${lang.name}-language sources, on ${COURSE_PROJECT.packetRelease}. Before then, build background on the theme; after, work from the packet.`,
    days: [
      { day: 'Day 1', tasks: [
        `Learn: the project timeline: packet released ${COURSE_PROJECT.packetRelease}; outline (Personalized Project Reference) due ${COURSE_PROJECT.outlineDeadline} in the AP Digital Portfolio`,
        'Learn: the packet walks you through four phases: explore, investigate and apply, build the presentation, and reflect',
        'If the packet is out: read its prompt and reflection questions twice, and write your first answers in the target language',
        `If it isn't out yet: list three ${lang.name}-speaking places and one kind of music from each to explore (${lang.musicAngles})`,
      ] },
      { day: 'Day 2', tasks: [
        `Learn: cultural understanding means connecting products (songs, instruments), practices (how and when music is played) and perspectives (what people value about it)`,
        `Read or listen to two sources about music in ${lang.name}; for each, write one product, one practice and one perspective`,
        'Keep a source log: title, type, main idea and one useful quote or statistic for each source',
      ] },
      { day: 'Day 3', tasks: [
        'Choose a focus narrow enough for 3 minutes: one community, one tradition or one change over time',
        `Write your focus as one sentence in ${lang.name}`,
        'Read two more sources that support your focus, and add them to your log',
      ] },
      { day: 'Day 4', tasks: [
        'Find a comparison or contrast: how your focus connects to music in your own community, or how it has changed',
        'Collect the vocabulary your topic needs (instruments, genres, verbs for creating and performing) in your notebook',
        `Learn: useful phrases for describing music: ${lang.musicPhrases}`,
      ] },
      { day: 'Day 5', tasks: [
        'Write a one-paragraph summary of what you have learned, in the target language, without looking at your notes',
        'Checkpoint: can you name your focus, three sources and one product, practice and perspective?',
        `Checkpoint: is your outline deadline (${COURSE_PROJECT.outlineDeadline}) in your calendar?`,
      ] },
    ],
    keyRules: [
      `The outline (Personalized Project Reference) is due ${COURSE_PROJECT.outlineDeadline}; you get a printed copy on exam day`,
      'Work from the packet\'s prompt and sources once it is released',
      'Cultural understanding = products, practices and perspectives, linked to each other',
      'A narrow focus makes a stronger 3-minute presentation than a broad survey',
    ],
    resources: [
      { name: 'AP World Language Revisions', url: 'https://apcentral.collegeboard.org/courses/ap-world-languages-revisions', desc: 'Official details on the course project and the new exam' },
      { name: 'AP Digital Portfolio', url: 'https://digitalportfolio.collegeboard.org', desc: 'Where the packet is released and the outline is submitted' },
      ...lang.projectResources,
    ],
    frq: { type: 'Project Presentation (early draft)', prompt: `Without notes, talk for 90 seconds in ${lang.name} about your project focus: what it is, why it matters, and one thing you learned from a source. Record yourself.`, rubricTip: `The presentation is scored on ${PRESENTATION_SCORING}. At this stage, listen back for one thing only: did you name a specific source and a specific cultural detail?` },
    tip: 'The project rewards depth. Students who pick one tradition and know it well usually present better than students who try to cover a whole country.',
  };
}

function buildPresentationWeek(lang) {
  return {
    theme: 'Course Project: Build the Presentation & Outline',
    examWeight: PROJECT_SHARE,
    overview: `This week turns your research into a 3-minute presentation and the outline you submit by ${COURSE_PROJECT.outlineDeadline}. The outline is short phrases and key ideas, not a script: on exam day it reminds you of your structure while you speak.`,
    days: [
      { day: 'Day 1', tasks: [
        'Plan a structure: an opening that states your focus, two or three main points each backed by a named source, a cultural connection, and a conclusion',
        `Learn: presentation phrases in ${lang.name}: ${lang.presentationPhrases}`,
        'Write the opening and conclusion sentences in full, then reduce them to key words',
      ] },
      { day: 'Day 2', tasks: [
        'For each main point, choose the strongest evidence from your source log: a fact, a quote or an example',
        'Write how each point connects to a product, practice or perspective',
        'Draft your outline in phrases only; no full sentences you would read aloud',
      ] },
      { day: 'Day 3', tasks: [
        'Present from the outline for the first time, timed at 3 minutes; record it',
        'Listen back: mark where you ran out of words and where you went over time',
        'Fix the outline: add a key word at each place you got stuck',
      ] },
      { day: 'Day 4', tasks: [
        `Learn: language control means accurate verbs, varied vocabulary and complex sentences; check your use of ${lang.complexStructures}`,
        'Replace three simple words in your outline with more precise topic vocabulary',
        'Present again from the outline, timed; compare with Day 3',
      ] },
      { day: 'Day 5', tasks: [
        'Practice the exam timing: 3 minutes to prepare from your outline, then 3 minutes to present',
        `Checkpoint: is your outline ready to submit by ${COURSE_PROJECT.outlineDeadline}? If the packet is out, check it follows the packet's instructions`,
        'Checkpoint: can you present for the full 3 minutes without reading?',
      ] },
    ],
    keyRules: [
      'Outline = short phrases and key ideas, never a script to read',
      'Every main point needs a named source and a cultural connection',
      'Use all 3 minutes: finishing early leaves points on the table',
      `Submit the outline in the AP Digital Portfolio by ${COURSE_PROJECT.outlineDeadline}`,
    ],
    resources: [
      { name: 'AP World Language Revisions', url: 'https://apcentral.collegeboard.org/courses/ap-world-languages-revisions', desc: 'Project requirements and scoring' },
      { name: 'AP Digital Portfolio', url: 'https://digitalportfolio.collegeboard.org', desc: 'Submit your Personalized Project Reference' },
    ],
    frq: { type: 'Project Presentation', prompt: 'Using only your outline, prepare for 3 minutes, then present for 3 minutes. Record it and score yourself on each scoring category.', rubricTip: `Scored on ${PRESENTATION_SCORING}. Organization points come from clear signposting: say when you move to your next point and when you are concluding.` },
    tip: 'Rehearse out loud, not in your head. The presentation is scored on delivery, and only speaking practice improves it.',
  };
}

function rehearseWeek(lang) {
  return {
    theme: 'Course Project: Presentation & Q&A Rehearsal',
    examWeight: PROJECT_SHARE,
    overview: 'After the presentation, you answer four recorded questions about your project, with 40 seconds for each. You cannot see them in advance, but they ask about your research, your sources and what you think. This week makes both parts automatic.',
    days: [
      { day: 'Day 1', tasks: [
        `Learn: the Q&A is scored on ${QA_SCORING}`,
        'Learn: answer structure for 40 seconds: a direct answer, one specific example from your research, then a reason or opinion',
        `Learn: phrases that buy a second to think: ${lang.qaPhrases}`,
      ] },
      { day: 'Day 2', tasks: [
        'Write 12 questions someone could ask about your project: why you chose it, which source taught you most, how it compares with your community, what surprised you',
        'Answer four of them aloud, 40 seconds each, recorded',
        'Listen back: did you answer the question in your first sentence?',
      ] },
      { day: 'Day 3', tasks: [
        'Answer four more questions, timed; aim to speak for the full 40 seconds',
        'Practice self-correcting smoothly: say the corrected form and keep going',
        'Present the full 3 minutes once more from your outline',
      ] },
      { day: 'Day 4', tasks: [
        'Ask a classmate, teacher or family member to ask you questions you haven\'t prepared',
        `Learn: fluency means steady speech with few long pauses; connectors help: ${lang.connectors}`,
        'Answer the last four of your 12 questions, timed',
      ] },
      { day: 'Day 5', tasks: [
        'Full rehearsal: 3 minutes to prepare, 3-minute presentation, then four 40-second answers',
        'Score yourself on every category for both tasks',
        `Checkpoint: is your outline submitted, or scheduled, before ${COURSE_PROJECT.outlineDeadline}?`,
      ] },
    ],
    keyRules: [
      'Answer the question in your first sentence, then support it',
      'Use all 40 seconds; silence earns nothing',
      'A quick self-correction is fine; stopping is not',
      'Keep rehearsing until exam day: one full run each week',
    ],
    resources: [
      { name: 'AP World Language Revisions', url: 'https://apcentral.collegeboard.org/courses/ap-world-languages-revisions', desc: 'Q&A format and scoring' },
      { name: 'AP Classroom', url: 'https://myap.collegeboard.org', desc: 'Sample project tasks as College Board releases them' },
    ],
    frq: { type: 'Project Q&A', prompt: 'Have someone read you four questions about your project you have not seen. Answer each in 40 seconds, recorded.', rubricTip: `Scored on ${QA_SCORING}. Cultural understanding points come from specifics: name the tradition, the place or the source, not just "the culture".` },
    tip: 'Record every practice answer. Listening back is uncomfortable, but it is the fastest way to hear the pauses and repeated words a scorer will hear.',
  };
}

function vocabularyWeek(lang) {
  const otherUnits = COURSE_UNITS.filter(unit => unit !== 'Art and Creativity');
  return {
    theme: 'Vocabulary Across the Units',
    examWeight: 'All units',
    overview: `The multiple choice and the writing tasks draw on all six units, not just the project theme. This week builds working vocabulary for the five other units: ${otherUnits.join(', ')}.`,
    days: otherUnits.map((unit, i) => ({
      day: `Day ${i + 1}`,
      tasks: [
        `${unit}: add 15 words to your notebook (${lang.unitVocabulary[unit]})`,
        `Read or listen to one authentic source about ${unit.toLowerCase()} in ${lang.name}`,
        'Use five of the new words in a short paragraph',
      ],
    })),
    keyRules: [
      'Learn words in phrases, not alone: a verb with its object, a noun with its adjective',
      'Review older lists every few days; spaced review beats one long session',
      'Every unit can appear in multiple choice and in the writing tasks',
      'Note words you meet twice in sources: they are the ones the exam uses',
    ],
    resources: lang.vocabularyResources,
    frq: null,
    tip: 'Say new words out loud in a sentence about your own life. Words you have used are the ones you remember under exam pressure.',
  };
}

function practiceExamWeek(lang, format) {
  return {
    theme: 'Full Practice Exam & Final Outline',
    examWeight: 'All units',
    overview: `Sit a full practice exam under real timing, then fix what it shows. Check your project outline is submitted before ${COURSE_PROJECT.outlineDeadline}.`,
    days: [
      { day: 'Day 1', tasks: [
        `Free response under exam timing: the project presentation and Q&A, then ${format.writingTasks}`,
        'Score each part with the scoring guidelines',
      ] },
      { day: 'Day 2', tasks: [
        `Multiple choice under exam timing: ${format.listening}, then ${READING}`,
        'Sort every wrong answer by cause: vocabulary, misreading the question, or missing a detail in the audio',
      ] },
      { day: 'Day 3', tasks: [
        'Rewrite your weakest written response with the guidelines beside you',
        '15 questions on your weakest interpretive skill (reading or listening)',
      ] },
      { day: 'Day 4', tasks: [
        'Rehearse the presentation and Q&A once more, recorded',
        `Confirm the outline is submitted in the AP Digital Portfolio (deadline ${COURSE_PROJECT.outlineDeadline})`,
      ] },
      { day: 'Day 5', tasks: [
        `Review your notebook's most-missed words`,
        'Checkpoint: for each free-response task, can you say what the scoring guidelines reward?',
      ] },
    ],
    keyRules: [
      `Free response comes first on the exam: ${format.freeResponseCount} tasks`,
      `Multiple choice: ${format.listening} and ${READING}`,
      'Score practice answers harshly against the guidelines',
      `Outline due ${COURSE_PROJECT.outlineDeadline}`,
    ],
    resources: [
      { name: `AP ${lang.name} Exam Page`, url: lang.examUrl, desc: 'Sample questions and scoring guidelines' },
      { name: 'AP Classroom Practice Exam', url: 'https://myap.collegeboard.org', desc: 'Ask your teacher to assign a full practice exam' },
    ],
    frq: { type: 'All free-response tasks', prompt: 'Complete every free-response task under exam timing and score each with the official guidelines.', rubricTip: 'Most lost points are tasks left unfinished, not language mistakes. Practice finishing within the time.' },
    tip: 'Simulate the real conditions: headset on, timer running, no pausing. The exam is long, and stamina is part of the score.',
  };
}

function examWeek(lang, format) {
  return {
    theme: `AP ${lang.name} Exam`,
    examWeight: 'All units',
    isExamWeek: true,
    overview: `Light review, steady routine and good sleep. The exam is fully digital in Bluebook; you get a printed copy of your outline to use during the presentation.`,
    days: [
      { day: 'Early in the week', tasks: ['One full presentation run and four Q&A answers, recorded', 'Read and listen to something in the target language each day', 'Review your notebook\'s most-missed words'] },
      { day: 'Two days before', tasks: ['Complete the Bluebook exam setup if you haven\'t', 'Test your wired headphones and microphone', ...lang.examPrep] },
      { day: 'The day before', tasks: ['One light rehearsal of the presentation, then stop', 'Pack what your school asks you to bring', 'Sleep early'] },
      { day: 'Exam day', tasks: ['Eat a real breakfast', 'Presentation: use the full preparation time to plan your opening from the outline', 'Q&A: answer first, then support, and keep speaking for the full 40 seconds', 'Answer every multiple-choice question: there\'s no penalty for guessing'] },
    ],
    keyRules: [
      `Free response: ${PRESENTATION}; ${QA}; ${format.writingTasks}`,
      `Multiple choice: ${format.listening} and ${READING}`,
      'Wired headphones with a microphone are required',
      'Your printed outline is for reference while you present; it is not a script',
    ],
    resources: [{ name: `AP ${lang.name} Exam Page`, url: lang.examUrl, desc: 'Exam format and what to bring' }],
    frq: null,
    tip: 'Start speaking as soon as the recording begins. In timed speaking tasks, the first few seconds of silence are the easiest points to lose.',
  };
}

// Weeks in order: project weeks come early so they land before the outline
// deadline even in short plans.
export function buildWorldLanguageWeeks(lang) {
  const format = EXAM_FORMATS[lang.examFormat];
  if (!format) throw new Error(`Unknown exam format "${lang.examFormat}" for ${lang.name}`);
  const bodies = [
    examFormatWeek(lang, format),
    exploreWeek(lang),
    buildPresentationWeek(lang),
    rehearseWeek(lang),
    ...lang.writingWeeks,
    lang.grammarWeek,
    vocabularyWeek(lang),
    practiceExamWeek(lang, format),
    examWeek(lang, format),
  ];
  return bodies.map((body, i) => ({
    id: FIRST_WEEK_ID + i,
    dates: body.isExamWeek ? 'Exam week' : STUDY_DAYS,
    label: body.isExamWeek ? 'Exam Week' : `Week ${i + 1}`,
    color: lang.color,
    ...body,
  }));
}
