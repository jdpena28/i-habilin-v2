import { router } from "@/server/trpc";
import { categoryRouter } from "./category";
import { userRouter } from "./user";
import { orderRouter } from "./order";
import { voucherRouter } from "./voucher";
import { dashboardRouter } from "./dashboard";
import { settingsRouter } from "./settings";

export const stallRouter = router({
  menu: categoryRouter,
  user: userRouter,
  order: orderRouter,
  voucher: voucherRouter,
  dashboard: dashboardRouter,
  settings: settingsRouter,
});
