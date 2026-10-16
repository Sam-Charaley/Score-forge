// Reading values off a question's figure, so a question's solve() computes
// its answer from the same numbers the student sees drawn. A graph series is
// a list of [x, y] points joined by straight segments, with x increasing.

function segmentAt(points, x) {
  for (let i = 0; i < points.length - 1; i++) {
    const [x0] = points[i];
    const [x1] = points[i + 1];
    if (x >= x0 && x <= x1) return i;
  }
  throw new RangeError(`x = ${x} is outside the graph (${points[0][0]} to ${points.at(-1)[0]})`);
}

// y at x, by straight-line interpolation.
export function valueAt(points, x) {
  const i = segmentAt(points, x);
  const [[x0, y0], [x1, y1]] = [points[i], points[i + 1]];
  return x1 === x0 ? y1 : y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
}

// Slope of the segment containing x. Asking at a corner is ambiguous, so the
// question must name a point strictly inside a segment.
export function slopeAt(points, x) {
  const i = segmentAt(points, x);
  const [[x0, y0], [x1, y1]] = [points[i], points[i + 1]];
  if (x === x0 || x === x1) throw new RangeError(`x = ${x} is a corner of the graph; the slope there is undefined`);
  return (y1 - y0) / (x1 - x0);
}

// Area of one straight segment between `left` and `right`, interpolated
// within that segment (not via valueAt, which would read the wrong side of a
// vertical jump). `transform` is applied to heights: identity for signed
// area, Math.abs for total area.
function segmentArea([x0, y0], [x1, y1], left, right, transform) {
  const at = x => y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
  const yLeft = at(left);
  const yRight = at(right);
  // A segment crossing zero is split there so each part keeps its own sign.
  if (yLeft * yRight < 0) {
    const crossing = left + ((right - left) * yLeft) / (yLeft - yRight);
    return (transform(yLeft) * (crossing - left)) / 2 + (transform(yRight) * (right - crossing)) / 2;
  }
  return ((transform(yLeft) + transform(yRight)) * (right - left)) / 2;
}

function areaBetween(points, xStart, xEnd, transform) {
  let area = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const left = Math.max(points[i][0], xStart);
    const right = Math.min(points[i + 1][0], xEnd);
    if (right > left) area += segmentArea(points[i], points[i + 1], left, right, transform);
  }
  return area;
}

// Signed area between the graph and the x-axis from xStart to xEnd: area
// below the axis counts as negative, as for displacement on a v-t graph.
export function areaUnder(points, xStart, xEnd) {
  return areaBetween(points, xStart, xEnd, y => y);
}

// Total area ignoring sign, as for distance traveled on a v-t graph.
export function absoluteAreaUnder(points, xStart, xEnd) {
  return areaBetween(points, xStart, xEnd, Math.abs);
}

// Net force of a free-body diagram as { x, y, magnitude }. Angles are in
// degrees from the +x axis, counterclockwise.
export function netForce(forces) {
  const x = forces.reduce((sum, f) => sum + f.value * Math.cos((f.angle * Math.PI) / 180), 0);
  const y = forces.reduce((sum, f) => sum + f.value * Math.sin((f.angle * Math.PI) / 180), 0);
  const round = n => (Math.abs(n) < 1e-9 ? 0 : n);
  return { x: round(x), y: round(y), magnitude: Math.hypot(x, y) };
}
