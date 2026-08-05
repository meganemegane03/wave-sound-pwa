const CACHE_NAME = "wave-sound-v1.1";


const CACHE_FILES = [

"./",
"./index.html",
"./style.css",
"./script.js",
"./manifest.json",

"./icon.png",

"./wood-box.png",
"./wood-bg.png",

"./sounds/wave.mp3"

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


});






// キャッシュ利用

self.addEventListener(
"fetch",
event=>{


event.respondWith(


caches.match(event.request)

.then(response=>{


return response || fetch(event.request);


})


);


});






// 古いキャッシュ削除

self.addEventListener(
"activate",
event=>{


event.waitUntil(


caches.keys()

.then(keys=>{


return Promise.all(


keys.map(key=>{


if(key !== CACHE_NAME){

return caches.delete(key);

}


})


);


})


);


});