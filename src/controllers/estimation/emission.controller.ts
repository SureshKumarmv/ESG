import { Request, Response } from "express"
import { convertDistance } from "../../utils/conversion"
import { Result } from "../../entity/results/Results.entity"
import { z } from "zod"
import { AppDataSource } from "../../data-source"
import { EmissionTypeEnum } from "../../enum/emission-type.enum"
import { estimationSchema } from "../../validations/estimation"
import { AREA_FOR_CAPACITY_FOR_1_TON, PER_TON_HVAC_IN_KGS } from "../../utils/constants"
import { GhgEquipmentType } from "../../entity/equipment-type/GhgEquipment.entity"

export class EstimationController {
    static async calculateEmission(req: Request, res: Response) {
        try {
            const parsedData = await estimationSchema.parseAsync(req.body)
            const equipmentData = await GhgEquipmentType.findOne({
                where: { id: parsedData.equipment },
            })
            const convertedArea = convertDistance(parsedData.area, parsedData.unit, "squareFeet")
            const refrigerantInKgs =
                (convertedArea / AREA_FOR_CAPACITY_FOR_1_TON) * PER_TON_HVAC_IN_KGS
            const avgAnnualLeakge =
                (Number(equipmentData.minAnnualLeakageRate) +
                    Number(equipmentData.maxAnnualLeakageRate)) /
                2
            const result = refrigerantInKgs * (avgAnnualLeakge / 100)
            // convert kg unit to original units
            const ResultRepository = AppDataSource.getRepository(Result)
            const savedData = await ResultRepository.save([
                {
                    ...parsedData,
                    equipment: null,
                    ghgEquipment: equipmentData,
                    result,
                    result_type: EmissionTypeEnum.ESTIMATION,
                },
            ])
            return res.status(201).json({ data: savedData, message: "Data saved successfully" })
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
