import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { CustomBaseEntity } from "../common/CustomBase.entity"
import slugify from "slugify"
import { User } from "../user/User.entity"

interface Guest {
    first_name?: string | null
    last_name?: string | null
    phone_country_code?: string | null
    phone_number?: string | null
    email?: string | null
    designation?: string | null
}
@Entity({ name: "demo_submissions" })
export class Demo extends CustomBaseEntity {
    @Column({ name: "first_name", type: "varchar", length: 50 })
    first_name: string

    @Column({ name: "last_name", type: "varchar", length: 50 })
    last_name: string

    @Column({ name: "company", type: "varchar", length: 150 })
    company: string

    @Column({ name: "company_slug", type: "varchar", unique: true })
    company_slug: string

    @Column({ name: "email", type: "varchar", length: 100, unique: true })
    email: string

    @Column({ name: "designation", type: "varchar" })
    designation: string

    @Column({ name: "phone_country_code", type: "varchar", length: 5 })
    phone_country_code: string

    @Column({ name: "phone_number", type: "varchar" })
    phone_number: string

    @Column({ name: "guests", type: "jsonb", nullable: true })
    guests: Guest[]

    @ManyToOne(() => User, (user) => user.id, { nullable: true })
    @JoinColumn({ name: "user_id" })
    user: User

    @Column({ name: "credentials_generated", type: "boolean", default: false, nullable: true })
    credentials_generated: boolean

    @BeforeInsert()
    slugifyCompany() {
        this.company_slug = slugify(this.company, {
            lower: true, // Convert to lowercase
            strict: true, // Remove special characters
            replacement: "_",
        })
    }
}
