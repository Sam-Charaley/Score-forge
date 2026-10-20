// AP CS Principles, Big Idea 1: identifying and correcting errors, and testing.
// Code uses the AP CSP exam reference sheet pseudocode (lists start at index 1).
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
export default [
  {
    id: 'csp-errors-testing-001',
    topic: 'errors-testing',
    difficulty: 1,
    prompt: 'A program runs to the end without stopping, but the total it displays is wrong. What kind of error does the program most likely contain?',
    choices: ['Syntax error', 'Logic error', 'Run-time error', 'Overflow error'],
    answer: 1,
    explanation: 'A logic error is a mistake in the algorithm that makes the program behave incorrectly or unexpectedly while still running. A syntax error stops the program from running at all, and a run-time error happens during execution and usually stops it.',
    reviewed: false,
  },
  {
    id: 'csp-errors-testing-002',
    topic: 'errors-testing',
    difficulty: 1,
    prompt: 'A programmer types DISPLY(score) instead of DISPLAY(score). When they try to run the program, it does not run at all. What kind of error is this?',
    choices: ['Logic error', 'Overflow error', 'Syntax error', 'Rounding error'],
    answer: 2,
    explanation: 'A syntax error breaks the rules of the programming language, such as a misspelled keyword, so the program cannot run. A logic error would let the program run but produce the wrong result.',
    reviewed: false,
  },
  {
    id: 'csp-errors-testing-003',
    topic: 'errors-testing',
    difficulty: 2,
    prompt: 'What happens when the following code segment is run?',
    code: `scores ← [90, 85, 77]
DISPLAY(scores[4])`,
    choices: ['90 is displayed', '77 is displayed', '0 is displayed', 'An error occurs, because the list has no element at index 4'],
    answer: 3,
    explanation: 'The list has three elements, at indices 1, 2 and 3. Accessing index 4 is out of range, which is a run-time error that stops the program. 77 is the element at index 3, the last valid index.',
    reviewed: false,
  },
  {
    id: 'csp-errors-testing-004',
    topic: 'errors-testing',
    difficulty: 2,
    prompt: 'The procedure findMax is meant to return the largest value in a non-empty list of numbers. For which list does it NOT return the largest value?',
    code: `PROCEDURE findMax(numList)
{
   max ← 0
   FOR EACH num IN numList
   {
      IF(num > max)
      {
         max ← num
      }
   }
   RETURN(max)
}`,
    choices: ['[3, 8, 5]', '[0, 4, 2]', '[-6, -2, -9]', '[7, 7, 7]'],
    answer: 2,
    explanation: 'max starts at 0. When every number is negative, none is greater than 0, so the procedure returns 0 instead of -2. Starting max at numList[1] fixes the error. For [0, 4, 2] the answer 4 is still found because 4 > 0.',
    reviewed: false,
  },
  {
    id: 'csp-errors-testing-005',
    topic: 'errors-testing',
    difficulty: 2,
    prompt: 'The procedure grade is meant to return "pass" for any score of 60 or higher and "fail" otherwise. Which test input would show that the procedure contains an error?',
    code: `PROCEDURE grade(score)
{
   IF(score > 60)
   {
      RETURN("pass")
   }
   ELSE
   {
      RETURN("fail")
   }
}`,
    choices: ['59', '60', '61', '100'],
    answer: 1,
    explanation: 'A score of 60 should pass, but 60 > 60 is false, so the procedure returns "fail". The other inputs give the expected result. Testing values at the boundary of a condition is how errors like this are found.',
    reviewed: false,
  },
  {
    id: 'csp-errors-testing-006',
    topic: 'errors-testing',
    difficulty: 2,
    prompt: 'The code segment is meant to count how many numbers in numList are even. It does not work as intended. Which change will fix it?',
    code: `count ← 0
FOR EACH n IN numList
{
   IF(n MOD 2 = 1)
   {
      count ← count + 1
   }
}
DISPLAY(count)`,
    choices: [
      'Change n MOD 2 = 1 to n MOD 2 = 0',
      'Change count ← 0 to count ← 1',
      'Move DISPLAY(count) inside the loop',
      'Change count ← count + 1 to count ← count + n',
    ],
    answer: 0,
    explanation: 'An even number leaves a remainder of 0 when divided by 2, so the condition should be n MOD 2 = 0. As written, the code counts the odd numbers. Moving DISPLAY into the loop would only show the running count over and over.',
    reviewed: false,
  },
  {
    id: 'csp-errors-testing-007',
    topic: 'errors-testing',
    difficulty: 3,
    prompt: 'The procedure sumTo is meant to return 1 + 2 + ... + n for any positive integer n. Which change makes it work as intended?',
    code: `PROCEDURE sumTo(n)
{
   total ← 0
   i ← 1
   REPEAT UNTIL(i = n)
   {
      total ← total + i
      i ← i + 1
   }
   RETURN(total)
}`,
    choices: [
      'Change i ← 1 to i ← 0',
      'Change total ← 0 to total ← 1',
      'Swap the order of the two statements inside the loop',
      'Change REPEAT UNTIL(i = n) to REPEAT UNTIL(i > n)',
    ],
    answer: 3,
    explanation: 'As written, the loop stops as soon as i equals n, so n is never added: sumTo(4) returns 1 + 2 + 3 = 6. Stopping when i > n adds n too. Starting i at 0 still stops before adding n, and swapping the statements adds 2 through n but skips 1.',
    reviewed: false,
  },
  {
    id: 'csp-errors-testing-008',
    topic: 'errors-testing',
    difficulty: 3,
    prompt: 'A procedure larger(a, b) is meant to return the larger of its two number parameters. Which set of test cases is most likely to find an error in the procedure?',
    choices: [
      'larger(3, 7), larger(7, 3) and larger(5, 5)',
      'larger(3, 7), larger(4, 8) and larger(5, 9)',
      'larger(7, 3), larger(8, 4) and larger(9, 5)',
      'larger(1, 1), larger(2, 2) and larger(3, 3)',
    ],
    answer: 0,
    explanation: 'Good tests cover every case the procedure must handle: the first number larger, the second number larger, and the two equal. Each other set repeats one case three times, so a procedure that always returned a (or always returned b) could pass it.',
    reviewed: false,
  },
];
