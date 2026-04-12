'use client'
import { useEffect } from 'react'

export default function PWARegister() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register(
          '/sw.js',
          { updateViaCache: 'none' } // Never use cached SW
        )

        // Check for updates immediately
        registration.update()

        // Check for updates every 30 seconds during development
        const interval = setInterval(() => {
          registration.update()
        }, 30000)

        // When a new SW is waiting — activate it immediately
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (!newWorker) return

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available — reload automatically
              newWorker.postMessage({ type: 'SKIP_WAITING' })
            }
          })
        })

        // When SW takes control — reload the page to get fresh content
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          window.location.reload()
        })

        return () => clearInterval(interval)
      } catch (err) {
        console.log('SW registration failed:', err)
      }
    }

    registerSW()
  }, [])

  return null
}
