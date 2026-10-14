import { useEffect, useRef } from 'react'
import { House, CalendarCheck, Target, Layers, LibraryBig, CalendarDays, Flame } from 'lucide-react'
import LogoMark from './LogoMark'

// The destinations in the main navigation, in order. Practice only shows
// when one of the student's subjects has a question bank.
export const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'study', label: 'Study plan', shortLabel: 'Plan', icon: CalendarCheck },
  { id: 'practice', label: 'Practice', icon: Target },
  { id: 'flashcards', label: 'Flashcards', shortLabel: 'Cards', icon: Layers },
  { id: 'library', label: 'Library', icon: LibraryBig },
];

function initialOf(name) {
  return (name || '?').trim().charAt(0).toUpperCase() || '?';
}

// Header, main navigation and the phone tab bar around every signed-in screen.
// active: the NAV_ITEMS id of the current screen, or null.
// onNavigate(id) is called with a NAV_ITEMS id, 'account' or 'plans'.
export default function AppShell({ active, username, streakDays, canPractice, onNavigate, children }) {
  const items = NAV_ITEMS.filter(item => item.id !== 'practice' || canPractice);
  const mainRef = useRef(null);
  const previousActive = useRef(active);

  // Moving to a new screen moves focus to its content, as a page load would.
  // Screen readers then start at the new screen, and page shortcuts (Space to
  // flip a card, Enter to check an answer) aren't swallowed by the nav button.
  useEffect(() => {
    if (previousActive.current === active) return;
    previousActive.current = active;
    mainRef.current?.focus({ preventScroll: true });
  }, [active]);
  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="app-header">
        <div className="app-header-inner">
          <button type="button" className="wordmark" onClick={() => onNavigate('home')} aria-label="ScoreForge home">
            <LogoMark size={30} />
            <span>ScoreForge</span>
          </button>

          <nav className="app-nav" aria-label="Main">
            {items.map(({ id, label, icon: Icon }) => (
              <button key={id} type="button" className="app-nav-item" aria-current={active === id ? 'page' : undefined} onClick={() => onNavigate(id)}>
                <Icon aria-hidden="true" />
                {label}
              </button>
            ))}
          </nav>

          <div className="app-header-tools">
            {streakDays > 0 && (
              <span className="streak" title={`You've studied ${streakDays} day${streakDays === 1 ? '' : 's'} in a row`}>
                <Flame aria-hidden="true" />
                <span><b>{streakDays}</b><span className="streak-unit"> day streak</span></span>
              </span>
            )}
            <button type="button" className="btn btn-quiet btn-small header-plans" aria-current={active === 'plans' ? 'page' : undefined} onClick={() => onNavigate('plans')}>
              <CalendarDays aria-hidden="true" />
              Plans
            </button>
            <button type="button" className="avatar-btn" aria-label="Account" title="Account" aria-current={active === 'account' ? 'page' : undefined} onClick={() => onNavigate('account')}>
              {initialOf(username)}
            </button>
          </div>
        </div>
      </header>

      <main ref={mainRef} id="main" className="app-main" tabIndex={-1}>{children}</main>

      <nav className="mobile-nav" aria-label="Main">
        {items.map(({ id, label, shortLabel, icon: Icon }) => (
          <button key={id} type="button" className="mobile-nav-item" aria-current={active === id ? 'page' : undefined} onClick={() => onNavigate(id)}>
            <Icon aria-hidden="true" />
            <span>{shortLabel ?? label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
