/* ============================================================
   LORDS Hub — service worker (stale-while-revalidate, same-origin)
   Troque o sufixo do CACHE a cada release pra invalidar o antigo.
   ============================================================ */
const CACHE = "lords-hub-v20260927b";
const CORE = [
  "hub.html",
  "prospeccao.html",
  "hub.css?v=20260917a",
  "hub.js?v=20260917a",
  "products-data.js?v=20260927a",
  "manifest.webmanifest?v=20260927a",
  "assets/favicon.svg",
  "icon-192.png",
  "icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()).catch(() => {}));
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // não mexe em fontes/CDN externos
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req);
    const network = fetch(req).then((res) => {
      if (res && res.status === 200 && res.type === "basic") cache.put(req, res.clone());
      return res;
    }).catch(() => cached);
    return cached || network;
  })());
});
