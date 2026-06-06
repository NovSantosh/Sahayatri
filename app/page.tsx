'use client'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import * as ds from './design-system'
import { SahayatriLogo } from './components/Icons'

const t = ds.light

const FEATURES = [
  { title: 'Elder Care at Home', desc: 'Verified companions visit your parents daily in Nepal', color: '#DC143C', bg: 'rgba(220,20,60,0.12)', route: '/care',
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>) },
  { title: 'Daily Photo Updates', desc: 'Know your family is safe every single morning', color: '#7C3AED', bg: 'rgba(124,58,237,0.12)', route: '/signup',
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5" fill="white" stroke="none"/><polyline points="21 15 16 10 5 21"/></svg>) },
  { title: 'Home Services', desc: 'Electrician, plumber and more at fixed prices', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', route: '/services',
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>) },
  { title: 'Earn as a Companion', desc: 'Help Nepali families and earn from your skills', color: '#10B981', bg: 'rgba(16,185,129,0.12)', route: '/join-professional',
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>) },
]

const TRUST = [
  { val: 'Verified', label: 'Companions' },
  { val: 'Secure', label: 'Payments' },
  { val: 'Ad-free', label: 'Always' },
]

export default function Landing() {
  const { status } = useSession()
  const router = useRouter()
  const [pressed, setPressed] = useState<number | null>(null)

  useEffect(() => {
    if (status === 'authenticated') router.push('/home')
    if (status === 'unauthenticated' && typeof window !== 'undefined') {
      const seen = localStorage.getItem('onboardingSeen')
      if (!seen) router.push('/onboarding')
    }
  }, [status])

  if (status === 'loading' || status === 'authenticated') return (
    <div style={{ minHeight: '100dvh', background: t.pageBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '56px', height: '56px', borderRadius: ds.radius.lg, background: `linear-gradient(135deg, ${ds.brand.primary}, ${ds.brand.primaryDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'breathe 2s ease infinite', boxShadow: '0 8px 32px rgba(220,20,60,0.4)' }}>
        <SahayatriLogo size={32} color="white"/>
      </div>
      <style>{`@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}`}</style>
    </div>
  )

  const cardBase = { background: t.cardBg, border: `1px solid ${t.border}`, boxShadow: t.shadow }

  return (
    <div style={{ minHeight: '100dvh', background: t.pageBg, fontFamily: 'Inter, -apple-system, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      <div style={{ position: 'absolute', top: '-100px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,20,60,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)', pointerEvents: 'none' }}/>

      <div style={{ padding: `72px ${ds.space['2xl']} 0`, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div className="anim" style={{ animationDelay: '0ms', width: '88px', height: '88px', borderRadius: '28px', background: `linear-gradient(135deg, ${ds.brand.primary}, ${ds.brand.primaryDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 48px rgba(220,20,60,0.3)', marginBottom: ds.space.xl, position: 'relative' }}>
          <SahayatriLogo size={52} color="white"/>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', borderRadius: '28px 28px 0 0', background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)', pointerEvents: 'none' }}/>
        </div>

        <h1 className="anim" style={{ animationDelay: '60ms', ...ds.type.hero, color: t.text1, marginBottom: ds.space.sm, textAlign: 'center' }}>Sahayatri</h1>
        <p className="anim" style={{ animationDelay: '120ms', ...ds.type.body, color: t.text3, textAlign: 'center', maxWidth: '240px' }}>साथयात्री — Companion in life's journey</p>

        <div className="anim" style={{ animationDelay: '180ms', display: 'flex', gap: ds.space.sm, marginTop: ds.space.md, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['🇳🇵 Made for Nepalis', '100% Ad-free', 'Legally verified'].map((badge, i) => (
            <div key={i} style={{ padding: `4px 10px`, ...cardBase, borderRadius: ds.radius.full }}>
              <p style={{ ...ds.type.caption, color: t.text3, margin: 0 }}>{badge}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: `${ds.space['2xl']} ${ds.space.xl} ${ds.space.xl}`, position: 'relative', zIndex: 1 }}>
        <p className="anim" style={{ animationDelay: '220ms', ...ds.type.label, color: t.text3, marginBottom: ds.space.md, paddingLeft: ds.space.xs }}>What we offer</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: ds.space.sm, marginBottom: ds.space['2xl'] }}>
          {FEATURES.map((item, i) => (
            <div key={i} onClick={() => router.push('/signup')} className="anim pressable"
              onTouchStart={() => setPressed(i)} onTouchEnd={() => setPressed(null)}
              style={{ animationDelay: `${260 + i * 60}ms`, display: 'flex', alignItems: 'center', gap: ds.space.lg, background: pressed === i ? item.bg : t.cardBg, border: `1px solid ${pressed === i ? item.color + '30' : t.border}`, borderRadius: ds.radius.lg, padding: `14px 16px`, cursor: 'pointer', boxShadow: t.shadow }}>
              <div style={{ width: '44px', height: '44px', borderRadius: ds.radius.md, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${item.color}, ${item.color}AA)` }}/>
                <div style={{ position: 'relative', zIndex: 1 }}>{item.icon}</div>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ ...ds.type.h3, color: t.text1, marginBottom: '3px' }}>{item.title}</p>
                <p style={{ ...ds.type.caption, color: t.text3, lineHeight: 1.4 }}>{item.desc}</p>
              </div>
              <div style={{ width: '28px', height: '28px', borderRadius: ds.radius.sm, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
              </div>
            </div>
          ))}
        </div>

        <div className="anim" style={{ animationDelay: '520ms', display: 'flex', gap: ds.space.sm, marginBottom: ds.space.xl }}>
          {TRUST.map((s, i) => (
            <div key={i} style={{ flex: 1, padding: `12px 8px`, textAlign: 'center', ...cardBase, borderRadius: ds.radius.md }}>
              <p style={{ ...ds.type.h3, color: ds.brand.primary, marginBottom: '3px' }}>{s.val}</p>
              <p style={{ ...ds.type.caption, color: t.text3 }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div className="anim" style={{ animationDelay: '580ms', display: 'flex', flexDirection: 'column', gap: ds.space.md }}>
          <button onClick={() => router.push('/signup')} className="pressable"
            style={{ width: '100%', padding: '18px', background: `linear-gradient(135deg, ${ds.brand.primary}, ${ds.brand.primaryDark})`, border: 'none', borderRadius: ds.radius.xl, color: 'white', ...ds.type.h3, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 32px rgba(220,20,60,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: ds.space.sm }}>
            Get Started Free
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button onClick={() => router.push('/login')} className="pressable"
            style={{ width: '100%', padding: '16px', background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: ds.radius.xl, color: t.text1, ...ds.type.h3, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: t.shadow }}>
            Sign In to your account
          </button>
        </div>

        <p className="anim" style={{ animationDelay: '640ms', ...ds.type.caption, color: t.text4, textAlign: 'center', marginTop: ds.space.md, lineHeight: 1.6 }}>
          Your data stays private · Never shared · Nepal law compliant
        </p>
      </div>

      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .anim{opacity:0;animation:fadeUp .55s cubic-bezier(.22,1,.36,1) forwards}
        .pressable{transition:transform .15s cubic-bezier(.4,0,.2,1)}
        .pressable:active{transform:scale(.97)}
      `}</style>
    </div>
  )
}
