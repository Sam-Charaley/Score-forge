import { Check } from 'lucide-react'

// An answer-sheet bubble that shades in with pencil when checked.
export default function CheckBubble({ checked }) {
  return (
    <span className={`check-bubble${checked ? ' is-checked' : ''}`} aria-hidden="true">
      <Check />
    </span>
  );
}
