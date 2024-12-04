import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from "typeorm"
import { EquipmentType } from "../equipment-type/EquipmentType.entity"
import { GhgEquipmentType } from "../equipment-type/GhgEquipment.entity"
import { Organization } from "../organization/Organization.entity"
import { Status } from "../../enum/status.enum"
import { Subsidiary } from "../organization/Subsidiary.entity"
import { Facility } from "../organization/Facility.entity"
import { DecimalColumn } from "../../decorators/DecimalColumn"

@Entity({ name: "results" })
export class Result extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => Organization, (organization) => organization.id)
    @JoinColumn({ name: "organinzation_id" })
    organization: Organization

    @ManyToOne(() => Subsidiary, (subsidiary) => subsidiary.id)
    @JoinColumn({ name: "subsidiary_id" })
    subsidiary: Subsidiary

    @ManyToOne(() => Facility, (facility) => facility.id)
    @JoinColumn({ name: "facility_id" })
    facility: Facility

    @Column({ type: "enum", enum: Status, default: Status.DRAFT })
    status: Status

    @Column()
    unit: string

    @Column({ nullable: true })
    remarks: string

    @Column()
    result_type: string

    @ManyToOne(() => EquipmentType, (equipment) => equipment.id, {
        nullable: true,
    })
    @JoinColumn({ name: "equipment_id" })
    equipment: EquipmentType | null

    @ManyToOne(() => GhgEquipmentType, (equipment) => equipment.id, {
        nullable: true,
    })
    @JoinColumn({ name: "ghgEquipment_id" })
    ghg_equipment: GhgEquipmentType | null

    @Column({ type: "int" })
    method: number

    @Column({ type: "int", nullable: true })
    number_of_months: number

    @Column({ nullable: true })
    gas: string

    // @ManyToOne(() => EpaGas, (gas) => gas.id, {
    //     nullable: true,
    // })
    // @JoinColumn({ name: "epa_gas_id" })
    // epa_gas_details: EpaGas | null

    // @ManyToOne(() => DefraGas, (gas) => gas.id, {
    //     nullable: true,
    // })
    // @JoinColumn({ name: "defra_gas_id" })
    // defra_gas_details: DefraGas | null

    // @ManyToOne(() => GhgGas, (gas) => gas.id, {
    //     nullable: true,
    // })
    // @JoinColumn({ name: "ghg_gas_id" })
    // ghg_gas_details: GhgGas | null

    @Column({ nullable: true })
    attachment: string

    @Column({ nullable: true })
    activity: string

    @DecimalColumn()
    inventory_change: number

    @DecimalColumn()
    transferred_amount: number

    @DecimalColumn()
    capacity: number

    @DecimalColumn()
    new_units_charge: number

    @DecimalColumn()
    new_units_capacity: number

    @DecimalColumn()
    existing_units_recharge: number

    @DecimalColumn()
    disposed_units_capacity: number

    @DecimalColumn()
    disposed_units_recovered: number

    @DecimalColumn()
    decrease_inventory_at_begining: number

    @DecimalColumn()
    decrease_inventory_at_end: number

    @DecimalColumn()
    result_decrease_inventory: number

    @DecimalColumn()
    purchases_producers_in_bulk: number

    @DecimalColumn()
    purchases_equipment_refrigerant: number

    @DecimalColumn()
    purchases_contractors_refrigerant: number

    @DecimalColumn()
    purchases_offsite_recycling: number

    @DecimalColumn()
    result_purchaes: number

    @DecimalColumn()
    sales_equipment_other: number

    @DecimalColumn()
    sales_sold_other: number

    @DecimalColumn()
    sales_refrigerant_returned_supplier: number

    @DecimalColumn()
    sales_recycling: number

    @DecimalColumn()
    sales_sent_offsite: number

    @DecimalColumn()
    result_sales: number

    @DecimalColumn()
    increase_charge_new_equipment: number

    @DecimalColumn()
    increase_full_charge: number

    @DecimalColumn()
    increase_original_total_full_charge: number

    @DecimalColumn()
    increase_different_refrigerant: number

    @DecimalColumn()
    result_increase: number

    @DecimalColumn()
    emissions: number

    @DecimalColumn()
    installation_refrigerant_used: number

    @DecimalColumn()
    installation_refrigerant_used_retrofit: number

    @DecimalColumn()
    installation_equipment_using_refrigerant: number

    @DecimalColumn()
    installation_equipment_using_refrigerant_retrofit: number

    @DecimalColumn()
    installation_total_emission: number

    @DecimalColumn()
    use_emission_recycling_recharge: number

    @DecimalColumn()
    final_sold_other_entities: number

    @DecimalColumn()
    final_use_different_refrigerant: number

    @DecimalColumn()
    final_use_retering_equipment: number

    @DecimalColumn()
    final_use_different_refrigerant_other: number

    @DecimalColumn()
    final_use_total: number

    @DecimalColumn()
    total_units: number

    @DecimalColumn()
    refrigerant_charge: number

    @DecimalColumn()
    installation_factor: number

    @DecimalColumn()
    annual_leakage_rate: number

    @DecimalColumn()
    time_since_recharge_years: number

    @DecimalColumn()
    recycling_efficiency: number

    @DecimalColumn()
    destruction: number

    @DecimalColumn()
    area: number

    @Column({ type: "int", nullable: true })
    year: number

    @DecimalColumn({ nullable: false })
    result: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}
