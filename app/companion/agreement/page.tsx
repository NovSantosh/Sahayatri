'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from '../../context/ThemeContext'
import { brand } from '../../design-system'
import { CheckIcon, ArrowLeftIcon } from '../../components/Icons'

const SECTIONS = [
  {
    id: 's1',
    title: 'Identity and Background Verification',
    content: `1.1 I confirm that all personal information provided during registration is true and accurate.

1.2 I consent to Sahayatri conducting a thorough background verification including criminal record checks, identity verification, and reference checks.

1.3 I agree to provide a valid Police Clearance Certificate issued within the last six months, and to renew it every six months while active on the platform.

1.4 I understand that any false information will result in immediate permanent termination with no right of appeal.

1.5 I consent to identity verification through facial recognition matched against my citizenship card.

1.6 I agree to re-verification every twelve months and to provide updated documents within five working days when requested.`,
  },
  {
    id: 's2',
    title: 'Code of Conduct Inside Family Homes',
    content: `2.1 I understand I am entering private family homes and will be present with vulnerable elderly individuals who deserve the highest standards of care and respect.

2.2 I commit to treating every family member with complete dignity, kindness and professionalism at all times.

2.3 I strictly agree NOT to:
— Consume alcohol or any substance before or during any visit
— Use my personal phone for personal calls during service hours
— Take photographs inside the home without explicit consent
— Bring any unauthorized person to the family home
— Discuss the family's personal affairs with any third party
— Accept personal gifts or money beyond the agreed platform payment
— Engage in any inappropriate interaction with any household member

2.4 I agree to arrive on time for all scheduled visits. Three instances of late arrival without notice within 30 days will result in suspension.

2.5 I will immediately report to Sahayatri any emergency, medical incident or safety concern observed during a visit.`,
  },
  {
    id: 's3',
    title: 'Non-Disclosure and Confidentiality',
    content: `3.1 I acknowledge that during my work I will have access to sensitive personal information including home addresses, medical conditions, daily routines, and family relationships.

3.2 I solemnly agree to maintain strict confidentiality of all such information, both during my time on the platform and indefinitely after my relationship with Sahayatri ends.

3.3 I agree NOT to:
— Share any family personal information with any third party
— Discuss family matters with neighbors, relatives or acquaintances
— Post any information or photos about families on social media
— Use family information for any personal or commercial purpose
— Contact family members outside the Sahayatri platform without consent

3.4 I understand that any breach may result in legal action under the Electronic Transaction Act 2063 and the Individual Privacy Act 2075 of Nepal.`,
  },
  {
    id: 's4',
    title: 'Liability and Responsibility',
    content: `4.1 I accept full responsibility for my conduct and actions during all service visits.

4.2 In the event of theft, damage to property, physical harm caused by my negligence, or breach of this agreement, I will be held personally liable and may face legal proceedings under Nepali law.

4.3 I understand that Sahayatri maintains the right to share my personal information with law enforcement in the event of any criminal complaint filed against me.

4.4 I understand that Sahayatri's platform liability insurance covers verified companions in good standing but does not extend to deliberate misconduct or breach of this agreement.`,
  },
  {
    id: 's5',
    title: 'Platform Terms and Payment',
    content: `5.1 I understand that Sahayatri operates as a marketplace connecting families with service providers, and is not my employer.

5.2 I agree to Sahayatri's commission of fifteen percent (15%) of each booking value, subject to change with thirty days written notice.

5.3 I understand payments will be disbursed to my registered eSewa or Khalti within twenty-four hours of successful job completion and family confirmation.

5.4 I agree that:
— My profile rating must stay above 3.5 stars to remain active
— Three verified complaints within 90 days will result in suspension
— Any serious misconduct will result in immediate permanent ban
— I will not solicit business from families outside the Sahayatri platform

5.5 All disputes will be resolved under the jurisdiction of Kathmandu District Court, Nepal.`,
  },
  {
    id: 's6',
    title: 'Data Privacy and Consent',
    content: `6.1 I consent to Sahayatri collecting, storing and processing my personal data including identity documents, photographs, location data during active jobs, and performance data.

6.2 I consent to Sahayatri sharing necessary information with families booking my services, including my name, photograph, rating and verified status.

6.3 I understand Sahayatri may share my data with law enforcement under applicable Nepali law when legally required.

6.4 I understand that upon account termination, my data will be retained for a minimum of seven years as required by law.`,
  },
  {
    id: 's7',
    title: 'Zero Tolerance and Termination Policy',
    content: `7.1 ZERO TOLERANCE — The following result in IMMEDIATE PERMANENT TERMINATION with no appeal and possible criminal prosecution:

— Any form of physical, emotional or sexual abuse of a family member
— Theft of any amount from a family home
— Sharing a family address or personal details with third parties
— Bringing unauthorized individuals to a family home
— Any action endangering the safety or wellbeing of a family member
— Providing false identity or fraudulent documentation

7.2 THREE STRIKES — The following result in suspension, permanent termination on third occurrence within 12 months:
— Unexplained absence from a scheduled visit
— Late arrival exceeding 30 minutes without prior notice
— Receiving a verified formal complaint from a family
— Failure to send required updates during a visit

7.3 Upon termination for zero tolerance violations, all pending payments are forfeited.`,
  },
]

export default function CompanionAgreement() {
  const { t } = useTheme()
  const router = useRouter()
  const [readSections, setReadSections] = useState<string[]>([])
  const [confirmed, setConfirmed] = useState<string[]>([])
  const [expanded, setExpanded] = useState<string | null>('s1')
  const [fullName, setFullName] = useState('')
  const [citizenshipNo, setCitizenshipNo] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [signed, setSigned] = useState(false)

  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  const markRead = (id: string) => {
    if (!readSections.includes(id)) setReadSections(prev => [...prev, id])
  }

  const toggleConfirm = (id: string) => {
    setConfirmed(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id])
  }

  const allRead = SECTIONS.every(s => readSections.includes(s.id))
  const allConfirmed = SECTIONS.every(s => confirmed.includes(s.id))
  const canSign = allRead && allConfirmed && fullName.trim().length > 3 && citizenshipNo.trim().length > 5

  const handleSign = async () => {
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 2000))
    setSubmitting(false)
    setSigned(true)
  }

  const card = {
    background: t.cardBg,
    borderRadius: '20px' as const,
    border: `1px solid ${t.border}`,
    boxShadow: t.shadow,
  }

  if (signed) return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', transition: 'background 0.3s ease'}}>
      <div style={{width: '88px', height: '88px', borderRadius: '50%', background: 'linear-gradient(135deg, #059669, #047857)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 8px 32px rgba(5,150,105,0.4)', animation: 'breathe 2s ease infinite'}}>
        <CheckIcon size={40} color="white" strokeWidth={2.5}/>
      </div>
      <h1 style={{fontSize: '26px', fontWeight: 900, color: t.text1, letterSpacing: '-0.8px', marginBottom: '12px', textAlign: 'center'}}>Agreement Signed</h1>
      <p style={{fontSize: '15px', color: t.text2, lineHeight: 1.7, marginBottom: '8px', textAlign: 'center', maxWidth: '300px'}}>
        Thank you, {fullName}. Your agreement has been recorded and digitally signed.
      </p>
      <p style={{fontSize: '13px', color: t.text3, marginBottom: '32px', textAlign: 'center'}}>
        Signed {date} · Citizenship: {citizenshipNo}
      </p>

      <div style={{...card, padding: '22px', width: '100%', maxWidth: '400px', marginBottom: '20px'}}>
        <p style={{fontSize: '13px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '16px'}}>What happens next</p>
        {[
          { step: '1', title: 'Document upload', desc: 'Upload your citizenship and police clearance.', color: brand.primary },
          { step: '2', title: 'Background check', desc: 'Our team verifies your details within 2–3 days.', color: '#7C3AED' },
          { step: '3', title: 'Orientation call', desc: 'A 30-minute call to get you ready.', color: '#059669' },
          { step: '4', title: 'Start earning', desc: 'Your companion dashboard goes live.', color: '#D97706' },
        ].map((item, i) => (
          <div key={i} style={{display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: i < 3 ? '16px' : '0', position: 'relative'}}>
            {i < 3 && <div style={{position: 'absolute', left: '13px', top: '28px', width: '2px', height: '18px', background: t.border}}/>}
            <div style={{width: '28px', height: '28px', borderRadius: '50%', background: `${item.color}15`, border: `1.5px solid ${item.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <span style={{fontSize: '11px', fontWeight: 800, color: item.color}}>{item.step}</span>
            </div>
            <div style={{paddingTop: '3px'}}>
              <p style={{fontSize: '13px', fontWeight: 700, color: t.text1, marginBottom: '2px'}}>{item.title}</p>
              <p style={{fontSize: '12px', color: t.text3}}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => router.push('/companion/dashboard')}
        style={{width: '100%', maxWidth: '400px', padding: '16px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 6px 24px rgba(220,20,60,0.35)'}}>
        Go to My Dashboard
      </button>
      <style>{`@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}`}</style>
    </div>
  )

  return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '120px', transition: 'background 0.3s ease'}}>

      {/* Header */}
      <div style={{background: 'linear-gradient(135deg, #0E0B18, #1A0A16)', padding: '52px 20px 20px', position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(255,255,255,0.08)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
          <button onClick={() => router.back()}
            style={{width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
            <ArrowLeftIcon size={18} color="rgba(255,255,255,0.6)" strokeWidth={2}/>
          </button>
          <div style={{flex: 1}}>
            <h1 style={{fontSize: '18px', fontWeight: 800, color: 'white', letterSpacing: '-0.4px'}}>Companion Agreement</h1>
            <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '2px'}}>Read all sections carefully before signing</p>
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <div style={{flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '9999px', overflow: 'hidden'}}>
            <div style={{height: '100%', width: `${(readSections.length / SECTIONS.length) * 100}%`, background: 'linear-gradient(90deg, #DC143C, #A50E2D)', borderRadius: '9999px', transition: 'width 0.3s ease'}}/>
          </div>
          <p style={{fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', flexShrink: 0}}>
            {readSections.length}/{SECTIONS.length} read
          </p>
        </div>
      </div>

      <div style={{padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '10px'}}>

        {/* Warning */}
        <div style={{background: 'rgba(220,20,60,0.06)', border: `1px solid ${brand.primaryBorder}`, borderRadius: '16px', padding: '16px', display: 'flex', gap: '12px'}}>
          <div style={{width: '32px', height: '32px', borderRadius: '10px', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={brand.primary} strokeWidth="2" strokeLinecap="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div>
            <p style={{fontSize: '13px', fontWeight: 800, color: brand.primary, marginBottom: '4px'}}>This is a legally binding document</p>
            <p style={{fontSize: '12px', color: brand.primary, opacity: 0.8, lineHeight: 1.6}}>
              Enforceable under Nepali law. Read every section carefully. You must read and confirm each section individually before signing.
            </p>
          </div>
        </div>

        {/* Sections */}
        {SECTIONS.map((section, idx) => {
          const isExpanded = expanded === section.id
          const isRead = readSections.includes(section.id)
          const isConfirmed = confirmed.includes(section.id)

          return (
            <div key={section.id} style={{...card, overflow: 'hidden', border: `1.5px solid ${isConfirmed ? 'rgba(5,150,105,0.3)' : isRead ? brand.primaryBorder : t.border}`, transition: 'border-color 0.2s ease'}}>
              <div onClick={() => { setExpanded(isExpanded ? null : section.id); markRead(section.id) }}
                style={{padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer'}}>
                <div style={{width: '32px', height: '32px', borderRadius: '10px', background: isConfirmed ? 'rgba(5,150,105,0.1)' : isRead ? brand.primaryLight : t.inputBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s ease'}}>
                  {isConfirmed
                    ? <CheckIcon size={16} color="#059669" strokeWidth={2.5}/>
                    : <span style={{fontSize: '12px', fontWeight: 800, color: isRead ? brand.primary : t.text3}}>{idx + 1}</span>}
                </div>
                <div style={{flex: 1}}>
                  <p style={{fontSize: '14px', fontWeight: 700, color: t.text1}}>{section.title}</p>
                  <p style={{fontSize: '11px', color: isConfirmed ? '#059669' : isRead ? brand.primary : t.text3, fontWeight: 600, marginTop: '2px'}}>
                    {isConfirmed ? '✓ Confirmed' : isRead ? 'Read · Please confirm below' : 'Tap to read'}
                  </p>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.text3} strokeWidth="2" strokeLinecap="round">
                  <path d={isExpanded ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}/>
                </svg>
              </div>

              {isExpanded && (
                <div style={{borderTop: `1px solid ${t.border}`}}>
                  <div style={{padding: '20px', background: t.inputBg}}>
                    <p style={{fontSize: '13px', color: t.text2, lineHeight: 1.9, whiteSpace: 'pre-line'}}>{section.content}</p>
                  </div>
                  <div style={{padding: '16px', borderTop: `1px solid ${t.border}`}}>
                    <div onClick={() => toggleConfirm(section.id)}
                      style={{display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer'}}>
                      <div style={{width: '24px', height: '24px', borderRadius: '8px', border: `2px solid ${isConfirmed ? '#059669' : t.border}`, background: isConfirmed ? '#059669' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', flexShrink: 0, marginTop: '1px'}}>
                        {isConfirmed && <CheckIcon size={13} color="white" strokeWidth={2.5}/>}
                      </div>
                      <p style={{fontSize: '13px', color: t.text1, lineHeight: 1.5}}>
                        I have read, understood and agree to Section {idx + 1}: <strong>{section.title}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {/* Signature */}
        {allRead && allConfirmed && (
          <div style={{...card, padding: '22px'}}>
            <p style={{fontSize: '16px', fontWeight: 800, color: t.text1, marginBottom: '6px'}}>Digital Signature</p>
            <p style={{fontSize: '13px', color: t.text3, lineHeight: 1.5, marginBottom: '20px'}}>
              By entering your full name and citizenship number and tapping Sign, you are legally signing this agreement under the Electronic Transaction Act 2063 of Nepal.
            </p>

            <p style={{fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px'}}>Full name (as on citizenship card)</p>
            <input value={fullName} onChange={e => setFullName(e.target.value)}
              placeholder="e.g. Ram Bahadur Thapa"
              style={{width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '13px 16px', fontSize: '15px', color: t.text1, outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' as const, marginBottom: '14px', transition: 'background 0.3s ease'}}/>

            <p style={{fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px'}}>Citizenship number</p>
            <input value={citizenshipNo} onChange={e => setCitizenshipNo(e.target.value)}
              placeholder="e.g. 12-34-56-78901"
              style={{width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '13px 16px', fontSize: '15px', color: t.text1, outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' as const, marginBottom: '20px', transition: 'background 0.3s ease'}}/>

            <div style={{background: t.inputBg, borderRadius: '14px', padding: '14px 16px', marginBottom: '20px', border: `1px solid ${t.border}`}}>
              {[
                { label: 'Signatory', value: fullName || '—' },
                { label: 'Citizenship No.', value: citizenshipNo || '—' },
                { label: 'Date', value: date },
                { label: 'Platform', value: 'Sahayatri · sahayatri.app' },
              ].map((item, i, arr) => (
                <div key={i} style={{display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none'}}>
                  <p style={{fontSize: '12px', color: t.text3}}>{item.label}</p>
                  <p style={{fontSize: '12px', fontWeight: 700, color: t.text1}}>{item.value}</p>
                </div>
              ))}
            </div>

            <button onClick={handleSign} disabled={!canSign || submitting}
              style={{width: '100%', padding: '18px', background: (!canSign || submitting) ? t.inputBg : 'linear-gradient(135deg, #059669, #047857)', border: 'none', borderRadius: '16px', color: (!canSign || submitting) ? t.text3 : 'white', fontSize: '16px', fontWeight: 800, cursor: (!canSign || submitting) ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: canSign && !submitting ? '0 6px 24px rgba(5,150,105,0.35)' : 'none', transition: 'all 0.2s ease'}}>
              {submitting
                ? <><div style={{width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite'}}/>Recording signature…</>
                : <><CheckIcon size={20} color={canSign ? 'white' : t.text3} strokeWidth={2.5}/>Sign Agreement Legally</>}
            </button>
          </div>
        )}

        {!allRead && (
          <p style={{fontSize: '13px', color: t.text3, textAlign: 'center', padding: '8px'}}>
            Read {SECTIONS.length - readSections.length} more section{SECTIONS.length - readSections.length !== 1 ? 's' : ''} to continue
          </p>
        )}
        {allRead && !allConfirmed && (
          <p style={{fontSize: '13px', color: t.text3, textAlign: 'center', padding: '8px'}}>
            Confirm {SECTIONS.length - confirmed.length} more section{SECTIONS.length - confirmed.length !== 1 ? 's' : ''} to sign
          </p>
        )}
      </div>

      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        input::placeholder{color:${t.text3}}
        ::-webkit-scrollbar{display:none}
      `}</style>
    </div>
  )
}
