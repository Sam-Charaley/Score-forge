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

export default { units: PSYCH_UNITS, topics: PSYCH_TOPICS };
