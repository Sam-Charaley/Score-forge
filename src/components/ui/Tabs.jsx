import { useLayoutEffect, useRef, useState } from 'react'

export const tabId = (idPrefix, id) => `${idPrefix}-tab-${id}`;
export const panelId = (idPrefix, id) => `${idPrefix}-panel-${id}`;

const TAB_SCROLL_MARGIN_PX = 24;
const KEY_STEPS ={ ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

// Segmented tabs with a marker that slides to the selected tab.
// tabs: [{ id, label, icon? }]. Pair with <TabPanel> for the content.
export default function Tabs({ tabs, active, onChange, idPrefix, label, block = false, className = '' }) {
  const listRef = useRef(null);
  const [marker, setMarker] = useState(null);

  // Measure after layout, and again whenever any tab changes size
  // (web fonts arriving, the window resizing, labels changing).
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    const place = () => {
      const selected = list.querySelector('[aria-selected="true"]');
      if (!selected) { setMarker(null); return; }
      setMarker({ left: selected.offsetLeft, width: selected.offsetWidth });
    };
    place();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(place);
    observer.observe(list);
    list.querySelectorAll('[role="tab"]').forEach(tab => observer.observe(tab));
    return () => observer.disconnect();
  }, [active, tabs.length]);

  // Keep the selected tab visible when the strip scrolls sideways on phones.
  useLayoutEffect(() => {
    // Scrolls only the strip itself; scrollIntoView could also move the page.
    const list = listRef.current;
    const selected = list?.querySelector('[aria-selected="true"]');
    if (!selected) return;
    const overflowRight = selected.offsetLeft + selected.offsetWidth - (list.scrollLeft + list.clientWidth);
    if (overflowRight > 0) list.scrollLeft += overflowRight + TAB_SCROLL_MARGIN_PX;
    else if (selected.offsetLeft < list.scrollLeft) list.scrollLeft = Math.max(0, selected.offsetLeft - TAB_SCROLL_MARGIN_PX);
  }, [active]);

  const focusTab = index => {
    const next = tabs[(index + tabs.length) % tabs.length];
    onChange(next.id);
    document.getElementById(tabId(idPrefix, next.id))?.focus();
  };
  const onKeyDown = (e, index) => {
    if (KEY_STEPS[e.key]) { e.preventDefault(); focusTab(index + KEY_STEPS[e.key]); }
    else if (e.key === 'Home') { e.preventDefault(); focusTab(0); }
    else if (e.key === 'End') { e.preventDefault(); focusTab(tabs.length - 1); }
  };

  return (
    <div ref={listRef} role="tablist" aria-label={label} className={`tabs${block ? ' tabs-block' : ''} ${className}`.trim()}>
      {marker && (
        <span
          className="tabs-indicator"
          style={{ '--indicator-left': `${marker.left}px`, '--indicator-width': `${marker.width}px` }}
          aria-hidden="true"
        />
      )}
      {tabs.map((tab, index) => {
        const selected = tab.id === active;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id} type="button" role="tab" className="tab"
            id={tabId(idPrefix, tab.id)} aria-selected={selected} aria-controls={panelId(idPrefix, tab.id)}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)} onKeyDown={e => onKeyDown(e, index)}
          >
            {Icon && <Icon aria-hidden="true" />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({ idPrefix, id, children, className = '' }) {
  return (
    <div role="tabpanel" id={panelId(idPrefix, id)} aria-labelledby={tabId(idPrefix, id)} className={className} tabIndex={0}>
      {children}
    </div>
  );
}
