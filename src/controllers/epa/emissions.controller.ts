import { Request, Response } from "express"
import { EpaEmission } from "../../entity/epa/Emission.entity"
import { MethodEnum } from "../../enum/method.enum"
import { convertWeight } from "../../utils/conversion"
import { Result } from "../../entity/results/Results.entity"
import { EquipmentType } from "../../entity/equipment-type/EquipmentType.entity"
import { Status } from "../../enum/status.enum"
import { Organization } from "../../entity/organization/Organization.entity"
import { Subsidiary } from "../../entity/organization/Subsidiary.entity"
import { Facility } from "../../entity/organization/Facility.entity"

export class EmissionController {
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
            const emissions = await EpaEmission.find({
                where: whereClause,
                relations: { gas: true },
            })
            return res.status(200).json({
                data: emissions,
            })
        } catch (error) {
            return res.status(400).json({
                message: error.message ? error.message : "Something went wrong",
            })
        }
    }
    static async getEmissionById(req: Request, res: Response) {
        const { id } = req.params
        const epaEmission = await EpaEmission.find({
            where: { id },
            relations: { gas: true },
        })
        return res.status(200).json({
            data: epaEmission,
        })
    }
    static async calculateEmission(req: Request, res: Response) {
        // to calculate emission result, there are three methods
        // 1. material balance method
        // 2. simplified material balance method
        // 2. screening method
        // get the parameters that are required from request
        // Method: 1, material balance method
        const { data } = req.body
        if (!data) {
            return res.status(400).json({ message: "Invalid parameters" })
        }
        for (const item of data) {
            const { method, year, unit, gwp, gas, name, attachment } = item
            // TODO: can use zod or yup to validate the parameters
            if (!method || !year || !unit || !gwp || !gas || !name) {
                return res
                    .status(400)
                    .json({ message: "method, year, unit, gwp, gas, name is required" })
            }
            try {
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
                    } = item
                    if (
                        !inventoryChange ||
                        !transferredAmount ||
                        !capacityChange ||
                        !year ||
                        !unit ||
                        !gwp ||
                        !gas ||
                        !name
                    ) {
                        res.status(400).json({ message: "All parameters are required" })
                    }
                    // convert all weight into kgs because formula can be applied to kgs only
                    const inventoryChangeInKgs = convertWeight(inventoryChange, unit, "kg")
                    const transferredAmountInKgs = convertWeight(transferredAmount, unit, "kg")
                    const capacityChangeInKgs = convertWeight(capacityChange, unit, "kg")
                    // calculate result using kg values
                    const result =
                        (inventoryChangeInKgs + transferredAmountInKgs + capacityChangeInKgs) * gwp
                    // insert this result into db
                    const epaResult = new Result()
                    epaResult.capacity = capacityChange
                    epaResult.inventory_change = inventoryChange
                    epaResult.transferred_amount = transferredAmount
                    epaResult.gas = gas
                    epaResult.method = method
                    epaResult.attachment = attachment
                    epaResult.result_type = "epa"
                    // before saving it into db, convert kg again to the original unit
                    epaResult.result = convertWeight(result, "kg", unit)
                    epaResult.unit = unit
                    epaResult.organization = req.user.organization as Organization
                    epaResult.subsidiary = req.user.subsidiary as Subsidiary
                    epaResult.facility = req.user.facility as Facility
                    epaResult.year = year
                    epaResult.status = Status.DRAFT
                    const savedResult = await epaResult.save()
                    // return saved record
                    res.status(201).json({ data: savedResult })
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
                        res.status(400).json({ message: "All parameters are required" })
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
                    const epaResult = new Result()
                    epaResult.capacity = existingUnitsRecharge
                    epaResult.new_units_charge = newUnitsCharge
                    epaResult.new_units_capacity = newUnitsCapacity
                    epaResult.disposed_units_capacity = disposedUnitsCapacity
                    epaResult.disposed_units_recovered = disposedUnitsRecovered
                    epaResult.gas = gas
                    epaResult.method = method
                    epaResult.attachment = attachment
                    epaResult.result_type = "epa"
                    // before saving it into db, convert kg again to the original unit
                    epaResult.result = convertWeight(result, "kg", unit)
                    epaResult.unit = unit
                    epaResult.year = year
                    epaResult.organization = req.user.organization as Organization
                    epaResult.subsidiary = req.user.subsidiary as Subsidiary
                    epaResult.facility = req.user.facility as Facility
                    epaResult.status = Status.DRAFT
                    const savedResult = await epaResult.save()
                    // return saved record
                    res.status(201).json({ data: savedResult })
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
                    _result.year = year
                    _result.disposed_units_capacity = disposedUnitsCapacity
                    _result.new_units_charge = newUnitsCharge
                    _result.gas = gas
                    _result.number_of_months = numberOfMonths
                    _result.method = method
                    _result.result_type = "epa"
                    _result.unit = unit
                    _result.attachment = attachment
                    _result.organization = req.user.organization as Organization
                    _result.subsidiary = req.user.subsidiary as Subsidiary
                    _result.facility = req.user.facility as Facility
                    _result.result = convertWeight(result, "kg", unit)
                    _result.equipment = equipmentData
                    _result.status = Status.DRAFT
                    const savedResult = await Result.save(_result)
                    res.status(201).json({ data: savedResult })
                } else {
                    res.status(400).json({ message: "Bad request" })
                }
            } catch (error) {
                res.status(400).json({
                    message: error.message ? error.message : "Something went wrong",
                })
            }
        }
    }
    static async updateEmission(req: Request, res: Response) {
        const { method, year, unit, gwp, gas, name } = req.body
        const id = req.params.id
        // TODO: can use zod or yup to validate the parameters
        if (!method || !year || !unit || !gwp || !gas || !name) {
            return res
                .status(400)
                .json({ message: "method, year, unit, gwp, gas, name is required" })
        }
        try {
            const epaResult = await Result.findOneByOrFail({ id })
            if (!epaResult) {
                res.status(400).json({ message: `Record not found with id: ${id}` })
            }
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
                } = req.body
                if (
                    !inventoryChange ||
                    !transferredAmount ||
                    !capacityChange ||
                    !year ||
                    !unit ||
                    !gwp ||
                    !gas ||
                    !name
                ) {
                    res.status(400).json({ message: "All parameters are required" })
                }
                // convert all weight into kgs because formula can be applied to kgs only
                const inventoryChangeInKgs = convertWeight(inventoryChange, unit, "kg")
                const transferredAmountInKgs = convertWeight(transferredAmount, unit, "kg")
                const capacityChangeInKgs = convertWeight(capacityChange, unit, "kg")
                // calculate result using kg values
                const result =
                    (inventoryChangeInKgs + transferredAmountInKgs + capacityChangeInKgs) * gwp
                // insert this result into db
                epaResult.capacity = capacityChange
                epaResult.year = year
                epaResult.inventory_change = inventoryChange
                epaResult.transferred_amount = transferredAmount
                epaResult.gas = gas
                epaResult.method = method
                epaResult.result_type = "epa"
                // before saving it into db, convert kg again to the original unit
                epaResult.result = convertWeight(result, "kg", unit)
                epaResult.unit = unit
                epaResult.organization = req.user.organization as Organization
                epaResult.status = Status.DRAFT
                const savedResult = await epaResult.save()
                // return saved record
                res.status(201).json({ data: savedResult })
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
                    res.status(400).json({ message: "All parameters are required" })
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
                epaResult.capacity = existingUnitsRecharge
                epaResult.year = year
                epaResult.new_units_charge = newUnitsCharge
                epaResult.new_units_capacity = newUnitsCapacity
                epaResult.disposed_units_capacity = disposedUnitsCapacity
                epaResult.disposed_units_recovered = disposedUnitsRecovered
                epaResult.gas = gas
                epaResult.method = method
                epaResult.result_type = "epa"
                // before saving it into db, convert kg again to the original unit
                epaResult.result = convertWeight(result, "kg", unit)
                epaResult.unit = unit
                epaResult.organization = req.user.organization as Organization
                epaResult.status = Status.DRAFT
                const savedResult = await epaResult.save()
                // return saved record
                res.status(201).json({ data: savedResult })
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
                epaResult.capacity = operatingUnitsCapacity
                epaResult.year = year
                epaResult.disposed_units_capacity = disposedUnitsCapacity
                epaResult.new_units_charge = newUnitsCharge
                epaResult.gas = gas
                epaResult.number_of_months = numberOfMonths
                epaResult.method = method
                epaResult.result_type = "epa"
                epaResult.unit = unit
                epaResult.organization = req.user.organization as Organization
                epaResult.result = convertWeight(result, "kg", unit)
                epaResult.equipment = equipmentData
                epaResult.status = Status.DRAFT
                const savedResult = await epaResult.save()
                res.status(201).json({ data: savedResult })
            } else {
                res.status(400).json({ message: "Bad request" })
            }
        } catch (error) {
            res.status(400).json({
                message: error.message ? error.message : "Something went wrong",
            })
        }
    }
}
