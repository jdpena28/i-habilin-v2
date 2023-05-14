import { router, protectedProcedure } from "@/server/trpc";
import {
  createVoucherSchema,
  deleteVoucherSchema,
  getAllVoucherSchema,
  updateVoucherSchema,
} from "@/server/schema/stall/voucher";
import { omit } from "lodash";

export const voucherRouter = router({
  createVoucher: protectedProcedure
    .input(createVoucherSchema)
    .mutation(async ({ ctx, input }) => {
      const isExisting = await ctx.prisma.discount.findUnique({
        where: {
          code: input.code,
        },
      });
      if (isExisting) {
        throw new Error("Code already taken");
      }
      return await ctx.prisma.discount.create({
        data: {
          ...omit(input, ["registrantId"]),
          validUntil:
            input.validUntil && input.validFrom
              ? new Date(input.validUntil)
              : null,
          validFrom:
            input.validFrom && input.validUntil
              ? new Date(input.validFrom)
              : null,
          registrant: {
            connect: {
              id: input.registrantId,
            },
          },
        },
      });
    }),
  getAllVoucher: protectedProcedure
    .input(getAllVoucherSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.discount.findMany({
        where: {
          registrantId: input.registrantId,
          status: input.status,
        },
      });
    }),
  deleteVoucher: protectedProcedure
    .input(deleteVoucherSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.discount.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),
  updateVoucher: protectedProcedure
    .input(updateVoucherSchema)
    .mutation(async ({ ctx, input }) => {
      const isExisting = await ctx.prisma.discount.findUnique({
        where: {
          code: input.code,
        },
      });
      if (isExisting && isExisting.code !== input.code) {
        throw new Error("Code already taken");
      }
      return await ctx.prisma.discount.update({
        where: {
          id: input.id,
        },
        data: {
          ...omit(input, ["registrantId", "id"]),
          validUntil:
            input.validUntil && input.validFrom
              ? new Date(input.validUntil)
              : null,
          validFrom:
            input.validFrom && input.validFrom
              ? new Date(input.validFrom)
              : null,
        },
      });
    }),
});
