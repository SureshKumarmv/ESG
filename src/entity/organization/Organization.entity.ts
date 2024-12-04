import { Entity, Column, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm"
import { User } from "../user/User.entity"
import slugify from "slugify"
import { CustomBaseEntity } from "../common/CustomBase.entity"
import { Subsidiary } from "./Subsidiary.entity"
import { Facility } from "./Facility.entity"

@Entity()
export class Organization extends CustomBaseEntity {
    @Column({ type: "varchar", length: 500 })
    name: string

    @Column({ type: "varchar", length: 500, nullable: true, unique: true })
    organization_slug: string

    @Column({ type: "varchar", length: 255 })
    organization_legal_name: string

    @Column({ type: "varchar", length: 255, nullable: true })
    organization_abbreviated_name: string

    @Column({ type: "varchar", length: 255, nullable: true })
    country: string

    @Column({ type: "varchar", length: 255, nullable: true })
    state: string

    @Column({ type: "varchar", length: 255, nullable: true })
    address: string

    @Column({ type: "varchar", length: 255, nullable: true })
    address_line_1: string

    @Column({ type: "varchar", length: 255, nullable: true })
    address_line_2: string

    @Column({ type: "jsonb", nullable: true })
    industry_type: string[]

    @Column({ type: "jsonb", nullable: true })
    employment_type: string[]

    @Column({ type: "jsonb", nullable: true })
    ownership_nature: string[]

    @Column({ type: "int", nullable: true })
    total_employees: number

    @Column({ type: "varchar", length: 255, nullable: true })
    website: string

    @Column({ type: "varchar", length: 255, nullable: true })
    linkedin: string

    @Column({ type: "simple-json", nullable: true })
    business_address: {
        name?: string | null | undefined
        city?: string | null | undefined
        state?: string | null | undefined
        country?: string | null | undefined
        zip_code?: string | null | undefined
        phone_country_code?: string | null | undefined
        phone_number?: string | null | undefined
        address?: {
            line_1: string | null | undefined
            line_2: string | null | undefined
        }
    }
    @Column({ type: "simple-json", nullable: true })
    billing_address: {
        name?: string | null | undefined
        city?: string | null | undefined
        state?: string | null | undefined
        country?: string | null | undefined
        zip_code?: string | null | undefined
        phone_country_code?: string | null | undefined
        phone_number?: string | null | undefined
        contact_name?: string | null | undefined
        email?: string | null | undefined
        address?: {
            line_1?: string | null | undefined
            line_2?: string | null | undefined
        }
    }

    @Column({ type: "jsonb", nullable: true })
    contact: {
        full_name: string | null | undefined
        email: string | null | undefined
        phone_country_code: string | null | undefined
        phone_number: string | null | undefined
        company_name: string | null | undefined
        job_title: string | null | undefined
        website: string | null | undefined
        linkedin: string | null | undefined
        twitter: string | null | undefined
        sustainability_blog: string | null | undefined
        csr: string | null | undefined
        esg_certifications: string | null | undefined
        mailing_address: string | null | undefined
        fax: string | null | undefined
    }[]

    @Column({ type: "simple-json", nullable: true })
    service: {
        scopes: string[] | null | undefined
    }
    @Column({ type: "varchar", length: 255, nullable: true })
    corporate_identity_number: string

    @Column({ type: "varchar", length: 255, nullable: true })
    year_of_incorporation: string

    @Column({ type: "varchar", length: 255, nullable: true })
    currency: string

    @Column({ type: "varchar", length: 255, nullable: true })
    paid_up_capital: string

    @Column({ type: "varchar", length: 255, nullable: true })
    financial_year_start: string

    @Column({ type: "varchar", length: 255, nullable: true })
    financial_year_end: string

    @Column({ type: "varchar", length: 255, nullable: true })
    stocks_share: string

    @Column({ type: "varchar", length: 255, nullable: true })
    mailing_address: string

    @Column({ type: "varchar", length: 255, nullable: true })
    fax: string

    @OneToMany(() => Subsidiary, (subsidiary) => subsidiary.parent, { nullable: true })
    subsidiary: Subsidiary[]

    @OneToMany(() => Facility, (facility) => facility.parent, { nullable: true })
    facility: Facility[]

    @OneToMany(() => User, (user) => user.organization, { nullable: true })
    users: User[] | null

    @BeforeInsert()
    @BeforeUpdate()
    slugifyCompany() {
        this.organization_slug = slugify(this.organization_legal_name, {
            lower: true, // Convert to lowercase
            strict: true, // Remove special characters
            replacement: "_",
        })
    }
}
