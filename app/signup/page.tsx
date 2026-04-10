'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Signup() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('FAMILY')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)

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
      if (res.ok) {
        const { signIn } = await import('next-auth/react')
        await signIn('credentials', { email, password, redirect: false })
        router.push('/home')
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch (e) { setError('Something went wrong') }
    setLoading(false)
  }

  const roles = [
    { id: 'FAMILY', icon: '👨‍👩‍👧', label: 'Family Member', sub: 'I want to stay connected with my family' },
    { id: 'COMPANION', icon: '🤝', label: 'Companion', sub: 'I want to provide care and support' },
    { id: 'PROFESSIONAL', icon: '💼', label: 'Professional', sub: 'I offer home services and skills' },
  ]

  return (
    <div style={{minHeight: '100vh', background: '#06040C', fontFamily: 'Inter, -apple-system, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden'}}>

      <div style={{position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,0,30,0.35) 0%, transparent 70%)', pointerEvents: 'none'}}/>
      <div style={{position: 'absolute', bottom: '-80px', right: '-80px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,0,60,0.5) 0%, transparent 70%)', pointerEvents: 'none'}}/>

      {/* Top */}
      <div style={{padding: '56px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 10}}>
        <Link href="/" style={{display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none'}}>
          <div style={{width: '32px', height: '32px', borderRadius: '10px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(220,20,60,0.4)'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.759 3.8 1 7.2 1c1.98 0 3.72.99 4.8 2.52C13.08 1.99 14.82 1 16.8 1 20.2 1 23 3.759 23 7.191c0 4.105-5.37 8.863-11 14.402z"/></svg>
          </div>
          <span style={{fontSize: '18px', fontWeight: 800, color: 'white', letterSpacing: '-0.5px'}}>Sahayatri</span>
        </Link>
        <Link href="/login" style={{fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', padding: '8px 16px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px'}}>
          Sign in
        </Link>
      </div>

      {/* Progress */}
      <div style={{padding: '24px 24px 0', position: 'relative', zIndex: 10}}>
        <div style={{display: 'flex', gap: '6px'}}>
          {[1, 2].map(s => (
            <div key={s} style={{flex: 1, height: '3px', borderRadius: '2px', background: s <= step ? '#DC143C' : 'rgba(255,255,255,0.1)', transition: 'background 0.3s ease'}}/>
          ))}
        </div>
        <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '8px', fontWeight: 600}}>Step {step} of 2</p>
      </div>

      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px 24px 60px', position: 'relative', zIndex: 10, maxWidth: '400px', margin: '0 auto', width: '100%'}}>

        {step === 1 && (
          <>
            <div style={{marginBottom: '36px'}}>
              <h1 style={{fontSize: '34px', fontWeight: 900, color: 'white', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '12px'}}>
                Create your<br/>
                <span style={{background: 'linear-gradient(135deg, #FF4060, #DC143C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>account.</span>
              </h1>
              <p style={{fontSize: '15px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6}}>Join thousands of Nepali families on Sahayatri.</p>
            </div>

            {error && (
              <div style={{background: 'rgba(220,20,60,0.1)', border: '1px solid rgba(220,20,60,0.25)', borderRadius: '14px', padding: '13px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC143C" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <p style={{fontSize: '13px', color: '#DC143C', fontWeight: 600}}>{error}</p>
              </div>
            )}

            <div style={{display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px'}}>
              {[
                { label: 'Full Name', value: name, setter: setName, type: 'text', placeholder: 'Krishna Pandey', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
                { label: 'Email', value: email, setter: setEmail, type: 'email', placeholder: 'your@email.com', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
              ].map((field) => (
                <div key={field.label}>
                  <label style={{fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block', marginBottom: '8px'}}>{field.label}</label>
                  <div style={{position: 'relative'}}>
                    <div style={{position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)'}}>{field.icon}</div>
                    <input type={field.type} value={field.value} onChange={(e) => field.setter(e.target.value)} placeholder={field.placeholder}
                      style={{width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '16px 16px 16px 46px', fontSize: '15px', color: 'white', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box', transition: 'border-color 0.2s ease'}}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(220,20,60,0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                </div>
              ))}

              <div>
                <label style={{fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'block', marginBottom: '8px'}}>Password</label>
                <div style={{position: 'relative'}}>
                  <div style={{position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)'}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters"
                    style={{width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '16px 46px', fontSize: '15px', color: 'white', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box', transition: 'border-color 0.2s ease'}}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(220,20,60,0.5)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                  <button onClick={() => setShowPass(!showPass)} style={{position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: '4px'}}>
                    {showPass ?
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg> :
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                  </button>
                </div>
              </div>
            </div>

            <button onClick={() => {
              if (!name || !email || !password) { setError('Please fill in all fields'); return }
              if (password.length < 6) { setError('Password must be at least 6 characters'); return }
              setError(''); setStep(2)
            }}
              style={{width: '100%', padding: '18px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 32px rgba(220,20,60,0.4)', marginBottom: '20px', letterSpacing: '-0.3px'}}>
              Continue
            </button>

            <p style={{textAlign: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.35)'}}>
              Already have an account?{' '}
              <Link href="/login" style={{color: '#DC143C', fontWeight: 700, textDecoration: 'none'}}>Sign in</Link>
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <div style={{marginBottom: '32px'}}>
              <button onClick={() => setStep(1)} style={{background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px', padding: '0', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                Back
              </button>
              <h1 style={{fontSize: '32px', fontWeight: 900, color: 'white', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '12px'}}>
                I am a…
              </h1>
              <p style={{fontSize: '15px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6}}>Choose what describes you best. You can change this later.</p>
            </div>

            {error && (
              <div style={{background: 'rgba(220,20,60,0.1)', border: '1px solid rgba(220,20,60,0.25)', borderRadius: '14px', padding: '13px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                <p style={{fontSize: '13px', color: '#DC143C', fontWeight: 600}}>{error}</p>
              </div>
            )}

            <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px'}}>
              {roles.map((r) => (
                <button key={r.id} onClick={() => setRole(r.id)}
                  style={{display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 20px', borderRadius: '18px', border: `2px solid ${role === r.id ? '#DC143C' : 'rgba(255,255,255,0.1)'}`, background: role === r.id ? 'rgba(220,20,60,0.12)' : 'rgba(255,255,255,0.04)', cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease'}}>
                  <div style={{width: '52px', height: '52px', borderRadius: '16px', background: role === r.id ? 'rgba(220,20,60,0.2)' : 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0}}>
                    {r.icon}
                  </div>
                  <div style={{flex: 1}}>
                    <p style={{fontSize: '16px', fontWeight: 700, color: role === r.id ? 'white' : 'rgba(255,255,255,0.7)', marginBottom: '4px'}}>{r.label}</p>
                    <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.4}}>{r.sub}</p>
                  </div>
                  <div style={{width: '22px', height: '22px', borderRadius: '50%', border: `2px solid ${role === r.id ? '#DC143C' : 'rgba(255,255,255,0.2)'}`, background: role === r.id ? '#DC143C' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                    {role === r.id && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                </button>
              ))}
            </div>

            <button onClick={handleSignup} disabled={loading}
              style={{width: '100%', padding: '18px', background: loading ? 'rgba(220,20,60,0.5)' : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '16px', fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 32px rgba(220,20,60,0.4)', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', letterSpacing: '-0.3px'}}>
              {loading ? (
                <><div style={{width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite'}}/> Creating account…</>
              ) : 'Join Sahayatri — Free'}
            </button>

            <p style={{textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.2)', lineHeight: 1.6}}>
              By joining you agree to our terms of service and privacy policy.
            </p>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  )
}
