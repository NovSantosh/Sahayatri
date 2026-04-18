'use client'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { brand } from './design-system'
import { SahayatriLogo } from './components/Icons'

const FEATURES = [
  {
    title: 'Elder Care at Home',
    desc: 'Verified companions visit your parents daily in Nepal',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    color: '#DC143C',
    bg: 'rgba(220,20,60,0.12)',
    route: '/care',
  },
  {
    title: 'Daily Photo Updates',
    desc: 'Know your family is safe every single morning',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="3"/>
        <circle cx="8.5" cy="8.5" r="1.5" fill="white" stroke="none"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.12)',
    route: '/signup',
  },
  {
    title: 'Home Services',
    desc: 'Electrician, plumber and more at fixed prices',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.12)',
    route: '/services',
  },
  {
    title: 'Earn as a Companion',
    desc: 'Help Nepali families and earn from your skills',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    color: '#10B981',
    bg: 'rgba(16,185,129,0.12)',
    route: '/join-professional',
  },
]

export default function Landing() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeFeature, setActiveFeature] = useState<number | null>(null)

  useEffect(() => {
    if (status === 'authenticated') router.push('/home')
  }, [status])

  if (status === 'loading' || status === 'authenticated') return (
    <div style={{ minHeight: '100vh', background: '#F7F7F8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'breathe 2s ease infinite', boxShadow: '0 8px 32px rgba(220,20,60,0.4)' }}>
        <SahayatriLogo size={32} color="white"/>
      </div>
      <style>{`@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}`}</style>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F8', fontFamily: 'Inter, -apple-system, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      {/* Background decoration */}
      <div style={{ position: 'absolute', top: '-100px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,20,60,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)', pointerEvents: 'none' }}/>

      {/* Logo section */}
      <div style={{ padding: '72px 28px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>

        {/* App icon */}
        <div style={{ width: '88px', height: '88px', borderRadius: '28px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 48px rgba(220,20,60,0.3)', marginBottom: '20px', position: 'relative' }}>
          <SahayatriLogo size={52} color="white"/>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', borderRadius: '28px 28px 0 0', background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)', pointerEvents: 'none' }}/>
        </div>

        <h1 style={{ fontSize: '40px', fontWeight: 900, color: '#0F0F10', letterSpacing: '-2px', marginBottom: '8px', textAlign: 'center', lineHeight: 1 }}>
          Sahayatri
        </h1>
        <p style={{ fontSize: '15px', color: 'rgba(0,0,0,0.4)', textAlign: 'center', lineHeight: 1.65, maxWidth: '240px' }}>
          साथयात्री — Companion in life's journey
        </p>

        {/* Trust badges */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['🇳🇵 Made for Nepalis', '100% Ad-free', 'Legally verified'].map((badge, i) => (
            <div key={i} style={{ padding: '4px 10px', background: 'white', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '9999px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <p style={{ fontSize: '11px', color: 'rgba(0,0,0,0.45)', margin: 0, fontWeight: 500 }}>{badge}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '28px 20px 20px', position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(0,0,0,0.35)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingLeft: '4px' }}>What we offer</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
          {FEATURES.map((item, i) => (
            <div key={i}
              onClick={() => router.push('/signup')}
              className="pressable"
              style={{ display: 'flex', alignItems: 'center', gap: '14px', background: activeFeature === i ? item.bg : 'white', border: `1px solid ${activeFeature === i ? item.color + '30' : 'rgba(0,0,0,0.06)'}`, borderRadius: '16px', padding: '14px 16px', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', transition: 'all 0.2s ease' }}
              onMouseEnter={() => setActiveFeature(i)}
              onMouseLeave={() => setActiveFeature(null)}>

              {/* Icon */}
              <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: item.bg, border: `1px solid ${item.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${item.color}, ${item.color}AA)` }}/>
                <div style={{ position: 'relative', zIndex: 1 }}>{item.icon}</div>
              </div>

              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#0F0F10', marginBottom: '3px', letterSpacing: '-0.2px' }}>{item.title}</p>
                <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', lineHeight: 1.4 }}>{item.desc}</p>
              </div>

              {/* Arrow */}
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2.5" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {[
            { val: '500+', label: 'Families' },
            { val: '4.9★', label: 'Rating' },
            { val: '98%', label: 'Satisfaction' },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: '12px 8px', textAlign: 'center', background: 'white', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <p style={{ fontSize: '17px', fontWeight: 900, color: brand.primary, letterSpacing: '-0.5px', marginBottom: '3px' }}>{s.val}</p>
              <p style={{ fontSize: '11px', color: 'rgba(0,0,0,0.35)', fontWeight: 600 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => router.push('/signup')}
            className="pressable"
            style={{ width: '100%', padding: '18px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '18px', color: 'white', fontSize: '17px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 32px rgba(220,20,60,0.3)', letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            Get Started Free
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button onClick={() => router.push('/login')}
            className="pressable"
            style={{ width: '100%', padding: '16px', background: 'white', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '18px', color: '#0F0F10', fontSize: '16px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            Sign In to your account
          </button>
        </div>

        <p style={{ fontSize: '11px', color: 'rgba(0,0,0,0.25)', textAlign: 'center', marginTop: '14px', lineHeight: 1.6 }}>
          Your data stays private · Never shared · Nepal law compliant
        </p>
      </div>

      <style>{`@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}`}</style>
    </div>
  )
}
