import { router } from "@/server/trpc";
import { registrantRouter } from "./registrant";
import { settingsRouter } from "./settings";

export const applicationRouter = router({
  registrant: registrantRouter,
  settings: settingsRouter,
});
