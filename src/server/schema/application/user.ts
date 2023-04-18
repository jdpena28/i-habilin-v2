import * as yup from "yup";
import { createAccountSchema } from "../public";

export const getUserSchema = yup.object({
  id: yup.string().optional(),
});

export const getAllUserSchema = yup
  .object({
    registrantId: yup.string().optional(),
  })
  .optional();

export const createStallAccountSchema = createAccountSchema.shape({
  registrantId: yup.string().optional(),
});

export type CreateStallAccountSchema = yup.InferType<
  typeof createStallAccountSchema
>;
