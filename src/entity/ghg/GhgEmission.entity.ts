import {
    Entity,
    Column,
    ManyToOne,
    BaseEntity,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    CreateDateColumn,
} from "typeorm"
import { GhgGas } from "./Ghg.entity"

@Entity({ name: "ghg_emissions" })
export class GhgEmission extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 50, nullable: true, default: "kg" })
    unit: string

    @Column({ type: "decimal", precision: 50, scale: 10 })
    gwp: number

    @ManyToOne(() => GhgGas, (gas) => gas.emissions)
    gas: GhgGas

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
