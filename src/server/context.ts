/* eslint-disable camelcase */
import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getServerSession } from "next-auth";
import { type GetServerSidePropsContext } from "next";
import { prisma } from "./prisma";
import {
  authOptions,
  extendDefaultSession,
} from "../pages/api/auth/[...nextauth]";

type CreateContextOptions = {
  session: extendDefaultSession | null;
};

export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return await getServerSession(ctx.req, ctx.res, authOptions);
};

export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    prisma,
    session: opts.session,
  };
};

export const createContext = async (
  opts: GetServerSidePropsContext | CreateNextContextOptions
) => {
  const { req, res } = opts;
  const session = await getServerAuthSession({ req, res });
  return await createContextInner({ session });
};

export type Context = inferAsyncReturnType<typeof createContext>;
