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

import { MobileVehicleDefra } from "./MobileVehicleDefra.entity"

@Entity({ name: "Mobile_Vehicle_Variant_Defra" })
export class MobileVehicleVariantDefra extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false })
    name: string

    @Column({ name: "vehicleId" })
    vehicleId: string

    @ManyToOne(() => MobileVehicleDefra, (vehicle) => vehicle.id, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "vehicleId" })
    vehicle: MobileVehicleDefra

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
