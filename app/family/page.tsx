import BottomNav from '../components/BottomNav'

export default function FamilyRoom() {
  return (
    <div style={{minHeight: '100vh', background: '#F5F6F8', fontFamily: 'sans-serif', paddingBottom: '80px'}}>

      <div style={{background: 'white', padding: '52px 20px 0', borderBottom: '1px solid #F0F1F3', position: 'sticky', top: 0, zIndex: 50}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px'}}>
          <h1 style={{fontSize: '20px', fontWeight: 800, color: '#111318', letterSpacing: '-0.4px'}}>
            Sharma <span style={{fontWeight: 300, fontStyle: 'italic', color: '#9CA3AF'}}>Family Room</span>
          </h1>
          <div style={{display: 'flex', gap: '8px'}}>
            <div style={{width: '36px', height: '36px', borderRadius: '10px', background: '#F5F6F8', border: '1px solid #E9EAEC', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A5060" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <div style={{position: 'absolute', top: 0, right: 0, width: '8px', height: '8px', borderRadius: '50%', background: '#DC143C', border: '1.5px solid white'}}/>
            </div>
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', paddingBottom: '14px'}}>
          {['PS','RS','AS'].map((m, i) => (
            <div key={i} style={{width: '26px', height: '26px', borderRadius: '50%', background: ['#DC143C','#2563EB','#059669'][i], border: '2px solid white', marginLeft: i > 0 ? '-6px' : '0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '9px', fontWeight: 800}}>{m}</div>
          ))}
          <div style={{width: '26px', height: '26px', borderRadius: '50%', background: '#EFF6FF', border: '2px solid white', marginLeft: '-6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB', fontSize: '9px', fontWeight: 800}}>+2</div>
          <span style={{fontSize: '11px', fontWeight: 600, color: '#9CA3AF', marginLeft: '8px'}}>5 members</span>
          <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px'}}>
            <div style={{width: '7px', height: '7px', borderRadius: '50%', background: '#059669', boxShadow: '0 0 6px #059669'}}/>
            <span style={{fontSize: '11px', fontWeight: 700, color: '#059669'}}>Ananya active</span>
          </div>
        </div>
      </div>

      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px'}}>

        <div style={{borderRadius: '16px', padding: '16px', background: 'linear-gradient(135deg, #111318, #1C2028)', border: '1px solid rgba(255,255,255,0.05)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px'}}>
            <div style={{width: '8px', height: '8px', borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 8px #4ADE80'}}/>
            <span style={{fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)'}}>Live Today</span>
          </div>
          {[
            {text: 'Morning yoga completed', time: '9:38 AM', latest: true},
            {text: 'Metformin 500mg taken', time: '9:05 AM', latest: false},
            {text: 'Ananya arrived · BP 124/80', time: '8:58 AM', latest: false},
            {text: 'Morning chai and breakfast', time: '7:42 AM', latest: false, faded: true},
          ].map((e, i) => (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: i < 3 ? '10px' : '0', opacity: e.faded ? 0.35 : 1}}>
              <div style={{width: '20px', height: '20px', borderRadius: '6px', background: e.latest ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={e.latest ? '#4ADE80' : '#93B4FA'} strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <span style={{flex: 1, fontSize: '13px', color: e.latest ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: e.latest ? 700 : 500}}>{e.text}</span>
              <span style={{fontSize: '10px', color: 'rgba(255,255,255,0.25)', fontWeight: 600}}>{e.time}</span>
            </div>
          ))}
        </div>

        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
            <span style={{fontSize: '10px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#9CA3AF'}}>Companion on duty</span>
            <span style={{fontSize: '12px', fontWeight: 700, color: '#DC143C', cursor: 'pointer'}}>Companion view</span>
          </div>
          <div style={{borderRadius: '16px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px', background: 'white', border: '1px solid #E9EAEC', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'}}>
            <div style={{position: 'relative', flexShrink: 0}}>
              <div style={{width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800}}>AS</div>
              <div style={{position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', borderRadius: '50%', background: '#4ADE80', border: '2px solid white'}}/>
            </div>
            <div style={{flex: 1}}>
              <p style={{fontSize: '14px', fontWeight: 800, color: '#111318'}}>Ananya Singh</p>
              <p style={{fontSize: '12px', color: '#9CA3AF', marginTop: '2px'}}>Elder Care · Certified · 4.9 stars</p>
              <div style={{display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px'}}>
                <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#059669'}}/>
                <span style={{fontSize: '11px', fontWeight: 700, color: '#059669'}}>Active since 8:58 AM</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <span style={{fontSize: '10px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#9CA3AF'}}>Today's Plan</span>
          <div style={{marginTop: '8px', borderRadius: '16px', overflow: 'hidden', background: 'white', border: '1px solid #E9EAEC', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'}}>
            <div style={{padding: '10px 14px', background: '#FFFBEB', borderBottom: '1px solid rgba(217,119,6,0.12)', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <span style={{fontSize: '12px', fontWeight: 800, color: '#111318'}}>Ananya's plan for Papa Ji</span>
              <span style={{fontSize: '11px', color: '#9CA3AF', marginLeft: 'auto'}}>Mar 26</span>
            </div>
            {[
              {time: '8:58', task: 'Arrival & BP check', detail: '124/80 · Normal', status: 'done'},
              {time: '9:05', task: 'Morning medication', detail: 'Metformin 500mg', status: 'done'},
              {time: '9:30', task: 'Yoga session', detail: 'In progress', status: 'now'},
              {time: '11:00', task: 'Garden walk', detail: '20 min · Society compound', status: 'upcoming'},
              {time: '18:00', task: 'Family video call', detail: 'London + Toronto joining', status: 'upcoming'},
            ].map((item, i, arr) => (
              <div key={i} style={{display: 'flex', alignItems: 'flex-start', padding: '0 14px', position: 'relative'}}>
                {i < arr.length - 1 && <div style={{position: 'absolute', left: '27px', top: '24px', bottom: '-4px', width: '1px', background: '#F0F1F3'}}/>}
                <span style={{width: '40px', paddingTop: '11px', fontSize: '10px', fontWeight: 700, color: '#9CA3AF', flexShrink: 0}}>{item.time}</span>
                <div style={{paddingTop: '13px', marginRight: '10px', flexShrink: 0, position: 'relative', zIndex: 1}}>
                  <div style={{width: '11px', height: '11px', borderRadius: '50%', border: '2px solid', background: item.status === 'done' ? '#059669' : item.status === 'now' ? '#DC143C' : 'white', borderColor: item.status === 'done' ? '#059669' : item.status === 'now' ? '#DC143C' : '#D1D5DB', boxShadow: item.status === 'now' ? '0 0 0 3px rgba(220,20,60,0.15)' : 'none'}}/>
                </div>
                <div style={{flex: 1, padding: '9px 0'}}>
                  <p style={{fontSize: '13px', fontWeight: 700, color: item.status === 'done' ? '#9CA3AF' : '#111318', textDecoration: item.status === 'done' ? 'line-through' : 'none'}}>{item.task}</p>
                  <p style={{fontSize: '11px', color: '#9CA3AF', marginTop: '2px'}}>{item.detail}</p>
                  {item.status === 'now' && <span style={{display: 'inline-flex', marginTop: '4px', padding: '2px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: 700, background: '#FEF2F2', color: '#DC143C'}}>Live now</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span style={{fontSize: '10px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#9CA3AF'}}>Daily Update</span>
          <div style={{marginTop: '8px', borderRadius: '16px', padding: '16px', background: 'linear-gradient(135deg, #1E3A8A, #1B4FD8)', position: 'relative', overflow: 'hidden'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px'}}>
              <div style={{width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '11px', fontWeight: 800}}>AS</div>
              <div style={{flex: 1}}>
                <p style={{fontSize: '12px', fontWeight: 700, color: 'white'}}>Ananya Singh</p>
                <p style={{fontSize: '10px', color: 'rgba(255,255,255,0.5)'}}>Yesterday · 6:12 PM</p>
              </div>
              <span style={{padding: '3px 9px', borderRadius: '20px', background: 'rgba(255,255,255,0.12)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)'}}>Daily Update</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '2px', height: '28px', marginBottom: '10px'}}>
              {[20,35,55,40,70,85,60,45,80,65,50,75,90,70,55,40,65,80,45,60].map((h, i) => (
                <div key={i} style={{flex: 1, borderRadius: '2px', height: `${h}%`, background: i < 10 ? '#93B4FA' : 'rgba(255,255,255,0.2)'}}/>
              ))}
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <button style={{width: '36px', height: '36px', borderRadius: '50%', background: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#1B4FD8"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </button>
              <span style={{fontSize: '12px', color: 'rgba(255,255,255,0.5)', flex: 1}}>0:00 / 0:47</span>
            </div>
            <p style={{fontSize: '12px', fontStyle: 'italic', marginTop: '12px', color: 'rgba(255,255,255,0.6)', borderLeft: '2px solid rgba(255,255,255,0.2)', paddingLeft: '10px', lineHeight: 1.6}}>
              "Papa Ji is in wonderful spirits. He asked when Rohan is coming home. A surprise call tonight would mean everything."
            </p>
          </div>
        </div>

        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
            <span style={{fontSize: '10px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#9CA3AF'}}>Distance Rituals</span>
            <span style={{fontSize: '12px', fontWeight: 700, color: '#DC143C'}}>Manage</span>
          </div>
          <div style={{display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px'}}>
            {[
              {icon: '📞', name: 'Sunday Call', freq: 'Every Sunday', badge: 'In 4 days', bg: '#EFF6FF', color: '#2563EB'},
              {icon: '🎂', name: "Maa's Birthday", freq: 'March 29', badge: '3 days!', bg: '#FEF2F2', color: '#DC143C'},
              {icon: '💊', name: 'Evening Meds', freq: 'Daily · 8 PM', badge: 'Tonight', bg: '#ECFDF5', color: '#059669'},
            ].map((r) => (
              <div key={r.name} style={{flexShrink: 0, width: '140px', borderRadius: '16px', overflow: 'hidden', background: 'white', border: '1px solid #E9EAEC'}}>
                <div style={{height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', background: '#F5F6F8'}}>{r.icon}</div>
                <div style={{padding: '10px'}}>
                  <p style={{fontSize: '12px', fontWeight: 800, color: '#111318'}}>{r.name}</p>
                  <p style={{fontSize: '10px', color: '#9CA3AF', marginTop: '2px'}}>{r.freq}</p>
                  <span style={{display: 'inline-flex', marginTop: '8px', padding: '2px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: 700, background: r.bg, color: r.color}}>{r.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <BottomNav />
    </div>
  )
}
