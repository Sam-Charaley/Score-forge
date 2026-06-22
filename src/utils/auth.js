import { supabase } from './supabase'

export const Auth = {
  async getSession() {
    const { data } = await supabase.auth.getSession()
    return data.session?.user ?? null
  },

  async onAuthChange(callback) {
    supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ?? null)
    })
  },

  async signup(email, password, username) {
    if (!username || username.length < 2) return { ok: false, error: 'Username must be at least 2 characters.' }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return { ok: false, error: 'Username can only contain letters, numbers, and underscores.' }
    const { data: existing } = await supabase.from('profiles').select('id').eq('username', username).single()
    if (existing) return { ok: false, error: 'Username already taken.' }
    const { data, error } = await supabase.auth.signUp({ email, password })
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
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
    return data
  },

  async updatePassword(newPassword) {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) return { ok: false, error: error.message }
    return { ok: true }
  },

  async getSubjects(userId) {
    const { data } = await supabase.from('selected_subjects').select('subject_ids').eq('user_id', userId).single()
    return data?.subject_ids ?? null
  },

  async saveSubjects(userId, ids) {
    await supabase.from('selected_subjects').upsert({ user_id: userId, subject_ids: ids, updated_at: new Date() })
  },

  async getChecked(userId) {
    const { data } = await supabase.from('progress').select('*').eq('user_id', userId)
    const result = {}
    data?.forEach(row => {
      if (row.done) result[`${row.subject_id}-${row.week_id}-${row.day_index}-${row.task_index}`] = true
    })
    return result
  },

  async toggleTask(userId, subjectId, weekId, dayIndex, taskIndex, done) {
    await supabase.from('progress').upsert({
      user_id: userId,
      subject_id: String(subjectId),
      week_id: parseInt(weekId),
      day_index: parseInt(dayIndex),
      task_index: parseInt(taskIndex),
      done,
      updated_at: new Date()
    })
  },

  async resetProgress(userId) {
    await supabase.from('progress').delete().eq('user_id', userId)
  },

  async getPlanSettings(userId) {
    const { data } = await supabase.from('plan_settings').select('*').eq('user_id', userId)
    const result = {}
    data?.forEach(row => {
      result[row.subject_id] = { durationDays: row.duration_days, startDate: row.start_date }
    })
    return result
  },

  async savePlanSetting(userId, subjectId, setting) {
    await supabase.from('plan_settings').upsert({
      user_id: userId, subject_id: subjectId,
      duration_days: setting.durationDays, start_date: setting.startDate,
      updated_at: new Date()
    })
  },

  async getNote(userId, subjectId, weekId) {
    const { data } = await supabase.from('notes').select('content').eq('user_id', userId).eq('subject_id', subjectId).eq('week_id', weekId).single()
    return data?.content ?? ''
  },

  async saveNote(userId, subjectId, weekId, content) {
    await supabase.from('notes').upsert({ user_id: userId, subject_id: subjectId, week_id: weekId, content, updated_at: new Date() })
  },

  async getStreak(userId) {
    const { data } = await supabase.from('streaks').select('*').eq('user_id', userId).single()
    return data ?? { count: 0, last_date: null }
  },

  async updateStreak(userId) {
    const today = new Date().toDateString()
    const streak = await Auth.getStreak(userId)
    if (streak.last_date === today) return streak
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1)
    const newCount = streak.last_date === yesterday.toDateString() ? streak.count + 1 : 1
    await supabase.from('streaks').upsert({ user_id: userId, count: newCount, last_date: today })
    return { count: newCount, last_date: today }
  },
}