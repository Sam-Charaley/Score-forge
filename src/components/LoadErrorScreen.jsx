import { useState } from 'react'
import { WifiOff, RotateCcw } from 'lucide-react'
import Button from './ui/Button'

// Shown instead of the app when the user's data couldn't be loaded. Without
// this, a failed load looked like a brand-new account and sent people to the
// subject picker.
export default function LoadErrorScreen({ message, onRetry, onSignOut }) {
  const [retrying, setRetrying] = useState(false);
  const retry = async () => {
    setRetrying(true);
    try { await onRetry(); } finally { setRetrying(false); }
  };
  return (
    <div className="center-screen">
      <div className="sheet system-card" role="alert">
        <span className="empty-state-icon"><WifiOff aria-hidden="true" /></span>
        <h1>Couldn't load your data</h1>
        <p>{message} Your progress is safe. Check your connection and try again.</p>
        <div className="system-card-actions">
          <Button variant="ghost" onClick={onSignOut}>Sign out</Button>
          <Button icon={RotateCcw} onClick={retry} disabled={retrying}>{retrying ? 'Retrying' : 'Try again'}</Button>
        </div>
      </div>
    </div>
  );
}
