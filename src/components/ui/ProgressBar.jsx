const clampShare = share => Math.min(Math.max(Number.isFinite(share) ? share : 0, 0), 1);

// share is 0..1. color defaults to graphite; pass a subject colour to tint it.
export default function ProgressBar({ share, color, label, thin = false, className = '' }) {
  const value = clampShare(share);
  return (
    <div
      className={`progress${thin ? ' progress-thin' : ''} ${className}`.trim()}
      role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value * 100)}
      style={{ '--value': value, ...(color ? { '--bar': color } : {}) }}
    >
      <span className="progress-fill" />
    </div>
  );
}
