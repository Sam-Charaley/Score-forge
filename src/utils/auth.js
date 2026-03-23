import React, { useState } from 'react'
import { SUBJECTS } from '../data/subjects'
import { Auth } from '../utils/auth'

function AuthPage({ onAuth }) {
  const [tab, setTab] = useState('login')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const submit = async () => {
    setError(''); setLoading(true)
    if (tab === 'login') {
      const r = await Auth.login(email, password)
      if (!r.ok) { setError(r.error); setLoading(false); return }
      const profile = await Auth.getProfile(r.user.id)
      const uname = profile?.username || email.split('@')[0]
      onAuth(r.user, uname)
    } else {
      if (password !== confirmPw) { setError("Passwords don't match."); setLoading(false); return }
      const r = await Auth.signup(email, password, username)
      if (!r.ok) { setError(r.error); setLoading(false); return }
      setMessage('Check your email to confirm your account, then sign in.')
      setTab('login')
    }
    setLoading(false)
  }

  const googleSignIn = async () => {
    setLoading(true)
    await Auth.loginWithGoogle()
  }

  const inp = {
    width: '100%', padding: '11px 14px',
    background: '#FDFAF5', border: '1.5px solid #E2D8C8',
    borderRadius: '10px', fontFamily: 'inherit', fontSize: '13px',
    color: '#1C1009', outline: 'none', boxSizing: 'border-box',
  }
  const lbl = {
    display: 'block', fontSize: '11px', fontWeight: 600,
    color: '#5C4A32', letterSpacing: '0.06em',
    textTransform: 'uppercase', marginBottom: '6px',
  }

  return (
    <div style={{ height: '100vh', background: '#FDFAF5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', system-ui, sans-serif", overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(#B91C1C06 1.5px, transparent 1.5px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', top: '-15%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(185,28,28,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '420px', padding: '0 24px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ width: '64px', height: '64px', margin: '0 auto 16px', background: 'linear-gradient(135deg, #FEF2F2, #FFF7ED)', border: '1.5px solid #FECACA', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', boxShadow: '0 4px 24px rgba(185,28,28,0.1)' }}>⚒️</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: 700, color: '#1C1009', letterSpacing: '-0.02em', marginBottom: '6px' }}>
            Score <span style={{ color: '#B91C1C' }}>Forge</span>
          </div>
          <div style={{ color: '#9C8770', fontSize: '13px' }}>Forge your 5s</div>
        </div>

        {/* Card */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2D8C8', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 32px rgba(28,16,9,0.07)' }}>

          {/* Google button */}
          <button onClick={googleSignIn} disabled={loading} style={{ width: '100%', padding: '11px', background: '#FFFFFF', border: '1.5px solid #E2D8C8', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '13px', fontWeight: 600, color: '#1C1009', marginBottom: '20px', transition: 'all 0.18s ease' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#B91C1C'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#E2D8C8'}>
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"/>
            </svg>
            Continue with Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ flex: 1, height: '1px', background: '#E2D8C8' }} />
            <span style={{ color: '#9C8770', fontSize: '11px' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: '#E2D8C8' }} />
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '3px', marginBottom: '24px', background: '#FAF6EE', borderRadius: '12px', padding: '3px', border: '1px solid #E2D8C8' }}>
            {['login', 'signup'].map(t => (
              <button key={t} onClick={() => { setTab(t); setError(''); setMessage(''); }} style={{ flex: 1, background: tab === t ? '#FFFFFF' : 'transparent', border: 'none', borderRadius: '9px', color: tab === t ? '#1C1009' : '#9C8770', fontSize: '12px', padding: '8px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: tab === t ? 600 : 400, boxShadow: tab === t ? '0 1px 4px rgba(28,16,9,0.1)' : 'none' }}>
                {t === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {message && (
            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '10px 14px', color: '#166534', fontSize: '12px', marginBottom: '16px' }}>
              ✓ {message}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div><label style={lbl}>Email</label><input value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} placeholder="you@email.com" style={inp} autoFocus type="email" /></div>
            {tab === 'signup' && <div><label style={lbl}>Username</label><input value={username} onChange={e => setUsername(e.target.value)} placeholder="your_username" style={inp} /></div>}
            <div><label style={lbl}>Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} placeholder="••••••••" style={inp} /></div>
            {tab === 'signup' && <div><label style={lbl}>Confirm Password</label><input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} placeholder="••••••••" style={inp} /></div>}
          </div>

          {error && <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', padding: '10px 14px', color: '#B91C1C', fontSize: '12px', marginTop: '16px' }}>⚠ {error}</div>}

          <button onClick={submit} disabled={loading} style={{ marginTop: '22px', width: '100%', background: loading ? '#F3EDE0' : '#B91C1C', border: 'none', borderRadius: '10px', color: loading ? '#9C8770' : 'white', fontSize: '13px', padding: '13px', cursor: loading ? 'default' : 'pointer', fontFamily: 'inherit', fontWeight: 600, boxShadow: loading ? 'none' : '0 4px 16px rgba(185,28,28,0.22)' }}>
            {loading ? '...' : tab === 'login' ? 'Sign In →' : 'Create Account →'}
          </button>

          <div style={{ color: '#9C8770', fontSize: '10px', textAlign: 'center', marginTop: '14px' }}>Your data syncs across all your devices</div>
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
  )
}

export default AuthPage