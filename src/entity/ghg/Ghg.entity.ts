import { Entity, OneToMany, Column } from "typeorm"
import { GhgEmission } from "./GhgEmission.entity"
import { CustomBaseEntity } from "../common/CustomBase.entity"

@Entity({ name: "ghg_gases" })
export class GhgGas extends CustomBaseEntity {
    @Column({ nullable: false, unique: true })
    name: string

    @Column({ nullable: true })
    chemicalFormula: string

    @OneToMany(() => GhgEmission, (emission) => emission.gas, {
        cascade: true,
        onDelete: "CASCADE",
    })
    emissions: GhgEmission[]
}
