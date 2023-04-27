import * as yup from "yup";

export const getDashboardCountSchema = yup
  .object()
  .shape({
    registrantId: yup.string().required("Registrant ID is required"),
  })
  .required();
