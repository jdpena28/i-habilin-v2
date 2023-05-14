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
