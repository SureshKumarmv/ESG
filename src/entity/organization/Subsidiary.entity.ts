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
import { Facility } from "./Facility.entity"

@Entity({ name: "subsidiary" })
export class Subsidiary extends CustomBaseEntity {
    @Column({ type: "varchar", length: 500 })
    name: string

    @Column({ type: "varchar", length: 500, nullable: true, unique: true })
    subsidiary_slug: string

    @Column({ type: "varchar", length: 500, nullable: true })
    business_operation: string

    @Column({ type: "date", nullable: true })
    incorporation_date: Date

    @Column({ type: "int" })
    ownership_percentage: number

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

    @Column({ type: "boolean", nullable: true, default: false })
    calculate_esg: boolean

    @ManyToOne(() => Organization, (organization) => organization.subsidiary)
    @JoinColumn({ name: "parent_id" })
    parent: Organization

    @OneToMany(() => Facility, (facility) => facility.subsidiary, { nullable: true })
    facility: Facility[]

    @OneToMany(() => User, (user) => user.subsidiary, { nullable: true })
    users: User[]

    @BeforeInsert()
    @BeforeUpdate()
    slugifyCompany() {
        this.subsidiary_slug = slugify(this.name, {
            lower: true, // Convert to lowercase
            strict: true, // Remove special characters
            replacement: "_",
        })
    }
}
