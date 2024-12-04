import { Request, Response } from "express"
import { AppDataSource } from "../../data-source"
import * as XLSX from "xlsx"
import { Result } from "../../entity/results/Results.entity"
import { StationaryDefraResult } from "../../entity/stationary/StationaryDefraResult.entity"

export class ExportResultController {
    static async exportData(req: Request, res: Response) {
        const ResultRepository = AppDataSource.getRepository(Result)
        // Step 1: Read data from database
        const data = await ResultRepository.find({ where: { ...req.query } })
        // Step 2: Convert Data to Excel
        const worksheet = XLSX.utils.json_to_sheet(data)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Results")

        // Step 3: Generate Raw XLSX File Buffer
        const xlsxBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

        // Step 4: Set Response Headers
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
        res.setHeader("Content-Disposition", "attachment; filename=exported_results.xlsx")

        // Step 5: Send File to Client
        res.send(xlsxBuffer)
    }
    static async exportStationaryDefraData(req: Request, res: Response) {
        const ResultRepository = AppDataSource.getRepository(StationaryDefraResult)
        // Step 1: Read data from database
        const data = await ResultRepository.find({ where: { ...req.query } })
        // Step 2: Convert Data to Excel
        const worksheet = XLSX.utils.json_to_sheet(data)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Results")

        // Step 3: Generate Raw XLSX File Buffer
        const xlsxBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

        // Step 4: Set Response Headers
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
        res.setHeader("Content-Disposition", "attachment; filename=exported_results.xlsx")

        // Step 5: Send File to Client
        res.send(xlsxBuffer)
    }
}
