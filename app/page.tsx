export default function Home() {
  return (
    <div className="min-h-screen" style={{background: '#F5F6F8', fontFamily: 'sans-serif'}}>

      {/* Status bar */}
      <div className="flex justify-between items-center px-5 pt-3 pb-1" style={{background: 'white'}}>
        <span className="font-bold text-sm" style={{color: '#111'}}>9:41</span>
        <div className="flex items-center gap-1">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><rect x="0" y="3" width="3" height="9" rx="1" fill="#111"/><rect x="4.5" y="2" width="3" height="10" rx="1" fill="#111"/><rect x="9" y="0" width="3" height="12" rx="1" fill="#111"/><rect x="13.5" y="0" width="2.5" height="12" rx="1" fill="#111" opacity="0.3"/></svg>
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none"><rect x="0.5" y="0.5" width="17" height="11" rx="3.5" stroke="#111"/><rect x="18" y="3.5" width="2" height="5" rx="1" fill="#111"/><rect x="1.5" y="1.5" width="13" height="9" rx="2.5" fill="#111"/></svg>
        </div>
      </div>

      {/* Header */}
      <div className="px-5 pt-4 pb-4" style={{background: 'white', borderBottom: '1px solid #F0F1F3'}}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold" style={{color: '#9CA3AF', letterSpacing: '0.3px'}}>Good morning</p>
            <h1 className="text-xl font-extrabold" style={{color: '#111318', letterSpacing: '-0.5px', marginTop: '1px'}}>Priya Sharma</h1>
          </div>
          <div className="flex items-center gap-2">
            {/* Notification */}
            <div className="w-9 h-9 rounded-xl flex items-center justify-center relative" style={{background: '#F5F6F8', border: '1px solid #E9EAEC'}}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#4A5060" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <div className="absolute top-0 right-0 w-2 h-2 rounded-full" style={{background: '#DC143C', border: '1.5px solid white'}}/>
            </div>
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{background: 'linear-gradient(135deg, #DC143C, #A50E2D)'}}>P</div>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-full" style={{background: '#F5F6F8', border: '1px solid #E9EAEC'}}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span className="text-sm" style={{color: '#9CA3AF'}}>Search companions, services…</span>
        </div>

        {/* Mode toggle */}
        <div className="flex gap-1 mt-3 p-1 rounded-full" style={{background: '#F5F6F8', border: '1px solid #E9EAEC'}}>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-bold" style={{background: 'white', color: '#DC143C', boxShadow: '0 1px 3px rgba(0,0,0,0.08)'}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            Care & Companions
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-bold" style={{color: '#9CA3AF'}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            Home Services
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="px-4 py-4 flex flex-col gap-4">

        {/* Sathi Hero Card */}
        <div className="rounded-2xl overflow-hidden relative cursor-pointer" style={{minHeight: '160px', background: 'linear-gradient(145deg, #0A0A1A 0%, #1C0008 50%, #0A0A1A 100%)'}}>
          <div className="absolute top-[-30px] right-[-20px] w-40 h-40 rounded-full" style={{background: 'radial-gradient(circle, rgba(220,20,60,0.2) 0%, transparent 70%)', filter: 'blur(20px)'}}/>
          <div className="relative z-10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{background: 'rgba(220,20,60,0.12)', border: '1px solid rgba(220,20,60,0.25)'}}>
                <div className="w-1.5 h-1.5 rounded-full" style={{background: '#DC143C', boxShadow: '0 0 6px #DC143C'}}/>
                <span className="text-[10px] font-bold tracking-wider uppercase" style={{color: '#DC143C'}}>Sathi AI · Active</span>
              </div>
            </div>
            <h2 className="font-extrabold text-white mb-1.5" style={{fontSize: '20px', letterSpacing: '-0.3px', lineHeight: 1.2}}>
              Your mother asked<br/>about you <span className="font-light italic" style={{color: '#93B4FA'}}>today.</span>
            </h2>
            <p className="text-xs mb-4" style={{color: 'rgba(255,255,255,0.45)'}}>Tap to hear her voice — and let her hear yours.</p>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-full w-fit" style={{background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)'}}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
              <span className="text-xs font-bold text-white">Open Sathi</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-extrabold" style={{color: '#111318', letterSpacing: '-0.3px'}}>Quick Access</h2>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { label: 'Family Room', meta: 'Ananya active', bg: '#EFF6FF', icon: 'home', color: '#2563EB' },
              { label: 'Heartbeats', meta: '3 new today', bg: '#FEF2F2', icon: 'heart', color: '#DC143C' },
              { label: 'Wallet', meta: '₹12,450', bg: '#ECFDF5', icon: 'wallet', color: '#059669' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl p-3 flex flex-col gap-2.5 cursor-pointer" style={{background: 'white', border: '1px solid #E9EAEC', boxShadow: '0 1px 2px rgba(0,0,0,0.04)'}}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background: item.bg}}>
                  {item.icon === 'home' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2" strokeLinecap="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
                  {item.icon === 'heart' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>}
                  {item.icon === 'wallet' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2" strokeLinecap="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>}
                </div>
                <div>
                  <p className="text-xs font-bold" style={{color: '#111318'}}>{item.label}</p>
                  <p className="text-[10px] font-semibold mt-0.5" style={{color: '#9CA3AF'}}>{item.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Companions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-extrabold" style={{color: '#111318', letterSpacing: '-0.3px'}}>Top Companions</h2>
            <span className="text-xs font-bold" style={{color: '#DC143C'}}>View all</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {[
              { name: 'Ananya Singh', role: 'Elder Care · Yoga', rate: '₹350/hr', rating: '4.9', initials: 'AS', color: '#DC143C' },
              { name: 'Rajan Mehta', role: 'Child Care · Tutor', rate: '₹300/hr', rating: '4.8', initials: 'RM', color: '#2563EB' },
              { name: 'Meera Kapoor', role: 'Cook · Companion', rate: '₹280/hr', rating: '5.0', initials: 'MK', color: '#059669' },
            ].map((p) => (
              <div key={p.name} className="flex-shrink-0 w-36 rounded-2xl overflow-hidden cursor-pointer" style={{background: 'white', border: '1px solid #E9EAEC', boxShadow: '0 1px 2px rgba(0,0,0,0.04)'}}>
                <div className="h-24 flex items-center justify-center" style={{background: `linear-gradient(135deg, ${p.color}22, ${p.color}44)`}}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-extrabold" style={{background: `linear-gradient(135deg, ${p.color}, ${p.color}CC)`}}>
                    {p.initials}
                  </div>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-extrabold" style={{color: '#111318'}}>{p.name}</p>
                  <p className="text-[10px] font-medium mt-0.5" style={{color: '#9CA3AF'}}>{p.role}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[11px] font-bold" style={{color: '#374151'}}>{p.rate}</span>
                    <span className="text-[10px] font-semibold" style={{color: '#9CA3AF'}}>⭐ {p.rating}</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded w-fit" style={{background: '#ECFDF5'}}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-[9px] font-bold" style={{color: '#059669'}}>Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join Pro Banner */}
        <div className="rounded-2xl p-5 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #0A0A1A, #1C0008)'}}>
          <div className="absolute top-[-20px] right-[-20px] w-28 h-28 rounded-full" style={{background: 'radial-gradient(circle, rgba(220,20,60,0.2), transparent 70%)'}}/>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1.5" style={{color: 'rgba(220,20,60,0.7)'}}>For Professionals</p>
          <p className="font-extrabold text-white mb-3" style={{fontSize: '17px', letterSpacing: '-0.3px', lineHeight: 1.3}}>Earn ₹40,000+ a month on your own terms.</p>
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-full w-fit" style={{background: 'white'}}>
            <span className="text-xs font-extrabold" style={{color: '#DC143C'}}>Join Free</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DC143C" strokeWidth="3" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </div>

        <div style={{height: '80px'}}/>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 flex pb-6 pt-2" style={{background: 'rgba(255,255,255,0.95)', borderTop: '1px solid #E9EAEC', backdropFilter: 'blur(20px)'}}>
        {[
          { label: 'Home', active: true, icon: 'home' },
          { label: 'Family', active: false, icon: 'users' },
          { label: 'Sathi', active: false, icon: 'mic' },
          { label: 'Hearts', active: false, icon: 'heart' },
          { label: 'Profile', active: false, icon: 'user' },
        ].map((item) => (
          <div key={item.label} className="flex-1 flex flex-col items-center gap-1 cursor-pointer">
            <div style={{color: item.active ? '#DC143C' : '#9CA3AF'}}>
              {item.icon === 'home' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
              {item.icon === 'users' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
              {item.icon === 'mic' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>}
              {item.icon === 'heart' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>}
              {item.icon === 'user' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
            </div>
            <span className="text-[10px] font-semibold" style={{color: item.active ? '#DC143C' : '#9CA3AF'}}>{item.label}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
