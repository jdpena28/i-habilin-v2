import { router } from "@/server/trpc";
import { categoryRouter } from "./category";

export const stallRouter = router({
  category: categoryRouter,
});
