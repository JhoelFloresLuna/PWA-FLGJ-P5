self.addEventListener("install", event => {
    console.log("sw instalado")
});

self.addEventListener('fetch', event => {

    // const respOff = new Response(`
    //     Bienvenido a la página
    //     para usar la app necesitas internet
    // `)

    // const respOffHTML = new Response(`
    //     <!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta http-equiv="X-UA-Compatible" content="IE=edge">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <title>Document</title>
    //     </head>
    //     <body>
    //         <h1>Bienvenido a la página offline</h1>
    //         <p>Para usar la app necesitas internet</p>
    //     </body>
    //     </html>
    // `,
    // {
    //     headers: {
    //         'Content-Type': 'text/html'
    //     }
    // })

    const responseOffFile = fetch('views/offline.html')

    const response = fetch(event.request)
    .catch( () => {
        console.log("error en la petición")
        return responseOffFile;
    })
    
    event.respondWith(response)
})

/*
console.log("Sw limpio");

const CACHE_NAME = "cache-v2";
const CACHE_DYNAMIC_NAME = "dynamic-v1";
const CACHE_STATIC_NAME = "static-v4";
const CACHE_INMUTABLE_NAME = "inmutable_v1"; //librerias

const cleanCache = (name, sizeItems) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      console.log(keys);
      if (keys.length > sizeItems) {
        cache.delete(keys[0]).then(() => {
          cleanCache(name, sizeItems);
        });
      }
    });
  });
};

self.addEventListener("install", (event) => {
  const promesa = caches.open(CACHE_STATIC_NAME).then((cache) => {
    return cache.addAll([
      "/",
      "index.html",
      "css/page.css",
      "img/inicio.jpg",
      "js/app.js",
      "views/offline.html"
    ]);
  });

  const promesaInmu = caches.open(CACHE_INMUTABLE_NAME).then((cache) => {
    return cache.addAll([
      "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    ]);
  });

  event.waitUntil(Promise.all([promesa, promesaInmu]));
});

self.addEventListener('activate',(event) => {
    const resDelCache= caches.keys().then(keys=>{
        keys.forEach(key =>{
            if(key != CACHE_STATIC_NAME && key.includes('static')){
                return caches.delete(key)
            }
        })
    })
    event.waitUntil(resDelCache)
})

self.addEventListener("fetch", (event) => {
  //1. Only chaché
  // event.respondWith(caches.match(event.request))

  //2. Caché with network fallback
  // Primero va a buscar en caché y sino lo encuentra va a la red

  /* const respuesta = caches.match(event.request)
        .then(response => {
            if(response) return response

            console.log("No está en caché", event.request.url)
            return fetch(event.request)
                .then(res => {
                    caches.open(CACHE_DYNAMIC_NAME).then(cache => cache.put(event.request, res).then(() => {
                        cleanCache(CACHE_DYNAMIC_NAME, 6)
                    }))
                    
                    return res.clone()
                })
        })

        event.respondWith(respuesta) */

  //2. Caché with network fallback
  // Primero va a buscar en caché y sino lo encuentra va a la red
  /* const respuesta = caches.match(event.request).then((response) => {
    if (response) return response;

    console.log("No está en caché", event.request.url);
    return fetch(event.request)
      .then((res) => {
        caches.open(CACHE_DYNAMIC_NAME).then((cache) =>
          cache.put(event.request, res).then(() => {
            cleanCache(CACHE_DYNAMIC_NAME, 5);
          })
        );

        return res.clone();
      })
      .catch((err) => {
        console.log("Error al solicitar recurso");
        if(event.request.headers.get('accept').includes('text/html')){
            return caches.match('/views/offline.html')
        }
        
      });
  });

  event.respondWith(respuesta); */

  /* //3. Network cache fallback
    const promesa = fetch(event.request).then(res => {

        if(!res){
            return caches.match(event.request)
            .then(respuestCache => {
                if(!respuestCache){
                    console.log('Respondemos con algo generico');
                }
                console.log(respuestCache);
                return respuestCache
            })
            .catch(error=>{
                console.log({error});
            })
        }
        caches.open(CACHE_DYNAMIC_NAME)
        .then(cache =>{
            cache.put(event.request,res)
            cleanCache(CACHE_DYNAMIC_NAME,5)

        })
        return res.clone()
    }).catch(error=>{
        return caches.match(event.request)
        .then(respuestCache => {
            console.log(respuestCache);
        })
        .catch(error=>{
            console.log({error});
            return respuestCache
        })
    })
    event.respondWith(promesa) */
//});

