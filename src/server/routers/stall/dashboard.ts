/* eslint-disable no-underscore-dangle */
import { getDashboardCountSchema } from "@/server/schema/stall/dashboard";
import { protectedProcedure, router } from "@/server/trpc";

export const dashboardRouter = router({
  getDashboardCount: protectedProcedure
    .input(getDashboardCountSchema)
    .query(async ({ ctx, input }) => {
      // #region Total Sales
      const totalStallOrders = await ctx.prisma.order.groupBy({
        by: ["menuId"],
        where: {
          menu: {
            category: {
              registrantId: input.registrantId,
            },
          },
          tableOrder: {
            status: "Bill Out",
          },
        },
        _sum: {
          quantity: true,
        },
      });
      const allMenuId = totalStallOrders.map((order) => order.menuId);
      const findAllMenu = await ctx.prisma.menu.findMany({
        where: {
          id: {
            in: allMenuId,
          },
        },
        select: {
          id: true,
          total: true,
        },
      });
      const totalSales = totalStallOrders.reduce((acc, order) => {
        const menu = findAllMenu.find((i) => i.id === order.menuId);
        if (menu && order._sum.quantity) {
          return acc + (menu.total as unknown as number) * order._sum.quantity;
        }
        return acc;
      }, 0);

      const totalStallOrdersToday = await ctx.prisma.order.groupBy({
        by: ["menuId"],
        where: {
          menu: {
            category: {
              registrantId: input.registrantId,
            },
          },
          tableOrder: {
            status: "Bill Out",
          },
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
        _sum: {
          quantity: true,
        },
      });

      const allMenuIdToday = totalStallOrdersToday.map((order) => order.menuId);
      const findAllMenuToday = await ctx.prisma.menu.findMany({
        where: {
          id: {
            in: allMenuIdToday,
          },
        },
      });
      const totalSalesToday = totalStallOrdersToday.reduce((acc, order) => {
        const menu = findAllMenuToday.find((i) => i.id === order.menuId);
        if (menu && order._sum.quantity) {
          return acc + (menu.total as unknown as number) * order._sum.quantity;
        }
        return acc;
      }, 0);

      const totalStallOrdersYesterday = await ctx.prisma.order.groupBy({
        by: ["menuId"],
        where: {
          menu: {
            category: {
              registrantId: input.registrantId,
            },
          },
          tableOrder: {
            status: "Bill Out",
          },
          createdAt: {
            lt: new Date(new Date().setHours(0, 0, 0, 0)),
            gte: new Date(
              new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000
            ),
          },
        },
        _sum: {
          quantity: true,
        },
      });
      const allMenuIdYesterday = totalStallOrdersYesterday.map(
        (order) => order.menuId
      );
      const findAllMenuYesterday = await ctx.prisma.menu.findMany({
        where: {
          id: {
            in: allMenuIdYesterday,
          },
        },
      });
      const totalSalesYesterday = totalStallOrdersYesterday.reduce(
        (acc, order) => {
          const menu = findAllMenuYesterday.find((i) => i.id === order.menuId);
          if (menu && order._sum.quantity) {
            return (
              acc + (menu.total as unknown as number) * order._sum.quantity
            );
          }
          return acc;
        },
        0
      );
      const totalTrendSales = totalSalesToday - totalSalesYesterday;
      // #endregion
      // #region Total Orders
      const totalOrders = await ctx.prisma.order.aggregate({
        _sum: {
          quantity: true,
        },
        where: {
          menu: {
            category: {
              registrantId: input.registrantId,
            },
          },
          status: {
            not: "Cancelled",
          },
        },
      });
      const totalOrdersToday = await ctx.prisma.order.aggregate({
        _sum: {
          quantity: true,
        },
        where: {
          menu: {
            category: {
              registrantId: input.registrantId,
            },
          },
          status: {
            not: "Cancelled",
          },
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      });
      const totalOrdersYesterday = await ctx.prisma.order.aggregate({
        _sum: {
          quantity: true,
        },
        where: {
          menu: {
            category: {
              registrantId: input.registrantId,
            },
          },
          status: {
            not: "Cancelled",
          },
          createdAt: {
            lt: new Date(new Date().setHours(0, 0, 0, 0)),
            gte: new Date(
              new Date().setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000
            ),
          },
        },
      });
      const totalTrendOrders =
        (totalOrdersToday._sum.quantity ?? 0) -
        (totalOrdersYesterday._sum.quantity ?? 0);
      // #endregion
      const surveyResponses = await ctx.prisma.customer.count();
      return {
        totalSales,
        totalTrendSales,
        totalOrders,
        totalTrendOrders,
        surveyResponses,
      };
    }),
});
