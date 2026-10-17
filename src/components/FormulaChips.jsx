import { useState, lazy, Suspense } from 'react'
import { Sigma, ChevronDown } from 'lucide-react'
import { splitDisplayParts } from '../utils/texParts'

// KaTeX loads only when a student opens a formula, not with Practice itself.
const MathTex = lazy(() => import('./MathTex'));

// Formula math, or Java for CS A entries. Shared by the chips here and the
// drill's answer choices.
export function FormulaContent({ formula, tex, code }) {
  const source = code ?? formula?.code;
  if (source) return <code className="formula-code">{source}</code>;
  const math = tex ?? formula.tex;
  return (
    <Suspense fallback={<code className="formula-fallback">{math}</code>}>
      <span className="formula-parts">{splitDisplayParts(math).map(part => <MathTex key={part} tex={part} display />)}</span>
    </Suspense>
  );
}

// "Formulas used" after a question is answered: one chip per formula, and
// tapping a chip opens that formula's card underneath.
export default function FormulaChips({ formulas, given }) {
  const [openId, setOpenId] = useState(null);
  if (formulas.length === 0) return null;
  const open = formulas.find(f => f.id === openId);
  return (
    <div className="formula-chips">
      <span className="formula-chips-label"><Sigma aria-hidden="true" />Formulas used</span>
      <div className="chips">
        {formulas.map(f => (
          <button key={f.id} type="button" className="chip" aria-expanded={openId === f.id} aria-controls={`used-formula-${f.id}`} onClick={() => setOpenId(id => (id === f.id ? null : f.id))}>
            {f.name}<ChevronDown aria-hidden="true" className="chip-caret" />
          </button>
        ))}
      </div>
      {open && (
        <div className="formula-chip-card" id={`used-formula-${open.id}`}>
          <div className="formula-chip-head">
            <b>{open.name}</b>
            {given(open)
              ? <span className="badge badge-pass">Given on exam</span>
              : <span className="badge badge-pencil">Memorize</span>}
          </div>
          <div className="formula-math"><FormulaContent formula={open} /></div>
          {open.note && <p className="formula-note">{open.note}</p>}
        </div>
      )}
    </div>
  );
}
