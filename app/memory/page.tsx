export default function Memory() {
  return (
    <div style={{minHeight: '100vh', background: '#F5F6F8', fontFamily: 'sans-serif'}}>

      {/* Header */}
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

        {/* Filter tabs */}
        <div style={{display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '12px'}}>
          {['All Moments', 'Care Stories', 'Services', 'Community'].map((tab, i) => (
            <button key={tab} style={{flexShrink: 0, padding: '7px 15px', borderRadius: '20px', border: 'none', background: i === 0 ? '#DC143C' : '#F5F6F8', color: i === 0 ? 'white' : '#6B7280', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif'}}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div style={{padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '14px'}}>

        {/* Post 1 — Care moment */}
        <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'}}>
          {/* Post header */}
          <div style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px 10px'}}>
            <div style={{width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '14px', flexShrink: 0}}>PS</div>
            <div style={{flex: 1}}>
              <p style={{fontSize: '14px', fontWeight: 800, color: '#111318'}}>Priya Sharma</p>
              <p style={{fontSize: '11px', color: '#9CA3AF', marginTop: '1px', fontWeight: 500}}>Mumbai · 2 hours ago</p>
            </div>
            <div style={{padding: '3px 9px', borderRadius: '20px', background: '#ECFDF5', fontSize: '10px', fontWeight: 700, color: '#059669'}}>Care moment</div>
          </div>

          {/* Post image placeholder */}
          <div style={{width: '100%', height: '200px', background: 'linear-gradient(135deg, #1C0008 0%, #2D0012 50%, #1C0008 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '48px', marginBottom: '8px'}}>👨‍👩‍👧</div>
              <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 600}}>Sunday lunch together</p>
            </div>
          </div>

          {/* Post text */}
          <div style={{padding: '13px 16px 14px', fontSize: '14px', color: '#374151', lineHeight: 1.68, fontWeight: 400}}>
            Ananya cooked Papa Ji's favourite dal bhat today and he ate two full plates. First time in months. He was humming old songs after. For everyone who thinks care is just medicine and routines — it's this. It's this exactly.
          </div>

          {/* Reactions */}
          <div style={{display: 'flex', alignItems: 'center', borderTop: '1px solid #F0F1F3'}}>
            {[
              {icon: 'heart', label: '142', active: true},
              {icon: 'comment', label: '28'},
              {icon: 'share', label: 'Share'},
              {icon: 'save', label: ''},
            ].map((action, i) => (
              <button key={i} style={{flex: action.icon === 'save' ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '11px 4px', border: 'none', background: 'transparent', cursor: 'pointer', borderRight: i < 3 ? '1px solid #F0F1F3' : 'none', fontFamily: 'sans-serif', fontSize: '12px', fontWeight: 700, color: action.active ? '#DC143C' : '#6B7280'}}>
                {action.icon === 'heart' && <svg width="16" height="16" viewBox="0 0 24 24" fill={action.active ? '#DC143C' : 'none'} stroke={action.active ? '#DC143C' : '#6B7280'} strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>}
                {action.icon === 'comment' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
                {action.icon === 'share' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>}
                {action.icon === 'save' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>}
                {action.label && action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Post 2 — Service story */}
        <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px 10px'}}>
            <div style={{width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #D97706, #B45309)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '14px', flexShrink: 0}}>VK</div>
            <div style={{flex: 1}}>
              <p style={{fontSize: '14px', fontWeight: 800, color: '#111318'}}>Vikram Patil</p>
              <p style={{fontSize: '11px', color: '#9CA3AF', marginTop: '1px', fontWeight: 500}}>Electrician · Powai · 5 hours ago</p>
            </div>
            <div style={{padding: '3px 9px', borderRadius: '20px', background: '#FFFBEB', fontSize: '10px', fontWeight: 700, color: '#D97706'}}>Service story</div>
          </div>
          <div style={{padding: '4px 16px 16px', fontSize: '14px', color: '#374151', lineHeight: 1.68, fontWeight: 400}}>
            Fixed the lights at an 80-year-old woman's home today. She lives alone. Her son is in Canada. She made me chai and told me about him for 20 minutes. I fixed her lights but she fixed something in me. This is why I do this work. Not the money. This.
          </div>
          <div style={{display: 'flex', alignItems: 'center', borderTop: '1px solid #F0F1F3'}}>
            {[
              {icon: 'heart', label: '318'},
              {icon: 'comment', label: '64'},
              {icon: 'share', label: 'Share'},
              {icon: 'save', label: ''},
            ].map((action, i) => (
              <button key={i} style={{flex: action.icon === 'save' ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '11px 4px', border: 'none', background: 'transparent', cursor: 'pointer', borderRight: i < 3 ? '1px solid #F0F1F3' : 'none', fontFamily: 'sans-serif', fontSize: '12px', fontWeight: 700, color: '#6B7280'}}>
                {action.icon === 'heart' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>}
                {action.icon === 'comment' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
                {action.icon === 'share' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>}
                {action.icon === 'save' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>}
                {action.label && action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Post 3 — Community */}
        <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px 10px'}}>
            <div style={{width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563EB, #1E40AF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '14px', flexShrink: 0}}>AS</div>
            <div style={{flex: 1}}>
              <p style={{fontSize: '14px', fontWeight: 800, color: '#111318'}}>Ananya Singh</p>
              <p style={{fontSize: '11px', color: '#9CA3AF', marginTop: '1px', fontWeight: 500}}>Elder Care · Mumbai · 8 hours ago</p>
            </div>
            <div style={{padding: '3px 9px', borderRadius: '20px', background: '#EFF6FF', fontSize: '10px', fontWeight: 700, color: '#2563EB'}}>Community</div>
          </div>
          <div style={{padding: '4px 16px 16px', fontSize: '14px', color: '#374151', lineHeight: 1.68, fontWeight: 400}}>
            Papa Ji remembered my name today without me reminding him. He called me Ananya and asked if I had eaten. Small things. Big moments. This is what we do this for. 🙏
          </div>
          <div style={{display: 'flex', alignItems: 'center', borderTop: '1px solid #F0F1F3'}}>
            {[
              {icon: 'heart', label: '521'},
              {icon: 'comment', label: '89'},
              {icon: 'share', label: 'Share'},
              {icon: 'save', label: ''},
            ].map((action, i) => (
              <button key={i} style={{flex: action.icon === 'save' ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '11px 4px', border: 'none', background: 'transparent', cursor: 'pointer', borderRight: i < 3 ? '1px solid #F0F1F3' : 'none', fontFamily: 'sans-serif', fontSize: '12px', fontWeight: 700, color: '#6B7280'}}>
                {action.icon === 'heart' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>}
                {action.icon === 'comment' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
                {action.icon === 'share' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>}
                {action.icon === 'save' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>}
                {action.label && action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Daily limit end card */}
        <div style={{background: 'white', borderRadius: '20px', border: '1px solid #E9EAEC', padding: '24px 20px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'}}>
          <div style={{width: '48px', height: '48px', borderRadius: '14px', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px'}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DC143C" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
          <p style={{fontSize: '16px', fontWeight: 800, color: '#111318', marginBottom: '6px'}}>You've seen today's memories.</p>
          <p style={{fontSize: '13px', color: '#6B7280', lineHeight: 1.6, fontWeight: 400}}>Now go create one of your own.<br/>Call someone you love.</p>
          <button style={{marginTop: '16px', padding: '11px 24px', borderRadius: '20px', border: 'none', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif', boxShadow: '0 4px 14px rgba(220,20,60,0.3)'}}>
            Share a Moment
          </button>
        </div>

        <div style={{height: '80px'}}/>
      </div>

      {/* Bottom Nav */}
      <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', paddingBottom: '24px', paddingTop: '8px', background: 'rgba(255,255,255,0.95)', borderTop: '1px solid #E9EAEC', backdropFilter: 'blur(20px)', zIndex: 100}}>
        {[
          {label: 'Home', active: false, path: '/'},
          {label: 'Family', active: false, path: '/family'},
          {label: 'Sathi', active: false, path: '/sathi'},
          {label: 'Memory', active: true, path: '/memory'},
          {label: 'Profile', active: false, path: '/profile'},
        ].map((item) => (
          <a key={item.label} href={item.path} style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', textDecoration: 'none', padding: '4px 0'}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={item.active ? '#DC143C' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round">
              {item.label === 'Home' && <><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>}
              {item.label === 'Family' && <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>}
              {item.label === 'Sathi' && <><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></>}
              {item.label === 'Memory' && <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></>}
              {item.label === 'Profile' && <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>}
            </svg>
            <span style={{fontSize: '10px', fontWeight: 600, color: item.active ? '#DC143C' : '#9CA3AF'}}>{item.label}</span>
          </a>
        ))}
      </div>

    </div>
  );
}
