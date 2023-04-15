import { router } from "@/server/trpc";
import { categoryRouter } from "./category";
import { userRouter } from "./user";

export const stallRouter = router({
  menu: categoryRouter,
  user: userRouter,
});
