'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import BottomNav from '../components/BottomNav'

export default function Wallet() {
  const { data: session } = useSession()
  const router = useRouter()
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user?.email) fetchBookings()
  }, [session])

  const fetchBookings = async () => {
    try {
      const res = await fetch(`/api/bookings?email=${session?.user?.email}`)
      const data = await res.json()
      setBookings(data.bookings || [])
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  const totalSpent = bookings.filter(b => b.paymentStatus === 'paid').reduce((sum, b) => sum + b.total, 0)
  const pending = bookings.filter(b => b.paymentStatus === 'unpaid').reduce((sum, b) => sum + b.total, 0)

  const paymentColor: any = {
    esewa: { bg: 'rgba(96,187,70,0.1)', color: '#60BB46', label: 'eSewa' },
    khalti: { bg: 'rgba(92,45,145,0.1)', color: '#5C2D91', label: 'Khalti' },
    bank: { bg: 'rgba(37,99,235,0.1)', color: '#2563EB', label: 'Bank' },
    pending: { bg: '#F5F6F8', color: '#9CA3AF', label: 'Pending' },
  }

  const statusColor: any = {
    pending: '#D97706',
    confirmed: '#059669',
    cancelled: '#DC143C',
    completed: '#2563EB',
  }

  const timeAgo = (date: string) => {
    const s = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  return (
    <div style={{minHeight: '100vh', background: '#F5F6F8', fontFamily: 'sans-serif', paddingBottom: '80px'}}>

      {/* Header */}
      <div style={{background: 'linear-gradient(135deg, #0A1628, #1C0008)', padding: '52px 20px 28px', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(220,20,60,0.15)', pointerEvents: 'none'}}/>
        <div style={{position: 'relative', zIndex: 1}}>
          <p style={{fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px'}}>Payment Center</p>
          <h1 style={{fontSize: '28px', fontWeight: 800, color: 'white', letterSpacing: '-0.5px', marginBottom: '4px'}}>NPR {totalSpent.toLocaleString()}</h1>
          <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.45)'}}>Total paid · {bookings.filter(b => b.paymentStatus === 'paid').length} bookings</p>

          {pending > 0 && (
            <div style={{marginTop: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(217,119,6,0.15)', border: '1px solid rgba(217,119,6,0.3)', borderRadius: '12px', padding: '8px 14px'}}>
              <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#D97706'}}/>
              <span style={{fontSize: '12px', fontWeight: 700, color: '#D97706'}}>NPR {pending.toLocaleString()} pending payment</span>
            </div>
          )}
        </div>
      </div>

      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px'}}>

        {/* Payment methods */}
        <div style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', padding: '16px'}}>
          <p style={{fontSize: '15px', fontWeight: 800, color: '#111318', marginBottom: '14px'}}>Accepted Payment Methods</p>
          <div style={{display: 'flex', gap: '10px'}}>
            {[
              {label: 'eSewa', color: '#60BB46', sub: 'Most popular'},
              {label: 'Khalti', color: '#5C2D91', sub: 'Fast & secure'},
              {label: 'Bank', color: '#2563EB', sub: 'Any Nepali bank'},
            ].map((pm) => (
              <div key={pm.label} style={{flex: 1, background: `${pm.color}10`, border: `1px solid ${pm.color}30`, borderRadius: '12px', padding: '12px', textAlign: 'center'}}>
                <p style={{fontSize: '13px', fontWeight: 800, color: pm.color}}>{pm.label}</p>
                <p style={{fontSize: '10px', color: '#9CA3AF', marginTop: '2px'}}>{pm.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Book a companion CTA */}
        <div onClick={() => router.push('/home')} style={{background: 'linear-gradient(135deg, #DC143C, #A50E2D)', borderRadius: '16px', padding: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div>
            <p style={{fontSize: '16px', fontWeight: 800, color: 'white', marginBottom: '4px'}}>Book a Companion</p>
            <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.7)'}}>Starting from NPR 280/hr</p>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>

        {/* Transaction history */}
        <div>
          <p style={{fontSize: '17px', fontWeight: 800, color: '#111318', marginBottom: '12px'}}>
            Transaction History {bookings.length > 0 && `(${bookings.length})`}
          </p>

          {loading && <div style={{textAlign: 'center', padding: '40px', color: '#9CA3AF'}}>Loading...</div>}

          {!loading && bookings.length === 0 && (
            <div style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', padding: '40px 20px', textAlign: 'center'}}>
              <div style={{fontSize: '48px', marginBottom: '16px'}}>💳</div>
              <p style={{fontSize: '16px', fontWeight: 800, color: '#111318', marginBottom: '8px'}}>No transactions yet</p>
              <p style={{fontSize: '13px', color: '#9CA3AF', marginBottom: '20px'}}>Book a companion to see your payment history here.</p>
              <button onClick={() => router.push('/home')}
                style={{padding: '12px 24px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif'}}>
                Find Companions
              </button>
            </div>
          )}

          <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            {bookings.map((booking) => {
              const pm = paymentColor[booking.paymentMethod] || paymentColor.pending
              return (
                <div key={booking._id} style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', overflow: 'hidden'}}>
                  <div style={{padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <div style={{width: '44px', height: '44px', borderRadius: '12px', background: pm.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                      <span style={{fontSize: '13px', fontWeight: 800, color: pm.color}}>{pm.label[0]}</span>
                    </div>
                    <div style={{flex: 1}}>
                      <p style={{fontSize: '14px', fontWeight: 800, color: '#111318'}}>{booking.companionName}</p>
                      <p style={{fontSize: '12px', color: '#9CA3AF', marginTop: '2px'}}>{booking.service} · {timeAgo(booking.createdAt)}</p>
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <p style={{fontSize: '15px', fontWeight: 800, color: '#111318'}}>NPR {booking.total}</p>
                      <p style={{fontSize: '11px', fontWeight: 700, color: booking.paymentStatus === 'paid' ? '#059669' : '#D97706', marginTop: '2px'}}>
                        {booking.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                      </p>
                    </div>
                  </div>
                  <div style={{padding: '8px 16px', background: '#F5F6F8', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{fontSize: '11px', color: '#9CA3AF'}}>Ref: {booking.confirmationCode}</span>
                    <span style={{fontSize: '11px', fontWeight: 700, color: statusColor[booking.status] || '#9CA3AF', textTransform: 'capitalize'}}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
