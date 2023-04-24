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

export const getOrderSchema = yup.object({
    id: yup.string().required("ID is required"),
})

export const billOutSchema = yup.object({
    id: yup.string().required("ID is required"),
    menuIds: yup.array(yup.string().required("Menu ID is required")).required("Menu IDs is required").min(1, "Menu IDs is required"),
    email: yup.string().required("Email is required").email("Invalid Email"),
    orderData: yup.object().optional(),
})

export type BillOutSchema = yup.InferType<typeof billOutSchema>

export const getCouponCodeSchema = yup.object({
    orderId: yup.string().required("Order ID is required"),
    code: yup.string().trim().required("Code is required"),
})

export const deleteCouponCodeSchema = yup.object({
    orderId: yup.string().required("Order ID is required"),
})