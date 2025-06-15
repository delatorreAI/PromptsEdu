const CACHE_NAME = 'v1';
const FILES_TO_CACHE = [
  '/',
  'index.html',
  'css/main.css',
  'css/vintage-1942.css',
  'css/responsive.css',
  'js/historical-data.js',
  'js/family-system.js',
  'js/market-system.js',
  'js/events-system.js',
  'js/ui-controller.js',
  'js/game-engine.js'
  // Add new files here to make sure they're cached
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});
