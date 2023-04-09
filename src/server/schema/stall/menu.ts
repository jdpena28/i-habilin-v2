import * as yup from "yup";
import { media } from "..";

export const createCategorySchema = yup.object().shape({
  id: yup.string().optional(),
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

export const updateCategorySortSchema = yup
  .array()
  .of(yup.string())
  .required("Category is required");

export const deleteCategorySchema = yup.object().shape({
  id: yup.string().required("Category ID is required"),
});

export const createMenuSchema = yup.object().shape({
  id: yup.string().optional(),
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .max(100, "Name is too long"),
  order: yup.number().required("Order is required").default(0),
  description: yup
    .string()
    .trim()
    .required("Description is required")
    .max(500, "Description is too long"),
  price: yup
    .number()
    .required("Price is required")
    .min(1, "Price must be greater than 0")
    .typeError("Price is required"),
  status: yup
    .string()
    .required("Status is required")
    .oneOf(
      ["Available", "Not Available"],
      "Status must be either Available or Not Available"
    ),
  featured: yup.boolean().required("Featured is required").default(false),
  discount: yup
    .number()
    .optional()
    .min(0, "Discount must be greater than 0")
    .max(100, "Discount must be less than 100")
    .typeError(""),
  total: yup
    .number()
    .required("Total is required")
    .min(1, "Total must be greater than 0")
    .typeError("Total is required"),
  categoryId: yup.string().optional(),
  media,
});
export type CreateMenuSchema = yup.InferType<typeof createMenuSchema>;

export const deleteMenuSchema = yup.object().shape({
  id: yup.string().required("Menu ID is required"),
});

export const getAllMenuSchema = yup.object().shape({
  categoryId: yup.string().required("Category ID is required"),
});

export const updateMenuSchema = yup
  .array()
  .of(yup.string())
  .required("Menu is required");
