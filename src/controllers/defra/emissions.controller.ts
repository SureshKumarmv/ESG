import { Request, Response } from "express"
import { MethodEnum } from "../../enum/method.enum"
import { convertWeight } from "../../utils/conversion"
import { DefraEmission } from "../../entity/defra/DefraEmission.entity"
import { Result } from "../../entity/results/Results.entity"
import { EquipmentType } from "../../entity/equipment-type/EquipmentType.entity"
import { Organization } from "../../entity/organization/Organization.entity"
import { Status } from "../../enum/status.enum"
import { Subsidiary } from "../../entity/organization/Subsidiary.entity"
import { Facility } from "../../entity/organization/Facility.entity"

export class DefraEmissionController {
    static async getAllEmissions(req: Request, res: Response) {
        try {
            // Extract query parameters from the request
            const { gasId, ...otherParams } = req.query

            // Build the where clause dynamically based on provided query parameters
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const whereClause: Record<string, any> = {}

            if (gasId) whereClause.gas = { id: gasId } // Handle the relation

            // Add any other filters that are passed in the query
            Object.assign(whereClause, otherParams)
            const emissions = await DefraEmission.find({
                where: whereClause,
                relations: { gas: true },
            })
            return res.status(200).json({
                data: emissions,
            })
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }
    static async getEmissionById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const epaEmission = await DefraEmission.find({
                where: { id },
                relations: { gas: true },
            })
            return res.status(200).json({
                data: epaEmission,
            })
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }
    static async calculateEmission(req: Request, res: Response) {
        // to calculate emission result, there are three methods
        // 1. material balance method
        // 2. simplified material balance method
        // 2. screening method
        // get the parameters that are required from request
        const { data } = req.body
        if (!data) {
            return res.status(400).json({ message: "Invalid parameters" })
        }
        for (const item of data) {
            const { method, year, unit, gwp, gas, name } = item
            // TODO: can use zod or yup to validate the parameters
            if (!method || !year || !unit || !gwp || !gas || !name) {
                return res
                    .status(400)
                    .json({ message: "method, year, unit, gwp, gas, name is required" })
            }
            try {
                // Method: 1, material balance method
                // check method
                if (method === MethodEnum.MATERIAL_BALANCE_METHOD) {
                    const {
                        inventoryChange,
                        transferredAmount,
                        capacityChange,
                        year,
                        unit,
                        gwp,
                        gas,
                        name,
                        activity,
                    } = item
                    if (
                        !inventoryChange ||
                        !transferredAmount ||
                        !capacityChange ||
                        !year ||
                        !unit ||
                        !gwp ||
                        !gas ||
                        !name ||
                        !activity
                    ) {
                        return res.status(400).json({ message: "All parameters are required" })
                    }
                    // convert all weight into kgs because formula can be applied to kgs only
                    const inventoryChangeInKgs = convertWeight(inventoryChange, unit, "kg")
                    const transferredAmountInKgs = convertWeight(transferredAmount, unit, "kg")
                    const capacityChangeInKgs = convertWeight(capacityChange, unit, "kg")
                    // calculate result using kg values
                    const result =
                        (inventoryChangeInKgs + transferredAmountInKgs + capacityChangeInKgs) * gwp
                    // insert this result into db
                    const defraResult = new Result()
                    defraResult.activity = activity
                    defraResult.capacity = capacityChange
                    defraResult.inventory_change = inventoryChange
                    defraResult.transferred_amount = transferredAmount
                    defraResult.gas = gas
                    defraResult.result_type = "defra"
                    defraResult.method = method
                    defraResult.year = year
                    // before saving it into db, convert kg again to the original unit
                    defraResult.result = convertWeight(result, "kg", unit)
                    defraResult.unit = unit
                    defraResult.organization = req.user.organization as Organization
                    defraResult.subsidiary = req.user.subsidiary as Subsidiary
                    defraResult.facility = req.user.facility as Facility
                    defraResult.status = Status.DRAFT
                    const savedResult = await defraResult.save()
                    // return saved record
                    return res.status(201).json({ data: savedResult })
                    // Method: 2, simplified material balance method
                } else if (method === MethodEnum.SIMPLIFIED_MATERIAL_BALANCE_METHOD) {
                    const {
                        newUnitsCharge,
                        newUnitsCapacity,
                        existingUnitsRecharge,
                        disposedUnitsCapacity,
                        disposedUnitsRecovered,
                    } = item
                    // TODO: can use zod or yup to validate the parameters
                    if (
                        !newUnitsCharge ||
                        !newUnitsCapacity ||
                        !existingUnitsRecharge ||
                        !disposedUnitsCapacity ||
                        !disposedUnitsRecovered
                    ) {
                        return res.status(400).json({ message: "All parameters are required" })
                    }
                    // convert all weight into kgs because formula can be applied to kgs only
                    const newUnitsChargeInKgs = convertWeight(newUnitsCharge, unit, "kg")
                    const newUnitsCapacityInKgs = convertWeight(newUnitsCapacity, unit, "kg")
                    const existingUnitsRechargeInKgs = convertWeight(
                        existingUnitsRecharge,
                        unit,
                        "kg",
                    )
                    const disposedUnitsCapacityInKgs = convertWeight(
                        disposedUnitsCapacity,
                        unit,
                        "kg",
                    )
                    const disposedUnitsRecoveredInKgs = convertWeight(
                        disposedUnitsRecovered,
                        unit,
                        "kg",
                    )
                    // calculate result using kg values
                    const result =
                        (newUnitsChargeInKgs +
                            newUnitsCapacityInKgs +
                            existingUnitsRechargeInKgs +
                            disposedUnitsCapacityInKgs +
                            disposedUnitsRecoveredInKgs) *
                        gwp
                    // insert this result into db
                    const defraResult = new Result()
                    defraResult.capacity = existingUnitsRecharge
                    defraResult.year = year
                    defraResult.new_units_charge = newUnitsCharge
                    defraResult.new_units_capacity = newUnitsCapacity
                    defraResult.disposed_units_capacity = disposedUnitsCapacity
                    defraResult.disposed_units_recovered = disposedUnitsRecovered
                    defraResult.gas = gas
                    defraResult.method = method
                    // before saving it into db, convert kg again to the original unit
                    defraResult.result = convertWeight(result, "kg", unit)
                    defraResult.unit = unit
                    defraResult.result_type = "defra"
                    defraResult.organization = req.user.organization as Organization
                    defraResult.subsidiary = req.user.subsidiary as Subsidiary
                    defraResult.facility = req.user.facility as Facility
                    defraResult.status = Status.DRAFT
                    const savedResult = await defraResult.save()
                    // return saved record
                    return res.status(201).json({ data: savedResult })
                    // Method: 3, screening method
                } else if (method === MethodEnum.SCREENING_METHOD) {
                    const {
                        equipment,
                        newUnitsCharge,
                        numberOfMonths,
                        operatingUnitsCapacity,
                        disposedUnitsCapacity,
                    } = item
                    if (
                        !equipment ||
                        !newUnitsCharge ||
                        !numberOfMonths ||
                        !operatingUnitsCapacity ||
                        !disposedUnitsCapacity
                    ) {
                        return res.status(400).json({
                            message:
                                "equipment, newUnitsCharge, numberOfMonths, operatingUnitsCapacity, disposedUnitsCapacity is required",
                        })
                    }
                    // convert all units to kg
                    const newUnitsChargeInKg = convertWeight(newUnitsCharge, unit, "kg")
                    const operatingUnitsCapacityInKg = convertWeight(
                        operatingUnitsCapacity,
                        unit,
                        "kg",
                    )
                    const disposedUnitsCapacityInKg = convertWeight(
                        disposedUnitsCapacity,
                        unit,
                        "kg",
                    )
                    const equipmentData = await EquipmentType.findOne({
                        where: { id: equipment },
                    })
                    const part1 =
                        newUnitsChargeInKg * (equipmentData.installationEmissionFactor / 100)
                    const part2 =
                        operatingUnitsCapacityInKg *
                        (equipmentData.operatingEmissions / 100) *
                        (numberOfMonths / 12)
                    const part3 =
                        disposedUnitsCapacityInKg *
                        (equipmentData.refrigerantRemainingAtDisposal / 100) *
                        (1 - equipmentData.recoveryEfficiency / 100)
                    const result = (part1 + (part2 + part3)) * gwp
                    const _result = new Result()
                    _result.capacity = operatingUnitsCapacity
                    _result.disposed_units_capacity = disposedUnitsCapacity
                    _result.new_units_charge = newUnitsCharge
                    _result.gas = gas
                    _result.year = year
                    _result.number_of_months = numberOfMonths
                    _result.method = method
                    _result.result_type = "defra"
                    _result.unit = unit
                    _result.organization = req.user.organization as Organization
                    _result.subsidiary = req.user.subsidiary as Subsidiary
                    _result.facility = req.user.facility as Facility
                    _result.result = convertWeight(result, "kg", unit)
                    _result.equipment = equipmentData
                    _result.status = Status.DRAFT
                    const savedResult = await Result.save(_result)
                    return res.status(201).json({ data: savedResult })
                } else {
                    return res.status(400).json({ message: "Bad request" })
                }
            } catch (error) {
                return res.status(400).json({
                    message: error.message ? error.message : "Something went wrong",
                })
            }
        }
    }
    static async updateEmission(req: Request, res: Response) {
        // to calculate emission result, there are three methods
        // 1. material balance method
        // 2. simplified material balance method
        // 2. screening method
        // get the parameters that are required from request
        const { method, year, unit, gwp, gas, name } = req.body
        const id = req.params.id
        // TODO: can use zod or yup to validate the parameters
        if (!method || !year || !unit || !gwp || !gas || !name) {
            return res
                .status(400)
                .json({ message: "method, year, unit, gwp, gas, name is required" })
        }
        try {
            const defraResult = await Result.findOneByOrFail({ id })
            if (!defraResult) {
                res.status(404).json({ message: `Record not found with id: ${id}` })
            }
            // Method: 1, material balance method
            // check method
            if (method === MethodEnum.MATERIAL_BALANCE_METHOD) {
                const {
                    inventoryChange,
                    transferredAmount,
                    capacityChange,
                    year,
                    unit,
                    gwp,
                    gas,
                    name,
                    activity,
                } = req.body
                if (
                    !inventoryChange ||
                    !transferredAmount ||
                    !capacityChange ||
                    !year ||
                    !unit ||
                    !gwp ||
                    !gas ||
                    !name ||
                    !activity
                ) {
                    return res.status(400).json({ message: "All parameters are required" })
                }
                // convert all weight into kgs because formula can be applied to kgs only
                const inventoryChangeInKgs = convertWeight(inventoryChange, unit, "kg")
                const transferredAmountInKgs = convertWeight(transferredAmount, unit, "kg")
                const capacityChangeInKgs = convertWeight(capacityChange, unit, "kg")
                // calculate result using kg values
                const result =
                    (inventoryChangeInKgs + transferredAmountInKgs + capacityChangeInKgs) * gwp
                // insert this result into db
                defraResult.activity = activity
                defraResult.capacity = capacityChange
                defraResult.year = year
                defraResult.inventory_change = inventoryChange
                defraResult.transferred_amount = transferredAmount
                defraResult.gas = gas
                defraResult.result_type = "defra"
                defraResult.method = method
                // before saving it into db, convert kg again to the original unit
                defraResult.result = convertWeight(result, "kg", unit)
                defraResult.unit = unit
                defraResult.organization = req.user.organization as Organization
                defraResult.status = Status.DRAFT
                const savedResult = await defraResult.save()
                // return saved record
                return res.status(201).json({ data: savedResult })
                // Method: 2, simplified material balance method
            } else if (method === MethodEnum.SIMPLIFIED_MATERIAL_BALANCE_METHOD) {
                const {
                    newUnitsCharge,
                    newUnitsCapacity,
                    existingUnitsRecharge,
                    disposedUnitsCapacity,
                    disposedUnitsRecovered,
                } = req.body
                // TODO: can use zod or yup to validate the parameters
                if (
                    !newUnitsCharge ||
                    !newUnitsCapacity ||
                    !existingUnitsRecharge ||
                    !disposedUnitsCapacity ||
                    !disposedUnitsRecovered
                ) {
                    return res.status(400).json({ message: "All parameters are required" })
                }
                // convert all weight into kgs because formula can be applied to kgs only
                const newUnitsChargeInKgs = convertWeight(newUnitsCharge, unit, "kg")
                const newUnitsCapacityInKgs = convertWeight(newUnitsCapacity, unit, "kg")
                const existingUnitsRechargeInKgs = convertWeight(existingUnitsRecharge, unit, "kg")
                const disposedUnitsCapacityInKgs = convertWeight(disposedUnitsCapacity, unit, "kg")
                const disposedUnitsRecoveredInKgs = convertWeight(
                    disposedUnitsRecovered,
                    unit,
                    "kg",
                )
                // calculate result using kg values
                const result =
                    (newUnitsChargeInKgs +
                        newUnitsCapacityInKgs +
                        existingUnitsRechargeInKgs +
                        disposedUnitsCapacityInKgs +
                        disposedUnitsRecoveredInKgs) *
                    gwp
                // insert this result into db
                defraResult.capacity = existingUnitsRecharge
                defraResult.new_units_charge = newUnitsCharge
                defraResult.new_units_capacity = newUnitsCapacity
                defraResult.disposed_units_capacity = disposedUnitsCapacity
                defraResult.disposed_units_recovered = disposedUnitsRecovered
                defraResult.gas = gas
                defraResult.year = year
                defraResult.method = method
                // before saving it into db, convert kg again to the original unit
                defraResult.result = convertWeight(result, "kg", unit)
                defraResult.unit = unit
                defraResult.result_type = "defra"
                defraResult.organization = req.user.organization as Organization
                defraResult.status = Status.DRAFT
                const savedResult = await defraResult.save()
                // return saved record
                return res.status(201).json({ data: savedResult })
                // Method: 3, screening method
            } else if (method === MethodEnum.SCREENING_METHOD) {
                const {
                    equipment,
                    newUnitsCharge,
                    numberOfMonths,
                    operatingUnitsCapacity,
                    disposedUnitsCapacity,
                } = req.body
                if (
                    !equipment ||
                    !newUnitsCharge ||
                    !numberOfMonths ||
                    !operatingUnitsCapacity ||
                    !disposedUnitsCapacity
                ) {
                    return res.status(400).json({
                        message:
                            "equipment, newUnitsCharge, numberOfMonths, operatingUnitsCapacity, disposedUnitsCapacity is required",
                    })
                }
                // convert all units to kg
                const newUnitsChargeInKg = convertWeight(newUnitsCharge, unit, "kg")
                const operatingUnitsCapacityInKg = convertWeight(operatingUnitsCapacity, unit, "kg")
                const disposedUnitsCapacityInKg = convertWeight(disposedUnitsCapacity, unit, "kg")
                const equipmentData = await EquipmentType.findOne({
                    where: { id: equipment },
                })
                const part1 = newUnitsChargeInKg * (equipmentData.installationEmissionFactor / 100)
                const part2 =
                    operatingUnitsCapacityInKg *
                    (equipmentData.operatingEmissions / 100) *
                    (numberOfMonths / 12)
                const part3 =
                    disposedUnitsCapacityInKg *
                    (equipmentData.refrigerantRemainingAtDisposal / 100) *
                    (1 - equipmentData.recoveryEfficiency / 100)
                const result = (part1 + (part2 + part3)) * gwp
                defraResult.capacity = operatingUnitsCapacity
                defraResult.disposed_units_capacity = disposedUnitsCapacity
                defraResult.new_units_charge = newUnitsCharge
                defraResult.gas = gas
                defraResult.year = year
                defraResult.number_of_months = numberOfMonths
                defraResult.method = method
                defraResult.result_type = "defra"
                defraResult.unit = unit
                defraResult.organization = req.user.organization as Organization
                defraResult.result = convertWeight(result, "kg", unit)
                defraResult.equipment = equipmentData
                defraResult.status = Status.DRAFT
                const savedResult = await defraResult.save()
                return res.status(201).json({ data: savedResult })
            } else {
                return res.status(400).json({ message: "Bad request" })
            }
        } catch (error) {
            return res.status(400).json({
                message: error.message ? error.message : "Something went wrong",
            })
        }
    }
}
