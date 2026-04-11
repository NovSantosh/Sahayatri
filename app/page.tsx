'use client'
import { useRouter } from 'next/navigation'
import { brand } from './design-system'
import { HeartIcon, SparkleIcon, SahayatriLogo } from './components/Icons'

export default function Landing() {
  const router = useRouter()

  return (
    <div style={{minHeight: '100vh', background: '#06040C', fontFamily: 'Inter, -apple-system, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden'}}>

      {/* Background glows */}
      <div style={{position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,0,30,0.25) 0%, transparent 70%)', pointerEvents: 'none'}}/>
      <div style={{position: 'absolute', bottom: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(93,45,145,0.15) 0%, transparent 70%)', pointerEvents: 'none'}}/>

      {/* Logo */}
      <div style={{padding: '64px 28px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1}}>
        <div style={{width: '72px', height: '72px', borderRadius: '24px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(220,20,60,0.4)', marginBottom: '20px'}}>
          <SahayatriLogo size={42} color="white"/>
        </div>
        <h1 style={{fontSize: '34px', fontWeight: 900, color: 'white', letterSpacing: '-1.5px', marginBottom: '8px', textAlign: 'center'}}>Sahayatri</h1>
        <p style={{fontSize: '15px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', lineHeight: 1.6, maxWidth: '240px'}}>
          Companion in life's journey.<br/>Care for your family from anywhere.
        </p>
      </div>

      {/* Two paths */}
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 24px', gap: '14px', position: 'relative', zIndex: 1}}>

        <p style={{fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center', marginBottom: '8px'}}>
          How would you like to join?
        </p>

        {/* Path 1 — Find care */}
        <div onClick={() => router.push('/home')}
          style={{background: 'linear-gradient(135deg, #DC143C 0%, #A50E2D 100%)', borderRadius: '24px', padding: '26px', cursor: 'pointer', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 40px rgba(220,20,60,0.4)', border: '1px solid rgba(255,255,255,0.1)', transition: 'transform 0.15s ease'}}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          onTouchStart={e => (e.currentTarget.style.transform = 'scale(0.97)')}
          onTouchEnd={e => { e.currentTarget.style.transform = 'scale(1)'; router.push('/home') }}>
          <div style={{position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none'}}/>
          <div style={{position: 'relative', zIndex: 1}}>
            <div style={{width: '52px', height: '52px', borderRadius: '18px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.2)'}}>
              <HeartIcon size={28} color="white" filled strokeWidth={0}/>
            </div>
            <h2 style={{fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '8px', letterSpacing: '-0.5px', lineHeight: 1.2}}>
              I need care<br/>for my family
            </h2>
            <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '20px'}}>
              Book verified companions for your parents in Nepal. Get photo updates every day from anywhere in the world.
            </p>
            <div style={{display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px'}}>
              {['Daily check-ins', 'Medical escort', 'Home repairs', 'Meal service'].map((tag, i) => (
                <div key={i} style={{background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '9999px', padding: '4px 12px'}}>
                  <span style={{fontSize: '11px', fontWeight: 600, color: 'white'}}>{tag}</span>
                </div>
              ))}
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <span style={{fontSize: '15px', fontWeight: 800, color: 'white'}}>Get started free</span>
              <div style={{width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Path 2 — Provide care */}
        <div onClick={() => router.push('/join-professional')}
          style={{background: 'rgba(255,255,255,0.05)', borderRadius: '24px', padding: '26px', cursor: 'pointer', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', transition: 'transform 0.15s ease'}}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          onTouchStart={e => (e.currentTarget.style.transform = 'scale(0.97)')}
          onTouchEnd={e => { e.currentTarget.style.transform = 'scale(1)'; router.push('/join-professional') }}>
          <div style={{position: 'absolute', top: '-30px', right: '-30px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(124,58,237,0.15)', pointerEvents: 'none'}}/>
          <div style={{position: 'relative', zIndex: 1}}>
            <div style={{width: '52px', height: '52px', borderRadius: '18px', background: 'rgba(124,58,237,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid rgba(124,58,237,0.3)'}}>
              <SparkleIcon size={26} color="#A78BFA" strokeWidth={2}/>
            </div>
            <h2 style={{fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '8px', letterSpacing: '-0.5px', lineHeight: 1.2}}>
              I want to<br/>provide care
            </h2>
            <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '20px'}}>
              Join as a verified companion or service professional. Earn NPR 25,000–40,000 per month on your own schedule.
            </p>
            <div style={{display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px'}}>
              {['Elder care', 'Home cook', 'Electrician', 'Plumber'].map((tag, i) => (
                <div key={i} style={{background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', padding: '4px 12px'}}>
                  <span style={{fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.6)'}}>{tag}</span>
                </div>
              ))}
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <span style={{fontSize: '15px', fontWeight: 800, color: 'rgba(255,255,255,0.7)'}}>Apply now — free</span>
              <div style={{width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Sign in link */}
        <div style={{textAlign: 'center', paddingTop: '4px'}}>
          <span style={{fontSize: '14px', color: 'rgba(255,255,255,0.3)'}}>Already have an account? </span>
          <span onClick={() => router.push('/login')}
            style={{fontSize: '14px', fontWeight: 700, color: brand.primary, cursor: 'pointer'}}>
            Sign in
          </span>
        </div>

      </div>

      {/* Footer */}
      <div style={{padding: '0 24px 40px', textAlign: 'center', position: 'relative', zIndex: 1}}>
        <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.15)', lineHeight: 1.8}}>
          Built for the Nepali community · 100% ad-free · Your data stays private
        </p>
      </div>

      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </div>
  )
}
