// Topic: searching, sorting and recursion (Unit 4).
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
export default [
  {
    id: 'csa-search-sort-001',
    topic: 'search-sort',
    difficulty: 1,
    prompt: 'Consider the following method. What is printed when the code segment below it is executed?',
    setup: `static int find(int[] a, int target) {
    for (int i = 0; i < a.length; i++) {
        if (a[i] == target) {
            return i;
        }
    }
    return -1;
}`,
    code: `int[] data = {4, 9, 2, 9};
System.out.println(find(data, 9) + " " + find(data, 5));`,
    choices: ['3 -1', '1 0', '1 -1', '2 -1'],
    answer: 2,
    explanation: 'Linear search checks each element in order and returns as soon as it finds a match, so it returns 1, the first 9, not 3. 5 is not in the array, so the loop finishes and the method returns -1.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-search-sort-002',
    topic: 'search-sort',
    difficulty: 1,
    prompt: 'A standard binary search looks for a value in an int array. On which array is it guaranteed to work correctly?',
    choices: ['{2, 5, 8, 13, 21}', '{8, 2, 13, 5, 21}', '{21, 13, 8, 5, 2}', '{2, 8, 5, 21, 13}'],
    answer: 0,
    explanation: 'Binary search compares with the middle element and throws away the half that cannot contain the target. That only works when the array is sorted in the order the search expects, ascending for the standard version. The descending array is sorted, but in the opposite direction, so the search goes the wrong way.',
    reviewed: false,
  },
  {
    id: 'csa-search-sort-003',
    topic: 'search-sort',
    difficulty: 2,
    prompt: 'Consider the following method, which counts how many times a binary search loop runs. What is printed when the code segment below it is executed?',
    setup: `static int steps(int[] a, int target) {
    int low = 0;
    int high = a.length - 1;
    int count = 0;
    while (low <= high) {
        count++;
        int mid = (low + high) / 2;
        if (a[mid] == target) {
            return count;
        } else if (a[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return count;
}`,
    code: `int[] a = {1, 3, 5, 7, 9, 11, 13};
System.out.println(steps(a, 11));`,
    choices: ['6', '2', '3', '1'],
    answer: 1,
    explanation: 'First pass: low 0, high 6, mid 3, and a[3] is 7, which is less than 11, so low becomes 4. Second pass: mid is (4 + 6) / 2 = 5, and a[5] is 11, so it is found after 2 passes. A linear search would take 6 checks.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-search-sort-004',
    topic: 'search-sort',
    difficulty: 2,
    prompt: 'The following code segment does the first pass of selection sort. What is printed?',
    code: `int[] a = {5, 2, 8, 1, 9};
int minIndex = 0;
for (int j = 1; j < a.length; j++) {
    if (a[j] < a[minIndex]) {
        minIndex = j;
    }
}
int temp = a[0];
a[0] = a[minIndex];
a[minIndex] = temp;
for (int v : a) {
    System.out.print(v + " ");
}`,
    choices: ['1 5 2 8 9', '2 5 8 1 9', '1 2 5 8 9', '1 2 8 5 9'],
    answer: 3,
    explanation: 'One pass of selection sort finds the smallest value, 1 at index 3, and swaps it with the first element. Only those two elements move: 5 goes to index 3. The rest of the array is not sorted yet.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-search-sort-005',
    topic: 'search-sort',
    difficulty: 3,
    prompt: 'Consider the following method, which runs the first passes of insertion sort. What is printed when the code segment below it is executed?',
    setup: `static void insertionPasses(int[] a, int passes) {
    for (int i = 1; i <= passes; i++) {
        int key = a[i];
        int j = i - 1;
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key;
    }
}`,
    code: `int[] a = {7, 3, 5, 1};
insertionPasses(a, 2);
for (int v : a) {
    System.out.print(v + " ");
}`,
    choices: ['3 5 7 1', '1 3 5 7', '3 7 5 1', '1 3 7 5'],
    answer: 0,
    explanation: 'Insertion sort grows a sorted section at the front. Pass 1 inserts 3 before 7, giving 3 7 5 1. Pass 2 inserts 5 between 3 and 7, giving 3 5 7 1. The 1 has not been reached yet, so it stays at the end.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-search-sort-006',
    topic: 'search-sort',
    difficulty: 1,
    prompt: 'Consider the following method. What is printed when the code segment below it is executed?',
    setup: `static int f(int n) {
    if (n == 0) {
        return 0;
    }
    return n + f(n - 1);
}`,
    code: `System.out.println(f(4));`,
    choices: ['4', '24', '9', '10'],
    answer: 3,
    explanation: 'Each call adds n to the result of a call with n - 1, until the base case n == 0 returns 0. f(4) = 4 + 3 + 2 + 1 + 0 = 10. It adds rather than multiplies, so it is not 4! = 24.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-search-sort-007',
    topic: 'search-sort',
    difficulty: 2,
    prompt: 'Consider the following method. What is printed when the code segment below it is executed?',
    setup: `static String g(String s) {
    if (s.length() <= 1) {
        return s;
    }
    return g(s.substring(1)) + s.substring(0, 1);
}`,
    code: `System.out.println(g("abc"));`,
    choices: ['abc', 'cba', 'bca', 'cab'],
    answer: 1,
    explanation: 'g moves the first character to the end of whatever the recursive call returns. g("c") is "c", so g("bc") is "c" + "b" = "cb", and g("abc") is "cb" + "a" = "cba". The method reverses the String.',
    verify: 'output',
    reviewed: false,
  },
  {
    id: 'csa-search-sort-008',
    topic: 'search-sort',
    difficulty: 3,
    prompt: 'Consider the following method. What is printed when the code segment below it is executed?',
    setup: `static void h(int n) {
    if (n > 0) {
        h(n - 1);
        System.out.print(n + " ");
    }
}`,
    code: `h(3);`,
    choices: ['3 2 1', '3 2 1 0', '1 2 3', '0 1 2 3'],
    answer: 2,
    explanation: 'Each call makes its recursive call before it prints. h(3) calls h(2), which calls h(1), which calls h(0), which does nothing. Then the calls finish in reverse order, printing 1, then 2, then 3. h(0) prints nothing because n > 0 is false.',
    verify: 'output',
    reviewed: false,
  },
];
