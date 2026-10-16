// Formulas like "A = πr²  \qquad  C = 2πr" hold several equations on one
// line. Rendered as one KaTeX block they overflow a phone-width card, so the
// Formulas screen splits them at each top-level \qquad and lets the parts
// wrap. A \qquad inside braces or an environment (cases, aligned) belongs to
// that construct and is left alone.
const SEPARATOR = '\\qquad';

export function splitDisplayParts(tex) {
  const parts = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < tex.length; i++) {
    const char = tex[i];
    if (char === '\\' && tex.startsWith('\\begin', i)) depth++;
    else if (char === '\\' && tex.startsWith('\\end', i)) depth--;
    else if (char === '{' && tex[i - 1] !== '\\') depth++;
    else if (char === '}' && tex[i - 1] !== '\\') depth--;
    // \qquad must not be the start of a longer command name.
    if (depth === 0 && tex.startsWith(SEPARATOR, i) && !/[a-zA-Z]/.test(tex[i + SEPARATOR.length] ?? '')) {
      parts.push(tex.slice(start, i));
      start = i + SEPARATOR.length;
      i = start - 1;
    }
  }
  parts.push(tex.slice(start));
  return parts.map(part => part.trim()).filter(Boolean);
}
