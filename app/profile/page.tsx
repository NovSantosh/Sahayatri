'use client'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import BottomNav from '../components/BottomNav'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'
import {
  EditIcon, CalendarIcon, BellIcon, SearchIcon,
  WalletIcon, GlobeIcon, SparkleIcon, HeartIcon,
  MicIcon, CameraIcon, PlusIcon, SahayatriLogo
} from '../components/Icons'

export default function Profile() {
  const { data: session } = useSession()
  const { t, theme } = useTheme()
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

  const card = {
    background: t.cardBg,
    borderRadius: '20px',
    border: `1px solid ${t.border}`,
    boxShadow: t.shadow,
    overflow: 'hidden' as const,
    transition: 'background 0.3s ease, border-color 0.3s ease',
  }

  if (!session?.user) {
    return (
      <div style={{minHeight: '100vh', background: t.pageBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif'}}>
        <a href="/login" style={{padding: '14px 32px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', borderRadius: '14px', fontWeight: 700, textDecoration: 'none', fontSize: '15px', boxShadow: '0 4px 16px rgba(220,20,60,0.3)'}}>Sign In</a>
        <BottomNav/>
      </div>
    )
  }

  return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, -apple-system, sans-serif', paddingBottom: '100px', transition: 'background 0.3s ease'}}>

      {/* Maya animation */}
      {showMayaAnimation && (
        <div style={{position: 'fixed', inset: 0, background: 'linear-gradient(135deg, #3D0010, #DC143C, #C4507A)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{animation: 'heartPulse 0.6s ease infinite'}}>
            <HeartIcon size={80} color="white" filled strokeWidth={0}/>
          </div>
          <h2 style={{fontSize: '32px', fontWeight: 800, color: 'white', marginTop: '24px', marginBottom: '8px', letterSpacing: '-1px'}}>माया पठाइयो!</h2>
          <p style={{fontSize: '16px', color: 'rgba(255,255,255,0.6)'}}>Love sent to your family</p>
        </div>
      )}

      {/* ── HEADER — always dark ── */}
      <div style={{background: 'linear-gradient(135deg, #0E0B18 0%, #1A0A16 50%, #0A0E1A 100%)', padding: '52px 20px 24px', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: '-50px', right: '-30px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,20,60,0.18), transparent 70%)', pointerEvents: 'none'}}/>
        <div style={{position: 'absolute', top: '16px', right: '16px', opacity: 0.06, pointerEvents: 'none'}}>
          <SahayatriLogo size={80} color="white"/>
        </div>

        {/* BS Date pill */}
        <div style={{position: 'absolute', top: '56px', right: '20px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', padding: '4px 12px'}}>
          <p style={{fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.4)'}}>{getBSDate()}</p>
        </div>

        {/* Avatar row */}
        <div style={{display: 'flex', alignItems: 'flex-start', gap: '16px', position: 'relative', zIndex: 1}}>
          <div style={{position: 'relative', flexShrink: 0}}>
            {profile?.avatar
              ? <img src={profile.avatar} alt="avatar" style={{width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.15)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)'}}/>
              : <div style={{width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '28px', fontWeight: 800, border: '3px solid rgba(255,255,255,0.15)', boxShadow: '0 4px 20px rgba(220,20,60,0.3)'}}>
                  {initials(session.user.name || '')}
                </div>}
            {/* Online dot */}
            <div style={{position: 'absolute', bottom: '2px', right: '2px', width: '14px', height: '14px', borderRadius: '50%', background: '#22C55E', border: '2.5px solid #0E0B18', boxShadow: '0 0 6px rgba(34,197,94,0.6)'}}/>
            {/* Camera button */}
            <button onClick={() => router.push('/edit-profile')}
              style={{position: 'absolute', top: '-4px', right: '-4px', width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: '2px solid #0E0B18', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(220,20,60,0.4)'}}>
              <PlusIcon size={10} color="white" strokeWidth={3}/>
            </button>
          </div>

          <div style={{flex: 1, paddingTop: '4px'}}>
            <h1 style={{fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '4px', letterSpacing: '-0.5px'}}>{profile?.name || session.user.name}</h1>
            {profile?.location && <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px'}}>{profile.location}</p>}
            {profile?.bio && <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, marginBottom: '8px'}}>{profile.bio}</p>}
            <div style={{display: 'inline-flex', alignItems: 'center', gap: '5px', background: brand.primaryLight, border: `1px solid ${brand.primaryBorder}`, borderRadius: '9999px', padding: '3px 10px'}}>
              <div style={{width: '5px', height: '5px', borderRadius: '50%', background: brand.primary}}/>
              <span style={{fontSize: '10px', fontWeight: 700, color: brand.primary}}>{profile?.role || 'FAMILY'} · Active</span>
            </div>
          </div>
        </div>

        {/* Send Maya button */}
        <button onClick={() => { setShowMayaAnimation(true); setTimeout(() => setShowMayaAnimation(false), 2500) }}
          style={{marginTop: '18px', width: '100%', padding: '14px 20px', background: 'rgba(220,20,60,0.15)', border: '1px solid rgba(220,20,60,0.25)', borderRadius: '16px', color: 'white', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', position: 'relative', zIndex: 1}}>
          <HeartIcon size={18} color="white" filled strokeWidth={0}/>
          <span>Send Maya to Family</span>
          <span style={{fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: 400}}>· माया पठाउनुस्</span>
        </button>
      </div>

      <div style={{padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px'}}>

        {/* Stats */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px'}}>
          {[
            { val: posts.length.toString(), label: 'Moments', color: t.text1 },
            { val: posts.reduce((s, p) => s + (p.likes || 0), 0).toString(), label: 'Likes', color: brand.primary },
            { val: new Date(profile?.createdAt || Date.now()).toLocaleDateString('en', { month: 'short', year: '2-digit' }), label: 'Joined', color: t.text1 },
          ].map((s, i) => (
            <div key={i} style={{...card, padding: '16px 8px', textAlign: 'center'}}>
              <p style={{fontSize: '22px', fontWeight: 800, color: s.color, letterSpacing: '-0.5px', transition: 'color 0.3s ease'}}>{s.val}</p>
              <p style={{fontSize: '10px', fontWeight: 700, color: t.text3, marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Moments Bento */}
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
            <h3 style={{fontSize: '17px', fontWeight: 700, color: t.text1, letterSpacing: '-0.3px', transition: 'color 0.3s ease'}}>Moments</h3>
            <button onClick={() => router.push('/memory')}
              style={{fontSize: '13px', fontWeight: 700, color: brand.primary, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
              + Share
            </button>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>

            {/* Featured post */}
            <div onClick={() => router.push('/memory')}
              style={{...card, cursor: 'pointer', minHeight: '180px'}}>
              {posts[0]?.images?.[0]
                ? <div style={{position: 'relative', height: '130px'}}>
                    <img src={posts[0].images[0]} alt="moment" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                    <div style={{position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(220,20,60,0.9)', borderRadius: '8px', padding: '3px 8px'}}>
                      <span style={{fontSize: '9px', fontWeight: 700, color: 'white', textTransform: 'uppercase'}}>Care</span>
                    </div>
                  </div>
                : <div style={{height: '130px', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px'}}>
                    <CameraIcon size={28} color={brand.primary} strokeWidth={1.8}/>
                    <p style={{fontSize: '11px', color: brand.primary, fontWeight: 600}}>Share a photo</p>
                  </div>}
              <div style={{padding: '10px 12px'}}>
                <p style={{fontSize: '12px', fontWeight: 700, color: t.text1, lineHeight: 1.4, transition: 'color 0.3s ease'}}>{posts[0]?.content?.slice(0, 36) || 'Your first moment'}{posts[0]?.content?.length > 36 ? '…' : ''}</p>
                <p style={{fontSize: '10px', color: t.text3, marginTop: '3px'}}>{posts[0] ? timeAgo(posts[0].createdAt) : 'No moments yet'}</p>
              </div>
            </div>

            {/* Right column */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              {/* Sathi tile — always dark */}
              <div onClick={() => router.push('/sathi')}
                style={{background: 'linear-gradient(135deg, #0E0B18, #1A0A16)', borderRadius: '20px', padding: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', cursor: 'pointer', flex: 1, border: '1px solid rgba(255,255,255,0.06)'}}>
                <div style={{display: 'flex', gap: '3px', alignItems: 'flex-end', marginBottom: '10px', height: '28px'}}>
                  {[4,7,5,9,6,8,4,7,5,8,6].map((h, i) => (
                    <div key={i} style={{width: '3px', background: brand.primary, borderRadius: '2px', height: `${h * 3}px`, animation: `wave 1.2s ease-in-out ${i * 0.1}s infinite`}}/>
                  ))}
                </div>
                <p style={{fontSize: '12px', fontWeight: 800, color: 'white', marginBottom: '2px'}}>Sathi AI</p>
                <p style={{fontSize: '10px', color: 'rgba(255,255,255,0.35)'}}>Tap to talk</p>
              </div>

              {/* Mini stats */}
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px'}}>
                {[
                  { val: posts.length, label: 'Posts', color: t.text1 },
                  { val: posts.reduce((s, p) => s + (p.likes || 0), 0), label: 'Likes', color: brand.primary },
                ].map((s, i) => (
                  <div key={i} style={{...card, padding: '12px 8px', textAlign: 'center'}}>
                    <p style={{fontSize: '20px', fontWeight: 800, color: s.color, letterSpacing: '-0.5px'}}>{s.val}</p>
                    <p style={{fontSize: '9px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px'}}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Dial */}
            <div style={{gridColumn: '1 / -1', ...card, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px'}}>
              <div style={{width: '36px', height: '36px', borderRadius: '12px', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <SparkleIcon size={18} color={brand.primary} strokeWidth={1.8}/>
              </div>
              <div style={{flex: 1}}>
                <p style={{fontSize: '10px', fontWeight: 700, color: brand.primary, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '3px'}}>Daily Dial</p>
                <p style={{fontSize: '13px', color: t.text2, fontStyle: 'italic', lineHeight: 1.4, transition: 'color 0.3s ease'}}>
                  {profile?.bio ? `"${profile.bio.slice(0, 55)}${profile.bio.length > 55 ? '…' : ''}"` : '"Feeling connected to family today."'}
                </p>
              </div>
              <button onClick={() => router.push('/edit-profile')}
                style={{background: brand.primaryLight, border: 'none', borderRadius: '9999px', cursor: 'pointer', padding: '5px 12px', flexShrink: 0}}>
                <span style={{fontSize: '11px', fontWeight: 700, color: brand.primary, fontFamily: 'Inter, sans-serif'}}>Edit</span>
              </button>
            </div>
          </div>
        </div>

        {/* My Activity */}
        <div style={{...card}}>
          <div style={{padding: '16px 16px 8px'}}>
            <p style={{fontSize: '11px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px'}}>My Activity</p>
          </div>
          {[
            { Icon: CalendarIcon, label: 'My Bookings', sub: 'View and manage bookings', path: '/bookings', color: brand.info, bg: brand.infoBg },
            { Icon: WalletIcon, label: 'Payment History', sub: 'eSewa · Khalti · Bank', path: '/wallet', color: brand.success, bg: brand.successBg },
          ].map((item, i) => (
            <div key={i} onClick={() => router.push(item.path)}
              style={{display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderTop: `1px solid ${t.border}`, cursor: 'pointer'}}>
              <div style={{width: '42px', height: '42px', borderRadius: '12px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <item.Icon size={20} color={item.color} strokeWidth={1.8}/>
              </div>
              <div style={{flex: 1}}>
                <p style={{fontSize: '15px', fontWeight: 700, color: t.text1, transition: 'color 0.3s ease'}}>{item.label}</p>
                <p style={{fontSize: '12px', color: t.text3, marginTop: '2px'}}>{item.sub}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.text4} strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          ))}
        </div>

        {/* Personalize */}
        <div style={{...card}}>
          <div style={{padding: '16px 16px 8px'}}>
            <p style={{fontSize: '11px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px'}}>Personalize</p>
          </div>
          {[
            { Icon: EditIcon, label: 'Edit Profile', sub: 'Name, photo, bio, location', path: '/edit-profile', color: brand.primary, bg: brand.primaryLight },
            { Icon: SparkleIcon, label: 'Switch to Companion Mode', sub: 'Earn by providing care services', path: '/companion/setup', color: '#7C3AED', bg: 'rgba(124,58,237,0.08)' },
            { Icon: BellIcon, label: 'Notifications', sub: 'Likes, comments, updates', path: '/notifications', color: brand.warning, bg: brand.warningBg },
            { Icon: SearchIcon, label: 'Search', sub: 'Find people and moments', path: '/search', color: brand.info, bg: brand.infoBg },
          ].map((item, i) => (
            <div key={i} onClick={() => router.push(item.path)}
              style={{display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderTop: `1px solid ${t.border}`, cursor: 'pointer'}}>
              <div style={{width: '42px', height: '42px', borderRadius: '12px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <item.Icon size={20} color={item.color} strokeWidth={1.8}/>
              </div>
              <div style={{flex: 1}}>
                <p style={{fontSize: '15px', fontWeight: 700, color: t.text1, transition: 'color 0.3s ease'}}>{item.label}</p>
                <p style={{fontSize: '12px', color: t.text3, marginTop: '2px'}}>{item.sub}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.text4} strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          ))}

          {/* Language toggle */}
          <div style={{display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderTop: `1px solid ${t.border}`}}>
            <div style={{width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(124,58,237,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <GlobeIcon size={20} color="#7C3AED" strokeWidth={1.8}/>
            </div>
            <div style={{flex: 1}}>
              <p style={{fontSize: '15px', fontWeight: 700, color: t.text1, transition: 'color 0.3s ease'}}>Language</p>
              <p style={{fontSize: '12px', color: t.text3, marginTop: '2px'}}>English / नेपाली</p>
            </div>
            <div onClick={() => setLangNepali(!langNepali)}
              style={{width: '52px', height: '28px', borderRadius: '9999px', background: langNepali ? brand.primary : t.border, position: 'relative', cursor: 'pointer', transition: 'background 0.3s ease', flexShrink: 0}}>
              <div style={{position: 'absolute', top: '3px', left: langNepali ? '27px' : '3px', width: '22px', height: '22px', borderRadius: '50%', background: 'white', boxShadow: '0 2px 6px rgba(0,0,0,0.15)', transition: 'left 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{fontSize: '9px', fontWeight: 800, color: langNepali ? brand.primary : t.text3}}>{langNepali ? 'ने' : 'EN'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sign out */}
        <div style={{textAlign: 'center'}}>
          <button onClick={() => signOut({ callbackUrl: '/' })}
            style={{background: 'none', border: 'none', color: t.text3, fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif', padding: '8px 20px'}}>
            Sign out
          </button>
        </div>

        {/* Footer watermark */}
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', paddingBottom: '8px'}}>
          <SahayatriLogo size={14} color={t.text3}/>
          <p style={{fontSize: '11px', color: t.text4}}>Sahayatri · Made with love for Nepal</p>
        </div>

      </div>

      <style>{`
        @keyframes heartPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.12); } }
        @keyframes wave { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(1.2); } }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <BottomNav/>
    </div>
  )
}
