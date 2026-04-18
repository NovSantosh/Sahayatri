import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const OTP_STORE = new Map<string, { otp: string, expires: number }>()

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const { email, phone, channel } = await req.json()

    const otp = generateOTP()
    const key = channel === 'email' ? email : phone
    const expires = Date.now() + 10 * 60 * 1000

    OTP_STORE.set(key, { otp, expires })
    console.log(`OTP for ${key}: ${otp}`)

    if (channel === 'email' && email) {
      if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        console.log('Gmail not configured - demo mode OTP:', otp)
        return NextResponse.json({ success: true, demo: true, otp })
      }

      const transporter = getTransporter()

      await transporter.sendMail({
        from: `"Sahayatri" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: `Your Sahayatri verification code: ${otp}`,
        html: `
          <div style="font-family:Inter,Arial,sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;background:#06040C;border-radius:16px;">
            <div style="text-align:center;margin-bottom:32px;">
              <h1 style="color:white;font-size:28px;font-weight:800;letter-spacing:-1px;margin:0;">Sahayatri</h1>
              <p style="color:rgba(255,255,255,0.4);font-size:14px;margin-top:6px;">साथयात्री · Fellow Traveler</p>
            </div>
            <p style="color:rgba(255,255,255,0.7);font-size:16px;line-height:1.6;margin-bottom:24px;">
              Your verification code is:
            </p>
            <div style="background:rgba(220,20,60,0.12);border:2px solid rgba(220,20,60,0.3);border-radius:16px;padding:28px;text-align:center;margin-bottom:24px;">
              <p style="font-size:52px;font-weight:900;color:#DC143C;letter-spacing:14px;margin:0;font-family:monospace;">${otp}</p>
            </div>
            <p style="color:rgba(255,255,255,0.35);font-size:13px;line-height:1.6;">
              This code expires in 10 minutes. Do not share it with anyone.
            </p>
            <div style="margin-top:32px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.08);text-align:center;">
              <p style="color:rgba(255,255,255,0.2);font-size:11px;">
                Sahayatri · Built for the Nepali community
              </p>
            </div>
          </div>
        `,
      })

      return NextResponse.json({ success: true })

    } else if (channel === 'phone' && phone) {
      if (!process.env.SPARROW_TOKEN) {
        console.log('Sparrow SMS not configured - demo OTP:', otp)
        return NextResponse.json({ success: true, demo: true, otp })
      }

      const res = await fetch('http://api.sparrowsms.com/v2/sms/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: process.env.SPARROW_TOKEN,
          from: 'Sahayatri',
          to: phone,
          text: `Your Sahayatri verification code: ${otp}. Valid 10 minutes. Do not share.`,
        })
      })
      console.log('SMS result:', await res.text())
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid channel' }, { status: 400 })

  } catch (error: any) {
    console.error('OTP error:', error?.message || error)
    return NextResponse.json({ error: 'Failed to send OTP', details: error?.message }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  const otp = req.nextUrl.searchParams.get('otp')

  if (!key || !otp) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 })
  }

  const stored = OTP_STORE.get(key)

  if (!stored) {
    return NextResponse.json({ valid: false, error: 'OTP expired or not found' })
  }

  if (Date.now() > stored.expires) {
    OTP_STORE.delete(key)
    return NextResponse.json({ valid: false, error: 'OTP expired' })
  }

  if (stored.otp !== otp) {
    return NextResponse.json({ valid: false, error: 'Invalid code' })
  }

  OTP_STORE.delete(key)
  return NextResponse.json({ valid: true })
}
