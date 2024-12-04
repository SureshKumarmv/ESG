import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { CustomBaseEntity } from "../common/CustomBase.entity"
import { Role } from "../../enum/role.enum"
import bcrypt from "bcryptjs"
import { Exclude } from "class-transformer"
import { Organization } from "../organization/Organization.entity"
import { Subsidiary } from "../organization/Subsidiary.entity"
import { generateShortId, sliceText, slugifyText } from "../../utils/helpers"
import { Facility } from "../organization/Facility.entity"

@Entity({ name: "user" })
export class User extends CustomBaseEntity {
    @Column({ name: "role", type: "enum", enum: Role, default: Role.USER })
    role: Role

    @Column({ name: "first_name", type: "varchar", length: 50 })
    first_name: string

    @Column({ name: "last_name", type: "varchar", length: 50 })
    last_name: string

    @Column({ name: "username", type: "varchar", length: 50, unique: true, nullable: true })
    username: string

    @Column({ name: "email", type: "varchar", length: 100, nullable: true })
    email: string

    @Exclude()
    @Column({ name: "password", type: "varchar", length: 100 })
    password: string

    @Column({ name: "phone_country_code", type: "varchar", length: 5 })
    phone_country_code: string

    @Column({ name: "phone_number", type: "varchar" })
    phone_number: string

    @Column({ name: "otp", type: "int", nullable: true })
    otp: number

    @Column({ name: "password_reset_count", type: "int", nullable: true, default: 0 })
    password_reset_count: number

    @Column({ name: "otp_generated_at", type: "bigint", nullable: true })
    otp_generated_at: number

    @ManyToOne(() => Organization, (organization) => organization.users, { nullable: true })
    @JoinColumn({ name: "organization_id" })
    organization: Organization

    @ManyToOne(() => Subsidiary, (subsidiary) => subsidiary.users, { nullable: true })
    @JoinColumn({ name: "subsidiary_id" })
    subsidiary: Subsidiary

    @ManyToOne(() => Facility, (facility) => facility.users, { nullable: true })
    @JoinColumn({ name: "facility_id" })
    facility: Facility

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(this.password, salt)
        this.password = hash
    }
    async matchPassword(enteredPassword: string) {
        return await bcrypt.compare(enteredPassword, this.password)
    }
    @BeforeInsert()
    createUsername() {
        const id = generateShortId()
        this.username = this.organization?.name
            ? slugifyText(`${sliceText(this.organization.name)}_${id}`)
            : slugifyText(`${sliceText(this.first_name)}_${id}`)
    }
}
