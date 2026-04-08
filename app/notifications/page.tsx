'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import BottomNav from '../components/BottomNav'

export default function Notifications() {
  const { data: session } = useSession()
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (session?.user?.email) {
      fetchNotifications()
      markRead()
    }
  }, [session])

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`/api/notifications?email=${session?.user?.email}`)
      const data = await res.json()
      setNotifications(data.notifications || [])
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  const markRead = async () => {
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session?.user?.email }),
      })
    } catch (e) { console.error(e) }
  }

  const timeAgo = (date: string) => {
    const s = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
    if (s < 60) return 'just now'
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  const initials = (name: string) => name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'U'

  return (
    <div style={{minHeight: '100vh', background: '#F5F6F8', fontFamily: 'sans-serif', paddingBottom: '80px'}}>

      <div style={{background: 'white', padding: '52px 20px 16px', borderBottom: '1px solid #F0F1F3', position: 'sticky', top: 0, zIndex: 50}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <button onClick={() => router.back()} style={{width: '36px', height: '36px', borderRadius: '10px', background: '#F5F6F8', border: '1px solid #E9EAEC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A5060" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <h1 style={{fontSize: '22px', fontWeight: 800, color: '#111318', letterSpacing: '-0.4px'}}>Notifications</h1>
        </div>
      </div>

      <div style={{padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px'}}>

        {loading && <div style={{textAlign: 'center', padding: '40px', color: '#9CA3AF', fontSize: '14px'}}>Loading…</div>}

        {!loading && notifications.length === 0 && (
          <div style={{textAlign: 'center', padding: '60px 20px'}}>
            <div style={{fontSize: '48px', marginBottom: '16px'}}>🔔</div>
            <p style={{fontSize: '18px', fontWeight: 800, color: '#111318', marginBottom: '8px'}}>No notifications yet</p>
            <p style={{fontSize: '14px', color: '#9CA3AF'}}>When someone likes or comments on your posts you will see it here.</p>
          </div>
        )}

        {notifications.map((notif, i) => (
          <div key={i} style={{background: notif.read ? 'white' : '#FEF2F2', borderRadius: '16px', border: `1px solid ${notif.read ? '#E9EAEC' : 'rgba(220,20,60,0.15)'}`, padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px', boxShadow: '0 1px 2px rgba(0,0,0,0.04)'}}>
            <div style={{position: 'relative', flexShrink: 0}}>
              <div style={{width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '14px'}}>
                {initials(notif.senderName)}
              </div>
              <div style={{position: 'absolute', bottom: '-2px', right: '-2px', width: '18px', height: '18px', borderRadius: '50%', background: notif.type === 'like' ? '#DC143C' : '#2563EB', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {notif.type === 'like' ? (
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="white"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                ) : (
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="white"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                )}
              </div>
            </div>
            <div style={{flex: 1}}>
              <p style={{fontSize: '14px', color: '#111318', lineHeight: 1.5}}>
                <span style={{fontWeight: 800}}>{notif.senderName}</span>
                {notif.type === 'like' ? ' liked your moment' : ' commented on your moment'}
              </p>
              {notif.postContent && (
                <p style={{fontSize: '12px', color: '#9CA3AF', marginTop: '4px', lineHeight: 1.4}}>"{notif.postContent}"</p>
              )}
              <p style={{fontSize: '11px', color: notif.read ? '#9CA3AF' : '#DC143C', marginTop: '4px', fontWeight: 600}}>{timeAgo(notif.createdAt)}</p>
            </div>
            {!notif.read && (
              <div style={{width: '8px', height: '8px', borderRadius: '50%', background: '#DC143C', flexShrink: 0, marginTop: '4px'}}/>
            )}
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
