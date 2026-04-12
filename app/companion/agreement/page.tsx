'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTheme } from '../../context/ThemeContext'
import { brand } from '../../design-system'
import { CheckIcon, ArrowLeftIcon, CameraIcon } from '../../components/Icons'

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
— Discuss the family personal affairs with any third party
— Accept personal gifts or money beyond the agreed platform payment
— Engage in any inappropriate interaction with any household member

2.4 I agree to arrive on time for all scheduled visits. Three instances of late arrival without notice within 30 days will result in suspension.

2.5 I will immediately report to Sahayatri any emergency, medical incident or safety concern observed during a visit.`,
  },
  {
    id: 's3',
    title: 'Non-Disclosure and Confidentiality Agreement',
    content: `3.1 I acknowledge that during my work I will have access to sensitive personal information including home addresses, medical conditions, daily routines, family relationships and financial matters.

3.2 I solemnly agree to maintain strict confidentiality of all such information, both during my time on the platform and indefinitely after my relationship with Sahayatri ends.

3.3 I agree NOT to:
— Share any family personal information with any third party under any circumstances
— Discuss family matters with neighbors, relatives or acquaintances
— Post any information or photos about families on social media
— Use family information for any personal or commercial purpose
— Contact family members outside the Sahayatri platform without explicit consent

3.4 I understand that any breach may result in legal action under the Electronic Transaction Act 2063 and the Individual Privacy Act 2075 of Nepal.

3.5 I acknowledge that Sahayatri may seek damages for any losses caused by a breach of this agreement.`,
  },
  {
    id: 's4',
    title: 'Liability and Responsibility',
    content: `4.1 I accept full personal responsibility for my conduct, actions and decisions during all service visits.

4.2 In the event of theft or damage to family property, physical harm or injury caused by my negligence, emotional distress caused by inappropriate conduct, or breach of any term of this agreement, I will be held personally liable and may face legal proceedings under Nepali law.

4.3 I understand that Sahayatri maintains the right to share my personal information with law enforcement authorities in the event of any criminal complaint filed against me.

4.4 I agree to report any pre-existing medical condition that may affect my ability to perform care duties safely.

4.5 I understand that Sahayatri platform liability insurance covers verified companions in good standing but does not extend to deliberate misconduct, negligence or breach of this agreement.`,
  },
  {
    id: 's5',
    title: 'Platform Terms and Payment',
    content: `5.1 I understand that Sahayatri operates as a marketplace connecting families with service providers and is not my employer.

5.2 I agree to Sahayatri commission of fifteen percent (15%) of each booking value, subject to change with thirty days written notice.

5.3 I understand payments will be disbursed to my registered eSewa or Khalti within twenty-four hours of successful job completion and family confirmation.

5.4 I agree that:
— My profile rating must stay above 3.5 stars to remain active on the platform
— Three verified complaints within 90 days will result in suspension
— Any serious misconduct will result in immediate permanent ban
— I will not solicit business from families outside the Sahayatri platform

5.5 Sahayatri reserves the right to terminate my account at any time for any violation without payment obligation beyond completed services.

5.6 All disputes will be resolved under the jurisdiction of Kathmandu District Court, Nepal.`,
  },
  {
    id: 's6',
    title: 'Data Privacy and Consent',
    content: `6.1 I consent to Sahayatri collecting, storing and processing my personal data including identity documents, photographs, location data during active jobs, communication records and performance data.

6.2 I understand that my data will be stored securely and used solely for the purpose of operating the Sahayatri platform.

6.3 I consent to Sahayatri sharing necessary information with families booking my services, including my name, photograph, rating, experience and verified status.

6.4 I understand that Sahayatri may share my data with law enforcement or regulatory authorities under applicable Nepali law when legally required.

6.5 I have the right to request access to my personal data and to request correction of any inaccurate information.

6.6 Upon account termination, my data will be retained for a minimum of seven years as required by applicable law, after which it will be securely deleted.`,
  },
  {
    id: 's7',
    title: 'Zero Tolerance and Termination Policy',
    content: `7.1 ZERO TOLERANCE — The following result in IMMEDIATE PERMANENT TERMINATION with no right of appeal and possible criminal prosecution:

— Any form of physical, emotional or sexual abuse of a family member
— Theft of any amount from a family home
— Sharing a family address or personal details with third parties
— Bringing unauthorized individuals to a family home
— Any action endangering the safety or wellbeing of a family member
— Providing false identity or fraudulent documentation

7.2 THREE STRIKES POLICY — The following result in suspension and permanent termination on third occurrence within 12 months:
— Unexplained absence from a scheduled visit
— Late arrival exceeding 30 minutes without prior notice
— Receiving a verified formal complaint from a family
— Failure to send required updates during a visit
— Inappropriate use of mobile phone during service hours

7.3 Sahayatri decision regarding termination is final in cases involving zero tolerance violations.

7.4 Upon termination for zero tolerance violations, all pending payments are forfeited.`,
  },
]

const REQUIRED_DOCS = [
  { id: 'citizenship', label: 'Citizenship Card (Nagarikta)', sub: 'Front and back clear photo', required: true },
  { id: 'photo', label: 'Recent Passport Photo', sub: 'Clear face photo taken within 3 months', required: true },
  { id: 'police', label: 'Police Clearance Certificate', sub: 'Issued within last 6 months', required: true },
  { id: 'certificate', label: 'Skill Certificate', sub: 'Nursing, cooking, electrical etc · Optional', required: false },
  { id: 'reference', label: 'Reference Letter', sub: 'From employer or community leader · Optional', required: false },
]

export default function CompanionAgreement() {
  const { t } = useTheme()
  const router = useRouter()
  const { data: session } = useSession()

  const [confirmed, setConfirmed] = useState<string[]>([])
  const [expanded, setExpanded] = useState<string | null>('s1')
  const [everExpanded, setEverExpanded] = useState<string[]>(['s1'])
  const [fullName, setFullName] = useState('')
  const [citizenshipNo, setCitizenshipNo] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [signed, setSigned] = useState(false)
  const [showDocUpload, setShowDocUpload] = useState(false)
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([])
  const [uploadingDocs, setUploadingDocs] = useState(false)
  const [docsSaved, setDocsSaved] = useState(false)

  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  const handleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id)
    if (!everExpanded.includes(id)) setEverExpanded(prev => [...prev, id])
  }

  const toggleConfirm = (id: string) => {
    if (!everExpanded.includes(id)) setEverExpanded(prev => [...prev, id])
    setConfirmed(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id])
  }

  const toggleDoc = (id: string) => {
    setUploadedDocs(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id])
  }

  const allConfirmed = SECTIONS.every(s => confirmed.includes(s.id))
  const canSign = allConfirmed && fullName.trim().length > 3 && citizenshipNo.trim().length > 5
  const confirmedCount = confirmed.length
  const totalCount = SECTIONS.length
  const requiredUploaded = REQUIRED_DOCS.filter(d => d.required).every(d => uploadedDocs.includes(d.id))

  const handleSign = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/companion/sign-agreement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, citizenshipNo, email: session?.user?.email })
      })
      if (res.ok) {
        setSigned(true)
        setTimeout(() => setShowDocUpload(true), 800)
      } else {
        alert('Failed to save agreement. Please try again.')
      }
    } catch (e) {
      alert('Something went wrong. Please try again.')
    }
    setSubmitting(false)
  }

  const handleSaveDocs = async () => {
    setUploadingDocs(true)
    try {
      const res = await fetch('/api/companion/upload-docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session?.user?.email, docs: uploadedDocs })
      })
      if (res.ok) setDocsSaved(true)
    } catch (e) {}
    setUploadingDocs(false)
  }

  const goToDashboard = () => {
    window.location.href = '/companion/dashboard'
  }

  const card = {
    background: t.cardBg,
    borderRadius: '20px' as const,
    border: `1px solid ${t.border}`,
    boxShadow: t.shadow,
  }

  // ── DOCUMENT UPLOAD SHEET ──
  if (showDocUpload) return (
    <div style={{minHeight: '100vh', background: 'rgba(0,0,0,0.6)', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
      <div style={{background: t.cardBg, borderRadius: '28px 28px 0 0', padding: '28px 20px 48px', maxHeight: '90vh', overflowY: 'auto'}}>
        <div style={{width: '40px', height: '4px', borderRadius: '9999px', background: t.border, margin: '0 auto 24px'}}/>

        <div style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.2)', borderRadius: '14px', marginBottom: '22px'}}>
          <div style={{width: '38px', height: '38px', borderRadius: '11px', background: 'rgba(5,150,105,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
            <CheckIcon size={19} color="#059669" strokeWidth={2.5}/>
          </div>
          <div>
            <p style={{fontSize: '14px', fontWeight: 800, color: '#059669', marginBottom: '2px'}}>Agreement Signed</p>
            <p style={{fontSize: '12px', color: t.text3}}>Signed by {fullName} · {date}</p>
          </div>
        </div>

        <h2 style={{fontSize: '22px', fontWeight: 900, color: t.text1, letterSpacing: '-0.6px', marginBottom: '8px'}}>Upload Your Documents</h2>
        <p style={{fontSize: '14px', color: t.text3, lineHeight: 1.6, marginBottom: '24px'}}>
          Upload required documents to activate your account. You can skip and upload from your dashboard later — but you cannot accept jobs until verified.
        </p>

        {!docsSaved ? (
          <>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '22px'}}>
              {REQUIRED_DOCS.map((doc) => {
                const isUploaded = uploadedDocs.includes(doc.id)
                return (
                  <div key={doc.id} onClick={() => toggleDoc(doc.id)}
                    style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: '16px', border: `1.5px solid ${isUploaded ? 'rgba(5,150,105,0.3)' : t.border}`, background: isUploaded ? 'rgba(5,150,105,0.05)' : t.inputBg, cursor: 'pointer', transition: 'all 0.2s ease'}}>
                    <div style={{width: '42px', height: '42px', borderRadius: '12px', background: isUploaded ? 'rgba(5,150,105,0.1)' : brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                      {isUploaded
                        ? <CheckIcon size={20} color="#059669" strokeWidth={2.5}/>
                        : <CameraIcon size={20} color={brand.primary} strokeWidth={1.8}/>}
                    </div>
                    <div style={{flex: 1}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px'}}>
                        <p style={{fontSize: '13px', fontWeight: 700, color: isUploaded ? '#059669' : t.text1}}>{doc.label}</p>
                        {doc.required && (
                          <div style={{padding: '1px 6px', background: isUploaded ? 'rgba(5,150,105,0.1)' : brand.primaryLight, borderRadius: '9999px'}}>
                            <span style={{fontSize: '9px', fontWeight: 700, color: isUploaded ? '#059669' : brand.primary}}>Required</span>
                          </div>
                        )}
                      </div>
                      <p style={{fontSize: '11px', color: t.text3}}>{doc.sub}</p>
                    </div>
                    <div style={{padding: '6px 14px', background: isUploaded ? 'rgba(5,150,105,0.1)' : 'linear-gradient(135deg, #DC143C, #A50E2D)', borderRadius: '9999px', flexShrink: 0}}>
                      <span style={{fontSize: '11px', fontWeight: 700, color: isUploaded ? '#059669' : 'white'}}>
                        {isUploaded ? 'Done' : 'Upload'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <button onClick={handleSaveDocs} disabled={!requiredUploaded || uploadingDocs}
                style={{width: '100%', padding: '16px', background: (!requiredUploaded || uploadingDocs) ? t.inputBg : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: (!requiredUploaded || uploadingDocs) ? t.text3 : 'white', fontSize: '15px', fontWeight: 800, cursor: (!requiredUploaded || uploadingDocs) ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: requiredUploaded ? '0 6px 24px rgba(220,20,60,0.35)' : 'none', transition: 'all 0.2s ease'}}>
                {uploadingDocs
                  ? <><div style={{width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite'}}/>Submitting…</>
                  : <><CheckIcon size={18} color={requiredUploaded ? 'white' : t.text3} strokeWidth={2.5}/>Submit Documents</>}
              </button>
              <button onClick={goToDashboard}
                style={{width: '100%', padding: '14px', background: 'transparent', border: `1px solid ${t.border}`, borderRadius: '16px', color: t.text3, fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif'}}>
                Skip — Upload from dashboard
              </button>
            </div>
          </>
        ) : (
          <div style={{textAlign: 'center', padding: '20px 0'}}>
            <div style={{width: '68px', height: '68px', borderRadius: '50%', background: 'rgba(5,150,105,0.1)', border: '2px solid rgba(5,150,105,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'}}>
              <CheckIcon size={34} color="#059669" strokeWidth={2.5}/>
            </div>
            <p style={{fontSize: '20px', fontWeight: 800, color: t.text1, marginBottom: '8px'}}>Documents Submitted!</p>
            <p style={{fontSize: '13px', color: t.text3, lineHeight: 1.6, marginBottom: '28px'}}>
              Our team will verify your documents within 2–3 working days.
            </p>
            <button onClick={goToDashboard}
              style={{width: '100%', padding: '16px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 6px 24px rgba(220,20,60,0.35)'}}>
              Go to Companion Dashboard
            </button>
          </div>
        )}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  // ── SIGNING CONFIRMATION ──
  if (signed) return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px'}}>
      <div style={{width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #059669, #047857)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: '0 8px 32px rgba(5,150,105,0.4)', animation: 'breathe 2s ease infinite'}}>
        <CheckIcon size={36} color="white" strokeWidth={2.5}/>
      </div>
      <h1 style={{fontSize: '22px', fontWeight: 900, color: t.text1, marginBottom: '8px', textAlign: 'center'}}>Saving agreement…</h1>
      <p style={{fontSize: '14px', color: t.text3, textAlign: 'center'}}>Please wait a moment</p>
      <style>{`@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}`}</style>
    </div>
  )

  // ── MAIN AGREEMENT ──
  return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '120px', transition: 'background 0.3s ease'}}>

      {/* Sticky header */}
      <div style={{background: 'linear-gradient(135deg, #0E0B18, #1A0A16)', padding: '52px 20px 20px', position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(255,255,255,0.08)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px'}}>
          <button onClick={() => router.back()}
            style={{width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
            <ArrowLeftIcon size={18} color="rgba(255,255,255,0.6)" strokeWidth={2}/>
          </button>
          <div style={{flex: 1}}>
            <h1 style={{fontSize: '18px', fontWeight: 800, color: 'white', letterSpacing: '-0.4px'}}>Companion Agreement</h1>
            <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '2px'}}>Confirm all {totalCount} sections to sign</p>
          </div>
          <div style={{background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', padding: '5px 12px', flexShrink: 0}}>
            <span style={{fontSize: '12px', fontWeight: 700, color: confirmedCount === totalCount ? '#22C55E' : 'rgba(255,255,255,0.5)'}}>
              {confirmedCount}/{totalCount}
            </span>
          </div>
        </div>
        <div style={{height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '9999px', overflow: 'hidden'}}>
          <div style={{height: '100%', width: `${(confirmedCount / totalCount) * 100}%`, background: confirmedCount === totalCount ? '#22C55E' : 'linear-gradient(90deg, #DC143C, #A50E2D)', borderRadius: '9999px', transition: 'width 0.4s ease'}}/>
        </div>
      </div>

      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px'}}>

        {/* Legal warning */}
        <div style={{background: 'rgba(220,20,60,0.06)', border: `1px solid ${brand.primaryBorder}`, borderRadius: '16px', padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start'}}>
          <div style={{width: '30px', height: '30px', borderRadius: '10px', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={brand.primary} strokeWidth="2" strokeLinecap="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div>
            <p style={{fontSize: '13px', fontWeight: 700, color: brand.primary, marginBottom: '3px'}}>Legally binding document</p>
            <p style={{fontSize: '12px', color: brand.primary, opacity: 0.75, lineHeight: 1.5}}>
              Enforceable under the Electronic Transaction Act 2063 and Individual Privacy Act 2075 of Nepal. Expand each section, read it, then confirm individually.
            </p>
          </div>
        </div>

        {/* Sections */}
        {SECTIONS.map((section, idx) => {
          const isExpanded = expanded === section.id
          const isConfirmed = confirmed.includes(section.id)
          const wasExpanded = everExpanded.includes(section.id)
          return (
            <div key={section.id} style={{...card, overflow: 'hidden', border: `1.5px solid ${isConfirmed ? 'rgba(5,150,105,0.35)' : isExpanded ? brand.primaryBorder : t.border}`, transition: 'border-color 0.2s ease'}}>
              <div onClick={() => handleExpand(section.id)}
                style={{padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', userSelect: 'none' as const}}>
                <div style={{width: '32px', height: '32px', borderRadius: '10px', background: isConfirmed ? 'rgba(5,150,105,0.12)' : isExpanded ? brand.primaryLight : t.inputBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s ease'}}>
                  {isConfirmed
                    ? <CheckIcon size={16} color="#059669" strokeWidth={2.5}/>
                    : <span style={{fontSize: '12px', fontWeight: 800, color: isExpanded ? brand.primary : t.text3}}>{idx + 1}</span>}
                </div>
                <div style={{flex: 1}}>
                  <p style={{fontSize: '13px', fontWeight: 700, color: isConfirmed ? '#059669' : t.text1, marginBottom: '2px'}}>{section.title}</p>
                  <p style={{fontSize: '11px', fontWeight: 600, color: isConfirmed ? '#059669' : wasExpanded ? brand.primary : t.text3}}>
                    {isConfirmed ? '✓ Confirmed' : wasExpanded ? 'Tap to confirm below' : 'Tap to read'}
                  </p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.text3} strokeWidth="2" strokeLinecap="round">
                  <path d={isExpanded ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'}/>
                </svg>
              </div>

              {isExpanded && (
                <div style={{borderTop: `1px solid ${t.border}`}}>
                  <div style={{padding: '16px', background: t.inputBg, maxHeight: '260px', overflowY: 'auto'}}>
                    <p style={{fontSize: '12px', color: t.text2, lineHeight: 1.9, whiteSpace: 'pre-line' as const}}>{section.content}</p>
                  </div>
                  <div style={{padding: '14px 16px', borderTop: `1px solid ${t.border}`}}>
                    <div onClick={() => toggleConfirm(section.id)}
                      style={{display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer'}}>
                      <div style={{width: '24px', height: '24px', borderRadius: '7px', border: `2px solid ${isConfirmed ? '#059669' : brand.primary}`, background: isConfirmed ? '#059669' : brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', flexShrink: 0, marginTop: '1px'}}>
                        {isConfirmed && <CheckIcon size={13} color="white" strokeWidth={2.5}/>}
                      </div>
                      <p style={{fontSize: '13px', color: t.text1, lineHeight: 1.5}}>
                        I have read and agree to <strong>Section {idx + 1}: {section.title}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!isExpanded && wasExpanded && !isConfirmed && (
                <div style={{borderTop: `1px solid ${t.border}`, padding: '10px 16px', background: t.inputBg}}>
                  <div onClick={() => toggleConfirm(section.id)}
                    style={{display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer'}}>
                    <div style={{width: '20px', height: '20px', borderRadius: '6px', border: `2px solid ${brand.primary}`, background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                      <div style={{width: '7px', height: '7px', borderRadius: '50%', background: brand.primary}}/>
                    </div>
                    <p style={{fontSize: '12px', color: brand.primary, fontWeight: 600}}>Tap to confirm this section</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {confirmedCount < totalCount && (
          <p style={{fontSize: '13px', color: t.text3, textAlign: 'center', padding: '8px'}}>
            {totalCount - confirmedCount} section{totalCount - confirmedCount !== 1 ? 's' : ''} remaining
          </p>
        )}

        {/* Digital signature */}
        {allConfirmed && (
          <div style={{...card, padding: '20px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px'}}>
              <div style={{width: '30px', height: '30px', borderRadius: '10px', background: 'rgba(5,150,105,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <CheckIcon size={16} color="#059669" strokeWidth={2.5}/>
              </div>
              <div>
                <p style={{fontSize: '14px', fontWeight: 800, color: t.text1}}>All sections confirmed</p>
                <p style={{fontSize: '11px', color: '#059669'}}>Sign digitally below</p>
              </div>
            </div>

            <p style={{fontSize: '13px', color: t.text3, lineHeight: 1.5, marginBottom: '18px'}}>
              By entering your full name and citizenship number and tapping Sign, you are legally signing this agreement under the Electronic Transaction Act 2063 of Nepal.
            </p>

            <p style={{fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px'}}>Full name (as on citizenship card)</p>
            <input value={fullName} onChange={e => setFullName(e.target.value)}
              placeholder="e.g. Ram Bahadur Thapa"
              style={{width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '13px 16px', fontSize: '15px', color: t.text1, outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' as const, marginBottom: '12px', transition: 'background 0.3s ease'}}/>

            <p style={{fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px'}}>Citizenship number (Nagarikta)</p>
            <input value={citizenshipNo} onChange={e => setCitizenshipNo(e.target.value)}
              placeholder="e.g. 12-34-56-78901"
              style={{width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '13px 16px', fontSize: '15px', color: t.text1, outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' as const, marginBottom: '18px', transition: 'background 0.3s ease'}}/>

            <div style={{background: t.inputBg, borderRadius: '12px', padding: '12px 16px', marginBottom: '18px', border: `1px solid ${t.border}`}}>
              {[
                { label: 'Signatory', value: fullName || '—' },
                { label: 'Citizenship No.', value: citizenshipNo || '—' },
                { label: 'Date', value: date },
                { label: 'Platform', value: 'Sahayatri · sahayatri.app' },
              ].map((item, i, arr) => (
                <div key={i} style={{display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none', gap: '12px'}}>
                  <p style={{fontSize: '12px', color: t.text3, flexShrink: 0}}>{item.label}</p>
                  <p style={{fontSize: '12px', fontWeight: 700, color: t.text1, textAlign: 'right'}}>{item.value}</p>
                </div>
              ))}
            </div>

            <button onClick={handleSign} disabled={!canSign || submitting}
              style={{width: '100%', padding: '16px', background: (!canSign || submitting) ? t.inputBg : 'linear-gradient(135deg, #059669, #047857)', border: 'none', borderRadius: '16px', color: (!canSign || submitting) ? t.text3 : 'white', fontSize: '15px', fontWeight: 800, cursor: (!canSign || submitting) ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: canSign && !submitting ? '0 6px 24px rgba(5,150,105,0.35)' : 'none', transition: 'all 0.2s ease'}}>
              {submitting
                ? <><div style={{width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite'}}/>Recording signature…</>
                : <><CheckIcon size={18} color={canSign ? 'white' : t.text3} strokeWidth={2.5}/>Sign Agreement Legally</>}
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: ${t.text3}; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}
