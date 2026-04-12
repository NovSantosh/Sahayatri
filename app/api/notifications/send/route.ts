import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Notification from '@/models/Notification'
import User from '@/models/User'

export async function POST(req: NextRequest) {
  try {
    const { toEmail, title, body, type, data } = await req.json()
    if (!toEmail || !title || !body) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await connectDB()
    const user = await User.findOne({ email: toEmail })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    // Save notification to DB
    await Notification.create({
      user: user._id,
      title,
      body,
      type: type || 'general',
      data: data || {},
      read: false,
      createdAt: new Date(),
    })

    // In production: send push via Firebase Cloud Messaging or similar
    // For now we just save to DB and return success
    console.log(`📬 Notification sent to ${toEmail}: ${title}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Notification error:', error)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }
}
