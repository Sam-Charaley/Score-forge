import { C } from '../theme'
import LogoMark from './LogoMark'

export default function LoadingScreen() {
  return (
    <div style={{ height: '100vh', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ marginBottom: '16px' }}><LogoMark size={64} motion="loop" title="Loading ScoreForge" /></div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: C.text, marginBottom: '6px' }}>Score <span style={{ color: C.red }}>Forge</span></div>
      <div style={{ color: C.muted, fontSize: '12px' }}>Loading...</div>
    </div>
  );
}
