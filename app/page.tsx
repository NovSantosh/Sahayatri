import Link from 'next/link'

export default function Home() {
  return (
    <div style={{minHeight: '100vh', background: '#06060F', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden'}}>

      <div style={{position: 'absolute', top: '-20%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,20,60,0.18) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none'}}/>
      <div style={{position: 'absolute', bottom: '-10%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,56,147,0.15) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none'}}/>

      <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', zIndex: 1}}>

        {/* Badge */}
        <div style={{marginBottom: '32px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '20px', background: 'rgba(220,20,60,0.1)', border: '1px solid rgba(220,20,60,0.25)'}}>
            <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#DC143C', boxShadow: '0 0 8px #DC143C'}}/>
            <span style={{fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#DC143C'}}>Now available in Nepal</span>
          </div>
        </div>

        {/* Logo */}
        <div style={{marginBottom: '24px', position: 'relative'}}>
          <div style={{width: '96px', height: '96px', borderRadius: '24px', background: 'linear-gradient(145deg, #1C0008, #2D0012)', border: '1px solid rgba(220,20,60,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 50px rgba(220,20,60,0.3)'}}>
            <svg width="56" height="56" viewBox="0 0 72 72" fill="none">
              <circle cx="26" cy="16" r="6" fill="white"/>
              <path d="M26 22 L26 42" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
              <path d="M26 28 L34 32" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <path d="M26 28 L18 32" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <path d="M26 42 L20 56" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <path d="M26 42 L32 56" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="46" cy="20" r="5" fill="#DC143C" style={{filter: 'drop-shadow(0 0 6px rgba(220,20,60,0.8))'}}/>
              <path d="M46 25 L46 43" stroke="#DC143C" strokeWidth="3" strokeLinecap="round"/>
              <path d="M46 31 L38 33" stroke="#DC143C" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M46 31 L54 33" stroke="#DC143C" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M46 43 L40 56" stroke="#DC143C" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M46 43 L52 56" stroke="#DC143C" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M36 24 C36 24 33.5 21.5 33.5 19.8 C33.5 18.5 34.4 17.5 35.5 17.5 C36 17.5 36.5 17.8 36.8 18.2 C37.1 17.8 37.6 17.5 38.1 17.5 C39.2 17.5 40.1 18.5 40.1 19.8 C40.1 21.5 37.6 24 37.6 24 Z" fill="#DC143C" opacity="0.8"/>
            </svg>
          </div>
        </div>

        {/* Name */}
        <h1 style={{fontSize: '48px', fontWeight: 800, color: 'white', letterSpacing: '-2px', lineHeight: 1, marginBottom: '8px', textAlign: 'center'}}>
          Sahayatri
        </h1>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px'}}>
          <div style={{height: '1px', width: '40px', background: 'linear-gradient(to right, transparent, rgba(220,20,60,0.6))'}}/>
          <p style={{fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(220,20,60,0.8)'}}>Your Fellow Traveler</p>
          <div style={{height: '1px', width: '40px', background: 'linear-gradient(to left, transparent, rgba(220,20,60,0.6))'}}/>
        </div>

        {/* Headline */}
        <h2 style={{fontSize: '24px', fontWeight: 700, color: 'white', textAlign: 'center', lineHeight: 1.3, marginBottom: '10px', letterSpacing: '-0.5px'}}>
          The distance never has to feel{' '}
          <span style={{fontWeight: 300, fontStyle: 'italic', color: '#93B4FA'}}>this far.</span>
        </h2>
        <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.38)', textAlign: 'center', lineHeight: 1.6, marginBottom: '40px', maxWidth: '300px'}}>
          Care, connection and community — for every Nepali family, wherever you are in the world.
        </p>

        {/* Buttons */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '320px'}}>
          <Link href="/signup" style={{textDecoration: 'none', width: '100%', padding: '16px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: 800, cursor: 'pointer', textAlign: 'center', boxShadow: '0 4px 20px rgba(220,20,60,0.4)', display: 'block'}}>
            Get Started — Free
          </Link>
          <Link href="/login" style={{textDecoration: 'none', width: '100%', padding: '16px', background: 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', textAlign: 'center', display: 'block'}}>
            Sign In
          </Link>
        </div>

        <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.2)', marginTop: '28px', textAlign: 'center'}}>
          No ads · GDPR compliant · 🇳🇵 Proudly built for Nepal
        </p>

      </div>
    </div>
  )
}
