/* eslint-disable camelcase */
import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type Session, getServerSession } from "next-auth";
import { type GetServerSidePropsContext } from "next";
import { prisma } from "./prisma";
import { authOptions } from "../pages/api/auth/[...nextauth]";

interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
  session: Session | null;
}

export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return await getServerSession(ctx.req, ctx.res, authOptions);
};

export const createContextInner = async (opts: CreateInnerContextOptions) => {
  return {
    prisma,
    session: opts.session,
  };
};

export const createContext = async (
  opts?: GetServerSidePropsContext | CreateNextContextOptions
) => {
  if (!opts) {
    return await createContextInner({ session: null });
  }
  const { req, res } = opts;
  const session = await getServerAuthSession({ req, res });
  return await createContextInner({ session });
};

export type Context = inferAsyncReturnType<typeof createContext>;
