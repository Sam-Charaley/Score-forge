import { useState, useEffect, useCallback } from 'react'
import { loadFrqs } from '../data/frqs/frqLoader'
import { FrqAttempts } from '../services/frqAttempts'

// A subject's free-response questions plus the student's saved self-checks.
// { status: 'loading' | 'ready' | 'error', frqs, types, attempts, message, record, retry }
export function useFrqSet({ userId, subjectId, onSaveError }) {
  const [state, setState] = useState({ status: 'loading' });
  const [request, setRequest] = useState(0);

  useEffect(() => {
    let isCurrent = true;
    setState({ status: 'loading' });
    Promise.all([loadFrqs(subjectId), FrqAttempts.list(userId, subjectId)])
      .then(([{ frqs, types }, attempts]) => { if (isCurrent) setState({ status: 'ready', frqs, types, attempts }); })
      .catch(error => { if (isCurrent) setState({ status: 'error', message: error.message }); });
    return () => { isCurrent = false; };
  }, [userId, subjectId, request]);

  const record = useCallback(async attempt => {
    try {
      const saved = await FrqAttempts.record(userId, subjectId, attempt);
      setState(prev => (prev.status === 'ready' ? { ...prev, attempts: [...prev.attempts, saved] } : prev));
      return true;
    } catch (error) {
      onSaveError(error.message);
      return false;
    }
  }, [userId, subjectId, onSaveError]);

  return { ...state, record, retry: () => setRequest(n => n + 1) };
}
