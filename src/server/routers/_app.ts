import { router } from "../trpc";

import { addressRouter } from "./address";
import { registerRouter } from "./public";
import { applicationRouter } from "./application";
import { stallRouter } from "./stall";

export const appRouter = router({
  address: addressRouter,
  public: registerRouter,
  application: applicationRouter,
  stall: stallRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
