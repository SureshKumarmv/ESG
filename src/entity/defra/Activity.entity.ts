import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    DeleteDateColumn,
    OneToMany,
} from "typeorm"
import { DefraGas } from "./DefraGas.entity"

@Entity({ name: "activities" })
export class Activity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false, unique: true })
    name: string

    @OneToMany(() => DefraGas, (gas) => gas.id, {
        cascade: true,
        onDelete: "CASCADE",
    })
    gas: DefraGas[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}
