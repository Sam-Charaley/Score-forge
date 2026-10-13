import { useState, useEffect, useRef, useCallback } from 'react'
import { Auth } from '../services/auth'

// Wait this long after the last keystroke before saving, so typing a sentence is one write, not forty.
const NOTE_SAVE_DELAY_MS = 800

export const NOTE_STATUS = {
  loading: 'loading',
  idle: 'idle',
  saving: 'saving',
  saved: 'saved',
  error: 'error',
  // The note couldn't be loaded. Editing stays locked so an empty box can't overwrite the real note.
  loadError: 'loadError',
};

// Loads and autosaves the note for one (subject, week). Switching weeks or
// unmounting saves any unsaved text immediately, and a load that finishes
// after the user has moved to another week is ignored.
export function useWeekNote({ userId, subjectId, weekId, saveNote }) {
  const [text, setText] = useState('');
  const [status, setStatus] = useState(NOTE_STATUS.loading);
  const pending = useRef(null);
  const saveNoteRef = useRef(saveNote);
  saveNoteRef.current = saveNote;
  const currentKey = useRef({ subjectId, weekId });
  currentKey.current = { subjectId, weekId };

  const flush = useCallback(async () => {
    const unsaved = pending.current;
    if (!unsaved) return;
    clearTimeout(unsaved.timer);
    pending.current = null;
    const saved = await saveNoteRef.current(unsaved.subjectId, unsaved.weekId, unsaved.text);
    if (unsaved.isCurrent()) setStatus(saved ? NOTE_STATUS.saved : NOTE_STATUS.error);
  }, []);

  useEffect(() => {
    if (!userId) return;
    let isCurrent = true;
    setText('');
    setStatus(NOTE_STATUS.loading);
    Auth.getNote(userId, subjectId, weekId)
      .then(content => { if (isCurrent) { setText(content); setStatus(NOTE_STATUS.idle); } })
      .catch(() => { if (isCurrent) setStatus(NOTE_STATUS.loadError); });
    return () => {
      isCurrent = false;
      flush();
    };
  }, [userId, subjectId, weekId, flush]);

  const updateText = (value) => {
    setText(value);
    setStatus(NOTE_STATUS.saving);
    if (pending.current) clearTimeout(pending.current.timer);
    const target = { subjectId, weekId };
    pending.current = {
      ...target,
      text: value,
      isCurrent: () => target.subjectId === currentKey.current.subjectId && target.weekId === currentKey.current.weekId,
      timer: setTimeout(flush, NOTE_SAVE_DELAY_MS),
    };
  };

  const canEdit = status !== NOTE_STATUS.loading && status !== NOTE_STATUS.loadError;
  return { text, status, canEdit, updateText };
}
