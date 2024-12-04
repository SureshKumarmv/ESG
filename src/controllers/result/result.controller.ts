import { Request, Response } from "express"
import { Result } from "../../entity/results/Results.entity"
import { AnyObject } from "../../types/common"
import { z } from "zod"
import { addRemarksValidation, validateData } from "../../validations/validate-data"
import { AppDataSource } from "../../data-source"

export class ResultController {
    static async getResults(req: Request, res: Response) {
        try {
            const { page = 1, limit = 10, pagination = false } = req.query as AnyObject
            const offset = ((page ?? 1) - 1) * parseInt(limit)
            const ResultBuilder = Result.createQueryBuilder("result")
                .leftJoinAndSelect("result.organization", "organization") // Join organization
                .leftJoinAndSelect("result.subsidiary", "subsidiary") // Join subsidiary
                .leftJoinAndSelect("result.facility", "facility")
            // .leftJoinAndSelect("result.epa_gas", "epa_gas")
            // .leftJoinAndSelect("result.defra_gas", "defra_gas")
            // .leftJoinAndSelect("result.ghg_gas", "ghg_gas")
            const count = await ResultBuilder.getCount()
            if (pagination) {
                delete req.query["pagination"]
                delete req.query["limit"]
                delete req.query["page"]
                const results = await ResultBuilder.where({ ...req.query })
                    .leftJoinAndSelect("result.organization", "organization") // Join organization
                    .leftJoinAndSelect("result.subsidiary", "subsidiary") // Join subsidiary
                    .leftJoinAndSelect("result.facility", "facility")
                    // .leftJoinAndSelect("result.epa_gas", "epa_gas")
                    // .leftJoinAndSelect("result.defra_gas", "defra_gas")
                    // .leftJoinAndSelect("result.ghg_gas", "ghg_gas")
                    .orderBy("result.created_at", "DESC")
                    .skip(offset)
                    .take(limit)
                    .getMany()
                return res.status(200).json({
                    data: results,
                    page,
                    total_count: count,
                    limit,
                })
            } else {
                const results = await ResultBuilder.where({ ...req.query }).getMany()
                return res.status(200).json({
                    data: results,
                })
            }
        } catch (error) {
            return res.status(400).json({
                message: error.message ? error.message : "Something went wrong",
            })
        }
    }
    static async addRemarks(req: Request, res: Response) {
        try {
            const { remark } = await addRemarksValidation.parseAsync(req.body)
            const record = await Result.findOne({ where: { id: req.params.id } })
            if (record) {
                record.remarks = remark
                await record.save()
            } else {
                throw new Error(`No data found for id: ${req.params.id}`)
            }
            res.status(200).json({ message: "Remark added successfully" })
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: "Validation failed",
                    errors: error.errors.map((e) => ({ path: e.path, message: e.message })),
                })
            }
            return res.status(400).json({
                message: error.message ? error.message : "Something went wrong",
                details:
                    error?.detail?.replace(/[()[\]{}]/g, "") ??
                    error.message ??
                    "Something went wrong",
            })
        }
    }
    static async validateData(req: Request, res: Response) {
        try {
            const { data, status } = await validateData.parseAsync(req.body)
            for (const item of data) {
                const record = await Result.findOne({ where: { id: item } })
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
                return res.status(400).json({
                    message: "Validation failed",
                    errors: error.errors.map((e) => ({ path: e.path, message: e.message })),
                })
            }
            return res.status(400).json({
                message: error.message ? error.message : "Something went wrong",
                details:
                    error?.detail?.replace(/[()[\]{}]/g, "") ??
                    error.message ??
                    "Something went wrong",
            })
        }
    }
    static async getTotalResultGasWise(req: Request, res: Response) {
        const resultRepository = AppDataSource.getRepository(Result)

        // Extract filters from the request query
        const { start_date, end_date } = req.query

        // Build the query
        const query = resultRepository
            .createQueryBuilder("result")
            .select("result.gas", "gas")
            .addSelect("SUM(result.result)", "total_result")
            .groupBy("result.gas")

        // Add dynamic filters
        if (start_date) {
            query.andWhere("result.created_at >= :start_date", { start_date })
        }

        if (end_date) {
            query.andWhere("result.created_at <= :end_date", { end_date })
        }

        delete req.query["created_at"]
        delete req.query["updated_at"]
        Object.keys(req.query).forEach((key) =>
            query.andWhere(`result.${key} = :${key}`, { [key]: req.query[key] }),
        )
        try {
            const gasWiseTotals = await query.getRawMany()

            res.status(200).json({ success: true, data: gasWiseTotals })
        } catch (error) {
            console.error(error)
            res.status(500).json({ success: false, message: "An error occurred", error })
        }
    }
}
