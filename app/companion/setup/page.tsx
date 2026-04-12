'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTheme } from '../../context/ThemeContext'
import { brand } from '../../design-system'
import { CheckIcon, ArrowLeftIcon, SparkleIcon } from '../../components/Icons'

const COMPANION_ROLES = [
  { id: 'elder-care', title: 'Elder Care Companion', desc: 'Visit elderly people, provide care and companionship', earn: 'NPR 25,000–40,000/month',
    icon: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={brand.primary} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="7" r="4"/><path d="M5 20a7 7 0 0 1 14 0"/></svg> },
  { id: 'home-cook', title: 'Home Cook', desc: 'Cook fresh Nepali meals at family homes', earn: 'NPR 18,000–30,000/month',
    icon: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> },
  { id: 'electrician', title: 'Electrician', desc: 'Handle electrical repairs and installations', earn: 'NPR 30,000–50,000/month',
    icon: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
  { id: 'plumber', title: 'Plumber', desc: 'Fix pipes, leaks and bathroom fittings', earn: 'NPR 25,000–45,000/month',
    icon: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> },
  { id: 'house-cleaner', title: 'House Cleaner', desc: 'Provide professional cleaning services', earn: 'NPR 15,000–25,000/month',
    icon: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
]

type Step = 'intro' | 'role' | 'profile' | 'agreement' | 'docs' | 'done'

export default function CompanionSetup() {
  const { t } = useTheme()
  const { data: session } = useSession()
  const router = useRouter()
  const [step, setStep] = useState<Step>('intro')
  const [selectedRole, setSelectedRole] = useState<typeof COMPANION_ROLES[0] | null>(null)
  const [experience, setExperience] = useState('')
  const [bio, setBio] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [languages, setLanguages] = useState<string[]>(['Nepali'])
  const [agreed, setAgreed] = useState(false)
  const [fullName, setFullName] = useState('')
  const [citizenshipNo, setCitizenshipNo] = useState('')
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  const toggleLanguage = (lang: string) => {
    setLanguages(prev => prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang])
  }

  const toggleDoc = (id: string) => {
    setUploadedDocs(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id])
  }

  const saveProfile = async () => {
    setSaving(true)
    try {
      await fetch('/api/companion/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session?.user?.email,
          role: selectedRole?.id,
          experience,
          bio,
          phone,
          location,
          languages,
          agreementSigned: agreed,
          fullName,
          citizenshipNo,
          docs: uploadedDocs,
        })
      })
      setStep('done')
    } catch (e) {}
    setSaving(false)
  }

  const card = {
    background: t.cardBg,
    borderRadius: '20px' as const,
    border: `1px solid ${t.border}`,
    boxShadow: t.shadow,
  }

  const Header = ({ title, sub, back }: { title: string, sub?: string, back?: () => void }) => (
    <div style={{background: t.headerBg, backdropFilter: 'blur(20px)', padding: '52px 20px 16px', borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 50}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
        {back && (
          <button onClick={back} style={{width: '38px', height: '38px', borderRadius: '12px', background: t.inputBg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
            <ArrowLeftIcon size={18} color={t.text2} strokeWidth={2}/>
          </button>
        )}
        <div>
          <h1 style={{fontSize: '20px', fontWeight: 800, color: t.text1, letterSpacing: '-0.4px'}}>{title}</h1>
          {sub && <p style={{fontSize: '12px', color: t.text3, marginTop: '2px'}}>{sub}</p>}
        </div>
      </div>
    </div>
  )

  // DONE
  if (step === 'done') return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px'}}>
      <div style={{width: '88px', height: '88px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 8px 32px rgba(220,20,60,0.4)', animation: 'breathe 2s ease infinite'}}>
        <SparkleIcon size={40} color="white" strokeWidth={2}/>
      </div>
      <h1 style={{fontSize: '26px', fontWeight: 900, color: t.text1, letterSpacing: '-0.8px', marginBottom: '10px', textAlign: 'center'}}>
        Companion Profile Created!
      </h1>
      <p style={{fontSize: '15px', color: t.text2, lineHeight: 1.7, marginBottom: '32px', textAlign: 'center', maxWidth: '300px'}}>
        You can now switch to Companion Mode from your profile. Upload your documents to start accepting jobs.
      </p>
      <button onClick={() => window.location.href = '/companion/dashboard'}
        style={{width: '100%', maxWidth: '380px', padding: '16px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 6px 24px rgba(220,20,60,0.35)', marginBottom: '12px'}}>
        Go to Companion Dashboard
      </button>
      <button onClick={() => router.push('/home')}
        style={{width: '100%', maxWidth: '380px', padding: '14px', background: 'transparent', border: `1px solid ${t.border}`, borderRadius: '16px', color: t.text2, fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
        Back to Home Dashboard
      </button>
      <style>{`@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}`}</style>
    </div>
  )

  // DOCS
  if (step === 'docs') return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '100px'}}>
      <Header title="Upload Documents" sub="Optional — upload now or from your dashboard" back={() => setStep('agreement')}/>
      <div style={{padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '14px'}}>
        <div style={{background: 'rgba(220,20,60,0.06)', border: `1px solid ${brand.primaryBorder}`, borderRadius: '14px', padding: '14px 16px'}}>
          <p style={{fontSize: '13px', color: brand.primary, fontWeight: 600, lineHeight: 1.5}}>
            You can skip this step and upload your documents later from the dashboard. However you will not be able to accept jobs until documents are verified.
          </p>
        </div>

        {[
          { id: 'citizenship', label: 'Citizenship Card', sub: 'Front and back photo', required: true },
          { id: 'photo', label: 'Recent Passport Photo', sub: 'Clear face photo within 3 months', required: true },
          { id: 'police', label: 'Police Clearance Certificate', sub: 'Issued within last 6 months', required: true },
          { id: 'certificate', label: 'Skill Certificate', sub: 'Optional', required: false },
          { id: 'reference', label: 'Reference Letter', sub: 'Optional', required: false },
        ].map((doc) => {
          const isUploaded = uploadedDocs.includes(doc.id)
          return (
            <div key={doc.id} onClick={() => toggleDoc(doc.id)}
              style={{...card, padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', border: `1.5px solid ${isUploaded ? 'rgba(5,150,105,0.3)' : t.border}`, transition: 'all 0.2s ease'}}>
              <div style={{width: '44px', height: '44px', borderRadius: '12px', background: isUploaded ? 'rgba(5,150,105,0.1)' : brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                {isUploaded
                  ? <CheckIcon size={22} color="#059669" strokeWidth={2.5}/>
                  : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={brand.primary} strokeWidth="1.8" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>}
              </div>
              <div style={{flex: 1}}>
                <div style={{display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '2px'}}>
                  <p style={{fontSize: '14px', fontWeight: 700, color: isUploaded ? '#059669' : t.text1}}>{doc.label}</p>
                  {doc.required && <div style={{padding: '1px 7px', background: isUploaded ? 'rgba(5,150,105,0.1)' : brand.primaryLight, borderRadius: '9999px'}}><span style={{fontSize: '9px', fontWeight: 700, color: isUploaded ? '#059669' : brand.primary}}>Required</span></div>}
                </div>
                <p style={{fontSize: '12px', color: t.text3}}>{doc.sub}</p>
              </div>
              <div style={{padding: '7px 14px', background: isUploaded ? 'rgba(5,150,105,0.1)' : 'linear-gradient(135deg, #DC143C, #A50E2D)', borderRadius: '9999px', flexShrink: 0}}>
                <span style={{fontSize: '12px', fontWeight: 700, color: isUploaded ? '#059669' : 'white'}}>{isUploaded ? 'Done' : 'Upload'}</span>
              </div>
            </div>
          )
        })}

        <button onClick={saveProfile} disabled={saving}
          style={{width: '100%', padding: '16px', background: saving ? t.inputBg : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: saving ? t.text3 : 'white', fontSize: '15px', fontWeight: 800, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: saving ? 'none' : '0 6px 24px rgba(220,20,60,0.35)'}}>
          {saving ? <><div style={{width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite'}}/>Saving…</> : <><CheckIcon size={18} color="white" strokeWidth={2.5}/>Save and Continue</>}
        </button>

        <button onClick={saveProfile} disabled={saving}
          style={{width: '100%', padding: '14px', background: 'transparent', border: `1px solid ${t.border}`, borderRadius: '16px', color: t.text3, fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
          Skip — I will upload from dashboard
        </button>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  // AGREEMENT
  if (step === 'agreement') return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '100px'}}>
      <Header title="Legal Agreement" sub="Read and confirm all sections" back={() => setStep('profile')}/>
      <div style={{padding: '16px 16px 0'}}>
        <div style={{background: 'rgba(220,20,60,0.06)', border: `1px solid ${brand.primaryBorder}`, borderRadius: '16px', padding: '14px 16px', marginBottom: '14px', display: 'flex', gap: '12px'}}>
          <div style={{width: '30px', height: '30px', borderRadius: '10px', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={`${brand.primary}`} strokeWidth="2" strokeLinecap="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <p style={{fontSize: '13px', color: brand.primary, fontWeight: 600, lineHeight: 1.5}}>
            This is a full legally binding agreement. Read every section and confirm individually before signing.
          </p>
        </div>
        <p style={{fontSize: '13px', color: t.text3, textAlign: 'center', paddingBottom: '8px'}}>
          Please read the complete agreement at <strong>/companion/agreement</strong> — tap below to open it.
        </p>
      </div>
      <div style={{padding: '0 16px 20px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
        <button
          onClick={() => {
            // Store current setup progress in sessionStorage
            sessionStorage.setItem('companionSetup', JSON.stringify({
              role: selectedRole?.id, experience, bio, phone, location, languages
            }))
            window.location.href = '/companion/agreement?from=setup'
          }}
          style={{width: '100%', padding: '16px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 6px 24px rgba(220,20,60,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
          <CheckIcon size={18} color="white" strokeWidth={2.5}/>
          Read and Sign Full Agreement
        </button>
        <p style={{fontSize: '12px', color: t.text3, textAlign: 'center'}}>
          You will be redirected back here after signing
        </p>
      </div>
    </div>
  )

// PROFILE
  if (step === 'profile') return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '100px'}}>
      <Header title="Your Companion Profile" sub="Tell families about yourself" back={() => setStep('role')}/>
      <div style={{padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '14px'}}>

        <div style={{...card, padding: '20px'}}>
          <p style={{fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '16px'}}>About you</p>

          <p style={{fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px'}}>Phone number</p>
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="98XXXXXXXX"
            style={{width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '13px 16px', fontSize: '15px', color: t.text1, outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' as const, marginBottom: '14px'}}/>

          <p style={{fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px'}}>Your location</p>
          <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap' as const, marginBottom: '14px'}}>
            {['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Other'].map(loc => (
              <button key={loc} onClick={() => setLocation(loc)}
                style={{padding: '8px 14px', borderRadius: '9999px', border: `1.5px solid ${location === loc ? brand.primary : t.border}`, background: location === loc ? brand.primaryLight : 'transparent', color: location === loc ? brand.primary : t.text3, fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease'}}>
                {loc}
              </button>
            ))}
          </div>

          <p style={{fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px'}}>Years of experience</p>
          <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap' as const, marginBottom: '14px'}}>
            {['Less than 1 year', '1–2 years', '3–5 years', '5+ years'].map(exp => (
              <button key={exp} onClick={() => setExperience(exp)}
                style={{padding: '8px 14px', borderRadius: '9999px', border: `1.5px solid ${experience === exp ? brand.primary : t.border}`, background: experience === exp ? brand.primaryLight : 'transparent', color: experience === exp ? brand.primary : t.text3, fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease'}}>
                {exp}
              </button>
            ))}
          </div>

          <p style={{fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px'}}>Languages you speak</p>
          <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap' as const, marginBottom: '14px'}}>
            {['Nepali', 'Hindi', 'English', 'Maithili', 'Tamang', 'Newari'].map(lang => (
              <button key={lang} onClick={() => toggleLanguage(lang)}
                style={{padding: '8px 14px', borderRadius: '9999px', border: `1.5px solid ${languages.includes(lang) ? brand.primary : t.border}`, background: languages.includes(lang) ? brand.primaryLight : 'transparent', color: languages.includes(lang) ? brand.primary : t.text3, fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease'}}>
                {lang}
              </button>
            ))}
          </div>

          <p style={{fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px'}}>About yourself</p>
          <textarea value={bio} onChange={e => setBio(e.target.value)}
            placeholder="Tell families why you are the right person to care for their loved ones…"
            rows={4}
            style={{width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '13px 16px', fontSize: '14px', color: t.text1, outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' as const, resize: 'none' as const, lineHeight: 1.6}}/>
        </div>

        <button onClick={() => setStep('agreement')}
          disabled={!phone || !location || !experience}
          style={{width: '100%', padding: '16px', background: (!phone || !location || !experience) ? t.inputBg : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: (!phone || !location || !experience) ? t.text3 : 'white', fontSize: '15px', fontWeight: 800, cursor: (!phone || !location || !experience) ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease', boxShadow: (phone && location && experience) ? '0 6px 24px rgba(220,20,60,0.35)' : 'none'}}>
          Continue to Agreement
        </button>
      </div>
      <style>{`input::placeholder,textarea::placeholder{color:${t.text3}}`}</style>
    </div>
  )

  // ROLE SELECTION
  if (step === 'role') return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '100px'}}>
      <Header title="What will you do?" sub="Choose your companion role" back={() => setStep('intro')}/>
      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
        {COMPANION_ROLES.map(role => (
          <div key={role.id} onClick={() => setSelectedRole(role)}
            style={{...card, padding: '18px', cursor: 'pointer', border: `1.5px solid ${selectedRole?.id === role.id ? brand.primary : t.border}`, background: selectedRole?.id === role.id ? brand.primaryLight : t.cardBg, transition: 'all 0.2s ease'}}>
            <div style={{display: 'flex', gap: '14px', alignItems: 'flex-start'}}>
              <div style={{width: '48px', height: '48px', borderRadius: '14px', background: selectedRole?.id === role.id ? brand.primaryLight : t.inputBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <role.icon/>
              </div>
              <div style={{flex: 1}}>
                <p style={{fontSize: '15px', fontWeight: 800, color: selectedRole?.id === role.id ? brand.primary : t.text1, marginBottom: '3px'}}>{role.title}</p>
                <p style={{fontSize: '13px', color: t.text3, marginBottom: '6px', lineHeight: 1.4}}>{role.desc}</p>
                <p style={{fontSize: '13px', fontWeight: 700, color: '#059669'}}>{role.earn}</p>
              </div>
              {selectedRole?.id === role.id && (
                <div style={{width: '24px', height: '24px', borderRadius: '50%', background: brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                  <CheckIcon size={13} color="white" strokeWidth={2.5}/>
                </div>
              )}
            </div>
          </div>
        ))}

        <button onClick={() => selectedRole && setStep('profile')} disabled={!selectedRole}
          style={{width: '100%', padding: '16px', background: !selectedRole ? t.inputBg : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: !selectedRole ? t.text3 : 'white', fontSize: '15px', fontWeight: 800, cursor: !selectedRole ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease', marginTop: '6px', boxShadow: selectedRole ? '0 6px 24px rgba(220,20,60,0.35)' : 'none'}}>
          {selectedRole ? `Continue as ${selectedRole.title}` : 'Select a role to continue'}
        </button>
      </div>
    </div>
  )

  // INTRO
  return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '40px'}}>
      <div style={{background: 'linear-gradient(135deg, #0E0B18, #1A0A16)', padding: '52px 20px 32px', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: '-40px', right: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,20,60,0.2), transparent 70%)', pointerEvents: 'none'}}/>
        <button onClick={() => router.back()}
          style={{width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: '24px'}}>
          <ArrowLeftIcon size={18} color="rgba(255,255,255,0.6)" strokeWidth={2}/>
        </button>
        <div style={{width: '64px', height: '64px', borderRadius: '20px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: '0 6px 24px rgba(220,20,60,0.4)'}}>
          <SparkleIcon size={32} color="white" strokeWidth={2}/>
        </div>
        <h1 style={{fontSize: '26px', fontWeight: 900, color: 'white', letterSpacing: '-0.8px', marginBottom: '10px', lineHeight: 1.2}}>
          Switch to<br/>Companion Mode
        </h1>
        <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '24px'}}>
          Earn NPR 25,000–40,000 per month on your own schedule. Care for families. Make a real difference.
        </p>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
          {[
            { val: 'Flexible', label: 'Your schedule' },
            { val: 'NPR 40K', label: 'Monthly potential' },
            { val: 'Verified', label: 'Trusted platform' },
            { val: '500+', label: 'Families served' },
          ].map((s, i) => (
            <div key={i} style={{background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '12px'}}>
              <p style={{fontSize: '16px', fontWeight: 800, color: 'white', marginBottom: '3px'}}>{s.val}</p>
              <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.35)'}}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
        <div style={{...card, padding: '20px'}}>
          <p style={{fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '16px'}}>How it works</p>
          {[
            { step: '1', title: 'Create companion profile', desc: 'Tell us about your skills and experience.', color: brand.primary },
            { step: '2', title: 'Sign legal agreement', desc: 'Agree to our code of conduct and platform terms.', color: '#7C3AED' },
            { step: '3', title: 'Upload documents', desc: 'Citizenship, photo and police clearance.', color: '#059669' },
            { step: '4', title: 'Get verified and start earning', desc: 'Accept jobs and get paid within 24 hours.', color: '#D97706' },
          ].map((item, i) => (
            <div key={i} style={{display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: i < 3 ? '16px' : '0', position: 'relative'}}>
              {i < 3 && <div style={{position: 'absolute', left: '13px', top: '28px', width: '2px', height: '18px', background: t.border}}/>}
              <div style={{width: '28px', height: '28px', borderRadius: '50%', background: `${item.color}12`, border: `1.5px solid ${item.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <span style={{fontSize: '11px', fontWeight: 800, color: item.color}}>{item.step}</span>
              </div>
              <div style={{paddingTop: '3px'}}>
                <p style={{fontSize: '14px', fontWeight: 700, color: t.text1, marginBottom: '2px'}}>{item.title}</p>
                <p style={{fontSize: '12px', color: t.text3}}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => setStep('role')}
          style={{width: '100%', padding: '18px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '18px', color: 'white', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 32px rgba(220,20,60,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'}}>
          <SparkleIcon size={20} color="white" strokeWidth={2}/>
          Start Companion Setup
        </button>

        <button onClick={() => router.back()}
          style={{width: '100%', padding: '14px', background: 'transparent', border: `1px solid ${t.border}`, borderRadius: '16px', color: t.text3, fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
          Not now — back to home
        </button>
      </div>
    </div>
  )
}
