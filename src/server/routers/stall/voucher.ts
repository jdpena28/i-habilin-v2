import { router, protectedProcedure } from "@/server/trpc";
import {
  createVoucherSchema,
  getAllVoucherSchema,
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
        },
      });
    }),
});
