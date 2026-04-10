'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BottomNav from '../components/BottomNav'
import { DS } from '../design-system'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [bookings, setBookings] = useState<any[]>([])
  const [posts, setPosts] = useState<any[]>([])
  const [family, setFamily] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  if (status === 'loading' || loading) {
    return (
      <div style={{minHeight: '100vh', background: DS.colors.pageBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px'}}>
          <div style={{width: '40px', height: '40px', borderRadius: DS.radius.icon, background: DS.gradient.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: DS.shadow.primary}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.759 3.8 1 7.2 1c1.98 0 3.72.99 4.8 2.52C13.08 1.99 14.82 1 16.8 1 20.2 1 23 3.759 23 7.191c0 4.105-5.37 8.863-11 14.402z"/></svg>
          </div>
          <p style={{...DS.font.caption, color: DS.colors.text3}}>Loading Sahayatri…</p>
        </div>
      </div>
    )
  }

  const name = session?.user?.name || 'Friend'
  const firstName = name.split(' ')[0]
  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
  const hour = new Date().getHours()
  const greeting = hour < 5 ? `Still up, ${firstName}?` : hour < 12 ? `Good morning, ${firstName}` : hour < 17 ? `Good afternoon, ${firstName}` : hour < 21 ? `Good evening, ${firstName}` : `Good night, ${firstName}`
  const greetingNepali = hour < 12 ? 'शुभ प्रभात 🙏' : hour < 17 ? 'नमस्ते 🙏' : 'शुभ सन्ध्या 🙏'

  const now = new Date()
  const kathmandu = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }))
  const ktmHour = kathmandu.getHours()
  const goodTimeToCall = ktmHour >= 7 && ktmHour < 22

  const FESTIVALS = [
    { name: 'Dashain', date: new Date('2025-10-02'), emoji: '🎊' },
    { name: 'Tihar', date: new Date('2025-10-20'), emoji: '🪔' },
    { name: 'Holi', date: new Date('2026-03-14'), emoji: '🎨' },
    { name: 'Maghe Sankranti', date: new Date('2026-01-14'), emoji: '🌸' },
  ]
  const nextFestival = FESTIVALS
    .map(f => ({ ...f, days: Math.ceil((f.date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) }))
    .filter(f => f.days > 0).sort((a, b) => a.days - b.days)[0]

  const pendingBookings = bookings.filter(b => b.paymentStatus === 'unpaid').length
  const familyOnline = family?.members?.filter((m: any) => Math.floor((Date.now() - new Date(m.lastActive).getTime()) / 1000) < 120).length || 0

  const timeAgo = (date: string) => {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (s < 60) return 'just now'
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  // Shared styles
  const card = {
    background: DS.colors.cardBg,
    borderRadius: DS.radius.card,
    border: `1px solid ${DS.colors.borderStrong}`,
    boxShadow: DS.shadow.card,
  }

  return (
    <div style={{minHeight: '100vh', background: DS.colors.pageBg, fontFamily: 'Inter, -apple-system, sans-serif', paddingBottom: '100px'}}>

      {/* ── HEADER ── */}
      <div style={{background: DS.colors.cardBg, padding: '52px 20px 14px', borderBottom: `1px solid ${DS.colors.border}`, position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 12px rgba(0,0,0,0.04)'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px'}}>
          <div>
            <p style={{...DS.font.label, color: DS.colors.text3, marginBottom: '4px'}}>{greetingNepali}</p>
            <h1 style={{...DS.font.h2, color: DS.colors.text1}}>{greeting}</h1>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <Link href="/notifications" style={{width: '42px', height: '42px', borderRadius: DS.radius.icon, border: `1px solid ${DS.colors.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', textDecoration: 'none', background: DS.colors.cardBg}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={DS.colors.text2} strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <div style={{position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', borderRadius: '50%', background: DS.colors.primary, border: `2px solid ${DS.colors.cardBg}`}}/>
            </Link>
            <Link href="/profile" style={{width: '42px', height: '42px', borderRadius: '50%', background: DS.gradient.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '14px', textDecoration: 'none', boxShadow: DS.shadow.primary}}>
              {initials}
            </Link>
          </div>
        </div>
        <Link href="/search" style={{textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', background: DS.colors.pageBg, border: `1px solid ${DS.colors.borderStrong}`, borderRadius: DS.radius.pill, padding: '11px 18px'}}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={DS.colors.text3} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span style={{...DS.font.bodyMd, color: DS.colors.text3}}>Search companions, services…</span>
        </Link>
      </div>

      <div style={{padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '20px'}}>

        {/* ── LIVE STATS ── */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px'}}>
          {[
            { icon: familyOnline > 0 ? '🟢' : '👨‍👩‍👧', label: familyOnline > 0 ? `${familyOnline} Online` : 'Family', sub: familyOnline > 0 ? 'in Family Room' : 'Open room', path: '/family', color: familyOnline > 0 ? DS.colors.success : DS.colors.info },
            { icon: pendingBookings > 0 ? '⚠️' : '📅', label: pendingBookings > 0 ? `${pendingBookings} Pending` : 'Bookings', sub: pendingBookings > 0 ? 'payment due' : `${bookings.length} total`, path: '/bookings', color: pendingBookings > 0 ? DS.colors.warning : DS.colors.info },
            { icon: nextFestival?.emoji || '��', label: nextFestival?.name || 'Festivals', sub: nextFestival ? `${nextFestival.days}d away` : 'Coming soon', path: '/family', color: DS.colors.primary },
          ].map((item, i) => (
            <div key={i} onClick={() => router.push(item.path)}
              style={{...card, padding: '16px 10px', cursor: 'pointer', textAlign: 'center', transition: 'transform 0.15s ease'}}>
              <div style={{fontSize: '26px', marginBottom: '8px'}}>{item.icon}</div>
              <p style={{...DS.font.caption, color: item.color, fontWeight: 800, marginBottom: '3px'}}>{item.label}</p>
              <p style={{fontSize: '10px', color: DS.colors.text3, fontWeight: 500, lineHeight: 1.3}}>{item.sub}</p>
            </div>
          ))}
        </div>

        {/* ── SATHI AI ── */}
        <Link href="/sathi" style={{textDecoration: 'none', borderRadius: DS.radius.card, overflow: 'hidden', background: DS.gradient.darkDeep, display: 'block', boxShadow: DS.shadow.dark, position: 'relative'}}>
          <div style={{position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,20,60,0.3), transparent 70%)', filter: 'blur(20px)', pointerEvents: 'none'}}/>
          <div style={{position: 'absolute', bottom: '-30px', left: '-20px', width: '140px', height: '140px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(93,45,145,0.3), transparent 70%)', filter: 'blur(15px)', pointerEvents: 'none'}}/>
          <div style={{position: 'relative', zIndex: 1, padding: '22px'}}>
            <div style={{display: 'inline-flex', alignItems: 'center', gap: '6px', background: DS.colors.primaryLight, border: `1px solid ${DS.colors.primaryBorder}`, borderRadius: DS.radius.pill, padding: '5px 12px', marginBottom: '14px'}}>
              <div style={{width: '6px', height: '6px', borderRadius: '50%', background: DS.colors.primary, boxShadow: `0 0 6px ${DS.colors.primary}`, animation: 'pulse 2s ease infinite'}}/>
              <span style={{...DS.font.label, color: DS.colors.primary, fontSize: '10px'}}>Sathi AI · Active</span>
            </div>
            <h2 style={{...DS.font.h3, color: 'white', lineHeight: 1.35, marginBottom: '8px'}}>
              {hour < 12 ? 'Start your morning with Sathi.' : hour < 17 ? 'How is your day going?' : 'Talk to Sathi tonight.'}
            </h2>
            <p style={{...DS.font.bodySm, color: 'rgba(255,255,255,0.4)', marginBottom: '18px'}}>Your AI companion — speaks Nepali and English.</p>
            <div style={{display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: DS.radius.pill, padding: '9px 16px'}}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/></svg>
              <span style={{...DS.font.caption, color: 'white', fontWeight: 700}}>Open Sathi</span>
            </div>
          </div>
        </Link>

        {/* ── KATHMANDU CLOCK ── */}
        <div style={{...card, padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '14px'}}>
            <div style={{width: '48px', height: '48px', borderRadius: DS.radius.icon, background: DS.colors.primaryLight, border: `1px solid ${DS.colors.primaryBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0}}>🇳🇵</div>
            <div>
              <p style={{...DS.font.caption, color: DS.colors.text3, marginBottom: '4px'}}>Right now in Kathmandu</p>
              <p style={{fontSize: '22px', fontWeight: 800, color: DS.colors.text1, letterSpacing: '-1px'}}>
                {kathmandu.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
              </p>
            </div>
          </div>
          <div style={{textAlign: 'right'}}>
            <p style={{...DS.font.caption, color: DS.colors.text3, marginBottom: '4px'}}>
              {ktmHour < 6 ? '🌙 Late night' : ktmHour < 12 ? '🌅 Morning' : ktmHour < 17 ? '☀️ Afternoon' : ktmHour < 21 ? '🌆 Evening' : '🌙 Night'}
            </p>
            <div style={{display: 'inline-flex', alignItems: 'center', gap: '4px', background: goodTimeToCall ? DS.colors.successBg : DS.colors.warningBg, borderRadius: DS.radius.pill, padding: '4px 10px'}}>
              <div style={{width: '5px', height: '5px', borderRadius: '50%', background: goodTimeToCall ? DS.colors.success : DS.colors.warning}}/>
              <p style={{fontSize: '11px', fontWeight: 700, color: goodTimeToCall ? DS.colors.success : DS.colors.warning}}>
                {goodTimeToCall ? 'Good time to call' : 'May be asleep'}
              </p>
            </div>
          </div>
        </div>

        {/* ── RECENT MOMENTS ── */}
        {posts.length > 0 && (
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px'}}>
              <h3 style={{...DS.font.h3, color: DS.colors.text1}}>Recent Moments</h3>
              <Link href="/memory" style={{...DS.font.caption, color: DS.colors.primary, textDecoration: 'none'}}>See all →</Link>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              {posts.slice(0, 2).map((post: any) => (
                <Link key={post._id} href="/memory" style={{textDecoration: 'none', ...card, display: 'block', overflow: 'hidden'}}>
                  <div style={{padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start'}}>
                    <div style={{width: '42px', height: '42px', borderRadius: '50%', background: DS.gradient.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '13px', flexShrink: 0, boxShadow: DS.shadow.primary}}>
                      {post.authorName?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                    </div>
                    <div style={{flex: 1}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px'}}>
                        <p style={{...DS.font.h4, color: DS.colors.text1}}>{post.authorName}</p>
                        <p style={{...DS.font.caption, color: DS.colors.text3}}>{timeAgo(post.createdAt)}</p>
                      </div>
                      <p style={{...DS.font.bodySm, color: DS.colors.text2, lineHeight: 1.6}}>{post.content?.slice(0, 90)}{post.content?.length > 90 ? '…' : ''}</p>
                    </div>
                  </div>
                  {post.images?.[0] && <img src={post.images[0]} alt="moment" style={{width: '100%', maxHeight: '220px', objectFit: 'cover', display: 'block'}}/>}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── QUICK ACTIONS ── */}
        <div>
          <h3 style={{...DS.font.h3, color: DS.colors.text1, marginBottom: '14px'}}>Quick Actions</h3>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
            {[
              { icon: '📸', label: 'Share a Moment', sub: 'Post to Memory', path: '/memory', color: DS.colors.primary, bg: DS.colors.primaryLight },
              { icon: '👨‍👩‍👧', label: 'Family Room', sub: 'Stay connected', path: '/family', color: DS.colors.info, bg: DS.colors.infoBg },
              { icon: '💳', label: 'Payments', sub: 'eSewa · Khalti', path: '/wallet', color: DS.colors.success, bg: DS.colors.successBg },
              { icon: '🔍', label: 'Search', sub: 'People & moments', path: '/search', color: '#7C3AED', bg: '#F5F3FF' },
            ].map((item) => (
              <div key={item.path} onClick={() => router.push(item.path)}
                style={{...card, padding: '18px 16px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <div style={{width: '44px', height: '44px', borderRadius: DS.radius.icon, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px'}}>
                  {item.icon}
                </div>
                <div>
                  <p style={{...DS.font.h4, color: DS.colors.text1, marginBottom: '3px'}}>{item.label}</p>
                  <p style={{...DS.font.caption, color: DS.colors.text3, textTransform: 'none', letterSpacing: 0}}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── COMPANIONS COMING SOON ── */}
        <div>
          <h3 style={{...DS.font.h3, color: DS.colors.text1, marginBottom: '14px'}}>Care & Companions</h3>
          <div style={{...card, background: DS.gradient.dark, borderColor: 'transparent', padding: '24px', marginBottom: '10px', position: 'relative', overflow: 'hidden', boxShadow: DS.shadow.dark}}>
            <div style={{position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,20,60,0.2), transparent 70%)', pointerEvents: 'none'}}/>
            <div style={{position: 'relative', zIndex: 1}}>
              <div style={{display: 'inline-flex', alignItems: 'center', gap: '6px', background: DS.colors.primaryLight, border: `1px solid ${DS.colors.primaryBorder}`, borderRadius: DS.radius.pill, padding: '5px 12px', marginBottom: '16px'}}>
                <div style={{width: '5px', height: '5px', borderRadius: '50%', background: DS.colors.primary, animation: 'pulse 2s ease infinite'}}/>
                <span style={{...DS.font.label, color: DS.colors.primary, fontSize: '10px'}}>Coming to your city</span>
              </div>
              <h3 style={{...DS.font.h3, color: 'white', lineHeight: 1.4, marginBottom: '10px'}}>Real companions.<br/>Real care. Coming soon.</h3>
              <p style={{...DS.font.bodySm, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: '20px'}}>
                We are carefully verifying companions in Kathmandu, Pokhara and beyond. Every companion is background checked. No shortcuts.
              </p>
              <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                <button onClick={() => router.push('/join-professional')}
                  style={{padding: '11px 20px', background: DS.gradient.primary, border: 'none', borderRadius: DS.radius.button, color: 'white', ...DS.font.caption, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: DS.shadow.primary}}>
                  Join as Companion
                </button>
                <button onClick={() => router.push('/services')}
                  style={{padding: '11px 20px', background: DS.colors.darkCard, border: `1px solid ${DS.colors.darkBorder}`, borderRadius: DS.radius.button, color: 'rgba(255,255,255,0.7)', ...DS.font.caption, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
                  Home Services
                </button>
              </div>
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
            {[
              { icon: '👴', label: 'Elder Care', sub: 'Daily visits & company', color: DS.colors.primary },
              { icon: '🧘', label: 'Yoga & Wellness', sub: 'At-home sessions', color: '#7C3AED' },
              { icon: '🍳', label: 'Cooking', sub: 'Nepali home cooking', color: DS.colors.warning },
              { icon: '📚', label: 'Child Care', sub: 'Learning and care', color: DS.colors.info },
            ].map((s, i) => (
              <div key={i} style={{...card, padding: '18px 16px'}}>
                <div style={{fontSize: '28px', marginBottom: '10px'}}>{s.icon}</div>
                <p style={{...DS.font.h4, color: DS.colors.text1, marginBottom: '4px'}}>{s.label}</p>
                <p style={{...DS.font.caption, color: DS.colors.text3, textTransform: 'none', letterSpacing: 0, marginBottom: '10px'}}>{s.sub}</p>
                <div style={{display: 'inline-flex', alignItems: 'center', gap: '4px', background: `${s.color}12`, borderRadius: DS.radius.pill, padding: '3px 10px'}}>
                  <div style={{width: '4px', height: '4px', borderRadius: '50%', background: s.color}}/>
                  <p style={{fontSize: '10px', fontWeight: 700, color: s.color}}>Launching soon</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── HOME SERVICES ── */}
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px'}}>
            <h3 style={{...DS.font.h3, color: DS.colors.text1}}>Home Services</h3>
            <Link href="/services" style={{...DS.font.caption, color: DS.colors.primary, textDecoration: 'none'}}>View all →</Link>
          </div>
          <div style={{display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none'}}>
            {[
              { name: 'Electrician', icon: '⚡', rate: 'NPR 800' },
              { name: 'Plumber', icon: '🔧', rate: 'NPR 700' },
              { name: 'Cleaner', icon: '🧹', rate: 'NPR 600' },
              { name: 'Carpenter', icon: '🪚', rate: 'NPR 900' },
              { name: 'Painter', icon: '🎨', rate: 'NPR 1,200' },
            ].map((s) => (
              <div key={s.name} onClick={() => router.push('/services')}
                style={{flexShrink: 0, ...card, padding: '16px 14px', cursor: 'pointer', textAlign: 'center', minWidth: '96px'}}>
                <div style={{fontSize: '28px', marginBottom: '8px'}}>{s.icon}</div>
                <p style={{...DS.font.caption, color: DS.colors.text1, fontWeight: 700, marginBottom: '4px', textTransform: 'none', letterSpacing: 0}}>{s.name}</p>
                <p style={{fontSize: '11px', fontWeight: 700, color: DS.colors.primary}}>{s.rate}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FOR PROFESSIONALS ── */}
        <div style={{...card, background: DS.gradient.darkDeep, borderColor: 'transparent', padding: '22px', position: 'relative', overflow: 'hidden', boxShadow: DS.shadow.dark}}>
          <div style={{position: 'absolute', top: '-30px', right: '-30px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(220,20,60,0.15)', pointerEvents: 'none'}}/>
          <p style={{...DS.font.label, color: 'rgba(220,20,60,0.7)', marginBottom: '8px', position: 'relative', zIndex: 1}}>For Professionals</p>
          <p style={{...DS.font.h3, color: 'white', lineHeight: 1.4, marginBottom: '16px', position: 'relative', zIndex: 1}}>Earn NPR 40,000+ a month on your own terms.</p>
          <div onClick={() => router.push('/join-professional')}
            style={{display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'white', borderRadius: DS.radius.pill, padding: '10px 20px', position: 'relative', zIndex: 1, cursor: 'pointer'}}>
            <span style={{...DS.font.caption, color: DS.colors.primary, fontWeight: 800}}>Join Free</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={DS.colors.primary} strokeWidth="3" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <BottomNav />
    </div>
  )
}
