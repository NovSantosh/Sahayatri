'use client'
import { useEffect } from 'react'

export default function ViewportMeta() {
  useEffect(() => {
    // Method 1 — prevent pinch zoom via touchmove
    const preventPinchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    // Method 2 — prevent double tap zoom
    let lastTap = 0
    const preventDoubleTap = (e: TouchEvent) => {
      const now = Date.now()
      if (now - lastTap < 300) {
        e.preventDefault()
      }
      lastTap = now
    }

    // Method 3 — prevent Safari gesture events
    const preventGesture = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    // Method 4 — override wheel zoom (desktop)
    const preventWheelZoom = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
      }
    }

    // Method 5 — prevent keyboard zoom (Ctrl/Cmd +/-)
    const preventKeyZoom = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=')) {
        e.preventDefault()
      }
    }

    document.addEventListener('touchmove', preventPinchZoom, { passive: false })
    document.addEventListener('touchstart', preventDoubleTap, { passive: false })
    document.addEventListener('gesturestart', preventGesture, { passive: false })
    document.addEventListener('gesturechange', preventGesture, { passive: false })
    document.addEventListener('gestureend', preventGesture, { passive: false })
    document.addEventListener('wheel', preventWheelZoom, { passive: false })
    document.addEventListener('keydown', preventKeyZoom)

    // Method 6 — reset scale if somehow changed
    const resetScale = () => {
      const viewport = document.querySelector('meta[name=viewport]')
      if (viewport) {
        viewport.setAttribute('content',
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover'
        )
      }
    }

    window.addEventListener('resize', resetScale)

    return () => {
      document.removeEventListener('touchmove', preventPinchZoom)
      document.removeEventListener('touchstart', preventDoubleTap)
      document.removeEventListener('gesturestart', preventGesture)
      document.removeEventListener('gesturechange', preventGesture)
      document.removeEventListener('gestureend', preventGesture)
      document.removeEventListener('wheel', preventWheelZoom)
      document.removeEventListener('keydown', preventKeyZoom)
      window.removeEventListener('resize', resetScale)
    }
  }, [])

  return null
}
