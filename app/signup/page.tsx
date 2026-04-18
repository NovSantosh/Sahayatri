'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { brand } from '../design-system'
import { SahayatriLogo } from '../components/Icons'

const COUNTRIES = [
  '��🇺 Australia', '🇧🇭 Bahrain', '🇧🇩 Bangladesh', '🇧🇹 Bhutan',
  '🇨🇦 Canada', '🇨🇳 China', '🇩🇰 Denmark', '🇫🇮 Finland',
  '🇫🇷 France', '🇩�� Germany', '🇬🇧 United Kingdom', '🇮🇳 India',
  '🇮🇩 Indonesia', '🇮🇷 Iran', '🇮🇶 Iraq', '🇮🇱 Israel',
  '🇮🇹 Italy', '🇯🇵 Japan', '🇯🇴 Jordan', '🇰🇷 South Korea',
  '🇰🇼 Kuwait', '🇲🇾 Malaysia', '🇲🇻 Maldives', '🇲🇺 Mauritius',
  '🇳�� Nepal', '🇳🇱 Netherlands', '🇳🇿 New Zealand', '🇳🇴 Norway',
  '🇴🇲 Oman', '🇵🇰 Pakistan', '🇵🇭 Philippines', '🇵🇱 Poland',
  '🇵🇹 Portugal', '🇶🇦 Qatar', '🇷🇺 Russia', '🇸🇦 Saudi Arabia',
  '🇸🇬 Singapore', '🇿🇦 South Africa', '🇪🇸 Spain', '🇸🇪 Sweden',
  '🇨🇭 Switzerland', '🇹🇭 Thailand', '🇦🇪 UAE', '🇺🇸 United States',
]

type Step = 'info' | 'contact' | 'otp' | 'creating'

export default function Signup() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('info')

  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [myLocation, setMyLocation] = useState('')
  const [familyCountries, setFamilyCountries] = useState<string[]>([])
  const [countrySearch, setCountrySearch] = useState('')

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [otpChannel, setOtpChannel] = useState<'email' | 'phone'>('email')

  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const toggleCountry = (country: string) => {
    setFamilyCountries(prev =>
      prev.includes(country) ? prev.filter(c => c !== country) : [...prev, country]
    )
  }

  const filteredCountries = COUNTRIES.filter(c =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  )

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '14px',
    padding: '14px 16px',
    fontSize: '15px',
    color: 'white',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    boxSizing: 'border-box',
    transition: 'border 0.2s ease',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '6px',
    display: 'block',
    letterSpacing: '0.3px',
  }

  const sendOTP = async () => {
    if (!email && !phone) { setError('Enter email or phone number'); return }
    if (!password) { setError('Enter a password'); return }
    setLoading(true)
    setError('')
    try {
      // TODO: wire to real OTP service (Sparrow SMS for Nepal, SendGrid for email)
      await new Promise(r => setTimeout(r, 800))
      setStep('otp')
    } catch (e) {
      setError('Failed to send OTP. Try again.')
    }
    setLoading(false)
  }

  const handleOTPChange = (val: string, idx: number) => {
    const newOtp = [...otp]
    newOtp[idx] = val.slice(-1)
    setOtp(newOtp)
    if (val && idx < 5) {
      document.getElementById(`otp-${idx + 1}`)?.focus()
    }
  }

  const handleSignup = async () => {
    setLoading(true)
    setError('')
    setStep('creating')
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, phone, password,
          dateOfBirth: dob,
          gender,
          location: myLocation,
          familyCountries,
          role: 'family',
        })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        setStep('contact')
      } else {
        router.push('/login?signup=success')
      }
    } catch (e) {
      setError('Network error. Try again.')
      setStep('contact')
    }
    setLoading(false)
  }

  const primaryBtn = (disabled: boolean, onClick: () => void, label: string, loading?: boolean) => (
    <button onClick={onClick} disabled={disabled || loading}
      style={{ width: '100%', padding: '17px', background: disabled ? 'rgba(255,255,255,0.06)' : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: disabled ? 'rgba(255,255,255,0.3)' : 'white', fontSize: '16px', fontWeight: 800, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', marginTop: '24px', boxShadow: disabled ? 'none' : '0 6px 24px rgba(220,20,60,0.35)', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
      {loading
        ? <><div style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/> Please wait…</>
        : label}
    </button>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#06040C', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,0,30,0.15) 0%, transparent 70%)', pointerEvents: 'none' }}/>

      {/* Header */}
      <div style={{ padding: '52px 20px 0', display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 1 }}>
        <button onClick={() => step === 'info' ? router.back() : setStep(step === 'otp' ? 'contact' : 'info')}
          style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div style={{ flex: 1, display: 'flex', gap: '6px' }}>
          {['info', 'contact', 'otp'].map((s, i) => (
            <div key={i} style={{ flex: 1, height: '3px', borderRadius: '9999px', background: ['info', 'contact', 'otp'].indexOf(step) >= i ? brand.primary : 'rgba(255,255,255,0.1)', transition: 'background 0.3s ease' }}/>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, padding: '28px 24px 40px', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

        {/* ── STEP 1 ── */}
        {step === 'info' && (
          <>
            <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'white', letterSpacing: '-0.8px', marginBottom: '6px' }}>Tell us about yourself</h1>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>Helps us personalise your experience</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Full name *</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Sita Sharma" style={inputStyle}/>
              </div>

              <div>
                <label style={labelStyle}>Date of birth</label>
                <input type="date" value={dob} onChange={e => setDob(e.target.value)} style={inputStyle}/>
              </div>

              <div>
                <label style={labelStyle}>Gender</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Male', 'Female', 'Non-binary', 'Prefer not'].map(g => (
                    <button key={g} onClick={() => setGender(g)}
                      style={{ flex: 1, padding: '10px 4px', borderRadius: '12px', border: `1.5px solid ${gender === g ? brand.primary : 'rgba(255,255,255,0.1)'}`, background: gender === g ? brand.primaryLight : 'transparent', color: gender === g ? brand.primary : 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease' }}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Where do you currently live? *</label>
                <input value={myLocation} onChange={e => setMyLocation(e.target.value)} placeholder="e.g. Vancouver, Canada" style={inputStyle}/>
              </div>

              <div>
                <label style={labelStyle}>Where is your family? (select all that apply)</label>
                <input
                  value={countrySearch}
                  onChange={e => setCountrySearch(e.target.value)}
                  placeholder="Search country…"
                  style={{ ...inputStyle, marginBottom: '8px' }}/>

                {/* Selected countries */}
                {familyCountries.length > 0 && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    {familyCountries.map(c => (
                      <div key={c} onClick={() => toggleCountry(c)}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', background: brand.primaryLight, border: `1px solid ${brand.primaryBorder}`, borderRadius: '9999px', cursor: 'pointer' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: brand.primary }}>{c}</span>
                        <span style={{ fontSize: '12px', color: brand.primary }}>×</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Country grid */}
                <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px', background: 'rgba(255,255,255,0.03)', borderRadius: '14px', padding: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {filteredCountries.map(c => (
                    <button key={c} onClick={() => toggleCountry(c)}
                      style={{ padding: '10px 12px', borderRadius: '10px', border: 'none', background: familyCountries.includes(c) ? brand.primaryLight : 'transparent', cursor: 'pointer', fontFamily: 'Inter, sans-serif', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'background 0.15s ease' }}>
                      <span style={{ fontSize: '13px', fontWeight: 500, color: familyCountries.includes(c) ? brand.primary : 'rgba(255,255,255,0.7)' }}>{c}</span>
                      {familyCountries.includes(c) && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={brand.primary} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      )}
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '6px' }}>
                  {familyCountries.length > 0 ? `${familyCountries.length} countr${familyCountries.length > 1 ? 'ies' : 'y'} selected` : 'You can select multiple countries'}
                </p>
              </div>
            </div>

            {error && <p style={{ fontSize: '13px', color: brand.primary, marginTop: '8px' }}>{error}</p>}
            {primaryBtn(!name || !myLocation, () => { if (name && myLocation) { setError(''); setStep('contact') } else setError('Please fill your name and location') }, 'Continue →')}
          </>
        )}

        {/* ── STEP 2 ── */}
        {step === 'contact' && (
          <>
            <h1 style={{ fontSize: '26px', fontWeight: 900, color: 'white', letterSpacing: '-0.8px', marginBottom: '6px' }}>Create your account</h1>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>We'll send a verification code to confirm it's you</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Email address *</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={inputStyle}/>
              </div>

              <div>
                <label style={labelStyle}>Phone number</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ width: '80px', flexShrink: 0, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '14px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>+977</span>
                  </div>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="98XXXXXXXX" style={{ ...inputStyle, flex: 1 }}/>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Password *</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" style={{ ...inputStyle, paddingRight: '48px' }}/>
                  <button onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      {showPassword
                        ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/></>
                        : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                    </svg>
                  </button>
                </div>
                {password.length > 0 && (
                  <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                    {[1,2,3,4].map(i => (
                      <div key={i} style={{ flex: 1, height: '3px', borderRadius: '9999px', background: password.length >= i * 2 ? i <= 2 ? '#F59E0B' : '#10B981' : 'rgba(255,255,255,0.1)', transition: 'background 0.3s' }}/>
                    ))}
                  </div>
                )}
              </div>

              {/* OTP channel */}
              <div>
                <label style={labelStyle}>Send verification code via</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[
                    { id: 'email' as const, label: 'Email', disabled: !email },
                    { id: 'phone' as const, label: 'SMS', disabled: !phone },
                  ].map(opt => (
                    <button key={opt.id} onClick={() => !opt.disabled && setOtpChannel(opt.id)}
                      disabled={opt.disabled}
                      style={{ flex: 1, padding: '13px', borderRadius: '14px', border: `1.5px solid ${otpChannel === opt.id ? brand.primary : 'rgba(255,255,255,0.1)'}`, background: otpChannel === opt.id ? brand.primaryLight : 'transparent', color: opt.disabled ? 'rgba(255,255,255,0.2)' : otpChannel === opt.id ? brand.primary : 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 700, cursor: opt.disabled ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease' }}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && <p style={{ fontSize: '13px', color: brand.primary, marginTop: '8px' }}>{error}</p>}
            {primaryBtn(!email || !password, sendOTP, `Send code via ${otpChannel === 'email' ? 'email' : 'SMS'}`, loading)}

            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: '14px' }}>
              Already have an account?{' '}
              <span onClick={() => router.push('/login')} style={{ color: brand.primary, cursor: 'pointer', fontWeight: 600 }}>Sign in</span>
            </p>
          </>
        )}

        {/* ── STEP 3 — OTP ── */}
        {step === 'otp' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: brand.primaryLight, border: `1px solid ${brand.primaryBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={brand.primary} strokeWidth="1.8" strokeLinecap="round">
                  {otpChannel === 'email'
                    ? <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>
                    : <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 9.82a19.79 19.79 0 01-3.07-8.67A2 2 0 012.86 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>}
                </svg>
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: 900, color: 'white', letterSpacing: '-0.6px', marginBottom: '8px' }}>Enter the code</h1>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                We sent a 6-digit code to{' '}
                <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                  {otpChannel === 'email' ? email : phone}
                </span>
              </p>

            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '24px' }}>
              {otp.map((digit, i) => (
                <input key={i} id={`otp-${i}`}
                  type="tel" maxLength={1} value={digit}
                  onChange={e => handleOTPChange(e.target.value, i)}
                  onKeyDown={e => { if (e.key === 'Backspace' && !digit && i > 0) document.getElementById(`otp-${i - 1}`)?.focus() }}
                  style={{ width: '46px', height: '56px', background: digit ? brand.primaryLight : 'rgba(255,255,255,0.06)', border: `1.5px solid ${digit ? brand.primary : 'rgba(255,255,255,0.1)'}`, borderRadius: '14px', fontSize: '22px', fontWeight: 800, color: digit ? brand.primary : 'white', textAlign: 'center', outline: 'none', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease' }}/>
              ))}
            </div>

            {primaryBtn(otp.join('').length < 6, handleSignup, 'Verify & Create Account', loading)}

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginBottom: '8px' }}>Didn't receive the code?</p>
              <button onClick={sendOTP} style={{ background: 'none', border: 'none', color: brand.primary, fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                Resend code
              </button>
            </div>
          </>
        )}

        {/* ── CREATING ── */}
        {step === 'creating' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '20px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 8px 32px rgba(220,20,60,0.4)', animation: 'breathe 1.5s ease infinite' }}>
              <SahayatriLogo size={40} color="white"/>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>Creating your account…</h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>Setting up your Sahayatri profile</p>
          </div>
        )}
      </div>

      <style>{`
        input::placeholder { color: rgba(255,255,255,0.25); }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes breathe { 0%,100% { transform:scale(1) } 50% { transform:scale(1.06) } }
      `}</style>
    </div>
  )
}
