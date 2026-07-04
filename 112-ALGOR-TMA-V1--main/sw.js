const CACHE_NAME = '112-asistan-v42-ilac-tarayici';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './quiz-questions.js',
  './ilac-tarayici.js',
  './manifest.json',
  // Images
  './img/logo.jpg',
  './img/logo.png',
  './img/analogo.jpg',
  './img/ant.jpg',
  './img/nfr.jpg',
  './img/ven.jpg',
  './img/lateralmı.jpg',
  './img/STSEGMENT.JPG',
  './img/ekg1.jpg',
  './img/tp1.jpg',
  './img/tp2.jpg',
  './img/tp3.jpg',
  './img/svt1.jpg',
  './img/af1.jpg',
  './img/vt.jpg',
  './img/polvt.jpg',
  './img/yanik_yuzdesi.jpg',
  './img/yanik_cocuk.jpg',
  // Sounds - TÜM SES DOSYALARI
  './sound/beep.mp3',
  './sound/wheezing.mp3',
  './sound/ronkus.mp3',
  './sound/stridor.mp3',
  './sound/krup.mp3',
  './sound/ronküs.MP3',
  './sound/KABA RALLER .MP3',
  // Videos - TÜM VİDEOLAR
  './video/dekompresyon.mp4',
  './video/krikotomi.mp4',
  './video/io.mp4',
  './video/pace.mp4',
  './video/sync.mp4',
  './video/vagal.mp4',
  // PWA Icons
  './img/icons/pwa/icon-72x72.jpg',
  './img/icons/pwa/icon-96x96.jpg',
  './img/icons/pwa/icon-128x128.jpg',
  './img/icons/pwa/icon-144x144.jpg',
  './img/icons/pwa/icon-152x152.jpg',
  './img/icons/pwa/icon-192x192.jpg',
  './img/icons/pwa/icon-384x384.jpg',
  './img/icons/pwa/icon-512x512.jpg',
  './img/icons/maskable/maskable-192x192.jpg',
  './img/icons/maskable/maskable-512x512.jpg'
];

// Service Worker yüklendiğinde cache'i güncelle
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache).catch(err => {
        console.log('Cache yükleme hatası (bazı dosyalar eksik olabilir):', err);
      });
    })
  );
  self.skipWaiting(); // Yeni SW'yi hemen aktif et
});

// Eski cache'leri temizle
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Tüm clientları kontrol altına al
});

// Gelişmiş cache stratejisi: Cache-first with network fallback (TAM OFFLINE)
self.addEventListener('fetch', event => {
  // GET istekleri için cache stratejisi uygula
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        // Cache'de varsa hemen döndür (OFFLINE ÇALIŞIR)
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Cache'de yoksa network'ten getir ve cache'e kaydet
        return fetch(event.request).then(response => {
          // Sadece başarılı yanıtları cache'le
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }
          
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          
          return response;
        }).catch(() => {
          // Network hatası - offline sayfası döndür
          return new Response('Offline - İnternet bağlantınızı kontrol edin', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({ 'Content-Type': 'text/plain; charset=utf-8' })
          });
        });
      })
    );
  }
});