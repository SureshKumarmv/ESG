import { z } from "zod"
import { Units } from "../enum/Units.enum"

export const stationaryDefra = z.object({
    activity: z
        .string({ invalid_type_error: "Activity is required as string" })
        .trim()
        .optional()
        .nullable(),
    fuel: z
        .string({ required_error: "Fuel is required", invalid_type_error: "Fuel is required" })
        .trim()
        .min(1, { message: "Fuel is required" }),
    unit: z.enum([Units.KWhGrossCV, Units.KWhNetCV, Units.Litres, Units.Tonnes], {
        message: `Unit can be one of the following values ${(Units.KWhGrossCV, Units.KWhNetCV, Units.Litres, Units.Tonnes)}`,
    }),
    year: z
        .number({
            invalid_type_error: "Year is not a number",
            required_error: "Year is required",
        })
        .nonnegative({ message: "Year must be a postive number" }),
    consumed_amount: z
        .number({
            invalid_type_error: "Consumed amount is not a number",
            required_error: "Consumed amount is required",
        })
        .nonnegative({ message: "Consumed amount must be a postive number" }),
})
