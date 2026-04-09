import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Post from '@/models/Post'
import User from '@/models/User'

export async function DELETE(req: NextRequest) {
  try {
    const { postId, userEmail } = await req.json()
    if (!postId || !userEmail) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }
    await connectDB()
    const user = await User.findOne({ email: userEmail })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    const post = await Post.findById(postId)
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    if (post.author.toString() !== user._id.toString()) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
    }
    await Post.findByIdAndDelete(postId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
