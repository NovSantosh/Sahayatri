export default function FamilyRoom() {
  return (
    <div className="min-h-screen" style={{background: '#F5F6F8', fontFamily: 'sans-serif'}}>

      {/* Header */}
      <div className="px-5 pt-12 pb-0" style={{background: 'white', borderBottom: '1px solid #F0F1F3', position: 'sticky', top: 0, zIndex: 50}}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-extrabold" style={{color: '#111318', letterSpacing: '-0.4px'}}>
              Sharma <span className="font-light italic" style={{color: '#9CA3AF'}}>Family Room</span>
            </h1>
          </div>
          <div className="flex gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center relative" style={{background: '#F5F6F8', border: '1px solid #E9EAEC'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A5060" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <div className="absolute top-0 right-0 w-2 h-2 rounded-full" style={{background: '#DC143C', border: '1.5px solid white'}}/>
            </div>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background: '#F5F6F8', border: '1px solid #E9EAEC'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A5060" strokeWidth="2" strokeLinecap="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
            </div>
          </div>
        </div>

        {/* Members row */}
        <div className="flex items-center pb-3">
          {[
            { initials: 'PS', color: '#DC143C' },
            { initials: 'RS', color: '#2563EB' },
            { initials: 'AS', color: '#059669' },
          ].map((m, i) => (
            <div key={i} className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{background: m.color, marginLeft: i > 0 ? '-6px' : '0', border: '2px solid white'}}>
              {m.initials}
            </div>
          ))}
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold" style={{background: '#EFF6FF', border: '2px solid white', marginLeft: '-6px', color: '#2563EB'}}>+2</div>
          <span className="text-xs font-semibold ml-2" style={{color: '#9CA3AF'}}>5 members</span>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{background: '#059669', boxShadow: '0 0 6px #059669'}}/>
            <span className="text-xs font-bold" style={{color: '#059669'}}>Ananya active</span>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="px-4 py-4 flex flex-col gap-4">

        {/* Heartbeat Strip */}
        <div className="rounded-2xl p-4" style={{background: 'linear-gradient(135deg, #111318, #1C2028)', border: '1px solid rgba(255,255,255,0.05)'}}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full" style={{background: '#4ADE80', boxShadow: '0 0 8px #4ADE80', animation: 'pulse 1.5s ease infinite'}}/>
            <span className="text-[10px] font-bold tracking-[1.5px] uppercase" style={{color: 'rgba(255,255,255,0.35)'}}>Live Today · Mar 26</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              { text: 'Morning yoga completed', time: '9:38 AM', latest: true, color: '#4ADE80' },
              { text: 'Metformin 500mg taken', time: '9:05 AM', latest: false, color: '#93B4FA' },
              { text: 'Ananya arrived · BP 124/80', time: '8:58 AM', latest: false, color: '#93B4FA' },
              { text: 'Morning chai and breakfast', time: '7:42 AM', latest: false, color: 'rgba(255,255,255,0.2)', faded: true },
            ].map((event, i) => (
              <div key={i} className="flex items-center gap-2.5" style={{opacity: event.faded ? 0.4 : 1}}>
                <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{background: event.latest ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.06)'}}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={event.color} strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span className="flex-1 text-[13px] font-medium" style={{color: event.latest ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: event.latest ? 700 : 500}}>{event.text}</span>
                <span className="text-[10px] font-semibold" style={{color: 'rgba(255,255,255,0.25)'}}>{event.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Companion Card */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-[1.2px] uppercase" style={{color: '#9CA3AF'}}>Companion on duty</span>
            <span className="text-xs font-bold" style={{color: '#DC143C'}}>Companion view</span>
          </div>
          <div className="rounded-2xl p-3.5 flex items-center gap-3" style={{background: 'white', border: '1px solid #E9EAEC', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'}}>
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base" style={{background: 'linear-gradient(135deg, #DC143C, #A50E2D)'}}>AS</div>
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full" style={{background: '#4ADE80', border: '2px solid white'}}/>
            </div>
            <div className="flex-1">
              <p className="text-sm font-extrabold" style={{color: '#111318'}}>Ananya Singh</p>
              <p className="text-xs font-medium mt-0.5" style={{color: '#9CA3AF'}}>Elder Care · Certified · 4.9 stars</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{background: '#059669'}}/>
                <span className="text-[11px] font-bold" style={{color: '#059669'}}>Active at Sharma home since 8:58 AM</span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: '#F5F6F8', border: '1px solid #E9EAEC'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4A5060" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: '#F5F6F8', border: '1px solid #E9EAEC'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4A5060" strokeWidth="2" strokeLinecap="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Plan */}
        <div>
          <span className="text-[10px] font-bold tracking-[1.2px] uppercase" style={{color: '#9CA3AF'}}>Today&apos;s Plan</span>
          <div className="mt-2 rounded-2xl overflow-hidden" style={{background: 'white', border: '1px solid #E9EAEC', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'}}>
            <div className="px-3.5 py-2.5 flex items-center gap-2" style={{background: '#FFFBEB', borderBottom: '1px solid rgba(217,119,6,0.12)'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span className="text-xs font-extrabold" style={{color: '#111318'}}>Ananya&apos;s plan for Papa Ji</span>
              <span className="text-xs font-medium ml-auto" style={{color: '#9CA3AF'}}>Mar 26</span>
            </div>
            <div className="py-1">
              {[
                { time: '8:58', task: 'Arrival & BP check', detail: '124/80 · Normal', status: 'done' },
                { time: '9:05', task: 'Morning medication', detail: 'Metformin 500mg with breakfast', status: 'done' },
                { time: '9:30', task: 'Yoga session', detail: '30 min gentle · In progress', status: 'now', tag: 'Live now' },
                { time: '11:00', task: 'Garden walk', detail: '20 min · Society compound', status: 'upcoming' },
                { time: '18:00', task: 'Family video call', detail: 'London + Toronto joining', status: 'upcoming', tag: 'Ritual' },
              ].map((item, i, arr) => (
                <div key={i} className="flex items-start px-3.5 relative">
                  {i < arr.length - 1 && <div className="absolute left-[27px] top-6 bottom-0 w-px" style={{background: '#F0F1F3'}}/>}
                  <span className="w-10 pt-2.5 text-[10px] font-bold flex-shrink-0" style={{color: '#9CA3AF'}}>{item.time}</span>
                  <div className="pt-3 mr-2.5 flex-shrink-0 z-10">
                    <div className="w-2.5 h-2.5 rounded-full border-2" style={{
                      background: item.status === 'done' ? '#059669' : item.status === 'now' ? '#DC143C' : 'white',
                      borderColor: item.status === 'done' ? '#059669' : item.status === 'now' ? '#DC143C' : '#D1D5DB',
                      boxShadow: item.status === 'now' ? '0 0 0 3px rgba(220,20,60,0.15)' : 'none'
                    }}/>
                  </div>
                  <div className="flex-1 py-2.5">
                    <p className="text-[13px] font-bold" style={{color: item.status === 'done' ? '#9CA3AF' : '#111318', textDecoration: item.status === 'done' ? 'line-through' : 'none'}}>{item.task}</p>
                    <p className="text-[11px] font-medium mt-0.5" style={{color: '#9CA3AF'}}>{item.detail}</p>
                    {item.tag && (
                      <span className="inline-flex mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{
                        background: item.tag === 'Live now' ? '#EFF6FF' : '#FFFBEB',
                        color: item.tag === 'Live now' ? '#DC143C' : '#D97706'
                      }}>{item.tag}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Voice Note */}
        <div>
          <span className="text-[10px] font-bold tracking-[1.2px] uppercase" style={{color: '#9CA3AF'}}>Daily Update from Ananya</span>
          <div className="mt-2 rounded-2xl p-4 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #1E3A8A, #1B4FD8)'}}>
            <div className="absolute top-[-20px] right-[-20px] w-24 h-24 rounded-full" style={{background: 'rgba(255,255,255,0.05)'}}/>
            <div className="flex items-center gap-2.5 mb-3 relative z-10">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.3)'}}>AS</div>
              <div className="flex-1">
                <p className="text-xs font-bold text-white">Ananya Singh</p>
                <p className="text-[10px]" style={{color: 'rgba(255,255,255,0.5)'}}>Yesterday · 6:12 PM</p>
              </div>
              <div className="px-2.5 py-1 rounded-full" style={{background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)'}}>
                <span className="text-[9px] font-bold tracking-wider uppercase" style={{color: 'rgba(255,255,255,0.7)'}}>Daily Update</span>
              </div>
            </div>
            {/* Waveform */}
            <div className="flex items-center gap-0.5 h-8 mb-3 relative z-10">
              {[20,35,55,40,70,85,60,45,80,65,50,75,90,70,55,40,65,80,45,60,35,50,70,85,60,45,30,55,75,40].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{height: `${h}%`, background: i < 14 ? '#93B4FA' : 'rgba(255,255,255,0.2)'}}/>
              ))}
            </div>
            <div className="flex items-center gap-3 relative z-10">
              <button className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.2)'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#1B4FD8"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </button>
              <span className="text-xs flex-1" style={{color: 'rgba(255,255,255,0.5)'}}>0:00 / 0:47</span>
            </div>
            <p className="text-xs italic mt-3 relative z-10" style={{color: 'rgba(255,255,255,0.6)', borderLeft: '2px solid rgba(255,255,255,0.2)', paddingLeft: '10px', lineHeight: 1.6}}>
              &quot;Papa Ji is in wonderful spirits today. He told me about his time in the army. He asked when Rohan is coming home.&quot;
            </p>
          </div>
        </div>

        {/* Memory Wall */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-[1.2px] uppercase" style={{color: '#9CA3AF'}}>Memory Wall</span>
            <span className="text-xs font-bold" style={{color: '#DC143C'}}>Add moment</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="col-span-2 rounded-2xl overflow-hidden relative" style={{height: '160px', background: 'linear-gradient(135deg, #1C0008, #2D0012)'}}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">👨‍👩‍👧‍👦</div>
                  <p className="text-white text-xs font-bold">Sunday lunch together</p>
                  <p className="text-xs mt-1" style={{color: 'rgba(255,255,255,0.5)'}}>Ananya · 2 days ago</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden relative" style={{height: '100px', background: 'linear-gradient(135deg, #0A1628, #1E3A8A)'}}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl mb-1">🌿</div>
                  <p className="text-white text-[11px] font-bold">Garden time</p>
                  <p className="text-[10px]" style={{color: 'rgba(255,255,255,0.5)'}}>Mar 24</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden relative" style={{height: '100px', background: 'linear-gradient(135deg, #064E3B, #059669)'}}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl mb-1">��</div>
                  <p className="text-white text-[11px] font-bold">Yoga morning</p>
                  <p className="text-[10px]" style={{color: 'rgba(255,255,255,0.5)'}}>Mar 23</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Distance Rituals */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-[1.2px] uppercase" style={{color: '#9CA3AF'}}>Distance Rituals</span>
            <span className="text-xs font-bold" style={{color: '#DC143C'}}>Manage</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {[
              { icon: '📞', name: 'Sunday Call', freq: 'Every Sunday · 6 PM', badge: 'In 4 days', badgeBg: '#EFF6FF', badgeColor: '#2563EB' },
              { icon: '🎂', name: "Maa's Birthday", freq: 'March 29 · Annual', badge: '3 days!', badgeBg: '#FEF2F2', badgeColor: '#DC143C' },
              { icon: '💊', name: 'Evening Meds', freq: 'Daily · 8:00 PM', badge: 'Tonight', badgeBg: '#ECFDF5', badgeColor: '#059669' },
            ].map((r) => (
              <div key={r.name} className="flex-shrink-0 w-36 rounded-2xl overflow-hidden" style={{background: 'white', border: '1px solid #E9EAEC', boxShadow: '0 1px 2px rgba(0,0,0,0.04)'}}>
                <div className="h-14 flex items-center justify-center text-3xl" style={{background: '#F5F6F8'}}>{r.icon}</div>
                <div className="p-2.5">
                  <p className="text-xs font-extrabold" style={{color: '#111318'}}>{r.name}</p>
                  <p className="text-[10px] font-medium mt-0.5" style={{color: '#9CA3AF'}}>{r.freq}</p>
                  <span className="inline-flex mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{background: r.badgeBg, color: r.badgeColor}}>{r.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{height: '80px'}}/>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 flex pb-6 pt-2" style={{background: 'rgba(255,255,255,0.95)', borderTop: '1px solid #E9EAEC', backdropFilter: 'blur(20px)'}}>
        {[
          { label: 'Home', active: false, icon: 'home' },
          { label: 'Family', active: true, icon: 'users' },
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
