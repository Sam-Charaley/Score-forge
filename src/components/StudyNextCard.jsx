import { useMemo, useEffect } from 'react'
import { Lock, Check, Sparkles } from 'lucide-react'
import Button from './ui/Button'
import ProgressBar from './ui/ProgressBar'
import SubjectMark from './ui/SubjectMark'
import { useQuestionBank } from '../hooks/useQuestionBank'
import { usePracticeHistory } from '../hooks/usePracticeHistory'
import { useFrqScores } from '../hooks/useFrqScores'
import { hasFrqs } from '../data/frqs/frqLoader'
import { rankTopics, predictApScore } from '../utils/priority'
import { predictionBasis, reviewNote } from '../utils/progress'

const TOP_TOPICS_SHOWN = 3;
const percent = share => `${Math.round(share * 100)}%`;
const ignoreSaveErrors = () => {};  // this card only reads history

function Requirement({ met, children }) {
  return (
    <li className={met ? 'is-met' : undefined}>
      <span className="requirement-mark" aria-hidden="true">{met && <Check />}</span>
      <span>{children}</span>
      <span className="sr-only">{met ? '(done)' : '(not yet)'}</span>
    </li>
  );
}

function PredictionPanel({ prediction, frqLoadFailed }) {
  // A subject without an exam model has no scale to show a score on.
  if (prediction.unavailable) return null;
  if (prediction.ready) {
    const range = prediction.lowScore === prediction.highScore ? `${prediction.likelyScore}` : `${prediction.lowScore} to ${prediction.highScore}`;
    return (
      <div className="prediction" data-prediction="ready">
        <span className="label">Predicted AP score</span>
        <span className="prediction-score" aria-label={`Predicted score ${prediction.likelyScore}`}>{prediction.likelyScore}</span>
        <span className="prediction-note">Likely range {range}. {predictionBasis(prediction, { frqLoadFailed })}</span>
      </div>
    );
  }
  return (
    <div className="prediction is-locked" data-prediction="locked">
      <span className="label"><Lock aria-hidden="true" />Predicted AP score</span>
      <ul className="requirements">
        <Requirement met={prediction.coverage >= prediction.needCoverage}>
          Practice {percent(prediction.needCoverage)} of the exam <span className="muted">(now {percent(prediction.coverage)})</span>
        </Requirement>
        <Requirement met={prediction.attempts >= prediction.needAttempts}>
          Answer {prediction.needAttempts} questions <span className="muted">(now {prediction.attempts})</span>
        </Requirement>
      </ul>
    </div>
  );
}

// "What to study next" for one subject with a question bank: the highest
// priority topics (exam weight x chance of missing) and the score estimate.
// onTopTopic(subjectId, row | null), optional: must be stable (useCallback),
// or the report effect re-runs every render.
export default function StudyNextCard({ user, subject, onPractice, onTopTopic }) {
  const bank = useQuestionBank(subject.id);
  const history = usePracticeHistory({ userId: user.id, subjectId: subject.id, onSaveError: ignoreSaveErrors });
  const frq = useFrqScores(user.id, subject.id, { enabled: hasFrqs(subject.id) });

  const insight = useMemo(() => {
    // Wait for FRQ scores too, so the predicted score doesn't jump once they arrive.
    if (bank.status !== 'ready' || !history.attempts || bank.questions.length === 0 || frq.status === 'loading') return null;
    const input = { units: bank.units, topics: bank.topics, questions: bank.questions, mastery: history.mastery };
    return {
      ranked: rankTopics(input).slice(0, TOP_TOPICS_SHOWN),
      prediction: predictApScore({ ...input, exam: bank.exam, frqAttempts: frq.attempts }),
    };
  }, [bank, history.attempts, history.mastery, frq.status, frq.attempts]);

  // Report this subject's top topic to Home's cross-subject pick. Keyed on the
  // topic and its priority, not the row object, so a re-render with the same
  // ranking reports nothing. Unmounting withdraws the report.
  const top = insight?.ranked[0] ?? null;
  useEffect(() => {
    if (!onTopTopic) return undefined;
    onTopTopic(subject.id, top);
    return () => onTopTopic(subject.id, null);
  }, [onTopTopic, subject.id, top?.topic.id, top?.priority]);

  // Nothing useful to say until the bank and history are in (or if there are no reviewed questions).
  if (!insight) return null;
  const topPriority = insight.ranked[0]?.priority || 1;

  return (
    <section className="card study-next" data-study-next={subject.id} style={{ '--subject': subject.color }} aria-labelledby={`study-next-${subject.id}`}>
      <div className="study-next-main">
        <div className="study-next-head">
          <SubjectMark subject={subject} size="small" />
          <div>
            <h2 id={`study-next-${subject.id}`}>Study next in {subject.shortName}</h2>
            <p>Ranked by how much of the exam a topic covers and how likely you are to miss it.</p>
          </div>
        </div>
        <ol className="rank-list">
          {insight.ranked.map((r, i) => (
            <li key={r.topic.id} data-study-next-topic={r.topic.id}>
              <span className="rank-pos" aria-hidden="true">{i + 1}</span>
              <span className="rank-name">{r.topic.name}</span>
              <span className="rank-meta">
                about {percent(r.weight)} of the exam, {r.attempts === 0 ? 'not practiced yet' : `you're at ${percent(r.chance)}`}
                {r.dueForReview && `, ${reviewNote(r.daysSince)}`}
              </span>
              <ProgressBar share={r.priority / topPriority} color={i === 0 ? 'var(--red-pen)' : undefined} thin className="rank-bar" label={`${r.topic.name} priority`} />
            </li>
          ))}
        </ol>
        <Button variant="secondary" icon={Sparkles} onClick={onPractice}>Smart practice</Button>
      </div>
      <PredictionPanel prediction={insight.prediction} frqLoadFailed={frq.status === 'error'} />
    </section>
  );
}
