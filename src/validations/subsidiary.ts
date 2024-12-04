import { z } from "zod"
import { Role } from "../enum/role.enum"

export const createSubsidiaryValidationSchema = z.object({
    parent: z.string().min(1),
    name: z.string().min(1).max(500),
    incorporation_date: z.string().min(1).max(500),
    ownership_percentage: z.number(),
    business_operation: z.string().min(1),
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
                role: z.enum([Role.ADMIN, Role.USER, Role.VALIDATOR]),
                email: z.string().email(),
                phone_country_code: z.string().min(1).max(500),
                phone_number: z.string().min(1).max(500),
                id: z.string().optional().nullable(),
            }),
        )
        .nullable()
        .optional(),
})

export const updateSubsidiaryValidationSchema = z.object({
    name: z.string().min(1).max(500).nullable().optional(),
    incorporation_date: z.string().min(1).max(500).nullable().optional(),
    ownership_percentage: z.number().nullable().optional(),
    business_operation: z.string().min(1).nullable().optional(),
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
                role: z.enum([Role.ADMIN, Role.USER, Role.VALIDATOR]),
                email: z.string().min(1).email(),
                phone_country_code: z.string().min(1).max(500),
                phone_number: z.string().min(1).max(500),
                id: z.string().optional().nullable(),
            }),
        )
        .nullable()
        .optional(),
})
