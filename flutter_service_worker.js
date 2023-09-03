'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "b2ca98868916c27e3ceef55315da0a63",
"index.html": "8034b9ef0021a54a954c856c85ccd725",
"/": "8034b9ef0021a54a954c856c85ccd725",
"main.dart.js": "44b0f17bb14563acd0ad4c3f9a843903",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "901d86fb8842ec0d66225a542131d689",
"assets/images/threads-logo.png": "f5ce3d038785df2ce59442f666bf0ded",
"assets/images/threads.png": "66718fddbd259e1317143093b6694524",
"assets/images/instagram.png": "42e5f636a9cc067095456f66201c7adf",
"assets/images/user8.jpg": "1062a83b17fbed9b17b12a6268c8cc76",
"assets/images/chart1.jpg": "7d1a6b532984cc425977f6cec46e5651",
"assets/images/user3.jpg": "e039f5bce3f407094ca90bc38b6dae59",
"assets/images/user2.jpg": "ebd21226fef6268fbc548f27ae2856ff",
"assets/images/user1.jpg": "b04cc00bde3cf9cd650569afdeff086c",
"assets/images/user5.jpg": "c777f727199e910d1b7996d3e4f8aedc",
"assets/images/user4.jpg": "b67d820ffa02840639016ddd7149deac",
"assets/images/user6.jpg": "128827df2eda0015e750acb96f64dc0e",
"assets/images/user7.jpg": "bfc5142003535d63fe11eabc70e9d2f3",
"assets/images/image1.png": "13d03b6f2de2652794d71678795c3dba",
"assets/AssetManifest.json": "fd125d068e922af2729896b0ce9bc464",
"assets/NOTICES": "6e7cb772083c87c01346ee2330bfd84f",
"assets/FontManifest.json": "3ddd9b2ab1c2ae162d46e3cc7b78ba88",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "1e17b1ec3152f29bf783bd42db8b6023",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "093d2cde7075fcffb24ab215668d0da2",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "5ac99533bd9dc46227434b4853c3e532",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "caa08f88d8b7b9014b0593a602a04a9a",
"assets/fonts/MaterialIcons-Regular.otf": "d29183a62c145dd05f7a74d29f8a38de",
"assets/assets/id-all-geo.json": "4106339139cc55fc6c088f1363e934b7",
"assets/assets/id-all-topo.json": "61a40c77e06963f86d6a0bf57a6b47b0",
"assets/assets/images/bg-default.png": "feea01ade95e62bccebd64daf0e57385",
"assets/assets/images/bg-light.png": "7c046fabe5b66376d3baffb0c7e59f09",
"assets/assets/images/threads-logo.png": "f5ce3d038785df2ce59442f666bf0ded",
"assets/assets/images/threads.png": "66718fddbd259e1317143093b6694524",
"assets/assets/images/instagram.png": "42e5f636a9cc067095456f66201c7adf",
"assets/assets/images/user8.jpg": "1062a83b17fbed9b17b12a6268c8cc76",
"assets/assets/images/chart1.jpg": "7d1a6b532984cc425977f6cec46e5651",
"assets/assets/images/user3.jpg": "e039f5bce3f407094ca90bc38b6dae59",
"assets/assets/images/user2.jpg": "ebd21226fef6268fbc548f27ae2856ff",
"assets/assets/images/user1.jpg": "b04cc00bde3cf9cd650569afdeff086c",
"assets/assets/images/user5.jpg": "c777f727199e910d1b7996d3e4f8aedc",
"assets/assets/images/user4.jpg": "b67d820ffa02840639016ddd7149deac",
"assets/assets/images/user6.jpg": "128827df2eda0015e750acb96f64dc0e",
"assets/assets/images/user7.jpg": "bfc5142003535d63fe11eabc70e9d2f3",
"assets/assets/images/image1.png": "13d03b6f2de2652794d71678795c3dba",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
