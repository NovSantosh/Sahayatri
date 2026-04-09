'use client'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import BottomNav from '../components/BottomNav'

export default function Profile() {
  const { data: session } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user?.email) fetchProfile()
  }, [session])

  const fetchProfile = async () => {
    try {
      const res = await fetch(`/api/profile?email=${session?.user?.email}`)
      const data = await res.json()
      setProfile(data.user)
      setPosts(data.posts || [])
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  const initials = (name: string) => name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'U'

  const timeAgo = (date: string) => {
    const s = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
    if (s < 60) return 'just now'
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  if (!session?.user) {
    return (
      <div style={{minHeight: '100vh', background: '#F5F6F8', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', paddingBottom: '80px'}}>
        <div style={{fontSize: '48px', marginBottom: '16px'}}>👤</div>
        <p style={{fontSize: '18px', fontWeight: 800, color: '#111318', marginBottom: '8px'}}>Not logged in</p>
        <a href="/login" style={{padding: '13px 32px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', borderRadius: '14px', fontWeight: 700, textDecoration: 'none', fontSize: '15px'}}>Sign In</a>
        <BottomNav />
      </div>
    )
  }

  return (
    <div style={{minHeight: '100vh', background: '#F5F6F8', fontFamily: 'sans-serif', paddingBottom: '80px'}}>

      <div style={{background: 'linear-gradient(135deg, #0A1628, #1C0008)', padding: '52px 20px 28px', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(220,20,60,0.15)', pointerEvents: 'none'}}/>
        <div style={{display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 1}}>
          {profile?.avatar ? (
            <img src={profile.avatar} alt="avatar" style={{width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.2)', flexShrink: 0}}/>
          ) : (
            <div style={{width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '26px', fontWeight: 800, border: '3px solid rgba(255,255,255,0.2)', flexShrink: 0}}>
              {initials(session.user.name || '')}
            </div>
          )}
          <div style={{flex: 1}}>
            <h1 style={{fontSize: '22px', fontWeight: 800, color: 'white', letterSpacing: '-0.4px'}}>{profile?.name || session.user.name}</h1>
            {profile?.location && <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginTop: '2px'}}>📍 {profile.location}</p>}
            {profile?.bio && <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginTop: '4px', lineHeight: 1.4}}>{profile.bio}</p>}
            <div style={{display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '8px', background: 'rgba(220,20,60,0.2)', border: '1px solid rgba(220,20,60,0.3)', borderRadius: '20px', padding: '3px 10px'}}>
              <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#DC143C'}}/>
              <span style={{fontSize: '10px', fontWeight: 700, color: '#DC143C'}}>{profile?.role || 'FAMILY'} · Active</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px'}}>

        {/* Stats */}
        <div style={{display: 'flex', background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', overflow: 'hidden'}}>
          {[
            {val: posts.length.toString(), label: 'Moments'},
            {val: posts.reduce((sum, p) => sum + (p.likes || 0), 0).toString(), label: 'Likes'},
            {val: new Date(profile?.createdAt || Date.now()).toLocaleDateString('en', {month: 'short', year: 'numeric'}), label: 'Joined'},
          ].map((s, i) => (
            <div key={i} style={{flex: 1, textAlign: 'center', padding: '16px 4px', borderRight: i < 2 ? '1px solid #F0F1F3' : 'none'}}>
              <p style={{fontSize: '20px', fontWeight: 800, color: '#111318'}}>{s.val}</p>
              <p style={{fontSize: '10px', fontWeight: 700, color: '#9CA3AF', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.4px'}}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Posts */}
        {loading ? (
          <div style={{textAlign: 'center', padding: '40px', color: '#9CA3AF', fontSize: '14px'}}>Loading...</div>
        ) : posts.length === 0 ? (
          <div style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', padding: '32px 20px', textAlign: 'center'}}>
            <div style={{fontSize: '40px', marginBottom: '12px'}}>📷</div>
            <p style={{fontSize: '16px', fontWeight: 800, color: '#111318', marginBottom: '6px'}}>No moments yet</p>
            <a href="/memory" style={{padding: '10px 20px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', borderRadius: '12px', fontWeight: 700, textDecoration: 'none', fontSize: '13px', display: 'inline-block', marginTop: '8px'}}>Go to Memory</a>
          </div>
        ) : (
          <div>
            <p style={{fontSize: '15px', fontWeight: 800, color: '#111318', marginBottom: '10px'}}>Your Moments ({posts.length})</p>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              {posts.map((post) => (
                <div key={post._id} style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', overflow: 'hidden'}}>
                  <div style={{padding: '12px 14px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '6px'}}>
                      <span style={{fontSize: '10px', fontWeight: 700, color: '#9CA3AF'}}>{timeAgo(post.createdAt)}</span>
                      <span style={{fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px', background: '#FEF2F2', color: '#DC143C'}}>{post.category}</span>
                    </div>
                    <p style={{fontSize: '14px', color: '#374151', lineHeight: 1.6}}>{post.content}</p>
                  </div>
                  {post.images && post.images.length > 0 && (
                    <div style={{display: 'flex', gap: '3px', padding: '0 14px 12px'}}>
                      {post.images.slice(0, 3).map((url: string, i: number) => (
                        <img key={i} src={url} alt="moment" style={{width: post.images.length === 1 ? '100%' : '33%', height: '80px', objectFit: 'cover', borderRadius: '8px'}}/>
                      ))}
                    </div>
                  )}
                  <div style={{padding: '8px 14px', borderTop: '1px solid #F0F1F3', display: 'flex', gap: '12px'}}>
                    <span style={{fontSize: '12px', color: '#9CA3AF'}}>❤️ {post.likes || 0}</span>
                    <span style={{fontSize: '12px', color: '#9CA3AF'}}>💬 {post.comments?.length || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Menu */}
        <div style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', overflow: 'hidden'}}>
          {[
            {icon: '✏️', label: 'Edit Profile', sub: 'Name, photo, bio, location', path: '/edit-profile'},
            {icon: '📅', label: 'My Bookings', sub: 'View and manage your bookings', path: '/bookings'},
            {icon: '🔔', label: 'Notifications', sub: 'Likes and comments', path: '/notifications'},
            {icon: '🔍', label: 'Search', sub: 'Find people and moments', path: '/search'},
            {icon: '💳', label: 'Payment History', sub: 'eSewa · Khalti · Bank', path: '/bookings'},
            {icon: '🇳🇵', label: 'Language', sub: 'Nepali / English', path: null},
          ].map((item, i, arr) => (
            <div key={i} onClick={() => item.path && router.push(item.path)}
              style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderBottom: i < arr.length - 1 ? '1px solid #F0F1F3' : 'none', cursor: item.path ? 'pointer' : 'default'}}>
              <div style={{width: '38px', height: '38px', borderRadius: '10px', background: '#F5F6F8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0}}>{item.icon}</div>
              <div style={{flex: 1}}>
                <p style={{fontSize: '14px', fontWeight: 700, color: '#111318'}}>{item.label}</p>
                <p style={{fontSize: '11px', color: '#9CA3AF', marginTop: '1px'}}>{item.sub}</p>
              </div>
              {item.path && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>}
            </div>
          ))}
        </div>

        <button onClick={() => signOut({ callbackUrl: '/' })}
          style={{width: '100%', padding: '14px', background: 'white', border: '1px solid #FEE2E2', borderRadius: '16px', color: '#DC143C', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif'}}>
          Sign Out
        </button>

        <p style={{textAlign: 'center', fontSize: '11px', color: '#9CA3AF'}}>Sahayatri v1.0 · Made with ❤️ for Nepal</p>
      </div>
      <BottomNav />
    </div>
  )
}
