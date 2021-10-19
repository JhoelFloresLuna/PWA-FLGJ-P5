console.log("Sw; limpio");

const CACHE_NAME = 'cache-v1'
const CACHE_DYNAMIC_NAME = 'dynamic-v1'
const CACHE_STATIC_NAME = 'static-v1'
const CACHE_INMUTABLE_NAME = 'inmutable_v1'

const URL = self.location.href
let ruta=''
//console.log('URL',URL);
URL.startsWith('https:')?ruta='/PWA-FLGJ-P5/':ruta="/"
//console.log('ruta',ruta);


const cleanCache = (name, sizeItems) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            console.log(keys)
            if(keys.length > sizeItems) {
                cache.delete(keys[0]).then(() => {
                    cleanCache(name, sizeItems)
                })
            }
        })
    })
}

self.addEventListener('install', event => {
    
    const promesa = caches.open(CACHE_STATIC_NAME)
        .then(cache => {
            return cache.addAll([
                `${ruta}`,
                `${ruta}index.html`, 
                `${ruta}css/page.css`,
                `${ruta}img/inicio.jpg`,
                `${ruta}js/app.js`,
                `${ruta}views/offline.html`,
                `${ruta}img/noInternet.jpg`
            ])
        });

    const promesaInmu = caches.open(CACHE_INMUTABLE_NAME)
    .then(cache => {
        return cache.addAll([
            'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
        ])
    });

    event.waitUntil(Promise.all([promesa, promesaInmu]));
})

self.addEventListener('activate', event => {
    const response = caches.keys().then(keys => {
        keys.forEach(key => {
            if(key !== CACHE_STATIC_NAME && key.includes('static')){
                return caches.delete(key);
            }
        })
    })

    event.waitUntil(response)
})

self.addEventListener('fetch', event => {
    //1. Only chaché
    // event.respondWith(caches.match(event.request))

    //2. Caché with network fallback
    // Primero va a buscar en caché y sino lo encuentra va a la red

    const respuesta = caches.match(event.request)
        .then(response => {
            if(response) return response

            console.log("No está en cache");
            return fetch(event.request)
                .then(res => {
                    caches.open(CACHE_DYNAMIC_NAME).then(cache => cache.put(event.request, res).then(() => {
                        cleanCache(CACHE_DYNAMIC_NAME, 5)
                    }))
                    
                    return res.clone()
                })
        }).catch(error => {
            console.log("Error al solicitar recurso");
            if(event.request.headers.get('accept').includes('text/html')){
                return caches.match(`${ruta}views/offline.html`)
            }
            
            if(event.request.headers.get('accept').includes('image/')){
                return caches.match(`${ruta}img/noInternet.jpg`)
            }
        })

        event.respondWith(respuesta)

   
})