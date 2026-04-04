import BottomNav from '../components/BottomNav'

export default function Sathi() {
  return (
    <div style={{minHeight: '100vh', background: '#06060F', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', paddingBottom: '80px'}}>

      <div style={{position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none'}}/>

      <a href="/" style={{position: 'absolute', top: '52px', left: '18px', zIndex: 20, width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none'}}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
      </a>

      <div style={{paddingTop: '80px', paddingBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2, flexShrink: 0}}>
        <div style={{position: 'relative', marginBottom: '16px'}}>
          <div style={{position: 'absolute', inset: '-12px', borderRadius: '50%', border: '1.5px solid rgba(37,99,235,0.25)'}}/>
          <div style={{position: 'absolute', inset: '-6px', borderRadius: '50%', border: '1.5px solid rgba(37,99,235,0.15)'}}/>
          <div style={{width: '96px', height: '96px', borderRadius: '50%', background: 'linear-gradient(135deg, #1E3A8A, #2563EB)', border: '3px solid rgba(37,99,235,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 800, color: 'white', boxShadow: '0 0 40px rgba(37,99,235,0.3)'}}>B</div>
          <div style={{position: 'absolute', bottom: '4px', right: '4px', width: '14px', height: '14px', borderRadius: '50%', background: '#4ADE80', border: '2.5px solid #06060F'}}/>
        </div>
        <h1 style={{fontSize: '26px', fontWeight: 800, color: 'white', letterSpacing: '-0.4px', marginBottom: '4px'}}>Buwa</h1>
        <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
          <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#4ADE80'}}/>
          <span style={{fontSize: '13px', color: 'rgba(255,255,255,0.38)', fontWeight: 500}}>Sathi is listening · Pokhara, Nepal</span>
        </div>
      </div>

      <div style={{flex: 1, overflowY: 'auto', padding: '8px 18px 16px', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 2}}>
        <div style={{alignSelf: 'flex-start', maxWidth: '80%'}}>
          <div style={{padding: '11px 14px', borderRadius: '18px', borderBottomLeftRadius: '4px', background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.07)', fontSize: '14px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.55, fontWeight: 500}}>
            Rohan, ke garchhas? Aaja Ananya le bhanchhe timle bholi call garchha re — sachchi ho?
          </div>
          <span style={{fontSize: '10px', color: 'rgba(255,255,255,0.22)', paddingLeft: '3px', fontWeight: 500, display: 'block', marginTop: '3px'}}>Buwa · via Sathi · 8:42 AM</span>
        </div>

        <div style={{alignSelf: 'flex-end', maxWidth: '80%'}}>
          <div style={{padding: '11px 14px', borderRadius: '18px', borderBottomRightRadius: '4px', background: '#DC143C', fontSize: '14px', color: 'white', lineHeight: 1.55, fontWeight: 500}}>
            Haa Buwa, call garchu bholi pakkai. Timi theek chha?
          </div>
          <span style={{fontSize: '10px', color: 'rgba(255,255,255,0.22)', paddingRight: '3px', textAlign: 'right', fontWeight: 500, display: 'block', marginTop: '3px'}}>You · 9:15 AM · Delivered</span>
        </div>

        <div style={{alignSelf: 'flex-start', maxWidth: '80%'}}>
          <div style={{padding: '11px 14px', borderRadius: '18px', borderBottomLeftRadius: '4px', background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.07)', fontSize: '14px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.55, fontWeight: 500}}>
            Khaaye. Dal bhat khaaye. Timle miss garchha — hami sab miss gardaichham beta.
          </div>
          <span style={{fontSize: '10px', color: 'rgba(255,255,255,0.22)', paddingLeft: '3px', fontWeight: 500, display: 'block', marginTop: '3px'}}>Buwa · via Sathi · 9:38 AM</span>
        </div>

        <div style={{alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '4px', padding: '12px 14px', borderRadius: '18px', borderBottomLeftRadius: '4px', background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.07)'}}>
          {[0.0, 0.2, 0.4].map((delay, i) => (
            <div key={i} style={{width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.45)'}}/>
          ))}
        </div>
      </div>

      <div style={{padding: '10px 18px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '10px', position: 'relative', zIndex: 2, flexShrink: 0}}>
        <p style={{flex: 1, fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontWeight: 500}}>Buwa had breakfast · Medication taken · Ananya present</p>
      </div>

      <div style={{padding: '12px 18px 16px', display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(6,6,15,0.9)', position: 'relative', zIndex: 2, flexShrink: 0}}>
        <input placeholder="Type or speak to Buwa…" style={{flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '11px 16px', fontSize: '14px', color: 'rgba(255,255,255,0.85)', outline: 'none', fontFamily: 'sans-serif'}}/>
        <button style={{width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, boxShadow: '0 4px 14px rgba(220,20,60,0.4)'}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/><line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round"/><line x1="8" y1="23" x2="16" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
