import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phone: { type: String },
  avatar: { type: String },

  // Primary role is always family
  // companion mode is an addition
  role: {
    type: String,
    enum: ['family', 'companion', 'FAMILY', 'COMPANION', 'PROFESSIONAL'],
    default: 'family'
  },

  // Companion profile — added when they switch to companion mode
  companionProfile: {
    enabled: { type: Boolean, default: false },
    role: { type: String, default: '' }, // elder-care, home-cook, electrician etc
    experience: { type: String, default: '' },
    languages: [{ type: String }],
    bio: { type: String, default: '' },
    location: { type: String, default: '' },
    agreementSigned: { type: Boolean, default: false },
    agreementSignedAt: { type: Date },
    agreementName: { type: String },
    agreementCitizenshipNo: { type: String },
    docsUploaded: { type: Boolean, default: false },
    docsUploadedAt: { type: Date },
    uploadedDocs: [{ type: String }],
    verificationStatus: {
      type: String,
      enum: ['not_submitted', 'pending', 'verified', 'rejected'],
      default: 'not_submitted'
    },
    rating: { type: Number, default: 0 },
    totalJobs: { type: Number, default: 0 },
  },

  location: { type: String },
  bio: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
