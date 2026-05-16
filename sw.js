// ⚡ 升級版本號，強制瀏覽器更新快取
const CACHE = 'conflict-navigator-v2'; 

// 🎯 精準對齊你專案中的所有實體檔案
const ASSETS = [
  './Navigate_final.html', // 修正：對齊 manifest 的 start_url
  './manifest.json',
  './chime.png',           // 修正：對齊實際的 PWA 圖示
  './H-bot.png',           // 新增：快取創作者頭貼，確保離線選單完美顯示
  'https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&display=swap',
];

/* Install: pre-cache core assets */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      // Cache what we can; font CDN may fail offline — that's fine
      return Promise.allSettled(
        ASSETS.map(url => cache.add(url).catch(() => {}))
      );
    })
  );
  // 強制立即生效
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
  // Only handle GET, skip cross-origin API calls
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        // Cache successful same-origin responses
        if (response.ok && e.request.url.startsWith(self.location.origin)) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback for navigation requests
        if (e.request.mode === 'navigate') {
          // 修正：離線時正確導向 final 版 HTML
          return caches.match('./Navigate_final.html'); 
        }
      });
    })
  );
});
