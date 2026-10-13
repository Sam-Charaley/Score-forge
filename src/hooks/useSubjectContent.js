import { useState, useEffect } from 'react'
import { loadSubjects } from '../data/subjectLoader'

// Loads full content for the given subject ids. `subjects` is null until the
// current set has loaded, so a stale set is never shown for a new selection.
export function useSubjectContent(subjectIds) {
  const requestKey = subjectIds.join(',');
  const [result, setResult] = useState({ requestKey: null, subjects: null, error: null });

  useEffect(() => {
    if (subjectIds.length === 0) return;
    let isCurrent = true;
    loadSubjects(subjectIds)
      .then(subjects => { if (isCurrent) setResult({ requestKey, subjects, error: null }); })
      .catch(error => { if (isCurrent) setResult({ requestKey, subjects: null, error }); });
    return () => { isCurrent = false; };
  }, [requestKey]);

  const isForCurrentRequest = result.requestKey === requestKey;
  return {
    subjects: isForCurrentRequest ? result.subjects : null,
    error: isForCurrentRequest ? result.error : null,
  };
}
