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
// import { DefraEmission } from "./DefraEmission.entity"
// import { Activity } from "./Activity.entity"
// import { MobileActivityDefra } from "./MobileActivityDefra.entity"
// import { UUID } from "crypto"
import { MobileVehicleDefra } from "./MobileVehicleDefra.entity"
import { MobileVehicleVariantDefra } from "./MobileVehicleVariantDefra.entity"

@Entity({ name: "Mobile_Vehicle_Emission_Defra" })
export class MobileVehicleEmissionDefra extends BaseEntity {
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

    @Column({ type: "uuid", name: "vehicleId" })
    vehicleId: string

    @Column({ type: "int" })
    year: number

    @Column({ type: "uuid", name: "variantId" })
    variantId: string

    @Column({ type: "varchar", length: 50 })
    unit: string

    @ManyToOne(() => MobileVehicleDefra, (vehicle) => vehicle.id, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "vehicleId" })
    vehicle: MobileVehicleDefra

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
