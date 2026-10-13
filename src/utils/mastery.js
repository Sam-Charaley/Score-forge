// Elo-style mastery: the student has a rating per topic, each question has a
// rating from its difficulty, and every attempt nudges the student's rating
// by how surprising the result was. Ratings are rebuilt from the attempt
// history, so this is a pure function of the attempts.

export const ELO = {
  initialRating: 1500,
  // Question ratings come from authored difficulty until there is enough
  // cross-student data to calibrate them (a later, server-side job).
  questionRatingByDifficulty: { 1: 1300, 2: 1500, 3: 1700 },
  // 400 is the classic Elo scale: a 400-point gap means 10:1 odds.
  scale: 400,
  // Early attempts move the rating a lot; it settles as evidence builds up.
  maxK: 48,
  minK: 16,
  kHalfLifeAttempts: 10,
};

// Below this many attempts on a topic, the rating is too noisy to label.
export const MIN_ATTEMPTS_FOR_LEVEL = 5;

const MEDIUM_QUESTION_RATING = ELO.questionRatingByDifficulty[2];

export const MASTERY_LEVELS = [
  { id: 'needs-work', label: 'Needs work', minChance: 0 },
  { id: 'developing', label: 'Developing', minChance: 0.4 },
  { id: 'proficient', label: 'Proficient', minChance: 0.6 },
  { id: 'strong', label: 'Strong', minChance: 0.8 },
];

export function questionRating(difficulty) {
  return ELO.questionRatingByDifficulty[difficulty] ?? MEDIUM_QUESTION_RATING;
}

// Probability the student answers correctly, given both ratings.
export function expectedScore(studentRating, itemRating) {
  return 1 / (1 + 10 ** ((itemRating - studentRating) / ELO.scale));
}

// K shrinks smoothly from maxK toward minK as attempts on the topic grow.
export function kFactor(priorAttempts) {
  const { maxK, minK, kHalfLifeAttempts } = ELO;
  return minK + (maxK - minK) * (kHalfLifeAttempts / (kHalfLifeAttempts + priorAttempts));
}

function emptyStats() {
  return { rating: ELO.initialRating, attempts: 0, correct: 0, lastAttemptAt: null };
}

function applyAttempt(stats, attempt) {
  const expected = expectedScore(stats.rating, questionRating(attempt.difficulty));
  const actual = attempt.correct ? 1 : 0;
  return {
    rating: stats.rating + kFactor(stats.attempts) * (actual - expected),
    attempts: stats.attempts + 1,
    correct: stats.correct + actual,
    lastAttemptAt: attempt.created_at ?? stats.lastAttemptAt,
  };
}

// attempts: rows with { topic_id, difficulty, correct, created_at }, oldest first.
// Returns an overall rating plus one per topic.
export function computeMastery(attempts) {
  let overall = emptyStats();
  const topics = {};
  for (const attempt of attempts) {
    overall = applyAttempt(overall, attempt);
    topics[attempt.topic_id] = applyAttempt(topics[attempt.topic_id] ?? emptyStats(), attempt);
  }
  return { overall, topics };
}

// Chance of getting a medium question right: easier to read than a raw rating.
export function chanceOnMediumQuestion(rating) {
  return expectedScore(rating, MEDIUM_QUESTION_RATING);
}

export function masteryLevel(stats) {
  if (!stats || stats.attempts < MIN_ATTEMPTS_FOR_LEVEL) return null;
  const chance = chanceOnMediumQuestion(stats.rating);
  return [...MASTERY_LEVELS].reverse().find(level => chance >= level.minChance);
}
