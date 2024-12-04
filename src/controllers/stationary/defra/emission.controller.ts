import { Request, Response } from "express"
import { StationaryDefraEmission } from "../../../entity/stationary/StationaryDefraEmission.entity"
import { AnyObject } from "../../../types/common"
import { z } from "zod"
import { stationaryDefra } from "../../../validations/stationary-defra"
import { StationaryDefraResult } from "../../../entity/stationary/StationaryDefraResult.entity"
import { Status } from "../../../enum/status.enum"
import { addRemarksValidation, validateData } from "../../../validations/validate-data"

export class StationaryEmissionController {
    static async getAllEmissions(req: Request, res: Response) {
        try {
            const {
                page = 1,
                limit = 10,
                pagination = false,
                id,
                ...otherParams
            } = req.query as AnyObject
            const offset = ((page ?? 1) - 1) * parseInt(limit)

            const StationaryDefraEmissionBuilder =
                StationaryDefraEmission.createQueryBuilder("defra_emission")

            // Get count for pagination
            const count = await StationaryDefraEmissionBuilder.getCount()

            // Build the where clause dynamically based on provided query parameters
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const whereClause: Record<string, any> = {}

            // Handle the 'id' parameter: exact match
            if (id) whereClause.fuel = { id: id }

            // Handle other parameters: case-insensitive regex match
            for (const [key, value] of Object.entries(otherParams)) {
                if (value) {
                    whereClause[key] = {
                        $ilike: `%${value}%`, // case-insensitive pattern match (using 'ilike' for Postgres)
                    }
                }
            }

            if (pagination) {
                // Remove pagination parameters from the request
                delete req.query["pagination"]
                delete req.query["limit"]
                delete req.query["page"]

                // Use the whereClause here for filtering
                const results = await StationaryDefraEmissionBuilder.where(whereClause) // Using whereClause for dynamic filtering
                    .orderBy("defra_emission.created_at", "DESC")
                    .leftJoinAndSelect("defra_emission.fuel", "fuel")
                    .skip(offset)
                    .take(limit)
                    .getMany()

                res.status(200).json({
                    data: results,
                    page,
                    total_count: count,
                    limit,
                })
            } else {
                // Use the whereClause here for filtering without pagination
                const results = await StationaryDefraEmissionBuilder.where(whereClause) // Using whereClause for dynamic filtering
                    .leftJoinAndSelect("defra_emission.fuel", "fuel") // Include related fuel
                    .getMany()

                res.status(200).json({
                    data: results,
                })
            }
        } catch (error) {
            // Error handling
            res.status(400).json({
                message: error.message ? error.message : "Unable to fetch defra emissions",
            })
        }
    }
    static async getEmissionById(req: Request, res: Response) {
        try {
            const { id } = req.params // Extract the 'id' from the URL parameters

            if (!id) {
                return res.status(400).json({
                    message: "id parameter is required.",
                })
            }

            // Query the emission record using the ID
            const emission = await StationaryDefraEmission.findOne({
                where: { id },
                relations: { fuel: true, activity: true }, // Include any related entities as needed
            })

            if (!emission) {
                return res.status(404).json({
                    message: "Emission record not found.",
                })
            }

            // Return the found emission record
            res.status(200).json({
                data: emission,
            })
        } catch (error) {
            // Error handling
            res.status(500).json({
                message: error.message || `Unable to fetch emission by ID:${req.params.id}`,
            })
        }
    }

    static async calculateResult(req: Request, res: Response) {
        try {
            const requestBody = await stationaryDefra.parseAsync(req.body)
            const { consumed_amount, fuel, unit, year } = requestBody
            // get emission using fuel id
            const emission = await StationaryDefraEmission.findOne({
                where: { fuel: { id: fuel }, unit, year },
            })
            if (!emission) {
                throw new Error(
                    `Unable to find emission for the fuel id: ${fuel}, unit: ${unit} and year: ${year}`,
                )
            }
            const result = consumed_amount * emission.kg_co2e
            const data = new StationaryDefraResult()
            Object.assign(data, {
                ...requestBody,
                calculated_emission: result,
            })
            const savedData = await data.save()
            res.status(201).json({ success: true, data: savedData })
        } catch (error) {
            // Error handling
            if (error instanceof z.ZodError) {
                res.status(400).json({
                    message: "Validation failed",
                    errors: error.errors.map((e) => ({ path: e.path, message: e.message })), // Zod provides detailed error information
                })
            } else {
                res.status(500).json({
                    message: error.message || `Unable to calculate result`,
                })
            }
        }
    }
    static async updatedAndCalculateResult(req: Request, res: Response) {
        try {
            const savedResult = await StationaryDefraResult.findOne({
                where: { id: req.params.id },
            })
            if (!savedResult) {
                throw new Error(`Unable to find stationary result for ID: ${req.params.id}`)
            }
            if (savedResult.status === Status.COMPLETED) {
                throw new Error(`Result which is completed can not be updated`)
            }
            const requestBody = await stationaryDefra.parseAsync(req.body)
            const { consumed_amount, fuel, unit, year } = requestBody
            // get emission using fuel id
            const emission = await StationaryDefraEmission.findOne({
                where: { fuel: { id: fuel }, unit, year },
            })
            if (!emission) {
                throw new Error(
                    `Unable to find emission for the fuel id: ${fuel}, unit: ${unit} and year: ${year}`,
                )
            }
            const result = consumed_amount * emission.kg_co2e
            Object.assign(savedResult, {
                ...requestBody,
                calculated_emission: result,
            })
            const updatedResult = await savedResult.save()
            res.status(201).json({ success: true, data: updatedResult })
        } catch (error) {
            // Error handling
            if (error instanceof z.ZodError) {
                res.status(400).json({
                    message: "Validation failed",
                    errors: error.errors.map((e) => ({ path: e.path, message: e.message })), // Zod provides detailed error information
                })
            } else {
                res.status(500).json({
                    message: error.message || `Unable to update result`,
                })
            }
        }
    }

    static async getResults(req: Request, res: Response) {
        try {
            const { page = 1, limit = 10, pagination = false } = req.query as AnyObject
            const offset = ((page ?? 1) - 1) * parseInt(limit)
            const ResultBuilder = StationaryDefraResult.createQueryBuilder(
                "result",
            ).leftJoinAndSelect("result.fuel", "fuel") // Join organization
            // .leftJoinAndSelect("result.subsidiary", "subsidiary") // Join subsidiary
            // .leftJoinAndSelect("result.facility", "facility")
            // .leftJoinAndSelect("result.epa_gas", "epa_gas")
            // .leftJoinAndSelect("result.defra_gas", "defra_gas")
            // .leftJoinAndSelect("result.ghg_gas", "ghg_gas")
            const count = await ResultBuilder.getCount()
            if (pagination) {
                delete req.query["pagination"]
                delete req.query["limit"]
                delete req.query["page"]
                const results = await ResultBuilder.where({ ...req.query })
                    .leftJoinAndSelect("result.fuel", "fuel") // Join organization
                    // .leftJoinAndSelect("result.subsidiary", "subsidiary") // Join subsidiary
                    // .leftJoinAndSelect("result.facility", "facility")
                    // .leftJoinAndSelect("result.epa_gas", "epa_gas")
                    // .leftJoinAndSelect("result.defra_gas", "defra_gas")
                    // .leftJoinAndSelect("result.ghg_gas", "ghg_gas")
                    .orderBy("result.created_at", "DESC")
                    .skip(offset)
                    .take(limit)
                    .getMany()
                res.status(200).json({
                    data: results,
                    page,
                    total_count: count,
                    limit,
                })
            } else {
                const results = await ResultBuilder.where({ ...req.query })
                    .leftJoinAndSelect("result.fuel", "fuel_details")
                    .getMany()
                res.status(200).json({
                    data: results,
                })
            }
        } catch (error) {
            res.status(400).json({
                message: error.message
                    ? error.message
                    : "Unable to get results for stationary defra",
            })
        }
    }
    static async validateData(req: Request, res: Response) {
        try {
            const { data, status } = await validateData.parseAsync(req.body)
            for (const item of data) {
                const record = await StationaryDefraResult.findOne({ where: { id: item } })
                if (record) {
                    record.status = status
                    await record.save()
                } else {
                    throw new Error(`No data found for id: ${item}`)
                }
            }
            res.status(200).json({ message: "Status updated successfully" })
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({
                    message: "Validation failed",
                    errors: error.errors.map((e) => ({ path: e.path, message: e.message })),
                })
            }
            res.status(400).json({
                message: error.message ? error.message : "Something went wrong",
                details:
                    error?.detail?.replace(/[()[\]{}]/g, "") ??
                    error.message ??
                    "Something went wrong",
            })
        }
    }
    static async addRemarks(req: Request, res: Response) {
        try {
            const { remark } = await addRemarksValidation.parseAsync(req.body)
            const record = await StationaryDefraResult.findOne({ where: { id: req.params.id } })
            if (record) {
                record.remarks = remark
                await record.save()
            } else {
                throw new Error(`No data found for id: ${req.params.id}`)
            }
            res.status(200).json({ message: "Remark added successfully" })
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({
                    message: "Validation failed",
                    errors: error.errors.map((e) => ({ path: e.path, message: e.message })),
                })
            }
            res.status(400).json({
                message: error.message ? error.message : "Something went wrong",
                details:
                    error?.detail?.replace(/[()[\]{}]/g, "") ??
                    error.message ??
                    "Something went wrong",
            })
        }
    }
}
