import { deleteMedia } from "@/client/lib/UploadCare";
import {
  createCategorySchema,
  createMenuSchema,
  deleteCategorySchema,
  deleteMenuSchema,
  getAllCategorySchema,
  getAllMenuSchema,
  updateCategorySortSchema,
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
          registrantId: input.registrantId,
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
    .input(createCategorySchema)
    .mutation(async ({ input, ctx }) => {
      const isExisting = await ctx.prisma.category.findFirst({
        where: {
          name: input.name,
          registrantId: input.registrantId,
        },
        include: {
          customIcon: true,
        },
      });
      const oldCategory = await ctx.prisma.category.findUnique({
        where: {
          id: input.id,
        },
        include: {
          customIcon: true,
        },
      });
      if (isExisting && oldCategory?.name !== input.name) {
        throw new Error("Category name is already taken");
      }
      if (typeof input.icon === "string") {
        const category = await ctx.prisma.category.update({
          where: {
            id: input.id,
          },
          data: {
            ...omit(input, ["icon", "registrantId"]),
            icon: input.icon as string,
            customIcon: {
              disconnect: true,
            },
          },
        });
        if (oldCategory?.customIconId) {
          deleteMedia(oldCategory.customIcon?.uuid);
          await ctx.prisma.media.delete({
            where: {
              id: oldCategory?.customIconId,
            },
          });
        }
        return category;
      }
      if (oldCategory?.customIconId) {
        return await ctx.prisma.category.update({
          where: {
            id: input.id,
          },
          data: {
            ...omit(input, ["icon", "registrantId"]),
            icon: null,
            customIcon: {
              update: {
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
      }
      return await ctx.prisma.category.update({
        where: {
          id: input.id,
        },
        data: {
          ...omit(input, ["icon", "registrantId"]),
          icon: null,
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
  deleteCategory: protectedProcedure
    .input(deleteCategorySchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.category.delete({
        where: {
          id: input.id,
        },
      });
    }),
  updateCategorySort: protectedProcedure
    .input(updateCategorySortSchema)
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
    .input(createMenuSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.menu.update({
        where: {
          id: input.id,
        },
        data: {
          ...omit(input, ["media", "categoryId"]),
          media: {
            update: {
              ...input.media,
            },
          },
        },
      });
    }),
  deleteMenu: protectedProcedure
    .input(deleteMenuSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.menu.delete({
        where: {
          id: input.id,
        },
      });
    }),
  updateMenuSort: protectedProcedure
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
      if (!input.categoryId && !input.stallId) return [];
      if (input.stallId) {
        return await ctx.prisma.menu.findMany({
          where: {
            category: {
              registrantId: input.stallId,
            },
          },
          include: {
            media: true,
          },
          orderBy: {
            name: "asc",
          },
        });
      }
      return await ctx.prisma.menu.findMany({
        where: {
          categoryId: input.categoryId,
        },
        include: {
          media: true,
        },
        orderBy: {
          order: "asc",
        },
      });
    }),
});
