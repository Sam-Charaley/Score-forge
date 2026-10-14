import { useState } from 'react'
import { Eye, EyeOff, MailCheck, TriangleAlert, ArrowLeft } from 'lucide-react'
import LogoMark from '../components/LogoMark'
import Button from '../components/ui/Button'
import IconButton from '../components/ui/IconButton'
import Tabs, { TabPanel } from '../components/ui/Tabs'
import { Auth } from '../services/auth'
import { SUBJECT_INDEX, EXAM_CYCLE_YEAR } from '../data/subjectIndex'

const SIGN_IN = 'signin';
const SIGN_UP = 'signup';
const TABS_ID = 'auth';
// Supabase's default minimum; the server still has the final say.
const MIN_PASSWORD_LENGTH = 6;
const AUTH_TABS = [{ id: SIGN_IN, label: 'Sign in' }, { id: SIGN_UP, label: 'Create account' }];

const SELLING_POINTS = [
  'A day-by-day plan paced to the time you have.',
  'Practice that goes after your weakest topics first.',
  'A score estimate once there is enough evidence for one.',
];

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function PasswordField({ id, label, value, onChange, autoComplete, hint }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>{label}</label>
      <div className="input-with-action">
        <input id={id} className="input" type={visible ? 'text' : 'password'} value={value} onChange={e => onChange(e.target.value)} autoComplete={autoComplete} required />
        <IconButton icon={visible ? EyeOff : Eye} label={visible ? 'Hide password' : 'Show password'} onClick={() => setVisible(v => !v)} />
      </div>
      {hint && <span className="field-hint">{hint}</span>}
    </div>
  );
}

// The decorative answer row: four bubbles, one shaded in.
function AnswerRow() {
  return (
    <div className="auth-answer-row" aria-hidden="true">
      {['A', 'B', 'C', 'D'].map(letter => <span key={letter} className={letter === 'C' ? 'is-shaded' : undefined}>{letter}</span>)}
    </div>
  );
}

export default function AuthPage({ onAuth }) {
  const [mode, setMode] = useState(SIGN_IN);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);

  const switchMode = next => { setMode(next); setError(''); };

  const submit = async e => {
    e.preventDefault();
    if (busy) return;
    setError('');
    if (mode === SIGN_UP) {
      if (password.length < MIN_PASSWORD_LENGTH) { setError(`Use at least ${MIN_PASSWORD_LENGTH} characters for your password.`); return; }
      if (password !== confirmPassword) { setError("The passwords don't match."); return; }
    }
    setBusy(true);
    try {
      if (mode === SIGN_IN) {
        const result = await Auth.login(email.trim(), password);
        if (result.ok) onAuth(result.user);
        else setError(result.error);
      } else {
        const result = await Auth.signup(email.trim(), password, username.trim());
        if (result.ok) setConfirmationSent(true);
        else setError(result.error);
      }
    } finally {
      setBusy(false);
    }
  };

  const googleLogin = async () => {
    setError(''); setBusy(true);
    const result = await Auth.loginWithGoogle();
    // On success the browser leaves for Google, so only failures land here.
    if (!result.ok) { setError(result.error); setBusy(false); }
  };

  if (confirmationSent) {
    return (
      <div className="center-screen auth-confirm">
        <div className="sheet system-card">
          <span className="empty-state-icon"><MailCheck aria-hidden="true" /></span>
          <h1>Check your email</h1>
          <p>We sent a confirmation link to <b>{email.trim()}</b>. Open it to confirm your account, then sign in.</p>
          <div className="system-card-actions">
            <Button variant="ghost" icon={ArrowLeft} onClick={() => { setConfirmationSent(false); switchMode(SIGN_IN); }}>Back to sign in</Button>
          </div>
        </div>
      </div>
    );
  }

  const isSignUp = mode === SIGN_UP;
  return (
    <div className="auth">
      <aside className="auth-brand">
        <div className="auth-brand-top">
          <LogoMark size={40} motion="once" />
          <span className="auth-brand-name">ScoreForge</span>
        </div>
        <div className="auth-brand-body">
          <AnswerRow />
          <h2>Know exactly what to study next.</h2>
          <ul>
            {SELLING_POINTS.map(point => <li key={point}>{point}</li>)}
          </ul>
        </div>
        <p className="auth-brand-foot">{SUBJECT_INDEX.length} AP courses, built around the May {EXAM_CYCLE_YEAR} exams.</p>
      </aside>

      <main className="auth-main">
        <div className="auth-mobile-brand">
          <LogoMark size={44} motion="once" title="ScoreForge" />
          <span className="wordmark">ScoreForge</span>
        </div>
        <div className="auth-card">
          <h1>{isSignUp ? 'Create your account' : 'Welcome back'}</h1>
          <p className="auth-sub">{isSignUp ? 'Free. Your plan and progress sync to every device.' : 'Sign in to pick up where you left off.'}</p>

          <Tabs tabs={AUTH_TABS} active={mode} onChange={switchMode} idPrefix={TABS_ID} label="Sign in or create an account" block className="auth-tabs" />

          <Button variant="secondary" block className="google-btn" onClick={googleLogin} disabled={busy}>
            <GoogleLogo />
            Continue with Google
          </Button>

          <div className="divider"><span>or with email</span></div>

          <TabPanel idPrefix={TABS_ID} id={mode}>
            <form className="auth-form" onSubmit={submit}>
              {isSignUp && (
                <div className="field">
                  <label className="field-label" htmlFor="auth-username">Username</label>
                  <input id="auth-username" className="input" value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" placeholder="What should we call you?" />
                </div>
              )}
              <div className="field">
                <label className="field-label" htmlFor="auth-email">Email</label>
                <input id="auth-email" className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com" required autoFocus />
              </div>
              <PasswordField
                id="auth-password" label="Password" value={password} onChange={setPassword}
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                hint={isSignUp ? `At least ${MIN_PASSWORD_LENGTH} characters.` : null}
              />
              {isSignUp && <PasswordField id="auth-confirm" label="Confirm password" value={confirmPassword} onChange={setConfirmPassword} autoComplete="new-password" />}

              {error && <div className="alert alert-error" role="alert"><TriangleAlert aria-hidden="true" /><span>{error}</span></div>}

              <Button type="submit" size="large" block disabled={busy}>
                {busy ? 'One moment' : isSignUp ? 'Create account' : 'Sign in'}
              </Button>
            </form>
          </TabPanel>
        </div>
      </main>
    </div>
  );
}
