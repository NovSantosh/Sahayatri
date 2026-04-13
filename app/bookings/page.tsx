'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import BottomNav from '../components/BottomNav'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'
import { CalendarIcon, ClockIcon, LocationIcon, CheckIcon, ArrowLeftIcon, WalletIcon } from '../components/Icons'

interface Booking {
  _id: string
  serviceName: string
  providerName: string
  date: string
  time: string
  address: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  paymentStatus: 'unpaid' | 'paid'
  amount: number
  createdAt: string
}

export default function Bookings() {
  const { data: session } = useSession()
  const { t } = useTheme()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed'>('all')

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
    if (s < 60) return 'just now'
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`
    return `${Math.floor(s / 86400)}d ago`
  }

  const statusConfig: any = {
    pending:   { label: 'Pending',   color: brand.warning, bg: 'rgba(245,158,11,0.1)' },
    confirmed: { label: 'Confirmed', color: '#3B82F6',    bg: 'rgba(59,130,246,0.1)' },
    completed: { label: 'Completed', color: brand.success, bg: 'rgba(16,185,129,0.1)' },
    cancelled: { label: 'Cancelled', color: t.text3,       bg: t.inputBg },
  }

  const paymentConfig: any = {
    unpaid: { label: 'Unpaid', color: brand.primary, bg: brand.primaryLight },
    paid:   { label: 'Paid',   color: brand.success,  bg: 'rgba(16,185,129,0.1)' },
  }

  const filtered = bookings.filter(b => {
    if (activeTab === 'upcoming') return b.status === 'pending' || b.status === 'confirmed'
    if (activeTab === 'completed') return b.status === 'completed'
    return true
  })

  const unpaidCount = bookings.filter(b => b.paymentStatus === 'unpaid').length

  const card = {
    background: t.cardBg,
    borderRadius: '20px',
    border: `1px solid ${t.border}`,
    boxShadow: t.shadow,
    transition: 'background 0.3s ease, border-color 0.3s ease',
  }

  return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, -apple-system, sans-serif', paddingBottom: '100px', transition: 'background 0.3s ease'}}>

      {/* ── HEADER ── */}
      <div style={{background: t.headerBg, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: '52px 20px 0', borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 50, transition: 'background 0.3s ease'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px'}}>
          <div>
            <h1 style={{fontSize: '24px', fontWeight: 900, color: t.text1, letterSpacing: '-0.8px', transition: 'color 0.3s ease'}}>My Bookings</h1>
            <p style={{fontSize: '12px', color: t.text3, marginTop: '3px'}}>
              {bookings.length > 0 ? `${bookings.length} total · ${unpaidCount > 0 ? `${unpaidCount} unpaid` : 'all paid'}` : 'No bookings yet'}
            </p>
          </div>
          <button onClick={() => router.push('/services')}
            style={{padding: '9px 16px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '9999px', color: 'white', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 12px rgba(220,20,60,0.3)'}}>
            + Book
          </button>
        </div>

        {/* Tabs */}
        <div style={{display: 'flex', gap: '6px', paddingBottom: '14px'}}>
          {(['all', 'upcoming', 'completed'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{flexShrink: 0, padding: '7px 18px', borderRadius: '9999px', border: 'none', background: activeTab === tab ? 'linear-gradient(135deg, #DC143C, #A50E2D)' : t.inputBg, color: activeTab === tab ? 'white' : t.text3, fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease', boxShadow: activeTab === tab ? '0 4px 12px rgba(220,20,60,0.25)' : 'none', textTransform: 'capitalize'}}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px'}}>

        {/* Unpaid banner */}
        {unpaidCount > 0 && (
          <div style={{background: brand.primaryLight, border: `1px solid ${brand.primaryBorder}`, borderRadius: '16px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div style={{width: '38px', height: '38px', borderRadius: '12px', background: brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(220,20,60,0.3)'}}>
              <WalletIcon size={20} color="white" strokeWidth={2}/>
            </div>
            <div style={{flex: 1}}>
              <p style={{fontSize: '14px', fontWeight: 700, color: brand.primary}}>
                {unpaidCount} payment{unpaidCount > 1 ? 's' : ''} due
              </p>
              <p style={{fontSize: '12px', color: brand.primary, opacity: 0.7, marginTop: '2px'}}>
                Complete your payment to confirm bookings
              </p>
            </div>
            <button onClick={() => router.push('/wallet')}
              style={{padding: '8px 14px', background: brand.primary, border: 'none', borderRadius: '10px', color: 'white', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', flexShrink: 0}}>
              Pay now
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{textAlign: 'center', padding: '60px 20px'}}>
            <div style={{width: '36px', height: '36px', border: `3px solid ${t.border}`, borderTop: `3px solid ${brand.primary}`, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px'}}/>
            <p style={{fontSize: '13px', color: t.text3}}>Loading bookings…</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div style={{...card, padding: '56px 24px', textAlign: 'center', marginTop: '8px'}}>
            <div style={{width: '64px', height: '64px', borderRadius: '50%', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'}}>
              <CalendarIcon size={28} color={brand.primary} strokeWidth={1.5}/>
            </div>
            <h3 style={{fontSize: '17px', fontWeight: 700, color: t.text1, marginBottom: '8px', transition: 'color 0.3s ease'}}>
              {activeTab === 'all' ? 'No bookings yet' : `No ${activeTab} bookings`}
            </h3>
            <p style={{fontSize: '13px', color: t.text3, lineHeight: 1.6, maxWidth: '220px', margin: '0 auto 20px'}}>
              Book a home service and it will appear here.
            </p>
            <button onClick={() => router.push('/services')}
              style={{padding: '12px 24px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '14px', color: 'white', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 16px rgba(220,20,60,0.3)'}}>
              Browse Services
            </button>
          </div>
        )}

        {/* Bookings list */}
        {!loading && filtered.map((booking) => {
          const status = statusConfig[booking.status] || statusConfig.pending
          const payment = paymentConfig[booking.paymentStatus] || paymentConfig.unpaid

          return (
            <div key={booking._id} style={{...card, overflow: 'hidden'}}>

              {/* Top bar — colored by status */}
              <div style={{height: '3px', background: status.color, opacity: 0.6}}/>

              <div style={{padding: '16px'}}>
                {/* Service name + badges */}
                <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px', gap: '10px'}}>
                  <div style={{flex: 1}}>
                    <h3 style={{fontSize: '16px', fontWeight: 800, color: t.text1, marginBottom: '3px', letterSpacing: '-0.3px', transition: 'color 0.3s ease'}}>{booking.serviceName}</h3>
                    <p style={{fontSize: '13px', color: t.text2, transition: 'color 0.3s ease'}}>{booking.providerName}</p>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end', flexShrink: 0}}>
                    <div style={{padding: '3px 10px', borderRadius: '9999px', background: status.bg}}>
                      <span style={{fontSize: '10px', fontWeight: 700, color: status.color}}>{status.label}</span>
                    </div>
                    <div style={{padding: '3px 10px', borderRadius: '9999px', background: payment.bg}}>
                      <span style={{fontSize: '10px', fontWeight: 700, color: payment.color}}>{payment.label}</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px'}}>
                  {booking.date && (
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <div style={{width: '30px', height: '30px', borderRadius: '9px', background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                        <CalendarIcon size={15} color={'#3B82F6'} strokeWidth={2}/>
                      </div>
                      <p style={{fontSize: '13px', color: t.text2, transition: 'color 0.3s ease'}}>{booking.date}{booking.time ? ` · ${booking.time}` : ''}</p>
                    </div>
                  )}
                  {booking.address && (
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <div style={{width: '30px', height: '30px', borderRadius: '9px', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                        <LocationIcon size={15} color={brand.success} strokeWidth={2}/>
                      </div>
                      <p style={{fontSize: '13px', color: t.text2, transition: 'color 0.3s ease'}}>{booking.address}</p>
                    </div>
                  )}
                  {booking.amount > 0 && (
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <div style={{width: '30px', height: '30px', borderRadius: '9px', background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                        <WalletIcon size={15} color={brand.warning} strokeWidth={2}/>
                      </div>
                      <p style={{fontSize: '13px', fontWeight: 700, color: t.text1, transition: 'color 0.3s ease'}}>NPR {booking.amount.toLocaleString()}</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: `1px solid ${t.border}`}}>
                  <p style={{fontSize: '11px', color: t.text3}}>Booked {timeAgo(booking.createdAt)}</p>
                  {booking.paymentStatus === 'unpaid' && booking.status !== 'cancelled' && (
                    <button onClick={() => router.push('/wallet')}
                      style={{padding: '8px 16px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '10px', color: 'white', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 12px rgba(220,20,60,0.3)'}}>
                      Pay now
                    </button>
                  )}
                  {booking.status === 'completed' && (
                    <div style={{display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(16,185,129,0.1)', borderRadius: '9999px', padding: '5px 12px'}}>
                      <CheckIcon size={12} color={brand.success} strokeWidth={2.5}/>
                      <span style={{fontSize: '11px', fontWeight: 700, color: brand.success}}>Completed</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {/* Bottom tip */}
        {!loading && bookings.length > 0 && (
          <div style={{textAlign: 'center', padding: '16px 20px'}}>
            <p style={{fontSize: '13px', color: t.text3}}>Need help with a booking? Contact support.</p>
          </div>
        )}

      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <BottomNav/>
    </div>
  )
}
