// AP CS Principles, Big Idea 3: RANDOM(a, b) and simulations.
// Code uses the AP CSP exam reference sheet pseudocode. RANDOM(a, b) returns
// a random integer from a to b, including both ends, each equally likely.
// Question ids are permanent once a question is reviewed: attempts point at them.
// If you change what a question asks, give it a new id instead of editing it.
export default [
  {
    id: 'csp-simulations-001',
    topic: 'simulations',
    difficulty: 1,
    prompt: 'Which values can RANDOM(1, 6) return?',
    choices: ['Any integer from 0 to 6', 'Any integer from 1 to 5', 'Any integer from 1 to 6', 'Any number between 1 and 6, including decimals'],
    answer: 2,
    explanation: 'RANDOM(a, b) returns an integer from a to b, and both ends are included, so the possible values are 1, 2, 3, 4, 5 and 6, each equally likely. It never returns decimals.',
    reviewed: true,
  },
  {
    id: 'csp-simulations-002',
    topic: 'simulations',
    difficulty: 1,
    prompt: 'Engineers use a computer simulation to test how a bridge design holds up in an earthquake, instead of building the bridge and waiting for an earthquake. Which is the best reason to use a simulation here?',
    choices: [
      'Testing the real bridge this way would be dangerous, expensive and slow',
      'A simulation always gives exactly the same results as the real world',
      'Simulations do not need any data about the bridge',
      'A simulation removes all bias from the design',
    ],
    answer: 0,
    explanation: 'Simulations let people test ideas when real experiments would be unsafe, too costly or take too long. They are simplified models, so their results are only as good as the assumptions built into them.',
    reviewed: true,
  },
  {
    id: 'csp-simulations-003',
    topic: 'simulations',
    difficulty: 2,
    prompt: 'A game should give a player a bonus 30% of the time. Which expression is true with a probability of exactly 30%?',
    choices: ['RANDOM(1, 10) < 3', 'RANDOM(1, 10) ≤ 3', 'RANDOM(0, 10) ≤ 3', 'RANDOM(1, 3) = 1'],
    answer: 1,
    explanation: 'RANDOM(1, 10) has 10 equally likely results, and 3 of them (1, 2 and 3) are at most 3, so the chance is 3/10. Using < 3 allows only 2 of the 10, RANDOM(0, 10) has 11 results so ≤ 3 gives 4/11, and RANDOM(1, 3) = 1 is 1/3.',
    reviewed: true,
  },
  {
    id: 'csp-simulations-004',
    topic: 'simulations',
    difficulty: 2,
    prompt: 'Which value could NOT be displayed when the following code segment is run?',
    code: `x ← RANDOM(1, 3)
y ← RANDOM(1, 3)
DISPLAY(x + y)`,
    choices: ['1', '2', '4', '6'],
    answer: 0,
    explanation: 'Each variable is at least 1, so the smallest possible sum is 1 + 1 = 2 and the largest is 3 + 3 = 6. A sum of 1 is impossible.',
    reviewed: true,
  },
  {
    id: 'csp-simulations-005',
    topic: 'simulations',
    difficulty: 2,
    prompt: 'A city builds a simulation of traffic at an intersection to decide how long its traffic lights should stay green. The simulation ignores the color and brand of each car. Which statement about this simulation is most accurate?',
    choices: [
      'The simulation is useless because it leaves out real-world details',
      'The simulation will predict traffic perfectly',
      'The simulation cannot use random numbers',
      'Leaving out details that do not affect traffic flow is a reasonable simplification, but choices about what to include can still bias the results',
    ],
    answer: 3,
    explanation: 'A simulation is an abstraction that keeps only the details that matter for its question. Car color does not affect how long cars wait. The people who build a simulation still decide what to include, so the model can be biased if it leaves out something that does matter.',
    reviewed: true,
  },
  {
    id: 'csp-simulations-006',
    topic: 'simulations',
    difficulty: 3,
    prompt: 'What is the probability that count is 0 after the following code segment is run?',
    code: `count ← 0
REPEAT 2 TIMES
{
   IF(RANDOM(1, 4) = 1)
   {
      count ← count + 1
   }
}`,
    choices: ['1/16', '1/2', '9/16', '3/4'],
    answer: 2,
    explanation: 'count stays 0 only if RANDOM(1, 4) is not 1 both times. Each time that chance is 3/4, and the two calls are independent, so the probability is 3/4 × 3/4 = 9/16. 1/2 comes from subtracting 1/4 twice from 1.',
    verify: 'exact',
    solve: () => (3 / 4) ** 2,
    reviewed: true,
  },
  {
    id: 'csp-simulations-007',
    topic: 'simulations',
    difficulty: 3,
    prompt: 'A program needs a random even number from 2 to 20, including 2 and 20, with each even number equally likely. Which expression does this?',
    choices: ['RANDOM(2, 20)', '2 * RANDOM(1, 10)', '2 * RANDOM(2, 20)', 'RANDOM(1, 10) + 10'],
    answer: 1,
    explanation: 'RANDOM(1, 10) picks one of 1 to 10, and doubling it gives one of 2, 4, ..., 20, each equally likely. RANDOM(2, 20) can return odd numbers, 2 * RANDOM(2, 20) ranges from 4 to 40, and RANDOM(1, 10) + 10 gives 11 to 20.',
    reviewed: true,
  },
  {
    id: 'csp-simulations-008',
    topic: 'simulations',
    difficulty: 2,
    prompt: 'Which statement is true about the value displayed when the following code segment is run?',
    code: `spins ← 0
REPEAT UNTIL(RANDOM(1, 5) = 5)
{
   spins ← spins + 1
}
DISPLAY(spins)`,
    choices: [
      'It is always 5',
      'It is always between 1 and 5',
      'It is always between 0 and 4',
      'It can be 0 or any positive integer',
    ],
    answer: 3,
    explanation: 'A new random number is drawn every time the condition is checked. If the first draw is 5, the body never runs and 0 is displayed. Otherwise the loop keeps going until a 5 appears, which could take any number of tries, so there is no upper limit.',
    reviewed: true,
  },
];
