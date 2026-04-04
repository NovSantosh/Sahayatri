'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const links = [
  {
    label: 'Home',
    path: '/',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#DC143C' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )
  },
  {
    label: 'Family',
    path: '/family',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#DC143C' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )
  },
  {
    label: 'Sathi',
    path: '/sathi',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#DC143C' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    )
  },
  {
    label: 'Memory',
    path: '/memory',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#DC143C' : 'none'} stroke={active ? '#DC143C' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    )
  },
  {
    label: 'Profile',
    path: '/profile',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#DC143C' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    )
  },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      display: 'flex', paddingBottom: '24px', paddingTop: '8px',
      background: 'rgba(255,255,255,0.96)',
      borderTop: '1px solid #E9EAEC',
      backdropFilter: 'blur(20px)',
      zIndex: 100,
    }}>
      {links.map((item) => {
        const active = pathname === item.path
        return (
          <Link
            key={item.path}
            href={item.path}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '3px',
              textDecoration: 'none', padding: '4px 0',
              transition: 'transform 0.1s ease',
            }}
          >
            {item.icon(active)}
            <span style={{
              fontSize: '10px', fontWeight: 600,
              color: active ? '#DC143C' : '#9CA3AF',
              transition: 'color 0.15s ease',
            }}>
              {item.label}
            </span>
            {active && (
              <div style={{
                width: '4px', height: '4px', borderRadius: '50%',
                background: '#DC143C', marginTop: '-2px',
              }}/>
            )}
          </Link>
        )
      })}
    </div>
  )
}
