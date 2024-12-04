import {
    Entity,
    DeleteDateColumn,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm"

@Entity({ name: "Mobile_Ev_Defra_Factor" })
export class MobileEvDefraFactor extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Column({ nullable: false })
    name: string
    @Column({ type: "decimal", precision: 50, scale: 10 })
    kgco2e: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    kgco2eCO2: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    kgco2eCH4: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    kgco2eN2O: number

    @Column({ type: "int" })
    year: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
