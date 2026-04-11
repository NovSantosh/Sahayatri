'use client'
import { usePathname, useRouter } from 'next/navigation'
import { HomeIcon, FamilyIcon, MicIcon, HeartIcon, ProfileIcon } from './Icons'
import { useTheme } from '../context/ThemeContext'

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { t, theme } = useTheme()
  const isDark = theme === 'dark'

  const tabs = [
    { path: '/home', label: 'Home', Icon: HomeIcon },
    { path: '/family', label: 'Family', Icon: FamilyIcon },
    { path: '/sathi', label: 'Sathi', Icon: MicIcon },
    { path: '/memory', label: 'Memory', Icon: HeartIcon },
    { path: '/profile', label: 'Profile', Icon: ProfileIcon },
  ]

  return (
    <>
      <div style={{height: '80px'}}/>
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 16px 24px',
        background: isDark
          ? 'linear-gradient(to top, rgba(6,4,12,1) 60%, rgba(6,4,12,0))'
          : 'linear-gradient(to top, rgba(247,247,248,1) 60%, rgba(247,247,248,0))',
        pointerEvents: 'none',
        transition: 'background 0.3s ease',
      }}>
        <div style={{
          background: t.navBg,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '28px',
          border: `1px solid ${t.navBorder}`,
          boxShadow: isDark
            ? '0 8px 48px rgba(0,0,0,0.5)'
            : '0 8px 32px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          padding: '6px 4px',
          pointerEvents: 'all',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}>
          {tabs.map((tab) => {
            const isActive = pathname === tab.path || pathname.startsWith(tab.path + '/')
            const activeColor = '#DC143C'
            const inactiveColor = isDark ? 'rgba(255,255,255,0.3)' : '#9A9AB0'

            return (
              <button key={tab.path} onClick={() => router.push(tab.path)}
                style={{
                  flex: 1,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
                  padding: '8px 4px',
                  background: isActive
                    ? isDark ? 'rgba(220,20,60,0.12)' : 'rgba(220,20,60,0.06)'
                    : 'transparent',
                  border: 'none', borderRadius: '20px',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}>
                {isActive && (
                  <div style={{position: 'absolute', top: '6px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', borderRadius: '50%', background: activeColor, boxShadow: `0 0 6px ${activeColor}`}}/>
                )}
                <div style={{marginTop: isActive ? '5px' : '0', transition: 'margin 0.2s ease'}}>
                  <tab.Icon size={22} color={isActive ? activeColor : inactiveColor} strokeWidth={isActive ? 2.2 : 1.8}/>
                </div>
                <span style={{fontSize: '10px', fontWeight: isActive ? 700 : 500, color: isActive ? activeColor : inactiveColor, letterSpacing: '0.2px', transition: 'all 0.2s ease'}}>
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
