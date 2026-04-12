'use client'
import { useRouter } from 'next/navigation'
import { brand } from '../design-system'

export default function Offline() {
  const router = useRouter()
  return (
    <div style={{ minHeight: '100vh', background: '#06040C', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'rgba(220,20,60,0.1)', border: '1px solid rgba(220,20,60,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(220,20,60,0.8)" strokeWidth="2" strokeLinecap="round">
          <line x1="1" y1="1" x2="23" y2="23"/>
          <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/>
        </svg>
      </div>
      <h1 style={{ fontSize: '24px', fontWeight: 900, color: 'white', letterSpacing: '-0.8px', marginBottom: '10px' }}>You are offline</h1>
      <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: '32px', maxWidth: '260px' }}>
        No internet connection. Some features may not be available.
      </p>
      <button onClick={() => router.push('/home')}
        style={{ padding: '14px 32px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '14px', color: 'white', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 16px rgba(220,20,60,0.35)' }}>
        Try Again
      </button>
    </div>
  )
}
