// Each deck at ./flashcards/<subjectId>.js becomes its own chunk, fetched the
// first time a student opens Flashcards for that subject.
const deckModules = import.meta.glob('./flashcards/*.js');

const cache = new Map();

export class DeckLoadError extends Error {
  constructor(subjectId, cause) {
    // Browsers remember a failed import() for the rest of the page's life, so
    // re-importing can't recover; reloading can, including after a deploy
    // renamed the chunks.
    super('Check your connection, then reload the page.');
    this.name = 'DeckLoadError';
    this.subjectId = subjectId;
    this.cause = cause;
  }
}

export function hasDeck(subjectId) {
  return Boolean(deckModules[`./flashcards/${subjectId}.js`]);
}

// Resolves to the deck's cards, or [] for a subject without a deck.
export function loadDeck(subjectId) {
  if (cache.has(subjectId)) return cache.get(subjectId);
  const load = deckModules[`./flashcards/${subjectId}.js`];
  if (!load) return Promise.resolve([]);
  const pending = load()
    .then(module => module.default)
    .catch(error => { throw new DeckLoadError(subjectId, error); });
  cache.set(subjectId, pending);
  return pending;
}
