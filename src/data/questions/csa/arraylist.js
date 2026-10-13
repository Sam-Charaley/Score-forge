// Topic: ArrayList (Unit 4). Feeds FRQ 3, Data Analysis with ArrayList.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
export default [
  {
    id: 'csa-arraylist-001',
    topic: 'arraylist',
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `ArrayList<String> names = new ArrayList<>();
names.add("Ana");
names.add("Ben");
names.add("Cy");
names.remove(0);
System.out.println(names.size());`,
    choices: ['2', '3', '1', '0'],
    answer: 0,
    explanation: 'Three names are added, then remove(0) removes "Ana". The list now holds "Ben" and "Cy", so size() is 2. size() always reflects the current number of elements.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-arraylist-002',
    topic: 'arraylist',
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `ArrayList<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");
list.add(1, "X");
System.out.println(list);`,
    choices: ['[A, X, B, C]', '[X, A, B, C]', '[A, B, X, C]', '[A, X, C]'],
    answer: 0,
    explanation: 'add(1, "X") inserts at index 1 and shifts "B" and "C" one place to the right. Nothing is replaced, so the list grows to four elements.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-arraylist-003',
    topic: 'arraylist',
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `ArrayList<Integer> nums = new ArrayList<>();
nums.add(5);
nums.add(8);
nums.add(2);
int old = nums.set(1, 10);
System.out.println(old + " " + nums);`,
    choices: ['8 [5, 10, 2]', '10 [5, 10, 2]', '8 [5, 8, 10, 2]', '5 [10, 8, 2]'],
    answer: 0,
    explanation: 'set(1, 10) replaces the element at index 1 and returns the value that was there, which is 8. Unlike add, set does not change the size of the list.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-arraylist-004',
    topic: 'arraylist',
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `ArrayList<Integer> nums = new ArrayList<>();
nums.add(10);
nums.add(20);
nums.add(30);
nums.remove(1);
System.out.println(nums);`,
    choices: ['[10, 30]', '[20, 30]', '[10, 20, 30]', '[10, 20]'],
    answer: 0,
    explanation: 'With an int argument, remove(1) removes by index, not by value, so 20 (at index 1) is removed. To remove the value 1 you would need remove(Integer.valueOf(1)). This trap only exists for ArrayList<Integer>.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-arraylist-005',
    topic: 'arraylist',
    difficulty: 3,
    prompt: 'The following code segment is intended to remove every even number from nums. What is printed when it is executed?',
    code: `ArrayList<Integer> nums = new ArrayList<>();
nums.add(4);
nums.add(6);
nums.add(6);
nums.add(7);
for (int i = 0; i < nums.size(); i++) {
    if (nums.get(i) % 2 == 0) {
        nums.remove(i);
    }
}
System.out.println(nums);`,
    choices: ['[7]', '[6, 7]', '[6, 6, 7]', '[4, 7]'],
    answer: 1,
    explanation: 'At i = 0, 4 is removed and everything shifts left, so the first 6 moves to index 0. Then i becomes 1 and the loop never checks the element that moved into index 0. At i = 1 the second 6 is removed, leaving [6, 7]. This skipped-element bug is the most common lost point on FRQ 3.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-arraylist-006',
    topic: 'arraylist',
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `ArrayList<Integer> nums = new ArrayList<>();
nums.add(4);
nums.add(6);
nums.add(6);
nums.add(7);
for (int i = nums.size() - 1; i >= 0; i--) {
    if (nums.get(i) % 2 == 0) {
        nums.remove(i);
    }
}
System.out.println(nums);`,
    choices: ['[7]', '[6, 7]', '[4, 6, 7]', '[]'],
    answer: 0,
    explanation: 'Looping from the end means a removal only shifts elements the loop has already checked, so nothing is skipped. All three even numbers are removed and [7] remains.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-arraylist-007',
    topic: 'arraylist',
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `ArrayList<String> words = new ArrayList<>();
words.add("hi");
words.add("hello");
words.add("hey");
int total = 0;
for (String w : words) {
    if (w.length() > 2) {
        total += w.length();
    }
}
System.out.println(total);`,
    choices: ['8', '10', '5', '2'],
    answer: 0,
    explanation: '"hi" has length 2, which is not greater than 2, so it is skipped. "hello" (5) and "hey" (3) are added, giving 8. 10 is the total with no condition at all.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-arraylist-008',
    topic: 'arraylist',
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `ArrayList<Integer> list = new ArrayList<>();
for (int i = 1; i <= 4; i++) {
    list.add(0, i * i);
}
System.out.println(list);`,
    choices: ['[16, 9, 4, 1]', '[1, 4, 9, 16]', '[4, 9, 16, 1]', '[16, 1, 4, 9]'],
    answer: 0,
    explanation: 'add(0, value) always inserts at the front, pushing earlier values right. The squares 1, 4, 9, 16 are inserted in that order, so they end up reversed: [16, 9, 4, 1].',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-arraylist-009',
    topic: 'arraylist',
    difficulty: 3,
    prompt: 'What is printed when the following code segment is executed?',
    code: `ArrayList<Integer> list = new ArrayList<>();
list.add(1);
list.add(2);
list.add(3);
int n = list.size();
for (int i = 0; i < n; i++) {
    list.add(list.get(i) * 10);
}
System.out.println(list);`,
    choices: ['[1, 2, 3, 10, 20, 30]', '[10, 20, 30]', '[1, 10, 2, 20, 3, 30]', '[1, 2, 3]'],
    answer: 0,
    explanation: 'n is saved as 3 before the loop, so the loop runs exactly 3 times even though the list grows. Each pass appends 10 times an original element to the end. If the condition used list.size() instead, the loop would never end.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-arraylist-010',
    topic: 'arraylist',
    difficulty: 3,
    prompt: 'Assume names contains "Ana", "Ben", "Cy", "Dee" in that order. What happens when the following code segment is executed?',
    code: `for (String s : names) {
    if (s.equals("Ben")) {
        names.remove(s);
    }
}
System.out.println(names);`,
    choices: [
      'A ConcurrentModificationException is thrown',
      '[Ana, Cy, Dee] is printed',
      '[Ana, Ben, Cy, Dee] is printed',
      'A compile-time error occurs',
    ],
    answer: 0,
    explanation: 'The code compiles, but changing an ArrayList\'s size inside an enhanced for loop over it causes a ConcurrentModificationException when the loop asks for the next element. To remove while traversing, use an index loop, ideally from the end.',
    reviewed: false,
  },
];
