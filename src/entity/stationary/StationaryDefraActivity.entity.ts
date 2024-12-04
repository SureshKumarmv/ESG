import { Entity, Column, OneToMany } from "typeorm"
import { StationaryDefraEmission } from "./StationaryDefraEmission.entity"
import { CustomBaseEntity } from "../common/CustomBase.entity"

@Entity({ name: "stationary_defra_activity" })
export class StationaryDefraActivity extends CustomBaseEntity {
    @Column()
    name: string

    @OneToMany(() => StationaryDefraEmission, (fuelEmission) => fuelEmission.fuel)
    fuel_emissions: StationaryDefraEmission[]
}
