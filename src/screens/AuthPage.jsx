import { useState } from 'react'
import LogoMark from '../components/LogoMark'
import { C } from '../theme'
import Btn from '../components/Btn'
import { Auth } from '../services/auth'
import { SUBJECT_INDEX as SUBJECTS } from '../data/subjectIndex'

export default function AuthPage({ onAuth }) {
  const [tab, setTab] = useState('login');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async () => {
    setError(''); setLoading(true);
    if (tab === 'login') {
      const r = await Auth.login(email, password);
      if (r.ok) onAuth(r.user);
      else setError(r.error);
    } else {
      if (password !== confirmPw) { setError("Passwords don't match."); setLoading(false); return; }
      const r = await Auth.signup(email, password, username);
      if (r.ok) setMessage('Check your email to confirm your account!');
      else setError(r.error);
    }
    setLoading(false);
  };

  const googleLogin = async () => {
    setError(''); setLoading(true);
    const r = await Auth.loginWithGoogle();
    if (!r.ok) { setError(r.error); setLoading(false); }
  };

  const inp = { width: '100%', padding: '11px 14px', background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: '10px', fontFamily: 'inherit', fontSize: '13px', color: C.text, outline: 'none', boxSizing: 'border-box' };
  const lbl = { display: 'block', fontSize: '11px', fontWeight: 600, color: C.text2, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' };

  if (message) return (
    <div style={{ height: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '20px', padding: '40px', maxWidth: '400px', textAlign: 'center' }}>
        <div style={{ fontSize: '36px', marginBottom: '16px' }}>📬</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: C.text, marginBottom: '8px' }}>Check your email</div>
        <div style={{ color: C.muted, fontSize: '13px', lineHeight: 1.7 }}>{message}</div>
        <Btn onClick={() => setMessage('')} style={{ marginTop: '20px' }} variant="ghost">← Back to login</Btn>
      </div>
    </div>
  );

  return (
    <div style={{ height: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(#B91C1C06 1.5px, transparent 1.5px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', top: '-15%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(185,28,28,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '420px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ margin: '0 auto 16px', width: '64px' }}><LogoMark size={64} motion="once" title="ScoreForge" /></div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: 700, color: C.text, letterSpacing: '-0.02em', marginBottom: '6px' }}>
            Score <span style={{ color: C.red }}>Forge</span>
          </div>
          <div style={{ color: C.muted, fontSize: '13px' }}>Forge your 5s</div>
        </div>

        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '20px', padding: '32px', boxShadow: '0 4px 32px rgba(28,16,9,0.07)' }}>
          <div style={{ display: 'flex', gap: '3px', marginBottom: '24px', background: C.bg2, borderRadius: '12px', padding: '3px', border: `1px solid ${C.border}` }}>
            {['login', 'signup'].map(t => (
              <button key={t} onClick={() => { setTab(t); setError(''); }} style={{ flex: 1, background: tab === t ? C.white : 'transparent', border: 'none', borderRadius: '9px', color: tab === t ? C.text : C.muted, fontSize: '12px', padding: '8px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: tab === t ? 600 : 400, boxShadow: tab === t ? '0 1px 4px rgba(28,16,9,0.1)' : 'none' }}>
                {t === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {/* Google button */}
          <button onClick={googleLogin} disabled={loading} style={{ width: '100%', background: C.white, border: `1.5px solid ${C.border}`, borderRadius: '10px', padding: '11px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '13px', fontWeight: 600, color: C.text, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
            <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" /><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" /><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" /><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" /></svg>
            Continue with Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ flex: 1, height: '1px', background: C.border }} />
            <span style={{ color: C.muted, fontSize: '11px' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: C.border }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {tab === 'signup' && <div><label style={lbl}>Username</label><input value={username} onChange={e => setUsername(e.target.value)} placeholder="your_username" style={inp} /></div>}
            <div><label style={lbl}>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} placeholder="you@email.com" style={inp} autoFocus /></div>
            <div><label style={lbl}>Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} placeholder="••••••••" style={inp} /></div>
            {tab === 'signup' && <div><label style={lbl}>Confirm Password</label><input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} placeholder="••••••••" style={inp} /></div>}
          </div>

          {error && <div style={{ background: C.redLight, border: `1px solid ${C.redMid}`, borderRadius: '8px', padding: '10px 14px', color: C.red, fontSize: '12px', marginTop: '14px' }}>⚠ {error}</div>}

          <button onClick={submit} disabled={loading} style={{ marginTop: '20px', width: '100%', background: loading ? C.bg3 : C.red, border: 'none', borderRadius: '10px', color: loading ? C.muted : 'white', fontSize: '13px', padding: '13px', cursor: loading ? 'default' : 'pointer', fontFamily: 'inherit', fontWeight: 600, boxShadow: loading ? 'none' : '0 4px 16px rgba(185,28,28,0.22)' }}>
            {loading ? '...' : tab === 'login' ? 'Sign In →' : 'Create Account →'}
          </button>
          <div style={{ color: C.muted, fontSize: '10px', textAlign: 'center', marginTop: '14px' }}>Synced across all your devices</div>
        </div>

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
