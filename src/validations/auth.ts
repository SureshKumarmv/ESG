import { z } from "zod"
import { Role } from "../enum/role.enum"

export const authSchema = z.object({
    email: z.string().trim().min(1),
    password: z.string().trim().min(1),
})

export const forgotPasswordSchema = z.object({
    email: z.string().trim().min(1),
})

export const resetPasswordSchema = authSchema.extend({
    otp: z.string().trim().min(1),
})

export const updateUserSchema = z.object({
    role: z.nativeEnum(Role).optional(), // Role is optional and of type enum Role
    first_name: z
        .string()
        .min(1, "First name must be at least 1 character")
        .max(50, "First name must be 50 characters or less"), // Required with min and max length
    last_name: z
        .string()
        .min(1, "Last name must be at least 1 character")
        .max(50, "Last name must be 50 characters or less"), // Required with min and max length
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(50, "Username must be 50 characters or less")
        .optional()
        .nullable(), // Optional, unique, nullable with min and max length
    email: z
        .string()
        .email("Invalid email format")
        .min(5, "Email must be at least 5 characters")
        .max(100, "Email must be 100 characters or less")
        .optional()
        .nullable(), // Optional, nullable with min and max length
    password: z.string().min(8, "Password must be at least 8 characters").optional(), // Excluded in response but required during creation/reset
    phone_country_code: z
        .string()
        .min(1, "Country code must be at least 1 character")
        .max(5, "Country code must be 5 characters or less"), // Required with min and max length
    phone_number: z.string().min(4, "Phone number must be at least 4 characters"), // Required with min length
})
