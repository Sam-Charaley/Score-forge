import { useState, useEffect } from 'react'
import { loadDeck } from '../data/flashcardLoader'

// { status: 'loading' | 'ready' | 'error', cards, message }
export function useFlashcardDeck(subjectId) {
  const [state, setState] = useState({ status: 'loading' });

  useEffect(() => {
    let isCurrent = true;
    setState({ status: 'loading' });
    loadDeck(subjectId)
      .then(cards => { if (isCurrent) setState({ status: 'ready', cards }); })
      .catch(error => { if (isCurrent) setState({ status: 'error', message: error.message }); });
    return () => { isCurrent = false; };
  }, [subjectId]);

  return state;
}
