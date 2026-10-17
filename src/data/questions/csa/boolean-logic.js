// Topic: Boolean logic and short-circuit evaluation (Unit 2).
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
export default [
  {
    id: 'csa-boolean-logic-001',
    topic: 'boolean-logic',
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int x = 5;
int y = 8;
System.out.println((x > 3 && y < 8) + " " + (x > 3 || y < 8));`,
    choices: ['false true', 'true true', 'false false', 'true false'],
    answer: 0,
    explanation: 'x > 3 is true and y < 8 is false (8 is not less than 8). With &&, both sides must be true, so the first part is false. With ||, one true side is enough, so the second part is true.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-boolean-logic-002',
    topic: 'boolean-logic',
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `boolean a = true;
boolean b = false;
System.out.println(!(a && b) + " " + (!a && !b));`,
    choices: ['false true', 'true true', 'true false', 'false false'],
    answer: 2,
    explanation: 'a && b is false, so !(a && b) is true. !a is false, so !a && !b is false without even looking at !b. Note that !(a && b) and !a && !b are different: De Morgan turns !(a && b) into !a || !b.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-boolean-logic-003',
    topic: 'boolean-logic',
    difficulty: 2,
    prompt: 'Which expression is equivalent to !(x > 0 && y != 3) for all int values of x and y?',
    choices: ['x <= 0 && y == 3', 'x <= 0 || y == 3', 'x < 0 || y == 3', 'x > 0 || y != 3'],
    answer: 1,
    explanation: 'De Morgan\'s law: !(A && B) becomes !A || !B. The opposite of x > 0 is x <= 0 (not x < 0, which misses 0), and the opposite of y != 3 is y == 3. The && also flips to ||.',
    reviewed: true,
  },
  {
    id: 'csa-boolean-logic-004',
    topic: 'boolean-logic',
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int count = 0;
int total = 10;
if (count != 0 && total / count > 2) {
    System.out.println("high");
} else {
    System.out.println("low");
}`,
    choices: ['high', 'Nothing is printed; an ArithmeticException is thrown', 'Nothing is printed; the code does not compile', 'low'],
    answer: 3,
    explanation: 'count != 0 is false, and && stops as soon as its left side is false. That is short-circuit evaluation, so total / count is never computed and there is no division by zero. The condition is false and "low" is printed.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-boolean-logic-005',
    topic: 'boolean-logic',
    difficulty: 3,
    prompt: 'Consider the following variable and method. What is printed when the code segment below them is executed?',
    setup: `static int calls = 0;

static boolean check(int value) {
    calls++;
    return value > 2;
}`,
    code: `boolean first = check(1) && check(5);
boolean second = check(4) || check(0);
System.out.println(calls);`,
    choices: ['2', '4', '3', '1'],
    answer: 0,
    explanation: 'check(1) is false, so && skips check(5). check(4) is true, so || skips check(0). Only two calls run, so calls is 2. Short-circuiting skips the whole right-hand call, including its side effect.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-boolean-logic-006',
    topic: 'boolean-logic',
    difficulty: 2,
    prompt: 'Assume a and b are boolean variables. When is (a || b) && !(a && b) true?',
    choices: ['Exactly when both a and b are true', 'Exactly when at least one of a and b is true', 'Exactly when one of a and b is true', 'Exactly when both a and b are false'],
    answer: 2,
    explanation: '(a || b) needs at least one true. !(a && b) rules out both being true. Together they leave exactly one true. Check all four cases: true/true gives false, true/false and false/true give true, false/false gives false.',
    reviewed: true,
  },
  {
    id: 'csa-boolean-logic-007',
    topic: 'boolean-logic',
    formulas: ['integer-division'],
    difficulty: 3,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int x = -3;
System.out.println((x % 2 == 1) + " " + (x % 2 != 0 || x > 5 && x < 0));`,
    choices: ['true true', 'false true', 'false false', 'true false'],
    answer: 1,
    explanation: 'In Java, the remainder takes the sign of the left number, so -3 % 2 is -1, not 1. That makes x % 2 == 1 false even though x is odd. In the second part, && runs before ||: x % 2 != 0 is true, so the whole expression is true.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-boolean-logic-008',
    topic: 'boolean-logic',
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int age = 16;
boolean canDrive = age >= 16;
boolean adult = age >= 18;
System.out.println("drive: " + canDrive + ", adult: " + adult);`,
    choices: ['drive: false, adult: false', 'drive: true, adult: true', 'drive: 16, adult: 16', 'drive: true, adult: false'],
    answer: 3,
    explanation: 'A comparison like age >= 16 produces a boolean value, which can be stored in a variable. 16 >= 16 is true and 16 >= 18 is false. Concatenating a boolean with a String prints true or false.',
    verify: 'output',
    reviewed: true,
  },
];
