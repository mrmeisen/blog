"use strict";var precacheConfig=[["/index.html","81222e3f9ef3347d5f9aaf823061f51d"],["/static/css/main.53a7f031.css","53a7f0315eef753a43da5edab7f56e1b"],["/static/js/0.966acb99.chunk.js","17c29eced936daa58059c55a0dee3732"],["/static/js/0.966acb99.chunk.js.gz","341c7f89ccc042d95920b5897fd89a7b"],["/static/js/1.4e0c0dde.chunk.js","073669ed14b97afde0184f34beb4f017"],["/static/js/1.4e0c0dde.chunk.js.gz","84fbb886995cbc9d2eb74587a33136e1"],["/static/js/2.d3579bc7.chunk.js","46ab8b4aeb9e5a28693d73316a7a397f"],["/static/js/2.d3579bc7.chunk.js.gz","a4172b4a7b88f58bb8a8e152a844206c"],["/static/js/3.2bde101e.chunk.js","ae903927de3644a8136380ece1edaf33"],["/static/js/3.2bde101e.chunk.js.gz","7b3b15d99e5dadfe008750fe1e0d8a2f"],["/static/js/4.88d90af5.chunk.js","d1a827752f4dbf923c12cdded9aa87d7"],["/static/js/4.88d90af5.chunk.js.gz","a9eb9e6f8ea2cde8862bea2e97e7e59a"],["/static/js/main.a817a77e.js","47fc7088a90e600f4b516ff7f2ad48f5"],["/static/js/main.a817a77e.js.gz","9dba1d06e90b5b6eb9cb8ffed0982733"],["/static/media/batman.9c82479a.jpg","9c82479afc3a009671a2112a3f6fd365"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return n.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(a){return setOfCachedUrls(a).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return a.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!n.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,n=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),a="index.html";(e=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),e=urlsToCacheKeys.has(n));var r="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(n=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(n)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});