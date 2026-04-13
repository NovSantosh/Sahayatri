'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import SOSButton from '../components/SOSButton'
import ModeSwitch from '../components/ModeSwitch'
import BottomNav from '../components/BottomNav'
import InlineSearch from '../components/InlineSearch'
import ThemeToggle from '../components/ThemeToggle'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'
import {
  BellIcon, HeartIcon, FamilyIcon, WalletIcon,
  CalendarIcon, ClockIcon, FestivalIcon,
  MicIcon, CameraIcon, SahayatriLogo, MoonIcon
} from '../components/Icons'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const { t, theme } = useTheme()
  const router = useRouter()
  const [bookings, setBookings] = useState<any[]>([])
  const [posts, setPosts] = useState<any[]>([])
  const [family, setFamily] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [pressedCard, setPressedCard] = useState<string | null>(null)
  const [showMayaAnim, setShowMayaAnim] = useState(false)
  const [mayaSent, setMayaSent] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (status === 'authenticated') fetchAll()
  }, [status])

  const fetchAll = async () => {
    try {
      const [bRes, pRes, fRes] = await Promise.all([
        fetch(`/api/bookings?email=${session?.user?.email}`),
        fetch('/api/posts'),
        fetch(`/api/family?email=${session?.user?.email}`),
      ])
      const [b, p, f] = await Promise.all([bRes.json(), pRes.json(), fRes.json()])
      setBookings(b.bookings || [])
      setPosts(p.posts || [])
      setFamily(f.family)
    } catch (e) {}
    setLoading(false)
  }

  if (status === 'loading' || loading) {
    return (
      <div style={{minHeight: '100vh', background: t.pageBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', transition: 'background 0.3s ease'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px'}}>
          <div style={{width: '52px', height: '52px', borderRadius: '50%', background: brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 24px rgba(220,20,60,0.28)', animation: 'breathe 2s ease infinite'}}>
            <SahayatriLogo size={30} color="white"/>
          </div>
          <p style={{fontSize: '13px', color: t.text3}}>Loading Sahayatri…</p>
        </div>
      </div>
    )
  }

  const name = session?.user?.name || 'Friend'
  const firstName = name.split(' ')[0]
  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
  const hour = new Date().getHours()
  const now = new Date()
  const kathmandu = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }))
  const ktmHour = kathmandu.getHours()
  const goodTimeToCall = ktmHour >= 7 && ktmHour < 22
  const ktmTimeStr = kathmandu.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  const ktmPeriod = ktmHour < 6 ? 'late night' : ktmHour < 12 ? 'morning' : ktmHour < 17 ? 'afternoon' : ktmHour < 21 ? 'evening' : 'night'

  const FESTIVALS = [
    { name: 'Dashain', nepali: 'दशैं', date: new Date('2025-10-02') },
    { name: 'Tihar', nepali: 'तिहार', date: new Date('2025-10-20') },
    { name: 'Holi', nepali: 'होली', date: new Date('2026-03-14') },
    { name: 'Maghe Sankranti', nepali: 'माघे संक्रान्ति', date: new Date('2026-01-14') },
  ]
  const nextFestival = FESTIVALS
    .map(f => ({ ...f, days: Math.ceil((f.date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) }))
    .filter(f => f.days > 0).sort((a, b) => a.days - b.days)[0]

  const pendingBookings = bookings.filter(b => b.paymentStatus === 'unpaid').length
  const familyOnline = family?.members?.filter((m: any) =>
    Math.floor((Date.now() - new Date(m.lastActive).getTime()) / 1000) < 120
  ).length || 0

  const timeAgo = (date: string) => {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (s < 60) return 'just now'
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  const press = (id: string) => setPressedCard(id)
  const release = () => setPressedCard(null)

  const sendMaya = () => {
    setMayaSent(true)
    setShowMayaAnim(true)
    setTimeout(() => setShowMayaAnim(false), 2500)
  }

  // Shared styles using theme
  const card = {
    background: t.cardBg,
    borderRadius: '20px',
    border: `1px solid ${t.border}`,
    boxShadow: t.shadow,
    transition: 'background 0.3s ease, border-color 0.3s ease',
  }

  const pressStyle = (id: string) => ({
    transform: pressedCard === id ? 'scale(0.97)' : 'scale(1)',
    transition: 'transform 0.15s ease',
    cursor: 'pointer' as const,
  })

  const isDark = theme === 'dark'

  return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, -apple-system, sans-serif', paddingBottom: '100px', transition: 'background 0.3s ease'}}>

      {/* Global glow in dark mode */}
      {isDark && <div style={{position: 'fixed', top: 0, left: 0, right: 0, height: '40vh', background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,0,30,0.18) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0}}/>}

      {/* Maya animation */}
      {showMayaAnim && (
        <div style={{position: 'fixed', inset: 0, background: 'linear-gradient(135deg, #3D0010, #DC143C, #C4507A)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{animation: 'heartPulse 0.7s ease infinite'}}>
            <HeartIcon size={80} color="white" filled strokeWidth={0}/>
          </div>
          <h2 style={{fontSize: '32px', fontWeight: 800, color: 'white', marginTop: '24px', marginBottom: '8px', letterSpacing: '-1px'}}>माया पठाइयो!</h2>
          <p style={{fontSize: '16px', color: 'rgba(255,255,255,0.6)'}}>Love sent to your family</p>
        </div>
      )}

      {/* ── HEADER ── */}
      <div style={{background: t.headerBg, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: '52px 20px 14px', borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 50, boxShadow: isDark ? 'none' : '0 1px 12px rgba(0,0,0,0.04)', transition: 'background 0.3s ease'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px'}}>
          <div>
            <p style={{fontSize: '11px', fontWeight: 600, color: t.text3, letterSpacing: '0.5px', marginBottom: '4px'}}>
              {hour < 12 ? 'शुभ प्रभात' : hour < 17 ? 'नमस्ते' : 'शुभ सन्ध्या'}
            </p>
            <h1 style={{fontSize: '24px', fontWeight: 900, color: t.text1, letterSpacing: '-0.8px', lineHeight: 1.1, transition: 'color 0.3s ease'}}>
              {hour < 5 ? `Still up, ${firstName}?`
                : hour < 12 ? `Good morning, ${firstName}`
                : hour < 17 ? `Good afternoon, ${firstName}`
                : hour < 21 ? `Good evening, ${firstName}`
                : `Good night, ${firstName}`}
            </h1>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <ModeSwitch /><SOSButton /><ThemeToggle />
            <Link href="/notifications" style={{width: '40px', height: '40px', borderRadius: '12px', border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', textDecoration: 'none', background: t.cardBg}}>
              <BellIcon size={18} color={t.text2} strokeWidth={1.8}/>
              <div style={{position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', borderRadius: '50%', background: brand.primary, border: `2px solid ${t.pageBg}`}}/>
            </Link>
            <Link href="/profile" style={{width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '14px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(220,20,60,0.3)'}}>
              {initials}
            </Link>
          </div>
        </div>
        <InlineSearch />
      </div>

      <div style={{padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', zIndex: 1}}>

        {/* ── FAMILY HERO CARD ── always dark, brand feel */}
        <div style={{borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', border: `1px solid rgba(255,255,255,0.06)`}}>
          <div style={{background: 'linear-gradient(135deg, #0E0B18 0%, #1A0A16 50%, #0A0E1A 100%)', padding: '22px', position: 'relative', overflow: 'hidden'}}>
            <div style={{position: 'absolute', top: '-50px', right: '-30px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,20,60,0.18), transparent 70%)', pointerEvents: 'none'}}/>
            <div style={{position: 'absolute', bottom: '-40px', left: '-20px', width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(96,165,250,0.07), transparent 70%)', pointerEvents: 'none'}}/>
            <div style={{position: 'absolute', top: '16px', right: '16px', opacity: 0.06, pointerEvents: 'none'}}>
              <SahayatriLogo size={80} color="white"/>
            </div>

            <div style={{position: 'relative', zIndex: 1}}>
              {family?.members && family.members.length > 0 ? (
                <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px'}}>
                  <div style={{display: 'flex'}}>
                    {family.members.slice(0, 5).map((m: any, i: number) => (
                      <div key={i} style={{width: '30px', height: '30px', borderRadius: '50%', background: `hsl(${i * 60 + 200}, 30%, 30%)`, border: '2px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.8)', fontSize: '10px', fontWeight: 700, marginLeft: i > 0 ? '-7px' : '0'}}>
                        {m.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                    ))}
                  </div>
                  {familyOnline > 0 && (
                    <div style={{display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '20px', padding: '3px 10px'}}>
                      <div style={{width: '5px', height: '5px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 5px rgba(34,197,94,0.8)'}}/>
                      <span style={{fontSize: '11px', fontWeight: 600, color: '#22C55E'}}>{familyOnline} online</span>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px'}}>
                  <div style={{width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1.5px dashed rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <FamilyIcon size={14} color="rgba(255,255,255,0.3)" strokeWidth={1.8}/>
                  </div>
                  <span style={{fontSize: '12px', color: 'rgba(255,255,255,0.35)'}}>No family room yet</span>
                </div>
              )}

              <h2 style={{fontSize: '20px', fontWeight: 800, color: 'white', lineHeight: 1.3, marginBottom: '5px', letterSpacing: '-0.4px'}}>
                {family ? family.name : 'Start your Family Room'}
              </h2>
              <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: '18px'}}>
                {family
                  ? familyOnline > 0 ? `${familyOnline} member${familyOnline > 1 ? 's' : ''} active right now.` : 'Your family room is waiting for you.'
                  : 'Create a room and invite your loved ones.'}
              </p>

              <div style={{display: 'flex', gap: '10px'}}>
                <button onClick={() => router.push('/family')}
                  style={{flex: 1, padding: '11px 16px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', color: 'white', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
                  Open Family Room
                </button>
                <button onClick={sendMaya}
                  style={{width: '44px', height: '44px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 16px rgba(220,20,60,0.4)', flexShrink: 0}}>
                  <HeartIcon size={20} color="white" filled strokeWidth={0}/>
                </button>
              </div>
            </div>
          </div>

          {/* Time strip — adapts to theme */}
          <div style={{background: t.cardBg, padding: '14px 20px', display: 'grid', gridTemplateColumns: '1fr 1px 1fr', borderTop: `1px solid ${t.border}`, transition: 'background 0.3s ease'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', paddingRight: '16px'}}>
              <div style={{width: '34px', height: '34px', borderRadius: '10px', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <ClockIcon size={16} color={brand.primary} strokeWidth={2}/>
              </div>
              <div>
                <p style={{fontSize: '10px', color: t.text3, fontWeight: 600, marginBottom: '2px'}}>Kathmandu</p>
                <p style={{fontSize: '15px', fontWeight: 800, color: t.text1, letterSpacing: '-0.5px', transition: 'color 0.3s ease'}}>{ktmTimeStr}</p>
              </div>
            </div>
            <div style={{background: t.border}}/>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '16px'}}>
              <div style={{width: '34px', height: '34px', borderRadius: '10px', background: goodTimeToCall ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {goodTimeToCall
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={brand.success} strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  : <MoonIcon size={16} color={brand.warning} strokeWidth={2}/>}
              </div>
              <div>
                <p style={{fontSize: '10px', color: t.text3, fontWeight: 600, marginBottom: '2px'}}>It is {ktmPeriod}</p>
                <p style={{fontSize: '13px', fontWeight: 700, color: goodTimeToCall ? brand.success : brand.warning}}>
                  {goodTimeToCall ? 'Good to call' : 'May be asleep'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── FESTIVAL ── */}
        {nextFestival && nextFestival.days <= 45 && (
          <div style={{...card, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px'}}>
            <div style={{width: '46px', height: '46px', borderRadius: '14px', background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <FestivalIcon size={24} color={brand.warning} strokeWidth={1.8}/>
            </div>
            <div style={{flex: 1}}>
              <p style={{fontSize: '10px', fontWeight: 700, color: brand.warning, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '3px'}}>Coming Up</p>
              <p style={{fontSize: '16px', fontWeight: 800, color: t.text1, letterSpacing: '-0.3px', transition: 'color 0.3s ease'}}>{nextFestival.name} · {nextFestival.nepali}</p>
            </div>
            <div style={{textAlign: 'center', background: 'rgba(245,158,11,0.1)', border: `1px solid rgba(217,119,6,0.15)`, borderRadius: '12px', padding: '8px 14px', flexShrink: 0}}>
              <p style={{fontSize: '22px', fontWeight: 900, color: brand.warning, lineHeight: 1, letterSpacing: '-1px'}}>{nextFestival.days}</p>
              <p style={{fontSize: '9px', fontWeight: 700, color: brand.warning, opacity: 0.7, textTransform: 'uppercase'}}>days</p>
            </div>
          </div>
        )}

        {/* ── SATHI AI ── always dark card */}
        <Link href="/sathi" style={{textDecoration: 'none', borderRadius: '20px', overflow: 'hidden', background: 'linear-gradient(135deg, #0E0B18 0%, #1A0A16 100%)', display: 'block', boxShadow: '0 4px 24px rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)', position: 'relative'}}>
          <div style={{position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,20,60,0.15), transparent 70%)', pointerEvents: 'none'}}/>
          <div style={{position: 'relative', zIndex: 1, padding: '20px', display: 'flex', alignItems: 'center', gap: '16px'}}>
            <div style={{width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 16px rgba(220,20,60,0.4)', animation: 'breathe 3s ease infinite'}}>
              <MicIcon size={24} color="white" strokeWidth={2}/>
            </div>
            <div style={{flex: 1}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px'}}>
                <div style={{width: '5px', height: '5px', borderRadius: '50%', background: '#22C55E', animation: 'pulse 2s ease infinite'}}/>
                <span style={{fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.8px'}}>Sathi AI · Active</span>
              </div>
              <p style={{fontSize: '16px', fontWeight: 800, color: 'white', lineHeight: 1.3, marginBottom: '3px', letterSpacing: '-0.3px'}}>
                {hour < 12 ? 'Start your morning with Sathi.' : hour < 17 ? 'How is your day going?' : 'Talk to Sathi tonight.'}
              </p>
              <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.35)'}}>Speaks Nepali and English · Always here</p>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </Link>

        {/* ── LIVE STATS ── */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px'}}>
          {[
            { id: 'stat1', Icon: FamilyIcon, label: familyOnline > 0 ? `${familyOnline} Online` : 'Family', sub: familyOnline > 0 ? 'in room' : 'Open room', path: '/family', color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
            { id: 'stat2', Icon: CalendarIcon, label: pendingBookings > 0 ? `${pendingBookings} Pending` : 'Bookings', sub: pendingBookings > 0 ? 'payment due' : `${bookings.length} total`, path: '/bookings', color: brand.warning, bg: 'rgba(245,158,11,0.1)' },
            { id: 'stat3', Icon: FestivalIcon, label: nextFestival?.name || 'Festivals', sub: nextFestival ? `${nextFestival.days}d away` : 'Coming soon', path: '/family', color: brand.accent, bg: brand.accentBg },
          ].map((item) => (
            <div key={item.id}
              onClick={() => router.push(item.path)}
              onMouseDown={() => press(item.id)}
              onMouseUp={release}
              onTouchStart={() => press(item.id)}
              onTouchEnd={() => { release(); router.push(item.path) }}
              style={{...card, padding: '14px 10px', textAlign: 'center', ...pressStyle(item.id)}}>
              <div style={{width: '38px', height: '38px', borderRadius: '11px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px'}}>
                <item.Icon size={19} color={item.color} strokeWidth={1.8}/>
              </div>
              <p style={{fontSize: '12px', fontWeight: 800, color: item.color, marginBottom: '3px'}}>{item.label}</p>
              <p style={{fontSize: '10px', color: t.text3, fontWeight: 500}}>{item.sub}</p>
            </div>
          ))}
        </div>

        {/* ── RECENT MOMENTS ── */}
        {posts.length > 0 && (
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
              <h3 style={{fontSize: '17px', fontWeight: 700, color: t.text1, letterSpacing: '-0.3px', transition: 'color 0.3s ease'}}>Recent Moments</h3>
              <Link href="/memory" style={{fontSize: '13px', fontWeight: 700, color: brand.primary, textDecoration: 'none'}}>See all</Link>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              {posts.slice(0, 2).map((post: any) => (
                <div key={post._id}
                  onClick={() => router.push('/memory')}
                  onMouseDown={() => press(`p${post._id}`)}
                  onMouseUp={release}
                  onTouchStart={() => press(`p${post._id}`)}
                  onTouchEnd={() => { release(); router.push('/memory') }}
                  style={{...card, overflow: 'hidden', ...pressStyle(`p${post._id}`)}}>
                  <div style={{padding: '16px', display: 'flex', gap: '12px'}}>
                    <div style={{width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '13px', flexShrink: 0, boxShadow: '0 4px 12px rgba(220,20,60,0.25)'}}>
                      {post.authorName?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                    </div>
                    <div style={{flex: 1}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                        <p style={{fontSize: '14px', fontWeight: 700, color: t.text1, transition: 'color 0.3s ease'}}>{post.authorName}</p>
                        <p style={{fontSize: '11px', color: t.text3}}>{timeAgo(post.createdAt)}</p>
                      </div>
                      <p style={{fontSize: '13px', color: t.text2, lineHeight: 1.6, transition: 'color 0.3s ease'}}>{post.content?.slice(0, 90)}{post.content?.length > 90 ? '…' : ''}</p>
                      <div style={{display: 'flex', alignItems: 'center', gap: '5px', marginTop: '9px'}}>
                        <HeartIcon size={12} color={brand.primary} strokeWidth={2} filled/>
                        <span style={{fontSize: '11px', color: t.text3}}>{post.likes || 0}</span>
                      </div>
                    </div>
                  </div>
                  {post.images?.[0] && <img src={post.images[0]} alt="moment" style={{width: '100%', maxHeight: '200px', objectFit: 'cover', display: 'block'}}/>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── QUICK ACTIONS ── */}
        <div>
          <h3 style={{fontSize: '17px', fontWeight: 700, color: t.text1, letterSpacing: '-0.3px', marginBottom: '12px', transition: 'color 0.3s ease'}}>Quick Actions</h3>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
            {[
              { id: 'qa0', Icon: HeartIcon, label: 'Book Care', sub: 'For family in Nepal', path: '/care', color: brand.primary, bg: brand.primaryLight },
              { id: 'qa1', Icon: CameraIcon, label: 'Share a Moment', sub: 'Post to Memory', path: '/memory', color: brand.primary, bg: brand.primaryLight },
              { id: 'qa2', Icon: FamilyIcon, label: 'Family Room', sub: 'Stay connected', path: '/family', color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
              { id: 'qa3', Icon: WalletIcon, label: 'Payments', sub: 'eSewa · Khalti', path: '/wallet', color: brand.success, bg: 'rgba(16,185,129,0.1)' },
              { id: 'qa4', Icon: CalendarIcon, label: 'My Bookings', sub: 'View all', path: '/bookings', color: brand.accent, bg: brand.accentBg },
            ].map((item) => (
              <div key={item.id}
                onClick={() => router.push(item.path)}
                onMouseDown={() => press(item.id)}
                onMouseUp={release}
                onTouchStart={() => press(item.id)}
                onTouchEnd={() => { release(); router.push(item.path) }}
                style={{...card, padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: '12px', ...pressStyle(item.id)}}>
                <div style={{width: '42px', height: '42px', borderRadius: '12px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <item.Icon size={20} color={item.color} strokeWidth={1.8}/>
                </div>
                <div>
                  <p style={{fontSize: '14px', fontWeight: 700, color: t.text1, marginBottom: '2px', transition: 'color 0.3s ease'}}>{item.label}</p>
                  <p style={{fontSize: '11px', color: t.text3, fontWeight: 500}}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CARE & COMPANIONS ── always dark */}
        <div>
          <h3 style={{fontSize: '17px', fontWeight: 700, color: t.text1, letterSpacing: '-0.3px', marginBottom: '12px', transition: 'color 0.3s ease'}}>Care & Companions</h3>
          <div style={{background: 'linear-gradient(135deg, #0E0B18 0%, #1A0A14 100%)', borderRadius: '20px', padding: '22px', marginBottom: '10px', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)'}}>
            <div style={{position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,20,60,0.12), transparent 70%)', pointerEvents: 'none'}}/>
            <div style={{position: 'relative', zIndex: 1}}>
              <div style={{display: 'inline-flex', alignItems: 'center', gap: '6px', background: brand.primaryLight, border: `1px solid ${brand.primaryBorder}`, borderRadius: '20px', padding: '4px 12px', marginBottom: '14px'}}>
                <div style={{width: '4px', height: '4px', borderRadius: '50%', background: brand.primary, animation: 'pulse 2s ease infinite'}}/>
                <span style={{fontSize: '10px', fontWeight: 700, color: brand.primary, textTransform: 'uppercase', letterSpacing: '0.8px'}}>Coming Soon</span>
              </div>
              <h3 style={{fontSize: '19px', fontWeight: 800, color: 'white', lineHeight: 1.35, marginBottom: '8px', letterSpacing: '-0.4px'}}>Verified companions.<br/>Real care for your family.</h3>
              <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: '18px'}}>Every companion background checked. Your family deserves the best.</p>
              <div style={{display: 'flex', gap: '10px'}}>
                <button onClick={() => router.push('/join-professional')}
                  style={{padding: '10px 18px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', color: 'white', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
                  Join as Companion
                </button>
                <button onClick={() => router.push('/services')}
                  style={{padding: '10px 18px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 16px rgba(220,20,60,0.35)'}}>
                  Home Services
                </button>
              </div>
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
            {[
              { id: 'c1', label: 'Elder Care', sub: 'Daily visits & company', color: brand.primary, bg: brand.primaryLight,
                Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={brand.primary} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="7" r="4"/><path d="M5 20a7 7 0 0 1 14 0"/><path d="M12 14v3M10 17h4"/></svg> },
              { id: 'c2', label: 'Yoga & Wellness', sub: 'At-home sessions', color: brand.accent, bg: brand.accentBg,
                Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={brand.accent} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="4" r="2"/><path d="M15 20v-7l3-3-6-3-6 3 3 3v7"/><path d="M9 20h6"/></svg> },
              { id: 'c3', label: 'Cooking', sub: 'Nepali home cooking', color: brand.warning, bg: 'rgba(245,158,11,0.1)',
                Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={brand.warning} strokeWidth="1.8" strokeLinecap="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> },
              { id: 'c4', label: 'Child Care', sub: 'Learning and care', color: '#3B82F6', bg: 'rgba(59,130,246,0.1)',
                Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={'#3B82F6'} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="6" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
            ].map((s) => (
              <div key={s.id}
                onMouseDown={() => press(s.id)}
                onMouseUp={release}
                onTouchStart={() => press(s.id)}
                onTouchEnd={release}
                style={{...card, padding: '16px', ...pressStyle(s.id)}}>
                <div style={{width: '40px', height: '40px', borderRadius: '12px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '11px'}}>
                  <s.Icon/>
                </div>
                <p style={{fontSize: '14px', fontWeight: 700, color: t.text1, marginBottom: '3px', transition: 'color 0.3s ease'}}>{s.label}</p>
                <p style={{fontSize: '11px', color: t.text3, marginBottom: '10px', lineHeight: 1.4, transition: 'color 0.3s ease'}}>{s.sub}</p>
                <div style={{display: 'inline-flex', alignItems: 'center', gap: '4px', background: s.bg, borderRadius: '20px', padding: '3px 9px'}}>
                  <div style={{width: '4px', height: '4px', borderRadius: '50%', background: s.color}}/>
                  <p style={{fontSize: '10px', fontWeight: 700, color: s.color}}>Soon</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── HOME SERVICES ── */}
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
            <h3 style={{fontSize: '17px', fontWeight: 700, color: t.text1, letterSpacing: '-0.3px', transition: 'color 0.3s ease'}}>Home Services</h3>
            <Link href="/services" style={{fontSize: '13px', fontWeight: 700, color: brand.primary, textDecoration: 'none'}}>View all</Link>
          </div>
          <div style={{display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none'}}>
            {[
              { id: 's1', name: 'Electrician', rate: 'NPR 800', color: brand.warning, bg: 'rgba(245,158,11,0.1)',
                Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={brand.warning} strokeWidth="1.8" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
              { id: 's2', name: 'Plumber', rate: 'NPR 700', color: '#3B82F6', bg: 'rgba(59,130,246,0.1)',
                Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={'#3B82F6'} strokeWidth="1.8" strokeLinecap="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> },
              { id: 's3', name: 'Cleaner', rate: 'NPR 600', color: brand.success, bg: 'rgba(16,185,129,0.1)',
                Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={brand.success} strokeWidth="1.8" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { id: 's4', name: 'Carpenter', rate: 'NPR 900', color: '#A0784A', bg: 'rgba(160,120,74,0.08)',
                Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A0784A" strokeWidth="1.8" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/><line x1="18" y1="4" x2="6" y2="16"/><rect x="4" y="18" width="4" height="4" rx="1"/></svg> },
              { id: 's5', name: 'Painter', rate: 'NPR 1,200', color: brand.accent, bg: brand.accentBg,
                Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={brand.accent} strokeWidth="1.8" strokeLinecap="round"><path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z"/><path d="M12 11V3"/><path d="M8 7l4-4 4 4"/></svg> },
            ].map((s) => (
              <div key={s.id}
                onClick={() => router.push('/services')}
                onMouseDown={() => press(s.id)}
                onMouseUp={release}
                onTouchStart={() => press(s.id)}
                onTouchEnd={() => { release(); router.push('/services') }}
                style={{flexShrink: 0, ...card, padding: '14px 12px', textAlign: 'center', minWidth: '95px', ...pressStyle(s.id)}}>
                <div style={{width: '42px', height: '42px', borderRadius: '12px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 9px'}}>
                  <s.Icon/>
                </div>
                <p style={{fontSize: '12px', fontWeight: 700, color: t.text1, marginBottom: '3px', transition: 'color 0.3s ease'}}>{s.name}</p>
                <p style={{fontSize: '11px', fontWeight: 600, color: s.color}}>{s.rate}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FOR PROFESSIONALS ── always dark */}
        <div style={{background: 'linear-gradient(135deg, #0E0B18 0%, #1A0A14 100%)', borderRadius: '20px', padding: '22px', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)'}}>
          <div style={{position: 'absolute', top: '-30px', right: '-30px', width: '140px', height: '140px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,20,60,0.1), transparent 70%)', pointerEvents: 'none'}}/>
          <p style={{fontSize: '10px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '8px', position: 'relative', zIndex: 1}}>For Professionals</p>
          <p style={{fontSize: '19px', fontWeight: 800, color: 'white', lineHeight: 1.35, marginBottom: '16px', position: 'relative', zIndex: 1, letterSpacing: '-0.4px'}}>Earn NPR 40,000+<br/>a month on your terms.</p>
          <div onClick={() => router.push('/join-professional')}
            style={{display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', borderRadius: '20px', padding: '11px 22px', position: 'relative', zIndex: 1, cursor: 'pointer', boxShadow: '0 4px 16px rgba(220,20,60,0.35)'}}>
            <span style={{fontSize: '13px', fontWeight: 700, color: 'white'}}>Join Free</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.8); } }
        @keyframes breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
        @keyframes heartPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.12); } }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <BottomNav />
    </div>
  )
}
