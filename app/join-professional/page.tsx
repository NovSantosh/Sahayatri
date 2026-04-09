'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function JoinProfessional() {
  const { data: session } = useSession()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: '',
    skills: [] as string[],
    experience: '',
    bio: '',
    rate: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const skills = [
    'Elder Care', 'Child Care', 'Yoga & Wellness', 'Cooking & Meals',
    'Nursing Care', 'Physiotherapy', 'Companionship', 'Language Tutoring',
    'Electrician', 'Plumber', 'Carpenter', 'House Cleaning',
    'Gardening', 'AC Repair', 'Painting', 'Security',
  ]

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const update = (key: string, value: string) => setFormData(prev => ({ ...prev, [key]: value }))

  if (submitted) {
    return (
      <div style={{minHeight: '100vh', background: '#06060F', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'}}>
        <div style={{background: 'white', borderRadius: '24px', padding: '32px 24px', width: '100%', maxWidth: '400px', textAlign: 'center'}}>
          <div style={{width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #059669, #047857)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'}}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 style={{fontSize: '24px', fontWeight: 800, color: '#111318', marginBottom: '8px'}}>Application Submitted!</h2>
          <p style={{fontSize: '14px', color: '#6B7280', marginBottom: '8px', lineHeight: 1.6}}>
            Thank you <strong>{formData.fullName || session?.user?.name}</strong>! We have received your application to join Sahayatri as a professional.
          </p>
          <p style={{fontSize: '13px', color: '#9CA3AF', marginBottom: '24px', lineHeight: 1.6}}>
            Our team will review your profile and contact you within 2-3 business days at <strong>{session?.user?.email}</strong>.
          </p>
          <div style={{background: '#F5F6F8', borderRadius: '16px', padding: '16px', marginBottom: '24px', textAlign: 'left'}}>
            <p style={{fontSize: '12px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px'}}>Your Application</p>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '6px'}}>
              <span style={{fontSize: '13px', color: '#9CA3AF'}}>Skills</span>
              <span style={{fontSize: '13px', fontWeight: 700, color: '#111318'}}>{formData.skills.join(', ')}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '6px'}}>
              <span style={{fontSize: '13px', color: '#9CA3AF'}}>City</span>
              <span style={{fontSize: '13px', fontWeight: 700, color: '#111318'}}>{formData.city}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <span style={{fontSize: '13px', color: '#9CA3AF'}}>Rate</span>
              <span style={{fontSize: '13px', fontWeight: 700, color: '#DC143C'}}>NPR {formData.rate}/hr</span>
            </div>
          </div>
          <button onClick={() => router.push('/home')}
            style={{width: '100%', padding: '14px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'sans-serif'}}>
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight: '100vh', background: '#06060F', fontFamily: 'sans-serif', paddingBottom: '40px'}}>

      {/* Header */}
      <div style={{background: 'rgba(10,10,26,0.95)', padding: '52px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, zIndex: 50}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <button onClick={() => step === 1 ? router.back() : setStep(step - 1)}
            style={{width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div>
            <h1 style={{fontSize: '20px', fontWeight: 800, color: 'white'}}>Join as Professional</h1>
            <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '2px'}}>Step {step} of 3</p>
          </div>
        </div>
        <div style={{display: 'flex', gap: '6px', marginTop: '14px'}}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{flex: 1, height: '3px', borderRadius: '2px', background: s <= step ? '#DC143C' : 'rgba(255,255,255,0.1)'}}/>
          ))}
        </div>
      </div>

      <div style={{padding: '24px 16px', maxWidth: '480px', margin: '0 auto'}}>

        {step === 1 && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <div style={{textAlign: 'center', padding: '20px 0'}}>
              <div style={{fontSize: '48px', marginBottom: '12px'}}>💼</div>
              <h2 style={{fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '8px'}}>Tell us about yourself</h2>
              <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6}}>Join thousands of professionals earning on Sahayatri</p>
            </div>

            {[
              { label: 'Full Name', key: 'fullName', placeholder: 'Your full name', type: 'text' },
              { label: 'Phone Number', key: 'phone', placeholder: '+977 98XXXXXXXX', type: 'tel' },
              { label: 'City', key: 'city', placeholder: 'e.g. Kathmandu, Pokhara, Lalitpur', type: 'text' },
              { label: 'Expected Rate (NPR/hr)', key: 'rate', placeholder: 'e.g. 350', type: 'number' },
            ].map((field) => (
              <div key={field.key}>
                <label style={{fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px'}}>{field.label}</label>
                <input type={field.type} value={(formData as any)[field.key]} onChange={(e) => update(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  style={{width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 16px', fontSize: '15px', color: 'white', outline: 'none', fontFamily: 'sans-serif', boxSizing: 'border-box'}}
                />
              </div>
            ))}

            <button onClick={() => {
              if (!formData.fullName || !formData.phone || !formData.city || !formData.rate) return
              setStep(2)
            }} style={{width: '100%', padding: '15px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'sans-serif', marginTop: '8px'}}>
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <div style={{textAlign: 'center', padding: '20px 0'}}>
              <div style={{fontSize: '48px', marginBottom: '12px'}}>⭐</div>
              <h2 style={{fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '8px'}}>Your Skills</h2>
              <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.4)'}}>Select all that apply</p>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px'}}>
              {skills.map(skill => (
                <button key={skill} onClick={() => toggleSkill(skill)}
                  style={{padding: '12px', borderRadius: '12px', border: `1.5px solid ${formData.skills.includes(skill) ? '#DC143C' : 'rgba(255,255,255,0.12)'}`, background: formData.skills.includes(skill) ? 'rgba(220,20,60,0.15)' : 'rgba(255,255,255,0.05)', color: formData.skills.includes(skill) ? '#DC143C' : 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'sans-serif', textAlign: 'left'}}>
                  {skill}
                </button>
              ))}
            </div>

            <button onClick={() => { if (formData.skills.length > 0) setStep(3) }}
              disabled={formData.skills.length === 0}
              style={{width: '100%', padding: '15px', background: formData.skills.length > 0 ? 'linear-gradient(135deg, #DC143C, #A50E2D)' : 'rgba(220,20,60,0.3)', color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 800, cursor: formData.skills.length > 0 ? 'pointer' : 'not-allowed', fontFamily: 'sans-serif'}}>
              Continue ({formData.skills.length} selected)
            </button>
          </div>
        )}

        {step === 3 && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <div style={{textAlign: 'center', padding: '20px 0'}}>
              <div style={{fontSize: '48px', marginBottom: '12px'}}>✍️</div>
              <h2 style={{fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '8px'}}>About You</h2>
              <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.4)'}}>Tell families why they should choose you</p>
            </div>

            <div>
              <label style={{fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px'}}>Years of Experience</label>
              <div style={{display: 'flex', gap: '8px'}}>
                {['Less than 1', '1-2 years', '3-5 years', '5+ years'].map(exp => (
                  <button key={exp} onClick={() => update('experience', exp)}
                    style={{flex: 1, padding: '10px 4px', borderRadius: '10px', border: `1.5px solid ${formData.experience === exp ? '#DC143C' : 'rgba(255,255,255,0.12)'}`, background: formData.experience === exp ? 'rgba(220,20,60,0.15)' : 'rgba(255,255,255,0.05)', color: formData.experience === exp ? '#DC143C' : 'rgba(255,255,255,0.6)', fontSize: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: 'sans-serif'}}>
                    {exp}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px'}}>Your Bio</label>
              <textarea value={formData.bio} onChange={(e) => update('bio', e.target.value)}
                placeholder="Tell families about your experience, personality and why you love this work..." rows={5}
                style={{width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 16px', fontSize: '14px', color: 'white', outline: 'none', fontFamily: 'sans-serif', resize: 'none', boxSizing: 'border-box', lineHeight: 1.6}}
              />
            </div>

            {/* Summary */}
            <div style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '16px'}}>
              <p style={{fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px'}}>Your Profile Summary</p>
              <p style={{fontSize: '15px', fontWeight: 800, color: 'white', marginBottom: '4px'}}>{formData.fullName}</p>
              <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px'}}>{formData.city} · NPR {formData.rate}/hr</p>
              <p style={{fontSize: '12px', color: '#DC143C', fontWeight: 600}}>{formData.skills.join(' · ')}</p>
            </div>

            <button onClick={() => setSubmitted(true)}
              disabled={!formData.experience || !formData.bio}
              style={{width: '100%', padding: '15px', background: formData.experience && formData.bio ? 'linear-gradient(135deg, #DC143C, #A50E2D)' : 'rgba(220,20,60,0.3)', color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 800, cursor: formData.experience && formData.bio ? 'pointer' : 'not-allowed', fontFamily: 'sans-serif'}}>
              Submit Application — Free
            </button>

            <p style={{textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.3)'}}>No fees to join · We contact you within 2-3 days</p>
          </div>
        )}
      </div>
    </div>
  )
}
