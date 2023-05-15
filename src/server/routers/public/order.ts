import { router, procedure } from "@/server/trpc"
import { billOutSchema, createOrderSchema, deleteCouponCodeSchema, getCouponCodeSchema, getOrderSchema, getVoucherCodeSchema } from "@/server/schema/public/order";
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
       const isValid = await ctx.prisma.discount.findUnique({
            where: {
                code: input.code,
            }
       })
        if(!isValid || ["Expired","Used"].includes(isValid.status) 
        || isValid.used >= isValid.quantity
        || (isValid.validFrom && new Date() < isValid?.validFrom)
        || (isValid.validUntil && new Date() > isValid?.validUntil)){
            throw new Error("Invalid Code")
        } 
        const redeemCode = await ctx.prisma.discount.update({
            where: {
                code: input.code,
            },
            data: {
                used: {
                    increment: 1,
                }
            }
        })
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
        await ctx.prisma.discount.update({
            where: {
                code: input.code,
            },
            data: {
                used: {
                    decrement: 1,
                }
            }
        })
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
    getVoucherCode: procedure.input(getVoucherCodeSchema).query(async ({ctx,input}) => {
        const voucherCode =  await ctx.prisma.discount.findMany({
            where: {
                registrant: {
                    name: {
                        in: input.stallNames,
                    }
                },
                status: "Active",
            },
            include: {
                registrant: {
                    select: {
                        name: true,
                    }
                }
            },
            orderBy: {
                registrant: {
                    name: "asc",
                }
            }
        })
        return voucherCode.filter((value) => {
            if(value.validFrom !== null && new Date() < value.validFrom){
                return false
            }
            if(value.validUntil !== null && new Date() > value.validUntil){
                return false
            }
            if(value.used >= value.quantity){
                return false
            }
            return true
        })
    })
})