'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Signup() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('FAMILY')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = async () => {
    if (!name || !email || !password) { setError('Please fill in all fields'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong')
      } else {
        router.push('/login')
      }
    } catch { setError('Something went wrong. Please try again.') }
    setLoading(false)
  }

  return (
    <div style={{minHeight: '100vh', background: '#06060F', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column'}}>
      <div style={{position: 'fixed', top: '-20%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,20,60,0.12) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none'}}/>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', zIndex: 1}}>
        <div style={{marginBottom: '28px', textAlign: 'center'}}>
          <div style={{width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', boxShadow: '0 0 32px rgba(220,20,60,0.3)'}}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 3C8.48 3 4 7.48 4 13c0 4.08 2.37 7.62 5.83 9.35L14 24.5l4.17-2.15C21.63 20.62 24 17.08 24 13c0-5.52-4.48-10-10-10z" fill="white" opacity="0.9"/>
              <circle cx="14" cy="13" r="5" fill="#DC143C"/>
              <circle cx="14" cy="13" r="2" fill="white"/>
            </svg>
          </div>
          <h1 style={{fontSize: '26px', fontWeight: 800, color: 'white', letterSpacing: '-0.5px'}}>Join Sahayatri</h1>
          <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '5px'}}>Feel Present. Always.</p>
        </div>
        <div style={{width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
          {error && (
            <div style={{background: 'rgba(220,20,60,0.1)', border: '1px solid rgba(220,20,60,0.3)', borderRadius: '12px', padding: '12px 16px', fontSize: '13px', color: '#DC143C', fontWeight: 600}}>{error}</div>
          )}
          <div>
            <label style={{fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '8px'}}>Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name"
              style={{width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 16px', fontSize: '15px', color: 'white', outline: 'none', fontFamily: 'sans-serif', boxSizing: 'border-box'}}
            />
          </div>
          <div>
            <label style={{fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '8px'}}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
              style={{width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 16px', fontSize: '15px', color: 'white', outline: 'none', fontFamily: 'sans-serif', boxSizing: 'border-box'}}
            />
          </div>
          <div>
            <label style={{fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '8px'}}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters"
              style={{width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 16px', fontSize: '15px', color: 'white', outline: 'none', fontFamily: 'sans-serif', boxSizing: 'border-box'}}
            />
          </div>
          <div>
            <label style={{fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '8px'}}>I am joining as</label>
            <div style={{display: 'flex', gap: '8px'}}>
              {[
                {value: 'FAMILY', label: '👨‍👩‍👧 Family'},
                {value: 'COMPANION', label: '🤝 Companion'},
                {value: 'PROFESSIONAL', label: '🔧 Professional'},
              ].map((r) => (
                <button key={r.value} onClick={() => setRole(r.value)}
                  style={{flex: 1, padding: '10px 4px', borderRadius: '10px', border: `1.5px solid ${role === r.value ? '#DC143C' : 'rgba(255,255,255,0.1)'}`, background: role === r.value ? 'rgba(220,20,60,0.15)' : 'rgba(255,255,255,0.05)', color: role === r.value ? '#DC143C' : 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif'}}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleSignup} disabled={loading}
            style={{width: '100%', padding: '15px', background: loading ? 'rgba(220,20,60,0.5)' : 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'sans-serif', marginTop: '4px', boxShadow: '0 4px 20px rgba(220,20,60,0.35)'}}>
            {loading ? 'Creating account…' : 'Create Account — Free'}
          </button>
          <p style={{textAlign: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.35)', marginTop: '8px'}}>
            Already have an account?{' '}
            <Link href="/login" style={{color: '#DC143C', fontWeight: 700, textDecoration: 'none'}}>Sign in</Link>
          </p>
          <p style={{textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.18)', marginTop: '4px'}}>
            No ads · GDPR compliant · 🇳🇵 Built for Nepal
          </p>
        </div>
      </div>
    </div>
  )
}
