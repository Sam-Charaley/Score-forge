// Topic: primitive types, expressions and casting (Unit 1).
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
export default [
  {
    id: 'csa-expressions-001',
    topic: 'expressions',
    formulas: ['integer-division'],
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int a = 7;
int b = 2;
System.out.println(a / b + " " + a % b);`,
    choices: ['3.5 1', '3 1', '3 0', '3.5 0'],
    answer: 1,
    explanation: 'Both values are ints, so / is integer division and drops the remainder: 7 / 2 is 3. % gives the remainder, and 7 = 2 * 3 + 1, so 7 % 2 is 1.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-expressions-002',
    topic: 'expressions',
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `double d = 7 / 2;
System.out.println(d);`,
    choices: ['3.5', '3', '4.0', '3.0'],
    answer: 3,
    explanation: '7 / 2 is worked out first, with two ints, so it is 3. Only then is 3 stored in a double, which makes it 3.0. To get 3.5, one side has to be a double before dividing, as in 7.0 / 2.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-expressions-003',
    topic: 'expressions',
    formulas: ['casting'],
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int x = 17;
double y = (double) x / 4;
int z = (int) y;
System.out.println(y + " " + z);`,
    choices: ['4.25 4', '4.0 4', '4.25 5', '4 4'],
    answer: 0,
    explanation: 'The cast turns x into 17.0 before the division, so y is 17.0 / 4 = 4.25. Casting a double to int cuts off everything after the decimal point, it does not round, so z is 4.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-expressions-004',
    topic: 'expressions',
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `System.out.println(1 + 2 + "3" + 4 + 5);`,
    choices: ['12345', '15', '3345', '339'],
    answer: 2,
    explanation: '+ works left to right. 1 + 2 are both ints, so that is 3. 3 + "3" involves a String, so it joins them: "33". From then on everything is String joining: "334", then "3345".',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-expressions-005',
    topic: 'expressions',
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int n = 10;
n += 5;
n *= 2;
n -= n / 3;
System.out.println(n);`,
    choices: ['25', '20', '10', '30'],
    answer: 1,
    explanation: 'n += 5 makes 15, and n *= 2 makes 30. n -= n / 3 means n = n - n / 3, with n / 3 worked out using the current value: 30 / 3 is 10, so n becomes 20.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-expressions-006',
    topic: 'expressions',
    formulas: ['int-limits'],
    difficulty: 3,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int big = Integer.MAX_VALUE;
big = big + 1;
System.out.println(big == Integer.MIN_VALUE);`,
    choices: ['false', '2147483648', 'Nothing is printed; an ArithmeticException is thrown', 'true'],
    answer: 3,
    explanation: 'An int cannot hold a value bigger than Integer.MAX_VALUE. Adding 1 overflows and wraps around to the smallest int, Integer.MIN_VALUE. Java does not throw an exception when an int overflows.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-expressions-007',
    topic: 'expressions',
    formulas: ['casting'],
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `double price = 2.7;
int rounded = (int) (price + 0.5);
System.out.println(rounded + " " + (int) price);`,
    choices: ['3 3', '2 2', '3 2', '2 3'],
    answer: 2,
    explanation: 'Adding 0.5 and then casting is the standard way to round a positive double: 2.7 + 0.5 is 3.2, and the cast cuts it to 3. Casting 2.7 directly just cuts off the decimal part, giving 2.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-expressions-008',
    topic: 'expressions',
    formulas: ['integer-division'],
    difficulty: 3,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int a = 5;
int b = 3;
System.out.println(a - b * 2 + a % b * 4);`,
    choices: ['7', '24', '3', '12'],
    answer: 0,
    explanation: '*, / and % happen before + and -. b * 2 is 6, and a % b * 4 is 2 * 4 = 8 (% and * share a level and go left to right). That leaves 5 - 6 + 8 = 7.',
    verify: 'output',
    reviewed: true,
  },
];
