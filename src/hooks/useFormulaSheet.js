import { useState, useEffect } from 'react'
import { loadFormulaSheet } from '../data/formulaLoader'

// A subject's formula sheet, or nothing when it has none.
// { status: 'none' | 'loading' | 'ready' | 'error', sheet, message }
export function useFormulaSheet(subjectId, { enabled = true } = {}) {
  const [state, setState] = useState(enabled ? { status: 'loading' } : { status: 'none' });
  useEffect(() => {
    if (!enabled) { setState({ status: 'none' }); return undefined; }
    let isCurrent = true;
    setState({ status: 'loading' });
    loadFormulaSheet(subjectId)
      .then(sheet => { if (isCurrent) setState({ status: 'ready', sheet }); })
      .catch(error => { if (isCurrent) setState({ status: 'error', message: error.message }); });
    return () => { isCurrent = false; };
  }, [subjectId, enabled]);
  return state;
}
