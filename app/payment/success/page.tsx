'use client'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { brand } from '../../design-system'
import { useTheme } from '../../context/ThemeContext'
import { CheckIcon } from '../../components/Icons'

function SuccessContent() {
  const params = useSearchParams()
  const router = useRouter()
  const { t } = useTheme()
  const method = params.get('method') || 'payment'

  return (
    <div style={{ minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', transition: 'background 0.3s ease' }}>
      <div style={{ width: '88px', height: '88px', borderRadius: '50%', background: 'linear-gradient(135deg, #059669, #047857)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 8px 32px rgba(5,150,105,0.4)', animation: 'breathe 2s ease infinite' }}>
        <CheckIcon size={44} color="white" strokeWidth={2.5}/>
      </div>
      <h1 style={{ fontSize: '28px', fontWeight: 900, color: t.text1, letterSpacing: '-0.8px', marginBottom: '10px', textAlign: 'center' }}>Payment Successful!</h1>
      <p style={{ fontSize: '15px', color: t.text2, lineHeight: 1.7, marginBottom: '8px', textAlign: 'center', maxWidth: '280px' }}>
        Your booking has been confirmed. A companion will be assigned shortly.
      </p>
      <p style={{ fontSize: '13px', color: t.text3, marginBottom: '36px', textAlign: 'center' }}>
        Paid via {method === 'esewa' ? 'eSewa' : method === 'khalti' ? 'Khalti' : 'ConnectIPS'}
      </p>
      <button onClick={() => router.push('/bookings')}
        style={{ width: '100%', maxWidth: '360px', padding: '16px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 6px 24px rgba(220,20,60,0.35)', marginBottom: '12px' }}>
        View My Bookings
      </button>
      <button onClick={() => router.push('/home')}
        style={{ padding: '12px 32px', background: 'transparent', border: `1px solid ${t.border}`, borderRadius: '14px', color: t.text3, fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
        Back to Home
      </button>
      <style>{`@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}`}</style>
    </div>
  )
}

export default function PaymentSuccess() {
  return <Suspense><SuccessContent/></Suspense>
}
