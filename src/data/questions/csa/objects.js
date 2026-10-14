// Topic: objects, references and calling methods (Unit 1). Includes wrapper
// classes, null, and the Math methods on the AP Java Quick Reference.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
export default [
  {
    id: 'csa-objects-001',
    topic: 'objects',
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `String name = "Ada";
String other = name;
name = name + " L";
System.out.println(other);`,
    choices: ['Ada L', 'null', 'Ada', ' L'],
    answer: 2,
    explanation: 'other = name makes both variables refer to the String "Ada". name + " L" builds a brand new String, and name is pointed at it. other still refers to the original "Ada".',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-objects-002',
    topic: 'objects',
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `System.out.println(Math.abs(-4) + Math.pow(2, 3));`,
    choices: ['12.0', '12', '-4.08.0', '4.08.0'],
    answer: 0,
    explanation: 'Math.abs(-4) is the int 4. Math.pow always returns a double, so Math.pow(2, 3) is 8.0. Adding an int and a double gives a double: 12.0. Both sides are numbers, so + adds rather than joining text.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-objects-003',
    topic: 'objects',
    difficulty: 2,
    prompt: 'Which expression evaluates to a random int from 1 to 6, inclusive, with each value equally likely?',
    choices: ['(int) Math.random() * 6 + 1', '(int) (Math.random() * 7)', '(int) (Math.random() * 6)', '(int) (Math.random() * 6) + 1'],
    answer: 3,
    explanation: 'Math.random() * 6 is a double from 0.0 up to but not including 6.0. The cast turns that into 0 to 5, and + 1 shifts it to 1 to 6. In (int) Math.random() * 6 + 1 the cast happens first and always gives 0, so the result is always 1.',
    reviewed: true,
  },
  {
    id: 'csa-objects-004',
    topic: 'objects',
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `Integer a = 5;
int b = a + 2;
Integer c = b;
System.out.println(c.equals(7) + " " + (b == 7));`,
    choices: ['false true', 'true true', 'true false', 'false false'],
    answer: 1,
    explanation: 'Java converts between int and Integer automatically (autoboxing). a + 2 unboxes a and gives the int 7, and c = b boxes it back into an Integer. c.equals(7) compares values, so it is true, and b == 7 compares two ints, also true.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-objects-005',
    topic: 'objects',
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `String s = null;
if (s != null && s.length() > 0) {
    System.out.println("full");
} else {
    System.out.println("empty");
}`,
    choices: ['empty', 'full', 'Nothing is printed; a NullPointerException is thrown', 'Nothing is printed; the code does not compile'],
    answer: 0,
    explanation: 's != null is false, so && stops there and never calls s.length(). Calling a method on null would throw a NullPointerException, which is why the null check has to come first in the condition.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-objects-006',
    topic: 'objects',
    difficulty: 3,
    prompt: 'What is printed when the following code segment is executed?',
    code: `String s = "abc";
String t = s.substring(1);
s = t + s;
System.out.println(s + " " + t);`,
    choices: ['bcabc abc', 'abcbc bc', 'bcabc bc', 'bc bc'],
    answer: 2,
    explanation: 't is "bc". t + s joins "bc" and "abc" into "bcabc", which is stored in s. t is a separate String and is not affected by changing s.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-objects-007',
    topic: 'objects',
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `System.out.println((int) Math.sqrt(20) + " " + Math.sqrt(16));`,
    choices: ['4.47 4', '4 4', '5 4.0', '4 4.0'],
    answer: 3,
    explanation: 'Math.sqrt returns a double. The square root of 20 is about 4.47, and the cast cuts it to 4. Math.sqrt(16) is exactly 4, but as a double it prints as 4.0.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-objects-008',
    topic: 'objects',
    difficulty: 3,
    prompt: 'Consider the following method. What is printed when the code segment below it is executed?',
    setup: `static void change(String s) {
    s = s + "!";
}`,
    code: `String word = "hi";
change(word);
System.out.println(word);`,
    choices: ['hi!', 'hi', '!', 'null'],
    answer: 1,
    explanation: `The parameter s starts as a copy of the reference in word. s = s + "!" makes a new String and points only s at it. word in the calling code still refers to "hi". A method cannot make the caller's variable point somewhere else.`,
    verify: 'output',
    reviewed: true,
  },
];
