import { useId } from 'react'

// The ScoreForge mark: an answer bubble being filled in pencil.
// Colours come from CSS (.logo-tile, .logo-ring) so the mark adapts to dark
// mode; the fill attributes are the fallback for contexts without the CSS.
// motion: 'none' | 'once' (fills on mount).
export default function LogoMark({ size = 64, motion = 'none', title }) {
  const clipId = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <rect className="logo-tile" width="64" height="64" rx="15" fill="#22252A" />
      <rect className="logo-edge" x=".75" y=".75" width="62.5" height="62.5" rx="14.25" strokeWidth="1.5" fill="none" />
      <clipPath id={clipId}><circle cx="32" cy="32" r="15" /></clipPath>
      <g clipPath={`url(#${clipId})`}>
        <polygon className={motion === 'once' ? 'logo-fill-once' : undefined} points="10,40 54,27 54,54 10,54" fill="#F2B705" />
      </g>
      <circle className="logo-ring" cx="32" cy="32" r="17" fill="none" stroke="#F4F5F1" strokeWidth="5" />
    </svg>
  );
}
