import { z } from "zod"
import { address, media, person } from ".."

export const createRegistrantSchema = z.object({
    registrant: z.object({
        name: z.string().trim().min(1, "Name is required"),
        contactNo: z.string().min(1, "Contact number is required").regex(/^(09|\+639)\d{9}$/, "Invalid contact number"),
        email: z.string().trim().min(1, "Email is required").email(),
        address: address,
        logo: media,
    }),
    dtiPermit: media,
    sanitaryPermit: media,
    businessPermit: media,
    owner: person,
    representative: person,
})

export type CreateRegistrantSchema = z.infer<typeof createRegistrantSchema>


export const createAccountSchema = z.object({
    email: z.string().trim().min(1, "Email is required").email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
    person: person,
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"]
      });
    }
  });
export type CreateAccountSchema = z.infer<typeof createAccountSchema>

