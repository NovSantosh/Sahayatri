import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Notification from '@/models/Notification'
import User from '@/models/User'

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email')
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })
    await connectDB()
    const user = await User.findOne({ email })
    if (!user) return NextResponse.json({ notifications: [] })
    const notifications = await Notification.find({ recipient: user._id })
      .sort({ createdAt: -1 })
      .limit(30)
    return NextResponse.json({ notifications })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })
    await connectDB()
    const user = await User.findOne({ email })
    if (!user) return NextResponse.json({ success: false })
    await Notification.updateMany({ recipient: user._id, read: false }, { read: true })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
