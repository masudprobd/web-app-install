self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open('pwa-cache').then(cache => {
      console.log('Caching files...');
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/images/icons-192.png',
        '/images/icons-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  console.log('Fetching:', event.request.url);
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
