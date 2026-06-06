'use client'
import { useState, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'
import { ArrowLeftIcon, CheckIcon, CalendarIcon, ClockIcon } from '../components/Icons'
import PaymentSheet from '../components/PaymentSheet'

function BookingForm() {
  const { data: session } = useSession()
  const router = useRouter()
  const { t } = useTheme()
  const searchParams = useSearchParams()

  const companionName = searchParams.get('name') || 'Companion'
  const companionRole = searchParams.get('role') || 'Care'
  const rate = parseInt(searchParams.get('rate') || '350')

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [duration, setDuration] = useState(2)
  const [service, setService] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [step, setStep] = useState(1)
  const [showPayment, setShowPayment] = useState(false)

  const total = rate * duration
  const bookingId = `BOOK-${Date.now()}`

  const card = {
    background: t.cardBg,
    borderRadius: '20px',
    border: `1px solid ${t.border}`,
    boxShadow: t.shadow,
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
  }

  return (
    <div style={{ minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '40px', transition: 'background 0.3s ease' }}>

      <div style={{ background: t.headerBg, backdropFilter: 'blur(20px)', padding: '52px 20px 16px', borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => step > 1 ? setStep(step - 1) : router.back()}
            style={{ width: '40px', height: '40px', borderRadius: '12px', background: t.inputBg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeftIcon size={18} color={t.text2} strokeWidth={2}/>
          </button>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: t.text1 }}>Book {companionName}</h1>
            <p style={{ fontSize: '12px', color: t.text3 }}>{companionRole} · NPR {rate}/hr</p>
          </div>
          {/* Progress */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {[1,2,3].map(s => (
              <div key={s} style={{ width: '24px', height: '3px', borderRadius: '9999px', background: step >= s ? brand.primary : t.border, transition: 'background 0.2s ease' }}/>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* Step 1 — When */}
        {step === 1 && (
          <>
            <div style={{ ...card, padding: '20px' }}>
              <p style={{ fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '16px' }}>When do you need care?</p>

              <p style={{ fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px' }}>Date</p>
              <input type="date" value={date} onChange={e => setDate(e.target.value)}
                style={{ ...inputStyle, marginBottom: '14px' }}/>

              <p style={{ fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px' }}>Time</p>
              <input type="time" value={time} onChange={e => setTime(e.target.value)}
                style={{ ...inputStyle, marginBottom: '14px' }}/>

              <p style={{ fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '10px' }}>Duration</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[1, 2, 3, 4, 6, 8].map(h => (
                  <button key={h} onClick={() => setDuration(h)}
                    style={{ padding: '9px 16px', borderRadius: '10px', border: `1.5px solid ${duration === h ? brand.primary : t.border}`, background: duration === h ? brand.primaryLight : 'transparent', color: duration === h ? brand.primary : t.text2, fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease' }}>
                    {h}hr
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => date && time && setStep(2)} disabled={!date || !time}
              style={{ width: '100%', padding: '16px', background: (!date || !time) ? t.inputBg : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: (!date || !time) ? t.text3 : 'white', fontSize: '15px', fontWeight: 800, cursor: (!date || !time) ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease', boxShadow: date && time ? '0 6px 24px rgba(220,20,60,0.35)' : 'none' }}>
              Continue
            </button>
          </>
        )}

        {/* Step 2 — Details */}
        {step === 2 && (
          <>
            <div style={{ ...card, padding: '20px' }}>
              <p style={{ fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '16px' }}>Service details</p>

              <p style={{ fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px' }}>Service type</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {['Elder Care', 'Companionship', 'Medical Escort', 'Home Help'].map(s => (
                  <button key={s} onClick={() => setService(s)}
                    style={{ padding: '8px 14px', borderRadius: '9999px', border: `1.5px solid ${service === s ? brand.primary : t.border}`, background: service === s ? brand.primaryLight : 'transparent', color: service === s ? brand.primary : t.text3, fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease' }}>
                    {s}
                  </button>
                ))}
              </div>

              <p style={{ fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px' }}>Address in Nepal</p>
              <input value={address} onChange={e => setAddress(e.target.value)} placeholder="e.g. Baluwatar, Kathmandu"
                style={{ ...inputStyle, marginBottom: '14px' }}/>

              <p style={{ fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px' }}>Special notes</p>
              <textarea value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="Medical conditions, preferences, anything the companion should know…"
                rows={3}
                style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}/>
            </div>

            <button onClick={() => service && address && setStep(3)} disabled={!service || !address}
              style={{ width: '100%', padding: '16px', background: (!service || !address) ? t.inputBg : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: (!service || !address) ? t.text3 : 'white', fontSize: '15px', fontWeight: 800, cursor: (!service || !address) ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease', boxShadow: service && address ? '0 6px 24px rgba(220,20,60,0.35)' : 'none' }}>
              Review Booking
            </button>
          </>
        )}

        {/* Step 3 — Review & Pay */}
        {step === 3 && (
          <>
            <div style={{ ...card, padding: '20px' }}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '14px' }}>Booking Summary</p>
              {[
                { label: 'Companion', value: companionName },
                { label: 'Service', value: service },
                { label: 'Date', value: date },
                { label: 'Time', value: time },
                { label: 'Duration', value: `${duration} hour${duration > 1 ? 's' : ''}` },
                { label: 'Address', value: address },
              ].map((item, i, arr) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none', gap: '12px' }}>
                  <p style={{ fontSize: '13px', color: t.text3, flexShrink: 0 }}>{item.label}</p>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: t.text1, textAlign: 'right' }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div style={{ background: 'linear-gradient(135deg, #0E0B18, #1A0A16)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>NPR {rate} × {duration}hr</p>
                <p style={{ fontSize: '14px', color: 'white', fontWeight: 600 }}>NPR {total.toLocaleString()}</p>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: '16px', fontWeight: 800, color: 'white' }}>Total</p>
                <p style={{ fontSize: '24px', fontWeight: 900, color: brand.primary, letterSpacing: '-1px' }}>NPR {total.toLocaleString()}</p>
              </div>
            </div>

            <button onClick={() => setShowPayment(true)}
              style={{ width: '100%', padding: '18px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 6px 24px rgba(220,20,60,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              Pay NPR {total.toLocaleString()} to Confirm
            </button>
          </>
        )}
      </div>

      {showPayment && (
        <PaymentSheet
          amount={total}
          serviceName={`${service} with ${companionName}`}
          bookingId={bookingId}
          onClose={() => setShowPayment(false)}
        />
      )}

      <style>{`input::placeholder,textarea::placeholder{color:${t.text3}}`}</style>
    </div>
  )
}

export default function Book() {
  return <Suspense><BookingForm/></Suspense>
}
