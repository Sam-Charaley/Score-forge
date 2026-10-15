import { useMemo } from 'react'
import { Target, RotateCcw, Lock, ChartLine, Sparkles, PenLine } from 'lucide-react'
import Button from '../components/ui/Button'
import ProgressBar from '../components/ui/ProgressBar'
import EmptyState from '../components/ui/EmptyState'
import SubjectSwitcher from '../components/SubjectSwitcher'
import LevelChart from '../components/LevelChart'
import { useQuestionBank } from '../hooks/useQuestionBank'
import { usePracticeHistory } from '../hooks/usePracticeHistory'
import { useFrqSet } from '../hooks/useFrqSet'
import { hasFrqs } from '../data/frqs/frqLoader'
import { dailyProgress, byDifficulty, topicMap, recentlyMissed, frqScores, MIN_DAYS_FOR_TREND, MIN_ANSWERS_FOR_RATE, MISSED_SCOPE } from '../utils/progress'
import { chanceOnMediumQuestion, MIN_ATTEMPTS_FOR_LEVEL } from '../utils/mastery'
import { predictApScore } from '../utils/priority'
import { parseLocalDate, fmtDate, toLocalIsoDate } from '../utils/planEngine'

const ignoreSaveErrors = () => {};  // this page only reads history
const percent = share => `${Math.round(share * 100)}%`;
const seconds = ms => `${Math.round(ms / 1000)}s`;
const LEVEL_BADGE = { 'needs-work': 'badge-red', developing: 'badge-pencil', proficient: 'badge-pass', strong: 'badge-pass' };
const PROMPT_PREVIEW_LENGTH = 90;

function firstCodeLine(question) {
  const line = (question.code ?? '').split('\n').find(l => l.trim());
  return line ? line.trim() : null;
}

function Stat({ label, value, detail }) {
  return (
    <div className="card stat-card">
      <span className="label">{label}</span>
      <span className="stat-value">{value}</span>
      {detail && <span className="stat-detail">{detail}</span>}
    </div>
  );
}

function PredictionStat({ prediction, history }) {
  if (!prediction.ready) {
    const remaining = Math.max(0, prediction.needAttempts - prediction.attempts);
    return <Stat label="Predicted AP score" value={<span className="stat-locked"><Lock aria-hidden="true" />Locked</span>}
      detail={remaining > 0 ? `${remaining} more answers to unlock` : `Practice ${percent(prediction.needCoverage)} of the exam to unlock`} />;
  }
  const firstScored = history.find(d => d.predictedScore !== null);
  const change = firstScored && firstScored.predictedScore !== prediction.likelyScore
    ? `${prediction.likelyScore > firstScored.predictedScore ? 'Up' : 'Down'} from ${firstScored.predictedScore} on ${fmtDate(parseLocalDate(firstScored.day))}`
    : `Likely range ${prediction.lowScore} to ${prediction.highScore}`;
  return <Stat label="Predicted AP score" value={prediction.likelyScore} detail={change} />;
}

function FrqSummary({ user, subject, onPractice }) {
  const set = useFrqSet({ userId: user.id, subjectId: subject.id, onSaveError: ignoreSaveErrors });
  if (set.status !== 'ready' || set.frqs.length === 0) return null;
  const scores = frqScores(set.attempts);
  const tried = set.frqs.filter(f => scores.has(f.id));
  return (
    <section className="card card-pad" aria-labelledby="frq-summary-title">
      <div className="section-title">
        <h2 id="frq-summary-title">Free response<span className="count">{tried.length} of {set.frqs.length} tried</span></h2>
        <Button size="small" variant="secondary" icon={PenLine} onClick={() => onPractice({ practiceMode: 'frq' })}>Practice free response</Button>
      </div>
      {tried.length === 0
        ? <p className="muted">Free-response questions are a third of the exam score. Try one, then score it against the rubric.</p>
        : (
          <ul className="frq-score-list">
            {tried.map(frq => {
              const { best, tries } = scores.get(frq.id);
              return (
                <li key={frq.id}>
                  <span className="frq-score-name">{frq.title}<span className="muted"> {set.types[frq.type]}</span></span>
                  <ProgressBar share={best.points_earned / best.points_possible} thin label={`${frq.title} best score`} />
                  <span className="frq-score-value">{best.points_earned}/{best.points_possible}{tries > 1 ? `, ${tries} tries` : ''}</span>
                </li>
              );
            })}
          </ul>
        )}
    </section>
  );
}

function TopicTile({ entry }) {
  const { topic, weight, questions, answered, correct, level, chance } = entry;
  let status;
  if (questions === 0) status = <span className="badge badge-outline">No questions yet</span>;
  else if (answered === 0) status = <span className="badge badge-red">Not practiced</span>;
  else if (!level) status = <span className="badge">{MIN_ATTEMPTS_FOR_LEVEL - answered} more to rate</span>;
  else status = <span className={`badge ${LEVEL_BADGE[level.id]}`}>{level.label}</span>;
  return (
    <li className={`topic-tile${questions === 0 ? ' is-empty' : ''}${questions > 0 && answered === 0 ? ' is-gap' : ''}`}>
      <div className="topic-tile-top">
        <span className="topic-tile-name">{topic.name}</span>
        {status}
      </div>
      <ProgressBar share={chance ?? 0} thin color="var(--subject)" label={`${topic.name} level`} />
      <span className="topic-tile-meta">
        about {percent(weight)} of the exam
        {answered > 0 && `, ${correct} of ${answered} right`}
      </span>
    </li>
  );
}

export default function ProgressPage({ user, subject, practiceSubjects, onSubject, onPractice }) {
  const bank = useQuestionBank(subject.id);
  const history = usePracticeHistory({ userId: user.id, subjectId: subject.id, onSaveError: ignoreSaveErrors });

  const report = useMemo(() => {
    if (bank.status !== 'ready' || !history.attempts) return null;
    const attempts = history.attempts;
    const bankInput = { units: bank.units, topics: bank.topics, questions: bank.questions };
    return {
      days: dailyProgress(attempts, bankInput),
      difficulty: byDifficulty(attempts),
      topics: topicMap({ ...bankInput, mastery: history.mastery }),
      missed: recentlyMissed(attempts, bank.questions),
      prediction: predictApScore({ ...bankInput, mastery: history.mastery }),
    };
  }, [bank, history.attempts, history.mastery]);

  const header = (
    <>
      <SubjectSwitcher subjects={practiceSubjects} activeId={subject.id} onSelect={onSubject} label="Progress subject" />
      <header className="page-head">
        <div>
          <h1>{subject.shortName} progress</h1>
          <p>Everything here comes from your practice answers.</p>
        </div>
        {history.attempts?.length > 0 && <Button icon={Sparkles} onClick={() => onPractice()}>Smart practice</Button>}
      </header>
    </>
  );

  let body;
  if (bank.status === 'error' || history.loadError) {
    body = <div className="card"><EmptyState icon={RotateCcw} title="Couldn't load your progress" action={<Button variant="secondary" onClick={history.loadError ? history.retryLoad : () => window.location.reload()}>Try again</Button>}>{history.loadError ?? bank.message}</EmptyState></div>;
  } else if (!report) {
    body = <div className="card practice-loading" role="status"><span className="practice-loading-bubble" />Loading your progress</div>;
  } else if (history.attempts.length === 0) {
    body = <div className="card"><EmptyState icon={ChartLine} title="No practice yet" action={<Button icon={Target} onClick={() => onPractice()}>Start practicing</Button>}>Answer a few questions and this page fills in: your level over time, every topic on the exam, and what to fix.</EmptyState></div>;
  } else {
    const { days, difficulty, topics, missed, prediction } = report;
    const attempts = history.attempts;
    const correct = attempts.filter(a => a.correct).length;
    const today = toLocalIsoDate(new Date());
    const answeredToday = days.find(d => d.day === today)?.answered ?? 0;
    body = (
      <div className="progress-page">
        <div className="progress-stats">
          <Stat label="Answers" value={attempts.length} detail={answeredToday > 0 ? `${answeredToday} today` : `over ${days.length} day${days.length === 1 ? '' : 's'}`} />
          <Stat label="Accuracy" value={percent(correct / attempts.length)} detail={`${correct} right`} />
          <Stat label="Your level" value={percent(chanceOnMediumQuestion(history.mastery.overall.rating))} detail="chance on a medium question" />
          <PredictionStat prediction={prediction} history={days} />
        </div>

        <section className="card card-pad" aria-labelledby="trend-title">
          <div className="section-title"><h2 id="trend-title">Your level over time</h2></div>
          {days.length >= MIN_DAYS_FOR_TREND
            ? <LevelChart days={days} />
            : <p className="muted">Practice on another day and your trend shows up here, one point per day.</p>}
        </section>

        <section aria-labelledby="topics-title">
          <div className="section-title"><h2 id="topics-title">Every topic on the exam</h2></div>
          <div className="unit-groups">
            {topics.map(({ unit, topics: entries }) => (
              <div key={unit.id} className="unit-group">
                <h3>{unit.name} <span className="muted">{unit.weight}</span></h3>
                <ul className="topic-tiles">{entries.map(entry => <TopicTile key={entry.topic.id} entry={entry} />)}</ul>
              </div>
            ))}
          </div>
        </section>

        {hasFrqs(subject.id) && <FrqSummary user={user} subject={subject} onPractice={onPractice} />}

        <div className="progress-columns">
          <section className="card card-pad" aria-labelledby="difficulty-title">
            <div className="section-title"><h2 id="difficulty-title">By difficulty</h2></div>
            <ul className="difficulty-rows">
              {difficulty.map(row => (
                <li key={row.level}>
                  <div className="difficulty-row-top">
                    <span className="difficulty-name">{row.name}</span>
                    <span className="muted">
                      {row.accuracy === null
                        ? (row.answered === 0 ? 'none yet' : `${MIN_ANSWERS_FOR_RATE - row.answered} more to show`)
                        : `${percent(row.accuracy)} right, about ${seconds(row.medianTimeMs)} each`}
                    </span>
                  </div>
                  <ProgressBar share={row.accuracy ?? 0} thin label={`${row.name} accuracy`} />
                </li>
              ))}
            </ul>
          </section>

          <section className="card card-pad" aria-labelledby="missed-title">
            <div className="section-title">
              <h2 id="missed-title">To fix<span className="count">{missed.total}</span></h2>
              {missed.total > 0 && <Button size="small" icon={RotateCcw} onClick={() => onPractice({ practiceScope: MISSED_SCOPE })}>Retry missed</Button>}
            </div>
            {missed.total === 0
              ? <p className="muted">Nothing to fix. Every question you've missed has since been answered right.</p>
              : (
                <ul className="missed-list">
                  {missed.shown.map(({ question, timesMissed }) => (
                    <li key={question.id}>
                      <span className="missed-prompt">{question.prompt.length > PROMPT_PREVIEW_LENGTH ? `${question.prompt.slice(0, PROMPT_PREVIEW_LENGTH)}…` : question.prompt}</span>
                      {firstCodeLine(question) && <code className="missed-code">{firstCodeLine(question)}</code>}
                      <span className="missed-meta">{bank.topics.find(t => t.id === question.topic)?.name}{timesMissed > 1 ? `, missed ${timesMissed} times` : ''}</span>
                    </li>
                  ))}
                </ul>
              )}
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="page progress-screen" style={{ '--subject': subject.color }}>
      {header}
      {body}
    </div>
  );
}
