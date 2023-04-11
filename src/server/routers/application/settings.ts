import * as yup from "yup";
import { encrypt } from "@/client/lib/bcrypt";
import { createSuperAdminPassword } from "@/server/schema/public";
import { router, protectedProcedure, procedure } from "@/server/trpc";

const maintenanceMode = yup.object({
  value: yup.boolean().required("Value is required"),
});
const getAppMetaSchema = yup.object({
  key: yup.string().trim().required("Key is required"),
});

export const settingsRouter = router({
  getAppMeta: procedure
    .input(getAppMetaSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.app_Meta.findUnique({
        where: {
          key: input.key,
        },
      });
    }),
  createSuperAdminPassword: protectedProcedure
    .input(createSuperAdminPassword)
    .mutation(async ({ ctx, input }) => {
      const hashPassword = await encrypt(input.password);
      return await ctx.prisma.app_Meta.update({
        where: {
          key: "ADMIN_PASSWORD",
        },
        data: {
          value: hashPassword,
        },
      });
    }),
  isMaintenanceMode: protectedProcedure
    .input(maintenanceMode)
    .mutation(async ({ ctx, input }) => {
      const isExist = await ctx.prisma.app_Meta.findUnique({
        where: {
          key: "MAINTENANCE_MODE",
        },
      });
      if (!isExist) {
        return await ctx.prisma.app_Meta.create({
          data: {
            key: "MAINTENANCE_MODE",
            value: String(input.value),
          },
        });
      }
      return await ctx.prisma.app_Meta.update({
        where: {
          key: "MAINTENANCE_MODE",
        },
        data: {
          value: String(input.value),
        },
      });
    }),
});
