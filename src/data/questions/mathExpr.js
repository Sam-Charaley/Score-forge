// Evaluates the exact math in an answer choice, like "π/4", "e² − 1",
// "3√2", "(1/2) ln 5" or "−2/9", so a test can compare it with a question's
// solve(). Returns null for choices that aren't a single value, such as
// "Diverges" or "x = 2 and x = −2".
//
// Grammar (implicit multiplication allowed, as written on the exam):
//   sum     = product (('+' | '−') product)*
//   product = signed (('×' | '·' | '/') signed | signed)*
//   signed  = ('−' | '+') signed | power
//   power   = primary (superscript | '^' signed)?
//   primary = number | 'π' | 'e' | '(' sum ')' | '√' power | function power

const SUPERSCRIPTS = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-' };
const FUNCTIONS = { ln: Math.log, sin: Math.sin, cos: Math.cos, tan: Math.tan, arctan: Math.atan, arcsin: Math.asin };

function tokenize(text) {
  const tokens = [];
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (/\s/.test(ch)) { i++; continue; }
    if (/[0-9.]/.test(ch)) {
      let j = i;
      while (j < text.length && /[0-9.]/.test(text[j])) j++;
      tokens.push({ type: 'number', value: Number(text.slice(i, j)) });
      i = j;
      continue;
    }
    if (ch in SUPERSCRIPTS) {
      let j = i;
      let digits = '';
      while (j < text.length && text[j] in SUPERSCRIPTS) digits += SUPERSCRIPTS[text[j++]];
      tokens.push({ type: 'superscript', value: Number(digits) });
      i = j;
      continue;
    }
    if (/[a-z]/i.test(ch)) {
      let j = i;
      while (j < text.length && /[a-z]/i.test(text[j])) j++;
      const word = text.slice(i, j);
      if (word === 'e') tokens.push({ type: 'number', value: Math.E });
      else if (word in FUNCTIONS) tokens.push({ type: 'function', value: FUNCTIONS[word] });
      else return null;  // any other word means this choice isn't a plain value
      i = j;
      continue;
    }
    if (ch === 'π') { tokens.push({ type: 'number', value: Math.PI }); i++; continue; }
    if (ch === '−' || ch === '-') { tokens.push({ type: 'op', value: '-' }); i++; continue; }
    if ('+×·/^()√'.includes(ch)) { tokens.push({ type: 'op', value: ch === '·' ? '×' : ch }); i++; continue; }
    return null;
  }
  return tokens;
}

export function evaluateChoice(text) {
  const tokens = tokenize(text);
  if (!tokens || tokens.length === 0) return null;
  let pos = 0;
  const peek = () => tokens[pos];
  const isOp = (value) => peek()?.type === 'op' && peek().value === value;
  const startsPrimary = () => {
    const t = peek();
    return t && (t.type === 'number' || t.type === 'function' || (t.type === 'op' && (t.value === '(' || t.value === '√')));
  };

  function primary() {
    const t = peek();
    if (!t) throw new SyntaxError('unexpected end');
    if (t.type === 'number') { pos++; return t.value; }
    if (t.type === 'function') { pos++; return t.value(power()); }
    if (isOp('(')) {
      pos++;
      const value = sum();
      if (!isOp(')')) throw new SyntaxError('missing )');
      pos++;
      return value;
    }
    if (isOp('√')) { pos++; return Math.sqrt(power()); }
    throw new SyntaxError(`unexpected ${t.value}`);
  }
  function power() {
    const base = primary();
    if (peek()?.type === 'superscript') return base ** tokens[pos++].value;
    if (isOp('^')) { pos++; return base ** signed(); }
    return base;
  }
  function signed() {
    if (isOp('-')) { pos++; return -signed(); }
    if (isOp('+')) { pos++; return signed(); }
    return power();
  }
  function product() {
    let value = signed();
    for (;;) {
      if (isOp('×')) { pos++; value *= signed(); }
      else if (isOp('/')) { pos++; value /= signed(); }
      else if (startsPrimary()) value *= power();
      else return value;
    }
  }
  function sum() {
    let value = product();
    for (;;) {
      if (isOp('+')) { pos++; value += product(); }
      else if (isOp('-')) { pos++; value -= product(); }
      else return value;
    }
  }

  try {
    const value = sum();
    return pos === tokens.length && Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}
