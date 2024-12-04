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

@Entity({ name: "Mobile_Delivery_Types" })
export class MobileDeliveryTypes extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false })
    name: string

    @Column({ name: "activityId" })
    activityId: string

    @ManyToOne(() => MobileDeliveryActivity, (activity) => activity.id, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "activityId" })
    activity: MobileDeliveryActivity

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
