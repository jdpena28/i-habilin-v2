import { z } from "zod";

const address = z.object({
  addressLine: z.string(),
  prov_code: z.string().min(1, "Province is required"),
  city_code: z.string().min(1, "City is required"),
  brgyId: z.number().optional(),
});

const media = z.object({
  name: z.string().min(1, "Logo Name is required"),
  uuid: z.string().min(1, "Media is required"),
  size: z.number().min(1, "Logo Size is required"),
  isImage: z.boolean(),
  cdnUrl: z.string().min(1, "Logo CDN URL is required"),
  originalUrl: z.string().min(1, "Logo Original URL is required"),
});
const person = z.object({
  firstName: z.string().trim().min(1, "First Name is required"),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, "Last Name is required"),
  contactNo: z
    .string()
    .min(1, "Contact number is required")
    .regex(/^(09|\+639)\d{9}$/, "Invalid contact number"),
  email: z.string().trim().min(1, "Email is required").email(),
  address,
});

export { address, media, person };
