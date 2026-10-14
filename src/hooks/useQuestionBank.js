import { useState, useEffect } from 'react'
import { loadQuestionBank, loadTopicMap } from '../data/questions/questionLoader'

// A subject's questions plus its units and topics.
// { status: 'loading' | 'ready' | 'error', questions, units, topics, message }
export function useQuestionBank(subjectId) {
  const [bank, setBank] = useState({ status: 'loading' });
  useEffect(() => {
    let isCurrent = true;
    setBank({ status: 'loading' });
    Promise.all([loadQuestionBank(subjectId), loadTopicMap(subjectId)])
      .then(([questions, { units, topics }]) => { if (isCurrent) setBank({ status: 'ready', questions, units, topics }); })
      .catch(error => { if (isCurrent) setBank({ status: 'error', message: error.message }); });
    return () => { isCurrent = false; };
  }, [subjectId]);
  return bank;
}
