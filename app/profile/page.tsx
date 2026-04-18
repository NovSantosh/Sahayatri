'use client'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'
import ModeSwitch from '../components/ModeSwitch'
import ThemeToggle from '../components/ThemeToggle'
import { SahayatriLogo, EditIcon, BellIcon, CalendarIcon, WalletIcon, HeartIcon, SparkleIcon, CheckIcon, ArrowLeftIcon, CameraIcon, GlobeIcon } from '../components/Icons'

const SECTIONS = [
  {
    title: 'My Account',
    items: [
      { icon: '👤', label: 'Edit Profile', sub: 'Name, photo, bio, location', path: '/edit-profile' },
      { icon: '🔒', label: 'Password & Security', sub: 'Change password, 2FA', path: '/edit-profile' },
      { icon: '📱', label: 'Phone Number', sub: 'Update your contact number', path: '/edit-profile' },
      { icon: '📧', label: 'Email Address', sub: 'Change your email', path: '/edit-profile' },
    ]
  },
  {
    title: 'Family',
    items: [
      { icon: '🏠', label: 'Family Room', sub: 'Manage your family group', path: '/family' },
      { icon: '👵', label: 'Elder Care', sub: 'View and manage care bookings', path: '/care' },
      { icon: '📋', label: 'Care Reports', sub: 'Daily visit reports from companions', path: '/care-reports' },
      { icon: '📅', label: 'My Bookings', sub: 'View and manage bookings', path: '/bookings' },
    ]
  },
  {
    title: 'Preferences',
    items: [
      { icon: '🌙', label: 'Appearance', sub: 'Dark mode, light mode', action: 'theme' },

      { icon: '🌐', label: 'Language', sub: 'English · नेपाली', action: 'language' },
      { icon: '📍', label: 'Navigation Side', sub: 'Right hand or left hand', action: 'navside' },
    ]
  },
  {
    title: 'Payments',
    items: [
      { icon: '💳', label: 'Payment History', sub: 'eSewa · Khalti · Bank', path: '/wallet' },

    ]
  },
  {
    title: 'Companion',
    items: [
      { icon: '⚡', label: 'Switch to Companion Mode', sub: 'Start earning as a companion', action: 'companion' },
      { icon: '📄', label: 'Legal Agreement', sub: 'View your signed agreement', path: '/companion/agreement' },
    ]
  },
  {
    title: 'About',
    items: [
      { icon: '📖', label: 'About Sahayatri', sub: 'Our story and mission', path: '/about' },
      { icon: '⭐', label: 'Rate the App', sub: 'Help us improve', action: 'rate' },
      { icon: '🔗', label: 'Share App', sub: 'Invite your family and friends', action: 'share' },
      { icon: '📜', label: 'Privacy Policy', sub: 'How we protect your data', path: '/about' },
      { icon: '⚖️', label: 'Terms of Service', sub: 'Legal terms and conditions', path: '/about' },
    ]
  },
]

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
      case 'share':
        if (navigator.share) {
          navigator.share({ title: 'Sahayatri', text: 'Care for your family from anywhere', url: 'https://sahayatri-eight.vercel.app' })
        }
        break
    }
  }

  const card = {
    background: t.cardBg,
    borderRadius: '20px',
    border: `1px solid ${t.border}`,
    boxShadow: t.shadow,
    overflow: 'hidden' as const,
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: t.pageBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '40px', height: '40px', border: `3px solid ${t.border}`, borderTop: `3px solid ${brand.primary}`, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  const name = profile?.name || session?.user?.name || 'User'
  const email = profile?.email || session?.user?.email || ''
  const bio = profile?.bio || 'Sahayatri member'
  const location = profile?.location || ''
  const joinDate = profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : 'Recently'

  return (
    <div style={{ minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '40px', transition: 'background 0.3s ease' }}>

      {/* Sign out confirm */}
      {showSignOutConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '24px', backdropFilter: 'blur(8px)' }}>
          <div style={{ background: t.cardBg, borderRadius: '24px', padding: '28px 24px', width: '100%', maxWidth: '380px', border: `1px solid ${t.border}` }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: t.text1, textAlign: 'center', marginBottom: '8px' }}>Sign out?</h3>
            <p style={{ fontSize: '14px', color: t.text3, textAlign: 'center', marginBottom: '24px' }}>You will need to sign in again to access your account.</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowSignOutConfirm(false)}
                style={{ flex: 1, padding: '14px', background: t.inputBg, border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', color: t.text2 }}>
                Cancel
              </button>
              <button onClick={() => signOut({ callbackUrl: '/' })}
                style={{ flex: 1, padding: '14px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', color: 'white', boxShadow: '0 4px 16px rgba(220,20,60,0.3)' }}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Language picker */}
      {showLanguagePicker && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '24px', backdropFilter: 'blur(8px)' }}>
          <div style={{ background: t.cardBg, borderRadius: '24px', padding: '28px 24px', width: '100%', maxWidth: '380px', border: `1px solid ${t.border}` }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: t.text1, marginBottom: '20px' }}>Choose Language</h3>
            {[
              { id: 'en', label: 'English', sub: 'App in English' },
              { id: 'np', label: 'नेपाली', sub: 'App in Nepali' },
            ].map(lang => (
              <div key={lang.id} onClick={() => { setLanguage(lang.id as any); setShowLanguagePicker(false) }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: '14px', background: language === lang.id ? brand.primaryLight : t.inputBg, border: `1px solid ${language === lang.id ? brand.primaryBorder : t.border}`, marginBottom: '8px', cursor: 'pointer' }}>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: language === lang.id ? brand.primary : t.text1 }}>{lang.label}</p>
                  <p style={{ fontSize: '12px', color: t.text3 }}>{lang.sub}</p>
                </div>
                {language === lang.id && <CheckIcon size={18} color={brand.primary} strokeWidth={2.5}/>}
              </div>
            ))}
            <button onClick={() => setShowLanguagePicker(false)}
              style={{ width: '100%', padding: '14px', background: t.inputBg, border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', color: t.text2, marginTop: '8px' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Nav side picker */}
      {showNavSide && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '24px', backdropFilter: 'blur(8px)' }}>
          <div style={{ background: t.cardBg, borderRadius: '24px', padding: '28px 24px', width: '100%', maxWidth: '380px', border: `1px solid ${t.border}` }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: t.text1, marginBottom: '8px' }}>Navigation Side</h3>
            <p style={{ fontSize: '14px', color: t.text3, marginBottom: '20px' }}>Choose which side the gesture navigation appears on</p>
            {[
              { id: 'right', label: '👉 Right side', sub: 'Default — for right-handed users' },
              { id: 'left', label: '👈 Left side', sub: 'For left-handed users' },
            ].map(opt => (
              <div key={opt.id} onClick={() => { localStorage.setItem('navSide', opt.id); setShowNavSide(false); window.location.reload() }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: '14px', background: t.inputBg, border: `1px solid ${t.border}`, marginBottom: '8px', cursor: 'pointer' }}>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: t.text1 }}>{opt.label}</p>
                  <p style={{ fontSize: '12px', color: t.text3 }}>{opt.sub}</p>
                </div>
              </div>
            ))}
            <button onClick={() => setShowNavSide(false)}
              style={{ width: '100%', padding: '14px', background: t.inputBg, border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', color: t.text2, marginTop: '8px' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background: t.headerBg, backdropFilter: 'blur(20px)', padding: '52px 20px 20px', borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: t.text1, letterSpacing: '-0.6px' }}>Profile</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ThemeToggle/>
            <button onClick={() => router.push('/edit-profile')}
              style={{ width: '38px', height: '38px', borderRadius: '12px', background: t.inputBg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <EditIcon size={16} color={t.text2} strokeWidth={2}/>
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Profile hero */}
        <div style={{ ...card, padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            {/* Avatar */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              {profile?.avatar
                ? <img src={profile.avatar} style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover' }} alt={name}/>
                : <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '24px', boxShadow: '0 4px 16px rgba(220,20,60,0.3)' }}>
                    {initials(name)}
                  </div>}
              <button onClick={() => router.push('/edit-profile')}
                style={{ position: 'absolute', bottom: 0, right: 0, width: '24px', height: '24px', borderRadius: '50%', background: brand.primary, border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <CameraIcon size={10} color="white" strokeWidth={2}/>
              </button>
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: t.text1, letterSpacing: '-0.4px', marginBottom: '3px' }}>{name}</h2>
              <p style={{ fontSize: '13px', color: t.text3, marginBottom: '4px' }}>{email}</p>
              {location && <p style={{ fontSize: '12px', color: t.text3 }}>📍 {location}</p>}
            </div>
          </div>

          {bio && (
            <p style={{ fontSize: '14px', color: t.text2, lineHeight: 1.6, marginBottom: '16px', paddingBottom: '16px', borderBottom: `1px solid ${t.border}` }}>
              {bio}
            </p>
          )}

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            {[
              { val: posts.length.toString(), label: 'Moments' },
              { val: joinDate, label: 'Member since' },
              { val: '4.9★', label: 'Rating' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '10px 6px', background: t.inputBg, borderRadius: '12px' }}>
                <p style={{ fontSize: i === 1 ? '10px' : '16px', fontWeight: 800, color: t.text1, marginBottom: '3px', letterSpacing: i === 1 ? '0' : '-0.5px' }}>{s.val}</p>
                <p style={{ fontSize: '10px', color: t.text3, fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mode switch */}
        <div style={{ ...card, padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SparkleIcon size={20} color="white" strokeWidth={1.8}/>
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 700, color: t.text1 }}>Companion Mode</p>
                <p style={{ fontSize: '12px', color: t.text3 }}>Switch between family and companion</p>
              </div>
            </div>
            <ModeSwitch/>
          </div>
        </div>

        {/* Settings sections */}
        {SECTIONS.map((section, si) => (
          <div key={si}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px', paddingLeft: '4px' }}>
              {section.title}
            </p>
            <div style={{ ...card }}>
              {section.items.map((item, ii) => (
                <div key={ii}
                  onClick={() => item.path ? router.push(item.path) : item.action ? handleAction(item.action) : null}
                  style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderBottom: ii < section.items.length - 1 ? `1px solid ${t.border}` : 'none', cursor: 'pointer', transition: 'background 0.15s ease' }}
                  className="pressable">
                  <div style={{ width: '38px', height: '38px', borderRadius: '11px', background: t.inputBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '18px' }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: t.text1, marginBottom: '2px' }}>{item.label}</p>
                    <p style={{ fontSize: '12px', color: t.text3 }}>{item.sub}</p>
                  </div>
                  {item.action === 'theme' ? (
                    <div style={{ width: '44px', height: '24px', borderRadius: '12px', background: isDark ? brand.primary : t.inputBg, border: `1px solid ${isDark ? brand.primary : t.border}`, position: 'relative', transition: 'all 0.3s ease' }}>
                      <div style={{ position: 'absolute', top: '2px', left: isDark ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.3s ease', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }}/>
                    </div>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={t.text3} strokeWidth="2" strokeLinecap="round">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* App version */}
        <div style={{ textAlign: 'center', padding: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '6px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '7px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SahayatriLogo size={14} color="white"/>
            </div>
            <p style={{ fontSize: '13px', fontWeight: 700, color: t.text2 }}>Sahayatri</p>
          </div>
          <p style={{ fontSize: '11px', color: t.text3 }}>Version 1.0.0 · Built with ❤️ for Nepal</p>
        </div>

        {/* Sign out */}
        <button onClick={() => setShowSignOutConfirm(true)}
          style={{ width: '100%', padding: '16px', background: 'rgba(220,20,60,0.06)', border: '1px solid rgba(220,20,60,0.15)', borderRadius: '16px', color: brand.primary, fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={brand.primary} strokeWidth="2" strokeLinecap="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  )
}
