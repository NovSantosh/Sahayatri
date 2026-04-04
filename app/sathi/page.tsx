export default function Sathi() {
  return (
    <div style={{minHeight: '100vh', background: '#06060F', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden'}}>

      {/* Background glows */}
      <div style={{position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none'}}/>
      <div style={{position: 'absolute', bottom: '20%', right: '-10%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none'}}/>

      {/* Back button */}
      <div style={{position: 'absolute', top: '52px', left: '18px', zIndex: 20}}>
        <a href="/" style={{width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none'}}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </a>
      </div>

      {/* Header — Avatar + Name */}
      <div style={{paddingTop: '80px', paddingBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2, flexShrink: 0}}>

        {/* Avatar with pulse rings */}
        <div style={{position: 'relative', marginBottom: '16px'}}>
          {/* Outer ring */}
          <div style={{position: 'absolute', inset: '-12px', borderRadius: '50%', border: '1.5px solid rgba(37,99,235,0.25)', animation: 'ringPulse 2.5s ease infinite'}}/>
          {/* Middle ring */}
          <div style={{position: 'absolute', inset: '-6px', borderRadius: '50%', border: '1.5px solid rgba(37,99,235,0.15)', animation: 'ringPulse 2.5s ease 0.6s infinite'}}/>
          {/* Avatar */}
          <div style={{width: '96px', height: '96px', borderRadius: '50%', background: 'linear-gradient(135deg, #1E3A8A, #2563EB)', border: '3px solid rgba(37,99,235,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 800, color: 'white', boxShadow: '0 0 40px rgba(37,99,235,0.3)'}}>
            B
          </div>
          {/* Online indicator */}
          <div style={{position: 'absolute', bottom: '4px', right: '4px', width: '14px', height: '14px', borderRadius: '50%', background: '#4ADE80', border: '2.5px solid #06060F', boxShadow: '0 0 8px #4ADE80'}}/>
        </div>

        {/* Name */}
        <h1 style={{fontSize: '26px', fontWeight: 800, color: 'white', letterSpacing: '-0.4px', marginBottom: '4px'}}>Buwa</h1>
        <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
          <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 6px #4ADE80'}}/>
          <span style={{fontSize: '13px', color: 'rgba(255,255,255,0.38)', fontWeight: 500}}>Sathi is listening · Pokhara, Nepal</span>
        </div>
      </div>

      {/* Conversation */}
      <div style={{flex: 1, overflowY: 'auto', padding: '8px 18px 16px', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 2}}>

        {/* Message from Buwa */}
        <div style={{alignSelf: 'flex-start', maxWidth: '80%', display: 'flex', flexDirection: 'column', gap: '3px'}}>
          <div style={{padding: '11px 14px', borderRadius: '18px', borderBottomLeftRadius: '4px', background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.07)', fontSize: '14px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.55, fontWeight: 500}}>
            Rohan, ke garchhas? Timro side ma hauss paryo ki? Aaja Ananya le bhanchhe timle bholi call garchha re — sachchi ho?
          </div>
          <span style={{fontSize: '10px', color: 'rgba(255,255,255,0.22)', paddingLeft: '3px', fontWeight: 500}}>Buwa · via Sathi · 8:42 AM</span>
        </div>

        {/* Reply from user */}
        <div style={{alignSelf: 'flex-end', maxWidth: '80%', display: 'flex', flexDirection: 'column', gap: '3px'}}>
          <div style={{padding: '11px 14px', borderRadius: '18px', borderBottomRightRadius: '4px', background: '#DC143C', fontSize: '14px', color: 'white', lineHeight: 1.55, fontWeight: 500}}>
            Haa Buwa, call garchu bholi pakkai. Timi theek chha? Khaana khaayau?
          </div>
          <span style={{fontSize: '10px', color: 'rgba(255,255,255,0.22)', paddingRight: '3px', textAlign: 'right', fontWeight: 500}}>You · 9:15 AM · Delivered</span>
        </div>

        {/* Buwa replies */}
        <div style={{alignSelf: 'flex-start', maxWidth: '80%', display: 'flex', flexDirection: 'column', gap: '3px'}}>
          <div style={{padding: '11px 14px', borderRadius: '18px', borderBottomLeftRadius: '4px', background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.07)', fontSize: '14px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.55, fontWeight: 500}}>
            Khaaye. Dal bhat khaaye. Timro maa le banaako. Timle miss garchha — hami sab miss gardaichham beta.
          </div>
          <span style={{fontSize: '10px', color: 'rgba(255,255,255,0.22)', paddingLeft: '3px', fontWeight: 500}}>Buwa · via Sathi · 9:38 AM</span>
        </div>

        {/* Voice message */}
        <div style={{alignSelf: 'flex-start', maxWidth: '80%', display: 'flex', flexDirection: 'column', gap: '3px'}}>
          <div style={{padding: '11px 14px', borderRadius: '18px', borderBottomLeftRadius: '4px', background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.07)'}}>
            {/* Voice bars */}
            <div style={{display: 'flex', alignItems: 'center', gap: '3px', height: '24px', marginBottom: '6px'}}>
              {[8,16,12,20,14,10,18,22,16,12,8,14,20,16,10].map((h, i) => (
                <div key={i} style={{width: '3px', height: `${h}px`, borderRadius: '2px', background: 'rgba(255,255,255,0.45)', animation: `wave 1.2s ease infinite ${i * 0.08}s`}}/>
              ))}
            </div>
            <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 500}}>Listening to your father's voice…</p>
          </div>
          <span style={{fontSize: '10px', color: 'rgba(255,255,255,0.22)', paddingLeft: '3px', fontWeight: 500}}>Just now</span>
        </div>

        {/* Typing indicator */}
        <div style={{alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '4px', padding: '12px 14px', borderRadius: '18px', borderBottomLeftRadius: '4px', background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.07)'}}>
          {[0, 0.2, 0.4].map((delay, i) => (
            <div key={i} style={{width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.45)', animation: `bounce 1.2s ease infinite ${delay}s`}}/>
          ))}
        </div>

      </div>

      {/* Sathi context strip */}
      <div style={{padding: '10px 18px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '10px', position: 'relative', zIndex: 2, flexShrink: 0}}>
        <p style={{flex: 1, fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontWeight: 500}}>
          Buwa had breakfast · Medication taken · Ananya present
        </p>
        <div style={{width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.38)" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4"/></svg>
        </div>
      </div>

      {/* Input bar */}
      <div style={{padding: '12px 18px 40px', display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(6,6,15,0.9)', backdropFilter: 'blur(20px)', position: 'relative', zIndex: 2, flexShrink: 0}}>
        <input
          placeholder="Type or speak to Buwa…"
          style={{flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '11px 16px', fontSize: '14px', color: 'rgba(255,255,255,0.85)', outline: 'none', fontFamily: 'sans-serif', fontWeight: 500}}
        />
        {/* Mic button */}
        <button style={{width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, boxShadow: '0 4px 14px rgba(220,20,60,0.4)'}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/><line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round"/><line x1="8" y1="23" x2="16" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>

      {/* Bottom Nav */}
      <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', paddingBottom: '24px', paddingTop: '8px', background: 'rgba(6,6,15,0.95)', borderTop: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', zIndex: 100}}>
        {[
          {label: 'Home', active: false, path: '/'},
          {label: 'Family', active: false, path: '/family'},
          {label: 'Sathi', active: true, path: '/sathi'},
          {label: 'Hearts', active: false, path: '/hearts'},
          {label: 'Profile', active: false, path: '/profile'},
        ].map((item) => (
          <a key={item.label} href={item.path} style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', textDecoration: 'none', padding: '4px 0'}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={item.active ? '#DC143C' : 'rgba(255,255,255,0.3)'} strokeWidth="2" strokeLinecap="round">
              {item.label === 'Home' && <><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>}
              {item.label === 'Family' && <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>}
              {item.label === 'Sathi' && <><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></>}
              {item.label === 'Hearts' && <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>}
              {item.label === 'Profile' && <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>}
            </svg>
            <span style={{fontSize: '10px', fontWeight: 600, color: item.active ? '#DC143C' : 'rgba(255,255,255,0.3)'}}>{item.label}</span>
          </a>
        ))}
      </div>

      <style>{`
        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.04); opacity: 0.4; }
        }
        @keyframes wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.3); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>

    </div>
  );
}
