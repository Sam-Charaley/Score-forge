import React from 'react'
import { SUBJECTS } from '../data/subjects'
import { adaptPlanToWindow, fmtDate, addDays } from '../utils/planEngine'
import DayInput from './DayInput'

function StudyPlanSetup({ username, subjects, existingSettings, onSave, onBack }) {
  const [globalDays, setGlobalDays] = React.useState(() => {
    const first = subjects[0];
    return (existingSettings[first?.id]?.durationDays) || 42;
  });
  const [perSubject, setPerSubject] = React.useState(() => {
    const init = {};
    subjects.forEach(s => { init[s.id] = existingSettings[s.id]?.durationDays || 42; });
    return init;
  });
  const [usePerSubject, setUsePerSubject] = React.useState(false);

  const today = new Date().toISOString().split('T')[0];
  const todayDate = new Date();

  const finalSettings = subjects.reduce((acc, s) => {
    acc[s.id] = {
      durationDays: usePerSubject ? perSubject[s.id] : globalDays,
      startDate: today,
    };
    return acc;
  }, {});

  return (
    <div style={{ height: "100vh", background: "linear-gradient(135deg, #0b1220 0%, #0f172a 60%, #0b1220 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", overflowY: "auto", fontFamily: "'Inter', system-ui, sans-serif", color: "#f7f8fc" }}>
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(#c7d2fe 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: 0.15, pointerEvents: "none" }} />
      <div style={{ width: "100%", maxWidth: "660px", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "36px", marginBottom: "10px" }}>🗓️</div>
          <h2 style={{ margin: "0 0 8px", fontSize: "24px", fontWeight: 800, color: "#f7f8fc", letterSpacing: "-0.025em" }}>Build Your Study Plan</h2>
          <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0, lineHeight: 1.7 }}>
            Type any number of days — or tap <strong style={{ color: "#7c3aed" }}>🎯 till exam</strong> to auto-fill.
          </p>
        </div>

        {subjects.length > 1 && (
          <div style={{ display: "flex", background: "#1e293b", borderRadius: "99px", padding: "4px", marginBottom: "24px", width: "fit-content", margin: "0 auto 24px" }}>
            {[["Same for all subjects", false], ["Per subject", true]].map(([lbl, val]) => (
              <button key={String(val)} onClick={() => setUsePerSubject(val)} style={{
                background: usePerSubject === val ? "#334155" : "transparent",
                border: "none", borderRadius: "99px", padding: "8px 20px",
                cursor: "pointer", fontFamily: "inherit", fontSize: "12px",
                fontWeight: usePerSubject === val ? 700 : 400,
                color: usePerSubject === val ? "#f7f8fc" : "#94a3b8",
              }}>{lbl}</button>
            ))}
          </div>
        )}

        {!usePerSubject && (
          <div style={{ background: "#1e293b", borderRadius: "12px", padding: "28px", marginBottom: "24px" }}>
            <DayInput
              days={globalDays}
              onChange={setGlobalDays}
              subject={subjects.length === 1 ? subjects[0] : null}
              label={subjects.length === 1 ? `Study Duration — ${subjects[0].shortName}` : "Study Duration — All Subjects"}
            />
            {subjects.length > 1 && (
              <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid #334155" }}>
                <div style={{ color: "#94a3b8", fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "10px", fontWeight: 700 }}>
                  🎯 Set to days until each exam
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {subjects.map(s => {
                    const d = Math.max(1, Math.ceil((new Date(s.examDate) - todayDate) / 86400000));
                    const active = globalDays === d;
                    return (
                      <button key={s.id} onClick={() => setGlobalDays(d)} style={{
                        background: active ? `${s.color}18` : "transparent",
                        border: `1.5px solid ${active ? s.color : "#334155"}`,
                        borderRadius: "99px", padding: "6px 14px",
                        cursor: "pointer", fontFamily: "inherit",
                        color: active ? s.color : "#94a3b8",
                        fontSize: "11px", fontWeight: active ? 700 : 500,
                      }}>
                        {s.icon} {s.shortName} · {d}d
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {usePerSubject && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
            {subjects.map(s => (
              <div key={s.id} style={{ background: "#1e293b", borderRadius: "8px", padding: "22px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
                  <div style={{ width: "34px", height: "34px", background: `${s.color}18`, border: `1.5px solid ${s.color}40`, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>{s.icon}</div>
                  <div>
                    <div style={{ color: "#f7f8fc", fontSize: "13px", fontWeight: 700 }}>{s.name}</div>
                    <div style={{ color: "#94a3b8", fontSize: "10px" }}>{s.examInfo.split('·')[0].trim()}</div>
                  </div>
                </div>
                <DayInput
                  days={perSubject[s.id]}
                  onChange={val => setPerSubject(prev => ({ ...prev, [s.id]: val }))}
                  subject={s}
                  label="Study Duration"
                />
              </div>
            ))}
          </div>
        )}

        <div style={{ background: "#1e293b", border: "1.5px solid #334155", borderRadius: "12px", padding: "16px 20px", marginBottom: "24px" }}>
          <div style={{ color: "#94a3b8", fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px", fontWeight: 700 }}>Live Plan Preview</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {subjects.map(s => {
              const d = usePerSubject ? perSubject[s.id] : globalDays;
              const adapted = adaptPlanToWindow(s, d, today);
              const endDate = fmtDate(addDays(new Date(), d));
              const examDays = Math.max(1, Math.ceil((new Date(s.examDate) - todayDate) / 86400000));
              const coversFull = d >= examDays;
              return (
                <div key={s.id} style={{ background: "#0f172a", borderRadius: "8px", padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  <span style={{ color: s.color, fontSize: "16px" }}>{s.icon}</span>
                  <div style={{ flex: 1, minWidth: "160px" }}>
                    <div style={{ color: "#f7f8fc", fontSize: "12px", fontWeight: 700 }}>{s.shortName}</div>
                    <div style={{ color: "#94a3b8", fontSize: "11px", marginTop: "2px" }}>
                      {adapted.length} phases · ends {endDate}
                      {coversFull && <span style={{ color: "#16a34a", marginLeft: "6px", fontWeight: 700 }}>✓ full coverage</span>}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
                    {adapted.slice(0, 10).map((ph, i) => (
                      <div key={i} style={{ width: "18px", height: "6px", borderRadius: "99px", background: ph.isExamWeek ? "#dc2626" : s.color, opacity: 0.7 }} />
                    ))}
                  </div>
                  <div style={{ textAlign: "right", minWidth: "60px" }}>
                    <div style={{ color: s.color, fontSize: "16px", fontWeight: 800, lineHeight: 1 }}>{d}</div>
                    <div style={{ color: "#94a3b8", fontSize: "10px" }}>days</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          {onBack && (
            <button onClick={onBack} style={{ background: "transparent", border: "1.5px solid #334155", borderRadius: "99px", color: "#94a3b8", fontSize: "13px", padding: "11px 24px", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
              ← Back
            </button>
          )}
          <button onClick={() => onSave(finalSettings)} style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            border: "none", borderRadius: "99px", color: "#f7f8fc",
            fontSize: "13px", fontWeight: 800, padding: "11px 36px",
            cursor: "pointer", fontFamily: "inherit",
            boxShadow: "0 4px 20px rgba(124,58,237,0.3)",
          }}>
            Start Studying →
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudyPlanSetup