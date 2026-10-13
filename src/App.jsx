import { useState } from 'react'
import { SUBJECTS } from './data/subjects'
import { adaptPlanToWindow, withOriginalTaskRefs } from './utils/planEngine'
import { useUserData } from './hooks/useUserData'
import LoadingScreen from './components/LoadingScreen'
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

  if (data.loading) return <LoadingScreen />;
  if (!data.user) return <AuthPage onAuth={data.signInWith} />;

  const handlePickerSave = async (ids, newPlanSettings) => {
    await data.saveSubjects(ids, newPlanSettings);
    if (!ids.includes(activeSubjectId)) setActiveSubjectId(ids[0]);
    setScreen('home');
  };

  if (screen === 'picker') return <SubjectPicker initial={data.selectedIds} onSave={handlePickerSave} />;

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
  if (screen === 'account') return <AccountPage user={data.user} onBack={() => setScreen('home')} onLogout={data.signOut} onProgressReset={data.resetProgress} />;
  if (screen === 'library') return <LibraryMode onBack={() => setScreen('study')} />;
  if (screen === 'flashcards') return <FlashcardMode subject={subject} mySubjects={mySubjects} onBack={() => setScreen('study')} onSubject={setActiveSubjectId} />;

  return (
    <StudyPage
      user={data.user}
      subject={subject}
      adaptedWeeks={adaptedWeeks}
      checked={data.checked}
      toggleTask={toggleTask}
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
}
