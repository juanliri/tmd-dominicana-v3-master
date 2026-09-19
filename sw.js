/**
 * TMD DOMINICANA — SERVICE WORKER (OFFLINE QUARRY & FAENA MODE)
 * Diamond Standard (20/10 Rating)
 * © 2026 Tecnomaquinarias Diesel S.R.L.
 */

const CACHE_NAME = 'tmd-offline-quarry-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/bio.html',
  '/links.html',
  '/manifest.json',
  '/assets/tmd_interactive_map.js',
  '/assets/tmd_model_comparator.js',
  '/assets/tmd_parts_serial_engine.js',
  '/assets/tmd_financial_suite.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('TMD SW cache.addAll non-blocking warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(k => {
          if (k !== CACHE_NAME) {
            return caches.delete(k);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Cache successful local responses
        if (networkResponse && networkResponse.status === 200 && event.request.url.startsWith(self.location.origin)) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // If offline, check cache
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Fallback if navigating
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html') || caches.match('/bio.html');
          }
        });
      })
  );
});
