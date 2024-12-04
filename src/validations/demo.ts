import { z } from "zod"

export const bookDemoSchema = z.object({
    first_name: z.string().trim().min(1),
    last_name: z.string().trim().min(1),
    company: z.string().trim().min(1),
    email: z
        .string()
        .trim()
        .email()
        .transform((value) => value.toLowerCase()),
    designation: z.string().trim().min(1),
    phone_country_code: z.string().trim().min(1),
    phone_number: z.string().trim().min(1),
    guests: z.array(z.any()).optional().nullable(),
})
