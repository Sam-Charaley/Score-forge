import { describe, it, expect } from 'vitest'
import { SUBJECT_INDEX } from './subjectIndex'
import { FLASHCARD_COUNTS } from './flashcardCounts'
import { loadDeck, hasDeck } from './flashcardLoader'

const decks = import.meta.glob('./flashcards/*.js', { eager: true, import: 'default' });
const DECKS = Object.fromEntries(Object.entries(decks).map(([path, cards]) => [path.match(/\/([^/]+)\.js$/)[1], cards]));
const SUBJECT_IDS = new Set(SUBJECT_INDEX.map(s => s.id));
// A card is read on a flip; past this it stops being a flashcard and becomes a page.
const MAX_BACK_LENGTH = 280;

describe('flashcard decks', () => {
  it('every deck belongs to a real subject', () => {
    expect(Object.keys(DECKS).filter(id => !SUBJECT_IDS.has(id))).toEqual([]);
  });

  it('every subject has a deck', () => {
    expect([...SUBJECT_IDS].filter(id => !DECKS[id])).toEqual([]);
  });

  it.each(Object.entries(DECKS))('%s cards are well formed', (id, cards) => {
    const problems = [];
    if (!Array.isArray(cards) || cards.length === 0) problems.push('deck is empty');
    cards.forEach((card, i) => {
      if (typeof card.front !== 'string' || !card.front.trim()) problems.push(`card ${i}: empty front`);
      if (typeof card.back !== 'string' || !card.back.trim()) problems.push(`card ${i}: empty back`);
      if (card.back?.length > MAX_BACK_LENGTH) problems.push(`card ${i}: back is ${card.back.length} characters, keep it under ${MAX_BACK_LENGTH}`);
    });
    const fronts = cards.map(c => c.front.trim().toLowerCase());
    fronts.forEach((f, i) => { if (fronts.indexOf(f) !== i) problems.push(`card ${i}: repeats the front "${cards[i].front}"`); });
    expect(problems).toEqual([]);
  });

  it('Home\'s card counts match the decks (update flashcardCounts.js after editing a deck)', () => {
    const actual = Object.fromEntries(Object.entries(DECKS).map(([id, cards]) => [id, cards.length]).sort());
    expect(Object.fromEntries(Object.entries(FLASHCARD_COUNTS).sort())).toEqual(actual);
  });
});

describe('flashcardLoader', () => {
  it('loads a deck and reuses the same request', async () => {
    const first = loadDeck('csa');
    expect(loadDeck('csa')).toBe(first);
    expect(await first).toEqual(DECKS.csa);
  });

  it('gives an empty deck for a subject without one', async () => {
    expect(hasDeck('not-a-subject')).toBe(false);
    expect(await loadDeck('not-a-subject')).toEqual([]);
  });
});
