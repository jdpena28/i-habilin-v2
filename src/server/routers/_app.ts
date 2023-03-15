import { router } from "../trpc";

import { addressRouter } from "./address";
import { registerRouter } from "./public";
import { applicationRouter } from "./application";

export const appRouter = router({
  address: addressRouter,
  public: registerRouter,
  application: applicationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
