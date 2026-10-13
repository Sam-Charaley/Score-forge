import { describe, it, expect } from 'vitest'
import { CSA_UNITS, CSA_TOPICS } from '../data/questions/csa/topics'
import { computeMastery, ELO } from './mastery'
import {
  weightRangeMidpoint, topicExamWeights, shrunkChance, rankTopics, pickSmartQuestion, predictApScore,
  PRIOR_ATTEMPTS, TARGET_SUCCESS, PREDICTION_MIN_ATTEMPTS, ESTIMATED_AP_CUTS,
} from './priority'

const units = CSA_UNITS, topics = CSA_TOPICS;
const q = (id, topic, difficulty = 2) => ({ id, topic, difficulty });
const attempt = (question_id, topic_id, correct, difficulty = 2) => ({ question_id, topic_id, correct, difficulty });
const seq = values => { let i = 0; return () => values[i++ % values.length]; };

describe('exam weights', () => {
  it('reads a weight range as its midpoint', () => {
    expect(weightRangeMidpoint('15–25%')).toBeCloseTo(0.2);
    expect(weightRangeMidpoint('10-18%')).toBeCloseTo(0.14);
  });
  it('topic weights sum to the whole exam and split units evenly', () => {
    const w = topicExamWeights(units, topics);
    expect(Object.values(w).reduce((a, b) => a + b, 0)).toBeCloseTo(1);
    expect(w.loops).toBeCloseTo(0.30 / 0.99 / 4);      // Unit 2 has 4 topics
    expect(w.arraylist).toBeCloseTo(0.35 / 0.99 / 5);  // Unit 4 has 5 topics
    expect(w.loops).toBeCloseTo(w.selection);
  });
});

describe('shrunkChance', () => {
  it('is 50% with no attempts', () => expect(shrunkChance(undefined)).toBe(0.5));
  it('pulls a hot streak toward 50% when attempts are few', () => {
    const two = computeMastery([attempt('a', 'loops', true), attempt('b', 'loops', true)]).topics.loops;
    expect(shrunkChance(two)).toBeGreaterThan(0.5);
    expect(shrunkChance(two)).toBeLessThan(0.6);
  });
  it('trusts the rating more as attempts grow', () => {
    const many = { rating: ELO.initialRating + 400, attempts: 200 };
    expect(shrunkChance(many)).toBeGreaterThan(0.85);
    expect(shrunkChance({ ...many, attempts: PRIOR_ATTEMPTS })).toBeLessThan(shrunkChance(many));
  });
});

describe('rankTopics', () => {
  const questions = [q('l1', 'loops'), q('a1', 'arraylist')];
  it('only ranks topics that have questions', () => {
    const ranked = rankTopics({ units, topics, questions, mastery: computeMastery([]) });
    expect(ranked.map(r => r.topic.id).sort()).toEqual(['arraylist', 'loops']);
  });
  it('puts the weaker topic first when weights are similar', () => {
    const history = [...Array(10)].flatMap((_, i) => [attempt(`l${i}`, 'loops', true), attempt(`a${i}`, 'arraylist', false)]);
    const ranked = rankTopics({ units, topics, questions, mastery: computeMastery(history) });
    expect(ranked[0].topic.id).toBe('arraylist');
    expect(ranked[0].priority).toBeCloseTo(ranked[0].weight * (1 - ranked[0].chance));
  });
});

describe('pickSmartQuestion', () => {
  const questions = [q('l-easy', 'loops', 1), q('l-med', 'loops', 2), q('l-hard', 'loops', 3), q('a-med', 'arraylist', 2)];

  it('returns null with no questions', () => {
    expect(pickSmartQuestion({ units, topics, questions: [], attempts: [], mastery: computeMastery([]) })).toBeNull();
  });

  it('chooses topics in proportion to priority (weighted shuffle, not always the top)', () => {
    const history = [...Array(12)].map((_, i) => attempt(`x${i}`, 'loops', true));
    const mastery = computeMastery(history);
    const ranked = rankTopics({ units, topics, questions, mastery });
    const share = ranked[0].priority / (ranked[0].priority + ranked[1].priority);
    let topCount = 0; const runs = 4000;
    for (let i = 0; i < runs; i++) {
      const pick = pickSmartQuestion({ units, topics, questions, attempts: history, mastery, random: Math.random });
      if (pick.reason.topic.id === ranked[0].topic.id) topCount++;
    }
    expect(ranked[0].topic.id).toBe('arraylist');
    expect(topCount / runs).toBeGreaterThan(share - 0.04);
    expect(topCount / runs).toBeLessThan(share + 0.04);
    expect(topCount).toBeLessThan(runs);
  });

  it(`targets ~${TARGET_SUCCESS * 100}% expected success within the topic`, () => {
    const mastery = computeMastery([]);  // rating 1500: easy 1300 ≈ 76%, medium 50%, hard 24%
    const pick = pickSmartQuestion({ units, topics, questions: questions.filter(x => x.topic === 'loops'), attempts: [], mastery, random: seq([0]) });
    expect(pick.question.id).toBe('l-easy');
  });

  it('a strong student gets harder questions', () => {
    const strong = { overall: { attempts: 50 }, topics: { loops: { rating: 1850, attempts: 50, correct: 45 } } };
    const pick = pickSmartQuestion({ units, topics, questions: questions.filter(x => x.topic === 'loops'), attempts: [], mastery: strong, random: seq([0]) });
    expect(pick.question.id).toBe('l-hard');
  });

  it('prefers unseen questions over difficulty fit, and never repeats the previous one', () => {
    const loops = questions.filter(x => x.topic === 'loops');
    const seenEasy = [attempt('l-easy', 'loops', true, 1)];
    const pick = pickSmartQuestion({ units, topics, questions: loops, attempts: seenEasy, mastery: computeMastery(seenEasy), previousQuestionId: 'l-easy', random: seq([0]) });
    expect(pick.question.id).not.toBe('l-easy');
    for (let i = 0; i < 50; i++) {
      expect(pickSmartQuestion({ units, topics, questions, attempts: [], mastery: computeMastery([]), previousQuestionId: 'a-med', random: Math.random }).question.id).not.toBe('a-med');
    }
  });

  it('explains the pick with weight and chance', () => {
    const pick = pickSmartQuestion({ units, topics, questions, attempts: [], mastery: computeMastery([]), random: seq([0]) });
    expect(pick.reason).toMatchObject({ chance: 0.5, attempts: 0 });
    expect(pick.reason.weight).toBeGreaterThan(0);
  });
});

describe('predictApScore', () => {
  const twoTopics = [q('l1', 'loops'), q('a1', 'arraylist')];
  it('stays hidden with low coverage, and says what is missing', () => {
    const result = predictApScore({ units, topics, questions: twoTopics, mastery: computeMastery([]) });
    expect(result.ready).toBe(false);
    expect(result.coverage).toBeCloseTo(0.30 / 0.99 / 4 + 0.35 / 0.99 / 5);
  });

  it('stays hidden with enough coverage but too few answers', () => {
    const allTopics = topics.map(t => q(`${t.id}-1`, t.id));
    const result = predictApScore({ units, topics, questions: allTopics, mastery: computeMastery([]) });
    expect(result.ready).toBe(false);
    expect(result.coverage).toBeCloseTo(1);
  });

  it('gives a range that contains the likely score once ready', () => {
    const allTopics = topics.map(t => q(`${t.id}-1`, t.id));
    const history = topics.flatMap(t => [...Array(6)].map((_, i) => attempt(`${t.id}-${i}`, t.id, i % 3 !== 0)));
    expect(history.length).toBeGreaterThanOrEqual(PREDICTION_MIN_ATTEMPTS);
    const result = predictApScore({ units, topics, questions: allTopics, mastery: computeMastery(history) });
    expect(result.ready).toBe(true);
    expect(result.lowScore).toBeLessThanOrEqual(result.likelyScore);
    expect(result.highScore).toBeGreaterThanOrEqual(result.likelyScore);
    expect(result.expectedShare).toBeGreaterThan(0.5);
  });

  it('maps cut points in order from 5 down to 1', () => {
    expect(ESTIMATED_AP_CUTS.map(c => c.score)).toEqual([5, 4, 3, 2, 1]);
    expect(ESTIMATED_AP_CUTS.at(-1).minShare).toBe(0);
  });
});
