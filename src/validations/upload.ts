import { z } from "zod"

export const fileUploadValidationSchema = z.object({
    filename: z
        .string({ required_error: "Filename is required" })
        .min(1, { message: "Filename is required" }),
})
