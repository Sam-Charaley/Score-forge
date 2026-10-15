import LogoMark from './LogoMark'

// While the student's data loads, show the shape of the app it is about to
// become, so the screen doesn't jump from a splash to a full page.
export default function LoadingScreen({ caption = 'Loading your plan' }) {
  return (
    <div className="skeleton-shell" role="status" aria-live="polite">
      <span className="sr-only">{caption}</span>
      <div className="skeleton-header" aria-hidden="true">
        <div className="skeleton-header-inner">
          <span className="wordmark"><LogoMark size={30} />ScoreForge</span>
        </div>
      </div>
      <div className="skeleton-page" aria-hidden="true">
        <div className="skeleton-greeting">
          <span className="skeleton-block skeleton-line skeleton-kicker" />
          <span className="skeleton-block skeleton-line skeleton-title" />
        </div>
        <div className="skeleton-row">
          <span className="skeleton-block skeleton-hero" />
          <span className="skeleton-block skeleton-hero skeleton-side" />
        </div>
        <span className="skeleton-block skeleton-strip" />
      </div>
    </div>
  );
}
