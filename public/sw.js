const CACHE = 'score-forge-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  // Only cache GET requests to same origin in production
  if (
    e.request.method !== 'GET' ||
    e.request.url.includes('localhost') ||
    e.request.url.includes('supabase') ||
    e.request.url.includes('fonts.googleapis') ||
    e.request.url.includes('@vite') ||
    e.request.url.includes('@react')
  ) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});