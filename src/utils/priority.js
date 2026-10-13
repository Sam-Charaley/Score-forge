// Phase 3: decide what to study next and estimate the AP score.
//
// Every topic gets a share of the exam (its unit's College Board weight split
// across the unit's topics) and an estimated chance of answering its
// questions right. Priority is the share of the exam you're expected to lose
// on that topic: weight x (1 - chance). Highest priority = most score per hour.

import { expectedScore, questionRating, chanceOnMediumQuestion, ELO } from './mastery'

// With few attempts a rating is mostly noise, so the chance is pulled toward
// a coin flip. Equivalent to starting every topic with this many imaginary
// attempts at 50%.
export const PRIOR_ATTEMPTS = 5;
export const PRIOR_CHANCE = 0.5;

// Smart practice aims for questions the student gets right about this often:
// hard enough to learn from, easy enough to keep momentum.
export const TARGET_SUCCESS = 0.7;

// The prediction stays hidden until questions cover this much of the exam and
// the student has answered this many; before that it would mostly be a guess.
export const PREDICTION_MIN_COVERAGE = 0.4;
export const PREDICTION_MIN_ATTEMPTS = 30;

// About a 90% band around the estimate.
const PREDICTION_Z = 1.645;
// Spread for a topic with no data: a uniform guess between 0 and 1.
const UNKNOWN_TOPIC_SD = Math.sqrt(1 / 12);

// Estimated AP CS A cut points as a share of the maximum composite score.
// College Board does not publish official cut points; these approximate
// past released scoring guidance and are only good for a rough range.
export const ESTIMATED_AP_CUTS = [
  { score: 5, minShare: 0.75 },
  { score: 4, minShare: 0.6 },
  { score: 3, minShare: 0.45 },
  { score: 2, minShare: 0.33 },
  { score: 1, minShare: 0 },
];

// "15–25%" -> 0.20
export function weightRangeMidpoint(range) {
  const [low, high] = range.replace(/%/g, '').split(/[–-]/).map(Number);
  return (low + (Number.isFinite(high) ? high : low)) / 200;
}

// Share of the whole exam per topic: unit weights normalized to sum to 1,
// then split evenly across each unit's topics.
export function topicExamWeights(units, topics) {
  const unitMid = Object.fromEntries(units.map(u => [u.id, weightRangeMidpoint(u.weight)]));
  const totalMid = Object.values(unitMid).reduce((a, b) => a + b, 0);
  const topicsPerUnit = {};
  topics.forEach(t => { topicsPerUnit[t.unit] = (topicsPerUnit[t.unit] ?? 0) + 1; });
  return Object.fromEntries(topics.map(t => [t.id, unitMid[t.unit] / totalMid / topicsPerUnit[t.unit]]));
}

// Chance of answering a typical question on the topic, pulled toward 50%
// while attempts are few.
export function shrunkChance(stats) {
  const attempts = stats?.attempts ?? 0;
  if (attempts === 0) return PRIOR_CHANCE;
  const raw = chanceOnMediumQuestion(stats.rating);
  return (attempts * raw + PRIOR_ATTEMPTS * PRIOR_CHANCE) / (attempts + PRIOR_ATTEMPTS);
}

// Topics that have questions, ranked by priority (highest first).
export function rankTopics({ units, topics, questions, mastery }) {
  const weights = topicExamWeights(units, topics);
  const topicsWithQuestions = new Set(questions.map(q => q.topic));
  return topics
    .filter(t => topicsWithQuestions.has(t.id))
    .map(t => {
      const stats = mastery.topics[t.id];
      const chance = shrunkChance(stats);
      return { topic: t, weight: weights[t.id], chance, attempts: stats?.attempts ?? 0, priority: weights[t.id] * (1 - chance) };
    })
    .sort((a, b) => b.priority - a.priority || a.topic.id.localeCompare(b.topic.id));
}

function weightedRandom(items, weightOf, random) {
  const total = items.reduce((sum, item) => sum + weightOf(item), 0);
  if (total <= 0) return items[Math.floor(random() * items.length)];
  let roll = random() * total;
  for (const item of items) {
    roll -= weightOf(item);
    if (roll < 0) return item;
  }
  return items[items.length - 1];
}

// Within a topic: prefer unseen questions, then ones missed last time, then
// the rest; within that tier pick the question whose expected success is
// closest to TARGET_SUCCESS.
function pickQuestionInTopic(questions, attempts, topicRating, previousQuestionId, random) {
  const candidates = questions.length > 1 ? questions.filter(q => q.id !== previousQuestionId) : questions;
  const lastResult = new Map();
  for (const a of attempts) lastResult.set(a.question_id, a.correct);
  const tiers = [
    candidates.filter(q => !lastResult.has(q.id)),
    candidates.filter(q => lastResult.get(q.id) === false),
    candidates,
  ];
  const tier = tiers.find(group => group.length > 0);
  const distance = q => Math.abs(expectedScore(topicRating, questionRating(q.difficulty)) - TARGET_SUCCESS);
  const best = Math.min(...tier.map(distance));
  const closest = tier.filter(q => Math.abs(distance(q) - best) < 1e-9);
  return closest[Math.floor(random() * closest.length)];
}

// Smart practice: choose a topic in proportion to its priority (so weak,
// heavily weighted topics come up most, but topics still interleave), then a
// question at the target difficulty. Returns { question, reason } or null.
export function pickSmartQuestion({ units, topics, questions, attempts, mastery, previousQuestionId = null, random = Math.random }) {
  if (questions.length === 0) return null;
  const ranked = rankTopics({ units, topics, questions, mastery });
  const usable = ranked.filter(r => questions.some(q => q.topic === r.topic.id && (q.id !== previousQuestionId || questions.length === 1)));
  const chosen = weightedRandom(usable.length ? usable : ranked, r => r.priority, random);
  const inTopic = questions.filter(q => q.topic === chosen.topic.id);
  const topicRating = mastery.topics[chosen.topic.id]?.rating ?? ELO.initialRating;
  const question = pickQuestionInTopic(inTopic, attempts, topicRating, previousQuestionId, random);
  return { question, reason: chosen };
}

function apScoreFor(share) {
  return ESTIMATED_AP_CUTS.find(cut => share >= cut.minShare).score;
}

// Estimated AP score as a range, or a "not yet" result explaining what's missing.
export function predictApScore({ units, topics, questions, mastery }) {
  const weights = topicExamWeights(units, topics);
  const topicsWithQuestions = new Set(questions.map(q => q.topic));
  const coverage = topics.filter(t => topicsWithQuestions.has(t.id)).reduce((sum, t) => sum + weights[t.id], 0);
  const attempts = mastery.overall.attempts;
  const ready = coverage >= PREDICTION_MIN_COVERAGE && attempts >= PREDICTION_MIN_ATTEMPTS;
  if (!ready) return { ready: false, coverage, attempts, needCoverage: PREDICTION_MIN_COVERAGE, needAttempts: PREDICTION_MIN_ATTEMPTS };

  let expected = 0;
  let variance = 0;
  for (const t of topics) {
    const stats = mastery.topics[t.id];
    const chance = shrunkChance(stats);
    const n = (stats?.attempts ?? 0) + PRIOR_ATTEMPTS;
    const sd = stats?.attempts ? Math.sqrt(chance * (1 - chance) / n) : UNKNOWN_TOPIC_SD;
    expected += weights[t.id] * chance;
    variance += (weights[t.id] * sd) ** 2;
  }
  const margin = PREDICTION_Z * Math.sqrt(variance);
  const low = Math.max(0, expected - margin);
  const high = Math.min(1, expected + margin);
  return { ready: true, coverage, attempts, expectedShare: expected, lowScore: apScoreFor(low), highScore: apScoreFor(high), likelyScore: apScoreFor(expected) };
}
