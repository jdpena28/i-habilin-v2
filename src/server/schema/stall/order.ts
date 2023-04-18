import * as yup from "yup";

export const getAllOrderSchema = yup.object({
  id: yup.string().trim().required("Slug is required"),
  status: yup.string().trim().required("Status is required"),
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
});

export type UpdateOrders = yup.InferType<typeof updateOrders>;
