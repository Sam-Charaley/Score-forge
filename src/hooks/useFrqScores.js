import { useState, useEffect } from 'react'
import { FrqAttempts } from '../services/frqAttempts'

const NO_SCORES = { status: 'ready', attempts: [] };

// The student's FRQ self-check scores for one subject, for the predicted
// score. { status: 'loading' | 'ready' | 'error', attempts, message }
// With enabled false (a subject without FRQs) it is ready and empty, and
// nothing loads. On error, attempts stays empty so the prediction can still
// show, estimating free response from multiple choice.
export function useFrqScores(userId, subjectId, { enabled = true } = {}) {
  const [scores, setScores] = useState(enabled ? { status: 'loading', attempts: [] } : NO_SCORES);
  useEffect(() => {
    if (!enabled) { setScores(NO_SCORES); return undefined; }
    let isCurrent = true;
    setScores({ status: 'loading', attempts: [] });
    FrqAttempts.listScores(userId, subjectId)
      .then(attempts => { if (isCurrent) setScores({ status: 'ready', attempts }); })
      .catch(error => { if (isCurrent) setScores({ status: 'error', attempts: [], message: error.message }); });
    return () => { isCurrent = false; };
  }, [userId, subjectId, enabled]);
  return scores;
}
