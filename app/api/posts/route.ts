import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Post from '@/models/Post'
import User from '@/models/User'

export async function GET() {
  try {
    await connectDB()
    const posts = await Post.find().sort({ createdAt: -1 }).limit(20)
    return NextResponse.json({ posts })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('POST /api/posts received:', JSON.stringify(body))

    const { content, category, authorEmail, images } = body

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    await connectDB()

    let authorName = 'Anonymous'
    let authorId = null

    if (authorEmail) {
      const user = await User.findOne({ email: authorEmail })
      if (user) {
        authorName = user.name
        authorId = user._id
      }
    }

    console.log('Creating post with images:', images)

    const post = await Post.create({
      author: authorId,
      authorName,
      content,
      images: images && images.length > 0 ? images : [],
      category: category || 'Care moment',
    })

    console.log('Post created:', JSON.stringify(post))

    return NextResponse.json({ success: true, post }, { status: 201 })
  } catch (error) {
    console.error('Post error:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
