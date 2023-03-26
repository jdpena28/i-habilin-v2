import * as yup from "yup";

export const getRegistrantSchema = yup.object({
  id: yup.string().optional(),
  slug: yup.string().optional(),
});

export const updateRegistrantSchema = yup.object({
  status: yup
    .string()
    .required("The status is required")
    .oneOf(["Active", "Pending", "Expired"], "Invalid Option"),
  id: yup.string().required("The ID is required"),
  slug: yup.string().trim().required("The slug is required"),
});

export type UpdateRegistrantSchema = yup.InferType<
  typeof updateRegistrantSchema
>;
