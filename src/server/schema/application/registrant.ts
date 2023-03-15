import { z } from "zod";

export const getRegistrantSchema = z
  .object({
    id: z.string().optional(),
    slug: z.string().optional(),
  })
  .optional();

export const editRegistrantSchema = z.object({
  status: z.string().min(1, "Status is required"),
});

export type EditRegistrantSchema = z.infer<typeof editRegistrantSchema>;
