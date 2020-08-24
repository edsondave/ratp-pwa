importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const FILES_IN_CACHE = [
  {url: '/index.html', revision: 4},
  {url: '/styles/inline.css', revision: 1},
  {url: '/scripts/app.js', revision: 21},
  {url: '/images/ic_add_white_24px.svg', revision: 1},
  {url: '/images/ic_refresh_white_24px.svg', revision: 1},
];

const API_CACHE_NAME = "api-ratp";

if (workbox) {
  
  console.log(`Workbox loaded.`);
  
  workbox.precaching.precacheAndRoute(FILES_IN_CACHE);
    
  workbox.routing.registerRoute(
    new RegExp('https://api-ratp.pierre-grimaud.fr/v3/schedules/.+'),
    new workbox.strategies.CacheFirst({
      cacheName: API_CACHE_NAME,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 20,
          maxAgeSeconds: 600, // 10 minutes
        })
      ],

    })
  );
  
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();
  
} else {
  console.log(`Workbox loading failed.`);
}