import { useState } from 'react'
import { C } from '../theme'
import Btn from '../components/Btn'
import { useIsMobile } from '../hooks/useIsMobile'
import { useWeekNote, NOTE_STATUS } from '../hooks/useWeekNote'
import { getCurrentPhaseId, getExamCountdown, taskKey, allTaskRefs } from '../utils/planEngine'

export default function StudyPage({ user, subject, adaptedWeeks, checked, toggleTask, onSaveNote, planDays, planStart, onAdjustPlan, onBack, onFlashcards, onLibrary, onSubject, mySubjects }) {
  const isMobile = useIsMobile();
  const [activeWeek, setActiveWeek] = useState(() => getCurrentPhaseId(adaptedWeeks, planStart));
  const [activeTab, setActiveTab] = useState('days');
  const w = adaptedWeeks.find(wk => wk.id === activeWeek) || adaptedWeeks[0];

  // Notes belong to the first original week a phase covers, so they stay put when the plan length changes.
  const noteWeekId = w?._coveredWeekIds?.[0] ?? w?.id;
  const note = useWeekNote({ userId: user?.id, subjectId: subject.id, weekId: noteWeekId, saveNote: onSaveNote });
  const noteStatusLabel = {
    [NOTE_STATUS.loading]: 'loading…',
    [NOTE_STATUS.idle]: '',
    [NOTE_STATUS.saving]: 'saving…',
    [NOTE_STATUS.saved]: '✓ saved',
    [NOTE_STATUS.error]: '⚠ not saved',
    [NOTE_STATUS.loadError]: "⚠ couldn't load",
  }[note.status];

  const percentDone = refs => refs.length === 0 ? 0 : Math.round((refs.filter(ref => checked[taskKey(subject.id, ref)]).length / refs.length) * 100);
  const weekProgress = wk => percentDone(wk.days.flatMap(day => day.taskRefs.filter(Boolean)));
  const subjectProgress = () => percentDone(allTaskRefs(subject));

  const { confirmed: examConfirmed, days: examDays } = getExamCountdown(subject.examDate);
  const tabs = [
    { id: 'days', label: '📅 Daily Plan' },
    { id: 'rules', label: '📌 Key Rules' },
    { id: 'resources', label: '🔗 Resources' },
    ...(w && w.frq ? [{ id: 'frq', label: '✍ FRQ' }] : []),
    { id: 'notes', label: '📝 Notes' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: C.bg }}>
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 20px', height: '54px', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: 0 }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: C.red }} />
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 700, color: C.text }}>Score Forge</span>
        </button>
        <div style={{ display: 'flex', gap: '4px', flex: 1, justifyContent: isMobile ? 'flex-start' : 'center', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {mySubjects.map(s => (
            <button key={s.id} onClick={() => onSubject(s.id)} style={{ background: s.id === subject.id ? `${s.color}12` : 'transparent', border: `1px solid ${s.id === subject.id ? s.color : C.border}`, borderRadius: '8px', padding: '4px 11px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', fontWeight: s.id === subject.id ? 700 : 500, color: s.id === subject.id ? s.color : C.muted }}>
              {s.icon} {s.shortName}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '5px' }}>
          <button onClick={onFlashcards} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 11px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.text2 }}>🃏 Cards</button>
          <button onClick={onLibrary} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 11px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.text2 }}>📚 Library</button>
        </div>
      </div>

      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '8px 22px', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, flexWrap: 'wrap' }}>
        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: subject.color }} />
        <span style={{ color: subject.color, fontSize: '12px', fontWeight: 700 }}>{subject.name}</span>
        <span style={{ color: C.muted, fontSize: '11px' }}>· {subject.examInfo}</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: !examConfirmed ? C.bg2 : examDays < 14 ? C.redLight : examDays < 30 ? '#FFF7ED' : C.bg2, border: `1px solid ${!examConfirmed ? C.border : examDays < 14 ? C.redMid : examDays < 30 ? '#FED7AA' : C.border}`, borderRadius: '99px', padding: '3px 12px', fontSize: '11px', fontWeight: 700, color: !examConfirmed ? C.muted : examDays < 14 ? C.red : examDays < 30 ? '#9A3412' : C.text2 }}>
            ⏱ {examConfirmed ? `${examDays}d until exam` : 'Exam date TBA'}
          </div>
          {planDays && <div style={{ background: C.redLight, border: `1px solid ${C.redMid}`, borderRadius: '99px', padding: '3px 10px', fontSize: '10px', color: C.red, fontWeight: 700 }}>{planDays}d plan · {adaptedWeeks.length} phases</div>}
          <button onClick={onAdjustPlan} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '99px', color: C.muted, fontSize: '10px', padding: '3px 11px', cursor: 'pointer', fontFamily: 'inherit' }}>⚙ Adjust Plan</button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ width: isMobile ? '0' : '210px', minWidth: isMobile ? '0' : '210px', borderRight: isMobile ? 'none' : `1px solid ${C.border}`, background: C.white, overflowY: 'auto', padding: isMobile ? '0' : '8px 0', display: isMobile ? 'none' : 'block' }}>
          <div style={{ padding: '12px 14px 10px', borderBottom: `1px solid ${C.border}`, marginBottom: '4px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: C.text, marginBottom: '6px' }}>{subject.shortName}</div>
            <div style={{ height: '4px', background: C.bg3, borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${subjectProgress()}%`, background: subject.color, borderRadius: '99px' }} />
            </div>
            <div style={{ fontSize: '10px', color: C.muted, marginTop: '4px' }}>{subjectProgress()}% complete</div>
          </div>
          {adaptedWeeks.map(wk => {
            const pct = weekProgress(wk);
            const isActive = activeWeek === wk.id;
            const isCurrent = getCurrentPhaseId(adaptedWeeks, planStart) === wk.id;
            return (
              <button key={wk.id} onClick={() => { setActiveWeek(wk.id); setActiveTab('days'); }}
                style={{ display: 'block', width: '100%', textAlign: 'left', background: isActive ? `${wk.color}08` : 'transparent', border: 'none', borderLeft: `3px solid ${isActive ? wk.color : 'transparent'}`, padding: '10px 13px', cursor: 'pointer', position: 'relative' }}>
                {isCurrent && !isActive && <div style={{ position: 'absolute', top: '8px', right: '10px', width: '6px', height: '6px', borderRadius: '50%', background: C.red }} />}
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: isActive ? wk.color : C.muted, marginBottom: '2px' }}>{wk.isExamWeek ? '🎯 EXAM' : wk.label}</div>
                <div style={{ fontSize: '11px', fontWeight: 500, color: C.text, lineHeight: '1.3', marginBottom: '5px' }}>{wk.theme.length > 26 ? wk.theme.slice(0, 25) + '…' : wk.theme}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ flex: 1, height: '3px', background: C.bg3, borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: wk.color, borderRadius: '99px' }} />
                  </div>
                  <span style={{ fontSize: '9px', color: C.muted }}>{pct}%</span>
                </div>
              </button>
            );
          })}
        </div>

        {w && (
          <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '14px' : '26px 34px', background: C.bg, paddingBottom: isMobile ? '80px' : '26px' }}>
            <div style={{ maxWidth: '720px' }}>
              {!planDays && (
                <div style={{ background: C.redLight, border: `1px solid ${C.redMid}`, borderRadius: '14px', padding: '16px 20px', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '22px' }}>🗓️</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: C.red, fontSize: '12px', fontWeight: 700, marginBottom: '3px' }}>No study plan set</div>
                    <div style={{ color: '#9A3412', fontSize: '11px' }}>Tell us your timeline and we'll pace this perfectly.</div>
                  </div>
                  <Btn onClick={onAdjustPlan} style={{ whiteSpace: 'nowrap', fontSize: '11px', padding: '8px 16px' }}>Set up →</Btn>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: w.color, boxShadow: `0 0 8px ${w.color}60`, flexShrink: 0 }} />
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: C.text }}>{w.isExamWeek ? '🎯 Exam Week' : w.label}: {w.theme}</h2>
              </div>
              <div style={{ color: C.muted, fontSize: '12px', marginBottom: '16px', marginLeft: '16px' }}>
                {w.dates} &nbsp;·&nbsp; <span style={{ color: w.color, fontWeight: 600 }}>{w.examWeight} of exam</span>
              </div>
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${w.color}`, borderRadius: '12px', padding: '14px 18px', fontSize: '13px', lineHeight: '1.8', color: C.text2, marginBottom: '18px' }}>{w.overview}</div>

              <div style={{ display: 'flex', gap: '3px', marginBottom: '18px', background: C.bg2, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '4px', width: 'fit-content' }}>
                {tabs.map(t => (
                  <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ background: activeTab === t.id ? C.white : 'transparent', border: activeTab === t.id ? `1px solid ${w.color}30` : '1px solid transparent', borderRadius: '8px', padding: '7px 14px', color: activeTab === t.id ? w.color : C.muted, cursor: 'pointer', fontSize: '12px', fontFamily: 'inherit', fontWeight: activeTab === t.id ? 600 : 400, boxShadow: activeTab === t.id ? '0 1px 4px rgba(28,16,9,0.08)' : 'none' }}>
                    {t.label}
                  </button>
                ))}
              </div>

              {activeTab === 'days' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {w.days.map((day, di) => (
                    <div key={di} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '14px', overflow: 'hidden' }}>
                      <div style={{ padding: '9px 16px', borderBottom: `1px solid ${C.border}`, color: w.color, fontSize: '11px', fontWeight: 700, background: `${w.color}06` }}>{day.day}</div>
                      {day.tasks.map((task, ti) => {
                        const ref = day.taskRefs[ti];
                        if (!ref) return (
                          <div key={ti} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 16px', borderBottom: ti < day.tasks.length - 1 ? `1px solid ${C.bg2}` : 'none' }}>
                            <span style={{ width: '18px', minWidth: '18px', textAlign: 'center', color: w.color, fontWeight: 700 }}>•</span>
                            <span style={{ fontSize: '13px', color: C.text, lineHeight: '1.6', fontWeight: 500 }}>{task}</span>
                          </div>
                        );
                        const done = !!checked[taskKey(subject.id, ref)];
                        return (
                          <div key={ti} onClick={() => toggleTask(ref)}
                            style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 16px', borderBottom: ti < day.tasks.length - 1 ? `1px solid ${C.bg2}` : 'none', cursor: 'pointer', background: done ? `${w.color}05` : 'transparent' }}>
                            <div style={{ width: '18px', height: '18px', minWidth: '18px', borderRadius: '6px', marginTop: '1px', border: `1.5px solid ${done ? w.color : C.border2}`, background: done ? w.color : C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              {done && <span style={{ color: 'white', fontSize: '9px', fontWeight: 900 }}>✓</span>}
                            </div>
                            <span style={{ fontSize: '13px', color: done ? C.muted : C.text, textDecoration: done ? 'line-through' : 'none', lineHeight: '1.6', fontWeight: done ? 400 : 500 }}>{task}</span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  <div className="callout-tip">
                    <div style={{ color: '#9A3412', fontSize: '11px', fontWeight: 700, marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>💡 Pro Tip</div>
                    <div style={{ color: '#7C2D12', fontSize: '13px', lineHeight: '1.7' }}>{w.tip}</div>
                  </div>
                </div>
              )}

              {activeTab === 'rules' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {w.keyRules.map((rule, i) => (
                    <div key={i} style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${w.color}`, borderRadius: '10px', padding: '12px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: w.color, fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>→</span>
                      <span style={{ color: C.text2, fontSize: '13px', lineHeight: '1.7', fontWeight: 500 }}>{rule}</span>
                    </div>
                  ))}
                  <div className="callout-tip">
                    <div style={{ color: '#9A3412', fontSize: '11px', fontWeight: 700, marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>💡 Pro Tip</div>
                    <div style={{ color: '#7C2D12', fontSize: '13px', lineHeight: '1.7' }}>{w.tip}</div>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ color: C.muted, fontSize: '10px', marginBottom: '4px' }}>Resources for {w.label}'s topics:</div>
                  {w.resources.map((r, i) => (
                    <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                      style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '12px 16px', textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '10px' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = w.color + '50'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                      <span style={{ color: w.color, fontSize: '14px', marginTop: '1px' }}>↗</span>
                      <div>
                        <div style={{ color: C.text, fontSize: '12px', fontWeight: 600, marginBottom: '2px' }}>{r.name}</div>
                        <div style={{ color: C.muted, fontSize: '11px', lineHeight: '1.5' }}>{r.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {activeTab === 'frq' && w.frq && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ background: C.white, border: `1px solid ${w.color}30`, borderLeft: `3px solid ${w.color}`, borderRadius: '14px', padding: '18px 20px' }}>
                    <div style={{ color: w.color, fontSize: '11px', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>✍ This Week's FRQ</div>
                    <div style={{ color: C.text, fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>{w.frq.type}</div>
                    <div style={{ color: C.text2, fontSize: '13px', lineHeight: '1.8' }}>{w.frq.prompt}</div>
                  </div>
                  <div className="callout-rubric">
                    <div style={{ color: '#1D4ED8', fontSize: '11px', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>📋 Rubric Wisdom</div>
                    <div style={{ color: '#1E40AF', fontSize: '13px', lineHeight: '1.7' }}>{w.frq.rubricTip}</div>
                  </div>
                  <div className="callout-tip">
                    <div style={{ color: '#9A3412', fontSize: '11px', fontWeight: 700, marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>💡 Pro Tip</div>
                    <div style={{ color: '#7C2D12', fontSize: '13px', lineHeight: '1.7' }}>{w.tip}</div>
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '14px', overflow: 'hidden' }}>
                    <div style={{ padding: '10px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: C.bg }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: C.text2 }}>📝 Notes for {w.label}</span>
                      <span style={{ fontSize: '10px', color: note.status === NOTE_STATUS.error || note.status === NOTE_STATUS.loadError ? C.red : C.muted }}>{noteStatusLabel}</span>
                    </div>
                    <textarea value={note.text} onChange={e => note.updateText(e.target.value)} disabled={!note.canEdit}
                      placeholder={note.status === NOTE_STATUS.loadError ? "Couldn't load your notes. Reopen this tab to try again." : `Write anything about ${w.theme}...`}
                      style={{ width: '100%', minHeight: '300px', padding: '16px', background: C.white, border: 'none', outline: 'none', fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: '13px', color: C.text, lineHeight: '1.8', resize: 'vertical' }} />
                  </div>
                  {note.canEdit && note.text.length > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button onClick={() => { if (window.confirm('Clear notes for this week?')) note.updateText(''); }}
                        style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.muted }}>Clear notes</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile bottom nav */}
      {isMobile && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: C.white, borderTop: `1px solid ${C.border}`, height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 8px', boxShadow: '0 -2px 12px rgba(28,16,9,0.06)', zIndex: 200, paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {[
            { icon: '🏠', label: 'Home', action: onBack },
            { icon: '📅', label: 'Plan', action: () => { } },
            { icon: '🃏', label: 'Cards', action: onFlashcards },
            { icon: '📚', label: 'Library', action: onLibrary },
            { icon: '⚙', label: 'Adjust', action: onAdjustPlan },
          ].map(item => (
            <button key={item.label} onClick={item.action} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', background: item.label === 'Plan' ? `${subject.color}15` : 'none', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: '10px', minWidth: '52px' }}>
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              <span style={{ fontFamily: 'inherit', fontSize: '9px', fontWeight: 600, color: item.label === 'Plan' ? subject.color : C.muted }}>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
