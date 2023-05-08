import { createStallSettingsSchema } from "@/server/schema/stall/settings";
import { router, protectedProcedure } from "@/server/trpc";

export const settingsRouter = router({
  operationHours: protectedProcedure
    .input(createStallSettingsSchema)
    .mutation(async () => {
      return true;
    }),
});
