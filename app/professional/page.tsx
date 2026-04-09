'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import BottomNav from '../components/BottomNav'

function ProfessionalContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const name = searchParams.get('name') || 'Ananya Singh'
  const role = searchParams.get('role') || 'Elder Care · Yoga'
  const rate = searchParams.get('rate') || '350'

  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div style={{minHeight: '100vh', background: '#F5F6F8', fontFamily: 'sans-serif', paddingBottom: '100px'}}>

      <div style={{background: 'linear-gradient(135deg, #0A1628, #1C0008)', padding: '52px 20px 28px', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(220,20,60,0.15)', pointerEvents: 'none'}}/>
        <button onClick={() => router.back()} style={{width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: '20px'}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
          <div style={{width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '26px', fontWeight: 800, border: '3px solid rgba(255,255,255,0.2)'}}>
            {initials}
          </div>
          <div>
            <h1 style={{fontSize: '22px', fontWeight: 800, color: 'white'}}>{name}</h1>
            <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '3px'}}>{role}</p>
            <div style={{display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '8px', background: 'rgba(34,197,94,0.2)', borderRadius: '20px', padding: '3px 10px'}}>
              <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E'}}/>
              <span style={{fontSize: '10px', fontWeight: 700, color: '#22C55E'}}>Verified · Available</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px'}}>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px'}}>
          {[
            {val: '4.9', label: 'Rating'},
            {val: '127', label: 'Bookings'},
            {val: `₹${rate}`, label: 'Per Hour'},
          ].map((s, i) => (
            <div key={i} style={{background: 'white', borderRadius: '14px', border: '1px solid #E9EAEC', padding: '14px', textAlign: 'center'}}>
              <p style={{fontSize: '20px', fontWeight: 800, color: '#111318'}}>{s.val}</p>
              <p style={{fontSize: '10px', fontWeight: 700, color: '#9CA3AF', marginTop: '2px', textTransform: 'uppercase'}}>{s.label}</p>
            </div>
          ))}
        </div>

        <div style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', padding: '16px'}}>
          <p style={{fontSize: '15px', fontWeight: 800, color: '#111318', marginBottom: '10px'}}>About</p>
          <p style={{fontSize: '14px', color: '#6B7280', lineHeight: 1.7}}>Experienced and compassionate care professional with 5+ years helping Nepali families. Fluent in Nepali, Hindi and English. Background in nursing with specialization in elder care and wellness.</p>
        </div>

        <div style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', padding: '16px'}}>
          <p style={{fontSize: '15px', fontWeight: 800, color: '#111318', marginBottom: '12px'}}>Services</p>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
            {['Elder Care', 'Yoga', 'Companionship', 'Medication Reminders', 'Mobility Assistance', 'Meal Preparation'].map(s => (
              <span key={s} style={{padding: '5px 12px', borderRadius: '20px', background: '#F5F6F8', fontSize: '12px', fontWeight: 600, color: '#374151'}}>{s}</span>
            ))}
          </div>
        </div>

        <div style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', padding: '16px'}}>
          <p style={{fontSize: '15px', fontWeight: 800, color: '#111318', marginBottom: '12px'}}>Reviews</p>
          {[
            {name: 'Sita Thapa', text: 'Wonderful with my mother. Patient, kind and very professional.', rating: 5},
            {name: 'Ramesh K.', text: 'Highly recommend. Our family trusts her completely.', rating: 5},
          ].map((review, i) => (
            <div key={i} style={{marginBottom: i === 0 ? '14px' : '0', paddingBottom: i === 0 ? '14px' : '0', borderBottom: i === 0 ? '1px solid #F0F1F3' : 'none'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '4px'}}>
                <p style={{fontSize: '13px', fontWeight: 700, color: '#111318'}}>{review.name}</p>
                <span style={{fontSize: '12px', color: '#F59E0B'}}>{'★'.repeat(review.rating)}</span>
              </div>
              <p style={{fontSize: '13px', color: '#6B7280', lineHeight: 1.5}}>{review.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Book button */}
      <div style={{position: 'fixed', bottom: '80px', left: 0, right: 0, padding: '12px 16px', background: 'white', borderTop: '1px solid #E9EAEC'}}>
        <button
          onClick={() => router.push(`/book?name=${encodeURIComponent(name)}&role=${encodeURIComponent(role)}&rate=${rate}`)}
          style={{width: '100%', padding: '15px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', border: 'none', borderRadius: '14px', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: 'sans-serif', boxShadow: '0 4px 20px rgba(220,20,60,0.35)'}}>
          Book Now · NPR {rate}/hr
        </button>
      </div>

      <BottomNav />
    </div>
  )
}

export default function Professional() {
  return (
    <Suspense fallback={<div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading...</div>}>
      <ProfessionalContent />
    </Suspense>
  )
}
