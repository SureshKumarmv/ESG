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
import { MobileSECRVehicleDefra } from "./MobileSECRVehicleDefra.entity"
import { MobileVehicleVariantSECRDefra } from "./MobileSECRVehicleVariantDefra.entity"
@Entity({ name: "Mobile_Vehicle_SECR_Emission_Defra" })
export class MobileVehicleSECREmissionDefra extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "decimal", precision: 50, scale: 10 })
    kgco2e: number

    @Column({ type: "uuid", name: "vehicleId" })
    vehicleId: string

    @Column({ type: "int" })
    year: number

    @Column({ type: "uuid", name: "variantId" })
    variantId: string

    @Column({ type: "varchar", length: 50 })
    unit: string

    @ManyToOne(() => MobileSECRVehicleDefra, (vehicle) => vehicle.id, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "vehicleId" })
    vehicle: MobileSECRVehicleDefra

    @ManyToOne(() => MobileVehicleVariantSECRDefra, (variant) => variant.id, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "variantId" })
    variant: MobileVehicleVariantSECRDefra

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
