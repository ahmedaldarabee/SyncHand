if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let t={};const f=e=>s(e,n),u={module:{uri:n},exports:t,require:f};a[n]=Promise.all(i.map((e=>u[e]||f(e)))).then((e=>(c(...e),t)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/SyncHand.png",revision:"9c092ea39bb6fff2224f63494c452146"},{url:"/_next/app-build-manifest.json",revision:"09b1c6a4edc2d64563ca96cb35337e39"},{url:"/_next/static/chunks/113-6ed826027772e9f1.js",revision:"mAguIX8IahOJMejBuCuMi"},{url:"/_next/static/chunks/132-14636edcc2d38272.js",revision:"mAguIX8IahOJMejBuCuMi"},{url:"/_next/static/chunks/199-e6fb259f51115561.js",revision:"mAguIX8IahOJMejBuCuMi"},{url:"/_next/static/chunks/203.2b4c1ee4fbe3a7cf.js",revision:"2b4c1ee4fbe3a7cf"},{url:"/_next/static/chunks/218.57a830a2c55ba802.js",revision:"57a830a2c55ba802"},{url:"/_next/static/chunks/329-42c62165b3240208.js",revision:"mAguIX8IahOJMejBuCuMi"},{url:"/_next/static/chunks/382-fcb56f15d6b54526.js",revision:"mAguIX8IahOJMejBuCuMi"},{url:"/_next/static/chunks/4bd1b696-326dd07021bcbd72.js",revision:"mAguIX8IahOJMejBuCuMi"},{url:"/_next/static/chunks/517-7d08d6bb63593705.js",revision:"mAguIX8IahOJMejBuCuMi"},{url:"/_next/static/chunks/518-cce66223a4060e4e.js",revision:"mAguIX8IahOJMejBuCuMi"},{url:"/_next/static/chunks/767.d9ac7ee44d8d8e36.js",revision:"d9ac7ee44d8d8e36"},{url:"/_next/static/chunks/809.93c284ec5affceca.js",revision:"93c284ec5affceca"},{url:"/_next/static/chunks/app/_not-found/page-74c676c19c9689bb.js",revision:"mAguIX8IahOJMejBuCuMi"},{url:"/_next/static/chunks/app/api/projects/route-ec50907f1e18fcea.js",revision:"mAguIX8IahOJMejBuCuMi"},{url:"/_next/static/chunks/app/dashboard/page-813ce58d13778deb.js",revision:"mAguIX8IahOJMejBuCuMi"},{url:"/_next/static/chunks/app/layout-f62e48774f372c02.js",revision:"mAguIX8IahOJMejBuCuMi"},{url:"/_next/static/chunks/app/page-92d3c698d871f47f.js",revision:"mAguIX8IahOJMejBuCuMi"},{url:"/_next/static/chunks/app/sign-in/%5B%5B...sign-in%5D%5D/page-4170700cb92145b2.js",revision:"mAguIX8IahOJMejBuCuMi"},{url:"/_next/static/chunks/app/sign-up/%5B%5B...sign-up%5D%5D/page-72582f2211c6faaa.js",revision:"mAguIX8IahOJMejBuCuMi"},{url:"/_next/static/chunks/framework-6b27c2b7aa38af2d.js",revision:"mAguIX8IahOJMejBuCuMi"},{url:"/_next/static/chunks/main-app-7fd8f14e509b169d.js",revision:"mAguIX8IahOJMejBuCuMi"},{url:"/_next/static/chunks/main-e3e5a46ac61a11d0.js",revision:"mAguIX8IahOJMejBuCuMi"},{url:"/_next/static/chunks/pages/_app-430fec730128923e.js",revision:"mAguIX8IahOJMejBuCuMi"},{url:"/_next/static/chunks/pages/_error-2d7241423c4a35ba.js",revision:"mAguIX8IahOJMejBuCuMi"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-42b74aae86efe73b.js",revision:"mAguIX8IahOJMejBuCuMi"},{url:"/_next/static/css/65aa3619a1925c9d.css",revision:"65aa3619a1925c9d"},{url:"/_next/static/css/9c3c839bedbafcf0.css",revision:"9c3c839bedbafcf0"},{url:"/_next/static/mAguIX8IahOJMejBuCuMi/_buildManifest.js",revision:"d3c7df08538624f67c715f2c8eae6640"},{url:"/_next/static/mAguIX8IahOJMejBuCuMi/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/0484562807a97172-s.p.woff2",revision:"b550bca8934bd86812d1f5e28c9cc1de"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/4c285fdca692ea22-s.p.woff2",revision:"42d3308e3aca8742731f63154187bdd7"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/5fb25f343c7550ca-s.woff2",revision:"b1ee7ba0b4c946e20d7859cddf2aa203"},{url:"/_next/static/media/6245472ced48d3be-s.p.woff2",revision:"335da181ffc3c425a4abf0e8fc0f1e42"},{url:"/_next/static/media/6c9a125e97d835e1-s.woff2",revision:"889718d692d5bfc6019cbdfcb5cc106f"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/7108afb8b1381ad1-s.p.woff2",revision:"d5a9cbc34d22ffd5c4eb636dcca02f5d"},{url:"/_next/static/media/7db6c35d839a711c-s.p.woff2",revision:"de2b6fe4e663c0669007e5b501c2026b"},{url:"/_next/static/media/7ede3623c9ddac57-s.woff2",revision:"352bd40859f4f3744377e2ad51836740"},{url:"/_next/static/media/8888a3826f4a3af4-s.p.woff2",revision:"792477d09826b11d1e5a611162c9797a"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/9e82d62334b205f4-s.p.woff2",revision:"1c2ea932e7620e3a752301d0e54d3d91"},{url:"/_next/static/media/a1386beebedccca4-s.woff2",revision:"d3aa06d13d3cf9c0558927051f3cb948"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/b8442747db2a9bad-s.woff2",revision:"bdb143282b9fa3a5da7f074b6f81e124"},{url:"/_next/static/media/b957ea75a84b6ea7-s.p.woff2",revision:"0bd523f6049956faaf43c254a719d06a"},{url:"/_next/static/media/c3bc380753a8436c-s.woff2",revision:"5a1b7c983a9dc0a87a2ff138e07ae822"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/eafabf029ad39a43-s.p.woff2",revision:"43751174b6b810eb169101a20d8c26f8"},{url:"/_next/static/media/f10b8e9d91f3edcb-s.woff2",revision:"63af7d5e18e585fad8d0220e5d551da1"},{url:"/_next/static/media/f54d3b402c212b9e-s.woff2",revision:"07771519abf754f445a139aedac251dc"},{url:"/_next/static/media/favicon.22818555.ico",revision:"b4a95e3d50ad12c26d4be9afee891957"},{url:"/_next/static/media/fe0777f1195381cb-s.woff2",revision:"f2a04185547c36abfa589651236a9849"},{url:"/ahmed-aldarabee.jpg",revision:"1fa0b9bb6aacaaaf2b0e8ea48782da63"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/icon512_maskable.png",revision:"dde0ef778a97aa26505888f237cd122c"},{url:"/icon512_rounded.png",revision:"4e7403a9be1ea932d18f9a3b893b6441"},{url:"/landingpage.webp",revision:"49b14a93b9af644b541ba909b6480313"},{url:"/manifest.json",revision:"df829c1731945d42a60d3a687cc0506b"},{url:"/mohammad.jpeg",revision:"8f3764f544897d8b12151c6a2d82e910"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:i})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
