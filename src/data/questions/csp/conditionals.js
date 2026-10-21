// AP CS Principles, Big Idea 3: Boolean expressions, selection and nested
// conditionals. Code uses the AP CSP exam reference sheet pseudocode.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
export default [
  {
    id: 'csp-conditionals-001',
    topic: 'conditionals',
    difficulty: 1,
    prompt: 'What is the value of the Boolean expression (5 > 3) AND (2 = 4)?',
    choices: ['true', 'false', '5', 'The expression causes an error'],
    answer: 1,
    explanation: '5 > 3 is true but 2 = 4 is false. AND is true only when both sides are true, so the whole expression is false. With OR instead of AND it would be true.',
    reviewed: true,
  },
  {
    id: 'csp-conditionals-002',
    topic: 'conditionals',
    difficulty: 1,
    prompt: 'What is displayed when the following code segment is run?',
    code: `temp ← 72
IF(temp ≥ 80)
{
   DISPLAY("hot")
}
ELSE
{
   IF(temp ≥ 60)
   {
      DISPLAY("mild")
   }
   ELSE
   {
      DISPLAY("cold")
   }
}`,
    choices: ['hot', 'cold', 'mild', 'hot mild'],
    answer: 2,
    explanation: '72 ≥ 80 is false, so the ELSE branch runs. Inside it, 72 ≥ 60 is true, so "mild" is displayed. Only one branch of an IF/ELSE ever runs, so "hot mild" is not possible.',
    reviewed: true,
  },
  {
    id: 'csp-conditionals-003',
    topic: 'conditionals',
    difficulty: 2,
    prompt: 'Which expression is equivalent to NOT ((x > 10) OR (y < 5))?',
    choices: [
      '(x ≤ 10) AND (y ≥ 5)',
      '(x ≤ 10) OR (y ≥ 5)',
      '(x < 10) AND (y > 5)',
      '(x > 10) AND (y < 5)',
    ],
    answer: 0,
    explanation: 'The original is true when neither x > 10 nor y < 5 holds, so x must be at most 10 and y must be at least 5. NOT flips OR to AND and flips each comparison: the opposite of > is ≤, not <.',
    reviewed: true,
  },
  {
    id: 'csp-conditionals-004',
    topic: 'conditionals',
    difficulty: 2,
    prompt: 'Which Boolean expression is true exactly when num is between 1 and 10, including 1 and 10?',
    choices: [
      '(num ≥ 1) OR (num ≤ 10)',
      '(num > 1) AND (num < 10)',
      '(num < 1) AND (num > 10)',
      '(num ≥ 1) AND (num ≤ 10)',
    ],
    answer: 3,
    explanation: 'Both limits must hold at once, so the parts are joined with AND, and ≥ and ≤ include the endpoints. The OR version is true for every number, and (num < 1) AND (num > 10) is never true.',
    reviewed: true,
  },
  {
    id: 'csp-conditionals-005',
    topic: 'conditionals',
    difficulty: 2,
    prompt: 'What is displayed when the following code segment is run?',
    code: `score ← 85
grade ← "F"
IF(score ≥ 60)
{
   grade ← "D"
}
IF(score ≥ 70)
{
   grade ← "C"
}
IF(score ≥ 80)
{
   grade ← "B"
}
IF(score ≥ 90)
{
   grade ← "A"
}
DISPLAY(grade)`,
    choices: ['A', 'D', 'C', 'B'],
    answer: 3,
    explanation: 'These are separate IF statements, so each one is checked. The first three are true, and each overwrites grade, ending with "B". The fourth is false. "D" would be right only if the later checks were in ELSE branches of the first.',
    reviewed: true,
  },
  {
    id: 'csp-conditionals-006',
    topic: 'conditionals',
    difficulty: 3,
    prompt: 'a and b are Boolean variables. For which values does the expression (a OR b) AND (NOT (a AND b)) evaluate to true?',
    choices: [
      'a is true and b is true',
      'a is true and b is false',
      'a is false and b is false',
      'It is never true',
    ],
    answer: 1,
    explanation: 'The expression is true when at least one is true (a OR b) but not both (NOT (a AND b)), so exactly one must be true. With a true and b false, both parts are true. With both true, NOT (a AND b) is false.',
    reviewed: true,
  },
  {
    id: 'csp-conditionals-007',
    topic: 'conditionals',
    difficulty: 3,
    prompt: 'Consider the three code segments. Which of segments II and III display "yes" under exactly the same conditions as segment I?',
    code: `Segment I
IF(x > 0)
{
   IF(y > 0)
   {
      DISPLAY("yes")
   }
}

Segment II
IF((x > 0) AND (y > 0))
{
   DISPLAY("yes")
}

Segment III
IF((x > 0) OR (y > 0))
{
   DISPLAY("yes")
}`,
    choices: ['II only', 'III only', 'II and III', 'Neither II nor III'],
    answer: 0,
    explanation: 'In segment I, "yes" is displayed only if x > 0 and then also y > 0, which is what AND checks in segment II. Segment III also displays "yes" when only one of them is positive, for example x = 5 and y = -1.',
    reviewed: true,
  },
  {
    id: 'csp-conditionals-008',
    topic: 'conditionals',
    difficulty: 2,
    prompt: 'Which call to the procedure ticketPrice returns 9?',
    code: `PROCEDURE ticketPrice(age, isStudent)
{
   price ← 12
   IF((age < 12) OR (age ≥ 65))
   {
      price ← 6
   }
   ELSE
   {
      IF(isStudent)
      {
         price ← 9
      }
   }
   RETURN(price)
}`,
    choices: ['ticketPrice(10, true)', 'ticketPrice(16, false)', 'ticketPrice(16, true)', 'ticketPrice(65, true)'],
    answer: 2,
    explanation: 'Age 16 fails the first condition, so the ELSE branch runs, and isStudent is true, so price becomes 9. Ages 10 and 65 meet the first condition and get 6 even though they are students, and a 16-year-old non-student pays 12.',
    reviewed: true,
  },
];
