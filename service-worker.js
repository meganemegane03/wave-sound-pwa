const CACHE_NAME = "wave-sound-v1.2";


const BASE_PATH = "/wave-sound-pwa/";



const CACHE_FILES = [

BASE_PATH,

BASE_PATH + "index.html",

BASE_PATH + "style.css",

BASE_PATH + "script.js",

BASE_PATH + "manifest.json"


];




// インストール

self.addEventListener(
"install",
event=>{


event.waitUntil(


caches.open(CACHE_NAME)

.then(cache=>{


return cache.addAll(
CACHE_FILES
);


})


);


self.skipWaiting();


});






// 通常アクセス

self.addEventListener(
"fetch",
event=>{


event.respondWith(


caches.match(event.request)

.then(response=>{


return response ||

fetch(event.request);


})


);


});







// 更新時

self.addEventListener(
"activate",
event=>{


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


});