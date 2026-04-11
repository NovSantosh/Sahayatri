'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import BottomNav from '../components/BottomNav'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'
import { BellIcon, HeartIcon, CommentIcon, FamilyIcon, CalendarIcon, SparkleIcon } from '../components/Icons'

interface Notification {
  _id: string
  type: 'like' | 'comment' | 'family' | 'booking' | 'system'
  message: string
  read: boolean
  createdAt: string
  fromName?: string
}

export default function Notifications() {
  const { data: session } = useSession()
  const { t } = useTheme()
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user?.email) fetchNotifications()
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

  const timeAgo = (date: string) => {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (s < 60) return 'just now'
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return { Icon: HeartIcon, color: brand.primary, bg: brand.primaryLight }
      case 'comment': return { Icon: CommentIcon, color: brand.info, bg: brand.infoBg }
      case 'family': return { Icon: FamilyIcon, color: brand.success, bg: brand.successBg }
      case 'booking': return { Icon: CalendarIcon, color: brand.warning, bg: brand.warningBg }
      default: return { Icon: SparkleIcon, color: brand.primary, bg: brand.primaryLight }
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const card = {
    background: t.cardBg,
    borderRadius: '20px',
    border: `1px solid ${t.border}`,
    boxShadow: t.shadow,
    transition: 'background 0.3s ease, border-color 0.3s ease',
  }

  // Sample notifications if none exist
  const displayNotifications = notifications.length > 0 ? notifications : []

  return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, -apple-system, sans-serif', paddingBottom: '100px', transition: 'background 0.3s ease'}}>

      {/* ── HEADER ── */}
      <div style={{background: t.headerBg, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: '52px 20px 16px', borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 50, transition: 'background 0.3s ease'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div>
            <h1 style={{fontSize: '24px', fontWeight: 900, color: t.text1, letterSpacing: '-0.8px', transition: 'color 0.3s ease'}}>Notifications</h1>
            <p style={{fontSize: '12px', color: t.text3, marginTop: '3px'}}>
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead}
              style={{padding: '8px 16px', background: brand.primaryLight, border: `1px solid ${brand.primaryBorder}`, borderRadius: '9999px', color: brand.primary, fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
              Mark all read
            </button>
          )}
        </div>
      </div>

      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px'}}>

        {/* Loading */}
        {loading && (
          <div style={{textAlign: 'center', padding: '60px 20px'}}>
            <div style={{width: '36px', height: '36px', border: `3px solid ${t.border}`, borderTop: `3px solid ${brand.primary}`, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px'}}/>
            <p style={{fontSize: '13px', color: t.text3}}>Loading notifications…</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && displayNotifications.length === 0 && (
          <div style={{...card, padding: '56px 24px', textAlign: 'center', marginTop: '16px'}}>
            <div style={{width: '64px', height: '64px', borderRadius: '50%', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'}}>
              <BellIcon size={28} color={brand.primary} strokeWidth={1.5}/>
            </div>
            <h3 style={{fontSize: '17px', fontWeight: 700, color: t.text1, marginBottom: '8px'}}>All quiet here</h3>
            <p style={{fontSize: '13px', color: t.text3, lineHeight: 1.6, maxWidth: '220px', margin: '0 auto'}}>
              When someone likes or comments on your moments, you will see it here.
            </p>
          </div>
        )}

        {/* Notifications list */}
        {!loading && displayNotifications.length > 0 && (
          <>
            {/* Unread section */}
            {displayNotifications.filter(n => !n.read).length > 0 && (
              <div>
                <p style={{fontSize: '11px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px', paddingLeft: '4px'}}>New</p>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  {displayNotifications.filter(n => !n.read).map((notif) => {
                    const { Icon, color, bg } = getIcon(notif.type)
                    return (
                      <div key={notif._id}
                        style={{...card, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', borderLeft: `3px solid ${brand.primary}`}}>
                        {/* Unread dot */}
                        <div style={{position: 'absolute', top: '14px', right: '14px', width: '7px', height: '7px', borderRadius: '50%', background: brand.primary, boxShadow: `0 0 6px ${brand.primary}`}}/>
                        <div style={{width: '44px', height: '44px', borderRadius: '14px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                          <Icon size={22} color={color} strokeWidth={1.8}/>
                        </div>
                        <div style={{flex: 1, paddingRight: '16px'}}>
                          {notif.fromName && (
                            <p style={{fontSize: '13px', fontWeight: 800, color: t.text1, marginBottom: '3px', transition: 'color 0.3s ease'}}>{notif.fromName}</p>
                          )}
                          <p style={{fontSize: '13px', color: t.text2, lineHeight: 1.5, transition: 'color 0.3s ease'}}>{notif.message}</p>
                          <p style={{fontSize: '11px', color: t.text3, marginTop: '4px'}}>{timeAgo(notif.createdAt)}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Read section */}
            {displayNotifications.filter(n => n.read).length > 0 && (
              <div style={{marginTop: '8px'}}>
                <p style={{fontSize: '11px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px', paddingLeft: '4px'}}>Earlier</p>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  {displayNotifications.filter(n => n.read).map((notif) => {
                    const { Icon, color, bg } = getIcon(notif.type)
                    return (
                      <div key={notif._id}
                        style={{...card, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '14px', opacity: 0.75}}>
                        <div style={{width: '44px', height: '44px', borderRadius: '14px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                          <Icon size={22} color={color} strokeWidth={1.8}/>
                        </div>
                        <div style={{flex: 1}}>
                          {notif.fromName && (
                            <p style={{fontSize: '13px', fontWeight: 800, color: t.text1, marginBottom: '3px', transition: 'color 0.3s ease'}}>{notif.fromName}</p>
                          )}
                          <p style={{fontSize: '13px', color: t.text2, lineHeight: 1.5, transition: 'color 0.3s ease'}}>{notif.message}</p>
                          <p style={{fontSize: '11px', color: t.text3, marginTop: '4px'}}>{timeAgo(notif.createdAt)}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}

      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <BottomNav/>
    </div>
  )
}
