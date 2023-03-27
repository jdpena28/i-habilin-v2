import { getUserSchema } from "@/server/schema/application/user";
import { router, protectedProcedure } from "@/server/trpc";

const includedQuery = {
  person: {
    select: {
      firstName: true,
      lastName: true,
      middleName: true,
      contactNo: true,
      email: true,
      address: {
        include: {
          Brgy: {
            select: {
              brgy_loc: true,
              id: true,
            },
          },
          city: {
            select: {
              city_name: true,
              city_code: true,
            },
          },
          province: {
            select: {
              prov_name: true,
              prov_code: true,
            },
          },
        },
      },
    },
  },
};

export const userRouter = router({
  getAllUser: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.account.findMany({
      include: includedQuery,
    });
  }),
  getUser: protectedProcedure
    .input(getUserSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.account.findUnique({
        where: {
          id: input.id,
        },
        include: includedQuery,
      });
    }),
});
