import { router } from "@/server/trpc";
import { registrantRouter } from "./registrant";

export const applicationRouter = router({
  registrant: registrantRouter,
});
