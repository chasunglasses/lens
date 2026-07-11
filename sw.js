const CACHE_NAME = 'chiaosheng-v2';
const ASSETS = [
  './index.html',
  './manifest.json',
  'https://i.postimg.cc/TPZNwhL8/wei-ming-ming-she-ji-1-yi-bian-ji.png'
];

// 安裝並快取檔案（增加防轉址處理）
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        ASSETS.map((url) => {
          // 對於外連或可能轉址的資源，強制允許追蹤轉址後再寫入快取
          return fetch(new Request(url, { redirect: 'follow' }))
            .then((response) => {
              if (!response.ok) {
                throw new TypeError('Request failed for: ' + url);
              }
              return cache.put(url, response);
            })
            .catch((err) => console.error('快取失敗的網址:', url, err));
        })
      );
    })
  );
});

// 啟用時清除舊快取
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// 攔截請求
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
