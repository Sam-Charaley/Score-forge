// AP CS Principles free-response practice: the written-response questions
// about a Create performance task program. On the exam students answer about
// their own program; here each FRQ gives a sample program written for
// ScoreForge, in AP exam reference sheet pseudocode, and asks about that.
// Two FRQs per written-response type, each type once per sample program.
// FRQ ids are permanent once reviewed: saved self-checks point at them.
// Rubric point ids are permanent too: saved scores list the ones earned.

export const FRQ_TYPES = {
  design: 'Program Design, Function, and Purpose',
  algorithm: 'Algorithm Development',
  testing: 'Errors and Testing',
  abstraction: 'Data and Procedural Abstraction',
};

const WORKOUT_PROGRAM = {
  label: 'Program code',
  text: `PROCEDURE countLongWorkouts(workouts, goal)
{
   count ← 0
   FOR EACH minutes IN workouts
   {
      IF(minutes ≥ goal)
      {
         count ← count + 1
      }
   }
   RETURN(count)
}

minutesList ← []
entry ← INPUT()
REPEAT UNTIL(entry = 0)
{
   IF(entry > 0)
   {
      APPEND(minutesList, entry)
   }
   entry ← INPUT()
}
DISPLAY("Workouts of 30 minutes or more:")
DISPLAY(countLongWorkouts(minutesList, 30))`,
  citation: 'Written for ScoreForge',
};

const WORKOUT_INTRO = 'A student wrote this workout tracker for the Create performance task. The user types the length of each workout in minutes, one at a time, and types 0 when finished. Negative entries are ignored. The program then displays how many workouts lasted at least 30 minutes. Answer as if this were your own program.';

const QUIZ_PROGRAM = {
  label: 'Program code',
  text: `answerKey ← ["B", "D", "A", "C", "B"]

PROCEDURE scoreQuiz(responses)
{
   correct ← 0
   i ← 1
   REPEAT LENGTH(answerKey) TIMES
   {
      IF(responses[i] = answerKey[i])
      {
         correct ← correct + 1
      }
      i ← i + 1
   }
   RETURN(correct)
}

studentAnswers ← []
REPEAT LENGTH(answerKey) TIMES
{
   APPEND(studentAnswers, INPUT())
}
score ← scoreQuiz(studentAnswers)
IF(score ≥ 4)
{
   DISPLAY("Great job!")
}
DISPLAY(score)`,
  citation: 'Written for ScoreForge',
};

const QUIZ_INTRO = 'A student wrote this practice quiz for the Create performance task. The user types an answer letter for each of the five questions, in order. The program counts how many answers match the answer key, displays "Great job!" for a score of 4 or more, and then displays the score. Answer as if this were your own program.';

export default [
  {
    id: 'csp-frq-design-001',
    type: 'design',
    title: 'Workout tracker: users, input and output',
    intro: WORKOUT_INTRO,
    sources: [WORKOUT_PROGRAM],
    reviewed: true,
    parts: [
      {
        id: 'a',
        prompt: 'Identify an expected group of users of this program. Describe one way the program\'s design meets a need of that group.',
        solution: 'An expected group of users is people trying to build an exercise habit who aim for workouts of at least 30 minutes. They need to know how often they reach that target. The program meets this need by counting only the workouts of 30 minutes or more and displaying that count, so the user sees right away how many workouts met the goal without adding them up by hand.',
        points: [
          { id: 'a1', text: 'Identifies a specific, plausible group of users' },
          { id: 'a2', text: 'Describes a feature that is actually in the program (for example, counting workouts of 30 minutes or more)' },
          { id: 'a3', text: 'Explains how that feature meets a need of the group identified' },
        ],
      },
      {
        id: 'b',
        prompt: 'Describe the input the program accepts and the output it produces. Explain how the input affects the output.',
        solution: 'The input is a series of numbers typed by the user with INPUT(), each the length of a workout in minutes, ending with 0. The output is the message and the number displayed at the end: how many workouts were 30 minutes or longer. Each positive entry is added to minutesList, and every entry of 30 or more adds one to the displayed count. For example, entering 45, 20, 30 and then 0 displays 2.',
        points: [
          { id: 'b1', text: 'Identifies the input as workout lengths typed by the user, ending with 0' },
          { id: 'b2', text: 'Identifies the output as the displayed count of workouts of 30 minutes or more' },
          { id: 'b3', text: 'Explains how different inputs change the output, for example with a specific set of inputs and the result' },
        ],
      },
    ],
  },
  {
    id: 'csp-frq-design-002',
    type: 'design',
    title: 'Practice quiz: purpose, function and improvement',
    intro: QUIZ_INTRO,
    sources: [QUIZ_PROGRAM],
    reviewed: true,
    parts: [
      {
        id: 'a',
        prompt: 'Describe the purpose of the program. Then describe its function, and explain how the function is different from the purpose.',
        solution: 'The purpose is to help students check their understanding before a test by giving them quick feedback on a practice quiz. The function is what the program does: it takes five answer letters as input, compares each one to the answer key, counts the matches, displays "Great job!" if at least 4 are correct, and displays the score. The purpose is why the program exists (the problem it helps solve), while the function is the behavior it carries out to serve that purpose.',
        points: [
          { id: 'a1', text: 'Describes a purpose: the problem the program solves or the goal it serves, not just what it does' },
          { id: 'a2', text: 'Describes the function: the inputs, the processing and the outputs of the program' },
          { id: 'a3', text: 'Explains that purpose is why the program exists and function is what it does' },
        ],
      },
      {
        id: 'b',
        prompt: 'After testing, users say they want to know which questions they got wrong, not just their score. Describe one change to the program that meets this need, including what new output would be shown and where in the code the change would go.',
        solution: 'Inside the loop in scoreQuiz, add an ELSE branch to the IF statement. When responses[i] does not equal answerKey[i], it would display the question number i, so the user sees a list of the questions they missed, for example "2 5". Because the loop already visits every question in order with the index i, the change only needs the ELSE branch and a DISPLAY(i) statement inside it.',
        points: [
          { id: 'b1', text: 'Describes a change that would actually show which questions were answered incorrectly' },
          { id: 'b2', text: 'Identifies where in the code the change goes (for example, an ELSE branch on the IF inside scoreQuiz\'s loop)' },
          { id: 'b3', text: 'Describes the new output the user would see' },
        ],
      },
    ],
  },
  {
    id: 'csp-frq-algorithm-001',
    type: 'algorithm',
    title: 'Workout tracker: loops and conditions',
    intro: WORKOUT_INTRO,
    sources: [WORKOUT_PROGRAM],
    reviewed: true,
    parts: [
      {
        id: 'a',
        prompt: 'Suppose minutesList is [45, 20, 30] when countLongWorkouts(minutesList, 30) is called. How many times does the body of the FOR EACH loop run, and what value does the procedure return? Explain your answer by tracing the loop.',
        solution: 'The loop body runs 3 times, once for each element. For 45, 45 ≥ 30 is true, so count becomes 1. For 20, 20 ≥ 30 is false, so count stays 1. For 30, 30 ≥ 30 is true, so count becomes 2. The procedure returns 2.',
        points: [
          { id: 'a1', text: 'States that the loop body runs 3 times, once per element' },
          { id: 'a2', text: 'States that the procedure returns 2' },
          { id: 'a3', text: 'Traces each element through the condition, including that 30 counts because the comparison is ≥' },
        ],
      },
      {
        id: 'b',
        prompt: 'Describe a condition or error that would cause the REPEAT UNTIL loop in the main program to never stop.',
        solution: 'The loop only stops when entry equals 0. If the user never types 0, the loop keeps asking for input forever. The same thing would happen because of a coding error if the statement entry ← INPUT() were removed from the loop body, since entry would then never change after the first input and, unless the first input was 0, the condition entry = 0 would never become true.',
        points: [
          { id: 'b1', text: 'Describes a specific condition or code error that keeps the loop from ending' },
          { id: 'b2', text: 'Explains why, by referring to the stopping condition entry = 0 never becoming true' },
        ],
      },
      {
        id: 'c',
        prompt: 'A user wants the program to display the total number of minutes spent in workouts of at least 30 minutes, instead of how many such workouts there were. Describe how to change countLongWorkouts to do this.',
        solution: 'Keep the loop and the condition the same. Inside the IF, change count ← count + 1 to count ← count + minutes, so that the length of each qualifying workout is added instead of 1. The procedure would then return the total minutes, for example 75 for [45, 20, 30]. Renaming count to total would make the code clearer.',
        points: [
          { id: 'c1', text: 'Keeps the iteration over every workout and the selection with minutes ≥ goal' },
          { id: 'c2', text: 'Adds the workout\'s minutes to the running total instead of adding 1' },
          { id: 'c3', text: 'Returns the total after the loop has finished' },
        ],
      },
    ],
  },
  {
    id: 'csp-frq-algorithm-002',
    type: 'algorithm',
    title: 'Practice quiz: how scoreQuiz works',
    intro: QUIZ_INTRO,
    sources: [QUIZ_PROGRAM],
    reviewed: true,
    parts: [
      {
        id: 'a',
        prompt: 'Describe in detailed steps how scoreQuiz finds its result, in enough detail that someone else could write the procedure from your description.',
        solution: 'First, set a counter correct to 0 and an index i to 1. Then repeat once for each question in answerKey: compare the user\'s answer at position i in responses with the key\'s answer at the same position. If they are equal, add 1 to correct. Either way, add 1 to i to move to the next question. After every question has been checked, return correct, the number of matching answers.',
        points: [
          { id: 'a1', text: 'Describes setting up the counter (starting at 0) and the index (starting at 1)' },
          { id: 'a2', text: 'Describes repeating once per question and comparing the answers at the same position' },
          { id: 'a3', text: 'Describes adding 1 to the counter only when the answers match, and moving the index forward each time' },
          { id: 'a4', text: 'Describes returning the count after all questions are checked' },
        ],
      },
      {
        id: 'b',
        prompt: 'Suppose the condition in scoreQuiz is changed to responses[i] ≠ answerKey[i]. Describe what the procedure would then return, and explain how the rest of the program\'s behavior would change for a user who answers B, D, A, C, A.',
        solution: 'With ≠, the procedure counts answers that do not match the key, so it returns the number of wrong answers. For B, D, A, C, A only the last answer differs from the key, so it returns 1 instead of 4. The program would display 1, and it would not display "Great job!" because 1 is not at least 4, even though the user did well.',
        points: [
          { id: 'b1', text: 'States that the procedure would return the number of incorrect answers' },
          { id: 'b2', text: 'Correctly finds the returned value for this user (1)' },
          { id: 'b3', text: 'Explains the effect on the output: 1 is displayed and "Great job!" is not' },
        ],
      },
    ],
  },
  {
    id: 'csp-frq-testing-001',
    type: 'testing',
    title: 'Workout tracker: testing countLongWorkouts',
    intro: WORKOUT_INTRO,
    sources: [WORKOUT_PROGRAM],
    reviewed: true,
    parts: [
      {
        id: 'a',
        prompt: 'Describe two calls to countLongWorkouts that would cause different parts of the procedure\'s code to run. For each call, give the arguments, the expected return value, and which part of the code runs differently.',
        solution: 'First call: countLongWorkouts([40, 50], 30). Both elements are at least 30, so the body of the IF statement runs for each one and count is increased twice. It is expected to return 2. Second call: countLongWorkouts([10, 15], 30). Neither element is at least 30, so the IF condition is false both times, the body of the IF never runs, and the procedure is expected to return 0.',
        points: [
          { id: 'a1', text: 'Gives two calls with specific arguments for both parameters' },
          { id: 'a2', text: 'Gives the correct expected return value for each call' },
          { id: 'a3', text: 'Explains that in one call the body of the IF statement runs and in the other it does not' },
        ],
      },
      {
        id: 'b',
        prompt: 'Suppose the condition in countLongWorkouts were mistakenly written as minutes > goal. Describe a test case that would reveal this error, and explain how the actual result would differ from the expected result.',
        solution: 'Test countLongWorkouts([30], 30). A 30-minute workout meets the goal, so the expected result is 1. With minutes > goal, the condition 30 > 30 is false, so the procedure would return 0. The test works because it uses a value exactly equal to goal, which is the only case where > and ≥ give different results.',
        points: [
          { id: 'b1', text: 'Gives a test case that includes a workout exactly equal to goal' },
          { id: 'b2', text: 'States the expected result and the different actual result with the error' },
          { id: 'b3', text: 'Explains that a boundary value is needed because > and ≥ only differ when the two values are equal' },
        ],
      },
    ],
  },
  {
    id: 'csp-frq-testing-002',
    type: 'testing',
    title: 'Practice quiz: errors and boundary tests',
    intro: QUIZ_INTRO,
    sources: [QUIZ_PROGRAM],
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'Another programmer reuses scoreQuiz and calls it with a list of only 3 responses. Describe the error that would occur and why. Then describe one way to change scoreQuiz to prevent it.',
        solution: 'The loop runs LENGTH(answerKey) = 5 times, so on the fourth pass it reads responses[4], but the list only has elements at indices 1 to 3. Accessing an index outside the list is a run-time error that stops the program. To prevent it, scoreQuiz could check LENGTH(responses) first and only compare positions that exist in both lists, for example by repeating the loop only while i ≤ LENGTH(responses) and i ≤ LENGTH(answerKey), so missing answers simply count as not correct.',
        points: [
          { id: 'a1', text: 'Identifies the error as an index out of range (run-time) error' },
          { id: 'a2', text: 'Explains that the loop runs 5 times but responses has only 3 elements' },
          { id: 'a3', text: 'Describes a change that keeps the loop from accessing an index past the end of responses' },
        ],
      },
      {
        id: 'b',
        prompt: 'The programmer wants to test that "Great job!" is displayed for scores of 4 or 5 and not for lower scores. Which two scores are the most important to test, and why? Give a set of answers that produces each one.',
        solution: 'Test a score of 4 and a score of 3, the values on each side of the boundary in score ≥ 4. Answers B, D, A, C, A give 4 correct, so "Great job!" should be displayed along with 4. Answers B, D, A, A, A give 3 correct, so only 3 should be displayed. If the condition had been written as score > 4 by mistake, the first test would catch it.',
        points: [
          { id: 'b1', text: 'Chooses scores of 4 and 3, the values on each side of the condition score ≥ 4' },
          { id: 'b2', text: 'Gives a set of answers that produces each score (checked against the key B, D, A, C, B)' },
          { id: 'b3', text: 'States the expected output for each test' },
        ],
      },
    ],
  },
  {
    id: 'csp-frq-abstraction-001',
    type: 'abstraction',
    title: 'Workout tracker: the list and the procedure',
    intro: WORKOUT_INTRO,
    sources: [WORKOUT_PROGRAM],
    reviewed: true,
    parts: [
      {
        id: 'a',
        prompt: 'Identify the list used in the program and describe what the data in it represents. Explain how using this list manages complexity, including how the program would have to be written differently without it.',
        solution: 'The list is minutesList. Each element is the length in minutes of one workout the user entered, so the whole list represents the user\'s workout history. Because all workouts are stored under one name, the program can accept any number of workouts and process them with a single FOR EACH loop. Without the list, the program would need a separate variable for every workout, would have to limit how many workouts a user could enter, and would need a separate comparison for each variable.',
        points: [
          { id: 'a1', text: 'Identifies minutesList and states that each element is the length of one workout in minutes' },
          { id: 'a2', text: 'Explains that the list lets the program store and process any number of workouts with one loop' },
          { id: 'a3', text: 'Describes how the program would be harder to write without the list (for example, a separate variable and comparison for each workout, and a fixed limit)' },
        ],
      },
      {
        id: 'b',
        prompt: 'Explain how the procedure countLongWorkouts and its parameter goal contribute to the program\'s functionality, and how the procedure manages complexity.',
        solution: 'countLongWorkouts does the counting: it returns how many workouts in the list are at least goal minutes, and the main program displays that number. The parameter goal means the same procedure works for any target. The program uses 30, but it could call countLongWorkouts(minutesList, 45) for a harder goal without writing new code. Putting the counting in a named procedure also separates it from the input loop, so it can be reused, tested on its own and changed in one place.',
        points: [
          { id: 'b1', text: 'Explains what the procedure does for the program: counting the workouts that meet the goal, which is then displayed' },
          { id: 'b2', text: 'Explains that the parameter goal lets the same procedure work for different targets' },
          { id: 'b3', text: 'Explains a way the procedure manages complexity, such as reuse, testing on its own or changing code in one place' },
        ],
      },
    ],
  },
  {
    id: 'csp-frq-abstraction-002',
    type: 'abstraction',
    title: 'Practice quiz: the answer key and scoreQuiz',
    intro: QUIZ_INTRO,
    sources: [QUIZ_PROGRAM],
    reviewed: true,
    parts: [
      {
        id: 'a',
        prompt: 'The teacher wants to add a sixth question whose correct answer is "D". Describe the change needed and explain why the list answerKey makes this change simple.',
        solution: 'Only the list needs to change: add "D" to the end, so answerKey is ["B", "D", "A", "C", "B", "D"]. Both loops repeat LENGTH(answerKey) times, so the program automatically asks for six answers and checks all six. Without the list, each question would have its own variable and its own IF statement, and adding a question would mean adding code in several places.',
        points: [
          { id: 'a1', text: 'States that "D" is added to the end of answerKey and nothing else needs to change' },
          { id: 'a2', text: 'Explains that the loops use LENGTH(answerKey), so they adjust to the new length automatically' },
          { id: 'a3', text: 'Contrasts this with the extra variables and statements needed without a list' },
        ],
      },
      {
        id: 'b',
        prompt: 'Explain how scoreQuiz is an example of procedural abstraction. Describe one way the procedure could be reused in a different part of the program or in a different program.',
        solution: 'scoreQuiz hides the details of comparing answers behind a name and a parameter. The main program only needs to know that it takes a list of responses and returns how many are correct, not how the loop works. Because the responses come in as a parameter, the same procedure could score many students: a teacher\'s version of the program could call scoreQuiz once for each student\'s list of answers and display a score for each one, without copying the comparison code.',
        points: [
          { id: 'b1', text: 'Explains that callers use scoreQuiz by knowing what it does (its parameter and return value), not how it works' },
          { id: 'b2', text: 'Explains the role of the parameter responses in making the procedure general' },
          { id: 'b3', text: 'Describes a specific reuse, such as scoring several students\' answer lists' },
        ],
      },
    ],
  },
];
