import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity({ name: "Mobile_Delivery_Result" })
export class MobileDeliveryResult extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "int" })
    year: number

    @Column()
    consumer: string

    @Column()
    ghgProtocolScope: string

    @Column({ type: "date" })
    startDate: Date

    @Column({ type: "date" })
    endDate: Date

    @Column({ type: "integer" })
    noOfDays: number

    @Column({ type: "varchar", nullable: true })
    activity: string

    @Column({ type: "varchar", nullable: true })
    types: string

    @Column({ type: "varchar", nullable: true })
    variant: string

    @Column({ nullable: true })
    unit: string

    @Column({ type: "float", nullable: true })
    distanceTravelled: number

    @Column({ type: "float" })
    result: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    CO2output: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    CH4output: number

    @Column({ type: "decimal", precision: 50, scale: 10 })
    N2Ooutput: number
}
