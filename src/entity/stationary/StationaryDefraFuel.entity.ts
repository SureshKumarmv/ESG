import { Entity, Column, OneToMany } from "typeorm"
import { CustomBaseEntity } from "../common/CustomBase.entity"
import { StationaryDefraEmission } from "./StationaryDefraEmission.entity"

@Entity({ name: "stationary_defra_fuel" })
export class StationaryDefraFuel extends CustomBaseEntity {
    @Column()
    name: string

    @OneToMany(() => StationaryDefraEmission, (fuelEmission) => fuelEmission.fuel)
    fuel_emissions: StationaryDefraEmission[]
}
