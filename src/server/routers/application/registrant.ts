import { router, protectedProcedure } from "@/server/trpc";
import { getRegistrantSchema } from "@/server/schema/application/registrant";
import { INCLUDED_ADDRESS } from "@/client/constant";

export const registrantRouter = router({
  getRegistrant: protectedProcedure
    .input(getRegistrantSchema)
    .query(async ({ ctx, input }) => {
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
      if (input?.id || input?.slug) {
        const registrant = await ctx.prisma.registrants.findUnique({
          where: {
            id: input.id,
            slug: input.slug,
          },
          include: includedQuery,
        });
        if (!registrant) {
          throw new Error("Registrant not found");
        }
        return registrant;
      }
      return await ctx.prisma.registrants.findMany({
        include: includedQuery,
      });
    }),
});
