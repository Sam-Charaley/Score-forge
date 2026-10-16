// AP Computer Science A: the Java Quick Reference (2025 edition), method by
// method, plus Java facts the exam expects you to know that it doesn't list.
// These entries use `code` instead of `tex`: they are shown as Java.
export default {
  subjectId: 'csa',
  sheet: {
    given: true,
    label: 'College Board AP Computer Science A Java Quick Reference (2025)',
    url: 'https://apcentral.collegeboard.org/media/pdf/ap-computer-science-a-java-quick-reference.pdf',
  },
  sections: [
    {
      id: 'string',
      title: 'String',
      formulas: [
        { id: 'string-constructor', name: 'Copy constructor', code: 'String(String str)', vars: [], note: 'A new String with the same characters as str.' },
        { id: 'string-length', name: 'Length', code: 'int length()', vars: [], note: 'Number of characters. The last index is length() - 1.' },
        { id: 'substring-range', name: 'Substring with an end', code: 'String substring(int from, int to)', vars: [], note: 'From index from up to to - 1. The end index is excluded.' },
        { id: 'substring-from', name: 'Substring to the end', code: 'String substring(int from)', vars: [], note: 'Same as substring(from, length()).' },
        { id: 'index-of', name: 'Find a substring', code: 'int indexOf(String str)', vars: [], note: 'Index of the first occurrence of str, or -1 if it isn\'t there.' },
        { id: 'string-equals', name: 'Compare contents', code: 'boolean equals(Object other)', vars: [], note: 'True if other has the same characters. Use this, not ==, which compares references.' },
        { id: 'compare-to', name: 'Alphabetical order', code: 'int compareTo(String other)', vars: [], note: 'Negative if this comes before other, 0 if equal, positive if after.' },
        { id: 'split', name: 'Split into parts', code: 'String[] split(String del)', vars: [], note: 'An array of the pieces between each match of del.' },
      ],
    },
    {
      id: 'wrappers',
      title: 'Integer and Double',
      formulas: [
        { id: 'int-limits', name: 'Integer limits', code: 'Integer.MIN_VALUE\nInteger.MAX_VALUE', vars: [], note: 'The smallest and largest int. Handy starting values when searching for a max or min.' },
        { id: 'parse-int', name: 'Text to int', code: 'static int parseInt(String s)', vars: [], note: 'Called as Integer.parseInt("42").' },
        { id: 'parse-double', name: 'Text to double', code: 'static double parseDouble(String s)', vars: [], note: 'Called as Double.parseDouble("3.5").' },
      ],
    },
    {
      id: 'math',
      title: 'Math',
      formulas: [
        { id: 'abs', name: 'Absolute value', code: 'static int abs(int x)\nstatic double abs(double x)', vars: [] },
        { id: 'pow', name: 'Power', code: 'static double pow(double base, double exponent)', vars: [], note: 'Returns a double, even for whole numbers: Math.pow(2, 3) is 8.0.' },
        { id: 'sqrt', name: 'Square root', code: 'static double sqrt(double x)', vars: [], note: 'The nonnegative square root.' },
        { id: 'random', name: 'Random number', code: 'static double random()', vars: [], note: 'A double from 0.0 up to but not including 1.0.' },
      ],
    },
    {
      id: 'arraylist',
      title: 'ArrayList',
      formulas: [
        { id: 'size', name: 'Size', code: 'int size()', vars: [], note: 'Arrays use .length (no parentheses), Strings use length(), ArrayLists use size().' },
        { id: 'add-end', name: 'Add to the end', code: 'boolean add(E obj)', vars: [], note: 'Appends obj and returns true.' },
        { id: 'add-at', name: 'Insert at an index', code: 'void add(int index, E obj)', vars: [], note: 'Shifts elements at index and after to the right. index can be from 0 to size().' },
        { id: 'get', name: 'Read an element', code: 'E get(int index)', vars: [] },
        { id: 'set', name: 'Replace an element', code: 'E set(int index, E obj)', vars: [], note: 'Returns the element that was there before.' },
        { id: 'remove', name: 'Remove at an index', code: 'E remove(int index)', vars: [], note: 'Shifts later elements left and returns the removed one. When removing in a loop, go backward or don\'t advance i after a removal.' },
      ],
    },
    {
      id: 'files',
      title: 'File and Scanner',
      formulas: [
        { id: 'file', name: 'Open a file', code: 'File(String pathname)\nScanner(File f)', vars: [], note: 'Create a File from a path, then a Scanner to read it.' },
        { id: 'next-number', name: 'Read numbers and booleans', code: 'int nextInt()\ndouble nextDouble()\nboolean nextBoolean()', vars: [], note: 'Throws InputMismatchException if the next item is the wrong type.' },
        { id: 'next-text', name: 'Read text', code: 'String next()\nString nextLine()', vars: [], note: 'next() reads one word. nextLine() reads the rest of the line, and can return "" right after another Scanner read.' },
        { id: 'has-next', name: 'Check for more input', code: 'boolean hasNext()', vars: [], note: 'The usual loop condition: while (scanner.hasNext()).' },
        { id: 'close', name: 'Close', code: 'void close()', vars: [] },
      ],
    },
    {
      id: 'object',
      title: 'Object',
      formulas: [
        { id: 'object-methods', name: 'Methods every class has', code: 'boolean equals(Object other)\nString toString()', vars: [], note: 'Override toString() to control what printing an object shows.' },
      ],
    },
    {
      id: 'not-listed',
      title: 'Not on the reference',
      formulas: [
        { id: 'integer-division', name: 'Integer division and remainder', code: '7 / 2   // 3\n7 % 2   // 1\n7.0 / 2 // 3.5', vars: [], note: 'int / int drops the decimal. % gives the remainder: n % 2 == 0 tests for even.', memorize: true },
        { id: 'casting', name: 'Casting and rounding', code: '(int) 3.9            // 3\n(int) (x + 0.5)      // rounds positive x\n(double) a / b       // real division', vars: [], note: 'Casting to int truncates toward zero.', memorize: true },
        { id: 'random-range', name: 'Random int in a range', code: '(int) (Math.random() * (max - min + 1)) + min', vars: [], note: 'Gives an int from min to max, inclusive.', memorize: true },
        { id: 'char-at', name: 'One character as a String', code: 'str.substring(i, i + 1)', vars: [], note: 'The AP subset uses substring for single characters.', memorize: true },
        { id: 'array-basics', name: 'Arrays', code: 'int[] nums = new int[5];   // all 0\nnums.length\nint[][] grid = new int[rows][cols];\ngrid.length      // rows\ngrid[0].length   // columns', vars: [], note: 'Indexes run from 0 to length - 1. Going past that throws ArrayIndexOutOfBoundsException.', memorize: true },
        { id: 'wrapper-boxing', name: 'ArrayList of primitives', code: 'ArrayList<Integer> list = new ArrayList<Integer>();', vars: [], note: 'ArrayLists hold objects, so use Integer and Double. Java converts to and from int and double automatically.', memorize: true },
      ],
    },
  ],
};
