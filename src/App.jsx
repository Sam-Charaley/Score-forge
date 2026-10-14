import { useState } from 'react'
import { SUBJECT_INDEX } from './data/subjectIndex'
import { adaptPlanToWindow, withOriginalTaskRefs } from './utils/planEngine'
import { useUserData } from './hooks/useUserData'
import { useSubjectContent } from './hooks/useSubjectContent'
import LoadingScreen from './components/LoadingScreen'
import LoadErrorScreen from './components/LoadErrorScreen'
import SaveErrorBanner from './components/SaveErrorBanner'
import AuthPage from './screens/AuthPage'
import SubjectPicker from './screens/SubjectPicker'
import HomePage from './screens/HomePage'
import StudyPage from './screens/StudyPage'
import FlashcardMode from './screens/FlashcardMode'
import LibraryMode from './screens/LibraryMode'
import AccountPage from './screens/AccountPage'
import AdjustPlanPage from './screens/AdjustPlanPage'
import PracticePage from './screens/PracticePage'
import { hasQuestionBank } from './data/questions/questionLoader'

const DEFAULT_SUBJECT_ID = 'csa'
const KNOWN_SUBJECT_IDS = SUBJECT_INDEX.map(meta => meta.id)

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

  const data = useUserData({
    onSignedIn: hasPickedSubjects => setScreen(hasPickedSubjects ? 'home' : 'picker'),
    onSignedOut: () => setScreen('home'),
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

    if (screen === 'picker') return <SubjectPicker initial={data.selectedIds} existingPlans={data.planSettings} onSave={handlePickerSave} />;

    if (content.error) {
      return <LoadErrorScreen message={`${content.error.message} ScoreForge may have just been updated.`} onRetry={() => window.location.reload()} onSignOut={data.signOut} />;
    }
    if (!content.subjects) return <LoadingScreen />;

    const mySubjects = content.subjects;
    const subject = mySubjects.find(s => s.id === activeSubjectId) || mySubjects[0];
    const subjectPlan = data.planSettings[subject.id];
    const planDays = subjectPlan?.durationDays || null;
    const planStart = subjectPlan?.startDate || null;
    const adaptedWeeks = planDays ? adaptPlanToWindow(subject, planDays, planStart) : withOriginalTaskRefs(subject.weeks);

    const navigate = (dest, subjectId) => {
      if (subjectId) setActiveSubjectId(subjectId);
      setScreen(dest);
    };
    const openPlanEditor = () => setAdjustingPlan(true);
    const toggleTask = taskRef => data.toggleTask(subject.id, taskRef);

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
          streak={data.streak}
          onNavigate={navigate}
          onLogout={data.signOut}
          onEditSubjects={() => setScreen('picker')}
          onAdjustPlan={openPlanEditor}
        />
      );
    }
    if (screen === 'account') return <AccountPage user={data.user} username={data.username} onBack={() => setScreen('home')} onLogout={data.signOut} onProgressReset={data.resetProgress} />;
    if (screen === 'practice' && hasQuestionBank(subject.id)) return <PracticePage key={subject.id} user={data.user} subject={subject} onBack={() => setScreen('study')} onSaveError={data.reportSaveError} />;
    if (screen === 'library') return <LibraryMode onBack={() => setScreen('study')} />;
    if (screen === 'flashcards') return <FlashcardMode key={subject.id} subject={subject} mySubjects={mySubjects} onBack={() => setScreen('study')} onSubject={setActiveSubjectId} />;

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
        onBack={() => setScreen('home')}
        onPractice={hasQuestionBank(subject.id) ? () => setScreen('practice') : null}
        onFlashcards={() => setScreen('flashcards')}
        onLibrary={() => setScreen('library')}
        onSubject={setActiveSubjectId}
        mySubjects={mySubjects}
      />
    );
  };

  return (
    <>
      {renderScreen()}
      <SaveErrorBanner message={data.saveError} onDismiss={data.dismissSaveError} />
    </>
  );
}
