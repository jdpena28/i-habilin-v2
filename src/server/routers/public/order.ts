import { router, procedure } from "@/server/trpc"
import { createOrderSchema } from "@/server/schema/public/order";


export const orderRouter = router({
    createOrder: procedure.input(createOrderSchema).mutation(async ({ctx,input}) => {
        const batchNo = Math.random().toString(36).slice(-8)
        let isTableNumberExist = await ctx.prisma.tableOrder.findUnique({
            where: { tableNumber: input.tableNumber },
        })
        if (!isTableNumberExist) {
            isTableNumberExist = await ctx.prisma.tableOrder.create({
                data: {
                    tableNumber: input.tableNumber,
                },
            })
        }
         input.orders.map(async (order) => {
             await ctx.prisma.order.create({
                data: {
                    quantity: order.quantity,
                    batchNo,
                    customer: {
                        connect: { id: input.customerId },
                    },
                    menu: {
                        connect: { id: order.menuId },
                    },
                    tableOrder: {
                        connect: { id: isTableNumberExist?.id },
                    }
                }
            })
            return isTableNumberExist
        })
    }),
})