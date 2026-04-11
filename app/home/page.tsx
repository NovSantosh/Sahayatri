'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BottomNav from '../components/BottomNav'
import { DS } from '../design-system'
import InlineSearch from '../components/InlineSearch'
import {
  BellIcon, SearchIcon, HeartIcon, FamilyIcon, WalletIcon,
  CalendarIcon, ClockIcon, FestivalIcon, SparkleIcon, LocationIcon,
  ArrowLeftIcon, MicIcon, CameraIcon, StarIcon, SahayatriLogo
} from '../components/Icons'

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
          <div style={{width: '48px', height: '48px', borderRadius: '50%', background: DS.gradient.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: DS.shadow.primary, animation: 'breathe 2s ease infinite'}}>
            <SahayatriLogo size={28} color="white"/>
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
  const greetingNepali = hour < 12 ? 'शुभ प्रभात' : hour < 17 ? 'नमस्ते' : 'शुभ सन्ध्या'

  const now = new Date()
  const kathmandu = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }))
  const ktmHour = kathmandu.getHours()
  const goodTimeToCall = ktmHour >= 7 && ktmHour < 22

  const FESTIVALS = [
    { name: 'Dashain', date: new Date('2025-10-02') },
    { name: 'Tihar', date: new Date('2025-10-20') },
    { name: 'Holi', date: new Date('2026-03-14') },
    { name: 'Maghe Sankranti', date: new Date('2026-01-14') },
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

  const card = { background: DS.colors.cardBg, borderRadius: DS.radius.card, border: `1px solid ${DS.colors.borderStrong}`, boxShadow: DS.shadow.card }

  const services = [
    { name: 'Electrician', rate: 'NPR 800', color: '#F59E0B' },
    { name: 'Plumber', rate: 'NPR 700', color: '#2563EB' },
    { name: 'Cleaner', rate: 'NPR 600', color: '#059669' },
    { name: 'Carpenter', rate: 'NPR 900', color: '#92400E' },
    { name: 'Painter', rate: 'NPR 1,200', color: '#7C3AED' },
  ]

  const serviceIcons: any = {
    Electrician: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    ),
    Plumber: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
    ),
    Cleaner: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    ),
    Carpenter: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#92400E" strokeWidth="1.8" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/><line x1="18" y1="4" x2="6" y2="16"/><rect x="4" y="18" width="4" height="4" rx="1"/></svg>
    ),
    Painter: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round"><path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z"/><path d="M12 11V3"/><path d="M8 7l4-4 4 4"/></svg>
    ),
  }

  return (
    <div style={{minHeight: '100vh', background: DS.colors.pageBg, fontFamily: 'Inter, -apple-system, sans-serif', paddingBottom: '100px'}}>

      {/* Header */}
      <div style={{background: DS.colors.cardBg, padding: '52px 20px 14px', borderBottom: `1px solid ${DS.colors.border}`, position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 12px rgba(0,0,0,0.04)'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px'}}>
          <div>
            <p style={{...DS.font.label, color: DS.colors.text3, marginBottom: '4px'}}>{greetingNepali} 🙏</p>
            <h1 style={{...DS.font.h2, color: DS.colors.text1}}>{greeting}</h1>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <Link href="/notifications" style={{width: '42px', height: '42px', borderRadius: DS.radius.icon, border: `1px solid ${DS.colors.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', textDecoration: 'none', background: DS.colors.cardBg}}>
              <BellIcon size={18} color={DS.colors.text2} strokeWidth={1.8}/>
              <div style={{position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', borderRadius: '50%', background: DS.colors.primary, border: `2px solid ${DS.colors.cardBg}`}}/>
            </Link>
            <Link href="/profile" style={{width: '42px', height: '42px', borderRadius: '50%', background: DS.gradient.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '14px', textDecoration: 'none', boxShadow: DS.shadow.primary}}>
              {initials}
            </Link>
          </div>
        </div>
        <InlineSearch />
      </div>

      <div style={{padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '20px'}}>

        {/* Live Stats */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px'}}>
          {[
            {
              Icon: FamilyIcon,
              label: familyOnline > 0 ? `${familyOnline} Online` : 'Family',
              sub: familyOnline > 0 ? 'in Family Room' : 'Open room',
              path: '/family',
              color: familyOnline > 0 ? DS.colors.success : DS.colors.info,
              bg: familyOnline > 0 ? DS.colors.successBg : DS.colors.infoBg,
            },
            {
              Icon: CalendarIcon,
              label: pendingBookings > 0 ? `${pendingBookings} Pending` : 'Bookings',
              sub: pendingBookings > 0 ? 'payment due' : `${bookings.length} total`,
              path: '/bookings',
              color: pendingBookings > 0 ? DS.colors.warning : DS.colors.info,
              bg: pendingBookings > 0 ? DS.colors.warningBg : DS.colors.infoBg,
            },
            {
              Icon: FestivalIcon,
              label: nextFestival?.name || 'Festivals',
              sub: nextFestival ? `${nextFestival.days}d away` : 'Coming soon',
              path: '/family',
              color: DS.colors.primary,
              bg: DS.colors.primaryLight,
            },
          ].map((item, i) => (
            <div key={i} onClick={() => router.push(item.path)}
              style={{...card, padding: '16px 10px', cursor: 'pointer', textAlign: 'center'}}>
              <div style={{width: '40px', height: '40px', borderRadius: '12px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px'}}>
                <item.Icon size={20} color={item.color} strokeWidth={1.8}/>
              </div>
              <p style={{fontSize: '12px', fontWeight: 800, color: item.color, marginBottom: '3px'}}>{item.label}</p>
              <p style={{fontSize: '10px', color: DS.colors.text3, fontWeight: 500, lineHeight: 1.3}}>{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Sathi AI */}
        <Link href="/sathi" style={{textDecoration: 'none', borderRadius: DS.radius.card, overflow: 'hidden', background: DS.gradient.darkDeep, display: 'block', boxShadow: DS.shadow.dark, position: 'relative'}}>
          <div style={{position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,20,60,0.3), transparent 70%)', filter: 'blur(20px)', pointerEvents: 'none'}}/>
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
              <MicIcon size={13} color="white" strokeWidth={2}/>
              <span style={{...DS.font.caption, color: 'white', fontWeight: 700}}>Open Sathi</span>
            </div>
          </div>
        </Link>

        {/* Kathmandu Clock */}
        <div style={{...card, padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '14px'}}>
            <div style={{width: '48px', height: '48px', borderRadius: DS.radius.icon, background: DS.colors.primaryLight, border: `1px solid ${DS.colors.primaryBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <ClockIcon size={22} color={DS.colors.primary} strokeWidth={1.8}/>
            </div>
            <div>
              <p style={{...DS.font.caption, color: DS.colors.text3, marginBottom: '4px'}}>Right now in Kathmandu</p>
              <p style={{fontSize: '22px', fontWeight: 800, color: DS.colors.text1, letterSpacing: '-1px'}}>
                {kathmandu.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
              </p>
            </div>
          </div>
          <div style={{textAlign: 'right'}}>
            <p style={{...DS.font.caption, color: DS.colors.text3, marginBottom: '6px'}}>
              {ktmHour < 6 ? 'Late night' : ktmHour < 12 ? 'Morning' : ktmHour < 17 ? 'Afternoon' : ktmHour < 21 ? 'Evening' : 'Night'}
            </p>
            <div style={{display: 'inline-flex', alignItems: 'center', gap: '5px', background: goodTimeToCall ? DS.colors.successBg : DS.colors.warningBg, borderRadius: DS.radius.pill, padding: '4px 10px'}}>
              <div style={{width: '5px', height: '5px', borderRadius: '50%', background: goodTimeToCall ? DS.colors.success : DS.colors.warning}}/>
              <p style={{fontSize: '11px', fontWeight: 700, color: goodTimeToCall ? DS.colors.success : DS.colors.warning}}>
                {goodTimeToCall ? 'Good time to call' : 'May be asleep'}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Moments */}
        {posts.length > 0 && (
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px'}}>
              <h3 style={{...DS.font.h3, color: DS.colors.text1}}>Recent Moments</h3>
              <Link href="/memory" style={{...DS.font.caption, color: DS.colors.primary, textDecoration: 'none', fontWeight: 700}}>See all</Link>
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
                      <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                          <HeartIcon size={13} color={DS.colors.primary} strokeWidth={2}/>
                          <span style={{fontSize: '12px', color: DS.colors.text3, fontWeight: 500}}>{post.likes || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {post.images?.[0] && <img src={post.images[0]} alt="moment" style={{width: '100%', maxHeight: '200px', objectFit: 'cover', display: 'block'}}/>}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <h3 style={{...DS.font.h3, color: DS.colors.text1, marginBottom: '14px'}}>Quick Actions</h3>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
            {[
              { Icon: CameraIcon, label: 'Share a Moment', sub: 'Post to Memory', path: '/memory', color: DS.colors.primary, bg: DS.colors.primaryLight },
              { Icon: FamilyIcon, label: 'Family Room', sub: 'Stay connected', path: '/family', color: DS.colors.info, bg: DS.colors.infoBg },
              { Icon: WalletIcon, label: 'Payments', sub: 'eSewa · Khalti', path: '/wallet', color: DS.colors.success, bg: DS.colors.successBg },
              { Icon: SearchIcon, label: 'Search', sub: 'People & moments', path: '/search', color: '#7C3AED', bg: '#F5F3FF' },
            ].map((item) => (
              <div key={item.path} onClick={() => router.push(item.path)}
                style={{...card, padding: '18px 16px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <div style={{width: '44px', height: '44px', borderRadius: DS.radius.icon, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <item.Icon size={22} color={item.color} strokeWidth={1.8}/>
                </div>
                <div>
                  <p style={{...DS.font.h4, color: DS.colors.text1, marginBottom: '3px'}}>{item.label}</p>
                  <p style={{fontSize: '11px', color: DS.colors.text3, fontWeight: 500}}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Care & Companions */}
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
              <div style={{display: 'flex', gap: '10px'}}>
                <button onClick={() => router.push('/join-professional')}
                  style={{padding: '11px 20px', background: DS.gradient.primary, border: 'none', borderRadius: DS.radius.button, color: 'white', ...DS.font.caption, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: DS.shadow.primary}}>
                  Join as Companion
                </button>
                <button onClick={() => router.push('/services')}
                  style={{padding: '11px 20px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: DS.radius.button, color: 'rgba(255,255,255,0.7)', ...DS.font.caption, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
                  Home Services
                </button>
              </div>
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
            {[
              { label: 'Elder Care', sub: 'Daily visits & company', color: DS.colors.primary,
                Icon: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={DS.colors.primary} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/><path d="M12 15v5M9 18h6"/></svg> },
              { label: 'Yoga & Wellness', sub: 'At-home sessions', color: '#7C3AED',
                Icon: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="5" r="2"/><path d="M12 7v8M8 10l4 2 4-2M8 17l4 2 4-2"/></svg> },
              { label: 'Cooking', sub: 'Nepali home cooking', color: DS.colors.warning,
                Icon: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={DS.colors.warning} strokeWidth="1.8" strokeLinecap="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg> },
              { label: 'Child Care', sub: 'Learning and care', color: DS.colors.info,
                Icon: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={DS.colors.info} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="7" r="4"/><path d="M8 14s-4 0-4 4v1h16v-1c0-4-4-4-4-4"/><path d="M9 19l3 3 3-3"/></svg> },
            ].map((s, i) => (
              <div key={i} style={{...card, padding: '18px 16px'}}>
                <div style={{width: '44px', height: '44px', borderRadius: DS.radius.icon, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px'}}>
                  <s.Icon/>
                </div>
                <p style={{...DS.font.h4, color: DS.colors.text1, marginBottom: '4px'}}>{s.label}</p>
                <p style={{fontSize: '11px', color: DS.colors.text3, marginBottom: '10px'}}>{s.sub}</p>
                <div style={{display: 'inline-flex', alignItems: 'center', gap: '4px', background: `${s.color}12`, borderRadius: DS.radius.pill, padding: '3px 10px'}}>
                  <div style={{width: '4px', height: '4px', borderRadius: '50%', background: s.color}}/>
                  <p style={{fontSize: '10px', fontWeight: 700, color: s.color}}>Launching soon</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Home Services */}
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px'}}>
            <h3 style={{...DS.font.h3, color: DS.colors.text1}}>Home Services</h3>
            <Link href="/services" style={{...DS.font.caption, color: DS.colors.primary, textDecoration: 'none', fontWeight: 700}}>View all</Link>
          </div>
          <div style={{display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none'}}>
            {services.map((s) => (
              <div key={s.name} onClick={() => router.push('/services')}
                style={{flexShrink: 0, ...card, padding: '16px 14px', cursor: 'pointer', textAlign: 'center', minWidth: '96px'}}>
                <div style={{width: '44px', height: '44px', borderRadius: DS.radius.icon, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px'}}>
                  {serviceIcons[s.name]}
                </div>
                <p style={{fontSize: '12px', fontWeight: 700, color: DS.colors.text1, marginBottom: '4px'}}>{s.name}</p>
                <p style={{fontSize: '11px', fontWeight: 700, color: s.color}}>{s.rate}</p>
              </div>
            ))}
          </div>
        </div>

        {/* For Professionals */}
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
        @keyframes breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <BottomNav />
    </div>
  )
}
