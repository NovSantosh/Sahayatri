export default function Professional() {
  return (
    <div style={{minHeight: '100vh', background: '#F5F6F8', fontFamily: 'sans-serif'}}>

      {/* Hero */}
      <div style={{height: '280px', background: 'linear-gradient(160deg, #0A1628 0%, #1E3A8A 60%, #1B4FD8 100%)', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)'}}/>
        <div style={{position: 'absolute', top: '52px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between'}}>
          <a href="/" style={{width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)'}}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </a>
          <button style={{width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.85)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
        <div style={{position: 'absolute', bottom: '-36px', left: '20px'}}>
          <div style={{width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: '4px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '28px', fontWeight: 800}}>VP</div>
        </div>
        <div style={{position: 'absolute', bottom: '16px', left: '116px', right: '16px'}}>
          <h1 style={{fontSize: '22px', fontWeight: 800, color: 'white', letterSpacing: '-0.3px'}}>Vikram Patil</h1>
          <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '2px', fontWeight: 500}}>Licensed Electrician · 8 years · Mumbai</p>
        </div>
      </div>

      <div style={{padding: '52px 16px 140px', display: 'flex', flexDirection: 'column', gap: '14px'}}>

        {/* Stats */}
        <div style={{display: 'flex', background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'}}>
          {[{val:'4.9',label:'Rating'},{val:'312',label:'Jobs'},{val:'8yr',label:'Experience'},{val:'₹450',label:'Per Hour'}].map((s,i) => (
            <div key={i} style={{flex:1, textAlign:'center', padding:'14px 6px', borderRight: i<3 ? '1px solid #F0F1F3' : 'none'}}>
              <p style={{fontSize:'20px', fontWeight:800, color:'#111318', letterSpacing:'-0.3px'}}>{s.val}</p>
              <p style={{fontSize:'10px', fontWeight:700, color:'#9CA3AF', marginTop:'2px', textTransform:'uppercase', letterSpacing:'0.5px'}}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Verified */}
        <div style={{display:'flex', alignItems:'center', gap:'12px', background:'#ECFDF5', borderRadius:'14px', border:'1px solid rgba(5,150,105,0.15)', padding:'13px 14px'}}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
          <div>
            <p style={{fontSize:'13px', fontWeight:800, color:'#059669'}}>Sahayatri Verified Professional</p>
            <p style={{fontSize:'11px', color:'rgba(5,150,105,0.75)', marginTop:'1px', fontWeight:500}}>ID verified · Police cleared · Skill certified · Insured</p>
          </div>
        </div>

        {/* Tags */}
        <div style={{display:'flex', flexWrap:'wrap', gap:'7px'}}>
          {[
            {label:'Wiring', bg:'#FFFBEB', color:'#D97706'},
            {label:'Fixtures', bg:'#FFFBEB', color:'#D97706'},
            {label:'Smart Home', bg:'#EFF6FF', color:'#2563EB'},
            {label:'MCB/Fuse', bg:'#FFFBEB', color:'#D97706'},
            {label:'AC Install', bg:'#ECFDF5', color:'#059669'},
            {label:'Emergency', bg:'#F5F3FF', color:'#7C3AED'},
          ].map((tag) => (
            <span key={tag.label} style={{padding:'5px 12px', borderRadius:'20px', fontSize:'11px', fontWeight:700, background:tag.bg, color:tag.color, border:`1.5px solid ${tag.color}33`}}>{tag.label}</span>
          ))}
        </div>

        {/* About */}
        <div style={{background:'white', borderRadius:'16px', border:'1px solid #E9EAEC', padding:'15px', boxShadow:'0 1px 3px rgba(0,0,0,0.06)'}}>
          <p style={{fontSize:'15px', fontWeight:800, color:'#111318', marginBottom:'8px'}}>About Vikram</p>
          <p style={{fontSize:'14px', color:'#4A5060', lineHeight:1.7, fontWeight:400}}>Licensed electrician with 8+ years serving homes across Mumbai. Specialise in residential wiring, smart home installations, and emergency repairs. All work comes with a 6-month service guarantee.</p>
        </div>

        {/* Calendar */}
        <div style={{background:'white', borderRadius:'16px', border:'1px solid #E9EAEC', padding:'14px', boxShadow:'0 1px 3px rgba(0,0,0,0.06)'}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'12px'}}>
            <p style={{fontSize:'15px', fontWeight:800, color:'#111318'}}>Availability — March 2025</p>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'3px', textAlign:'center', marginBottom:'3px'}}>
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
              <div key={d} style={{fontSize:'10px', fontWeight:700, color:'#9CA3AF', padding:'3px 0'}}>{d}</div>
            ))}
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'3px', textAlign:'center'}}>
            {[
              {d:'',t:'e'},{d:'',t:'e'},{d:'',t:'e'},{d:'',t:'e'},
              {d:'1',t:'a'},{d:'2',t:'a'},{d:'3',t:'b'},
              {d:'4',t:'a'},{d:'5',t:'a'},{d:'6',t:'b'},{d:'7',t:'a'},
              {d:'8',t:'a'},{d:'9',t:'a'},{d:'10',t:'a'},
              {d:'11',t:'a'},{d:'12',t:'b'},{d:'13',t:'a'},{d:'14',t:'a'},
              {d:'15',t:'a'},{d:'16',t:'b'},{d:'17',t:'a'},
              {d:'18',t:'a'},{d:'19',t:'a'},{d:'20',t:'a'},{d:'21',t:'s'},
              {d:'22',t:'a'},{d:'23',t:'a'},{d:'24',t:'b'},
              {d:'25',t:'a'},{d:'26',t:'a'},{d:'27',t:'a'},{d:'28',t:'a'},
              {d:'29',t:'a'},{d:'30',t:'a'},{d:'31',t:'a'},
            ].map((day,i) => (
              <div key={i} style={{
                aspectRatio:'1', display:'flex', alignItems:'center', justifyContent:'center',
                borderRadius:'8px', fontSize:'12px', fontWeight:600,
                background: day.t==='a' ? '#ECFDF5' : day.t==='b' ? '#F5F6F8' : day.t==='s' ? '#DC143C' : 'transparent',
                color: day.t==='a' ? '#059669' : day.t==='b' ? '#9CA3AF' : day.t==='s' ? 'white' : 'transparent',
                textDecoration: day.t==='b' ? 'line-through' : 'none',
              }}>{day.d}</div>
            ))}
          </div>
          <div style={{display:'flex', gap:'14px', marginTop:'10px'}}>
            {[{color:'#ECFDF5',label:'Available'},{color:'#F5F6F8',label:'Booked'},{color:'#DC143C',label:'Selected'}].map(l => (
              <div key={l.label} style={{display:'flex', alignItems:'center', gap:'5px'}}>
                <div style={{width:'9px', height:'9px', borderRadius:'2px', background:l.color}}/>
                <span style={{fontSize:'10px', color:'#9CA3AF', fontWeight:500}}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div>
          <p style={{fontSize:'15px', fontWeight:800, color:'#111318', marginBottom:'10px'}}>Reviews (312)</p>
          <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
            {[
              {initials:'PS', color:'#DC143C', name:'Priya S.', date:'2 days ago', text:'Fixed our kitchen wiring in 3 hours. Clean work, explained everything clearly. Will call again.'},
              {initials:'RK', color:'#2563EB', name:'Rahul K.', date:'1 week ago', text:'Set up my entire smart home system. Very knowledgeable, left the place spotless.'},
            ].map((rev) => (
              <div key={rev.name} style={{background:'#F5F6F8', borderRadius:'12px', padding:'12px'}}>
                <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'7px'}}>
                  <div style={{width:'30px', height:'30px', borderRadius:'50%', background:rev.color, display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:'11px', fontWeight:800}}>{rev.initials}</div>
                  <div style={{flex:1}}>
                    <p style={{fontSize:'13px', fontWeight:700, color:'#111318'}}>{rev.name}</p>
                    <div style={{display:'flex', gap:'1px', marginTop:'1px'}}>
                      {[1,2,3,4,5].map(s => <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill="#D97706"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                    </div>
                  </div>
                  <span style={{fontSize:'10px', color:'#9CA3AF', fontWeight:500}}>{rev.date}</span>
                </div>
                <p style={{fontSize:'13px', color:'#4A5060', lineHeight:1.55, fontWeight:400}}>{rev.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Book bar */}
      <div style={{position:'fixed', bottom:0, left:0, right:0, background:'white', padding:'13px 16px 32px', borderTop:'1px solid #E9EAEC', boxShadow:'0 -4px 20px rgba(0,0,0,0.06)', zIndex:100}}>
        <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
          <div>
            <p style={{fontSize:'22px', fontWeight:800, color:'#111318', letterSpacing:'-0.3px'}}>₹450<span style={{fontSize:'13px', fontWeight:400, color:'#9CA3AF'}}>/hr</span></p>
            <p style={{fontSize:'11px', color:'#9CA3AF', fontWeight:500}}>Free cancel · 6-month guarantee</p>
          </div>
          <button style={{flex:1, padding:'14px', background:'linear-gradient(135deg, #DC143C, #A50E2D)', color:'white', border:'none', borderRadius:'20px', fontSize:'15px', fontWeight:800, cursor:'pointer', fontFamily:'sans-serif', boxShadow:'0 4px 14px rgba(220,20,60,0.35)'}}>
            Book Vikram
          </button>
        </div>
      </div>

    </div>
  );
}
