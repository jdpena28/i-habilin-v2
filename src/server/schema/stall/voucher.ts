import * as yup from "yup";

export const createVoucherSchema = yup.object().shape({
  registrantId: yup.string().required("Registrant ID is required"),
  code: yup
    .string()
    .trim()
    .required("Code is required")
    .max(255, "Code must not exceed 255 characters"),
  discount: yup
    .number()
    .required("Discount is required")
    .min(1, "Discount must be greater than 0")
    .typeError("Discount is required"),
  status: yup
    .string()
    .required("Status is required")
    .oneOf(["Active", "Expired", "Used"], "Invalid Option"),
  validUntil: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .optional(),
  quantity: yup
    .number()
    .required("Quantity is required")
    .min(1, "Quantity must be greater than 0")
    .typeError("Quantity is required"),
});

export const getAllVoucherSchema = yup
  .object()
  .shape({
    registrantId: yup.string().required("Registrant ID is required"),
  })
  .required();

export type CreateVoucherSchema = yup.InferType<typeof createVoucherSchema>;
