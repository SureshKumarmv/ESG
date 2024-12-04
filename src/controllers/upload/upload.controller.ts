import { Request, Response } from "express"
import { fileUploadValidationSchema } from "../../validations/upload"
import { uploadFile } from "../../utils/helpers"

export class UploadController {
    static async generateSasUrl(req: Request, res: Response) {
        const { filename } = await fileUploadValidationSchema.parseAsync(req.body)
        const url = await uploadFile(filename)
        res.status(201).json({ data: url })
    }
}
