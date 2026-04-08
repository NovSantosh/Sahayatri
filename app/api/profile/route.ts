import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import Post from '@/models/Post'

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email')
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })
    await connectDB()
    const user = await User.findOne({ email }).select('-password')
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 })
    return NextResponse.json({ user, posts })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}
