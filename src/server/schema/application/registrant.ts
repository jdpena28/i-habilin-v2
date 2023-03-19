import * as yup from "yup";

export const getRegistrantSchema = yup.object({
  id: yup.string().optional(),
  slug: yup.string().optional(),
});

export const editRegistrantSchema = yup.object({
  status: yup
    .string()
    .required("The status is required")
    .oneOf(["Active", "Pending", "Expired"], "Invalid Option"),
});

export type EditRegistrantSchema = yup.InferType<typeof editRegistrantSchema>;
