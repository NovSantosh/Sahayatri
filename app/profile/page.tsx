'use client'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTheme } from '../context/ThemeContext'
import * as ds from '../design-system'
import ModeSwitch from '../components/ModeSwitch'
import { SahayatriLogo, EditIcon, CheckIcon, CameraIcon } from '../components/Icons'

// Neutral line-icon set (replaces emoji). Each takes a color.
const I = {
  user: (c: string) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>,
  lock: (c: string) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>,
  phone: (c: string) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><rect x="7" y="2" width="10" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/></svg>,
  mail: (c: string) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>,
  home: (c: string) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  elder: (c: string) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="7" r="4"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>,
  report: (c: string) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><rect x="5" y="3" width="14" height="18" rx="2"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>,
  calendar: (c: string) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/></svg>,
  moon: (c: string) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>,
  globe: (c: string) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>,
  pin: (c: string) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>,
  card: (c: string) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
  bolt: (c: string) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  doc: (c: string) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  book: (c: string) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  sparkle: (c: string) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/></svg>,
  star: (c: string) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><polygon points="12 2 15 9 22 9.3 17 14 18.5 21 12 17.3 5.5 21 7 14 2 9.3 9 9"/></svg>,
  share: (c: string) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/></svg>,
  shield: (c: string) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M12 2l8 3v6c0 5-3.5 8-8 11-4.5-3-8-6-8-11V5z"/></svg>,
  scale: (c: string) => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M12 3v18M5 7h14M5 7l-3 6h6zM19 7l-3 6h6z"/></svg>,
}

export default function Profile() {
  const { data: session } = useSession()
  const { t, theme, toggleTheme } = useTheme()
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false)
  const [language, setLanguage] = useState<'en' | 'np'>('en')
  const [showLanguagePicker, setShowLanguagePicker] = useState(false)
  const [showNavSide, setShowNavSide] = useState(false)
  const isDark = theme === 'dark'
  const muted = t.text3

  const SECTIONS = [
    { title: 'Your activity', items: [
      { I: I.calendar, label: 'My Bookings', sub: 'View, pay & manage', path: '/bookings' },
      { I: I.report, label: 'Care Reports', sub: 'Daily visit reports from companions', path: '/care-reports' },
      { I: I.sparkle, label: 'My Moments', sub: 'Photos you have shared', path: '/memory' },
    ]},
    { title: 'Settings', items: [
      { I: I.moon, label: 'Appearance', sub: isDark ? 'Dark mode' : 'Light mode', action: 'theme' },
      { I: I.globe, label: 'Language', sub: 'English · नेपाली', action: 'language' },
      { I: I.pin, label: 'Navigation Side', sub: 'Right or left handed', action: 'navside' },
    ]},
    { title: 'Earn with Sahayatri', items: [
      { I: I.bolt, label: 'Become a Companion', sub: 'Start earning from your skills', action: 'companion' },
      { I: I.doc, label: 'Legal Agreement', sub: 'View your signed agreement', path: '/companion/agreement' },
    ]},
    { title: 'Support & About', items: [
      { I: I.book, label: 'About Sahayatri', sub: 'Our story and mission', path: '/about' },
      { I: I.share, label: 'Share App', sub: 'Invite family and friends', action: 'share' },
      { I: I.star, label: 'Rate the App', sub: 'Help us improve', action: 'rate' },
      { I: I.sparkle, label: 'Replay Introduction', sub: 'See the onboarding tour again', action: 'onboarding' },
      { I: I.shield, label: 'Privacy & Terms', sub: 'How we protect your data', path: '/about' },
    ]},
  ]

  useEffect(() => {
    if (session?.user?.email) fetchProfile()
    else setLoading(false)
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

  const handleAction = (action: string) => {
    switch (action) {
      case 'theme': toggleTheme(); break
      case 'language': setShowLanguagePicker(true); break
      case 'navside': setShowNavSide(true); break
      case 'companion': router.push('/companion/setup'); break
      case 'rate': window.open('https://sahayatri-eight.vercel.app', '_blank'); break
      case 'onboarding':
        if (typeof window !== 'undefined') localStorage.removeItem('onboardingSeen')
        router.push('/onboarding'); break
      case 'share':
        if (navigator.share) navigator.share({ title: 'Sahayatri', text: 'Care for your family from anywhere', url: 'https://sahayatri-eight.vercel.app' })
        break
    }
  }

  const card: React.CSSProperties = { background: t.cardBg, borderRadius: '24px', border: `1px solid ${t.border}`, boxShadow: t.shadow, overflow: 'hidden' }

  if (loading) return (
    <div style={{ minHeight: '100dvh', background: t.pageBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '40px', height: '40px', border: `3px solid ${t.border}`, borderTop: `3px solid ${ds.brand.primary}`, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  const name = profile?.name || session?.user?.name || 'User'
  const email = profile?.email || session?.user?.email || ''
  const bio = profile?.bio || 'Sahayatri member'
  const location = profile?.location || ''
  const joinDate = profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : 'Recently'

  const sheet: React.CSSProperties = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '24px', backdropFilter: 'blur(8px)' }
  const sheetCard: React.CSSProperties = { background: t.cardBg, borderRadius: '24px', padding: '26px 22px', width: '100%', maxWidth: '380px', border: `1px solid ${t.border}` }

  return (
    <div style={{ minHeight: '100dvh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '40px' }}>

      {showSignOutConfirm && (
        <div style={sheet}>
          <div style={sheetCard}>
            <h3 style={{ ...ds.type.h3, color: t.text1, textAlign: 'center', marginBottom: '8px' }}>Sign out?</h3>
            <p style={{ ...ds.type.body, color: muted, textAlign: 'center', marginBottom: '22px' }}>You will need to sign in again to access your account.</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowSignOutConfirm(false)} style={{ flex: 1, padding: '14px', background: t.inputBg, border: 'none', borderRadius: '14px', ...ds.type.bodyBold, cursor: 'pointer', fontFamily: 'Inter, sans-serif', color: t.text2 }}>Cancel</button>
              <button onClick={() => signOut({ callbackUrl: '/' })} style={{ flex: 1, padding: '14px', background: `linear-gradient(135deg, ${ds.brand.primary}, ${ds.brand.primaryDark})`, border: 'none', borderRadius: '14px', ...ds.type.bodyBold, cursor: 'pointer', fontFamily: 'Inter, sans-serif', color: 'white', boxShadow: '0 4px 16px rgba(220,20,60,0.3)' }}>Sign Out</button>
            </div>
          </div>
        </div>
      )}

      {showLanguagePicker && (
        <div style={sheet}>
          <div style={sheetCard}>
            <h3 style={{ ...ds.type.h3, color: t.text1, marginBottom: '18px' }}>Choose Language</h3>
            {[{ id: 'en', label: 'English', sub: 'App in English' }, { id: 'np', label: 'नेपाली', sub: 'App in Nepali' }].map(lang => (
              <div key={lang.id} onClick={() => { setLanguage(lang.id as any); setShowLanguagePicker(false) }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: '14px', background: language === lang.id ? ds.brand.primaryLight : t.inputBg, border: `1px solid ${language === lang.id ? ds.brand.primaryBorder : t.border}`, marginBottom: '8px', cursor: 'pointer' }}>
                <div>
                  <p style={{ ...ds.type.bodyBold, color: language === lang.id ? ds.brand.primary : t.text1 }}>{lang.label}</p>
                  <p style={{ ...ds.type.caption, color: muted }}>{lang.sub}</p>
                </div>
                {language === lang.id && <CheckIcon size={18} color={ds.brand.primary} strokeWidth={2.5}/>}
              </div>
            ))}
            <button onClick={() => setShowLanguagePicker(false)} style={{ width: '100%', padding: '14px', background: t.inputBg, border: 'none', borderRadius: '14px', ...ds.type.bodyBold, cursor: 'pointer', fontFamily: 'Inter, sans-serif', color: t.text2, marginTop: '8px' }}>Cancel</button>
          </div>
        </div>
      )}

      {showNavSide && (
        <div style={sheet}>
          <div style={sheetCard}>
            <h3 style={{ ...ds.type.h3, color: t.text1, marginBottom: '6px' }}>Navigation Side</h3>
            <p style={{ ...ds.type.body, color: muted, marginBottom: '18px' }}>Choose which side the gesture navigation appears on.</p>
            {[{ id: 'right', label: 'Right side', sub: 'Default — for right-handed users' }, { id: 'left', label: 'Left side', sub: 'For left-handed users' }].map(opt => (
              <div key={opt.id} onClick={() => { localStorage.setItem('navSide', opt.id); setShowNavSide(false); window.location.reload() }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: '14px', background: t.inputBg, border: `1px solid ${t.border}`, marginBottom: '8px', cursor: 'pointer' }}>
                <div>
                  <p style={{ ...ds.type.bodyBold, color: t.text1 }}>{opt.label}</p>
                  <p style={{ ...ds.type.caption, color: muted }}>{opt.sub}</p>
                </div>
              </div>
            ))}
            <button onClick={() => setShowNavSide(false)} style={{ width: '100%', padding: '14px', background: t.inputBg, border: 'none', borderRadius: '14px', ...ds.type.bodyBold, cursor: 'pointer', fontFamily: 'Inter, sans-serif', color: t.text2, marginTop: '8px' }}>Cancel</button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div style={{ background: t.headerBg, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: '52px 16px 16px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ ...ds.type.h1, color: t.text1 }}>Profile</h1>
          <button onClick={() => router.push('/edit-profile')} style={{ width: '40px', height: '40px', borderRadius: '12px', background: t.cardBg, border: `1px solid ${t.border}`, boxShadow: t.shadow, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <EditIcon size={16} color={t.text2} strokeWidth={2}/>
          </button>
        </div>
      </div>

      <div style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* HERO */}
        <div style={{ ...card, padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: bio ? '16px' : '0' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              {profile?.avatar
                ? <img src={profile.avatar} style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover' }} alt={name}/>
                : <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: `linear-gradient(135deg, ${ds.brand.primary}, ${ds.brand.primaryDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '24px', boxShadow: '0 4px 16px rgba(220,20,60,0.3)' }}>{initials(name)}</div>}
              <button onClick={() => router.push('/edit-profile')} style={{ position: 'absolute', bottom: 0, right: 0, width: '24px', height: '24px', borderRadius: '50%', background: ds.brand.primary, border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <CameraIcon size={10} color="white" strokeWidth={2}/>
              </button>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{ ...ds.type.h2, color: t.text1, marginBottom: '3px' }}>{name}</h2>
              <p style={{ ...ds.type.caption, color: muted }}>{email}</p>
              {location && <p style={{ ...ds.type.caption, color: muted, marginTop: '3px' }}>{location}</p>}
            </div>
          </div>
          {bio && <p style={{ ...ds.type.body, color: t.text2, paddingTop: '16px', borderTop: `1px solid ${t.border}` }}>{bio}</p>}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '16px' }}>
            {[{ val: posts.length.toString(), label: 'Moments shared' }, { val: joinDate, label: 'Member since' }].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '12px 6px', background: t.inputBg, borderRadius: '14px' }}>
                <p style={{ ...ds.type.h3, color: t.text1 }}>{s.val}</p>
                <p style={{ ...ds.type.caption, color: muted, marginTop: '2px' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* COMPANION MODE */}
        <div style={{ ...card, padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: t.inputBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {I.bolt(t.text2)}
              </div>
              <div>
                <p style={{ ...ds.type.bodyBold, color: t.text1 }}>Companion Mode</p>
                <p style={{ ...ds.type.caption, color: muted }}>Switch between family and companion</p>
              </div>
            </div>
            <ModeSwitch/>
          </div>
        </div>

        {/* SECTIONS */}
        {SECTIONS.map((section, si) => (
          <div key={si}>
            <p style={{ ...ds.type.label, color: muted, marginBottom: '8px', paddingLeft: '4px' }}>{section.title}</p>
            <div style={card}>
              {section.items.map((item: any, ii: number) => (
                <div key={ii} onClick={() => item.path ? router.push(item.path) : item.action ? handleAction(item.action) : null}
                  className="pressable"
                  style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderBottom: ii < section.items.length - 1 ? `1px solid ${t.border}` : 'none', cursor: 'pointer' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: t.inputBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {item.I(t.text2)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ ...ds.type.bodyBold, color: t.text1 }}>{item.label}</p>
                    <p style={{ ...ds.type.caption, color: muted, marginTop: '2px' }}>{item.sub}</p>
                  </div>
                  {item.action === 'theme' ? (
                    <div style={{ width: '44px', height: '24px', borderRadius: '12px', background: isDark ? ds.brand.primary : t.inputBg, border: `1px solid ${isDark ? ds.brand.primary : t.border}`, position: 'relative', transition: 'all 0.3s ease', flexShrink: 0 }}>
                      <div style={{ position: 'absolute', top: '2px', left: isDark ? '22px' : '2px', width: '18px', height: '18px', borderRadius: '50%', background: 'white', transition: 'left 0.3s ease', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }}/>
                    </div>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={muted} strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}><path d="M9 18l6-6-6-6"/></svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* VERSION */}
        <div style={{ textAlign: 'center', padding: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '6px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '8px', background: `linear-gradient(135deg, ${ds.brand.primary}, ${ds.brand.primaryDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SahayatriLogo size={14} color="white"/>
            </div>
            <p style={{ ...ds.type.caption, fontWeight: 700, color: t.text2 }}>Sahayatri</p>
          </div>
          <p style={{ ...ds.type.caption, color: muted }}>Version 1.0.0 · Made for Nepal</p>
        </div>

        {/* SIGN OUT */}
        <button onClick={() => setShowSignOutConfirm(true)}
          style={{ width: '100%', padding: '16px', background: ds.brand.primaryLight, border: `1px solid ${ds.brand.primaryBorder}`, borderRadius: '16px', color: ds.brand.primary, ...ds.type.bodyBold, cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ds.brand.primary} strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
          Sign Out
        </button>
      </div>

      <style>{`.pressable:active{background:${t.inputBg}}`}</style>
    </div>
  )
}
