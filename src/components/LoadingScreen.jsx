import LogoMark from './LogoMark'

export default function LoadingScreen({ caption = 'Loading your plan' }) {
  return (
    <div className="center-screen" role="status" aria-live="polite">
      <div className="loading-stack">
        <LogoMark size={64} motion="loop" />
        <span className="wordmark">ScoreForge</span>
        <span className="loading-caption">{caption}</span>
      </div>
    </div>
  );
}
