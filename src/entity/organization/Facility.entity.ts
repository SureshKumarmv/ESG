import {
    Entity,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn,
    BeforeInsert,
    BeforeUpdate,
} from "typeorm"
import { User } from "../user/User.entity"
import slugify from "slugify"
import { CustomBaseEntity } from "../common/CustomBase.entity"
import { Organization } from "./Organization.entity"
import { Subsidiary } from "./Subsidiary.entity"

@Entity({ name: "facility" })
export class Facility extends CustomBaseEntity {
    @Column({ type: "varchar", length: 500 })
    name: string

    @Column({ type: "varchar", length: 500, nullable: true, unique: true })
    facility_slug: string

    @Column({ type: "varchar", length: 255, nullable: true })
    country: string

    @Column({ type: "varchar", length: 255, nullable: true })
    state: string

    @Column({ type: "varchar", length: 255, nullable: true })
    address: string

    @Column({ type: "varchar", length: 255, nullable: true })
    phone: string

    @Column({ type: "varchar", length: 255, nullable: true })
    type: string

    @Column({ type: "varchar", length: 255, nullable: true })
    phone_country_code: string

    @Column({ type: "varchar", length: 255, nullable: true })
    contact_person: string

    @Column({ type: "varchar", length: 255, nullable: true })
    contact_person_email: string

    @Column({ type: "varchar", length: 255, nullable: true })
    address_line_1: string

    @Column({ type: "varchar", length: 255, nullable: true })
    address_line_2: string

    @Column({ type: "boolean", nullable: true, default: false })
    calculate_esg: boolean

    @ManyToOne(() => Organization, (organization) => organization.facility, { nullable: true })
    @JoinColumn({ name: "parent_id" })
    parent: Organization

    @ManyToOne(() => Subsidiary, (subsidiary) => subsidiary.facility, { nullable: true })
    @JoinColumn({ name: "subsidiary_id" })
    subsidiary: Subsidiary

    @OneToMany(() => User, (user) => user.facility, { nullable: true })
    users: User[]

    @BeforeInsert()
    @BeforeUpdate()
    slugifyCompany() {
        this.facility_slug = slugify(this.name, {
            lower: true, // Convert to lowercase
            strict: true, // Remove special characters
            replacement: "_",
        })
    }
}
