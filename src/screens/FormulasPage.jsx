import { useState, useEffect, useMemo, useDeferredValue } from 'react'
import { Search, RotateCcw, ExternalLink, X } from 'lucide-react'
import Button from '../components/ui/Button'
import IconButton from '../components/ui/IconButton'
import EmptyState from '../components/ui/EmptyState'
import SubjectSwitcher from '../components/SubjectSwitcher'
import MathTex from '../components/MathTex'
import { FORMULA_SUBJECTS, loadFormulaSheet, loadAllFormulaSheets } from '../data/formulaLoader'
import { searchFormulas } from '../utils/formulaSearch'

const SUBJECT_NAMES = Object.fromEntries(FORMULA_SUBJECTS.map(meta => [meta.id, meta.shortName]));
const SUBJECT_BY_ID = new Map(FORMULA_SUBJECTS.map(meta => [meta.id, meta]));

// The student's own subjects first, then every other subject with a sheet.
function orderedSubjects(mySubjectIds) {
  const mine = FORMULA_SUBJECTS.filter(meta => mySubjectIds.includes(meta.id));
  const others = FORMULA_SUBJECTS.filter(meta => !mySubjectIds.includes(meta.id));
  return [...mine, ...others];
}

// { status: 'loading' | 'ready' | 'error', value, message } for any loader.
// Reloads only when `key` changes: `load` is a fresh closure every render.
function useLoaded(load, key) {
  const [state, setState] = useState({ status: 'loading' });
  useEffect(() => {
    let isCurrent = true;
    setState({ status: 'loading' });
    load()
      .then(value => { if (isCurrent) setState({ status: 'ready', value }); })
      .catch(error => { if (isCurrent) setState({ status: 'error', message: error.message }); });
    return () => { isCurrent = false; };
  }, [key]);
  return state;
}

function isGiven(sheet, formula) {
  return sheet.given && !formula.memorize;
}

function ExamTag({ given }) {
  return given
    ? <span className="badge badge-pass" title="Printed on the reference sheet you get in the exam">Given on exam</span>
    : <span className="badge badge-pencil" title="Not on any exam sheet: you need to know it">Memorize</span>;
}

function FormulaCard({ formula, given, subjectBadge }) {
  return (
    <li className="card formula-card">
      <div className="formula-head">
        <h3>{formula.name}</h3>
        <span className="formula-tags">
          {subjectBadge}
          <ExamTag given={given} />
        </span>
      </div>
      <div className="formula-math" tabIndex={0} role="group" aria-label={`${formula.name} formula`}>
        <MathTex tex={formula.tex} display />
      </div>
      {formula.vars.length > 0 && (
        <dl className="formula-vars">
          {formula.vars.map(([symbol, meaning, unit]) => (
            <div key={symbol}>
              <dt><MathTex tex={symbol} /></dt>
              <dd>{meaning}{unit && <span className="formula-unit"> ({unit})</span>}</dd>
            </div>
          ))}
        </dl>
      )}
      {formula.note && <p className="formula-note">{formula.note}</p>}
    </li>
  );
}

function SheetSource({ sheet }) {
  if (!sheet.given) return <p className="formula-source">{sheet.label}.</p>;
  return (
    <p className="formula-source">
      Formulas tagged Given are printed on the{' '}
      <a href={sheet.url} target="_blank" rel="noopener noreferrer">{sheet.label}<ExternalLink aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span></a>
      {' '}you get in the exam. Learn where each one sits so you can find it fast.
    </p>
  );
}

function SubjectSheet({ subjectId }) {
  const loaded = useLoaded(() => loadFormulaSheet(subjectId), subjectId);

  if (loaded.status === 'loading') return <div className="card formula-loading" role="status">Loading formulas</div>;
  if (loaded.status === 'error') {
    return <div className="card"><EmptyState icon={RotateCcw} title="Couldn't load the formulas" action={<Button variant="secondary" icon={RotateCcw} onClick={() => window.location.reload()}>Reload</Button>}>{loaded.message}</EmptyState></div>;
  }

  const { sheet, sections } = loaded.value;
  const shownSections = sections.filter(section => section.formulas.length > 0);
  return (
    <>
      <SheetSource sheet={sheet} />
      <nav className="chips formula-jump" aria-label="Sections">
        {shownSections.map(section => <a key={section.id} className="chip" href={`#formulas-${section.id}`}>{section.title}</a>)}
      </nav>
      {shownSections.map(section => (
        <section key={section.id} className="formula-section" aria-labelledby={`formulas-${section.id}`}>
          <h2 id={`formulas-${section.id}`}>{section.title}</h2>
          <ul className="formula-list">
            {section.formulas.map(formula => <FormulaCard key={formula.id} formula={formula} given={isGiven(sheet, formula)} />)}
          </ul>
        </section>
      ))}
    </>
  );
}

function SearchResults({ query, onClear }) {
  const loaded = useLoaded(loadAllFormulaSheets, 'all');
  const results = useMemo(
    () => (loaded.status === 'ready' ? searchFormulas(loaded.value, query, SUBJECT_NAMES) : []),
    [loaded, query],
  );

  if (loaded.status === 'loading') return <div className="card formula-loading" role="status">Searching every subject</div>;
  if (loaded.status === 'error') {
    return <div className="card"><EmptyState icon={RotateCcw} title="Couldn't load the formulas" action={<Button variant="secondary" icon={RotateCcw} onClick={() => window.location.reload()}>Reload</Button>}>{loaded.message}</EmptyState></div>;
  }
  if (results.length === 0) {
    return <div className="card"><EmptyState icon={Search} title="No formulas match" action={<Button variant="secondary" onClick={onClear}>Clear search</Button>}>Try a shorter word, like "period" or "area".</EmptyState></div>;
  }

  const sheetsById = new Map(loaded.value.map(s => [s.subjectId, s.sheet]));
  return (
    <>
      <p className="formula-count" aria-live="polite">{results.length} formula{results.length === 1 ? '' : 's'} across every subject</p>
      <ul className="formula-list">
        {results.map(({ subjectId, formula }) => {
          const meta = SUBJECT_BY_ID.get(subjectId);
          const badge = <span className="badge badge-outline formula-subject" style={{ '--subject': meta.color }}><span className="chip-dot" aria-hidden="true" />{meta.shortName}</span>;
          return <FormulaCard key={`${subjectId}-${formula.id}`} formula={formula} given={isGiven(sheetsById.get(subjectId), formula)} subjectBadge={badge} />;
        })}
      </ul>
    </>
  );
}

// Formula reference for every subject that has formulas. The subject choice
// is local to this screen: it can show subjects the student hasn't picked,
// which the rest of the app's active subject must never be.
export default function FormulasPage({ mySubjectIds = [], initialSubjectId }) {
  const subjects = useMemo(() => orderedSubjects(mySubjectIds), [mySubjectIds]);
  const [subjectId, setSubjectId] = useState(() => (SUBJECT_BY_ID.has(initialSubjectId) ? initialSubjectId : subjects[0].id));
  const [search, setSearch] = useState('');
  const query = useDeferredValue(search.trim());
  const subject = SUBJECT_BY_ID.get(subjectId);

  return (
    <div className="page formulas" style={{ '--subject': subject.color }}>
      <SubjectSwitcher subjects={subjects} activeId={subjectId} onSelect={id => { setSubjectId(id); setSearch(''); }} />
      <header className="page-head">
        <div>
          <h1>{query ? 'Search formulas' : `${subject.shortName} formulas`}</h1>
          <p>{query ? `Results for "${query}"` : subject.name}</p>
        </div>
      </header>

      <div className="input-with-icon input-with-action formula-search">
        <Search aria-hidden="true" />
        <label className="sr-only" htmlFor="formula-search">Search formulas in every subject</label>
        <input id="formula-search" className="input" type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search every subject, like &quot;kinetic energy&quot;" autoComplete="off" />
        {search && <IconButton icon={X} label="Clear search" onClick={() => setSearch('')} />}
      </div>

      {query ? <SearchResults query={query} onClear={() => setSearch('')} /> : <SubjectSheet key={subjectId} subjectId={subjectId} />}
    </div>
  );
}
