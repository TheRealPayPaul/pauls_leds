const cacheAllowlist = [
    'led-v2'
]

const CACHE_NAME = 'led-v2';

const urlsToCache = [
    'android-chrome-192x192.054501f3.png',
    'android-chrome-512x512.5fb6e626.png',
    'apple-touch-icon.b77867c6.png',
    'browserconfig.6c845ac7.xml',
    'delete.e29e24e3.svg',
    'favicon-16x16.a42c7013.png',
    'favicon-32x32.e9b0d55d.png',
    'favicon.26242483.ico',
    'index.html',
    'manifest.webmanifest',
    'mask-192x192.1c601536.png',
    'style.a6dae8f7.css',
    'style.a6dae8f7.js',
    'sw.js',
    'ts.841fc46b.css',
    'ts.841fc46b.js'
]

// self.addEventListener('install', async (e) => {
//     console.log('Service Worker: Installed');
//     self.skipWaiting();
// });

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
  });

// self.addEventListener('activate', (e) => {
//     console.log('Service Worker: Activated');
//     caches.keys()
//         .then((allCaches) => {
//             allCaches.map(cache => {
//                 if (cache !== cacheName) {
//                     console.log('Service Worker: Deleting old Caches');
//                     caches.delete(cache);
//                 }
//             });
//         });
// });

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheAllowlist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// self.addEventListener('fetch', async (e) => {
//     e.respondWith(
//         fetch(e.request)
//             .then(res => {
//                 const resClone = res.clone();
//                 caches
//                     .open(cacheName)
//                     .then(cache => {
//                         cache.put(e.request, resClone);
//                     });
//                 console.log('Service Worker: Fetch Origin');
//                 return res;
//             }).catch(err => {
//                 console.log('Service Worker: Fetch Cache');
//                 return caches.match(e.request).then(res => res);
//             })
//     );
// });

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    console.log('From Cache');
                    return response;
                }
                console.log('From Origin');
                console.log(event.request);
                return fetch(event.request);
            }
        )
    );
});