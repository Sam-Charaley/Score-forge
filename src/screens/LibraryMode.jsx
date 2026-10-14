import { useState, useMemo } from 'react'
import { Search, ExternalLink, RotateCcw } from 'lucide-react'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { SUBJECT_INDEX as SUBJECTS } from '../data/subjectIndex'
import { useSubjectContent } from '../hooks/useSubjectContent'

const ALL_SUBJECT_IDS = SUBJECTS.map(meta => meta.id)
const MY_SUBJECTS = 'mine'
const ALL_SUBJECTS = 'all'
const ALL_TAGS = 'all'
const WEEK_TAG = 'Week'

const TAG_BADGE_CLASS = { Official: 'badge-dark', Free: 'badge-pass', Practice: 'badge-pencil' };

function hostOf(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; }
}

export default function LibraryMode({ mySubjectIds = [] }) {
  const [subjectFilter, setSubjectFilter] = useState(mySubjectIds.length > 0 ? MY_SUBJECTS : ALL_SUBJECTS);
  const [tagFilter, setTagFilter] = useState(ALL_TAGS);
  const [search, setSearch] = useState('');
  // The library spans every subject, so it loads all content, but only when opened.
  const content = useSubjectContent(ALL_SUBJECT_IDS);

  const allResources = useMemo(() => {
    // One entry per subject and link: a site shared by two subjects shows up
    // under either subject's filter, and once in combined views (see below).
    const bySubjectAndUrl = new Map();
    (content.subjects ?? []).forEach(sub => {
      const add = (r, fallbackTag) => {
        const key = `${sub.id}|${r.url}`;
        if (!bySubjectAndUrl.has(key)) bySubjectAndUrl.set(key, { ...r, tag: r.tag || fallbackTag, subjectId: sub.id, subjectName: sub.shortName, subjectColor: sub.color });
      };
      (sub.globalResources || []).forEach(r => add(r, null));
      sub.weeks.forEach(wk => (wk.resources || []).forEach(r => add(r, WEEK_TAG)));
    });
    return [...bySubjectAndUrl.values()];
  }, [content.subjects]);

  const tags = useMemo(() => [...new Set(allResources.map(r => r.tag).filter(Boolean))].sort(), [allResources]);

  const query = search.trim().toLowerCase();
  const shownUrls = new Set();
  const filtered = allResources.filter(r => {
    if (subjectFilter === MY_SUBJECTS && !mySubjectIds.includes(r.subjectId)) return false;
    if (subjectFilter !== MY_SUBJECTS && subjectFilter !== ALL_SUBJECTS && r.subjectId !== subjectFilter) return false;
    if (tagFilter !== ALL_TAGS && r.tag !== tagFilter) return false;
    if (query && !r.name.toLowerCase().includes(query) && !(r.desc || '').toLowerCase().includes(query)) return false;
    if (shownUrls.has(r.url)) return false;
    shownUrls.add(r.url);
    return true;
  });

  const clearFilters = () => { setSearch(''); setTagFilter(ALL_TAGS); setSubjectFilter(ALL_SUBJECTS); };

  let results;
  if (content.error) {
    results = <div className="card"><EmptyState icon={RotateCcw} title="Couldn't load the library" action={<Button variant="secondary" onClick={() => window.location.reload()}>Reload</Button>}>{content.error.message}</EmptyState></div>;
  } else if (!content.subjects) {
    results = <div className="card library-loading" role="status">Loading resources</div>;
  } else if (filtered.length === 0) {
    results = <div className="card"><EmptyState icon={Search} title="Nothing matches" action={<Button variant="secondary" onClick={clearFilters}>Clear filters</Button>}>Try a different word, or search every subject.</EmptyState></div>;
  } else {
    results = (
      <ul className="resource-list library-grid">
        {filtered.map(r => (
          <li key={r.url}>
            <a className="card resource-link library-item" href={r.url} target="_blank" rel="noopener noreferrer">
              <span className="resource-text">
                <span className="library-tags">
                  <span className="badge badge-outline" style={{ '--subject': r.subjectColor }}><span className="chip-dot" aria-hidden="true" />{r.subjectName}</span>
                  {r.tag && <span className={`badge ${TAG_BADGE_CLASS[r.tag] ?? ''}`}>{r.tag === WEEK_TAG ? 'From the plan' : r.tag}</span>}
                </span>
                <span className="resource-name">{r.name}</span>
                {r.desc && <span className="resource-desc">{r.desc}</span>}
                <span className="resource-host">{hostOf(r.url)}</span>
              </span>
              <ExternalLink aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="page library">
      <header className="page-head">
        <div>
          <h1>Resource library</h1>
          <p>Every link from every plan, in one place.</p>
        </div>
        {content.subjects && <span className="badge badge-outline" aria-live="polite">{filtered.length} resource{filtered.length === 1 ? '' : 's'}</span>}
      </header>

      <div className="library-filters">
        <label className="input-with-icon library-search">
          <Search aria-hidden="true" />
          <span className="sr-only">Search resources</span>
          <input className="input" type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or topic" />
        </label>
        <label className="library-subject">
          <span className="sr-only">Subject</span>
          <select className="input select" value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)}>
            {mySubjectIds.length > 0 && <option value={MY_SUBJECTS}>My subjects</option>}
            <option value={ALL_SUBJECTS}>All subjects</option>
            {SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </label>
      </div>
      {tags.length > 0 && (
        <div className="chips library-types" role="group" aria-label="Resource type">
          <button type="button" className="chip" aria-pressed={tagFilter === ALL_TAGS} onClick={() => setTagFilter(ALL_TAGS)}>All types</button>
          {tags.map(tag => (
            <button key={tag} type="button" className="chip" aria-pressed={tagFilter === tag} onClick={() => setTagFilter(tag)}>{tag === WEEK_TAG ? 'From the plan' : tag}</button>
          ))}
        </div>
      )}

      {results}
    </div>
  );
}
