import { supabase } from './supabase'
import { unwrap } from './unwrap'

const USERNAME_MIN_LENGTH = 2;
const USERNAME_PATTERN = /^[a-zA-Z0-9_]+$/;
// Every table has its own id primary key, and the row's real identity is a
// separate unique constraint. Upserts must name that constraint's columns:
// without onConflict they match on id, try to insert a second row and fail.
export const UPSERT_KEYS = {
  selected_subjects: 'user_id',
  progress: 'user_id,subject_id,week_id,day_index,task_index',
  plan_settings: 'user_id,subject_id',
  notes: 'user_id,subject_id,week_id',
  streaks: 'user_id',
};
const upsertRow = (table, row) => supabase.from(table).upsert(row, { onConflict: UPSERT_KEYS[table] });


export const Auth = {
  // Returns an unsubscribe function. The callback is deferred a tick because
  // Supabase holds its auth lock while notifying listeners, and making
  // Supabase calls inside that window can deadlock (see supabase-js docs).
  onAuthChange(callback) {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setTimeout(() => callback(session?.user ?? null), 0)
    })
    return () => data.subscription.unsubscribe()
  },

  async signup(email, password, username) {
    if (!username || username.length < USERNAME_MIN_LENGTH) return { ok: false, error: `Username must be at least ${USERNAME_MIN_LENGTH} characters.` }
    if (!USERNAME_PATTERN.test(username)) return { ok: false, error: 'Username can only contain letters, numbers, and underscores.' }
    // Profiles are private, so the check goes through a function that only
    // answers yes or no (see supabase/migrations, username_taken).
    const { data: taken, error: lookupError } = await supabase.rpc('username_taken', { candidate: username })
    if (lookupError) return { ok: false, error: lookupError.message }
    if (taken) return { ok: false, error: 'Username already taken.' }
    // The username also rides along in user_metadata: with email confirmation
    // on there's no session yet, so the profile insert below can be refused by
    // RLS, and first login rebuilds the profile from this.
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { username } } })
    if (error) return { ok: false, error: error.message }
    await supabase.from('profiles').insert({ id: data.user.id, username })
    return { ok: true, user: data.user, username }
  },

  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { ok: false, error: error.message }
    return { ok: true, user: data.user }
  },

  async loginWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    })
    if (error) return { ok: false, error: error.message }
    return { ok: true }
  },

  async logout() {
    await supabase.auth.signOut()
  },

  async getProfile(userId) {
    return unwrap(await supabase.from('profiles').select('*').eq('id', userId).maybeSingle(), 'load your profile')
  },

  async createProfile(userId, username) {
    return unwrap(await supabase.from('profiles').insert({ id: userId, username }).select().single(), 'create your profile')
  },

  async updatePassword(newPassword) {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) return { ok: false, error: error.message }
    return { ok: true }
  },

  async getSubjects(userId) {
    const data = unwrap(await supabase.from('selected_subjects').select('subject_ids').eq('user_id', userId).maybeSingle(), 'load your subjects')
    return data?.subject_ids ?? null
  },

  async saveSubjects(userId, ids) {
    unwrap(await upsertRow('selected_subjects', { user_id: userId, subject_ids: ids, updated_at: new Date() }), 'save your subjects')
  },

  async getChecked(userId) {
    const data = unwrap(await supabase.from('progress').select('*').eq('user_id', userId), 'load your progress')
    const result = {}
    data.forEach(row => {
      if (row.done) result[`${row.subject_id}-${row.week_id}-${row.day_index}-${row.task_index}`] = true
    })
    return result
  },

  async toggleTask(userId, subjectId, weekId, dayIndex, taskIndex, done) {
    unwrap(await upsertRow('progress', {
      user_id: userId,
      subject_id: String(subjectId),
      week_id: parseInt(weekId),
      day_index: parseInt(dayIndex),
      task_index: parseInt(taskIndex),
      done,
      updated_at: new Date()
    }), 'save that task')
  },

  async resetProgress(userId) {
    unwrap(await supabase.from('progress').delete().eq('user_id', userId), 'reset your progress')
  },

  async getPlanSettings(userId) {
    const data = unwrap(await supabase.from('plan_settings').select('*').eq('user_id', userId), 'load your study plans')
    const result = {}
    data.forEach(row => {
      result[row.subject_id] = { durationDays: row.duration_days, startDate: row.start_date }
    })
    return result
  },

  async savePlanSetting(userId, subjectId, setting) {
    unwrap(await upsertRow('plan_settings', {
      user_id: userId, subject_id: subjectId,
      duration_days: setting.durationDays, start_date: setting.startDate,
      updated_at: new Date()
    }), 'save your study plan')
  },

  async getNote(userId, subjectId, weekId) {
    const data = unwrap(await supabase.from('notes').select('content').eq('user_id', userId).eq('subject_id', subjectId).eq('week_id', weekId).maybeSingle(), 'load your notes')
    return data?.content ?? ''
  },

  async saveNote(userId, subjectId, weekId, content) {
    unwrap(await upsertRow('notes', { user_id: userId, subject_id: subjectId, week_id: weekId, content, updated_at: new Date() }), 'save your notes')
  },

  async getStreak(userId) {
    const data = unwrap(await supabase.from('streaks').select('*').eq('user_id', userId).maybeSingle(), 'load your streak')
    return data ?? { count: 0, last_date: null }
  },

  async updateStreak(userId) {
    const today = new Date().toDateString()
    const streak = await Auth.getStreak(userId)
    if (streak.last_date === today) return streak
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1)
    const newCount = streak.last_date === yesterday.toDateString() ? streak.count + 1 : 1
    unwrap(await upsertRow('streaks', { user_id: userId, count: newCount, last_date: today }), 'update your streak')
    return { count: newCount, last_date: today }
  },
}
