import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { DecimalColumn } from "../../decorators/DecimalColumn"
import { CustomBaseEntity } from "../common/CustomBase.entity"
import { StationaryDefraFuel } from "./StationaryDefraFuel.entity"
import { StationaryDefraActivity } from "./StationaryDefraActivity.entity"
import { Status } from "../../enum/status.enum"

@Entity({ name: "stationary_defra_result" })
export class StationaryDefraResult extends CustomBaseEntity {
    @DecimalColumn()
    consumed_amount: number

    @ManyToOne(() => StationaryDefraActivity, (defraFuel) => defraFuel.id, { nullable: true })
    @JoinColumn({ name: "activity_id" })
    activity: StationaryDefraActivity | null

    @ManyToOne(() => StationaryDefraFuel, (defraFuel) => defraFuel.id)
    @JoinColumn({ name: "fuel_id" })
    fuel: StationaryDefraFuel

    @Column({ type: "int", nullable: true })
    year: number

    @Column({ type: "text" })
    unit: string

    @DecimalColumn()
    calculated_emission: number

    @Column({ type: "enum", enum: Status, default: Status.DRAFT })
    status: Status

    @Column({ nullable: true })
    remarks: string
}
