
import type { User, Session, NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt"
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {login} from "api";



const authOptions = {
  pages: {
    signIn: '/login'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { token } = await login({
            username: credentials.username as string,
            password: credentials.password as string
          });
          const data = { token };
          if (!data.token) {
            return null;
          }
          const user: User = {
            token: data.token,
            username: credentials.username as string,
            role: credentials.username === "mor_2314" ? "admin" : "user"
          };
          return user;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, account, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.role = user.role
        token.username = user.username
      }
      return token
    },
    session({ session, token }: { session: Session, token: JWT }) {
      session.user = { ...session.user, role: token.role as string, username: token.username as string }
      return session
    },
  }
} satisfies NextAuthConfig
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
