import * as yup from "yup";

export const getUserSchema = yup.object({
  id: yup.string().optional(),
});
