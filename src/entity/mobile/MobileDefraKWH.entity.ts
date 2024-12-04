import {
    Entity,
    // OneToMany,
    DeleteDateColumn,
    // ManyToOne,
    Column,
    // JoinColumn,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm"
// import { DefraEmission } from "./DefraEmission.entity"
// import { Activity } from "./Activity.entity"
// import { MobileActivityDefra } from "./MobileActivityDefra.entity"
// import { UUID } from "crypto"
// import { MobileVehicleDefra } from "./MobileVehicleDefra.entity"
// import { MobileVehicleVariantDefra } from "./MobileVehicleVariantDefra.entity"

@Entity({ name: "Mobile_Defra_KWH" })
export class MobileDefraKWH extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Column({ nullable: false })
    name: string
    @Column({ type: "decimal", precision: 50, scale: 10 })
    kgco2e: number

    @Column({ type: "int" })
    year: number

    @Column({ type: "varchar" })
    unit: string

    @Column({ type: "varchar" })
    type: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
