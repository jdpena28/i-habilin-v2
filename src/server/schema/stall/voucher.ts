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
  validFrom: yup.string().optional(), // #TODO: validate date
  validUntil: yup
    .string()
    .optional()
    .test(
      "validUntilShouldBeGreaterThanValidFrom",
      "Date to must be greater than date from",
      function test(value) {
        const { validFrom } = this.parent;
        if (
          validFrom &&
          value &&
          validFrom !== "Invalid Date" &&
          value !== "Invalid Date"
        ) {
          return new Date(value) > new Date(validFrom);
        }
        return true;
      }
    ),
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
    status: yup.string().optional(),
  })
  .required();

export type CreateVoucherSchema = yup.InferType<typeof createVoucherSchema>;

export const deleteVoucherSchema = yup.object().shape({
  ids: yup
    .array()
    .of(yup.string().required("ID is required"))
    .required("IDs is required"),
});

export const updateVoucherSchema = createVoucherSchema.shape({
  id: yup.string().required("ID is required"),
});

export type UpdateVoucherSchema = yup.InferType<typeof updateVoucherSchema>;
