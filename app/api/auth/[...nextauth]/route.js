// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from '@/models/User';
import { connectToDB } from '@/lib/mongoose';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Invalid credentials');
          }

          // Ensure database connection
          await connectToDB();

          // Find user and explicitly select password field
          const user = await User.findOne({ email: credentials.email }).select('+password');

          if (!user || !user?.password) {
            throw new Error('Invalid credentials');
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isCorrectPassword) {
            throw new Error('Invalid credentials');
          }

          // Return user without password
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            profileImage: user.profileImage
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw new Error(error.message || 'Authentication failed');
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.profileImage = user.profileImage;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.profileImage = token.profileImage;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };