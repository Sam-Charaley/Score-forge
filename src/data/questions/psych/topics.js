// The redesigned AP Psychology course (first tested May 2025): five units,
// each 15–25% of the multiple-choice section. College Board's 36 topics are
// grouped into three practice topics per unit. Topic ids are permanent:
// attempts are stored against them, so rename the label freely but never
// change an id.
export const PSYCH_UNITS = [
  { id: 'u1', name: 'Biological Bases of Behavior', weight: '15–25%' },
  { id: 'u2', name: 'Cognition', weight: '15–25%' },
  { id: 'u3', name: 'Development and Learning', weight: '15–25%' },
  { id: 'u4', name: 'Social Psychology and Personality', weight: '15–25%' },
  { id: 'u5', name: 'Mental and Physical Health', weight: '15–25%' },
];

export const PSYCH_TOPICS = [
  { id: 'neurons', unit: 'u1', name: 'Neurons, Neural Firing & Drugs' },
  { id: 'brain', unit: 'u1', name: 'Nervous System, Brain & Heredity' },
  { id: 'sleep-sensation', unit: 'u1', name: 'Sleep & Sensation' },
  { id: 'perception', unit: 'u2', name: 'Perception' },
  { id: 'thinking-intelligence', unit: 'u2', name: 'Thinking, Problem Solving & Intelligence' },
  { id: 'memory', unit: 'u2', name: 'Memory' },
  { id: 'development', unit: 'u3', name: 'Lifespan & Social-Emotional Development' },
  { id: 'cognitive-language', unit: 'u3', name: 'Cognitive & Language Development' },
  { id: 'learning', unit: 'u3', name: 'Classical, Operant & Social Learning' },
  { id: 'social', unit: 'u4', name: 'Social Thinking & Social Situations' },
  { id: 'personality', unit: 'u4', name: 'Personality' },
  { id: 'motivation-emotion', unit: 'u4', name: 'Motivation & Emotion' },
  { id: 'health', unit: 'u5', name: 'Health & Positive Psychology' },
  { id: 'disorders', unit: 'u5', name: 'Psychological Disorders' },
  { id: 'treatment', unit: 'u5', name: 'Treatment of Disorders' },
];

// How the predicted AP score is built (see predictApScore in utils/priority.js).
// Section weights: 75 multiple-choice questions are two thirds of the score,
// 2 free response one third (College Board course page, 2025 exam).
// Cut points are shares of the maximum composite score. College Board does
// not publish them. DRAFT: approximated from scoring worksheets for released
// exams of the previous course, which may not match the redesigned exam.
export const PSYCH_EXAM = {
  sections: { mcq: 2 / 3, frq: 1 / 3 },
  cuts: [
    { score: 5, minShare: 0.75 },
    { score: 4, minShare: 0.62 },
    { score: 3, minShare: 0.51 },
    { score: 2, minShare: 0.43 },
    { score: 1, minShare: 0 },
  ],
  source: 'DRAFT estimate, needs Sam review: released AP Psychology scoring worksheets (pre-2025 course).',
};

export default { units: PSYCH_UNITS, topics: PSYCH_TOPICS, exam: PSYCH_EXAM };
