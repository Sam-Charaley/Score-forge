// Topic: if / else selection (Unit 2). Feeds FRQ 1, Methods and Control Structures.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
export default [
  {
    id: 'csa-selection-001',
    topic: 'selection',
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int score = 85;
if (score >= 90) {
    System.out.print("A");
} else if (score >= 80) {
    System.out.print("B");
} else if (score >= 70) {
    System.out.print("C");
} else {
    System.out.print("F");
}`,
    choices: ['B', 'A', 'BC', 'C'],
    answer: 0,
    explanation: 'An if / else if chain runs only the first branch whose condition is true. 85 >= 90 is false, 85 >= 80 is true, so "B" prints and the rest of the chain is skipped, even though 85 >= 70 is also true.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-selection-002',
    topic: 'selection',
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int score = 85;
String grade = "";
if (score >= 70) {
    grade += "C";
}
if (score >= 80) {
    grade += "B";
}
if (score >= 90) {
    grade += "A";
}
System.out.println(grade);`,
    choices: ['C', 'B', 'CB', 'CBA'],
    answer: 2,
    explanation: 'These are three separate if statements, not an else if chain, so each one is checked. 85 passes the first two and fails the third, so "C" then "B" are added. Compare this with an else if chain, where only one branch runs.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-selection-003',
    topic: 'selection',
    difficulty: 3,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int x = 2;
if (x > 3)
    if (x > 10)
        System.out.print("big ");
else
    System.out.print("small ");
System.out.print("done");`,
    choices: ['small done', 'done', 'big done', 'small'],
    answer: 1,
    explanation: 'An else belongs to the nearest if without an else, no matter how it is indented. Here the else pairs with if (x > 10). Since x > 3 is false, that whole inner if / else is skipped and only "done" prints. Braces avoid this trap.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-selection-004',
    topic: 'selection',
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int a = 4;
int b = 9;
if (a > b) {
    System.out.println("1");
} else if (a * 2 > b) {
    System.out.println("2");
} else if (a + 5 == b) {
    System.out.println("3");
} else {
    System.out.println("4");
}`,
    choices: ['1', '2', '4', '3'],
    answer: 3,
    explanation: '4 > 9 is false. 4 * 2 is 8, and 8 > 9 is false. 4 + 5 is 9, and 9 == 9 is true, so "3" is printed and the final else is skipped.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-selection-005',
    topic: 'selection',
    difficulty: 1,
    prompt: 'Consider the following method. Which value of n makes it print Buzz?',
    setup: `static void fizz(int n) {
    if (n % 3 == 0 && n % 5 == 0) {
        System.out.println("FizzBuzz");
    } else if (n % 3 == 0) {
        System.out.println("Fizz");
    } else if (n % 5 == 0) {
        System.out.println("Buzz");
    } else {
        System.out.println(n);
    }
}`,
    choices: ['10', '15', '9', '7'],
    answer: 0,
    explanation: '10 is divisible by 5 but not by 3, so the first two conditions are false and the third is true. 15 is divisible by both, so the first branch prints FizzBuzz before the Buzz check is reached. 9 prints Fizz and 7 prints 7.',
    reviewed: true,
  },
  {
    id: 'csa-selection-006',
    topic: 'selection',
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int x = 10;
if (x > 5) {
    x = x - 5;
}
if (x > 5) {
    x = x * 2;
} else {
    x = x + 1;
}
System.out.println(x);`,
    choices: ['10', '20', '6', '11'],
    answer: 2,
    explanation: 'The first if changes x from 10 to 5. The second if tests the new value: 5 > 5 is false, so the else runs and x becomes 6. Each condition uses x as it is at that moment, not its starting value.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-selection-007',
    topic: 'selection',
    difficulty: 2,
    prompt: 'Consider the following method. What is printed when the code segment below it is executed?',
    setup: `static String category(int temp) {
    if (temp > 0) {
        return "cool";
    } else if (temp > 20) {
        return "warm";
    } else {
        return "cold";
    }
}`,
    code: `System.out.println(category(25) + " " + category(-4));`,
    choices: ['warm cold', 'cool cold', 'cool cool', 'warm cool'],
    answer: 1,
    explanation: '25 > 0 is true, so the method returns "cool" before ever checking temp > 20. The "warm" branch can never run, because any temp above 20 is also above 0. The broader test has to come after the narrower one. -4 fails both tests and gives "cold".',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-selection-008',
    topic: 'selection',
    difficulty: 3,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int x = 4;
int y = 4;
if (x < y || x == y && y > 5) {
    System.out.print("A");
} else if (!(x > y)) {
    System.out.print("B");
} else {
    System.out.print("C");
}`,
    choices: ['A', 'C', 'AB', 'B'],
    answer: 3,
    explanation: '&& runs before ||, so the first condition is x < y || (x == y && y > 5). x < y is false, and x == y && y > 5 is true && false, which is false. The else if tests !(4 > 4), which is !false, so it is true and "B" prints.',
    verify: 'output',
    reviewed: true,
  },
];
