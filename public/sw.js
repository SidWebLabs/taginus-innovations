// Minimal, dependency-free service worker: offline fallback + cached static assets.
const V = "taginus-v2";
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(V).then((c) => c.addAll(["/offline"])));
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (r.method !== "GET") return;
  const u = new URL(r.url);
  if (u.origin !== self.location.origin) return;
  if (r.mode === "navigate") {
    e.respondWith(
      fetch(r).then((res) => { const c = res.clone(); caches.open(V).then((x) => x.put(r, c)); return res; })
        .catch(() => caches.match(r).then((m) => m || caches.match("/offline")))
    );
    return;
  }
  if (u.pathname.startsWith("/_next/static") || u.pathname.startsWith("/icons") || u.pathname.startsWith("/images")) {
    e.respondWith(caches.match(r).then((m) => m || fetch(r).then((res) => { const c = res.clone(); caches.open(V).then((x) => x.put(r, c)); return res; })));
  }
});
