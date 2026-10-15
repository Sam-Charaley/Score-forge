import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { ArrowLeft, ClipboardCheck, Check, Flag, PenLine, RotateCcw, Save } from 'lucide-react'
import Button from './ui/Button'
import EmptyState from './ui/EmptyState'
import CheckBubble from './ui/CheckBubble'
import { useFrqSet } from '../hooks/useFrqSet'
import { frqScores } from '../utils/progress'
import { pointsPossible } from '../data/frqs/frqLoader'
import { createVisibleTimer } from '../utils/practice'

const TAB_SPACES = '    ';

// A code box where Tab indents instead of leaving the field, as in an editor.
// Shift+Tab or Escape then Tab still moves focus on, so keyboard users aren't trapped.
function CodeAnswer({ id, value, onChange, disabled, label }) {
  const escaped = useRef(false);
  const boxRef = useRef(null);
  // Where the caret belongs after an inserted indent. Set before React writes
  // the new value and applied right after, before the next keystroke lands.
  const pendingCaret = useRef(null);
  useLayoutEffect(() => {
    if (pendingCaret.current === null || !boxRef.current) return;
    boxRef.current.selectionStart = boxRef.current.selectionEnd = pendingCaret.current;
    pendingCaret.current = null;
  }, [value]);
  const onKeyDown = e => {
    if (e.key === 'Escape') { escaped.current = true; return; }
    if (e.key !== 'Tab' || e.shiftKey || escaped.current) { escaped.current = false; return; }
    e.preventDefault();
    const el = e.currentTarget;
    const { selectionStart: start, selectionEnd: end } = el;
    pendingCaret.current = start + TAB_SPACES.length;
    onChange(value.slice(0, start) + TAB_SPACES + value.slice(end));
  };
  return (
    <textarea
      ref={boxRef} id={id} className="input code-answer mono" value={value} disabled={disabled} aria-label={label}
      spellCheck={false} autoCapitalize="off" autoComplete="off" autoCorrect="off"
      onChange={e => onChange(e.target.value)} onKeyDown={onKeyDown}
      placeholder="Write your code here. Tab indents; press Escape then Tab to leave the box."
    />
  );
}

function scoreLabel(entry) {
  if (!entry) return null;
  return `Best ${entry.best.points_earned}/${entry.best.points_possible}`;
}

function FrqList({ frqs, types, scores, onOpen }) {
  const typeIds = Object.keys(types).filter(type => frqs.some(f => f.type === type));
  return (
    <div className="frq-groups">
      {typeIds.map(type => (
        <section key={type} aria-labelledby={`frq-type-${type}`}>
          <h2 id={`frq-type-${type}`} className="frq-type-title">{types[type]}</h2>
          <ul className="frq-list">
            {frqs.filter(f => f.type === type).map(frq => {
              const entry = scores.get(frq.id);
              return (
                <li key={frq.id} className="card card-link frq-card-item">
                  <div>
                    <h3><button type="button" className="card-link-target" onClick={() => onOpen(frq.id)}>{frq.title}</button></h3>
                    <p>{frq.parts.length > 1 ? `${frq.parts.length} parts, ` : ''}{pointsPossible(frq)} points</p>
                  </div>
                  <div className="frq-card-side">
                    {!frq.reviewed && <span className="badge badge-pencil">Draft</span>}
                    {entry ? <span className="badge badge-dark">{scoreLabel(entry)}</span> : <span className="badge badge-outline">Not tried</span>}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

function RubricPart({ part, earned, onToggle, locked }) {
  return (
    <div className="rubric">
      <span className="label">Rubric for part ({part.id}): tick each point your answer earns</span>
      <ul className="rubric-points">
        {part.points.map(point => {
          const checked = earned.has(point.id);
          return (
            <li key={point.id}>
              <button type="button" role="checkbox" aria-checked={checked} disabled={locked} className={`task rubric-point${checked ? ' is-done' : ''}`} onClick={() => onToggle(point.id)}>
                <CheckBubble checked={checked} />
                <span className="task-text">{point.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function FrqWorkspace({ frq, typeName, onBack, onSave, onReport }) {
  const [responses, setResponses] = useState(() => Object.fromEntries(frq.parts.map(p => [p.id, ''])));
  const [checking, setChecking] = useState(false);
  const [earned, setEarned] = useState(() => new Set());
  const [saveState, setSaveState] = useState('idle');
  const timer = useRef(null);
  const total = pointsPossible(frq);

  useEffect(() => {
    timer.current = createVisibleTimer();
    return () => timer.current?.stop();
  }, []);

  const written = Object.values(responses).some(text => text.trim().length > 0);
  const toggle = pointId => setEarned(prev => {
    const next = new Set(prev);
    if (next.has(pointId)) next.delete(pointId); else next.add(pointId);
    return next;
  });
  const startChecking = () => { timer.current?.stop(); setChecking(true); };
  const save = async () => {
    setSaveState('saving');
    const ok = await onSave({ frqId: frq.id, earnedPointIds: [...earned], pointsPossible: total, responses, timeMs: timer.current?.elapsedMs() ?? 0 });
    setSaveState(ok ? 'saved' : 'idle');
  };

  return (
    <div className="frq-workspace">
      <button type="button" className="back-link" onClick={onBack}><ArrowLeft aria-hidden="true" />All free-response questions</button>
      <header className="frq-head">
        <p className="phase-kicker">{typeName}{!frq.reviewed && <span className="badge badge-pencil frq-draft">Draft {frq.id}</span>}</p>
        <h2>{frq.title}</h2>
        <p className="frq-intro">{frq.intro}</p>
      </header>
      <pre className="code-block">{frq.setup}</pre>

      {frq.parts.map(part => (
        <section key={part.id} className="card card-pad frq-part" aria-labelledby={`part-${part.id}`}>
          <h3 id={`part-${part.id}`}>Part ({part.id})</h3>
          <p className="frq-prompt">{part.prompt}</p>
          <code className="frq-header">{part.header}</code>
          <CodeAnswer id={`answer-${part.id}`} label={`Your answer to part (${part.id})`} value={responses[part.id]}
            disabled={checking} onChange={text => setResponses(prev => ({ ...prev, [part.id]: text }))} />
          {checking && (
            <>
              <div className="frq-solution">
                <span className="label">One correct solution (others can earn full points too)</span>
                <pre className="code-block">{part.solution}</pre>
              </div>
              <RubricPart part={part} earned={earned} onToggle={toggle} locked={saveState === 'saved'} />
            </>
          )}
        </section>
      ))}

      <div className="frq-actions">
        {onReport && <button type="button" className="report-link" onClick={() => onReport(frq)}><Flag aria-hidden="true" />Report a problem</button>}
        {!checking && <Button icon={ClipboardCheck} onClick={startChecking} disabled={!written}>{written ? 'Check against the rubric' : 'Write an answer first'}</Button>}
        {checking && saveState !== 'saved' && (
          <Button icon={Save} onClick={save} disabled={saveState === 'saving'}>
            {saveState === 'saving' ? 'Saving' : `Save score: ${earned.size} of ${total}`}
          </Button>
        )}
        {saveState === 'saved' && (
          <div className="frq-saved" role="status">
            <span className="badge badge-pass"><Check aria-hidden="true" />Saved {earned.size} of {total}</span>
            <Button variant="secondary" icon={RotateCcw} onClick={onBack}>Pick another</Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Free-response practice for one subject: pick an FRQ, write code, then
// score it yourself against the official-style rubric and a sample solution.
export default function FrqPractice({ user, subject, onSaveError, onReport }) {
  const set = useFrqSet({ userId: user.id, subjectId: subject.id, onSaveError });
  const [openId, setOpenId] = useState(null);

  if (set.status === 'error') {
    return <div className="card"><EmptyState icon={RotateCcw} title="Couldn't load free-response questions" action={<Button variant="secondary" onClick={set.retry}>Try again</Button>}>{set.message}</EmptyState></div>;
  }
  if (set.status === 'loading') return <div className="card practice-loading" role="status"><span className="practice-loading-bubble" />Loading free-response questions</div>;
  if (set.frqs.length === 0) return <div className="card"><EmptyState icon={PenLine} title="No free-response questions yet">Free-response practice for {subject.shortName} is on the way.</EmptyState></div>;

  const open = set.frqs.find(f => f.id === openId);
  if (open) {
    return (
      <FrqWorkspace
        key={open.id} frq={open} typeName={set.types[open.type]}
        onBack={() => { setOpenId(null); window.scrollTo(0, 0); }}
        onSave={set.record}
        onReport={onReport ? frq => onReport({ id: frq.id }) : null}
      />
    );
  }
  return <FrqList frqs={set.frqs} types={set.types} scores={frqScores(set.attempts)} onOpen={id => { setOpenId(id); window.scrollTo(0, 0); }} />;
}
