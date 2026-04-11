'use client'
import { usePathname, useRouter } from 'next/navigation'
import { HomeIcon, FamilyIcon, MicIcon, HeartIcon, ProfileIcon } from './Icons'

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

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
      <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100, padding: '0 16px 24px', background: 'linear-gradient(to top, rgba(248,249,250,1) 60%, rgba(248,249,250,0))', pointerEvents: 'none'}}>
        <div style={{background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderRadius: '28px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 8px 48px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', padding: '6px 4px', pointerEvents: 'all'}}>
          {tabs.map((tab) => {
            const isActive = pathname === tab.path || pathname.startsWith(tab.path + '/')
            return (
              <button key={tab.path} onClick={() => router.push(tab.path)}
                style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '8px 4px', background: isActive ? 'rgba(220,20,60,0.07)' : 'transparent', border: 'none', borderRadius: '20px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease', position: 'relative'}}>
                {isActive && (
                  <div style={{position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', borderRadius: '50%', background: '#DC143C', boxShadow: '0 0 6px rgba(220,20,60,0.8)'}}/>
                )}
                <div style={{marginTop: isActive ? '4px' : '0', transition: 'margin 0.2s ease'}}>
                  <tab.Icon
                    size={22}
                    color={isActive ? '#DC143C' : '#9CA3AF'}
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                </div>
                <span style={{fontSize: '10px', fontWeight: isActive ? 700 : 500, color: isActive ? '#DC143C' : '#9CA3AF', letterSpacing: '0.2px', transition: 'all 0.2s ease'}}>
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
