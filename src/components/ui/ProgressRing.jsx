const RING_SIZE = 36
const STROKE_WIDTH = 3
const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

// A bubble with a ring that fills clockwise as share (0..1) grows.
export default function ProgressRing({ share, children, color }) {
  const value = Math.min(Math.max(share || 0, 0), 1);
  return (
    <span className="progress-ring" style={color ? { '--ring': color } : undefined} aria-hidden="true">
      <svg viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`} width={RING_SIZE} height={RING_SIZE}>
        <circle className="progress-ring-track" cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RADIUS} strokeWidth={STROKE_WIDTH} />
        <circle
          className="progress-ring-fill" cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RADIUS} strokeWidth={STROKE_WIDTH}
          strokeDasharray={CIRCUMFERENCE} strokeDashoffset={CIRCUMFERENCE * (1 - value)}
        />
      </svg>
      <span className="progress-ring-label">{children}</span>
    </span>
  );
}
