import React from 'react'
import { SUBJECTS } from '../data/subjects'

function LibraryMode({ onBack }) {
  const [filterSubject, setFilterSubject] = React.useState("all");
  const [filterTag, setFilterTag] = React.useState("all");
  const [search, setSearch] = React.useState("");

  const allResources = React.useMemo(() => {
    const list = [];
    SUBJECTS.forEach(sub => {
      (sub.globalResources || []).forEach(r => list.push({ ...r, subjectId: sub.id, subjectName: sub.shortName, subjectColor: sub.color }));
      sub.weeks.forEach(wk => (wk.resources || []).forEach(r => {
        if (!list.find(x => x.url === r.url))
          list.push({ ...r, subjectId: sub.id, subjectName: sub.shortName, subjectColor: sub.color, tag: r.tag || "Week" });
      }));
    });
    return list;
  }, []);

  const allTags = React.useMemo(() => {
    const tags = new Set(allResources.map(r => r.tag).filter(Boolean));
    return ["all", ...Array.from(tags).sort()];
  }, [allResources]);

  const seen = new Set();
  const filtered = allResources.filter(r => {
    const matchSub = filterSubject === "all" || r.subjectId === filterSubject;
    const matchTag = filterTag === "all" || r.tag === filterTag;
    const q = search.toLowerCase();
    const matchSearch = !q || r.name.toLowerCase().includes(q) || (r.desc||"").toLowerCase().includes(q);
    if (!matchSub || !matchTag || !matchSearch) return false;
    if (seen.has(r.url)) return false;
    seen.add(r.url); return true;
  });

  const tagColor = { "Official": "#2563eb", "Free": "#16a34a", "Practice": "#d97706", "Video": "#db2777", "Tool": "#7c3aed", "Reference": "#ea580c", "Week": "#94a3b8" };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <button onClick={onBack} style={{ background: "transparent", border: "1px solid #f1f5f9", borderRadius: "8px", color: "#94a3b8", background: "#ffffff", fontSize: "10px", padding: "5px 10px", cursor: "pointer", fontFamily: "inherit" }}>← Back</button>
          <span style={{ color: "#2563eb", fontSize: "15px", fontWeight: 700 }}>📚 Resource Library</span>
          <span style={{ color: "#94a3b8", fontSize: "11px" }}>{filtered.length} resources</span>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search resources..." style={{ background: "#1e293b", border: "1px solid #e2e8f0", borderRadius: "8px", color: "#1e293b", fontSize: "11px", padding: "7px 12px", fontFamily: "inherit", outline: "none", minWidth: "180px" }} />
          <button onClick={() => setFilterSubject("all")} style={{ background: filterSubject === "all" ? "#58a6ff20" : "transparent", border: `1px solid ${filterSubject === "all" ? "#2563eb" : "#334155"}`, borderRadius: "12px", color: filterSubject === "all" ? "#2563eb" : "#94a3b8", fontSize: "10px", padding: "4px 9px", cursor: "pointer", fontFamily: "inherit" }}>All</button>
          {SUBJECTS.map(sub => (
            <button key={sub.id} onClick={() => setFilterSubject(sub.id)} style={{ background: filterSubject === sub.id ? `${sub.color}20` : "transparent", border: `1px solid ${filterSubject === sub.id ? sub.color : "#334155"}`, borderRadius: "12px", color: filterSubject === sub.id ? sub.color : "#94a3b8", fontSize: "10px", padding: "4px 9px", cursor: "pointer", fontFamily: "inherit" }}>{sub.shortName}</button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "4px", marginBottom: "20px", flexWrap: "wrap" }}>
          {allTags.map(tag => (
            <button key={tag} onClick={() => setFilterTag(tag)} style={{ background: filterTag === tag ? `${tagColor[tag]||"#94a3b8"}20` : "transparent", border: `1px solid ${filterTag === tag ? (tagColor[tag]||"#94a3b8") : "#334155"}`, borderRadius: "12px", color: filterTag === tag ? (tagColor[tag]||"#1e293b") : "#94a3b8", fontSize: "10px", padding: "4px 9px", cursor: "pointer", fontFamily: "inherit" }}>
              {tag === "all" ? "All Types" : tag}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ color: "#94a3b8", fontSize: "12px", textAlign: "center", padding: "40px" }}>No resources match your filters.</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "10px" }}>
            {filtered.map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                style={{ background: "#ffffff", border: "1px solid #f0f0f8", borderRadius: "12px", padding: "16px 18px", textDecoration: "none", display: "flex", flexDirection: "column", gap: "8px", boxShadow: "0 1px 4px rgba(15,23,42,0.06)" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = r.subjectColor + "60"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1e293b"}>
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                  {r.tag && <span style={{ fontSize: "10px", border: `1px solid ${(tagColor[r.tag]||"#94a3b8")}40`, borderRadius: "99px", padding: "1px 5px", color: tagColor[r.tag]||"#94a3b8" }}>{r.tag}</span>}
                  <span style={{ fontSize: "10px", border: `1px solid ${r.subjectColor}30`, borderRadius: "99px", padding: "1px 5px", color: r.subjectColor }}>{r.subjectName}</span>
                </div>
                <div style={{ color: "#1e293b", fontSize: "12px", fontWeight: 600 }}>{r.name}</div>
                <div style={{ color: "#94a3b8", fontSize: "10px", lineHeight: "1.5", flex: 1 }}>{r.desc}</div>
                <div style={{ color: r.subjectColor, fontSize: "10px" }}>↗ Open resource</div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LibraryMode