/* eslint-disable no-underscore-dangle */
import { protectedProcedure, router } from "@/server/trpc";

export const dashboardRouter = router({
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
    const denied = await ctx.prisma.registrants.count({
      where: {
        status: "Denied",
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
      denied,
      expired,
    };
  }),
  getTotalSales: protectedProcedure.query(async ({ ctx }) => {
    const overallTotalSales = await ctx.prisma.tableOrder.aggregate({
      _sum: {
        total: true,
      },
      where: {
        status: "Bill Out",
      },
    });
    const totalSalesYesterday = await ctx.prisma.tableOrder.aggregate({
      _sum: {
        total: true,
      },
      where: {
        status: "Bill Out",
        createdAt: {
          lt: new Date(new Date().setHours(0, 0, 0, 0)),
          gte: new Date(new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000),
        },
      },
    });
    const totalSalesToday = await ctx.prisma.tableOrder.aggregate({
      _sum: {
        total: true,
      },
      where: {
        status: "Bill Out",
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });
    const totalTrendSales =
      (totalSalesToday._sum.total as unknown as number) -
      (totalSalesYesterday._sum.total as unknown as number);
    return {
      overallTotalSales,
      totalTrendSales,
    };
  }),
  getWeeklySales: protectedProcedure.query(async ({ ctx }) => {
    const findTotalSales = async (dayCount: number) => {
      const totalStallOrders = await ctx.prisma.tableOrder.aggregate({
        _sum: {
          total: true,
        },
        where: {
          status: "Bill Out",
          createdAt: {
            lt: new Date(
              new Date().setHours(24, 0, 0, 0) - dayCount * 24 * 60 * 60 * 1000
            ),
            gte: new Date(
              new Date().setHours(0, 0, 0, 0) - dayCount * 24 * 60 * 60 * 1000
            ),
          },
        },
      });
      const totalSales = totalStallOrders._sum.total as unknown as number;
      return {
        day: dayCount,
        totalSales,
      };
    };
    return Promise.all([
      findTotalSales(6),
      findTotalSales(5),
      findTotalSales(4),
      findTotalSales(3),
      findTotalSales(2),
      findTotalSales(1),
      findTotalSales(0),
    ]);
  }),
});
