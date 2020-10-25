
// // if (!('indexedDB' in window)) {
// //     console.log(`This browser doesn't support IndexedDB`);
// // }

// // if ('function' === typeof importScripts) {
// //     importScripts(`older-browser-support/cache-polyfill/index.js`);
// // }

// if ('serviceWorker' in navigator) {
//     window.addEventListener("load", () => {
//         navigator.serviceWorker.register("sw.js")
//             .then(reg => {
//                 console.log(`Service worker registrated: ${reg}`);
//             })
//             .catch(err => {
//                 console.log(`Service worker registration error: ${err}`);
//             })
//     })
// } else {
//     console.log(`Service worker not supported`);
// }

const containerLoad = document.querySelector(".loader");

function HideLoader() {
    containerLoad.classList.toggle("zero-opacity");
    setTimeout(() => {
        containerLoad.classList.toggle("hide");
    }, 350);
}

function ShowLoader() {
    containerLoad.classList.toggle("zero-opacity");
    containerLoad.classList.toggle("hide");
}

window.onload = function(){
    HideLoader();
}