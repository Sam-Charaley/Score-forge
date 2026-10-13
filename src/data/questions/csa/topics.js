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
