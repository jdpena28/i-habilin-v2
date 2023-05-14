import { router } from "@/server/trpc";
import { registrantRouter } from "./registrant";
import { settingsRouter } from "./settings";
import { userRouter } from "./user";
import { dashboardRouter } from "./dashboard";

export const applicationRouter = router({
  registrant: registrantRouter,
  settings: settingsRouter,
  user: userRouter,
  dashboard: dashboardRouter,
});
