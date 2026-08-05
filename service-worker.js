// 波の音アプリ Ver.1.0
// service-worker.js


const CACHE_NAME = "wave-sound-v1";


const FILES_TO_CACHE = [

  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json"

];



// インストール

self.addEventListener(
"install",
(event)=>{

  event.waitUntil(

    caches.open(CACHE_NAME)
    .then(cache=>{

      return cache.addAll(
        FILES_TO_CACHE
      );

    })

  );

});




// 起動時キャッシュ利用

self.addEventListener(
"fetch",
(event)=>{


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


});