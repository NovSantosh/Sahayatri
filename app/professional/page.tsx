'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'
import { ArrowLeftIcon, StarIcon, CheckIcon, LocationIcon, CalendarIcon } from '../components/Icons'

function ProfessionalContent() {
  const router = useRouter()
  const { t } = useTheme()
  const searchParams = useSearchParams()
  const name = searchParams.get('name') || 'Sita Sharma'
  const role = searchParams.get('role') || 'Elder Care · Companionship'
  const rate = searchParams.get('rate') || '350'
  const rating = searchParams.get('rating') || '4.9'
  const jobs = searchParams.get('jobs') || '312'

  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  const card = {
    background: t.cardBg,
    borderRadius: '20px',
    border: `1px solid ${t.border}`,
    boxShadow: t.shadow,
  }

  return (
    <div style={{ minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '40px', transition: 'background 0.3s ease' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0E0B18, #1A0A16)', padding: '52px 20px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(220,20,60,0.12)', pointerEvents: 'none' }}/>
        <button onClick={() => router.back()}
          style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: '20px' }}>
          <ArrowLeftIcon size={18} color="rgba(255,255,255,0.7)" strokeWidth={2}/>
        </button>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '24px', boxShadow: '0 4px 16px rgba(220,20,60,0.4)', flexShrink: 0 }}>
            {initials}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 900, color: 'white', letterSpacing: '-0.5px' }}>{name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', background: 'rgba(5,150,105,0.15)', border: '1px solid rgba(5,150,105,0.25)', borderRadius: '9999px', padding: '2px 8px' }}>
                <CheckIcon size={10} color="#10B981" strokeWidth={2.5}/>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#10B981' }}>Verified</span>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginBottom: '10px' }}>{role}</p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <StarIcon size={14} color={brand.warning} filled strokeWidth={0}/>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'white' }}>{rating}</span>
              </div>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{jobs} visits</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: brand.primary }}>NPR {rate}/hr</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* About */}
        <div style={{ ...card, padding: '20px' }}>
          <p style={{ fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '12px' }}>About</p>
          <p style={{ fontSize: '14px', color: t.text2, lineHeight: 1.7 }}>
            Experienced and compassionate care companion with a deep commitment to serving elderly individuals with dignity. Former nursing aide with hospital experience.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          {[
            { val: jobs, label: 'Visits done', color: brand.primary },
            { val: rating, label: 'Rating', color: brand.warning },
            { val: '98%', label: 'On time', color: '#10B981' },
          ].map((s, i) => (
            <div key={i} style={{ ...card, padding: '16px', textAlign: 'center' }}>
              <p style={{ fontSize: '22px', fontWeight: 900, color: s.color, letterSpacing: '-1px', marginBottom: '4px' }}>{s.val}</p>
              <p style={{ fontSize: '11px', color: t.text3, fontWeight: 600 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Services */}
        <div style={{ ...card, padding: '20px' }}>
          <p style={{ fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '14px' }}>Services offered</p>
          {['Elder Care', 'Companionship', 'Medical Escort', 'Meal Service', 'Grocery Errands'].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: i < 4 ? '10px' : '0' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '7px', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CheckIcon size={12} color={brand.primary} strokeWidth={2.5}/>
              </div>
              <p style={{ fontSize: '14px', color: t.text2 }}>{s}</p>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div style={{ ...card, padding: '20px' }}>
          <p style={{ fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '16px' }}>Recent reviews</p>
          {[
            { name: 'Rajesh K.', from: 'Vancouver', text: 'Incredible care for my mother. She loves having her around.', rating: 5 },
            { name: 'Priya S.', from: 'London', text: 'Always on time, very professional and genuinely caring.', rating: 5 },
          ].map((r, i) => (
            <div key={i} style={{ marginBottom: i === 0 ? '16px' : '0', paddingBottom: i === 0 ? '16px' : '0', borderBottom: i === 0 ? `1px solid ${t.border}` : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: t.text1 }}>{r.name}</p>
                  <p style={{ fontSize: '11px', color: t.text3 }}>{r.from}</p>
                </div>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {Array.from({length: r.rating}).map((_, j) => (
                    <StarIcon key={j} size={12} color={brand.warning} filled strokeWidth={0}/>
                  ))}
                </div>
              </div>
              <p style={{ fontSize: '13px', color: t.text2, lineHeight: 1.6, fontStyle: 'italic' }}>"{r.text}"</p>
            </div>
          ))}
        </div>

        {/* Book button */}
        <button
          onClick={() => router.push(`/book?name=${encodeURIComponent(name)}&role=${encodeURIComponent(role)}&rate=${rate}`)}
          style={{ width: '100%', padding: '18px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 6px 24px rgba(220,20,60,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <CalendarIcon size={20} color="white" strokeWidth={2}/>
          Book {name.split(' ')[0]}
        </button>
      </div>
    </div>
  )
}

export default function Professional() {
  return <Suspense><ProfessionalContent/></Suspense>
}
