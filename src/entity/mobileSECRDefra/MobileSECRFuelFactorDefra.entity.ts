import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    DeleteDateColumn,
    // OneToMany,
} from "typeorm"
// import { DefraGas } from "./DefraGas.entity"

@Entity({ name: "Mobile_SECR_Fuel_Factor_Defra" })
export class MobileSECRFuelFactorDefra extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false, unique: true })
    name: string

    @Column({ type: "decimal", precision: 50, scale: 10 })
    kgco2e: number

    @Column({ type: "int" })
    year: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
