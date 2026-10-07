const CACHE = 'chamdaeng-v8';
const ASSETS = [
  './', './index.html', './style.css', './app.js', './data.js', './cloud.js', './places.js',
  './manifest.webmanifest', './img/taiwan-cat.webp',
  './icons/icon-192.png', './icons/icon-512.png',
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.allSettled(ASSETS.map(a => c.add(a)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname.endsWith('.supabase.co')) return;
  // Google Maps manages its own online resources.
  if (url.hostname === 'www.google.com' || url.hostname.endsWith('.googleapis.com') || url.hostname.endsWith('.gstatic.com')) return;
  // 환율 API는 항상 네트워크
  if (url.host.includes('er-api.com')) return;
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok && (url.origin === location.origin || /fonts|unpkg|jsdelivr/.test(url.host))) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
