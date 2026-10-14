import { useState } from 'react'
import { LogOut, PenLine, Check, TriangleAlert, KeyRound, Database, User } from 'lucide-react'
import Button from '../components/ui/Button'
import Tabs, { TabPanel } from '../components/ui/Tabs'
import { Auth } from '../services/auth'

const TABS_ID = 'account';
const ACCOUNT_TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Password', icon: KeyRound },
  { id: 'data', label: 'Data', icon: Database },
];
const MIN_PASSWORD_LENGTH = 6;

function PasswordForm() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async e => {
    e.preventDefault();
    if (newPassword.length < MIN_PASSWORD_LENGTH) { setResult({ ok: false, text: `Use at least ${MIN_PASSWORD_LENGTH} characters.` }); return; }
    if (newPassword !== confirmPassword) { setResult({ ok: false, text: "The passwords don't match." }); return; }
    setBusy(true);
    try {
      const response = await Auth.updatePassword(newPassword);
      if (response.ok) { setResult({ ok: true, text: 'Password updated.' }); setNewPassword(''); setConfirmPassword(''); }
      else setResult({ ok: false, text: response.error });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="card card-pad account-form" onSubmit={submit}>
      <h2>Change password</h2>
      <div className="field">
        <label className="field-label" htmlFor="new-password">New password</label>
        <input id="new-password" className="input" type="password" autoComplete="new-password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
        <span className="field-hint">At least {MIN_PASSWORD_LENGTH} characters.</span>
      </div>
      <div className="field">
        <label className="field-label" htmlFor="confirm-password">Confirm new password</label>
        <input id="confirm-password" className="input" type="password" autoComplete="new-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      </div>
      {result && (
        <div className={`alert ${result.ok ? 'alert-ok' : 'alert-error'}`} role={result.ok ? 'status' : 'alert'}>
          {result.ok ? <Check aria-hidden="true" /> : <TriangleAlert aria-hidden="true" />}<span>{result.text}</span>
        </div>
      )}
      <div><Button type="submit" disabled={busy}>{busy ? 'Updating' : 'Update password'}</Button></div>
    </form>
  );
}

function ResetProgress({ onProgressReset }) {
  const [armed, setArmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const reset = async () => {
    if (!armed) { setArmed(true); setDone(false); return; }
    setBusy(true);
    try {
      const saved = await onProgressReset();
      setDone(saved !== false);
      setArmed(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card card-pad danger-zone">
      <h2>Reset study progress</h2>
      <p>Unticks every task in every plan. Your account, subjects, plans, notes and practice answers are kept.</p>
      <div className="danger-actions">
        <Button variant="danger" className={armed ? 'is-armed' : ''} onClick={reset} disabled={busy}>
          {busy ? 'Resetting' : armed ? 'Yes, reset all progress' : 'Reset progress'}
        </Button>
        {armed && !busy && <Button variant="ghost" onClick={() => setArmed(false)}>Cancel</Button>}
      </div>
      {done && <div className="alert alert-ok" role="status"><Check aria-hidden="true" /><span>Progress reset.</span></div>}
    </div>
  );
}

export default function AccountPage({ user, username, onLogout, onProgressReset, onEditSubjects }) {
  const [tab, setTab] = useState('profile');
  const displayName = username || user?.email?.split('@')[0] || 'Student';

  return (
    <div className="page page-narrow account">
      <header className="sheet account-hero">
        <span className="account-avatar" aria-hidden="true">{displayName.charAt(0).toUpperCase()}</span>
        <div className="account-hero-text">
          <h1>{displayName}</h1>
          <p>{user?.email}</p>
        </div>
        <Button variant="quiet" size="small" icon={LogOut} onClick={onLogout}>Sign out</Button>
      </header>

      <Tabs tabs={ACCOUNT_TABS} active={tab} onChange={setTab} idPrefix={TABS_ID} label="Account sections" className="account-tabs" />

      <TabPanel idPrefix={TABS_ID} id={tab} className="account-panel">
        {tab === 'profile' && (
          <div className="card card-pad">
            <dl className="detail-list">
              <div><dt>Username</dt><dd>{displayName}</dd></div>
              <div><dt>Email</dt><dd>{user?.email || 'Not set'}</dd></div>
              <div>
                <dt>Subjects</dt>
                <dd><Button variant="quiet" size="small" icon={PenLine} onClick={onEditSubjects}>Edit subjects</Button></dd>
              </div>
            </dl>
          </div>
        )}
        {tab === 'security' && <PasswordForm />}
        {tab === 'data' && (
          <div className="stack">
            <div className="card card-pad">
              <h2 className="card-title">Where your data lives</h2>
              <p className="muted">Your plans, ticks, notes and practice answers are stored with your account and sync to every device you sign in on.</p>
            </div>
            <ResetProgress onProgressReset={onProgressReset} />
          </div>
        )}
      </TabPanel>
    </div>
  );
}
