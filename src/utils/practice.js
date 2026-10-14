// Chooses the next practice question. Phase 2 keeps this simple and
// predictable; Phase 3 replaces it with weakness-driven selection.
//
// Priority: questions never seen, then questions most recently answered
// wrong, then everything else. Never repeats the question just shown unless
// it's the only one left.
export function pickNextQuestion(pool, attempts, previousQuestionId = null, random = Math.random) {
  if (pool.length === 0) return null;
  const candidates = pool.length > 1 ? pool.filter(q => q.id !== previousQuestionId) : pool;

  const lastResultById = new Map();
  for (const attempt of attempts) lastResultById.set(attempt.question_id, attempt.correct);

  const unseen = candidates.filter(q => !lastResultById.has(q.id));
  const missedLastTime = candidates.filter(q => lastResultById.get(q.id) === false);
  const tier = [unseen, missedLastTime, candidates].find(group => group.length > 0);
  return tier[Math.floor(random() * tier.length)];
}

// Tab-visible time only: switching tabs or locking the phone shouldn't count
// as thinking time. Create one timer per question; read elapsedMs() on submit.
export const MAX_ATTEMPT_MS = 60 * 60 * 1000;

export function createVisibleTimer(doc = document, now = () => performance.now()) {
  let visibleSince = doc.visibilityState === 'visible' ? now() : null;
  let accumulated = 0;
  const onVisibilityChange = () => {
    if (doc.visibilityState === 'visible') visibleSince = now();
    else if (visibleSince !== null) { accumulated += now() - visibleSince; visibleSince = null; }
  };
  doc.addEventListener('visibilitychange', onVisibilityChange);
  return {
    elapsedMs() {
      const running = visibleSince !== null ? now() - visibleSince : 0;
      return Math.min(Math.round(accumulated + running), MAX_ATTEMPT_MS);
    },
    stop() { doc.removeEventListener('visibilitychange', onVisibilityChange); },
  };
}

// The order a question's choices are shown in, as indexes into q.choices.
// Shuffled per showing so the right answer's letter carries no signal (the
// authored banks lean toward A and B). Saved attempts keep the authored
// index, so ratings and history never depend on the display order.
// A question with fixedOrder: true (say "I only / II only / I and II") keeps
// its authored order.
export function choiceDisplayOrder(question, random = Math.random) {
  const order = question.choices.map((_, i) => i);
  if (question.fixedOrder) return order;
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}
