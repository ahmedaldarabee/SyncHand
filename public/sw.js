if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let n={};const o=e=>a(e,i),f={module:{uri:i},exports:n,require:o};s[i]=Promise.all(c.map((e=>f[e]||o(e)))).then((e=>(t(...e),n)))}}define(["./workbox-8db90200"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/SyncHand.png",revision:"9c092ea39bb6fff2224f63494c452146"},{url:"/_next/static/chunks/113-6bfecf71134884dd.js",revision:"tgY4U9op7fJtKo7scz1NL"},{url:"/_next/static/chunks/132-14636edcc2d38272.js",revision:"tgY4U9op7fJtKo7scz1NL"},{url:"/_next/static/chunks/199-152535149fb6b5cf.js",revision:"tgY4U9op7fJtKo7scz1NL"},{url:"/_next/static/chunks/203.2b4c1ee4fbe3a7cf.js",revision:"2b4c1ee4fbe3a7cf"},{url:"/_next/static/chunks/218.57a830a2c55ba802.js",revision:"57a830a2c55ba802"},{url:"/_next/static/chunks/329-b87bbdb61f2c56de.js",revision:"tgY4U9op7fJtKo7scz1NL"},{url:"/_next/static/chunks/382-40975df38b40c239.js",revision:"tgY4U9op7fJtKo7scz1NL"},{url:"/_next/static/chunks/447-900eb53050c015a7.js",revision:"tgY4U9op7fJtKo7scz1NL"},{url:"/_next/static/chunks/4bd1b696-326dd07021bcbd72.js",revision:"tgY4U9op7fJtKo7scz1NL"},{url:"/_next/static/chunks/518-cce66223a4060e4e.js",revision:"tgY4U9op7fJtKo7scz1NL"},{url:"/_next/static/chunks/767.d9ac7ee44d8d8e36.js",revision:"d9ac7ee44d8d8e36"},{url:"/_next/static/chunks/809.93c284ec5affceca.js",revision:"93c284ec5affceca"},{url:"/_next/static/chunks/app/_not-found/page-910075249b82d6af.js",revision:"tgY4U9op7fJtKo7scz1NL"},{url:"/_next/static/chunks/app/api/projects/route-fd858f579d429fe2.js",revision:"tgY4U9op7fJtKo7scz1NL"},{url:"/_next/static/chunks/app/dashboard/page-2186262896c1bd1b.js",revision:"tgY4U9op7fJtKo7scz1NL"},{url:"/_next/static/chunks/app/layout-1b0cf45773cf4592.js",revision:"tgY4U9op7fJtKo7scz1NL"},{url:"/_next/static/chunks/app/page-cc692b2d56d83495.js",revision:"tgY4U9op7fJtKo7scz1NL"},{url:"/_next/static/chunks/app/sign-in/%5B%5B...sign-in%5D%5D/page-62406418f16b7094.js",revision:"tgY4U9op7fJtKo7scz1NL"},{url:"/_next/static/chunks/app/sign-up/%5B%5B...sign-up%5D%5D/page-337b92452accdfa9.js",revision:"tgY4U9op7fJtKo7scz1NL"},{url:"/_next/static/chunks/framework-6b27c2b7aa38af2d.js",revision:"tgY4U9op7fJtKo7scz1NL"},{url:"/_next/static/chunks/main-340360526c2f1db1.js",revision:"tgY4U9op7fJtKo7scz1NL"},{url:"/_next/static/chunks/main-app-c33ded54e40c6a4c.js",revision:"tgY4U9op7fJtKo7scz1NL"},{url:"/_next/static/chunks/pages/_app-430fec730128923e.js",revision:"tgY4U9op7fJtKo7scz1NL"},{url:"/_next/static/chunks/pages/_error-2d7241423c4a35ba.js",revision:"tgY4U9op7fJtKo7scz1NL"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-37c13be1096b9eae.js",revision:"tgY4U9op7fJtKo7scz1NL"},{url:"/_next/static/css/07d495cd9b81a090.css",revision:"07d495cd9b81a090"},{url:"/_next/static/css/65aa3619a1925c9d.css",revision:"65aa3619a1925c9d"},{url:"/_next/static/media/0484562807a97172-s.p.woff2",revision:"b550bca8934bd86812d1f5e28c9cc1de"},{url:"/_next/static/media/4c285fdca692ea22-s.p.woff2",revision:"42d3308e3aca8742731f63154187bdd7"},{url:"/_next/static/media/5fb25f343c7550ca-s.woff2",revision:"b1ee7ba0b4c946e20d7859cddf2aa203"},{url:"/_next/static/media/6245472ced48d3be-s.p.woff2",revision:"335da181ffc3c425a4abf0e8fc0f1e42"},{url:"/_next/static/media/6c9a125e97d835e1-s.woff2",revision:"889718d692d5bfc6019cbdfcb5cc106f"},{url:"/_next/static/media/7108afb8b1381ad1-s.p.woff2",revision:"d5a9cbc34d22ffd5c4eb636dcca02f5d"},{url:"/_next/static/media/7db6c35d839a711c-s.p.woff2",revision:"de2b6fe4e663c0669007e5b501c2026b"},{url:"/_next/static/media/7ede3623c9ddac57-s.woff2",revision:"352bd40859f4f3744377e2ad51836740"},{url:"/_next/static/media/8888a3826f4a3af4-s.p.woff2",revision:"792477d09826b11d1e5a611162c9797a"},{url:"/_next/static/media/9e82d62334b205f4-s.p.woff2",revision:"1c2ea932e7620e3a752301d0e54d3d91"},{url:"/_next/static/media/a1386beebedccca4-s.woff2",revision:"d3aa06d13d3cf9c0558927051f3cb948"},{url:"/_next/static/media/b8442747db2a9bad-s.woff2",revision:"bdb143282b9fa3a5da7f074b6f81e124"},{url:"/_next/static/media/b957ea75a84b6ea7-s.p.woff2",revision:"0bd523f6049956faaf43c254a719d06a"},{url:"/_next/static/media/c3bc380753a8436c-s.woff2",revision:"5a1b7c983a9dc0a87a2ff138e07ae822"},{url:"/_next/static/media/eafabf029ad39a43-s.p.woff2",revision:"43751174b6b810eb169101a20d8c26f8"},{url:"/_next/static/media/f10b8e9d91f3edcb-s.woff2",revision:"63af7d5e18e585fad8d0220e5d551da1"},{url:"/_next/static/media/f54d3b402c212b9e-s.woff2",revision:"07771519abf754f445a139aedac251dc"},{url:"/_next/static/media/favicon.22818555.ico",revision:"b4a95e3d50ad12c26d4be9afee891957"},{url:"/_next/static/media/fe0777f1195381cb-s.woff2",revision:"f2a04185547c36abfa589651236a9849"},{url:"/_next/static/tgY4U9op7fJtKo7scz1NL/_buildManifest.js",revision:"d3c7df08538624f67c715f2c8eae6640"},{url:"/_next/static/tgY4U9op7fJtKo7scz1NL/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/ahmed-aldarabee.jpg",revision:"1fa0b9bb6aacaaaf2b0e8ea48782da63"},{url:"/favicon.png",revision:"b4a95e3d50ad12c26d4be9afee891957"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/icon512_maskable.png",revision:"dde0ef778a97aa26505888f237cd122c"},{url:"/icon512_rounded.png",revision:"4e7403a9be1ea932d18f9a3b893b6441"},{url:"/landingpage.webp",revision:"49b14a93b9af644b541ba909b6480313"},{url:"/manifest.json",revision:"1e01b08f88b09323ccde1c336858dcc9"},{url:"/mohammad.jpeg",revision:"8f3764f544897d8b12151c6a2d82e910"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
