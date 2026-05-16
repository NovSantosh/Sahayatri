'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { SahayatriLogo } from '../components/Icons'

function useRealTime() {
  const [time, setTime] = useState({ local: '', ktm: '', city: '' })
  useEffect(() => {
    const update = () => {
      const now = new Date()
      const ktm = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }))
      const fmt = (d: Date) => {
        const h = d.getHours()
        const m = d.getMinutes().toString().padStart(2, '0')
        const p = h >= 12 ? 'PM' : 'AM'
        return `${h % 12 || 12}:${m} ${p}`
      }
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      const city = tz.split('/').pop()?.replace(/_/g, ' ') || 'Your city'
      setTime({ local: fmt(now), ktm: fmt(ktm), city })
    }
    update()
    const t = setInterval(update, 1000)
    return () => clearInterval(t)
  }, [])
  return time
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const h = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])
  return reduced
}

function haptic(p: number[] = [10]) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(p)
}

const SLIDES = [
  {
    id: 0, visual: 'logo',
    tag: 'SAHAYATRI',
    headline: 'Home is not\na place.',
    subline: 'It is the people in it.',
    body: 'For every Nepali who left home to build a better life — this is for you. And for the family you left behind.',
    bg: ['#0D0208', '#1A0510'],
    accent: '#DC143C',
  },
  {
    id: 1, visual: 'worry',
    tag: 'THE REALITY',
    headline: 'You wake up\nworrying.',
    subline: 'Every. Single. Night.',
    body: '"Is Aama okay? Did someone check on her today? What if something happened and nobody told me?"',
    bg: ['#080412', '#0E0820'],
    accent: '#7C3AED',
  },
  {
    id: 2, visual: 'care',
    tag: 'OUR PROMISE',
    headline: 'Someone is\nalways there.',
    subline: 'So you can sleep.',
    body: 'Verified companions visit your parents every day in Nepal. You see it happen. Live updates. Real care.',
    bg: ['#030D08', '#081A10'],
    accent: '#10B981',
  },
  {
    id: 3, visual: 'sathi',
    tag: 'SATHI AI',
    headline: 'A friend who\nnever sleeps.',
    subline: 'Nepali at heart.',
    body: 'Talk to Sathi at 2am when you are worried. In Nepali or English. Sathi always listens.',
    bg: ['#0D0800', '#1A1000'],
    accent: '#F59E0B',
  },
  {
    id: 4, visual: 'end',
    tag: 'JOIN US',
    headline: 'Your parents\ndeserve this.',
    subline: 'So do you.',
    body: 'Peace of mind is not a luxury. It is what every family separated by distance deserves.',
    bg: ['#0D0208', '#1A0510'],
    accent: '#DC143C',
  },
]

export default function Onboarding() {
  const router = useRouter()
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [lang, setLang] = useState<'en' | 'np'>('en')
  const touchX = useRef(0)
  const touchY = useRef(0)
  const realTime = useRealTime()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('onboardingSeen', 'true')
  }, [])

  const go = (idx: number) => {
    if (animating || idx === current) return
    haptic([8])
    setAnimating(true)
    setTimeout(() => { setCurrent(idx); setAnimating(false) }, reducedMotion ? 0 : 220)
  }

  const goNext = () => {
    if (current === SLIDES.length - 1) {
      haptic([15, 10, 15])
      router.push('/signup')
      return
    }
    go(current + 1)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX
    touchY.current = e.touches[0].clientY
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = touchX.current - e.changedTouches[0].clientX
    const dy = Math.abs(touchY.current - e.changedTouches[0].clientY)
    if (dy > Math.abs(dx)) return
    if (dx > 40) goNext()
    if (dx < -40 && current > 0) go(current - 1)
  }

  const s = SLIDES[current]
  const anim = reducedMotion ? {} : {
    opacity: animating ? 0 : 1,
    transform: animating ? 'translateY(12px)' : 'translateY(0)',
    transition: 'all 0.3s ease',
  }

  const WAVES = [5, 9, 4, 14, 7, 18, 5, 12, 8, 16, 6, 10, 15, 7, 12]

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        minHeight: '100vh',
        background: `radial-gradient(ellipse at 25% 15%, ${s.accent}20 0%, transparent 55%), radial-gradient(ellipse at 75% 85%, ${s.accent}0C 0%, transparent 55%), linear-gradient(160deg, ${s.bg[0]}, ${s.bg[1]}, ${s.bg[0]})`,
        fontFamily: 'Inter, -apple-system, sans-serif',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden', userSelect: 'none',
        transition: reducedMotion ? 'none' : 'background 0.7s ease',
      }}
    >
      {/* Ambient glow */}
      <div style={{ position: 'fixed', top: -100, right: -80, width: 300, height: 300, borderRadius: '50%', background: s.accent, opacity: 0.06, filter: 'blur(60px)', pointerEvents: 'none', transition: 'background 0.7s ease' }}/>
      <div style={{ position: 'fixed', bottom: 80, left: -60, width: 200, height: 200, borderRadius: '50%', background: s.accent, opacity: 0.04, filter: 'blur(40px)', pointerEvents: 'none', transition: 'background 0.7s ease' }}/>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '56px 28px 0', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SahayatriLogo size={17} color="white"/>
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '-0.2px' }}>Sahayatri</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={() => setLang(l => l === 'en' ? 'np' : 'en')}
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', padding: '5px 11px', color: 'rgba(255,255,255,0.45)', fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            {lang === 'en' ? 'नेपाली' : 'EN'}
          </button>
          {current < SLIDES.length - 1 && (
            <button onClick={() => router.push('/signup')}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.28)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              Skip →
            </button>
          )}
        </div>
      </div>

      {/* Visual */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 28px 16px', gap: '28px', position: 'relative', zIndex: 5 }}>

        <div style={{ width: '100%', maxWidth: '340px', minHeight: '210px', display: 'flex', alignItems: 'center', justifyContent: 'center', ...anim }}>

          {/* LOGO */}
          {s.visual === 'logo' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '130px', height: '130px', borderRadius: '40px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 24px 80px rgba(220,20,60,0.5), inset 0 1px 0 rgba(255,255,255,0.12)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)' }}/>
                <SahayatriLogo size={75} color="white"/>
              </div>
              <div style={{ width: '80px', height: '16px', background: 'radial-gradient(ellipse, rgba(220,20,60,0.35) 0%, transparent 70%)', filter: 'blur(6px)', marginTop: '-8px' }}/>
            </div>
          )}

          {/* WORRY — Real time */}
          {s.visual === 'worry' && (
            <div style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '20px', backdropFilter: 'blur(20px)' }}>
              {/* Live clocks */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                <div style={{ flex: 1, textAlign: 'center', padding: '14px 10px', background: 'rgba(255,255,255,0.04)', borderRadius: '14px' }}>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', fontWeight: 700, letterSpacing: '1px', marginBottom: '6px' }}>YOU</p>
                  <p style={{ fontSize: '24px', fontWeight: 200, color: 'white', letterSpacing: '-0.8px', lineHeight: 1, marginBottom: '4px', fontVariantNumeric: 'tabular-nums' }}>{realTime.local || '—:— —'}</p>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>{realTime.city}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '0 4px' }}>
                  <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.08)' }}/>
                </div>
                <div style={{ flex: 1, textAlign: 'center', padding: '14px 10px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '14px' }}>
                  <p style={{ fontSize: '10px', color: 'rgba(124,58,237,0.7)', fontWeight: 700, letterSpacing: '1px', marginBottom: '6px' }}>NEPAL</p>
                  <p style={{ fontSize: '24px', fontWeight: 200, color: '#7C3AED', letterSpacing: '-0.8px', lineHeight: 1, marginBottom: '4px', fontVariantNumeric: 'tabular-nums' }}>{realTime.ktm || '—:— —'}</p>
                  <p style={{ fontSize: '10px', color: 'rgba(124,58,237,0.4)' }}>Kathmandu</p>
                </div>
              </div>
              {/* Thought bubble */}
              <div style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '14px', padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7C3AED', animation: 'blink 2s ease infinite' }}/>
                  <p style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(124,58,237,0.7)', letterSpacing: '0.5px' }}>YOUR THOUGHTS RIGHT NOW</p>
                </div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, fontStyle: 'italic' }}>
                  "Is Aama okay? Did someone check on her? It is so late there..."
                </p>
              </div>
            </div>
          )}

          {/* CARE — Live updates */}
          {s.visual === 'care' && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { emoji: '🌅', time: '7:14 AM', title: 'Good morning — Aama is up', sub: 'Photo received from companion', color: '#10B981' },
                { emoji: '💊', time: '9:02 AM', title: 'All medicines taken', sub: '3 of 3 confirmed by companion', color: '#3B82F6' },
                { emoji: '🍛', time: '12:45 PM', title: 'Lunch completed', sub: 'Dal bhat, saag, achar — full meal', color: '#F59E0B' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${item.color}20`, borderRadius: '16px', padding: '13px 14px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: item.color, borderRadius: '16px 0 0 16px' }}/>
                  <div style={{ width: '38px', height: '38px', borderRadius: '11px', background: `${item.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{item.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.85)', marginBottom: '2px' }}>{item.title}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{item.sub}</p>
                  </div>
                  <div style={{ flexShrink: 0, textAlign: 'right' }}>
                    <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', marginBottom: '4px' }}>{item.time}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="7" height="7" viewBox="0 0 10 10"><path d="M2 5L4 7.5L8 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                      </div>
                      <p style={{ fontSize: '9px', color: item.color, fontWeight: 700 }}>Live</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SATHI — Soundwave chat */}
          {s.visual === 'sathi' && (
            <div style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '18px', backdropFilter: 'blur(20px)' }}>
              {/* Header with soundwave */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', paddingBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #F59E0B, #D97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', boxShadow: '0 4px 12px rgba(245,158,11,0.3)', flexShrink: 0 }}>🪔</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: 'white', marginBottom: '2px' }}>Sathi</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10B981', animation: 'blink 1.5s ease infinite' }}/>
                    <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>Listening...</p>
                  </div>
                </div>
                {/* Soundwave */}
                <svg width="56" height="22" viewBox="0 0 56 22" style={{ flexShrink: 0 }}>
                  {WAVES.map((h, i) => (
                    <rect key={i} x={i * 3.8} y={(22 - h) / 2} width="2.2" height={h} rx="1.1" fill="#F59E0B" opacity="0.65"
                      style={{ animation: `wave ${0.7 + i * 0.06}s ease-in-out ${i * 0.05}s infinite alternate`, transformOrigin: 'center' }}/>
                  ))}
                </svg>
              </div>
              {/* Chat */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ alignSelf: 'flex-start', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.12)', borderRadius: '4px 14px 14px 14px', padding: '10px 13px', maxWidth: '88%' }}>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>साँझ भयो। You seem quiet. How are you really feeling?</p>
                </div>
                <div style={{ alignSelf: 'flex-end', background: 'linear-gradient(135deg, rgba(220,20,60,0.75), rgba(165,14,45,0.75))', borderRadius: '14px 4px 14px 14px', padding: '10px 13px', maxWidth: '80%' }}>
                  <p style={{ fontSize: '13px', color: 'white', lineHeight: 1.6 }}>I haven't called Aama in 4 days. I feel terrible.</p>
                </div>
                <div style={{ alignSelf: 'flex-start', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.12)', borderRadius: '4px 14px 14px 14px', padding: '10px 13px', maxWidth: '92%' }}>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>That guilt is love. Aama's lamp was lit this morning — she is okay. Call her tomorrow at 7am. I will remind you. 🪔</p>
                </div>
              </div>
            </div>
          )}

          {/* END */}
          {s.visual === 'end' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
              <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                {[{ val: '500+', label: 'Families' }, { val: '4.9★', label: 'Rating' }, { val: '98%', label: 'Happy' }].map((s2, i) => (
                  <div key={i} style={{ flex: 1, textAlign: 'center', padding: '18px 8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px' }}>
                    <p style={{ fontSize: '22px', fontWeight: 900, color: '#DC143C', letterSpacing: '-1px', marginBottom: '4px' }}>{s2.val}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)', fontWeight: 500 }}>{s2.label}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['🇳🇵', '🇨🇦', '��🇧', '🇦🇺', '🇺🇸'].map((f, i) => (
                  <span key={i} style={{ fontSize: '28px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}>{f}</span>
                ))}
              </div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)', textAlign: 'center', lineHeight: 1.7 }}>
                Nepali families in 5 countries<br/>connected through Sahayatri
              </p>
            </div>
          )}
        </div>

        {/* Text */}
        <div style={{ width: '100%', maxWidth: '340px', ...anim, transitionDelay: reducedMotion ? '0ms' : '60ms' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: s.accent }}/>
            <p style={{ fontSize: '10px', fontWeight: 700, color: s.accent, letterSpacing: '1.8px' }}>{s.tag}</p>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'white', letterSpacing: '-1px', lineHeight: 1.18, marginBottom: '8px', whiteSpace: 'pre-line' }}>{s.headline}</h1>
          <p style={{ fontSize: '17px', fontWeight: 600, color: s.accent, letterSpacing: '-0.3px', marginBottom: '14px', opacity: 0.9 }}>{s.subline}</p>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>{s.body}</p>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ padding: '0 28px 50px', display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', zIndex: 10 }}>
        {/* Dots */}
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => go(i)}
              style={{ width: i === current ? '26px' : '6px', height: '6px', borderRadius: '3px', background: i === current ? s.accent : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', transition: reducedMotion ? 'none' : 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)', padding: 0 }}/>
          ))}
        </div>

        {/* CTA */}
        <button onClick={goNext}
          style={{ width: '100%', padding: '19px', background: current === SLIDES.length - 1 ? 'linear-gradient(135deg, #DC143C, #A50E2D)' : `linear-gradient(135deg, ${s.accent}, ${s.accent}AA)`, border: 'none', borderRadius: '20px', color: 'white', fontSize: '17px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: `0 8px 32px ${s.accent}30, inset 0 1px 0 rgba(255,255,255,0.1)`, letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: reducedMotion ? 'none' : 'all 0.3s ease' }}>
          {current === SLIDES.length - 1 ? "Get Started — Free Forever" : 'Continue'}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>

        {current === SLIDES.length - 1 ? (
          <button onClick={() => router.push('/login')}
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '14px', color: 'rgba(255,255,255,0.35)', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            I already have an account
          </button>
        ) : (
          <p style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.3px' }}>
            Tap to continue · Swipe to navigate
          </p>
        )}
      </div>

      <style>{`
        @keyframes wave { from{transform:scaleY(0.35)} to{transform:scaleY(1)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </div>
  )
}
