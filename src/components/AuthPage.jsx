import React from 'react'
import { SUBJECTS } from '../data/subjects'
import { Auth } from '../utils/auth'

function AuthPage({ onAuth }) {
  const [tab, setTab] = React.useState("login")
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPw, setConfirmPw] = React.useState("")
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const submit = () => {
    setError("")
    setLoading(true)
    setTimeout(() => {
      if (tab === "login") {
        const r = Auth.login(username.trim(), password)
        if (r.ok) onAuth(r.username)
        else setError(r.error)
      } else {
        if (password !== confirmPw) { setError("Passwords don't match."); setLoading(false); return }
        const r = Auth.signup(username.trim(), password)
        if (r.ok) onAuth(r.username)
        else setError(r.error)
      }
      setLoading(false)
    }, 180)
  }

  const inputStyle = {
    background: "#0a0f1e",
    border: "1px solid #1e3a5f",
    borderRadius: "10px",
    color: "#ffffff",
    fontSize: "13px",
    padding: "12px 14px",
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  }

  const labelStyle = {
    color: "#94a3b8",
    fontSize: "10px",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: "6px",
    display: "block",
    fontWeight: 600,
  }

  return (
    <div style={{ height: "100vh", background: "#050714", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', system-ui, sans-serif", overflow: "hidden" }}>
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(#00d4ff08 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: "-10%", left: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, #00d4ff0a 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "-15%", right: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, #f9731608 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "440px", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ width: "64px", height: "64px", margin: "0 auto 16px", background: "linear-gradient(135deg, #00d4ff15, #f9731615)", border: "1px solid #00d4ff30", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", boxShadow: "0 0 30px #00d4ff15" }}>⚒️</div>
          <div style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-0.04em", background: "linear-gradient(135deg, #00d4ff, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "8px" }}>Score Forge</div>
          <div style={{ color: "#94a3b8", fontSize: "13px" }}>Forge your AP exam scores</div>
        </div>

        <div style={{ background: "#0f1629", border: "1px solid #1e3a5f", borderRadius: "16px", padding: "32px", boxShadow: "0 0 60px #00d4ff08, 0 20px 60px rgba(0,0,0,0.5)" }}>
          <div style={{ display: "flex", gap: "4px", marginBottom: "28px", background: "#050714", borderRadius: "12px", padding: "4px", border: "1px solid #1e3a5f" }}>
            {["login", "signup"].map(t => (
              <button key={t} onClick={() => { setTab(t); setError("") }}
                style={{ flex: 1, background: tab === t ? "linear-gradient(135deg, #00d4ff15, #7c3aed15)" : "transparent", border: tab === t ? "1px solid #00d4ff30" : "1px solid transparent", borderRadius: "8px", color: tab === t ? "#00d4ff" : "#94a3b8", fontSize: "12px", padding: "8px", cursor: "pointer", fontFamily: "inherit", fontWeight: tab === t ? 700 : 400 }}>
                {t === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={labelStyle}>Username</label>
              <input value={username} onChange={e => setUsername(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} placeholder="your_username" style={inputStyle} autoFocus />
            </div>
            <div>
              <label style={labelStyle}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} placeholder="••••••••" style={inputStyle} />
            </div>
            {tab === "signup" && (
              <div>
                <label style={labelStyle}>Confirm Password</label>
                <input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} placeholder="••••••••" style={inputStyle} />
              </div>
            )}
          </div>

          {error && (
            <div style={{ background: "#1a0505", border: "1px solid #ef444430", borderRadius: "8px", padding: "10px 14px", color: "#fca5a5", fontSize: "12px", marginTop: "16px" }}>
              ⚠ {error}
            </div>
          )}

          <button onClick={submit} disabled={loading}
            style={{ marginTop: "24px", width: "100%", background: loading ? "#1e3a5f" : "linear-gradient(135deg, #00d4ff, #7c3aed)", border: "none", borderRadius: "10px", color: loading ? "#94a3b8" : "#ffffff", fontSize: "13px", padding: "13px", cursor: loading ? "default" : "pointer", fontFamily: "inherit", fontWeight: 700, boxShadow: loading ? "none" : "0 4px 20px #00d4ff30" }}>
            {loading ? "..." : tab === "login" ? "Sign In →" : "Create Account →"}
          </button>

          <div style={{ color: "#475569", fontSize: "10px", textAlign: "center", marginTop: "16px", lineHeight: "1.6" }}>
            Stored locally in your browser · No data sent anywhere
          </div>
        </div>

        <div style={{ display: "flex", gap: "5px", justifyContent: "center", marginTop: "24px", flexWrap: "wrap" }}>
          {SUBJECTS.map(s => (
            <div key={s.id} style={{ background: `${s.color}12`, border: `1px solid ${s.color}25`, borderRadius: "99px", padding: "3px 10px", color: s.color, fontSize: "10px", fontWeight: 500 }}>
              {s.icon} {s.shortName}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AuthPage