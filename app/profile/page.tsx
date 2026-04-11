'use client'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import BottomNav from '../components/BottomNav'
import { DS } from '../design-system'
import { EditIcon, CalendarIcon, BellIcon, SearchIcon, WalletIcon, GlobeIcon, SparkleIcon, HeartIcon, MicIcon, CameraIcon, PlusIcon, SahayatriLogo } from '../components/Icons'

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
    } catch (e) {}
    setLoading(false)
  }

  const initials = (name: string) => name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'U'

  const timeAgo = (date: string) => {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
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

  if (!session?.user) {
    return (
      <div style={{minHeight: '100vh', background: DS.colors.pageBg, fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <a href="/login" style={{padding: '14px 32px', background: DS.gradient.primary, color: 'white', borderRadius: DS.radius.button, fontWeight: 700, textDecoration: 'none', fontSize: '15px', boxShadow: DS.shadow.primary}}>Sign In</a>
        <BottomNav />
      </div>
    )
  }

  return (
    <div style={{minHeight: '100vh', background: DS.colors.pageBg, fontFamily: 'Inter, -apple-system, sans-serif', paddingBottom: '100px'}}>

      {/* Maya Animation */}
      {showMayaAnimation && (
        <div style={{position: 'fixed', inset: 0, background: 'linear-gradient(135deg, #7B0021, #DC143C, #FF6B9D)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <HeartIcon size={80} color="white" filled strokeWidth={0}/>
          <h2 style={{fontSize: '36px', fontWeight: 800, color: 'white', marginTop: '24px', marginBottom: '10px', letterSpacing: '-1px'}}>माया पठाइयो!</h2>
          <p style={{fontSize: '18px', color: 'rgba(255,255,255,0.7)'}}>Love sent to your family</p>
        </div>
      )}

      {/* Aura Header */}
      <div style={{background: DS.gradient.dark, padding: '52px 20px 24px', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: '-60px', right: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,20,60,0.25), transparent 70%)', pointerEvents: 'none'}}/>
        <div style={{position: 'absolute', bottom: '-40px', left: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(93,45,145,0.35), transparent 70%)', pointerEvents: 'none'}}/>

        {/* BS Date */}
        <div style={{position: 'absolute', top: '56px', right: '20px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: DS.radius.pill, padding: '4px 12px', backdropFilter: 'blur(8px)'}}>
          <p style={{fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.3px'}}>{getBSDate()}</p>
        </div>

        {/* Avatar row */}
        <div style={{display: 'flex', alignItems: 'flex-start', gap: '16px', position: 'relative', zIndex: 1}}>
          <div style={{position: 'relative', flexShrink: 0}}>
            {profile?.avatar ?
              <img src={profile.avatar} alt="avatar" style={{width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.2)', boxShadow: DS.shadow.dark}}/> :
              <div style={{width: '80px', height: '80px', borderRadius: '50%', background: DS.gradient.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '28px', fontWeight: 800, border: '3px solid rgba(255,255,255,0.2)', boxShadow: DS.shadow.dark}}>
                {initials(session.user.name || '')}
              </div>}
            {/* Online dot */}
            <div style={{position: 'absolute', bottom: '2px', right: '2px', width: '14px', height: '14px', borderRadius: '50%', background: '#22C55E', border: '2.5px solid #12022A', boxShadow: '0 0 6px rgba(34,197,94,0.6)'}}/>
            {/* Plus button */}
            <button onClick={() => router.push('/memory')}
              style={{position: 'absolute', top: '-4px', right: '-4px', width: '24px', height: '24px', borderRadius: '50%', background: DS.gradient.primary, border: '2px solid #12022A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: DS.shadow.primary}}>
              <PlusIcon size={10} color="white" strokeWidth={3}/>
            </button>
          </div>

          <div style={{flex: 1, paddingTop: '4px'}}>
            <h1 style={{...DS.font.h2, color: 'white', marginBottom: '4px'}}>{profile?.name || session.user.name}</h1>
            {profile?.location && (
              <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginBottom: '6px'}}>{profile.location}</p>
            )}
            {profile?.bio && (
              <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, marginBottom: '8px'}}>{profile.bio}</p>
            )}
            <div style={{display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(220,20,60,0.18)', border: `1px solid ${DS.colors.primaryBorder}`, borderRadius: DS.radius.pill, padding: '3px 10px'}}>
              <div style={{width: '5px', height: '5px', borderRadius: '50%', background: DS.colors.primary}}/>
              <span style={{fontSize: '10px', fontWeight: 700, color: DS.colors.primary}}>{profile?.role || 'FAMILY'} · Active</span>
            </div>
          </div>
        </div>

        {/* Send Maya */}
        <button onClick={() => { setShowMayaAnimation(true); setTimeout(() => setShowMayaAnimation(false), 2500) }}
          style={{marginTop: '18px', width: '100%', padding: '14px 20px', background: 'rgba(220,20,60,0.18)', border: `1px solid ${DS.colors.primaryBorder}`, borderRadius: '18px', color: 'white', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', position: 'relative', zIndex: 1, animation: 'mayaGlow 2.5s ease-in-out infinite'}}>
          <HeartIcon size={20} color="white" filled strokeWidth={0}/>
          <span>Send Maya to Family</span>
          <span style={{fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 400}}>· माया पठाउनुस्</span>
        </button>
      </div>

      <div style={{padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '20px'}}>

        {/* Stats */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px'}}>
          {[
            { val: posts.length.toString(), label: 'Moments' },
            { val: posts.reduce((s, p) => s + (p.likes || 0), 0).toString(), label: 'Likes', color: DS.colors.primary },
            { val: new Date(profile?.createdAt || Date.now()).toLocaleDateString('en', { month: 'short', year: '2-digit' }), label: 'Joined' },
          ].map((s, i) => (
            <div key={i} style={{background: DS.colors.cardBg, borderRadius: '16px', border: `1px solid ${DS.colors.border}`, padding: '16px 8px', textAlign: 'center', boxShadow: DS.shadow.card}}>
              <p style={{fontSize: '22px', fontWeight: 800, color: s.color || DS.colors.text1, letterSpacing: '-0.5px'}}>{s.val}</p>
              <p style={{...DS.font.label, color: DS.colors.text3, marginTop: '4px', fontSize: '10px'}}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Bento Grid */}
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
            <h3 style={{...DS.font.h3, color: DS.colors.text1}}>Moments</h3>
            <button onClick={() => router.push('/memory')} style={{...DS.font.caption, color: DS.colors.primary, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 700}}>+ Share</button>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>

            {/* Featured */}
            <div onClick={() => router.push('/memory')}
              style={{background: posts[0]?.images?.[0] ? DS.colors.cardBg : DS.colors.pageBg, borderRadius: DS.radius.card, overflow: 'hidden', boxShadow: DS.shadow.card, cursor: 'pointer', border: `1px solid ${DS.colors.border}`, minHeight: '180px'}}>
              {posts[0]?.images?.[0] ? (
                <div style={{position: 'relative', height: '130px'}}>
                  <img src={posts[0].images[0]} alt="moment" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                  <div style={{position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(220,20,60,0.9)', borderRadius: '8px', padding: '3px 8px'}}>
                    <span style={{fontSize: '9px', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.3px'}}>Care</span>
                  </div>
                </div>
              ) : (
                <div style={{height: '130px', background: DS.colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px'}}>
                  <CameraIcon size={28} color={DS.colors.primary} strokeWidth={1.8}/>
                  <p style={{fontSize: '11px', color: DS.colors.primary, fontWeight: 600}}>Share a photo</p>
                </div>
              )}
              <div style={{padding: '10px 12px'}}>
                <p style={{fontSize: '12px', fontWeight: 700, color: DS.colors.text1, lineHeight: 1.4}}>{posts[0]?.content?.slice(0, 36) || 'Your first moment'}{posts[0]?.content?.length > 36 ? '…' : ''}</p>
                <p style={{fontSize: '10px', color: DS.colors.text3, marginTop: '3px'}}>{posts[0] ? timeAgo(posts[0].createdAt) : 'No moments yet'}</p>
              </div>
            </div>

            {/* Right column */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              {/* Sathi tile */}
              <div onClick={() => router.push('/sathi')}
                style={{background: DS.gradient.dark, borderRadius: DS.radius.card, padding: '16px', boxShadow: DS.shadow.dark, cursor: 'pointer', flex: 1, border: '1px solid rgba(255,255,255,0.06)'}}>
                <div style={{display: 'flex', gap: '3px', alignItems: 'flex-end', marginBottom: '10px', height: '28px'}}>
                  {[4,7,5,9,6,8,4,7,5,8,6].map((h, i) => (
                    <div key={i} style={{width: '3px', background: DS.colors.primary, borderRadius: '2px', height: `${h * 3}px`, animation: `wave 1.2s ease-in-out ${i * 0.1}s infinite`}}/>
                  ))}
                </div>
                <p style={{fontSize: '12px', fontWeight: 800, color: 'white', marginBottom: '2px'}}>Sathi AI</p>
                <p style={{fontSize: '10px', color: 'rgba(255,255,255,0.4)'}}>Tap to talk</p>
              </div>
              {/* Stats */}
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px'}}>
                {[
                  { val: posts.length, label: 'Moments', color: DS.colors.text1 },
                  { val: posts.reduce((s, p) => s + (p.likes || 0), 0), label: 'Likes', color: DS.colors.primary },
                ].map((s, i) => (
                  <div key={i} style={{background: DS.colors.cardBg, borderRadius: '16px', padding: '12px 8px', textAlign: 'center', boxShadow: DS.shadow.card, border: `1px solid ${DS.colors.border}`}}>
                    <p style={{fontSize: '20px', fontWeight: 800, color: s.color, letterSpacing: '-0.5px'}}>{s.val}</p>
                    <p style={{fontSize: '9px', fontWeight: 700, color: DS.colors.text3, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px'}}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Dial */}
            <div style={{gridColumn: '1 / -1', background: DS.colors.cardBg, borderRadius: DS.radius.card, padding: '14px 16px', boxShadow: DS.shadow.card, border: `1px solid ${DS.colors.border}`, display: 'flex', alignItems: 'center', gap: '12px'}}>
              <div style={{width: '36px', height: '36px', borderRadius: DS.radius.icon, background: DS.colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <SparkleIcon size={18} color={DS.colors.primary} strokeWidth={1.8}/>
              </div>
              <div style={{flex: 1}}>
                <p style={{...DS.font.label, color: DS.colors.primary, fontSize: '10px', marginBottom: '3px'}}>Daily Dial</p>
                <p style={{...DS.font.bodySm, color: DS.colors.text2, fontStyle: 'italic', lineHeight: 1.4}}>
                  {profile?.bio ? `"${profile.bio.slice(0, 55)}${profile.bio.length > 55 ? '…' : ''}"` : '"Feeling connected to family today."'}
                </p>
              </div>
              <button onClick={() => router.push('/edit-profile')} style={{background: DS.colors.primaryLight, border: 'none', borderRadius: DS.radius.pill, cursor: 'pointer', padding: '5px 12px', flexShrink: 0}}>
                <span style={{fontSize: '11px', fontWeight: 700, color: DS.colors.primary, fontFamily: 'Inter, sans-serif'}}>Edit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Card A — My Activity */}
        <div style={{background: DS.colors.cardBg, borderRadius: DS.radius.card, overflow: 'hidden', boxShadow: DS.shadow.card, border: `1px solid ${DS.colors.border}`}}>
          <div style={{padding: '16px 16px 8px'}}>
            <p style={{...DS.font.label, color: DS.colors.text3}}>My Activity</p>
          </div>
          {[
            { Icon: CalendarIcon, label: 'My Bookings', sub: 'View and manage bookings', path: '/bookings' },
            { Icon: WalletIcon, label: 'Payment History', sub: 'eSewa · Khalti · Bank', path: '/wallet' },
          ].map((item, i) => (
            <div key={i} onClick={() => router.push(item.path)}
              style={{display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderTop: `1px solid ${DS.colors.border}`, cursor: 'pointer'}}>
              <div style={{width: '42px', height: '42px', borderRadius: DS.radius.icon, background: DS.colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <item.Icon size={20} color={DS.colors.primary} strokeWidth={1.8}/>
              </div>
              <div style={{flex: 1}}>
                <p style={{...DS.font.h4, color: DS.colors.text1}}>{item.label}</p>
                <p style={{...DS.font.caption, color: DS.colors.text3, marginTop: '2px'}}>{item.sub}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={DS.colors.borderStrong} strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          ))}
        </div>

        {/* Card B — Personalize */}
        <div style={{background: DS.colors.cardBg, borderRadius: DS.radius.card, overflow: 'hidden', boxShadow: DS.shadow.card, border: `1px solid ${DS.colors.border}`}}>
          <div style={{padding: '16px 16px 8px'}}>
            <p style={{...DS.font.label, color: DS.colors.text3}}>Personalize</p>
          </div>
          {[
            { Icon: EditIcon, label: 'Edit Profile', sub: 'Name, photo, bio, location', path: '/edit-profile' },
            { Icon: BellIcon, label: 'Notifications', sub: 'Likes, comments, updates', path: '/notifications' },
            { Icon: SearchIcon, label: 'Search', sub: 'Find people and moments', path: '/search' },
          ].map((item, i) => (
            <div key={i} onClick={() => router.push(item.path)}
              style={{display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderTop: `1px solid ${DS.colors.border}`, cursor: 'pointer'}}>
              <div style={{width: '42px', height: '42px', borderRadius: DS.radius.icon, background: DS.colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <item.Icon size={20} color={DS.colors.primary} strokeWidth={1.8}/>
              </div>
              <div style={{flex: 1}}>
                <p style={{...DS.font.h4, color: DS.colors.text1}}>{item.label}</p>
                <p style={{...DS.font.caption, color: DS.colors.text3, marginTop: '2px'}}>{item.sub}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={DS.colors.borderStrong} strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          ))}

          {/* Language toggle */}
          <div style={{display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderTop: `1px solid ${DS.colors.border}`}}>
            <div style={{width: '42px', height: '42px', borderRadius: DS.radius.icon, background: DS.colors.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <GlobeIcon size={20} color={DS.colors.primary} strokeWidth={1.8}/>
            </div>
            <div style={{flex: 1}}>
              <p style={{...DS.font.h4, color: DS.colors.text1}}>Language</p>
              <p style={{...DS.font.caption, color: DS.colors.text3, marginTop: '2px'}}>English / नेपाली</p>
            </div>
            <div onClick={() => setLangNepali(!langNepali)}
              style={{width: '52px', height: '28px', borderRadius: DS.radius.pill, background: langNepali ? DS.colors.primary : DS.colors.borderStrong, position: 'relative', cursor: 'pointer', transition: 'background 0.3s ease', flexShrink: 0}}>
              <div style={{position: 'absolute', top: '3px', left: langNepali ? '27px' : '3px', width: '22px', height: '22px', borderRadius: '50%', background: 'white', boxShadow: '0 2px 6px rgba(0,0,0,0.15)', transition: 'left 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{fontSize: '9px', fontWeight: 800, color: langNepali ? DS.colors.primary : DS.colors.text3}}>{langNepali ? 'ने' : 'EN'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sign out */}
        <div style={{textAlign: 'center'}}>
          <button onClick={() => signOut({ callbackUrl: '/' })}
            style={{background: 'none', border: 'none', color: DS.colors.text3, fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif', padding: '8px 20px'}}>
            Sign out
          </button>
        </div>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
          <SahayatriLogo size={16} color={DS.colors.text3}/>
          <p style={{fontSize: '11px', color: DS.colors.text3, fontWeight: 400}}>Sahayatri v1.0 · Made with love for Nepal</p>
        </div>
      </div>

      <style>{`
        @keyframes mayaGlow { 0%, 100% { box-shadow: 0 0 10px rgba(220,20,60,0.2); } 50% { box-shadow: 0 0 24px rgba(220,20,60,0.45); } }
        @keyframes wave { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(1.2); } }
      `}</style>

      <BottomNav />
    </div>
  )
}
