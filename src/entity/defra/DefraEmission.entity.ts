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
import { DefraGas } from "./DefraGas.entity"

@Entity({ name: "defra_emissions" })
export class DefraEmission extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "int" })
    year: number

    @Column({ type: "decimal", precision: 50, scale: 10, default: 0 })
    kyoto_gwp: number

    @Column({ type: "decimal", precision: 50, scale: 10, default: 0 })
    non_kyoto_gwp: number

    @Column({ type: "varchar", length: 50 })
    unit: string

    @ManyToOne(() => DefraGas, (gas) => gas.emissions)
    gas: DefraGas

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
