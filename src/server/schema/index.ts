import * as yup from "yup";

const address = yup.object({
  addressLine: yup.string().optional(),
  prov_code: yup.string().required("Province is required"),
  city_code: yup.string().required("City is required"),
  brgyId: yup.number().optional(),
});

const media = yup.object({
  name: yup.string().required("Logo Name is required"),
  uuid: yup.string().required("Media is required"),
  size: yup.number().required("Logo Size is required"),
  isImage: yup.boolean().required("Logo isImage is required"),
  cdnUrl: yup.string().required("Logo CDN URL is required"),
  originalUrl: yup.string().required("Logo Original URL is required"),
});

const person = yup.object({
  firstName: yup.string().trim().required("First Name is required"),
  middleName: yup.string().trim().optional(),
  lastName: yup.string().trim().required("Last Name is required"),
  contactNo: yup
    .string()
    .required("Contact number is required")
    .matches(/^(09|\+639)\d{9}$/, "Invalid contact number"),
  email: yup.string().trim().required("Email is required").email(),
  address,
});

export { address, media, person };
