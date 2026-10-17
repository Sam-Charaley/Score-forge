import { useMemo } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

// Renders a KaTeX string. The formula files are our own content and KaTeX
// runs with trust off (no \href, \htmlClass and so on), so its HTML output is
// safe to insert. formulas.test.js renders every string with throwOnError, so
// a broken one fails the tests; here a bad string falls back to its source
// text rather than crashing the page.
// KaTeX's MathML output is what screen readers read; its visual HTML is aria-hidden.
export default function MathTex({ tex, display = false }) {
  const html = useMemo(
    () => katex.renderToString(tex, { displayMode: display, throwOnError: false, output: 'htmlAndMathml' }),
    [tex, display],
  );
  // Always a span (block-styled for display math) so it can sit inside a
  // button, as drill answer choices do.
  return <span className={display ? 'math-display' : 'math-inline'} dangerouslySetInnerHTML={{ __html: html }} />;
}
