import { Request, Response } from "express"
import { EquipmentType } from "../../entity/equipment-type/EquipmentType.entity"
import { GhgEquipmentType } from "../../entity/equipment-type/GhgEquipment.entity"

export class EquipmentTypeController {
    static async getEquipments(req: Request, res: Response) {
        try {
            const equipments = await EquipmentType.find({ where: { ...req.query } })
            return res.status(200).json({
                data: equipments,
            })
        } catch (error) {
            return res.status(400).json({
                message: error.message ? error.message : "Something went wrong",
            })
        }
    }
    static async getGhgEquipments(req: Request, res: Response) {
        try {
            const equipments = await GhgEquipmentType.find({ where: { ...req.query } })
            return res.status(200).json({
                data: equipments,
            })
        } catch (error) {
            return res.status(400).json({
                message: error.message ? error.message : "Something went wrong",
            })
        }
    }
}
