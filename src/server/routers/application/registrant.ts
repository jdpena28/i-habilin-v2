import { router, protectedProcedure } from "@/server/trpc";
import {
  getRegistrantSchema,
  updateRegistrantSchema,
} from "@/server/schema/application/registrant";
import { INCLUDED_ADDRESS } from "@/client/constant";
import { sendEmail } from "@/server/lib/SendInBlue";

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
  getAllRegistrant: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.registrants.findMany({
      include: includedQuery,
    });
  }),
  getRegistrantCount: protectedProcedure.query(async ({ ctx }) => {
    const total = await ctx.prisma.registrants.count();
    const active = await ctx.prisma.registrants.count({
      where: {
        status: "Active",
      },
    });
    const pending = await ctx.prisma.registrants.count({
      where: {
        status: "Pending",
      },
    });
    const expired = await ctx.prisma.registrants.count({
      where: {
        status: "Expired",
      },
    });
    return {
      total,
      active,
      pending,
      expired,
    };
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
        sendEmail.sendTransacEmail({
          to: [{ email: `${input.email}`, name: `${input.name}}` }],
          subject: `Your application has been ${input.status}`,
          templateId: 2,
          params: {
            name: `${input.name}`,
            status: `${input.status}`,
            reason: `${input.reason}`,
            registrant: {
              url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/registrant/${input.slug}`,
              email: `${input.email}`,
              password: `test123`,
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
});
