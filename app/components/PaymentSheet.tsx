'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { brand } from '../design-system'
import { useTheme } from '../context/ThemeContext'
import { CheckIcon } from './Icons'

interface PaymentSheetProps {
  amount: number
  serviceName: string
  bookingId: string
  onClose: () => void
}

const PAYMENT_METHODS = [
  {
    id: 'esewa',
    name: 'eSewa',
    desc: 'Most popular in Nepal',
    color: '#60BB46',
    bg: 'rgba(96,187,70,0.08)',
    border: 'rgba(96,187,70,0.25)',
    logo: () => (
      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#60BB46', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '11px', fontWeight: 900, color: 'white' }}>e</span>
      </div>
    ),
  },
  {
    id: 'khalti',
    name: 'Khalti',
    desc: 'Fast digital wallet',
    color: '#5C2D91',
    bg: 'rgba(92,45,145,0.08)',
    border: 'rgba(92,45,145,0.25)',
    logo: () => (
      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#5C2D91', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '11px', fontWeight: 900, color: 'white' }}>K</span>
      </div>
    ),
  },
  {
    id: 'connectips',
    name: 'ConnectIPS',
    desc: 'Bank transfer',
    color: '#1A56DB',
    bg: 'rgba(26,86,219,0.08)',
    border: 'rgba(26,86,219,0.25)',
    logo: () => (
      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#1A56DB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '9px', fontWeight: 900, color: 'white' }}>CIPS</span>
      </div>
    ),
  },
]

export default function PaymentSheet({ amount, serviceName, bookingId, onClose }: PaymentSheetProps) {
  const { data: session } = useSession()
  const { t } = useTheme()
  const [selected, setSelected] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePay = async () => {
    if (!selected) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: selected,
          amount,
          bookingId,
          userEmail: session?.user?.email,
          serviceName,
        })
      })
      const data = await res.json()
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl
      } else {
        setError('Failed to initiate payment. Please try again.')
      }
    } catch (e) {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: t.cardBg, borderRadius: '28px 28px 0 0', padding: '28px 20px 48px' }}>
        <div style={{ width: '40px', height: '4px', borderRadius: '9999px', background: t.border, margin: '0 auto 24px' }}/>

        <h2 style={{ fontSize: '22px', fontWeight: 900, color: t.text1, letterSpacing: '-0.6px', marginBottom: '6px' }}>Choose Payment</h2>
        <p style={{ fontSize: '14px', color: t.text3, marginBottom: '24px' }}>{serviceName} · NPR {amount.toLocaleString()}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {PAYMENT_METHODS.map((method) => (
            <div key={method.id} onClick={() => setSelected(method.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', borderRadius: '16px', border: `1.5px solid ${selected === method.id ? method.border : t.border}`, background: selected === method.id ? method.bg : t.inputBg, cursor: 'pointer', transition: 'all 0.2s ease' }}>
              <method.logo/>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '15px', fontWeight: 700, color: selected === method.id ? method.color : t.text1, marginBottom: '2px' }}>{method.name}</p>
                <p style={{ fontSize: '12px', color: t.text3 }}>{method.desc}</p>
              </div>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: `2px solid ${selected === method.id ? method.color : t.border}`, background: selected === method.id ? method.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {selected === method.id && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }}/>}
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div style={{ background: 'rgba(220,20,60,0.08)', border: `1px solid ${brand.primaryBorder}`, borderRadius: '12px', padding: '12px 16px', marginBottom: '16px' }}>
            <p style={{ fontSize: '13px', color: brand.primary, fontWeight: 600 }}>{error}</p>
          </div>
        )}

        <div style={{ background: t.inputBg, borderRadius: '14px', padding: '14px 16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: `1px solid ${t.border}` }}>
          <p style={{ fontSize: '14px', color: t.text2 }}>Total amount</p>
          <p style={{ fontSize: '20px', fontWeight: 900, color: brand.primary, letterSpacing: '-0.5px' }}>NPR {amount.toLocaleString()}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={handlePay} disabled={!selected || loading}
            style={{ width: '100%', padding: '16px', background: (!selected || loading) ? t.inputBg : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: (!selected || loading) ? t.text3 : 'white', fontSize: '15px', fontWeight: 800, cursor: (!selected || loading) ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: selected && !loading ? '0 6px 24px rgba(220,20,60,0.35)' : 'none', transition: 'all 0.2s ease' }}>
            {loading
              ? <><div style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/>Redirecting to payment…</>
              : selected ? `Pay with ${PAYMENT_METHODS.find(m => m.id === selected)?.name}` : 'Select a payment method'}
          </button>
          <button onClick={onClose}
            style={{ width: '100%', padding: '14px', background: 'transparent', border: `1px solid ${t.border}`, borderRadius: '16px', color: t.text3, fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Cancel
          </button>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
