import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
// import { StationaryActivityDefra } from "./StationaryActivityDefra.entity";
// import { StationaryGasDefra } from "./StationaryGasDefra.entity";

// import { MobileSECRActivityDefra } from "./MobileSECRActivityDefra.entity"
// import { MobileSECRVehicleDefra } from "./MobileSECRVehicleDefra.entity"
// import { MobileVehicleVariantSECRDefra } from "./MobileSECRVehicleVariantDefra.entity"

@Entity({ name: "Mobile_Defra_SECR_Result" })
export class MobileDefraSECRResult extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    consumer: string

    @Column()
    ghgProtocolScope: string

    @Column({ type: "int" })
    year: number

    @Column({ type: "integer" })
    noOfDays: number

    // @Column({ type: 'integer' })
    // year: number;

    // @Column({ type: 'integer' })
    // noOfDays: number;

    @Column({ type: "date" })
    startDate: Date

    @Column({ type: "date" })
    endDate: Date

    @Column({ type: "varchar", nullable: true })
    activity: string

    @Column({ type: "varchar", nullable: true })
    vehicle: string

    @Column({ type: "varchar", nullable: true })
    fuelName: string

    @Column({ type: "varchar", nullable: true })
    variant: string

    @Column({ nullable: true })
    unit: string
    @Column({ nullable: true })
    fuelUnit: string

    @Column({ type: "float", nullable: true })
    consumption: number
    @Column({ type: "float", nullable: true })
    fuelConsumed: number

    // @Column({ type: "text" })
    // remark: string;

    @Column({ type: "float" })
    result: number

    // @ManyToOne(() => MobileSECRActivityDefra, (activity) => activity.name)
    // @JoinColumn({ name: "activity", referencedColumnName: "name" })
    // activityVal: MobileSECRActivityDefra;
    // @ManyToOne(() => MobileSECRVehicleDefra, (fuel) => fuel.name)
    // @JoinColumn({ name: "vehicle",referencedColumnName: "name" })
    // vehicleVal: MobileSECRVehicleDefra;
    // @ManyToOne(() => MobileVehicleVariantSECRDefra, (fuel) => fuel.name)
    // @JoinColumn({ name: "variant",referencedColumnName: "name" })
    // variantVal: MobileVehicleVariantSECRDefra;
}
