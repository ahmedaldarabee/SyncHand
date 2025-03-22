    self.addEventListener("install", (event) => {
        console.log("Service Worker installed");
        event.waitUntil(
        caches.open("synchand-cache").then((cache) => {
            return cache.addAll([
            "/",
            "/favicon.png",
            "/manifest.json",
            "/offline.html",
            ]);
        })
        );
    });
    
    self.addEventListener("fetch", (event) => {
        event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
        );
    });
    