const CACHE_NAME = 'resepkopi-v1';
const urlsToCache = [
  '/',
  '/resepkopi/',
  '/resepkopi/index.html',
  '/resepkopi/css/style.css',
  // tambahkan asset penting: logo, gambar header, js
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(keyList.map(key => {
        if (!cacheWhitelist.includes(key)) return caches.delete(key);
      }))
    )
  );
});

