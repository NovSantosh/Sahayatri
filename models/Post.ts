import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  authorName: { type: String, required: true },
  authorEmail: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const PostSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  authorName: { type: String, required: true },
  authorEmail: { type: String },
  authorRole: { type: String, default: 'FAMILY' },
  content: { type: String, required: true },
  images: { type: [String], default: [] },
  category: { type: String, enum: ['Care moment', 'Service story', 'Community'], default: 'Care moment' },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: { type: [CommentSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Post || mongoose.model('Post', PostSchema)
