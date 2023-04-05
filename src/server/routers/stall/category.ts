import {
  createCategorySchema,
  getAllCategorySchema,
} from "@/server/schema/stall/menu";
import { protectedProcedure, router } from "@/server/trpc";
import { omit } from "lodash";

export const categoryRouter = router({
  createCategory: protectedProcedure
    .input(createCategorySchema)
    .mutation(async ({ input, ctx }) => {
      const isExisting = await ctx.prisma.category.count({
        where: {
          name: input.name,
        },
      });
      if (isExisting > 0) {
        throw new Error("Category name is already taken");
      }

      if (typeof input.icon === "string") {
        return await ctx.prisma.category.create({
          data: {
            ...input,
            icon: input.icon as string,
          },
        });
      }
      return await ctx.prisma.category.create({
        data: {
          ...omit(input, ["icon", "registrantId"]),
          registrant: {
            connect: {
              id: input.registrantId,
            },
          },
          customIcon: {
            create: {
              name: input.icon.name,
              uuid: input.icon.uuid,
              size: input.icon.size,
              isImage: input.icon.isImage,
              cdnUrl: input.icon.cdnUrl,
              originalUrl: input.icon.originalUrl,
            },
          },
        },
      });
    }),
  getAllCategory: protectedProcedure
    .input(getAllCategorySchema)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.category.findMany({
        where: {
          registrantId: input.registrantId,
        },
        include: {
          customIcon: true,
        },
      });
    }),
});
