'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Welcome() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: '#06040C',
      fontFamily: 'Inter, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── Deep background layers ── */}
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(139,0,30,0.45) 0%, transparent 70%)', pointerEvents: 'none'}}/>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 80% 80%, rgba(30,0,60,0.6) 0%, transparent 70%)', pointerEvents: 'none'}}/>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 40% at 20% 60%, rgba(0,30,80,0.4) 0%, transparent 70%)', pointerEvents: 'none'}}/>

      {/* ── Floating particles ── */}
      {[
        {top: '15%', left: '10%', size: 3, delay: '0s', dur: '4s'},
        {top: '25%', left: '85%', size: 2, delay: '1s', dur: '5s'},
        {top: '45%', left: '5%', size: 2, delay: '2s', dur: '3.5s'},
        {top: '60%', left: '90%', size: 3, delay: '0.5s', dur: '4.5s'},
        {top: '75%', left: '15%', size: 2, delay: '1.5s', dur: '5s'},
        {top: '35%', left: '75%', size: 1.5, delay: '3s', dur: '4s'},
        {top: '80%', left: '70%', size: 2, delay: '2s', dur: '3s'},
      ].map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: p.top,
          left: p.left,
          width: `${p.size}px`,
          height: `${p.size}px`,
          borderRadius: '50%',
          background: 'rgba(220,20,60,0.6)',
          animation: `float ${p.dur} ease-in-out ${p.delay} infinite`,
          pointerEvents: 'none',
        }}/>
      ))}

      {/* ── Top nav ── */}
      <div style={{padding: '56px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 10}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          {/* Logo mark */}
          <div style={{width: '32px', height: '32px', borderRadius: '10px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(220,20,60,0.4)'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.759 3.8 1 7.2 1c1.98 0 3.72.99 4.8 2.52C13.08 1.99 14.82 1 16.8 1 20.2 1 23 3.759 23 7.191c0 4.105-5.37 8.863-11 14.402z" fill="white"/>
            </svg>
          </div>
          <span style={{fontSize: '18px', fontWeight: 800, color: 'white', letterSpacing: '-0.5px'}}>Sahayatri</span>
        </div>
        <Link href="/login" style={{fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', padding: '8px 16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', backdropFilter: 'blur(10px)'}}>
          Sign in
        </Link>
      </div>

      {/* ── Hero ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px 0',
        position: 'relative',
        zIndex: 10,
        opacity: loaded ? 1 : 0,
        transform: loaded ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(220,20,60,0.12)',
          border: '1px solid rgba(220,20,60,0.25)',
          borderRadius: '20px',
          padding: '6px 14px',
          marginBottom: '32px',
        }}>
          <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#DC143C', boxShadow: '0 0 8px rgba(220,20,60,0.8)', animation: 'pulse 2s ease infinite'}}/>
          <span style={{fontSize: '11px', fontWeight: 700, color: 'rgba(220,20,60,0.9)', letterSpacing: '1px', textTransform: 'uppercase'}}>For Nepali Families Worldwide</span>
        </div>

        {/* Main headline */}
        <h1 style={{
          fontSize: '52px',
          fontWeight: 900,
          color: 'white',
          textAlign: 'center',
          lineHeight: 1.05,
          letterSpacing: '-2.5px',
          marginBottom: '20px',
          maxWidth: '340px',
        }}>
          Feel
          <span style={{
            display: 'block',
            background: 'linear-gradient(135deg, #FF4060, #DC143C, #FF6B35)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Present.</span>
          Always.
        </h1>

        {/* Sub */}
        <p style={{
          fontSize: '16px',
          color: 'rgba(255,255,255,0.38)',
          textAlign: 'center',
          lineHeight: 1.7,
          marginBottom: '48px',
          maxWidth: '280px',
          fontWeight: 400,
        }}>
          Care, connection and community — for every Nepali family, wherever you are in the world.
        </p>

        {/* Social proof */}
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px'}}>
          <div style={{display: 'flex'}}>
            {['KP','SR','AM','BT'].map((init, i) => (
              <div key={i} style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: `hsl(${i * 40 + 340}, 70%, 45%)`,
                border: '2px solid #06040C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                fontWeight: 800,
                color: 'white',
                marginLeft: i > 0 ? '-8px' : '0',
              }}>{init}</div>
            ))}
          </div>
          <div>
            <div style={{display: 'flex', gap: '1px', marginBottom: '2px'}}>
              {[1,2,3,4,5].map(s => <span key={s} style={{fontSize: '10px', color: '#F59E0B'}}>★</span>)}
            </div>
            <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: 500}}>Loved by families in 12 countries</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '320px'}}>
          <Link href="/signup" style={{
            textDecoration: 'none',
            display: 'block',
            width: '100%',
            padding: '17px',
            background: 'linear-gradient(135deg, #DC143C 0%, #A50E2D 100%)',
            color: 'white',
            borderRadius: '16px',
            fontSize: '16px',
            fontWeight: 800,
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(220,20,60,0.4), 0 2px 8px rgba(220,20,60,0.2)',
            letterSpacing: '-0.3px',
            boxSizing: 'border-box',
          } as any}>
            Get Started — It's Free
          </Link>

          <Link href="/login" style={{
            textDecoration: 'none',
            display: 'block',
            width: '100%',
            padding: '17px',
            background: 'rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            fontSize: '15px',
            fontWeight: 600,
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            boxSizing: 'border-box',
          } as any}>
            I already have an account
          </Link>
        </div>
      </div>

      {/* ── Feature pills scrolling row ── */}
      <div style={{
        padding: '40px 0 0',
        position: 'relative',
        zIndex: 10,
        opacity: loaded ? 1 : 0,
        transition: 'opacity 1.2s ease 0.3s',
        overflow: 'hidden',
      }}>
        <div style={{display: 'flex', gap: '10px', paddingLeft: '24px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '0'}}>
          {[
            {icon: '🤖', label: 'Sathi AI Companion'},
            {icon: '❤️', label: 'Memory Feed'},
            {icon: '👨‍👩‍👧', label: 'Family Room'},
            {icon: '📅', label: 'Book Companions'},
            {icon: '💳', label: 'eSewa · Khalti'},
            {icon: '🔔', label: 'Real Notifications'},
            {icon: '🇳🇵', label: 'Nepal-First'},
          ].map((f, i) => (
            <div key={i} style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '8px 14px',
              backdropFilter: 'blur(10px)',
            }}>
              <span style={{fontSize: '14px'}}>{f.icon}</span>
              <span style={{fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap'}}>{f.label}</span>
            </div>
          ))}
          <div style={{width: '24px', flexShrink: 0}}/>
        </div>
      </div>

      {/* ── Bottom trust bar ── */}
      <div style={{
        padding: '28px 24px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        position: 'relative',
        zIndex: 10,
        opacity: loaded ? 1 : 0,
        transition: 'opacity 1.4s ease 0.5s',
      }}>
        {[
          {icon: '🔒', label: 'Private & Secure'},
          {icon: '🚫', label: 'No Ads. Ever.'},
          {icon: '🇳🇵', label: 'Built for Nepal', href: '/about'},
        ].map((t, i) => (
          <div key={i} style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
            <span style={{fontSize: '12px'}}>{t.icon}</span>
            <span style={{fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.25)'}}>{t.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.4; }
          50% { transform: translateY(-12px); opacity: 0.9; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}
