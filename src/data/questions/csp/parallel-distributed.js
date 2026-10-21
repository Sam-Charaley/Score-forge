// AP CS Principles, Big Idea 4: sequential, parallel and distributed
// computing, run times and speedup.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
// verify: 'numeric' questions carry solve(), which works out the key.
const PROCESS_SECONDS = [40, 30, 50];
const sequentialTime = PROCESS_SECONDS.reduce((sum, s) => sum + s, 0);
// Best split of independent processes across two processors: try every
// assignment and keep the one whose busier processor finishes soonest.
function twoProcessorTime(times) {
  let best = Infinity;
  for (let mask = 0; mask < 2 ** times.length; mask++) {
    const loads = [0, 0];
    times.forEach((t, i) => { loads[(mask >> i) & 1] += t; });
    best = Math.min(best, Math.max(...loads));
  }
  return best;
}

export default [
  {
    id: 'csp-parallel-distributed-001',
    topic: 'parallel-distributed',
    difficulty: 1,
    prompt: 'Which best describes parallel computing?',
    choices: [
      'Running every step of a program one at a time, in order',
      'Storing a program on more than one hard drive',
      'Breaking a program into smaller operations, some of which run at the same time',
      'Sending a program\'s output to more than one screen',
    ],
    answer: 2,
    explanation: 'Parallel computing has a sequential part and a part where several operations run at the same time, often on multiple processors. Running every step in order is sequential computing.',
    reviewed: true,
  },
  {
    id: 'csp-parallel-distributed-002',
    topic: 'parallel-distributed',
    difficulty: 1,
    prompt: 'A research project uses thousands of volunteers\' home computers, connected over the Internet, to analyze data. Which is the main benefit of this distributed computing approach?',
    choices: [
      'It can solve problems that would take too long or need too much storage on a single computer',
      'It guarantees that no computer will ever fail',
      'It removes the need for any sequential steps',
      'It makes the data impossible to intercept',
    ],
    answer: 0,
    explanation: 'Distributed computing spreads work across many devices, so problems too large or too slow for one computer become possible. Individual machines can still fail, and communication between them adds its own cost.',
    reviewed: true,
  },
  {
    id: 'csp-parallel-distributed-003',
    topic: 'parallel-distributed',
    difficulty: 2,
    prompt: 'A computer must run three processes that take 40 seconds, 30 seconds and 50 seconds. It has one processor, so it runs them one after another. How long does it take to run all three?',
    choices: ['50 seconds', '40 seconds', '70 seconds', '120 seconds'],
    answer: 3,
    explanation: 'Sequential computing runs one process at a time, so the total time is the sum: 40 + 30 + 50 = 120 seconds. 50 seconds would be the time if all three could run at once.',
    verify: 'numeric',
    solve: () => sequentialTime,
    reviewed: true,
  },
  {
    id: 'csp-parallel-distributed-004',
    topic: 'parallel-distributed',
    difficulty: 2,
    prompt: 'The same three processes, taking 40, 30 and 50 seconds, are now run on a computer with two processors. The processes are independent, and each runs on only one processor. What is the shortest possible time to run all three?',
    choices: ['50 seconds', '60 seconds', '70 seconds', '120 seconds'],
    answer: 2,
    explanation: 'Put the 50-second process on one processor and the 40- and 30-second processes on the other. The second processor finishes last, at 40 + 30 = 70 seconds. Any other split is slower, and 60 seconds would need a process to be split in half, which is not allowed.',
    verify: 'numeric',
    solve: () => twoProcessorTime(PROCESS_SECONDS),
    reviewed: true,
  },
  {
    id: 'csp-parallel-distributed-005',
    topic: 'parallel-distributed',
    difficulty: 3,
    prompt: 'Running three processes takes 120 seconds sequentially and 70 seconds with the best parallel arrangement on two processors. What is the speedup of the parallel solution?',
    choices: ['1.71', '2.00', '0.58', '2.40'],
    answer: 0,
    explanation: 'Speedup is the sequential time divided by the parallel time: 120 / 70 ≈ 1.71. 2.00 would need the work split perfectly evenly, which these process lengths do not allow. 0.58 is the ratio upside down.',
    verify: 'numeric',
    solve: () => sequentialTime / twoProcessorTime(PROCESS_SECONDS),
    reviewed: true,
  },
  {
    id: 'csp-parallel-distributed-006',
    topic: 'parallel-distributed',
    difficulty: 3,
    prompt: 'A computer with two processors must run processes X (20 seconds), Y (30 seconds) and Z (25 seconds). Z cannot start until X has finished. Each process runs on only one processor. What is the shortest possible time to run all three?',
    choices: ['30 seconds', '45 seconds', '50 seconds', '75 seconds'],
    answer: 1,
    explanation: 'Run X and then Z on one processor (20 + 25 = 45 seconds) while Y runs on the other (30 seconds). Everything is done at 45 seconds. Z cannot start at time 0, so 30 seconds is impossible, and 75 seconds is the sequential time.',
    reviewed: true,
  },
  {
    id: 'csp-parallel-distributed-007',
    topic: 'parallel-distributed',
    difficulty: 2,
    prompt: 'A programmer moves a program from 4 processors to 8 processors, but the program does not run twice as fast. Which is the most likely explanation?',
    choices: [
      'Programs always run slower on more processors',
      'Parallel programs cannot use more than 4 processors',
      'The extra processors make the program\'s output incorrect',
      'Part of the program must run sequentially, and the processors also spend time coordinating with each other',
    ],
    answer: 3,
    explanation: 'The sequential part of a program takes the same time no matter how many processors there are, so it limits the speedup. Communication between processors adds overhead too. More processors usually help, just by less than the ratio.',
    reviewed: true,
  },
  {
    id: 'csp-parallel-distributed-008',
    topic: 'parallel-distributed',
    difficulty: 2,
    prompt: 'Which task would benefit MOST from parallel computing?',
    choices: [
      'Computing a running balance, where each day\'s balance depends on the day before',
      'Applying the same brightness filter to each of 10,000 separate photos',
      'Reading one short text message',
      'Following a recipe where each step uses the result of the previous step',
    ],
    answer: 1,
    explanation: 'Each photo can be filtered on its own, so the work splits cleanly across many processors. In the running balance and the recipe, each step depends on the one before, so the steps must happen in order.',
    reviewed: true,
  },
];
