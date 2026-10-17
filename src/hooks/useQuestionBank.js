import { useState, useEffect } from 'react'
import { loadQuestionBank, loadTopicMap } from '../data/questions/questionLoader'

const EMPTY_BANK = { status: 'ready', questions: [], units: [], topics: [], exam: null };

// A subject's questions plus its units, topics and exam model (section
// weights and cut points for the predicted score).
// { status: 'loading' | 'ready' | 'error', questions, units, topics, exam, message }
// With enabled false (a subject that has only a formula drill) it is an
// empty, ready bank and nothing loads.
export function useQuestionBank(subjectId, { enabled = true } = {}) {
  const [bank, setBank] = useState(enabled ? { status: 'loading' } : EMPTY_BANK);
  useEffect(() => {
    if (!enabled) { setBank(EMPTY_BANK); return undefined; }
    let isCurrent = true;
    setBank({ status: 'loading' });
    Promise.all([loadQuestionBank(subjectId), loadTopicMap(subjectId)])
      .then(([questions, { units, topics, exam = null }]) => { if (isCurrent) setBank({ status: 'ready', questions, units, topics, exam }); })
      .catch(error => { if (isCurrent) setBank({ status: 'error', message: error.message }); });
    return () => { isCurrent = false; };
  }, [subjectId, enabled]);
  return bank;
}
