// Topic: text files and data sets (Unit 4). Reading files with Scanner and
// File, and splitting lines into fields with String.split.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
export default [
  {
    id: 'csa-text-files-001',
    topic: 'text-files',
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `String line = "Ana,17,Grade 12";
String[] parts = line.split(",");
System.out.println(parts.length + " " + parts[1]);`,
    choices: ['3 Ana', '3 17', '2 17', '4 17'],
    answer: 1,
    explanation: 'split(",") cuts the String at every comma and drops the commas, giving "Ana", "17" and "Grade 12". That is 3 parts. The space inside "Grade 12" is not a comma, so it stays. parts[1] is the second part, "17".',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-text-files-002',
    topic: 'text-files',
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `String line = "4 9 2";
String[] nums = line.split(" ");
int total = 0;
for (String n : nums) {
    total += Integer.parseInt(n);
}
System.out.println(total);`,
    choices: ['492', '4 9 2', '15', '3'],
    answer: 2,
    explanation: 'split(" ") gives the Strings "4", "9" and "2". Integer.parseInt turns each into an int so they can be added: 4 + 9 + 2 = 15. Adding the Strings without parseInt would join them as text instead.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-text-files-003',
    topic: 'text-files',
    difficulty: 2,
    prompt: 'The array lines holds the lines of a file, one per element. What is printed when the following code segment is executed?',
    code: `String[] lines = {"apple,3", "pear,5", "fig,2"};
int total = 0;
for (String line : lines) {
    String[] fields = line.split(",");
    total += Integer.parseInt(fields[1]);
}
System.out.println(total);`,
    choices: ['10', '352', '3', '0'],
    answer: 0,
    explanation: 'Each line is split into a name and a number, and fields[1] is the number part. The numbers are 3, 5 and 2, and parseInt turns each into an int before adding, giving 10.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-text-files-004',
    topic: 'text-files',
    difficulty: 1,
    prompt: 'Assume input was created with Scanner input = new Scanner(new File("data.txt")); Which code segment reads every line of the file?',
    choices: [`if (input.hasNext()) {
    String line = input.nextLine();
}`, `for (int i = 0; i < input.length(); i++) {
    String line = input.nextLine();
}`, `String line = input.nextLine();
while (line.length() > 0) {
    line = input.nextLine();
}`, `while (input.hasNext()) {
    String line = input.nextLine();
}`],
    answer: 3,
    explanation: 'hasNext checks whether anything is left to read before nextLine reads the next line, and the while loop repeats until the file runs out. An if reads only one line, a Scanner has no length method, and the last option stops at the first blank line or crashes at the end of the file.',
    reviewed: true,
  },
  {
    id: 'csa-text-files-005',
    topic: 'text-files',
    difficulty: 2,
    prompt: 'A method creates new Scanner(new File("scores.txt")). Why must the method either handle an exception or have throws IOException in its header?',
    choices: ['Every method that calls String.split must declare it', 'The file might not exist, and the exception this causes is checked, so Java requires it to be handled or declared', 'Without it, the Scanner reads only the first line of the file', 'Scanner can only be used in methods that return void'],
    answer: 1,
    explanation: 'new Scanner(new File(...)) throws a FileNotFoundException, a kind of IOException, if the file cannot be opened. It is a checked exception, so the code will not compile unless the method handles it or declares that it may throw it.',
    reviewed: true,
  },
  {
    id: 'csa-text-files-006',
    topic: 'text-files',
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `String[] lines = {"Ben,B", "Amy,A", "Cal,A", "Dee,C"};
int count = 0;
for (String line : lines) {
    if (line.split(",")[1].equals("A")) {
        count++;
    }
}
System.out.println(count);`,
    choices: ['1', '4', '2', '0'],
    answer: 2,
    explanation: 'line.split(",")[1] is the grade after the comma. Amy and Cal have an A, so count is 2. Comparing with equals checks the text itself, which is what a data-set filter needs.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-text-files-007',
    topic: 'text-files',
    difficulty: 3,
    prompt: 'What is printed when the following code segment is executed?',
    code: `String line = "a, b,c";
String[] parts = line.split(",");
System.out.println(parts.length + "[" + parts[1] + "]");`,
    choices: ['3[ b]', '3[b]', '4[ b]', '3[,b]'],
    answer: 0,
    explanation: 'split(",") cuts only at the commas, so the space after the first comma stays at the front of the second part: " b". Real data files often have spaces like this, which is why fields sometimes need trimming before they are compared.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-text-files-008',
    topic: 'text-files',
    difficulty: 3,
    prompt: 'What is printed when the following code segment is executed?',
    code: `String[] lines = {"Mon 12", "Tue 18", "Wed 15"};
String best = "";
int high = 0;
for (String line : lines) {
    String[] fields = line.split(" ");
    int temp = Integer.parseInt(fields[1]);
    if (temp > high) {
        high = temp;
        best = fields[0];
    }
}
System.out.println(best + " " + high);`,
    choices: ['Wed 15', 'Mon 12', 'Tue 15', 'Tue 18'],
    answer: 3,
    explanation: 'The loop keeps the highest temperature seen so far together with the day it belongs to, updating both at once. 18 on Tuesday beats 12, and 15 does not beat 18, so the result is Tue 18.',
    verify: 'output',
    reviewed: true,
  },
];
