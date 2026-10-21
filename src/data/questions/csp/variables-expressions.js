// AP CS Principles, Big Idea 3: variables, assignment, arithmetic
// expressions (including MOD) and strings.
// Code uses the AP CSP exam reference sheet pseudocode.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
export default [
  {
    id: 'csp-variables-expressions-001',
    topic: 'variables-expressions',
    difficulty: 1,
    prompt: 'What is displayed when the following code segment is run?',
    code: `a ← 3
b ← a + 2
a ← 10
DISPLAY(b)`,
    choices: ['5', '12', '10', '3'],
    answer: 0,
    explanation: 'b gets the value 3 + 2 = 5 when that line runs. Changing a afterward does not change b, because b stores a value, not a link to a. 12 comes from treating b as if it were recalculated with a = 10.',
    reviewed: true,
  },
  {
    id: 'csp-variables-expressions-002',
    topic: 'variables-expressions',
    difficulty: 1,
    prompt: 'What is the value of the expression 17 MOD 5?',
    choices: ['3', '2', '3.4', '12'],
    answer: 1,
    explanation: 'a MOD b is the remainder when a is divided by b. 17 divided by 5 is 3 with a remainder of 2. 3 is the whole-number quotient, and 3.4 is the full quotient.',
    verify: 'exact',
    solve: () => 17 % 5,
    reviewed: true,
  },
  {
    id: 'csp-variables-expressions-003',
    topic: 'variables-expressions',
    difficulty: 2,
    prompt: 'What is displayed when the following code segment is run?',
    code: `x ← 4
y ← 9
x ← y
y ← x
DISPLAY(x)
DISPLAY(y)`,
    choices: ['4 9', '9 4', '9 9', '4 4'],
    answer: 2,
    explanation: 'x ← y sets x to 9, and the original 4 is lost. y ← x then copies that 9 back into y, so both are 9. Swapping two variables needs a third variable to hold one value temporarily.',
    reviewed: true,
  },
  {
    id: 'csp-variables-expressions-004',
    topic: 'variables-expressions',
    difficulty: 2,
    prompt: 'Which code segment correctly swaps the values of the variables x and y?',
    choices: [
      'x ← y\ny ← x',
      'temp ← x\ny ← temp\nx ← y',
      'temp ← y\nx ← y\ny ← temp',
      'temp ← x\nx ← y\ny ← temp',
    ],
    answer: 3,
    explanation: 'temp saves the original x, then x takes y\'s value, then y takes the saved value from temp. The other segments overwrite a value before it is saved, so both variables end up holding the same value.',
    reviewed: true,
  },
  {
    id: 'csp-variables-expressions-005',
    topic: 'variables-expressions',
    difficulty: 2,
    prompt: 'After the following code segment runs, what is the value of z?',
    code: `x ← 7
y ← 2
z ← x MOD y + x / y`,
    choices: ['3', '4.5', '4', '1.5'],
    answer: 1,
    explanation: 'MOD and / are done before +. 7 MOD 2 is 1 and 7 / 2 is 3.5 (the / operator on the exam reference sheet does not round), so z = 1 + 3.5 = 4.5. 4 comes from treating 7 / 2 as whole-number division.',
    verify: 'exact',
    solve: () => (7 % 2) + 7 / 2,
    reviewed: true,
  },
  {
    id: 'csp-variables-expressions-006',
    topic: 'variables-expressions',
    difficulty: 2,
    prompt: 'The procedure concat(str1, str2) returns a single string made of str1 followed by str2. For example, concat("key", "board") returns "keyboard". What is displayed when the following code segment is run?',
    code: `first ← "Ada"
last ← "Lovelace"
name ← concat(last, concat(", ", first))
DISPLAY(name)`,
    choices: ['Ada, Lovelace', 'LovelaceAda, ', 'Lovelace, Ada', 'Lovelace,Ada'],
    answer: 2,
    explanation: 'The inner call runs first: concat(", ", "Ada") is ", Ada". The outer call puts "Lovelace" in front of it, giving "Lovelace, Ada". The order of the arguments decides which string comes first.',
    reviewed: false,
  },
  {
    id: 'csp-variables-expressions-007',
    topic: 'variables-expressions',
    difficulty: 3,
    prompt: 'What is displayed when the following code segment is run?',
    code: `n ← 5
total ← 0
total ← total + n
n ← n * 2
total ← total + n
n ← n MOD 4
total ← total + n
DISPLAY(total)`,
    choices: ['15', '16', '23', '17'],
    answer: 3,
    explanation: 'total becomes 5. n becomes 10, so total becomes 15. n becomes 10 MOD 4 = 2, so total becomes 17. 16 comes from taking 5 MOD 4 instead of 10 MOD 4.',
    reviewed: true,
  },
  {
    id: 'csp-variables-expressions-008',
    topic: 'variables-expressions',
    difficulty: 3,
    prompt: 'The procedure substring(str, start, length) returns length characters of str, starting at index start, where the first character is at index 1. The procedure concat(str1, str2) returns str1 followed by str2. What is the value of part after the following code segment runs?',
    code: `word ← "COMPUTER"
part ← concat(substring(word, 4, 3), substring(word, 1, 1))`,
    choices: ['"PUTC"', '"MPUC"', '"PUTE"', '"UTEC"'],
    answer: 0,
    explanation: 'Counting from 1: C(1) O(2) M(3) P(4) U(5) T(6). substring(word, 4, 3) is "PUT" and substring(word, 1, 1) is "C", so part is "PUTC". "MPUC" comes from counting the first character as index 0.',
    reviewed: false,
  },
  {
    id: 'csp-variables-expressions-009',
    topic: 'variables-expressions',
    difficulty: 1,
    prompt: 'A program needs a variable that stores how many tickets a customer has bought. Which variable name is the best choice?',
    choices: ['x', 'ticketsBought', 'variable1', 'data'],
    answer: 1,
    explanation: 'A meaningful name tells anyone reading the code what the value represents, which makes the program easier to understand and debug. Names like x, variable1 or data say nothing about what is stored.',
    reviewed: true,
  },
];
