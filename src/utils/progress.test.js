import { describe, it, expect } from 'vitest'
import { dailyProgress, byDifficulty, topicMap, missedQuestionIds, recentlyMissed, MIN_ANSWERS_FOR_RATE } from './progress'
import { computeMastery } from './mastery'

const units = [{ id: 'u1', name: 'One', weight: '40–60%' }, { id: 'u2', name: 'Two', weight: '40–60%' }];
const topics = [{ id: 'a', unit: 'u1', name: 'A' }, { id: 'b', unit: 'u2', name: 'B' }, { id: 'c', unit: 'u2', name: 'C' }];
const questions = [
  { id: 'q1', topic: 'a', difficulty: 1 }, { id: 'q2', topic: 'a', difficulty: 2 },
  { id: 'q3', topic: 'b', difficulty: 3 },
];
const bank = { units, topics, questions };
const at = (day, hour) => new Date(2026, 9, day, hour).toISOString();
const attempt = (question_id, topic_id, difficulty, correct, created_at, time_ms = 20000) => ({ question_id, topic_id, difficulty, correct, created_at, time_ms });

describe('dailyProgress', () => {
  it('makes one point per local day, in order, with running totals', () => {
    const attempts = [
      attempt('q1', 'a', 1, true, at(10, 9)), attempt('q2', 'a', 2, false, at(10, 21)),
      attempt('q3', 'b', 3, true, at(12, 8)),
    ];
    const days = dailyProgress(attempts, bank);
    expect(days.map(d => [d.day, d.answered, d.correct, d.totalAnswered])).toEqual([
      ['2026-10-10', 2, 1, 2], ['2026-10-12', 1, 1, 3],
    ]);
    expect(days[1].chance).toBeGreaterThan(days[0].chance);
  });
  it('has no predicted score until the prediction unlocks', () => {
    const days = dailyProgress([attempt('q1', 'a', 1, true, at(10, 9))], bank);
    expect(days[0].predictedScore).toBeNull();
  });
  it('is empty with no attempts', () => expect(dailyProgress([], bank)).toEqual([]));
});

describe('byDifficulty', () => {
  it('reports accuracy and median time only with enough answers', () => {
    const easy = Array.from({ length: MIN_ANSWERS_FOR_RATE }, (_, i) => attempt(`e${i}`, 'a', 1, i > 0, at(10, i), (i + 1) * 1000));
    const rows = byDifficulty([...easy, attempt('h', 'b', 3, true, at(11, 1))]);
    expect(rows[0]).toMatchObject({ name: 'Easy', answered: 3, correct: 2, medianTimeMs: 2000 });
    expect(rows[0].accuracy).toBeCloseTo(2 / 3);
    expect(rows[2]).toMatchObject({ name: 'Hard', answered: 1, accuracy: null, medianTimeMs: null });
  });
});

describe('topicMap', () => {
  it('groups topics by unit with exam weight, bank size and progress', () => {
    const mastery = computeMastery([attempt('q1', 'a', 1, true, at(10, 9))]);
    const map = topicMap({ ...bank, mastery });
    expect(map.map(g => g.unit.id)).toEqual(['u1', 'u2']);
    const [a] = map[0].topics;
    expect(a).toMatchObject({ questions: 2, answered: 1, correct: 1, level: null, chance: null });
    expect(map[1].topics.find(t => t.topic.id === 'c')).toMatchObject({ questions: 0, answered: 0 });
    const totalWeight = map.flatMap(g => g.topics).reduce((sum, t) => sum + t.weight, 0);
    expect(totalWeight).toBeCloseTo(1);
  });
});

describe('missed questions', () => {
  const attempts = [
    attempt('q1', 'a', 1, false, at(10, 1)), attempt('q2', 'a', 2, false, at(10, 2)),
    attempt('q1', 'a', 1, true, at(10, 3)), attempt('q3', 'b', 3, false, at(10, 4)),
    attempt('q2', 'a', 2, false, at(10, 5)), attempt('gone', 'a', 1, false, at(10, 6)),
  ];
  it('lists questions whose latest answer was wrong, most recent first', () => {
    expect(missedQuestionIds(attempts)).toEqual(['gone', 'q2', 'q3']);
  });
  it('skips questions no longer in the bank and counts every miss', () => {
    const result = recentlyMissed(attempts, questions);
    expect(result.total).toBe(2);
    expect(result.shown.map(m => [m.question.id, m.timesMissed])).toEqual([['q2', 2], ['q3', 1]]);
  });
});
