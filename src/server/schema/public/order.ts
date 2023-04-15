import * as yup from "yup"

export const createOrderSchema = yup.object({
    tableNumber: yup.number().required("Table number is required"),
    customerId: yup.string().required("Customer ID is required"),
    orders: yup.array(yup.object({
     quantity: yup.number().required("Quantity is required"),
     menuId: yup.string().required("Menu ID is required"),
    }).required("Orders is required")).required("Orders is required"),
})

export type CreateOrderSchema = yup.InferType<typeof createOrderSchema>