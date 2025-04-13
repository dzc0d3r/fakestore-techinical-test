import type { DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    sessionToken: JWT | null;
    user: User & DefaultSession["user"];
  }

  interface User {
    role: string | null;
    token: string | undefined;
    username: string | null;
  }
}
