import { z } from "zod"
export const ghgSalesSchema = z.object({
    equipment: z.string(), // a
    gas: z.string(), // b
    decrease_inventory_at_begining: z.number(), //c
    decrease_inventory_at_end: z.number(), //d
    result_decrease_inventory: z.number(), // e = c - d
    purchases_producers_in_bulk: z.number(), // f
    purchases_equipment_refrigerant: z.number(), // g
    purchases_contractors_refrigerant: z.number(), // h
    purchases_offsite_recycling: z.number(), // i
    result_purchaes: z.number(), // j = f + g + h + i
    sales_equipment_other: z.number(), // k
    sales_sold_other: z.number(), // l
    sales_refrigerant_returned_supplier: z.number(), // m
    sales_recycling: z.number(), // n
    sales_sent_offsite: z.number(), // o
    result_sales: z.number(), // p = k + l + m + n + o
    increase_charge_new_equipment: z.number(), // q
    increase_full_charge: z.number(), // r
    increase_original_total_full_charge: z.number(), // s
    increase_different_refrigerant: z.number(), // t
    result_increase: z.number(), // u = q + r - s - t
    emissions: z.number(), // v = e + j - p - u
    unit: z.enum(["kg", "tonne", "tonUK", "tonUS", "lb"]), // w
    gwp: z.number(), // x,
    method: z.number(),
    name: z.string(),
})

export const ghgLifecycleSchema = z.object({
    equipment: z.string(), // a
    gas: z.string(), // b
    installation_refrigerant_used: z.number(), //c
    installation_refrigerant_used_retrofit: z.number(), //d
    installation_equipment_using_refrigerant: z.number(), // e
    installation_equipment_using_refrigerant_retrofit: z.number(), // f
    installation_total_emission: z.number(), // g = c + d - e - f
    use_emission_recycling_recharge: z.number(), // h
    final_sold_other_entities: z.number(), // i
    final_use_different_refrigerant: z.number(), // j
    final_use_retering_equipment: z.number(), // k
    final_use_different_refrigerant_other: z.number(), // l
    final_use_total: z.number(), // m = i + j - k - l
    emissions: z.number(), // n = g + h + m
    unit: z.enum(["kg", "tonne", "tonUK", "tonUS", "lb"]), // o
    gwp: z.number(), // p
    method: z.number(),
    name: z.string(),
})

export const ghgScreeningSchema = z.object({
    equipment: z.string(), // a
    total_units: z.number(), // b
    gas: z.string(), // c
    gwp: z.number(), // d
    refrigerant_charge: z.number(), // e
    installation_factor: z.number(), // f
    unit: z.enum(["kg", "tonne", "tonUK", "tonUS", "lb"]), // g

    annual_leakage_rate: z.number(), // h
    time_since_recharge_years: z.number(), // i
    recycling_efficiency: z.number(), // j
    destruction: z.number(), // k
    method: z.number(),
    name: z.string(),
})
