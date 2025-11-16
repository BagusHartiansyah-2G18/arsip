// 
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET || "OnXPkQzh9xy3a6SS8RAO4F0PbmwvXKTM3HZLD0wZrlI=";
const handler = NextAuth({
  secret,
  session: { strategy: "jwt" },
  jwt: {
    encryption: false, // pastikan tidak diaktifkan kalau tidak perlu
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) { 
       
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        } 
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        }); 
        
        if (!user) {
          throw new Error('No user found with this email');
        } 
        const isValid = await bcrypt.compare(credentials.password, user.pass);
        if (!isValid) {
          throw new Error('Invalid password');
        }

        return { id: user.id, name: user.name, email: user.email, level: user.level };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) { 
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.level = user.level;
      }
      return token;
    },
    async session({ session, token }) { 
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.level = token.level;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login', // bisa tampilkan pesan error di halaman login
  },
});

export { handler as GET, handler as POST };