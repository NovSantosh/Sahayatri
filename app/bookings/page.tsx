'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTheme } from '../context/ThemeContext'
import * as ds from '../design-system'
import { CalendarIcon } from '../components/Icons'
import PaymentSheet from '../components/PaymentSheet'

interface Booking {
  _id: string
  service: string
  companionName: string
  companionRole: string
  date: string
  time: string
  notes: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  paymentStatus: 'unpaid' | 'paid'
  total: number
  rate: number
  confirmationCode: string
  createdAt: string
}

export default function Bookings() {
  const { data: session } = useSession()
  const { t } = useTheme()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed'>('all')
  const [payBooking, setPayBooking] = useState<Booking | null>(null)

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

  const firstName = (session?.user?.name || 'there').split(' ')[0]
  const amountOf = (b: Booking) => b.total || b.rate || 0
  const hasNamedCompanion = (b: Booking) =>
    !!b.companionName && b.companionName !== b.service && b.companionName !== 'Any available'
  const providerOf = (b: Booking) => hasNamedCompanion(b) ? b.companionName : (b.companionRole || 'Home service')
  const initialsOf = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  const fmtWhen = (b: Booking) => {
    let datePart = ''
    if (b.date) {
      const d = new Date(b.date)
      datePart = isNaN(d.getTime()) ? b.date : d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })
    }
    return [datePart, b.time].filter(Boolean).join(' · ')
  }

  const statusConfig: Record<string, { label: string; color: string; bg: string; strip: string }> = {
    pending:   { label: 'Pending',   color: '#854F0B', bg: 'rgba(245,158,11,0.12)', strip: '#F59E0B' },
    confirmed: { label: 'Confirmed', color: '#0F6E56', bg: 'rgba(16,185,129,0.12)', strip: '#10B981' },
    completed: { label: 'Completed', color: '#0F6E56', bg: 'rgba(16,185,129,0.12)', strip: '#10B981' },
    cancelled: { label: 'Cancelled', color: t.text3,   bg: 'rgba(0,0,0,0.05)',     strip: '#9CA3AF' },
  }

  const avatarGrad = (name: string) => {
    const grads = [
      'linear-gradient(135deg,#F4A0B5,#DC143C)',
      'linear-gradient(135deg,#9FD0F4,#3B82F6)',
      'linear-gradient(135deg,#F8C77E,#E08C1E)',
      'linear-gradient(135deg,#A7E0C8,#10B981)',
      'linear-gradient(135deg,#C3B8F5,#6366F1)',
    ]
    let h = 0
    for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
    return grads[Math.abs(h) % grads.length]
  }

  const filtered = bookings.filter(b => {
    if (activeTab === 'upcoming') return b.status === 'pending' || b.status === 'confirmed'
    if (activeTab === 'completed') return b.status === 'completed'
    return true
  })

  const totalCount = bookings.length
  const confirmedCount = bookings.filter(b => b.status === 'confirmed' || b.status === 'completed').length
  const pendingCount = bookings.filter(b => b.paymentStatus === 'unpaid' && b.status !== 'cancelled').length

  const pageBg = '#F4EEF0'
  const heroGrad = `linear-gradient(140deg, ${ds.brand.primary}, ${ds.brand.primaryDark})`

  return (
    <div style={{ minHeight: '100dvh', background: pageBg, fontFamily: 'Inter, -apple-system, sans-serif', paddingBottom: '40px' }}>

      <div style={{ padding: '52px 16px 0' }}>
        {/* HERO */}
        <div className="anim" style={{ background: heroGrad, borderRadius: '22px', padding: '18px', color: 'white', boxShadow: '0 12px 32px rgba(220,20,60,0.28)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-40px', right: '-30px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}/>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ ...ds.type.caption, opacity: 0.85 }}>नमस्ते, {firstName}</p>
            <p style={{ ...ds.type.h3, marginTop: '3px', marginBottom: '14px' }}>
              {pendingCount > 0 ? `${pendingCount} booking${pendingCount > 1 ? 's' : ''} need payment` : 'Your family is in good hands'}
            </p>
            <div style={{ display: 'flex', gap: ds.space.sm }}>
              {[{ n: totalCount, l: 'Bookings' }, { n: confirmedCount, l: 'Confirmed' }, { n: pendingCount, l: 'To pay' }].map((s, i) => (
                <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.14)', borderRadius: ds.radius.md, padding: '10px' }}>
                  <p style={{ ...ds.type.h3 }}>{s.n}</p>
                  <p style={{ ...ds.type.caption, opacity: 0.85, marginTop: '2px' }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="anim" style={{ display: 'flex', gap: '6px', marginTop: ds.space.lg, animationDelay: '60ms' }}>
          {(['all', 'upcoming', 'completed'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ padding: '8px 18px', borderRadius: ds.radius.full, border: 'none', background: activeTab === tab ? ds.brand.primary : '#FFFFFF', color: activeTab === tab ? 'white' : t.text3, ...ds.type.caption, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease', textTransform: 'capitalize', boxShadow: activeTab === tab ? '0 4px 12px rgba(220,20,60,0.25)' : '0 1px 3px rgba(0,0,0,0.04)' }}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '18px 16px 0', display: 'flex', flexDirection: 'column', gap: ds.space.md }}>

        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ width: '32px', height: '32px', border: '3px solid rgba(0,0,0,0.08)', borderTop: `3px solid ${ds.brand.primary}`, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 14px' }}/>
            <p style={{ ...ds.type.caption, color: t.text3 }}>Loading bookings…</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="anim" style={{ background: '#FFFFFF', borderRadius: ds.radius.xl, padding: '48px 24px', textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: ds.brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <CalendarIcon size={26} color={ds.brand.primary} strokeWidth={1.5}/>
            </div>
            <h3 style={{ ...ds.type.h3, color: '#0F0F10', marginBottom: '6px' }}>{activeTab === 'all' ? 'No bookings yet' : `No ${activeTab} bookings`}</h3>
            <p style={{ ...ds.type.caption, color: t.text3, maxWidth: '220px', margin: '0 auto 18px' }}>Book care or a home service and it will appear here.</p>
            <button onClick={() => router.push('/care')} className="pressable"
              style={{ padding: '11px 24px', background: heroGrad, border: 'none', borderRadius: ds.radius.md, color: 'white', ...ds.type.bodyBold, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 16px rgba(220,20,60,0.3)' }}>Book Now</button>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <p style={{ ...ds.type.bodyBold, color: '#0F0F10', marginBottom: '-4px' }}>Your bookings</p>
        )}

        {!loading && filtered.map((b, i) => {
          const status = statusConfig[b.status] || statusConfig.pending
          const isUnpaid = b.paymentStatus === 'unpaid' && b.status !== 'cancelled'
          const isPaid = b.paymentStatus === 'paid'
          const provider = providerOf(b)
          const when = fmtWhen(b)

          // CALM style for paid/settled cards
          if (isPaid) {
            return (
              <div key={b._id} className="anim" style={{ background: '#FFFFFF', borderRadius: ds.radius.xl, padding: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', animationDelay: `${i * 70}ms` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: avatarGrad(provider), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>{initialsOf(provider)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ ...ds.type.h3, color: '#0F0F10', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{hasNamedCompanion(b) ? provider : b.service}</p>
                    <p style={{ ...ds.type.caption, color: t.text3, marginTop: '3px' }}>{hasNamedCompanion(b) ? b.service : 'Home service'}</p>
                  </div>
                  <span style={{ ...ds.type.label, color: '#0F6E56', background: 'rgba(16,185,129,0.12)', padding: '4px 10px', borderRadius: ds.radius.full, flexShrink: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="3.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>Paid
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: ds.space.md, paddingTop: ds.space.md, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <span style={{ ...ds.type.caption, color: t.text3 }}>{when || 'Scheduled'}</span>
                  <span style={{ ...ds.type.bodyBold, color: '#0F0F10' }}>NPR {amountOf(b).toLocaleString()}</span>
                </div>
              </div>
            )
          }

          // RICH style for unpaid / active cards
          return (
            <div key={b._id} className="anim" style={{ background: '#FFFFFF', borderRadius: ds.radius.xl, padding: '16px', boxShadow: '0 6px 20px rgba(0,0,0,0.06)', animationDelay: `${i * 70}ms` }}>
              <div style={{ display: 'flex', gap: '13px', alignItems: 'center' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: avatarGrad(provider), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '17px', flexShrink: 0 }}>{initialsOf(provider)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ ...ds.type.h3, color: '#0F0F10', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{hasNamedCompanion(b) ? provider : b.service}</p>
                  <p style={{ ...ds.type.caption, color: t.text3, marginTop: '3px' }}>{hasNamedCompanion(b) ? b.service : 'Home service'}</p>
                </div>
                <span style={{ ...ds.type.label, color: status.color, background: status.bg, padding: '4px 10px', borderRadius: ds.radius.full, flexShrink: 0 }}>{status.label}</span>
              </div>
              {when && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginTop: ds.space.md, padding: '9px 12px', background: '#FBF7F8', borderRadius: ds.radius.md }}>
                  <CalendarIcon size={14} color={t.text3} strokeWidth={2}/>
                  <span style={{ ...ds.type.caption, color: t.text2 }}>{when}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: ds.space.md, paddingTop: ds.space.md, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <div>
                  <span style={{ ...ds.type.h3, color: '#0F0F10' }}>NPR {amountOf(b).toLocaleString()}</span>
                  {b.confirmationCode && <span style={{ ...ds.type.caption, color: t.text4, marginLeft: '7px' }}>{b.confirmationCode}</span>}
                </div>
                {isUnpaid && (
                  <button onClick={() => setPayBooking(b)} className="pressable"
                    style={{ padding: '9px 22px', background: heroGrad, border: 'none', borderRadius: ds.radius.md, color: 'white', ...ds.type.caption, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 12px rgba(220,20,60,0.25)' }}>
                    Pay now
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {payBooking && (
        <PaymentSheet amount={amountOf(payBooking)} serviceName={payBooking.service} bookingId={payBooking._id} onClose={() => setPayBooking(null)} />
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .anim { opacity: 0; animation: fadeUp .5s cubic-bezier(.22,1,.36,1) forwards; }
        .pressable { transition: transform .15s ease; }
        .pressable:active { transform: scale(.97); }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}
