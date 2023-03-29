import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";
import { createContext } from "../context";
import { appRouter } from "../routers/_app";

export const ssgHelper = createProxySSGHelpers({
  router: appRouter,
  ctx: await createContext(),
  transformer: superjson,
});
