'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { brand } from '../design-system'
import { SahayatriLogo } from '../components/Icons'

const SLIDES = [
  {
    id: 0,
    visual: 'logo',
    title: 'Namaste',
    subtitle: 'साथयात्री',
    desc: 'Your family is in Nepal.\nYou are far away.\nSahayatri bridges that distance.',
    bg: 'linear-gradient(160deg, #06040C 0%, #1A0A16 50%, #06040C 100%)',
    accent: '#DC143C',
  },
  {
    id: 1,
    visual: 'distance',
    title: 'You worry.\nEvery single day.',
    subtitle: null,
    desc: 'Is Aama eating well?\nDid Buba take his medicine?\nWho is checking on them?',
    bg: 'linear-gradient(160deg, #06040C 0%, #0E0818 50%, #06040C 100%)',
    accent: '#7C3AED',
  },
  {
    id: 2,
    visual: 'care',
    title: 'We are there\nwhen you cannot be.',
    subtitle: null,
    desc: 'Verified companions visit your parents in Nepal. Daily photo updates. Real care. Real people.',
    bg: 'linear-gradient(160deg, #06040C 0%, #0A1A10 50%, #06040C 100%)',
    accent: '#10B981',
  },
  {
    id: 3,
    visual: 'sathi',
    title: 'Meet Sathi.',
    subtitle: 'साथी — Fellow Traveler',
    desc: 'Your AI companion who understands the Nepali diaspora experience. Available 24/7. Speaks your language.',
    bg: 'linear-gradient(160deg, #06040C 0%, #1A1000 50%, #06040C 100%)',
    accent: '#F59E0B',
  },
  {
    id: 4,
    visual: 'start',
    title: 'Your family\ndeserves this.',
    subtitle: null,
    desc: 'Join thousands of Nepali families who stay connected through Sahayatri.',
    bg: 'linear-gradient(160deg, #06040C 0%, #1A0A16 50%, #06040C 100%)',
    accent: '#DC143C',
  },
]

export default function Onboarding() {
  const router = useRouter()
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [touchStart, setTouchStart] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboardingSeen', 'true')
    }
  }, [])

  const goNext = () => {
    if (animating) return
    if (current === SLIDES.length - 1) {
      router.push('/signup')
      return
    }
    setAnimating(true)
    setTimeout(() => {
      setCurrent(prev => prev + 1)
      setAnimating(false)
    }, 200)
  }

  const goTo = (idx: number) => {
    if (animating || idx === current) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(idx)
      setAnimating(false)
    }, 200)
  }

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX)

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart - e.changedTouches[0].clientX
    if (diff > 50) goNext()
    if (diff < -50 && current > 0) goTo(current - 1)
  }

  const slide = SLIDES[current]

  const renderVisual = () => {
    if (slide.visual === 'logo') return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '120px', height: '120px', borderRadius: '36px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 60px rgba(220,20,60,0.4)', animation: 'breathe 3s ease infinite' }}>
          <SahayatriLogo size={70} color="white"/>
        </div>
      </div>
    )

    if (slide.visual === 'distance') return (
      <div style={{ position: 'relative', width: '280px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🇳🇵</div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Nepal</p>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>Aama & Buba</p>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, rgba(124,58,237,0.3), rgba(124,58,237,0.8), rgba(124,58,237,0.3))', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '20px', animation: 'float 3s ease infinite' }}>✈️</div>
          </div>
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', whiteSpace: 'nowrap' }}>10,000 km away</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏙️</div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Abroad</p>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>You</p>
        </div>
      </div>
    )

    if (slide.visual === 'care') return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '280px' }}>
        {[
          { emoji: '📸', text: 'Daily photo update from companion', time: '7:23 AM' },
          { emoji: '💊', text: 'Medicine taken — all good today', time: '9:01 AM' },
          { emoji: '🍱', text: 'Aama ate well — dal bhat & tarkari', time: '12:30 PM' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '14px', padding: '12px 14px' }}>
            <span style={{ fontSize: '20px' }}>{item.emoji}</span>
            <p style={{ flex: 1, fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{item.text}</p>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>{item.time}</p>
          </div>
        ))}
      </div>
    )

    if (slide.visual === 'sathi') return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #F59E0B, #D97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(245,158,11,0.3)', animation: 'breathe 2s ease infinite', fontSize: '40px' }}>
          🪔
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '260px' }}>
          <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px 14px 14px 4px', padding: '10px 14px', maxWidth: '200px' }}>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>साँझ भयो। How are you feeling today?</p>
          </div>
          <div style={{ alignSelf: 'flex-end', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', borderRadius: '14px 14px 4px 14px', padding: '10px 14px', maxWidth: '180px' }}>
            <p style={{ fontSize: '13px', color: 'white', lineHeight: 1.5 }}>Worried about Aama...</p>
          </div>
          <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px 14px 14px 4px', padding: '10px 14px', maxWidth: '220px' }}>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>Aama's lamp was lit this morning — she is okay 🪔</p>
          </div>
        </div>
      </div>
    )

    if (slide.visual === 'start') return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <div style={{ fontSize: '80px', animation: 'breathe 2s ease infinite' }}>❤️</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['🇳🇵', '🇨🇦', '🇬🇧', '🇦🇺', '🇺🇸'].map((flag, i) => (
            <span key={i} style={{ fontSize: '28px' }}>{flag}</span>
          ))}
        </div>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>Families across the world</p>
      </div>
    )

    return null
  }

  return (
    <div
      style={{ minHeight: '100vh', background: slide.bg, fontFamily: 'Inter, -apple-system, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', transition: 'background 0.5s ease' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Skip */}
      <div style={{ position: 'absolute', top: '52px', right: '24px', zIndex: 10 }}>
        <button onClick={() => router.push('/signup')}
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '9999px', padding: '8px 16px', color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
          Skip
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 32px 40px', gap: '32px' }} onClick={goNext}>
        <div style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(10px)' : 'translateY(0)', transition: 'all 0.3s ease' }}>
          {renderVisual()}
        </div>
        <div style={{ textAlign: 'center', opacity: animating ? 0 : 1, transform: animating ? 'translateY(10px)' : 'translateY(0)', transition: 'all 0.3s ease 0.05s', maxWidth: '320px' }}>
          {slide.subtitle && (
            <p style={{ fontSize: '13px', fontWeight: 600, color: slide.accent, letterSpacing: '0.5px', marginBottom: '8px' }}>{slide.subtitle}</p>
          )}
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: 'white', letterSpacing: '-0.8px', marginBottom: '14px', lineHeight: 1.25, whiteSpace: 'pre-line' }}>{slide.title}</h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, whiteSpace: 'pre-line' }}>{slide.desc}</p>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ padding: '0 32px 52px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {SLIDES.map((_, i) => (
            <div key={i} onClick={() => goTo(i)}
              style={{ width: i === current ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === current ? slide.accent : 'rgba(255,255,255,0.2)', transition: 'all 0.3s ease', cursor: 'pointer' }}/>
          ))}
        </div>
        <button onClick={goNext}
          style={{ width: '100%', maxWidth: '320px', padding: '18px', background: `linear-gradient(135deg, ${slide.accent}, ${slide.accent}CC)`, border: 'none', borderRadius: '18px', color: 'white', fontSize: '17px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: `0 8px 32px ${slide.accent}40`, letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.3s ease' }}>
          {current === SLIDES.length - 1 ? "Get Started — It's Free" : 'Continue'}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
        {current === SLIDES.length - 1 && (
          <button onClick={() => router.push('/login')}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Already have an account? Sign in
          </button>
        )}
      </div>

      <style>{`
        @keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
        @keyframes float{0%,100%{transform:translate(-50%,-50%) translateX(-8px)}50%{transform:translate(-50%,-50%) translateX(8px)}}
      `}</style>
    </div>
  )
}
