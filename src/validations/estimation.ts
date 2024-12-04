import { z } from "zod"
export const estimationSchema = z.object({
    equipment: z.string(),
    area: z.number(),
    year: z.number(),
    unit: z.enum(["meter", "kilometer", "mile", "yard", "feet", "inch", "squareFeet", "hectare"]), // w
    method: z.number(),
    name: z.string(),
})
