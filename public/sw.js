self.addEventListener("install", event => {
	event.waitUntil(
		caches.open("pwa-cache").then(cache => {
			return cache.addAll([]);
		})
	)
});

self.addEventListener("activate", event => { });


// NOTE: In development, we don't want to cache anything
self.addEventListener("fetch", event => {
	event.respondWith(
		fetch(event.request).then(response => {
			// Check if we received a valid response
			if (!response || response.status !== 200 || response.type !== "basic") {
				return response;
			}
			// Clone the response
			const clonedResponse = response.clone();
			// Open the cache and add the cloned response
			caches.open("pwa-cache").then(cache => {
				cache.put(event.request, clonedResponse);
			});
			return response;
		}).catch(error => {
			return caches.match(event.request);
		})
	);
});