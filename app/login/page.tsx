'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) { setError('Please fill in all fields'); return }
    setLoading(true)
    setError('')
    const res = await signIn('credentials', { email, password, redirect: false })
    if (res?.ok) router.push('/home')
    else { setError('Wrong email or password. Please try again.'); setLoading(false) }
  }

  return (
    <div style={{minHeight: '100vh', background: '#06040C', fontFamily: 'Inter, -apple-system, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden'}}>

      {/* Background glows */}
      <div style={{position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,0,30,0.4) 0%, transparent 70%)', pointerEvents: 'none'}}/>
      <div style={{position: 'absolute', bottom: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,0,60,0.5) 0%, transparent 70%)', pointerEvents: 'none'}}/>

      {/* Top nav */}
      <div style={{padding: '56px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 10}}>
        <Link href="/" style={{display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none'}}>
          <div style={{width: '32px', height: '32px', borderRadius: '10px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(220,20,60,0.4)'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.759 3.8 1 7.2 1c1.98 0 3.72.99 4.8 2.52C13.08 1.99 14.82 1 16.8 1 20.2 1 23 3.759 23 7.191c0 4.105-5.37 8.863-11 14.402z"/></svg>
          </div>
          <span style={{fontSize: '18px', fontWeight: 800, color: 'white', letterSpacing: '-0.5px'}}>Sahayatri</span>
        </Link>
        <Link href="/signup" style={{fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', padding: '8px 16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px'}}>
          Sign up
        </Link>
      </div>

      {/* Content */}
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 24px 60px', position: 'relative', zIndex: 10, maxWidth: '400px', margin: '0 auto', width: '100%'}}>

        {/* Headline */}
        <div style={{marginBottom: '40px'}}>
          <h1 style={{fontSize: '36px', fontWeight: 900, color: 'white', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '12px'}}>
            Welcome<br/>
            <span style={{background: 'linear-gradient(135deg, #FF4060, #DC143C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>back.</span>
          </h1>
          <p style={{fontSize: '15px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, fontWeight: 400}}>Your family is waiting. Sign in to continue.</p>
        </div>

        {/* Error */}
        {error && (
          <div style={{background: 'rgba(220,20,60,0.1)', border: '1px solid rgba(220,20,60,0.25)', borderRadius: '14px', padding: '13px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC143C" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p style={{fontSize: '13px', color: '#DC143C', fontWeight: 600}}>{error}</p>
          </div>
        )}

        {/* Form */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px'}}>

          {/* Email */}
          <div>
            <label style={{fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block', marginBottom: '8px'}}>Email</label>
            <div style={{position: 'relative'}}>
              <div style={{position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="your@email.com"
                style={{width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '16px 16px 16px 46px', fontSize: '15px', color: 'white', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box', transition: 'border-color 0.2s ease'}}
                onFocus={(e) => e.target.style.borderColor = 'rgba(220,20,60,0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block', marginBottom: '8px'}}>Password</label>
            <div style={{position: 'relative'}}>
              <div style={{position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Your password"
                style={{width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '16px 46px 16px 46px', fontSize: '15px', color: 'white', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box', transition: 'border-color 0.2s ease'}}
                onFocus={(e) => e.target.style.borderColor = 'rgba(220,20,60,0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
              <button onClick={() => setShowPass(!showPass)}
                style={{position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: '4px'}}>
                {showPass ?
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg> :
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
              </button>
            </div>
          </div>
        </div>

        {/* Sign in button */}
        <button onClick={handleLogin} disabled={loading}
          style={{width: '100%', padding: '18px', background: loading ? 'rgba(220,20,60,0.5)' : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '16px', fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 32px rgba(220,20,60,0.4)', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', letterSpacing: '-0.3px', transition: 'all 0.2s ease'}}>
          {loading ? (
            <>
              <div style={{width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite'}}/>
              Signing in…
            </>
          ) : 'Sign In to Sahayatri'}
        </button>

        <p style={{textAlign: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.35)'}}>
          New to Sahayatri?{' '}
          <Link href="/signup" style={{color: '#DC143C', fontWeight: 700, textDecoration: 'none'}}>Create account</Link>
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  )
}
