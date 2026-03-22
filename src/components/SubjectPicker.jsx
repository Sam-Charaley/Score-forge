import React from 'react'
import { SUBJECTS } from '../data/subjects'
import StudyPlanSetup from './StudyPlanSetup'

function SubjectPicker({ username, initial, onSave }) {
  const [selected, setSelected] = React.useState(() => initial || SUBJECTS.map(s => s.id))
  const [step, setStep] = React.useState('pick')

  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const canSave = selected.length > 0
  const selectedSubjects = SUBJECTS.filter(s => selected.includes(s.id))

  if (step === 'plan') {
    return (
      <StudyPlanSetup
        username={username}
        subjects={selectedSubjects}
        existingSettings={{}}
        onSave={(planSettings) => onSave(selected, planSettings)}
        onBack={() => setStep('pick')}
      />
    )
  }

  return (
    <div style={{ height: "100vh", background: "linear-gradient(135deg, #0b1220 0%, #0f172a 60%, #0b1220 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", overflowY: "auto", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(#c7d2fe 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: 0.15, pointerEvents: "none" }} />
      <div style={{ width: "100%", maxWidth: "620px", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "28px", marginBottom: "10px" }}>📚</div>
          <h2 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: 700, letterSpacing: "-0.02em", color: "#f7f8fc" }}>
            {initial ? "Edit Your Subjects" : `Welcome, ${username}!`}
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "12px", margin: 0 }}>
            {initial ? "Select which APs you want to track." : "Choose which AP exams you're taking this year."}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))", gap: "10px", marginBottom: "28px" }}>
          {SUBJECTS.map(s => {
            const on = selected.includes(s.id)
            return (
              <button key={s.id} onClick={() => toggle(s.id)} style={{
                background: on ? `${s.color}14` : "#1e293b",
                border: `2px solid ${on ? s.color : "#334155"}`,
                borderRadius: "12px", padding: "16px 14px", cursor: "pointer",
                fontFamily: "inherit", textAlign: "left", position: "relative",
              }}>
                <div style={{
                  position: "absolute", top: "10px", right: "10px",
                  width: "18px", height: "18px", borderRadius: "50%",
                  background: on ? s.color : "transparent",
                  border: `2px solid ${on ? s.color : "#334155"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {on && <span style={{ color: "#0f172a", fontSize: "10px", fontWeight: 900 }}>✓</span>}
                </div>
                <div style={{ fontSize: "22px", marginBottom: "8px" }}>{s.icon}</div>
                <div style={{ color: on ? s.color : "#f7f8fc", fontSize: "12px", fontWeight: 700, marginBottom: "3px" }}>{s.shortName}</div>
                <div style={{ color: "#94a3b8", fontSize: "10px", lineHeight: "1.4" }}>{s.examInfo.split('·')[0].trim()}</div>
              </button>
            )
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <span style={{ color: "#94a3b8", fontSize: "11px" }}>
            {selected.length === 0 ? "Select at least one subject" : `${selected.length} subject${selected.length !== 1 ? "s" : ""} selected`}
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            {selected.length !== SUBJECTS.length && (
              <button onClick={() => setSelected(SUBJECTS.map(s => s.id))} style={{ background: "transparent", border: "1px solid #334155", borderRadius: "10px", color: "#94a3b8", fontSize: "11px", padding: "9px 16px", cursor: "pointer", fontFamily: "inherit" }}>Select All</button>
            )}
            <button onClick={() => canSave && setStep('plan')} style={{
              background: canSave ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#334155",
              border: "none", borderRadius: "10px",
              color: canSave ? "#f7f8fc" : "#94a3b8",
              fontSize: "12px", fontWeight: 700, padding: "10px 24px",
              cursor: canSave ? "pointer" : "not-allowed", fontFamily: "inherit",
            }}>
              {initial ? "Save Changes →" : "Next: Set Duration →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubjectPicker