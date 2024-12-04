import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    DeleteDateColumn,
} from "typeorm"

@Entity({ name: "equipment_type" })
export class EquipmentType extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false, unique: true })
    name: string

    @Column({ nullable: true })
    description: string

    @Column({ default: "kg" })
    unit: string

    @Column({ type: "decimal", precision: 50, scale: 10 })
    minCapacity: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    maxCapacity: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    installationEmissionFactor: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    operatingEmissions: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    refrigerantRemainingAtDisposal: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    recoveryEfficiency: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
