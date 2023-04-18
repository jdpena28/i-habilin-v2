import { deleteRegistrantSchema } from "@/server/schema/application/registrant";
import {
  getAllUserSchema,
  getUserSchema,
} from "@/server/schema/application/user";
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
  getAllUser: protectedProcedure
    .input(getAllUserSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.account.findMany({
        where: {
          registrantId: input?.registrantId ? input.registrantId : null,
          NOT: {
            personId: null,
          },
        },
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
  deleteUser: protectedProcedure
    .input(deleteRegistrantSchema)
    .mutation(async ({ ctx, input }) => {
      if (Array.isArray(input.id)) {
        return await ctx.prisma.account.deleteMany({
          where: {
            id: {
              in: input.id,
            },
          },
        });
      }
      const account = await ctx.prisma.account.delete({
        where: {
          id: input.id,
        },
      });
      const person = await ctx.prisma.person.delete({
        where: {
          id: account.personId as string,
        },
      });
      const address = await ctx.prisma.address.delete({
        where: {
          id: person.addressId as string,
        },
      });
      return {
        account,
        person,
        address,
      };
    }),
});
