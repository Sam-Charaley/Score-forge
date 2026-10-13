import { useState, useEffect, useMemo, useRef } from 'react'
import { Attempts } from '../services/attempts'
import { computeMastery } from '../utils/mastery'

// One student's attempts for one subject, plus mastery rebuilt from them.
// New answers count immediately and are rolled back if the save fails.
export function usePracticeHistory({ userId, subjectId, onSaveError }) {
  const [attempts, setAttempts] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [loadRequest, setLoadRequest] = useState(0);
  const nextTempId = useRef(0);

  useEffect(() => {
    if (!userId) return;
    let isCurrent = true;
    setAttempts(null);
    setLoadError(null);
    Attempts.list(userId, subjectId)
      .then(rows => { if (isCurrent) setAttempts(rows); })
      .catch(error => { if (isCurrent) setLoadError(error.message); });
    return () => { isCurrent = false; };
  }, [userId, subjectId, loadRequest]);

  const mastery = useMemo(() => computeMastery(attempts ?? []), [attempts]);

  const record = async (attempt) => {
    const tempId = `pending-${nextTempId.current++}`;
    const optimistic = {
      id: tempId, question_id: attempt.questionId, topic_id: attempt.topicId, difficulty: attempt.difficulty,
      chosen_index: attempt.chosenIndex, correct: attempt.correct, time_ms: attempt.timeMs, created_at: new Date().toISOString(),
    };
    setAttempts(prev => [...(prev ?? []), optimistic]);
    try {
      const saved = await Attempts.record(userId, subjectId, attempt);
      setAttempts(prev => prev.map(row => (row.id === tempId ? saved : row)));
      return true;
    } catch (error) {
      setAttempts(prev => prev.filter(row => row.id !== tempId));
      onSaveError(error.message);
      return false;
    }
  };

  return { attempts, mastery, loadError, retryLoad: () => setLoadRequest(n => n + 1), record };
}
