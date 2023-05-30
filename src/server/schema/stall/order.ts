/* eslint-disable func-names */
import * as yup from "yup";

export const getAllOrderSchema = yup.object({
  id: yup.string().trim().required("Slug is required"),
  status: yup.string().trim().required("Status is required"),
  orderBy: yup
    .string()
    .trim()
    .optional()
    .oneOf([
      "Order Time",
      "Order Time (Asc.)",
      "Order Time (Desc.)",
      "Table No",
      "Preparation Time",
    ]),
});

export const getOrderSchema = yup.object({
  id: yup.string().trim().required("Slug is required"),
  status: yup.string().trim().required("Status is required"),
  stallId: yup.string().trim().required("StallId is required"),
});

export const deleteOrderSchema = yup.object({
  id: yup.array(yup.string().required()).min(1, "Id is required"),
});

export const updateOrderById = yup.object({
  id: yup.string().trim().required("Id is required"),
  quantity: yup.number().required("Quantity is required"),
  status: yup.string().trim().required("Status is required"),
  name: yup.string().trim().required("Name is required"),
});

export type UpdateOrderById = yup.InferType<typeof updateOrderById>;

export const updateOrders = yup.object({
  id: yup.array(yup.string().required()).min(1, "Id is required"),
  status: yup.string().trim().required("Status is required"),
  cashTendered: yup
    .number()
    .optional()
    .nullable()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .when("status", {
      is: "Completed",
      then: () =>
        yup
          .number()
          .required("Cash tendered is required")
          .min(1, "Cash tendered must be greater than 0")
          .typeError("Cash tendered is required"),
    }),
});

export type UpdateOrders = yup.InferType<typeof updateOrders>;

export const createTransactionSchema = yup.object({
  cashTendered: yup
    .number()
    .required("Cash tendered is required")
    .min(1, "Cash tendered must be greater than 0")
    .typeError("Cash tendered is required"),
  total: yup
    .number()
    .required("Total is required")
    .min(1, "Total must be greater than 0")
    .typeError("Total is required"),
  tableOrderId: yup.string().required("Table order id is required"),
  registrantId: yup.string().required("Registrant id is required"),
  accountId: yup.string().required("Account id is required"),
});

export const createOrderSchema = yup.object({
  tableNumber: yup
    .number()
    .required("Table number is required")
    .min(1, "Table number must be greater than 0")
    .typeError("Table number is required"),
  orders: yup
    .array(
      yup
        .object({
          quantity: yup
            .number()
            .required("Quantity is required")
            .min(1, "Quantity must be greater than 0")
            .typeError("Quantity is required"),
          menuId: yup.string().required("Menu is required"),
        })
        .required()
    )
    .required("Order is required")
    .min(1, "Order is required"),
});

export type CreateOrderSchema = yup.InferType<typeof createOrderSchema>;
