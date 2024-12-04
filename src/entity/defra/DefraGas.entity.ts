import { Entity, OneToMany, ManyToOne, Column, JoinColumn } from "typeorm"
import { DefraEmission } from "./DefraEmission.entity"
import { Activity } from "./Activity.entity"
import { CustomBaseEntity } from "../common/CustomBase.entity"

@Entity({ name: "defra_gases" })
export class DefraGas extends CustomBaseEntity {
    @Column({ nullable: false, unique: true })
    name: string

    @Column({ nullable: true })
    chemicalFormula: string

    @OneToMany(() => DefraEmission, (emission) => emission.gas, {
        cascade: true,
        onDelete: "CASCADE",
    })
    emissions: DefraEmission[]

    @Column({ name: "activityId" })
    activityId: string

    @ManyToOne(() => Activity, (activity) => activity.id, {
        cascade: true,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "activityId" })
    activity: Activity
}
