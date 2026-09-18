const CACHE_NAME = "my-notes-v1";

const FILES = [
    "./",
    "./index.html",
    "./newNote.html",
    "./css/stil.css",
    "./js/skripta.js",
    "./manifest.json"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(FILES);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});