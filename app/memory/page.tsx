import BottomNav from '../components/BottomNav'

export default function Memory() {
  return (
    <div style={{minHeight: '100vh', background: '#F5F6F8', fontFamily: 'sans-serif', paddingBottom: '80px'}}>

      <div style={{background: 'white', padding: '52px 20px 0', borderBottom: '1px solid #F0F1F3', position: 'sticky', top: 0, zIndex: 50}}>
        <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px'}}>
          <div>
            <h1 style={{fontSize: '26px', fontWeight: 800, color: '#111318', letterSpacing: '-0.5px'}}>Memory</h1>
            <p style={{fontSize: '12px', color: '#9CA3AF', marginTop: '2px', fontWeight: 500}}>Real moments · Real people · Today</p>
          </div>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#FEF2F2', border: '1px solid rgba(220,20,60,0.15)', borderRadius: '10px', padding: '7px 12px'}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#DC143C" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span style={{fontSize: '11px', fontWeight: 700, color: '#DC143C'}}>3 of 3 today</span>
          </div>
        </div>
        <div style={{display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '12px'}}>
          {['All Moments','Care Stories','Services','Community'].map((tab, i) => (
            <button key={tab} style={{flexShrink: 0, padding: '7px 15px', borderRadius: '20px', border: 'none', background: i === 0 ? '#DC143C' : '#F5F6F8', color: i === 0 ? 'white' : '#6B7280', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif'}}>{tab}</button>
          ))}
        </div>
      </div>

      <div style={{padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '14px'}}>

        <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px 10px'}}>
            <div style={{width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '14px', flexShrink: 0}}>PS</div>
            <div style={{flex: 1}}>
              <p style={{fontSize: '14px', fontWeight: 800, color: '#111318'}}>Priya Sharma</p>
              <p style={{fontSize: '11px', color: '#9CA3AF', marginTop: '1px', fontWeight: 500}}>Mumbai · 2 hours ago</p>
            </div>
            <div style={{padding: '3px 9px', borderRadius: '20px', background: '#ECFDF5', fontSize: '10px', fontWeight: 700, color: '#059669'}}>Care moment</div>
          </div>
          <div style={{width: '100%', height: '200px', background: 'linear-gradient(135deg, #1C0008, #2D0012)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '48px', marginBottom: '8px'}}>👨‍👩‍👧</div>
              <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 600}}>Sunday lunch together</p>
            </div>
          </div>
          <div style={{padding: '13px 16px 14px', fontSize: '14px', color: '#374151', lineHeight: 1.68}}>
            Ananya cooked Papa Ji's favourite dal bhat today and he ate two full plates. First time in months. He was humming old songs after. It's this. It's this exactly.
          </div>
          <div style={{display: 'flex', borderTop: '1px solid #F0F1F3'}}>
            <button style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '11px', border: 'none', background: 'transparent', borderRight: '1px solid #F0F1F3', cursor: 'pointer', color: '#DC143C', fontWeight: 700, fontSize: '12px', fontFamily: 'sans-serif'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#DC143C" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              142
            </button>
            <button style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '11px', border: 'none', background: 'transparent', borderRight: '1px solid #F0F1F3', cursor: 'pointer', color: '#6B7280', fontWeight: 700, fontSize: '12px', fontFamily: 'sans-serif'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              28
            </button>
            <button style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '11px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#6B7280', fontWeight: 700, fontSize: '12px', fontFamily: 'sans-serif'}}>
              Share
            </button>
          </div>
        </div>

        <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px 10px'}}>
            <div style={{width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #D97706, #B45309)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '14px', flexShrink: 0}}>VK</div>
            <div style={{flex: 1}}>
              <p style={{fontSize: '14px', fontWeight: 800, color: '#111318'}}>Vikram Patil</p>
              <p style={{fontSize: '11px', color: '#9CA3AF', marginTop: '1px', fontWeight: 500}}>Electrician · Powai · 5 hours ago</p>
            </div>
            <div style={{padding: '3px 9px', borderRadius: '20px', background: '#FFFBEB', fontSize: '10px', fontWeight: 700, color: '#D97706'}}>Service story</div>
          </div>
          <div style={{padding: '4px 16px 16px', fontSize: '14px', color: '#374151', lineHeight: 1.68}}>
            Fixed the lights at an 80-year-old woman's home today. She lives alone. Her son is in Canada. She made me chai and told me about him for 20 minutes. I fixed her lights but she fixed something in me.
          </div>
          <div style={{display: 'flex', borderTop: '1px solid #F0F1F3'}}>
            <button style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '11px', border: 'none', background: 'transparent', borderRight: '1px solid #F0F1F3', cursor: 'pointer', color: '#6B7280', fontWeight: 700, fontSize: '12px', fontFamily: 'sans-serif'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              318
            </button>
            <button style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '11px', border: 'none', background: 'transparent', borderRight: '1px solid #F0F1F3', cursor: 'pointer', color: '#6B7280', fontWeight: 700, fontSize: '12px', fontFamily: 'sans-serif'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              64
            </button>
            <button style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '11px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#6B7280', fontWeight: 700, fontSize: '12px', fontFamily: 'sans-serif'}}>
              Share
            </button>
          </div>
        </div>

        <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', padding: '24px 20px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'}}>
          <div style={{width: '48px', height: '48px', borderRadius: '14px', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px'}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DC143C" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
          <p style={{fontSize: '16px', fontWeight: 800, color: '#111318', marginBottom: '6px'}}>You've seen today's memories.</p>
          <p style={{fontSize: '13px', color: '#6B7280', lineHeight: 1.6}}>Now go create one of your own.<br/>Call someone you love.</p>
          <button style={{marginTop: '16px', padding: '11px 24px', borderRadius: '20px', border: 'none', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif'}}>
            Share a Moment
          </button>
        </div>

      </div>

      <BottomNav />
    </div>
  )
}
