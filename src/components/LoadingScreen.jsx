import { C } from '../theme'

export default function LoadingScreen() {
  return (
    <div style={{ height: '100vh', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ width: '64px', height: '64px', background: `linear-gradient(135deg, ${C.redLight}, #FFF7ED)`, border: `1.5px solid ${C.redMid}`, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '16px', boxShadow: '0 4px 24px rgba(185,28,28,0.1)' }}>⚒️</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: C.text, marginBottom: '6px' }}>Score <span style={{ color: C.red }}>Forge</span></div>
      <div style={{ color: C.muted, fontSize: '12px' }}>Loading...</div>
    </div>
  );
}
