import React from 'react'
import { SUBJECTS } from '../data/subjects'
import { FLASHCARDS } from '../data/flashcards'
import { Auth } from '../utils/auth'

function HomePage({ username, checked, mySubjects, planSettings, onNavigate, onLogout, onEditSubjects, onAdjustPlan }) {
  const TODAY = new Date();

  const daysUntil = (dateStr) => Math.ceil((new Date(dateStr) - TODAY) / (1000 * 60 * 60 * 24));

  const subjectProgress = (sid) => {
    const sub = SUBJECTS.find(s => s.id === sid);
    let total = 0, done = 0;
    sub.weeks.forEach(wk => wk.days.forEach((day, di) => day.tasks.forEach((_, ti) => {
      total++;
      if (checked[`${sid}-${wk.id}-${di}-${ti}`]) done++;
    })));
    return { total, done, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
  };

  const allProgress = mySubjects.map(s => ({ ...s, ...subjectProgress(s.id) }));
  const totalDone = allProgress.reduce((a, s) => a + s.done, 0);
  const totalTasks = allProgress.reduce((a, s) => a + s.total, 0);
  const totalPct = totalTasks === 0 ? 0 : Math.round((totalDone / totalTasks) * 100);
  const totalCards = mySubjects.reduce((a, s) => a + (FLASHCARDS[s.id]||[]).length, 0);

  const nextExam = [...mySubjects].sort((a, b) => new Date(a.examDate) - new Date(b.examDate))
    .find(s => daysUntil(s.examDate) > 0);

  const hour = TODAY.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  // Format member since
  const users = Auth.getUsers();
  const user = users.find(u => u.username === username);
  const memberSince = user ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "";

  return (
    <div style={{ height: "100vh", background: "linear-gradient(180deg, #f8f9ff 0%, #f7f8fc 100%)", display: "flex", flexDirection: "column", fontFamily: "'Inter', system-ui, sans-serif", color: "#1a1d27", overflowY: "auto" }}>

      {/* Top nav */}
      <div style={{ background: "#f7f8fc", borderBottom: "1px solid #f1f5f9", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, boxShadow: "0 1px 0 #1e293b" }}>
        <div style={{ color: "#7c3aed", fontSize: "15px", fontWeight: 800, letterSpacing: "-0.025em" }}>⬡ AP Master Hub</div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button onClick={onEditSubjects} style={{ background: "transparent", border: "1px solid #f1f5f9", borderRadius: "8px", color: "#94a3b8", background: "#ffffff", fontSize: "10px", padding: "5px 12px", cursor: "pointer", fontFamily: "inherit" }}>✎ Subjects</button>
          <button onClick={onAdjustPlan} style={{ background: "linear-gradient(135deg, #c4a8e820, #f9b8d020)", border: "1.5px solid #c4a8e850", borderRadius: "12px", color: "#7c3aed", fontSize: "10px", padding: "5px 12px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>🗓️ Plans</button>
          <button onClick={() => onNavigate("library")} style={{ background: "transparent", border: "1px solid #f1f5f9", borderRadius: "8px", color: "#94a3b8", background: "#ffffff", fontSize: "10px", padding: "5px 12px", cursor: "pointer", fontFamily: "inherit" }}>📚 Library</button>
          <button onClick={() => onNavigate("account")} style={{ background: "transparent", border: "1px solid #f1f5f9", borderRadius: "8px", color: "#94a3b8", background: "#ffffff", fontSize: "10px", padding: "5px 12px", cursor: "pointer", fontFamily: "inherit" }}>⚙ Account</button>
          <div style={{ background: "#1e293b", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "5px 12px", color: "#94a3b8", fontSize: "12px", fontWeight: 600 }}>
            {username}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: "28px 28px", maxWidth: "1060px", width: "100%", margin: "0 auto", boxSizing: "border-box" }}>

        {/* Greeting */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ margin: 0, fontSize: "26px", fontWeight: 800, color: "#f7f8fc", letterSpacing: "-0.025em" }}>
            {greeting}, <span style={{ color: "#2563eb" }}>{username}</span> 👋
          </h1>
          <p style={{ margin: "8px 0 0", color: "#64748b", fontSize: "14px" }}>
            {totalDone === 0 ? "Ready to start? Pick a subject below." : `${totalDone} of ${totalTasks} tasks complete across all subjects.`}
          </p>
        </div>

        {/* No-plan CTA */}
        {(!planSettings || Object.keys(planSettings).length === 0) && (
          <div style={{ background: "linear-gradient(135deg, #f4f0fa, #fdf5f0)", border: "1.5px solid #c4a8e840", borderRadius: "8px", padding: "18px 22px", marginBottom: "28px", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "28px" }}>🗓️</span>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#7c3aed", fontSize: "14px", fontWeight: 800, marginBottom: "4px" }}>Build your adaptive study plan</div>
              <div style={{ color: "#94a3b8", fontSize: "12px", lineHeight: 1.6 }}>
                Got 1 week or 6 months? Tell us your timeline and every subject plan will automatically compress or expand to fit — perfectly paced, every time.
              </div>
            </div>
            <button onClick={onAdjustPlan} style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none",
              borderRadius: "99px", color: "#5b21b6", fontSize: "12px", fontWeight: 800,
              padding: "11px 26px", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
              boxShadow: "0 4px 20px rgba(124,58,237,0.25)",
            }}>Set up plans →</button>
          </div>
        )}

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px", marginBottom: "28px" }}>
          {[
            { label: "Overall Progress", value: `${totalPct}%`, sub: `${totalDone} / ${totalTasks} tasks`, color: "#2563eb" },
            { label: "Subjects", value: `${SUBJECTS.length}`, sub: "AP courses tracked", color: "#16a34a" },
            { label: "Flashcards", value: `${totalCards}`, sub: "total cards available", color: "#d97706" },
            { label: "Next Exam", value: nextExam ? `${daysUntil(nextExam.examDate)}d` : "—", sub: nextExam ? nextExam.shortName : "All exams complete!", color: nextExam ? nextExam.color : "#94a3b8" },
          ].map((stat, i) => (
            <div key={i} style={{ background: "#ffffff", border: `1px solid ${stat.color}20`, borderRadius: "14px", padding: "20px 22px", boxShadow: "0 1px 4px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.04)" }}>
              <div style={{ color: "#94a3b8", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px", fontWeight: 600 }}>{stat.label}</div>
              <div style={{ color: stat.color, fontSize: "26px", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em" }}>{stat.value}</div>
              <div style={{ color: "#94a3b8", fontSize: "10px", marginTop: "5px" }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Overall progress bar */}
        {totalDone > 0 && (
          <div style={{ background: "#1e293b", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "16px 20px", marginBottom: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "#94a3b8", fontSize: "10px" }}>Total Study Progress</span>
              <span style={{ color: "#2563eb", fontSize: "10px", fontWeight: 700 }}>{totalPct}%</span>
            </div>
            <div style={{ height: "8px", background: "#f1f5f9", borderRadius: "99px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
              <div style={{ height: "100%", width: `${totalPct}%`, background: "linear-gradient(90deg, #6366f1, #22d3ee)", borderRadius: "99px", transition: "width 0.5s" }} />
            </div>
            <div style={{ display: "flex", gap: "0", marginTop: "8px" }}>
              {allProgress.map(s => (
                <div key={s.id} title={`${s.shortName}: ${s.pct}%`} style={{ flex: s.total, height: "3px", background: s.done > 0 ? s.color : "transparent", opacity: 0.7 }} />
              ))}
            </div>
          </div>
        )}

        {/* Next exam countdown hero */}
        {nextExam && (
          <div style={{ background: `linear-gradient(135deg, ${nextExam.color}12, #fff9f5)`, border: `1px solid ${nextExam.color}30`, boxShadow: `0 4px 20px ${nextExam.color}10`, borderRadius: "8px", padding: "20px 24px", marginBottom: "28px", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ fontSize: "28px" }}>{nextExam.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#94a3b8", fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "4px" }}>Next Exam</div>
              <div style={{ color: nextExam.color, fontSize: "17px", fontWeight: 700 }}>{nextExam.name}</div>
              <div style={{ color: "#94a3b8", fontSize: "11px", marginTop: "3px" }}>{nextExam.examInfo}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: nextExam.color, fontSize: "40px", fontWeight: 700, lineHeight: 1 }}>{daysUntil(nextExam.examDate)}</div>
              <div style={{ color: "#94a3b8", fontSize: "10px" }}>days away</div>
            </div>
            <button onClick={() => onNavigate("study", nextExam.id)}
              style={{ background: nextExam.color, border: "none", borderRadius: "10px", color: "#1e293b", fontSize: "11px", padding: "10px 20px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, whiteSpace: "nowrap" }}>
              Study Now →
            </button>
          </div>
        )}

        {/* Section title */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <div style={{ color: "#94a3b8", fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase" }}>
            My Subjects ({mySubjects.length})
          </div>
          <button onClick={onEditSubjects} style={{ background: "transparent", border: "1px solid #e2e8f0", borderRadius: "10px", color: "#94a3b8", fontSize: "10px", padding: "3px 10px", cursor: "pointer", fontFamily: "inherit" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "#94a3b8"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "#1e293b"; }}>
            ✎ Edit
          </button>
        </div>

        {/* Subject cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "12px", marginBottom: "28px" }}>
          {allProgress.map(sub => {
            const days = daysUntil(sub.examDate);
            const urgency = days < 14 ? "#dc2626" : days < 30 ? "#d97706" : sub.color;
            return (
              <div key={sub.id} onClick={() => onNavigate("study", sub.id)}
                style={{ background: "#1e293b", border: `1px solid ${sub.color}20`, borderRadius: "10px", boxShadow: "0 4px 20px rgba(15,23,42,0.08)", boxShadow: "0 2px 16px rgba(15,23,42,0.07)", padding: "18px 20px", cursor: "pointer", transition: "all 0.18s ease" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = sub.color + '40'; e.currentTarget.style.background = `${sub.color}06`; e.currentTarget.style.boxShadow = `0 4px 20px ${sub.color}15`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#f0f0f8"; e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.boxShadow = "0 1px 4px rgba(15,23,42,0.05), 0 4px 16px rgba(15,23,42,0.04)"; }}>

                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                    <div style={{ width: "36px", height: "36px", background: `${sub.color}15`, border: `1px solid ${sub.color}30`, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", color: sub.color }}>
                      {sub.icon}
                    </div>
                    <div>
                      <div style={{ color: "#1e293b", fontSize: "12px", fontWeight: 700 }}>{sub.name}</div>
                      <div style={{ color: "#94a3b8", fontSize: "10px", marginTop: "1px" }}>
                        {sub.weeks.length} weeks · {(FLASHCARDS[sub.id] || []).length} cards
                        {planSettings && planSettings[sub.id] && (
                          <span style={{ marginLeft: "5px", color: "#7c3aed", fontWeight: 600 }}>· {planSettings[sub.id].durationDays}d plan</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: urgency, fontSize: "16px", fontWeight: 700 }}>{days}d</div>
                    <div style={{ color: "#94a3b8", fontSize: "10px" }}>until exam</div>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <span style={{ color: "#94a3b8", fontSize: "10px" }}>{sub.done}/{sub.total} tasks</span>
                  <span style={{ color: sub.color, fontSize: "10px", fontWeight: 700 }}>{sub.pct}%</span>
                </div>
                <div style={{ height: "7px", background: "#f1f5f9", borderRadius: "99px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
                  <div style={{ height: "100%", width: `${sub.pct}%`, background: sub.color, borderRadius: "99px", transition: "width 0.4s" }} />
                </div>

                <div style={{ display: "flex", gap: "5px", marginTop: "12px" }}>
                  <div style={{ flex: 1, background: "#f8f9ff", border: `1px solid ${sub.color}20`, borderRadius: "12px", padding: "5px 8px", textAlign: "center", color: sub.color, fontSize: "10px" }}>
                    📅 Study
                  </div>
                  <div onClick={e => { e.stopPropagation(); onNavigate("flashcards", sub.id); }}
                    style={{ flex: 1, background: "#f8f9ff", border: `1px solid ${sub.color}20`, borderRadius: "12px", padding: "5px 8px", textAlign: "center", color: "#94a3b8", fontSize: "10px", cursor: "pointer" }}
                    onMouseEnter={e => { e.currentTarget.style.color = sub.color; e.currentTarget.style.borderColor = `${sub.color}60`; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = `${sub.color}20`; }}>
                    🃏 Cards
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "20px", marginTop: "8px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ color: "#1e293b", fontSize: "11px" }}>AP Master Hub · {memberSince && `Member since ${memberSince}`}</div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={onEditSubjects} style={{ background: "transparent", border: "1px solid #f1f5f9", borderRadius: "8px", color: "#94a3b8", background: "#ffffff", fontSize: "10px", padding: "5px 12px", cursor: "pointer", fontFamily: "inherit" }}>✎ My Subjects</button>
            <button onClick={() => onNavigate("flashcards")} style={{ background: "transparent", border: "1px solid #f1f5f9", borderRadius: "8px", color: "#94a3b8", background: "#ffffff", fontSize: "10px", padding: "5px 12px", cursor: "pointer", fontFamily: "inherit" }}>🃏 Flashcards</button>
            <button onClick={() => onNavigate("library")} style={{ background: "transparent", border: "1px solid #f1f5f9", borderRadius: "8px", color: "#94a3b8", background: "#ffffff", fontSize: "10px", padding: "5px 12px", cursor: "pointer", fontFamily: "inherit" }}>📚 Library</button>
            <button onClick={onLogout} style={{ background: "transparent", border: "1px solid #e2e8f0", borderRadius: "12px", color: "#c9a9a0", fontSize: "10px", padding: "5px 14px", cursor: "pointer", fontFamily: "inherit", borderRadius: "12px" }}>Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage