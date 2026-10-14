import { useLayoutEffect } from 'react'

// Scrolls a sideways-scrolling row so its active child sits in the middle.
// Only the row scrolls; scrollIntoView would also move the page.
// The row must be the offsetParent of its children (position: relative).
export function useCenterActiveChild(rowRef, activeSelector, activeKey) {
  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row || row.scrollWidth <= row.clientWidth) return;
    const active = row.querySelector(activeSelector);
    if (!active) return;
    const activeCenter = active.offsetLeft + active.offsetWidth / 2;
    row.scrollLeft = Math.max(0, activeCenter - row.clientWidth / 2);
  }, [rowRef, activeSelector, activeKey]);
}
