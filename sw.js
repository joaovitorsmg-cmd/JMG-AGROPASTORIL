/* =====================================================
   SERVICE WORKER — Painel Representante Agroquima
   Permite funcionamento OFFLINE após primeiro acesso
   ===================================================== */
const CACHE = 'jmg-painel-v1';
const ARQUIVOS = [
  './',
  './index.html'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ARQUIVOS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Chat (API Anthropic) sempre vai pela rede — nunca cacheia
  if(e.request.url.includes('api.anthropic.com')){
    e.respondWith(fetch(e.request));
    return;
  }
  // Todo o resto: cache-first (funciona offline)
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
