import { useRef, useState } from 'react'
import { useElementWidth } from '../hooks/useElementWidth'
import { MASTERY_LEVELS } from '../utils/mastery'
import { parseLocalDate, fmtDate, calendarDaysBetween } from '../utils/planEngine'

const HEIGHT = 240;
const PAD = { top: 14, right: 92, bottom: 30, left: 44 };
const PAD_NARROW = { ...PAD, right: 16 };
const NARROW_WIDTH = 480;
const Y_TICKS = [0, 0.2, 0.4, 0.6, 0.8, 1];
const MARKER_RADIUS = 4;
const HIT_RADIUS_PX = 40;

const percent = share => `${Math.round(share * 100)}%`;

// "Your level over time": chance on a medium question at the end of each
// practice day. One series, so no legend; the title names it. Level bands
// (Developing, Proficient, Strong) are faint reference lines.
export default function LevelChart({ days }) {
  const frameRef = useRef(null);
  const width = useElementWidth(frameRef);
  const [active, setActive] = useState(null);

  const pad = width < NARROW_WIDTH ? PAD_NARROW : PAD;
  const plotWidth = Math.max(0, width - pad.left - pad.right);
  const plotHeight = HEIGHT - pad.top - pad.bottom;
  const firstDay = days[0]?.day;
  const span = Math.max(1, calendarDaysBetween(firstDay, days[days.length - 1]?.day));
  const xOf = day => pad.left + (calendarDaysBetween(firstDay, day) / span) * plotWidth;
  const yOf = share => pad.top + (1 - share) * plotHeight;
  const points = days.map(d => ({ ...d, x: xOf(d.day), y: yOf(d.chance) }));
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const bands = MASTERY_LEVELS.filter(level => level.minChance > 0);

  const nearestTo = clientX => {
    const left = frameRef.current.getBoundingClientRect().left;
    const x = clientX - left;
    let best = null;
    points.forEach((p, i) => { if (best === null || Math.abs(p.x - x) < Math.abs(points[best].x - x)) best = i; });
    return best !== null && Math.abs(points[best].x - x) <= Math.max(HIT_RADIUS_PX, plotWidth / points.length) ? best : null;
  };
  const onKeyDown = e => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const step = e.key === 'ArrowRight' ? 1 : -1;
    setActive(current => Math.min(Math.max((current ?? (step > 0 ? -1 : points.length)) + step, 0), points.length - 1));
  };

  const shown = active !== null ? points[active] : null;
  const xLabels = points.length <= 2 ? points : [points[0], points[Math.floor((points.length - 1) / 2)], points[points.length - 1]];

  return (
    <div className="level-chart" ref={frameRef}>
      {width > 0 && (
        <svg
          width={width} height={HEIGHT} role="img" tabIndex={0}
          aria-label={`Line chart of your level over ${days.length} practice days. Use the left and right arrow keys to read each day.`}
          onPointerMove={e => setActive(nearestTo(e.clientX))} onPointerLeave={() => setActive(null)}
          onKeyDown={onKeyDown} onBlur={() => setActive(null)}
        >
          {Y_TICKS.map(t => (
            <g key={t}>
              <line className="chart-grid" x1={pad.left} x2={pad.left + plotWidth} y1={yOf(t)} y2={yOf(t)} />
              <text className="chart-axis" x={pad.left - 8} y={yOf(t)} dy="0.35em" textAnchor="end">{percent(t)}</text>
            </g>
          ))}
          {width >= NARROW_WIDTH && bands.map(level => (
            <text key={level.id} className="chart-band-label" x={pad.left + plotWidth + 8} y={yOf(level.minChance)} dy="-0.45em">{level.label}</text>
          ))}
          {bands.map(level => (
            <line key={level.id} className="chart-band" x1={pad.left} x2={pad.left + plotWidth} y1={yOf(level.minChance)} y2={yOf(level.minChance)} />
          ))}
          {xLabels.map((p, i) => (
            <text key={p.day} className="chart-axis" x={p.x} y={HEIGHT - 8}
              textAnchor={i === 0 ? 'start' : i === xLabels.length - 1 ? 'end' : 'middle'}>{fmtDate(parseLocalDate(p.day))}</text>
          ))}
          {shown && <line className="chart-crosshair" x1={shown.x} x2={shown.x} y1={pad.top} y2={pad.top + plotHeight} />}
          <path className="chart-line" d={path} />
          {points.map((p, i) => (
            <circle key={p.day} className={`chart-dot${i === active ? ' is-active' : ''}`} cx={p.x} cy={p.y} r={i === active ? MARKER_RADIUS + 2 : MARKER_RADIUS} />
          ))}
        </svg>
      )}
      {shown && (
        <div className="chart-tooltip" role="status" style={{ left: Math.min(Math.max(shown.x, 90), width - 90), top: shown.y }}>
          <b>{fmtDate(parseLocalDate(shown.day))}</b>
          <span>{percent(shown.chance)} on a medium question</span>
          <span>{shown.answered} answered, {shown.correct} right</span>
          {shown.predictedScore && <span>Predicted score {shown.predictedScore}</span>}
        </div>
      )}
      <table className="sr-only">
        <caption>Your level at the end of each practice day</caption>
        <thead><tr><th scope="col">Day</th><th scope="col">Chance on a medium question</th><th scope="col">Answered</th><th scope="col">Right</th></tr></thead>
        <tbody>{days.map(d => <tr key={d.day}><th scope="row">{fmtDate(parseLocalDate(d.day))}</th><td>{percent(d.chance)}</td><td>{d.answered}</td><td>{d.correct}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
