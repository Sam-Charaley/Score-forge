import { supabase } from './supabase'
import { unwrap } from './unwrap'

const USERNAME_MIN_LENGTH = 2;
const USERNAME_PATTERN = /^[a-zA-Z0-9_]+$/;
const PLAN_SETTINGS_KEY = 'user_id,subject_id';


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
    const { data: existing, error: lookupError } = await supabase.from('profiles').select('id').eq('username', username).maybeSingle()
    if (lookupError) return { ok: false, error: lookupError.message }
    if (existing) return { ok: false, error: 'Username already taken.' }
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
    unwrap(await supabase.from('selected_subjects').upsert({ user_id: userId, subject_ids: ids, updated_at: new Date() }), 'save your subjects')
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
    unwrap(await supabase.from('progress').upsert({
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
    // The table's primary key is its own id; one plan per subject is enforced
    // by a unique (user_id, subject_id) constraint. Without onConflict the
    // upsert matched on id, so changing an existing plan tried to insert a
    // second row and hit that constraint.
    unwrap(await supabase.from('plan_settings').upsert({
      user_id: userId, subject_id: subjectId,
      duration_days: setting.durationDays, start_date: setting.startDate,
      updated_at: new Date()
    }, { onConflict: PLAN_SETTINGS_KEY }), 'save your study plan')
  },

  async getNote(userId, subjectId, weekId) {
    const data = unwrap(await supabase.from('notes').select('content').eq('user_id', userId).eq('subject_id', subjectId).eq('week_id', weekId).maybeSingle(), 'load your notes')
    return data?.content ?? ''
  },

  async saveNote(userId, subjectId, weekId, content) {
    unwrap(await supabase.from('notes').upsert({ user_id: userId, subject_id: subjectId, week_id: weekId, content, updated_at: new Date() }), 'save your notes')
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
    unwrap(await supabase.from('streaks').upsert({ user_id: userId, count: newCount, last_date: today }), 'update your streak')
    return { count: newCount, last_date: today }
  },
}
