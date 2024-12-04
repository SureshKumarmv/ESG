import { ValueTransformer } from "typeorm"

export const DecimalTransformer: ValueTransformer = {
    to: (value: number): number | null => (value !== null ? value : null), // Transform to DB value
    from: (value: string): number | null => (value !== null ? parseFloat(value) : null), // Transform to Entity value
}
