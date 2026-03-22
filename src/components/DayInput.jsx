import React from 'react'

export function fmtDate(d) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function DayInput({ days, onChange, subject, label }) {
  const [raw, setRaw] = React.useState(String(days));
  const [focused, setFocused] = React.useState(false);
  const today = new Date();

  React.useEffect(() => { if (!focused) setRaw(String(days)); }, [days, focused]);

  const daysUntilExam = subject
    ? Math.max(1, Math.ceil((new Date(subject.examDate) - today) / 86400000))
    : null;

  const commit = (val) => {
    const n = parseInt(val, 10);
    if (!isNaN(n) && n >= 1 && n <= 730) { onChange(n); setRaw(String(n)); }
    else setRaw(String(days));
  };

  const describedays = (d) => {
    if (d <= 7)   return { tag: "Crash Course", emoji: "⚡", color: "#dc2626" };
    if (d <= 14)  return { tag: "Intensive",    emoji: "🔥", color: "#ea580c" };
    if (d <= 30)  return { tag: "Standard",     emoji: "📅", color: "#d97706" };
    if (d <= 60)  return { tag: "Comfortable",  emoji: "✨", color: "#16a34a" };
    if (d <= 120) return { tag: "Thorough",     emoji: "📚", color: "#16a34a" };
    if (d <= 200) return { tag: "Comprehensive",emoji: "🎓", color: "#2563eb" };
    return               { tag: "Full Prep",    emoji: "🏆", color: "#7c3aed" };
  };

  const quickPicks = [7, 14, 30, 60, 90, 180, 365];
  const meta = describedays(days);

  return (
    <div>
      <div style={{ color: "#94a3b8", fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "14px", fontWeight: 700 }}>
        {label || "Study Duration"}
      </div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "16px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <input
            type="number" min="1" max="730"
            value={raw}
            onChange={e => setRaw(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={e => { setFocused(false); commit(e.target.value); }}
            onKeyDown={e => e.key === "Enter" && commit(raw)}
            style={{
              width: "110px", textAlign: "center",
              fontSize: "32px", fontWeight: 800, color: meta.color,
              background: `${meta.color}08`, border: `2px solid ${meta.color}30`,
              borderRadius: "10px", padding: "12px 14px",
              fontFamily: "inherit", outline: "none",
              WebkitAppearance: "none", MozAppearance: "textfield",
            }}
          />
          <span style={{ position: "absolute", right: "12px", bottom: "10px", color: meta.color, fontSize: "11px", fontWeight: 700, pointerEvents: "none" }}>days</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "20px" }}>{meta.emoji}</span>
            <div>
              <div style={{ color: meta.color, fontSize: "13px", fontWeight: 700 }}>{meta.tag}</div>
              <div style={{ color: "#94a3b8", fontSize: "11px" }}>ends {fmtDate(addDays(today, days))}</div>
            </div>
          </div>
          {subject && daysUntilExam && (
            <button onClick={() => { onChange(daysUntilExam); setRaw(String(daysUntilExam)); }}
              style={{
                background: days === daysUntilExam ? `${subject.color}18` : "transparent",
                border: `1.5px solid ${days === daysUntilExam ? subject.color : "#334155"}`,
                borderRadius: "99px", padding: "6px 14px",
                cursor: "pointer", fontFamily: "inherit",
                color: days === daysUntilExam ? subject.color : "#94a3b8",
                fontSize: "11px", fontWeight: 700, whiteSpace: "nowrap",
              }}>
              🎯 {daysUntilExam}d till exam
            </button>
          )}
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {quickPicks.map(d => {
          const m = describedays(d);
          const active = days === d;
          return (
            <button key={d} onClick={() => { onChange(d); setRaw(String(d)); }}
              style={{
                background: active ? `${m.color}18` : "transparent",
                border: `1.5px solid ${active ? m.color : "#334155"}`,
                borderRadius: "99px", padding: "5px 13px",
                cursor: "pointer", fontFamily: "inherit",
                fontSize: "11px", fontWeight: active ? 700 : 400,
                color: active ? m.color : "#94a3b8",
              }}>
              {d < 30 ? `${d}d` : d < 365 ? (d % 30 === 0 ? `${d/30}mo` : `${d}d`) : "1yr"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DayInput