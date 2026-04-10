'use client'
import { usePathname, useRouter } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  const tabs = [
    {
      path: '/home',
      label: 'Home',
      active: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z" fill="#DC143C"/>
        </svg>
      ),
      inactive: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z" stroke="#9CA3AF" strokeWidth="1.8" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      path: '/family',
      label: 'Family',
      active: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="7" r="3" fill="#DC143C"/>
          <circle cx="17" cy="8" r="2.5" fill="#DC143C" opacity="0.7"/>
          <path d="M2 21C2 17.134 5.13401 14 9 14C12.866 14 16 17.134 16 21" stroke="#DC143C" strokeWidth="2" strokeLinecap="round"/>
          <path d="M17 13C19.2091 13 21 14.7909 21 17V21" stroke="#DC143C" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
        </svg>
      ),
      inactive: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="7" r="3" stroke="#9CA3AF" strokeWidth="1.8"/>
          <circle cx="17" cy="8" r="2.5" stroke="#9CA3AF" strokeWidth="1.8"/>
          <path d="M2 21C2 17.134 5.13401 14 9 14C12.866 14 16 17.134 16 21" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M17 13C19.2091 13 21 14.7909 21 17V21" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      path: '/sathi',
      label: 'Sathi',
      active: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 1C8.13 1 5 4.13 5 8V13C5 14.1 5.9 15 7 15H9V9H7V8C7 5.24 9.24 3 12 3C14.76 3 17 5.24 17 8V9H15V15H17C18.1 15 19 14.1 19 13V8C19 4.13 15.87 1 12 1Z" fill="#DC143C"/>
          <path d="M9 22C9 22 10 23 12 23C14 23 15 22 15 22V19H9V22Z" fill="#DC143C" opacity="0.6"/>
          <rect x="9" y="15" width="6" height="4" rx="1" fill="#DC143C" opacity="0.8"/>
        </svg>
      ),
      inactive: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 1C8.13 1 5 4.13 5 8V13C5 14.1 5.9 15 7 15H9V9H7V8C7 5.24 9.24 3 12 3C14.76 3 17 5.24 17 8V9H15V15H17C18.1 15 19 14.1 19 13V8C19 4.13 15.87 1 12 1Z" stroke="#9CA3AF" strokeWidth="1.8" strokeLinejoin="round"/>
          <path d="M9 19V21C9 21 10 22 12 22C14 22 15 21 15 21V19" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      path: '/memory',
      label: 'Memory',
      active: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69365 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69365 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12076 20.84 4.61Z" fill="#DC143C"/>
        </svg>
      ),
      inactive: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69365 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69365 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12076 20.84 4.61Z" stroke="#9CA3AF" strokeWidth="1.8" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      path: '/profile',
      label: 'Profile',
      active: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" fill="#DC143C"/>
          <path d="M4 20C4 16.134 7.58172 13 12 13C16.4183 13 20 16.134 20 20" stroke="#DC143C" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      inactive: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke="#9CA3AF" strokeWidth="1.8"/>
          <path d="M4 20C4 16.134 7.58172 13 12 13C16.4183 13 20 16.134 20 20" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
  ]

  return (
    <>
      {/* Spacer */}
      <div style={{height: '80px'}}/>

      {/* Nav */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 16px 24px',
        background: 'linear-gradient(to top, rgba(248,249,250,1) 70%, rgba(248,249,250,0))',
        pointerEvents: 'none',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          padding: '8px 6px',
          pointerEvents: 'all',
        }}>
          {tabs.map((tab) => {
            const isActive = pathname === tab.path || pathname.startsWith(tab.path + '/')
            return (
              <button key={tab.path} onClick={() => router.push(tab.path)}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 4px',
                  background: isActive ? 'rgba(220,20,60,0.06)' : 'transparent',
                  border: 'none',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'Inter, sans-serif',
                  position: 'relative',
                }}>
                {/* Active indicator dot */}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    top: '6px',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: '#DC143C',
                    boxShadow: '0 0 6px rgba(220,20,60,0.6)',
                  }}/>
                )}
                <div style={{marginTop: isActive ? '6px' : '0', transition: 'margin 0.2s ease'}}>
                  {isActive ? tab.active : tab.inactive}
                </div>
                <span style={{
                  fontSize: '10px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#DC143C' : '#9CA3AF',
                  letterSpacing: '0.2px',
                  transition: 'all 0.2s ease',
                }}>
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
