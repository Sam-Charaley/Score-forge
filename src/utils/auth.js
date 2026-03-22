export const Auth = {
  hash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    return btoa(String(h >>> 0));
  },
  getUsers() {
    try { return JSON.parse(localStorage.getItem('sf_users') || '[]'); } catch { return []; }
  },
  saveUsers(users) { localStorage.setItem('sf_users', JSON.stringify(users)); },
  getSession() {
    const raw = localStorage.getItem('sf_session');
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed === 'object' && parsed !== null) {
        const uname = parsed.name || parsed.username || 'User';
        localStorage.setItem('sf_session', uname);
        return uname;
      }
    } catch {}
    return raw;
  },
  login(username, password) {
    const users = Auth.getUsers();
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!user) return { ok: false, error: 'No account found with that username.' };
    if (user.passwordHash !== Auth.hash(password)) return { ok: false, error: 'Incorrect password.' };
    localStorage.setItem('sf_session', user.username);
    return { ok: true, username: user.username };
  },
  signup(username, password) {
    if (!username || username.length < 2) return { ok: false, error: 'Username must be at least 2 characters.' };
    if (!password || password.length < 4) return { ok: false, error: 'Password must be at least 4 characters.' };
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return { ok: false, error: 'Username can only contain letters, numbers, and underscores.' };
    const users = Auth.getUsers();
    if (users.find(u => u.username.toLowerCase() === username.toLowerCase()))
      return { ok: false, error: 'That username is already taken.' };
    users.push({ username, passwordHash: Auth.hash(password), createdAt: Date.now() });
    Auth.saveUsers(users);
    localStorage.setItem('sf_session', username);
    return { ok: true, username };
  },
  logout() { localStorage.removeItem('sf_session'); },
  getChecked(u) {
    try { return JSON.parse(localStorage.getItem(`sf_checked_${u}`) || '{}'); } catch { return {}; }
  },
  saveChecked(u, d) { localStorage.setItem(`sf_checked_${u}`, JSON.stringify(d)); },
  resetProgress(u) { localStorage.removeItem(`sf_checked_${u}`); },
  getSubjects(u) {
    try { const r = localStorage.getItem(`sf_subjects_${u}`); return r ? JSON.parse(r) : null; } catch { return null; }
  },
  saveSubjects(u, ids) { localStorage.setItem(`sf_subjects_${u}`, JSON.stringify(ids)); },
  updatePassword(username, oldPassword, newPassword) {
    const users = Auth.getUsers();
    const idx = users.findIndex(u => u.username === username);
    if (idx === -1) return { ok: false, error: 'User not found.' };
    if (users[idx].passwordHash !== Auth.hash(oldPassword)) return { ok: false, error: 'Current password is incorrect.' };
    if (!newPassword || newPassword.length < 4) return { ok: false, error: 'New password must be at least 4 characters.' };
    users[idx].passwordHash = Auth.hash(newPassword);
    Auth.saveUsers(users);
    return { ok: true };
  },
  getPlanSettings(u) {
    try { const r = localStorage.getItem(`sf_plans_${u}`); return r ? JSON.parse(r) : {}; } catch { return {}; }
  },
  savePlanSetting(u, subjectId, setting) {
    const all = Auth.getPlanSettings(u);
    all[subjectId] = setting;
    localStorage.setItem(`sf_plans_${u}`, JSON.stringify(all));
  },
  getStreak(u) {
    try { return JSON.parse(localStorage.getItem(`sf_streak_${u}`) || '{"count":0,"lastDate":null}'); } catch { return { count: 0, lastDate: null }; }
  },
  updateStreak(u) {
    const today = new Date().toDateString();
    const streak = Auth.getStreak(u);
    if (streak.lastDate === today) return streak;
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    const newCount = streak.lastDate === yesterday.toDateString() ? streak.count + 1 : 1;
    const newStreak = { count: newCount, lastDate: today };
    localStorage.setItem(`sf_streak_${u}`, JSON.stringify(newStreak));
    return newStreak;
  },
};