import { useId } from 'react'

// Draws a question's figure from its data, in the app's colors, so it follows
// light and dark mode. Every figure carries `alt`, a full text description,
// which screen readers read instead of the drawing.
//
// figure.type 'graph':  { xLabel, yLabel, xMax, xStep, yMin, yMax, yStep, series: [{ points: [[x, y], ...], label? }], alt }
// figure.type 'forces': { object, forces: [{ label, value, angle }], alt }   (angle in degrees from +x, counterclockwise)

const GRAPH = { width: 340, height: 238, left: 46, right: 16, top: 34, bottom: 38 };
const FORCES = { width: 300, height: 240, center: [150, 120], minArrow: 28, maxArrow: 82 };

// "F_N 49 N" renders as F with a subscript N, then " 49 N", as AP diagrams do.
function Label({ text }) {
  const match = /^([A-Za-z])_([A-Za-z0-9]+)(.*)$/.exec(text);
  if (!match) return text;
  const [, symbol, subscript, rest] = match;
  return <>{symbol}<tspan className="fig-sub" baselineShift="sub">{subscript}</tspan>{rest}</>;
}

function trimNumber(n) {
  return Number.isInteger(n) ? String(n) : String(Number(n.toFixed(2)));
}

function ticks(min, max, step) {
  const out = [];
  // Snap to whole steps so floating-point drift can't skip or double a tick.
  for (let i = Math.ceil(min / step); i * step <= max + step / 1e6; i++) out.push(Number((i * step).toFixed(6)));
  return out;
}

function Graph({ figure, titleId }) {
  const { width, height, left, right, top, bottom } = GRAPH;
  const { xMax, xStep, yMin, yMax, yStep } = figure;
  const plotW = width - left - right;
  const plotH = height - top - bottom;
  const sx = x => left + (x / xMax) * plotW;
  const sy = y => top + ((yMax - y) / (yMax - yMin)) * plotH;
  const xTicks = ticks(0, xMax, xStep);
  const yTicks = ticks(yMin, yMax, yStep);
  const zeroY = sy(Math.min(Math.max(0, yMin), yMax));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby={titleId} className="q-figure-svg">
      <title id={titleId}>{figure.alt}</title>
      <g className="fig-grid">
        {xTicks.map(x => <line key={`gx${x}`} x1={sx(x)} x2={sx(x)} y1={top} y2={top + plotH} />)}
        {yTicks.map(y => <line key={`gy${y}`} x1={left} x2={left + plotW} y1={sy(y)} y2={sy(y)} />)}
      </g>
      <g className="fig-axis">
        <line x1={left} x2={left} y1={top} y2={top + plotH} />
        <line x1={left} x2={left + plotW} y1={zeroY} y2={zeroY} />
      </g>
      <g className="fig-tick-label">
        {xTicks.map(x => <text key={`tx${x}`} x={sx(x)} y={top + plotH + 15} textAnchor="middle">{trimNumber(x)}</text>)}
        {yTicks.map(y => <text key={`ty${y}`} x={left - 7} y={sy(y) + 4} textAnchor="end">{trimNumber(y)}</text>)}
      </g>
      <text className="fig-axis-label" x={left} y={top - 17} textAnchor="middle"><Label text={figure.yLabel} /></text>
      <text className="fig-axis-label" x={left + plotW} y={height - 4} textAnchor="end"><Label text={figure.xLabel} /></text>
      {figure.series.map((s, i) => (
        <g key={i}>
          <polyline className="fig-line" points={s.points.map(([x, y]) => `${sx(x)},${sy(y)}`).join(' ')} />
          {s.label && <text className="fig-series-label" x={sx(s.points.at(-1)[0]) - 4} y={sy(s.points.at(-1)[1]) - 8} textAnchor="end">{s.label}</text>}
        </g>
      ))}
    </svg>
  );
}

function Forces({ figure, titleId }) {
  const markerId = `${titleId}-arrow`;
  const { width, height, center: [cx, cy], minArrow, maxArrow } = FORCES;
  const largest = Math.max(...figure.forces.map(f => f.value));
  // The box fits its label (about 6.5 units per character at this size).
  const halfH = 13;
  const halfW = Math.max(halfH, ((figure.object?.length ?? 0) * 6.5) / 2 + 7);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby={titleId} className="q-figure-svg q-figure-forces">
      <title id={titleId}>{figure.alt}</title>
      <defs>
        <marker id={markerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className="fig-arrowhead" />
        </marker>
      </defs>
      {figure.forces.map(f => {
        const radians = (f.angle * Math.PI) / 180;
        const dx = Math.cos(radians);
        const dy = -Math.sin(radians);
        // Arrows leave from the edge of the box and grow with the force, so
        // relative sizes are visible but the smallest stays readable.
        const length = minArrow + (maxArrow - minArrow) * (f.value / largest);
        // Distance from the center to the box edge along this direction.
        const edge = Math.min(Math.abs(dx) > 1e-9 ? halfW / Math.abs(dx) : Infinity, Math.abs(dy) > 1e-9 ? halfH / Math.abs(dy) : Infinity);
        const [x1, y1] = [cx + dx * edge, cy + dy * edge];
        const [x2, y2] = [cx + dx * (edge + length), cy + dy * (edge + length)];
        return (
          <g key={f.label}>
            <line className="fig-force" x1={x1} y1={y1} x2={x2} y2={y2} markerEnd={`url(#${markerId})`} />
            {/* Labels sit past the arrowhead: beside it for sideways arrows, above or below for vertical ones. */}
            <text className="fig-force-label" x={x2 + dx * 10} y={y2 + dy * 16 + 4} textAnchor={dx > 0.3 ? 'start' : dx < -0.3 ? 'end' : 'middle'}><Label text={f.label} /></text>
          </g>
        );
      })}
      <rect className="fig-object" x={cx - halfW} y={cy - halfH} width={halfW * 2} height={halfH * 2} rx="3" />
      {figure.object && <text className="fig-object-label" x={cx} y={cy + 4} textAnchor="middle">{figure.object}</text>}
    </svg>
  );
}

export default function QuestionFigure({ figure }) {
  // useId gives ':r1:'; colons break url(#...) references to the arrow marker.
  const titleId = `fig${useId().replace(/:/g, '')}`;
  if (!figure) return null;
  return (
    <figure className="q-figure">
      {figure.type === 'graph' && <Graph figure={figure} titleId={titleId} />}
      {figure.type === 'forces' && <Forces figure={figure} titleId={titleId} />}
    </figure>
  );
}
