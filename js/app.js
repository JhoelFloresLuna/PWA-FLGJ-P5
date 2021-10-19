if(navigator.serviceWorker){
    let url=''
    const BASE_URL=window.location.href
    BASE_URL.startsWith('https:')?url='/PWA-FLGJ-P5/sw.js':url="/sw.js"
    navigator.serviceWorker.register(url)
    
}

// if(window.caches){
//     console.log("Tenemos caché")

//     caches.open('prueba-v2')

//     caches.has('prueba').then(result => console.log(result))

//     caches.open('cache-v1').then( cache => {
//         // cache.add('/index.html') 
//         cache.addAll([
//             '/index.html',
//             '/css/page.css',
//             '/img/1.png',
//             'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
//         ]).then(() => {
//             cache.delete('/css/page.css')
//             //cache.put('index.html', new Response('Actualizado desde caché'))
//         })  

//         cache.match('/index.html').then(res => {
//             res.text().then(text => console.log(text))
//             console.log(res)
//         })
//     })

//     caches.keys().then(keys => console.log(keys))
// }