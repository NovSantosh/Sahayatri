import BottomNav from '../components/BottomNav'

export default function Profile() {
  return (
    <div style={{minHeight: '100vh', background: '#F5F6F8', fontFamily: 'sans-serif', paddingBottom: '80px'}}>

      {/* Header */}
      <div style={{background: 'linear-gradient(135deg, #0A1628, #1C0008)', padding: '52px 20px 28px', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(220,20,60,0.15)'}}/>
        <div style={{display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 1}}>
          <div style={{width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '26px', fontWeight: 800, border: '3px solid rgba(255,255,255,0.2)', flexShrink: 0}}>P</div>
          <div>
            <h1 style={{fontSize: '22px', fontWeight: 800, color: 'white', letterSpacing: '-0.4px'}}>Priya Sharma</h1>
            <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginTop: '3px', fontWeight: 500}}>Mumbai, India · Family Member</p>
            <div style={{display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '8px', background: 'rgba(220,20,60,0.2)', border: '1px solid rgba(220,20,60,0.3)', borderRadius: '20px', padding: '3px 10px'}}>
              <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#DC143C'}}/>
              <span style={{fontSize: '10px', fontWeight: 700, color: '#DC143C'}}>Family Plan · Active</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px'}}>

        {/* Stats */}
        <div style={{display: 'flex', background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'}}>
          {[
            {val: '1', label: 'Family Room'},
            {val: '3', label: 'Companions'},
            {val: '47', label: 'Memories'},
            {val: '₹12K', label: 'Spent'},
          ].map((s, i) => (
            <div key={i} style={{flex: 1, textAlign: 'center', padding: '14px 4px', borderRight: i < 3 ? '1px solid #F0F1F3' : 'none'}}>
              <p style={{fontSize: '18px', fontWeight: 800, color: '#111318', letterSpacing: '-0.3px'}}>{s.val}</p>
              <p style={{fontSize: '10px', fontWeight: 700, color: '#9CA3AF', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.4px'}}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Menu items */}
        <div style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'}}>
          {[
            {icon: '👤', label: 'Edit Profile', sub: 'Name, photo, location'},
            {icon: '🔔', label: 'Notifications', sub: 'Manage your alerts'},
            {icon: '🔒', label: 'Privacy & Security', sub: 'Password, data settings'},
            {icon: '💳', label: 'Subscription', sub: 'Family Plan · ₹299/month'},
            {icon: '🇳🇵', label: 'Language', sub: 'Nepali / English'},
          ].map((item, i, arr) => (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderBottom: i < arr.length - 1 ? '1px solid #F0F1F3' : 'none', cursor: 'pointer'}}>
              <div style={{width: '38px', height: '38px', borderRadius: '10px', background: '#F5F6F8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0}}>{item.icon}</div>
              <div style={{flex: 1}}>
                <p style={{fontSize: '14px', fontWeight: 700, color: '#111318'}}>{item.label}</p>
                <p style={{fontSize: '11px', color: '#9CA3AF', marginTop: '1px', fontWeight: 500}}>{item.sub}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          ))}
        </div>

        {/* My family */}
        <div style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', padding: '14px 16px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
            <p style={{fontSize: '15px', fontWeight: 800, color: '#111318'}}>My Family Room</p>
            <span style={{fontSize: '12px', fontWeight: 700, color: '#DC143C', cursor: 'pointer'}}>Manage</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            {[
              {initials: 'PS', color: '#DC143C', name: 'Priya (You)'},
              {initials: 'RS', color: '#2563EB', name: 'Rohan'},
              {initials: 'AS', color: '#059669', name: 'Ananya'},
            ].map((m) => (
              <div key={m.name} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'}}>
                <div style={{width: '44px', height: '44px', borderRadius: '50%', background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '13px'}}>{m.initials}</div>
                <span style={{fontSize: '10px', fontWeight: 600, color: '#9CA3AF'}}>{m.name}</span>
              </div>
            ))}
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'}}>
              <div style={{width: '44px', height: '44px', borderRadius: '50%', border: '2px dashed #E9EAEC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </div>
              <span style={{fontSize: '10px', fontWeight: 600, color: '#9CA3AF'}}>Invite</span>
            </div>
          </div>
        </div>

        {/* Sign out */}
        <button style={{width: '100%', padding: '14px', background: 'white', border: '1px solid #FEE2E2', borderRadius: '16px', color: '#DC143C', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'}}>
          Sign Out
        </button>

        <p style={{textAlign: 'center', fontSize: '11px', color: '#9CA3AF', fontWeight: 500}}>
          Sahayatri v1.0 · Made with ❤️ for Nepal
        </p>

      </div>

      <BottomNav />
    </div>
  )
}
