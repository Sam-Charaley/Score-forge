// Topic: 2D arrays (Unit 4). Feeds FRQ 4, 2D Array.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
export default [
  {
    id: 'csa-2d-arrays-001',
    topic: '2d-arrays',
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int[][] grid = {{1, 2, 3}, {4, 5, 6}};
System.out.println(grid[1][0] + grid[0][2]);`,
    choices: ['7', '5', '9', '8'],
    answer: 0,
    explanation: 'The first index picks the row and the second picks the column, both starting at 0. grid[1][0] is row 1, column 0, which is 4. grid[0][2] is row 0, column 2, which is 3. 4 + 3 = 7.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-2d-arrays-002',
    topic: '2d-arrays',
    formulas: ['array-basics'],
    difficulty: 1,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int[][] m = new int[3][5];
System.out.println(m.length + " " + m[0].length);`,
    choices: ['5 3', '15 5', '3 3', '3 5'],
    answer: 3,
    explanation: 'new int[3][5] makes 3 rows with 5 columns each. m.length is the number of rows, 3. m[0] is the first row, and its length is the number of columns, 5.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-2d-arrays-003',
    topic: '2d-arrays',
    formulas: ['array-basics'],
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int[][] g = {{2, 4}, {6, 8}, {1, 3}};
int total = 0;
for (int r = 0; r < g.length; r++) {
    total += g[r][1];
}
System.out.println(total);`,
    choices: ['9', '15', '12', '27'],
    answer: 1,
    explanation: 'The loop goes down the rows and always reads column 1, the second number in each row: 4 + 8 + 3 = 15. Keeping the column fixed while the row changes adds up one column.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-2d-arrays-004',
    topic: '2d-arrays',
    formulas: ['array-basics'],
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int[][] g = {{1, 2}, {3, 4}};
for (int c = 0; c < g[0].length; c++) {
    for (int r = 0; r < g.length; r++) {
        System.out.print(g[r][c] + " ");
    }
}`,
    choices: ['1 2 3 4', '2 4 1 3', '1 3 2 4', '1 3 4 2'],
    answer: 2,
    explanation: 'The outer loop is over columns, so this is column-major order: all of column 0 (1, 3), then all of column 1 (2, 4). Row-major order, with rows in the outer loop, would print 1 2 3 4.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-2d-arrays-005',
    topic: '2d-arrays',
    formulas: ['integer-division'],
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int[][] g = {{1, 2, 3}, {4, 5, 6}};
int count = 0;
for (int[] row : g) {
    for (int value : row) {
        if (value % 2 == 0) {
            count++;
        }
    }
}
System.out.println(count);`,
    choices: ['3', '2', '6', '4'],
    answer: 0,
    explanation: 'The outer enhanced for loop takes each row, which is an int[], and the inner one takes each value in that row. That visits all six numbers. The even ones are 2, 4 and 6, so count is 3.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-2d-arrays-006',
    topic: '2d-arrays',
    formulas: ['array-basics'],
    difficulty: 3,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int[][] g = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
for (int i = 0; i < g.length; i++) {
    g[i][i] = 0;
}
int sum = 0;
for (int[] row : g) {
    for (int value : row) {
        sum += value;
    }
}
System.out.println(sum);`,
    choices: ['45', '15', '36', '30'],
    answer: 3,
    explanation: 'g[i][i] is the main diagonal: g[0][0], g[1][1] and g[2][2], which hold 1, 5 and 9. Setting them to 0 removes 15 from the total of 45, leaving 30.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-2d-arrays-007',
    topic: '2d-arrays',
    formulas: ['array-basics'],
    difficulty: 2,
    prompt: 'What is printed when the following code segment is executed?',
    code: `int[][] g = {{3, 9, 4}, {7, 2, 8}};
int[] best = new int[g.length];
for (int r = 0; r < g.length; r++) {
    best[r] = g[r][0];
    for (int c = 1; c < g[r].length; c++) {
        if (g[r][c] > best[r]) {
            best[r] = g[r][c];
        }
    }
}
System.out.println(best[0] + " " + best[1]);`,
    choices: ['9 9', '9 8', '4 8', '3 7'],
    answer: 1,
    explanation: 'For each row, best[r] starts at the first value and is replaced whenever a bigger value turns up, so it ends as that row\'s largest value. Row 0 is 3, 9, 4, so 9. Row 1 is 7, 2, 8, so 8. The search restarts for every row.',
    verify: 'output',
    reviewed: true,
  },
  {
    id: 'csa-2d-arrays-008',
    topic: '2d-arrays',
    formulas: ['array-basics'],
    difficulty: 3,
    prompt: 'What happens when the following code segment is executed?',
    code: `int[][] g = new int[4][6];
for (int r = 0; r < g[0].length; r++) {
    for (int c = 0; c < g.length; c++) {
        g[r][c] = r + c;
    }
}`,
    choices: ['Every element of g is set to r + c', 'Only the first 4 columns are set; the rest stay 0', 'An ArrayIndexOutOfBoundsException is thrown', 'The code does not compile'],
    answer: 2,
    explanation: 'The loop bounds are swapped. g has 4 rows and 6 columns, but r runs up to g[0].length, which is 6. Rows 0 to 3 work, then g[4] does not exist and the exception is thrown. The row loop should use g.length and the column loop should use g[r].length.',
    reviewed: true,
  },
];
