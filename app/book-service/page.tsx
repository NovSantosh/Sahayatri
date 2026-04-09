'use client'
import { useState, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

function BookServiceForm() {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()

  const serviceName = searchParams.get('name') || 'Service'
  const rate = parseInt(searchParams.get('rate') || '500')
  const icon = searchParams.get('icon') || '🔧'

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [step, setStep] = useState(1)
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const times = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']
  const minDate = new Date().toISOString().split('T')[0]

  const paymentMethods = [
    { id: 'esewa', label: 'eSewa', color: '#60BB46', description: 'Most popular in Nepal' },
    { id: 'khalti', label: 'Khalti', color: '#5C2D91', description: 'Fast & secure' },
    { id: 'bank', label: 'Bank Transfer', color: '#2563EB', description: 'Any Nepali bank' },
  ]

  const handleBook = async () => {
    if (!paymentMethod) { setError('Please choose a payment method'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientEmail: session?.user?.email,
          companionName: serviceName,
          companionRole: 'Home Service',
          service: serviceName,
          date,
          time,
          duration: 1,
          rate,
          notes: `Address: ${address}${notes ? '\n' + notes : ''}`,
          paymentMethod,
        }),
      })
      const data = await res.json()
      if (res.ok) { setBooking(data.booking); setStep(3) }
      else { setError(data.error || 'Failed to book') }
    } catch (e) { setError('Something went wrong') }
    setLoading(false)
  }

  if (step === 3 && booking) {
    return (
      <div style={{minHeight: '100vh', background: '#F5F6F8', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'}}>
        <div style={{background: 'white', borderRadius: '24px', border: '1px solid #E9EAEC', padding: '32px 24px', width: '100%', maxWidth: '400px', textAlign: 'center'}}>
          <div style={{width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #059669, #047857)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'}}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 style={{fontSize: '24px', fontWeight: 800, color: '#111318', marginBottom: '8px'}}>Booking Confirmed!</h2>
          <p style={{fontSize: '14px', color: '#6B7280', marginBottom: '24px', lineHeight: 1.6}}>Your {serviceName} booking is confirmed. Complete payment to finalize.</p>
          <div style={{background: '#F5F6F8', borderRadius: '16px', padding: '16px', marginBottom: '20px', textAlign: 'left'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
              <span style={{fontSize: '12px', color: '#9CA3AF'}}>Confirmation</span>
              <span style={{fontSize: '14px', fontWeight: 800, color: '#DC143C'}}>{booking.confirmationCode}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
              <span style={{fontSize: '12px', color: '#9CA3AF'}}>Service</span>
              <span style={{fontSize: '13px', fontWeight: 700, color: '#111318'}}>{icon} {serviceName}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
              <span style={{fontSize: '12px', color: '#9CA3AF'}}>Date & Time</span>
              <span style={{fontSize: '13px', fontWeight: 700, color: '#111318'}}>{booking.date} · {booking.time}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E9EAEC', paddingTop: '8px', marginTop: '4px'}}>
              <span style={{fontSize: '13px', fontWeight: 800, color: '#111318'}}>Total</span>
              <span style={{fontSize: '16px', fontWeight: 800, color: '#DC143C'}}>NPR {booking.total}</span>
            </div>
          </div>
          <button onClick={() => router.push('/bookings')}
            style={{width: '100%', padding: '14px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'sans-serif', marginBottom: '10px'}}>
            View My Bookings
          </button>
          <button onClick={() => router.push('/home')}
            style={{width: '100%', padding: '14px', background: '#F5F6F8', color: '#6B7280', border: 'none', borderRadius: '14px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif'}}>
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight: '100vh', background: '#F5F6F8', fontFamily: 'sans-serif', paddingBottom: '40px'}}>
      <div style={{background: 'white', padding: '52px 20px 16px', borderBottom: '1px solid #F0F1F3', position: 'sticky', top: 0, zIndex: 50}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <button onClick={() => step === 1 ? router.back() : setStep(1)}
            style={{width: '36px', height: '36px', borderRadius: '10px', background: '#F5F6F8', border: '1px solid #E9EAEC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A5060" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div>
            <h1 style={{fontSize: '20px', fontWeight: 800, color: '#111318'}}>{icon} Book {serviceName}</h1>
            <p style={{fontSize: '12px', color: '#9CA3AF', marginTop: '2px'}}>Home Service · NPR {rate.toLocaleString()}/visit</p>
          </div>
        </div>
        <div style={{display: 'flex', gap: '6px', marginTop: '14px'}}>
          {[1, 2].map(s => (
            <div key={s} style={{flex: 1, height: '3px', borderRadius: '2px', background: s <= step ? '#DC143C' : '#E9EAEC'}}/>
          ))}
        </div>
      </div>

      <div style={{padding: '20px 16px', maxWidth: '480px', margin: '0 auto'}}>
        {error && <div style={{background: '#FEF2F2', border: '1px solid rgba(220,20,60,0.2)', borderRadius: '12px', padding: '12px 16px', marginBottom: '16px', fontSize: '13px', color: '#DC143C', fontWeight: 600}}>{error}</div>}

        {step === 1 && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <p style={{fontSize: '13px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Step 1 — Schedule</p>

            <div style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', padding: '16px'}}>
              <p style={{fontSize: '13px', fontWeight: 700, color: '#111318', marginBottom: '10px'}}>Select Date</p>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={minDate}
                style={{width: '100%', border: '1px solid #E9EAEC', borderRadius: '10px', padding: '10px 12px', fontSize: '14px', color: '#111318', outline: 'none', fontFamily: 'sans-serif', boxSizing: 'border-box'}}
              />
            </div>

            <div style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', padding: '16px'}}>
              <p style={{fontSize: '13px', fontWeight: 700, color: '#111318', marginBottom: '12px'}}>Select Time</p>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px'}}>
                {times.map(t => (
                  <button key={t} onClick={() => setTime(t)}
                    style={{padding: '9px', borderRadius: '10px', border: `1.5px solid ${time === t ? '#DC143C' : '#E9EAEC'}`, background: time === t ? 'rgba(220,20,60,0.06)' : 'white', color: time === t ? '#DC143C' : '#374151', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'sans-serif'}}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', padding: '16px'}}>
              <p style={{fontSize: '13px', fontWeight: 700, color: '#111318', marginBottom: '10px'}}>Your Address</p>
              <textarea value={address} onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full address where the service is needed..." rows={3}
                style={{width: '100%', border: '1px solid #E9EAEC', borderRadius: '10px', padding: '10px 12px', fontSize: '13px', color: '#374151', outline: 'none', fontFamily: 'sans-serif', resize: 'none', boxSizing: 'border-box', lineHeight: 1.6}}
              />
            </div>

            <div style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', padding: '16px'}}>
              <p style={{fontSize: '13px', fontWeight: 700, color: '#111318', marginBottom: '10px'}}>Additional Notes (optional)</p>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe what needs to be done..." rows={3}
                style={{width: '100%', border: '1px solid #E9EAEC', borderRadius: '10px', padding: '10px 12px', fontSize: '13px', color: '#374151', outline: 'none', fontFamily: 'sans-serif', resize: 'none', boxSizing: 'border-box', lineHeight: 1.6}}
              />
            </div>

            <button onClick={() => {
              if (!date || !time || !address) { setError('Please fill in date, time and address'); return }
              setError(''); setStep(2)
            }} style={{width: '100%', padding: '15px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'sans-serif'}}>
              Continue to Payment
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <p style={{fontSize: '13px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Step 2 — Payment</p>

            <div style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', padding: '16px'}}>
              <p style={{fontSize: '13px', fontWeight: 700, color: '#111318', marginBottom: '12px'}}>Booking Summary</p>
              {[
                { label: 'Service', value: `${icon} ${serviceName}` },
                { label: 'Date', value: date },
                { label: 'Time', value: time },
                { label: 'Address', value: address },
              ].map((item, i) => (
                <div key={i} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                  <span style={{fontSize: '13px', color: '#9CA3AF'}}>{item.label}</span>
                  <span style={{fontSize: '13px', fontWeight: 700, color: '#111318', maxWidth: '60%', textAlign: 'right'}}>{item.value}</span>
                </div>
              ))}
              <div style={{display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E9EAEC', paddingTop: '10px', marginTop: '4px'}}>
                <span style={{fontSize: '15px', fontWeight: 800, color: '#111318'}}>Total</span>
                <span style={{fontSize: '18px', fontWeight: 800, color: '#DC143C'}}>NPR {rate.toLocaleString()}</span>
              </div>
            </div>

            <div style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', padding: '16px'}}>
              <p style={{fontSize: '13px', fontWeight: 700, color: '#111318', marginBottom: '12px'}}>Choose Payment Method</p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {paymentMethods.map(pm => (
                  <button key={pm.id} onClick={() => setPaymentMethod(pm.id)}
                    style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: '12px', border: `2px solid ${paymentMethod === pm.id ? pm.color : '#E9EAEC'}`, background: paymentMethod === pm.id ? `${pm.color}10` : 'white', cursor: 'pointer', textAlign: 'left', fontFamily: 'sans-serif'}}>
                    <div style={{width: '40px', height: '40px', borderRadius: '10px', background: `${pm.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                      <span style={{fontSize: '14px', fontWeight: 800, color: pm.color}}>{pm.label[0]}</span>
                    </div>
                    <div>
                      <p style={{fontSize: '14px', fontWeight: 700, color: '#111318'}}>{pm.label}</p>
                      <p style={{fontSize: '12px', color: '#9CA3AF'}}>{pm.description}</p>
                    </div>
                    {paymentMethod === pm.id && (
                      <div style={{marginLeft: 'auto', width: '20px', height: '20px', borderRadius: '50%', background: pm.color, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleBook} disabled={loading || !paymentMethod}
              style={{width: '100%', padding: '15px', background: loading ? 'rgba(220,20,60,0.5)' : 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'sans-serif'}}>
              {loading ? 'Confirming...' : `Confirm Booking · NPR ${rate.toLocaleString()}`}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function BookService() {
  return (
    <Suspense fallback={<div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: '#9CA3AF'}}>Loading...</div>}>
      <BookServiceForm />
    </Suspense>
  )
}
