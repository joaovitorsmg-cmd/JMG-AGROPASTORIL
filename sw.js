/* =====================================================
   SERVICE WORKER — Painel Representante Agroquima
   Permite funcionamento OFFLINE após primeiro acesso
   ===================================================== */
const CACHE = 'jmg-painel-v6';
const ARQUIVOS = [
  './',
  './index.html',
  './produtos-base.js',
  './logo-jmg-pedido.png',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ARQUIVOS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Chat (API Anthropic) sempre vai pela rede — nunca cacheia
  if(e.request.url.includes('api.anthropic.com')){
    e.respondWith(fetch(e.request));
    return;
  }
  // Navegação/HTML: network-first — garante que a versão nova publicada
  // sempre é usada primeiro; cache é só um fallback para modo offline.
  if(e.request.mode === 'navigate' || e.request.url.endsWith('.html') || e.request.url.endsWith('/')){
    e.respondWith(
      fetch(e.request)
        .then(resp => {
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
          return resp;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }
  // Demais arquivos (ícones, manifest, libs CDN etc.): cache-first,
  // mas guarda a resposta da rede para realmente funcionar offline depois.
  e.respondWith(
    caches.match(e.request).then(cached => {
      if(cached) return cached;
      return fetch(e.request).then(resp => {
        if(resp && resp.status === 200){
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return resp;
      }).catch(() => cached);
    })
  );
});
