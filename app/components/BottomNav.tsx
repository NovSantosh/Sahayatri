'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'

const TABS = [
  {
    path: '/home',
    label: 'Home',
    icon: (active: boolean, color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? color : 'none'} stroke={color} strokeWidth={active ? 0 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
        <path d="M9 21V12h6v9" stroke={active ? 'rgba(255,255,255,0.4)' : color} strokeWidth="1.8" fill="none"/>
      </svg>
    ),
  },
  {
    path: '/family',
    label: 'Family',
    icon: (active: boolean, color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? color : 'none'} stroke={color} strokeWidth={active ? 0 : 1.8} strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4" fill={active ? color : 'none'} stroke={color} strokeWidth="1.8"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    path: '/memory',
    label: 'Moments',
    icon: (active: boolean, color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? color : 'none'} stroke={color} strokeWidth={active ? 0 : 1.8} strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="3" fill={active ? color : 'none'} stroke={color} strokeWidth="1.8"/>
        <circle cx="8.5" cy="8.5" r="1.5" fill={active ? 'rgba(255,255,255,0.4)' : color}/>
        <polyline points="21 15 16 10 5 21" stroke={active ? 'rgba(255,255,255,0.5)' : color} strokeWidth="1.8" fill="none"/>
      </svg>
    ),
  },
  {
    path: '/sathi',
    label: 'Sathi AI',
    icon: (active: boolean, color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? color : 'none'} stroke={color} strokeWidth={active ? 0 : 1.8} strokeLinecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill={active ? color : 'none'} stroke={color} strokeWidth="1.8"/>
        <circle cx="12" cy="10" r="1" fill={active ? 'rgba(255,255,255,0.6)' : color}/>
        <circle cx="8" cy="10" r="1" fill={active ? 'rgba(255,255,255,0.6)' : color}/>
        <circle cx="16" cy="10" r="1" fill={active ? 'rgba(255,255,255,0.6)' : color}/>
      </svg>
    ),
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: (active: boolean, color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? color : 'none'} stroke={color} strokeWidth={active ? 0 : 1.8} strokeLinecap="round">
        <circle cx="12" cy="8" r="4" fill={active ? color : 'none'} stroke={color} strokeWidth="1.8"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={color} strokeWidth="1.8" fill="none"/>
      </svg>
    ),
  },
]

export default function BottomNav() {
  const pathname = usePathname()
  const { t, theme } = useTheme()
  const isDark = theme === 'dark'

  const isActive = (path: string) => {
    if (path === '/home') return pathname === '/home'
    return pathname?.startsWith(path)
  }

  return (
    <>
      {/* Spacer so content doesn't hide behind nav */}
      <div style={{ height: '80px' }}/>

      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '480px',
        zIndex: 50,
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}>
        {/* Blur backdrop */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'rgba(6,4,12,0.85)'
            : 'rgba(247,247,248,0.9)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
        }}/>

        {/* Tab items */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'stretch',
          height: '64px',
          padding: '0 4px',
        }}>
          {TABS.map((tab) => {
            const active = isActive(tab.path)
            const color = active ? brand.primary : (isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)')

            return (
              <Link
                key={tab.path}
                href={tab.path}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  textDecoration: 'none',
                  position: 'relative',
                  transition: 'opacity 150ms ease',
                  WebkitTapHighlightColor: 'transparent',
                }}>

                {/* Active indicator dot */}
                {active && (
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: brand.primary,
                    boxShadow: `0 0 6px ${brand.primary}`,
                    animation: 'fadeIn 200ms ease both',
                  }}/>
                )}

                {/* Icon container */}
                <div style={{
                  width: '42px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '12px',
                  background: active
                    ? isDark ? 'rgba(220,20,60,0.12)' : 'rgba(220,20,60,0.08)'
                    : 'transparent',
                  transition: `background 250ms cubic-bezier(0.4,0,0.2,1),
                               transform 150ms cubic-bezier(0.34,1.56,0.64,1)`,
                  transform: active ? 'scale(1.05)' : 'scale(1)',
                }}>
                  {tab.icon(active, active ? brand.primary : color)}
                </div>

                {/* Label */}
                <span style={{
                  fontSize: '10px',
                  fontWeight: active ? 700 : 500,
                  color,
                  letterSpacing: active ? '0.2px' : '0',
                  transition: 'color 200ms ease, font-weight 200ms ease',
                }}>
                  {tab.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
