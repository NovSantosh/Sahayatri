'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function About() {
  const router = useRouter()

  return (
    <div style={{minHeight: '100vh', background: '#06040C', fontFamily: 'Inter, -apple-system, sans-serif', color: 'white'}}>

      <div style={{position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(139,0,30,0.4) 0%, transparent 70%)', pointerEvents: 'none'}}/>

      <div style={{padding: '52px 24px 0', display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 10}}>
        <button onClick={() => router.back()} style={{width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <span style={{fontSize: '16px', fontWeight: 700, color: 'rgba(255,255,255,0.7)'}}>Our Story</span>
      </div>

      <div style={{padding: '40px 24px 80px', position: 'relative', zIndex: 10, maxWidth: '480px', margin: '0 auto'}}>

        <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px'}}>
          <div style={{width: '48px', height: '48px', borderRadius: '16px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(220,20,60,0.4)'}}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402C1 3.759 3.8 1 7.2 1c1.98 0 3.72.99 4.8 2.52C13.08 1.99 14.82 1 16.8 1 20.2 1 23 3.759 23 7.191c0 4.105-5.37 8.863-11 14.402z"/></svg>
          </div>
          <div>
            <h1 style={{fontSize: '24px', fontWeight: 900, color: 'white', letterSpacing: '-0.8px'}}>Sahayatri</h1>
            <p style={{fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '1px'}}>साथी · Fellow Traveler</p>
          </div>
        </div>

        <div style={{marginBottom: '40px'}}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(220,20,60,0.1)', border: '1px solid rgba(220,20,60,0.2)', borderRadius: '20px', padding: '5px 12px', marginBottom: '20px'}}>
            <span style={{fontSize: '10px', fontWeight: 700, color: 'rgba(220,20,60,0.8)', textTransform: 'uppercase', letterSpacing: '1px'}}>Why We Built This</span>
          </div>

          <h2 style={{fontSize: '32px', fontWeight: 800, color: 'white', lineHeight: 1.2, letterSpacing: '-1px', marginBottom: '24px'}}>
            Built from
            <span style={{display: 'block', background: 'linear-gradient(135deg, #FF4060, #DC143C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>missing home.</span>
          </h2>

          <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            {[
              {text: "I built Sahayatri because I know what it feels like to be thousands of miles from family and not know how to close that gap.", bold: true},
              {text: "There are 3.5 million Nepali people living abroad. Every single one of them has parents back home who wait for a phone call. Every one of them has children who grow up not knowing their grandparents.", bold: false},
              {text: "Sahayatri — which means 'fellow traveler' in Nepali — is my answer to that distance. It is not just an app. It is a bridge between the Nepal you left and the family you carry in your heart.", bold: false},
              {text: "We built real AI that speaks Nepali. We built a way to share real moments. We built a way to book real people who can sit with your parents when you cannot.", bold: false},
              {text: "This is just the beginning. Every feature we build asks one question: does this make a Nepali family feel closer?", bold: false},
            ].map((p, i) => (
              <p key={i} style={{fontSize: '16px', color: p.bold ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.45)', lineHeight: 1.8, fontWeight: p.bold ? 500 : 400}}>
                {p.text}
              </p>
            ))}
          </div>
        </div>

        <div style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '20px 24px', marginBottom: '40px'}}>
          <p style={{fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '4px', letterSpacing: '-0.5px'}}>Krishna Pandey</p>
          <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '12px'}}>Founder · Sahayatri · Vancouver, Canada</p>
          <p style={{fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, fontStyle: 'italic'}}>"Distance is just a number. Connection is a choice."</p>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '40px'}}>
          {[
            {val: '3.5M', label: 'Nepali diaspora'},
            {val: '12', label: 'Countries'},
            {val: '100%', label: 'Ad-free'},
          ].map((s, i) => (
            <div key={i} style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '16px 12px', textAlign: 'center'}}>
              <p style={{fontSize: '22px', fontWeight: 800, color: '#DC143C', letterSpacing: '-0.5px'}}>{s.val}</p>
              <p style={{fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '4px', fontWeight: 500}}>{s.label}</p>
            </div>
          ))}
        </div>

        <div style={{marginBottom: '40px'}}>
          <p style={{fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px'}}>What We Stand For</p>
          <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            {[
              {icon: '❤️', title: 'Family First', desc: 'Every decision we make asks — does this bring families closer?'},
              {icon: '🔒', title: 'Privacy Always', desc: 'Your family moments are yours. No ads. No data selling. Ever.'},
              {icon: '🇳🇵', title: 'Nepal-First Design', desc: 'Built for Nepali culture — Nepali language, Nepali payment, Nepali heart.'},
              {icon: '🤝', title: 'Real People', desc: 'Sahayatri connects you with real verified companions — not algorithms.'},
            ].map((v, i) => (
              <div key={i} style={{display: 'flex', gap: '14px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '16px'}}>
                <div style={{fontSize: '24px', flexShrink: 0}}>{v.icon}</div>
                <div>
                  <p style={{fontSize: '14px', fontWeight: 700, color: 'white', marginBottom: '4px'}}>{v.title}</p>
                  <p style={{fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5}}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link href="/signup" style={{textDecoration: 'none', display: 'block', width: '100%', padding: '18px', background: 'linear-gradient(135deg, #DC143C, #A50E2D)', color: 'white', borderRadius: '16px', fontSize: '16px', fontWeight: 800, textAlign: 'center', boxShadow: '0 8px 32px rgba(220,20,60,0.4)', boxSizing: 'border-box', marginBottom: '16px'} as any}>
          Join Sahayatri — Free
        </Link>

        <p style={{textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.2)'}}>
          Questions?{' '}
          <a href="mailto:hello@sahayatri.app" style={{color: 'rgba(220,20,60,0.6)', textDecoration: 'none'}}>hello@sahayatri.app</a>
        </p>
      </div>
    </div>
  )
}
