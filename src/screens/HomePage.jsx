import { C } from '../theme'
import Btn from '../components/Btn'
import { useIsMobile } from '../hooks/useIsMobile'
import { FLASHCARDS } from '../data/flashcards'
import { EXAM_DATES_CONFIRMED, EXAM_CYCLE_YEAR } from '../data/subjects'
import { adaptPlanToWindow, getCurrentPhaseId, getExamCountdown, taskKey, allTaskRefs, pickFurthestBehind } from '../utils/planEngine'

export default function HomePage({ username, checked, mySubjects, planSettings, streak, onNavigate, onLogout, onEditSubjects, onAdjustPlan }) {
  const isMobile = useIsMobile();
  const allProgress = mySubjects.map(s => {
    const refs = allTaskRefs(s);
    const total = refs.length;
    const done = refs.filter(ref => checked[taskKey(s.id, ref)]).length;
    return { ...s, total, done, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
  });
  const totalDone = allProgress.reduce((a, s) => a + s.done, 0);
  const totalTasks = allProgress.reduce((a, s) => a + s.total, 0);
  const totalPct = totalTasks === 0 ? 0 : Math.round((totalDone / totalTasks) * 100);
  const totalCards = mySubjects.reduce((a, s) => a + (FLASHCARDS[s.id] || []).length, 0);
  const nextExam = EXAM_DATES_CONFIRMED
    ? [...mySubjects].sort((a, b) => new Date(a.examDate) - new Date(b.examDate)).find(s => getExamCountdown(s.examDate).days > 0)
    : undefined;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const displayName = username || 'there';

  // Next exam when dates are confirmed; until then, the planned subject furthest behind schedule.
  const behind = nextExam ? null : pickFurthestBehind(mySubjects, planSettings, checked);
  const todayFocusSubject = nextExam ?? behind?.subject;
  const focusReason = behind ? `${Math.round(behind.doneShare * 100)}% of tasks done · ${Math.round(behind.timeShare * 100)}% of plan time used` : null;
  const todayFocusPlan = todayFocusSubject ? planSettings[todayFocusSubject.id] : null;
  const todayAdapted = todayFocusSubject && todayFocusPlan ? adaptPlanToWindow(todayFocusSubject, todayFocusPlan.durationDays, todayFocusPlan.startDate) : null;
  const currentPhaseId = todayAdapted ? getCurrentPhaseId(todayAdapted, todayFocusPlan?.startDate) : null;
  const currentPhase = todayAdapted?.find(w => w.id === currentPhaseId);

  return (
    <div style={{ height: '100vh', background: C.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 28px', height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: C.red }} />
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', fontWeight: 700, color: C.text }}>Score Forge</span>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {streak?.count > 0 && <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '99px', padding: '4px 12px', fontSize: '11px', color: '#9A3412', fontWeight: 700 }}>🔥 {streak.count} day streak</div>}
          <button onClick={onEditSubjects} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.text2 }}>✎ Subjects</button>
          <button onClick={onAdjustPlan} style={{ background: C.redLight, border: `1px solid ${C.redMid}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.red, fontWeight: 600 }}>🗓 Plans</button>
          <button onClick={() => onNavigate('library')} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.text2 }}>📚 Library</button>
          <button onClick={() => onNavigate('account')} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.text2 }}>⚙</button>
          <div style={{ background: C.bg2, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 12px', fontSize: '12px', fontWeight: 600, color: C.text }}>{displayName}</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '32px', background: C.bg }}>
        <div style={{ maxWidth: '1020px', margin: '0 auto' }}>
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 700, color: C.text, letterSpacing: '-0.02em', marginBottom: '6px' }}>
              {greeting}, <span style={{ color: C.red }}>{displayName}</span> 👋
            </h1>
            <p style={{ color: C.muted, fontSize: '14px' }}>{totalDone === 0 ? 'Ready to start forging your scores?' : `${totalDone} of ${totalTasks} tasks complete.`}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px', marginBottom: '24px' }}>
            {[
              { label: 'Overall Progress', value: `${totalPct}%`, sub: `${totalDone} / ${totalTasks} tasks`, color: C.red },
              { label: 'Subjects', value: `${mySubjects.length}`, sub: 'AP courses tracked', color: '#2563eb' },
              { label: 'Flashcards', value: `${totalCards}`, sub: 'total cards available', color: '#d97706' },
              { label: 'Next Exam', value: nextExam ? `${getExamCountdown(nextExam.examDate).days}d` : '—', sub: nextExam ? nextExam.shortName : (EXAM_DATES_CONFIRMED ? 'All done!' : 'Dates TBA'), color: nextExam ? nextExam.color : C.muted },
            ].map((s, i) => (
              <div key={i} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '18px 20px' }}>
                <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted, marginBottom: '8px' }}>{s.label}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ color: C.muted, fontSize: '11px', marginTop: '4px' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {currentPhase && (
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `4px solid ${todayFocusSubject.color}`, borderRadius: '16px', padding: '18px 22px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted }}>📍 Today's Focus</div>
                <div style={{ background: `${todayFocusSubject.color}15`, border: `1px solid ${todayFocusSubject.color}30`, borderRadius: '99px', padding: '1px 8px', fontSize: '10px', color: todayFocusSubject.color, fontWeight: 600 }}>{todayFocusSubject.shortName}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: C.text, marginBottom: '2px' }}>{currentPhase.label}: {currentPhase.theme}</div>
                  <div style={{ fontSize: '12px', color: C.muted }}>{currentPhase.dates} · {currentPhase.examWeight} of exam</div>
                  {focusReason && <div style={{ fontSize: '11px', color: behind.gap > 0 ? '#9A3412' : C.muted, marginTop: '4px', fontWeight: 600 }}>{behind.gap > 0 ? 'Furthest behind: ' : 'On track: '}{focusReason}</div>}
                </div>
                <button onClick={() => onNavigate('study', todayFocusSubject.id)} style={{ background: todayFocusSubject.color, border: 'none', borderRadius: '10px', color: 'white', fontSize: '12px', fontWeight: 600, padding: '9px 18px', cursor: 'pointer', fontFamily: 'inherit' }}>Continue →</button>
              </div>
            </div>
          )}

          {nextExam && (
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.red}`, borderRadius: '16px', padding: '18px 22px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '26px' }}>{nextExam.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.muted, marginBottom: '2px' }}>Next Exam</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: C.text, marginBottom: '2px' }}>{nextExam.name}</div>
                <div style={{ fontSize: '12px', color: C.muted }}>{nextExam.examInfo}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '40px', fontWeight: 700, color: C.red, lineHeight: 1 }}>{getExamCountdown(nextExam.examDate).days}</div>
                <div style={{ fontSize: '11px', color: C.muted }}>days away</div>
              </div>
              <Btn onClick={() => onNavigate('study', nextExam.id)} style={{ whiteSpace: 'nowrap' }}>Study Now →</Btn>
            </div>
          )}

          {(!planSettings || Object.keys(planSettings).length === 0) && (
            <div style={{ background: C.redLight, border: `1px solid ${C.redMid}`, borderRadius: '16px', padding: '18px 22px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '26px' }}>🗓️</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: C.red, fontSize: '14px', fontWeight: 700, marginBottom: '3px' }}>Set up your adaptive study plan</div>
                <div style={{ color: '#9A3412', fontSize: '12px', lineHeight: 1.6 }}>Tell us how much time you have and your plan shapes itself perfectly.</div>
              </div>
              <Btn onClick={onAdjustPlan} style={{ whiteSpace: 'nowrap' }}>Set up plans →</Btn>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted }}>My Subjects ({mySubjects.length})</div>
            <button onClick={onEditSubjects} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '3px 10px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '10px', color: C.muted }}>✎ Edit</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '10px', marginBottom: '28px' }}>
            {allProgress.map(sub => {
              const { confirmed, days } = getExamCountdown(sub.examDate);
              const urgency = !confirmed ? C.muted : days < 14 ? C.red : days < 30 ? '#d97706' : sub.color;
              return (
                <div key={sub.id} onClick={() => onNavigate('study', sub.id)}
                  style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '18px 20px', cursor: 'pointer', transition: 'all 0.18s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = sub.color + '50'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(28,16,9,0.09)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '36px', height: '36px', background: `${sub.color}12`, border: `1px solid ${sub.color}25`, borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>{sub.icon}</div>
                      <div>
                        <div style={{ color: C.text, fontSize: '12px', fontWeight: 700 }}>{sub.name}</div>
                        <div style={{ color: C.muted, fontSize: '10px', marginTop: '1px' }}>{sub.weeks.length} weeks · {(FLASHCARDS[sub.id] || []).length} cards{planSettings[sub.id] ? ` · ${planSettings[sub.id].durationDays}d plan` : ''}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: urgency, fontSize: '16px', fontWeight: 700 }}>{confirmed ? `${days}d` : 'TBA'}</div>
                      <div style={{ color: C.muted, fontSize: '10px' }}>until exam</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ color: C.muted, fontSize: '10px' }}>{sub.done}/{sub.total} tasks</span>
                    <span style={{ color: sub.color, fontSize: '10px', fontWeight: 700 }}>{sub.pct}%</span>
                  </div>
                  <div style={{ height: '6px', background: C.bg3, borderRadius: '99px', overflow: 'hidden', marginBottom: '12px' }}>
                    <div style={{ height: '100%', width: `${sub.pct}%`, background: sub.color, borderRadius: '99px' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <div style={{ flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '5px 8px', textAlign: 'center', color: sub.color, fontSize: '10px', fontWeight: 500 }}>📅 Study</div>
                    <div onClick={e => { e.stopPropagation(); onNavigate('flashcards', sub.id); }} style={{ flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '5px 8px', textAlign: 'center', color: C.muted, fontSize: '10px', cursor: 'pointer' }}>🃏 Cards</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '20px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ color: C.muted, fontSize: '11px' }}>Score Forge · Built for AP {EXAM_CYCLE_YEAR}</div>
            <button onClick={onLogout} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 14px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '10px', color: C.muted }}>Sign Out</button>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      {isMobile && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: C.white, borderTop: `1px solid ${C.border}`, height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 8px', boxShadow: '0 -2px 12px rgba(28,16,9,0.06)', zIndex: 200, paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {[
            { icon: '🏠', label: 'Home', action: () => { } },
            { icon: '✎', label: 'Subjects', action: onEditSubjects },
            { icon: '🗓', label: 'Plans', action: onAdjustPlan },
            { icon: '📚', label: 'Library', action: () => onNavigate('library') },
            { icon: '⚙', label: 'Account', action: () => onNavigate('account') },
          ].map(item => (
            <button key={item.label} onClick={item.action} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', background: item.label === 'Home' ? C.redLight : 'none', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: '10px', minWidth: '52px' }}>
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              <span style={{ fontFamily: 'inherit', fontSize: '9px', fontWeight: 600, color: item.label === 'Home' ? C.red : C.muted }}>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
