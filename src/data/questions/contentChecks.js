// Shape checks shared by the question and FRQ tests. Each returns a list of
// problems, empty when the content is fine.

// A screen reader gets only the alt text, so it must describe the figure in full.
const MIN_ALT_LENGTH = 60;

export function figureProblems(figure) {
  const problems = [];
  if (typeof figure.alt !== 'string' || figure.alt.trim().length < MIN_ALT_LENGTH) problems.push(`needs alt text of at least ${MIN_ALT_LENGTH} characters describing it`);
  if (figure.type === 'graph') {
    const { xMin = 0, xMax, xStep, yMin, yMax, yStep, series } = figure;
    if (![xMin, xMax, xStep, yMin, yMax, yStep].every(Number.isFinite) || xMax <= xMin || xStep <= 0 || yStep <= 0 || yMax <= yMin) problems.push('graph needs xMin < xMax, xStep, yMin < yMax and yStep');
    if ((xMax - xMin) / xStep > 12 || (yMax - yMin) / yStep > 12) problems.push('more than 12 grid lines is unreadable on a phone');
    if (!figure.xLabel || !figure.yLabel) problems.push('graph needs both axis labels, with units');
    if (!Array.isArray(series) || series.length === 0) problems.push('graph needs at least one series');
    (series ?? []).forEach((s, si) => {
      s.points.forEach(([x, y], i) => {
        if (x < xMin - 1e-9 || x > xMax + 1e-9 || y < yMin - 1e-9 || y > yMax + 1e-9) problems.push(`series ${si} point ${i} (${x}, ${y}) is off the axes`);
        if (i > 0 && x < s.points[i - 1][0]) problems.push(`series ${si} point ${i}: x must not decrease`);
      });
    });
  } else if (figure.type === 'forces') {
    const labels = figure.forces?.map(f => f.label) ?? [];
    if (labels.length === 0) problems.push('force diagram needs forces');
    if (new Set(labels).size !== labels.length) problems.push('force labels must be unique');
    figure.forces?.forEach(f => { if (!(f.value > 0) || !Number.isFinite(f.angle)) problems.push(`force "${f.label}" needs a positive value and an angle`); });
  } else if (figure.type === 'table') {
    const { columns, rows } = figure;
    if (!Array.isArray(columns) || columns.length < 2 || columns.some(c => typeof c !== 'string' || !c.trim())) problems.push('table needs at least two named columns');
    else if (new Set(columns).size !== columns.length) problems.push('table column names must be unique');
    if (!Array.isArray(rows) || rows.length === 0) problems.push('table needs at least one row');
    (rows ?? []).forEach((row, i) => {
      if (!Array.isArray(row) || row.length !== columns?.length) problems.push(`table row ${i} needs exactly one cell per column`);
      else if (row.some(cell => typeof cell !== 'string' && !Number.isFinite(cell))) problems.push(`table row ${i} cells must be text or numbers`);
    });
  } else {
    problems.push(`unknown type "${figure.type}"`);
  }
  return problems;
}

// A source passage must say where it came from: a public-domain primary
// source, or "Written for ScoreForge". Never copied from exams or textbooks.
export function sourceProblems(source) {
  const problems = [];
  if (typeof source?.text !== 'string' || !source.text.trim()) problems.push('needs text');
  if (typeof source?.citation !== 'string' || !source.citation.trim()) problems.push('needs a citation');
  return problems;
}
