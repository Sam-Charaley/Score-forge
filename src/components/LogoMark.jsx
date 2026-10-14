import { useId } from 'react'

// The ScoreForge mark: an answer bubble being filled in pencil.
// motion: 'none' | 'once' (fills on mount) | 'loop' (fills and empties; for loading).
export default function LogoMark({ size = 64, motion = 'none', title }) {
  const clipId = useId();
  const fillClass = motion === 'once' ? 'logo-fill-once' : motion === 'loop' ? 'logo-fill-loop' : undefined;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <rect width="64" height="64" rx="15" fill="#22252A" />
      <clipPath id={clipId}><circle cx="32" cy="32" r="15" /></clipPath>
      <g clipPath={`url(#${clipId})`}>
        <polygon className={fillClass} points="10,40 54,27 54,54 10,54" fill="#F2B705" />
      </g>
      <circle cx="32" cy="32" r="17" fill="none" stroke="#F4F5F1" strokeWidth="5" />
    </svg>
  );
}
