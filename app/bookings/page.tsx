'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import BottomNav from '../components/BottomNav'
import { DS } from '../design-system'

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
    } catch (e) {}
    setLoading(false)
  }

  const timeAgo = (date: string) => {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  const statusStyle: any = {
    pending: { color: DS.colors.warning, bg: DS.colors.warningBg, label: 'Pending' },
    confirmed: { color: DS.colors.success, bg: DS.colors.successBg, label: 'Confirmed' },
    completed: { color: DS.colors.info, bg: DS.colors.infoBg, label: 'Completed' },
    cancelled: { color: DS.colors.primary, bg: DS.colors.primaryLight, label: 'Cancelled' },
  }

  const payStyle: any = {
    unpaid: { color: DS.colors.warning, label: 'Payment Pending' },
    paid: { color: DS.colors.success, label: 'Paid' },
  }

  return (
    <div style={{minHeight: '100vh', background: DS.colors.pageBg, fontFamily: 'Inter, -apple-system, sans-serif', paddingBottom: '100px'}}>

      {/* Header */}
      <div style={{background: DS.colors.cardBg, padding: '52px 20px 16px', borderBottom: `1px solid ${DS.colors.border}`, position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 12px rgba(0,0,0,0.04)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <button onClick={() => router.back()} style={{width: '40px', height: '40px', borderRadius: DS.radius.icon, background: DS.colors.pageBg, border: `1px solid ${DS.colors.borderStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={DS.colors.text2} strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div>
            <h1 style={{...DS.font.h2, color: DS.colors.text1}}>My Bookings</h1>
            <p style={{...DS.font.caption, color: DS.colors.text3, marginTop: '3px'}}>{bookings.length} total booking{bookings.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px'}}>

        {loading && (
          <div style={{textAlign: 'center', padding: '60px 20px'}}>
            <div style={{width: '36px', height: '36px', border: `3px solid ${DS.colors.borderStrong}`, borderTop: `3px solid ${DS.colors.primary}`, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px'}}/>
            <p style={{...DS.font.bodySm, color: DS.colors.text3}}>Loading bookings…</p>
          </div>
        )}

        {!loading && bookings.length === 0 && (
          <div style={{background: DS.colors.cardBg, borderRadius: DS.radius.card, border: `1px solid ${DS.colors.borderStrong}`, padding: '48px 24px', textAlign: 'center', boxShadow: DS.shadow.card}}>
            <div style={{fontSize: '52px', marginBottom: '16px'}}>📅</div>
            <h3 style={{...DS.font.h3, color: DS.colors.text1, marginBottom: '8px'}}>No bookings yet</h3>
            <p style={{...DS.font.bodySm, color: DS.colors.text3, marginBottom: '24px'}}>Book a companion or home service to get started.</p>
            <button onClick={() => router.push('/home')}
              style={{padding: '13px 28px', background: DS.gradient.primary, border: 'none', borderRadius: DS.radius.button, color: 'white', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: DS.shadow.primary}}>
              Find Services
            </button>
          </div>
        )}

        {bookings.map((booking) => {
          const st = statusStyle[booking.status] || statusStyle.pending
          const pt = payStyle[booking.paymentStatus] || payStyle.unpaid
          return (
            <div key={booking._id} style={{background: DS.colors.cardBg, borderRadius: DS.radius.card, border: `1px solid ${DS.colors.border}`, overflow: 'hidden', boxShadow: DS.shadow.card}}>
              <div style={{padding: '16px'}}>
                <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <div style={{width: '48px', height: '48px', borderRadius: '50%', background: DS.gradient.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '16px', flexShrink: 0, boxShadow: DS.shadow.primary}}>
                      {booking.companionName?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                    </div>
                    <div>
                      <p style={{...DS.font.h4, color: DS.colors.text1}}>{booking.companionName}</p>
                      <p style={{...DS.font.caption, color: DS.colors.text3, marginTop: '2px'}}>{booking.companionRole} · {timeAgo(booking.createdAt)}</p>
                    </div>
                  </div>
                  <div style={{padding: '4px 10px', borderRadius: DS.radius.pill, background: st.bg}}>
                    <span style={{fontSize: '11px', fontWeight: 700, color: st.color}}>{st.label}</span>
                  </div>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  {[
                    { label: 'Service', value: booking.service },
                    { label: 'Date', value: booking.date },
                    { label: 'Time', value: `${booking.time} · ${booking.duration}hr` },
                    { label: 'Total', value: `NPR ${booking.total?.toLocaleString()}`, bold: true, color: DS.colors.primary },
                  ].map((item, i) => (
                    <div key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <span style={{...DS.font.caption, color: DS.colors.text3}}>{item.label}</span>
                      <span style={{fontSize: '14px', fontWeight: item.bold ? 800 : 600, color: item.color || DS.colors.text1}}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{padding: '12px 16px', background: DS.colors.pageBg, borderTop: `1px solid ${DS.colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{...DS.font.caption, color: DS.colors.text3}}>Ref: {booking.confirmationCode}</span>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                  <div style={{width: '5px', height: '5px', borderRadius: '50%', background: pt.color}}/>
                  <span style={{fontSize: '11px', fontWeight: 700, color: pt.color}}>{pt.label}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <BottomNav />
    </div>
  )
}
