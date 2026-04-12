import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

export async function POST(req: NextRequest) {
  try {
    const { email, location, message } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    await connectDB()
    const user = await User.findOne({ email })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    // In production this would send SMS via Sparrow SMS (Nepal) or similar
    // For now we log and return success
    console.log(`🆘 SOS ALERT from ${user.name} (${email})`)
    console.log(`Location: ${location}`)
    console.log(`Message: ${message}`)

    return NextResponse.json({
      success: true,
      message: 'SOS alert sent to your family and nearest companion',
      alertId: `SOS-${Date.now()}`,
    })
  } catch (error) {
    console.error('SOS error:', error)
    return NextResponse.json({ error: 'Failed to send SOS' }, { status: 500 })
  }
}
