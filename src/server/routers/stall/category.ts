import {
  createCategorySchema,
  createMenuSchema,
  getAllCategorySchema,
  getAllMenuSchema,
  updateCategorySchema,
  updateMenuSchema,
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
            ...omit(input, ["registrantId"]),
            icon: input.icon as string,
            registrant: {
              connect: {
                id: input.registrantId,
              },
            },
            order: input.order,
          },
        });
      }
      return await ctx.prisma.category.create({
        data: {
          ...omit(input, ["icon", "registrantId"]),
          order: input.order,
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
  updateCategory: protectedProcedure
    .input(updateCategorySchema)
    .mutation(async ({ ctx, input }) => {
      return await Promise.all(
        input.map(async (category, index) => {
          return await ctx.prisma.category.update({
            where: {
              id: category,
            },
            data: {
              order: index,
            },
          });
        })
      );
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
        orderBy: {
          order: "asc",
        },
      });
    }),
  createMenu: protectedProcedure
    .input(createMenuSchema)
    .mutation(async ({ ctx, input }) => {
      const orderNo = await ctx.prisma.menu.count({
        where: {
          categoryId: input.categoryId,
        },
      });
      input.order = orderNo + 1;
      return await ctx.prisma.menu.create({
        data: {
          ...omit(input, ["categoryId", "media"]),
          category: {
            connect: {
              id: input.categoryId,
            },
          },
          media: {
            create: {
              ...input.media,
            },
          },
        },
      });
    }),
  updateMenu: protectedProcedure
    .input(updateMenuSchema)
    .mutation(async ({ ctx, input }) => {
      return await Promise.all(
        input.map(async (category, index) => {
          return await ctx.prisma.menu.update({
            where: {
              id: category,
            },
            data: {
              order: index,
            },
          });
        })
      );
    }),
  getAllMenu: protectedProcedure
    .input(getAllMenuSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.menu.findMany({
        where: {
          categoryId: input.categoryId,
        },
        include: {
          media: {
            select: {
              cdnUrl: true,
            },
          },
        },
        orderBy: {
          order: "asc",
        },
      });
    }),
});
