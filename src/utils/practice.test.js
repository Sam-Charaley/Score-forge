import { describe, it, expect } from 'vitest'
import { pickNextQuestion, createVisibleTimer, MAX_ATTEMPT_MS } from './practice'

const pool = ['a', 'b', 'c', 'd'].map(id => ({ id }));
const first = () => 0;

describe('pickNextQuestion', () => {
  it('returns null for an empty pool', () => {
    expect(pickNextQuestion([], [])).toBeNull();
  });
  it('prefers questions never seen', () => {
    const attempts = [{ question_id: 'a', correct: true }, { question_id: 'b', correct: false }, { question_id: 'c', correct: true }];
    expect(pickNextQuestion(pool, attempts, null, first).id).toBe('d');
  });
  it('then questions missed last time', () => {
    const attempts = ['a', 'b', 'c', 'd'].map(id => ({ question_id: id, correct: true })).concat({ question_id: 'c', correct: false });
    expect(pickNextQuestion(pool, attempts, null, first).id).toBe('c');
  });
  it('uses only the most recent result for a question', () => {
    const attempts = ['a', 'b', 'c', 'd'].map(id => ({ question_id: id, correct: false })).concat(['a', 'b', 'c'].map(id => ({ question_id: id, correct: true })));
    expect(pickNextQuestion(pool, attempts, null, first).id).toBe('d');
  });
  it('never repeats the previous question unless it is the only one', () => {
    for (let i = 0; i < 20; i++) expect(pickNextQuestion(pool.slice(0, 2), [], 'a', Math.random).id).toBe('b');
    expect(pickNextQuestion([{ id: 'a' }], [], 'a').id).toBe('a');
  });
});

function fakeDocument() {
  const listeners = new Set();
  return {
    visibilityState: 'visible',
    addEventListener: (_, fn) => listeners.add(fn),
    removeEventListener: (_, fn) => listeners.delete(fn),
    setVisible(visible) { this.visibilityState = visible ? 'visible' : 'hidden'; listeners.forEach(fn => fn()); },
    listenerCount: () => listeners.size,
  };
}

describe('createVisibleTimer', () => {
  it('counts only time while the tab is visible', () => {
    let t = 0; const doc = fakeDocument();
    const timer = createVisibleTimer(doc, () => t);
    t = 5000; doc.setVisible(false);
    t = 65000; doc.setVisible(true);
    t = 68000;
    expect(timer.elapsedMs()).toBe(8000);
  });
  it('caps at one hour and cleans up its listener', () => {
    let t = 0; const doc = fakeDocument();
    const timer = createVisibleTimer(doc, () => t);
    t = 5 * MAX_ATTEMPT_MS;
    expect(timer.elapsedMs()).toBe(MAX_ATTEMPT_MS);
    timer.stop();
    expect(doc.listenerCount()).toBe(0);
  });
});
