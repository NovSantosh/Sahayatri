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

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    setLoading(true)
    setError('')
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    setLoading(false)
    if (result?.error) {
      setError('Invalid email or password')
    } else {
      router.push('/')
    }
  }

  return (
    <div style={{minHeight: '100vh', background: '#06060F', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column'}}>

      {/* Background glow */}
      <div style={{position: 'fixed', top: '-20%', left: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,20,60,0.15) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none'}}/>

      <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', zIndex: 1}}>

        {/* Logo */}
        <div style={{marginBottom: '32px', textAlign: 'center'}}>
          <div style={{width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 0 40px rgba(220,20,60,0.35)'}}>
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
              <path d="M14 3C8.48 3 4 7.48 4 13c0 4.08 2.37 7.62 5.83 9.35L14 24.5l4.17-2.15C21.63 20.62 24 17.08 24 13c0-5.52-4.48-10-10-10z" fill="white" opacity="0.9"/>
              <circle cx="14" cy="13" r="5" fill="#DC143C"/>
              <circle cx="14" cy="13" r="2" fill="white"/>
            </svg>
          </div>
          <h1 style={{fontSize: '28px', fontWeight: 800, color: 'white', letterSpacing: '-0.5px'}}>Welcome back</h1>
          <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginTop: '6px'}}>Sign in to Sahayatri</p>
        </div>

        {/* Form */}
        <div style={{width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '12px'}}>

          {error && (
            <div style={{background: 'rgba(220,20,60,0.1)', border: '1px solid rgba(220,20,60,0.3)', borderRadius: '12px', padding: '12px 16px', fontSize: '13px', color: '#DC143C', fontWeight: 600}}>
              {error}
            </div>
          )}

          <div>
            <label style={{fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '8px'}}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 16px', fontSize: '15px', color: 'white', outline: 'none', fontFamily: 'sans-serif', boxSizing: 'border-box'}}
            />
          </div>

          <div>
            <label style={{fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'block', marginBottom: '8px'}}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              style={{width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 16px', fontSize: '15px', color: 'white', outline: 'none', fontFamily: 'sans-serif', boxSizing: 'border-box'}}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{width: '100%', padding: '15px', background: loading ? 'rgba(220,20,60,0.5)' : 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'sans-serif', marginTop: '4px', boxShadow: '0 4px 20px rgba(220,20,60,0.35)'}}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>

          <p style={{textAlign: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.35)', marginTop: '8px'}}>
            No account?{' '}
            <Link href="/signup" style={{color: '#DC143C', fontWeight: 700, textDecoration: 'none'}}>
              Create one free
            </Link>
          </p>

        </div>
      </div>

      {/* Back to welcome */}
      <div style={{padding: '20px', textAlign: 'center', position: 'relative', zIndex: 1}}>
        <Link href="/" style={{fontSize: '13px', color: 'rgba(255,255,255,0.25)', textDecoration: 'none'}}>
          ← Back to welcome
        </Link>
      </div>

    </div>
  )
}
