'use client'
import { useRouter } from 'next/navigation'
import BottomNav from '../components/BottomNav'

export default function Services() {
  const router = useRouter()

  const services = [
    { name: 'Electrician', icon: '⚡', desc: 'Wiring, repairs, installations', rate: 800, color: '#F59E0B' },
    { name: 'Plumber', icon: '🔧', desc: 'Pipes, leaks, bathroom fitting', rate: 700, color: '#2563EB' },
    { name: 'Carpenter', icon: '🪚', desc: 'Furniture, doors, woodwork', rate: 900, color: '#92400E' },
    { name: 'Painter', icon: '🎨', desc: 'Interior and exterior painting', rate: 1200, color: '#7C3AED' },
    { name: 'House Cleaner', icon: '🧹', desc: 'Deep cleaning, regular cleaning', rate: 600, color: '#059669' },
    { name: 'Gardener', icon: '🌿', desc: 'Garden care, lawn mowing', rate: 500, color: '#16A34A' },
    { name: 'AC Technician', icon: '❄️', desc: 'AC repair, servicing, install', rate: 1000, color: '#0EA5E9' },
    { name: 'Security Guard', icon: '🔒', desc: 'Home and office security', rate: 15000, color: '#DC143C' },
  ]

  const handleBook = (service: typeof services[0]) => {
    router.push(`/book-service?name=${encodeURIComponent(service.name)}&rate=${service.rate}&icon=${encodeURIComponent(service.icon)}`)
  }

  return (
    <div style={{minHeight: '100vh', background: '#F5F6F8', fontFamily: 'sans-serif', paddingBottom: '80px'}}>

      <div style={{background: 'white', padding: '52px 20px 16px', borderBottom: '1px solid #F0F1F3', position: 'sticky', top: 0, zIndex: 50}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <button onClick={() => router.back()} style={{width: '36px', height: '36px', borderRadius: '10px', background: '#F5F6F8', border: '1px solid #E9EAEC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A5060" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div>
            <h1 style={{fontSize: '22px', fontWeight: 800, color: '#111318', letterSpacing: '-0.4px'}}>Home Services</h1>
            <p style={{fontSize: '12px', color: '#9CA3AF', marginTop: '2px'}}>Trusted professionals for your home</p>
          </div>
        </div>
      </div>

      <div style={{padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px'}}>

        <div style={{background: 'linear-gradient(135deg, #DC143C, #A50E2D)', borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div>
            <p style={{fontSize: '14px', fontWeight: 800, color: 'white'}}>All verified professionals</p>
            <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '2px'}}>Background checked · Rated by families</p>
          </div>
          <div style={{fontSize: '28px'}}>✅</div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
          {services.map((service) => (
            <div key={service.name} onClick={() => handleBook(service)}
              style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', padding: '16px', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'}}>
              <div style={{fontSize: '32px', marginBottom: '10px'}}>{service.icon}</div>
              <p style={{fontSize: '14px', fontWeight: 800, color: '#111318', marginBottom: '4px'}}>{service.name}</p>
              <p style={{fontSize: '11px', color: '#9CA3AF', marginBottom: '8px', lineHeight: 1.4}}>{service.desc}</p>
              <p style={{fontSize: '12px', fontWeight: 700, color: service.color}}>NPR {service.rate.toLocaleString()}/visit</p>
            </div>
          ))}
        </div>

        {/* Request a service */}
        <div style={{background: 'white', borderRadius: '16px', border: '1px solid #E9EAEC', padding: '20px', textAlign: 'center'}}>
          <p style={{fontSize: '15px', fontWeight: 800, color: '#111318', marginBottom: '4px'}}>Need something else?</p>
          <p style={{fontSize: '13px', color: '#9CA3AF', marginBottom: '14px'}}>We are adding more services every week.</p>
          <button
            onClick={() => {
              const subject = encodeURIComponent('Service Request - Sahayatri')
              const body = encodeURIComponent('Hi Sahayatri team,\n\nI would like to request the following service:\n\nService name:\nDescription:\nLocation:\n\nThank you.')
              window.open(`mailto:support@sahayatri.app?subject=${subject}&body=${body}`)
            }}
            style={{padding: '12px 24px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'sans-serif'}}>
            Request a Service
          </button>
        </div>

      </div>
      <BottomNav />
    </div>
  )
}
