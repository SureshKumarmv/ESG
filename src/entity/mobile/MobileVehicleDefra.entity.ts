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

import { MobileActivityDefra } from "./MobileActivityDefra.entity"
// import { MobileVehicleVariantDefra } from "./MobileVehicleVariantDefra.entity";

@Entity({ name: "Mobile_Vehicle_Defra" })
export class MobileVehicleDefra extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false, unique: true })
    name: string

    @Column({ name: "activityId" })
    activityId: string

    @ManyToOne(() => MobileActivityDefra, (activity) => activity.id, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "activityId" })
    activity: MobileActivityDefra

    // @ManyToOne(() => MobileVehicleVariantDefra, (variant) => variant.id, {
    //     cascade: true,
    //     onDelete: "CASCADE",
    // })
    // @JoinColumn({ name: "variantId" })
    // variant: MobileVehicleVariantDefra

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
