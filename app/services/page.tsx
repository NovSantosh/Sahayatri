'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '../components/BottomNav'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../design-system'
import { SearchIcon, LocationIcon, StarIcon, ClockIcon, CheckIcon, ArrowLeftIcon } from '../components/Icons'

const CATEGORIES = ['All', 'Repair', 'Cleaning', 'Care', 'Security', 'Garden']

const SERVICES = [
  {
    id: 'electrician',
    name: 'Electrician',
    category: 'Repair',
    desc: 'Wiring, repairs, installations, safety checks',
    longDesc: 'Our certified electricians handle everything from minor repairs to full wiring installations. All work is safety checked and guaranteed for 30 days.',
    rate: 800,
    rateUnit: 'per visit',
    duration: '1–3 hours',
    rating: 4.8,
    reviews: 124,
    available: true,
    urgent: true,
    includes: ['Fault diagnosis', 'Wiring repair', 'Switch/socket replacement', 'Safety inspection'],
    color: '#D97706',
    bg: 'rgba(217,119,6,0.08)',
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    id: 'plumber',
    name: 'Plumber',
    category: 'Repair',
    desc: 'Pipes, leaks, bathroom fitting, tank cleaning',
    longDesc: 'Expert plumbers for all water-related issues. From fixing a dripping tap to full bathroom installations.',
    rate: 700,
    rateUnit: 'per visit',
    duration: '1–4 hours',
    rating: 4.7,
    reviews: 98,
    available: true,
    urgent: true,
    includes: ['Leak detection', 'Pipe repair', 'Tap/shower fitting', 'Tank cleaning'],
    color: '#2563EB',
    bg: 'rgba(37,99,235,0.08)',
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    id: 'carpenter',
    name: 'Carpenter',
    category: 'Repair',
    desc: 'Furniture, doors, windows, custom woodwork',
    longDesc: 'Skilled carpenters for furniture repair, custom builds, door fitting, and all woodwork needs.',
    rate: 900,
    rateUnit: 'per visit',
    duration: '2–6 hours',
    rating: 4.6,
    reviews: 67,
    available: true,
    urgent: false,
    includes: ['Furniture repair', 'Door/window fitting', 'Custom woodwork', 'Polish & finish'],
    color: '#92400E',
    bg: 'rgba(146,64,14,0.08)',
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#92400E" strokeWidth="1.8" strokeLinecap="round">
        <line x1="18" y1="20" x2="18" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="16"/>
        <line x1="18" y1="4" x2="6" y2="16"/>
        <rect x="4" y="18" width="4" height="4" rx="1"/>
      </svg>
    ),
  },
  {
    id: 'painter',
    name: 'Painter',
    category: 'Repair',
    desc: 'Interior and exterior painting, waterproofing',
    longDesc: 'Professional painters with premium quality paints. Interior, exterior, waterproofing and texture finishes available.',
    rate: 1200,
    rateUnit: 'per visit',
    duration: '4–8 hours',
    rating: 4.9,
    reviews: 45,
    available: true,
    urgent: false,
    includes: ['Wall preparation', 'Primer coat', 'Paint application', 'Clean up'],
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.08)',
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round">
        <path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z"/>
        <path d="M12 11V3"/>
        <path d="M8 7l4-4 4 4"/>
      </svg>
    ),
  },
  {
    id: 'cleaner',
    name: 'House Cleaner',
    category: 'Cleaning',
    desc: 'Deep cleaning, regular cleaning, move-in/out',
    longDesc: 'Thorough house cleaning using professional equipment and eco-friendly products. One-time deep clean or regular schedule.',
    rate: 600,
    rateUnit: 'per visit',
    duration: '2–5 hours',
    rating: 4.8,
    reviews: 203,
    available: true,
    urgent: false,
    includes: ['All rooms', 'Kitchen deep clean', 'Bathroom sanitize', 'Floor mopping'],
    color: '#059669',
    bg: 'rgba(5,150,105,0.08)',
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: 'ac-technician',
    name: 'AC Technician',
    category: 'Repair',
    desc: 'AC repair, servicing, installation, gas refill',
    longDesc: 'Certified AC technicians for all brands. Servicing, repair, installation and gas refilling.',
    rate: 1000,
    rateUnit: 'per visit',
    duration: '1–3 hours',
    rating: 4.7,
    reviews: 89,
    available: true,
    urgent: true,
    includes: ['AC diagnosis', 'Filter cleaning', 'Gas check/refill', 'Performance test'],
    color: '#0EA5E9',
    bg: 'rgba(14,165,233,0.08)',
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="1.8" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M12 17v4M8 21h8"/>
        <path d="M8 10h8M12 7v6"/>
      </svg>
    ),
  },
  {
    id: 'gardener',
    name: 'Gardener',
    category: 'Garden',
    desc: 'Garden care, lawn mowing, tree trimming',
    longDesc: 'Professional garden maintenance including lawn mowing, tree trimming, planting and seasonal care.',
    rate: 500,
    rateUnit: 'per visit',
    duration: '2–4 hours',
    rating: 4.5,
    reviews: 34,
    available: true,
    urgent: false,
    includes: ['Lawn mowing', 'Tree trimming', 'Weeding', 'Seasonal planting'],
    color: '#16A34A',
    bg: 'rgba(22,163,74,0.08)',
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 22V12"/>
        <path d="M12 12C12 12 7 10 7 5a5 5 0 0 1 10 0c0 5-5 7-5 7z"/>
        <path d="M12 12C12 12 9 8 5 9"/>
        <path d="M12 12C12 12 15 8 19 9"/>
      </svg>
    ),
  },
  {
    id: 'security',
    name: 'Security Guard',
    category: 'Security',
    desc: 'Home and office security, event security',
    longDesc: 'Trained and verified security personnel for homes, offices and events. Available for short or long term.',
    rate: 15000,
    rateUnit: 'per month',
    duration: '8–12 hrs/day',
    rating: 4.6,
    reviews: 18,
    available: true,
    urgent: false,
    includes: ['24/7 monitoring', 'Access control', 'Incident reporting', 'ID verified'],
    color: brand.primary,
    bg: brand.primaryLight,
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={brand.primary} strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    id: 'elder-care',
    name: 'Elder Care',
    category: 'Care',
    desc: 'Daily visits, companionship, medication help',
    longDesc: 'Compassionate caregivers for elderly family members. Daily visits, companionship, medication reminders and light assistance.',
    rate: 1500,
    rateUnit: 'per visit',
    duration: '2–4 hours',
    rating: 4.9,
    reviews: 12,
    available: false,
    urgent: false,
    includes: ['Daily check-ins', 'Companionship', 'Medication reminder', 'Light housework'],
    color: brand.primary,
    bg: brand.primaryLight,
    comingSoon: true,
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={brand.primary} strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="7" r="4"/>
        <path d="M5 20a7 7 0 0 1 14 0"/>
        <path d="M12 14v3M10 17h4"/>
      </svg>
    ),
  },
  {
    id: 'cooking',
    name: 'Home Cook',
    category: 'Care',
    desc: 'Nepali home cooking, meal prep, catering',
    longDesc: 'Experienced cooks who prepare authentic Nepali meals in your home. Daily cooking or special occasions.',
    rate: 1200,
    rateUnit: 'per visit',
    duration: '2–3 hours',
    rating: 4.8,
    reviews: 8,
    available: false,
    urgent: false,
    includes: ['Meal planning', 'Fresh cooking', 'Kitchen cleanup', 'Nepali cuisine'],
    color: '#D97706',
    bg: 'rgba(217,119,6,0.08)',
    comingSoon: true,
    Icon: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
  },
]

export default function Services() {
  const router = useRouter()
  const { t, theme } = useTheme()
  const isDark = theme === 'dark'
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null)

  const filtered = SERVICES.filter(s => {
    const matchCat = activeCategory === 'All' || s.category === activeCategory
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.desc.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  const available = filtered.filter(s => !s.comingSoon)
  const coming = filtered.filter(s => s.comingSoon)

  const card = {
    background: t.cardBg,
    borderRadius: '20px',
    border: `1px solid ${t.border}`,
    boxShadow: t.shadow,
    transition: 'background 0.3s ease, border-color 0.3s ease',
  }

  // Service Detail Sheet
  if (selectedService) {
    return (
      <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, -apple-system, sans-serif', paddingBottom: '100px', transition: 'background 0.3s ease'}}>

        {/* Header */}
        <div style={{background: t.headerBg, backdropFilter: 'blur(20px)', padding: '52px 20px 16px', borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 50}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <button onClick={() => setSelectedService(null)}
              style={{width: '38px', height: '38px', borderRadius: '12px', background: t.inputBg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
              <ArrowLeftIcon size={18} color={t.text2} strokeWidth={2}/>
            </button>
            <div>
              <h1 style={{fontSize: '20px', fontWeight: 800, color: t.text1, letterSpacing: '-0.4px'}}>{selectedService.name}</h1>
              <p style={{fontSize: '12px', color: t.text3, marginTop: '2px'}}>{selectedService.category}</p>
            </div>
          </div>
        </div>

        <div style={{padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '14px'}}>

          {/* Hero card */}
          <div style={{...card, padding: '22px', position: 'relative', overflow: 'hidden'}}>
            <div style={{position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: `${selectedService.color}10`, pointerEvents: 'none'}}/>
            <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px'}}>
              <div style={{width: '64px', height: '64px', borderRadius: '20px', background: selectedService.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <selectedService.Icon/>
              </div>
              <div style={{flex: 1}}>
                <h2 style={{fontSize: '22px', fontWeight: 800, color: t.text1, letterSpacing: '-0.5px', marginBottom: '4px'}}>{selectedService.name}</h2>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                    <StarIcon size={14} color={brand.warning} filled strokeWidth={0}/>
                    <span style={{fontSize: '13px', fontWeight: 700, color: t.text1}}>{selectedService.rating}</span>
                  </div>
                  <span style={{fontSize: '12px', color: t.text3}}>({selectedService.reviews} reviews)</span>
                  {selectedService.urgent && (
                    <div style={{padding: '2px 8px', background: 'rgba(220,20,60,0.08)', border: `1px solid ${brand.primaryBorder}`, borderRadius: '9999px'}}>
                      <span style={{fontSize: '10px', fontWeight: 700, color: brand.primary}}>Same day</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p style={{fontSize: '14px', color: t.text2, lineHeight: 1.7}}>{selectedService.longDesc}</p>
          </div>

          {/* Price & duration */}
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
            <div style={{...card, padding: '16px', textAlign: 'center'}}>
              <p style={{fontSize: '11px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '6px'}}>Starting from</p>
              <p style={{fontSize: '24px', fontWeight: 900, color: selectedService.color, letterSpacing: '-1px'}}>NPR {selectedService.rate.toLocaleString()}</p>
              <p style={{fontSize: '11px', color: t.text3, marginTop: '3px'}}>{selectedService.rateUnit}</p>
            </div>
            <div style={{...card, padding: '16px', textAlign: 'center'}}>
              <p style={{fontSize: '11px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '6px'}}>Duration</p>
              <p style={{fontSize: '20px', fontWeight: 800, color: t.text1, letterSpacing: '-0.5px'}}>{selectedService.duration}</p>
              <p style={{fontSize: '11px', color: t.text3, marginTop: '3px'}}>estimated</p>
            </div>
          </div>

          {/* What is included */}
          <div style={{...card, padding: '20px'}}>
            <p style={{fontSize: '14px', fontWeight: 800, color: t.text1, marginBottom: '14px'}}>What is included</p>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              {selectedService.includes.map((item, i) => (
                <div key={i} style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div style={{width: '24px', height: '24px', borderRadius: '8px', background: selectedService.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                    <CheckIcon size={12} color={selectedService.color} strokeWidth={2.5}/>
                  </div>
                  <p style={{fontSize: '14px', color: t.text2}}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div style={{...card, padding: '20px'}}>
            <p style={{fontSize: '14px', fontWeight: 800, color: t.text1, marginBottom: '14px'}}>How it works</p>
            {[
              { step: '1', label: 'Book online', sub: 'Choose date, time and address' },
              { step: '2', label: 'Get confirmed', sub: 'We assign a verified professional' },
              { step: '3', label: 'Service done', sub: 'Professional arrives and completes work' },
              { step: '4', label: 'Pay & review', sub: 'Pay via eSewa, Khalti or bank transfer' },
            ].map((item, i) => (
              <div key={i} style={{display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: i < 3 ? '16px' : '0', position: 'relative'}}>
                {i < 3 && <div style={{position: 'absolute', left: '15px', top: '32px', width: '1px', height: '20px', background: t.border}}/>}
                <div style={{width: '32px', height: '32px', borderRadius: '50%', background: brand.primaryLight, border: `1.5px solid ${brand.primaryBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                  <span style={{fontSize: '12px', fontWeight: 800, color: brand.primary}}>{item.step}</span>
                </div>
                <div style={{paddingTop: '4px'}}>
                  <p style={{fontSize: '14px', fontWeight: 700, color: t.text1, marginBottom: '2px'}}>{item.label}</p>
                  <p style={{fontSize: '12px', color: t.text3}}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px'}}>
            {[
              { label: 'Verified', sub: 'Background checked', color: brand.success, bg: brand.successBg },
              { label: 'Insured', sub: 'Work guaranteed', color: brand.info, bg: brand.infoBg },
              { label: 'Rated', sub: `${selectedService.rating} stars`, color: brand.warning, bg: brand.warningBg },
            ].map((b, i) => (
              <div key={i} style={{...card, padding: '12px 8px', textAlign: 'center'}}>
                <div style={{width: '32px', height: '32px', borderRadius: '10px', background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px'}}>
                  <CheckIcon size={16} color={b.color} strokeWidth={2.5}/>
                </div>
                <p style={{fontSize: '12px', fontWeight: 700, color: b.color, marginBottom: '2px'}}>{b.label}</p>
                <p style={{fontSize: '10px', color: t.text3}}>{b.sub}</p>
              </div>
            ))}
          </div>

          {/* Book button */}
          <button
            onClick={() => router.push(`/book-service?name=${encodeURIComponent(selectedService.name)}&rate=${selectedService.rate}`)}
            style={{width: '100%', padding: '18px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', border: 'none', borderRadius: '16px', color: 'white', fontSize: '16px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 6px 24px rgba(220,20,60,0.35)', letterSpacing: '-0.3px'}}>
            Book {selectedService.name} — NPR {selectedService.rate.toLocaleString()}
          </button>

          <p style={{fontSize: '12px', color: t.text3, textAlign: 'center'}}>
            No payment until service is complete · Cancel anytime
          </p>

        </div>
        <BottomNav/>
      </div>
    )
  }

  return (
    <div style={{minHeight: '100vh', background: t.pageBg, fontFamily: 'Inter, -apple-system, sans-serif', paddingBottom: '100px', transition: 'background 0.3s ease'}}>

      {/* ── HEADER ── */}
      <div style={{background: t.headerBg, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: '52px 20px 14px', borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 50, transition: 'background 0.3s ease'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px'}}>
          <button onClick={() => router.back()}
            style={{width: '38px', height: '38px', borderRadius: '12px', background: t.inputBg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
            <ArrowLeftIcon size={18} color={t.text2} strokeWidth={2}/>
          </button>
          <div>
            <h1 style={{fontSize: '22px', fontWeight: 900, color: t.text1, letterSpacing: '-0.6px', transition: 'color 0.3s ease'}}>Home Services</h1>
            <p style={{fontSize: '12px', color: t.text3, marginTop: '2px'}}>Verified professionals for your home</p>
          </div>
        </div>

        {/* Search */}
        <div style={{display: 'flex', alignItems: 'center', gap: '10px', background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: '9999px', padding: '11px 18px', marginBottom: '14px', transition: 'background 0.3s ease'}}>
          <SearchIcon size={16} color={t.text3} strokeWidth={2}/>
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search services…"
            style={{flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '14px', color: t.text1, fontFamily: 'Inter, sans-serif'}}/>
        </div>

        {/* Category pills */}
        <div style={{display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '14px', scrollbarWidth: 'none'}}>
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{flexShrink: 0, padding: '7px 16px', borderRadius: '9999px', border: 'none', background: activeCategory === cat ? 'linear-gradient(135deg, #DC143C, #A50E2D)' : t.inputBg, color: activeCategory === cat ? 'white' : t.text3, fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s ease', boxShadow: activeCategory === cat ? '0 4px 12px rgba(220,20,60,0.25)' : 'none'}}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px'}}>

        {/* Trust banner */}
        <div style={{background: 'linear-gradient(135deg, #0E0B18 0%, #1A0A16 100%)', borderRadius: '20px', padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 24px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)'}}>
          <div>
            <p style={{fontSize: '15px', fontWeight: 800, color: 'white', marginBottom: '4px', letterSpacing: '-0.3px'}}>All verified professionals</p>
            <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5}}>Background checked · Rated by families · Insured work</p>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end', flexShrink: 0}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '9999px', padding: '3px 10px'}}>
              <div style={{width: '5px', height: '5px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 5px rgba(34,197,94,0.8)'}}/>
              <span style={{fontSize: '11px', fontWeight: 600, color: '#22C55E'}}>Available now</span>
            </div>
            <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.3)'}}>Kathmandu · Pokhara</p>
          </div>
        </div>

        {/* Location notice */}
        <div style={{...card, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px'}}>
          <div style={{width: '38px', height: '38px', borderRadius: '12px', background: brand.infoBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
            <LocationIcon size={18} color={brand.info} strokeWidth={2}/>
          </div>
          <div style={{flex: 1}}>
            <p style={{fontSize: '13px', fontWeight: 700, color: t.text1, marginBottom: '2px', transition: 'color 0.3s ease'}}>Serving Kathmandu Valley</p>
            <p style={{fontSize: '12px', color: t.text3}}>Bhaktapur · Lalitpur · Pokhara expanding soon</p>
          </div>
          <div style={{padding: '4px 10px', background: brand.infoBg, borderRadius: '9999px'}}>
            <span style={{fontSize: '11px', fontWeight: 700, color: brand.info}}>Change</span>
          </div>
        </div>

        {/* Available services */}
        {available.length > 0 && (
          <div>
            <p style={{fontSize: '13px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px', paddingLeft: '2px'}}>
              Available · {available.length} services
            </p>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
              {available.map((service) => (
                <div key={service.id}
                  onClick={() => setSelectedService(service)}
                  style={{...card, padding: '18px 16px', cursor: 'pointer', position: 'relative', overflow: 'hidden'}}>

                  {/* Same day badge */}
                  {service.urgent && (
                    <div style={{position: 'absolute', top: '12px', right: '12px', background: brand.primaryLight, border: `1px solid ${brand.primaryBorder}`, borderRadius: '9999px', padding: '2px 8px'}}>
                      <span style={{fontSize: '9px', fontWeight: 700, color: brand.primary}}>Same day</span>
                    </div>
                  )}

                  <div style={{width: '52px', height: '52px', borderRadius: '16px', background: service.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px'}}>
                    <service.Icon/>
                  </div>

                  <p style={{fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '4px', letterSpacing: '-0.2px', transition: 'color 0.3s ease'}}>{service.name}</p>
                  <p style={{fontSize: '11px', color: t.text3, marginBottom: '10px', lineHeight: 1.4}}>{service.desc}</p>

                  {/* Rating */}
                  <div style={{display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px'}}>
                    <StarIcon size={12} color={brand.warning} filled strokeWidth={0}/>
                    <span style={{fontSize: '12px', fontWeight: 700, color: t.text2}}>{service.rating}</span>
                    <span style={{fontSize: '11px', color: t.text3}}>({service.reviews})</span>
                  </div>

                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <p style={{fontSize: '13px', fontWeight: 800, color: service.color}}>NPR {service.rate.toLocaleString()}</p>
                    <p style={{fontSize: '10px', color: t.text3, fontWeight: 500}}>{service.rateUnit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {filtered.length === 0 && (
          <div style={{...card, padding: '48px 24px', textAlign: 'center'}}>
            <div style={{width: '56px', height: '56px', borderRadius: '50%', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'}}>
              <SearchIcon size={28} color={brand.primary} strokeWidth={1.5}/>
            </div>
            <h3 style={{fontSize: '17px', fontWeight: 700, color: t.text1, marginBottom: '8px'}}>No services found</h3>
            <p style={{fontSize: '13px', color: t.text3}}>Try a different search or category.</p>
          </div>
        )}

        {/* Coming soon services */}
        {coming.length > 0 && (
          <div>
            <p style={{fontSize: '13px', fontWeight: 700, color: t.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px', paddingLeft: '2px'}}>
              Coming Soon
            </p>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
              {coming.map((service) => (
                <div key={service.id}
                  style={{...card, padding: '18px 16px', opacity: 0.65, position: 'relative'}}>
                  <div style={{position: 'absolute', top: '12px', right: '12px', background: t.inputBg, borderRadius: '9999px', padding: '2px 8px'}}>
                    <span style={{fontSize: '9px', fontWeight: 700, color: t.text3}}>Soon</span>
                  </div>
                  <div style={{width: '52px', height: '52px', borderRadius: '16px', background: service.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px'}}>
                    <service.Icon/>
                  </div>
                  <p style={{fontSize: '15px', fontWeight: 800, color: t.text1, marginBottom: '4px', letterSpacing: '-0.2px'}}>{service.name}</p>
                  <p style={{fontSize: '11px', color: t.text3, marginBottom: '10px', lineHeight: 1.4}}>{service.desc}</p>
                  <p style={{fontSize: '13px', fontWeight: 800, color: service.color}}>NPR {service.rate.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Request a service */}
        <div style={{...card, padding: '22px', textAlign: 'center'}}>
          <div style={{width: '48px', height: '48px', borderRadius: '50%', background: brand.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px'}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={brand.primary} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
          <p style={{fontSize: '16px', fontWeight: 800, color: t.text1, marginBottom: '4px', letterSpacing: '-0.3px', transition: 'color 0.3s ease'}}>Need something else?</p>
          <p style={{fontSize: '13px', color: t.text3, marginBottom: '16px', lineHeight: 1.5}}>We are adding new services every week. Tell us what you need.</p>
          <button
            onClick={() => {
              const subject = encodeURIComponent('Service Request - Sahayatri')
              const body = encodeURIComponent('Hi Sahayatri team,\n\nI would like to request the following service:\n\nService name:\nDescription:\nLocation:\n\nThank you.')
              window.open(`mailto:support@sahayatri.app?subject=${subject}&body=${body}`)
            }}
            style={{padding: '12px 28px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', border: 'none', borderRadius: '14px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 16px rgba(220,20,60,0.3)'}}>
            Request a Service
          </button>
        </div>

      </div>

      <style>{`
        input::placeholder { color: ${t.text3}; }
        ::-webkit-scrollbar { display: none; }
      `}</style>

      <BottomNav/>
    </div>
  )
}
