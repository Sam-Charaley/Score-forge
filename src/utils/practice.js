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
