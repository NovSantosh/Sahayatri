import BottomNav from './components/BottomNav'

export default function Home() {
  return (
    <div style={{minHeight: '100vh', background: '#F5F6F8', fontFamily: 'sans-serif', paddingBottom: '80px'}}>

      <div style={{background: 'white', padding: '48px 20px 0', borderBottom: '1px solid #F0F1F3', position: 'sticky', top: 0, zIndex: 50}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px'}}>
          <div>
            <p style={{fontSize: '11px', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.3px'}}>Good morning</p>
            <h1 style={{fontSize: '22px', fontWeight: 800, color: '#111318', letterSpacing: '-0.5px', marginTop: '1px'}}>Priya Sharma</h1>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <div style={{width: '38px', height: '38px', borderRadius: '10px', border: '1px solid #E9EAEC', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer'}}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#4A5060" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <div style={{position: 'absolute', top: '-1px', right: '-1px', width: '8px', height: '8px', borderRadius: '50%', background: '#DC143C', border: '2px solid white'}}/>
            </div>
            <div style={{width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '14px', cursor: 'pointer'}}>P</div>
          </div>
        </div>

        <div style={{display: 'flex', alignItems: 'center', gap: '10px', background: '#F5F6F8', border: '1px solid #E9EAEC', borderRadius: '28px', padding: '10px 16px', marginBottom: '12px'}}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span style={{fontSize: '14px', color: '#9CA3AF'}}>Search companions, services…</span>
        </div>

        <div style={{display: 'flex', gap: '2px', padding: '3px', background: '#F5F6F8', border: '1px solid #E9EAEC', borderRadius: '28px', marginBottom: '-1px'}}>
          <button style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '9px 10px', borderRadius: '24px', border: 'none', background: 'white', color: '#DC143C', fontSize: '12px', fontWeight: 700, fontFamily: 'sans-serif', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', cursor: 'pointer'}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            Care & Companions
          </button>
          <button style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '9px 10px', borderRadius: '24px', border: 'none', background: 'transparent', color: '#9CA3AF', fontSize: '12px', fontWeight: 700, fontFamily: 'sans-serif', cursor: 'pointer'}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            Home Services
          </button>
        </div>
      </div>

      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px'}}>

        {/* Sathi Hero */}
        <a href="/sathi" style={{textDecoration: 'none', borderRadius: '20px', overflow: 'hidden', position: 'relative', minHeight: '160px', background: 'linear-gradient(145deg, #0A0A1A, #1C0008, #0A0A1A)', display: 'block'}}>
          <div style={{position: 'absolute', top: '-30px', right: '-20px', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,20,60,0.2), transparent 70%)', filter: 'blur(20px)'}}/>
          <div style={{position: 'relative', zIndex: 1, padding: '20px'}}>
            <div style={{display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(220,20,60,0.12)', border: '1px solid rgba(220,20,60,0.25)', borderRadius: '20px', padding: '4px 10px', marginBottom: '12px'}}>
              <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#DC143C', boxShadow: '0 0 6px #DC143C'}}/>
              <span style={{fontSize: '10px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#DC143C'}}>Sathi AI · Active</span>
            </div>
            <h2 style={{fontSize: '20px', fontWeight: 800, color: 'white', lineHeight: 1.2, letterSpacing: '-0.3px', marginBottom: '6px'}}>Your mother asked<br/>about you <em style={{fontStyle: 'italic', fontWeight: 300, color: '#93B4FA'}}>today.</em></h2>
            <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginBottom: '16px'}}>Tap to hear her voice — and let her hear yours.</p>
            <div style={{display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '20px', padding: '8px 14px'}}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/></svg>
              <span style={{fontSize: '12px', fontWeight: 700, color: 'white'}}>Open Sathi</span>
            </div>
          </div>
        </a>

        {/* Quick Access */}
        <div>
          <p style={{fontSize: '17px', fontWeight: 800, color: '#111318', letterSpacing: '-0.3px', marginBottom: '11px'}}>Quick Access</p>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px'}}>
            {[
              {label: 'Family Room', meta: 'Ananya active', path: '/family', bg: '#EFF6FF', color: '#2563EB', icon: 'home'},
              {label: 'Memory', meta: '3 new today', path: '/memory', bg: '#FEF2F2', color: '#DC143C', icon: 'heart'},
              {label: 'Wallet', meta: '₹12,450', path: '/wallet', bg: '#ECFDF5', color: '#059669', icon: 'wallet'},
            ].map((item) => (
              <a key={item.path} href={item.path} style={{textDecoration: 'none', background: 'white', borderRadius: '14px', border: '1px solid #E9EAEC', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 1px 2px rgba(0,0,0,0.04)'}}>
                <div style={{width: '36px', height: '36px', borderRadius: '8px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  {item.icon === 'home' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2" strokeLinecap="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
                  {item.icon === 'heart' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>}
                  {item.icon === 'wallet' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2" strokeLinecap="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>}
                </div>
                <div>
                  <p style={{fontSize: '12px', fontWeight: 700, color: '#111318'}}>{item.label}</p>
                  <p style={{fontSize: '10px', fontWeight: 600, color: '#9CA3AF', marginTop: '2px'}}>{item.meta}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Top Companions */}
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '11px'}}>
            <p style={{fontSize: '17px', fontWeight: 800, color: '#111318', letterSpacing: '-0.3px'}}>Top Companions</p>
            <span style={{fontSize: '12px', fontWeight: 700, color: '#DC143C', cursor: 'pointer'}}>View all</span>
          </div>
          <div style={{display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px'}}>
            {[
              {name: 'Ananya Singh', role: 'Elder Care · Yoga', rate: '₹350/hr', rating: '4.9', initials: 'AS', color: '#DC143C', path: '/professional'},
              {name: 'Rajan Mehta', role: 'Child Care · Tutor', rate: '₹300/hr', rating: '4.8', initials: 'RM', color: '#2563EB', path: '/professional'},
              {name: 'Meera Kapoor', role: 'Cook · Companion', rate: '₹280/hr', rating: '5.0', initials: 'MK', color: '#059669', path: '/professional'},
            ].map((p) => (
              <a key={p.name} href={p.path} style={{textDecoration: 'none', flexShrink: 0, width: '152px', background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.04)'}}>
                <div style={{height: '100px', background: `linear-gradient(135deg, ${p.color}22, ${p.color}44)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <div style={{width: '56px', height: '56px', borderRadius: '50%', background: `linear-gradient(135deg, ${p.color}, ${p.color}CC)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px', fontWeight: 800}}>{p.initials}</div>
                </div>
                <div style={{padding: '10px 12px'}}>
                  <p style={{fontSize: '13px', fontWeight: 800, color: '#111318'}}>{p.name}</p>
                  <p style={{fontSize: '11px', color: '#9CA3AF', marginTop: '1px', fontWeight: 500}}>{p.role}</p>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px'}}>
                    <span style={{fontSize: '12px', fontWeight: 700, color: '#374151'}}>{p.rate}</span>
                    <span style={{fontSize: '11px', color: '#9CA3AF'}}>⭐ {p.rating}</span>
                  </div>
                  <div style={{display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#ECFDF5', padding: '2px 6px', borderRadius: '4px', marginTop: '6px'}}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{fontSize: '9px', fontWeight: 800, color: '#059669'}}>Verified</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Join Pro */}
        <div style={{borderRadius: '20px', padding: '20px', background: 'linear-gradient(135deg, #0A0A1A, #1C0008)', position: 'relative', overflow: 'hidden', cursor: 'pointer'}}>
          <div style={{position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(220,20,60,0.15)'}}/>
          <p style={{fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(220,20,60,0.7)', marginBottom: '6px', position: 'relative', zIndex: 1}}>For Professionals</p>
          <p style={{fontSize: '18px', fontWeight: 800, color: 'white', lineHeight: 1.3, letterSpacing: '-0.3px', marginBottom: '14px', position: 'relative', zIndex: 1}}>Earn ₹40,000+ a month on your own terms.</p>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'white', borderRadius: '20px', padding: '9px 18px', position: 'relative', zIndex: 1}}>
            <span style={{fontSize: '13px', fontWeight: 800, color: '#DC143C'}}>Join Free</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DC143C" strokeWidth="3" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>

      </div>

      <BottomNav />
    </div>
  )
}
