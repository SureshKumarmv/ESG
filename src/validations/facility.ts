import { z } from "zod"
import { Role } from "../enum/role.enum"

export const createFacilityValidationSchema = z
    .object({
        parent: z.string().optional().nullable(),
        subsidiary: z.string().optional().nullable(),
        name: z.string().min(1).max(500),
        phone_country_code: z.string().min(1).max(500),
        phone: z.string().min(1).max(500),
        contact_person_email: z.string().email(),
        contact_person: z.string().min(1).max(500),
        type: z.string().min(1).max(500),
        calculate_esg: z.boolean().default(false),
        scopes: z.array(z.string()).nullable().optional(),
        country: z.string().max(255).nullable().optional(),
        state: z.string().max(255).nullable().optional(),
        address: z.string().max(255).nullable().optional(),
        address_line_1: z.string().max(255).nullable().optional(),
        address_line_2: z.string().max(255).nullable().optional(),
        users: z
            .array(
                z.object({
                    first_name: z.string().min(1).max(500),
                    last_name: z.string().min(1).max(500),
                    role: z.enum([Role.FAC_ADMIN, Role.USER, Role.VALIDATOR]),
                    email: z.string().min(1).email(),
                    phone_country_code: z.string().min(1).max(500),
                    phone_number: z.string().min(1).max(500),
                    id: z.string().optional().nullable(),
                }),
            )
            .nullable()
            .optional(),
    })
    .refine((fields) => {
        console.log(
            "fields.parent?.trim().length || fields.subsidiary?.trim()?.length-------\n",
            fields.parent?.trim().length || fields.subsidiary?.trim()?.length,
        )
        if (fields.parent?.trim().length || fields.subsidiary?.trim()?.length) {
            return true
        }
        return false
    })

export const updateFacilityValidationSchema = z.object({
    name: z.string().min(1).max(500).nullable().optional(),
    phone_country_code: z.string().min(1).max(500).nullable().optional(),
    phone: z.string().min(1).max(500).nullable().optional(),
    contact_person_email: z.string().email().nullable().optional(),
    contact_person: z.string().min(1).max(500).nullable().optional(),
    calculate_esg: z.boolean().default(false).nullable().optional(),
    scopes: z.array(z.string()).nullable().optional(),
    country: z.string().max(255).nullable().optional(),
    state: z.string().max(255).nullable().optional(),
    address: z.string().max(255).nullable().optional(),
    address_line_1: z.string().max(255).nullable().optional(),
    address_line_2: z.string().max(255).nullable().optional(),
    users: z
        .array(
            z.object({
                first_name: z.string().min(1).max(500),
                last_name: z.string().min(1).max(500).nullable().optional(),
                role: z.enum([Role.FAC_ADMIN, Role.USER, Role.VALIDATOR]),
                email: z.string().min(1).email(),
                phone_country_code: z.string().min(1).max(500),
                phone_number: z.string().min(1).max(500),
                id: z.string().optional().nullable(),
            }),
        )
        .nullable()
        .optional(),
})
