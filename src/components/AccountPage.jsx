import React from 'react'
import { SUBJECTS } from '../data/subjects'
import { Auth } from '../utils/auth'

function AccountPage({ username, onBack, onLogout, onProgressReset }) {
  const [tab, setTab] = React.useState("profile");
  const [oldPw, setOldPw] = React.useState("");
  const [newPw, setNewPw] = React.useState("");
  const [confirmPw, setConfirmPw] = React.useState("");
  const [pwMsg, setPwMsg] = React.useState(null); // { type: ok|error, text }
  const [confirmReset, setConfirmReset] = React.useState(false);

  const users = Auth.getUsers();
  const user = users.find(u => u.username === username);
  const memberSince = user ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "";

  const handlePwChange = () => {
    if (newPw !== confirmPw) { setPwMsg({ type: "error", text: "New passwords don't match." }); return; }
    const r = Auth.updatePassword(username, oldPw, newPw);
    if (r.ok) { setPwMsg({ type: "ok", text: "Password updated successfully." }); setOldPw(""); setNewPw(""); setConfirmPw(""); }
    else setPwMsg({ type: "error", text: r.error });
  };

  const handleReset = () => {
    if (!confirmReset) { setConfirmReset(true); return; }
    Auth.resetProgress(username);
    onProgressReset();
    setConfirmReset(false);
  };

  const inputStyle = { background: "#f7f8fc", border: "1px solid #e2e8f0", borderRadius: "8px", color: "#1e293b", fontSize: "12px", padding: "9px 13px", fontFamily: "inherit", outline: "none", width: "100%", boxSizing: "border-box" };

  return (
    <div style={{ height: "100vh", background: "#f7f8fc", display: "flex", flexDirection: "column", fontFamily: "'Inter', system-ui, sans-serif", color: "#1e293b" }}>

      {/* Nav */}
      <div style={{ background: "#1e293b", borderBottom: "1px solid #e2e8f0", padding: "12px 24px", display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "transparent", border: "1px solid #f1f5f9", borderRadius: "8px", color: "#94a3b8", background: "#ffffff", fontSize: "10px", padding: "5px 12px", cursor: "pointer", fontFamily: "inherit" }}>← Back</button>
        <span style={{ color: "#1e293b", fontSize: "13px", fontWeight: 700 }}>⚙ Account Settings</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "28px 24px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>

          {/* Profile card */}
          <div style={{ background: "linear-gradient(145deg, #1e293b, #172032)", border: "1.5px solid #e2e8f0", borderRadius: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.45)", padding: "22px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "52px", height: "52px", background: "#58a6ff20", border: "2px solid #58a6ff40", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", fontSize: "20px", fontWeight: 700, letterSpacing: "-0.02em" }}>
              {username.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ color: "#1e293b", fontSize: "16px", fontWeight: 700 }}>{username}</div>
              <div style={{ color: "#94a3b8", fontSize: "10px", marginTop: "3px" }}>Member since {memberSince}</div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
            {[["profile", "Profile"], ["security", "Security"], ["data", "Data"]].map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)} style={{ background: tab === id ? "#334155" : "transparent", border: `1px solid ${tab === id ? "#2563eb" : "#334155"}`, borderRadius: "8px", color: tab === id ? "#2563eb" : "#94a3b8", fontSize: "10px", padding: "6px 16px", cursor: "pointer", fontFamily: "inherit", fontWeight: tab === id ? 700 : 400 }}>
                {label}
              </button>
            ))}
          </div>

          {/* Profile tab */}
          {tab === "profile" && (
            <div style={{ background: "#1e293b", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "20px" }}>
              <div style={{ color: "#94a3b8", fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "16px" }}>Account Info</div>
              {[
                ["Username", username],
                ["Account Type", "Local (browser storage)"],
                ["Member Since", memberSince],
                ["Subjects", `${SUBJECTS.length} AP courses`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <span style={{ color: "#94a3b8", fontSize: "11px" }}>{k}</span>
                  <span style={{ color: "#1e293b", fontSize: "11px" }}>{v}</span>
                </div>
              ))}
              <button onClick={onLogout} style={{ marginTop: "18px", width: "100%", background: "transparent", border: "1px solid #e2e8f0", borderRadius: "10px", color: "#94a3b8", fontSize: "11px", padding: "10px", cursor: "pointer", fontFamily: "inherit" }}>
                Sign Out
              </button>
            </div>
          )}

          {/* Security tab */}
          {tab === "security" && (
            <div style={{ background: "#1e293b", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "20px" }}>
              <div style={{ color: "#94a3b8", fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "16px" }}>Change Password</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
                {[["Current Password", oldPw, setOldPw], ["New Password", newPw, setNewPw], ["Confirm New Password", confirmPw, setConfirmPw]].map(([label, val, setter]) => (
                  <div key={label}>
                    <div style={{ color: "#94a3b8", fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "5px" }}>{label}</div>
                    <input type="password" value={val} onChange={e => setter(e.target.value)} style={inputStyle} />
                  </div>
                ))}
              </div>
              {pwMsg && (
                <div style={{ background: pwMsg.type === "ok" ? "#f0fdf4" : "#fff5f5", border: `1px solid ${pwMsg.type === "ok" ? "#4ade8040" : "#f8717140"}`, borderRadius: "8px", padding: "9px 13px", color: pwMsg.type === "ok" ? "#16a34a" : "#dc2626", fontSize: "11px", marginTop: "12px" }}>
                  {pwMsg.type === "ok" ? "✓" : "⚠"} {pwMsg.text}
                </div>
              )}
              <button onClick={handlePwChange} style={{ marginTop: "16px", width: "100%", background: "#2563eb", border: "none", borderRadius: "10px", color: "#1e293b", fontSize: "11px", padding: "10px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>
                Update Password
              </button>
            </div>
          )}

          {/* Data tab */}
          {tab === "data" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ background: "#1e293b", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "20px" }}>
                <div style={{ color: "#94a3b8", fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>Your Data</div>
                <div style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.8" }}>
                  All your data — progress, account info, and settings — is stored entirely in this browser's local storage. Nothing is sent to any server.
                </div>
                <div style={{ color: "#94a3b8", fontSize: "10px", marginTop: "10px", lineHeight: "1.6" }}>
                  To back up your progress, export your browser's local storage. Clearing your browser data will delete your account.
                </div>
              </div>

              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "20px" }}>
                <div style={{ color: "#dc2626", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>⚠ Danger Zone</div>
                <div style={{ color: "#475569", fontSize: "11px", marginBottom: "14px", lineHeight: "1.7" }}>
                  Reset all study progress. Your account and password are not affected — only task checkboxes are cleared.
                </div>
                <button onClick={handleReset}
                  style={{ background: confirmReset ? "#dc2626" : "transparent", border: "1px solid #f87171", borderRadius: "10px", color: confirmReset ? "#1e293b" : "#dc2626", fontSize: "11px", padding: "9px 20px", cursor: "pointer", fontFamily: "inherit", fontWeight: confirmReset ? 700 : 400 }}>
                  {confirmReset ? "⚠ Click again to confirm reset" : "Reset All Progress"}
                </button>
                {confirmReset && (
                  <button onClick={() => setConfirmReset(false)} style={{ marginLeft: "8px", background: "transparent", border: "1px solid #e2e8f0", borderRadius: "10px", color: "#94a3b8", fontSize: "11px", padding: "9px 14px", cursor: "pointer", fontFamily: "inherit" }}>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountPage