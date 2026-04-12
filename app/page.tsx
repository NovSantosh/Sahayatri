'use client'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { brand } from './design-system'
import { HeartIcon, SahayatriLogo } from './components/Icons'

export default function Landing() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') router.push('/home')
  }, [status])

  if (status === 'loading' || status === 'authenticated') return (
    <div style={{minHeight: '100vh', background: '#06040C', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{width: '52px', height: '52px', borderRadius: '50%', background: brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'breathe 2s ease infinite', boxShadow: '0 6px 24px rgba(220,20,60,0.4)'}}>
        <SahayatriLogo size={30} color="white"/>
      </div>
      <style>{`@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}`}</style>
    </div>
  )

  return (
    <div style={{minHeight: '100vh', background: '#06040C', fontFamily: 'Inter, -apple-system, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden'}}>

      <div style={{position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,0,30,0.25) 0%, transparent 70%)', pointerEvents: 'none'}}/>

      {/* Logo */}
      <div style={{padding: '80px 28px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1}}>
        <div style={{width: '80px', height: '80px', borderRadius: '28px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 40px rgba(220,20,60,0.4)', marginBottom: '24px'}}>
          <SahayatriLogo size={48} color="white"/>
        </div>
        <h1 style={{fontSize: '38px', fontWeight: 900, color: 'white', letterSpacing: '-1.5px', marginBottom: '12px', textAlign: 'center'}}>Sahayatri</h1>
        <p style={{fontSize: '16px', color: 'rgba(255,255,255,0.5)', textAlign: 'center', lineHeight: 1.6, maxWidth: '260px'}}>
          Care for your family from anywhere in the world.
        </p>
      </div>

      {/* What we offer */}
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 24px 32px', position: 'relative', zIndex: 1}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px'}}>
          {[
            { icon: '��', title: 'Elder Care', desc: 'Verified companions visit your parents daily' },
            { icon: '📸', title: 'Photo Updates', desc: 'Know they are safe every morning' },
            { icon: '🏠', title: 'Home Services', desc: 'Electrician, plumber and more at fixed prices' },
            { icon: '💰', title: 'Want to earn?', desc: 'Switch to companion mode anytime after signup' },
          ].map((item, i) => (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '14px 16px'}}>
              <span style={{fontSize: '24px', flexShrink: 0}}>{item.icon}</span>
              <div>
                <p style={{fontSize: '14px', fontWeight: 700, color: 'white', marginBottom: '2px'}}>{item.title}</p>
                <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.4)'}}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <button onClick={() => router.push('/signup')}
            style={{width: '100%', padding: '18px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '18px', color: 'white', fontSize: '17px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 32px rgba(220,20,60,0.4)', letterSpacing: '-0.3px'}}>
            Get Started Free
          </button>
          <button onClick={() => router.push('/login')}
            style={{width: '100%', padding: '16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '18px', color: 'rgba(255,255,255,0.8)', fontSize: '16px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
            Sign In
          </button>
        </div>

        <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: '20px', lineHeight: 1.6}}>
          Built for the Nepali community · 100% ad-free · Your data stays private
        </p>
      </div>
    </div>
  )
}
