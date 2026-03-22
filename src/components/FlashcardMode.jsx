import React from 'react'
import { FLASHCARDS } from '../data/flashcards'

function FlashcardMode({ subject, onBack }) {
  const cards = FLASHCARDS[subject.id] || [];
  const [deck, setDeck] = React.useState(() => [...cards]);
  const [idx, setIdx] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const [known, setKnown] = React.useState(new Set());
  const [unknown, setUnknown] = React.useState(new Set());
  const [finished, setFinished] = React.useState(false);

  const card = deck[idx];
  const progress = deck.length > 0 ? Math.round(((known.size + unknown.size) / cards.length) * 100) : 0;

  const shuffle = () => {
    setDeck([...cards].sort(() => Math.random() - 0.5));
    setIdx(0); setFlipped(false); setKnown(new Set()); setUnknown(new Set()); setFinished(false);
  };

  const reviewUnknown = () => {
    const missed = cards.filter((_, i) => unknown.has(i));
    if (!missed.length) return;
    setDeck(missed.sort(() => Math.random() - 0.5));
    setIdx(0); setFlipped(false); setKnown(new Set()); setUnknown(new Set()); setFinished(false);
  };

  const mark = (isKnown) => {
    const cardIdx = cards.indexOf(card);
    if (isKnown) setKnown(prev => new Set([...prev, cardIdx]));
    else setUnknown(prev => new Set([...prev, cardIdx]));
    if (idx + 1 >= deck.length) setFinished(true);
    else { setIdx(i => i + 1); setFlipped(false); }
  };

  if (!card && !finished) return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: "13px" }}>
      No flashcards yet for {subject.name}.
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: "640px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button onClick={onBack} style={{ background: "transparent", border: "1px solid #f1f5f9", borderRadius: "8px", color: "#94a3b8", background: "#ffffff", fontSize: "10px", padding: "5px 10px", cursor: "pointer", fontFamily: "inherit" }}>← Back</button>
          <span style={{ color: subject.color, fontSize: "13px", fontWeight: 700 }}>🃏 {subject.shortName} Flashcards</span>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <button onClick={shuffle} style={{ background: "transparent", border: `1px solid ${subject.color}50`, borderRadius: "12px", color: subject.color, fontSize: "10px", padding: "5px 10px", cursor: "pointer", fontFamily: "inherit" }}>⟳ Shuffle</button>
          {unknown.size > 0 && <button onClick={reviewUnknown} style={{ background: "#fff5f5", border: "1.5px solid #f8717160", borderRadius: "12px", color: "#dc2626", fontSize: "11px", padding: "5px 10px", cursor: "pointer", fontFamily: "inherit" }}>Review Missed ({unknown.size})</button>}
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: "640px", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
          <span style={{ color: "#94a3b8", fontSize: "10px" }}>{idx + 1} / {deck.length}</span>
          <span style={{ color: "#94a3b8", fontSize: "10px" }}>
            <span style={{ color: "#16a34a" }}>✓ {known.size}</span> · <span style={{ color: "#dc2626" }}>✗ {unknown.size}</span>
          </span>
        </div>
        <div style={{ height: "4px", background: "#334155", borderRadius: "2px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: subject.color, borderRadius: "2px", transition: "width 0.3s" }} />
        </div>
      </div>

      {finished ? (
        <div style={{ maxWidth: "640px", width: "100%", background: "#1e293b", border: `1px solid ${subject.color}40`, borderRadius: "8px", padding: "40px 32px", textAlign: "center" }}>
          <div style={{ fontSize: "36px", marginBottom: "12px" }}>🎉</div>
          <div style={{ color: subject.color, fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>Deck Complete!</div>
          <div style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "24px" }}>
            <span style={{ color: "#16a34a" }}>✓ {known.size} known</span> · <span style={{ color: "#dc2626" }}>✗ {unknown.size} need review</span>
          </div>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={shuffle} style={{ background: `${subject.color}18`, border: `1px solid ${subject.color}`, borderRadius: "10px", color: subject.color, fontSize: "11px", padding: "9px 20px", cursor: "pointer", fontFamily: "inherit" }}>Reshuffle All</button>
            {unknown.size > 0 && <button onClick={reviewUnknown} style={{ background: "#fff5f5", border: "1.5px solid #f87171", borderRadius: "10px", color: "#dc2626", fontSize: "11px", padding: "9px 20px", cursor: "pointer", fontFamily: "inherit" }}>Review {unknown.size} Missed</button>}
          </div>
        </div>
      ) : (
        <>
          <div onClick={() => setFlipped(f => !f)} style={{ width: "100%", maxWidth: "640px", minHeight: "220px", background: flipped ? `${subject.color}12` : "#1e293b", border: `1px solid ${flipped ? subject.color + "60" : "#334155"}`, borderRadius: "8px", padding: "32px 36px", cursor: "pointer", transition: "all 0.2s", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ color: "#94a3b8", fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "16px" }}>
              {flipped ? "✦ ANSWER" : "QUESTION — tap to flip"}
            </div>
            <div style={{ color: flipped ? subject.color : "#334155", fontSize: "15px", lineHeight: "1.8", flex: 1, display: "flex", alignItems: "center", fontWeight: 500 }}>
              {flipped ? card.back : card.front}
            </div>
            {!flipped && <div style={{ color: "#334155", fontSize: "11px", marginTop: "20px", textAlign: "center" }}>tap anywhere on card to reveal answer</div>}
          </div>

          {flipped && (
            <div style={{ display: "flex", gap: "12px", marginTop: "18px", width: "100%", maxWidth: "640px" }}>
              <button onClick={() => mark(false)} style={{ flex: 1, background: "#fff5f5", border: "1.5px solid #f87171", borderRadius: "10px", color: "#dc2626", fontSize: "12px", padding: "12px", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>✗ Still learning</button>
              <button onClick={() => mark(true)} style={{ flex: 1, background: "#f0fdf4", border: "1px solid #4ade8040", borderRadius: "10px", color: "#16a34a", fontSize: "12px", padding: "12px", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>✓ Got it</button>
            </div>
          )}

          <div style={{ display: "flex", gap: "4px", marginTop: "20px", flexWrap: "wrap", justifyContent: "center", maxWidth: "640px" }}>
            {deck.map((_, i) => {
              const origIdx = cards.indexOf(deck[i]);
              const isKnown = known.has(origIdx), isUnknown = unknown.has(origIdx), isCurrent = i === idx;
              return <div key={i} style={{ width: isCurrent ? "18px" : "8px", height: "8px", borderRadius: "4px", background: isCurrent ? subject.color : isKnown ? "#4ade8060" : isUnknown ? "#f8717160" : "#334155", transition: "all 0.2s", cursor: "pointer" }} onClick={() => { setIdx(i); setFlipped(false); }} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default FlashcardMode