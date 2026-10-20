// A source that questions refer to: a primary-source excerpt, a document in a
// DBQ, or a short data passage. The citation always shows: students use it
// for sourcing, and it records where the text came from (public domain or
// written for ScoreForge).
export default function SourcePassage({ label, text, citation }) {
  return (
    <figure className="source-passage">
      {label && <span className="label source-label">{label}</span>}
      <blockquote className="source-text">{text}</blockquote>
      <figcaption className="source-citation">{citation}</figcaption>
    </figure>
  );
}
