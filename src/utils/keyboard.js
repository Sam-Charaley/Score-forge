// Page-level keyboard shortcuts must not hijack typing or another control's
// own keys. These helpers say which keystrokes a page may take.

const TEXT_ENTRY_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT']);
const ACTIVATABLE_SELECTOR = 'button, a[href], [role="button"], [role="tab"], [role="checkbox"], [role="radio"], summary';

export function hasModifier(event) {
  return event.metaKey || event.ctrlKey || event.altKey;
}

export function isTypingTarget(target) {
  return target instanceof HTMLElement && (TEXT_ENTRY_TAGS.has(target.tagName) || target.isContentEditable);
}

// Space and Enter activate whatever control has focus. A page may only take
// them when focus is on the page itself or inside one of its own regions
// (marked with ownSelector).
export function mayTakeActivationKey(target, ownSelector) {
  if (!(target instanceof HTMLElement) || target === document.body) return true;
  if (ownSelector && target.closest(ownSelector)) return true;
  return !isTypingTarget(target) && !target.closest(ACTIVATABLE_SELECTOR);
}
