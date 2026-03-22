import React, { useState, useEffect, useRef, useMemo } from 'react'
import { SUBJECTS } from './data/subjects'
import { FLASHCARDS } from './data/flashcards'
import { Auth } from './utils/auth'
import { adaptPlanToWindow, fmtDate, addDays, getCurrentPhaseId } from './utils/planEngine'

// ─── UTILITIES ──────────────────────────────────────────────
function daysUntil(dateStr) {
  return Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
}




// ─── DESIGN TOKENS ──────────────────────────────────────────
const C = {
  bg: '#FDFAF5', bg2: '#FAF6EE', bg3: '#F3EDE0',
  border: '#E2D8C8', border2: '#D4C9B4',
  red: '#B91C1C', redLight: '#FEF2F2', redMid: '#FECACA', redDim: '#991B1B',
  text: '#1C1009', text2: '#5C4A32', muted: '#9C8770',
  white: '#FFFFFF',
};

// ─── SHARED COMPONENTS ──────────────────────────────────────
function TopBar({ username, onHome, onAccount, onLogout, activeSubjectId, mySubjects, onSubject, onLibrary, onFlashcards, screen }) {
  return (
    <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 24px', height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, boxShadow: '0 1px 0 #E2D8C8' }}>
      <button onClick={onHome} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: 0 }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: C.red }} />
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', fontWeight: 700, color: C.text, letterSpacing: '-0.01em' }}>Score Forge</span>
      </button>

      {screen === 'study' && mySubjects && (
        <div style={{ display: 'flex', gap: '4px', flex: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          {mySubjects.map(s => {
            const isActive = s.id === activeSubjectId;
            return (
              <button key={s.id} onClick={() => onSubject(s.id)} style={{ background: isActive ? `${s.color}12` : 'transparent', border: `1px solid ${isActive ? s.color : C.border}`, borderRadius: '8px', padding: '4px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', fontWeight: isActive ? 700 : 500, color: isActive ? s.color : C.muted, transition: 'all 0.15s ease' }}>
                {s.icon} {s.shortName}
              </button>
            );
          })}
        </div>
      )}

      <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
        {screen === 'study' && (
          <>
            <button onClick={onFlashcards} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.text2 }}>🃏 Cards</button>
            <button onClick={onLibrary} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.text2 }}>📚 Library</button>
          </>
        )}
        <button onClick={onAccount} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.text2 }}>⚙</button>
        <div style={{ background: C.bg2, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 12px', fontSize: '12px', fontWeight: 600, color: C.text }}>{username}</div>
      </div>
    </div>
  );
}

function Btn({ children, onClick, variant = 'primary', style: extraStyle = {}, disabled }) {
  const base = { border: 'none', borderRadius: '10px', padding: '10px 20px', cursor: disabled ? 'default' : 'pointer', fontFamily: 'inherit', fontSize: '12px', fontWeight: 600, transition: 'all 0.18s ease', letterSpacing: '0.01em', ...extraStyle };
  const variants = {
    primary: { background: C.red, color: 'white', boxShadow: '0 3px 12px rgba(185,28,28,0.2)' },
    ghost: { background: 'transparent', border: `1px solid ${C.border}`, color: C.text2 },
    soft: { background: C.redLight, border: `1px solid ${C.redMid}`, color: C.red },
  };
  return <button onClick={onClick} disabled={disabled} style={{ ...base, ...variants[variant] }}>{children}</button>;
}

// ─── AUTH PAGE ───────────────────────────────────────────────
function AuthPage({ onAuth }) {
  const [tab, setTab] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setError(''); setLoading(true);
    setTimeout(() => {
      if (tab === 'login') {
        const r = Auth.login(username.trim(), password);
        if (r.ok) onAuth(r.username); else setError(r.error);
      } else {
        if (password !== confirmPw) { setError("Passwords don't match."); setLoading(false); return; }
        const r = Auth.signup(username.trim(), password);
        if (r.ok) onAuth(r.username); else setError(r.error);
      }
      setLoading(false);
    }, 180);
  };

  const inp = { width: '100%', padding: '11px 14px', background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: '10px', fontFamily: 'inherit', fontSize: '13px', color: C.text, outline: 'none', boxSizing: 'border-box' };
  const lbl = { display: 'block', fontSize: '11px', fontWeight: 600, color: C.text2, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' };

  return (
    <div style={{ height: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', system-ui, sans-serif", overflow: 'hidden', position: 'relative' }}>
      {/* Background texture */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(#B91C1C06 1.5px, transparent 1.5px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', top: '-15%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(185,28,28,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-10%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(217,119,6,0.04) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '420px', padding: '0 24px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ width: '64px', height: '64px', margin: '0 auto 16px', background: `linear-gradient(135deg, ${C.redLight}, #FFF7ED)`, border: `1.5px solid ${C.redMid}`, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', boxShadow: '0 4px 24px rgba(185,28,28,0.1)' }}>⚒️</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: 700, color: C.text, letterSpacing: '-0.02em', marginBottom: '6px' }}>
            Score <span style={{ color: C.red }}>Forge</span>
          </div>
          <div style={{ color: C.muted, fontSize: '13px' }}>Forge your 5s</div>
        </div>

        {/* Card */}
        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '20px', padding: '32px', boxShadow: '0 4px 32px rgba(28,16,9,0.07)' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '3px', marginBottom: '28px', background: C.bg2, borderRadius: '12px', padding: '3px', border: `1px solid ${C.border}` }}>
            {['login', 'signup'].map(t => (
              <button key={t} onClick={() => { setTab(t); setError(''); }} style={{ flex: 1, background: tab === t ? C.white : 'transparent', border: 'none', borderRadius: '9px', color: tab === t ? C.text : C.muted, fontSize: '12px', padding: '8px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: tab === t ? 600 : 400, boxShadow: tab === t ? '0 1px 4px rgba(28,16,9,0.1)' : 'none' }}>
                {t === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div><label style={lbl}>Username</label><input value={username} onChange={e => setUsername(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} placeholder="your_username" style={inp} autoFocus /></div>
            <div><label style={lbl}>Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} placeholder="••••••••" style={inp} /></div>
            {tab === 'signup' && <div><label style={lbl}>Confirm Password</label><input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} placeholder="••••••••" style={inp} /></div>}
          </div>

          {error && <div style={{ background: '#FEF2F2', border: `1px solid ${C.redMid}`, borderRadius: '8px', padding: '10px 14px', color: C.red, fontSize: '12px', marginTop: '16px' }}>⚠ {error}</div>}

          <button onClick={submit} disabled={loading} style={{ marginTop: '22px', width: '100%', background: loading ? C.bg3 : C.red, border: 'none', borderRadius: '10px', color: loading ? C.muted : 'white', fontSize: '13px', padding: '13px', cursor: loading ? 'default' : 'pointer', fontFamily: 'inherit', fontWeight: 600, boxShadow: loading ? 'none' : '0 4px 16px rgba(185,28,28,0.22)' }}>
            {loading ? '...' : tab === 'login' ? 'Sign In →' : 'Create Account →'}
          </button>
          <div style={{ color: C.muted, fontSize: '10px', textAlign: 'center', marginTop: '14px' }}>Stored locally · No data sent anywhere</div>
        </div>

        {/* Subject chips */}
        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginTop: '22px', flexWrap: 'wrap' }}>
          {SUBJECTS.map(s => (
            <div key={s.id} style={{ background: `${s.color}12`, border: `1px solid ${s.color}25`, borderRadius: '99px', padding: '3px 10px', color: s.color, fontSize: '10px', fontWeight: 500 }}>
              {s.icon} {s.shortName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// ─── SUBJECT PICKER ─────────────────────────────────────────
function SubjectPicker({ username, initial, onSave }) {
  const [selected, setSelected] = useState(() => initial || SUBJECTS.map(s => s.id));
  const [step, setStep] = useState('pick');
  const [globalDays, setGlobalDays] = useState(42);
  const [perSubject, setPerSubject] = useState(() => { const i = {}; SUBJECTS.forEach(s => { i[s.id] = 42; }); return i; });
  const [usePerSubject, setUsePerSubject] = useState(false);

  const toggle = id => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const selectedSubjects = SUBJECTS.filter(s => selected.includes(s.id));
  const today = new Date().toISOString().split('T')[0];
  const todayDate = new Date();

  if (step === 'plan') {
    const finalSettings = selectedSubjects.reduce((acc, s) => {
      acc[s.id] = { durationDays: usePerSubject ? perSubject[s.id] : globalDays, startDate: today };
      return acc;
    }, {});

    return (
      <div style={{ height: '100vh', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', overflowY: 'auto' }}>
        <div style={{ position: 'fixed', inset: 0, backgroundImage: `radial-gradient(${C.border} 1px, transparent 1px)`, backgroundSize: '28px 28px', opacity: 0.6, pointerEvents: 'none' }} />
        <div style={{ width: '100%', maxWidth: '600px', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>🗓️</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: C.text, marginBottom: '8px' }}>Build Your Study Plan</h2>
            <p style={{ color: C.muted, fontSize: '13px' }}>Set how many days you have until each exam. Your plan adapts automatically.</p>
          </div>

          {selectedSubjects.length > 1 && (
            <div style={{ display: 'flex', background: C.bg3, borderRadius: '99px', padding: '4px', marginBottom: '24px', width: 'fit-content', margin: '0 auto 24px', border: `1px solid ${C.border}` }}>
              {[['Same for all', false], ['Per subject', true]].map(([lbl, val]) => (
                <button key={String(val)} onClick={() => setUsePerSubject(val)} style={{ background: usePerSubject === val ? C.white : 'transparent', border: 'none', borderRadius: '99px', padding: '7px 18px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '12px', fontWeight: usePerSubject === val ? 600 : 400, color: usePerSubject === val ? C.text : C.muted, boxShadow: usePerSubject === val ? '0 1px 4px rgba(28,16,9,0.1)' : 'none' }}>{lbl}</button>
              ))}
            </div>
          )}

          {!usePerSubject && (
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '28px', marginBottom: '20px' }}>
              <div style={{ color: C.muted, fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '14px' }}>Study Duration</div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <input type="number" min="1" max="730" value={globalDays} onChange={e => setGlobalDays(Math.max(1,parseInt(e.target.value)||1))}
                  style={{ width: '90px', textAlign: 'center', fontSize: '28px', fontWeight: 800, color: C.red, background: C.redLight, border: `2px solid ${C.redMid}`, borderRadius: '10px', padding: '10px', fontFamily: 'inherit', outline: 'none' }} />
                <div>
                  <div style={{ color: C.red, fontSize: '13px', fontWeight: 700 }}>{globalDays <= 7 ? '⚡ Crash Course' : globalDays <= 14 ? '🔥 Intensive' : globalDays <= 30 ? '📅 Standard' : globalDays <= 60 ? '✨ Comfortable' : '📚 Thorough'}</div>
                  <div style={{ color: C.muted, fontSize: '11px' }}>ends {fmtDate(addDays(new Date(), globalDays))}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '14px', flexWrap: 'wrap' }}>
                {[7, 14, 30, 60, 90].map(d => (
                  <button key={d} onClick={() => setGlobalDays(d)} style={{ background: globalDays === d ? C.redLight : C.bg2, border: `1px solid ${globalDays === d ? C.red : C.border}`, borderRadius: '99px', padding: '4px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: globalDays === d ? C.red : C.muted, fontWeight: globalDays === d ? 700 : 400 }}>{d}d</button>
                ))}
                {selectedSubjects.map(s => {
                  const d = Math.max(1, daysUntil(s.examDate));
                  return <button key={s.id} onClick={() => setGlobalDays(d)} style={{ background: globalDays === d ? `${s.color}15` : C.bg2, border: `1px solid ${globalDays === d ? s.color : C.border}`, borderRadius: '99px', padding: '4px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: globalDays === d ? s.color : C.muted, fontWeight: globalDays === d ? 700 : 400 }}>🎯 {s.shortName} ({d}d)</button>;
                })}
              </div>
            </div>
          )}

          {usePerSubject && selectedSubjects.map(s => (
            <div key={s.id} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '20px 24px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ width: '32px', height: '32px', background: `${s.color}15`, border: `1px solid ${s.color}30`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>{s.icon}</div>
                <div style={{ color: C.text, fontSize: '13px', fontWeight: 700 }}>{s.shortName}</div>
                <button onClick={() => setPerSubject(p => ({ ...p, [s.id]: Math.max(1, daysUntil(s.examDate)) }))} style={{ marginLeft: 'auto', background: C.redLight, border: `1px solid ${C.redMid}`, borderRadius: '99px', padding: '3px 10px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '10px', color: C.red, fontWeight: 600 }}>🎯 Till exam</button>
              </div>
              <input type="number" min="1" max="730" value={perSubject[s.id]} onChange={e => setPerSubject(p => ({ ...p, [s.id]: Math.max(1, parseInt(e.target.value)||1) }))}
                style={{ width: '80px', textAlign: 'center', fontSize: '22px', fontWeight: 800, color: s.color, background: `${s.color}10`, border: `2px solid ${s.color}30`, borderRadius: '8px', padding: '6px', fontFamily: 'inherit', outline: 'none' }} />
              <span style={{ marginLeft: '8px', color: C.muted, fontSize: '12px' }}>days</span>
            </div>
          ))}

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <Btn onClick={() => setStep('pick')} variant="ghost">← Back</Btn>
            <Btn onClick={() => onSave(selected, finalSettings)}>Start Studying →</Btn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', overflowY: 'auto' }}>
      <div style={{ position: 'fixed', inset: 0, backgroundImage: `radial-gradient(${C.border} 1px, transparent 1px)`, backgroundSize: '28px 28px', opacity: 0.6, pointerEvents: 'none' }} />
      <div style={{ width: '100%', maxWidth: '600px', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: C.text, marginBottom: '6px' }}>{initial ? 'Edit Your Subjects' : `Welcome aboard!`}</div>
          <p style={{ color: C.muted, fontSize: '13px' }}>Choose which AP exams you're preparing for.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '10px', marginBottom: '24px' }}>
          {SUBJECTS.map(s => {
            const on = selected.includes(s.id);
            return (
              <button key={s.id} onClick={() => toggle(s.id)} style={{ background: on ? `${s.color}10` : C.white, border: `2px solid ${on ? s.color : C.border}`, borderRadius: '14px', padding: '16px 14px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', position: 'relative', transition: 'all 0.18s ease' }}>
                <div style={{ position: 'absolute', top: '10px', right: '10px', width: '18px', height: '18px', borderRadius: '50%', background: on ? s.color : 'transparent', border: `2px solid ${on ? s.color : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {on && <span style={{ color: 'white', fontSize: '9px', fontWeight: 900 }}>✓</span>}
                </div>
                <div style={{ fontSize: '20px', marginBottom: '8px' }}>{s.icon}</div>
                <div style={{ color: on ? s.color : C.text, fontSize: '12px', fontWeight: 700, marginBottom: '2px' }}>{s.shortName}</div>
                <div style={{ color: C.muted, fontSize: '10px', lineHeight: '1.4' }}>{s.examInfo.split('·')[0].trim()}</div>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <span style={{ color: C.muted, fontSize: '12px' }}>{selected.length === 0 ? 'Select at least one' : `${selected.length} selected`}</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {selected.length !== SUBJECTS.length && <Btn onClick={() => setSelected(SUBJECTS.map(s => s.id))} variant="ghost" style={{ fontSize: '11px', padding: '8px 16px' }}>Select All</Btn>}
            <Btn onClick={() => selected.length > 0 && setStep('plan')} style={{ opacity: selected.length > 0 ? 1 : 0.4, fontSize: '12px' }}>{initial ? 'Save Changes →' : 'Next: Set Duration →'}</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── HOME PAGE ──────────────────────────────────────────────
function HomePage({ username, checked, mySubjects, planSettings, onNavigate, onLogout, onEditSubjects, onAdjustPlan }) {
  const streak = Auth.getStreak(username);
  const allProgress = mySubjects.map(s => {
    let total = 0, done = 0;
    s.weeks.forEach(wk => wk.days.forEach((day, di) => day.tasks.forEach((_, ti) => {
      total++; if (checked[`${s.id}-${wk.id}-${di}-${ti}`]) done++;
    })));
    return { ...s, total, done, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
  });
  const totalDone = allProgress.reduce((a, s) => a + s.done, 0);
  const totalTasks = allProgress.reduce((a, s) => a + s.total, 0);
  const totalPct = totalTasks === 0 ? 0 : Math.round((totalDone / totalTasks) * 100);
  const totalCards = mySubjects.reduce((a, s) => a + (FLASHCARDS[s.id]||[]).length, 0);
  const nextExam = [...mySubjects].sort((a, b) => new Date(a.examDate) - new Date(b.examDate)).find(s => daysUntil(s.examDate) > 0);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  // Today's focus: find the subject with the nearest exam
  const todayFocusSubject = nextExam;
  const todayFocusPlan = todayFocusSubject ? planSettings[todayFocusSubject.id] : null;
  const todayAdapted = todayFocusSubject && todayFocusPlan
    ? adaptPlanToWindow(todayFocusSubject, todayFocusPlan.durationDays, todayFocusPlan.startDate)
    : null;
  const currentPhaseId = todayAdapted ? getCurrentPhaseId(todayAdapted, todayFocusPlan?.startDate) : null;
  const currentPhase = todayAdapted?.find(w => w.id === currentPhaseId);

  return (
    <div style={{ height: '100vh', background: C.bg, display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 28px', height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: C.red }} />
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', fontWeight: 700, color: C.text }}>Score Forge</span>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {streak.count > 0 && <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '99px', padding: '4px 12px', fontSize: '11px', color: '#9A3412', fontWeight: 700 }}>🔥 {streak.count} day streak</div>}
          <button onClick={onEditSubjects} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.text2 }}>✎ Subjects</button>
          <button onClick={onAdjustPlan} style={{ background: C.redLight, border: `1px solid ${C.redMid}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.red, fontWeight: 600 }}>🗓 Plans</button>
          <button onClick={() => onNavigate('library')} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.text2 }}>📚 Library</button>
          <button onClick={() => onNavigate('account')} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.text2 }}>⚙</button>
          <div style={{ background: C.bg2, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 12px', fontSize: '12px', fontWeight: 600, color: C.text }}>{username}</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 32px', background: C.bg }}>
        <div style={{ maxWidth: '1020px', margin: '0 auto' }}>

          {/* Greeting */}
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 700, color: C.text, letterSpacing: '-0.02em', marginBottom: '6px' }}>
              {greeting}, <span style={{ color: C.red }}>{username}</span> 👋
            </h1>
            <p style={{ color: C.muted, fontSize: '14px' }}>
              {totalDone === 0 ? 'Ready to start forging your scores?' : `${totalDone} of ${totalTasks} tasks complete across all subjects.`}
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '24px' }}>
            {[
              { label: 'Overall Progress', value: `${totalPct}%`, sub: `${totalDone} / ${totalTasks} tasks`, color: C.red },
              { label: 'Subjects', value: `${mySubjects.length}`, sub: 'AP courses tracked', color: '#2563eb' },
              { label: 'Flashcards', value: `${totalCards}`, sub: 'total cards available', color: '#d97706' },
              { label: 'Next Exam', value: nextExam ? `${daysUntil(nextExam.examDate)}d` : '—', sub: nextExam ? nextExam.shortName : 'All done!', color: nextExam ? nextExam.color : C.muted },
            ].map((s, i) => (
              <div key={i} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(28,16,9,0.04)' }}>
                <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted, marginBottom: '8px' }}>{s.label}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 700, color: s.color, lineHeight: 1, letterSpacing: '-0.02em' }}>{s.value}</div>
                <div style={{ color: C.muted, fontSize: '11px', marginTop: '4px' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Today's Focus */}
          {currentPhase && (
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `4px solid ${todayFocusSubject.color}`, borderRadius: '16px', padding: '18px 22px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(28,16,9,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted }}>📍 Today's Focus</div>
                <div style={{ background: `${todayFocusSubject.color}15`, border: `1px solid ${todayFocusSubject.color}30`, borderRadius: '99px', padding: '1px 8px', fontSize: '10px', color: todayFocusSubject.color, fontWeight: 600 }}>{todayFocusSubject.shortName}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: C.text, marginBottom: '2px' }}>{currentPhase.label}: {currentPhase.theme}</div>
                  <div style={{ fontSize: '12px', color: C.muted }}>{currentPhase.dates} · {currentPhase.examWeight} of exam</div>
                </div>
                <button onClick={() => onNavigate('study', todayFocusSubject.id)} style={{ background: todayFocusSubject.color, border: 'none', borderRadius: '10px', color: 'white', fontSize: '12px', fontWeight: 600, padding: '9px 18px', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Next exam banner */}
          {nextExam && (
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.red}`, borderRadius: '16px', padding: '18px 22px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap', boxShadow: '0 1px 3px rgba(28,16,9,0.04)' }}>
              <div style={{ fontSize: '26px' }}>{nextExam.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.muted, marginBottom: '2px' }}>Next Exam</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: C.text, marginBottom: '2px' }}>{nextExam.name}</div>
                <div style={{ fontSize: '12px', color: C.muted }}>{nextExam.examInfo}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '40px', fontWeight: 700, color: C.red, lineHeight: 1 }}>{daysUntil(nextExam.examDate)}</div>
                <div style={{ fontSize: '11px', color: C.muted }}>days away</div>
              </div>
              <Btn onClick={() => onNavigate('study', nextExam.id)} style={{ whiteSpace: 'nowrap' }}>Study Now →</Btn>
            </div>
          )}

          {/* No plan CTA */}
          {(!planSettings || Object.keys(planSettings).length === 0) && (
            <div style={{ background: C.redLight, border: `1px solid ${C.redMid}`, borderRadius: '16px', padding: '18px 22px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '26px' }}>🗓️</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: C.red, fontSize: '14px', fontWeight: 700, marginBottom: '3px' }}>Set up your adaptive study plan</div>
                <div style={{ color: '#9A3412', fontSize: '12px', lineHeight: 1.6 }}>Tell us how much time you have — 1 week or 6 months — and your plan shapes itself perfectly.</div>
              </div>
              <Btn onClick={onAdjustPlan} style={{ whiteSpace: 'nowrap' }}>Set up plans →</Btn>
            </div>
          )}

          {/* Subjects grid */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted }}>My Subjects ({mySubjects.length})</div>
            <button onClick={onEditSubjects} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '3px 10px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '10px', color: C.muted }}>✎ Edit</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px', marginBottom: '28px' }}>
            {allProgress.map(sub => {
              const days = daysUntil(sub.examDate);
              const urgency = days < 14 ? C.red : days < 30 ? '#d97706' : sub.color;
              return (
                <div key={sub.id} onClick={() => onNavigate('study', sub.id)}
                  style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '18px 20px', cursor: 'pointer', transition: 'all 0.18s ease', boxShadow: '0 1px 3px rgba(28,16,9,0.04)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = sub.color + '50'; e.currentTarget.style.boxShadow = `0 4px 16px rgba(28,16,9,0.09)`; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = '0 1px 3px rgba(28,16,9,0.04)'; e.currentTarget.style.transform = 'none'; }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '36px', height: '36px', background: `${sub.color}12`, border: `1px solid ${sub.color}25`, borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>{sub.icon}</div>
                      <div>
                        <div style={{ color: C.text, fontSize: '12px', fontWeight: 700 }}>{sub.name}</div>
                        <div style={{ color: C.muted, fontSize: '10px', marginTop: '1px' }}>{sub.weeks.length} weeks · {(FLASHCARDS[sub.id]||[]).length} cards{planSettings[sub.id] ? ` · ${planSettings[sub.id].durationDays}d plan` : ''}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: urgency, fontSize: '16px', fontWeight: 700 }}>{days}d</div>
                      <div style={{ color: C.muted, fontSize: '10px' }}>until exam</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ color: C.muted, fontSize: '10px' }}>{sub.done}/{sub.total} tasks</span>
                    <span style={{ color: sub.color, fontSize: '10px', fontWeight: 700 }}>{sub.pct}%</span>
                  </div>
                  <div style={{ height: '6px', background: C.bg3, borderRadius: '99px', overflow: 'hidden', marginBottom: '12px' }}>
                    <div style={{ height: '100%', width: `${sub.pct}%`, background: sub.color, borderRadius: '99px', transition: 'width 0.4s ease' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <div style={{ flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '5px 8px', textAlign: 'center', color: sub.color, fontSize: '10px', fontWeight: 500 }}>📅 Study</div>
                    <div onClick={e => { e.stopPropagation(); onNavigate('flashcards', sub.id); }} style={{ flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '5px 8px', textAlign: 'center', color: C.muted, fontSize: '10px', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = sub.color} onMouseLeave={e => e.currentTarget.style.color = C.muted}>🃏 Cards</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ color: C.muted, fontSize: '11px' }}>Score Forge · Built for AP 2026</div>
            <button onClick={onLogout} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 14px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '10px', color: C.muted }}>Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── STUDY PAGE ─────────────────────────────────────────────
function StudyPage({ username, subject, adaptedWeeks, checked, toggleTask, getTaskKey, planDays, planStart, onAdjustPlan, onBack, onFlashcards, onLibrary, onSubject, mySubjects, screen }) {
  const [activeWeek, setActiveWeek] = useState(() => {
    const id = getCurrentPhaseId(adaptedWeeks, planStart);
    return id;
  });
  const [activeTab, setActiveTab] = useState('days');
  const w = adaptedWeeks.find(wk => wk.id === activeWeek) || adaptedWeeks[0];
  const todayDate = new Date();

  const weekProgress = wk => {
    let total = 0, done = 0;
    wk.days.forEach((day, di) => day.tasks.forEach((_, ti) => {
      total++; if (checked[getTaskKey(wk.id, di, ti)]) done++;
    }));
    return total === 0 ? 0 : Math.round((done / total) * 100);
  };

  const subjectProgress = () => {
    let total = 0, done = 0;
    subject.weeks.forEach(wk => wk.days.forEach((day, di) => day.tasks.forEach((_, ti) => {
      total++; if (checked[`${subject.id}-${wk.id}-${di}-${ti}`]) done++;
    })));
    return total === 0 ? 0 : Math.round((done / total) * 100);
  };

  const tabs = [
    { id: 'days', label: '📅 Daily Plan' },
    { id: 'rules', label: '📌 Key Rules' },
    { id: 'resources', label: '🔗 Resources' },
    ...(w && w.frq ? [{ id: 'frq', label: '✍ FRQ' }] : []),
  ];

  const examDays = daysUntil(subject.examDate);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: C.bg }}>
      {/* Top bar */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 20px', height: '54px', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: 0 }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: C.red }} />
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 700, color: C.text }}>Score Forge</span>
        </button>

        <div style={{ display: 'flex', gap: '4px', flex: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          {mySubjects.map(s => {
            const isActive = s.id === subject.id;
            return (
              <button key={s.id} onClick={() => onSubject(s.id)} style={{ background: isActive ? `${s.color}12` : 'transparent', border: `1px solid ${isActive ? s.color : C.border}`, borderRadius: '8px', padding: '4px 11px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', fontWeight: isActive ? 700 : 500, color: isActive ? s.color : C.muted }}>
                {s.icon} {s.shortName}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: '5px' }}>
          <button onClick={onFlashcards} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 11px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.text2 }}>🃏 Cards</button>
          <button onClick={onLibrary} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 11px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.text2 }}>📚 Library</button>
        </div>
      </div>

      {/* Subject bar */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '8px 22px', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, flexWrap: 'wrap' }}>
        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: subject.color }} />
        <span style={{ color: subject.color, fontSize: '12px', fontWeight: 700 }}>{subject.name}</span>
        <span style={{ color: C.muted, fontSize: '11px' }}>·</span>
        <span style={{ color: C.muted, fontSize: '11px' }}>{subject.examInfo}</span>

        {/* Countdown pill */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: examDays < 14 ? '#FEF2F2' : examDays < 30 ? '#FFF7ED' : C.bg2, border: `1px solid ${examDays < 14 ? C.redMid : examDays < 30 ? '#FED7AA' : C.border}`, borderRadius: '99px', padding: '3px 12px', fontSize: '11px', fontWeight: 700, color: examDays < 14 ? C.red : examDays < 30 ? '#9A3412' : C.text2 }}>
            ⏱ {examDays}d until exam
          </div>
          {planDays && (
            <div style={{ background: C.redLight, border: `1px solid ${C.redMid}`, borderRadius: '99px', padding: '3px 10px', fontSize: '10px', color: C.red, fontWeight: 700 }}>
              {planDays}d plan · {adaptedWeeks.length} phases
            </div>
          )}
          <button onClick={onAdjustPlan} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '99px', color: C.muted, fontSize: '10px', padding: '3px 11px', cursor: 'pointer', fontFamily: 'inherit' }}>⚙ Adjust Plan</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ width: '210px', minWidth: '210px', borderRight: `1px solid ${C.border}`, background: C.white, overflowY: 'auto', padding: '8px 0' }}>
          <div style={{ padding: '12px 14px 10px', borderBottom: `1px solid ${C.border}`, marginBottom: '4px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: C.text, marginBottom: '6px' }}>{subject.shortName}</div>
            <div style={{ height: '4px', background: C.bg3, borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${subjectProgress()}%`, background: subject.color, borderRadius: '99px' }} />
            </div>
            <div style={{ fontSize: '10px', color: C.muted, marginTop: '4px' }}>{subjectProgress()}% complete</div>
          </div>

          {adaptedWeeks.map(wk => {
            const pct = weekProgress(wk);
            const isActive = activeWeek === wk.id;
            const isCurrentPhase = getCurrentPhaseId(adaptedWeeks, planStart) === wk.id;
            return (
              <button key={wk.id} onClick={() => { setActiveWeek(wk.id); setActiveTab('days'); }}
                style={{ display: 'block', width: '100%', textAlign: 'left', background: isActive ? `${wk.color}08` : 'transparent', border: 'none', borderLeft: `3px solid ${isActive ? wk.color : 'transparent'}`, padding: '10px 13px', cursor: 'pointer', transition: 'all 0.12s ease', position: 'relative' }}>
                {isCurrentPhase && !isActive && <div style={{ position: 'absolute', top: '8px', right: '10px', width: '6px', height: '6px', borderRadius: '50%', background: C.red }} />}
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: isActive ? wk.color : C.muted, marginBottom: '2px' }}>{wk.isExamWeek ? '🎯 EXAM' : wk.label}</div>
                <div style={{ fontSize: '11px', fontWeight: 500, color: C.text, lineHeight: '1.3', marginBottom: '5px' }}>{wk.theme.length > 26 ? wk.theme.slice(0, 25) + '…' : wk.theme}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ flex: 1, height: '3px', background: C.bg3, borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: wk.color, borderRadius: '99px' }} />
                  </div>
                  <span style={{ fontSize: '9px', color: C.muted }}>{pct}%</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main content */}
        {w && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '26px 34px', background: C.bg }}>
            <div style={{ maxWidth: '720px' }}>

              {!planDays && (
                <div style={{ background: C.redLight, border: `1px solid ${C.redMid}`, borderRadius: '14px', padding: '16px 20px', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '22px' }}>🗓️</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: C.red, fontSize: '12px', fontWeight: 700, marginBottom: '3px' }}>No study plan set</div>
                    <div style={{ color: '#9A3412', fontSize: '11px' }}>Tell us your timeline and we'll pace this perfectly for you.</div>
                  </div>
                  <Btn onClick={onAdjustPlan} style={{ whiteSpace: 'nowrap', fontSize: '11px', padding: '8px 16px' }}>Set up →</Btn>
                </div>
              )}

              {/* Week header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: w.color, boxShadow: `0 0 8px ${w.color}60`, flexShrink: 0 }} />
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, letterSpacing: '-0.01em', color: C.text }}>{w.isExamWeek ? '🎯 Exam Week' : w.label}: {w.theme}</h2>
              </div>
              <div style={{ color: C.muted, fontSize: '12px', marginBottom: '16px', marginLeft: '16px' }}>
                {w.dates} &nbsp;·&nbsp; <span style={{ color: w.color, fontWeight: 600 }}>{w.examWeight} of exam</span>
              </div>

              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${w.color}`, borderRadius: '12px', padding: '14px 18px', fontSize: '13px', lineHeight: '1.8', color: C.text2, marginBottom: '18px' }}>
                {w.overview}
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '18px', background: C.bg2, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '4px', width: 'fit-content' }}>
                {tabs.map(t => (
                  <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ background: activeTab === t.id ? C.white : 'transparent', border: activeTab === t.id ? `1px solid ${w.color}30` : '1px solid transparent', borderRadius: '8px', padding: '7px 14px', color: activeTab === t.id ? w.color : C.muted, cursor: 'pointer', fontSize: '12px', fontFamily: 'inherit', fontWeight: activeTab === t.id ? 600 : 400, boxShadow: activeTab === t.id ? '0 1px 4px rgba(28,16,9,0.08)' : 'none' }}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Days tab */}
              {activeTab === 'days' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {w.days.map((day, di) => (
                    <div key={di} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '14px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(28,16,9,0.04)' }}>
                      <div style={{ padding: '9px 16px', borderBottom: `1px solid ${C.border}`, color: w.color, fontSize: '11px', fontWeight: 700, letterSpacing: '0.03em', background: `${w.color}06` }}>{day.day}</div>
                      {day.tasks.map((task, ti) => {
                        const key = getTaskKey(w.id, di, ti);
                        const done = !!checked[key];
                        return (
                          <div key={ti} onClick={() => toggleTask(w.id, di, ti)}
                            style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 16px', borderBottom: ti < day.tasks.length - 1 ? `1px solid ${C.bg2}` : 'none', cursor: 'pointer', background: done ? `${w.color}05` : 'transparent', transition: 'background 0.12s ease' }}>
                            <div style={{ width: '18px', height: '18px', minWidth: '18px', borderRadius: '6px', marginTop: '1px', border: `1.5px solid ${done ? w.color : C.border2}`, background: done ? w.color : C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.18s ease', flexShrink: 0 }}>
                              {done && <span style={{ color: 'white', fontSize: '9px', fontWeight: 900 }}>✓</span>}
                            </div>
                            <span style={{ fontSize: '13px', color: done ? C.muted : C.text, textDecoration: done ? 'line-through' : 'none', lineHeight: '1.6', fontWeight: done ? 400 : 500 }}>{task}</span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  <div className="callout-tip">
                    <div style={{ color: '#9A3412', fontSize: '11px', fontWeight: 700, marginBottom: '7px', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>💡 Pro Tip</div>
                    <div style={{ color: '#7C2D12', fontSize: '13px', lineHeight: '1.7' }}>{w.tip}</div>
                  </div>
                </div>
              )}

              {/* Rules tab */}
              {activeTab === 'rules' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {w.keyRules.map((rule, i) => (
                    <div key={i} style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${w.color}`, borderRadius: '10px', padding: '12px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: w.color, fontWeight: 700, fontSize: '14px', lineHeight: 1, flexShrink: 0 }}>→</span>
                      <span style={{ color: C.text2, fontSize: '13px', lineHeight: '1.7', fontWeight: 500 }}>{rule}</span>
                    </div>
                  ))}
                  <div className="callout-tip">
                    <div style={{ color: '#9A3412', fontSize: '11px', fontWeight: 700, marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>💡 Pro Tip</div>
                    <div style={{ color: '#7C2D12', fontSize: '13px', lineHeight: '1.7' }}>{w.tip}</div>
                  </div>
                </div>
              )}

              {/* Resources tab */}
              {activeTab === 'resources' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ color: C.muted, fontSize: '10px', marginBottom: '4px' }}>Resources for {w.label}'s topics:</div>
                  {w.resources.map((r, i) => (
                    <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                      style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '12px 16px', textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '10px', transition: 'border-color 0.15s ease' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = w.color + '50'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                      <span style={{ color: w.color, fontSize: '14px', marginTop: '1px' }}>↗</span>
                      <div>
                        <div style={{ color: C.text, fontSize: '12px', fontWeight: 600, marginBottom: '2px' }}>{r.name}</div>
                        <div style={{ color: C.muted, fontSize: '11px', lineHeight: '1.5' }}>{r.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {/* FRQ tab */}
              {activeTab === 'frq' && w.frq && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ background: C.white, border: `1px solid ${w.color}30`, borderLeft: `3px solid ${w.color}`, borderRadius: '14px', padding: '18px 20px' }}>
                    <div style={{ color: w.color, fontSize: '11px', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>✍ This Week's FRQ</div>
                    <div style={{ color: C.text, fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>{w.frq.type}</div>
                    <div style={{ color: C.text2, fontSize: '13px', lineHeight: '1.8' }}>{w.frq.prompt}</div>
                  </div>
                  <div className="callout-rubric">
                    <div style={{ color: '#1D4ED8', fontSize: '11px', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>📋 Rubric Wisdom</div>
                    <div style={{ color: '#1E40AF', fontSize: '13px', lineHeight: '1.7' }}>{w.frq.rubricTip}</div>
                  </div>
                  <div className="callout-tip">
                    <div style={{ color: '#9A3412', fontSize: '11px', fontWeight: 700, marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>💡 Pro Tip</div>
                    <div style={{ color: '#7C2D12', fontSize: '13px', lineHeight: '1.7' }}>{w.tip}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


// ─── FLASHCARD MODE ─────────────────────────────────────────
function FlashcardMode({ subject, mySubjects, onBack, onSubject }) {
  const cards = FLASHCARDS[subject.id] || [];
  const [deck, setDeck] = useState(() => [...cards]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(new Set());
  const [unknown, setUnknown] = useState(new Set());
  const [finished, setFinished] = useState(false);

  const card = deck[idx];
  const progress = deck.length > 0 ? Math.round(((known.size + unknown.size) / Math.max(cards.length,1)) * 100) : 0;

  const shuffle = () => { setDeck([...cards].sort(() => Math.random() - 0.5)); setIdx(0); setFlipped(false); setKnown(new Set()); setUnknown(new Set()); setFinished(false); };
  const reviewUnknown = () => { const missed = cards.filter((_, i) => unknown.has(i)); if (!missed.length) return; setDeck(missed.sort(() => Math.random() - 0.5)); setIdx(0); setFlipped(false); setKnown(new Set()); setUnknown(new Set()); setFinished(false); };
  const mark = (isKnown) => {
    const cardIdx = cards.indexOf(card);
    if (isKnown) setKnown(prev => new Set([...prev, cardIdx]));
    else setUnknown(prev => new Set([...prev, cardIdx]));
    if (idx + 1 >= deck.length) setFinished(true);
    else { setIdx(i => i + 1); setFlipped(false); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: C.bg }}>
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 20px', height: '54px', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.text2 }}>← Back</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: subject.color }} />
          <span style={{ color: subject.color, fontSize: '13px', fontWeight: 700 }}>🃏 {subject.shortName} Flashcards</span>
          <span style={{ color: C.muted, fontSize: '11px' }}>· {cards.length} cards</span>
        </div>
        <div style={{ display: 'flex', gap: '5px', marginLeft: '10px' }}>
          {mySubjects.map(s => (
            <button key={s.id} onClick={() => onSubject(s.id)} style={{ background: s.id === subject.id ? `${s.color}12` : 'transparent', border: `1px solid ${s.id === subject.id ? s.color : C.border}`, borderRadius: '8px', padding: '3px 9px', cursor: 'pointer', color: s.id === subject.id ? s.color : C.muted, fontSize: '10px', fontFamily: 'inherit', fontWeight: s.id === subject.id ? 700 : 400 }}>{s.shortName}</button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
          <button onClick={shuffle} style={{ background: 'transparent', border: `1px solid ${subject.color}40`, borderRadius: '10px', color: subject.color, fontSize: '11px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit' }}>⟳ Shuffle</button>
          {unknown.size > 0 && <button onClick={reviewUnknown} style={{ background: C.redLight, border: `1px solid ${C.redMid}`, borderRadius: '10px', color: C.red, fontSize: '11px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit' }}>Review Missed ({unknown.size})</button>}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '620px', marginBottom: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ color: C.muted, fontSize: '11px' }}>{Math.min(idx + 1, deck.length)} / {deck.length}</span>
            <span style={{ fontSize: '11px' }}><span style={{ color: '#166534' }}>✓ {known.size}</span> · <span style={{ color: C.red }}>✗ {unknown.size}</span></span>
          </div>
          <div style={{ height: '5px', background: C.bg3, borderRadius: '99px', overflow: 'hidden', border: `1px solid ${C.border}` }}>
            <div style={{ height: '100%', width: `${progress}%`, background: subject.color, borderRadius: '99px', transition: 'width 0.3s' }} />
          </div>
        </div>

        {finished ? (
          <div style={{ maxWidth: '620px', width: '100%', background: C.white, border: `1px solid ${C.border}`, borderRadius: '20px', padding: '40px 32px', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎉</div>
            <div style={{ fontFamily: "'Playfair Display', serif", color: subject.color, fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Deck Complete!</div>
            <div style={{ color: C.muted, fontSize: '13px', marginBottom: '24px' }}><span style={{ color: '#166534' }}>✓ {known.size} known</span> · <span style={{ color: C.red }}>✗ {unknown.size} need review</span></div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Btn onClick={shuffle} variant="ghost">Reshuffle All</Btn>
              {unknown.size > 0 && <Btn onClick={reviewUnknown} variant="soft">Review {unknown.size} Missed</Btn>}
            </div>
          </div>
        ) : card ? (
          <>
            <div onClick={() => setFlipped(f => !f)} style={{ width: '100%', maxWidth: '620px', minHeight: '220px', background: flipped ? `${subject.color}08` : C.white, border: `1.5px solid ${flipped ? subject.color + '50' : C.border}`, borderRadius: '20px', padding: '32px 36px', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 12px rgba(28,16,9,0.06)' }}>
              <div style={{ color: C.muted, fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '16px' }}>{flipped ? '✦ ANSWER' : 'QUESTION — tap to flip'}</div>
              <div style={{ color: flipped ? subject.color : C.text, fontSize: '15px', lineHeight: '1.8', flex: 1, display: 'flex', alignItems: 'center', fontWeight: flipped ? 400 : 500 }}>
                {flipped ? card.back : card.front}
              </div>
              {!flipped && <div style={{ color: C.muted, fontSize: '11px', marginTop: '20px', textAlign: 'center' }}>tap anywhere to reveal</div>}
            </div>
            {flipped && (
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px', width: '100%', maxWidth: '620px' }}>
                <button onClick={() => mark(false)} style={{ flex: 1, background: C.redLight, border: `1.5px solid ${C.redMid}`, borderRadius: '12px', color: C.red, fontSize: '13px', padding: '12px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>✗ Still learning</button>
                <button onClick={() => mark(true)} style={{ flex: 1, background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px', color: '#166534', fontSize: '13px', padding: '12px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>✓ Got it</button>
              </div>
            )}
            <div style={{ display: 'flex', gap: '4px', marginTop: '18px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '620px' }}>
              {deck.map((_, i) => {
                const origIdx = cards.indexOf(deck[i]);
                const isKnown = known.has(origIdx), isUnknown = unknown.has(origIdx), isCurrent = i === idx;
                return <div key={i} onClick={() => { setIdx(i); setFlipped(false); }} style={{ width: isCurrent ? '18px' : '8px', height: '8px', borderRadius: '4px', background: isCurrent ? subject.color : isKnown ? '#4ADE8060' : isUnknown ? `${C.red}60` : C.bg3, transition: 'all 0.2s', cursor: 'pointer' }} />;
              })}
            </div>
          </>
        ) : (
          <div style={{ color: C.muted, fontSize: '13px' }}>No flashcards for {subject.name} yet.</div>
        )}
      </div>
    </div>
  );
}

// ─── LIBRARY MODE ───────────────────────────────────────────
function LibraryMode({ onBack }) {
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterTag, setFilterTag] = useState('all');
  const [search, setSearch] = useState('');

  const allResources = useMemo(() => {
    const list = [];
    SUBJECTS.forEach(sub => {
      (sub.globalResources||[]).forEach(r => list.push({ ...r, subjectId: sub.id, subjectName: sub.shortName, subjectColor: sub.color }));
      sub.weeks.forEach(wk => (wk.resources||[]).forEach(r => { if (!list.find(x => x.url === r.url)) list.push({ ...r, subjectId: sub.id, subjectName: sub.shortName, subjectColor: sub.color, tag: r.tag||'Week' }); }));
    });
    return list;
  }, []);

  const allTags = useMemo(() => { const tags = new Set(allResources.map(r => r.tag).filter(Boolean)); return ['all', ...Array.from(tags).sort()]; }, [allResources]);
  const tagColor = { Official: '#2563eb', Free: '#16a34a', Practice: '#d97706', Video: '#db2777', Tool: '#7c3aed', Reference: '#ea580c', Week: C.muted };
  const seen = new Set();
  const filtered = allResources.filter(r => {
    const matchSub = filterSubject === 'all' || r.subjectId === filterSubject;
    const matchTag = filterTag === 'all' || r.tag === filterTag;
    const q = search.toLowerCase();
    const matchSearch = !q || r.name.toLowerCase().includes(q) || (r.desc||'').toLowerCase().includes(q);
    if (!matchSub || !matchTag || !matchSearch) return false;
    if (seen.has(r.url)) return false;
    seen.add(r.url); return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: C.bg }}>
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 24px', height: '54px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.text2 }}>← Back</button>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 700, color: C.text }}>📚 Resource Library</span>
        <span style={{ color: C.muted, fontSize: '11px' }}>· {filtered.length} resources</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        <div style={{ maxWidth: '920px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search resources..." style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '8px', color: C.text, fontSize: '12px', padding: '7px 12px', fontFamily: 'inherit', outline: 'none', minWidth: '180px' }} />
            {['all', ...SUBJECTS.map(s => s.id)].map(id => {
              const sub = SUBJECTS.find(s => s.id === id);
              const active = filterSubject === id;
              return <button key={id} onClick={() => setFilterSubject(id)} style={{ background: active ? (sub ? `${sub.color}15` : C.redLight) : 'transparent', border: `1px solid ${active ? (sub ? sub.color : C.red) : C.border}`, borderRadius: '10px', color: active ? (sub ? sub.color : C.red) : C.muted, fontSize: '10px', padding: '4px 10px', cursor: 'pointer', fontFamily: 'inherit' }}>{sub ? `${sub.icon} ${sub.shortName}` : 'All'}</button>;
            })}
          </div>
          <div style={{ display: 'flex', gap: '5px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {allTags.map(tag => (
              <button key={tag} onClick={() => setFilterTag(tag)} style={{ background: filterTag === tag ? `${tagColor[tag]||C.muted}15` : 'transparent', border: `1px solid ${filterTag === tag ? (tagColor[tag]||C.muted) : C.border}`, borderRadius: '10px', color: filterTag === tag ? (tagColor[tag]||C.text) : C.muted, fontSize: '10px', padding: '4px 10px', cursor: 'pointer', fontFamily: 'inherit' }}>{tag === 'all' ? 'All Types' : tag}</button>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div style={{ color: C.muted, fontSize: '13px', textAlign: 'center', padding: '40px' }}>No resources match.</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
              {filtered.map((r, i) => (
                <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                  style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '14px', padding: '16px 18px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '8px', transition: 'border-color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = r.subjectColor + '50'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {r.tag && <span style={{ fontSize: '10px', border: `1px solid ${(tagColor[r.tag]||C.muted)}30`, borderRadius: '99px', padding: '1px 6px', color: tagColor[r.tag]||C.muted }}>{r.tag}</span>}
                    <span style={{ fontSize: '10px', border: `1px solid ${r.subjectColor}25`, borderRadius: '99px', padding: '1px 6px', color: r.subjectColor }}>{r.subjectName}</span>
                  </div>
                  <div style={{ color: C.text, fontSize: '12px', fontWeight: 600 }}>{r.name}</div>
                  <div style={{ color: C.muted, fontSize: '11px', lineHeight: '1.5', flex: 1 }}>{r.desc}</div>
                  <div style={{ color: r.subjectColor, fontSize: '10px' }}>↗ Open resource</div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ACCOUNT PAGE ───────────────────────────────────────────
function AccountPage({ username, onBack, onLogout, onProgressReset }) {
  const [tab, setTab] = useState('profile');
  const [oldPw, setOldPw] = useState(''); const [newPw, setNewPw] = useState(''); const [confirmPw, setConfirmPw] = useState('');
  const [pwMsg, setPwMsg] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const users = Auth.getUsers(); const user = users.find(u => u.username === username);
  const memberSince = user ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';
  const streak = Auth.getStreak(username);

  const handlePwChange = () => {
    if (newPw !== confirmPw) { setPwMsg({ type: 'error', text: "Passwords don't match." }); return; }
    const r = Auth.updatePassword(username, oldPw, newPw);
    if (r.ok) { setPwMsg({ type: 'ok', text: 'Password updated.' }); setOldPw(''); setNewPw(''); setConfirmPw(''); }
    else setPwMsg({ type: 'error', text: r.error });
  };

  const inp = { background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: '8px', color: C.text, fontSize: '12px', padding: '9px 13px', fontFamily: 'inherit', outline: 'none', width: '100%', boxSizing: 'border-box' };

  return (
    <div style={{ height: '100vh', background: C.bg, display: 'flex', flexDirection: 'column', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 24px', height: '54px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.text2 }}>← Back</button>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 700, color: C.text }}>⚙ Account Settings</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 24px' }}>
        <div style={{ maxWidth: '540px', margin: '0 auto' }}>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '22px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 3px rgba(28,16,9,0.04)' }}>
            <div style={{ width: '52px', height: '52px', background: C.redLight, border: `2px solid ${C.redMid}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.red, fontSize: '20px', fontWeight: 700 }}>{username.charAt(0).toUpperCase()}</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 700, color: C.text }}>{username}</div>
              <div style={{ color: C.muted, fontSize: '11px', marginTop: '2px' }}>Member since {memberSince}</div>
              {streak.count > 0 && <div style={{ color: '#9A3412', fontSize: '11px', marginTop: '3px' }}>🔥 {streak.count} day streak</div>}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
            {[['profile', 'Profile'], ['security', 'Security'], ['data', 'Data']].map(([id, lbl]) => (
              <button key={id} onClick={() => setTab(id)} style={{ background: tab === id ? C.white : 'transparent', border: `1px solid ${tab === id ? C.red : C.border}`, borderRadius: '8px', color: tab === id ? C.red : C.muted, fontSize: '11px', padding: '6px 16px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: tab === id ? 700 : 400 }}>{lbl}</button>
            ))}
          </div>

          {tab === 'profile' && (
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '14px', padding: '20px' }}>
              {[['Username', username], ['Account Type', 'Local (browser storage)'], ['Member Since', memberSince], ['Subjects', `${SUBJECTS.length} AP courses`]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.bg2}` }}>
                  <span style={{ color: C.muted, fontSize: '12px' }}>{k}</span>
                  <span style={{ color: C.text, fontSize: '12px' }}>{v}</span>
                </div>
              ))}
              <button onClick={onLogout} style={{ marginTop: '18px', width: '100%', background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '10px', color: C.muted, fontSize: '12px', padding: '10px', cursor: 'pointer', fontFamily: 'inherit' }}>Sign Out</button>
            </div>
          )}

          {tab === 'security' && (
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '14px', padding: '20px' }}>
              <div style={{ color: C.muted, fontSize: '10px', letterSpacing: '1.2px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '16px' }}>Change Password</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
                {[['Current Password', oldPw, setOldPw], ['New Password', newPw, setNewPw], ['Confirm New Password', confirmPw, setConfirmPw]].map(([lbl, val, setter]) => (
                  <div key={lbl}><div style={{ color: C.text2, fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '5px', fontWeight: 600 }}>{lbl}</div><input type="password" value={val} onChange={e => setter(e.target.value)} style={inp} /></div>
                ))}
              </div>
              {pwMsg && <div style={{ background: pwMsg.type === 'ok' ? '#F0FDF4' : C.redLight, border: `1px solid ${pwMsg.type === 'ok' ? '#BBF7D0' : C.redMid}`, borderRadius: '8px', padding: '9px 13px', color: pwMsg.type === 'ok' ? '#166534' : C.red, fontSize: '12px', marginTop: '12px' }}>{pwMsg.type === 'ok' ? '✓' : '⚠'} {pwMsg.text}</div>}
              <Btn onClick={handlePwChange} style={{ marginTop: '16px', width: '100%', padding: '10px' }}>Update Password</Btn>
            </div>
          )}

          {tab === 'data' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '14px', padding: '20px' }}>
                <div style={{ color: C.muted, fontSize: '10px', letterSpacing: '1.2px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '12px' }}>Your Data</div>
                <div style={{ color: C.text2, fontSize: '13px', lineHeight: '1.8' }}>All your data is stored in this browser's local storage. Nothing is sent to any server.</div>
              </div>
              <div style={{ background: '#FEF2F2', border: `1px solid ${C.redMid}`, borderRadius: '14px', padding: '20px' }}>
                <div style={{ color: C.red, fontSize: '11px', letterSpacing: '1.2px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '12px' }}>⚠ Danger Zone</div>
                <div style={{ color: C.text2, fontSize: '12px', marginBottom: '14px', lineHeight: '1.7' }}>Reset all study progress. Your account is not affected — only task checkboxes are cleared.</div>
                <button onClick={() => { if (!confirmReset) { setConfirmReset(true); return; } Auth.resetProgress(username); onProgressReset(); setConfirmReset(false); }}
                  style={{ background: confirmReset ? C.red : 'transparent', border: `1px solid ${C.red}`, borderRadius: '10px', color: confirmReset ? 'white' : C.red, fontSize: '12px', padding: '9px 20px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: confirmReset ? 700 : 400 }}>
                  {confirmReset ? '⚠ Click again to confirm' : 'Reset All Progress'}
                </button>
                {confirmReset && <button onClick={() => setConfirmReset(false)} style={{ marginLeft: '8px', background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '10px', color: C.muted, fontSize: '12px', padding: '9px 14px', cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────
function App() {
  const [username, setUsername]         = useState(() => Auth.getSession());
  const [screen, setScreen]             = useState('home');
  const [activeSubjectId, setActiveSubjectId] = useState('csa');
  const [checked, setChecked]           = useState(() => username ? Auth.getChecked(username) : {});
  const [selectedIds, setSelectedIds]   = useState(() => username ? Auth.getSubjects(username) : null);
  const [planSettings, setPlanSettings] = useState(() => username ? Auth.getPlanSettings(username) : {});
  const [adjustingPlan, setAdjustingPlan] = useState(false);

  useEffect(() => {
    if (username) {
      setChecked(Auth.getChecked(username));
      setSelectedIds(Auth.getSubjects(username));
      setPlanSettings(Auth.getPlanSettings(username));
    }
  }, [username]);

  const handleAuth = uname => {
    Auth.updateStreak(uname);
    setUsername(uname);
    setChecked(Auth.getChecked(uname));
    const existing = Auth.getSubjects(uname);
    setSelectedIds(existing);
    setPlanSettings(Auth.getPlanSettings(uname));
    setScreen(existing ? 'home' : 'picker');
  };

  const handlePickerSave = (ids, newPlanSettings) => {
    Auth.saveSubjects(username, ids);
    setSelectedIds(ids);
    if (!ids.includes(activeSubjectId)) setActiveSubjectId(ids[0]);
    if (newPlanSettings) {
      Object.entries(newPlanSettings).forEach(([sid, setting]) => Auth.savePlanSetting(username, sid, setting));
      setPlanSettings(Auth.getPlanSettings(username));
    }
    setScreen('home');
  };

  const handlePlanSettingsSave = newSettings => {
    Object.entries(newSettings).forEach(([sid, setting]) => Auth.savePlanSetting(username, sid, setting));
    setPlanSettings(Auth.getPlanSettings(username));
    setAdjustingPlan(false);
  };

  const handleLogout = () => { Auth.logout(); setUsername(null); setChecked({}); setSelectedIds(null); setPlanSettings({}); setScreen('home'); };
  const handleProgressReset = () => setChecked({});

  const navigate = (dest, subjectId) => {
    if (subjectId) setActiveSubjectId(subjectId);
    setScreen(dest);
  };

  if (!username) return <AuthPage onAuth={handleAuth} />;
  if (screen === 'picker') return <SubjectPicker username={username} initial={selectedIds} onSave={handlePickerSave} />;

  const MY_SUBJECTS = selectedIds && selectedIds.length > 0 ? SUBJECTS.filter(s => selectedIds.includes(s.id)) : SUBJECTS;
  const subject = MY_SUBJECTS.find(s => s.id === activeSubjectId) || MY_SUBJECTS[0];
  const subjectPlan = planSettings[subject.id];
  const planDays = subjectPlan?.durationDays || null;
  const planStart = subjectPlan?.startDate || null;
  const adaptedWeeks = planDays ? adaptPlanToWindow(subject, planDays, planStart) : subject.weeks;

  // Adjust plan overlay
  if (adjustingPlan) {
    const finalSettings = MY_SUBJECTS.reduce((acc, s) => {
      acc[s.id] = planSettings[s.id] || { durationDays: 42, startDate: new Date().toISOString().split('T')[0] };
      return acc;
    }, {});
    return (
      <div style={{ height: '100vh', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', overflowY: 'auto' }}>
        <div style={{ position: 'fixed', inset: 0, backgroundImage: `radial-gradient(${C.border} 1px, transparent 1px)`, backgroundSize: '28px 28px', opacity: 0.6, pointerEvents: 'none' }} />
        <div style={{ width: '100%', maxWidth: '600px', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: C.text, marginBottom: '8px' }}>🗓️ Adjust Study Plans</div>
            <p style={{ color: C.muted, fontSize: '13px' }}>Update your study duration for any subject.</p>
          </div>
          {MY_SUBJECTS.map(s => {
            const d = planSettings[s.id]?.durationDays || 42;
            return (
              <div key={s.id} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '20px 24px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ width: '34px', height: '34px', background: `${s.color}12`, border: `1px solid ${s.color}25`, borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>{s.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: C.text, fontSize: '13px', fontWeight: 700 }}>{s.name}</div>
                    <div style={{ color: C.muted, fontSize: '10px' }}>Exam: {s.examInfo.split('·')[0].trim()}</div>
                  </div>
                  <button onClick={() => { const examD = Math.max(1, daysUntil(s.examDate)); const upd = { ...planSettings, [s.id]: { durationDays: examD, startDate: new Date().toISOString().split('T')[0] } }; Object.entries(upd).forEach(([sid, setting]) => Auth.savePlanSetting(username, sid, setting)); setPlanSettings(Auth.getPlanSettings(username)); }}
                    style={{ background: C.redLight, border: `1px solid ${C.redMid}`, borderRadius: '99px', padding: '4px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '10px', color: C.red, fontWeight: 600 }}>
                    🎯 Till exam ({Math.max(1, daysUntil(s.examDate))}d)
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input type="number" min="1" max="730" value={planSettings[s.id]?.durationDays || 42}
                    onChange={e => { const v = Math.max(1, parseInt(e.target.value)||1); Auth.savePlanSetting(username, s.id, { durationDays: v, startDate: planSettings[s.id]?.startDate || new Date().toISOString().split('T')[0] }); setPlanSettings(Auth.getPlanSettings(username)); }}
                    style={{ width: '80px', textAlign: 'center', fontSize: '22px', fontWeight: 800, color: s.color, background: `${s.color}10`, border: `2px solid ${s.color}25`, borderRadius: '8px', padding: '6px', fontFamily: 'inherit', outline: 'none' }} />
                  <span style={{ color: C.muted, fontSize: '12px' }}>days · {adaptPlanToWindow(s, planSettings[s.id]?.durationDays || 42, planSettings[s.id]?.startDate).length} phases</span>
                </div>
              </div>
            );
          })}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <Btn onClick={() => setAdjustingPlan(false)} variant="ghost">← Back</Btn>
            <Btn onClick={() => setAdjustingPlan(false)}>Done ✓</Btn>
          </div>
        </div>
      </div>
    );
  }

  const toggleTask = (weekId, dayIdx, taskIdx) => {
    Auth.updateStreak(username);
    const key = `${activeSubjectId}-${weekId}-${dayIdx}-${taskIdx}`;
    setChecked(prev => { const next = { ...prev, [key]: !prev[key] }; Auth.saveChecked(username, next); return next; });
  };
  const getTaskKey = (weekId, dayIdx, taskIdx) => `${activeSubjectId}-${weekId}-${dayIdx}-${taskIdx}`;

  if (screen === 'home') return <HomePage username={username} checked={checked} mySubjects={MY_SUBJECTS} planSettings={planSettings} onNavigate={navigate} onLogout={handleLogout} onEditSubjects={() => setScreen('picker')} onAdjustPlan={() => setAdjustingPlan(true)} />;
  if (screen === 'account') return <AccountPage username={username} onBack={() => setScreen('home')} onLogout={handleLogout} onProgressReset={handleProgressReset} />;
  if (screen === 'library') return <LibraryMode onBack={() => setScreen('study')} />;
  if (screen === 'flashcards') return <FlashcardMode subject={subject} mySubjects={MY_SUBJECTS} onBack={() => setScreen('study')} onSubject={id => { setActiveSubjectId(id); }} />;

  return (
    <StudyPage
      username={username}
      subject={subject}
      adaptedWeeks={adaptedWeeks}
      checked={checked}
      toggleTask={toggleTask}
      getTaskKey={getTaskKey}
      planDays={planDays}
      planStart={planStart}
      onAdjustPlan={() => setAdjustingPlan(true)}
      onBack={() => setScreen('home')}
      onFlashcards={() => setScreen('flashcards')}
      onLibrary={() => setScreen('library')}
      onSubject={id => setActiveSubjectId(id)}
      mySubjects={MY_SUBJECTS}
      screen={screen}
    />
  );
}

export default App