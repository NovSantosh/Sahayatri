'use client'
import { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { brand } from '../design-system'
import { EyeIcon, EmailIcon, KeyIcon, SahayatriLogo } from '../components/Icons'

function SignupForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password) { setError('Please fill in all fields'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Signup failed'); setLoading(false); return }
      const { signIn } = await import('next-auth/react')
      const result = await signIn('credentials', { email, password, redirect: false })
      if (result?.ok) {
        router.push('/home')
      } else {
        setError('Account created. Please sign in.')
        router.push('/login')
      }
    } catch (e) {
      setError('Something went wrong. Try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{minHeight: '100vh', background: '#06040C', fontFamily: 'Inter, -apple-system, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden'}}>
      <div style={{position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,0,30,0.22) 0%, transparent 70%)', pointerEvents: 'none'}}/>

      <div style={{padding: '60px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1}}>
        <div style={{width: '64px', height: '64px', borderRadius: '20px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(220,20,60,0.4)', marginBottom: '20px'}}>
          <SahayatriLogo size={38} color="white"/>
        </div>
        <h1 style={{fontSize: '28px', fontWeight: 900, color: 'white', letterSpacing: '-1px', marginBottom: '8px'}}>Create account</h1>
        <p style={{fontSize: '15px', color: 'rgba(255,255,255,0.4)', textAlign: 'center'}}>Join Sahayatri — it is free</p>
      </div>

      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 24px', position: 'relative', zIndex: 1, maxWidth: '420px', margin: '0 auto', width: '100%'}}>

        {error && (
          <div style={{background: 'rgba(220,20,60,0.1)', border: '1px solid rgba(220,20,60,0.25)', borderRadius: '14px', padding: '13px 16px', marginBottom: '20px', fontSize: '14px', color: '#DC143C', fontWeight: 600, textAlign: 'center'}}>
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} style={{display: 'flex', flexDirection: 'column', gap: '14px'}}>
          <div>
            <p style={{fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px'}}>Full name</p>
            <input value={name} onChange={e => setName(e.target.value)}
              type="text" placeholder="Your full name" autoComplete="name"
              style={{width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '15px 16px', fontSize: '15px', color: 'white', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' as const}}/>
          </div>

          <div>
            <p style={{fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px'}}>Email address</p>
            <div style={{position: 'relative'}}>
              <div style={{position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)'}}>
                <EmailIcon size={18} color="rgba(255,255,255,0.3)" strokeWidth={1.8}/>
              </div>
              <input value={email} onChange={e => setEmail(e.target.value)}
                type="email" placeholder="your@email.com" autoComplete="email"
                style={{width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '15px 16px 15px 48px', fontSize: '15px', color: 'white', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' as const}}/>
            </div>
          </div>

          <div>
            <p style={{fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px'}}>Password</p>
            <div style={{position: 'relative'}}>
              <div style={{position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)'}}>
                <KeyIcon size={18} color="rgba(255,255,255,0.3)" strokeWidth={1.8}/>
              </div>
              <input value={password} onChange={e => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'} placeholder="Min. 6 characters"
                style={{width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '15px 48px 15px 48px', fontSize: '15px', color: 'white', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' as const}}/>
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px'}}>
                <EyeIcon size={18} color="rgba(255,255,255,0.35)" strokeWidth={1.8} closed={!showPassword}/>
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            style={{width: '100%', padding: '17px', background: loading ? 'rgba(220,20,60,0.5)' : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '16px', fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 6px 24px rgba(220,20,60,0.4)', marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
            {loading
              ? <><div style={{width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite'}}/>Creating account…</>
              : 'Create Account'}
          </button>
        </form>

        <div style={{textAlign: 'center', marginTop: '24px'}}>
          <span style={{fontSize: '14px', color: 'rgba(255,255,255,0.35)'}}>Already have an account? </span>
          <span onClick={() => router.push('/login')}
            style={{fontSize: '14px', fontWeight: 700, color: brand.primary, cursor: 'pointer'}}>
            Sign in
          </span>
        </div>

        <div style={{textAlign: 'center', marginTop: '12px'}}>
          <span onClick={() => router.push('/')}
            style={{fontSize: '13px', color: 'rgba(255,255,255,0.25)', cursor: 'pointer'}}>
            ← Back
          </span>
        </div>
      </div>

      <style>{`
        input::placeholder { color: rgba(255,255,255,0.25); }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

export default function Signup() {
  return <Suspense><SignupForm/></Suspense>
}
