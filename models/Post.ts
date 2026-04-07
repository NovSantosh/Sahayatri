import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  authorName: { type: String, required: true },
  authorRole: { type: String, default: 'FAMILY' },
  content: { type: String, required: true },
  category: { type: String, enum: ['Care moment', 'Service story', 'Community'], default: 'Care moment' },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Post || mongoose.model('Post', PostSchema)
