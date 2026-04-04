import BottomNav from '../components/BottomNav'

export default function Wallet() {
  return (
    <div style={{minHeight: '100vh', background: '#F5F6F8', fontFamily: 'sans-serif', paddingBottom: '80px'}}>

      <div style={{background: 'linear-gradient(135deg, #0A1628 0%, #1E3A8A 60%, #DC143C 100%)', padding: '52px 20px 24px', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)'}}/>
        <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px', position: 'relative', zIndex: 1}}>
          <div>
            <p style={{fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.55)'}}>Total Balance</p>
            <p style={{fontSize: '42px', fontWeight: 800, color: 'white', letterSpacing: '-1px', marginTop: '4px', lineHeight: 1}}>₹12,450</p>
          </div>
        </div>
        <div style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '20px', padding: '20px', position: 'relative', zIndex: 1}}>
          <div style={{marginBottom: '18px'}}>
            <svg width="32" height="24" viewBox="0 0 32 24"><rect width="32" height="24" rx="4" fill="rgba(255,255,255,0.22)"/><rect x="3" y="6" width="10" height="8" rx="2" fill="rgba(255,255,255,0.5)"/></svg>
          </div>
          <p style={{fontSize: '16px', color: 'rgba(255,255,255,0.85)', letterSpacing: '3px', fontWeight: 500, marginBottom: '16px'}}>•••• •••• •••• 4291</p>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <p style={{fontSize: '10px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600}}>Cardholder</p>
              <p style={{fontSize: '14px', fontWeight: 800, color: 'white', marginTop: '2px'}}>Priya Sharma</p>
            </div>
            <div>
              <p style={{fontSize: '10px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600}}>Expires</p>
              <p style={{fontSize: '14px', fontWeight: 800, color: 'white', marginTop: '2px'}}>08/27</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px'}}>

        <div style={{display: 'flex', gap: '10px'}}>
          {[
            {label: 'Add Money', bg: '#EFF6FF', color: '#2563EB'},
            {label: 'Withdraw', bg: '#ECFDF5', color: '#059669'},
            {label: 'Transfer', bg: '#FFFBEB', color: '#D97706'},
            {label: 'Cards', bg: '#F5F3FF', color: '#7C3AED'},
          ].map((action) => (
            <div key={action.label} style={{flex: 1, background: 'white', borderRadius: '14px', border: '1px solid #E9EAEC', padding: '14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7px', cursor: 'pointer'}}>
              <div style={{width: '36px', height: '36px', borderRadius: '10px', background: action.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={action.color} strokeWidth="2" strokeLinecap="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              </div>
              <p style={{fontSize: '11px', fontWeight: 700, color: '#374151', textAlign: 'center'}}>{action.label}</p>
            </div>
          ))}
        </div>

        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
            <p style={{fontSize: '16px', fontWeight: 800, color: '#111318'}}>Transactions</p>
            <span style={{fontSize: '12px', fontWeight: 700, color: '#DC143C', cursor: 'pointer'}}>See all</span>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            {[
              {initials:'VP', color:'#D97706', bg:'#FFFBEB', name:'Vikram Patil · Electrician', date:'Today · 2 hrs', amount:'−₹945', debit:true},
              {initials:'AS', color:'#DC143C', bg:'#FEF2F2', name:'Ananya Singh · Elder Care', date:'Mar 25 · 4 hrs', amount:'−₹1,400', debit:true},
              {initials:'eS', color:'#059669', bg:'#ECFDF5', name:'Wallet Top-up · eSewa', date:'Mar 24 · UPI', amount:'+₹5,000', debit:false},
              {initials:'SK', color:'#2563EB', bg:'#EFF6FF', name:'Suresh Kumar · Plumber', date:'Mar 22 · 1 hr', amount:'−₹450', debit:true},
            ].map((txn, i) => (
              <div key={i} style={{background: 'white', borderRadius: '14px', border: '1px solid #E9EAEC', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 1px 2px rgba(0,0,0,0.04)'}}>
                <div style={{width: '42px', height: '42px', borderRadius: '12px', background: txn.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                  <span style={{fontSize: '14px', fontWeight: 800, color: txn.color}}>{txn.initials}</span>
                </div>
                <div style={{flex: 1, minWidth: 0}}>
                  <p style={{fontSize: '14px', fontWeight: 800, color: '#111318', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{txn.name}</p>
                  <p style={{fontSize: '11px', color: '#9CA3AF', marginTop: '2px', fontWeight: 500}}>{txn.date}</p>
                </div>
                <p style={{fontSize: '15px', fontWeight: 800, color: txn.debit ? '#DC143C' : '#059669', flexShrink: 0}}>{txn.amount}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', padding: '14px'}}>
          <p style={{fontSize: '13px', fontWeight: 800, color: '#111318', marginBottom: '10px'}}>Linked Payment Methods</p>
          {[
            {name:'eSewa', sub:'Linked · 9812XXXXXX', color:'#059669', bg:'#ECFDF5'},
            {name:'Khalti', sub:'Linked · 9801XXXXXX', color:'#7C3AED', bg:'#F5F3FF'},
          ].map((pm) => (
            <div key={pm.name} style={{display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: pm.bg, borderRadius: '10px', marginBottom: '6px'}}>
              <div style={{width: '32px', height: '32px', borderRadius: '8px', background: pm.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '11px', fontWeight: 800}}>{pm.name[0]}</div>
              <div style={{flex: 1}}>
                <p style={{fontSize: '13px', fontWeight: 700, color: '#111318'}}>{pm.name}</p>
                <p style={{fontSize: '11px', color: '#9CA3AF', fontWeight: 500}}>{pm.sub}</p>
              </div>
              <div style={{width: '8px', height: '8px', borderRadius: '50%', background: pm.color}}/>
            </div>
          ))}
        </div>

      </div>

      <BottomNav />
    </div>
  )
}
