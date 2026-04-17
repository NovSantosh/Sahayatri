'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import PaymentSheet from '../components/PaymentSheet'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'
import {
  HeartIcon, CheckIcon, ArrowLeftIcon,
  ClockIcon, StarIcon, CalendarIcon,
  LocationIcon, SparkleIcon
} from '../components/Icons'

const CARE_TYPES = [
  {
    id: 'daily-checkin',
    title: 'Daily Check-in',
    nepali: 'दैनिक हेरचाह',
    desc: 'Someone visits every morning, confirms they are okay, sends you a photo and voice note.',
    duration: '30 min/day',
    rate: 8000,
    rateUnit: 'per month',
    tag: 'Most booked',
    tagColor: brand.primary,
    tagBg: brand.primaryLight,
    emotional: 'Know your parent is okay every single morning.',
    includes: ['Morning visit every day', 'Photo sent to you', 'Voice note update', 'Medicine reminder', 'Immediate alert if anything wrong'],
    icon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={brand.primary} strokeWidth="1.8" strokeLinecap="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.19 12 19.79 19.79 0 0 1 1.07 3.18 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    id: 'companionship',
    title: 'Companionship',
    nepali: 'साथ र माया',
    desc: 'A warm companion spends quality time with your loved one — talks, walks, watches TV together.',
    duration: '2–3 hrs/visit',
    rate: 1500,
    rateUnit: 'per visit',
    tag: 'High impact',
    tagColor: '#7C3AED',
    tagBg: 'rgba(124,58,237,0.08)',
    emotional: 'Your parent should never feel alone.',
    includes: ['Meaningful conversation', 'Gentle walks', 'Games and activities', 'Festival visits', 'Emotional support'],
    icon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: 'medical-escort',
    title: 'Medical Escort',
    nepali: 'स्वास्थ्य सेवा',
    desc: 'Companion takes your parent to doctor appointments, sits with them and reports back to you.',
    duration: 'Half or full day',
    rate: 2500,
    rateUnit: 'per visit',
    tag: 'Essential',
    tagColor: '#059669',
    tagBg: 'rgba(5,150,105,0.08)',
    emotional: 'Be there for every doctor visit even from abroad.',
    includes: ['Pickup from home', 'Full hospital escort', 'Collects prescription', 'Detailed report sent to you', 'Medicine purchase'],
    icon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    id: 'meal-service',
    title: 'Meal Service',
    nepali: 'घरको खाना',
    desc: 'A home cook prepares fresh nutritious Nepali meals at your parent\'s home.',
    duration: '1.5 hrs/visit',
    rate: 1200,
    rateUnit: 'per visit',
    tag: 'Comfort',
    tagColor: '#D97706',
    tagBg: 'rgba(217,119,6,0.08)',
    emotional: 'Aama should eat well even when you are not there.',
    includes: ['Fresh home-cooked meals', 'Traditional Nepali food', 'Dietary needs respected', 'Kitchen cleaned after', 'Photo before serving'],
    icon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
  },
  {
    id: 'grocery',
    title: 'Grocery and Errands',
    nepali: 'किनमेल र काम',
    desc: 'We handle all shopping, bill payments, pharmacy runs so your parent never goes out alone.',
    duration: '1–2 hrs',
    rate: 800,
    rateUnit: 'per errand',
    tag: 'Practical',
    tagColor: '#2563EB',
    tagBg: 'rgba(37,99,235,0.08)',
    emotional: 'Never worry about whether the fridge is full.',
    includes: ['Weekly grocery shopping', 'Pharmacy and medicine pickup', 'Bill payments', 'Any errands needed', 'Receipt photo sent'],
    icon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
  },
  {
    id: 'full-care',
    title: 'Full Care Package',
    nepali: 'सम्पूर्ण हेरचाह',
    desc: 'Everything combined. Daily check-in, cleaning, grocery, meal service and medical escort.',
    duration: 'Daily coverage',
    rate: 18000,
    rateUnit: 'per month',
    tag: 'Best value',
    tagColor: brand.primary,
    tagBg: brand.primaryLight,
    emotional: 'Complete peace of mind. One payment from anywhere in the world.',
    includes: ['Daily morning check-in + photo', 'Weekly grocery shopping', 'Weekly house cleaning', 'Monthly doctor escort', '2x weekly meal service', '24/7 emergency dispatch', 'Monthly health report'],
    featured: true,
    icon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={brand.primary} strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
]

const COMPANIONS = [
  {
    id: 'p1', name: 'Sita Sharma', experience: '6 years', rating: 4.9, reviews: 87,
    location: 'Kathmandu', languages: ['Nepali', 'Hindi'], speciality: 'Elder care · Medical escort',
    completedJobs: 312, bio: 'Former nurse with deep experience in elder care. Gentle, patient and trustworthy.',
    initials: 'SS', color: '#7C3AED', available: true,
  },
  {
    id: 'p2', name: 'Ram Bahadur KC', experience: '4 years', rating: 4.8, reviews: 64,
    location: 'Lalitpur', languages: ['Nepali', 'English'], speciality: 'Companionship · Errands',
    completedJobs: 198, bio: 'Retired teacher who found purpose in caring for elders. Reliable, kind and always on time.',
    initials: 'RK', color: '#059669', available: true,
  },
  {
    id: 'p3', name: 'Meena Thapa', experience: '5 years', rating: 4.9, reviews: 112,
    location: 'Bhaktapur', languages: ['Nepali'], speciality: 'Cooking · Daily care',
    completedJobs: 445, bio: 'Passionate about feeding people with love. I cook traditional Nepali meals.',
    initials: 'MT', color: '#D97706', available: false,
  },
]

type Step = 'home' | 'care-type' | 'companion' | 'details' | 'confirm' | 'payment' | 'booked'

export default function Care() {
  const { t } = useTheme()
  const router = useRouter()
  const { data: session } = useSession()
  const [step, setStep] = useState<Step>('home')
  const [selectedCare, setSelectedCare] = useState<typeof CARE_TYPES[0] | null>(null)
  const [selectedCompanion, setSelectedCompanion] = useState<typeof COMPANIONS[0] | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [familyName, setFamilyName] = useState('')
  const [familyPhone, setFamilyPhone] = useState('')
  const [familyAddress, setFamilyAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [frequency, setFrequency] = useState('once')
  const [showPaymentSheet, setShowPaymentSheet] = useState(false)
  const [bookingId] = useState(`CARE-${Date.now()}`)

  const card = {
    background: t.cardBg,
    borderRadius: '20px' as const,
    border: `1px solid ${t.border}`,
    boxShadow: t.shadow,
    transition: 'background 0.3s ease' as const,
  }

  const Header = ({ title, sub, back }: { title: string, sub: string, back: () => void }) => (
    <div style={{background: t.headerBg, backdropFilter: 'blur(20px)', padding: '52px 20px 16px', borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 50}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
        <button onClick={back} style={{width: '38px', height: '38px', borderRadius: '12px', background: t.inputBg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
          <ArrowLeftIcon size={18} color={t.text2} strokeWidth={2}/>
        </button>
        <div>
          <h1 style={{fontSize: '20px', fontWeight: 800, color: t.text1, letterSpacing: '-0.4px'}}>{title}</h1>
          <p style={{fontSize: '12px', color: t.text3, marginTop: '2px'}}>{sub}</p>
        </div>
      </div>
    </div>
  )

  // BOOKED
  if (step === 'booked') return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '40px'}}>
      <div style={{padding: '60px 24px 32px', textAlign: 'center'}}>
        <div style={{width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 32px rgba(220,20,60,0.35)', animation: 'breathe 2s ease infinite'}}>
          <CheckIcon size={36} color="white" strokeWidth={2.5}/>
        </div>
        <h1 style={{fontSize: '26px', fontWeight: 900, color: t.text1, letterSpacing: '-0.8px', marginBottom: '10px'}}>Booking Confirmed!</h1>
        <p style={{fontSize: '15px', color: t.text2, lineHeight: 1.6, marginBottom: '6px'}}>{selectedCompanion?.name} will care for {familyName}.</p>
        <p style={{fontSize: '13px', color: t.text3, lineHeight: 1.6, marginBottom: '32px'}}>Payment received. Photo updates after every visit.</p>

        <div style={{...card, padding: '20px', marginBottom: '16px', textAlign: 'left'}}>
          <p style={{fontSize: '11px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '14px'}}>Booking Summary</p>
          {[
            { label: 'Service', value: selectedCare?.title },
            { label: 'Companion', value: selectedCompanion?.name },
            { label: 'For', value: familyName },
            { label: 'Frequency', value: frequency },
            { label: 'Amount paid', value: `NPR ${selectedCare?.rate.toLocaleString()} ${selectedCare?.rateUnit}` },
            { label: 'Booking ID', value: bookingId },
          ].map((item, i, arr) => (
            <div key={i} style={{display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none', gap: '12px'}}>
              <p style={{fontSize: '13px', color: t.text3, flexShrink: 0}}>{item.label}</p>
              <p style={{fontSize: '13px', fontWeight: 700, color: t.text1, textAlign: 'right'}}>{item.value}</p>
            </div>
          ))}
        </div>

        <button onClick={() => router.push('/home')}
          style={{width: '100%', padding: '16px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 6px 24px rgba(220,20,60,0.35)'}}>
          Back to Home
        </button>
      </div>
      <style>{`@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}`}</style>
    </div>
  )

  // PAYMENT STEP
  if (step === 'payment') return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '40px'}}>
      <Header title="Pay to Confirm" sub="Payment required to confirm booking" back={() => setStep('confirm')}/>
      <div style={{padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '14px'}}>

        {/* Why pay now */}
        <div style={{background: 'linear-gradient(135deg, #0E0B18, #1A0A16)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(255,255,255,0.06)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
            <div style={{width: '32px', height: '32px', borderRadius: '10px', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <CheckIcon size={15} color={brand.primary} strokeWidth={2.5}/>
            </div>
            <p style={{fontSize: '14px', fontWeight: 700, color: 'white'}}>Why we collect payment now</p>
          </div>
          <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6}}>
            Advance payment ensures your companion is reserved and committed to your booking. Your companion gets paid within 24 hours of completing the service. Full refund if cancelled before the visit.
          </p>
        </div>

        {/* Booking summary */}
        <div style={{...card, padding: '20px'}}>
          <p style={{fontSize: '13px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '14px'}}>What you are paying for</p>
          {[
            { label: 'Service', value: selectedCare?.title || '' },
            { label: 'Companion', value: selectedCompanion?.name || '' },
            { label: 'For', value: familyName },
            { label: 'Frequency', value: frequency },
          ].map((item, i, arr) => (
            <div key={i} style={{display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none', gap: '12px'}}>
              <p style={{fontSize: '13px', color: t.text3, flexShrink: 0}}>{item.label}</p>
              <p style={{fontSize: '13px', fontWeight: 600, color: t.text1, textAlign: 'right'}}>{item.value}</p>
            </div>
          ))}
          <div style={{marginTop: '14px', paddingTop: '14px', borderTop: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <p style={{fontSize: '14px', fontWeight: 700, color: t.text1}}>Total</p>
            <p style={{fontSize: '22px', fontWeight: 900, color: brand.primary, letterSpacing: '-1px'}}>NPR {selectedCare?.rate.toLocaleString()}</p>
          </div>
          <p style={{fontSize: '11px', color: t.text3, marginTop: '4px', textAlign: 'right'}}>{selectedCare?.rateUnit}</p>
        </div>

        {/* Payment methods */}
        <div style={{...card, padding: '20px'}}>
          <p style={{fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '16px'}}>Choose payment method</p>
          {[
            { id: 'esewa', name: 'eSewa', desc: 'Most popular in Nepal', color: '#60BB46', bg: 'rgba(96,187,70,0.08)', border: 'rgba(96,187,70,0.25)', initial: 'e' },
            { id: 'khalti', name: 'Khalti', desc: 'Fast digital wallet', color: '#5C2D91', bg: 'rgba(92,45,145,0.08)', border: 'rgba(92,45,145,0.25)', initial: 'K' },
            { id: 'connectips', name: 'ConnectIPS', desc: 'Direct bank transfer', color: '#1A56DB', bg: 'rgba(26,86,219,0.08)', border: 'rgba(26,86,219,0.25)', initial: 'C' },
          ].map((method) => (
            <div key={method.id}
              onClick={() => {
                setShowPaymentSheet(false)
                // Redirect to payment
                fetch('/api/payment/initiate', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    method: method.id,
                    amount: selectedCare?.rate,
                    bookingId,
                    userEmail: session?.user?.email,
                    serviceName: selectedCare?.title,
                  })
                })
                  .then(r => r.json())
                  .then(data => {
                    if (data.redirectUrl) {
                      window.location.href = data.redirectUrl
                    }
                  })
              }}
              style={{display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderRadius: '14px', border: `1px solid ${t.border}`, background: t.inputBg, cursor: 'pointer', marginBottom: '10px', transition: 'all 0.2s ease'}}>
              <div style={{width: '42px', height: '42px', borderRadius: '12px', background: method.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <span style={{fontSize: '14px', fontWeight: 900, color: 'white'}}>{method.initial}</span>
              </div>
              <div style={{flex: 1}}>
                <p style={{fontSize: '15px', fontWeight: 700, color: t.text1, marginBottom: '2px'}}>{method.name}</p>
                <p style={{fontSize: '12px', color: t.text3}}>{method.desc}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.text3} strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          ))}
        </div>

        <div style={{...card, padding: '16px', display: 'flex', alignItems: 'center', gap: '12px'}}>
          <div style={{width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(5,150,105,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
            <CheckIcon size={15} color="#059669" strokeWidth={2.5}/>
          </div>
          <p style={{fontSize: '12px', color: t.text3, lineHeight: 1.5}}>
            <strong style={{color: t.text1}}>100% refund</strong> if cancelled before first visit · Secure payment via eSewa, Khalti or bank transfer
          </p>
        </div>
      </div>
    </div>
  )

  // CONFIRM
  if (step === 'confirm') return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '40px'}}>
      <Header title="Review Booking" sub="Check details before paying" back={() => setStep('details')}/>
      <div style={{padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '14px'}}>

        <div style={{...card, padding: '20px'}}>
          <p style={{fontSize: '11px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '14px'}}>Service</p>
          <div style={{display: 'flex', alignItems: 'center', gap: '14px'}}>
            <div style={{width: '48px', height: '48px', borderRadius: '14px', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              {selectedCare && <selectedCare.icon/>}
            </div>
            <div>
              <p style={{fontSize: '16px', fontWeight: 800, color: t.text1}}>{selectedCare?.title}</p>
              <p style={{fontSize: '13px', color: t.text3}}>{selectedCare?.duration} · {frequency}</p>
            </div>
          </div>
        </div>

        {selectedCompanion && (
          <div style={{...card, padding: '20px'}}>
            <p style={{fontSize: '11px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '14px'}}>Companion</p>
            <div style={{display: 'flex', alignItems: 'center', gap: '14px'}}>
              <div style={{width: '48px', height: '48px', borderRadius: '50%', background: selectedCompanion.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '16px', flexShrink: 0}}>
                {selectedCompanion.initials}
              </div>
              <div>
                <p style={{fontSize: '16px', fontWeight: 800, color: t.text1}}>{selectedCompanion.name}</p>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                  <StarIcon size={13} color={brand.warning} filled strokeWidth={0}/>
                  <span style={{fontSize: '13px', color: t.text2, fontWeight: 600}}>{selectedCompanion.rating} · {selectedCompanion.completedJobs} visits</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{...card, padding: '20px'}}>
          <p style={{fontSize: '11px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '14px'}}>Care Recipient</p>
          {[
            { label: 'Name', value: familyName },
            { label: 'Phone', value: familyPhone },
            { label: 'Address', value: familyAddress },
            { label: 'Notes', value: notes || 'None' },
          ].map((item, i, arr) => (
            <div key={i} style={{display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none', gap: '12px'}}>
              <p style={{fontSize: '13px', color: t.text3, flexShrink: 0}}>{item.label}</p>
              <p style={{fontSize: '13px', fontWeight: 600, color: t.text1, textAlign: 'right'}}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Amount */}
        <div style={{background: 'linear-gradient(135deg, #0E0B18, #1A0A16)', borderRadius: '20px', padding: '22px', border: '1px solid rgba(255,255,255,0.06)'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
            <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.5)'}}>Service cost</p>
            <p style={{fontSize: '14px', fontWeight: 700, color: 'white'}}>NPR {selectedCare?.rate.toLocaleString()}</p>
          </div>
          <div style={{borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <p style={{fontSize: '16px', fontWeight: 800, color: 'white'}}>Total to pay now</p>
            <p style={{fontSize: '24px', fontWeight: 900, color: brand.primary, letterSpacing: '-1px'}}>NPR {selectedCare?.rate.toLocaleString()}</p>
          </div>
          <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '8px'}}>{selectedCare?.rateUnit} · 100% refund if cancelled before first visit</p>
        </div>

        {/* Pay now button */}
        <button onClick={() => setStep('payment')}
          style={{width: '100%', padding: '18px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 6px 24px rgba(220,20,60,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
          Pay NPR {selectedCare?.rate.toLocaleString()} to Confirm
        </button>
        <p style={{fontSize: '12px', color: t.text3, textAlign: 'center'}}>Booking only confirmed after payment · Cancel anytime before first visit</p>
      </div>
    </div>
  )

  // DETAILS
  if (step === 'details') return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '40px'}}>
      <Header title="Care Details" sub="Tell us about your loved one" back={() => setStep('companion')}/>
      <div style={{padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '14px'}}>

        <div style={{...card, padding: '20px'}}>
          <p style={{fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '16px'}}>Their details</p>
          {[
            { label: 'Full name', val: familyName, set: setFamilyName, ph: 'e.g. Shanti Devi' },
            { label: 'Phone number in Nepal', val: familyPhone, set: setFamilyPhone, ph: '98XXXXXXXX' },
            { label: 'Full address', val: familyAddress, set: setFamilyAddress, ph: 'e.g. Baluwatar, Kathmandu' },
          ].map((field, i) => (
            <div key={i} style={{marginBottom: i < 2 ? '14px' : '0'}}>
              <p style={{fontSize: '12px', fontWeight: 600, color: t.text3, marginBottom: '6px'}}>{field.label}</p>
              <input value={field.val} onChange={e => field.set(e.target.value)} placeholder={field.ph}
                style={{width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '13px 16px', fontSize: '15px', color: t.text1, outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' as const}}/>
            </div>
          ))}
        </div>

        <div style={{...card, padding: '20px'}}>
          <p style={{fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '14px'}}>How often?</p>
          {[
            { id: 'once', label: 'One time only', sub: 'Single visit' },
            { id: 'weekly', label: 'Weekly', sub: 'Same day every week' },
            { id: 'daily', label: 'Daily', sub: 'Every morning' },
            { id: 'monthly', label: 'Monthly subscription', sub: 'Best value' },
          ].map((opt) => (
            <button key={opt.id} onClick={() => setFrequency(opt.id)}
              style={{width: '100%', padding: '13px 16px', borderRadius: '14px', border: `1.5px solid ${frequency === opt.id ? brand.primary : t.border}`, background: frequency === opt.id ? brand.primaryLight : 'transparent', cursor: 'pointer', fontFamily: 'Inter, sans-serif', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', transition: 'all 0.2s ease'}}>
              <div style={{width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${frequency === opt.id ? brand.primary : t.border}`, background: frequency === opt.id ? brand.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                {frequency === opt.id && <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'white'}}/>}
              </div>
              <div>
                <p style={{fontSize: '14px', fontWeight: 700, color: frequency === opt.id ? brand.primary : t.text1, marginBottom: '1px'}}>{opt.label}</p>
                <p style={{fontSize: '11px', color: t.text3}}>{opt.sub}</p>
              </div>
            </button>
          ))}
        </div>

        <div style={{...card, padding: '20px'}}>
          <p style={{fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '6px'}}>Special notes</p>
          <p style={{fontSize: '13px', color: t.text3, marginBottom: '12px'}}>Medical conditions, dietary needs, language preferences.</p>
          <textarea value={notes} onChange={e => setNotes(e.target.value)}
            placeholder="e.g. Has diabetes. Speaks only Nepali. Prefers female companion."
            rows={4}
            style={{width: '100%', background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '13px 16px', fontSize: '14px', color: t.text1, outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' as const, resize: 'none' as const, lineHeight: 1.6}}/>
        </div>

        <button onClick={() => familyName && familyPhone && familyAddress && setStep('confirm')}
          disabled={!familyName || !familyPhone || !familyAddress}
          style={{width: '100%', padding: '16px', background: (!familyName || !familyPhone || !familyAddress) ? t.inputBg : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: (!familyName || !familyPhone || !familyAddress) ? t.text3 : 'white', fontSize: '15px', fontWeight: 800, cursor: (!familyName || !familyPhone || !familyAddress) ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease'}}>
          Review Booking
        </button>
      </div>
      <style>{`input::placeholder,textarea::placeholder{color:${t.text3}}`}</style>
    </div>
  )

  // COMPANION
  if (step === 'companion') return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '40px'}}>
      <Header title="Choose Companion" sub="All verified · Background checked" back={() => setStep('care-type')}/>
      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px'}}>

        <div style={{background: brand.primaryLight, border: `1px solid ${brand.primaryBorder}`, borderRadius: '14px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px'}}>
          <CheckIcon size={16} color={brand.primary} strokeWidth={2.5}/>
          <p style={{fontSize: '13px', color: brand.primary, fontWeight: 600}}>Every companion is ID verified, background checked and rated by real families.</p>
        </div>

        {COMPANIONS.map((c) => (
          <div key={c.id} onClick={() => c.available && setSelectedCompanion(c)}
            style={{...card, padding: '20px', opacity: c.available ? 1 : 0.55, cursor: c.available ? 'pointer' : 'not-allowed', border: `1.5px solid ${selectedCompanion?.id === c.id ? brand.primary : t.border}`, background: selectedCompanion?.id === c.id ? brand.primaryLight : t.cardBg, transition: 'all 0.2s ease'}}>
            <div style={{display: 'flex', gap: '14px', marginBottom: '12px'}}>
              <div style={{position: 'relative', flexShrink: 0}}>
                <div style={{width: '52px', height: '52px', borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '18px'}}>
                  {c.initials}
                </div>
                {c.available && <div style={{position: 'absolute', bottom: '1px', right: '1px', width: '13px', height: '13px', borderRadius: '50%', background: '#22C55E', border: `2px solid ${t.cardBg}`}}/>}
              </div>
              <div style={{flex: 1}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px'}}>
                  <p style={{fontSize: '16px', fontWeight: 800, color: selectedCompanion?.id === c.id ? brand.primary : t.text1}}>{c.name}</p>
                  <div style={{display: 'flex', alignItems: 'center', gap: '3px', background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.15)', borderRadius: '9999px', padding: '2px 8px'}}>
                    <CheckIcon size={10} color="#059669" strokeWidth={2.5}/>
                    <span style={{fontSize: '10px', fontWeight: 700, color: '#059669'}}>Verified</span>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px'}}>
                  <StarIcon size={12} color={brand.warning} filled strokeWidth={0}/>
                  <span style={{fontSize: '12px', fontWeight: 700, color: t.text1}}>{c.rating}</span>
                  <span style={{fontSize: '12px', color: t.text3}}>({c.reviews} reviews) · {c.experience}</span>
                </div>
                <p style={{fontSize: '12px', color: t.text3}}>{c.location} · {c.languages.join(', ')}</p>
              </div>
            </div>
            <p style={{fontSize: '13px', color: t.text2, lineHeight: 1.6, fontStyle: 'italic', marginBottom: '12px'}}>"{c.bio}"</p>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div style={{background: t.inputBg, borderRadius: '9999px', padding: '4px 12px'}}>
                <span style={{fontSize: '11px', color: t.text3, fontWeight: 600}}>{c.completedJobs} visits completed</span>
              </div>
              {!c.available && <span style={{fontSize: '12px', color: t.text3}}>Currently busy</span>}
              {c.available && selectedCompanion?.id === c.id && (
                <div style={{display: 'flex', alignItems: 'center', gap: '4px', background: brand.primaryLight, border: `1px solid ${brand.primaryBorder}`, borderRadius: '9999px', padding: '4px 12px'}}>
                  <CheckIcon size={11} color={brand.primary} strokeWidth={2.5}/>
                  <span style={{fontSize: '11px', fontWeight: 700, color: brand.primary}}>Selected</span>
                </div>
              )}
            </div>
          </div>
        ))}

        <button onClick={() => selectedCompanion && setStep('details')} disabled={!selectedCompanion}
          style={{width: '100%', padding: '16px', background: !selectedCompanion ? t.inputBg : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: !selectedCompanion ? t.text3 : 'white', fontSize: '15px', fontWeight: 800, cursor: !selectedCompanion ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease'}}>
          {selectedCompanion ? `Continue with ${selectedCompanion.name}` : 'Select a companion'}
        </button>
      </div>
    </div>
  )

  // CARE TYPE
  if (step === 'care-type') return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, sans-serif', paddingBottom: '40px'}}>
      <Header title="Choose Care Type" sub="What does your loved one need?" back={() => setStep('home')}/>
      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
        {CARE_TYPES.map((care) => (
          <div key={care.id}
            onClick={() => { setSelectedCare(care); setExpanded(expanded === care.id ? null : care.id) }}
            style={{...card, padding: '18px', cursor: 'pointer', border: `1.5px solid ${selectedCare?.id === care.id ? brand.primary : t.border}`, background: selectedCare?.id === care.id ? brand.primaryLight : t.cardBg, position: 'relative', overflow: 'hidden', transition: 'all 0.2s ease'}}>

            {care.featured && <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #DC143C, #A50E2D)'}}/>}

            <div style={{display: 'flex', gap: '14px', alignItems: 'flex-start'}}>
              <div style={{width: '46px', height: '46px', borderRadius: '14px', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <care.icon/>
              </div>
              <div style={{flex: 1}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px', flexWrap: 'wrap'}}>
                  <p style={{fontSize: '15px', fontWeight: 800, color: t.text1}}>{care.title}</p>
                  <div style={{padding: '2px 8px', borderRadius: '9999px', background: care.tagBg}}>
                    <span style={{fontSize: '10px', fontWeight: 700, color: care.tagColor}}>{care.tag}</span>
                  </div>
                </div>
                <p style={{fontSize: '13px', color: t.text2, lineHeight: 1.5}}>{care.desc}</p>
              </div>
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px', paddingTop: '12px', borderTop: `1px solid ${t.border}`}}>
              <div>
                <p style={{fontSize: '18px', fontWeight: 900, color: brand.primary, letterSpacing: '-0.5px'}}>NPR {care.rate.toLocaleString()}</p>
                <p style={{fontSize: '11px', color: t.text3}}>{care.rateUnit} · {care.duration}</p>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.text3} strokeWidth="2" strokeLinecap="round">
                <path d={expanded === care.id ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}/>
              </svg>
            </div>

            {expanded === care.id && (
              <div style={{marginTop: '14px', paddingTop: '14px', borderTop: `1px solid ${t.border}`}}>
                {care.includes.map((item, i) => (
                  <div key={i} style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px'}}>
                    <div style={{width: '20px', height: '20px', borderRadius: '6px', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                      <CheckIcon size={11} color={brand.primary} strokeWidth={2.5}/>
                    </div>
                    <p style={{fontSize: '13px', color: t.text2}}>{item}</p>
                  </div>
                ))}
                <div style={{marginTop: '12px', background: brand.primaryLight, border: `1px solid ${brand.primaryBorder}`, borderRadius: '12px', padding: '12px 14px'}}>
                  <p style={{fontSize: '13px', color: brand.primary, fontStyle: 'italic', lineHeight: 1.5}}>"{care.emotional}"</p>
                </div>
              </div>
            )}
          </div>
        ))}

        <button onClick={() => selectedCare && setStep('companion')} disabled={!selectedCare}
          style={{width: '100%', padding: '16px', background: !selectedCare ? t.inputBg : 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: !selectedCare ? t.text3 : 'white', fontSize: '15px', fontWeight: 800, cursor: !selectedCare ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease', marginTop: '6px'}}>
          {selectedCare ? `Continue with ${selectedCare.title}` : 'Select a care type'}
        </button>
      </div>
    </div>
  )

  // HOME LANDING
  return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, -apple-system, sans-serif', paddingBottom: '40px', transition: 'background 0.3s ease'}}>
      <div style={{background: t.headerBg, backdropFilter: 'blur(20px)', padding: '52px 20px 16px', borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 50}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <button onClick={() => router.back()} style={{width: '38px', height: '38px', borderRadius: '12px', background: t.inputBg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
            <ArrowLeftIcon size={18} color={t.text2} strokeWidth={2}/>
          </button>
          <div>
            <h1 style={{fontSize: '22px', fontWeight: 900, color: t.text1, letterSpacing: '-0.6px'}}>Elder Care</h1>
            <p style={{fontSize: '12px', color: t.text3}}>Care for your loved ones · From anywhere</p>
          </div>
        </div>
      </div>

      <div style={{padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
        {/* Hero */}
        <div style={{background: 'linear-gradient(135deg, #0E0B18 0%, #1A0A16 50%, #0A0E1A 100%)', borderRadius: '24px', padding: '24px', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)'}}>
          <div style={{position: 'absolute', top: '-40px', right: '-30px', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,20,60,0.2), transparent 70%)', pointerEvents: 'none'}}/>
          <div style={{position: 'relative', zIndex: 1}}>
            <div style={{display: 'inline-flex', alignItems: 'center', gap: '6px', background: brand.primaryLight, border: `1px solid ${brand.primaryBorder}`, borderRadius: '9999px', padding: '5px 12px', marginBottom: '16px'}}>
              <div style={{width: '5px', height: '5px', borderRadius: '50%', background: brand.primary, animation: 'pulse 2s ease infinite'}}/>
              <span style={{fontSize: '10px', fontWeight: 700, color: brand.primary, textTransform: 'uppercase', letterSpacing: '0.8px'}}>Sahayatri Care</span>
            </div>
            <h2 style={{fontSize: '22px', fontWeight: 800, color: 'white', lineHeight: 1.3, marginBottom: '10px', letterSpacing: '-0.5px'}}>
              Be there for your family<br/>even when you cannot be.
            </h2>
            <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '22px'}}>
              Book verified companions who care for your parents in Nepal. Photo and voice updates after every visit.
            </p>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px'}}>
              {[
                { val: '500+', label: 'Families', color: brand.primary },
                { val: '4.9', label: 'Avg rating', color: brand.warning },
                { val: '98%', label: 'Satisfaction', color: '#059669' },
              ].map((s, i) => (
                <div key={i} style={{background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px 6px', textAlign: 'center'}}>
                  <p style={{fontSize: '18px', fontWeight: 900, color: s.color, letterSpacing: '-0.5px', marginBottom: '2px'}}>{s.val}</p>
                  <p style={{fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 600}}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How it works */}
        <div style={{...card, padding: '22px'}}>
          <p style={{fontSize: '16px', fontWeight: 800, color: t.text1, marginBottom: '18px', letterSpacing: '-0.3px'}}>How it works</p>
          {[
            { step: '1', title: 'Choose care type', desc: 'Daily check-in, companionship, medical escort and more.', color: brand.primary },
            { step: '2', title: 'Pick a companion', desc: 'All verified, rated and background checked.', color: '#7C3AED' },
            { step: '3', title: 'Pay to confirm', desc: 'Secure advance payment via eSewa or Khalti.', color: '#059669' },
            { step: '4', title: 'Get photo updates', desc: 'After every single visit, directly to your phone.', color: '#D97706' },
          ].map((item, i) => (
            <div key={i} style={{display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: i < 3 ? '18px' : '0', position: 'relative'}}>
              {i < 3 && <div style={{position: 'absolute', left: '15px', top: '34px', width: '2px', height: '22px', background: t.border}}/>}
              <div style={{width: '32px', height: '32px', borderRadius: '50%', background: `${item.color}12`, border: `1.5px solid ${item.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <span style={{fontSize: '13px', fontWeight: 800, color: item.color}}>{item.step}</span>
              </div>
              <div style={{paddingTop: '5px'}}>
                <p style={{fontSize: '14px', fontWeight: 700, color: t.text1, marginBottom: '4px'}}>{item.title}</p>
                <p style={{fontSize: '13px', color: t.text3, lineHeight: 1.5}}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div style={{...card, padding: '22px'}}>
          <p style={{fontSize: '16px', fontWeight: 800, color: t.text1, marginBottom: '16px'}}>What families say</p>
          {[
            { name: 'Rajesh K.', location: 'Vancouver, Canada', text: 'I was so worried about my mother living alone in Kathmandu. Sahayatri sends me a photo of her every morning. I can finally sleep properly.', initials: 'RK', color: '#2563EB' },
            { name: 'Priya S.', location: 'London, UK', text: 'My father needed someone to take him to his monthly checkup. The companion sent me the full doctor report. Incredible service.', initials: 'PS', color: '#7C3AED' },
          ].map((review, i) => (
            <div key={i} style={{marginBottom: i === 0 ? '16px' : '0', paddingBottom: i === 0 ? '16px' : '0', borderBottom: i === 0 ? `1px solid ${t.border}` : 'none'}}>
              <div style={{display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px'}}>
                <div style={{width: '36px', height: '36px', borderRadius: '50%', background: review.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '12px', flexShrink: 0}}>
                  {review.initials}
                </div>
                <div style={{flex: 1}}>
                  <p style={{fontSize: '13px', fontWeight: 700, color: t.text1}}>{review.name}</p>
                  <p style={{fontSize: '11px', color: t.text3}}>{review.location}</p>
                </div>
                <div style={{display: 'flex', gap: '2px'}}>
                  {[1,2,3,4,5].map(s => <StarIcon key={s} size={12} color={brand.warning} filled strokeWidth={0}/>)}
                </div>
              </div>
              <p style={{fontSize: '13px', color: t.text2, lineHeight: 1.6, fontStyle: 'italic'}}>"{review.text}"</p>
            </div>
          ))}
        </div>

        <button onClick={() => setStep('care-type')}
          style={{width: '100%', padding: '18px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '18px', color: 'white', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 32px rgba(220,20,60,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', letterSpacing: '-0.3px'}}>
          <HeartIcon size={22} color="white" filled strokeWidth={0}/>
          Book Care for My Family
        </button>

        <p style={{fontSize: '12px', color: t.text3, textAlign: 'center', lineHeight: 1.6}}>
          Pay securely via eSewa or Khalti · Cancel anytime · 100% refund before first visit
        </p>
      </div>
      <style>{`
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(0.8)}}
        ::-webkit-scrollbar{display:none}
        input::placeholder,textarea::placeholder{color:${t.text3}}
      `}</style>
    </div>
  )
}
