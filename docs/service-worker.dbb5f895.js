const e=["/INFO-5146-PWA","/INFO-5146-PWA/index.html","/INFO-5146-PWA/style.css","/INFO-5146-PWA/app.js","/INFO-5146-PWA/manifest.json"];self.addEventListener("install",t=>{t.waitUntil(caches.open("to-do-pwa-cache-v1").then(t=>t.addAll(e)))}),self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(t=>t||fetch(e.request)))});
//# sourceMappingURL=service-worker.dbb5f895.js.map
