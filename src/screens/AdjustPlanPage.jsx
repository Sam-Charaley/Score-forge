import { C } from '../theme'
import Btn from '../components/Btn'
import { EXAM_DATES_CONFIRMED } from '../data/subjects'
import { adaptPlanToWindow, getExamCountdown } from '../utils/planEngine'

const DEFAULT_PLAN_DAYS = 42

const todayIsoDate = () => new Date().toISOString().split('T')[0];

export default function AdjustPlanPage({ mySubjects, planSettings, onSavePlanSetting, onClose }) {
  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', overflowY: 'auto' }}>
      <div style={{ position: 'fixed', inset: 0, backgroundImage: `radial-gradient(${C.border} 1px, transparent 1px)`, backgroundSize: '28px 28px', opacity: 0.6, pointerEvents: 'none' }} />
      <div style={{ width: '100%', maxWidth: '600px', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: C.text, marginBottom: '8px' }}>🗓️ Adjust Study Plans</div>
          <p style={{ color: C.muted, fontSize: '13px' }}>Update your study duration for any subject.</p>
        </div>
        {mySubjects.map(s => (
          <div key={s.id} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '20px 24px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '34px', height: '34px', background: `${s.color}12`, border: `1px solid ${s.color}25`, borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>{s.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: C.text, fontSize: '13px', fontWeight: 700 }}>{s.name}</div>
                <div style={{ color: C.muted, fontSize: '10px' }}>Exam: {s.examInfo.split('·')[0].trim()}</div>
              </div>
              {EXAM_DATES_CONFIRMED ? (
                <button onClick={async () => {
                  const d = Math.max(1, getExamCountdown(s.examDate).days);
                  await onSavePlanSetting(s.id, { durationDays: d, startDate: todayIsoDate() });
                }} style={{ background: C.redLight, border: `1px solid ${C.redMid}`, borderRadius: '99px', padding: '4px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '10px', color: C.red, fontWeight: 600 }}>
                  🎯 Till exam ({Math.max(1, getExamCountdown(s.examDate).days)}d)
                </button>
              ) : (
                <span style={{ fontSize: '10px', color: C.muted }}>Exam date TBA</span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input type="number" min="1" max="730" value={planSettings[s.id]?.durationDays || DEFAULT_PLAN_DAYS}
                onChange={async e => {
                  const v = Math.max(1, parseInt(e.target.value) || 1);
                  await onSavePlanSetting(s.id, { durationDays: v, startDate: planSettings[s.id]?.startDate || todayIsoDate() });
                }}
                style={{ width: '80px', textAlign: 'center', fontSize: '22px', fontWeight: 800, color: s.color, background: `${s.color}10`, border: `2px solid ${s.color}25`, borderRadius: '8px', padding: '6px', fontFamily: 'inherit', outline: 'none' }} />
              <span style={{ color: C.muted, fontSize: '12px' }}>days · {adaptPlanToWindow(s, planSettings[s.id]?.durationDays || DEFAULT_PLAN_DAYS, planSettings[s.id]?.startDate).length} phases</span>
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
          <Btn onClick={onClose} variant="ghost">← Back</Btn>
          <Btn onClick={onClose}>Done ✓</Btn>
        </div>
      </div>
    </div>
  );
}
