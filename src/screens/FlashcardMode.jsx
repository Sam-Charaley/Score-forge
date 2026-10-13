import { useState } from 'react'
import { C } from '../theme'
import Btn from '../components/Btn'
import { useIsMobile } from '../hooks/useIsMobile'
import { FLASHCARDS } from '../data/flashcards'

export default function FlashcardMode({ subject, mySubjects, onBack, onSubject }) {
  const isMobile = useIsMobile();
  const cards = FLASHCARDS[subject.id] || [];
  const [deck, setDeck] = useState(() => [...cards]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(new Set());
  const [unknown, setUnknown] = useState(new Set());
  const [finished, setFinished] = useState(false);

  const card = deck[idx];
  const progress = deck.length > 0 ? Math.round(((known.size + unknown.size) / Math.max(cards.length, 1)) * 100) : 0;
  const shuffle = () => { setDeck([...cards].sort(() => Math.random() - 0.5)); setIdx(0); setFlipped(false); setKnown(new Set()); setUnknown(new Set()); setFinished(false); };
  const reviewUnknown = () => { const missed = cards.filter((_, i) => unknown.has(i)); if (!missed.length) return; setDeck(missed.sort(() => Math.random() - 0.5)); setIdx(0); setFlipped(false); setKnown(new Set()); setUnknown(new Set()); setFinished(false); };
  const mark = (isKnown) => {
    const cardIdx = cards.indexOf(card);
    if (isKnown) setKnown(prev => new Set([...prev, cardIdx]));
    else setUnknown(prev => new Set([...prev, cardIdx]));
    if (idx + 1 >= deck.length) setFinished(true);
    else { setIdx(i => i + 1); setFlipped(false); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: C.bg }}>
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: '0 20px', height: '54px', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', color: C.text2 }}>← Back</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: subject.color }} />
          <span style={{ color: subject.color, fontSize: '13px', fontWeight: 700 }}>🃏 {subject.shortName} Flashcards</span>
          <span style={{ color: C.muted, fontSize: '11px' }}>· {cards.length} cards</span>
        </div>
        <div style={{ display: 'flex', gap: '5px', marginLeft: '10px' }}>
          {mySubjects.map(s => (
            <button key={s.id} onClick={() => onSubject(s.id)} style={{ background: s.id === subject.id ? `${s.color}12` : 'transparent', border: `1px solid ${s.id === subject.id ? s.color : C.border}`, borderRadius: '8px', padding: '3px 9px', cursor: 'pointer', color: s.id === subject.id ? s.color : C.muted, fontSize: '10px', fontFamily: 'inherit', fontWeight: s.id === subject.id ? 700 : 400 }}>{s.shortName}</button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
          <button onClick={shuffle} style={{ background: 'transparent', border: `1px solid ${subject.color}40`, borderRadius: '10px', color: subject.color, fontSize: '11px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit' }}>⟳ Shuffle</button>
          {unknown.size > 0 && <button onClick={reviewUnknown} style={{ background: C.redLight, border: `1px solid ${C.redMid}`, borderRadius: '10px', color: C.red, fontSize: '11px', padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit' }}>Review Missed ({unknown.size})</button>}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '16px 12px' : '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: isMobile ? '80px' : '28px' }}>
        <div style={{ width: '100%', maxWidth: '620px', marginBottom: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ color: C.muted, fontSize: '11px' }}>{Math.min(idx + 1, deck.length)} / {deck.length}</span>
            <span style={{ fontSize: '11px' }}><span style={{ color: '#166534' }}>✓ {known.size}</span> · <span style={{ color: C.red }}>✗ {unknown.size}</span></span>
          </div>
          <div style={{ height: '5px', background: C.bg3, borderRadius: '99px', overflow: 'hidden', border: `1px solid ${C.border}` }}>
            <div style={{ height: '100%', width: `${progress}%`, background: subject.color, borderRadius: '99px' }} />
          </div>
        </div>

        {finished ? (
          <div style={{ maxWidth: '620px', width: '100%', background: C.white, border: `1px solid ${C.border}`, borderRadius: '20px', padding: '40px 32px', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎉</div>
            <div style={{ fontFamily: "'Playfair Display', serif", color: subject.color, fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Deck Complete!</div>
            <div style={{ color: C.muted, fontSize: '13px', marginBottom: '24px' }}><span style={{ color: '#166534' }}>✓ {known.size} known</span> · <span style={{ color: C.red }}>✗ {unknown.size} need review</span></div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <Btn onClick={shuffle} variant="ghost">Reshuffle All</Btn>
              {unknown.size > 0 && <Btn onClick={reviewUnknown} variant="soft">Review {unknown.size} Missed</Btn>}
            </div>
          </div>
        ) : card ? (
          <>
            <div onClick={() => setFlipped(f => !f)} style={{ width: '100%', maxWidth: '620px', minHeight: '220px', background: flipped ? `${subject.color}08` : C.white, border: `1.5px solid ${flipped ? subject.color + '50' : C.border}`, borderRadius: '20px', padding: '32px 36px', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 12px rgba(28,16,9,0.06)' }}>
              <div style={{ color: C.muted, fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '16px' }}>{flipped ? '✦ ANSWER' : 'QUESTION — tap to flip'}</div>
              <div style={{ color: flipped ? subject.color : C.text, fontSize: '15px', lineHeight: '1.8', flex: 1, display: 'flex', alignItems: 'center', fontWeight: flipped ? 400 : 500 }}>{flipped ? card.back : card.front}</div>
              {!flipped && <div style={{ color: C.muted, fontSize: '11px', marginTop: '20px', textAlign: 'center' }}>tap anywhere to reveal</div>}
            </div>
            {flipped && (
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px', width: '100%', maxWidth: '620px' }}>
                <button onClick={() => mark(false)} style={{ flex: 1, background: C.redLight, border: `1.5px solid ${C.redMid}`, borderRadius: '12px', color: C.red, fontSize: '13px', padding: '12px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>✗ Still learning</button>
                <button onClick={() => mark(true)} style={{ flex: 1, background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px', color: '#166534', fontSize: '13px', padding: '12px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>✓ Got it</button>
              </div>
            )}
            <div style={{ display: 'flex', gap: '4px', marginTop: '18px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '620px' }}>
              {deck.map((_, i) => {
                const origIdx = cards.indexOf(deck[i]);
                return <div key={i} onClick={() => { setIdx(i); setFlipped(false); }} style={{ width: i === idx ? '18px' : '8px', height: '8px', borderRadius: '4px', background: i === idx ? subject.color : known.has(origIdx) ? '#4ADE8060' : unknown.has(origIdx) ? `${C.red}60` : C.bg3, cursor: 'pointer' }} />;
              })}
            </div>
          </>
        ) : (
          <div style={{ color: C.muted, fontSize: '13px' }}>No flashcards for {subject.name} yet.</div>
        )}
      </div>
    </div>
  );
}
