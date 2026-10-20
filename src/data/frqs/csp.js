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
    reviewed: false,
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
    reviewed: false,
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
    reviewed: false,
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
    reviewed: false,
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
];
