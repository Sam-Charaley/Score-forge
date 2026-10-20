// AP CS Principles, Big Idea 3: iteration with REPEAT n TIMES and REPEAT UNTIL.
// Code uses the AP CSP exam reference sheet pseudocode.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
export default [
  {
    id: 'csp-iteration-001',
    topic: 'iteration',
    difficulty: 1,
    prompt: 'What is displayed when the following code segment is run?',
    code: `count ← 0
REPEAT 4 TIMES
{
   count ← count + 3
}
DISPLAY(count)`,
    choices: ['3', '7', '12', '4'],
    answer: 2,
    explanation: 'The body adds 3 each time it runs, and it runs 4 times: 3 + 3 + 3 + 3 = 12. 7 comes from adding 3 and 4 instead of repeating the addition.',
    reviewed: false,
  },
  {
    id: 'csp-iteration-002',
    topic: 'iteration',
    difficulty: 1,
    prompt: 'What is displayed when the following code segment is run?',
    code: `x ← 1
REPEAT UNTIL(x > 20)
{
   x ← x * 2
}
DISPLAY(x)`,
    choices: ['16', '32', '20', '64'],
    answer: 1,
    explanation: 'x doubles: 1, 2, 4, 8, 16, 32. The condition is checked before each pass, and the loop stops as soon as x > 20 is true, which first happens at 32. 16 is the last value that is not greater than 20.',
    reviewed: false,
  },
  {
    id: 'csp-iteration-003',
    topic: 'iteration',
    difficulty: 2,
    prompt: 'How many times does the body of the loop run?',
    code: `n ← 10
REPEAT UNTIL(n ≤ 0)
{
   n ← n - 3
}`,
    choices: ['3', '5', '10', '4'],
    answer: 3,
    explanation: 'n goes 10, 7, 4, 1, -2. The body runs once for each of 10, 7, 4 and 1, which is 4 times, and then n ≤ 0 is true. 3 comes from stopping when n reaches 1.',
    reviewed: false,
  },
  {
    id: 'csp-iteration-004',
    topic: 'iteration',
    difficulty: 2,
    prompt: 'Which best describes what happens when the following code segment is run?',
    code: `i ← 1
REPEAT UNTIL(i = 10)
{
   i ← i + 2
}`,
    choices: [
      'The loop never stops, because i is never equal to 10',
      'The loop body runs 4 times',
      'The loop body runs 5 times',
      'The loop body never runs',
    ],
    answer: 0,
    explanation: 'i takes only odd values: 1, 3, 5, 7, 9, 11, 13 and so on. It skips past 10, so the stopping condition is never met and this is an infinite loop. Using i ≥ 10 as the condition would stop it.',
    reviewed: false,
  },
  {
    id: 'csp-iteration-005',
    topic: 'iteration',
    difficulty: 2,
    prompt: 'What is displayed when the following code segment is run?',
    code: `count ← 0
REPEAT 3 TIMES
{
   REPEAT 4 TIMES
   {
      count ← count + 1
   }
   count ← count + 1
}
DISPLAY(count)`,
    choices: ['12', '7', '15', '16'],
    answer: 2,
    explanation: 'Each pass of the outer loop adds 4 in the inner loop and then 1 more, so 5 per pass. 3 passes give 15. 12 counts only the inner loop.',
    reviewed: false,
  },
  {
    id: 'csp-iteration-006',
    topic: 'iteration',
    difficulty: 3,
    prompt: 'What is displayed when the following code segment is run?',
    code: `result ← 0
k ← 1
REPEAT UNTIL(k > 5)
{
   IF(k MOD 2 = 0)
   {
      result ← result + k
   }
   ELSE
   {
      result ← result - 1
   }
   k ← k + 1
}
DISPLAY(result)`,
    choices: ['6', '5', '-3', '3'],
    answer: 3,
    explanation: 'k runs from 1 to 5. Even k (2 and 4) add 6 in total, and odd k (1, 3 and 5) each subtract 1, for -3. So result is 6 - 3 = 3. 6 comes from forgetting the subtractions.',
    reviewed: false,
  },
  {
    id: 'csp-iteration-007',
    topic: 'iteration',
    difficulty: 3,
    prompt: 'Which code segment displays 1 2 3 4 5?',
    choices: [
      'i ← 1\nREPEAT 5 TIMES\n{\n   i ← i + 1\n   DISPLAY(i)\n}',
      'i ← 0\nREPEAT UNTIL(i = 5)\n{\n   i ← i + 1\n   DISPLAY(i)\n}',
      'i ← 1\nREPEAT UNTIL(i = 5)\n{\n   DISPLAY(i)\n   i ← i + 1\n}',
      'i ← 0\nREPEAT 5 TIMES\n{\n   DISPLAY(i)\n   i ← i + 1\n}',
    ],
    answer: 1,
    explanation: 'Starting at 0 and adding 1 before displaying shows 1, 2, 3, 4, 5, and the loop stops once i is 5. The first segment displays 2 to 6, the third stops before displaying 5, and the fourth displays 0 to 4.',
    reviewed: false,
  },
  {
    id: 'csp-iteration-008',
    topic: 'iteration',
    difficulty: 2,
    prompt: 'What is displayed when the following code segment is run?',
    code: `x ← 10
REPEAT UNTIL(x > 5)
{
   x ← x - 1
}
DISPLAY(x)`,
    choices: ['10', '5', '9', '6'],
    answer: 0,
    explanation: 'REPEAT UNTIL checks its condition before each pass. x > 5 is already true at the start, so the body never runs and x stays 10. Reading it as "repeat while x > 5" would give 5.',
    reviewed: false,
  },
];
