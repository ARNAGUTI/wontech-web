import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { isDevelopmentEnvironment } from '@/lib/constants';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'guest',
      name: 'Guest Login',
      credentials: {},
      async authorize(credentials, req) {
        // Devuelve un usuario de prueba
        return {
          id: 'guest',
          name: 'Guest User',
        };
      },
    }),
    // Aquí puedes añadir otros providers si los necesitas
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login', // Puedes personalizar esta ruta o quitarla
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
        };
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: !isDevelopmentEnvironment,
      },
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
