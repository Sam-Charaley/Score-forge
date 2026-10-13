import { useState, useEffect, useRef } from 'react'
import { Auth } from '../services/auth'
import { taskKey } from '../utils/planEngine'

// If Supabase hasn't answered by then, stop showing the loading screen and fall back to the auth page.
const SESSION_TIMEOUT_MS = 4000

const EMPTY_STREAK = { count: 0, last_date: null }

function fallbackUsername(sessionUser) {
  const fromSignup = sessionUser.user_metadata?.username;
  if (fromSignup) return fromSignup;
  return (sessionUser.email?.split('@')[0] || 'user').replace(/[^a-zA-Z0-9_]/g, '_');
}

// Owns the signed-in user and everything loaded for them from Supabase.
// Screens read from this; App decides which screen to show. The callbacks let
// App route after sign-in/out without this hook knowing about screens.
//
// Every write reports failure through `saveError` and returns false, so the
// UI never shows something as saved when it wasn't.
export function useUserData({ onSignedIn, onSignedOut }) {
  const routingCallbacks = useRef({ onSignedIn, onSignedOut });
  routingCallbacks.current = { onSignedIn, onSignedOut };

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [saveError, setSaveError] = useState(null);
  const [checked, setChecked] = useState({});
  const [selectedIds, setSelectedIds] = useState(null);
  const [planSettings, setPlanSettings] = useState({});
  const [streak, setStreak] = useState(EMPTY_STREAK);

  const loadProfile = async (sessionUser) => {
    const existing = await Auth.getProfile(sessionUser.id);
    if (existing) return existing;
    const username = fallbackUsername(sessionUser);
    try {
      return await Auth.createProfile(sessionUser.id, username);
    } catch {
      // Not fatal: the app works without a profile row; it only supplies the display name.
      return { username };
    }
  };

  // `user` is only set once everything else has arrived, so no screen ever sees
  // a signed-in user with a half-loaded state (e.g. no subject list yet).
  const loadUserData = async (sessionUser) => {
    setLoadError(null);
    try {
      const prof = await loadProfile(sessionUser);
      const [subs, prog, plans, str] = await Promise.all([
        Auth.getSubjects(sessionUser.id),
        Auth.getChecked(sessionUser.id),
        Auth.getPlanSettings(sessionUser.id),
        Auth.getStreak(sessionUser.id),
      ]);
      setUser(sessionUser);
      setProfile(prof);
      setUsername(prof?.username || fallbackUsername(sessionUser));
      setSelectedIds(subs);
      setChecked(prog);
      setPlanSettings(plans);
      setStreak(str);
      return { ok: true, hasPickedSubjects: Boolean(subs) };
    } catch (error) {
      setUser(sessionUser);
      setLoadError(error.message);
      return { ok: false };
    }
  };

  const clearUserData = () => {
    setUser(null); setUsername(null); setProfile(null); setLoadError(null); setSaveError(null);
    setChecked({}); setSelectedIds(null); setPlanSettings({}); setStreak(EMPTY_STREAK);
  };

  const handleSessionUser = async (sessionUser) => {
    if (sessionUser) {
      const result = await loadUserData(sessionUser);
      if (result.ok) routingCallbacks.current.onSignedIn(result.hasPickedSubjects);
    } else {
      clearUserData();
      routingCallbacks.current.onSignedOut();
    }
  };

  // Supabase fires INITIAL_SESSION on subscribe, so the listener alone covers
  // startup (the old separate getSession() call loaded everything twice). The
  // timeout only guards against Supabase never answering.
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), SESSION_TIMEOUT_MS);
    const unsubscribe = Auth.onAuthChange(async (sessionUser) => {
      await handleSessionUser(sessionUser);
      clearTimeout(timeout);
      setLoading(false);
    });
    return () => { clearTimeout(timeout); unsubscribe(); };
  }, []);

  const runSave = async (save) => {
    try {
      await save();
      return true;
    } catch (error) {
      setSaveError(error.message);
      return false;
    }
  };

  // Streak is a nice-to-have: a failure here shouldn't flag the save that triggered it.
  const recordStudyActivity = async (userId) => {
    try {
      setStreak(await Auth.updateStreak(userId));
    } catch (error) {
      console.warn(error.message);
    }
  };

  // Loading happens in the auth listener; an explicit sign-in only counts toward the streak.
  const signInWith = (authUser) => recordStudyActivity(authUser.id);

  // The auth listener clears state and routes once Supabase confirms the sign-out.
  const signOut = () => Auth.logout();

  const retryLoad = async () => {
    if (user) await handleSessionUser(user);
  };

  const refreshPlanSettings = async () => {
    setPlanSettings(await Auth.getPlanSettings(user.id));
  };

  const saveSubjects = (ids, newPlanSettings) => runSave(async () => {
    await Auth.saveSubjects(user.id, ids);
    setSelectedIds(ids);
    if (newPlanSettings && Object.keys(newPlanSettings).length > 0) {
      await Promise.all(Object.entries(newPlanSettings).map(([sid, setting]) =>
        Auth.savePlanSetting(user.id, sid, setting)
      ));
      await refreshPlanSettings();
    }
  });

  const savePlanSetting = (subjectId, setting) => runSave(async () => {
    await Auth.savePlanSetting(user.id, subjectId, setting);
    await refreshPlanSettings();
  });

  // Optimistic: the tick shows immediately and is undone if the save fails.
  const toggleTask = async (subjectId, taskRef) => {
    const key = taskKey(subjectId, taskRef);
    const newDone = !checked[key];
    setChecked(prev => ({ ...prev, [key]: newDone }));
    const saved = await runSave(() => Auth.toggleTask(user.id, subjectId, taskRef.weekId, taskRef.dayIdx, taskRef.taskIdx, newDone));
    if (!saved) {
      setChecked(prev => ({ ...prev, [key]: !newDone }));
      return false;
    }
    await recordStudyActivity(user.id);
    return true;
  };

  const resetProgress = () => runSave(async () => {
    await Auth.resetProgress(user.id);
    setChecked({});
  });

  const saveNote = (subjectId, weekId, content) => runSave(() => Auth.saveNote(user.id, subjectId, weekId, content));

  return {
    user, username, profile, loading, loadError, saveError,
    checked, selectedIds, planSettings, streak,
    signInWith, signOut, retryLoad, dismissSaveError: () => setSaveError(null), reportSaveError: setSaveError,
    saveSubjects, savePlanSetting, toggleTask, resetProgress, saveNote,
  };
}
