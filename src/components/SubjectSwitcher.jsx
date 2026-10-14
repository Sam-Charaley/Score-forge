import { useRef } from 'react'
import { useCenterActiveChild } from '../hooks/useCenterActiveChild'

// One scrolling row of subject chips for screens that show one subject at a time.
export default function SubjectSwitcher({ subjects, activeId, onSelect, label = 'Subject' }) {
  const rowRef = useRef(null);

  useCenterActiveChild(rowRef, '[aria-pressed="true"]', activeId);

  if (subjects.length < 2) return null;
  return (
    <div className="subject-switcher">
      <div ref={rowRef} className="subject-switcher-row" role="group" aria-label={label}>
        {subjects.map(s => (
          <button key={s.id} type="button" className="chip" aria-pressed={s.id === activeId} onClick={() => onSelect(s.id)} style={{ '--subject': s.color }}>
            <span className="chip-dot" aria-hidden="true" />
            {s.shortName}
          </button>
        ))}
      </div>
    </div>
  );
}
