import * as yup from "yup";
import { OPERATION_TYPE } from "@/client/constant";

const operationHours = yup.object({
  day: yup.string().required("Day is required"),
  startTime: yup.string().required("Start Time is required"),
  endTime: yup.string().required("End Time is required"),
});

export const createStallSettingsSchema = yup.object().shape({
  id: yup.string().optional(),
  type: yup
    .string()
    .required("Operation Type is required")
    .oneOf(OPERATION_TYPE.map((type) => type.text)),
  startTime: yup
    .string()
    .optional()
    .when("type", ([type], schema) => {
      if (type !== "Custom") {
        return schema.required("Start Time is required");
      }
      return schema;
    }),
  endTime: yup
    .string()
    .optional()
    .when("type", ([type], schema) => {
      if (type !== "Custom") {
        return schema.required("End Time is required");
      }
      return schema;
    }),
  days: yup
    .array()
    .of(yup.string())
    .when("type", ([type], schema) => {
      if (type === "Custom") {
        return schema
          .required("Please select a day")
          .min(1, "Please select a day");
      }
      return schema;
    })
    .typeError("Please select a day"),
  operationHours: yup
    .array()
    .of(operationHours.nullable())
    .when("type", ([type], schema) => {
      if (type === "Custom") {
        return schema
          .required("Operation Hours is required")
          .min(1, "Operation Hours is required");
      }
      return schema;
    }),
});

export type CreateStallSettingsSchema = yup.InferType<
  typeof createStallSettingsSchema
>;

export const getStallClosedSchema = yup.object().shape({
  id: yup.string().required("ID is required"),
  isClosed: yup.boolean().optional(),
});

export const createQrCodeSchema = yup.object().shape({
  id: yup.string().optional(),
  registrantId: yup.string().required("Registrant ID is required"),
  tableNumber: yup
    .number()
    .required("Table Number is required")
    .min(1, "Table Number must be greater than 0")
    .typeError("Table Number is required"),
  type: yup
    .string()
    .required("Type is required")
    .oneOf(["QR-Code", "Forgot-Password"])
    .default("QR-Code"),
});

export type CreateQrCodeSchema = yup.InferType<typeof createQrCodeSchema>;

export const getQRCodeSchema = yup.object().shape({
  registrantId: yup.string().optional(),
  orderBy: yup.string().optional(),
  search: yup.string().optional(),
});

export const getQRCodeByIdSchema = yup.object().shape({
  id: yup.string().required("ID is required"),
});

export const deleteQRCodeSchema = yup.object().shape({
  id: yup
    .array()
    .of(yup.string().required("ID is required"))
    .required("ID is required")
    .min(1, "ID is required"),
});
