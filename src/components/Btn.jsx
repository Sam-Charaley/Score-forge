import { C } from '../theme'

export default function Btn({ children, onClick, variant = 'primary', style: extraStyle = {}, disabled }) {
  const base = { border: 'none', borderRadius: '10px', padding: '10px 20px', cursor: disabled ? 'default' : 'pointer', fontFamily: 'inherit', fontSize: '12px', fontWeight: 600, transition: 'all 0.18s ease', letterSpacing: '0.01em', ...extraStyle };
  const variants = {
    primary: { background: C.red, color: 'white', boxShadow: '0 3px 12px rgba(185,28,28,0.2)' },
    ghost: { background: 'transparent', border: `1px solid ${C.border}`, color: C.text2 },
    soft: { background: C.redLight, border: `1px solid ${C.redMid}`, color: C.red },
  };
  return <button onClick={onClick} disabled={disabled} style={{ ...base, ...variants[variant] }}>{children}</button>;
}
