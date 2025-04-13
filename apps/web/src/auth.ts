import { login } from "api";
import { jwtDecode } from "jwt-decode";
import type { NextAuthConfig, Session, User } from "next-auth";
import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const admins_id = [1, 10];

const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { token } = await login({
            username: credentials.username as string,
            password: credentials.password as string,
          });
          if (!token) {
            console.log("oops");
          }
          const decoded: any = jwtDecode(token as string);
          const user: User = {
            token: token,
            username: decoded?.user,
            role: admins_id.includes(decoded?.sub) ? "admin" : "user",
          };
          return user;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, account, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        ...session.user,
        role: token.role as string,
        username: token.username as string,
      };
      return session;
    },
  },
} satisfies NextAuthConfig;
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
