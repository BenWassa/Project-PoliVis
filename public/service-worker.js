// Version is auto-generated during build - DO NOT EDIT MANUALLY
const APP_VERSION = '__APP_VERSION__';
const CACHE_NAME = `polivis-cache-${APP_VERSION}`;

// Cache duration settings
const CACHE_MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const CHECK_UPDATE_INTERVAL = 60 * 60 * 1000; // Check for updates every hour

// Determine base scope for this service worker (the SW's scope will be set at registration)
const BASE = (typeof self !== 'undefined' && self.registration && self.registration.scope) ? self.registration.scope : '/';

const urlsToCache = [
  BASE,
  new URL('index.html', BASE).href,
  new URL('manifest.json', BASE).href,
];

// Install event - cache essential resources
self.addEventListener('install', event => {
  console.log(`[SW ${APP_VERSION}] Installing...`);
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log(`[SW ${APP_VERSION}] Caching essential resources`);
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error(`[SW ${APP_VERSION}] Failed to cache resources:`, error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log(`[SW ${APP_VERSION}] Activating...`);
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName.startsWith('polivis-cache-')) {
            console.log(`[SW ${APP_VERSION}] Deleting old cache:`, cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Claim all clients immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - network-first strategy for HTML, cache-first for assets
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Network-first for HTML/navigation requests
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone the response before caching
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // Network failed, try cache
          return caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Fallback to base scope
            return caches.match(BASE);
          });
        })
    );
    return;
  }

  // Stale-while-revalidate for assets (JS, CSS, images)
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          // Only cache successful responses
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // Network failed, return cached response if available
          return cachedResponse;
        });

        // Return cached response immediately, update in background
        return cachedResponse || fetchPromise;
      });
    })
  );
});

// Listen for messages from the client
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log(`[SW ${APP_VERSION}] Received SKIP_WAITING message`);
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: APP_VERSION });
  }
});