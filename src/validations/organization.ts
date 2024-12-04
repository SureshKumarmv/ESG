import { z } from "zod"
import { Role } from "../enum/role.enum"

const addressSchema = z.object({
    line_1: z.string().nullable().optional(),
    line_2: z.string().nullable().optional(),
})

const businessAddressSchema = z.object({
    name: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    state: z.string().nullable().optional(),
    zip_code: z.string().nullable().optional(),
    phone_country_code: z.string().nullable().optional(),
    phone_number: z.string().nullable().optional(),
    address: addressSchema,
})

const billingAddressSchema = z.object({
    name: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
    state: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    zip_code: z.string().nullable().optional(),
    phone_country_code: z.string().nullable().optional(),
    phone_number: z.string().nullable().optional(),
    contact_name: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
    address: addressSchema,
})

const contactSchema = z.object({
    full_name: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
    phone_country_code: z.string().nullable().optional(),
    phone_number: z.string().nullable().optional(),
    company_name: z.string().nullable().optional(),
    job_title: z.string().nullable().optional(),
    website: z.string().nullable().optional(),
    linkedin: z.string().nullable().optional(),
    twitter: z.string().nullable().optional(),
    sustainability_blog: z.string().nullable().optional(),
    csr: z.string().nullable().optional(),
    esg_certifications: z.string().nullable().optional(),
    mailing_address: z.string().nullable().optional(),
    fax: z.string().nullable().optional(),
})

const serviceSchema = z.object({
    scopes: z.array(z.string()).nullable().optional(),
})

export const createOrganizationSchema = z.object({
    name: z.string().min(1).max(500),
    organization_legal_name: z.string().min(1).max(255),
    organization_abbreviated_name: z.string().max(255).nullable().optional(),
    country: z.string().max(255).nullable().optional(),
    state: z.string().max(255).nullable().optional(),
    address: z.string().max(255).nullable().optional(),
    address_line_1: z.string().max(255).nullable().optional(),
    address_line_2: z.string().max(255).nullable().optional(),
    industry_type: z.string().max(255).nullable().optional(),
    employment_type: z.string().max(255).nullable().optional(),
    ownership_nature: z.string().max(255).nullable().optional(),
    total_employees: z.number().nullable().optional(),
    website: z.string().max(255).nullable().optional(),
    linkedin: z.string().max(255).nullable().optional(),
    business_address: businessAddressSchema.nullable().optional(),
    billing_address: billingAddressSchema.nullable().optional(),
    contact: z.array(contactSchema).nullable().optional(),
    service: serviceSchema.nullable().optional(),
    users: z
        .array(
            z.object({
                first_name: z.string().min(1).max(500),
                last_name: z.string().min(1).max(500),
                role: z.enum([Role.ADMIN, Role.SUPER_ADMIN, Role.USER, Role.VALIDATOR]),
                email: z.string().min(1).max(500),
                phone_country_code: z.string().min(1).max(500),
                phone_number: z.string().min(1).max(500),
                id: z.string().optional().nullable(),
            }),
        )
        .nullable()
        .optional(),
    corporate_identity_number: z.string().max(255).nullable().optional(),
    year_of_incorporation: z.string().max(255).nullable().optional(),
    currency: z.string().max(255).nullable().optional(),
    paid_up_capital: z.string().max(255).nullable().optional(),
    financial_year_start: z.string().max(255).nullable().optional(),
    financial_year_end: z.string().max(255).nullable().optional(),
    stocks_share: z.string().max(255).nullable().optional(),
    fax: z.string().nullable().optional(),
})
export const updateOrganizationSchema = z.object({
    name: z.string().max(500).nullable().optional(),
    organization_legal_name: z.string().max(255).nullable().optional(),
    organization_abbreviated_name: z.string().max(255).nullable().optional(),
    country: z.string().max(255).nullable().optional(),
    state: z.string().max(255).nullable().optional(),
    address: z.string().max(255).nullable().optional(),
    address_line_1: z.string().max(255).nullable().optional(),
    address_line_2: z.string().max(255).nullable().optional(),
    industry_type: z.string().max(255).nullable().optional(),
    employment_type: z.string().max(255).nullable().optional(),
    ownership_nature: z.string().max(255).nullable().optional(),
    total_employees: z.number().nullable().optional(),
    website: z.string().max(255).nullable().optional(),
    linkedin: z.string().max(255).nullable().optional(),
    business_address: businessAddressSchema.nullable().optional(),
    billing_address: billingAddressSchema.nullable().optional(),
    contact: z.any(contactSchema).nullable().optional(),
    service: serviceSchema.nullable().optional(),
    users: z
        .array(
            z.object({
                first_name: z.string().max(500),
                last_name: z.string().max(500).nullable().optional(),
                role: z.enum([Role.ADMIN, Role.SUPER_ADMIN, Role.USER, Role.VALIDATOR]),
                email: z.string().min(1).email(),
                phone_country_code: z.string().max(500),
                phone_number: z.string().max(500),
                id: z.string().nullable().optional(),
            }),
        )
        .nullable()
        .optional(),
    corporate_identity_number: z.string().max(255).nullable().optional(),
    year_of_incorporation: z.string().max(255).nullable().optional(),
    currency: z.string().max(255).nullable().optional(),
    paid_up_capital: z.string().max(255).nullable().optional(),
    financial_year_start: z.string().max(255).nullable().optional(),
    financial_year_end: z.string().max(255).nullable().optional(),
    stocks_share: z.string().max(255).nullable().optional(),
    fax: z.string().nullable().optional(),
})
