import { describe, it, expect } from 'vitest'
import { ELO, expectedScore, kFactor, computeMastery, masteryLevel, chanceOnMediumQuestion, questionRating, MIN_ATTEMPTS_FOR_LEVEL } from './mastery'

const attempt = (topic, difficulty, correct, i = 0) => ({ topic_id: topic, difficulty, correct, created_at: `2026-10-${String(10 + i).padStart(2, '0')}T00:00:00Z` });

describe('Elo basics', () => {
  it('equal ratings give a 50% expected score', () => {
    expect(expectedScore(1500, 1500)).toBeCloseTo(0.5);
  });
  it('a 400-point edge gives 10:1 odds', () => {
    expect(expectedScore(1900, 1500)).toBeCloseTo(10 / 11);
  });
  it('maps difficulty to question rating, defaulting unknown to medium', () => {
    expect([1, 2, 3].map(questionRating)).toEqual([1300, 1500, 1700]);
    expect(questionRating(undefined)).toBe(1500);
  });
  it('K starts at the max and decays toward the min', () => {
    expect(kFactor(0)).toBe(ELO.maxK);
    expect(kFactor(10)).toBeCloseTo((ELO.maxK + ELO.minK) / 2);
    expect(kFactor(10000)).toBeCloseTo(ELO.minK, 0);
  });
});

describe('computeMastery', () => {
  it('starts at the initial rating with no attempts', () => {
    expect(computeMastery([])).toEqual({ overall: { rating: 1500, attempts: 0, correct: 0, lastAttemptAt: null }, topics: {} });
  });

  it('first correct answer on a medium question adds exactly K/2', () => {
    const { overall, topics } = computeMastery([attempt('loops', 2, true)]);
    expect(topics.loops.rating).toBeCloseTo(1500 + ELO.maxK / 2);
    expect(overall.rating).toBeCloseTo(1500 + ELO.maxK / 2);
  });

  it('missing an easy question costs more than missing a hard one', () => {
    const missEasy = computeMastery([attempt('loops', 1, false)]).topics.loops.rating;
    const missHard = computeMastery([attempt('loops', 3, false)]).topics.loops.rating;
    expect(1500 - missEasy).toBeGreaterThan(1500 - missHard);
  });

  it('getting a hard question right gains more than an easy one', () => {
    const easy = computeMastery([attempt('loops', 1, true)]).topics.loops.rating;
    const hard = computeMastery([attempt('loops', 3, true)]).topics.loops.rating;
    expect(hard - 1500).toBeGreaterThan(easy - 1500);
  });

  it('keeps topics independent and counts attempts and correct answers', () => {
    const { topics, overall } = computeMastery([attempt('loops', 2, true, 0), attempt('arrays', 2, false, 1), attempt('loops', 2, true, 2)]);
    expect(topics.loops).toMatchObject({ attempts: 2, correct: 2 });
    expect(topics.arrays).toMatchObject({ attempts: 1, correct: 0 });
    expect(topics.loops.rating).toBeGreaterThan(1500);
    expect(topics.arrays.rating).toBeLessThan(1500);
    expect(overall).toMatchObject({ attempts: 3, correct: 2, lastAttemptAt: '2026-10-12T00:00:00Z' });
  });

  it('a steady 80% accuracy on medium questions settles near an 80% expected score', () => {
    const history = Array.from({ length: 400 }, (_, i) => attempt('loops', 2, i % 5 !== 0, 0));
    const { rating } = computeMastery(history).topics.loops;
    expect(chanceOnMediumQuestion(rating)).toBeGreaterThan(0.72);
    expect(chanceOnMediumQuestion(rating)).toBeLessThan(0.88);
  });
});

describe('masteryLevel', () => {
  it('withholds a label until there are enough attempts', () => {
    expect(masteryLevel({ rating: 1800, attempts: MIN_ATTEMPTS_FOR_LEVEL - 1 })).toBeNull();
    expect(masteryLevel(undefined)).toBeNull();
  });
  it('labels by chance of answering a medium question', () => {
    const at = chance => 1500 - ELO.scale * Math.log10(1 / chance - 1);
    const label = chance => masteryLevel({ rating: at(chance), attempts: 10 }).label;
    expect(label(0.3)).toBe('Needs work');
    expect(label(0.5)).toBe('Developing');
    expect(label(0.7)).toBe('Proficient');
    expect(label(0.9)).toBe('Strong');
  });
});
