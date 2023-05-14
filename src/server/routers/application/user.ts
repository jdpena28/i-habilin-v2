import { deleteRegistrantSchema } from "@/server/schema/application/registrant";
import {
  getAllUserSchema,
  getUserSchema,
} from "@/server/schema/application/user";
import { router, protectedProcedure } from "@/server/trpc";
import { Prisma } from "@prisma/client";

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
      let orderByQuery:
        | {
            person: {
              firstName: "asc" | "desc";
            };
          }
        | undefined;
      let whereQuery: Prisma.AccountWhereInput | undefined = {
        registrantId: input?.registrantId ? input.registrantId : null,
        NOT: {
          personId: null,
        },
      };
      if (input?.orderBy) {
        const [, arr] = input.orderBy.split("_");
        orderByQuery = {
          person: {
            firstName: arr as "asc" | "desc",
          },
        };
      }
      if (input?.search) {
        whereQuery = {
          ...whereQuery,
          person: {
            firstName: {
              search: input.search,
            },
            lastName: {
              search: input.search,
            },
            middleName: {
              search: input.search,
            },
          },
        };
      }
      return await ctx.prisma.account.findMany({
        where: whereQuery,
        include: includedQuery,
        orderBy: orderByQuery,
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
