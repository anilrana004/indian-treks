// TrekRoot Service Worker v1
const CACHE_NAME = 'trekroot-v1'
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
]

// Install: cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  )
  self.skipWaiting()
})

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

// Fetch: network-first with cache fallback
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  if (!event.request.url.startsWith('http')) return

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
        }
        return response
      })
      .catch(() => caches.match(event.request).then(r => r || new Response(
        '<html><head><title>TrekRoot — Offline</title></head><body style="background:#0A0E1A;color:white;font-family:serif;text-align:center;padding:80px 20px"><h1 style="font-size:48px;color:#E8C547">TrekRoot</h1><p style="font-size:20px">You are offline but the mountains are always there.</p><p style="color:#4DA8C7">Your cached trek pages are available below.</p><a href="/" style="color:#E8C547">Return Home</a></body></html>',
        { headers: { 'Content-Type': 'text/html' } }
      )))
  )
})
