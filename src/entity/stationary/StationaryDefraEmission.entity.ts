import { Entity, Column, ManyToOne, JoinColumn } from "typeorm"
import { StationaryDefraActivity } from "./StationaryDefraActivity.entity"
import { StationaryDefraFuel } from "./StationaryDefraFuel.entity"
import { CustomBaseEntity } from "../common/CustomBase.entity"
import { DecimalColumn } from "../../decorators/DecimalColumn"

@Entity({ name: "fuel_defra_emissions" })
export class StationaryDefraEmission extends CustomBaseEntity {
    @ManyToOne(() => StationaryDefraActivity, (activity) => activity.fuel_emissions)
    @JoinColumn({ name: "activity_id" })
    activity: StationaryDefraActivity

    @ManyToOne(() => StationaryDefraFuel, (fuel) => fuel.fuel_emissions)
    @JoinColumn({ name: "fuel_id" })
    fuel: StationaryDefraFuel

    @Column()
    unit: string // Store unit as a string directly

    @Column({ type: "int" })
    year: number

    @DecimalColumn()
    kg_co2e: number

    @DecimalColumn()
    kg_co2_per_unit: number

    @DecimalColumn()
    kg_ch4_per_unit: number

    @DecimalColumn()
    kg_n2o_per_unit: number
}
