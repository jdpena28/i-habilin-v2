import * as yup from "yup";

export const getAllOrderSchema = yup.object({
  id: yup.string().trim().required("Slug is required"),
  status: yup.string().trim().required("Status is required"),
});
