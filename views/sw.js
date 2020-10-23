// const files = [
//     './',
//     '/imgs/.',
//     '/imgs/diploma.svg',
//     '/imgs/arrow.svg',
//     '/imgs/diploma (1).svg',
//     '/imgs/diploma (2).svg',
//     '/imgs/diploma (3).svg',
//     '/imgs/hero-dsc-about-unilag.png',
//     '/imgs/icon.png',
//     '/imgs/IMG-20200923-WA0214.svg',
//     '/imgs/search.svg',
//     '/imgs/user.svg',
//     '/index.html',
//     '/login.html',
//     '/signup.html',
//     '/dashboard.html',
//     '/certificator.html',
//     '/certificate-gen.html',
//     '/manage-func.html',
//     '/manage.html',
//     '/src/js/.',
//     '/views/src/css/signup.css',
//     '/views/src/css/manage.css',
//     '/views/src/css/certificate.css',
//     '/views/src/css/manage-func.css',
//     '/views/src/css/font-picker-3.5.1/src/FontPicker.ts',
//     '/views/src/css/manage.css',
//     '/views/src/css/main.css',
//     '/views/src/css/dashboard.css',
//     '/views/src/css/fonts/OpenSans-Regular.ttf'
// ];

// const fileVersion = 'v1';

// self.addEventListener("install", event => {
//     self.skipWaiting();

//     event.waitUntil(
//         caches.open(fileVersion)
//         .then(cache => {
//             return cache.addAll(files)
//         })
//         .catch(err => {
//             console.log(`Error occurred while installing: ${err}`);
//         })
//     )
// })

// self.addEventListener("activate", event => {
//     console.log(`Service worker activating.`);

//     const cacheWhiteList = [fileVersion];

//     event.waitUntil(
//         caches.keys().then(cacheNames => {
//             return Promise.all(
//                 cacheNames.map(cacheName => {
//                     if(cacheWhiteList.indexOf(cacheName) === -1){
//                         console.log(`Deleting cache: ${cacheName}`);
//                         return caches.delete(cacheName);
//                     }
//                 })
//             )
//         })
//     )
// })

// // Cache falling back to network strategy(Part of patterns for handling requests(e.g cache only, network only etc))
// self.addEventListener("fetch", event => {
//     console.log(`Fetch event for ${event.request.url}`);

//     event.respondWith(
//         caches.match(event.request)
//         .then(response => {
//             return response || fetch(event.request)
//                 // 404 page can be placed here.
//                 // Dynamically cache content.
//                 .then(response => {
//                     caches.open(fileVersion).then(cache => {
//                         cache.put(event.request.url, response.clone());
//                         return response;
//                 })
//             })
//         })
//     )
// })