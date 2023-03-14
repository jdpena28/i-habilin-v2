import { z } from "zod"
import { address, media, person } from ".."

export const createRegistrantSchema = z.object({
    registrant: z.object({
        name: z.string().trim().min(1, "Name is required"),
        contactNo: z.string().min(1, "Contact number is required").regex(/^(09|\+639)\d{9}$/, "Invalid contact number"),
        email: z.string().trim().email(),
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

