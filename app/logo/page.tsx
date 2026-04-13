'use client'
import { useRouter } from 'next/navigation'
import { SahayatriIcon, SahayatriFullLogo } from '../components/SahayatriLogo'

export default function LogoPage() {
  const router = useRouter()

  return (
    <div style={{ minHeight: '100vh', background: '#06040C', fontFamily: 'Inter, sans-serif', padding: '60px 32px' }}>

      <button onClick={() => router.back()}
        style={{ color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '40px', fontSize: '14px' }}>
        ← Back
      </button>

      <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'white', marginBottom: '8px', letterSpacing: '-1px' }}>
        Sahayatri Logo
      </h1>
      <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)', marginBottom: '60px' }}>
        Brand identity system
      </p>

      {/* Icon sizes */}
      <section style={{ marginBottom: '60px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '24px' }}>Icon — All Sizes</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          {[16, 24, 32, 40, 48, 64, 80, 120].map(s => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <SahayatriIcon size={s}/>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{s}px</p>
            </div>
          ))}
        </div>
      </section>

      {/* Full logo on dark */}
      <section style={{ marginBottom: '60px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '24px' }}>Full Logo — Dark</p>
        <div style={{ background: '#06040C', padding: '32px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.07)', display: 'inline-block' }}>
          <SahayatriFullLogo size={48} theme="dark"/>
        </div>
      </section>

      {/* Full logo on light */}
      <section style={{ marginBottom: '60px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '24px' }}>Full Logo — Light</p>
        <div style={{ background: '#F7F7F8', padding: '32px', borderRadius: '20px', display: 'inline-block' }}>
          <SahayatriFullLogo size={48} theme="light"/>
        </div>
      </section>

      {/* App icon */}
      <section style={{ marginBottom: '60px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '24px' }}>App Icon — Phone</p>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {[
            { size: 120, radius: 28, label: 'iOS Home Screen' },
            { size: 76, radius: 18, label: 'Spotlight' },
            { size: 40, radius: 10, label: 'Notification' },
          ].map((item) => (
            <div key={item.size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: item.size, height: item.size, borderRadius: item.radius, background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(220,20,60,0.4)' }}>
                <SahayatriIcon size={item.size * 0.6}/>
              </div>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand colors */}
      <section>
        <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '24px' }}>Brand Colors</p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {[
            { color: '#DC143C', name: 'Crimson Red', code: '#DC143C', usage: 'Primary' },
            { color: '#A50E2D', name: 'Deep Red', code: '#A50E2D', usage: 'Primary Dark' },
            { color: '#06040C', name: 'Midnight', code: '#06040C', usage: 'Background' },
            { color: '#0E0B18', name: 'Deep Dark', code: '#0E0B18', usage: 'Card Dark' },
            { color: '#F7F7F8', name: 'Off White', code: '#F7F7F8', usage: 'Light BG' },
            { color: '#10B981', name: 'Emerald', code: '#10B981', usage: 'Success' },
            { color: '#F59E0B', name: 'Amber', code: '#F59E0B', usage: 'Warning' },
          ].map((c) => (
            <div key={c.color} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: c.color, border: '1px solid rgba(255,255,255,0.08)' }}/>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 700, color: 'white', marginBottom: '2px' }}>{c.name}</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>{c.code}</p>
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>{c.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
