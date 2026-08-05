// 波の音アプリ Ver.2.0
// service-worker.js



const CACHE_NAME =
"wave-sound-v2.0";



const BASE =
"/wave-sound-pwa/";




const CACHE_FILES = [


BASE,


BASE + "index.html",


BASE + "style.css",


BASE + "script.js",


BASE + "manifest.json"


];






// インストール

self.addEventListener(

"install",

(event)=>{


event.waitUntil(


caches.open(CACHE_NAME)

.then(cache=>{


return cache.addAll(
CACHE_FILES
);


})


);



self.skipWaiting();


}

);








// 通常アクセス

self.addEventListener(

"fetch",

(event)=>{


event.respondWith(


caches.match(
event.request
)

.then(response=>{


return response ||

fetch(event.request);


})


);



}

);









// 更新

self.addEventListener(

"activate",

(event)=>{


event.waitUntil(


caches.keys()

.then(keys=>{


return Promise.all(


keys.map(key=>{


if(
key !== CACHE_NAME
){


return caches.delete(key);


}


})


);


})


);



self.clients.claim();


}

);