import { z } from "zod"
import { ghgScreeningSchema } from "../validations/ghg"

export function calculateDisposalEmission(params: z.infer<typeof ghgScreeningSchema>) {
    // Step 1
    const part1 = params.total_units * params.refrigerant_charge

    // Step 2
    const part2 = (params.annual_leakage_rate / 100) * params.time_since_recharge_years

    // Step 3
    const part3 = 1 - part2

    // Step 4
    const part4 = 1 - params.recycling_efficiency / 100

    // Step 5
    const part5 = part1 * part3 * part4

    // Step 6
    const part6 = part5 - params.destruction

    // Step 7
    const result = part6 * params.gwp

    return Math.abs(result)
}
