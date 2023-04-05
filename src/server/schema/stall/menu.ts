import * as yup from "yup";
import { media } from "..";

export const createCategorySchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .max(80, "Name is too long"),
  slug: yup
    .string()
    .trim()
    .required("Slug is required")
    .max(100, "Slug is too long")
    .default(""),
  registrantId: yup.string().required("Registrant ID is required").default("0"),
  order: yup.number().required("Order is required").default(0),
  icon: yup.lazy((value) => {
    if (typeof value === "string" && value.length > 0) {
      return yup.string().trim().required("Icon is required");
    }
    if (typeof value === "object") {
      return media;
    }
    return yup
      .string()
      .trim()
      .required("Please select on either of this two options.");
  }),
});

export type CreateCategorySchema = yup.InferType<typeof createCategorySchema>;

export const getAllCategorySchema = yup.object().shape({
  registrantId: yup.string().required("Registrant ID is required"),
});

export const updateCategorySchema = yup
  .array()
  .of(yup.string())
  .required("Category is required");
