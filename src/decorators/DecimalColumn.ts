import { Column, ColumnOptions } from "typeorm"
import { DecimalTransformer } from "../utils/transformers"

export function DecimalColumn(options?: ColumnOptions) {
    return Column({
        type: "decimal",
        precision: 50,
        scale: 10,
        nullable: true,
        transformer: DecimalTransformer,
        ...options,
    })
}
