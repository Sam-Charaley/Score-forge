// Reading numbers out of answer choices like "4.0 m/s", "200,000 N",
// "−3.0 m/s²" or "1.8 × 10⁻⁵", for checking numeric answer keys (see
// numeric.test.js).

const LEADING_NUMBER = /^\s*([−+-]?)(\d[\d,]*)(?:\.(\d+))?/;
// Scientific notation as chemistry writes it: "× 10" and a superscript power.
const POWER_OF_TEN = /^\s*×\s*10([⁻⁺]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)/;
const SUPERSCRIPT_DIGITS = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const superscriptToNumber = text => Number([...text].map(c => (c === '⁻' ? '-' : c === '⁺' ? '+' : SUPERSCRIPT_DIGITS.indexOf(c))).join(''));
// A shown value is only accepted if it is also this close in relative terms,
// so "200,000 N" can't vouch for 240,000 just because its zeros are vague.
const MAX_RELATIVE_ERROR = 0.03;

// { value, place } where place is the size of the last significant digit
// shown: 0.1 for "4.0", 10 for "610", 1 for "0", or null if not a number.
export function parseChoiceNumber(text) {
  const match = LEADING_NUMBER.exec(text);
  if (!match) return null;
  const [whole, sign, integerPart, decimals] = match;
  const power = POWER_OF_TEN.exec(text.slice(whole.length));
  const rest = power ? whole.length + power[0].length : whole.length;
  // "2F/3" starts with a digit but is an expression, not a value.
  if (/[A-Za-z/]/.test(text.charAt(rest))) return null;
  const scale = power ? 10 ** superscriptToNumber(power[1]) : 1;
  const digits = integerPart.replace(/,/g, '');
  const magnitude = Number(`${digits}${decimals ? `.${decimals}` : ''}`);
  let place;
  if (decimals) place = 10 ** -decimals.length;
  else {
    const trailingZeros = digits === '0' ? 0 : digits.length - digits.replace(/0+$/, '').length;
    place = 10 ** trailingZeros;
  }
  const signed = sign === '−' || sign === '-' ? -magnitude : magnitude;
  // Rounded so 1.8 × 10⁻⁵ reads as exactly 0.000018, not 0.000018000000000000002.
  const tidy = x => Number(x.toPrecision(12));
  return { value: tidy(signed * scale), place: tidy(place * scale) };
}

// True when `value` would be displayed as `shown`: within half of its last
// digit, and within MAX_RELATIVE_ERROR.
export function matchesDisplayed(shown, value) {
  if (!shown) return false;
  const difference = Math.abs(shown.value - value);
  const withinDigit = difference <= shown.place / 2 + 1e-9;
  const withinRelative = value === 0 ? difference === 0 : difference / Math.abs(value) <= MAX_RELATIVE_ERROR;
  return withinDigit && withinRelative;
}
