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
  const [showMayaAnimation, setShowMayaAnimation] = useState(false)
  const [langNepali, setLangNepali] = useState(false)

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

  const getBSDate = () => {
    const now = new Date()
    const bsYear = now.getFullYear() + 56
    const months = ['बैशाख','जेठ','असार','साउन','भदौ','असोज','कार्तिक','मंसिर','पुष','माघ','फागुन','चैत']
    return `${months[now.getMonth()]} ${bsYear} BS`
  }

  const sendMaya = () => {
    setShowMayaAnimation(true)
    setTimeout(() => setShowMayaAnimation(false), 3000)
  }

  if (!session?.user) {
    return (
      <div style={{minHeight: '100vh', background: '#F8F9FA', fontFamily: 'Inter, -apple-system, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'}}>
        <a href="/login" style={{padding: '13px 32px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', borderRadius: '20px', fontWeight: 700, textDecoration: 'none', fontSize: '15px'}}>Sign In</a>
        <BottomNav />
      </div>
    )
  }

  return (
    <div style={{minHeight: '100vh', background: '#F8F9FA', fontFamily: 'Inter, -apple-system, sans-serif', paddingBottom: '80px'}}>

      {/* Maya Full Screen Animation */}
      {showMayaAnimation && (
        <div style={{position: 'fixed', inset: 0, background: 'linear-gradient(135deg, #7B0021, #DC143C, #FF6B9D)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{fontSize: '88px', marginBottom: '28px', animation: 'heartPulse 0.6s ease infinite'}}>❤️</div>
          <h2 style={{fontSize: '36px', fontWeight: 800, color: 'white', marginBottom: '10px', letterSpacing: '-1px'}}>माया पठाइयो!</h2>
          <p style={{fontSize: '18px', color: 'rgba(255,255,255,0.75)', marginBottom: '48px'}}>Love sent to your family</p>
          <div style={{display: 'flex', gap: '10px'}}>
            {[0,1,2,3,4].map(i => (
              <div key={i} style={{width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.7)', animation: `dotBounce 1s ease ${i * 0.15}s infinite`}}/>
            ))}
          </div>
        </div>
      )}

      {/* ── AURA HEADER ── */}
      <div style={{background: 'linear-gradient(140deg, #12022A 0%, #2D0A4E 35%, #1C0028 65%, #0A1628 100%)', padding: '52px 20px 24px', position: 'relative', overflow: 'hidden'}}>
        {/* Glow orbs */}
        <div style={{position: 'absolute', top: '-70px', right: '-50px', width: '240px', height: '240px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,20,60,0.25), transparent 70%)', pointerEvents: 'none'}}/>
        <div style={{position: 'absolute', bottom: '-50px', left: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(93,45,145,0.35), transparent 70%)', pointerEvents: 'none'}}/>

        {/* BS Date — glassmorphism */}
        <div style={{position: 'absolute', top: '56px', right: '20px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '4px 12px', backdropFilter: 'blur(8px)'}}>
          <p style={{fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.3px'}}>{getBSDate()}</p>
        </div>

        {/* Avatar row */}
        <div style={{display: 'flex', alignItems: 'flex-start', gap: '16px', position: 'relative', zIndex: 1}}>
          <div style={{position: 'relative', flexShrink: 0}}>
            {profile?.avatar ? (
              <img src={profile.avatar} alt="avatar" style={{width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)'}}/>
            ) : (
              <div style={{width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '28px', fontWeight: 800, border: '3px solid rgba(255,255,255,0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)'}}>
                {initials(session.user.name || '')}
              </div>
            )}
            {/* Online dot */}
            <div style={{position: 'absolute', bottom: '2px', right: '2px', width: '14px', height: '14px', borderRadius: '50%', background: '#22C55E', border: '2.5px solid #12022A', boxShadow: '0 0 6px rgba(34,197,94,0.6)'}}/>
            {/* Plus button */}
            <button onClick={() => router.push('/memory')}
              style={{position: 'absolute', top: '-4px', right: '-4px', width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: '2px solid #12022A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(220,20,60,0.5)'}}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>

          <div style={{flex: 1, paddingTop: '4px'}}>
            <h1 style={{fontSize: '22px', fontWeight: 800, color: 'white', letterSpacing: '-0.5px', marginBottom: '3px'}}>{profile?.name || session.user.name}</h1>
            {profile?.location && <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginBottom: '6px'}}>📍 {profile.location}</p>}
            {profile?.bio && <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, marginBottom: '8px'}}>{profile.bio}</p>}
            <div style={{display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(220,20,60,0.18)', border: '1px solid rgba(220,20,60,0.3)', borderRadius: '20px', padding: '3px 10px'}}>
              <div style={{width: '5px', height: '5px', borderRadius: '50%', background: '#DC143C'}}/>
              <span style={{fontSize: '10px', fontWeight: 700, color: '#DC143C', letterSpacing: '0.3px'}}>{profile?.role || 'FAMILY'} · Active</span>
            </div>
          </div>
        </div>

        {/* Send Maya Button */}
        <button onClick={sendMaya}
          style={{marginTop: '18px', width: '100%', padding: '13px 20px', background: 'rgba(220,20,60,0.18)', border: '1px solid rgba(220,20,60,0.35)', borderRadius: '20px', color: 'white', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', position: 'relative', zIndex: 1, animation: 'mayaGlow 2.5s ease-in-out infinite'}}>
          <span style={{fontSize: '20px'}}>❤️</span>
          <span>Send Maya to Family</span>
          <span style={{fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 400}}>· माया पठाउनुस्</span>
        </button>
      </div>

      {/* ── CONTENT ── */}
      <div style={{padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '20px'}}>

        {/* BENTO GRID */}
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
            <p style={{fontSize: '16px', fontWeight: 800, color: '#111318', letterSpacing: '-0.3px'}}>Moments</p>
            <button onClick={() => router.push('/memory')} style={{fontSize: '12px', fontWeight: 700, color: '#DC143C', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>+ Share</button>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>

            {/* Featured Moment */}
            <div onClick={() => router.push('/memory')}
              style={{background: posts[0]?.images?.[0] ? 'white' : 'linear-gradient(135deg, #F8F9FA, #F0F2F5)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 30px rgba(0,0,0,0.05)', cursor: 'pointer', minHeight: '190px'}}>
              {posts[0]?.images?.[0] ? (
                <div style={{position: 'relative', height: '130px'}}>
                  <img src={posts[0].images[0]} alt="moment" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                  <div style={{position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(220,20,60,0.88)', borderRadius: '10px', padding: '3px 8px'}}>
                    <span style={{fontSize: '9px', fontWeight: 700, color: 'white', letterSpacing: '0.3px'}}>CARE MOMENT</span>
                  </div>
                </div>
              ) : (
                <div style={{height: '130px', background: 'linear-gradient(135deg, #FEF2F2, #FCE7E7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px'}}>
                  <div style={{width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(220,20,60,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC143C" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  </div>
                  <p style={{fontSize: '11px', color: '#DC143C', fontWeight: 600}}>Share a photo</p>
                </div>
              )}
              <div style={{padding: '10px 12px'}}>
                <p style={{fontSize: '12px', fontWeight: 700, color: '#111318', lineHeight: 1.4}}>
                  {posts[0]?.content?.slice(0, 36) || 'Your first moment'}
                  {posts[0]?.content?.length > 36 ? '…' : ''}
                </p>
                <p style={{fontSize: '10px', color: '#9CA3AF', marginTop: '3px', fontWeight: 500}}>{posts[0] ? timeAgo(posts[0].createdAt) : 'No moments yet'}</p>
              </div>
            </div>

            {/* Right column */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>

              {/* Sathi AI tile — animated waveform */}
              <div onClick={() => router.push('/sathi')}
                style={{background: 'linear-gradient(135deg, #12022A, #2D0A4E)', borderRadius: '20px', padding: '16px', boxShadow: '0 4px 30px rgba(0,0,0,0.08)', cursor: 'pointer', flex: 1}}>
                <div style={{display: 'flex', gap: '3px', alignItems: 'flex-end', marginBottom: '10px', height: '28px'}}>
                  {[4,7,5,9,6,8,4,7,5,8,6].map((h, i) => (
                    <div key={i} style={{width: '3px', background: '#DC143C', borderRadius: '2px', height: `${h * 3}px`, animation: `wave 1.2s ease-in-out ${i * 0.1}s infinite`}}/>
                  ))}
                </div>
                <p style={{fontSize: '12px', fontWeight: 800, color: 'white', marginBottom: '2px'}}>Sathi AI</p>
                <p style={{fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 500}}>Tap to talk · Active</p>
              </div>

              {/* Stats row */}
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
                <div style={{background: 'white', borderRadius: '20px', padding: '14px 8px', textAlign: 'center', boxShadow: '0 4px 30px rgba(0,0,0,0.05)'}}>
                  <p style={{fontSize: '22px', fontWeight: 800, color: '#111318', letterSpacing: '-0.5px'}}>{posts.length}</p>
                  <p style={{fontSize: '9px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px'}}>Moments</p>
                </div>
                <div style={{background: 'white', borderRadius: '20px', padding: '14px 8px', textAlign: 'center', boxShadow: '0 4px 30px rgba(0,0,0,0.05)'}}>
                  <p style={{fontSize: '22px', fontWeight: 800, color: '#DC143C', letterSpacing: '-0.5px'}}>{posts.reduce((s, p) => s + (p.likes || 0), 0)}</p>
                  <p style={{fontSize: '9px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px'}}>Likes</p>
                </div>
              </div>
            </div>

            {/* Daily Dial — full width */}
            <div style={{gridColumn: '1 / -1', background: 'white', borderRadius: '20px', padding: '14px 16px', boxShadow: '0 4px 30px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '12px'}}>
              <div style={{width: '36px', height: '36px', borderRadius: '12px', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0}}>✨</div>
              <div style={{flex: 1}}>
                <p style={{fontSize: '10px', fontWeight: 700, color: '#DC143C', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '3px'}}>Daily Dial</p>
                <p style={{fontSize: '13px', color: '#374151', fontStyle: 'italic', lineHeight: 1.4}}>
                  {profile?.bio ? `"${profile.bio.slice(0, 55)}${profile.bio.length > 55 ? '…' : ''}"` : '"Feeling connected to family today."'}
                </p>
              </div>
              <button onClick={() => router.push('/edit-profile')} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#DC143C', fontSize: '11px', fontFamily: 'Inter, sans-serif', fontWeight: 700, flexShrink: 0, padding: '4px 10px', borderRadius: '20px', background: '#FEF2F2'} as any}>
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Recent Moments */}
        {posts.length > 1 && (
          <div style={{background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 30px rgba(0,0,0,0.05)'}}>
            <div style={{padding: '16px 16px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <p style={{fontSize: '14px', fontWeight: 800, color: '#111318'}}>Recent Moments</p>
              <button onClick={() => router.push('/memory')} style={{fontSize: '12px', fontWeight: 700, color: '#DC143C', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>See all</button>
            </div>
            {posts.slice(1, 4).map((post, i) => (
              <div key={post._id} style={{display: 'flex', gap: '12px', padding: '10px 16px', borderTop: '1px solid #F5F6F8', alignItems: 'center'}}>
                {post.images?.[0] ? (
                  <img src={post.images[0]} alt="moment" style={{width: '44px', height: '44px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0}}/>
                ) : (
                  <div style={{width: '44px', height: '44px', borderRadius: '12px', background: '#F5F6F8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '20px'}}>💬</div>
                )}
                <div style={{flex: 1}}>
                  <p style={{fontSize: '13px', color: '#374151', lineHeight: 1.4, fontWeight: 500}}>{post.content?.slice(0, 48)}{post.content?.length > 48 ? '…' : ''}</p>
                  <p style={{fontSize: '11px', color: '#9CA3AF', marginTop: '3px'}}>{timeAgo(post.createdAt)} · ❤️ {post.likes || 0}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Card A — My Activity */}
        <div style={{background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 30px rgba(0,0,0,0.05)'}}>
          <div style={{padding: '16px 16px 8px'}}>
            <p style={{fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px'}}>My Activity</p>
          </div>
          {[
            { icon: '📅', label: 'My Bookings', sub: 'View and manage bookings', path: '/bookings' },
            { icon: '💳', label: 'Payment History', sub: 'eSewa · Khalti · Bank', path: '/wallet' },
          ].map((item, i) => (
            <div key={i} onClick={() => router.push(item.path)}
              style={{display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderTop: '1px solid #F5F6F8', cursor: 'pointer'}}>
              <div style={{width: '42px', height: '42px', borderRadius: '14px', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0}}>
                {item.icon}
              </div>
              <div style={{flex: 1}}>
                <p style={{fontSize: '14px', fontWeight: 700, color: '#111318'}}>{item.label}</p>
                <p style={{fontSize: '11px', color: '#9CA3AF', marginTop: '2px', fontWeight: 500}}>{item.sub}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          ))}
        </div>

        {/* Card B — Personalize */}
        <div style={{background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 30px rgba(0,0,0,0.05)'}}>
          <div style={{padding: '16px 16px 8px'}}>
            <p style={{fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px'}}>Personalize</p>
          </div>

          {[
            { icon: '✏️', label: 'Edit Profile', sub: 'Name, photo, bio, location', path: '/edit-profile' },
            { icon: '🔔', label: 'Notifications', sub: 'Likes, comments, updates', path: '/notifications' },
            { icon: '🔍', label: 'Search', sub: 'Find people and moments', path: '/search' },
          ].map((item, i) => (
            <div key={i} onClick={() => router.push(item.path)}
              style={{display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderTop: '1px solid #F5F6F8', cursor: 'pointer'}}>
              <div style={{width: '42px', height: '42px', borderRadius: '14px', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0}}>
                {item.icon}
              </div>
              <div style={{flex: 1}}>
                <p style={{fontSize: '14px', fontWeight: 700, color: '#111318'}}>{item.label}</p>
                <p style={{fontSize: '11px', color: '#9CA3AF', marginTop: '2px', fontWeight: 500}}>{item.sub}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          ))}

          {/* Language pill toggle */}
          <div style={{display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderTop: '1px solid #F5F6F8'}}>
            <div style={{width: '42px', height: '42px', borderRadius: '14px', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0}}>🇳🇵</div>
            <div style={{flex: 1}}>
              <p style={{fontSize: '14px', fontWeight: 700, color: '#111318'}}>Language</p>
              <p style={{fontSize: '11px', color: '#9CA3AF', marginTop: '2px', fontWeight: 500}}>English / नेपाली</p>
            </div>
            {/* Pill slider */}
            <div onClick={() => setLangNepali(!langNepali)}
              style={{width: '72px', height: '32px', borderRadius: '20px', background: langNepali ? '#DC143C' : '#E9EAEC', position: 'relative', cursor: 'pointer', transition: 'background 0.3s ease', flexShrink: 0}}>
              <div style={{position: 'absolute', top: '3px', left: langNepali ? '40px' : '3px', width: '26px', height: '26px', borderRadius: '50%', background: 'white', boxShadow: '0 2px 6px rgba(0,0,0,0.15)', transition: 'left 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{fontSize: '10px', fontWeight: 800, color: langNepali ? '#DC143C' : '#9CA3AF'}}>{langNepali ? 'ने' : 'EN'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sign out — minimal grey link */}
        <div style={{textAlign: 'center', paddingTop: '4px'}}>
          <button onClick={() => signOut({ callbackUrl: '/' })}
            style={{background: 'none', border: 'none', color: '#B0B7C3', fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif', padding: '8px 20px'}}>
            Sign out
          </button>
        </div>

        <p style={{textAlign: 'center', fontSize: '11px', color: '#C4C9D4', fontWeight: 400, letterSpacing: '0.2px'}}>
          Sahayatri v1.0 · Made with ❤️ for Nepal
        </p>
      </div>

      <style>{`
        @keyframes heartPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(-10px); opacity: 1; }
        }
        @keyframes mayaGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(220,20,60,0.2); }
          50% { box-shadow: 0 0 22px rgba(220,20,60,0.45); }
        }
        @keyframes wave {
          0%, 100% { transform: scaleY(1); opacity: 0.7; }
          50% { transform: scaleY(0.4); opacity: 1; }
        }
      `}</style>

      <BottomNav />
    </div>
  )
}
