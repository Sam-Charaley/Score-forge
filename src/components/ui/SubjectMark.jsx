// The subject's tile: its short code set in type, tinted with its colour.
// Font size steps down with the longest word so every code fits the tile.
const SCALE_BY_LONGEST_WORD = { 1: .42, 2: .4, 3: .34, 4: .29, 5: .25 };
const SMALLEST_SCALE = SCALE_BY_LONGEST_WORD[5];
const SIZE_CLASS = { small: 'subject-mark-small', medium: '', large: 'subject-mark-large' };

export default function SubjectMark({ subject, size = 'medium' }) {
  const words = subject.code.split(' ');
  const longestWord = Math.max(...words.map(w => w.length));
  const scale = SCALE_BY_LONGEST_WORD[longestWord] ?? SMALLEST_SCALE;
  return (
    <span className={`subject-mark ${SIZE_CLASS[size]}`.trim()} style={{ '--subject': subject.color, '--mark-scale': scale }} aria-hidden="true">
      <span>{words.map(word => <span key={word} style={{ display: 'block' }}>{word}</span>)}</span>
    </span>
  );
}
