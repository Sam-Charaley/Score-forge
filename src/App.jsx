import { useState, lazy, Suspense } from 'react'
import { SUBJECT_INDEX } from './data/subjectIndex'
import { adaptPlanToWindow, withOriginalTaskRefs } from './utils/planEngine'
import { useUserData } from './hooks/useUserData'
import { useSubjectContent } from './hooks/useSubjectContent'
import LoadingScreen from './components/LoadingScreen'
import LoadErrorScreen from './components/LoadErrorScreen'
import SaveErrorBanner from './components/SaveErrorBanner'
import AppShell from './components/AppShell'
import FeedbackDialog from './components/FeedbackDialog'
import AuthPage from './screens/AuthPage'
import SubjectPicker from './screens/SubjectPicker'
import HomePage from './screens/HomePage'
import StudyPage from './screens/StudyPage'
import FlashcardMode from './screens/FlashcardMode'
import LibraryMode from './screens/LibraryMode'
import AccountPage from './screens/AccountPage'
import AdjustPlanPage from './screens/AdjustPlanPage'
import PracticePage from './screens/PracticePage'
import ProgressPage from './screens/ProgressPage'
import { hasQuestionBank } from './data/questions/questionLoader'
import { hasFormulaSheet } from './data/formulaLoader'
import { formulaScope } from './utils/formulaLinks'
import { DRILL_SCOPE } from './utils/formulaDrill'
import ScreenErrorBoundary from './components/ScreenErrorBoundary'

// KaTeX is large, so the Formulas screen and its math renderer load only when opened.
const FormulasPage = lazy(() => import('./screens/FormulasPage'))

const DEFAULT_SUBJECT_ID = 'csa'
const KNOWN_SUBJECT_IDS = SUBJECT_INDEX.map(meta => meta.id)
const PLANS = 'plans'

// The subjects whose content the current screen needs. Nothing loads before
// sign-in or on the picker, which only needs the index.
function subjectIdsToLoad(data, screen) {
  if (!data.user || data.loadError || screen === 'picker') return [];
  const selected = (data.selectedIds ?? []).filter(id => KNOWN_SUBJECT_IDS.includes(id));
  return selected.length > 0 ? selected : KNOWN_SUBJECT_IDS;
}

export default function App() {
  const [screen, setScreen] = useState('home');
  const [activeSubjectId, setActiveSubjectId] = useState(DEFAULT_SUBJECT_ID);
  const [adjustingPlan, setAdjustingPlan] = useState(false);
  // A scope Practice should open in once (Progress's "Retry missed").
  const [practiceStartScope, setPracticeStartScope] = useState(null);
  const [practiceStartMode, setPracticeStartMode] = useState(null);
  // What the feedback form is about while it is open; null when closed.
  const [feedbackRequest, setFeedbackRequest] = useState(null);

  const data = useUserData({
    onSignedIn: hasPickedSubjects => setScreen(hasPickedSubjects ? 'home' : 'picker'),
    onSignedOut: () => { setScreen('home'); setAdjustingPlan(false); },
  });
  const content = useSubjectContent(subjectIdsToLoad(data, screen));

  const renderScreen = () => {
    if (data.loading) return <LoadingScreen />;
    if (!data.user) return <AuthPage onAuth={data.signInWith} />;
    if (data.loadError) return <LoadErrorScreen message={data.loadError} onRetry={data.retryLoad} onSignOut={data.signOut} />;

    const handlePickerSave = async (ids, newPlanSettings) => {
      const saved = await data.saveSubjects(ids, newPlanSettings);
      if (!saved) return;
      if (!ids.includes(activeSubjectId)) setActiveSubjectId(ids[0]);
      setScreen('home');
    };

    if (screen === 'picker') {
      const isEditing = (data.selectedIds ?? []).length > 0;
      return (
        <SubjectPicker
          initial={data.selectedIds}
          existingPlans={data.planSettings}
          onSave={handlePickerSave}
          onCancel={isEditing ? () => setScreen('home') : null}
        />
      );
    }

    if (content.error) {
      return <LoadErrorScreen message={`${content.error.message} ScoreForge may have just been updated.`} onRetry={() => window.location.reload()} onSignOut={data.signOut} />;
    }
    if (!content.subjects) return <LoadingScreen />;

    const mySubjects = content.subjects;
    const subject = mySubjects.find(s => s.id === activeSubjectId) || mySubjects[0];
    // Practice covers subjects with a question bank or a formula sheet (the
    // latter get only the formula drill); Progress needs a question bank.
    const canPractice = s => hasQuestionBank(s.id) || hasFormulaSheet(s.id);
    const practiceSubjects = mySubjects.filter(canPractice);
    const practiceSubject = canPractice(subject) ? subject : practiceSubjects[0];
    const progressSubjects = mySubjects.filter(s => hasQuestionBank(s.id));
    const progressSubject = hasQuestionBank(subject.id) ? subject : progressSubjects[0];
    const subjectPlan = data.planSettings[subject.id];
    const planDays = subjectPlan?.durationDays || null;
    const planStart = subjectPlan?.startDate || null;
    const adaptedWeeks = planDays ? adaptPlanToWindow(subject, planDays, planStart) : withOriginalTaskRefs(subject.weeks);

    const navigate = (dest, subjectId, { practiceScope = null, practiceMode = null } = {}) => {
      setAdjustingPlan(dest === PLANS);
      if (dest === PLANS) return;
      setPracticeStartScope(dest === 'practice' ? practiceScope : null);
      setPracticeStartMode(dest === 'practice' ? practiceMode : null);
      if (subjectId) setActiveSubjectId(subjectId);
      else if (dest === 'practice' && practiceSubject) setActiveSubjectId(practiceSubject.id);
      else if (dest === 'progress' && progressSubject) setActiveSubjectId(progressSubject.id);
      setScreen(dest);
      window.scrollTo(0, 0);
    };
    const openPlanEditor = () => navigate(PLANS);
    const toggleTask = taskRef => data.toggleTask(subject.id, taskRef);

    const page = () => {
      if (adjustingPlan) {
        return (
          <AdjustPlanPage
            mySubjects={mySubjects}
            planSettings={data.planSettings}
            onSavePlanSetting={data.savePlanSetting}
            onClose={() => setAdjustingPlan(false)}
          />
        );
      }
      if (screen === 'home') {
        return (
          <HomePage
            user={data.user}
            username={data.username}
            checked={data.checked}
            mySubjects={mySubjects}
            planSettings={data.planSettings}
            onNavigate={navigate}
            onToggleTask={data.toggleTask}
            onEditSubjects={() => setScreen('picker')}
            onAdjustPlan={openPlanEditor}
          />
        );
      }
      if (screen === 'account') {
        return <AccountPage user={data.user} username={data.username} onLogout={data.signOut} onProgressReset={data.resetProgress} onEditSubjects={() => setScreen('picker')} />;
      }
      if (screen === 'practice' && practiceSubject) {
        return (
          <PracticePage
            key={practiceSubject.id}
            user={data.user}
            subject={practiceSubject}
            practiceSubjects={practiceSubjects}
            initialScope={practiceStartScope ?? undefined}
            initialMode={practiceStartMode ?? undefined}
            onScopeUsed={() => { setPracticeStartScope(null); setPracticeStartMode(null); }}
            onReport={question => setFeedbackRequest({ screen: 'practice', itemId: question.id, itemLabel: `question ${question.id}` })}
            onSubject={setActiveSubjectId}
            onSaveError={data.reportSaveError}
          />
        );
      }
      if (screen === 'progress' && progressSubject) {
        return (
          <ProgressPage
            key={progressSubject.id}
            user={data.user}
            subject={progressSubject}
            practiceSubjects={progressSubjects}
            onSubject={setActiveSubjectId}
            onPractice={(options) => navigate('practice', progressSubject.id, options)}
          />
        );
      }
      if (screen === 'library') return <LibraryMode mySubjectIds={mySubjects.map(s => s.id)} />;
      if (screen === 'formulas') {
        return (
          <ScreenErrorBoundary>
            <Suspense fallback={<div className="page"><div className="card formula-loading" role="status">Loading formulas</div></div>}>
              <FormulasPage
                mySubjectIds={mySubjects.map(s => s.id)}
                initialSubjectId={subject.id}
                practiceSubjectIds={practiceSubjects.map(s => s.id)}
                onPracticeFormula={(subjectId, formulaId) => navigate('practice', subjectId, { practiceScope: formulaScope(formulaId) })}
                onDrill={subjectId => navigate('practice', subjectId, { practiceScope: DRILL_SCOPE })}
              />
            </Suspense>
          </ScreenErrorBoundary>
        );
      }
      if (screen === 'flashcards') return <FlashcardMode key={subject.id} subject={subject} mySubjects={mySubjects} onSubject={setActiveSubjectId} />;

      return (
        <StudyPage
          key={subject.id}
          user={data.user}
          subject={subject}
          adaptedWeeks={adaptedWeeks}
          checked={data.checked}
          toggleTask={toggleTask}
          onSaveNote={data.saveNote}
          planDays={planDays}
          planStart={planStart}
          onAdjustPlan={openPlanEditor}
          onPractice={hasQuestionBank(subject.id) ? () => navigate('practice', subject.id) : null}
          onFlashcards={() => navigate('flashcards', subject.id)}
          onSubject={setActiveSubjectId}
          mySubjects={mySubjects}
        />
      );
    };

    const noSubjectFor = (screen === 'practice' && !practiceSubject) || (screen === 'progress' && !progressSubject);
    const activeNav = adjustingPlan ? PLANS : (noSubjectFor ? 'study' : screen);
    return (
      <AppShell
        active={activeNav}
        username={data.username || data.user.email}
        streakDays={data.streak?.count ?? 0}
        canPractice={practiceSubjects.length > 0}
        canSeeProgress={progressSubjects.length > 0}
        onNavigate={navigate}
        onFeedback={() => setFeedbackRequest({ screen: adjustingPlan ? PLANS : screen })}
      >
        {page()}
        <FeedbackDialog request={feedbackRequest} onClose={() => setFeedbackRequest(null)} />
      </AppShell>
    );
  };

  return (
    <>
      {renderScreen()}
      <SaveErrorBanner message={data.saveError} onDismiss={data.dismissSaveError} />
    </>
  );
}
