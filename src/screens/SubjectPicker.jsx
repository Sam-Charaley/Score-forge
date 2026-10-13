import { useState } from 'react'
import { C } from '../theme'
import Btn from '../components/Btn'
import { SUBJECTS, EXAM_DATES_CONFIRMED } from '../data/subjects'
import { fmtDate, addDays, getExamCountdown, todayLocalIsoDate } from '../utils/planEngine'

export default function SubjectPicker({ user, initial, onSave }) {
  const [selected, setSelected] = useState(() => initial || SUBJECTS.map(s => s.id));
  const [step, setStep] = useState('pick');
  const [globalDays, setGlobalDays] = useState(42);
  const [perSubject, setPerSubject] = useState(() => { const i = {}; SUBJECTS.forEach(s => { i[s.id] = 42; }); return i; });
  const [usePerSubject, setUsePerSubject] = useState(false);
  const [saving, setSaving] = useState(false);

  const toggle = id => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const selectedSubjects = SUBJECTS.filter(s => selected.includes(s.id));
  const today = todayLocalIsoDate();

  const handleSave = async () => {
    setSaving(true);
    const finalSettings = selectedSubjects.reduce((acc, s) => {
      acc[s.id] = { durationDays: usePerSubject ? perSubject[s.id] : globalDays, startDate: today };
      return acc;
    }, {});
    await onSave(selected, finalSettings);
    setSaving(false);
  };

  if (step === 'plan') return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', overflowY: 'auto' }}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: C.text, marginBottom: '8px' }}>Build Your Study Plan</div>
          <p style={{ color: C.muted, fontSize: '13px' }}>Set how many days you have. Your plan adapts automatically.</p>
        </div>

        {selectedSubjects.length > 1 && (
          <div style={{ display: 'flex', background: C.bg3, borderRadius: '99px', padding: '4px', marginBottom: '24px', width: 'fit-content', margin: '0 auto 24px', border: `1px solid ${C.border}` }}>
            {[['Same for all', false], ['Per subject', true]].map(([lbl, val]) => (
              <button key={String(val)} onClick={() => setUsePerSubject(val)} style={{ background: usePerSubject === val ? C.white : 'transparent', border: 'none', borderRadius: '99px', padding: '7px 18px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '12px', fontWeight: usePerSubject === val ? 600 : 400, color: usePerSubject === val ? C.text : C.muted }}>{lbl}</button>
            ))}
          </div>
        )}

        {!usePerSubject && (
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '28px', marginBottom: '20px' }}>
            <div style={{ color: C.muted, fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '14px' }}>Study Duration</div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <input type="number" min="1" max="730" value={globalDays} onChange={e => setGlobalDays(Math.max(1, parseInt(e.target.value) || 1))}
                style={{ width: '90px', textAlign: 'center', fontSize: '28px', fontWeight: 800, color: C.red, background: C.redLight, border: `2px solid ${C.redMid}`, borderRadius: '10px', padding: '10px', fontFamily: 'inherit', outline: 'none' }} />
              <div>
                <div style={{ color: C.red, fontSize: '13px', fontWeight: 700 }}>{globalDays <= 7 ? '⚡ Crash Course' : globalDays <= 14 ? '🔥 Intensive' : globalDays <= 30 ? '📅 Standard' : globalDays <= 60 ? '✨ Comfortable' : '📚 Thorough'}</div>
                <div style={{ color: C.muted, fontSize: '11px' }}>ends {fmtDate(addDays(new Date(), globalDays))}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '6px', marginTop: '14px', flexWrap: 'wrap' }}>
              {[7, 14, 30, 60, 90].map(d => (
                <button key={d} onClick={() => setGlobalDays(d)} style={{ background: globalDays === d ? C.redLight : C.bg2, border: `1px solid ${globalDays === d ? C.red : C.border}`, borderRadius: '99px', padding: '4px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: globalDays === d ? C.red : C.muted, fontWeight: globalDays === d ? 700 : 400 }}>{d}d</button>
              ))}
              {EXAM_DATES_CONFIRMED ? selectedSubjects.map(s => {
                const { days: d } = getExamCountdown(s.examDate);
                return <button key={s.id} onClick={() => setGlobalDays(Math.max(1, d))} style={{ background: globalDays === d ? `${s.color}15` : C.bg2, border: `1px solid ${globalDays === d ? s.color : C.border}`, borderRadius: '99px', padding: '4px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: globalDays === d ? s.color : C.muted, fontWeight: globalDays === d ? 700 : 400 }}>🎯 {s.shortName} ({Math.max(1, d)}d)</button>;
              }) : (
                <span style={{ fontSize: '10px', color: C.muted, alignSelf: 'center' }}>🎯 Exam-date quick-set will appear once next year's AP calendar is confirmed.</span>
              )}
            </div>
          </div>
        )}

        {usePerSubject && selectedSubjects.map(s => (
          <div key={s.id} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '20px 24px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '32px', height: '32px', background: `${s.color}15`, border: `1px solid ${s.color}30`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>{s.icon}</div>
              <div style={{ color: C.text, fontSize: '13px', fontWeight: 700 }}>{s.shortName}</div>
              {EXAM_DATES_CONFIRMED ? (
                <button onClick={() => setPerSubject(p => ({ ...p, [s.id]: Math.max(1, getExamCountdown(s.examDate).days) }))} style={{ marginLeft: 'auto', background: C.redLight, border: `1px solid ${C.redMid}`, borderRadius: '99px', padding: '3px 10px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '10px', color: C.red, fontWeight: 600 }}>🎯 Till exam</button>
              ) : (
                <span style={{ marginLeft: 'auto', fontSize: '10px', color: C.muted }}>Exam date TBA</span>
              )}
            </div>
            <input type="number" min="1" max="730" value={perSubject[s.id]} onChange={e => setPerSubject(p => ({ ...p, [s.id]: Math.max(1, parseInt(e.target.value) || 1) }))}
              style={{ width: '80px', textAlign: 'center', fontSize: '22px', fontWeight: 800, color: s.color, background: `${s.color}10`, border: `2px solid ${s.color}30`, borderRadius: '8px', padding: '6px', fontFamily: 'inherit', outline: 'none' }} />
            <span style={{ marginLeft: '8px', color: C.muted, fontSize: '12px' }}>days</span>
          </div>
        ))}

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
          <Btn onClick={() => setStep('pick')} variant="ghost">← Back</Btn>
          <Btn onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Start Studying →'}</Btn>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', overflowY: 'auto' }}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: C.text, marginBottom: '6px' }}>{initial ? 'Edit Your Subjects' : 'Welcome aboard!'}</div>
          <p style={{ color: C.muted, fontSize: '13px' }}>Choose which AP exams you're preparing for.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '10px', marginBottom: '24px' }}>
          {SUBJECTS.map(s => {
            const on = selected.includes(s.id);
            return (
              <button key={s.id} onClick={() => toggle(s.id)} style={{ background: on ? `${s.color}10` : C.white, border: `2px solid ${on ? s.color : C.border}`, borderRadius: '14px', padding: '16px 14px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '10px', right: '10px', width: '18px', height: '18px', borderRadius: '50%', background: on ? s.color : 'transparent', border: `2px solid ${on ? s.color : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {on && <span style={{ color: 'white', fontSize: '9px', fontWeight: 900 }}>✓</span>}
                </div>
                <div style={{ fontSize: '20px', marginBottom: '8px' }}>{s.icon}</div>
                <div style={{ color: on ? s.color : C.text, fontSize: '12px', fontWeight: 700, marginBottom: '2px' }}>{s.shortName}</div>
                <div style={{ color: C.muted, fontSize: '10px', lineHeight: '1.4' }}>{s.examInfo.split('·')[0].trim()}</div>
                <div style={{ marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {(() => {
                    const { confirmed, days, label } = getExamCountdown(s.examDate);
                    const dotColor = !confirmed ? C.border2 : days < 30 ? C.red : days < 60 ? '#d97706' : '#16a34a';
                    const textColor = !confirmed ? C.muted : days < 30 ? C.red : days < 60 ? '#d97706' : '#16a34a';
                    return (
                      <>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: dotColor }} />
                        <span style={{ fontSize: '10px', fontWeight: 600, color: textColor }}>{label}</span>
                      </>
                    );
                  })()}
                </div>
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <span style={{ color: C.muted, fontSize: '12px' }}>{selected.length === 0 ? 'Select at least one' : `${selected.length} selected`}</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {selected.length !== SUBJECTS.length && <Btn onClick={() => setSelected(SUBJECTS.map(s => s.id))} variant="ghost" style={{ fontSize: '11px', padding: '8px 16px' }}>Select All</Btn>}
            <Btn onClick={() => selected.length > 0 && setStep('plan')}>{initial ? 'Save Changes →' : 'Next: Set Duration →'}</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
