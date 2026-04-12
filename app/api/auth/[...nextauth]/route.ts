import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        await connectDB()
        const user = await User.findOne({ email: credentials.email })
        if (!user) return null
        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) return null

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          // Everyone starts as family
          companionEnabled: user.companionProfile?.enabled || false,
          companionAgreementSigned: user.companionProfile?.agreementSigned || false,
          companionDocsUploaded: user.companionProfile?.docsUploaded || false,
          companionVerified: user.companionProfile?.verificationStatus === 'verified',
        }
      }
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id
        token.companionEnabled = (user as any).companionEnabled || false
        token.companionAgreementSigned = (user as any).companionAgreementSigned || false
        token.companionDocsUploaded = (user as any).companionDocsUploaded || false
        token.companionVerified = (user as any).companionVerified || false
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id
        ;(session.user as any).companionEnabled = token.companionEnabled || false
        ;(session.user as any).companionAgreementSigned = token.companionAgreementSigned || false
        ;(session.user as any).companionDocsUploaded = token.companionDocsUploaded || false
        ;(session.user as any).companionVerified = token.companionVerified || false
      }
      return session
    }
  },
  pages: { signIn: '/login' },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
