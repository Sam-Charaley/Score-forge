import { describe, it, expect } from 'vitest'
import { CSA_UNITS, CSA_TOPICS, CSA_EXAM } from '../data/questions/csa/topics'
import { computeMastery, ELO } from './mastery'
import {
  weightRangeMidpoint, topicExamWeights, shrunkChance, rankTopics, pickSmartQuestion, predictApScore, latestFrqShares,
  recencyAdjustedChance, daysSinceLastPractice, pickAcrossSubjects,
  PRIOR_ATTEMPTS, TARGET_SUCCESS, PREDICTION_MIN_ATTEMPTS, FRQ_PRIOR_ATTEMPTS, PRIOR_CHANCE,
  REVIEW_HALF_LIFE_DAYS, REVIEW_NOTICE_DAYS,
} from './priority'

const units = CSA_UNITS, topics = CSA_TOPICS, exam = CSA_EXAM;
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
  const allTopics = topics.map(t => q(`${t.id}-1`, t.id));
  // Every topic answered 6 times, two thirds right: ready, a little above 50%.
  const history = topics.flatMap(t => [...Array(6)].map((_, i) => attempt(`${t.id}-${i}`, t.id, i % 3 !== 0)));
  const readyInput = { units, topics, questions: allTopics, mastery: computeMastery(history), exam };
  const frq = (frq_id, points_earned, points_possible = 9) => ({ frq_id, points_earned, points_possible });

  it('stays hidden with low coverage, and says what is missing', () => {
    const result = predictApScore({ units, topics, questions: twoTopics, mastery: computeMastery([]), exam });
    expect(result.ready).toBe(false);
    expect(result.coverage).toBeCloseTo(0.30 / 0.99 / 4 + 0.35 / 0.99 / 5);
  });

  it('stays hidden with enough coverage but too few answers', () => {
    const result = predictApScore({ units, topics, questions: allTopics, mastery: computeMastery([]), exam });
    expect(result.ready).toBe(false);
    expect(result.coverage).toBeCloseTo(1);
  });

  it('is unavailable without an exam model, whatever the practice', () => {
    expect(predictApScore({ ...readyInput, exam: undefined })).toEqual({ ready: false, unavailable: true });
  });

  it('gives a range that contains the likely score once ready', () => {
    expect(history.length).toBeGreaterThanOrEqual(PREDICTION_MIN_ATTEMPTS);
    const result = predictApScore(readyInput);
    expect(result.ready).toBe(true);
    expect(result.lowScore).toBeLessThanOrEqual(result.likelyScore);
    expect(result.highScore).toBeGreaterThanOrEqual(result.likelyScore);
    expect(result.expectedShare).toBeGreaterThan(0.5);
  });

  it("maps the same practice through each subject's own cut points", () => {
    const share = predictApScore(readyInput).expectedShare;
    const lenient = { ...exam, cuts: [{ score: 5, minShare: share - 0.01 }, { score: 1, minShare: 0 }] };
    const strict = { ...exam, cuts: [{ score: 5, minShare: share + 0.01 }, { score: 1, minShare: 0 }] };
    expect(predictApScore({ ...readyInput, exam: lenient }).likelyScore).toBe(5);
    expect(predictApScore({ ...readyInput, exam: strict }).likelyScore).toBe(1);
  });

  it('borrows the FRQ share from multiple choice when there are no self-checks, with a wider range', () => {
    const result = predictApScore(readyInput);
    expect(result.frqCount).toBe(0);
    expect(result.frqShare).toBeCloseTo(result.mcqShare);
    expect(result.expectedShare).toBeCloseTo(result.mcqShare);
    const noProxy = predictApScore({ ...readyInput, exam: { ...exam, sections: { mcq: 1, frq: 0 } } });
    const span = r => r.highScore - r.lowScore;
    expect(span(result)).toBeGreaterThanOrEqual(span(noProxy));
  });

  it('blends FRQ self-checks by section weight, pulled toward the multiple-choice level', () => {
    const base = predictApScore(readyInput);
    const result = predictApScore({ ...readyInput, frqAttempts: [frq('f1', 9), frq('f2', 9)] });
    const expectedFrq = (2 * 1 + FRQ_PRIOR_ATTEMPTS * base.mcqShare) / (2 + FRQ_PRIOR_ATTEMPTS);
    expect(result.frqCount).toBe(2);
    expect(result.frqShare).toBeCloseTo(expectedFrq);
    expect(result.expectedShare).toBeCloseTo(exam.sections.mcq * base.mcqShare + exam.sections.frq * expectedFrq);
    expect(result.expectedShare).toBeGreaterThan(base.expectedShare);
  });

  it('keeps the readiness rules: FRQs alone never unlock a score', () => {
    const result = predictApScore({ units, topics, questions: allTopics, mastery: computeMastery([]), exam, frqAttempts: [frq('f1', 9)] });
    expect(result.ready).toBe(false);
  });
});

describe('latestFrqShares', () => {
  it('uses the latest self-check per FRQ, not the best', () => {
    const shares = latestFrqShares([
      { frq_id: 'a', points_earned: 9, points_possible: 9 },
      { frq_id: 'b', points_earned: 3, points_possible: 6 },
      { frq_id: 'a', points_earned: 3, points_possible: 9 },
    ]);
    expect(shares).toHaveLength(2);
    expect(shares[0]).toBeCloseTo(1 / 3);
    expect(shares[1]).toBeCloseTo(0.5);
  });
  it('skips rows with no possible points', () => {
    expect(latestFrqShares([{ frq_id: 'a', points_earned: 0, points_possible: 0 }])).toEqual([]);
  });
});

describe('review spacing', () => {
  const now = new Date(2026, 9, 31, 12);
  const daysAgo = days => new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();
  // Ten right answers on one topic, all on the same past day.
  const strongOn = when => computeMastery([...Array(10)].map((_, i) => ({ ...attempt(`l${i}`, 'loops', true), created_at: when }))).topics.loops;
  const weakOn = when => computeMastery([...Array(10)].map((_, i) => ({ ...attempt(`l${i}`, 'loops', false), created_at: when }))).topics.loops;

  it('counts days since the last attempt, and null when there is none', () => {
    expect(daysSinceLastPractice(strongOn(daysAgo(3)), now)).toBeCloseTo(3);
    expect(daysSinceLastPractice(undefined, now)).toBeNull();
  });

  it("leaves a topic practiced today where it is", () => {
    const stats = strongOn(now.toISOString());
    expect(recencyAdjustedChance(stats, now)).toBeCloseTo(shrunkChance(stats));
  });

  it('halves the lead over 50% every half-life', () => {
    const stats = strongOn(daysAgo(REVIEW_HALF_LIFE_DAYS));
    const lead = shrunkChance(stats) - PRIOR_CHANCE;
    expect(lead).toBeGreaterThan(0);
    expect(recencyAdjustedChance(stats, now)).toBeCloseTo(PRIOR_CHANCE + lead / 2);
  });

  it('never makes a weak topic look stronger with time', () => {
    const stats = weakOn(daysAgo(60));
    expect(recencyAdjustedChance(stats, now)).toBe(shrunkChance(stats));
  });

  it('raises the priority of a stale strong topic but keeps showing its measured chance', () => {
    const questions = [q('l1', 'loops')];
    const fresh = rankTopics({ units, topics, questions, mastery: { topics: { loops: strongOn(now.toISOString()) } }, now })[0];
    const stale = rankTopics({ units, topics, questions, mastery: { topics: { loops: strongOn(daysAgo(42)) } }, now })[0];
    expect(stale.priority).toBeGreaterThan(fresh.priority);
    expect(stale.chance).toBeCloseTo(fresh.chance);
  });

  it('labels a topic due for review only after the notice period', () => {
    const questions = [q('l1', 'loops')];
    const rank = days => rankTopics({ units, topics, questions, mastery: { topics: { loops: strongOn(daysAgo(days)) } }, now })[0];
    expect(rank(REVIEW_NOTICE_DAYS - 1).dueForReview).toBe(false);
    expect(rank(REVIEW_NOTICE_DAYS).dueForReview).toBe(true);
    expect(rankTopics({ units, topics, questions, mastery: { topics: {} }, now })[0].dueForReview).toBe(false);
  });
});

describe('pickAcrossSubjects', () => {
  it('picks the highest priority across subjects and skips withdrawn reports', () => {
    const row = (id, priority) => ({ topic: { id }, priority });
    expect(pickAcrossSubjects({ csa: row('loops', 0.04), psych: row('memory', 0.07), chem: null }))
      .toEqual({ subjectId: 'psych', pick: row('memory', 0.07) });
  });
  it('is null with nothing reported', () => expect(pickAcrossSubjects({})).toBeNull());
});
