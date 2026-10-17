// Pass-through worker: it exists so the app stays installable, and answers no
// requests itself. Every request, including localhost and Supabase, goes
// straight to the network.
//
// The previous version answered requests from the cache but never wrote to it,
// and never deleted old caches, so a phone holding caches from an even older
// build could keep being served stale files. Activating this version clears
// them.
//
// Bump this whenever the worker changes: browsers only install a new worker
// when the file's bytes change.
const SW_VERSION = 'score-forge-v2';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(names.map(name => caches.delete(name))))
      .catch(error => console.warn(`[${SW_VERSION}] Couldn't clear old caches:`, error))
      .then(() => self.clients.claim())
  );
});
