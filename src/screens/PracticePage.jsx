import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { C } from '../theme'
import Btn from '../components/Btn'
import { useIsMobile } from '../hooks/useIsMobile'
import { usePracticeHistory } from '../hooks/usePracticeHistory'
import { useQuestionBank } from '../hooks/useQuestionBank'
import { pickNextQuestion, createVisibleTimer } from '../utils/practice'
import { pickSmartQuestion } from '../utils/priority'
import { masteryLevel, chanceOnMediumQuestion, MIN_ATTEMPTS_FOR_LEVEL } from '../utils/mastery'

const CHOICE_LETTERS = ['A', 'B', 'C', 'D'];
const ALL_UNITS = 'all';
// Phase 3 default: topic by priority, question at the target difficulty.
const SMART = 'smart';
const CORRECT_GREEN = '#166534';
const CORRECT_BG = '#F0FDF4';
const CORRECT_BORDER = '#86EFAC';
const MONO_FONT = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const DIFFICULTY_LABELS = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };

function MasteryRow({ name, stats }) {
  const level = masteryLevel(stats);
  const chance = stats ? chanceOnMediumQuestion(stats.rating) : null;
  const remaining = MIN_ATTEMPTS_FOR_LEVEL - (stats?.attempts ?? 0);
  return (
    <div style={{ padding: '8px 0', borderBottom: `1px solid ${C.bg2}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
        <span style={{ fontSize: '12px', color: C.text, fontWeight: 600 }}>{name}</span>
        <span style={{ fontSize: '11px', color: level ? C.text2 : C.muted, fontWeight: level ? 700 : 400, whiteSpace: 'nowrap' }}>
          {level ? level.label : `${remaining} more to rate`}
        </span>
      </div>
      <div style={{ height: '5px', background: C.bg3, borderRadius: '99px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: level ? `${Math.round(chance * 100)}%` : '0%', background: C.red, borderRadius: '99px', transition: 'width 0.3s ease' }} />
      </div>
      <div style={{ fontSize: '10px', color: C.muted, marginTop: '3px' }}>
        {stats ? `${stats.correct}/${stats.attempts} correct` : 'Not practiced yet'}
        {level && ` · ${Math.round(chance * 100)}% on a medium question`}
      </div>
    </div>
  );
}

export default function PracticePage({ user, subject, onBack, onSaveError }) {
  const isMobile = useIsMobile();
  const bank = useQuestionBank(subject.id);
  const history = usePracticeHistory({ userId: user.id, subjectId: subject.id, onSaveError });
  const [scope, setScope] = useState(SMART);
  const [question, setQuestion] = useState(null);
  const [reason, setReason] = useState(null);
  const [chosenIndex, setChosenIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [session, setSession] = useState({ answered: 0, correct: 0 });
  const timer = useRef(null);

  const topicById = useMemo(() => new Map((bank.topics ?? []).map(t => [t.id, t])), [bank.topics]);
  const pool = useMemo(() => {
    if (bank.status !== 'ready') return [];
    return scope === ALL_UNITS || scope === SMART ? bank.questions : bank.questions.filter(q => topicById.get(q.topic)?.unit === scope);
  }, [bank, scope, topicById]);
  const unitsWithQuestions = useMemo(() => (bank.units ?? []).filter(u => (bank.questions ?? []).some(q => topicById.get(q.topic)?.unit === u.id)), [bank, topicById]);
  const topicsInScope = useMemo(() => (bank.topics ?? []).filter(t => pool.some(q => q.topic === t.id)), [bank.topics, pool]);

  const showQuestion = useCallback((next, why = null) => {
    timer.current?.stop();
    timer.current = next ? createVisibleTimer() : null;
    setQuestion(next);
    setReason(why);
    setChosenIndex(null);
    setSubmitted(false);
  }, []);

  const chooseNext = useCallback((previousQuestionId = null) => {
    const attempts = history.attempts ?? [];
    if (scope === SMART) {
      const pick = pickSmartQuestion({ units: bank.units, topics: bank.topics, questions: bank.questions, attempts, mastery: history.mastery, previousQuestionId });
      showQuestion(pick?.question ?? null, pick?.reason ?? null);
    } else {
      showQuestion(pickNextQuestion(pool, attempts, previousQuestionId));
    }
  }, [scope, bank, pool, history.attempts, history.mastery, showQuestion]);

  // First question once both the bank and the history are in, and whenever the scope changes.
  useEffect(() => {
    if (bank.status === 'ready' && history.attempts) chooseNext();
  }, [bank.status, scope, history.attempts === null]);

  useEffect(() => () => timer.current?.stop(), []);

  const submit = useCallback(async () => {
    if (!question || chosenIndex === null || submitted) return;
    const correct = chosenIndex === question.answer;
    const timeMs = timer.current?.elapsedMs() ?? 0;
    timer.current?.stop();
    setSubmitted(true);
    setSession(s => ({ answered: s.answered + 1, correct: s.correct + (correct ? 1 : 0) }));
    await history.record({ questionId: question.id, topicId: question.topic, difficulty: question.difficulty, chosenIndex, correct, timeMs });
  }, [question, chosenIndex, submitted, history]);

  const next = useCallback(() => chooseNext(question?.id), [chooseNext, question]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target instanceof HTMLElement && ['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (!submitted) {
        const index = ['1', '2', '3', '4'].indexOf(e.key) >= 0 ? Number(e.key) - 1 : CHOICE_LETTERS.indexOf(e.key.toUpperCase());
        if (index >= 0 && question && index < question.choices.length) { setChosenIndex(index); return; }
      }
      if (e.key === 'Enter') { e.preventDefault(); if (submitted) next(); else submit(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [submitted, question, submit, next]);

  const header = (
    <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 20px', height: '54px', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
      <button onClick={onBack} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.text2 }}>← Back</button>
      <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: subject.color }} />
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 700, color: C.text }}>🎯 {subject.shortName} Practice</span>
      {session.answered > 0 && <span style={{ marginLeft: 'auto', fontSize: '11px', color: C.muted }}>This session: <b style={{ color: C.text }}>{session.correct}/{session.answered}</b></span>}
    </div>
  );

  const centered = (content) => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: C.bg }}>
      {header}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', color: C.muted, fontSize: '13px', lineHeight: 1.7 }}>
        <div style={{ maxWidth: '420px' }}>{content}</div>
      </div>
    </div>
  );

  if (bank.status === 'error') return centered(<>{bank.message} <Btn variant="ghost" onClick={() => window.location.reload()} style={{ marginLeft: '8px' }}>Reload</Btn></>);
  if (history.loadError) return centered(<>{history.loadError} <Btn variant="ghost" onClick={history.retryLoad} style={{ marginLeft: '8px' }}>Try again</Btn></>);
  if (bank.status === 'loading' || !history.attempts) return centered('Loading questions…');
  if (bank.questions.length === 0) return centered(<><div style={{ fontSize: '28px', marginBottom: '10px' }}>📝</div>No reviewed questions for {subject.shortName} yet. New questions appear here as soon as they've been checked.</>);

  const topic = question && topicById.get(question.topic);
  const choiceStyle = (i) => {
    const isAnswer = i === question.answer;
    const isChosen = i === chosenIndex;
    let border = C.border, background = C.white, color = C.text;
    if (!submitted && isChosen) { border = subject.color; background = `${subject.color}10`; }
    if (submitted && isAnswer) { border = CORRECT_BORDER; background = CORRECT_BG; color = CORRECT_GREEN; }
    if (submitted && isChosen && !isAnswer) { border = C.redMid; background = C.redLight; color = C.red; }
    if (submitted && !isAnswer && !isChosen) color = C.muted;
    return { width: '100%', textAlign: 'left', display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 14px', borderRadius: '12px', border: `1.5px solid ${border}`, background, color, cursor: submitted ? 'default' : 'pointer', fontFamily: 'inherit', fontSize: '13px', lineHeight: 1.6, transition: 'all 0.15s ease' };
  };
  const looksLikeCode = (text) => /[;(){}[\]=<>]/.test(text) && !/\s{2,}/.test(text) && text.length < 80;
  const wasCorrect = submitted && chosenIndex === question.answer;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: C.bg }}>
      {header}
      <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '14px' : '26px 34px' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '14px', flexWrap: 'wrap' }}>
              {[{ id: SMART, name: 'Smart' }, { id: ALL_UNITS, name: 'Mixed' }, ...unitsWithQuestions].map(u => (
                <button key={u.id} onClick={() => setScope(u.id)} style={{ background: scope === u.id ? `${subject.color}12` : 'transparent', border: `1px solid ${scope === u.id ? subject.color : C.border}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', fontWeight: scope === u.id ? 700 : 500, color: scope === u.id ? subject.color : C.muted }}>
                  {u.id === SMART ? '✨ Smart' : u.id === ALL_UNITS ? 'Mixed' : `${u.id.toUpperCase()}: ${u.name}`}
                </button>
              ))}
            </div>

            {question && (
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '16px', padding: isMobile ? '18px' : '24px 26px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted }}>{topic?.name ?? question.topic}</span>
                  <span style={{ fontSize: '10px', color: C.muted }}>· {DIFFICULTY_LABELS[question.difficulty]}</span>
                  {!question.reviewed && <span title="Only visible in local development until reviewed" style={{ fontSize: '10px', fontWeight: 700, color: '#9A3412', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '99px', padding: '1px 8px' }}>DRAFT · {question.id}</span>}
                </div>
                {reason && (
                  <div style={{ fontSize: '11px', color: C.text2, background: C.bg2, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '6px 10px', margin: '-4px 0 14px' }}>
                    <b>Why this question:</b> {reason.topic.name} is about {Math.round(reason.weight * 100)}% of the exam
                    {reason.attempts === 0 ? " and you haven't practiced it yet." : ` and you're at about ${Math.round(reason.chance * 100)}% on it.`}
                  </div>
                )}
                <div style={{ fontSize: '14px', fontWeight: 600, color: C.text, lineHeight: 1.6, marginBottom: question.code ? '12px' : '18px' }}>{question.prompt}</div>
                {question.code && (
                  <pre style={{ margin: '0 0 18px', padding: '14px 16px', background: C.bg2, border: `1px solid ${C.border}`, borderRadius: '10px', fontFamily: MONO_FONT, fontSize: '13px', lineHeight: 1.6, color: C.text, overflowX: 'auto', whiteSpace: 'pre' }}>{question.code}</pre>
                )}
                <div role="radiogroup" aria-label="Answer choices" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {question.choices.map((choice, i) => (
                    <button key={i} role="radio" aria-checked={chosenIndex === i} disabled={submitted} onClick={() => setChosenIndex(i)} style={choiceStyle(i)}>
                      <span style={{ fontWeight: 700, minWidth: '16px' }}>{CHOICE_LETTERS[i]}</span>
                      <span style={{ fontFamily: looksLikeCode(choice) ? MONO_FONT : 'inherit', wordBreak: 'break-word' }}>{choice}</span>
                    </button>
                  ))}
                </div>

                {submitted && (
                  <div style={{ marginTop: '16px', padding: '14px 16px', borderRadius: '12px', background: wasCorrect ? CORRECT_BG : C.redLight, border: `1px solid ${wasCorrect ? CORRECT_BORDER : C.redMid}` }}>
                    <div style={{ fontWeight: 700, fontSize: '13px', color: wasCorrect ? CORRECT_GREEN : C.red, marginBottom: '4px' }}>
                      {wasCorrect ? '✓ Correct' : `✗ Not quite. The answer is ${CHOICE_LETTERS[question.answer]}.`}
                    </div>
                    <div style={{ fontSize: '13px', color: C.text2, lineHeight: 1.7 }}>{question.explanation}</div>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', gap: '10px' }}>
                  <span style={{ fontSize: '10px', color: C.muted }}>{isMobile ? '' : 'Keys: 1-4 or A-D to choose, Enter to continue'}</span>
                  {submitted
                    ? <Btn onClick={next}>Next question →</Btn>
                    : <Btn onClick={submit} disabled={chosenIndex === null} style={{ opacity: chosenIndex === null ? 0.5 : 1 }}>Check answer</Btn>}
                </div>
              </div>
            )}
          </div>

          <div style={{ width: isMobile ? '100%' : '290px', flexShrink: 0, background: C.white, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '16px 18px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted, marginBottom: '6px' }}>Mastery</div>
            <MasteryRow name={`Overall ${subject.shortName}`} stats={history.mastery.overall.attempts > 0 ? history.mastery.overall : null} />
            {topicsInScope.map(t => <MasteryRow key={t.id} name={t.name} stats={history.mastery.topics[t.id]} />)}
            <div style={{ fontSize: '10px', color: C.muted, lineHeight: 1.6, marginTop: '10px' }}>
              Ratings update after every answer. Harder questions count for more. A level appears after {MIN_ATTEMPTS_FOR_LEVEL} answers on a topic.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
