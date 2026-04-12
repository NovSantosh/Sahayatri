'use client'
import { useRouter } from 'next/navigation'
import { useTheme } from '../../context/ThemeContext'
import { brand } from '../../design-system'

export default function PaymentFailed() {
  const router = useRouter()
  const { t } = useTheme()
  return (
    <div style={{ minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ width: '88px', height: '88px', borderRadius: '50%', background: 'rgba(220,20,60,0.1)', border: '3px solid rgba(220,20,60,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={brand.primary} strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </div>
      <h1 style={{ fontSize: '28px', fontWeight: 900, color: t.text1, letterSpacing: '-0.8px', marginBottom: '10px', textAlign: 'center' }}>Payment Failed</h1>
      <p style={{ fontSize: '15px', color: t.text2, lineHeight: 1.7, marginBottom: '36px', textAlign: 'center', maxWidth: '280px' }}>
        Something went wrong with your payment. Your booking has not been confirmed.
      </p>
      <button onClick={() => router.back()}
        style={{ width: '100%', maxWidth: '360px', padding: '16px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 6px 24px rgba(220,20,60,0.35)', marginBottom: '12px' }}>
        Try Again
      </button>
      <button onClick={() => router.push('/home')}
        style={{ padding: '12px 32px', background: 'transparent', border: `1px solid ${t.border}`, borderRadius: '14px', color: t.text3, fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
        Back to Home
      </button>
    </div>
  )
}
