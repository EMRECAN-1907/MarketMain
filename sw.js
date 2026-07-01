/* Akıllı Alışveriş Listesi — Service Worker
   Strateji: cache-first. İlk açılıştan sonra uygulama çevrimdışı çalışır.
   Uygulamayı güncellediğinde sürümü artır (v1 -> v2). */

const CACHE = 'alisveris-v6';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-48.png',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];
// PDF kütüphanesi (çevrimdışı da çalışsın diye en iyi çabayla önbelleğe alınır)
const EXTRA = [
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS);
    // CDN başarısız olursa kurulum bozulmasın
    await Promise.all(EXTRA.map((u) => cache.add(u).catch(() => {})));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;
    try {
      const resp = await fetch(event.request);
      if (resp && resp.status === 200) {
        const copy = resp.clone();
        const cache = await caches.open(CACHE);
        cache.put(event.request, copy);
      }
      return resp;
    } catch (e) {
      // çevrimdışı ve önbellekte yoksa: gezinme isteklerinde uygulamayı ver
      if (event.request.mode === 'navigate') return caches.match('./index.html');
      throw e;
    }
  })());
});
