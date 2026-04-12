const CACHE_VERSION = 'sahayatri-v' + Date.now()
const CACHE_NAME = CACHE_VERSION

// On install — take control immediately, don't cache anything on install
self.addEventListener('install', (e) => {
  self.skipWaiting()
})

// On activate — delete ALL old caches immediately
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        console.log('Deleting old cache:', key)
        return caches.delete(key)
      }))
    ).then(() => self.clients.claim())
  )
})

// On fetch — ALWAYS go to network first, never serve stale
self.addEventListener('fetch', (e) => {
  // Skip non-GET and API calls entirely
  if (e.request.method !== 'GET') return
  if (e.request.url.includes('/api/')) return
  if (e.request.url.includes('_next/')) return

  // Network first — always fresh
  e.respondWith(
    fetch(e.request)
      .catch(() => {
        // Only use cache as absolute last resort when offline
        return caches.match(e.request)
          .then(r => r || new Response('Offline', { status: 503 }))
      })
  )
})

// Push notifications
self.addEventListener('push', (e) => {
  const data = e.data?.json() || {}
  e.waitUntil(
    self.registration.showNotification(data.title || 'Sahayatri', {
      body: data.body || 'You have a new update',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      data: data.url || '/',
      vibrate: [100, 50, 100],
    })
  )
})

self.addEventListener('notificationclick', (e) => {
  e.notification.close()
  e.waitUntil(clients.openWindow(e.notification.data || '/'))
})

// Listen for skip waiting message from client
self.addEventListener('message', (e) => {
  if (e.data?.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
