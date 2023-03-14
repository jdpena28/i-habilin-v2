import { router } from "../trpc";

import { addressRouter } from "./address";

export const appRouter = router({
  address: addressRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
