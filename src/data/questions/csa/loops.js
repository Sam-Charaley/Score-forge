// Topic: Loops & Iteration Counting (Unit 2).
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
export default [
  {
    id: 'csa-loops-001',
    topic: 'loops',
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int count = 0;
for (int i = 3; i <= 12; i += 3) {
    count++;
}
System.out.println(count);`,
    choices: ['3', '4', '5', '12'],
    answer: 1,
    explanation: 'i takes the values 3, 6, 9 and 12. The loop stops when i becomes 15, so the body runs 4 times. Choosing 3 usually comes from forgetting that <= includes 12.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-loops-002',
    topic: 'loops',
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int sum = 0;
for (int i = 1; i < 5; i++) {
    sum += i;
}
System.out.println(sum);`,
    choices: ['10', '15', '4', '5'],
    answer: 0,
    explanation: 'The loop adds 1 + 2 + 3 + 4 = 10. It stops before 5 because the condition is i < 5. 15 would be the answer if the condition were i <= 5.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-loops-003',
    topic: 'loops',
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int n = 20;
int steps = 0;
while (n > 1) {
    n /= 2;
    steps++;
}
System.out.println(steps);`,
    choices: ['3', '4', '5', '10'],
    answer: 1,
    explanation: 'With integer division n goes 20, 10, 5, 2, 1. That is 4 halvings, and the loop stops once n is 1. Note 5 / 2 is 2, not 2.5.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-loops-004',
    topic: 'loops',
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `for (int i = 10; i > 0; i -= 3) {
    System.out.print(i + " ");
}`,
    choices: ['10 7 4 1', '10 7 4', '10 7 4 1 -2', '7 4 1'],
    answer: 0,
    explanation: 'i takes 10, 7, 4 and 1, and each is printed. The next value, -2, fails i > 0, so it is never printed. The check happens before each pass, not after.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-loops-005',
    topic: 'loops',
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int count = 0;
for (int i = 0; i < 4; i++) {
    for (int j = i; j < 4; j++) {
        count++;
    }
}
System.out.println(count);`,
    choices: ['16', '10', '6', '4'],
    answer: 1,
    explanation: 'The inner loop starts at i, so it runs 4, 3, 2, then 1 times as i goes from 0 to 3. The total is 4 + 3 + 2 + 1 = 10. 16 would be right only if j always started at 0.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-loops-006',
    topic: 'loops',
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int x = 1;
while (x < 100) {
    x = x * 3;
}
System.out.println(x);`,
    choices: ['81', '243', '100', '729'],
    answer: 1,
    explanation: 'x goes 1, 3, 9, 27, 81. Since 81 < 100, the loop runs once more and x becomes 243. Only then does the condition fail. The printed value is the first one that is not less than 100.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-loops-007',
    topic: 'loops',
    difficulty: 2,
    prompt: 'Assume n is a positive int. Which loop header makes the loop body execute exactly n times?',
    choices: [
      'for (int k = 0; k <= n; k++)',
      'for (int k = 1; k < n; k++)',
      'for (int k = 1; k <= n; k++)',
      'for (int k = n; k > 1; k--)',
    ],
    answer: 2,
    explanation: 'k = 1 to n inclusive gives n passes. Starting at 0 with <= gives n + 1 passes. Starting at 1 with < gives n - 1. Counting down from n while k > 1 also gives n - 1.',
    reviewed: false,
  },
  {
    id: 'csa-loops-008',
    topic: 'loops',
    difficulty: 3,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int a = 0;
int b = 1;
for (int i = 0; i < 5; i++) {
    int temp = a + b;
    a = b;
    b = temp;
}
System.out.println(a);`,
    choices: ['3', '5', '8', '13'],
    answer: 1,
    explanation: 'Trace (a, b) after each pass: (1, 1), (1, 2), (2, 3), (3, 5), (5, 8). After 5 passes a is 5. Choosing 8 means printing b instead of a.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-loops-009',
    topic: 'loops',
    difficulty: 3,
    prompt: 'What is printed when the following code segment is executed?',
    code: `String s = "";
for (int i = 0; i < 4; i++) {
    s = i + s;
}
System.out.println(s);`,
    choices: ['0123', '3210', '6', '0'],
    answer: 1,
    explanation: 'Each pass puts i in front of the existing String: "0", then "10", "210", "3210". Because s is a String, + concatenates instead of adding, so the answer is not 6.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-loops-010',
    topic: 'loops',
    difficulty: 3,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int count = 0;
for (int i = 5; i > 0; i--) {
    for (int j = 0; j < i; j += 2) {
        count++;
    }
}
System.out.println(count);`,
    choices: ['15', '9', '10', '8'],
    answer: 1,
    explanation: 'The inner loop counts j = 0, 2, 4, ... while j < i. For i = 5, 4, 3, 2, 1 it runs 3, 2, 2, 1 and 1 times, for a total of 9. 15 is what you get if you forget that j goes up by 2.',
    verify: 'output',
    reviewed: false,
  },
];
