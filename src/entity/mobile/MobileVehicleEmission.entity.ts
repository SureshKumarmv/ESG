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
import { MobileVehicleVariantDefra } from "./MobileVehicleVariantDefra.entity"

@Entity({ name: "Mobile_Vehicle_Emission_Defra" })
export class MobileVehicleEmissionDefra extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    // @Column({ type: "simple-json", nullable: true })
    // config: Record<string, any>; // Or define a specific object type

    @Column({ type: "simple-json", nullable: true })
    kgco2e: unknown
    // @Column({ type: "decimal", precision: 50, scale: 10 })
    // kgco2e: number

    @Column({ type: "json", nullable: true })
    kgco2eCO2: unknown
    // @Column({ type: "decimal", precision: 50, scale: 10 })
    // kgco2eCO2: number

    @Column({ type: "json", nullable: true })
    kgco2eCH4: unknown
    // @Column({ type: "decimal", precision: 50, scale: 10 })
    // kgco2eCH4: number

    @Column({ type: "json", nullable: true })
    kgco2eN2O: unknown
    // @Column({ type: "decimal", precision: 50, scale: 10 })
    // kgco2eN2O: number

    @Column({ type: "int" })
    year: number

    // @Column({ type: "varchar", length: 50 })
    // unit: string

    @Column({ type: "uuid", name: "vehicleId" })
    vehicleId: string

    @ManyToOne(() => MobileVehicleDefra, (vehicle) => vehicle.id, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "vehicleId" })
    vehicle: MobileVehicleDefra

    @Column({ type: "uuid", name: "variantId" })
    variantId: string

    @ManyToOne(() => MobileVehicleVariantDefra, (variant) => variant.id, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "variantId" })
    variant: MobileVehicleVariantDefra

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
