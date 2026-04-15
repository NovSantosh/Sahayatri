'use client'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'
import { BellIcon, HeartIcon, CommentIcon, FamilyIcon, CalendarIcon, SparkleIcon, CheckIcon, ArrowLeftIcon } from './Icons'

interface Notification {
  _id: string
  type: string
  title?: string
  body?: string
  message?: string
  read: boolean
  createdAt: string
  fromName?: string
}

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

interface Props {
  unreadCount?: number
}

export default function NotificationDrawer({ unreadCount = 0 }: Props) {
  const { data: session } = useSession()
  const { t, theme } = useTheme()
  const isDark = theme === 'dark'
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(unreadCount)

  // Swipe to open from right edge
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const dx = touchStartX.current - e.changedTouches[0].clientX
      const dy = Math.abs(touchStartY.current - e.changedTouches[0].clientY)
      // Swipe left from right edge (last 30px of screen)
      if (touchStartX.current > window.innerWidth - 30 && dx > 40 && dy < 60) {
        setOpen(true)
        fetchNotifications()
      }
      // Swipe right to close
      if (open && dx < -60 && dy < 60) {
        setOpen(false)
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
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

  const handleOpen = () => {
    setOpen(true)
    fetchNotifications()
  }

  const handleClose = () => setOpen(false)

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

  const timeAgo = (date: string) => {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (s < 60) return 'Just now'
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  const today = notifications.filter(n => {
    return new Date(n.createdAt).toDateString() === new Date().toDateString()
  })
  const earlier = notifications.filter(n => {
    return new Date(n.createdAt).toDateString() !== new Date().toDateString()
  })

  return (
    <>
      {/* Bell trigger button */}
      <button
        onClick={handleOpen}
        style={{
          width: '38px', height: '38px',
          borderRadius: '12px',
          background: t.inputBg,
          border: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          flexShrink: 0,
          transition: 'all 0.2s ease',
        }}>
        <BellIcon size={18} color={t.text2} strokeWidth={1.8}/>
        {count > 0 && (
          <div style={{
            position: 'absolute', top: '-4px', right: '-4px',
            minWidth: '16px', height: '16px',
            borderRadius: '8px',
            background: brand.primary,
            border: `2px solid ${t.pageBg}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0 3px',
          }}>
            <span style={{ fontSize: '9px', fontWeight: 800, color: 'white' }}>
              {count > 9 ? '9+' : count}
            </span>
          </div>
        )}
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={handleClose}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 200,
            animation: 'fadeIn 200ms ease',
          }}/>
      )}

      {/* Drawer panel */}
      <div style={{
        position: 'fixed',
        top: 0, right: 0, bottom: 0,
        width: '88%',
        maxWidth: '380px',
        background: t.pageBg,
        zIndex: 201,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 320ms cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.3)',
        borderRadius: '20px 0 0 20px',
        overflow: 'hidden',
      }}>

        {/* Drawer header */}
        <div style={{
          background: t.headerBg,
          backdropFilter: 'blur(20px)',
          padding: '52px 20px 16px',
          borderBottom: `1px solid ${t.border}`,
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Close button with arrow */}
              <button
                onClick={handleClose}
                style={{
                  width: '36px', height: '36px',
                  borderRadius: '10px',
                  background: t.inputBg,
                  border: `1px solid ${t.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}>
                {/* Arrow pointing right — closing direction */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.text2} strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: t.text1, letterSpacing: '-0.4px' }}>
                  Notifications
                  {count > 0 && (
                    <span style={{ marginLeft: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '50%', background: brand.primary, color: 'white', fontSize: '10px', fontWeight: 800, verticalAlign: 'middle' }}>
                      {count}
                    </span>
                  )}
                </h2>
                <p style={{ fontSize: '11px', color: t.text3, marginTop: '2px' }}>
                  {count > 0 ? `${count} unread` : 'All caught up ✓'}
                </p>
              </div>
            </div>

            {count > 0 && (
              <button onClick={markAllRead}
                style={{ padding: '6px 12px', background: brand.primaryLight, border: `1px solid ${brand.primaryBorder}`, borderRadius: '9999px', color: brand.primary, fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', flexShrink: 0 }}>
                Mark all read
              </button>
            )}
          </div>

          {/* Swipe hint */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', opacity: 0.4 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={t.text3} strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              <p style={{ fontSize: '10px', color: t.text3 }}>Swipe right to close</p>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>

          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ display: 'flex', gap: '12px', padding: '12px', background: t.cardBg, borderRadius: '16px' }}>
                  <div className="skeleton" style={{ width: '42px', height: '42px', borderRadius: '12px', flexShrink: 0 }}/>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px' }}>
                    <div className="skeleton" style={{ height: '13px', width: '80%' }}/>
                    <div className="skeleton" style={{ height: '11px', width: '50%' }}/>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && notifications.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <BellIcon size={26} color={brand.primary} strokeWidth={1.8}/>
              </div>
              <p style={{ fontSize: '16px', fontWeight: 700, color: t.text1, marginBottom: '6px' }}>All quiet</p>
              <p style={{ fontSize: '13px', color: t.text3, lineHeight: 1.6 }}>
                Notifications will appear here when there is activity.
              </p>
            </div>
          )}

          {/* Today */}
          {!loading && today.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px' }}>Today</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {today.map(notif => {
                  const config = TYPE_CONFIG[notif.type] || TYPE_CONFIG.system
                  const Icon = config.Icon || BellIcon
                  const text = notif.title || notif.message || 'Notification'
                  return (
                    <div key={notif._id}
                      style={{
                        display: 'flex', gap: '12px', alignItems: 'flex-start',
                        padding: '14px',
                        background: notif.read ? t.cardBg : (isDark ? 'rgba(220,20,60,0.06)' : 'rgba(220,20,60,0.03)'),
                        border: `1px solid ${notif.read ? t.border : brand.primaryBorder}`,
                        borderRadius: '16px',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                      }}>
                      {!notif.read && (
                        <div style={{ position: 'absolute', top: '16px', left: '-4px', width: '6px', height: '6px', borderRadius: '50%', background: brand.primary }}/>
                      )}
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: config.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={18} color={config.color} strokeWidth={1.8}/>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '13px', fontWeight: notif.read ? 400 : 700, color: t.text1, marginBottom: '3px', lineHeight: 1.4 }}>{text}</p>
                        {notif.body && <p style={{ fontSize: '12px', color: t.text3, marginBottom: '3px' }}>{notif.body}</p>}
                        <p style={{ fontSize: '11px', color: t.text3 }}>{timeAgo(notif.createdAt)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Earlier */}
          {!loading && earlier.length > 0 && (
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px' }}>Earlier</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {earlier.map(notif => {
                  const config = TYPE_CONFIG[notif.type] || TYPE_CONFIG.system
                  const Icon = config.Icon || BellIcon
                  const text = notif.title || notif.message || 'Notification'
                  return (
                    <div key={notif._id}
                      style={{
                        display: 'flex', gap: '12px', alignItems: 'flex-start',
                        padding: '14px',
                        background: t.cardBg,
                        border: `1px solid ${t.border}`,
                        borderRadius: '16px',
                        opacity: 0.8,
                      }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: config.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={18} color={config.color} strokeWidth={1.8}/>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '13px', color: t.text1, marginBottom: '3px', lineHeight: 1.4 }}>{text}</p>
                        {notif.body && <p style={{ fontSize: '12px', color: t.text3, marginBottom: '3px' }}>{notif.body}</p>}
                        <p style={{ fontSize: '11px', color: t.text3 }}>{timeAgo(notif.createdAt)}</p>
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
      `}</style>
    </>
  )
}
