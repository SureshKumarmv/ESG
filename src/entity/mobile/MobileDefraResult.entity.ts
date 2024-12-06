import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm"

import { MobileActivityDefra } from "./MobileActivityDefra.entity"
import { MobileVehicleDefra } from "./MobileVehicleDefra.entity"
import { MobileVehicleVariantDefra } from "./MobileVehicleVariantDefra.entity"

@Entity({ name: "Mobile_Defra_Result" })
export class MobileDefraResult extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    consumer: string

    @Column()
    ghgProtocolScope: string

    @Column()
    type: string

    @Column()
    electricVehicleType: string

    @Column({ type: "int" })
    year: number

    @Column({ type: "integer" })
    noOfDays: number

    @Column({ type: "date" })
    startDate: Date

    @Column({ type: "date" })
    endDate: Date

    @Column({ type: "varchar" })
    activity: string

    @Column({ type: "varchar" })
    vehicle: string

    @Column({ type: "varchar" })
    variant: string

    @Column()
    unit: string

    @Column({ type: "float" })
    consumption: number

    // @Column({ type: "text" })
    // remark: string;

    @Column({ type: "float" })
    result: number

    @Column({ type: "float" })
    CO2output: number

    @Column({ type: "float" })
    N2Ooutput: number

    @Column({ type: "float" })
    CH4output: number

    @ManyToOne(() => MobileActivityDefra, (activity) => activity.name)
    @JoinColumn({ name: "activityId", referencedColumnName: "id" })
    activityVal: MobileActivityDefra

    @ManyToOne(() => MobileVehicleDefra, (fuel) => fuel.name)
    @JoinColumn({ name: "vehicleId", referencedColumnName: "id" })
    vehicleVal: MobileVehicleDefra

    @ManyToOne(() => MobileVehicleVariantDefra, (fuel) => fuel.name)
    @JoinColumn({ name: "variantId", referencedColumnName: "id" })
    variantId: MobileVehicleVariantDefra
}
