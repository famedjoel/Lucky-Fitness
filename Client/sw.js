/* Log fetch requests and then serve them from the cache */
function interceptFetch(evt) {
  evt.respondWith(handleFetch(evt.request));
  evt.waitUntil(updateCache(evt.request));
}

/* Retrieve a requested resource from the cache
   * or return a resolved promise if its not there.
   */
async function handleFetch(request) {
  const c = await caches.open(CACHE);
  const cachedCopy = await c.match(request);
  return cachedCopy || Promise.reject(new Error('no-match'));
}

/* Invoke the default fetch capability to
 * pull a resource over the network and use
 * that to update the cache.
 */
async function updateCache(request) {
  const c = await caches.open(CACHE);
  const response = await fetch(request);
  console.log('Updating cache ', request.url);
  return c.put(request, response);
}

const CACHE = 'LF';
const CACHEABLE = [
  './',
  './index.html',
  './style.css',
  './timer.js',
  './index.mjs',
  './script.mjs',
  './history.js',
  './profile-avatar.png',
  './exercise.json',
  './instructions.json',
  './profile.js',
  './profileUpdate.js',
  './192.png',
  './512.png',
  './manifest.json',
  './profiles.db',
  './routes.js',
  './server.js',
  './database.js',
  './sw.js',
];

/* Prepare and populate a cache. */
async function prepareCache() {
  const c = await caches.open(CACHE);
  await c.addAll(CACHEABLE);
  console.log('Cache prepared.');
}

// install the event listener so it can run in the background.
self.addEventListener('install', prepareCache);
self.addEventListener('fetch', interceptFetch);
