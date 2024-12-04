import { Request, Response } from "express"
import { Activity } from "../../entity/defra/Activity.entity"

export class ActivityController {
    static async getActivites(req: Request, res: Response) {
        try {
            const activities = await Activity.find({ where: { ...req.query } })
            return res.status(200).json({
                data: activities,
            })
        } catch (error) {
            return res.status(400).json({
                message: error.message ? error.message : "Something went wrong",
            })
        }
    }
}
