'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'
import { ArrowLeftIcon, CheckIcon } from '../components/Icons'

const PAYMENT_APPS = [
  { id: 'esewa', name: 'eSewa', color: '#60BB46', desc: 'Most popular in Nepal', url: 'https://esewa.com.np', initial: 'e' },
  { id: 'khalti', name: 'Khalti', color: '#5C2D91', desc: 'Fast digital wallet', url: 'https://khalti.com', initial: 'K' },
  { id: 'connectips', name: 'ConnectIPS', color: '#1A56DB', desc: 'Direct bank transfer', url: 'https://connectips.com', initial: 'C' },
  { id: 'ime', name: 'IME Pay', color: '#E4001B', desc: 'Popular for remittances', url: 'https://imepay.com.np', initial: 'I' },
]

export default function Wallet() {
  const { data: session } = useSession()
  const router = useRouter()
  const { t } = useTheme()
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user?.email) fetchBookings()
    else setLoading(false)
  }, [session])

  const fetchBookings = async () => {
    try {
      const res = await fetch(`/api/bookings?email=${session?.user?.email}`)
      const data = await res.json()
      setBookings(data.bookings || [])
    } catch (e) {}
    setLoading(false)
  }

  const card = {
    background: t.cardBg,
    borderRadius: '20px',
    border: `1px solid ${t.border}`,
    boxShadow: t.shadow,
  }

  const unpaidBookings = bookings.filter(b => b.status === 'unpaid' || b.status === 'pending')
  const totalUnpaid = unpaidBookings.reduce((s: number, b: any) => s + (b.amount || 0), 0)

  return (
    <div style={{ minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '100px', transition: 'background 0.3s ease' }}>

      {/* Header */}
      <div style={{ background: t.headerBg, backdropFilter: 'blur(20px)', padding: '52px 20px 16px', borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => router.back()}
            style={{ width: '40px', height: '40px', borderRadius: '12px', background: t.inputBg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeftIcon size={18} color={t.text2} strokeWidth={2}/>
          </button>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: t.text1, letterSpacing: '-0.4px' }}>Payments</h1>
            <p style={{ fontSize: '12px', color: t.text3 }}>Pay via trusted Nepali platforms</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* No wallet notice */}
        <div style={{ background: 'linear-gradient(135deg, #0E0B18, #1A0A16)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: '14px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>We don't hold your money</p>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
            Sahayatri uses trusted Nepali payment platforms you already use. No middleman wallet. Your money goes directly where it should.
          </p>
        </div>

        {/* Unpaid bookings */}
        {unpaidBookings.length > 0 && (
          <div style={{ ...card, padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <p style={{ fontSize: '15px', fontWeight: 800, color: t.text1 }}>Pending payments</p>
              <p style={{ fontSize: '16px', fontWeight: 900, color: brand.primary }}>NPR {totalUnpaid.toLocaleString()}</p>
            </div>
            {unpaidBookings.map((b: any, i: number) => (
              <div key={b._id || i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < unpaidBookings.length - 1 ? `1px solid ${t.border}` : 'none' }}>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: t.text1, marginBottom: '2px' }}>{b.serviceName || 'Service'}</p>
                  <p style={{ fontSize: '12px', color: t.text3 }}>{b.date || 'Pending'}</p>
                </div>
                <p style={{ fontSize: '14px', fontWeight: 700, color: brand.primary }}>NPR {b.amount?.toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}

        {/* Payment methods */}
        <div style={{ ...card, padding: '20px' }}>
          <p style={{ fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '6px' }}>Pay with</p>
          <p style={{ fontSize: '13px', color: t.text3, marginBottom: '16px' }}>Tap to open your preferred payment app</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {PAYMENT_APPS.map((app) => (
              <div key={app.id}
                onClick={() => window.open(app.url, '_blank')}
                style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderRadius: '14px', border: `1px solid ${t.border}`, background: t.inputBg, cursor: 'pointer', transition: 'all 0.2s ease' }}
                className="pressable">
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: app.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 12px ${app.color}40` }}>
                  <span style={{ fontSize: '16px', fontWeight: 900, color: 'white' }}>{app.initial}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: t.text1, marginBottom: '2px' }}>{app.name}</p>
                  <p style={{ fontSize: '12px', color: t.text3 }}>{app.desc}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.text3} strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Companion payout info */}
        <div style={{ ...card, padding: '20px' }}>
          <p style={{ fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '14px' }}>Companion payouts</p>
          {[
            { label: 'When companions are paid', value: 'Within 24hrs of job completion' },
            { label: 'Platform commission', value: '15% per booking' },
            { label: 'Payout method', value: 'eSewa or Khalti' },
            { label: 'Minimum payout', value: 'NPR 500' },
          ].map((item, i, arr) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none', gap: '12px' }}>
              <p style={{ fontSize: '13px', color: t.text3 }}>{item.label}</p>
              <p style={{ fontSize: '13px', fontWeight: 600, color: t.text1, textAlign: 'right' }}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Security */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '14px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CheckIcon size={16} color="#10B981" strokeWidth={2.5}/>
          </div>
          <p style={{ fontSize: '13px', color: '#10B981', lineHeight: 1.5, fontWeight: 500 }}>
            All payments are processed by licensed Nepali payment providers. Sahayatri never stores your card or wallet details.
          </p>
        </div>
      </div>
    </div>
  )
}
