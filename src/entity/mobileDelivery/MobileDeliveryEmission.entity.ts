import {
    Entity,
    // OneToMany,
    DeleteDateColumn,
    ManyToOne,
    Column,
    JoinColumn,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm"

import { MobileDeliveryActivity } from "./MobileDeliveryActivity.entity"
import { MobileDeliveryTypes } from "./MobileDeliveryTypes.entity"
import { MobileDeliveryVariant } from "./MobileDeliveryVariant.entity"

@Entity({ name: "Mobile_Delivery_Emmission" })
export class MobileDeliveryEmission extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "decimal", precision: 50, scale: 10 })
    kgco2e: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    kgco2eCO2: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    kgco2eCH4: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    kgco2eN2O: number

    @Column({ name: "activityId" })
    activityId: string

    @Column({ type: "int" })
    year: number

    @Column({ type: "varchar", length: 50 })
    unit: string

    @Column({ name: "TypeId" })
    typeId: string

    @Column({ name: "variantId" })
    variantId: string

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

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
