'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import BottomNav from '../components/BottomNav'

export default function Bookings() {
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

  const statusColor: any = {
    pending: { bg: '#FFFBEB', color: '#D97706', label: 'Pending Payment' },
    confirmed: { bg: '#ECFDF5', color: '#059669', label: 'Confirmed' },
    cancelled: { bg: '#FEF2F2', color: '#DC143C', label: 'Cancelled' },
    completed: { bg: '#EFF6FF', color: '#2563EB', label: 'Completed' },
  }

  const timeAgo = (date: string) => {
    const s = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  return (
    <div style={{minHeight: '100vh', background: '#F5F6F8', fontFamily: 'sans-serif', paddingBottom: '80px'}}>

      <div style={{background: 'white', padding: '52px 20px 16px', borderBottom: '1px solid #F0F1F3', position: 'sticky', top: 0, zIndex: 50}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <button onClick={() => router.back()} style={{width: '36px', height: '36px', borderRadius: '10px', background: '#F5F6F8', border: '1px solid #E9EAEC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A5060" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <h1 style={{fontSize: '22px', fontWeight: 800, color: '#111318', letterSpacing: '-0.4px'}}>My Bookings</h1>
        </div>
      </div>

      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px'}}>

        {loading && <div style={{textAlign: 'center', padding: '40px', color: '#9CA3AF'}}>Loading...</div>}

        {!loading && bookings.length === 0 && (
          <div style={{textAlign: 'center', padding: '60px 20px'}}>
            <div style={{fontSize: '48px', marginBottom: '16px'}}>📅</div>
            <p style={{fontSize: '18px', fontWeight: 800, color: '#111318', marginBottom: '8px'}}>No bookings yet</p>
            <p style={{fontSize: '14px', color: '#9CA3AF', marginBottom: '24px'}}>Book a companion to get started.</p>
            <button onClick={() => router.push('/home')}
              style={{padding: '12px 24px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', border: 'none', borderRadius: '14px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif'}}>
              Find Companions
            </button>
          </div>
        )}

        {bookings.map((booking) => (
          <div key={booking._id} style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'}}>
            <div style={{padding: '14px 16px', borderBottom: '1px solid #F0F1F3', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <p style={{fontSize: '15px', fontWeight: 800, color: '#111318'}}>{booking.companionName}</p>
                <p style={{fontSize: '12px', color: '#9CA3AF', marginTop: '2px'}}>{booking.companionRole} · {timeAgo(booking.createdAt)}</p>
              </div>
              <div style={{padding: '4px 10px', borderRadius: '20px', background: statusColor[booking.status]?.bg, fontSize: '11px', fontWeight: 700, color: statusColor[booking.status]?.color}}>
                {statusColor[booking.status]?.label}
              </div>
            </div>
            <div style={{padding: '14px 16px'}}>
              {[
                { label: 'Service', value: booking.service },
                { label: 'Date', value: booking.date },
                { label: 'Time', value: `${booking.time} · ${booking.duration}hr` },
                { label: 'Total', value: `NPR ${booking.total}` },
                { label: 'Payment', value: booking.paymentMethod?.toUpperCase() || 'Pending' },
              ].map((item, i) => (
                <div key={i} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '6px'}}>
                  <span style={{fontSize: '12px', color: '#9CA3AF', fontWeight: 500}}>{item.label}</span>
                  <span style={{fontSize: '13px', fontWeight: 700, color: '#111318'}}>{item.value}</span>
                </div>
              ))}
            </div>
            <div style={{padding: '10px 16px', background: '#F5F6F8', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span style={{fontSize: '11px', color: '#9CA3AF', fontWeight: 500}}>Ref: {booking.confirmationCode}</span>
              <span style={{fontSize: '11px', fontWeight: 700, color: booking.paymentStatus === 'paid' ? '#059669' : '#D97706'}}>
                {booking.paymentStatus === 'paid' ? 'Payment Done' : 'Payment Pending'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
