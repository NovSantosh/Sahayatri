'use client'
import { useEffect, useState } from 'react'

type Screen = 'mobile' | 'tablet' | 'desktop'

function getScreen(w: number): Screen {
  if (w < 768) return 'mobile'
  if (w < 1024) return 'tablet'
  return 'desktop'
}

export default function ResponsiveWrapper({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<Screen>('mobile')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const update = () => setScreen(getScreen(window.innerWidth))
    update()
    setMounted(true)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  if (!mounted) return (
    <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto' }}>
      {children}
    </div>
  )

  // ── MOBILE ──────────────────────────────────────
  if (screen === 'mobile') return (
    <div style={{
      width: '100%',
      maxWidth: '480px',
      margin: '0 auto',
      minHeight: '100vh',
      minHeight: '100dvh',
      position: 'relative',
      overflowX: 'hidden',
    }}>
      {children}
    </div>
  )

  // ── TABLET ──────────────────────────────────────
  if (screen === 'tablet') return (
    <div style={{
      minHeight: '100vh',
      background: '#030209',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '32px 24px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '520px',
        minHeight: 'calc(100vh - 64px)',
        background: '#06040C',
        borderRadius: '32px',
        overflow: 'hidden',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 40px 80px rgba(0,0,0,0.6)',
        position: 'relative',
      }}>
        {children}
      </div>
    </div>
  )

  // ── DESKTOP ─────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh',
      background: '#030209',
      backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(220,20,60,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.05) 0%, transparent 60%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '72px',
      padding: '40px',
      fontFamily: 'Inter, sans-serif',
    }}>

      {/* ── Phone frame ── */}
      <div style={{ position: 'relative', flexShrink: 0 }}>

        {/* Glow */}
        <div style={{
          position: 'absolute', inset: '-40px',
          background: 'radial-gradient(ellipse at center, rgba(220,20,60,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}/>

        {/* Frame */}
        <div style={{
          width: '375px',
          height: '812px',
          borderRadius: '52px',
          background: 'linear-gradient(160deg, #2C2C2E, #1C1C1E)',
          padding: '10px',
          position: 'relative',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.1), inset 0 0 0 1px rgba(255,255,255,0.05), 0 60px 120px rgba(0,0,0,0.8)',
        }}>

          {/* Screen */}
          <div style={{
            width: '100%', height: '100%',
            borderRadius: '44px',
            overflow: 'hidden',
            background: '#06040C',
            position: 'relative',
          }}>

            {/* Dynamic Island */}
            <div style={{
              position: 'absolute', top: '13px',
              left: '50%', transform: 'translateX(-50%)',
              width: '120px', height: '36px',
              background: '#000',
              borderRadius: '20px',
              zIndex: 100,
            }}>
              {/* Camera */}
              <div style={{
                position: 'absolute', right: '10px', top: '50%',
                transform: 'translateY(-50%)',
                width: '10px', height: '10px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}/>
            </div>

            {/* App scroll container */}
            <div style={{
              width: '100%', height: '100%',
              overflowY: 'auto', overflowX: 'hidden',
            }}>
              {children}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ position: 'absolute', left: '-4px', top: '124px', width: '4px', height: '30px', background: '#2C2C2E', borderRadius: '2px 0 0 2px' }}/>
          <div style={{ position: 'absolute', left: '-4px', top: '168px', width: '4px', height: '60px', background: '#2C2C2E', borderRadius: '2px 0 0 2px' }}/>
          <div style={{ position: 'absolute', left: '-4px', top: '240px', width: '4px', height: '60px', background: '#2C2C2E', borderRadius: '2px 0 0 2px' }}/>
          <div style={{ position: 'absolute', right: '-4px', top: '164px', width: '4px', height: '76px', background: '#2C2C2E', borderRadius: '0 2px 2px 0' }}/>

          {/* Shine */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '52px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}/>
        </div>
      </div>

      {/* ── Branding panel ── */}
      <div style={{ maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* Logo */}
        <div>
          <div style={{
            width: '56px', height: '56px', borderRadius: '18px',
            background: 'linear-gradient(135deg, #DC143C, #A50E2D)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(220,20,60,0.4)',
            marginBottom: '20px',
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>
          <h1 style={{ fontSize: '44px', fontWeight: 900, color: 'white', letterSpacing: '-2.5px', marginBottom: '12px', lineHeight: 1 }}>
            Sahayatri
          </h1>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, maxWidth: '300px' }}>
            Companion in life's journey. Care for your family from anywhere in the world.
          </p>
        </div>

        {/* Features */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { emoji: '🏠', title: 'Elder Care at Home', desc: 'Verified companions visit your parents daily' },
            { emoji: '📸', title: 'Daily Photo Updates', desc: 'Know they are safe every morning' },
            { emoji: '💳', title: 'eSewa & Khalti Payments', desc: 'Secure, instant, Nepali-first' },
            { emoji: '⚖️', title: 'Legally Verified Companions', desc: 'Background checked, contract signed' },
            { emoji: '🆘', title: 'Emergency SOS', desc: 'One tap alerts family and companion' },
          ].map((f, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              padding: '13px 16px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '14px',
            }}>
              <span style={{ fontSize: '20px' }}>{f.emoji}</span>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.9)', marginBottom: '2px' }}>{f.title}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {[
            { val: '500+', label: 'Families' },
            { val: '4.9★', label: 'Rating' },
            { val: '98%', label: 'Satisfaction' },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1, padding: '14px 10px', textAlign: 'center',
              background: 'rgba(220,20,60,0.06)',
              border: '1px solid rgba(220,20,60,0.12)',
              borderRadius: '14px',
            }}>
              <p style={{ fontSize: '18px', fontWeight: 900, color: '#DC143C', letterSpacing: '-0.5px', marginBottom: '4px' }}>{s.val}</p>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>{s.label}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.18)', lineHeight: 1.7 }}>
          Built for the Nepali community worldwide · 100% ad-free · Your data stays private
        </p>
      </div>
    </div>
  )
}
