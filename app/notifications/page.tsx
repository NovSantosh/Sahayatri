'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import BottomNav from '../components/BottomNav'
import { DS } from '../design-system'

export default function Notifications() {
  const { data: session } = useSession()
  const router = useRouter()
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user?.email) fetchNotifications()
  }, [session])

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`/api/notifications?email=${session?.user?.email}`)
      const data = await res.json()
      setNotifications(data.notifications || [])
      await fetch('/api/notifications', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: session?.user?.email }) })
    } catch (e) {}
    setLoading(false)
  }

  const timeAgo = (date: string) => {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (s < 60) return 'just now'
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  const typeIcon: any = { like: '❤️', comment: '💬', booking: '📅', system: '🔔' }

  return (
    <div style={{minHeight: '100vh', background: DS.colors.pageBg, fontFamily: 'Inter, -apple-system, sans-serif', paddingBottom: '100px'}}>
      <div style={{background: DS.colors.cardBg, padding: '52px 20px 16px', borderBottom: `1px solid ${DS.colors.border}`, position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 12px rgba(0,0,0,0.04)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <button onClick={() => router.back()} style={{width: '40px', height: '40px', borderRadius: DS.radius.icon, background: DS.colors.pageBg, border: `1px solid ${DS.colors.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={DS.colors.text2} strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div>
            <h1 style={{...DS.font.h2, color: DS.colors.text1}}>Notifications</h1>
            <p style={{...DS.font.caption, color: DS.colors.text3, marginTop: '3px'}}>{notifications.filter(n => !n.read).length} unread</p>
          </div>
        </div>
      </div>

      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
        {loading && (
          <div style={{textAlign: 'center', padding: '60px 20px'}}>
            <div style={{width: '36px', height: '36px', border: `3px solid ${DS.colors.borderStrong}`, borderTop: `3px solid ${DS.colors.primary}`, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto'}}/>
          </div>
        )}

        {!loading && notifications.length === 0 && (
          <div style={{background: DS.colors.cardBg, borderRadius: DS.radius.card, border: `1px solid ${DS.colors.borderStrong}`, padding: '48px 24px', textAlign: 'center', boxShadow: DS.shadow.card}}>
            <div style={{fontSize: '52px', marginBottom: '16px'}}>🔔</div>
            <h3 style={{...DS.font.h3, color: DS.colors.text1, marginBottom: '8px'}}>All quiet</h3>
            <p style={{...DS.font.bodySm, color: DS.colors.text3}}>When someone likes or comments on your moments, you will see it here.</p>
          </div>
        )}

        {notifications.map((notif) => (
          <div key={notif._id} style={{background: notif.read ? DS.colors.cardBg : `${DS.colors.primaryLight}`, borderRadius: '16px', border: `1px solid ${notif.read ? DS.colors.border : DS.colors.primaryBorder}`, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: DS.shadow.card}}>
            <div style={{width: '44px', height: '44px', borderRadius: '50%', background: notif.read ? DS.colors.pageBg : DS.colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0, border: `1px solid ${notif.read ? DS.colors.border : DS.colors.primaryBorder}`}}>
              {typeIcon[notif.type] || '🔔'}
            </div>
            <div style={{flex: 1}}>
              <p style={{...DS.font.bodyMd, color: DS.colors.text1, fontWeight: notif.read ? 400 : 600, lineHeight: 1.5}}>{notif.message}</p>
              <p style={{...DS.font.caption, color: DS.colors.text3, marginTop: '4px'}}>{timeAgo(notif.createdAt)}</p>
            </div>
            {!notif.read && <div style={{width: '8px', height: '8px', borderRadius: '50%', background: DS.colors.primary, flexShrink: 0}}/>}
          </div>
        ))}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <BottomNav />
    </div>
  )
}
