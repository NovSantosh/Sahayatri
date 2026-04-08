import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Post from '@/models/Post'
import User from '@/models/User'

export async function POST(req: NextRequest) {
  try {
    const { postId, userEmail, text } = await req.json()
    if (!postId || !userEmail || !text) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }
    await connectDB()
    const user = await User.findOne({ email: userEmail })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    const post = await Post.findById(postId)
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    const comment = {
      authorName: user.name,
      authorEmail: user.email,
      text,
      createdAt: new Date(),
    }
    post.comments = post.comments || []
    post.comments.push(comment)
    await post.save()
    return NextResponse.json({ success: true, comment })
  } catch (error) {
    console.error('Comment error:', error)
    return NextResponse.json({ error: 'Failed to comment' }, { status: 500 })
  }
}
