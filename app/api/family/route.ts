import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Family from '@/models/Family'
import User from '@/models/User'

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email')
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })
    await connectDB()
    const user = await User.findOne({ email })
    if (!user) return NextResponse.json({ family: null })
    const family = await Family.findOne({ 'members.user': user._id })
    return NextResponse.json({ family })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { action, email, familyName, code } = await req.json()
    await connectDB()
    const user = await User.findOne({ email })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    if (action === 'create') {
      const existing = await Family.findOne({ 'members.user': user._id })
      if (existing) return NextResponse.json({ error: 'You are already in a family group' }, { status: 400 })
      const family = await Family.create({
        name: familyName || `${user.name.split(' ')[0]}'s Family`,
        code: generateCode(),
        admin: user._id,
        members: [{
          user: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar || '',
          role: user.role || 'FAMILY',
          lastActive: new Date(),
          status: 'online',
        }],
      })
      return NextResponse.json({ success: true, family })
    }

    if (action === 'join') {
      const family = await Family.findOne({ code: code.toUpperCase() })
      if (!family) return NextResponse.json({ error: 'Invalid family code' }, { status: 404 })
      const alreadyMember = family.members.some((m: any) => m.email === email)
      if (alreadyMember) return NextResponse.json({ error: 'You are already in this family' }, { status: 400 })
      family.members.push({
        user: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || '',
        role: user.role || 'FAMILY',
        lastActive: new Date(),
        status: 'online',
      })
      await family.save()
      return NextResponse.json({ success: true, family })
    }

    if (action === 'ping') {
      const family = await Family.findOne({ 'members.user': user._id })
      if (!family) return NextResponse.json({ success: false })
      const member = family.members.find((m: any) => m.email === email)
      if (member) {
        member.lastActive = new Date()
        member.status = 'online'
        await family.save()
      }
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Family error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
