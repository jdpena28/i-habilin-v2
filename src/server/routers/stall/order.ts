import { groupBy, chain, mapValues } from "lodash";
import { getAllOrderSchema } from "@/server/schema/stall/order";
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
              id: value[0].id,
              orders: addQuantity,
            };
          })
          .value();
      });
      return result;
    }),
});
