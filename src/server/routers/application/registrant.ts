import { router, protectedProcedure } from "@/server/trpc";
import {
  getRegistrantSchema,
  getAllRegistrantSchema,
  updateRegistrantSchema,
  deleteRegistrantSchema,
} from "@/server/schema/application/registrant";
import { INCLUDED_ADDRESS } from "@/client/constant";
import { sendEmail } from "@/server/lib/SendInBlue";
import { encrypt } from "@/client/lib/bcrypt";
import { Prisma } from "@prisma/client";

const includedQuery = {
  owner: INCLUDED_ADDRESS,
  representative: INCLUDED_ADDRESS,
  dtiPermit: true,
  bussinessPermit: true,
  sanitaryPermit: true,
  logo: true,
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
};

export const registrantRouter = router({
  getRegistrant: protectedProcedure
    .input(getRegistrantSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.registrants.findUnique({
        where: {
          id: input.id,
          slug: input.slug,
        },
        include: includedQuery,
      });
    }),
  getAllRegistrant: protectedProcedure
    .input(getAllRegistrantSchema)
    .query(async ({ ctx, input }) => {
      type OrderByType = {
        [key: string]: "asc" | "desc";
      };
      type WhereQueryType = Prisma.RegistrantsWhereInput & {
        name?: {
          search: string;
        };
        email?: {
          search: string;
        };
      };
      let orderByQuery: OrderByType = {
        createdAt: "asc",
      };
      let whereQuery: WhereQueryType = {
        status: input.status,
      };
      if (input.orderBy) {
        const splice = input.orderBy.split("_");
        orderByQuery = {
          [splice[0]]: splice[1] ? (splice[1] as "asc" | "desc") : "asc",
        };
      }
      if (input.search) {
        const [search] = input.search.split("@");
        whereQuery = {
          ...whereQuery,
          name: {
            search,
          },
          email: {
            search,
          },
        };
      }
      return await ctx.prisma.registrants.findMany({
        include: includedQuery,
        where: whereQuery,
        orderBy: orderByQuery,
      });
    }),
  updateRegistrant: protectedProcedure
    .input(updateRegistrantSchema)
    .mutation(async ({ ctx, input }) => {
      const isExist = await ctx.prisma.registrants.findUnique({
        where: {
          slug: input.slug,
        },
      });
      if (isExist && input.slug !== isExist.slug) {
        throw new Error("Slug is already taken");
      }
      if (input.status !== "Pending") {
        const password = Math.random().toString(36).slice(-8);
        if (input.status === "Active") {
          const isAccountExist = await ctx.prisma.account.count({
            where: {
              registrantId: input.id,
            },
          });
          if (isAccountExist === 0) {
            await ctx.prisma.account.create({
              data: {
                email: input.email,
                password: await encrypt(password),
                registrantId: input.id,
              },
            });
          }
        }
        sendEmail.sendTransacEmail({
          to: [{ email: `${input.email}`, name: `${input.name}}` }],
          subject: `Your application has been ${input.status}`,
          templateId: 2,
          params: {
            name: `${input.name}`,
            status: `${input.status}`,
            reason: `${input.reason}`,
            registrant: {
              url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/${input.slug}/auth/login`,
              email: `${input.email}`,
              password: `${password}`,
            },
          },
        });
      }
      return await ctx.prisma.registrants.update({
        where: {
          id: input.id,
        },
        data: {
          status: input.status,
          approvedDate: input.status === "Active" ? new Date() : null,
          slug: input.slug,
        },
      });
    }),
  deleteRegistrant: protectedProcedure
    .input(deleteRegistrantSchema)
    .mutation(async ({ ctx, input }) => {
      if (Array.isArray(input.id)) {
        const hasAnAccount = await ctx.prisma.account.findMany({
          where: {
            registrantId: {
              in: input.id,
            },
          },
        });
        if (hasAnAccount.length > 0) {
          const ids = hasAnAccount.map((item) => {
            if (item.registrantId) {
              return item.registrantId;
            }
            return undefined;
          });
          await ctx.prisma.account.deleteMany({
            where: {
              registrantId: {
                in: ids as string[],
              },
            },
          });
        }
        return await ctx.prisma.registrants.deleteMany({
          where: {
            id: {
              in: input.id,
            },
          },
        });
      }
      const hasAnAccount = await ctx.prisma.account.findUnique({
        where: {
          registrantId: input.id,
        },
        include: {
          registrant: true,
        },
      });
      if (hasAnAccount) {
        await ctx.prisma.account.delete({
          where: {
            registrantId: input.id,
          },
        });
      }
      return await ctx.prisma.registrants.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
