import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import Post from '@/models/Post'

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get('q')
    if (!query || query.trim().length < 2) {
      return NextResponse.json({ users: [], posts: [] })
    }

    await connectDB()

    const regex = new RegExp(query, 'i')

    const users = await User.find({
      $or: [
        { name: regex },
        { location: regex },
        { role: regex },
      ]
    }).select('-password').limit(10)

    const posts = await Post.find({
      content: regex
    }).sort({ createdAt: -1 }).limit(10)

    return NextResponse.json({ users, posts })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
