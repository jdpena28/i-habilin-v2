import { encrypt } from "@/client/lib/bcrypt";
import { createSuperAdminPassword } from "@/server/schema/public";
import { router, protectedProcedure } from "@/server/trpc";

export const settingsRouter = router({
  createSuperAdminPassword: protectedProcedure
    .input(createSuperAdminPassword)
    .mutation(async ({ ctx, input }) => {
      const hashPassword = await encrypt(input.password);
      return await ctx.prisma.App_Meta.update({
        where: {
          key: "ADMIN_PASSWORD",
        },
        data: {
          value: hashPassword,
        },
      });
    }),
});
