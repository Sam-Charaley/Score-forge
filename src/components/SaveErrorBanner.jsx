import { C } from '../theme'

// Sits above every screen (including the mobile nav) so a failed save is never missed.
const BANNER_Z_INDEX = 1000

export default function SaveErrorBanner({ message, onDismiss }) {
  if (!message) return null;
  return (
    <div role="alert" style={{ position: 'fixed', top: '12px', left: '50%', transform: 'translateX(-50%)', zIndex: BANNER_Z_INDEX, width: 'calc(100% - 24px)', maxWidth: '520px', background: C.redLight, border: `1px solid ${C.redMid}`, borderLeft: `4px solid ${C.red}`, borderRadius: '12px', padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: '10px', boxShadow: '0 6px 24px rgba(28,16,9,0.12)' }}>
      <span style={{ fontSize: '14px', lineHeight: 1.5 }}>⚠</span>
      <div style={{ flex: 1 }}>
        <div style={{ color: C.red, fontSize: '12px', fontWeight: 700, marginBottom: '2px' }}>Not saved</div>
        <div style={{ color: C.text2, fontSize: '12px', lineHeight: 1.5 }}>{message} Check your connection and try again.</div>
      </div>
      <button onClick={onDismiss} aria-label="Dismiss" style={{ background: 'none', border: 'none', color: C.muted, fontSize: '16px', cursor: 'pointer', padding: '0 2px', lineHeight: 1 }}>×</button>
    </div>
  );
}
