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

export const getAllCategorySchema = yup.object({
    slug: yup.string().trim().required("Slug is required"),
})

export const createSurveySchema = yup.object({
    name: yup.string().trim().optional(),
    sex: yup.string().oneOf(["Male", "Female"], "Invalid Option").required("Sex is required"),
    age: yup.string().oneOf(["17 and Below","18-24", "25-34", "35-44", "45-54", "55-64", "65 and Above"], "Invalid Option").required("Age is required"),
    price_preference: yup.string().required("Price preference is required"),
    food_preference: yup.array(yup.string()).required("Food preference is required").min(1, "Food preference is required").typeError("Food preference is required"),
    cuisine_preference: yup.array(yup.string()).required("Cuisine preference is required").min(1, "Cuisine preference is required").typeError("Cuisine preference is required"),
    spiciness: yup.string().required("Spiciness is required"),
    cooked_preference: yup.array(yup.string()).required("Food cook preference is required").min(1, "Food cook preference is required").typeError("Food cook preference is required"),
    food_allergy: yup.string().trim().optional(),
})

export type CreateSurveySchema = yup.InferType<typeof createSurveySchema>

export const generateRecommendationSchema = yup.object({
    customerId: yup.string().trim().required("Customer ID is required"),
    slug: yup.string().trim().required("Slug is required"),
})

