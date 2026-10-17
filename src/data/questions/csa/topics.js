// The revised AP CSA course (first tested May 2026): four units with College
// Board's exam-weight ranges. Topic ids are permanent: attempts are stored
// against them, so rename the label freely but never change an id.
export const CSA_UNITS = [
  { id: 'u1', name: 'Using Objects and Methods', weight: '15–25%' },
  { id: 'u2', name: 'Selection and Iteration', weight: '25–35%' },
  { id: 'u3', name: 'Class Creation', weight: '10–18%' },
  { id: 'u4', name: 'Data Collections', weight: '30–40%' },
];

export const CSA_TOPICS = [
  { id: 'expressions', unit: 'u1', name: 'Primitive Types, Expressions & Casting' },
  { id: 'strings', unit: 'u1', name: 'String Methods & Comparison' },
  { id: 'objects', unit: 'u1', name: 'Objects, References & Methods' },
  { id: 'boolean-logic', unit: 'u2', name: 'Boolean Logic & Short-Circuiting' },
  { id: 'selection', unit: 'u2', name: 'if / else Selection' },
  { id: 'loops', unit: 'u2', name: 'Loops & Iteration Counting' },
  { id: 'loop-algorithms', unit: 'u2', name: 'String Traversal & Loop Algorithms' },
  { id: 'classes', unit: 'u3', name: 'Writing Classes & Constructors' },
  { id: 'scope-static', unit: 'u3', name: 'this, Scope & static' },
  { id: 'arrays', unit: 'u4', name: '1D Arrays & Array Algorithms' },
  { id: 'text-files', unit: 'u4', name: 'Text Files & Data Sets' },
  { id: 'arraylist', unit: 'u4', name: 'ArrayList' },
  { id: '2d-arrays', unit: 'u4', name: '2D Arrays' },
  { id: 'search-sort', unit: 'u4', name: 'Searching, Sorting & Recursion' },
];

// How the predicted AP score is built (see predictApScore in utils/priority.js).
// Section weights: 42 multiple-choice questions are 55% of the score, 4 free
// response 45% (College Board course page for the revised exam).
// Cut points are shares of the maximum composite score. College Board does
// not publish them; these approximate past released scoring guidance and are
// only good for a rough range.
export const CSA_EXAM = {
  sections: { mcq: 0.55, frq: 0.45 },
  cuts: [
    { score: 5, minShare: 0.75 },
    { score: 4, minShare: 0.6 },
    { score: 3, minShare: 0.45 },
    { score: 2, minShare: 0.33 },
    { score: 1, minShare: 0 },
  ],
  source: 'Estimate carried over unchanged from the original ESTIMATED_AP_CUTS in utils/priority.js.',
};

export default { units: CSA_UNITS, topics: CSA_TOPICS, exam: CSA_EXAM };
