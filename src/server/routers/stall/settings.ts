import {
  createStallSettingsSchema,
  getStallClosedSchema,
} from "@/server/schema/stall/settings";
import { router, protectedProcedure } from "@/server/trpc";

export const settingsRouter = router({
  getStallOperationTime: protectedProcedure
    .input(getStallClosedSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.registrants.findUnique({
        where: {
          id: input.id,
        },
        select: {
          isClosed: true,
          operatingHours: true,
        },
      });
    }),
  updateStallClosed: protectedProcedure
    .input(getStallClosedSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.registrants.update({
        where: {
          id: input.id,
        },
        data: {
          isClosed: Boolean(input.isClosed),
        },
        select: {
          isClosed: true,
        },
      });
    }),
  operationHours: protectedProcedure
    .input(createStallSettingsSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.registrants.update({
        where: {
          id: input.id,
        },
        data: {
          operatingHours: JSON.stringify({
            type: input.type,
            startTime: input.startTime,
            endTime: input.endTime,
            days: input.days,
            operationHours: input.operationHours,
          }),
        },
      });
    }),
});
