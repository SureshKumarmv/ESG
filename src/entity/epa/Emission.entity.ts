import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    BaseEntity,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
} from "typeorm"
import { EpaGas } from "./Gas.entity"

@Entity({ name: "epa_emissions" })
export class EpaEmission extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "int" })
    year: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    gwp: number

    @Column({ type: "varchar", length: 50 })
    unit: string

    @ManyToOne(() => EpaGas, (gas) => gas.emissions)
    gas: EpaGas

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
