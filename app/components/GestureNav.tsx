'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { createPortal } from 'react-dom'

import { brand } from '../design-system'
import { BellIcon, HeartIcon, CommentIcon, FamilyIcon, CalendarIcon, SparkleIcon, CheckIcon, HomeIconActive, HomeIconInactive, FamilyIconActive, FamilyIconInactive, MomentsIconActive, MomentsIconInactive, SathiIconActive, SathiIconInactive, ProfileIconActive, ProfileIconInactive } from './Icons'

const TABS = [
  {
    path: '/home',
    label: 'Home',
    icon: (color: string, size: number, active: boolean) => active
      ? <HomeIconActive size={size}/>
      : <HomeIconInactive size={size} color={color}/>,
  },
  {
    path: '/family',
    label: 'Family',
    icon: (color: string, size: number, active: boolean) => active
      ? <FamilyIconActive size={size}/>
      : <FamilyIconInactive size={size} color={color}/>,
  },
  {
    path: '/memory',
    label: 'Moments',
    icon: (color: string, size: number, active: boolean) => active
      ? <MomentsIconActive size={size}/>
      : <MomentsIconInactive size={size} color={color}/>,
  },
  {
    path: '/sathi',
    label: 'Sathi',
    icon: (color: string, size: number, active: boolean) => active
      ? <SathiIconActive size={size}/>
      : <SathiIconInactive size={size} color={color}/>,
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: (color: string, size: number, active: boolean) => active
      ? <ProfileIconActive size={size}/>
      : <ProfileIconInactive size={size} color={color}/>,
  },
]

const NOTIF_TYPE_CONFIG: any = {
  like: { color: brand.primary, bg: brand.primaryLight, Icon: HeartIcon },
  comment: { color: '#3B82F6', bg: 'rgba(59,130,246,0.1)', Icon: CommentIcon },
  family: { color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', Icon: FamilyIcon },
  booking: { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', Icon: CalendarIcon },
  companion_arrived: { color: '#10B981', bg: 'rgba(16,185,129,0.1)', Icon: SparkleIcon },
  companion_completed: { color: '#10B981', bg: 'rgba(16,185,129,0.1)', Icon: CheckIcon },
  payment: { color: '#10B981', bg: 'rgba(16,185,129,0.1)', Icon: CheckIcon },
  system: { color: '#6B7280', bg: 'rgba(107,114,128,0.1)', Icon: BellIcon },
}

type NavState = 'hidden' | 'mini' | 'full'
type Panel = 'nav' | 'notifications'

export default function GestureNav({ side: defaultSide = 'right' }: { side?: 'left' | 'right' }) {
  const [side, setSide] = useState<'left' | 'right'>(defaultSide)

  useEffect(() => {
    const saved = localStorage.getItem('navSide') as 'left' | 'right' | null
    if (saved) setSide(saved)
  }, [])
  const router = useRouter()
  const pathname = usePathname()
  const { data: session } = useSession()
  import { useTheme } from 'next-themes'
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [mounted, setMounted] = useState(false)
  const [navState, setNavState] = useState<NavState>('hidden')
  const [panel, setPanel] = useState<Panel>('nav')
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [notifLoading, setNotifLoading] = useState(false)
  const [unreadCount, setUnreadCount] = useState(3)
  const autoCollapseRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const notifSwipeStartX = useRef(0)
  const notifSwipeStartY = useRef(0)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (navState === 'full') {
      document.body.style.overflow = 'hidden'
      // Auto close after 1.5 seconds
      autoCollapseRef.current = setTimeout(() => {
        setNavState('mini')
        document.body.style.overflow = ''
      }, 1500)
    } else {
      document.body.style.overflow = ''
    }
    return () => { if (autoCollapseRef.current) clearTimeout(autoCollapseRef.current) }
  }, [navState])

  // Close on scroll instantly
  useEffect(() => {
    const onScroll = () => {
      if (navState === 'full') {
        if (autoCollapseRef.current) clearTimeout(autoCollapseRef.current)
        setNavState('mini')
        document.body.style.overflow = ''
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('touchmove', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('touchmove', onScroll)
    }
  }, [navState])

  useEffect(() => {
    if (navState === 'mini') {
      autoCollapseRef.current = setTimeout(() => setNavState('hidden'), 2500)
    }
  }, [navState])

  useEffect(() => {
    if (notifOpen) {
      document.body.style.overflow = 'hidden'
      fetchNotifications()
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [notifOpen])

  const fetchNotifications = async () => {
    if (!session?.user?.email || notifications.length > 0) return
    setNotifLoading(true)
    try {
      const res = await fetch(`/api/notifications?email=${session.user.email}`)
      const data = await res.json()
      setNotifications(data.notifications || [])
    } catch (e) {}
    setNotifLoading(false)
  }

  const markAllRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
    try {
      await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session?.user?.email, action: 'markAllRead' })
      })
    } catch (e) {}
  }

  const timeAgo = (date: string) => {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (s < 60) return 'Just now'
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

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
      if (notifOpen) return
      if (side === 'right') {
        if (touchStartX.current > window.innerWidth - 40 && dx < -40 && dy < 80) setNavState('full')
        if (navState === 'full' && dx > 60 && dy < 80) setNavState('mini')
      } else {
        if (touchStartX.current < 40 && dx > 40 && dy < 80) setNavState('full')
        if (navState === 'full' && dx < -60 && dy < 80) setNavState('mini')
      }
    }
    document.addEventListener('touchstart', onTouchStart, { passive: true })
    document.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchend', onTouchEnd)
    }
  }, [navState, notifOpen, side])

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

  const openNotifications = () => {
    setNavState('hidden')
    setNotifOpen(true)
  }

  if (!mounted) return null

  // Hide on public pages
  const publicPages = ['/', '/login', '/signup', '/about']
  if (publicPages.some(p => pathname === p)) return null

  const edgeSide = side === 'right' ? { right: 0 } : { left: 0 }
  const borderRadius = side === 'right' ? '12px 0 0 12px' : '0 12px 12px 0'
  const borderStyle = side === 'right' ? { borderRight: 'none' } : { borderLeft: 'none' }
  const bg = isDark ? '#0E0B18' : 'white'
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'

  const todayNotifs = notifications.filter(n =>
    new Date(n.createdAt).toDateString() === new Date().toDateString()
  )
  const earlierNotifs = notifications.filter(n =>
    new Date(n.createdAt).toDateString() !== new Date().toDateString()
  )

  const ui = (
    <>
      {/* ── NAV OVERLAY ── */}
      {navState === 'full' && (
        <div onClick={() => setNavState('mini')}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 99990, animation: 'gFadeIn 200ms ease' }}/>
      )}

      {/* ── FULL NAV DOCK ── */}
      {navState === 'full' && (
        <div style={{
          position: 'fixed', top: '62%', transform: 'translateY(-50%)',
          ...edgeSide, zIndex: 99991,
          display: 'flex', flexDirection: 'column', gap: '4px',
          padding: '12px 0',
          background: bg, borderRadius,
          boxShadow: side === 'right' ? '-8px 0 32px rgba(0,0,0,0.25)' : '8px 0 32px rgba(0,0,0,0.25)',
          border: `1px solid ${borderColor}`, ...borderStyle,
          animation: 'gSlideIn 250ms cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          {/* Nav tabs */}
          {TABS.map((tab) => {
            const active = isActive(tab.path)
            return (
              <button key={tab.path}
                onClick={(e) => { e.stopPropagation(); navigate(tab.path) }}
                style={{
                  width: '68px', padding: '8px 6px',
                  background: active ? brand.primaryLight : 'transparent',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                  fontFamily: 'Inter, sans-serif',
                }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '12px',
                  background: active ? brand.primaryLight : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: active ? `1.5px solid ${brand.primaryBorder}` : `1px solid ${borderColor}`,
                  boxShadow: active ? '0 4px 12px rgba(220,20,60,0.2)' : 'none',
                }}>
                  {tab.icon(active ? brand.primary : (isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'), 22, active)}
                </div>
                <p style={{ fontSize: '10px', fontWeight: active ? 700 : 500, color: active ? brand.primary : (isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'), margin: 0 }}>
                  {tab.label}
                </p>
              </button>
            )
          })}

          {/* Divider */}
          <div style={{ height: '1px', background: borderColor, margin: '4px 12px' }}/>

          {/* Notifications button */}
          <button
            onClick={(e) => { e.stopPropagation(); openNotifications() }}
            style={{
              width: '68px', padding: '8px 6px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
              fontFamily: 'Inter, sans-serif',
            }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${borderColor}`,
              position: 'relative',
            }}>
              <BellIcon size={18} color={unreadCount > 0 ? brand.primary : (isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)')} strokeWidth={2}/>
              {unreadCount > 0 && (
                <div style={{
                  position: 'absolute', top: '-4px', right: '-4px',
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: brand.primary,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: 'gBadgePulse 2s ease infinite',
                }}>
                  <span style={{ fontSize: '9px', fontWeight: 800, color: 'white' }}>{unreadCount > 9 ? '9+' : unreadCount}</span>
                </div>
              )}
            </div>
            <p style={{ fontSize: '10px', fontWeight: 500, color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', margin: 0 }}>
              Alerts
            </p>
          </button>
        </div>
      )}

      {/* ── MINI DOCK ── */}
      {navState === 'mini' && (
        <div style={{
          position: 'fixed', top: '62%', transform: 'translateY(-50%)',
          ...edgeSide, zIndex: 99991,
          display: 'flex', flexDirection: 'column', gap: '3px',
          padding: '8px 0',
          background: bg, borderRadius,
          boxShadow: side === 'right' ? '-4px 0 16px rgba(0,0,0,0.15)' : '4px 0 16px rgba(0,0,0,0.15)',
          border: `1px solid ${borderColor}`, ...borderStyle,
          animation: 'gSlideIn 300ms cubic-bezier(0.4,0,0.2,1)',
        }}>
          {TABS.map((tab) => {
            const active = isActive(tab.path)
            return (
              <button key={tab.path} onClick={() => navigate(tab.path)}
                style={{
                  width: '34px', height: '30px',
                  background: active ? brand.primaryLight : 'transparent',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                {tab.icon(active ? brand.primary : (isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)'), 16, active)}
              </button>
            )
          })}
          <div style={{ height: '1px', background: borderColor, margin: '2px 6px' }}/>
          <button onClick={openNotifications}
            style={{ width: '34px', height: '30px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <BellIcon size={13} color={unreadCount > 0 ? brand.primary : (isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)')} strokeWidth={2}/>
            {unreadCount > 0 && (
              <div style={{ position: 'absolute', top: '4px', right: '4px', width: '7px', height: '7px', borderRadius: '50%', background: brand.primary }}/>
            )}
          </button>
        </div>
      )}

      {/* ── HIDDEN HANDLE ── */}
      {navState === 'hidden' && !notifOpen && (
        <div onClick={() => setNavState('full')}
          style={{
            position: 'fixed', top: '62%', transform: 'translateY(-50%)',
            ...edgeSide, zIndex: 99991, cursor: 'pointer',
            width: '16px', paddingTop: '24px', paddingBottom: '24px',
            background: bg, borderRadius,
            border: `1px solid ${borderColor}`, ...borderStyle,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
            boxShadow: side === 'right' ? '-3px 0 10px rgba(0,0,0,0.1)' : '3px 0 10px rgba(0,0,0,0.1)',
            opacity: 0.65,
          }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: '2px', height: '2px', borderRadius: '50%', background: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)' }}/>
          ))}
          <svg width="7" height="7" viewBox="0 0 24 24" fill="none"
            stroke={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}
            strokeWidth="2.5" strokeLinecap="round" style={{ marginTop: '2px' }}>
            {side === 'right' ? <path d="M15 18l-6-6 6-6"/> : <path d="M9 18l6-6-6-6"/>}
          </svg>
          {unreadCount > 0 && (
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: brand.primary, marginTop: '2px', animation: 'gBadgePulse 2s ease infinite' }}/>
          )}
        </div>
      )}

      {/* ── NOTIFICATION OVERLAY ── */}
      {notifOpen && (
        <div onClick={() => setNotifOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 99992, animation: 'gFadeIn 200ms ease' }}/>
      )}

      {/* ── NOTIFICATION PANEL ── */}
      <div
        onTouchStart={(e) => { notifSwipeStartX.current = e.touches[0].clientX; notifSwipeStartY.current = e.touches[0].clientY }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - notifSwipeStartX.current
          const dy = Math.abs(e.changedTouches[0].clientY - notifSwipeStartY.current)
          if (side === 'right' && dx > 60 && dy < 100) { setNotifOpen(false); document.body.style.overflow = '' }
          if (side === 'left' && dx < -60 && dy < 100) { setNotifOpen(false); document.body.style.overflow = '' }
        }}
        style={{
          position: 'fixed',
          top: 0, bottom: 0,
          ...(side === 'right' ? { right: 0 } : { left: 0 }),
          width: '80%', maxWidth: '360px',
          background: isDark ? '#06040C' : '#F7F7F8',
          zIndex: 99993,
          transform: notifOpen ? 'translateX(0)' : (side === 'right' ? 'translateX(105%)' : 'translateX(-105%)'),
          transition: 'transform 300ms cubic-bezier(0.4,0,0.2,1)',
          display: 'flex', flexDirection: 'column',
          borderRadius: side === 'right' ? '20px 0 0 20px' : '0 20px 20px 0',
          boxShadow: side === 'right' ? '-8px 0 40px rgba(0,0,0,0.3)' : '8px 0 40px rgba(0,0,0,0.3)',
        }}>

        {/* Notif header */}
        <div style={{
          padding: '52px 16px 14px',
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'}`,
          background: isDark ? 'rgba(14,11,24,0.98)' : 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(20px)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => { setNotifOpen(false); document.body.style.overflow = '' }}
                style={{ width: '32px', height: '32px', borderRadius: '9px', background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke={isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)'}
                  strokeWidth="2.5" strokeLinecap="round">
                  {side === 'right' ? <path d="M5 12h14M12 5l7 7-7 7"/> : <path d="M19 12H5M12 5l-7 7 7 7"/>}
                </svg>
              </button>
              <div>
                <p style={{ fontSize: '16px', fontWeight: 800, color: isDark ? 'white' : '#0F0F10', letterSpacing: '-0.3px', margin: 0 }}>
                  Notifications
                  {unreadCount > 0 && (
                    <span style={{ marginLeft: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '18px', height: '18px', borderRadius: '9px', background: brand.primary, color: 'white', fontSize: '10px', fontWeight: 800, verticalAlign: 'middle', padding: '0 4px' }}>
                      {unreadCount}
                    </span>
                  )}
                </p>
                <p style={{ fontSize: '11px', color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', margin: 0 }}>
                  {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up ✓'}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <button onClick={markAllRead}
                style={{ padding: '5px 10px', background: brand.primaryLight, border: `1px solid ${brand.primaryBorder}`, borderRadius: '9999px', color: brand.primary, fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                Mark read
              </button>
            )}
          </div>
          <p style={{ fontSize: '10px', color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)', margin: '6px 0 0' }}>
            Swipe {side === 'right' ? 'right' : 'left'} to close
          </p>
        </div>

        {/* Notif content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {notifLoading && [1,2,3].map(i => (
            <div key={i} style={{ display: 'flex', gap: '10px', padding: '12px', background: isDark ? '#0E0B18' : 'white', borderRadius: '14px', border: `1px solid ${borderColor}` }}>
              <div className="skeleton" style={{ width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0 }}/>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '7px', paddingTop: '4px' }}>
                <div className="skeleton" style={{ height: '12px', width: '80%', borderRadius: '6px' }}/>
                <div className="skeleton" style={{ height: '10px', width: '50%', borderRadius: '6px' }}/>
              </div>
            </div>
          ))}

          {!notifLoading && notifications.length === 0 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 16px', textAlign: 'center' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <BellIcon size={22} color={brand.primary} strokeWidth={1.8}/>
              </div>
              <p style={{ fontSize: '15px', fontWeight: 700, color: isDark ? 'white' : '#0F0F10', marginBottom: '6px' }}>All quiet</p>
              <p style={{ fontSize: '13px', color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', lineHeight: 1.5 }}>
                Notifications appear here when there is activity
              </p>
            </div>
          )}

          {!notifLoading && earlierNotifs.length > 0 && (
            <div>
              <p style={{ fontSize: '10px', fontWeight: 700, color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Earlier</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', opacity: 0.7 }}>
                {earlierNotifs.map(notif => {
                  const config = NOTIF_TYPE_CONFIG[notif.type] || NOTIF_TYPE_CONFIG.system
                  const Icon = config.Icon
                  return (
                    <div key={notif._id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '11px', background: isDark ? '#0E0B18' : 'white', border: `1px solid ${borderColor}`, borderRadius: '12px' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: config.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={15} color={config.color} strokeWidth={1.8}/>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '12px', color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', marginBottom: '2px', lineHeight: 1.4 }}>{notif.title || notif.message}</p>
                        <p style={{ fontSize: '10px', color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>{timeAgo(notif.createdAt)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {!notifLoading && todayNotifs.length > 0 && (
            <div style={{ marginTop: 'auto' }}>
              <p style={{ fontSize: '10px', fontWeight: 700, color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Today</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {todayNotifs.map(notif => {
                  const config = NOTIF_TYPE_CONFIG[notif.type] || NOTIF_TYPE_CONFIG.system
                  const Icon = config.Icon
                  return (
                    <div key={notif._id} style={{
                      display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '13px',
                      background: notif.read ? (isDark ? '#0E0B18' : 'white') : (isDark ? 'rgba(220,20,60,0.07)' : 'rgba(220,20,60,0.04)'),
                      border: `1.5px solid ${notif.read ? borderColor : brand.primaryBorder}`,
                      borderRadius: '14px', position: 'relative',
                    }}>
                      {!notif.read && (
                        <div style={{ position: 'absolute', left: '-4px', top: '14px', width: '7px', height: '7px', borderRadius: '50%', background: brand.primary, boxShadow: `0 0 6px ${brand.primary}` }}/>
                      )}
                      <div style={{ width: '38px', height: '38px', borderRadius: '11px', background: config.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={17} color={config.color} strokeWidth={1.8}/>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '13px', fontWeight: notif.read ? 500 : 700, color: isDark ? 'white' : '#0F0F10', marginBottom: '3px', lineHeight: 1.4 }}>
                          {notif.title || notif.message}
                        </p>
                        {notif.body && <p style={{ fontSize: '11px', color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', marginBottom: '3px' }}>{notif.body}</p>}
                        <p style={{ fontSize: '10px', color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>{timeAgo(notif.createdAt)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes gFadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes gSlideIn { from { opacity:0; transform:translateY(-50%) scale(0.9) } to { opacity:1; transform:translateY(-50%) scale(1) } }
        @keyframes gBadgePulse { 0%,100% { box-shadow:0 0 0 0 rgba(220,20,60,0.4) } 70% { box-shadow:0 0 0 5px rgba(220,20,60,0) } }
      `}</style>
    </>
  )

  return createPortal(ui, document.body)
}
