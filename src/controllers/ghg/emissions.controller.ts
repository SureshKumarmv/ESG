import { ghgScreeningSchema } from "./../../validations/ghg"
import { Request, Response } from "express"
import { convertWeight } from "../../utils/conversion"
import { Result } from "../../entity/results/Results.entity"
import { EquipmentType } from "../../entity/equipment-type/EquipmentType.entity"
import { GhgEmission } from "../../entity/ghg/GhgEmission.entity"
import { ghgLifecycleSchema, ghgSalesSchema } from "../../validations/ghg"
import { z } from "zod"
import { AppDataSource } from "../../data-source"
import { EmissionTypeEnum } from "../../enum/emission-type.enum"
import { GhgMethodEnum } from "../../enum/ghg-method.enum"
import { calculateDisposalEmission } from "../../utils/calculate"

export class GhgEmissionController {
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

            // Query the database with the built where clause
            const emissions = await GhgEmission.find({
                where: whereClause,
                relations: { gas: true }, // Include gas relation
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
            const epaEmission = await GhgEmission.find({
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
        // 1. sales based method
        // 2. lifecycle based method
        // 3. screening method
        const { data } = req.body
        if (!data) {
            return res.status(400).json({ message: "Invalid parameters" })
        }
        for (const item of data) {
            try {
                // Method: 1, material balance method
                // check method
                if (item?.method === GhgMethodEnum.SALES_BASED_APPROACH) {
                    // check validation
                    const parsedData = await ghgSalesSchema.parseAsync(item)
                    const equipmentData = await EquipmentType.findOne({
                        where: { id: parsedData.equipment },
                    })
                    const conversionFactor = convertWeight(1, parsedData.unit, "kg")
                    const _result = parsedData.gwp * conversionFactor * parsedData.emissions
                    // convert kg unit to original units
                    const updatedResult = convertWeight(_result, "kg", parsedData.unit)
                    const ResultRepository = AppDataSource.getRepository(Result)
                    const savedData = await ResultRepository.save([
                        {
                            ...parsedData,
                            equipment: equipmentData,
                            result: updatedResult,
                            result_type: EmissionTypeEnum.GHG,
                            organization: req.user?.organization,
                            subsidiary: req.user?.subsidiary,
                            facility: req.user?.facility,
                        },
                    ])
                    return res
                        .status(201)
                        .json({ data: savedData, message: "Data saved successfully" })
                } else if (item?.method === GhgMethodEnum.LIFECYCLE_STAGE_APPROACH) {
                    const parsedData = await ghgLifecycleSchema.parseAsync(item)
                    const equipmentData = await EquipmentType.findOne({
                        where: { id: parsedData.equipment },
                    })
                    const conversionFactor = convertWeight(1, parsedData.unit, "kg")
                    const _result = parsedData.gwp * conversionFactor * parsedData.emissions
                    // convert kg unit to original units
                    const updatedResult = convertWeight(_result, "kg", parsedData.unit)
                    const ResultRepository = AppDataSource.getRepository(Result)
                    const savedData = await ResultRepository.save([
                        {
                            ...parsedData,
                            equipment: equipmentData,
                            result: updatedResult,
                            result_type: EmissionTypeEnum.GHG,
                            organization: req.user?.organization,
                            subsidiary: req.user?.subsidiary,
                            facility: req.user?.facility,
                        },
                    ])
                    return res
                        .status(201)
                        .json({ data: savedData, message: "Data saved successfully" })
                } else if (item?.method === GhgMethodEnum.SCREENING_METHOD) {
                    const parsedData = await ghgScreeningSchema.parseAsync(item)
                    const equipmentData = await EquipmentType.findOne({
                        where: { id: parsedData.equipment },
                    })
                    const conversionFactor = convertWeight(1, parsedData.unit, "kg")
                    const assemblyEmission =
                        parsedData.gwp *
                        conversionFactor *
                        parsedData.total_units *
                        (parsedData.installation_factor / 100) *
                        parsedData.refrigerant_charge
                    const operationEmission =
                        parsedData.gwp *
                        conversionFactor *
                        parsedData.total_units *
                        (parsedData.annual_leakage_rate / 100) *
                        parsedData.refrigerant_charge
                    const disposalEmission =
                        calculateDisposalEmission(parsedData) * conversionFactor
                    const _result = assemblyEmission + operationEmission + disposalEmission
                    // convert kg unit to original units
                    const updatedResult = convertWeight(_result, "kg", parsedData.unit)
                    const ResultRepository = AppDataSource.getRepository(Result)
                    const savedData = await ResultRepository.save([
                        {
                            ...parsedData,
                            equipment: equipmentData,
                            result: updatedResult,
                            result_type: EmissionTypeEnum.GHG,
                            organization: req.user?.organization,
                            subsidiary: req.user?.subsidiary,
                            facility: req.user?.facility,
                        },
                    ])
                    return res
                        .status(201)
                        .json({ data: savedData, message: "Data saved successfully" })
                } else {
                    return res.status(400).json({ message: "Bad request" })
                }
            } catch (error) {
                if (error instanceof z.ZodError) {
                    return res.status(400).json({
                        message: "Validation failed",
                        errors: error.errors.map((e) => ({ path: e.path, message: e.message })), // Zod provides detailed error information
                    })
                }
                return res.status(400).json({
                    message: error.message ? error.message : "Something went wrong",
                })
            }
        }
    }
    static async updateEmission(req: Request, res: Response) {
        // to calculate emission result, there are three methods
        // 1. sales based method
        // 2. lifecycle based method
        // 3. screening method
        try {
            // Method: 1, material balance method
            // check method
            const ghgResult = await Result.findOneByOrFail({ id: req.params.id })
            if (!ghgResult) {
                res.status(404).json({ message: `Record not found with id: ${req.params.id}` })
            }
            if (req.body?.method === GhgMethodEnum.SALES_BASED_APPROACH) {
                // check validation
                const parsedData = await ghgSalesSchema.parseAsync(req.body)
                const equipmentData = await EquipmentType.findOne({
                    where: { id: parsedData.equipment },
                })
                const conversionFactor = convertWeight(1, parsedData.unit, "kg")
                const _result = parsedData.gwp * conversionFactor * parsedData.emissions
                // convert kg unit to original units
                const updatedResult = convertWeight(_result, "kg", parsedData.unit)
                Object.assign(ghgResult, {
                    ...parsedData,
                    equipment: equipmentData,
                    result: updatedResult,
                    result_type: EmissionTypeEnum.GHG,
                })
                const savedData = await ghgResult.save()
                return res
                    .status(201)
                    .json({ data: savedData, message: "Data updated successfully" })
            } else if (req.body?.method === GhgMethodEnum.LIFECYCLE_STAGE_APPROACH) {
                const parsedData = await ghgLifecycleSchema.parseAsync(req.body)
                const equipmentData = await EquipmentType.findOne({
                    where: { id: parsedData.equipment },
                })
                const conversionFactor = convertWeight(1, parsedData.unit, "kg")
                const _result = parsedData.gwp * conversionFactor * parsedData.emissions
                // convert kg unit to original units
                const updatedResult = convertWeight(_result, "kg", parsedData.unit)
                Object.assign(ghgResult, {
                    ...parsedData,
                    equipment: equipmentData,
                    result: updatedResult,
                    result_type: EmissionTypeEnum.GHG,
                })
                const savedData = await ghgResult.save()
                return res
                    .status(201)
                    .json({ data: savedData, message: "Data updated successfully" })
            } else if (req.body?.method === GhgMethodEnum.SCREENING_METHOD) {
                const parsedData = await ghgScreeningSchema.parseAsync(req.body)
                const equipmentData = await EquipmentType.findOne({
                    where: { id: parsedData.equipment },
                })
                const conversionFactor = convertWeight(1, parsedData.unit, "kg")
                const assemblyEmission =
                    parsedData.gwp *
                    conversionFactor *
                    parsedData.total_units *
                    (parsedData.installation_factor / 100) *
                    parsedData.refrigerant_charge
                const operationEmission =
                    parsedData.gwp *
                    conversionFactor *
                    parsedData.total_units *
                    (parsedData.annual_leakage_rate / 100) *
                    parsedData.refrigerant_charge
                const disposalEmission = calculateDisposalEmission(parsedData) * conversionFactor
                const _result = assemblyEmission + operationEmission + disposalEmission
                // convert kg unit to original units
                const updatedResult = convertWeight(_result, "kg", parsedData.unit)
                Object.assign(ghgResult, {
                    ...parsedData,
                    equipment: equipmentData,
                    result: updatedResult,
                    result_type: EmissionTypeEnum.GHG,
                })
                const savedData = await ghgResult.save()
                return res
                    .status(201)
                    .json({ data: savedData, message: "Data updated successfully" })
            } else {
                return res.status(400).json({ message: "Bad request" })
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: "Validation failed",
                    errors: error.errors.map((e) => ({ path: e.path, message: e.message })), // Zod provides detailed error information
                })
            }
            return res.status(400).json({
                message: error.message ? error.message : "Something went wrong",
            })
        }
    }
}
