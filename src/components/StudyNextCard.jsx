import { useMemo } from 'react'
import { C } from '../theme'
import Btn from './Btn'
import { useQuestionBank } from '../hooks/useQuestionBank'
import { usePracticeHistory } from '../hooks/usePracticeHistory'
import { rankTopics, predictApScore } from '../utils/priority'

const TOP_TOPICS_SHOWN = 3;
const percent = share => `${Math.round(share * 100)}%`;
const ignoreSaveErrors = () => {};  // this card only reads history

function PredictionBox({ prediction, color }) {
  if (prediction.ready) {
    const range = prediction.lowScore === prediction.highScore ? `${prediction.likelyScore}` : `${prediction.lowScore}–${prediction.highScore}`;
    return (
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted }}>Predicted AP score</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: 700, color, lineHeight: 1.1 }}>{prediction.likelyScore}</div>
        <div style={{ fontSize: '10px', color: C.muted }}>likely range {range} · estimate from practice MCQs</div>
      </div>
    );
  }
  const coverageDone = prediction.coverage >= prediction.needCoverage;
  const answersDone = prediction.attempts >= prediction.needAttempts;
  return (
    <div style={{ textAlign: 'right', maxWidth: '220px' }}>
      <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted, marginBottom: '2px' }}>Predicted AP score 🔒</div>
      <div style={{ fontSize: '11px', color: C.text2, lineHeight: 1.5 }}>
        Unlocks with questions on {percent(prediction.needCoverage)} of the exam {coverageDone ? '✓' : `(now ${percent(prediction.coverage)})`}
        {' '}and {prediction.needAttempts} answers {answersDone ? '✓' : `(now ${prediction.attempts})`}.
      </div>
    </div>
  );
}

// "What to study next" for one subject with a question bank: the highest
// priority topics (exam weight x chance of missing) and the score estimate.
export default function StudyNextCard({ user, subject, onPractice }) {
  const bank = useQuestionBank(subject.id);
  const history = usePracticeHistory({ userId: user.id, subjectId: subject.id, onSaveError: ignoreSaveErrors });

  const insight = useMemo(() => {
    if (bank.status !== 'ready' || !history.attempts || bank.questions.length === 0) return null;
    const input = { units: bank.units, topics: bank.topics, questions: bank.questions, mastery: history.mastery };
    return { ranked: rankTopics(input).slice(0, TOP_TOPICS_SHOWN), prediction: predictApScore(input) };
  }, [bank, history.attempts, history.mastery]);

  // Nothing useful to say until the bank and history are in (or if there are no reviewed questions).
  if (!insight) return null;
  const topPriority = insight.ranked[0]?.priority || 1;

  return (
    <div data-study-next={subject.id} style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `4px solid ${subject.color}`, borderRadius: '16px', padding: '18px 22px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '12px' }}>
        <div>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted }}>🎯 Study next · {subject.shortName}</div>
          <div style={{ fontSize: '12px', color: C.muted, marginTop: '2px' }}>Ranked by exam weight × your chance of missing</div>
        </div>
        <PredictionBox prediction={insight.prediction} color={subject.color} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
        {insight.ranked.map((r, i) => (
          <div key={r.topic.id} data-study-next-topic={r.topic.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', fontSize: '12px', marginBottom: '3px' }}>
              <span style={{ color: C.text, fontWeight: 600 }}>{i + 1}. {r.topic.name}</span>
              <span style={{ color: C.muted, whiteSpace: 'nowrap' }}>
                ≈{percent(r.weight)} of exam · {r.attempts === 0 ? 'not practiced yet' : `you're at ${percent(r.chance)}`}
              </span>
            </div>
            <div style={{ height: '4px', background: C.bg3, borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${Math.round((r.priority / topPriority) * 100)}%`, background: subject.color, opacity: 0.75, borderRadius: '99px' }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Btn onClick={onPractice}>Smart practice →</Btn>
      </div>
    </div>
  );
}
