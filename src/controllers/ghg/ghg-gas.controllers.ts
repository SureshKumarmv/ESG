import { Request, Response } from "express"
import { GhgGas } from "../../entity/ghg/Ghg.entity"
import { AnyObject } from "../../types/common"

export class GasController {
    static async getAllGases(req: Request, res: Response) {
        try {
            const { page = 1, limit = 10, pagination = false } = req.query as AnyObject
            const offset = ((page ?? 1) - 1) * parseInt(limit)
            const GhgGasBuilder = GhgGas.createQueryBuilder("ghg_gases")
            const count = await GhgGasBuilder.getCount()
            if (pagination) {
                delete req.query["pagination"]
                delete req.query["limit"]
                delete req.query["page"]
                const results = await GhgGasBuilder.where({ ...req.query })
                    .orderBy("ghg_gases.created_at", "DESC")
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
                const results = await GhgGasBuilder.where({ ...req.query }).getMany()
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
    static async getGasById(req: Request, res: Response) {
        try {
            const ghgGas = await GhgGas.findOne({ where: { id: req.params.id } })
            return res.status(200).json({
                data: ghgGas,
            })
        } catch (error) {
            return res.status(400).json({
                message: error.message ? error.message : "Something went wrong",
            })
        }
    }
}
