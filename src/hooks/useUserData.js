import { useState, useEffect, useRef } from 'react'
import { Auth } from '../services/auth'
import { supabase } from '../services/supabase'
import { taskKey } from '../utils/planEngine'

// If Supabase hasn't answered by then, stop showing the loading screen and fall back to the auth page.
const SESSION_TIMEOUT_MS = 4000

const EMPTY_STREAK = { count: 0, last_date: null }

// Owns the signed-in user and everything loaded for them from Supabase.
// Screens read from this; App decides which screen to show. The callbacks let
// App route after sign-in/out without this hook knowing about screens.
export function useUserData({ onSignedIn, onSignedOut }) {
  const routingCallbacks = useRef({ onSignedIn, onSignedOut });
  routingCallbacks.current = { onSignedIn, onSignedOut };

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState({});
  const [selectedIds, setSelectedIds] = useState(null);
  const [planSettings, setPlanSettings] = useState({});
  const [streak, setStreak] = useState(EMPTY_STREAK);

  const loadUserData = async (sessionUser) => {
    setUser(sessionUser);
    let prof = null;
    try { prof = await Auth.getProfile(sessionUser.id); } catch (e) { }
    if (!prof) {
      const uname = (sessionUser.email?.split('@')[0] || 'user').replace(/[^a-zA-Z0-9_]/g, '_');
      try {
        const { data } = await supabase.from('profiles').insert({ id: sessionUser.id, username: uname }).select().single();
        prof = data;
      } catch (e) { }
      if (!prof) prof = { username: uname };
    }
    const uname = prof?.username || sessionUser.email?.split('@')[0] || 'User';
    setUsername(uname);
    setProfile(prof);
    const [subs, prog, plans, str] = await Promise.all([
      Auth.getSubjects(sessionUser.id),
      Auth.getChecked(sessionUser.id),
      Auth.getPlanSettings(sessionUser.id),
      Auth.getStreak(sessionUser.id),
    ]);
    setSelectedIds(subs);
    setChecked(prog);
    setPlanSettings(plans);
    setStreak(str);
    return { hasPickedSubjects: Boolean(subs) };
  };

  const clearUserData = () => {
    setUser(null); setUsername(null); setProfile(null);
    setChecked({}); setSelectedIds(null); setPlanSettings({});
  };

  const handleSessionUser = async (sessionUser) => {
    if (sessionUser) {
      const { hasPickedSubjects } = await loadUserData(sessionUser);
      routingCallbacks.current.onSignedIn(hasPickedSubjects);
    } else {
      clearUserData();
      routingCallbacks.current.onSignedOut();
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), SESSION_TIMEOUT_MS);
    Auth.getSession().then(async (sessionUser) => {
      clearTimeout(timeout);
      if (sessionUser) await handleSessionUser(sessionUser);
      setLoading(false);
    }).catch(() => { clearTimeout(timeout); setLoading(false); });

    Auth.onAuthChange(async (sessionUser) => {
      await handleSessionUser(sessionUser);
      setLoading(false);
    });
  }, []);

  const signInWith = async (authUser) => {
    await handleSessionUser(authUser);
    await recordStudyActivity(authUser.id);
  };

  // The auth listener above clears state and routes once Supabase confirms the sign-out.
  const signOut = () => Auth.logout();

  const refreshPlanSettings = async () => {
    const plans = await Auth.getPlanSettings(user.id);
    setPlanSettings(plans);
  };

  const recordStudyActivity = async (userId) => {
    const streakData = await Auth.updateStreak(userId);
    setStreak(streakData);
  };

  const saveSubjects = async (ids, newPlanSettings) => {
    await Auth.saveSubjects(user.id, ids);
    setSelectedIds(ids);
    if (newPlanSettings) {
      await Promise.all(Object.entries(newPlanSettings).map(([sid, setting]) =>
        Auth.savePlanSetting(user.id, sid, setting)
      ));
      await refreshPlanSettings();
    }
  };

  const savePlanSetting = async (subjectId, setting) => {
    await Auth.savePlanSetting(user.id, subjectId, setting);
    await refreshPlanSettings();
  };

  const toggleTask = async (subjectId, taskRef) => {
    const key = taskKey(subjectId, taskRef);
    const newDone = !checked[key];
    setChecked(prev => ({ ...prev, [key]: newDone }));
    await Auth.toggleTask(user.id, subjectId, taskRef.weekId, taskRef.dayIdx, taskRef.taskIdx, newDone);
    await recordStudyActivity(user.id);
  };

  const resetProgress = async () => {
    await Auth.resetProgress(user.id);
    setChecked({});
  };

  return {
    user, username, profile, loading,
    checked, selectedIds, planSettings, streak,
    signInWith, signOut, saveSubjects, savePlanSetting, toggleTask, resetProgress,
  };
}
