import {
  createQrCodeSchema,
  createStallSettingsSchema,
  deleteQRCodeSchema,
  getQRCodeByIdSchema,
  getQRCodeSchema,
  getStallClosedSchema,
} from "@/server/schema/stall/settings";
import { router, protectedProcedure, procedure } from "@/server/trpc";
import { Key } from "@prisma/client";

type KeyType = Key & { registrant: { slug: string } };

export const settingsRouter = router({
  getStallOperationTime: protectedProcedure
    .input(getStallClosedSchema)
    .query(async ({ ctx, input }) => {
      const registrant = await ctx.prisma.registrants.findUnique({
        where: {
          id: input.id,
        },
      });
      return registrant;
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
  createQRCode: protectedProcedure
    .input(createQrCodeSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.key.create({
        data: input,
      });
    }),
  getAllQRCode: protectedProcedure
    .input(getQRCodeSchema)
    .query(async ({ ctx, input }) => {
      const key = (await ctx.prisma.key.findMany({
        where: {
          registrantId: input.registrantId,
        },
        include: {
          registrant: {
            select: {
              slug: true,
            },
          },
        },
      })) as unknown as KeyType[];
      return key;
    }),
  getQRCode: procedure
    .input(getQRCodeByIdSchema)
    .query(async ({ ctx, input }) => {
      return (await ctx.prisma.key.findUnique({
        where: {
          id: input.id,
        },
      })) as unknown as Key;
    }),
  deleteQRCode: protectedProcedure
    .input(deleteQRCodeSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.key.deleteMany({
        where: {
          id: {
            in: input.id,
          },
        },
      });
    }),
  updateQRCode: protectedProcedure
    .input(createQrCodeSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.key.update({
        where: {
          id: input.id,
        },
        data: {
          tableNumber: input.tableNumber,
        },
      });
    }),
});
