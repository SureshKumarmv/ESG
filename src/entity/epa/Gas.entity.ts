import { Entity, Column, OneToMany } from "typeorm"
import { EpaEmission } from "./Emission.entity"
import { CustomBaseEntity } from "../common/CustomBase.entity"

@Entity({ name: "epa_gases" })
export class EpaGas extends CustomBaseEntity {
    @Column({ nullable: false, unique: true })
    name: string

    @Column({ nullable: true })
    chemicalFormula: string

    @OneToMany(() => EpaEmission, (emission) => emission.gas, {
        cascade: true,
        onDelete: "CASCADE",
    })
    emissions: EpaEmission[]
}
