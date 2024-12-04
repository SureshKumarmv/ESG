import { Request, Response } from "express"
import { StationaryDefraFuel } from "../../../entity/stationary/StationaryDefraFuel.entity"
import { AnyObject } from "../../../types/common"

export class FuelController {
    static async getAllFuels(req: Request, res: Response) {
        try {
            const { page = 1, limit = 10, pagination = false } = req.query as AnyObject
            const offset = ((page ?? 1) - 1) * parseInt(limit)
            const StationaryDefraFuelBuilder = StationaryDefraFuel.createQueryBuilder("defra_fuels")
            const count = await StationaryDefraFuelBuilder.getCount()
            if (pagination) {
                delete req.query["pagination"]
                delete req.query["limit"]
                delete req.query["page"]
                const results = await StationaryDefraFuelBuilder.where({ ...req.query })
                    .orderBy("defra_fuels.created_at", "DESC")
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
                const results = await StationaryDefraFuelBuilder.where({ ...req.query }).getMany()
                res.status(200).json({
                    data: results,
                })
            }
        } catch (error) {
            res.status(400).json({
                message: error.message ? error.message : "Unable to fetch results",
            })
        }
    }
    static async getFueldById(req: Request, res: Response) {
        try {
            const statiStationaryDefraFuel = await StationaryDefraFuel.findOne({
                where: { id: req.params.id },
            })
            res.status(200).json({
                data: statiStationaryDefraFuel,
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
                    ? error.message
                    : `Unable to find fuel for the provided ID: ${req.params.id}`,
            })
        }
    }
}
