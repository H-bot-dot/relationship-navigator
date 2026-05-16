// ⚡ 升級版本號至 v4，強制瀏覽器更新快取
const CACHE = 'conflict-navigator-v4'; 

// 🎯 精準對齊：將具體檔名改為 './'，避免因為本地檔名改變（如括號數字）導致快取失敗
const ASSETS = [
  './',                  // 自動對齊根目錄（不論主檔名是 index 還是 Navigate_final）
  './manifest.json',
  './chime.png',           
  './H-bot.png',           
  'https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&display=swap',
];

/* Install: pre-cache core assets */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      return Promise.allSettled(
        ASSETS.map(url => cache.add(url).catch(() => {}))
      );
    })
  );
  self.skipWaiting();
});

/* Activate: clear old caches */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* Fetch: cache-first, network fallback */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        if (response.ok && e.request.url.startsWith(self.location.origin)) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return response;
      }).catch(() => {
        if (e.request.mode === 'navigate') {
          return caches.match('./'); 
        }
      });
    })
  );
});
