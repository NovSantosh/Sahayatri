'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTheme } from '../../context/ThemeContext'
import { brand } from '../../design-system'
import { CheckIcon, ArrowLeftIcon, CameraIcon } from '../../components/Icons'

const REQUIRED_DOCS = [
  { id: 'citizenship', label: 'Citizenship Card (Nagarikta)', sub: 'Front and back clear photo', required: true },
  { id: 'photo', label: 'Recent Passport Photo', sub: 'Clear face photo taken within 3 months', required: true },
  { id: 'police', label: 'Police Clearance Certificate', sub: 'Issued within last 6 months', required: true },
  { id: 'certificate', label: 'Skill Certificate', sub: 'Nursing, cooking, electrical etc · Optional', required: false },
  { id: 'reference', label: 'Reference Letter', sub: 'From employer or community leader · Optional', required: false },
]

export default function UploadDocs() {
  const { t } = useTheme()
  const router = useRouter()
  const { data: session } = useSession()
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const requiredDone = REQUIRED_DOCS
    .filter(d => d.required)
    .every(d => uploadedDocs.includes(d.id))

  const toggleDoc = (id: string) => {
    setUploadedDocs(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    )
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/companion/upload-docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session?.user?.email,
          docs: uploadedDocs
        })
      })
      if (res.ok) setSubmitted(true)
    } catch (e) {}
    setSubmitting(false)
  }

  const card = {
    background: t.cardBg,
    borderRadius: '20px' as const,
    border: `1px solid ${t.border}`,
    boxShadow: t.shadow,
  }

  if (submitted) return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px'}}>
      <div style={{width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #059669, #047857)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 8px 32px rgba(5,150,105,0.4)', animation: 'breathe 2s ease infinite'}}>
        <CheckIcon size={38} color="white" strokeWidth={2.5}/>
      </div>
      <h1 style={{fontSize: '24px', fontWeight: 900, color: t.text1, letterSpacing: '-0.8px', marginBottom: '10px', textAlign: 'center'}}>Documents Submitted!</h1>
      <p style={{fontSize: '14px', color: t.text3, lineHeight: 1.7, textAlign: 'center', maxWidth: '280px', marginBottom: '32px'}}>
        Our team will verify your documents within 2–3 working days. You will receive a notification when approved.
      </p>
      <div style={{...card, padding: '20px', width: '100%', maxWidth: '380px', marginBottom: '20px'}}>
        <p style={{fontSize: '13px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '14px'}}>What happens next</p>
        {[
          { step: '1', title: 'Document review', desc: 'Our team verifies each document carefully.', color: brand.primary },
          { step: '2', title: 'Background check', desc: 'Final verification of your identity.', color: '#7C3AED' },
          { step: '3', title: 'Account activated', desc: 'You can start accepting job requests.', color: '#059669' },
        ].map((item, i) => (
          <div key={i} style={{display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: i < 2 ? '14px' : '0', position: 'relative'}}>
            {i < 2 && <div style={{position: 'absolute', left: '13px', top: '28px', width: '2px', height: '18px', background: t.border}}/>}
            <div style={{width: '28px', height: '28px', borderRadius: '50%', background: `${item.color}12`, border: `1.5px solid ${item.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <span style={{fontSize: '11px', fontWeight: 800, color: item.color}}>{item.step}</span>
            </div>
            <div style={{paddingTop: '3px'}}>
              <p style={{fontSize: '13px', fontWeight: 700, color: t.text1, marginBottom: '2px'}}>{item.title}</p>
              <p style={{fontSize: '12px', color: t.text3}}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => window.location.href = '/companion/dashboard'}
        style={{width: '100%', maxWidth: '380px', padding: '16px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 6px 24px rgba(220,20,60,0.35)'}}>
        Back to Dashboard
      </button>
      <style>{`@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}`}</style>
    </div>
  )

  return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '100px', transition: 'background 0.3s ease'}}>

      <div style={{background: t.headerBg, backdropFilter: 'blur(20px)', padding: '52px 20px 16px', borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 50}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <button onClick={() => router.back()}
            style={{width: '38px', height: '38px', borderRadius: '12px', background: t.inputBg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
            <ArrowLeftIcon size={18} color={t.text2} strokeWidth={2}/>
          </button>
          <div>
            <h1 style={{fontSize: '20px', fontWeight: 800, color: t.text1, letterSpacing: '-0.4px'}}>Upload Documents</h1>
            <p style={{fontSize: '12px', color: t.text3, marginTop: '2px'}}>Required to activate your account</p>
          </div>
        </div>
      </div>

      <div style={{padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '14px'}}>

        <div style={{background: 'linear-gradient(135deg, #0E0B18, #1A0A16)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(255,255,255,0.06)'}}>
          <p style={{fontSize: '14px', fontWeight: 700, color: 'white', marginBottom: '6px'}}>Why we verify everyone</p>
          <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6}}>
            Our families trust us with their elderly parents. Every companion must be verified before entering any home. This protects you and the families you serve.
          </p>
        </div>

        <div style={{...card, padding: '20px'}}>
          <p style={{fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '6px'}}>Upload your documents</p>
          <p style={{fontSize: '13px', color: t.text3, marginBottom: '18px', lineHeight: 1.5}}>
            Tap each document to mark it as uploaded. In the real app this will open your camera or files.
          </p>

          <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            {REQUIRED_DOCS.map((doc) => {
              const isUploaded = uploadedDocs.includes(doc.id)
              return (
                <div key={doc.id} onClick={() => toggleDoc(doc.id)}
                  style={{display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', borderRadius: '16px', border: `1.5px solid ${isUploaded ? 'rgba(5,150,105,0.35)' : t.border}`, background: isUploaded ? 'rgba(5,150,105,0.06)' : t.inputBg, cursor: 'pointer', transition: 'all 0.2s ease'}}>
                  <div style={{width: '46px', height: '46px', borderRadius: '14px', background: isUploaded ? 'rgba(5,150,105,0.1)' : doc.required ? brand.primaryLight : t.cardBg, border: `1px solid ${isUploaded ? 'rgba(5,150,105,0.2)' : doc.required ? brand.primaryBorder : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                    {isUploaded
                      ? <CheckIcon size={22} color="#059669" strokeWidth={2.5}/>
                      : <CameraIcon size={22} color={doc.required ? brand.primary : t.text3} strokeWidth={1.8}/>}
                  </div>
                  <div style={{flex: 1}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px'}}>
                      <p style={{fontSize: '14px', fontWeight: 700, color: isUploaded ? '#059669' : t.text1}}>{doc.label}</p>
                      {doc.required && (
                        <div style={{padding: '1px 7px', background: isUploaded ? 'rgba(5,150,105,0.1)' : brand.primaryLight, borderRadius: '9999px'}}>
                          <span style={{fontSize: '9px', fontWeight: 700, color: isUploaded ? '#059669' : brand.primary}}>Required</span>
                        </div>
                      )}
                    </div>
                    <p style={{fontSize: '12px', color: t.text3}}>{doc.sub}</p>
                  </div>
                  <div style={{padding: '8px 16px', background: isUploaded ? 'rgba(5,150,105,0.1)' : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: isUploaded ? '1px solid rgba(5,150,105,0.2)' : 'none', borderRadius: '9999px', flexShrink: 0, boxShadow: isUploaded ? 'none' : '0 2px 8px rgba(220,20,60,0.3)'}}>
                    <span style={{fontSize: '12px', fontWeight: 700, color: isUploaded ? '#059669' : 'white'}}>
                      {isUploaded ? '✓ Done' : 'Upload'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Progress */}
        <div style={{...card, padding: '16px', display: 'flex', alignItems: 'center', gap: '14px'}}>
          <div style={{flex: 1, height: '6px', background: t.inputBg, borderRadius: '9999px', overflow: 'hidden'}}>
            <div style={{height: '100%', width: `${(uploadedDocs.filter(d => REQUIRED_DOCS.find(r => r.id === d && r.required)).length / REQUIRED_DOCS.filter(d => d.required).length) * 100}%`, background: requiredDone ? '#059669' : 'linear-gradient(90deg, #DC143C, #A50E2D)', borderRadius: '9999px', transition: 'width 0.3s ease'}}/>
          </div>
          <p style={{fontSize: '13px', fontWeight: 700, color: requiredDone ? '#059669' : t.text3, flexShrink: 0}}>
            {uploadedDocs.filter(d => REQUIRED_DOCS.find(r => r.id === d && r.required)).length}/{REQUIRED_DOCS.filter(d => d.required).length} required
          </p>
        </div>

        <button onClick={handleSubmit} disabled={!requiredDone || submitting}
          style={{width: '100%', padding: '18px', background: (!requiredDone || submitting) ? t.inputBg : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: (!requiredDone || submitting) ? t.text3 : 'white', fontSize: '16px', fontWeight: 800, cursor: (!requiredDone || submitting) ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: requiredDone && !submitting ? '0 6px 24px rgba(220,20,60,0.35)' : 'none', transition: 'all 0.2s ease'}}>
          {submitting
            ? <><div style={{width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite'}}/>Submitting…</>
            : <><CheckIcon size={20} color={requiredDone ? 'white' : t.text3} strokeWidth={2.5}/>Submit All Documents</>}
        </button>

        {!requiredDone && (
          <p style={{fontSize: '13px', color: t.text3, textAlign: 'center'}}>
            Upload all 3 required documents to continue
          </p>
        )}
      </div>

      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        ::-webkit-scrollbar{display:none}
      `}</style>
    </div>
  )
}
