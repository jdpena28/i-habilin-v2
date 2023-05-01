/* eslint-disable no-underscore-dangle */
import { getDashboardCountSchema } from "@/server/schema/stall/dashboard";
import { protectedProcedure, router } from "@/server/trpc";
import { Prisma } from "@prisma/client";

export type ReturnAgeGroupItemsType = Prisma.PickArray<
  Prisma.OrderGroupByOutputType,
  "menuId"[]
> & {
  _sum: {
    quantity: number | null;
  };
  name?: string;
};

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
  getAgeGroupOrderCount: protectedProcedure
    .input(getDashboardCountSchema)
    .query(async ({ ctx, input }) => {
      const findMenu = async (menuId: string[]) => {
        return await ctx.prisma.menu.findMany({
          where: {
            id: {
              in: menuId,
            },
          },
          select: {
            id: true,
            name: true,
          },
        });
      };
      // #region 17 - Below
      let data17Below = await ctx.prisma.order.groupBy({
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
          customer: {
            ageGroup: "17 and Below",
          },
        },
        _sum: {
          quantity: true,
        },
        orderBy: {
          _sum: {
            quantity: "desc",
          },
        },
        take: 5,
      });
      const findMenuFor17Below = await findMenu(
        data17Below.map((i) => i.menuId)
      );
      data17Below = data17Below.map((i) => {
        const menu = findMenuFor17Below.find((j) => j.id === i.menuId);
        return {
          ...i,
          name: menu?.name,
        };
      });
      // #endregion
      // #region 18 - 24
      let data18to24 = await ctx.prisma.order.groupBy({
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
          customer: {
            ageGroup: "18-24",
          },
        },
        _sum: {
          quantity: true,
        },
        orderBy: {
          _sum: {
            quantity: "desc",
          },
        },
        take: 5,
      });
      const findMenuFor18to24 = await findMenu(data18to24.map((i) => i.menuId));
      data18to24 = data18to24.map((i) => {
        const menu = findMenuFor18to24.find((j) => j.id === i.menuId);
        return {
          ...i,
          name: menu?.name,
        };
      });
      // #endregion
      // #region 25 - 34
      let data25to34 = await ctx.prisma.order.groupBy({
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
          customer: {
            ageGroup: "25-34",
          },
        },
        _sum: {
          quantity: true,
        },
        orderBy: {
          _sum: {
            quantity: "desc",
          },
        },
        take: 5,
      });
      const findMenuFor25to34 = await findMenu(data25to34.map((i) => i.menuId));
      data25to34 = data25to34.map((i) => {
        const menu = findMenuFor25to34.find((j) => j.id === i.menuId);
        return {
          ...i,
          name: menu?.name,
        };
      });
      // #endregion
      // #region 35 - 44
      let data35to44 = await ctx.prisma.order.groupBy({
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
          customer: {
            ageGroup: "35-44",
          },
        },
        _sum: {
          quantity: true,
        },
        orderBy: {
          _sum: {
            quantity: "desc",
          },
        },
        take: 5,
      });
      const findMenuFor35to44 = await findMenu(data35to44.map((i) => i.menuId));
      data35to44 = data35to44.map((i) => {
        const menu = findMenuFor35to44.find((j) => j.id === i.menuId);
        return {
          ...i,
          name: menu?.name,
        };
      });
      // #endregion
      // #region 45 - 54
      let data45to54 = await ctx.prisma.order.groupBy({
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
          customer: {
            ageGroup: "45-54",
          },
        },
        _sum: {
          quantity: true,
        },
        orderBy: {
          _sum: {
            quantity: "desc",
          },
        },
        take: 5,
      });
      const findMenuFor45to54 = await findMenu(data45to54.map((i) => i.menuId));
      data45to54 = data45to54.map((i) => {
        const menu = findMenuFor45to54.find((j) => j.id === i.menuId);
        return {
          ...i,
          name: menu?.name,
        };
      });
      // #endregion
      // #region 55 - 64
      let data55to64 = await ctx.prisma.order.groupBy({
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
          customer: {
            ageGroup: "55-64",
          },
        },
        _sum: {
          quantity: true,
        },
        orderBy: {
          _sum: {
            quantity: "desc",
          },
        },
        take: 5,
      });
      const findMenuFor55to64 = await findMenu(data55to64.map((i) => i.menuId));
      data55to64 = data55to64.map((i) => {
        const menu = findMenuFor55to64.find((j) => j.id === i.menuId);
        return {
          ...i,
          name: menu?.name,
        };
      });
      // #endregion
      // #region 65 - Aboce
      let data65Above = await ctx.prisma.order.groupBy({
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
          customer: {
            ageGroup: "65 and Above",
          },
        },
        _sum: {
          quantity: true,
        },
        orderBy: {
          _sum: {
            quantity: "desc",
          },
        },
        take: 5,
      });
      const findMenuFor65Above = await findMenu(
        data65Above.map((i) => i.menuId)
      );
      data65Above = data65Above.map((i) => {
        const menu = findMenuFor65Above.find((j) => j.id === i.menuId);
        return {
          ...i,
          name: menu?.name,
        };
      });
      // #endregion
      return {
        "17 an Below": data17Below,
        "18 - 24": data18to24,
        "25 - 34": data25to34,
        "35 - 44": data35to44,
        "45 - 44": data45to54,
        "55 - 64": data55to64,
        "65 - Above": data65Above,
      };
    }),
  getWeeklySales: protectedProcedure
    .input(getDashboardCountSchema)
    .query(async ({ ctx, input }) => {
      const findTotalSales = async (dayCount: number) => {
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
            createdAt: {
              lt: new Date(
                new Date().setHours(24, 0, 0, 0) -
                  dayCount * 24 * 60 * 60 * 1000
              ),
              gte: new Date(
                new Date().setHours(0, 0, 0, 0) - dayCount * 24 * 60 * 60 * 1000
              ),
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
            return (
              acc + (menu.total as unknown as number) * order._sum.quantity
            );
          }
          return acc;
        }, 0);
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
