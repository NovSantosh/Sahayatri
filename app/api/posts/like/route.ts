import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Post from '@/models/Post'
import User from '@/models/User'
import Notification from '@/models/Notification'

export async function POST(req: NextRequest) {
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
    const alreadyLiked = post.likedBy.includes(user._id)
    if (alreadyLiked) {
      post.likedBy = post.likedBy.filter((id: any) => id.toString() !== user._id.toString())
      post.likes = Math.max(0, post.likes - 1)
    } else {
      post.likedBy.push(user._id)
      post.likes = post.likes + 1
      if (post.author && post.author.toString() !== user._id.toString()) {
        await Notification.create({
          recipient: post.author,
          sender: user._id,
          senderName: user.name,
          type: 'like',
          postId: post._id,
          postContent: post.content?.slice(0, 60),
        })
      }
    }
    await post.save()
    return NextResponse.json({ success: true, likes: post.likes, liked: !alreadyLiked })
  } catch (error) {
    console.error('Like error:', error)
    return NextResponse.json({ error: 'Failed to like' }, { status: 500 })
  }
}
