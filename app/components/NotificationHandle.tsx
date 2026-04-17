'use client'
import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useSession } from 'next-auth/react'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'
import { BellIcon, HeartIcon, CommentIcon, FamilyIcon, CalendarIcon, SparkleIcon, CheckIcon } from './Icons'

const TYPE_CONFIG: any = {
  like: { color: brand.primary, bg: brand.primaryLight, Icon: HeartIcon },
  comment: { color: '#3B82F6', bg: 'rgba(59,130,246,0.1)', Icon: CommentIcon },
  family: { color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', Icon: FamilyIcon },
  booking: { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', Icon: CalendarIcon },
  companion_arrived: { color: '#10B981', bg: 'rgba(16,185,129,0.1)', Icon: SparkleIcon },
  companion_completed: { color: '#10B981', bg: 'rgba(16,185,129,0.1)', Icon: CheckIcon },
  payment: { color: '#10B981', bg: 'rgba(16,185,129,0.1)', Icon: CheckIcon },
  system: { color: '#6B7280', bg: 'rgba(107,114,128,0.1)', Icon: BellIcon },
}

export default function NotificationHandle({ unreadCount = 0 }: { unreadCount?: number }) {
  const { data: session } = useSession()
  const { t, theme } = useTheme()
  const isDark = theme === 'dark'
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(unreadCount)
  const [handleY, setHandleY] = useState(55)
  const swipeStartX = useRef(0)
  const swipeStartY = useRef(0)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      fetchNotifications()
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const fetchNotifications = async () => {
    if (!session?.user?.email || notifications.length > 0) return
    setLoading(true)
    try {
      const res = await fetch(`/api/notifications?email=${session.user.email}`)
      const data = await res.json()
      setNotifications(data.notifications || [])
    } catch (e) {}
    setLoading(false)
  }

  const timeAgo = (date: string) => {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (s < 60) return 'Just now'
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  const markAllRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    setCount(0)
    try {
      await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session?.user?.email, action: 'markAllRead' })
      })
    } catch (e) {}
  }

  const today = notifications.filter(n =>
    new Date(n.createdAt).toDateString() === new Date().toDateString()
  )
  const earlier = notifications.filter(n =>
    new Date(n.createdAt).toDateString() !== new Date().toDateString()
  )

  if (!mounted) return null

  const ui = (
    <>
      {/* Handle */}
      {!open && (
        <div
          onClick={() => setOpen(true)}
          onTouchEnd={(e) => { e.preventDefault(); setOpen(true); }}
          style={{
            position: 'fixed',
            right: 0,
            top: `${handleY}%`,
            transform: 'translateY(-50%)',
            zIndex: 99999,
            cursor: 'pointer',
          }}>
          <div style={{
            width: '26px',
            paddingTop: '18px',
            paddingBottom: '18px',
            background: isDark ? '#0E0B18' : 'white',
            borderRadius: '10px 0 0 10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '-4px 0 20px rgba(0,0,0,0.2)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
            borderRight: 'none',
          }}>
            {/* Dots top */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width: '2px', height: '2px', borderRadius: '50%', background: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)' }}/>
              ))}
            </div>

            {/* Bell with badge */}
            <div style={{ position: 'relative' }}>
              <BellIcon size={14} color={count > 0 ? brand.primary : (isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)')} strokeWidth={2}/>
              {count > 0 && (
                <div style={{
                  position: 'absolute', top: '-5px', right: '-5px',
                  width: '12px', height: '12px', borderRadius: '50%',
                  background: brand.primary,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: 'badgePulse 2s ease infinite',
                }}>
                  <span style={{ fontSize: '7px', fontWeight: 800, color: 'white' }}>{count > 9 ? '9+' : count}</span>
                </div>
              )}
            </div>

            {/* Left arrow */}
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)'} strokeWidth="2.5" strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>

            {/* Dots bottom */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width: '2px', height: '2px', borderRadius: '50%', background: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)' }}/>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.55)',
            zIndex: 99998,
            animation: 'fadeIn 200ms ease',
          }}/>
      )}

      {/* Drawer */}
      <div style={{
        position: 'fixed',
        top: 0, right: 0, bottom: 0,
        width: '82%',
        maxWidth: '360px',
        background: isDark ? '#06040C' : '#F7F7F8',
        zIndex: 99999,
        transform: open ? 'translateX(0)' : 'translateX(105%)',
        transition: 'transform 300ms cubic-bezier(0.4,0,0.2,1)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.3)',
        borderRadius: '20px 0 0 20px',
      }}
      onTouchStart={(e) => {
        swipeStartX.current = e.touches[0].clientX
        swipeStartY.current = e.touches[0].clientY
      }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - swipeStartX.current
        const dy = Math.abs(e.changedTouches[0].clientY - swipeStartY.current)
        if (dx > 60 && dy < 100) {
          setOpen(false)
          document.body.style.overflow = ''
        }
      }}>

        {/* Header */}
        <div style={{
          padding: '52px 16px 14px',
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'}`,
          background: isDark ? 'rgba(14,11,24,0.98)' : 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(20px)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => setOpen(false)}
                style={{ width: '32px', height: '32px', borderRadius: '9px', background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)'} strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <div>
                <p style={{ fontSize: '16px', fontWeight: 800, color: isDark ? 'white' : '#0F0F10', letterSpacing: '-0.3px' }}>
                  Notifications
                  {count > 0 && (
                    <span style={{ marginLeft: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '18px', height: '18px', borderRadius: '9px', background: brand.primary, color: 'white', fontSize: '10px', fontWeight: 800, verticalAlign: 'middle', padding: '0 4px' }}>
                      {count}
                    </span>
                  )}
                </p>
                <p style={{ fontSize: '11px', color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>
                  {count > 0 ? `${count} unread` : 'All caught up ✓'}
                </p>
              </div>
            </div>
            {count > 0 && (
              <button onClick={markAllRead}
                style={{ padding: '5px 10px', background: brand.primaryLight, border: `1px solid ${brand.primaryBorder}`, borderRadius: '9999px', color: brand.primary, fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                Mark read
              </button>
            )}
          </div>
          <p style={{ fontSize: '10px', color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)' }}>
            Swipe right to close
          </p>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ display: 'flex', gap: '10px', padding: '12px', background: isDark ? '#0E0B18' : 'white', borderRadius: '14px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}>
                  <div className="skeleton" style={{ width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0 }}/>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '7px', paddingTop: '4px' }}>
                    <div className="skeleton" style={{ height: '12px', width: '80%', borderRadius: '6px' }}/>
                    <div className="skeleton" style={{ height: '10px', width: '50%', borderRadius: '6px' }}/>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && notifications.length === 0 && (
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

          {/* Earlier — top */}
          {!loading && earlier.length > 0 && (
            <div>
              <p style={{ fontSize: '10px', fontWeight: 700, color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Earlier</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', opacity: 0.7 }}>
                {earlier.map(notif => {
                  const config = TYPE_CONFIG[notif.type] || TYPE_CONFIG.system
                  const Icon = config.Icon
                  return (
                    <div key={notif._id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '11px', background: isDark ? '#0E0B18' : 'white', border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`, borderRadius: '12px' }}>
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

          {/* Today — bottom (thumb reach) */}
          {!loading && today.length > 0 && (
            <div style={{ marginTop: 'auto' }}>
              <p style={{ fontSize: '10px', fontWeight: 700, color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Today</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {today.map(notif => {
                  const config = TYPE_CONFIG[notif.type] || TYPE_CONFIG.system
                  const Icon = config.Icon
                  return (
                    <div key={notif._id} style={{
                      display: 'flex', gap: '10px', alignItems: 'flex-start',
                      padding: '13px',
                      background: notif.read ? (isDark ? '#0E0B18' : 'white') : (isDark ? 'rgba(220,20,60,0.07)' : 'rgba(220,20,60,0.04)'),
                      border: `1.5px solid ${notif.read ? (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)') : brand.primaryBorder}`,
                      borderRadius: '14px',
                      position: 'relative',
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
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes badgePulse { 0%,100% { box-shadow: 0 0 0 0 rgba(220,20,60,0.4); } 70% { box-shadow: 0 0 0 6px rgba(220,20,60,0); } }
      `}</style>
    </>
  )

  return createPortal(ui, document.body)
}
