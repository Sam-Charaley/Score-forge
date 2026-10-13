import { useState } from 'react'
import { C } from '../theme'
import Btn from '../components/Btn'
import { Auth } from '../services/auth'

export default function AccountPage({ user, profile, onBack, onLogout, onProgressReset }) {
  const [tab, setTab] = useState('profile');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwMsg, setPwMsg] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const handlePwChange = async () => {
    if (newPw !== confirmPw) { setPwMsg({ type: 'error', text: "Passwords don't match." }); return; }
    const r = await Auth.updatePassword(newPw);
    if (r.ok) { setPwMsg({ type: 'ok', text: 'Password updated.' }); setNewPw(''); setConfirmPw(''); }
    else setPwMsg({ type: 'error', text: r.error });
  };

  const inp = { background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: '8px', color: C.text, fontSize: '12px', padding: '9px 13px', fontFamily: 'inherit', outline: 'none', width: '100%', boxSizing: 'border-box' };
  const displayName = profile?.username || user?.email?.split('@')[0] || 'User';

  return (
    <div style={{ height: '100vh', background: C.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 24px', height: '54px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.text2 }}>← Back</button>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 700, color: C.text }}>⚙ Account Settings</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 24px' }}>
        <div style={{ maxWidth: '540px', margin: '0 auto' }}>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '22px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '52px', height: '52px', background: C.redLight, border: `2px solid ${C.redMid}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.red, fontSize: '20px', fontWeight: 700 }}>{displayName.charAt(0).toUpperCase()}</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 700, color: C.text }}>{displayName}</div>
              <div style={{ color: C.muted, fontSize: '11px', marginTop: '2px' }}>{user?.email}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
            {[['profile', 'Profile'], ['security', 'Security'], ['data', 'Data']].map(([id, lbl]) => (
              <button key={id} onClick={() => setTab(id)} style={{ background: tab === id ? C.white : 'transparent', border: `1px solid ${tab === id ? C.red : C.border}`, borderRadius: '8px', color: tab === id ? C.red : C.muted, fontSize: '11px', padding: '6px 16px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: tab === id ? 700 : 400 }}>{lbl}</button>
            ))}
          </div>

          {tab === 'profile' && (
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '14px', padding: '20px' }}>
              {[['Username', displayName], ['Email', user?.email || '—'], ['Account Type', 'Score Forge']].map(([k, v]) => (
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
                {[['New Password', newPw, setNewPw], ['Confirm New Password', confirmPw, setConfirmPw]].map(([lbl, val, setter]) => (
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
                <div style={{ color: C.text2, fontSize: '13px', lineHeight: '1.8' }}>Your data is stored in Supabase and synced across all your devices.</div>
              </div>
              <div style={{ background: '#FEF2F2', border: `1px solid ${C.redMid}`, borderRadius: '14px', padding: '20px' }}>
                <div style={{ color: C.red, fontSize: '11px', letterSpacing: '1.2px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '12px' }}>⚠ Danger Zone</div>
                <div style={{ color: C.text2, fontSize: '12px', marginBottom: '14px', lineHeight: '1.7' }}>Reset all study progress. Your account is not affected.</div>
                <button onClick={async () => { if (!confirmReset) { setConfirmReset(true); return; } await onProgressReset(); setConfirmReset(false); }}
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
