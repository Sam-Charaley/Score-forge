// Topic: 1D arrays and array algorithms (Unit 4).
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
export default [
  {
    id: 'csa-arrays-001',
    topic: 'arrays',
    formulas: ['array-basics'],
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int[] a = {4, 7, 1, 9};
System.out.println(a[1] + a[a.length - 1]);`,
    choices: ['16', '13', '8', '11'],
    answer: 0,
    explanation: 'Indexes start at 0, so a[1] is 7. a.length is 4, so a[a.length - 1] is a[3], the last element, which is 9. 7 + 9 = 16.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-arrays-002',
    topic: 'arrays',
    formulas: ['array-basics'],
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int[] nums = new int[4];
nums[2] = 5;
System.out.println(nums[0] + " " + nums[2] + " " + nums.length);`,
    choices: ['null 5 4', '0 5 3', '0 5 4', '5 5 4'],
    answer: 2,
    explanation: 'A new int array starts with every element set to 0. Only index 2 is changed, to 5. length is the number of elements the array was created with, 4, no matter which ones were assigned.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-arrays-003',
    topic: 'arrays',
    formulas: ['array-basics'],
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int[] scores = {90, 85, 72};
int total = 0;
for (int s : scores) {
    total += s;
}
System.out.println(total / scores.length);`,
    choices: ['82.33333333333333', '82', '83', '247'],
    answer: 1,
    explanation: 'The total is 247 and both 247 and scores.length are ints, so the division drops the remainder: 247 / 3 is 82. It is not rounded up to 83. Casting total to double first would give 82.33...',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-arrays-004',
    topic: 'arrays',
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int[] a = {1, 2, 3};
for (int v : a) {
    v = v * 10;
}
System.out.println(a[0] + a[1] + a[2]);`,
    choices: ['60', '123', '0', '6'],
    answer: 3,
    explanation: 'In an enhanced for loop, v is a copy of each element. Changing v does not change the array, so it still holds 1, 2 and 3, and the sum is 6. To change elements, use an index loop: a[i] = a[i] * 10.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-arrays-005',
    topic: 'arrays',
    formulas: ['array-basics'],
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int[] a = {5, 6, 7, 8};
for (int i = 0; i < a.length - 1; i++) {
    a[i] = a[i + 1];
}
for (int v : a) {
    System.out.print(v + " ");
}`,
    choices: ['6 7 8 5', '5 5 5 5', '6 7 8 8', '6 7 8'],
    answer: 2,
    explanation: 'Each element is replaced by the one to its right, from left to right, so 6, 7 and 8 move down one place. The last element is never assigned and keeps its 8. The original 5 is lost; saving it in a variable first would let you rotate the array instead.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-arrays-006',
    topic: 'arrays',
    formulas: ['array-basics'],
    difficulty: 3,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int[] a = {1, 2, 3, 4};
for (int i = 0; i < a.length; i++) {
    int temp = a[i];
    a[i] = a[a.length - 1 - i];
    a[a.length - 1 - i] = temp;
}
for (int v : a) {
    System.out.print(v + " ");
}`,
    choices: ['1 2 3 4', '4 3 2 1', '4 2 3 1', '4 3 3 4'],
    answer: 0,
    explanation: 'The loop swaps each element with its mirror image, but it runs over the whole array. After the halfway point it swaps every pair back again, so the array ends where it started. Reversing needs the loop to stop at a.length / 2.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-arrays-007',
    topic: 'arrays',
    formulas: ['array-basics'],
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int[] a = {3, 8, 2, 8, 5};
int best = 0;
for (int i = 1; i < a.length; i++) {
    if (a[i] > a[best]) {
        best = i;
    }
}
System.out.println(best);`,
    choices: ['3', '1', '8', '4'],
    answer: 1,
    explanation: 'best holds the index of the largest value so far, not the value itself. The 8 at index 1 is found first. The second 8, at index 3, is not greater than 8, so best stays 1. Using >= instead would move it to the last 8.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-arrays-008',
    topic: 'arrays',
    formulas: ['array-basics'],
    difficulty: 3,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int[] a = {1, 2, 3};
int[] b = a;
b[0] = 9;
a = new int[]{4, 5, 6};
System.out.println(b[0] + " " + a[0]);`,
    choices: ['1 4', '9 9', '4 4', '9 4'],
    answer: 3,
    explanation: 'b = a makes both variables refer to the same array, so b[0] = 9 changes the one array they share. Then a is pointed at a brand new array, but b still refers to the old one, whose first element is 9.',
    verify: 'output',
    reviewed: true,
  },
];
