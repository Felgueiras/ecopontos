
const applicationServerPublicKey = 'BH8-hIchXKMI6AKSee8gD0hhPThRqaEhIEtMJwcTjEQhiOKdG-_2tTIO-6hOAK4kwg5M9Saedjxp4hVE-khhWxY';

/* eslint-enable max-len */
/*eslint no-restricted-globals: ["error", "event"]*/

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
});

self.addEventListener('pushsubscriptionchange', function (event) {
  console.log('[Service Worker]: \'pushsubscriptionchange\' event fired.');
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  event.waitUntil(
    self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
      .then(function (newSubscription) {
        console.log('[Service Worker] New subscription: ', newSubscription);
      })
  );
});

// Set this to true for production
var doCache = true;

// Name our cache
var CACHE_NAME = 'ecopontos';

// Delete old caches that are not our current one!
self.addEventListener("activate", event => {
  console.log('Activating service worker');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            console.log('Deleting cache: ' + key)
            return caches.delete(key);
          }
        }))
      )
  );
});

// The first time the user starts up the PWA, 'install' is triggered.
self.addEventListener('install', function (event) {
  console.log('Installing service worker');
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function (cache) {
          // Open a cache and cache our files
          // We want to cache the page and the main.js generated by webpack
          // We could also cache any static assets like CSS or images
          const urlsToCache = [
            "/logo.png",
          ]
          cache.addAll(urlsToCache)
          console.log('cached');
        })
    );
  }
});

const IMAGE_EXTENSIONS = ['svg', 'png', 'jpg'];

function checkIfImage(url) {
  url = url.toLowerCase();
  for (let index = 0; index < IMAGE_EXTENSIONS.length; index++) {
    const extension = IMAGE_EXTENSIONS[index];
    if (url.endsWith(extension)) {
      return true;
    }
  }

  return false;
}

// Cache falling back to the network
self.addEventListener('fetch', function (event) {
  event.respondWith(
    // open cache
    caches.open(CACHE_NAME).then(function (cache) {
      // check if in cache
      return cache.match(event.request).then(function (response) {
        // in cache -> return, else fetch
        return response || fetch(event.request).then(function (response) {
          // store images in cache 
          if (event.request.destination === 'image' && checkIfImage(event.request.url)) {
            // console.log('Caching image: ', event.request.url);
            cache.put(event.request, response.clone());
          }
          return response;
        });
      });
    })
  );
});