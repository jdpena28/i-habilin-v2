import * as yup from "yup"
import { address, media, person } from ".."

export const createRegistrantSchema = yup.object({
    registrant: yup.object({
        name: yup.string().trim().required("Name is required"),
        slug: yup.string().trim().default(""),
        contactNo: yup.string().required("Contact number is required").matches(/^(09|\+639)\d{9}$/, "Invalid contact number"),
        email: yup.string().trim().required("Email is required").email(),
        address: address,
        logo: media.required("Logo is required"),
    }),
    dtiPermit: media,
    sanitaryPermit: media,
    businessPermit: media,
    owner: person,
    representative: person,
})

export type CreateRegistrantSchema = yup.InferType<typeof createRegistrantSchema>


export const createAccountSchema = yup.object({
    email: yup.string().trim().required("Email is required").email(),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: yup.string().required("Confirm password is required").test("passwords-match", "The passwords did not match", function (value) {
        return this.parent.password === value;
    }),
    person: person,
})

export type CreateAccountSchema = yup.InferType<typeof createAccountSchema>

export const getSuperAdminPassword = yup.object({
    password: yup.string().required("Password is required").trim(),
})
export type GetSuperAdminPassword = yup.InferType<typeof getSuperAdminPassword>

export const createSuperAdminPassword = yup.object({
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  confirmPassword: yup.string().required("Confirm Password is required").test("passwords-match", "The passwords did not match", function (value) {
    return this.parent.password === value;
  })
})

export type CreateSuperAdminPassword = yup.InferType<typeof createSuperAdminPassword>

export const getAccountSchema = yup.object({
    email: yup.string().trim().required("Email is required").email(),
    password: yup.string().required("Password is required"),
})

export type GetAccountSchema = yup.InferType<typeof getAccountSchema>

