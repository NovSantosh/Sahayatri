import { NextRequest, NextResponse } from 'next/server'

const OTP_STORE = new Map<string, { otp: string, expires: number }>()

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(req: NextRequest) {
  try {
    const { email, phone, channel } = await req.json()

    const otp = generateOTP()
    const key = channel === 'email' ? email : phone
    const expires = Date.now() + 10 * 60 * 1000 // 10 minutes

    // Store OTP
    OTP_STORE.set(key, { otp, expires })

    if (channel === 'email' && email) {
      // Send via Resend
      if (!process.env.RESEND_API_KEY) {
        // Demo mode — log OTP
        console.log(`OTP for ${email}: ${otp}`)
        return NextResponse.json({ success: true, demo: true })
      }

      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      await resend.emails.send({
        from: 'Sahayatri <noreply@sahayatri.app>',
        to: email,
        subject: `Your Sahayatri verification code: ${otp}`,
        html: `
          <div style="font-family:Inter,sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;background:#06040C;border-radius:16px;">
            <div style="text-align:center;margin-bottom:32px;">
              <div style="width:64px;height:64px;border-radius:18px;background:linear-gradient(135deg,#DC143C,#A50E2D);display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
                <span style="font-size:32px;">❤️</span>
              </div>
              <h1 style="color:white;font-size:24px;font-weight:800;letter-spacing:-0.5px;margin:0;">Sahayatri</h1>
              <p style="color:rgba(255,255,255,0.5);font-size:14px;margin-top:8px;">साथयात्री · Fellow Traveler</p>
            </div>
            
            <p style="color:rgba(255,255,255,0.7);font-size:16px;line-height:1.6;margin-bottom:24px;">
              Your verification code is:
            </p>
            
            <div style="background:rgba(220,20,60,0.1);border:1px solid rgba(220,20,60,0.3);border-radius:16px;padding:24px;text-align:center;margin-bottom:24px;">
              <p style="font-size:48px;font-weight:900;color:#DC143C;letter-spacing:12px;margin:0;">${otp}</p>
            </div>
            
            <p style="color:rgba(255,255,255,0.4);font-size:13px;line-height:1.6;margin-bottom:8px;">
              This code expires in 10 minutes. Do not share it with anyone.
            </p>
            
            <p style="color:rgba(255,255,255,0.25);font-size:12px;line-height:1.6;">
              If you did not request this code, please ignore this email.
            </p>

            <div style="margin-top:32px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.08);text-align:center;">
              <p style="color:rgba(255,255,255,0.2);font-size:11px;">
                Built for the Nepali community · sahayatri.app
              </p>
            </div>
          </div>
        `
      })

      return NextResponse.json({ success: true })

    } else if (channel === 'phone' && phone) {
      // Sparrow SMS for Nepal
      if (!process.env.SPARROW_TOKEN) {
        console.log(`OTP for ${phone}: ${otp}`)
        return NextResponse.json({ success: true, demo: true })
      }

      const res = await fetch('http://api.sparrowsms.com/v2/sms/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: process.env.SPARROW_TOKEN,
          from: 'Sahayatri',
          to: phone,
          text: `Your Sahayatri verification code is: ${otp}. Valid for 10 minutes. Do not share.`,
        })
      })

      if (!res.ok) {
        console.log(`SMS OTP for ${phone}: ${otp}`)
      }

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid channel' }, { status: 400 })

  } catch (error) {
    console.error('OTP error:', error)
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  const otp = req.nextUrl.searchParams.get('otp')

  if (!key || !otp) {
    return NextResponse.json({ error: 'Missing key or otp' }, { status: 400 })
  }

  const stored = OTP_STORE.get(key)

  if (!stored) {
    return NextResponse.json({ valid: false, error: 'OTP not found or expired' })
  }

  if (Date.now() > stored.expires) {
    OTP_STORE.delete(key)
    return NextResponse.json({ valid: false, error: 'OTP expired' })
  }

  if (stored.otp !== otp) {
    return NextResponse.json({ valid: false, error: 'Invalid OTP' })
  }

  OTP_STORE.delete(key)
  return NextResponse.json({ valid: true })
}
