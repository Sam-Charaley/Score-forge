import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { Flag, PenLine, RotateCcw as RetryIcon, Sparkles, Shuffle, Check, X, RotateCcw, Target, CornerDownLeft, Calculator } from 'lucide-react'
import Button from '../components/ui/Button'
import ProgressBar from '../components/ui/ProgressBar'
import EmptyState from '../components/ui/EmptyState'
import SubjectSwitcher from '../components/SubjectSwitcher'
import { usePracticeHistory } from '../hooks/usePracticeHistory'
import { useQuestionBank } from '../hooks/useQuestionBank'
import { pickNextQuestion, createVisibleTimer, choiceDisplayOrder } from '../utils/practice'
import { pickSmartQuestion } from '../utils/priority'
import { masteryLevel, chanceOnMediumQuestion, MIN_ATTEMPTS_FOR_LEVEL } from '../utils/mastery'
import { missedQuestionIds, MISSED_SCOPE } from '../utils/progress'
import { hasModifier, isTypingTarget, mayTakeActivationKey } from '../utils/keyboard'
import Tabs, { TabPanel } from '../components/ui/Tabs'
import FrqPractice from '../components/FrqPractice'
import QuestionFigure from '../components/QuestionFigure'
import { hasFrqs } from '../data/frqs/frqLoader'

const CHOICE_LETTERS = ['A', 'B', 'C', 'D'];
const ALL_UNITS = 'all';
// Default scope: topic by priority, question at the target difficulty.
const SMART = 'smart';
// Questions whose latest answer was wrong; each leaves once answered right.
const MISSED = MISSED_SCOPE;
const DIFFICULTY_LABELS = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };
const MAX_DIFFICULTY = 3;
const MULTIPLE_CHOICE = 'mc';
const FREE_RESPONSE = 'frq';
const MODE_TABS = [{ id: MULTIPLE_CHOICE, label: 'Multiple choice', icon: Target }, { id: FREE_RESPONSE, label: 'Free response', icon: PenLine }];
// Enter only answers when focus is on the page or the question itself, so
// Enter on a scope chip or a nav link still does that control's job.
const SHORTCUT_TARGET_ATTR = 'data-practice-keys';

const percent = share => `${Math.round(share * 100)}%`;
const looksLikeCode = text => /[;(){}[\]=<>]/.test(text) && !/\s{2,}/.test(text) && text.length < 80;

function MasteryRow({ name, stats, isOverall = false }) {
  const level = masteryLevel(stats);
  const chance = stats ? chanceOnMediumQuestion(stats.rating) : null;
  const remaining = MIN_ATTEMPTS_FOR_LEVEL - (stats?.attempts ?? 0);
  return (
    <li className={`mastery-row${isOverall ? ' is-overall' : ''}`}>
      <div className="mastery-row-top">
        <span className="mastery-name">{name}</span>
        {level ? <span className={`mastery-level level-${level.id}`}>{level.label}</span> : <span className="mastery-pending">{remaining} more to rate</span>}
      </div>
      <ProgressBar share={level ? chance : 0} thin color={isOverall ? 'var(--graphite)' : 'var(--subject)'} label={`${name} mastery`} />
      <span className="mastery-detail">
        {stats ? `${stats.correct} of ${stats.attempts} correct` : 'Not practiced yet'}
        {level && `, about ${percent(chance)} on a medium question`}
      </span>
    </li>
  );
}

function DifficultyPips({ difficulty }) {
  return (
    <span className="difficulty" title={`${DIFFICULTY_LABELS[difficulty]} question`}>
      <span className="difficulty-pips" aria-hidden="true">
        {Array.from({ length: MAX_DIFFICULTY }, (_, i) => <i key={i} className={i < difficulty ? 'is-on' : undefined} />)}
      </span>
      {DIFFICULTY_LABELS[difficulty]}
    </span>
  );
}

function Choice({ index, text, chosen, submitted, isAnswer, isPrintedOutput, onChoose }) {
  // Choices that are whole code segments keep their line breaks and indentation.
  const isMultiline = text.includes('\n');
  const result = !submitted ? '' : isAnswer ? 'is-right' : chosen ? 'is-wrong' : 'is-faded';
  return (
    <button
      type="button" role="radio" aria-checked={chosen} disabled={submitted}
      className={['choice', chosen && 'is-picked', result].filter(Boolean).join(' ')} onClick={onChoose}
      {...{ [SHORTCUT_TARGET_ATTR]: '' }}
    >
      <span className="bubble" aria-hidden="true">{CHOICE_LETTERS[index]}</span>
      <span className={`choice-text${isMultiline ? ' is-multiline mono' : isPrintedOutput || looksLikeCode(text) ? ' mono' : ''}`}><span className="sr-only">{CHOICE_LETTERS[index]}. </span>{text}</span>
      {submitted && isAnswer && <span className="choice-mark"><Check aria-hidden="true" /><span className="sr-only">Correct answer</span></span>}
      {submitted && chosen && !isAnswer && <span className="choice-mark"><X aria-hidden="true" /><span className="sr-only">Your answer</span></span>}
    </button>
  );
}

export default function PracticePage({ user, subject, practiceSubjects = [], initialScope = SMART, initialMode = MULTIPLE_CHOICE, onSubject, onSaveError, onScopeUsed, onReport }) {
  const showModes = hasFrqs(subject.id);
  const [mode, setMode] = useState(showModes ? initialMode : MULTIPLE_CHOICE);
  const bank = useQuestionBank(subject.id);
  const history = usePracticeHistory({ userId: user.id, subjectId: subject.id, onSaveError });
  const [scope, setScope] = useState(initialScope);
  // The starting scope is a one-time request (from Progress); clear it once
  // used. Mount-only on purpose: later renders must not clear it again.
  useEffect(() => { onScopeUsed?.(); }, []);
  const [question, setQuestion] = useState(null);
  const [reason, setReason] = useState(null);
  // chosenIndex is always the authored index into question.choices;
  // displayOrder maps on-screen positions (A, B, C, D) to authored indexes.
  const [chosenIndex, setChosenIndex] = useState(null);
  const [displayOrder, setDisplayOrder] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [session, setSession] = useState({ answered: 0, correct: 0 });
  const timer = useRef(null);
  const sheetRef = useRef(null);

  const topicById = useMemo(() => new Map((bank.topics ?? []).map(t => [t.id, t])), [bank.topics]);
  const missedIds = useMemo(() => new Set(missedQuestionIds(history.attempts ?? [])), [history.attempts]);
  const pool = useMemo(() => {
    if (bank.status !== 'ready') return [];
    if (scope === MISSED) return bank.questions.filter(q => missedIds.has(q.id));
    return scope === ALL_UNITS || scope === SMART ? bank.questions : bank.questions.filter(q => topicById.get(q.topic)?.unit === scope);
  }, [bank, scope, topicById, missedIds]);
  const missedCount = bank.status === 'ready' ? bank.questions.filter(q => missedIds.has(q.id)).length : 0;
  const unitsWithQuestions = useMemo(() => (bank.units ?? []).filter(u => (bank.questions ?? []).some(q => topicById.get(q.topic)?.unit === u.id)), [bank, topicById]);
  const topicsInScope = useMemo(() => (bank.topics ?? []).filter(t => pool.some(q => q.topic === t.id)), [bank.topics, pool]);

  const showQuestion = useCallback((next, why = null) => {
    timer.current?.stop();
    timer.current = next ? createVisibleTimer() : null;
    setQuestion(next);
    setDisplayOrder(next ? choiceDisplayOrder(next) : []);
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
  const historyLoaded = history.attempts !== null;
  useEffect(() => {
    if (bank.status === 'ready' && historyLoaded) chooseNext();
    // chooseNext changes after every answer; only these events pick a fresh question.
  }, [bank.status, scope, historyLoaded]);

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

  const next = useCallback(() => {
    chooseNext(question?.id);
    // Keep the keyboard flow going: focus the fresh sheet, not a removed button.
    requestAnimationFrame(() => sheetRef.current?.focus({ preventScroll: true }));
  }, [chooseNext, question]);

  useEffect(() => {
    if (mode !== MULTIPLE_CHOICE) return undefined;
    const onKey = (e) => {
      if (hasModifier(e) || isTypingTarget(e.target)) return;
      if (!submitted && question) {
        const digit = ['1', '2', '3', '4'].indexOf(e.key);
        const index = digit >= 0 ? digit : CHOICE_LETTERS.indexOf(e.key.toUpperCase());
        if (index >= 0 && index < displayOrder.length) { e.preventDefault(); setChosenIndex(displayOrder[index]); return; }
      }
      if (e.key === 'Enter' && mayTakeActivationKey(e.target, `[${SHORTCUT_TARGET_ATTR}]`)) {
        e.preventDefault();
        if (submitted) next(); else submit();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode, submitted, question, displayOrder, submit, next]);

  const header = (
    <>
      <SubjectSwitcher subjects={practiceSubjects} activeId={subject.id} onSelect={onSubject} label="Practice subject" />
      <header className="page-head practice-head">
        <div>
          <h1>{subject.shortName} practice</h1>
          <p>{mode === FREE_RESPONSE
            ? 'Write the code, then score it yourself against the rubric, the way exam readers do.'
            : "Questions picked for where you'll gain the most. Ratings update after every answer."}</p>
        </div>
        {mode === MULTIPLE_CHOICE && session.answered > 0 && (
          <div className="session-score" aria-live="polite">
            <span className="label">This session</span>
            <span className="session-score-value"><b>{session.correct}</b> of {session.answered}</span>
          </div>
        )}
      </header>
      {showModes && <Tabs tabs={MODE_TABS} active={mode} onChange={setMode} idPrefix="practice-mode" label="Question type" className="practice-modes" />}
    </>
  );

  if (mode === FREE_RESPONSE) {
    return (
      <div className="page practice" style={{ '--subject': subject.color }}>
        {header}
        <TabPanel idPrefix="practice-mode" id={FREE_RESPONSE} className="practice-mode-panel">
          <FrqPractice user={user} subject={subject} onSaveError={onSaveError} onReport={onReport ? frq => onReport(frq) : null} />
        </TabPanel>
      </div>
    );
  }

  const statusPage = (body) => (
    <div className="page practice" style={{ '--subject': subject.color }}>
      {header}
      <div className="card">{body}</div>
    </div>
  );

  if (bank.status === 'error') return statusPage(<EmptyState icon={RotateCcw} title="Couldn't load the questions" action={<Button variant="secondary" onClick={() => window.location.reload()}>Reload</Button>}>{bank.message}</EmptyState>);
  if (history.loadError) return statusPage(<EmptyState icon={RotateCcw} title="Couldn't load your answers" action={<Button variant="secondary" onClick={history.retryLoad}>Try again</Button>}>{history.loadError}</EmptyState>);
  if (bank.status === 'loading' || !historyLoaded) return statusPage(<div className="practice-loading" role="status"><span className="practice-loading-bubble" />Loading questions</div>);
  if (bank.questions.length === 0) return statusPage(<EmptyState icon={Target} title="No questions yet">There are no reviewed questions for {subject.shortName} yet. They appear here as soon as they've been checked.</EmptyState>);

  const topic = question && topicById.get(question.topic);
  const wasCorrect = submitted && chosenIndex === question.answer;
  const scopes = [
    { id: SMART, label: 'Smart', icon: Sparkles },
    { id: ALL_UNITS, label: 'Mixed', icon: Shuffle },
    ...(missedCount > 0 || scope === MISSED ? [{ id: MISSED, label: `Missed (${missedCount})`, icon: RetryIcon }] : []),
    ...unitsWithQuestions.map(u => ({ id: u.id, label: `${u.id.toUpperCase()}: ${u.name}` })),
  ];

  return (
    <div className="page practice" style={{ '--subject': subject.color }}>
      {header}
      <TabPanel idPrefix="practice-mode" id={MULTIPLE_CHOICE} className="practice-mode-panel">
      <div className="practice-layout">
        <div className="practice-main">
          <div className="chips practice-scopes" role="group" aria-label="Question scope">
            {scopes.map(({ id, label, icon: Icon }) => (
              <button key={id} type="button" className="chip" aria-pressed={scope === id} onClick={() => setScope(id)}>
                {Icon && <Icon aria-hidden="true" />}{label}
              </button>
            ))}
          </div>

          {question ? (
            <section ref={sheetRef} className="sheet sheet-signature practice-sheet" tabIndex={-1} aria-label="Question" {...{ [SHORTCUT_TARGET_ATTR]: '' }} key={question.id}>
              <div className="sheet-head">
                <span className="practice-topic">{topic?.name ?? question.topic}</span>
                <span className="practice-tags">
                  {!question.reviewed && <span className="badge badge-pencil" title="Only visible in local development until reviewed">Draft {question.id}</span>}
                  {question.calculator && <span className="badge badge-outline" title="Use a graphing calculator, as in the calculator part of the exam"><Calculator aria-hidden="true" />Calculator</span>}
                  <DifficultyPips difficulty={question.difficulty} />
                </span>
              </div>
              <div className="sheet-body">
                {reason && (
                  <p className="why">
                    <Sparkles aria-hidden="true" />
                    <span><b>Why this one:</b> {reason.topic.name} is about {percent(reason.weight)} of the exam
                      {reason.attempts === 0 ? " and you haven't practiced it yet." : ` and you're at about ${percent(reason.chance)} on it.`}</span>
                  </p>
                )}
                <p className="prompt">{question.prompt}</p>
                <QuestionFigure figure={question.figure} />
                {question.setup && <pre className="code-block code-setup" aria-label="Code given for this question">{question.setup}</pre>}
                {question.code && <pre className="code-block">{question.code}</pre>}

                <div role="radiogroup" aria-label="Answer choices" className="choices">
                  {displayOrder.map((authored, position) => (
                    <Choice key={authored} index={position} text={question.choices[authored]} chosen={chosenIndex === authored} submitted={submitted} isAnswer={authored === question.answer} isPrintedOutput={question.verify === 'output'} onChoose={() => setChosenIndex(authored)} />
                  ))}
                </div>

                {submitted && (
                  <div className={`feedback ${wasCorrect ? 'is-right' : 'is-wrong'}`} role="status">
                    <b>{wasCorrect ? 'Correct.' : `Not quite. The answer is ${CHOICE_LETTERS[displayOrder.indexOf(question.answer)]}.`}</b>
                    <p>{question.explanation}</p>
                  </div>
                )}

                <div className="practice-actions">
                  {onReport && <button type="button" className="report-link" onClick={() => onReport(question)}><Flag aria-hidden="true" />Report a problem</button>}
                  <span className="key-hint" aria-hidden="true">
                    <kbd>1</kbd>-<kbd>4</kbd> to choose, <kbd><CornerDownLeft /></kbd> to {submitted ? 'continue' : 'check'}
                  </span>
                  {submitted
                    ? <Button onClick={next} {...{ [SHORTCUT_TARGET_ATTR]: '' }}>Next question</Button>
                    : <Button onClick={submit} disabled={chosenIndex === null} {...{ [SHORTCUT_TARGET_ATTR]: '' }}>Check answer</Button>}
                </div>
              </div>
            </section>
          ) : (
            <div className="card">
              {scope === MISSED
                ? <EmptyState icon={RetryIcon} title="Nothing left to fix" action={<Button variant="secondary" icon={Sparkles} onClick={() => setScope(SMART)}>Back to Smart practice</Button>}>Every question you missed has since been answered right.</EmptyState>
                : <EmptyState icon={Target} title="Nothing to practice here">No questions match this scope yet. Try Smart or Mixed.</EmptyState>}
            </div>
          )}
        </div>

        <aside className="card mastery-panel" aria-labelledby="mastery-title">
          <h2 id="mastery-title">Mastery</h2>
          <ul className="mastery-list">
            <MasteryRow name={`Overall ${subject.shortName}`} stats={history.mastery.overall.attempts > 0 ? history.mastery.overall : null} isOverall />
            {topicsInScope.map(t => <MasteryRow key={t.id} name={t.name} stats={history.mastery.topics[t.id]} />)}
          </ul>
          <p className="mastery-note">Harder questions count for more. A level appears after {MIN_ATTEMPTS_FOR_LEVEL} answers on a topic.</p>
        </aside>
      </div>
      </TabPanel>
    </div>
  );
}
