import NextAuth, { type NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { JWT } from "next-auth/jwt";
import { decrypt } from "@/client/lib/bcrypt";
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
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.person
          ? `${user.person.firstName} ${user.person.lastName}`
          : `${user.registrant.name} - SUPER ADMIN`;
        token.slug = user.registrant ? user.registrant.slug : "super-admin";
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
        // eslint-disable-next-line no-unused-expressions
        session.user
          ? (session.user.name = token.name)
          : (session.user = { name: token.name });
        session.user.email = token.slug as unknown as string;
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
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "johndoe@gmail.com",
        },
        password: { label: "Password", type: "password" },
        loginFrom: { label: "Login From", type: "hidden" },
      },
      async authorize(credentials) {
        const user = await prisma.account.findUnique({
          where: { email: credentials?.email },
          include: {
            person: true,
            registrant: true,
          },
        });
        if (
          !user ||
          (credentials?.loginFrom === "Super Admin" &&
            user.registrantId !== null) ||
          (credentials?.loginFrom !== "Super Admin" &&
            user.registrant?.slug !== credentials?.loginFrom)
        ) {
          throw new Error("No account found");
        }
        const password = credentials?.password ? credentials?.password : "";
        const userPassword = user.password ? user.password : "";
        const isValid = await decrypt(password, userPassword);
        if (isValid === false) {
          throw new Error("Invalid password");
        }
        return user;
      },
    }),
  ],
};

export default NextAuth(authOptions);
