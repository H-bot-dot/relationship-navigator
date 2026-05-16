// ⚡ 1. 魔法在這裡：版本號升級為 v2！這會強制瀏覽器清空舊快取
const CACHE = 'conflict-navigator-v2'; 

// ⚡ 2. 請確認這裡的 HTML 檔名是你伺服器上「最新的那個檔案」
// (如果你把它改名為 index.html 了，請把下面兩處都改成 './index.html')
const ASSETS = [
  './Navigate_final.html', // 👈 請確認檔名正確
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
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
  // 強制新的 Service Worker 立即啟動，不要等下次重開瀏覽器
  self.skipWaiting();
});

/* Activate: clear old caches */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      // 這裡會把不是 'conflict-navigator-v2' 的舊版本全部刪除乾淨！
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  // 讓新的 Service Worker 立刻接管目前的網頁
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
          // ⚡ 3. 如果離線，退回的預設檔案（請確保跟 ASSETS 裡的檔名一致）
          return caches.match('./Navigate_final.html'); 
        }
      });
    })
  );
});
