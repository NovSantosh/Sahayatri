'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BottomNav from '../components/BottomNav'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Care & Companions')

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status])

  if (status === 'loading') {
    return <div style={{minHeight: '100vh', background: '#F5F6F8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: '#9CA3AF'}}>Loading…</div>
  }

  const name = session?.user?.name || 'Friend'
  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const companions = [
    {name: 'Ananya Singh', role: 'Elder Care · Yoga', rate: '350', rating: '4.9', initials: 'AS', color: '#DC143C'},
    {name: 'Rajan Mehta', role: 'Child Care · Tutor', rate: '300', rating: '4.8', initials: 'RM', color: '#2563EB'},
    {name: 'Meera Kapoor', role: 'Cook · Companion', rate: '280', rating: '5.0', initials: 'MK', color: '#059669'},
  ]

  const homeServices = [
    {name: 'Electrician', icon: '⚡', rate: 'NPR 800/visit'},
    {name: 'Plumber', icon: '🔧', rate: 'NPR 700/visit'},
    {name: 'Carpenter', icon: '🪚', rate: 'NPR 900/visit'},
    {name: 'House Cleaner', icon: '🧹', rate: 'NPR 600/visit'},
  ]

  return (
    <div style={{minHeight: '100vh', background: '#F5F6F8', fontFamily: 'sans-serif', paddingBottom: '80px'}}>

      <div style={{background: 'white', padding: '48px 20px 0', borderBottom: '1px solid #F0F1F3', position: 'sticky', top: 0, zIndex: 50}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px'}}>
          <div>
            <p style={{fontSize: '11px', fontWeight: 600, color: '#9CA3AF'}}>{greeting}</p>
            <h1 style={{fontSize: '22px', fontWeight: 800, color: '#111318', letterSpacing: '-0.5px', marginTop: '2px'}}>{name}</h1>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <Link href="/notifications" style={{width: '38px', height: '38px', borderRadius: '10px', border: '1px solid #E9EAEC', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', textDecoration: 'none'}}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#4A5060" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <div style={{position: 'absolute', top: '-1px', right: '-1px', width: '8px', height: '8px', borderRadius: '50%', background: '#DC143C', border: '2px solid white'}}/>
            </Link>
            <Link href="/profile" style={{width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '14px', textDecoration: 'none'}}>
              {initials}
            </Link>
          </div>
        </div>

        <Link href="/search" style={{textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', background: '#F5F6F8', border: '1px solid #E9EAEC', borderRadius: '28px', padding: '10px 16px', marginBottom: '12px'}}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span style={{fontSize: '14px', color: '#9CA3AF'}}>Search companions, services…</span>
        </Link>

        <div style={{display: 'flex', gap: '2px', padding: '3px', background: '#F5F6F8', border: '1px solid #E9EAEC', borderRadius: '28px', marginBottom: '-1px'}}>
          <button onClick={() => setActiveTab('Care & Companions')}
            style={{flex: 1, padding: '9px', borderRadius: '24px', border: 'none', background: activeTab === 'Care & Companions' ? 'white' : 'transparent', color: activeTab === 'Care & Companions' ? '#DC143C' : '#9CA3AF', fontSize: '12px', fontWeight: 700, fontFamily: 'sans-serif', boxShadow: activeTab === 'Care & Companions' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none', cursor: 'pointer'}}>
            Care & Companions
          </button>
          <button onClick={() => setActiveTab('Home Services')}
            style={{flex: 1, padding: '9px', borderRadius: '24px', border: 'none', background: activeTab === 'Home Services' ? 'white' : 'transparent', color: activeTab === 'Home Services' ? '#DC143C' : '#9CA3AF', fontSize: '12px', fontWeight: 700, fontFamily: 'sans-serif', boxShadow: activeTab === 'Home Services' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none', cursor: 'pointer'}}>
            Home Services
          </button>
        </div>
      </div>

      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px'}}>

        <Link href="/sathi" style={{textDecoration: 'none', borderRadius: '20px', overflow: 'hidden', position: 'relative', minHeight: '160px', background: 'linear-gradient(145deg, #0A0A1A, #1C0008, #0A0A1A)', display: 'block'}}>
          <div style={{position: 'absolute', top: '-30px', right: '-20px', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,20,60,0.2), transparent 70%)', filter: 'blur(20px)'}}/>
          <div style={{position: 'relative', zIndex: 1, padding: '20px'}}>
            <div style={{display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(220,20,60,0.12)', border: '1px solid rgba(220,20,60,0.25)', borderRadius: '20px', padding: '4px 10px', marginBottom: '12px'}}>
              <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#DC143C', boxShadow: '0 0 6px #DC143C'}}/>
              <span style={{fontSize: '10px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#DC143C'}}>Sathi AI · Active</span>
            </div>
            <h2 style={{fontSize: '20px', fontWeight: 800, color: 'white', lineHeight: 1.2, marginBottom: '6px'}}>
              Your family is thinking<br/>about you <span style={{fontStyle: 'italic', fontWeight: 300, color: '#93B4FA'}}>today.</span>
            </h2>
            <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginBottom: '16px'}}>Tap to connect with Sathi AI.</p>
            <div style={{display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '20px', padding: '8px 14px'}}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/></svg>
              <span style={{fontSize: '12px', fontWeight: 700, color: 'white'}}>Open Sathi</span>
            </div>
          </div>
        </Link>

        <div>
          <p style={{fontSize: '17px', fontWeight: 800, color: '#111318', marginBottom: '11px'}}>Quick Access</p>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px'}}>
            {[
              {label: 'Family Room', meta: 'View now', path: '/family', bg: '#EFF6FF', color: '#2563EB', icon: 'home'},
              {label: 'Memory', meta: 'Share moment', path: '/memory', bg: '#FEF2F2', color: '#DC143C', icon: 'heart'},
              {label: 'Wallet', meta: 'Payments', path: '/wallet', bg: '#ECFDF5', color: '#059669', icon: 'wallet'},
            ].map((item) => (
              <Link key={item.path} href={item.path} style={{textDecoration: 'none', background: 'white', borderRadius: '14px', border: '1px solid #E9EAEC', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <div style={{width: '36px', height: '36px', borderRadius: '8px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  {item.icon === 'home' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2" strokeLinecap="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
                  {item.icon === 'heart' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>}
                  {item.icon === 'wallet' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2" strokeLinecap="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>}
                </div>
                <div>
                  <p style={{fontSize: '12px', fontWeight: 700, color: '#111318'}}>{item.label}</p>
                  <p style={{fontSize: '10px', fontWeight: 600, color: '#9CA3AF', marginTop: '2px'}}>{item.meta}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {activeTab === 'Care & Companions' && (
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '11px'}}>
              <p style={{fontSize: '17px', fontWeight: 800, color: '#111318'}}>Top Companions</p>
              <span style={{fontSize: '12px', fontWeight: 700, color: '#DC143C', cursor: 'pointer'}}>View all</span>
            </div>
            <div style={{display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px'}}>
              {companions.map((p) => (
                <Link key={p.name} href={`/professional?name=${encodeURIComponent(p.name)}&role=${encodeURIComponent(p.role)}&rate=${p.rate}`}
                  style={{textDecoration: 'none', flexShrink: 0, width: '152px', background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', overflow: 'hidden'}}>
                  <div style={{height: '100px', background: `linear-gradient(135deg, ${p.color}22, ${p.color}44)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{width: '56px', height: '56px', borderRadius: '50%', background: `linear-gradient(135deg, ${p.color}, ${p.color}CC)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px', fontWeight: 800}}>{p.initials}</div>
                  </div>
                  <div style={{padding: '10px 12px'}}>
                    <p style={{fontSize: '13px', fontWeight: 800, color: '#111318'}}>{p.name}</p>
                    <p style={{fontSize: '11px', color: '#9CA3AF', marginTop: '1px'}}>{p.role}</p>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '8px'}}>
                      <span style={{fontSize: '12px', fontWeight: 700, color: '#374151'}}>NPR {p.rate}/hr</span>
                      <span style={{fontSize: '11px', color: '#9CA3AF'}}>★ {p.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Home Services' && (
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '11px'}}>
              <p style={{fontSize: '17px', fontWeight: 800, color: '#111318'}}>Home Services</p>
              <Link href="/services" style={{fontSize: '12px', fontWeight: 700, color: '#DC143C', textDecoration: 'none'}}>View all</Link>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
              {homeServices.map((s) => (
                <Link key={s.name} href="/services" style={{textDecoration: 'none', background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  <div style={{fontSize: '28px'}}>{s.icon}</div>
                  <p style={{fontSize: '14px', fontWeight: 800, color: '#111318'}}>{s.name}</p>
                  <p style={{fontSize: '12px', fontWeight: 600, color: '#DC143C'}}>{s.rate}</p>
                </Link>
              ))}
            </div>
            <Link href="/services" style={{textDecoration: 'none', display: 'block', marginTop: '10px', padding: '14px', background: 'white', border: '1px solid #E9EAEC', borderRadius: '14px', textAlign: 'center', fontSize: '14px', fontWeight: 700, color: '#DC143C'}}>
              See All Home Services →
            </Link>
          </div>
        )}

        <div style={{borderRadius: '20px', padding: '20px', background: 'linear-gradient(135deg, #0A0A1A, #1C0008)', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(220,20,60,0.15)', pointerEvents: 'none'}}/>
          <p style={{fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(220,20,60,0.7)', marginBottom: '6px', position: 'relative', zIndex: 1}}>For Professionals</p>
          <p style={{fontSize: '18px', fontWeight: 800, color: 'white', lineHeight: 1.3, marginBottom: '14px', position: 'relative', zIndex: 1}}>Earn NPR 40,000+ a month on your own terms.</p>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'white', borderRadius: '20px', padding: '9px 18px', position: 'relative', zIndex: 1, cursor: 'pointer'}} onClick={() => router.push('/join-professional')}>
            <span style={{fontSize: '13px', fontWeight: 800, color: '#DC143C'}}>Join Free</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DC143C" strokeWidth="3" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>

      </div>
      <BottomNav />
    </div>
  )
}
