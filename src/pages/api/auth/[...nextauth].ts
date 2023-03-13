import NextAuth, { type NextAuthOptions, DefaultSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { JWT } from "next-auth/jwt";
import { prisma } from "../../../server/prisma";

export type extendDefaultSession = DefaultSession & {
  id?: string | unknown;
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: extendDefaultSession;
      token: JWT;
    }) {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
    // eslint-disable-next-line no-unused-vars
    async signIn({ user, credentials }) {
      if (user) {
        return true;
      }
      throw new Error("User not found");
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [],
};

export default NextAuth(authOptions);
