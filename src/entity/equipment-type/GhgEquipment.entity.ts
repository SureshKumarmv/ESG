import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    DeleteDateColumn,
} from "typeorm"

@Entity({ name: "ghg_equipment_type" })
export class GhgEquipmentType extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false, unique: true })
    name: string

    @Column({ nullable: true })
    description: string

    @Column({ default: "kg" })
    unit: string

    @Column({ type: "decimal", precision: 50, scale: 10 })
    minCharge: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    maxCharge: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    minAssemblyRate: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    maxAssemblyRate: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    minAnnualLeakageRate: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    maxAnnualLeakageRate: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    minRecycylingEfficiency: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    maxRecycylingEfficiency: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
