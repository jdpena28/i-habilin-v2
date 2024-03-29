import * as yup from "yup";

export const getRegistrantSchema = yup.object({
  id: yup.string().optional(),
  slug: yup.string().optional(),
});

export const getAllRegistrantSchema = yup.object({
  status: yup.string().optional(),
  orderBy: yup.string().optional(),
  search: yup.string().optional(),
});

export const deleteRegistrantSchema = yup.object({
  id: yup.lazy((value) => {
    if (Array.isArray(value)) {
      return yup.array().of(yup.string().required("The ID is required"));
    }
    return yup.string().required("The ID is required");
  }),
});

export const updateRegistrantSchema = yup.object({
  status: yup
    .string()
    .required("The status is required")
    .oneOf(["Active", "Pending", "Expired", "Denied"], "Invalid Option"),
  id: yup.string().required("The ID is required"),
  slug: yup.string().trim().required("The slug is required"),
  email: yup.string().email("Invalid email").required("The email is required"),
  name: yup.string().required("The name is required"),
  reason: yup.string().when("status", ([status], schema) => {
    if (status === "Denied") {
      return schema.required("The reason is required");
    }
    return schema;
  }),
});

export type UpdateRegistrantSchema = yup.InferType<
  typeof updateRegistrantSchema
>;
