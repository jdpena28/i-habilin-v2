import { z } from "zod";
import { router, procedure } from "@/server/trpc";

const getCitiesSchema = z.object({
  prov_code: z.string().min(1, "The prov_code is required"),
});
const getBrgySchema = z.object({
  city_code: z.string().min(1, "The city_code is required"),
});

export const addressRouter = router({
  getProvinces: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.province.findMany({
      select: {
        prov_code: true,
        id: true,
        prov_name: true,
      },
      orderBy: {
        prov_name: "asc",
      },
    });
  }),
  getCities: procedure.input(getCitiesSchema).query(async ({ ctx, input }) => {
    return await ctx.prisma.city.findMany({
      where: {
        prov_code: input.prov_code,
      },
      select: {
        city_code: true,
        id: true,
        city_name: true,
      },
      orderBy: {
        city_name: "asc",
      },
    });
  }),
  getBrgy: procedure.input(getBrgySchema).query(async ({ ctx, input }) => {
    return await ctx.prisma.brgy.findMany({
      where: {
        city_code: input.city_code,
      },
      select: {
        id: true,
        brgy_loc: true,
      },
      orderBy: {
        brgy_loc: "asc",
      },
    });
  }),
});
