'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { SahayatriLogo } from '../components/Icons'

const UI_DECK = [
  {
    id: 0,
    kicker: 'FOR NEPALI FAMILIES',
    title: 'Your parents\nback home.\nLooked after.',
    subline: 'Real care. Real people. Every day.',
    body: 'For every Nepali who left home to build a better life — this is for you. And for the family you left behind.',
    variant: 'identity',
    accent: '#DC143C',
  },
  {
    id: 1,
    kicker: 'THE DISTANCE IS REAL',
    title: 'You are in Canada.\nThey are in Nepal.',
    subline: 'Bridging the 11-hour gap.',
    body: 'When it is midnight for you, it is morning for them. Stop staying up wondering if Aama took her medicine. We handle it.',
    variant: 'chrono',
    accent: '#7C3AED',
  },
  {
    id: 2,
    kicker: 'PROOF EVERY DAY',
    title: 'Complete proof.\nZero guesswork.',
    subline: 'You see it happen. Live.',
    body: 'Every single day a verified companion visits your parents. Photo updates, medication checks, meal confirmation. All sent to you instantly.',
    variant: 'feed',
    accent: '#10B981',
  },
  {
    id: 3,
    kicker: 'YOUR 2AM FRIEND',
    title: 'A friend who\nnever sleeps.',
    subline: 'Nepali at heart.',
    body: 'Talk to Sathi when you cannot sleep. In Nepali. In English. In whatever comes naturally at 2am. Sathi always listens.',
    variant: 'wave',
    accent: '#F59E0B',
  },
  {
    id: 4,
    kicker: 'START TODAY',
    title: 'Peace of mind\nis not a luxury.',
    subline: 'Your family deserves this.',
    body: 'Serving Kathmandu, Pokhara, Lalitpur, Bhaktapur, Chitwan and Butwal. Join 500+ families who sleep better because of Sahayatri.',
    variant: 'funnel',
    accent: '#DC143C',
  },
]

function useRealTime() {
  const [time, setTime] = useState({ local: '00:00', ktm: '00:00', city: 'Your city' })
  useEffect(() => {
    const update = () => {
      const now = new Date()
      const fmt = (d: Date) => {
        const h = d.getHours().toString().padStart(2, '0')
        const m = d.getMinutes().toString().padStart(2, '0')
        return `${h}:${m}`
      }
      try {
        const ktmStr = new Intl.DateTimeFormat([], { timeZone: 'Asia/Kathmandu', hour: '2-digit', minute: '2-digit', hour12: false }).format(now)
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
        const city = tz.split('/').pop()?.replace(/_/g, ' ') || 'Your city'
        setTime({ local: fmt(now), ktm: ktmStr, city })
      } catch {
        setTime({ local: fmt(now), ktm: '—:—', city: 'Your city' })
      }
    }
    update()
    const t = setInterval(update, 1000)
    return () => clearInterval(t)
  }, [])
  return time
}

function haptic(p: number[] = [6]) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(p)
}

export default function Onboarding() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [slideDir, setSlideDir] = useState<'forward' | 'backward'>('forward')
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [lang, setLang] = useState<'EN' | 'NE'>('EN')
  const touchStart = useRef(0)
  const realTime = useRealTime()

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('onboardingSeen', 'true')
  }, [])

  const go = (target: number) => {
    if (target < 0 || target >= UI_DECK.length) return
    haptic([6])
    setSlideDir(target > step ? 'forward' : 'backward')
    setStep(target)
    setDragX(0)
  }

  const goNext = () => {
    if (step === UI_DECK.length - 1) {
      haptic([10, 5, 10])
      router.push('/signup')
      return
    }
    go(step + 1)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX
    setIsDragging(true)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const offset = e.touches[0].clientX - touchStart.current
    if ((step === 0 && offset > 0) || (step === UI_DECK.length - 1 && offset < 0)) {
      setDragX(offset * 0.2)
    } else {
      setDragX(offset)
    }
  }

  const onTouchEnd = () => {
    setIsDragging(false)
    if (dragX < -60) go(step + 1)
    else if (dragX > 60) go(step - 1)
    else setDragX(0)
  }

  const node = UI_DECK[step]

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        minHeight: '100vh',
        backgroundColor: '#040203',
        backgroundImage: `radial-gradient(circle at 50% 25%, ${node.accent}12 0%, transparent 55%)`,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden', userSelect: 'none',
        transition: 'background-image 0.6s ease',
        boxSizing: 'border-box',
      }}
    >
      {/* Ambient glow */}
      <div style={{ position: 'fixed', top: -80, right: -60, width: 280, height: 280, borderRadius: '50%', background: node.accent, opacity: 0.06, filter: 'blur(60px)', pointerEvents: 'none', transition: 'background 0.6s ease' }}/>
      <div style={{ position: 'fixed', bottom: 60, left: -60, width: 200, height: 200, borderRadius: '50%', background: node.accent, opacity: 0.04, filter: 'blur(40px)', pointerEvents: 'none', transition: 'background 0.6s ease' }}/>

      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '56px 24px 0', zIndex: 90, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(220,20,60,0.25)' }}>
            <SahayatriLogo size={16} color="white"/>
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.2px' }}>Sahayatri</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setLang(l => l === 'EN' ? 'NE' : 'EN')}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', width: '38px', height: '28px', color: 'rgba(255,255,255,0.6)', fontSize: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '0.3px' }}>
            {lang === 'EN' ? 'NE' : 'EN'}
          </button>
          {step < UI_DECK.length - 1 && (
            <button onClick={() => router.push('/signup')}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.28)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              Skip →
            </button>
          )}
        </div>
      </header>

      {/* Main content */}
      <div
        style={{ flex: 1, display: 'flex', flexDirection: 'column', zIndex: 50, transform: `translateX(${dragX}px)`, transition: isDragging ? 'none' : 'transform 0.45s cubic-bezier(0.16,1,0.3,1)' }}
      >
        {/* Visual area */}
        <div style={{ flex: '0 0 auto', minHeight: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px 24px 0' }}>
          <div key={step} className={`vnode ${slideDir}`} style={{ width: '100%', maxWidth: '340px' }}>
            <Visual variant={node.variant} accent={node.accent} local={realTime.local} ktm={realTime.ktm} city={realTime.city}/>
          </div>
        </div>

        {/* Text area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px 32px 8px' }}>
          <div style={{ maxWidth: '340px', margin: '0 auto', width: '100%' }}>
            {/* Kicker */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: node.accent, boxShadow: `0 0 8px ${node.accent}` }}/>
              <p style={{ fontSize: '10px', fontWeight: 800, color: node.accent, letterSpacing: '1.5px', transition: 'color 0.4s' }}>{node.kicker}</p>
            </div>
            {/* Headline */}
            <h1 key={`h-${step}`} className="tslide" style={{ fontSize: '32px', fontWeight: 800, color: 'white', letterSpacing: '-1.2px', lineHeight: 1.12, marginBottom: '8px', whiteSpace: 'pre-line' }}>
              {node.title}
            </h1>
            {/* Subline */}
            <p key={`s-${step}`} className="tslide" style={{ fontSize: '16px', fontWeight: 600, color: node.accent, lineHeight: 1.3, marginBottom: '12px', animationDelay: '0.04s', transition: 'color 0.4s' }}>
              {node.subline}
            </p>
            {/* Body */}
            <p key={`b-${step}`} className="tslide" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, animationDelay: '0.08s' }}>
              {node.body}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: '0 28px 48px', display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 100, flexShrink: 0 }}>
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '4px' }}>
          {UI_DECK.map((_, i) => (
            <button key={i} onClick={() => go(i)}
              style={{ width: i === step ? '28px' : '5px', height: '5px', borderRadius: '3px', background: i === step ? node.accent : 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)' }}/>
          ))}
        </div>

        {/* CTA */}
        <button onClick={goNext}
          className="cbtn"
          style={{ width: '100%', height: '54px', background: step === UI_DECK.length - 1 ? 'linear-gradient(135deg, #DC143C, #A50E2D)' : 'rgba(255,255,255,0.95)', border: 'none', borderRadius: '16px', color: step === UI_DECK.length - 1 ? 'white' : '#0A0A0A', fontSize: '15px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: 'inherit', boxShadow: step === UI_DECK.length - 1 ? `0 12px 32px ${node.accent}25` : '0 8px 24px rgba(0,0,0,0.2)', transition: 'all 0.3s ease' }}>
          {step === UI_DECK.length - 1 ? 'Get Started — It\'s Free' : 'Continue'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>

        {/* Secondary */}
        {step === UI_DECK.length - 1 ? (
          <button onClick={() => router.push('/login')}
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px', color: 'rgba(255,255,255,0.3)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            Already have an account? Sign in
          </button>
        ) : (
          <p style={{ textAlign: 'center', fontSize: '10px', color: 'rgba(255,255,255,0.12)', letterSpacing: '0.5px', fontWeight: 700 }}>
            SWIPE OR TAP TO EXPLORE
          </p>
        )}
      </footer>

      <style>{`
        .vnode { will-change: transform, opacity; }
        .forward { animation: fwd 0.55s cubic-bezier(0.16,1,0.3,1) both; }
        .backward { animation: bwd 0.55s cubic-bezier(0.16,1,0.3,1) both; }
        .tslide { animation: tup 0.5s cubic-bezier(0.16,1,0.3,1) both; }
        .cbtn:active { transform: scale(0.97); }
        @keyframes fwd { from{opacity:0;transform:scale(1.03) translateX(16px);filter:blur(2px)} to{opacity:1;transform:scale(1) translateX(0);filter:blur(0)} }
        @keyframes bwd { from{opacity:0;transform:scale(0.97) translateX(-16px);filter:blur(2px)} to{opacity:1;transform:scale(1) translateX(0);filter:blur(0)} }
        @keyframes tup { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes wave { from{transform:scaleY(0.3)} to{transform:scaleY(1.3)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes pulse { 0%{box-shadow:0 0 0 0 currentColor} 100%{box-shadow:0 0 0 8px transparent} }
        * { -webkit-tap-highlight-color:transparent; }
      `}</style>
    </div>
  )
}

function Visual({ variant, accent, local, ktm, city }: { variant: string, accent: string, local: string, ktm: string, city: string }) {
  const card = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '18px', position: 'relative' as const, overflow: 'hidden' as const }
  const accentBar = { position: 'absolute' as const, top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${accent}, ${accent}44)` }

  if (variant === 'identity') return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <div style={{ width: '110px', height: '110px', borderRadius: '32px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 24px 56px rgba(220,20,60,0.35), inset 0 1px 0 rgba(255,255,255,0.12)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)' }}/>
        <SahayatriLogo size={62} color="white"/>
      </div>
      <div style={{ width: '70px', height: '12px', background: `radial-gradient(ellipse, ${accent}35 0%, transparent 70%)`, filter: 'blur(5px)', marginTop: '-6px' }}/>
      {/* Trust badges */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {['🇳🇵 Made for Nepalis', '✓ Verified companions', '⭐ 4.9 rating'].map((b, i) => (
          <div key={i} style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '9999px' }}>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{b}</p>
          </div>
        ))}
      </div>
    </div>
  )

  if (variant === 'chrono') return (
    <div style={{ ...card }}>
      <div style={accentBar}/>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '14px' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.25)', letterSpacing: '1px', marginBottom: '6px' }}>YOU</p>
          <p style={{ fontSize: '30px', fontWeight: 200, color: 'white', letterSpacing: '-1px', fontFamily: 'monospace', lineHeight: 1, marginBottom: '4px' }}>{local}</p>
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>{city}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '0 8px' }}>
          <div style={{ height: '40px', width: '1px', background: 'rgba(255,255,255,0.06)' }}/>
          <span style={{ fontSize: '16px' }}>✈️</span>
          <div style={{ height: '40px', width: '1px', background: 'rgba(255,255,255,0.06)' }}/>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '11px', fontWeight: 800, color: accent, letterSpacing: '1px', marginBottom: '6px' }}>NEPAL</p>
          <p style={{ fontSize: '30px', fontWeight: 200, color: accent, letterSpacing: '-1px', fontFamily: 'monospace', lineHeight: 1, marginBottom: '4px' }}>{ktm}</p>
          <p style={{ fontSize: '10px', color: `${accent}80` }}>Kathmandu</p>
        </div>
      </div>
      <div style={{ background: `${accent}08`, border: `1px solid ${accent}15`, borderRadius: '12px', padding: '10px 14px' }}>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, fontStyle: 'italic', textAlign: 'center' }}>
          "Midnight in Vancouver. Morning in Nepal."
        </p>
      </div>
      <div style={{ position: 'absolute', top: 14, right: 14, width: '6px', height: '6px', borderRadius: '50%', background: accent, animation: 'blink 2s ease infinite' }}/>
    </div>
  )

  if (variant === 'feed') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {[
        { emoji: '🌅', time: '7:14 AM', title: 'Good morning — Aama is up', sub: 'Photo received · companion checked in', color: '#10B981' },
        { emoji: '💊', time: '9:02 AM', title: 'All medicines taken', sub: '3 of 3 confirmed by companion', color: '#3B82F6' },
        { emoji: '🍛', time: '12:45 PM', title: 'Lunch completed', sub: 'Dal bhat, saag, achar — full meal', color: '#F59E0B' },
      ].map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.02)', border: `1px solid ${accent}18`, borderRadius: '14px', padding: '11px 13px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: accent, borderRadius: '14px 0 0 14px' }}/>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${accent}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{item.emoji}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: '12.5px', fontWeight: 700, color: 'rgba(255,255,255,0.85)', marginBottom: '2px' }}>{item.title}</p>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{item.sub}</p>
          </div>
          <div style={{ flexShrink: 0, textAlign: 'right' }}>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.18)', marginBottom: '3px' }}>{item.time}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end' }}>
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="6" height="6" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7.5L8 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <p style={{ fontSize: '9px', color: accent, fontWeight: 700 }}>Live</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  if (variant === 'wave') return (
    <div style={{ ...card }}>
      <div style={accentBar}/>
      {/* Sathi header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `linear-gradient(135deg, ${accent}, ${accent}AA)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', boxShadow: `0 4px 12px ${accent}30`, flexShrink: 0 }}>🪔</div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '13px', fontWeight: 700, color: 'white', marginBottom: '2px' }}>Sathi</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10B981', animation: 'blink 1.5s ease infinite' }}/>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>Listening...</p>
          </div>
        </div>
        {/* Soundwave */}
        <svg width="52" height="20" viewBox="0 0 52 20">
          {[4,8,3,12,6,16,4,10,7,14,5,9,13].map((h, i) => (
            <rect key={i} x={i * 4} y={(20 - h) / 2} width="2" height={h} rx="1" fill={accent} opacity="0.6"
              style={{ animation: `wave ${0.7 + i * 0.06}s ease-in-out ${i * 0.05}s infinite alternate`, transformOrigin: 'center' }}/>
          ))}
        </svg>
      </div>
      {/* Chat bubbles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ alignSelf: 'flex-start', background: `${accent}0A`, border: `1px solid ${accent}15`, borderRadius: '4px 14px 14px 14px', padding: '9px 12px', maxWidth: '88%' }}>
          <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.55 }}>साँझ भयो। You seem quiet tonight. How are you really feeling?</p>
        </div>
        <div style={{ alignSelf: 'flex-end', background: 'rgba(220,20,60,0.6)', borderRadius: '14px 4px 14px 14px', padding: '9px 12px', maxWidth: '80%' }}>
          <p style={{ fontSize: '12.5px', color: 'white', lineHeight: 1.55 }}>I haven't called Aama in 4 days. I feel terrible.</p>
        </div>
        <div style={{ alignSelf: 'flex-start', background: `${accent}0A`, border: `1px solid ${accent}15`, borderRadius: '4px 14px 14px 14px', padding: '9px 12px', maxWidth: '92%' }}>
          <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.55 }}>That guilt is love. Aama's lamp was lit this morning — she is okay. Call her tomorrow. I will remind you. 🪔</p>
        </div>
      </div>
    </div>
  )

  if (variant === 'funnel') {
    const CITIES = [
      { flag: '🇳🇵', name: 'Nepal', city: 'Kathmandu · Pokhara', count: '200+', accent: '#DC143C' },
      { flag: '🇨🇦', name: 'Canada', city: 'Vancouver · Toronto', count: '120+', accent: '#DC143C' },
      { flag: '🇬🇧', name: 'UK', city: 'London · Manchester', count: '80+', accent: '#DC143C' },
      { flag: '🇦🇺', name: 'Australia', city: 'Sydney · Melbourne', count: '60+', accent: '#DC143C' },
      { flag: '🇺🇸', name: 'USA', city: 'New York · Texas', count: '40+', accent: '#DC143C' },
    ]
    return <AnimatedCountries accent={accent} cities={CITIES}/>
  }

  return null
}

function AnimatedCountries({ accent, cities }: { accent: string, cities: any[] }) {
  const [idx, setIdx] = useState(0)
  const [anim, setAnim] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setAnim(true)
      setTimeout(() => { setIdx(i => (i + 1) % cities.length); setAnim(false) }, 280)
    }, 2200)
    return () => clearInterval(t)
  }, [])

  const c = cities[idx]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Stats */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {[{ val: '500+', label: 'Families' }, { val: '4.9★', label: 'Rating' }, { val: '98%', label: 'Happy' }].map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', padding: '14px 6px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${accent}15`, borderRadius: '14px' }}>
            <p style={{ fontSize: '19px', fontWeight: 900, color: accent, letterSpacing: '-0.8px', marginBottom: '3px' }}>{s.val}</p>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', fontWeight: 600 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Animated country */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${accent}20`, borderRadius: '18px', padding: '16px', position: 'relative', overflow: 'hidden', transition: 'border-color 0.5s ease' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${accent}, ${accent}33)` }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', opacity: anim ? 0 : 1, transform: anim ? 'translateY(6px)' : 'translateY(0)', transition: 'all 0.28s ease' }}>
          <div style={{ fontSize: '44px', lineHeight: 1, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))', flexShrink: 0 }}>{c.flag}</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '17px', fontWeight: 800, color: 'white', letterSpacing: '-0.4px', marginBottom: '3px' }}>{c.name}</p>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '8px' }}>📍 {c.city}</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: `${accent}12`, border: `1px solid ${accent}25`, borderRadius: '9999px', padding: '3px 9px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: accent, animation: 'blink 1.5s ease infinite' }}/>
              <p style={{ fontSize: '10px', fontWeight: 700, color: accent }}>{c.count} families connected</p>
            </div>
          </div>
        </div>
        {/* Dots */}
        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginTop: '14px' }}>
          {cities.map((_, i) => (
            <div key={i} onClick={() => setIdx(i)}
              style={{ width: i === idx ? '18px' : '5px', height: '5px', borderRadius: '2.5px', background: i === idx ? accent : 'rgba(255,255,255,0.1)', transition: 'all 0.4s ease', cursor: 'pointer' }}/>
          ))}
        </div>
      </div>
    </div>
  )
}
