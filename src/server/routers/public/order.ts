import { router, procedure } from "@/server/trpc"
import { billOutSchema, createOrderSchema, deleteCouponCodeSchema, getCouponCodeSchema, getOrderSchema } from "@/server/schema/public/order";
import { groupBy, chain, mapValues } from "lodash";
import { sendEmail } from "@/server/lib/SendInBlue";
import { formatDate } from "@/client/lib/TextFormatter";
import ReceiptEmailTemplate, { CustomerOrderType } from "@/server/lib/EmailTemplate/receipt";

export const orderRouter = router({
    createOrder: procedure.input(createOrderSchema).mutation(async ({ctx,input}) => {
        const batchNo = Math.random().toString(36).slice(-8)
        let isTableNumberExist = await ctx.prisma.tableOrder.findFirst({
            where: {
                tableNumber: input.tableNumber,
                AND: {
                    status: "Ordered"
                }
            },
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
        })
        return isTableNumberExist
    }),
    getOrder: procedure.input(getOrderSchema).query(async ({ctx,input}) => {
        const orders = await ctx.prisma.order.findMany({
            where: {
                tableOrder: {
                    id: input.id,
                }
            },
            orderBy: {
                createdAt: "asc"
            },
            include: {
                menu: {
                    select: {
                        category: {
                            select: {
                                registrant: {
                                    select: {
                                        name: true,
                                        slug: true,
                                    }
                                }
                            }
                        },
                        media: {
                            select: {
                                cdnUrl: true,
                            }
                        },
                        total: true,
                        name: true,
                    }
                },
                tableOrder: {
                    select: {
                        id: true,
                        tableNumber: true,
                        status: true,
                    }
                }
            }
        })
        const tableOrder = await ctx.prisma.tableOrder.findUnique({
            where: {
                id: input.id,
            },
            include: {
                discount: {
                    select: {
                        code: true,
                        discount: true,
                        registrant: {
                            select: {
                                name: true,
                            }
                        }
                    }
                }
            }
        })
        const data = groupBy(orders, "menu.category.registrant.name")
        
        const result = mapValues(data, (value) => {
            return chain(value)
                .groupBy("status")
                .map((value, key) => {
                   const addQuantity = chain(value)
                        .groupBy("menuId")
                        .map((value) => {
                            return {
                                ...value[0],
                                id: value.map((value) => value.id),
                                quantity: value.reduce((a, b) => a + b.quantity, 0),
                            }
                        })
                        .value()
                    return {
                        status: key,
                        data: addQuantity,
                    }
                })
                .value()
        })
        return {
            id: orders ? orders[0].tableOrder.id : null,
            tableNumber: orders ? orders[0].tableOrder.tableNumber : null,
            status: orders ? orders[0].tableOrder.status : null,
            tableOrder: tableOrder,
            data: result
        }
    }),
    billOut: procedure.input(billOutSchema).mutation(async ({ctx,input}) => {
        const updateToBillOutEachOrder = await ctx.prisma.order.updateMany({
            where: {
                id: {
                    in: input.menuIds,
                }
            },
            data: {
                status: "Bill Out",
            }
        })
        sendEmail.sendTransacEmail({
            to: [{"email":`${input.email}`,"name":`${input.email}`}],
            subject: `Order Receipt - ${formatDate(new Date())}`,
            sender: {"email":"noreply@ihabilin.tech","name":"I-Habilin"},
            htmlContent: ReceiptEmailTemplate(input.orderData as CustomerOrderType)
          })
        return await ctx.prisma.tableOrder.update({
            where: {
                id: input.id,
            },
            data: {
                status: "Bill Out",
                email: input.email,
                total: input.total,
            }
        })
    }),
    redeemCode:procedure.input(getCouponCodeSchema).mutation(async ({ctx,input}) => {
       let redeemCode
        try {
            redeemCode = await ctx.prisma.discount.update({
                where: {
                    code: input.code,
                },
                data: {
                    used: {
                        increment: 1,
                    }
                }
            })
        } catch (error) {
            throw new Error("Invalid Code")
        }
        if(["Expired","Used"].includes(redeemCode.status) || redeemCode.used > redeemCode.quantity 
        || (redeemCode.validUntil && new Date() > redeemCode?.validUntil)){ 
            throw new Error("Invalid Code")
        }
        await ctx.prisma.tableOrder.update({
            where: {
                id: input.orderId,
            },
            data: {
                discount: {
                    connect: { id: redeemCode.id },
                }
            }
        })
        return redeemCode
    }),
    deleteCode: procedure.input(deleteCouponCodeSchema).mutation(async ({ctx,input}) => {
        return await ctx.prisma.tableOrder.update({
            where: {
                id: input.orderId,
            },
            data: {
                discount: {
                    disconnect: true,
                }
            }
        })
    }),
})