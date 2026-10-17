// Numbers for the Progress page, all rebuilt from the saved attempts.
// Pure functions: the page only formats what these return.
import { computeMastery, chanceOnMediumQuestion, masteryLevel } from './mastery'
import { predictApScore, topicExamWeights } from './priority'
import { toLocalIsoDate } from './planEngine'

export const DIFFICULTY_NAMES = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };
// A trend line needs at least this many separate practice days.
export const MIN_DAYS_FOR_TREND = 2;
// Accuracy or a typical time from fewer answers than this is mostly noise.
export const MIN_ANSWERS_FOR_RATE = 3;
export const MISSED_SHOWN = 5;
// The practice scope that serves only questions whose latest answer was wrong.
export const MISSED_SCOPE = 'missed';

const dayOf = attempt => toLocalIsoDate(new Date(attempt.created_at));

function median(values) {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// One point per day with practice: where the student stood at the end of it.
// attempts must be oldest first, as the history hook keeps them.
// Each day's predicted score counts only the FRQ self-checks saved by the end
// of that day, so the history matches what the student saw at the time.
// Rebuilds mastery once per practice day: quadratic in history length, which
// is fine at a few thousand answers.
export function dailyProgress(attempts, bank, frqAttempts = []) {
  const days = [];
  let upTo = 0;
  while (upTo < attempts.length) {
    const day = dayOf(attempts[upTo]);
    let end = upTo;
    while (end < attempts.length && dayOf(attempts[end]) === day) end++;
    const todays = attempts.slice(upTo, end);
    const mastery = computeMastery(attempts.slice(0, end));
    const frqSoFar = frqAttempts.filter(a => dayOf(a) <= day);
    const prediction = predictApScore({ ...bank, mastery, frqAttempts: frqSoFar });
    days.push({
      day,
      answered: todays.length,
      correct: todays.filter(a => a.correct).length,
      totalAnswered: end,
      chance: chanceOnMediumQuestion(mastery.overall.rating),
      predictedScore: prediction.ready ? prediction.likelyScore : null,
    });
    upTo = end;
  }
  return days;
}

// One sentence on what a ready prediction is built from, so a student can
// tell a score backed by FRQ self-checks from one that borrows the FRQ part
// from multiple choice. frqLoadFailed: the self-checks couldn't be loaded.
export function predictionBasis(prediction, { frqLoadFailed = false } = {}) {
  if (prediction.frqCount > 0) {
    return `Multiple choice plus ${prediction.frqCount} free-response self-check${prediction.frqCount === 1 ? '' : 's'}.`;
  }
  if (frqLoadFailed) return "Free response estimated from multiple choice (couldn't load your self-checks).";
  return 'Free response estimated from multiple choice.';
}

// Why a ranked topic is up for review, for a topic with dueForReview set.
export function reviewNote(daysSince) {
  const days = Math.floor(daysSince);
  return `due for review, last practiced ${days} day${days === 1 ? '' : 's'} ago`;
}

// Accuracy and typical time for each difficulty level.
export function byDifficulty(attempts) {
  return Object.entries(DIFFICULTY_NAMES).map(([level, name]) => {
    const rows = attempts.filter(a => a.difficulty === Number(level));
    const correct = rows.filter(a => a.correct).length;
    const enough = rows.length >= MIN_ANSWERS_FOR_RATE;
    return {
      level: Number(level), name, answered: rows.length, correct,
      accuracy: enough ? correct / rows.length : null,
      medianTimeMs: enough ? median(rows.map(a => a.time_ms)) : null,
    };
  });
}

// Every exam topic with where the student stands on it, grouped by unit.
export function topicMap({ units, topics, questions, mastery }) {
  const weights = topicExamWeights(units, topics);
  const questionCount = new Map();
  questions.forEach(q => questionCount.set(q.topic, (questionCount.get(q.topic) ?? 0) + 1));
  return units.map(unit => ({
    unit,
    topics: topics.filter(t => t.unit === unit.id).map(topic => {
      const stats = mastery.topics[topic.id] ?? null;
      const level = masteryLevel(stats);
      return {
        topic,
        weight: weights[topic.id],
        questions: questionCount.get(topic.id) ?? 0,
        answered: stats?.attempts ?? 0,
        correct: stats?.correct ?? 0,
        level,
        chance: level ? chanceOnMediumQuestion(stats.rating) : null,
      };
    }),
  }));
}

// Questions whose most recent answer was wrong, most recently missed first.
// These are exactly what the "Missed" practice scope serves.
export function missedQuestionIds(attempts) {
  const latest = new Map();
  attempts.forEach((attempt, order) => latest.set(attempt.question_id, { attempt, order }));
  return [...latest.values()]
    .filter(({ attempt }) => !attempt.correct)
    .sort((a, b) => b.order - a.order)
    .map(({ attempt }) => attempt.question_id);
}

export function recentlyMissed(attempts, questions, limit = MISSED_SHOWN) {
  const byId = new Map(questions.map(q => [q.id, q]));
  const timesMissed = new Map();
  attempts.forEach(a => { if (!a.correct) timesMissed.set(a.question_id, (timesMissed.get(a.question_id) ?? 0) + 1); });
  const lastTried = new Map(attempts.map(a => [a.question_id, a.created_at]));
  const ids = missedQuestionIds(attempts).filter(id => byId.has(id));
  return {
    total: ids.length,
    shown: ids.slice(0, limit).map(id => ({ question: byId.get(id), timesMissed: timesMissed.get(id), lastTried: lastTried.get(id) })),
  };
}

// Best and latest score for each FRQ, from oldest-first attempts.
export function frqScores(attempts) {
  const byFrq = new Map();
  for (const a of attempts) {
    const entry = byFrq.get(a.frq_id) ?? { best: null, latest: null, tries: 0 };
    entry.tries += 1;
    entry.latest = a;
    if (!entry.best || a.points_earned / a.points_possible > entry.best.points_earned / entry.best.points_possible) entry.best = a;
    byFrq.set(a.frq_id, entry);
  }
  return byFrq;
}
