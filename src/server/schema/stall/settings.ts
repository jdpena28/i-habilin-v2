import * as yup from "yup";
import { OPERATION_TYPE } from "@/client/constant";

const operationHours = yup.object({
  day: yup.string().required("Day is required"),
  startTime: yup.string().required("Start Time is required"),
  endTime: yup.string().required("End Time is required"),
});

export const createStallSettingsSchema = yup.object().shape({
  type: yup
    .string()
    .required("Operation Type is required")
    .oneOf(OPERATION_TYPE.map((type) => type.text)),
  startTime: yup.string().required("Start Time is required"),
  endTime: yup.string().required("End Time is required"),
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
    .of(operationHours)
    .when("type", ([type], schema) => {
      if (type === "Custom") {
        return schema
          .required("Operation Hours is required")
          .min(1, "Operation Hours is required");
      }
      return schema;
    }),
  reason: yup.string().when("status", ([status], schema) => {
    if (status === "Denied") {
      return schema.required("The reason is required");
    }
    return schema;
  }),
});

export type CreateStallSettingsSchema = yup.InferType<
  typeof createStallSettingsSchema
>;
