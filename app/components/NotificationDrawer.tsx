'use client'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'
import { BellIcon, HeartIcon, CommentIcon, FamilyIcon, CalendarIcon, SparkleIcon, CheckIcon } from './Icons'

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
  const [handleY, setHandleY] = useState(55) // % from top — default thumb zone
  const [dragging, setDragging] = useState(false)
  const [peeking, setPeeking] = useState(false)
  const handleRef = useRef<HTMLDivElement>(null)
  const dragStartY = useRef(0)
  const dragStartHandleY = useRef(0)

  // Peek animation when new notification arrives
  useEffect(() => {
    if (count > 0 && !open) {
      setPeeking(true)
      const t = setTimeout(() => setPeeking(false), 2000)
      return () => clearTimeout(t)
    }
  }, [count])

  // Swipe from right edge to open
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }
    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX
      const endY = e.changedTouches[0].clientY
      const dx = endX - touchStartX.current
      const dy = Math.abs(endY - touchStartY.current)
      if (touchStartX.current > window.innerWidth - 32 && dx < -40 && dy < 80) {
        setOpen(true)
        fetchNotifications()
      }
      if (open && dx > 60 && dy < 80) {
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

  // Drag handle to reposition
  const handleDragStart = (e: React.TouchEvent) => {
    setDragging(true)
    dragStartY.current = e.touches[0].clientY
    dragStartHandleY.current = handleY
    e.stopPropagation()
  }

  const handleDragMove = (e: React.TouchEvent) => {
    if (!dragging) return
    const dy = e.touches[0].clientY - dragStartY.current
    const screenH = window.innerHeight
    const newY = dragStartHandleY.current + (dy / screenH) * 100
    setHandleY(Math.max(15, Math.min(80, newY)))
    e.stopPropagation()
  }

  const handleDragEnd = () => setDragging(false)

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
    setPeeking(false)
    fetchNotifications()
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

  const timeAgo = (date: string) => {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (s < 60) return 'Just now'
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  const today = notifications.filter(n =>
    new Date(n.createdAt).toDateString() === new Date().toDateString()
  )
  const earlier = notifications.filter(n =>
    new Date(n.createdAt).toDateString() !== new Date().toDateString()
  )

  return (
    <>
      {/* ── FLOATING EDGE HANDLE ── */}
      {!open && (
        <div
          ref={handleRef}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          onClick={handleOpen}
          style={{
            position: 'fixed',
            right: 0,
            top: `${handleY}%`,
            transform: 'translateY(-50%)',
            zIndex: 150,
            cursor: 'pointer',
            userSelect: 'none',
          }}>

          {/* The handle pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0',
            filter: 'drop-shadow(-3px 0 12px rgba(0,0,0,0.2))',
          }}>
            {/* Peek content — slides out when notification arrives */}
            <div style={{
              maxWidth: peeking ? '120px' : '0px',
              overflow: 'hidden',
              transition: 'max-width 400ms cubic-bezier(0.34,1.56,0.64,1)',
              background: isDark ? '#0E0B18' : 'white',
              borderRadius: '10px 0 0 10px',
              padding: peeking ? '8px 10px' : '8px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              boxShadow: '-2px 0 12px rgba(0,0,0,0.1)',
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: brand.primary, flexShrink: 0, animation: 'pulse 1s ease infinite' }}/>
              <p style={{ fontSize: '11px', fontWeight: 700, color: t.text1 }}>
                {count} new
              </p>
            </div>

            {/* Main handle */}
            <div style={{
              width: '28px',
              paddingTop: '20px',
              paddingBottom: '20px',
              background: isDark ? '#0E0B18' : 'white',
              borderRadius: '10px 0 0 10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '-3px 0 16px rgba(0,0,0,0.15)',
              position: 'relative',
            }}>

              {/* Drag indicator — 3 dots */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', opacity: 0.3 }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: '3px', height: '3px', borderRadius: '50%', background: t.text1 }}/>
                ))}
              </div>

              {/* Bell icon */}
              <div style={{ position: 'relative' }}>
                <BellIcon size={16} color={count > 0 ? brand.primary : t.text3} strokeWidth={2}/>
                {count > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '-4px', right: '-4px',
                    width: '14px', height: '14px',
                    borderRadius: '50%',
                    background: brand.primary,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    animation: count > 0 ? 'badgePulse 2s ease infinite' : 'none',
                  }}>
                    <span style={{ fontSize: '8px', fontWeight: 800, color: 'white' }}>
                      {count > 9 ? '9+' : count}
                    </span>
                  </div>
                )}
              </div>

              {/* Arrow pointing left — open cue */}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={t.text3} strokeWidth="2.5" strokeLinecap="round" style={{ opacity: 0.4 }}>
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>

              {/* Drag indicator bottom */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', opacity: 0.3 }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: '3px', height: '3px', borderRadius: '50%', background: t.text1 }}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── OVERLAY ── */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 200,
            animation: 'fadeIn 200ms ease',
          }}/>
      )}

      {/* ── DRAWER PANEL ── */}
      <div style={{
        position: 'fixed',
        top: 0, right: 0, bottom: 0,
        width: '82%',
        maxWidth: '380px',
        background: isDark ? '#06040C' : '#F7F7F8',
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
          background: isDark ? 'rgba(14,11,24,0.95)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          padding: '52px 20px 16px',
          borderBottom: `1px solid ${t.border}`,
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Close — arrow pointing right */}
              <button onClick={() => setOpen(false)}
                style={{ width: '34px', height: '34px', borderRadius: '10px', background: t.inputBg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={t.text2} strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <div>
                <h2 style={{ fontSize: '17px', fontWeight: 800, color: t.text1, letterSpacing: '-0.3px' }}>
                  Notifications
                  {count > 0 && (
                    <span style={{ marginLeft: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '18px', height: '18px', borderRadius: '9px', background: brand.primary, color: 'white', fontSize: '10px', fontWeight: 800, verticalAlign: 'middle', padding: '0 4px' }}>
                      {count}
                    </span>
                  )}
                </h2>
                <p style={{ fontSize: '11px', color: t.text3 }}>
                  {count > 0 ? `${count} unread` : 'All caught up ✓'}
                </p>
              </div>
            </div>
            {count > 0 && (
              <button onClick={markAllRead}
                style={{ padding: '5px 10px', background: brand.primaryLight, border: `1px solid ${brand.primaryBorder}`, borderRadius: '9999px', color: brand.primary, fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', flexShrink: 0 }}>
                Mark read
              </button>
            )}
          </div>
          <p style={{ fontSize: '10px', color: t.text3, opacity: 0.6 }}>
            Swipe right to close · Drag handle to move
          </p>
        </div>

        {/* Scrollable content — newest at bottom, oldest at top */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Loading skeletons */}
          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ display: 'flex', gap: '12px', padding: '14px', background: t.cardBg, borderRadius: '16px', border: `1px solid ${t.border}` }}>
                  <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0 }}/>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div className="skeleton" style={{ height: '13px', width: '80%', borderRadius: '6px' }}/>
                    <div className="skeleton" style={{ height: '11px', width: '50%', borderRadius: '6px' }}/>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && notifications.length === 0 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <BellIcon size={24} color={brand.primary} strokeWidth={1.8}/>
              </div>
              <p style={{ fontSize: '16px', fontWeight: 700, color: t.text1, marginBottom: '6px' }}>All quiet</p>
              <p style={{ fontSize: '13px', color: t.text3, lineHeight: 1.6 }}>
                Notifications appear here when there is activity.
              </p>
            </div>
          )}

          {/* Earlier — shown first (top = older) */}
          {!loading && earlier.length > 0 && (
            <div>
              <p style={{ fontSize: '10px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Earlier</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', opacity: 0.75 }}>
                {earlier.map(notif => {
                  const config = TYPE_CONFIG[notif.type] || TYPE_CONFIG.system
                  const Icon = config.Icon || BellIcon
                  return (
                    <div key={notif._id}
                      style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '12px', background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '14px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: config.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={16} color={config.color} strokeWidth={1.8}/>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '12px', color: t.text1, marginBottom: '2px', lineHeight: 1.4 }}>{notif.title || notif.message}</p>
                        <p style={{ fontSize: '10px', color: t.text3 }}>{timeAgo(notif.createdAt)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Today — shown at bottom (most recent = easiest to reach) */}
          {!loading && today.length > 0 && (
            <div style={{ marginTop: 'auto' }}>
              <p style={{ fontSize: '10px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Today</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {today.map(notif => {
                  const config = TYPE_CONFIG[notif.type] || TYPE_CONFIG.system
                  const Icon = config.Icon || BellIcon
                  return (
                    <div key={notif._id}
                      style={{
                        display: 'flex', gap: '12px', alignItems: 'flex-start',
                        padding: '14px',
                        background: notif.read ? t.cardBg : (isDark ? 'rgba(220,20,60,0.07)' : 'rgba(220,20,60,0.04)'),
                        border: `1.5px solid ${notif.read ? t.border : brand.primaryBorder}`,
                        borderRadius: '16px',
                        position: 'relative',
                        transition: 'all 0.2s ease',
                      }}>
                      {!notif.read && (
                        <div style={{ position: 'absolute', top: '14px', left: '-5px', width: '8px', height: '8px', borderRadius: '50%', background: brand.primary, boxShadow: `0 0 6px ${brand.primary}` }}/>
                      )}
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: config.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={18} color={config.color} strokeWidth={1.8}/>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '13px', fontWeight: notif.read ? 500 : 700, color: t.text1, marginBottom: '3px', lineHeight: 1.4 }}>
                          {notif.title || notif.message}
                        </p>
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
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(0.8); } }
        @keyframes badgePulse { 0%,100% { box-shadow: 0 0 0 0 rgba(220,20,60,0.4); } 50% { box-shadow: 0 0 0 6px rgba(220,20,60,0); } }
      `}</style>
    </>
  )
}
