import { useState } from 'react'
import { SUBJECTS } from './data/subjects'
import { adaptPlanToWindow, withOriginalTaskRefs } from './utils/planEngine'
import { useUserData } from './hooks/useUserData'
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

const DEFAULT_SUBJECT_ID = 'csa'

export default function App() {
  const [screen, setScreen] = useState('home');
  const [activeSubjectId, setActiveSubjectId] = useState(DEFAULT_SUBJECT_ID);
  const [adjustingPlan, setAdjustingPlan] = useState(false);

  const data = useUserData({
    onSignedIn: hasPickedSubjects => setScreen(hasPickedSubjects ? 'home' : 'picker'),
    onSignedOut: () => setScreen('home'),
  });

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

    const mySubjects = data.selectedIds && data.selectedIds.length > 0 ? SUBJECTS.filter(s => data.selectedIds.includes(s.id)) : SUBJECTS;
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
