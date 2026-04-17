'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'
import { BellIcon, HeartIcon, CommentIcon, FamilyIcon, CalendarIcon, SparkleIcon, CheckIcon } from '../components/Icons'

interface Notification {
  _id: string
  type: 'like' | 'comment' | 'family' | 'booking' | 'companion_arrived' | 'companion_completed' | 'payment' | 'sos' | 'system'
  title?: string
  body?: string
  message?: string
  read: boolean
  createdAt: string
  fromName?: string
}

const TYPE_CONFIG: any = {
  like: { color: brand.primary, bg: brand.primaryLight, label: 'Like' },
  comment: { color: '#3B82F6', bg: 'rgba(59,130,246,0.1)', label: 'Comment' },
  family: { color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', label: 'Family' },
  booking: { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', label: 'Booking' },
  companion_arrived: { color: '#10B981', bg: 'rgba(16,185,129,0.1)', label: 'Companion' },
  companion_completed: { color: '#10B981', bg: 'rgba(16,185,129,0.1)', label: 'Visit Done' },
  payment: { color: '#10B981', bg: 'rgba(16,185,129,0.1)', label: 'Payment' },
  sos: { color: brand.primary, bg: brand.primaryLight, label: 'SOS' },
  system: { color: '#6B7280', bg: 'rgba(107,114,128,0.1)', label: 'System' },
}

const TYPE_ICON: any = {
  like: HeartIcon,
  comment: CommentIcon,
  family: FamilyIcon,
  booking: CalendarIcon,
  companion_arrived: SparkleIcon,
  companion_completed: CheckIcon,
  payment: CheckIcon,
  sos: BellIcon,
  system: BellIcon,
}

export default function Notifications() {
  const { data: session } = useSession()
  const { t, theme } = useTheme()
  const isDark = theme === 'dark'
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user?.email) fetchNotifications()
    else setLoading(false)
  }, [session])

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`/api/notifications?email=${session?.user?.email}`)
      const data = await res.json()
      setNotifications(data.notifications || [])
    } catch (e) {}
    setLoading(false)
  }

  const markAllRead = async () => {
    try {
      await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session?.user?.email, action: 'markAllRead' })
      })
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    } catch (e) {}
  }

  const markRead = async (id: string) => {
    setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n))
    try {
      await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session?.user?.email, action: 'markRead', id })
      })
    } catch (e) {}
  }

  const timeAgo = (date: string) => {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (s < 60) return 'Just now'
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    if (s < 604800) return `${Math.floor(s / 86400)}d ago`
    return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  }

  const unreadCount = notifications.filter(n => !n.read).length
  const today = notifications.filter(n => {
    const d = new Date(n.createdAt)
    const now = new Date()
    return d.toDateString() === now.toDateString()
  })
  const earlier = notifications.filter(n => {
    const d = new Date(n.createdAt)
    const now = new Date()
    return d.toDateString() !== now.toDateString()
  })

  const card = {
    background: t.cardBg,
    borderRadius: '20px',
    border: `1px solid ${t.border}`,
    boxShadow: t.shadow,
  }

  const NotifItem = ({ notif }: { notif: Notification }) => {
    const config = TYPE_CONFIG[notif.type] || TYPE_CONFIG.system
    const Icon = TYPE_ICON[notif.type] || BellIcon
    const text = notif.title || notif.message || 'New notification'
    const sub = notif.body || notif.fromName || ''

    return (
      <div
        onClick={() => markRead(notif._id)}
        style={{
          display: 'flex', gap: '14px', alignItems: 'flex-start',
          padding: '14px 16px',
          background: notif.read ? 'transparent' : (isDark ? 'rgba(220,20,60,0.04)' : 'rgba(220,20,60,0.03)'),
          cursor: 'pointer',
          transition: 'background 0.2s ease',
          position: 'relative',
        }}
        className="pressable">

        {/* Unread indicator */}
        {!notif.read && (
          <div style={{
            position: 'absolute', left: '6px', top: '50%',
            transform: 'translateY(-50%)',
            width: '4px', height: '4px', borderRadius: '50%',
            background: brand.primary,
          }}/>
        )}

        {/* Icon */}
        <div style={{
          width: '44px', height: '44px', borderRadius: '14px',
          background: config.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon size={20} color={config.color} strokeWidth={1.8}/>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: '14px', fontWeight: notif.read ? 400 : 700,
            color: t.text1, marginBottom: '3px', lineHeight: 1.4,
          }}>
            {text}
          </p>
          {sub && (
            <p style={{ fontSize: '12px', color: t.text3, marginBottom: '4px', lineHeight: 1.4 }}>
              {sub}
            </p>
          )}
          <p style={{ fontSize: '11px', color: t.text3 }}>
            {timeAgo(notif.createdAt)}
          </p>
        </div>

        {/* Type badge */}
        <div style={{
          padding: '3px 8px', borderRadius: '9999px',
          background: config.bg, flexShrink: 0,
        }}>
          <span style={{ fontSize: '10px', fontWeight: 700, color: config.color }}>
            {config.label}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '100px', transition: 'background 0.3s ease' }}>

      {/* Header */}
      <div style={{ background: t.headerBg, backdropFilter: 'blur(20px)', padding: '52px 20px 16px', borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 900, color: t.text1, letterSpacing: '-0.6px' }}>
              Notifications
              {unreadCount > 0 && (
                <span style={{ marginLeft: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', borderRadius: '50%', background: brand.primary, color: 'white', fontSize: '11px', fontWeight: 800, verticalAlign: 'middle' }}>
                  {unreadCount}
                </span>
              )}
            </h1>
            <p style={{ fontSize: '12px', color: t.text3, marginTop: '2px' }}>
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead}
              style={{ padding: '8px 14px', background: brand.primaryLight, border: `1px solid ${brand.primaryBorder}`, borderRadius: '10px', color: brand.primary, fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              Mark all read
            </button>
          )}
        </div>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Loading */}
        {loading && (
          <div style={{ ...card, overflow: 'hidden' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ display: 'flex', gap: '14px', padding: '14px 16px', borderBottom: i < 4 ? `1px solid ${t.border}` : 'none' }}>
                <div className="skeleton" style={{ width: '44px', height: '44px', borderRadius: '14px', flexShrink: 0 }}/>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="skeleton" style={{ height: '14px', width: '75%' }}/>
                  <div className="skeleton" style={{ height: '11px', width: '40%' }}/>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && notifications.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '20px', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <BellIcon size={32} color={brand.primary} strokeWidth={1.8}/>
            </div>
            <p style={{ fontSize: '18px', fontWeight: 700, color: t.text1, marginBottom: '8px' }}>All quiet</p>
            <p style={{ fontSize: '14px', color: t.text3, lineHeight: 1.6, maxWidth: '220px', margin: '0 auto' }}>
              You are all caught up. Notifications will appear here.
            </p>
          </div>
        )}

        {/* Today */}
        {!loading && today.length > 0 && (
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px', paddingLeft: '4px' }}>
              Today
            </p>
            <div style={{ ...card, overflow: 'hidden' }}>
              {today.map((notif, i) => (
                <div key={notif._id}>
                  <NotifItem notif={notif}/>
                  {i < today.length - 1 && <div style={{ height: '1px', background: t.border, marginLeft: '74px' }}/>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Earlier */}
        {!loading && earlier.length > 0 && (
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px', paddingLeft: '4px' }}>
              Earlier
            </p>
            <div style={{ ...card, overflow: 'hidden', opacity: 0.85 }}>
              {earlier.map((notif, i) => (
                <div key={notif._id}>
                  <NotifItem notif={notif}/>
                  {i < earlier.length - 1 && <div style={{ height: '1px', background: t.border, marginLeft: '74px' }}/>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Demo notifications when empty — so screen doesn't feel dead */}
        {!loading && notifications.length === 0 && (
          <div style={{ ...card, overflow: 'hidden', opacity: 0.5 }}>
            <p style={{ padding: '12px 16px 8px', fontSize: '11px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Example</p>
            {[
              { type: 'companion_completed', title: 'Visit complete — Shanti Devi', body: 'Sita Sharma completed today\'s visit', read: true, time: '2h ago' },
              { type: 'like', title: 'Krishna liked your moment', body: '', read: true, time: '5h ago' },
              { type: 'booking', title: 'Booking confirmed', body: 'Daily Check-in · Starting tomorrow', read: true, time: '1d ago' },
            ].map((demo, i) => {
              const config = TYPE_CONFIG[demo.type]
              const Icon = TYPE_ICON[demo.type] || BellIcon
              return (
                <div key={i}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '14px 16px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: config.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={20} color={config.color} strokeWidth={1.8}/>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px', fontWeight: 400, color: t.text1, marginBottom: '3px' }}>{demo.title}</p>
                      {demo.body && <p style={{ fontSize: '12px', color: t.text3, marginBottom: '4px' }}>{demo.body}</p>}
                      <p style={{ fontSize: '11px', color: t.text3 }}>{demo.time}</p>
                    </div>
                    <div style={{ padding: '3px 8px', borderRadius: '9999px', background: config.bg }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: config.color }}>{config.label}</span>
                    </div>
                  </div>
                  {i < 2 && <div style={{ height: '1px', background: t.border, marginLeft: '74px' }}/>}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
