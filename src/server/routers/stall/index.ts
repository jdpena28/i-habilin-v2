import { router } from "@/server/trpc";
import { categoryRouter } from "./category";
import { userRouter } from "./user";
import { orderRouter } from "./order";

export const stallRouter = router({
  menu: categoryRouter,
  user: userRouter,
  order: orderRouter,
});
