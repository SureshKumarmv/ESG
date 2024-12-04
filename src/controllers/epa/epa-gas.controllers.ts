import { Request, Response } from "express"
import { EpaGas } from "../../entity/epa/Gas.entity"
import { AnyObject } from "../../types/common"

export class GasController {
    static async getAllGases(req: Request, res: Response) {
        const { page = 1, limit = 10, pagination = false } = req.query as AnyObject
        const offset = ((page ?? 1) - 1) * parseInt(limit)
        const EpaGasBuilder = EpaGas.createQueryBuilder("epa_gases")
        const count = await EpaGasBuilder.getCount()
        if (pagination) {
            delete req.query["pagination"]
            delete req.query["limit"]
            delete req.query["page"]
            const gases = await EpaGasBuilder.where({ ...req.query })
                .orderBy("created_at", "DESC")
                .skip(offset)
                .take(limit)
                .getMany()
            res.status(200).json({
                data: gases,
                page,
                total_count: count,
                limit,
            })
        } else {
            const gases = await EpaGasBuilder.where({ ...req.query }).getMany()
            res.status(200).json({
                data: gases,
            })
        }
    }
    static async getGasById(req: Request, res: Response) {
        const epaGas = await EpaGas.findOne({ where: { id: req.params.id } })
        res.status(200).json({
            data: epaGas,
        })
    }
}
