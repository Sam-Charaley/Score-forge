import { useState, useEffect, useCallback } from 'react'
import { Eye, Shuffle, RotateCcw, ChevronLeft, ChevronRight, Check, X, Layers, CircleCheck, Repeat } from 'lucide-react'
import Button from '../components/ui/Button'
import IconButton from '../components/ui/IconButton'
import EmptyState from '../components/ui/EmptyState'
import SubjectSwitcher from '../components/SubjectSwitcher'
import { FLASHCARDS } from '../data/flashcards'
import { hasModifier, isTypingTarget, mayTakeActivationKey } from '../utils/keyboard'

const KNOWN = 'known';
const LEARNING = 'learning';

// Fisher-Yates: sort(() => Math.random() - 0.5) is biased toward the original order.
function shuffled(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function FlashcardMode({ subject, mySubjects, onSubject }) {
  const cards = FLASHCARDS[subject.id] || [];
  // The deck holds indexes into cards, so results survive reshuffles.
  const [deck, setDeck] = useState(() => cards.map((_, i) => i));
  const [position, setPosition] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState({});
  const [finished, setFinished] = useState(false);

  const cardIndex = deck[position];
  const card = cards[cardIndex];
  const knownCount = deck.filter(i => results[i] === KNOWN).length;
  const learningIndexes = deck.filter(i => results[i] === LEARNING);

  const startDeck = indexes => {
    setDeck(indexes); setPosition(0); setFlipped(false); setResults({}); setFinished(false);
  };
  const reshuffleAll = () => startDeck(shuffled(cards.map((_, i) => i)));
  const reviewLearning = () => { if (learningIndexes.length > 0) startDeck(shuffled(learningIndexes)); };

  const goTo = useCallback(nextPosition => {
    setPosition(Math.min(Math.max(nextPosition, 0), deck.length - 1));
    setFlipped(false);
  }, [deck.length]);

  const mark = useCallback(result => {
    setResults(prev => ({ ...prev, [cardIndex]: result }));
    if (position + 1 >= deck.length) setFinished(true);
    else goTo(position + 1);
  }, [cardIndex, position, deck.length, goTo]);

  useEffect(() => {
    if (finished || !card) return undefined;
    const onKey = e => {
      if (hasModifier(e) || isTypingTarget(e.target)) return;
      if (e.key === ' ' || e.key === 'Enter') {
        if (!mayTakeActivationKey(e.target, '[data-flashcard]')) return;
        e.preventDefault(); setFlipped(f => !f);
      }
      else if (e.key === 'ArrowRight') goTo(position + 1);
      else if (e.key === 'ArrowLeft') goTo(position - 1);
      else if (flipped && e.key === '1') mark(LEARNING);
      else if (flipped && e.key === '2') mark(KNOWN);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [finished, card, flipped, position, goTo, mark]);

  return (
    <div className="page flashcards" style={{ '--subject': subject.color }}>
      <SubjectSwitcher subjects={mySubjects} activeId={subject.id} onSelect={onSubject} />
      <header className="page-head">
        <div>
          <h1>{subject.shortName} flashcards</h1>
          <p>{cards.length > 0 ? `${cards.length} cards. Say it out loud before you flip.` : 'Quick recall for the facts that show up every year.'}</p>
        </div>
        {cards.length > 0 && <Button variant="quiet" size="small" icon={Shuffle} onClick={reshuffleAll}>Shuffle</Button>}
      </header>

      {cards.length === 0 ? (
        <div className="card"><EmptyState icon={Layers} title="No cards for this subject yet">Flashcards for {subject.name} are on the way. Your study plan and resources are ready in the meantime.</EmptyState></div>
      ) : finished ? (
        <div className="sheet deck-done">
          <span className="empty-state-icon"><CircleCheck aria-hidden="true" /></span>
          <h2>Deck complete</h2>
          <p><b>{knownCount}</b> known, <b>{learningIndexes.length}</b> still learning.</p>
          <div className="deck-done-actions">
            {learningIndexes.length > 0 && <Button icon={Repeat} onClick={reviewLearning}>Review the {learningIndexes.length} you missed</Button>}
            <Button variant={learningIndexes.length > 0 ? 'quiet' : 'primary'} icon={RotateCcw} onClick={reshuffleAll}>Shuffle and restart</Button>
          </div>
        </div>
      ) : (
        <div className="deck">
          <div className="deck-status">
            <span className="deck-count"><b>{position + 1}</b> of {deck.length}</span>
            <span className="deck-tally">
              <span className="tally tally-known"><Check aria-hidden="true" />{knownCount}<span className="sr-only"> known</span></span>
              <span className="tally tally-learning"><Repeat aria-hidden="true" />{learningIndexes.length}<span className="sr-only"> still learning</span></span>
            </span>
          </div>
          <div className="deck-track" role="group" aria-label="Cards">
            {deck.map((index, i) => (
              <button
                key={`${index}-${i}`} type="button" aria-label={`Card ${i + 1}`} aria-current={i === position ? 'true' : undefined}
                className={`deck-segment${results[index] ? ` is-${results[index]}` : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <button
            type="button" data-flashcard className={`flashcard${flipped ? ' is-flipped' : ''}`}
            onClick={() => setFlipped(f => !f)} aria-label={flipped ? 'Show the question' : 'Show the answer'}
          >
            <span className="flashcard-inner">
              <span className="flashcard-face flashcard-front" aria-hidden={flipped}>
                <span className="flashcard-side">Question</span>
                <span className="flashcard-text">{card.front}</span>
                <span className="flashcard-hint">Tap or press space to flip</span>
              </span>
              <span className="flashcard-face flashcard-back" aria-hidden={!flipped}>
                <span className="flashcard-side">Answer</span>
                <span className="flashcard-text">{card.back}</span>
                <span className="flashcard-hint">How did you do?</span>
              </span>
            </span>
          </button>

          <div className="deck-controls">
            <IconButton icon={ChevronLeft} label="Previous card" outlined onClick={() => goTo(position - 1)} disabled={position === 0} />
            <div className="deck-grade">
              {flipped ? (
                <>
                  <Button variant="quiet" icon={X} onClick={() => mark(LEARNING)} className="grade-learning">Still learning <kbd>1</kbd></Button>
                  <Button icon={Check} onClick={() => mark(KNOWN)}>Got it <kbd>2</kbd></Button>
                </>
              ) : (
                <Button variant="secondary" icon={Eye} onClick={() => setFlipped(true)}>Show answer <kbd>Space</kbd></Button>
              )}
            </div>
            <IconButton icon={ChevronRight} label="Next card" outlined onClick={() => goTo(position + 1)} disabled={position === deck.length - 1} />
          </div>
        </div>
      )}
    </div>
  );
}
