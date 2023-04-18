import { groupBy, chain, mapValues } from "lodash";
import {
  getAllOrderSchema,
  getOrderSchema,
  deleteOrderSchema,
  updateOrderById,
  updateOrders,
} from "@/server/schema/stall/order";
import { protectedProcedure, router } from "@/server/trpc";

export const orderRouter = router({
  getAllOrders: protectedProcedure
    .input(getAllOrderSchema)
    .query(async ({ ctx, input }) => {
      const orders = await ctx.prisma.order.findMany({
        where: {
          menu: {
            category: {
              registrantId: input.id,
            },
          },
          status: input.status,
        },
        include: {
          tableOrder: {
            select: {
              id: true,
              tableNumber: true,
            },
          },
          menu: {
            select: {
              name: true,
            },
          },
        },
      });

      const groupByTableNumber = groupBy(orders, "tableOrder.tableNumber");
      const result = mapValues(groupByTableNumber, (value) => {
        return chain(value)
          .groupBy("status")
          .map((value1) => {
            const addQuantity = chain(value1)
              .groupBy("menuId")
              .map((value2) => {
                return {
                  menu: value2[0].menu,
                  quantity: value2.reduce((a, b) => a + b.quantity, 0),
                };
              })
              .value();
            return {
              id: value[0].tableId,
              orders: addQuantity,
            };
          })
          .value();
      });
      return result;
    }),
  getOrder: protectedProcedure
    .input(getOrderSchema)
    .query(async ({ ctx, input }) => {
      const tableNumber = await ctx.prisma.tableOrder.findUnique({
        where: {
          id: input.id,
        },
      });
      const order = await ctx.prisma.order.findMany({
        where: {
          tableId: input.id,
          status: input.status,
          menu: {
            category: {
              registrantId: input.stallId,
            },
          },
        },
        orderBy: {
          menu: {
            name: "asc",
          },
        },
        include: {
          menu: {
            select: {
              name: true,
            },
          },
        },
      });
      return {
        ...tableNumber,
        menu: order,
      };
    }),
  deleteOrder: protectedProcedure
    .input(deleteOrderSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.order.deleteMany({
        where: {
          id: {
            in: input.id,
          },
        },
      });
    }),
  updateOrderById: protectedProcedure
    .input(updateOrderById)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.order.update({
        where: {
          id: input.id,
        },
        data: {
          quantity: input.quantity,
          status: input.status,
        },
      });
    }),
  updateOrders: protectedProcedure
    .input(updateOrders)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.order.updateMany({
        where: {
          id: {
            in: input.id,
          },
        },
        data: {
          status: input.status,
        },
      });
    }),
});
