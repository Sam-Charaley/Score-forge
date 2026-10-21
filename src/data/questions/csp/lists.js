// AP CS Principles, Big Idea 3: lists, list operations and list traversal
// algorithms. Code uses the AP CSP exam reference sheet pseudocode, where
// list indices start at 1.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
export default [
  {
    id: 'csp-lists-001',
    topic: 'lists',
    difficulty: 1,
    prompt: 'What is displayed when the following code segment is run?',
    code: `colors ← ["red", "green", "blue"]
DISPLAY(colors[2])`,
    choices: ['red', 'green', 'blue', 'An error occurs'],
    answer: 1,
    explanation: 'On the AP exam, the first element of a list is at index 1, so colors[2] is "green". "blue" would be right in a language that counts from 0.',
    reviewed: true,
  },
  {
    id: 'csp-lists-002',
    topic: 'lists',
    difficulty: 1,
    prompt: 'What is displayed when the following code segment is run?',
    code: `nums ← [4, 8, 15]
APPEND(nums, 16)
REMOVE(nums, 1)
DISPLAY(LENGTH(nums))`,
    choices: ['2', '4', '3', '5'],
    answer: 2,
    explanation: 'APPEND adds 16 to the end, making 4 elements. REMOVE(nums, 1) deletes the element at index 1, leaving [8, 15, 16], which has 3 elements.',
    reviewed: true,
  },
  {
    id: 'csp-lists-003',
    topic: 'lists',
    difficulty: 2,
    prompt: 'What does list contain after the following code segment is run?',
    code: `list ← [10, 20, 30]
INSERT(list, 2, 15)
APPEND(list, 40)
REMOVE(list, 3)`,
    choices: ['[10, 15, 30, 40]', '[10, 15, 20, 40]', '[15, 10, 30, 40]', '[10, 20, 30, 40]'],
    answer: 0,
    explanation: 'INSERT puts 15 at index 2 and shifts the rest right: [10, 15, 20, 30]. APPEND gives [10, 15, 20, 30, 40]. REMOVE(list, 3) deletes the element now at index 3, which is 20. [10, 15, 20, 40] comes from removing the original third element, 30.',
    reviewed: true,
  },
  {
    id: 'csp-lists-004',
    topic: 'lists',
    difficulty: 2,
    prompt: 'What is displayed when the following code segment is run?',
    code: `temps ← [68, 75, 81, 59, 90]
count ← 0
FOR EACH t IN temps
{
   IF(t ≥ 75)
   {
      count ← count + 1
   }
}
DISPLAY(count)`,
    choices: ['2', '3', '4', '5'],
    answer: 1,
    explanation: 'FOR EACH visits every element. 75, 81 and 90 are at least 75, so count is 3. 2 comes from treating ≥ as >, which leaves out 75.',
    reviewed: true,
  },
  {
    id: 'csp-lists-005',
    topic: 'lists',
    difficulty: 2,
    prompt: 'What is displayed when the following code segment is run?',
    code: `scores ← [55, 92, 70, 88, 64]
passing ← []
FOR EACH s IN scores
{
   IF(s ≥ 70)
   {
      APPEND(passing, s)
   }
}
DISPLAY(passing)`,
    choices: ['[92, 88]', '[55, 64]', '[70, 88, 92]', '[92, 70, 88]'],
    answer: 3,
    explanation: 'This filters the list: each score of at least 70 is appended to passing in the order it is visited, so passing is [92, 70, 88]. The loop does not sort, so [70, 88, 92] is wrong.',
    reviewed: true,
  },
  {
    id: 'csp-lists-006',
    topic: 'lists',
    difficulty: 3,
    prompt: 'What is displayed when the following code segment is run?',
    code: `vals ← [3, 6, 9, 12]
i ← 1
REPEAT LENGTH(vals) TIMES
{
   vals[i] ← vals[i] + i
   i ← i + 1
}
DISPLAY(vals)`,
    choices: ['[4, 8, 12, 16]', '[4, 7, 10, 13]', '[3, 7, 11, 15]', '[4, 8, 12, 12]'],
    answer: 0,
    explanation: 'Each element has its own index added to it: 3 + 1, 6 + 2, 9 + 3 and 12 + 4, giving [4, 8, 12, 16]. [3, 7, 11, 15] comes from counting indices from 0, and [4, 7, 10, 13] from adding 1 to every element.',
    reviewed: true,
  },
  {
    id: 'csp-lists-007',
    topic: 'lists',
    difficulty: 3,
    prompt: 'The code segment is meant to remove every 4 from nums. What is displayed when it is run?',
    code: `nums ← [2, 4, 4, 7]
i ← 1
REPEAT UNTIL(i > LENGTH(nums))
{
   IF(nums[i] = 4)
   {
      REMOVE(nums, i)
   }
   i ← i + 1
}
DISPLAY(nums)`,
    choices: ['[2, 7]', '[2, 4, 4, 7]', '[2, 4, 7]', 'An error occurs'],
    answer: 2,
    explanation: 'At i = 2 the first 4 is removed and the second 4 shifts into index 2. Then i becomes 3, so that 4 is never checked. The result is [2, 4, 7]. Only increasing i when nothing is removed would fix the error.',
    reviewed: true,
  },
  {
    id: 'csp-lists-008',
    topic: 'lists',
    difficulty: 2,
    prompt: 'A program stores 30 student names in 30 separate variables, name1 through name30. The programmer replaces them with a single list called names. Which is the best reason for this change?',
    choices: [
      'Lists use less memory than any other way of storing data',
      'Lists prevent the names from ever being changed',
      'Lists automatically sort the names alphabetically',
      'A list lets the program process every name with one loop, which manages complexity and makes the program easier to change',
    ],
    answer: 3,
    explanation: 'A list is a data abstraction: one name refers to a whole collection, so the same code works with a loop for 30 names or 300. Lists do not sort themselves and can still be changed.',
    reviewed: true,
  },
];
