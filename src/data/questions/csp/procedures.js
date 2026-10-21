// AP CS Principles, Big Idea 3: calling and developing procedures,
// parameters, RETURN, procedural abstraction, libraries and APIs.
// Code uses the AP CSP exam reference sheet pseudocode.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
export default [
  {
    id: 'csp-procedures-001',
    topic: 'procedures',
    difficulty: 1,
    prompt: 'What is displayed when the following code segment is run?',
    code: `PROCEDURE double(n)
{
   RETURN(n * 2)
}

x ← double(3)
DISPLAY(double(x))`,
    choices: ['12', '6', '3', '9'],
    answer: 0,
    explanation: 'double(3) returns 6, so x is 6. double(x) then returns 12, which is displayed. 6 comes from displaying x itself instead of doubling it a second time.',
    reviewed: true,
  },
  {
    id: 'csp-procedures-002',
    topic: 'procedures',
    difficulty: 1,
    prompt: 'A programmer replaces a procedure that always draws a square with sides of 50 pixels with a procedure drawSquare(size) that draws a square of any size. What is the main benefit of adding the parameter?',
    choices: [
      'The procedure will run faster',
      'The procedure no longer needs to be tested',
      'The same procedure can be reused for squares of many sizes instead of writing a new procedure for each size',
      'The procedure can now draw circles as well as squares',
    ],
    answer: 2,
    explanation: 'Parameters generalize a procedure so one piece of code handles many cases. This is procedural abstraction: the program calls drawSquare with different arguments instead of repeating nearly identical code.',
    reviewed: true,
  },
  {
    id: 'csp-procedures-003',
    topic: 'procedures',
    difficulty: 2,
    prompt: 'What is displayed when the following code segment is run?',
    code: `PROCEDURE check(n)
{
   IF(n > 10)
   {
      RETURN("big")
   }
   RETURN("small")
}

DISPLAY(check(10))
DISPLAY(check(11))`,
    choices: ['big big', 'small small', 'big small', 'small big'],
    answer: 3,
    explanation: 'check(10): 10 > 10 is false, so the procedure reaches RETURN("small"). check(11): 11 > 10 is true, and RETURN("big") ends the procedure right away, so the second RETURN never runs.',
    reviewed: true,
  },
  {
    id: 'csp-procedures-004',
    topic: 'procedures',
    difficulty: 2,
    prompt: 'What is displayed when the following code segment is run?',
    code: `PROCEDURE countAbove(list, limit)
{
   count ← 0
   FOR EACH item IN list
   {
      IF(item > limit)
      {
         count ← count + 1
      }
   }
   RETURN(count)
}

DISPLAY(countAbove([4, 9, 2, 7, 9], 7))`,
    choices: ['3', '1', '2', '4'],
    answer: 2,
    explanation: 'Only the two 9s are greater than 7. 7 itself does not count because the comparison is >, not ≥. Counting 7 gives 3.',
    reviewed: true,
  },
  {
    id: 'csp-procedures-005',
    topic: 'procedures',
    difficulty: 2,
    prompt: 'A programmer uses a library procedure sortList(list) in their program. They have never seen its code and rely only on its documentation, which says what it does and what its parameter must be. Which concept does this best illustrate?',
    choices: [
      'Data compression',
      'Procedural abstraction, using a procedure by knowing what it does rather than how it does it',
      'Parallel computing',
      'A logic error',
    ],
    answer: 1,
    explanation: 'Libraries and APIs let programmers use procedures by name, arguments and documented behavior without knowing how they are written. That is procedural abstraction, and it saves time and reduces complexity.',
    reviewed: true,
  },
  {
    id: 'csp-procedures-006',
    topic: 'procedures',
    difficulty: 3,
    prompt: 'Which procedure correctly returns the sum of all the numbers in list?',
    choices: [
      'PROCEDURE sum(list)\n{\n   total ← 0\n   FOR EACH n IN list\n   {\n      total ← total + n\n      RETURN(total)\n   }\n}',
      'PROCEDURE sum(list)\n{\n   FOR EACH n IN list\n   {\n      total ← 0\n      total ← total + n\n   }\n   RETURN(total)\n}',
      'PROCEDURE sum(list)\n{\n   total ← 0\n   FOR EACH n IN list\n   {\n      total ← n\n   }\n   RETURN(total)\n}',
      'PROCEDURE sum(list)\n{\n   total ← 0\n   FOR EACH n IN list\n   {\n      total ← total + n\n   }\n   RETURN(total)\n}',
    ],
    answer: 3,
    explanation: 'total must start at 0 once, before the loop, add each n inside the loop, and be returned after the loop ends. The first returns during the first pass, the second resets total every pass, and the third keeps only the last number.',
    reviewed: true,
  },
  {
    id: 'csp-procedures-007',
    topic: 'procedures',
    difficulty: 3,
    prompt: 'What is displayed when the following code segment is run?',
    code: `PROCEDURE f(x)
{
   RETURN(x + 3)
}

PROCEDURE g(x)
{
   RETURN(f(x) * f(x - 3))
}

DISPLAY(g(2))`,
    choices: ['10', '25', '7', '6'],
    answer: 0,
    explanation: 'In g(2), f(2) is 5 and f(2 - 3) = f(-1) is 2, so g returns 5 × 2 = 10. 25 comes from calling f(2) twice and ignoring the - 3.',
    reviewed: true,
  },
  {
    id: 'csp-procedures-008',
    topic: 'procedures',
    difficulty: 2,
    prompt: 'A game has the same five lines of code for updating the score in six different places. The programmer moves those lines into one procedure, updateScore(points), and calls it from all six places. Which is a benefit of this change?',
    choices: [
      'The game no longer needs a variable to store the score',
      'If the scoring rule changes, only the procedure needs to be edited',
      'The program will no longer contain any errors',
      'The score can only be updated once per game',
    ],
    answer: 1,
    explanation: 'Putting repeated code in one procedure means a change or fix is made in one place instead of six, which makes the program easier to maintain and less likely to have inconsistent copies.',
    reviewed: true,
  },
];
