import { useState, useMemo } from 'react'
import { C } from '../theme'
import { SUBJECTS } from '../data/subjects'

export default function LibraryMode({ onBack }) {
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterTag, setFilterTag] = useState('all');
  const [search, setSearch] = useState('');

  const allResources = useMemo(() => {
    const list = [];
    SUBJECTS.forEach(sub => {
      (sub.globalResources || []).forEach(r => list.push({ ...r, subjectId: sub.id, subjectName: sub.shortName, subjectColor: sub.color }));
      sub.weeks.forEach(wk => (wk.resources || []).forEach(r => { if (!list.find(x => x.url === r.url)) list.push({ ...r, subjectId: sub.id, subjectName: sub.shortName, subjectColor: sub.color, tag: r.tag || 'Week' }); }));
    });
    return list;
  }, []);

  const allTags = useMemo(() => { const tags = new Set(allResources.map(r => r.tag).filter(Boolean)); return ['all', ...Array.from(tags).sort()]; }, [allResources]);
  const tagColor = { Official: '#2563eb', Free: '#16a34a', Practice: '#d97706', Video: '#db2777', Tool: '#7c3aed', Reference: '#ea580c', Week: C.muted };
  const seen = new Set();
  const filtered = allResources.filter(r => {
    const matchSub = filterSubject === 'all' || r.subjectId === filterSubject;
    const matchTag = filterTag === 'all' || r.tag === filterTag;
    const q = search.toLowerCase();
    const matchSearch = !q || r.name.toLowerCase().includes(q) || (r.desc || '').toLowerCase().includes(q);
    if (!matchSub || !matchTag || !matchSearch) return false;
    if (seen.has(r.url)) return false;
    seen.add(r.url); return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: C.bg }}>
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 24px', height: '54px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.text2 }}>← Back</button>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 700, color: C.text }}>📚 Resource Library</span>
        <span style={{ color: C.muted, fontSize: '11px' }}>· {filtered.length} resources</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        <div style={{ maxWidth: '920px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search resources..." style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '8px', color: C.text, fontSize: '12px', padding: '7px 12px', fontFamily: 'inherit', outline: 'none', minWidth: '180px' }} />
            {['all', ...SUBJECTS.map(s => s.id)].map(id => {
              const sub = SUBJECTS.find(s => s.id === id);
              const active = filterSubject === id;
              return <button key={id} onClick={() => setFilterSubject(id)} style={{ background: active ? (sub ? `${sub.color}15` : C.redLight) : 'transparent', border: `1px solid ${active ? (sub ? sub.color : C.red) : C.border}`, borderRadius: '10px', color: active ? (sub ? sub.color : C.red) : C.muted, fontSize: '10px', padding: '4px 10px', cursor: 'pointer', fontFamily: 'inherit' }}>{sub ? `${sub.icon} ${sub.shortName}` : 'All'}</button>;
            })}
          </div>
          <div style={{ display: 'flex', gap: '5px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {allTags.map(tag => (
              <button key={tag} onClick={() => setFilterTag(tag)} style={{ background: filterTag === tag ? `${tagColor[tag] || C.muted}15` : 'transparent', border: `1px solid ${filterTag === tag ? (tagColor[tag] || C.muted) : C.border}`, borderRadius: '10px', color: filterTag === tag ? (tagColor[tag] || C.text) : C.muted, fontSize: '10px', padding: '4px 10px', cursor: 'pointer', fontFamily: 'inherit' }}>{tag === 'all' ? 'All Types' : tag}</button>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div style={{ color: C.muted, fontSize: '13px', textAlign: 'center', padding: '40px' }}>No resources match.</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
              {filtered.map((r, i) => (
                <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                  style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: '14px', padding: '16px 18px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = r.subjectColor + '50'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {r.tag && <span style={{ fontSize: '10px', border: `1px solid ${(tagColor[r.tag] || C.muted)}30`, borderRadius: '99px', padding: '1px 6px', color: tagColor[r.tag] || C.muted }}>{r.tag}</span>}
                    <span style={{ fontSize: '10px', border: `1px solid ${r.subjectColor}25`, borderRadius: '99px', padding: '1px 6px', color: r.subjectColor }}>{r.subjectName}</span>
                  </div>
                  <div style={{ color: C.text, fontSize: '12px', fontWeight: 600 }}>{r.name}</div>
                  <div style={{ color: C.muted, fontSize: '11px', lineHeight: '1.5', flex: 1 }}>{r.desc}</div>
                  <div style={{ color: r.subjectColor, fontSize: '10px' }}>↗ Open resource</div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
