const CACHE_NAME = 'chiaosheng-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://i.postimg.cc/TPZNwhL8/wei-ming-ming-she-ji-1-yi-bian-ji.png'
];

// 安裝並快取檔案
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 離線狀態下攔截請求，優先讀取快取
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
