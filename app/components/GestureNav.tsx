'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createPortal } from 'react-dom'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'

const TABS = [
  {
    path: '/home',
    label: 'Home',
    icon: (color: string, size: number) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
        <path d="M9 21V12h6v9" fill="rgba(0,0,0,0.2)"/>
      </svg>
    ),
  },
  {
    path: '/family',
    label: 'Family',
    icon: (color: string, size: number) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    path: '/memory',
    label: 'Moments',
    icon: (color: string, size: number) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="3"/>
        <circle cx="8.5" cy="8.5" r="1.5" fill={color} stroke="none"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
  },
  {
    path: '/sathi',
    label: 'Sathi AI',
    icon: (color: string, size: number) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: (color: string, size: number) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
]

type NavState = 'hidden' | 'mini' | 'full'

export default function GestureNav({ side = 'right' }: { side?: 'left' | 'right' }) {
  const router = useRouter()
  const pathname = usePathname()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [mounted, setMounted] = useState(false)
  const [navState, setNavState] = useState<NavState>('hidden')
  const autoCollapseRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  useEffect(() => { setMounted(true) }, [])

  // Auto collapse mini → hidden after 2.5 seconds
  useEffect(() => {
    if (navState === 'mini') {
      autoCollapseRef.current = setTimeout(() => {
        setNavState('hidden')
      }, 2500)
    }
    return () => {
      if (autoCollapseRef.current) clearTimeout(autoCollapseRef.current)
    }
  }, [navState])

  // Swipe gesture detection
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }

    const onTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX
      const endY = e.changedTouches[0].clientY
      const dx = endX - touchStartX.current
      const dy = Math.abs(endY - touchStartY.current)

      if (side === 'right') {
        // Swipe LEFT from right edge → open
        if (touchStartX.current > window.innerWidth - 40 && dx < -40 && dy < 80) {
          setNavState('full')
        }
        // Swipe RIGHT → close
        if (navState === 'full' && dx > 60 && dy < 80) {
          setNavState('mini')
        }
      } else {
        // Swipe RIGHT from left edge → open
        if (touchStartX.current < 40 && dx > 40 && dy < 80) {
          setNavState('full')
        }
        // Swipe LEFT → close
        if (navState === 'full' && dx < -60 && dy < 80) {
          setNavState('mini')
        }
      }
    }

    document.addEventListener('touchstart', onTouchStart, { passive: true })
    document.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchend', onTouchEnd)
    }
  }, [navState, side])

  const isActive = (path: string) => {
    if (path === '/home') return pathname === '/home'
    return pathname?.startsWith(path)
  }

  const navigate = (path: string) => {
    setNavState('mini')
    if (autoCollapseRef.current) clearTimeout(autoCollapseRef.current)
    autoCollapseRef.current = setTimeout(() => setNavState('hidden'), 2500)
    router.push(path)
  }

  if (!mounted) return null

  const edgeSide = side === 'right' ? { right: 0 } : { left: 0 }
  const borderRadius = side === 'right'
    ? { borderRadius: '12px 0 0 12px' }
    : { borderRadius: '0 12px 12px 0' }
  const borderStyle = side === 'right'
    ? { borderRight: 'none' }
    : { borderLeft: 'none' }

  const bg = isDark ? '#0E0B18' : 'white'
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'

  const ui = (
    <>
      {/* Full nav overlay */}
      {navState === 'full' && (
        <div
          onClick={() => setNavState('mini')}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.55)',
            zIndex: 99990,
            animation: 'fadeIn 200ms ease',
          }}/>
      )}

      {/* Full dock */}
      {navState === 'full' && (
        <div style={{
          position: 'fixed',
          top: '50%',
          transform: 'translateY(-50%)',
          ...edgeSide,
          zIndex: 99991,
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          padding: '16px 0',
          background: bg,
          ...borderRadius,
          boxShadow: side === 'right'
            ? '-8px 0 32px rgba(0,0,0,0.25)'
            : '8px 0 32px rgba(0,0,0,0.25)',
          border: `1px solid ${border}`,
          ...borderStyle,
          animation: 'slideInDock 250ms cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          {TABS.map((tab) => {
            const active = isActive(tab.path)
            return (
              <button
                key={tab.path}
                onClick={(e) => { e.stopPropagation(); navigate(tab.path) }}
                style={{
                  width: '64px',
                  padding: '10px 8px',
                  background: active ? brand.primaryLight : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.15s ease',
                  fontFamily: 'Inter, sans-serif',
                }}>
                <div style={{
                  width: '40px', height: '40px',
                  borderRadius: '12px',
                  background: active ? brand.primaryLight : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: active ? `0 4px 12px rgba(220,20,60,0.25)` : 'none',
                  border: active ? `1.5px solid ${brand.primaryBorder}` : `1px solid ${border}`,
                }}>
                  {tab.icon(active ? brand.primary : (isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'), 18)}
                </div>
                <p style={{
                  fontSize: '10px',
                  fontWeight: active ? 700 : 500,
                  color: active ? brand.primary : (isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'),
                  margin: 0,
                  letterSpacing: '0.1px',
                }}>
                  {tab.label}
                </p>
              </button>
            )
          })}
        </div>
      )}

      {/* Mini dock — shows briefly after navigation */}
      {navState === 'mini' && (
        <div style={{
          position: 'fixed',
          top: '50%',
          transform: 'translateY(-50%)',
          ...edgeSide,
          zIndex: 99991,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          padding: '10px 0',
          background: bg,
          ...borderRadius,
          boxShadow: side === 'right'
            ? '-4px 0 16px rgba(0,0,0,0.15)'
            : '4px 0 16px rgba(0,0,0,0.15)',
          border: `1px solid ${border}`,
          ...borderStyle,
          animation: 'slideInDock 300ms cubic-bezier(0.4,0,0.2,1)',
        }}>
          {TABS.map((tab) => {
            const active = isActive(tab.path)
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                style={{
                  width: '36px',
                  height: '32px',
                  background: active ? brand.primaryLight : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease',
                }}>
                {tab.icon(
                  active ? brand.primary : (isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)'),
                  14
                )}
              </button>
            )
          })}
        </div>
      )}

      {/* Hidden state — just a tiny handle */}
      {navState === 'hidden' && (
        <div
          onClick={() => setNavState('full')}
          style={{
            position: 'fixed',
            top: '50%',
            transform: 'translateY(-50%)',
            ...edgeSide,
            zIndex: 99991,
            cursor: 'pointer',
            width: '18px',
            paddingTop: '28px',
            paddingBottom: '28px',
            background: bg,
            ...borderRadius,
            ...borderStyle,
            border: `1px solid ${border}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            boxShadow: side === 'right'
              ? '-3px 0 12px rgba(0,0,0,0.12)'
              : '3px 0 12px rgba(0,0,0,0.12)',
            opacity: 0.7,
          }}>
          {/* 3 dots */}
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: '3px', height: '3px',
              borderRadius: '50%',
              background: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
            }}/>
          ))}
          {/* Arrow */}
          <svg
            width="8" height="8"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ marginTop: '2px' }}>
            {side === 'right'
              ? <path d="M15 18l-6-6 6-6"/>
              : <path d="M9 18l6-6-6-6"/>}
          </svg>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideInDock {
          from { opacity:0; transform:translateY(-50%) scale(0.92) }
          to { opacity:1; transform:translateY(-50%) scale(1) }
        }
      `}</style>
    </>
  )

  return createPortal(ui, document.body)
}
