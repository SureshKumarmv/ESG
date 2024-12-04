import { Request, Response } from "express"
import { DefraGas } from "../../entity/defra/DefraGas.entity"
import { AnyObject } from "../../types/common"

export class DefraGasController {
    static async getAllGases(req: Request, res: Response) {
        try {
            const { page = 1, limit = 10, pagination = false } = req.query as AnyObject
            const offset = ((page ?? 1) - 1) * parseInt(limit)
            const DefraGasBuilder = DefraGas.createQueryBuilder("defra_gases").leftJoinAndSelect(
                "defra_gases.activity",
                "activity",
            )
            const count = await DefraGasBuilder.getCount()
            if (pagination) {
                delete req.query["pagination"]
                delete req.query["limit"]
                delete req.query["page"]
                const results = await DefraGasBuilder.where({ ...req.query })
                    .orderBy("defra_gases.created_at", "DESC")
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
                const results = await DefraGasBuilder.where({ ...req.query }).getMany()
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
}
