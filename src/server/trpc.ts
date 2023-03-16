/* eslint-disable no-unused-vars */
import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { type Context } from "./context";

export const { router, procedure, middleware } = initTRPC
  .context<Context>()
  .create({
    transformer: superjson,
    errorFormatter({ shape }) {
      return shape;
    },
  });

const isAuthed = middleware(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = procedure.use(isAuthed);
