const files = [
    './.',
    '/imgs/.',
    '/imgs/diploma.svg',
    '/imgs/arrow.svg',
    '/imgs/hero-dsc-about-unilag.png',
    '/imgs/icon.png',
    '/imgs/IMG-20200923-WA0214.svg',
    '/imgs/search.svg',
    '/imgs/user.svg',
    '/index.html',
    '/views/src/js/.',
    '/views/src/css/.',
    '/views/src/css/fonts/OpenSans-Regular.ttf',
    '/views/src/css/main.css'
];

const fileVersion = 'v1';

self.addEventListener("install", event => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(fileVersion)
        .then(cache => {
            return cache.addAll(files)
        })
        .catch(err => {
            console.log(`Error occurred while installing: ${err}`);
        })
    )
})

self.addEventListener("activate", event => {
    console.log(`Service worker activating.`);

    const cacheWhiteList = [fileVersion];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhiteList.indexOf(cacheName) === -1) {
                        console.log(`Deleting cache: ${cacheName}`);
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})

/**
 * 
 */
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        }),
    );
});