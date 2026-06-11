'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import SOSButton from '../components/SOSButton'
import InlineSearch from '../components/InlineSearch'
import { useTheme } from '../context/ThemeContext'
import * as ds from '../design-system'
import {
  HeartIcon, FamilyIcon, CalendarIcon, ClockIcon, FestivalIcon,
  MicIcon, CameraIcon, SahayatriLogo, MoonIcon
} from '../components/Icons'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const { t, theme } = useTheme()
  const router = useRouter()
  const [bookings, setBookings] = useState<any[]>([])
  const [family, setFamily] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [pressed, setPressed] = useState<string | null>(null)
  const [mayaSent, setMayaSent] = useState(false)
  const [showMayaAnim, setShowMayaAnim] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (status === 'authenticated') fetchAll()
  }, [status])

  const fetchAll = async () => {
    try {
      const [bRes, fRes] = await Promise.all([
        fetch(`/api/bookings?email=${session?.user?.email}`),
        fetch(`/api/family?email=${session?.user?.email}`),
      ])
      const [b, f] = await Promise.all([bRes.json(), fRes.json()])
      setBookings(b.bookings || [])
      setFamily(f.family)
    } catch (e) {}
    setLoading(false)
  }

  if (status === 'loading' || loading) {
    return (
      <div style={{ minHeight: '100dvh', background: t.pageBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: ds.brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 24px rgba(220,20,60,0.28)', animation: 'breathe 2s ease infinite' }}>
          <SahayatriLogo size={30} color="white"/>
        </div>
        <style>{`@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}`}</style>
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

  const press = (id: string) => setPressed(id)
  const release = () => setPressed(null)
  const sendMaya = () => { setMayaSent(true); setShowMayaAnim(true); setTimeout(() => setShowMayaAnim(false), 2200) }

  // Neutral icon color — the key to killing the rainbow
  const ink = t.text2
  const muted = t.text3
  const greeting = hour < 5 ? 'Late night' : hour < 12 ? 'शुभ प्रभात' : hour < 17 ? 'नमस्ते' : hour < 21 ? 'शुभ सन्ध्या' : 'Good night'

  const card: React.CSSProperties = {
    background: t.cardBg, borderRadius: '24px', border: `1px solid ${t.border}`, boxShadow: t.shadow,
  }
  const tile = (id: string): React.CSSProperties => ({
    ...card, padding: '18px',
    transform: pressed === id ? 'scale(0.97)' : 'scale(1)', transition: 'transform 0.15s ease', cursor: 'pointer',
  })
  const pressHandlers = (id: string, path: string) => ({
    onClick: () => router.push(path),
    onMouseDown: () => press(id), onMouseUp: release,
    onTouchStart: () => press(id), onTouchEnd: () => { release(); router.push(path) },
  })

  return (
    <div style={{ minHeight: '100dvh', background: t.pageBg, fontFamily: 'Inter, -apple-system, sans-serif', paddingBottom: '40px' }}>

      {showMayaAnim && (
        <div style={{ position: 'fixed', inset: 0, background: `linear-gradient(135deg, ${ds.brand.primaryDark}, ${ds.brand.primary})`, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ animation: 'heartPulse 0.7s ease infinite' }}><HeartIcon size={76} color="white" filled strokeWidth={0}/></div>
          <h2 style={{ ...ds.type.h1, color: 'white', marginTop: '20px' }}>माया पठाइयो!</h2>
          <p style={{ ...ds.type.body, color: 'rgba(255,255,255,0.7)' }}>Love sent to your family</p>
        </div>
      )}

      {/* HEADER */}
      <div style={{ background: t.headerBg, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: '52px 16px 14px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <p style={{ ...ds.type.caption, color: muted }}>{greeting}</p>
            <h1 style={{ ...ds.type.h1, color: t.text1, marginTop: '2px' }}>{firstName}</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link href="/profile" style={{ width: '40px', height: '40px', borderRadius: '50%', background: `linear-gradient(135deg, ${ds.brand.primary}, ${ds.brand.primaryDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '13px', textDecoration: 'none', boxShadow: '0 4px 12px rgba(220,20,60,0.3)' }}>{initials}</Link>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}><InlineSearch/></div>
          <SOSButton/>
        </div>
      </div>

      <div style={{ padding: '18px 16px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* FAMILY HERO */}
        <div style={{ borderRadius: '24px', overflow: 'hidden', background: `linear-gradient(140deg, ${ds.brand.primary}, ${ds.brand.primaryDark})`, boxShadow: '0 12px 32px rgba(220,20,60,0.25)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-40px', right: '-30px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}/>
          <div style={{ padding: '22px', position: 'relative', zIndex: 1 }}>
            {family?.members?.length > 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ display: 'flex' }}>
                  {family.members.slice(0, 5).map((m: any, i: number) => (
                    <div key={i} style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.18)', border: '2px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: 700, marginLeft: i > 0 ? '-7px' : '0' }}>
                      {m.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                  ))}
                </div>
                {familyOnline > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.15)', borderRadius: '20px', padding: '3px 10px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#fff' }}/>
                    <span style={{ ...ds.type.caption, color: 'white', fontWeight: 600 }}>{familyOnline} online</span>
                  </div>
                )}
              </div>
            ) : null}
            <h2 style={{ ...ds.type.h2, color: 'white', marginBottom: '5px' }}>{family ? family.name : 'Start your Family Room'}</h2>
            <p style={{ ...ds.type.body, color: 'rgba(255,255,255,0.6)', marginBottom: '18px' }}>
              {family ? (familyOnline > 0 ? `${familyOnline} active right now.` : 'Your family room is waiting.') : 'Create a room and invite your loved ones.'}
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => router.push('/family')} style={{ flex: 1, padding: '11px 16px', background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '14px', color: 'white', ...ds.type.caption, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Open Family Room</button>
              <button onClick={sendMaya} style={{ width: '46px', height: '44px', background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                <HeartIcon size={20} color="white" filled strokeWidth={0}/>
              </button>
            </div>
          </div>
        </div>

        {/* BENTO STAT ROW — neutral icons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          {[
            { id: 's1', Icon: FamilyIcon, big: familyOnline > 0 ? `${familyOnline}` : '—', label: 'Family online', path: '/family' },
            { id: 's2', Icon: CalendarIcon, big: pendingBookings > 0 ? `${pendingBookings}` : `${bookings.length}`, label: pendingBookings > 0 ? 'To pay' : 'Bookings', path: '/bookings' },
            { id: 's3', Icon: FestivalIcon, big: nextFestival ? `${nextFestival.days}` : '—', label: nextFestival ? `${nextFestival.name}` : 'Festivals', path: '/family' },
          ].map((s) => (
            <div key={s.id} {...pressHandlers(s.id, s.path)} style={{ ...tile(s.id), padding: '14px 12px' }}>
              <s.Icon size={18} color={muted} strokeWidth={1.8}/>
              <p style={{ ...ds.type.h2, color: t.text1, marginTop: '10px' }}>{s.big}</p>
              <p style={{ ...ds.type.caption, color: muted, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* KATHMANDU TIME STRIP */}
        <div style={{ ...card, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ClockIcon size={18} color={muted} strokeWidth={2}/>
          <div style={{ flex: 1 }}>
            <p style={{ ...ds.type.caption, color: muted }}>Kathmandu now</p>
            <p style={{ ...ds.type.h3, color: t.text1, marginTop: '2px' }}>{ktmTimeStr}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: goodTimeToCall ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', borderRadius: '20px', padding: '6px 12px' }}>
            {goodTimeToCall
              ? <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: ds.brand.success }}/>
              : <MoonIcon size={13} color={ds.brand.warning} strokeWidth={2}/>}
            <span style={{ ...ds.type.caption, fontWeight: 700, color: goodTimeToCall ? '#0F6E56' : '#854F0B' }}>{goodTimeToCall ? 'Good to call' : 'May be asleep'}</span>
          </div>
        </div>

        {/* SATHI */}
        <div {...pressHandlers('sathi', '/sathi')} style={{ ...card, padding: '18px', display: 'flex', alignItems: 'center', gap: '14px', transform: pressed === 'sathi' ? 'scale(0.98)' : 'scale(1)', transition: 'transform 0.15s ease', cursor: 'pointer' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '16px', background: `linear-gradient(135deg, ${ds.brand.primary}, ${ds.brand.primaryDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 14px rgba(220,20,60,0.3)' }}>
            <MicIcon size={22} color="white" strokeWidth={2}/>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ ...ds.type.h3, color: t.text1 }}>Talk to Sathi</p>
            <p style={{ ...ds.type.caption, color: muted, marginTop: '2px' }}>Your AI companion · Nepali & English</p>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={muted} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
        </div>

        {/* QUICK ACTIONS — neutral icons */}
        <p style={{ ...ds.type.bodyBold, color: t.text1, marginTop: '4px' }}>Quick actions</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            { id: 'qa0', Icon: HeartIcon, label: 'Book Care', sub: 'For family in Nepal', path: '/care' },
            { id: 'qa1', Icon: FamilyIcon, label: 'Family Room', sub: 'Stay connected', path: '/family' },
            { id: 'qa2', Icon: CalendarIcon, label: 'My Bookings', sub: 'View & pay', path: '/bookings' },
            { id: 'qa3', Icon: CameraIcon, label: 'Share a Moment', sub: 'Post to Memory', path: '/memory' },
          ].map((item) => (
            <div key={item.id} {...pressHandlers(item.id, item.path)} style={tile(item.id)}>
              <div style={{ width: '42px', height: '42px', borderRadius: '13px', background: t.inputBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <item.Icon size={20} color={ink} strokeWidth={1.8}/>
              </div>
              <p style={{ ...ds.type.bodyBold, color: t.text1 }}>{item.label}</p>
              <p style={{ ...ds.type.caption, color: muted, marginTop: '2px' }}>{item.sub}</p>
            </div>
          ))}
        </div>

        {/* EXPLORE SERVICES — merged single section, neutral icons */}
        <p style={{ ...ds.type.bodyBold, color: t.text1, marginTop: '4px' }}>Explore services</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            { id: 'e1', label: 'Elder Care', sub: 'Daily visits', path: '/care',
              Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="7" r="4"/><path d="M5 20a7 7 0 0 1 14 0"/></svg> },
            { id: 'e2', label: 'Home Services', sub: 'Electrician, plumber…', path: '/services',
              Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> },
            { id: 'e3', label: 'Cooking', sub: 'Nepali home meals', path: '/care',
              Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> },
            { id: 'e4', label: 'Earn with us', sub: 'Become a companion', path: '/join-professional',
              Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg> },
          ].map((s) => (
            <div key={s.id} {...pressHandlers(s.id, s.path)} style={tile(s.id)}>
              <div style={{ width: '42px', height: '42px', borderRadius: '13px', background: t.inputBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <s.Icon/>
              </div>
              <p style={{ ...ds.type.bodyBold, color: t.text1 }}>{s.label}</p>
              <p style={{ ...ds.type.caption, color: muted, marginTop: '2px' }}>{s.sub}</p>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
        @keyframes heartPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.12); } }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}
