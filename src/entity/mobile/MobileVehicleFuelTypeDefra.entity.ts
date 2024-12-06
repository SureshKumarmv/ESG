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

import { MobileActivityDefra } from "./MobileActivityDefra.entity"
import { MobileVehicleDefra } from "./MobileVehicleDefra.entity"

@Entity({ name: "Mobile_Vehicle_Fuel_Defra" })
export class MobileVehicleFuelTypeDefra extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false })
    name: string

    @Column({ name: "activityId" })
    activityId: string

    @ManyToOne(() => MobileActivityDefra, (activity) => activity.id, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "activityId" })
    activity: MobileActivityDefra

    @Column({ name: "vehicleId" })
    vehicleId: string

    @ManyToOne(() => MobileVehicleDefra, (vehicleType) => vehicleType.id, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "vehicleId" })
    vehicleType: MobileVehicleDefra

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
