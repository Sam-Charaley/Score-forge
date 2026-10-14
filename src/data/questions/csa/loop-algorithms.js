// Topic: String traversal and standard loop algorithms (Unit 2). Feeds FRQ 1.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
export default [
  {
    id: 'csa-loop-algorithms-001',
    topic: 'loop-algorithms',
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `String s = "banana";
int count = 0;
for (int i = 0; i < s.length(); i++) {
    if (s.substring(i, i + 1).equals("a")) {
        count++;
    }
}
System.out.println(count);`,
    choices: ['3', '2', '6', '4'],
    answer: 0,
    explanation: 'substring(i, i + 1) is the single character at index i. The loop visits indexes 0 to 5, and "a" is at 1, 3 and 5, so count is 3. Using equals, not ==, is what makes the String comparison reliable.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-loop-algorithms-002',
    topic: 'loop-algorithms',
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `String s = "code";
String r = "";
for (int i = 0; i < s.length(); i++) {
    r = s.substring(i, i + 1) + r;
}
System.out.println(r);`,
    choices: ['code', 'ecod', 'edoc', 'edo'],
    answer: 2,
    explanation: 'Each character is put in front of what has been built so far: "c", then "oc", "doc", "edoc". Adding to the front instead of the end reverses the String.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-loop-algorithms-003',
    topic: 'loop-algorithms',
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int n = 4052;
int sum = 0;
while (n > 0) {
    sum += n % 10;
    n /= 10;
}
System.out.println(sum);`,
    choices: ['2', '11', '405', '15'],
    answer: 1,
    explanation: 'n % 10 is the last digit, and n /= 10 removes it. The loop adds 2, 5, 0 and 4, then n reaches 0 and the loop stops. 2 + 5 + 0 + 4 = 11.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-loop-algorithms-004',
    topic: 'loop-algorithms',
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `String s = "abababa";
int count = 0;
for (int i = 0; i <= s.length() - 3; i++) {
    if (s.substring(i, i + 3).equals("aba")) {
        count++;
    }
}
System.out.println(count);`,
    choices: ['2', '4', '7', '3'],
    answer: 3,
    explanation: 'The loop checks every 3-character piece, starting at indexes 0 to 4. "aba" starts at 0, 2 and 4, and the matches overlap, so all three count. The bound i <= s.length() - 3 is what keeps i + 3 inside the String.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-loop-algorithms-005',
    topic: 'loop-algorithms',
    difficulty: 3,
    prompt: 'Assume s is a String with at least two characters. The loop body uses s.substring(i, i + 2) to look at every pair of neighbouring characters. Which loop header visits every pair without an error?',
    choices: ['for (int i = 0; i < s.length() - 1; i++)', 'for (int i = 0; i < s.length(); i++)', 'for (int i = 0; i <= s.length() - 1; i++)', 'for (int i = 0; i < s.length() - 2; i++)'],
    answer: 0,
    explanation: 'The last pair starts at index s.length() - 2, and substring(i, i + 2) is only legal while i + 2 <= s.length(). i < s.length() - 1 stops at exactly that index. The next two headers run one step too far and throw an exception, and the last one stops early and skips the final pair.',
    reviewed: true,
  },
  {
    id: 'csa-loop-algorithms-006',
    topic: 'loop-algorithms',
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int total = 0;
for (int k = 1; k <= 5; k++) {
    if (k % 2 == 1) {
        total += k;
    }
}
System.out.println(total);`,
    choices: ['15', '6', '9', '5'],
    answer: 2,
    explanation: 'k runs from 1 to 5, and k % 2 == 1 is true for the odd values 1, 3 and 5. Only those are added: 1 + 3 + 5 = 9.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-loop-algorithms-007',
    topic: 'loop-algorithms',
    difficulty: 3,
    prompt: 'What is printed when the following code segment is executed?',
    code: `String s = "abc";
String out = "";
for (int i = 0; i < s.length(); i++) {
    for (int j = i; j < s.length(); j++) {
        out += s.substring(j, j + 1);
    }
}
System.out.println(out);`,
    choices: ['abcabcabc', 'abcbcc', 'aabbcc', 'abcbc'],
    answer: 1,
    explanation: 'The inner loop starts at j = i, so each pass starts one character later. i = 0 adds "abc", i = 1 adds "bc", and i = 2 adds "c". Together: "abcbcc".',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-loop-algorithms-008',
    topic: 'loop-algorithms',
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `String s = "hello world";
int pos = -1;
for (int i = 0; i < s.length() && pos == -1; i++) {
    if (s.substring(i, i + 1).equals("o")) {
        pos = i;
    }
}
System.out.println(pos);`,
    choices: ['7', '-1', '5', '4'],
    answer: 3,
    explanation: 'The loop condition also checks pos == -1, so the loop ends as soon as the first "o" is found. That is at index 4, in "hello". The "o" at index 7 is never reached.',
    verify: 'output',
    reviewed: true,
  },
];
