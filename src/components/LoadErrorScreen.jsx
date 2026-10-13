import { useState } from 'react'
import { C } from '../theme'
import Btn from './Btn'

// Shown instead of the app when the user's data couldn't be loaded. Without
// this, a failed load looked like a brand-new account and sent people to the
// subject picker.
export default function LoadErrorScreen({ message, onRetry, onSignOut }) {
  const [retrying, setRetrying] = useState(false);
  const retry = async () => {
    setRetrying(true);
    await onRetry();
    setRetrying(false);
  };
  return (
    <div style={{ height: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '20px', padding: '36px 32px', maxWidth: '420px', textAlign: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>📡</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: C.text, marginBottom: '8px' }}>Couldn't load your data</div>
        <div style={{ color: C.muted, fontSize: '13px', lineHeight: 1.7, marginBottom: '20px' }}>{message} Your progress is safe. Check your connection and try again.</div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <Btn onClick={onSignOut} variant="ghost">Sign out</Btn>
          <Btn onClick={retry} disabled={retrying}>{retrying ? 'Retrying...' : 'Try again'}</Btn>
        </div>
      </div>
    </div>
  );
}
