'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTheme } from '../../context/ThemeContext'
import { brand } from '../../design-system'
import { CheckIcon, ArrowLeftIcon, CameraIcon } from '../../components/Icons'

const REQUIRED_DOCS = [
  { id: 'citizenship', label: 'Citizenship Card', sub: 'Front and back clear photo · Required', required: true, icon: '🪪' },
  { id: 'photo', label: 'Passport Photo', sub: 'Clear face photo within 3 months · Required', required: true, icon: '📸' },
  { id: 'police', label: 'Police Clearance', sub: 'Issued within last 6 months · Required', required: true, icon: '🚔' },
  { id: 'certificate', label: 'Skill Certificate', sub: 'Nursing, cooking, electrical etc · Optional', required: false, icon: '📜' },
  { id: 'reference', label: 'Reference Letter', sub: 'From employer or community leader · Optional', required: false, icon: '✉️' },
]

export default function UploadDocs() {
  const { t } = useTheme()
  const router = useRouter()
  const { data: session } = useSession()
  const [uploadedDocs, setUploadedDocs] = useState<{[key: string]: string}>({})
  const [uploading, setUploading] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const fileRefs = useRef<{[key: string]: HTMLInputElement | null}>({})

  const requiredDone = REQUIRED_DOCS
    .filter(d => d.required)
    .every(d => uploadedDocs[d.id])

  const uploadToCloudinary = async (file: File, docId: string) => {
    setUploading(docId)
    setError('')
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'sahayatri_docs')
      formData.append('folder', `sahayatri/docs/${session?.user?.email}`)

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dsg0x2c60'}/image/upload`,
        { method: 'POST', body: formData }
      )
      const data = await res.json()

      if (data.secure_url) {
        setUploadedDocs(prev => ({ ...prev, [docId]: data.secure_url }))
      } else {
        setError('Upload failed. Try again.')
      }
    } catch (e) {
      setError('Upload failed. Check your connection.')
    }
    setUploading(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docId: string) => {
    const file = e.target.files?.[0]
    if (file) uploadToCloudinary(file, docId)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      await fetch('/api/companion/upload-docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session?.user?.email,
          docs: uploadedDocs,
          docsUploaded: true,
        })
      })
      setSubmitted(true)
    } catch (e) {
      setError('Failed to submit. Try again.')
    }
    setSubmitting(false)
  }

  const card = {
    background: t.cardBg,
    borderRadius: '20px',
    border: `1px solid ${t.border}`,
    boxShadow: t.shadow,
  }

  if (submitted) return (
    <div style={{ minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ width: '88px', height: '88px', borderRadius: '50%', background: 'linear-gradient(135deg, #10B981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 8px 32px rgba(16,185,129,0.4)' }}>
        <CheckIcon size={44} color="white" strokeWidth={2.5}/>
      </div>
      <h1 style={{ fontSize: '26px', fontWeight: 900, color: t.text1, letterSpacing: '-0.8px', marginBottom: '12px' }}>Documents Submitted!</h1>
      <p style={{ fontSize: '15px', color: t.text2, lineHeight: 1.7, marginBottom: '8px', maxWidth: '280px' }}>
        Our team will review your documents within 24-48 hours.
      </p>
      <p style={{ fontSize: '13px', color: t.text3, marginBottom: '40px' }}>
        You will be notified once verified.
      </p>
      <button onClick={() => router.push('/companion/dashboard')}
        style={{ padding: '16px 32px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 6px 24px rgba(220,20,60,0.35)' }}>
        Go to Dashboard
      </button>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '40px', transition: 'background 0.3s ease' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0E0B18, #1A0A16)', padding: '52px 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <button onClick={() => router.back()}
          style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: '20px' }}>
          <ArrowLeftIcon size={18} color="rgba(255,255,255,0.6)" strokeWidth={2}/>
        </button>
        <h1 style={{ fontSize: '22px', fontWeight: 900, color: 'white', letterSpacing: '-0.5px', marginBottom: '6px' }}>Upload Documents</h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)' }}>Required for verification · Stored securely</p>

        {/* Progress */}
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ flex: 1, height: '4px', borderRadius: '9999px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: '9999px', background: 'linear-gradient(135deg, #10B981, #059669)', width: `${(Object.keys(uploadedDocs).length / REQUIRED_DOCS.length) * 100}%`, transition: 'width 0.3s ease' }}/>
          </div>
          <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', flexShrink: 0 }}>
            {Object.keys(uploadedDocs).length}/{REQUIRED_DOCS.length}
          </p>
        </div>
      </div>

      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {error && (
          <div style={{ background: 'rgba(220,20,60,0.08)', border: '1px solid rgba(220,20,60,0.2)', borderRadius: '14px', padding: '13px 16px', fontSize: '14px', color: brand.primary, fontWeight: 600 }}>
            {error}
          </div>
        )}

        {/* Security note */}
        <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '14px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px' }}>🔒</span>
          <p style={{ fontSize: '13px', color: '#10B981', lineHeight: 1.5 }}>
            Documents are encrypted and stored securely. Only Sahayatri admin can view them.
          </p>
        </div>

        {/* Document cards */}
        {REQUIRED_DOCS.map((doc) => {
          const isUploaded = !!uploadedDocs[doc.id]
          const isUploading = uploading === doc.id

          return (
            <div key={doc.id} style={{ ...card, padding: '0', overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: isUploaded ? 'rgba(16,185,129,0.1)' : t.inputBg, border: `1px solid ${isUploaded ? 'rgba(16,185,129,0.2)' : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '22px', transition: 'all 0.3s ease' }}>
                  {isUploaded ? '✅' : doc.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: t.text1 }}>{doc.label}</p>
                    {doc.required && (
                      <div style={{ padding: '2px 7px', background: 'rgba(220,20,60,0.08)', border: '1px solid rgba(220,20,60,0.15)', borderRadius: '9999px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: brand.primary }}>Required</span>
                      </div>
                    )}
                  </div>
                  <p style={{ fontSize: '12px', color: t.text3 }}>{doc.sub}</p>
                </div>
              </div>

              {/* Preview if uploaded */}
              {isUploaded && uploadedDocs[doc.id] && (
                <div style={{ padding: '0 20px 12px' }}>
                  <img src={uploadedDocs[doc.id]} alt={doc.label}
                    style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '12px', border: `1px solid ${t.border}` }}/>
                </div>
              )}

              {/* Upload button */}
              <div style={{ borderTop: `1px solid ${t.border}`, padding: '12px 20px' }}>
                <input
                  ref={el => { fileRefs.current[doc.id] = el }}
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={e => handleFileChange(e, doc.id)}
                  style={{ display: 'none' }}/>
                <button
                  onClick={() => fileRefs.current[doc.id]?.click()}
                  disabled={isUploading}
                  style={{ width: '100%', padding: '11px', background: isUploaded ? 'rgba(16,185,129,0.08)' : t.inputBg, border: `1px solid ${isUploaded ? 'rgba(16,185,129,0.2)' : t.border}`, borderRadius: '12px', color: isUploaded ? '#10B981' : t.text2, fontSize: '13px', fontWeight: 700, cursor: isUploading ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s ease' }}>
                  {isUploading ? (
                    <><div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.2)', borderTop: `2px solid ${brand.primary}`, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/> Uploading…</>
                  ) : isUploaded ? (
                    <><CheckIcon size={15} color="#10B981" strokeWidth={2.5}/> Uploaded · Tap to replace</>
                  ) : (
                    <><CameraIcon size={15} color={t.text2} strokeWidth={2}/> Upload {doc.label}</>
                  )}
                </button>
              </div>
            </div>
          )
        })}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!requiredDone || submitting}
          style={{ width: '100%', padding: '18px', background: (!requiredDone || submitting) ? t.inputBg : 'linear-gradient(135deg, #10B981, #059669)', border: 'none', borderRadius: '16px', color: (!requiredDone || submitting) ? t.text3 : 'white', fontSize: '16px', fontWeight: 800, cursor: (!requiredDone || submitting) ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: (requiredDone && !submitting) ? '0 6px 24px rgba(16,185,129,0.35)' : 'none', transition: 'all 0.2s ease', marginTop: '8px' }}>
          {submitting
            ? <><div style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/> Submitting…</>
            : <><CheckIcon size={20} color={requiredDone ? 'white' : t.text3} strokeWidth={2.5}/> Submit Documents for Review</>}
        </button>

        {!requiredDone && (
          <p style={{ fontSize: '13px', color: t.text3, textAlign: 'center' }}>
            Upload all 3 required documents to continue
          </p>
        )}
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
