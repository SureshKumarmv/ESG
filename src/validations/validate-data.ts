import { z } from "zod"
import { Status } from "../enum/status.enum"

export const validateData = z.object({
    data: z.array(z.string().trim().min(1)).min(1),
    status: z.enum([Status.COMPLETED, Status.DRAFT, Status.PENDING, Status.REJECTED]),
})

export const addRemarksValidation = z.object({
    remark: z.string().trim().min(1, { message: "Remark is required" }),
})
