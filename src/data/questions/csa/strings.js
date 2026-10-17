// Topic: String methods and comparison (Unit 1). Uses only the String methods
// on the AP Java Quick Reference: length, substring, indexOf, equals, compareTo.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
export default [
  {
    id: 'csa-strings-001',
    topic: 'strings',
    formulas: ['substring-range'],
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `String s = "computer";
System.out.println(s.substring(3, 6));`,
    choices: ['pute', 'mput', 'put', 'puter'],
    answer: 2,
    explanation: 'substring(3, 6) starts at index 3 and stops before index 6, so it takes the characters at 3, 4 and 5: "p", "u", "t". The end index is never included, and the result always has 6 - 3 = 3 characters.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-strings-002',
    topic: 'strings',
    formulas: ['index-of'],
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `String s = "banana";
System.out.println(s.indexOf("an"));`,
    choices: ['1', '2', '3', '-1'],
    answer: 0,
    explanation: 'indexOf returns the index where the first match starts. "an" first appears starting at index 1 ("b" is index 0). It appears again at index 3, but indexOf stops at the first match.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-strings-003',
    topic: 'strings',
    formulas: ['string-length', 'index-of'],
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `String s = "Java";
int total = s.indexOf("v") + s.indexOf("x") + s.length();
System.out.println(total);`,
    choices: ['6', '7', '3', '5'],
    answer: 3,
    explanation: 'indexOf("v") is 2. "x" does not appear, so indexOf("x") is -1. length() is 4. 2 + (-1) + 4 = 5. A missing match returns -1, not 0, so it lowers the total.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-strings-004',
    topic: 'strings',
    formulas: ['string-equals'],
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `String a = "hi";
String b = new String("hi");
System.out.println((a == b) + " " + a.equals(b));`,
    choices: ['true true', 'false true', 'false false', 'true false'],
    answer: 1,
    explanation: 'new String("hi") always creates a separate object, so a == b compares two different references and is false. equals compares the characters, which match, so it is true. Use equals to compare String contents.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-strings-005',
    topic: 'strings',
    formulas: ['compare-to'],
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `String a = "Zebra";
String b = "apple";
int result = a.compareTo(b);
if (result < 0) {
    System.out.println("before");
} else if (result > 0) {
    System.out.println("after");
} else {
    System.out.println("same");
}`,
    choices: ['after', 'same', 'before', 'Nothing is printed; compareTo needs strings of the same length'],
    answer: 2,
    explanation: 'compareTo compares character codes, not dictionary order. Every uppercase letter comes before every lowercase letter, so "Z" is less than "a" and the result is negative. "Zebra" counts as coming before "apple".',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-strings-006',
    topic: 'strings',
    formulas: ['substring-from'],
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `String s = "cat";
s.substring(1);
s = s + "s";
System.out.println(s);`,
    choices: ['cats', 'ats', 'at', 'cat'],
    answer: 0,
    explanation: 'Strings never change. s.substring(1) builds a new String "at" but nothing stores it, so s is still "cat". Then s + "s" is stored back in s, giving "cats".',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-strings-007',
    topic: 'strings',
    formulas: ['substring-from', 'index-of'],
    difficulty: 3,
    prompt: 'What is printed when the following code segment is executed?',
    code: `String s = "mississippi";
int i = s.indexOf("ss");
String t = s.substring(i + 1);
System.out.println(t.indexOf("ss") + i);`,
    choices: ['5', '7', '2', '4'],
    answer: 3,
    explanation: '"ss" first starts at index 2, so i is 2. s.substring(3) is "sissippi". In that string "ss" starts at index 2, so t.indexOf("ss") is 2. The total is 2 + 2 = 4. Indexes in t count from the start of t, not from the start of s.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-strings-008',
    topic: 'strings',
    difficulty: 3,
    prompt: 'Assume s is "code". Which expression throws a StringIndexOutOfBoundsException?',
    choices: ['s.substring(4)', 's.substring(0, 5)', 's.substring(2, 4)', 's.substring(4, 4)'],
    answer: 1,
    explanation: '"code" has length 4, so valid indexes for substring go from 0 to 4. s.substring(0, 5) asks for an end index past the length and throws. s.substring(4) and s.substring(4, 4) are legal and return the empty string "", and s.substring(2, 4) is "de".',
    reviewed: true,
  },
];
