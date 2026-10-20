// AP Computer Science Principles: the five Big Ideas with College Board's
// exam-weight ranges for the multiple-choice section. Topic ids are
// permanent: attempts are stored against them, so rename the label freely
// but never change an id.
export const CSP_UNITS = [
  { id: 'u1', name: 'Creative Development', weight: '10–13%' },
  { id: 'u2', name: 'Data', weight: '17–22%' },
  { id: 'u3', name: 'Algorithms and Programming', weight: '30–35%' },
  { id: 'u4', name: 'Computer Systems and Networks', weight: '11–15%' },
  { id: 'u5', name: 'Impact of Computing', weight: '21–26%' },
];

export const CSP_TOPICS = [
  { id: 'program-design', unit: 'u1', name: 'Collaboration, Program Function & Design' },
  { id: 'errors-testing', unit: 'u1', name: 'Identifying Errors & Testing' },
  { id: 'data-representation', unit: 'u2', name: 'Binary, Data Representation & Compression' },
  { id: 'data-analysis', unit: 'u2', name: 'Extracting Information from Data' },
  { id: 'variables-expressions', unit: 'u3', name: 'Variables, Expressions & Strings' },
  { id: 'conditionals', unit: 'u3', name: 'Boolean Logic & Conditionals' },
  { id: 'iteration', unit: 'u3', name: 'Iteration' },
  { id: 'lists', unit: 'u3', name: 'Lists & List Algorithms' },
  { id: 'procedures', unit: 'u3', name: 'Procedures & Libraries' },
  { id: 'simulations', unit: 'u3', name: 'Random Values & Simulations' },
  { id: 'algorithms', unit: 'u3', name: 'Search, Efficiency & Undecidability' },
  { id: 'internet', unit: 'u4', name: 'The Internet, Protocols & Fault Tolerance' },
  { id: 'parallel-distributed', unit: 'u4', name: 'Parallel & Distributed Computing' },
  { id: 'computing-effects', unit: 'u5', name: 'Beneficial & Harmful Effects, Digital Divide & Bias' },
  { id: 'legal-ethical', unit: 'u5', name: 'Crowdsourcing, Legal & Ethical Concerns' },
  { id: 'safe-computing', unit: 'u5', name: 'Safe Computing & Security' },
];

// How the predicted AP score is built (see predictApScore in utils/priority.js).
// Section weights: 70 multiple-choice questions are 70% of the score, the
// Create performance task (program plus written response) 30% (College Board
// course page).
// Cut points are shares of the maximum composite score. College Board does
// not publish them. DRAFT: a rough guess from the published score
// distributions, which are generous at 3 and strict at 5.
export const CSP_EXAM = {
  sections: { mcq: 0.7, frq: 0.3 },
  cuts: [
    { score: 5, minShare: 0.77 },
    { score: 4, minShare: 0.63 },
    { score: 3, minShare: 0.47 },
    { score: 2, minShare: 0.35 },
    { score: 1, minShare: 0 },
  ],
  source: 'DRAFT estimate, needs Sam review: guessed from published AP CSP score distributions; College Board does not release cut points.',
};

export default { units: CSP_UNITS, topics: CSP_TOPICS, exam: CSP_EXAM };
