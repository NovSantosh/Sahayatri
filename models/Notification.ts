import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  senderName: { type: String, required: true },
  type: { type: String, enum: ['like', 'comment'], required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  postContent: { type: String },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Notification || mongoose.model('Notification', NotificationSchema)
