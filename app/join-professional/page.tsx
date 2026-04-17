'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'
import {
  CheckIcon, ArrowLeftIcon, StarIcon,
  HeartIcon, CalendarIcon, WalletIcon,
  FamilyIcon, SparkleIcon, LocationIcon
} from '../components/Icons'

const ROLES = [
  {
    id: 'elder-care',
    title: 'Elder Care Companion',
    nepali: 'ज्येष्ठ नागरिक सेवक',
    desc: 'Visit elderly people at home. Provide companionship, assistance and care.',
    earn: 'NPR 25,000–40,000',
    period: 'per month',
    icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={brand.primary} strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="7" r="4"/>
        <path d="M5 20a7 7 0 0 1 14 0"/>
        <path d="M12 14v3M10 17h4"/>
      </svg>
    ),
    requirements: ['Caring and patient personality', 'Basic Nepali literacy', 'Smartphone', 'Clean background check'],
    color: brand.primary,
    bg: brand.primaryLight,
  },
  {
    id: 'medical-escort',
    title: 'Medical Escort',
    nepali: 'स्वास्थ्य सहायक',
    desc: 'Escort elderly patients to hospitals and clinics. Help with appointments and prescriptions.',
    earn: 'NPR 20,000–35,000',
    period: 'per month',
    icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    requirements: ['Basic medical knowledge', 'Punctual and reliable', 'Good communication', 'Smartphone'],
    color: '#059669',
    bg: 'rgba(5,150,105,0.08)',
  },
  {
    id: 'home-cook',
    title: 'Home Cook',
    nepali: 'घरेलु भान्से',
    desc: 'Cook fresh Nepali meals at elderly people\'s homes. Bring warmth and nourishment.',
    earn: 'NPR 18,000–30,000',
    period: 'per month',
    icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    requirements: ['Good cooking skills', 'Knowledge of Nepali cuisine', 'Hygiene conscious', 'Smartphone'],
    color: '#D97706',
    bg: 'rgba(217,119,6,0.08)',
  },
  {
    id: 'electrician',
    title: 'Electrician',
    nepali: 'इलेक्ट्रिसियन',
    desc: 'Handle electrical repairs, installations and safety checks for homes.',
    earn: 'NPR 30,000–50,000',
    period: 'per month',
    icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    requirements: ['Electrical certification', 'Minimum 2 years experience', 'Own basic tools', 'Smartphone'],
    color: '#D97706',
    bg: 'rgba(217,119,6,0.08)',
  },
  {
    id: 'plumber',
    title: 'Plumber',
    nepali: 'प्लम्बर',
    desc: 'Fix pipes, leaks, bathroom fittings and water-related issues at homes.',
    earn: 'NPR 25,000–45,000',
    period: 'per month',
    icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    requirements: ['Plumbing experience', 'Minimum 2 years', 'Own basic tools', 'Smartphone'],
    color: '#2563EB',
    bg: 'rgba(37,99,235,0.08)',
  },
  {
    id: 'house-cleaner',
    title: 'House Cleaner',
    nepali: 'सफाई कर्मचारी',
    desc: 'Provide professional cleaning services for homes and apartments.',
    earn: 'NPR 15,000–25,000',
    period: 'per month',
    icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    requirements: ['Attention to detail', 'Reliable and honest', 'Physical fitness', 'Smartphone'],
    color: '#059669',
    bg: 'rgba(5,150,105,0.08)',
  },
]

const STEPS_INFO = ['Your Role', 'Personal Info', 'Experience', 'Documents', 'Done']

type Step = 'landing' | 'role' | 'info' | 'experience' | 'documents' | 'submitted'

export default function JoinProfessional() {
  const { t } = useTheme()
  const router = useRouter()
  const [step, setStep] = useState<Step>('landing')
  const [selectedRole, setSelectedRole] = useState<typeof ROLES[0] | null>(null)

  // Form state
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [location, setLocation] = useState('')
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('')
  const [experience, setExperience] = useState('')
  const [prevWork, setPrevWork] = useState('')
  const [whyJoin, setWhyJoin] = useState('')
  const [hasSmartphone, setHasSmartphone] = useState(true)
  const [languages, setLanguages] = useState<string[]>(['Nepali'])
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const toggleLanguage = (lang: string) => {
    setLanguages(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    )
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 2000))
    setSubmitting(false)
    setStep('submitted')
  }

  const card = {
    background: t.cardBg,
    borderRadius: '20px' as const,
    border: `1px solid ${t.border}`,
    boxShadow: t.shadow,
    transition: 'background 0.3s ease' as const,
  }

  const inputStyle = {
    width: '100%',
    background: t.inputBg,
    border: `1px solid ${t.border}`,
    borderRadius: '12px',
    padding: '13px 16px',
    fontSize: '15px',
    color: t.text1,
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    boxSizing: 'border-box' as const,
    transition: 'background 0.3s ease' as const,
  }

  const Header = ({ title, sub, back, step: s }: { title: string, sub: string, back: () => void, step?: number }) => (
    <div style={{background: t.headerBg, backdropFilter: 'blur(20px)', padding: '52px 20px 16px', borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 50}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: s ? '14px' : '0'}}>
        <button onClick={back} style={{width: '38px', height: '38px', borderRadius: '12px', background: t.inputBg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
          <ArrowLeftIcon size={18} color={t.text2} strokeWidth={2}/>
        </button>
        <div>
          <h1 style={{fontSize: '20px', fontWeight: 800, color: t.text1, letterSpacing: '-0.4px'}}>{title}</h1>
          <p style={{fontSize: '12px', color: t.text3, marginTop: '2px'}}>{sub}</p>
        </div>
      </div>
      {s && (
        <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
          {STEPS_INFO.map((label, i) => (
            <div key={i} style={{flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '4px'}}>
              <div style={{height: '3px', width: '100%', borderRadius: '9999px', background: i < s ? brand.primary : t.border, transition: 'background 0.3s ease'}}/>
              <p style={{fontSize: '9px', fontWeight: 600, color: i < s ? brand.primary : t.text3, textAlign: 'center' as const}}>{label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  // SUBMITTED
  if (step === 'submitted') return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif'}}>
      <div style={{padding: '80px 24px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
        <div style={{width: '88px', height: '88px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 8px 32px rgba(220,20,60,0.4)', animation: 'breathe 2s ease infinite'}}>
          <CheckIcon size={40} color="white" strokeWidth={2.5}/>
        </div>

        <h1 style={{fontSize: '26px', fontWeight: 900, color: t.text1, letterSpacing: '-0.8px', marginBottom: '12px'}}>
          Application Submitted!
        </h1>
        <p style={{fontSize: '15px', color: t.text2, lineHeight: 1.7, marginBottom: '8px', maxWidth: '300px'}}>
          Thank you {fullName}. We have received your application as a {selectedRole?.title}.
        </p>
        <p style={{fontSize: '14px', color: t.text3, lineHeight: 1.6, marginBottom: '36px', maxWidth: '300px'}}>
          Our team will review your application within 2–3 working days and contact you on {phone}.
        </p>

        <div style={{...card, padding: '22px', width: '100%', maxWidth: '400px', marginBottom: '20px', textAlign: 'left'}}>
          <p style={{fontSize: '13px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '14px'}}>What happens next</p>
          {[
            { step: '1', title: 'Application review', desc: 'Our team reviews your details within 2–3 days.', color: brand.primary },
            { step: '2', title: 'Background check', desc: 'We verify your ID and conduct a background check.', color: '#7C3AED' },
            { step: '3', title: 'Orientation call', desc: 'A 30-minute call to explain how Sahayatri works.', color: '#059669' },
            { step: '4', title: 'Start earning', desc: 'Your profile goes live and bookings start coming in.', color: '#D97706' },
          ].map((item, i) => (
            <div key={i} style={{display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: i < 3 ? '16px' : '0', position: 'relative'}}>
              {i < 3 && <div style={{position: 'absolute', left: '14px', top: '30px', width: '2px', height: '20px', background: t.border}}/>}
              <div style={{width: '28px', height: '28px', borderRadius: '50%', background: `${item.color}12`, border: `1.5px solid ${item.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <span style={{fontSize: '11px', fontWeight: 800, color: item.color}}>{item.step}</span>
              </div>
              <div style={{paddingTop: '4px'}}>
                <p style={{fontSize: '13px', fontWeight: 700, color: t.text1, marginBottom: '2px'}}>{item.title}</p>
                <p style={{fontSize: '12px', color: t.text3}}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => router.push('/home')}
          style={{width: '100%', maxWidth: '400px', padding: '16px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 6px 24px rgba(220,20,60,0.35)'}}>
          Back to Home
        </button>
      </div>
      <style>{`@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}`}</style>
    </div>
  )

  // DOCUMENTS STEP
  if (step === 'documents') return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '40px'}}>
      <Header title="Documents" sub="Step 4 of 4" back={() => setStep('experience')} step={4}/>
      <div style={{padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '14px'}}>

        <div style={{background: 'linear-gradient(135deg, #0E0B18, #1A0A16)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(255,255,255,0.06)'}}>
          <p style={{fontSize: '14px', fontWeight: 700, color: 'white', marginBottom: '6px'}}>Why we verify everyone</p>
          <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6}}>
            Our users trust us with their elderly parents. Every companion must pass our verification process. This protects you and the families you serve.
          </p>
        </div>

        <div style={{...card, padding: '20px'}}>
          <p style={{fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '16px'}}>Required documents</p>
          {[
            { label: 'Citizenship card (Nagarikta)', sub: 'Front and back photo', required: true },
            { label: 'Recent photo', sub: 'Clear face photo, taken within 3 months', required: true },
            { label: 'Skill certificate', sub: 'If applicable — nursing, cooking, electrical etc.', required: false },
            { label: 'Reference letter', sub: 'From previous employer or community leader', required: false },
          ].map((doc, i) => (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderRadius: '14px', border: `1px solid ${t.border}`, marginBottom: i < 3 ? '10px' : '0', background: t.inputBg}}>
              <div style={{width: '44px', height: '44px', borderRadius: '12px', background: doc.required ? brand.primaryLight : t.cardBg, border: `1px solid ${doc.required ? brand.primaryBorder : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={doc.required ? brand.primary : t.text3} strokeWidth="1.8" strokeLinecap="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="12" y1="18" x2="12" y2="12"/>
                  <line x1="9" y1="15" x2="15" y2="15"/>
                </svg>
              </div>
              <div style={{flex: 1}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px'}}>
                  <p style={{fontSize: '14px', fontWeight: 700, color: t.text1}}>{doc.label}</p>
                  {doc.required && (
                    <div style={{padding: '1px 7px', background: brand.primaryLight, borderRadius: '9999px'}}>
                      <span style={{fontSize: '9px', fontWeight: 700, color: brand.primary}}>Required</span>
                    </div>
                  )}
                </div>
                <p style={{fontSize: '12px', color: t.text3}}>{doc.sub}</p>
              </div>
              <button style={{padding: '7px 14px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '9999px', color: 'white', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', flexShrink: 0}}>
                Upload
              </button>
            </div>
          ))}
        </div>

        <div style={{...card, padding: '20px'}}>
          <p style={{fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '6px'}}>Agree to terms</p>
          <p style={{fontSize: '13px', color: t.text3, marginBottom: '16px', lineHeight: 1.5}}>
            By joining Sahayatri, you agree to provide honest, safe and respectful care to all families you serve.
          </p>
          {[
            'I will treat every family member with dignity and respect',
            'I will be punctual and reliable for all bookings',
            'I will not share any personal information of families I serve',
            'I consent to a background verification check',
          ].map((term, i) => (
            <div key={i} style={{display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: i < 3 ? '12px' : '0'}}>
              <div style={{width: '20px', height: '20px', borderRadius: '6px', background: brand.primaryLight, border: `1px solid ${brand.primaryBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px'}}>
                <CheckIcon size={11} color={brand.primary} strokeWidth={2.5}/>
              </div>
              <p style={{fontSize: '13px', color: t.text2, lineHeight: 1.5}}>{term}</p>
            </div>
          ))}
          <div onClick={() => setAgreeTerms(!agreeTerms)}
            style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${t.border}`, cursor: 'pointer'}}>
            <div style={{width: '24px', height: '24px', borderRadius: '8px', border: `2px solid ${agreeTerms ? brand.primary : t.border}`, background: agreeTerms ? brand.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', flexShrink: 0}}>
              {agreeTerms && <CheckIcon size={13} color="white" strokeWidth={2.5}/>}
            </div>
            <p style={{fontSize: '14px', fontWeight: 600, color: t.text1}}>I agree to all terms and conditions</p>
          </div>
        </div>

        <button onClick={handleSubmit} disabled={!agreeTerms || submitting}
          style={{width: '100%', padding: '18px', background: (!agreeTerms || submitting) ? t.inputBg : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: (!agreeTerms || submitting) ? t.text3 : 'white', fontSize: '16px', fontWeight: 800, cursor: (!agreeTerms || submitting) ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: agreeTerms ? '0 6px 24px rgba(220,20,60,0.35)' : 'none'}}>
          {submitting ? (
            <><div style={{width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite'}}/>Submitting application…</>
          ) : (
            <><CheckIcon size={20} color={agreeTerms ? 'white' : t.text3} strokeWidth={2.5}/>Submit Application</>
          )}
        </button>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  // EXPERIENCE STEP
  if (step === 'experience') return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '40px'}}>
      <Header title="Your Experience" sub="Step 3 of 4" back={() => setStep('info')} step={3}/>
      <div style={{padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '14px'}}>

        <div style={{...card, padding: '20px'}}>
          <p style={{fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '16px'}}>Experience details</p>

          <p style={{fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px'}}>Years of experience in this field</p>
          <div style={{display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap'}}>
            {['Less than 1 year', '1–2 years', '3–5 years', '5+ years'].map((opt) => (
              <button key={opt} onClick={() => setExperience(opt)}
                style={{padding: '8px 14px', borderRadius: '9999px', border: `1.5px solid ${experience === opt ? brand.primary : t.border}`, background: experience === opt ? brand.primaryLight : 'transparent', color: experience === opt ? brand.primary : t.text3, fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease'}}>
                {opt}
              </button>
            ))}
          </div>

          <p style={{fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px'}}>Previous work or employer</p>
          <input value={prevWork} onChange={e => setPrevWork(e.target.value)}
            placeholder="e.g. Worked at Norvic Hospital as a nurse aide for 3 years"
            style={{...inputStyle, marginBottom: '16px'}}/>

          <p style={{fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px'}}>Languages you speak</p>
          <div style={{display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap'}}>
            {['Nepali', 'Hindi', 'English', 'Maithili', 'Tamang', 'Newari'].map((lang) => (
              <button key={lang} onClick={() => toggleLanguage(lang)}
                style={{padding: '8px 14px', borderRadius: '9999px', border: `1.5px solid ${languages.includes(lang) ? brand.primary : t.border}`, background: languages.includes(lang) ? brand.primaryLight : 'transparent', color: languages.includes(lang) ? brand.primary : t.text3, fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease'}}>
                {lang}
              </button>
            ))}
          </div>

          <p style={{fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px'}}>Do you have a smartphone?</p>
          <div style={{display: 'flex', gap: '10px', marginBottom: '16px'}}>
            {[{ val: true, label: 'Yes' }, { val: false, label: 'No' }].map((opt) => (
              <button key={String(opt.val)} onClick={() => setHasSmartphone(opt.val)}
                style={{flex: 1, padding: '11px', borderRadius: '12px', border: `1.5px solid ${hasSmartphone === opt.val ? brand.primary : t.border}`, background: hasSmartphone === opt.val ? brand.primaryLight : 'transparent', color: hasSmartphone === opt.val ? brand.primary : t.text1, fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease'}}>
                {opt.label}
              </button>
            ))}
          </div>

          <p style={{fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px'}}>Why do you want to join Sahayatri?</p>
          <textarea value={whyJoin} onChange={e => setWhyJoin(e.target.value)}
            placeholder="Tell us in your own words why you want to care for families through Sahayatri…"
            rows={4}
            style={{width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '13px 16px', fontSize: '14px', color: t.text1, outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' as const, resize: 'none' as const, lineHeight: 1.6}}/>
        </div>

        <button onClick={() => setStep('documents')} disabled={!experience}
          style={{width: '100%', padding: '16px', background: !experience ? t.inputBg : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: !experience ? t.text3 : 'white', fontSize: '15px', fontWeight: 800, cursor: !experience ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease'}}>
          Continue to Documents
        </button>
      </div>
      <style>{`input::placeholder,textarea::placeholder{color:${t.text3}}`}</style>
    </div>
  )

  // PERSONAL INFO STEP
  if (step === 'info') return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '40px'}}>
      <Header title="Personal Information" sub="Step 2 of 4" back={() => setStep('role')} step={2}/>
      <div style={{padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '14px'}}>

        <div style={{...card, padding: '20px'}}>
          <p style={{fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '16px'}}>Your details</p>

          {[
            { label: 'Full name', val: fullName, set: setFullName, ph: 'As on citizenship card' },
            { label: 'Phone number', val: phone, set: setPhone, ph: '98XXXXXXXX' },
            { label: 'Email address', val: email, set: setEmail, ph: 'yourname@email.com' },
            { label: 'Age', val: age, set: setAge, ph: 'e.g. 34' },
          ].map((field, i) => (
            <div key={i} style={{marginBottom: '14px'}}>
              <p style={{fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px'}}>{field.label}</p>
              <input value={field.val} onChange={e => field.set(e.target.value)} placeholder={field.ph}
                style={inputStyle}/>
            </div>
          ))}

          <p style={{fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px'}}>Gender</p>
          <div style={{display: 'flex', gap: '8px', marginBottom: '14px'}}>
            {['Male', 'Female', 'Other'].map((g) => (
              <button key={g} onClick={() => setGender(g)}
                style={{flex: 1, padding: '11px', borderRadius: '12px', border: `1.5px solid ${gender === g ? brand.primary : t.border}`, background: gender === g ? brand.primaryLight : 'transparent', color: gender === g ? brand.primary : t.text1, fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease'}}>
                {g}
              </button>
            ))}
          </div>

          <p style={{fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px'}}>District / City</p>
          <div style={{display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap'}}>
            {['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Other'].map((loc) => (
              <button key={loc} onClick={() => setLocation(loc)}
                style={{padding: '8px 14px', borderRadius: '9999px', border: `1.5px solid ${location === loc ? brand.primary : t.border}`, background: location === loc ? brand.primaryLight : 'transparent', color: location === loc ? brand.primary : t.text3, fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease'}}>
                {loc}
              </button>
            ))}
          </div>

          <p style={{fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px'}}>Full address</p>
          <input value={address} onChange={e => setAddress(e.target.value)} placeholder="e.g. Boudha, Kathmandu"
            style={inputStyle}/>
        </div>

        <button onClick={() => setStep('experience')}
          disabled={!fullName || !phone || !gender || !location}
          style={{width: '100%', padding: '16px', background: (!fullName || !phone || !gender || !location) ? t.inputBg : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: (!fullName || !phone || !gender || !location) ? t.text3 : 'white', fontSize: '15px', fontWeight: 800, cursor: (!fullName || !phone || !gender || !location) ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease'}}>
          Continue to Experience
        </button>
      </div>
      <style>{`input::placeholder{color:${t.text3}}`}</style>
    </div>
  )

  // ROLE SELECTION
  if (step === 'role') return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '40px'}}>
      <Header title="Choose Your Role" sub="Step 1 of 4 · What will you do?" back={() => setStep('landing')} step={1}/>
      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px'}}>

        <div style={{...card, padding: '16px', display: 'flex', alignItems: 'center', gap: '12px'}}>
          <div style={{width: '38px', height: '38px', borderRadius: '12px', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
            <WalletIcon size={19} color={brand.primary} strokeWidth={1.8}/>
          </div>
          <div>
            <p style={{fontSize: '13px', fontWeight: 700, color: t.text1, marginBottom: '2px'}}>Earn on your own schedule</p>
            <p style={{fontSize: '12px', color: t.text3}}>Accept only the bookings you want · No minimum hours</p>
          </div>
        </div>

        {ROLES.map((role) => (
          <div key={role.id}
            onClick={() => setSelectedRole(role)}
            style={{...card, padding: '18px', cursor: 'pointer', border: `1.5px solid ${selectedRole?.id === role.id ? brand.primary : t.border}`, background: selectedRole?.id === role.id ? brand.primaryLight : t.cardBg, transition: 'all 0.2s ease'}}>
            <div style={{display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '12px'}}>
              <div style={{width: '50px', height: '50px', borderRadius: '15px', background: role.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <role.icon/>
              </div>
              <div style={{flex: 1}}>
                <p style={{fontSize: '15px', fontWeight: 800, color: selectedRole?.id === role.id ? brand.primary : t.text1, marginBottom: '2px'}}>{role.title}</p>
                <p style={{fontSize: '11px', color: t.text3, marginBottom: '5px'}}>{role.nepali}</p>
                <p style={{fontSize: '13px', color: t.text2, lineHeight: 1.5}}>{role.desc}</p>
              </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: `1px solid ${t.border}`}}>
              <div>
                <p style={{fontSize: '16px', fontWeight: 900, color: role.color, letterSpacing: '-0.5px'}}>{role.earn}</p>
                <p style={{fontSize: '11px', color: t.text3}}>{role.period}</p>
              </div>
              {selectedRole?.id === role.id && (
                <div style={{display: 'flex', alignItems: 'center', gap: '5px', background: brand.primaryLight, border: `1px solid ${brand.primaryBorder}`, borderRadius: '9999px', padding: '5px 12px'}}>
                  <CheckIcon size={12} color={brand.primary} strokeWidth={2.5}/>
                  <span style={{fontSize: '11px', fontWeight: 700, color: brand.primary}}>Selected</span>
                </div>
              )}
            </div>
          </div>
        ))}

        <button onClick={() => selectedRole && setStep('info')} disabled={!selectedRole}
          style={{width: '100%', padding: '16px', background: !selectedRole ? t.inputBg : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: !selectedRole ? t.text3 : 'white', fontSize: '15px', fontWeight: 800, cursor: !selectedRole ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease', marginTop: '6px'}}>
          {selectedRole ? `Apply as ${selectedRole.title}` : 'Select a role to continue'}
        </button>
      </div>
    </div>
  )

  // LANDING PAGE
  return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, -apple-system, sans-serif', paddingBottom: '40px', transition: 'background 0.3s ease'}}>
      <div style={{background: t.headerBg, backdropFilter: 'blur(20px)', padding: '52px 20px 16px', borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 50}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <button onClick={() => router.back()} style={{width: '38px', height: '38px', borderRadius: '12px', background: t.inputBg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
            <ArrowLeftIcon size={18} color={t.text2} strokeWidth={2}/>
          </button>
          <div>
            <h1 style={{fontSize: '22px', fontWeight: 900, color: t.text1, letterSpacing: '-0.6px'}}>Join as Professional</h1>
            <p style={{fontSize: '12px', color: t.text3}}>Earn while making a difference</p>
          </div>
        </div>
      </div>

      <div style={{padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px'}}>

        {/* Hero */}
        <div style={{background: 'linear-gradient(135deg, #0E0B18 0%, #1A0A16 50%, #0A0E1A 100%)', borderRadius: '24px', padding: '26px', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)'}}>
          <div style={{position: 'absolute', top: '-40px', right: '-30px', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,20,60,0.2), transparent 70%)', pointerEvents: 'none'}}/>
          <div style={{position: 'relative', zIndex: 1}}>
            <div style={{display: 'inline-flex', alignItems: 'center', gap: '6px', background: brand.primaryLight, border: `1px solid ${brand.primaryBorder}`, borderRadius: '9999px', padding: '5px 12px', marginBottom: '16px'}}>
              <div style={{width: '5px', height: '5px', borderRadius: '50%', background: brand.primary, animation: 'pulse 2s ease infinite'}}/>
              <span style={{fontSize: '10px', fontWeight: 700, color: brand.primary, textTransform: 'uppercase', letterSpacing: '0.8px'}}>Now hiring in Kathmandu</span>
            </div>
            <h2 style={{fontSize: '24px', fontWeight: 800, color: 'white', lineHeight: 1.3, marginBottom: '10px', letterSpacing: '-0.5px'}}>
              Care for families.<br/>Earn on your terms.
            </h2>
            <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '22px'}}>
              Join Sahayatri as a verified companion or service professional. Make a real difference in people's lives while earning a steady income.
            </p>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px'}}>
              {[
                { val: 'NPR 40K', label: 'Max monthly', color: brand.primary },
                { val: 'Flexible', label: 'Your schedule', color: '#22C55E' },
                { val: '500+', label: 'Families', color: '#60A5FA' },
              ].map((s, i) => (
                <div key={i} style={{background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '12px 8px', textAlign: 'center'}}>
                  <p style={{fontSize: '16px', fontWeight: 800, color: s.color, marginBottom: '3px'}}>{s.val}</p>
                  <p style={{fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 600}}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why join */}
        <div style={{...card, padding: '22px'}}>
          <p style={{fontSize: '16px', fontWeight: 800, color: t.text1, marginBottom: '16px', letterSpacing: '-0.3px'}}>Why join Sahayatri</p>
          {[
            { title: 'Steady, verified work', desc: 'No more searching for clients. Families come to you through our platform.', color: brand.primary, bg: brand.primaryLight },
            { title: 'Flexible schedule', desc: 'Accept only the bookings that fit your life. No minimum hours required.', color: '#059669', bg: 'rgba(5,150,105,0.08)' },
            { title: 'Fast payments', desc: 'Get paid directly to your eSewa or Khalti within 24 hours of completing a job.', color: '#D97706', bg: 'rgba(217,119,6,0.08)' },
            { title: 'Build your reputation', desc: 'Every 5-star review builds your profile. Top companions earn the most.', color: '#7C3AED', bg: 'rgba(124,58,237,0.08)' },
            { title: 'Training provided', desc: 'Free orientation and training on how to provide the best care.', color: '#2563EB', bg: 'rgba(37,99,235,0.08)' },
          ].map((item, i) => (
            <div key={i} style={{display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: i < 4 ? '16px' : '0'}}>
              <div style={{width: '38px', height: '38px', borderRadius: '12px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <CheckIcon size={18} color={item.color} strokeWidth={2.5}/>
              </div>
              <div>
                <p style={{fontSize: '14px', fontWeight: 700, color: t.text1, marginBottom: '3px'}}>{item.title}</p>
                <p style={{fontSize: '13px', color: t.text3, lineHeight: 1.5}}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* How to apply */}
        <div style={{...card, padding: '22px'}}>
          <p style={{fontSize: '16px', fontWeight: 800, color: t.text1, marginBottom: '16px', letterSpacing: '-0.3px'}}>How to apply</p>
          {[
            { step: '1', title: 'Fill the application', desc: '4 simple steps. Takes about 10 minutes.', color: brand.primary },
            { step: '2', title: 'Background check', desc: 'We verify your ID and credentials. Takes 2–3 days.', color: '#7C3AED' },
            { step: '3', title: 'Orientation', desc: '30-minute call with our team. We explain everything.', color: '#059669' },
            { step: '4', title: 'Start earning', desc: 'Your profile goes live. Bookings start coming in.', color: '#D97706' },
          ].map((item, i) => (
            <div key={i} style={{display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: i < 3 ? '16px' : '0', position: 'relative'}}>
              {i < 3 && <div style={{position: 'absolute', left: '14px', top: '30px', width: '2px', height: '20px', background: t.border}}/>}
              <div style={{width: '28px', height: '28px', borderRadius: '50%', background: `${item.color}12`, border: `1.5px solid ${item.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <span style={{fontSize: '11px', fontWeight: 800, color: item.color}}>{item.step}</span>
              </div>
              <div style={{paddingTop: '3px'}}>
                <p style={{fontSize: '14px', fontWeight: 700, color: t.text1, marginBottom: '3px'}}>{item.title}</p>
                <p style={{fontSize: '13px', color: t.text3, lineHeight: 1.5}}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial from companion */}
        <div style={{...card, padding: '22px'}}>
          <p style={{fontSize: '16px', fontWeight: 800, color: t.text1, marginBottom: '16px', letterSpacing: '-0.3px'}}>From our companions</p>
          <div style={{display: 'flex', gap: '12px', alignItems: 'flex-start'}}>
            <div style={{width: '44px', height: '44px', borderRadius: '50%', background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '16px', flexShrink: 0}}>SS</div>
            <div>
              <p style={{fontSize: '14px', fontWeight: 700, color: t.text1, marginBottom: '2px'}}>Sita Sharma</p>
              <p style={{fontSize: '12px', color: t.text3, marginBottom: '10px'}}>Elder Care Companion · Kathmandu · 4.9 stars</p>
              <p style={{fontSize: '13px', color: t.text2, lineHeight: 1.6, fontStyle: 'italic'}}>
                "I was a nurse aide for years but struggled to find consistent work. Since joining Sahayatri, I have a steady income and I genuinely love the families I serve. Some of them call me their second daughter. That means everything to me."
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button onClick={() => setStep('role')}
          style={{width: '100%', padding: '18px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '18px', color: 'white', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 32px rgba(220,20,60,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', letterSpacing: '-0.3px'}}>
          <SparkleIcon size={20} color="white" strokeWidth={2}/>
          Apply Now — It is Free
        </button>

        <p style={{fontSize: '12px', color: t.text3, textAlign: 'center', lineHeight: 1.6}}>
          Free to apply · No registration fee · Start earning within a week
        </p>

      </div>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(0.8)}}
        ::-webkit-scrollbar{display:none}
      `}</style>
    </div>
  )
}
