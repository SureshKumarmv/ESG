import {
    Entity,
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

@Entity({ name: "Mobile_Delivery_Variant" })
export class MobileDeliveryVariant extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false })
    name: string

    @Column({ name: "activityId" })
    activityId: string

    @Column({ name: "TypeId" })
    TypeId: string

    @ManyToOne(() => MobileDeliveryActivity, (activity) => activity.id, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "activityId" })
    activity: MobileDeliveryActivity

    @ManyToOne(() => MobileDeliveryTypes, (type) => type.id, { cascade: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "TypeId" })
    type: MobileDeliveryTypes

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
