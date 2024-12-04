import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from "typeorm"

import { MobileDeliveryActivity } from "./MobileDeliveryActivity.entity"
import { MobileDeliveryTypes } from "./MobileDeliveryTypes.entity"
import { MobileDeliveryVariant } from "./MobileDeliveryVariant.entity"
import { Load } from "../../enum/Load.enum"

@Entity({ name: "Mobile_Delivery_Load" })
export class MobileDeliveryLoadEmission extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ name: "activityId" })
    activityId: string

    @Column({ type: "int" })
    year: number

    @Column({ type: "varchar", length: 50 })
    unit: string

    @Column({ name: "TypeId" })
    typeId: string

    @Column({ type: "enum", enum: Load })
    laden: Load //loadPercentage

    @Column({ type: "decimal", precision: 50, scale: 10 })
    kgco2e: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    kgco2eCO2: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    kgco2eCH4: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    kgco2eN2O: number

    @ManyToOne(() => MobileDeliveryActivity, (activity) => activity.id, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "activityId" })
    activity: MobileDeliveryActivity

    @ManyToOne(() => MobileDeliveryTypes, (type) => type.id, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "typeId" })
    type: MobileDeliveryTypes

    @ManyToOne(() => MobileDeliveryVariant, (variant) => variant.id, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "variantId" })
    variant: MobileDeliveryVariant

    @Column({ name: "variantId" })
    variantId: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
